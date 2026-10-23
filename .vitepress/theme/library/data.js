// Данные Библиотеки: загрузка книг сезона, приведение к удобному виду,
// подписи мест, сортировка. Формат файла — в начале scripts/build-history-data.mjs.
//
// Файл сезона грузится в браузере, а не при сборке: s6.json весит 1.4 МБ,
// и в бандл страницы ему не место.

import { withBase } from 'vitepress'

const cache = new Map()

export function loadSeasonBooks(season) {
  if (!cache.has(season)) {
    const p = fetch(withBase(`/data/history/s${season}.json`))
      .then((r) => {
        if (!r.ok) throw new Error(`s${season}.json: HTTP ${r.status}`)
        return r.json()
      })
      .then((d) => d.books.map(normalize))
    // Упавшую загрузку не кэшируем, иначе повторить её можно только перезагрузкой.
    p.catch(() => cache.delete(season))
    cache.set(season, p)
  }
  return cache.get(season)
}

// Страница в мире хранится как JSON-строка текстового компонента. Чаще всего
// её уже развернули, но часть страниц осталась в кавычках: `""` — пустая,
// `"Глава 1…"` — обычный текст.
function cleanPage(p) {
  if (p.length >= 2 && p[0] === '"' && p[p.length - 1] === '"') {
    try { return JSON.parse(p) } catch { return p.slice(1, -1) }
  }
  return p
}

function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function normalize(b) {
  const pages = b.p.map(cleanPage)
  // Хвост из пустых страниц — это недописанная книга, листать его незачем.
  while (pages.length > 1 && !pages[pages.length - 1].trim()) pages.pop()
  const signed = b.k === 'w'
  const author = signed ? (b.a || '') : ''
  const where = []
  let more = 0
  for (const w of b.w || []) {
    const m = w.match(/^и ещё (\d+)/)
    if (m) more = Number(m[1])
    else where.push(placeLabel(w))
  }
  const h = hashStr(author || '∅')
  return {
    id: b.id,
    title: signed ? (b.t || 'Без названия') : 'Книга с пером',
    author,
    signed,
    pages: pages.length ? pages : [''],
    copies: b.c || 1,
    where,
    more,
    sigs: (b.v || []).filter(Boolean),
    hue: signed ? h % 360 : 28,
    pattern: signed ? (h >>> 9) % 5 : 5,
    // Высота корешка — от названия, чтобы книги одного автора не стояли строем.
    tall: hashStr(b.id) % 7,
  }
}

// ── Где лежала книга ─────────────────────────────────────────────────────────

const COLORS = {
  white: 'белый', orange: 'оранжевый', magenta: 'пурпурный', light_blue: 'голубой',
  yellow: 'жёлтый', lime: 'лаймовый', pink: 'розовый', gray: 'серый',
  light_gray: 'светло-серый', cyan: 'бирюзовый', purple: 'фиолетовый', blue: 'синий',
  brown: 'коричневый', green: 'зелёный', red: 'красный', black: 'чёрный',
}

const PLACES = {
  chest: 'сундук', trapped_chest: 'сундук-ловушка', barrel: 'бочка',
  lectern: 'кафедра', item_frame: 'рамка', glow_item_frame: 'светящаяся рамка',
  hopper: 'воронка', dispenser: 'раздатчик', dropper: 'выбрасыватель',
  chiseled_bookshelf: 'резная книжная полка', item: 'лежала на земле',
  fox: 'у лисы в зубах', armor_stand: 'стойка для брони',
  oak_chest_boat: 'лодка с сундуком', shulker_box: 'шалкер', bundle: 'мешочек',
}

function placeName(id) {
  if (PLACES[id]) return PLACES[id]
  const m = id.match(/^(.+)_(shulker_box|bundle)$/)
  if (m && COLORS[m[1]]) return `${COLORS[m[1]]} ${PLACES[m[2]]}`
  return id.replace(/_/g, ' ')
}

// «chest → brown_shulker_box · 81 51 -290» → { place: 'Сундук → коричневый шалкер', xyz: '81 51 -290' }
// «у игрока Ник (эндер-сундук)» → { place: 'у игрока Ник', xyz: '', note: 'эндер-сундук' }
function placeLabel(w) {
  const at = w.match(/^(.+?) · (-?\d+ -?\d+ -?\d+)$/)
  if (at) {
    const place = at[1].split(' → ').map(placeName).join(' → ')
    return { place: place[0].toUpperCase() + place.slice(1), xyz: at[2] }
  }
  const pl = w.match(/^у игрока (.+?) \((.+)\)$/)
  if (pl) return { place: `у игрока ${pl[1]}`, note: pl[2], xyz: '' }
  return { place: w, xyz: '' }
}

// ── Корешки ──────────────────────────────────────────────────────────────────

// Размер корешка. Толщина — от числа страниц: записка и роман на полке должны
// отличаться с первого взгляда. Высота — от id, чтобы ряд не стоял строем.
// Полка раскладывает книги по рядам сама, поэтому размеры считаются здесь, а не в CSS.
// На телефоне самая тонкая книга — 32 px: в неё попадает палец.
const SPINE = {
  wide: { w: 30, wk: 0.5, h: 132, hk: 5, font: 12 },
  small: { w: 24, wk: 0.32, h: 104, hk: 4, font: 10 },
  narrow: { w: 32, wk: 0.3, h: 112, hk: 4, font: 12 },
}
export const SPINE_GAP = 2

export function spineSize(book, mode) {
  const k = SPINE[mode]
  const n = Math.min(book.pages.length, 50)
  return { w: Math.round(k.w + n * k.wk), h: k.h + book.tall * k.hk, font: k.font }
}
export const spineMaxH = (mode) => SPINE[mode].h + 6 * SPINE[mode].hk

// ── Порядок и поиск ──────────────────────────────────────────────────────────

const coll = new Intl.Collator('ru', { sensitivity: 'base', numeric: true })

// Ведущие «_» и точки не участвуют в сортировке: «__Jeas__» стоит на J.
const bare = (s) => s.replace(/^[^\p{L}\p{N}]+/u, '')
export const compareAuthors = (a, b) => (!a - !b) || coll.compare(bare(a), bare(b))
export const byTitle = (a, b) => (b.signed - a.signed) || coll.compare(bare(a.title), bare(b.title))

export function searchBooks(books, query) {
  const q = query.trim().toLowerCase()
  if (!q) return books
  return books.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
}

// Первая буква или цифра: ники вроде «_RAT_GEL_» начинаются с подчёркивания.
export const initial = (s) => s.match(/[\p{L}\p{N}]/u)?.[0].toUpperCase() || ''

export function plural(n, one, few, many) {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return many
  if (b > 1 && b < 5) return few
  if (b === 1) return one
  return many
}
