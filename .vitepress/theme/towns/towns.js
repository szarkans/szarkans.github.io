// Общая логика страниц «Города N сезона»: загрузка данных, подписи, команды телепорта.
// Данные собирает scripts/build-history-data.mjs, формат описан в его шапке.

import { fetchJson } from '../fetchJson.js'

const prepared = new Map()

export function loadSeason(n) {
  if (!prepared.has(n)) {
    const p = fetchJson(`/data/history/s${n}-towns.json`).then(prepare)
    p.catch(() => prepared.delete(n))
    prepared.set(n, p)
  }
  return prepared.get(n)
}

// 3–4 жителя без названия — чаще всего база компании друзей, а не город.
export const isSmall = t => t.n <= 4 && !t.g && !t.s

function prepare(data) {
  const towns = data.towns.map(t => ({ ...t, title: t.g || (t.s ? 'Район спавна' : null) }))
  towns.sort((a, b) => b.n - a.n || b.b - a.b)
  const byNick = new Map()
  for (const t of towns) for (const nick of t.p) {
    const k = nick.toLowerCase()
    if (!byNick.has(k)) byNick.set(k, [])
    byNick.get(k).push(t)
  }
  // В выгрузке один ник иногда встречается дважды — оставляем запись с кроватью.
  const playerByNick = new Map()
  for (const p of data.players) {
    const k = p.n.toLowerCase()
    if (!playerByNick.has(k) || (!playerByNick.get(k).bed && p.bed)) playerByNick.set(k, p)
  }
  return { towns, players: [...playerByNick.values()], byNick, playerByNick }
}

export const fmt = v => String(v).replace('-', '−')

// Высоты города в данных нет, а `~` оставляет текущую и может закопать под землю.
// spreadplayers сам ставит на верхний блок.
export const tpTown = t => `/spreadplayers ${t.x} ${t.z} 0 1 false @s`
export const tpBed = ([x, y, z]) => `/tp @s ${x} ${y + 1} ${z}`

// Город, где жил игрок: тот, в чьём списке жителей он есть; при нескольких — ближайший к кровати.
export function townOfPlayer(data, p) {
  const list = data.byNick.get(p.n.toLowerCase()) ?? []
  if (!list.length || !p.bed) return list[0] ?? null
  const dist = t => Math.hypot(t.x - p.bed[0], t.z - p.bed[2])
  return [...list].sort((a, b) => dist(a) - dist(b))[0]
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text })
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.append(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}
