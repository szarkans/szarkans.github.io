// Собирает данные для Библиотеки и Городов в public/data/history/s<N>.json.
//
// Запуск: node scripts/build-history-data.mjs /home/szarkan/catcraft-audit/extract
//
// Источник лежит вне репозитория — это выгрузка из миров сезонов:
//   site/data_public.json  — книги (уже отцензурированные) и поселения;
//   out/<сезон>/players.jsonl, out/s1/players_s1.tsv — игроки: кровать и где вышли.
// Берётся ТОЛЬКО data_public.json. В data.json рядом лежат книги без цензуры,
// и если взять его, они окажутся на сайте.
//
// Что получается на выходе (один файл на сезон):
//   books   [{ id, t название, a автор, k "w" подписана | "q" с пером, p страницы,
//              c копий в мире, w где лежали, v другие подписи, r "all"|"part" если замазана }]
//   towns   [{ id для ссылки #id, g название | null, ok название подтверждено,
//              x, z, n жителей, p ники, b построенных блоков, s район спавна }]
//   players [{ n ник, bed [x,y,z] | null, out [x,y,z] | null, d измерение выхода }]

import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2]
if (!root) throw new Error('укажи папку выгрузки: node scripts/build-history-data.mjs <путь>')

const PLAYER_SOURCES = { s1: null, s3: 's3-map', s4: 's4', s5: 's5-4', s6: 's6', s7: 's7' }
const OUT_DIR = path.resolve(import.meta.dirname, '../public/data/history')

const TRANSLIT = Object.fromEntries([...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'].map((c, i) =>
  [c, 'a b v g d e e zh z i y k l m n o p r s t u f h c ch sh sch  y  e yu ya'.split(' ')[i] ?? '']))
const slug = s => [...s.toLowerCase()].map(c => TRANSLIT[c] ?? c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const round = v => v == null ? null : Math.round(v)

function readPlayers(sid) {
  if (sid === 's1') {
    const rows = fs.readFileSync(path.join(root, 'out/s1/players_s1.tsv'), 'utf8').trim().split('\n').slice(1)
    return rows.map(r => r.split('\t')).map(([n, d, out, spawn, what]) => ({
      n, d, out: out.split(' ').map(Number), bed: what === 'кровать' ? spawn.split(' ').map(Number) : null,
    }))
  }
  const file = path.join(root, 'out', PLAYER_SOURCES[sid], 'players.jsonl')
  return fs.readFileSync(file, 'utf8').trim().split('\n').map(l => JSON.parse(l))
    .filter(p => p.name || p.last_known_name)
    .map(p => ({
      n: p.last_known_name || p.name,
      d: p.dimension,
      out: p.pos?.map(round) ?? null,
      bed: p.spawn_block_is_bed ? [p.spawn.x, p.spawn.y, p.spawn.z] : null,
    }))
}

const seasons = JSON.parse(fs.readFileSync(path.join(root, 'site/data_public.json'), 'utf8'))
fs.mkdirSync(OUT_DIR, { recursive: true })
for (const season of seasons) {
  const usedIds = new Set()
  const towns = season.cities.map(c => {
    let id = c.g[0] ? slug(c.g[0]) : `x${c.x}z${c.z}`
    if (usedIds.has(id)) id += `-${c.x}`
    usedIds.add(id)
    return { id, g: c.g[0] ?? null, ok: c.ok, x: c.x, z: c.z, n: c.n, p: c.p, b: c.b, s: c.s }
  })
  const players = readPlayers(season.id).sort((a, b) => a.n.localeCompare(b.n))
  const out = { season: Number(season.id.slice(1)), books: season.books, towns, players }
  fs.writeFileSync(path.join(OUT_DIR, `${season.id}.json`), JSON.stringify(out))
  console.log(season.id, `книг ${season.books.length}, поселений ${towns.length}, игроков ${players.length}, с кроватью ${players.filter(p => p.bed).length}`)
}
