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

export function hashStr(s) {
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
  const chars = pages.reduce((n, p) => n + p.length, 0)
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
    chars,
    copies: b.c || 1,
    where,
    more,
    sigs: (b.v || []).filter(Boolean),
    censor: b.r || null,
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
export function placeLabel(w) {
  const at = w.match(/^(.+?) · (-?\d+ -?\d+ -?\d+)$/)
  if (at) {
    const place = at[1].split(' → ').map(placeName).join(' → ')
    return { place: place[0].toUpperCase() + place.slice(1), xyz: at[2] }
  }
  const pl = w.match(/^у игрока (.+?) \((.+)\)$/)
  if (pl) return { place: `у игрока ${pl[1]}`, player: pl[1], note: pl[2], xyz: '' }
  return { place: w, xyz: '' }
}

// ── Цензура ──────────────────────────────────────────────────────────────────

// Режем текст на куски: обычный текст и плашки. Замазанные слова подряд,
// разделённые пробелами, — одна плашка, как будто прошлись маркером по строке.
export function censorSegments(text) {
  const out = []
  const re = /█+(?:[ \t]+█+)*/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ t: text.slice(last, m.index) })
    out.push({ t: m[0], bar: true })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ t: text.slice(last) })
  return out
}

// ── Сортировка и отбор ───────────────────────────────────────────────────────

const coll = new Intl.Collator('ru', { sensitivity: 'base', numeric: true })

export const SORTS = [
  { id: 'author', label: 'По автору' },
  { id: 'size', label: 'По объёму' },
  { id: 'title', label: 'По названию' },
]

// Ведущие «_» и точки в нике в сортировке не участвуют: «__Jeas__» стоит на J.
export const authorKey = (a) => a.replace(/^[^\p{L}\p{N}]+/u, '')

export function sortBooks(books, sort) {
  const arr = books.slice()
  const byTitle = (a, b) => coll.compare(a.title, b.title)
  if (sort === 'size') arr.sort((a, b) => b.chars - a.chars || byTitle(a, b))
  else if (sort === 'title') arr.sort((a, b) => (b.signed - a.signed) || byTitle(a, b))
  else arr.sort((a, b) => (!a.author - !b.author) || coll.compare(authorKey(a.author), authorKey(b.author)) || byTitle(a, b))
  return arr
}

export function filterBooks(books, { signedOnly, query }) {
  const q = query.trim().toLowerCase()
  return books.filter((b) =>
    (!signedOnly || b.signed) &&
    (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)))
}

// Подпись к странице полки: какие книги на ней стоят — «А — Г», «12 — 5 стр.».
export function rangeOf(slice, sort) {
  if (!slice.length) return ''
  const first = slice[0]
  const last = slice[slice.length - 1]
  if (sort === 'size') return `${first.pages.length} — ${last.pages.length} стр.`
  const key = (b) => (sort === 'title' ? (b.signed ? b.title : '') : b.author)
  // Первая буква или цифра: ники вроде «_RAT_GEL_» начинаются с подчёркивания.
  const ini = (b) => key(b).match(/[\p{L}\p{N}]/u)?.[0].toUpperCase() || 'без подписи'
  const a = ini(first)
  const z = ini(last)
  return a === z ? a : `${a} — ${z}`
}

export function plural(n, one, few, many) {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return many
  if (b > 1 && b < 5) return few
  if (b === 1) return one
  return many
}
