// Собирает данные для Библиотеки и Городов в public/data/history/s<N>-books.json и s<N>-towns.json.
//
// Запуск: node scripts/build-history-data.mjs /home/szarkan/catcraft-audit/extract
//
// Источник лежит вне репозитория — это выгрузка из миров сезонов:
//   site/data_public.json  — книги (уже отцензурированные) и поселения;
//   out/<сезон>/players.jsonl, out/s1/players_s1.tsv — игроки и их кровати.
// Берётся ТОЛЬКО data_public.json. В data.json рядом лежат книги без цензуры,
// и если взять его, они окажутся на сайте.
//
// Что получается на выходе (два файла на сезон, Библиотеке не нужны города, Городам — книги):
//   s<N>-books.json  { season, books [{ id, t название, a автор, k "w" подписана | "q" с пером,
//                      p страницы (уже без цветовых тегов и JSON-кавычек), c копий в мире,
//                      w где лежали, v другие подписи, r "all"|"part" если замазана }] }
//   s<N>-towns.json  { season,
//                      towns   [{ id для ссылки #id, g название | null, ok название подтверждено,
//                                 x, z, n жителей, p ники, b построенных блоков, s район спавна }],
//                      players [{ n ник, bed [x,y,z] | null }] }

import fs from 'node:fs'
import path from 'node:path'
import { HIDDEN_BOOKS } from './history-hidden.mjs'
import { fileURLToPath } from 'node:url'

const root = process.argv[2]
if (!root) throw new Error('укажи папку выгрузки: node scripts/build-history-data.mjs <путь>')

const PLAYER_SOURCES = { s1: null, s3: 's3-map', s4: 's4', s5: 's5-4', s6: 's6', s7: 's7' }
const OUT_DIR = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../public/data/history')

const TRANSLIT = Object.fromEntries([...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'].map((c, i) =>
  [c, 'a b v g d e e zh z i y k l m n o p r s t u f h c ch sh sch  y  e yu ya'.split(' ')[i] ?? '']))
const slug = s => [...s.toLowerCase()].map(c => TRANSLIT[c] ?? c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const lines = text => text.split(/\r?\n/).filter(l => l.trim())

function readPlayers(sid) {
  if (sid === 's1') {
    const rows = lines(fs.readFileSync(path.join(root, 'out/s1/players_s1.tsv'), 'utf8')).slice(1)
    return rows.map(r => r.split('\t')).map(([n, , , spawn, what]) => ({
      n, bed: what === 'кровать' ? spawn.split(' ').map(Number) : null,
    }))
  }
  const file = path.join(root, 'out', PLAYER_SOURCES[sid], 'players.jsonl')
  return lines(fs.readFileSync(file, 'utf8')).map(l => JSON.parse(l))
    .filter(p => p.name || p.last_known_name)
    .map(p => ({
      n: p.last_known_name || p.name,
      bed: p.spawn_block_is_bed ? [p.spawn.x, p.spawn.y, p.spawn.z] : null,
    }))
}

// Цветовые теги плагина вида <#F0F119> в названиях и тексте — мусор для читателя.
const untag = s => s.replace(/<#[0-9a-f]{6}>/gi, '')

// Страница в мире хранится как JSON-строка текстового компонента. Чаще всего её уже
// развернули, но часть осталась в кавычках: `""` — пустая, `"Глава 1…"` — обычный текст.
// Разворачиваем, только если страница целиком — JSON-строка: `"Привет", — сказал он, "пока"`
// ею не является и остаётся как есть.
function unquote(p) {
  if (p.length < 2 || p[0] !== '"' || p.at(-1) !== '"') return p
  try {
    // Переводы строк внутри такой страницы часто живые, а JSON их не принимает.
    const v = JSON.parse(p.replace(/[\n\r\t]/g, c => ({ '\n': '\\n', '\r': '\\r', '\t': '\\t' })[c]))
    return typeof v === 'string' ? v : p
  } catch {
    return p
  }
}

const seasons = JSON.parse(fs.readFileSync(path.join(root, 'site/data_public.json'), 'utf8'))
fs.mkdirSync(OUT_DIR, { recursive: true })
for (const season of seasons) {
  const usedIds = new Set()
  // Догадка по табличкам часто повторяет имя настоящего города по соседству —
  // тогда на карте два «Фыркамска», и ссылка из статьи попадает не туда.
  const confirmed = new Set(season.cities.filter(c => c.ok).map(c => c.g[0]))
  const towns = season.cities.map(c => ({ ...c, g: !c.ok && confirmed.has(c.g[0]) ? [] : c.g }))
    .sort((a, b) => b.ok - a.ok)
    .map(c => {
      // Название из одних знаков даёт пустой slug — тогда id по координатам.
      const base = (c.g[0] && slug(c.g[0])) || `x${c.x}z${c.z}`
      // На повторе — сначала `-x` (такие ссылки уже есть в статьях), потом счётчик.
      let id = usedIds.has(base) ? `${base}-${c.x}` : base
      for (let i = 2; usedIds.has(id); i++) id = `${base}-${c.x}-${i}`
      usedIds.add(id)
      return { id, g: c.g[0] ?? null, ok: c.ok, x: c.x, z: c.z, n: c.n, p: c.p, b: c.b, s: c.s }
    })
  const players = readPlayers(season.id).sort((a, b) => a.n.localeCompare(b.n))
  // Книги с пером в одну-две буквы («j», «у») — случайные клики, не книги.
  const books = season.books
    // Авторов не показываем: ни подписи, ни переподписей, ни ника в «у игрока Ник (…)».
    .map(({ a, v, ...b }) => ({
      ...b, t: untag(b.t), p: b.p.map(p => unquote(untag(p))),
      w: b.w.map(w => w.replace(/^у игрока .+? \(/, 'у игрока (')),
    }))
    .filter(b => !(b.id in HIDDEN_BOOKS))
    .filter(b => b.k === 'w' || b.p.join('').replace(/\s/g, '').length > 2)
  const n = Number(season.id.slice(1))
  fs.writeFileSync(path.join(OUT_DIR, `${season.id}-books.json`), JSON.stringify({ season: n, books }))
  fs.writeFileSync(path.join(OUT_DIR, `${season.id}-towns.json`), JSON.stringify({ season: n, towns, players }))
  fs.rmSync(path.join(OUT_DIR, `${season.id}.json`), { force: true })
  console.log(season.id, `книг ${books.length}, поселений ${towns.length}, игроков ${players.length}, с кроватью ${players.filter(p => p.bed).length}`)
}
