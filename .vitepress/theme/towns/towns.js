// Общая логика страниц «Города N сезона»: загрузка данных, подписи, команды телепорта.
// Данные собирает scripts/build-history-data.mjs, формат описан в его шапке.

const cache = new Map()

export function loadSeason(n) {
  if (!cache.has(n)) {
    cache.set(n, fetch(`/data/history/s${n}.json`).then(r => {
      if (!r.ok) throw new Error(`s${n}.json: HTTP ${r.status}`)
      return r.json()
    }).then(prepare).catch(e => { cache.delete(n); throw e }))
  }
  return cache.get(n)
}

// 3–4 жителя без названия — чаще всего база компании друзей, а не город.
export const isSharedBase = t => t.n <= 4 && !t.g && !t.s

function prepare(data) {
  const towns = data.towns.map(t => ({ ...t, title: titleOf(t), where: whereOf(t.x, t.z) }))
  towns.sort((a, b) => b.n - a.n || b.b - a.b)
  const byNick = new Map()
  for (const t of towns) for (const nick of t.p) {
    const k = nick.toLowerCase()
    if (!byNick.has(k)) byNick.set(k, [])
    byNick.get(k).push(t)
  }
  const players = data.players
  const playerByNick = new Map(players.map(p => [p.n.toLowerCase(), p]))
  return { season: data.season, towns, players, byNick, playerByNick }
}

function titleOf(t) {
  if (t.g) return t.g
  if (t.s) return 'Район спавна'
  if (isSharedBase(t)) return listNicks(t.p)
  return `Поселение у ${fmt(t.x)}, ${fmt(t.z)}`
}

const listNicks = p => p.length > 1 ? `${p.slice(0, -1).join(', ')} и ${p.at(-1)}` : p[0]

export const fmt = v => String(v).replace('-', '−')
export const fmtInt = v => v.toLocaleString('ru-RU')

const DIRS = ['востоку', 'юго-востоку', 'югу', 'юго-западу', 'западу', 'северо-западу', 'северу', 'северо-востоку']

// В Minecraft север — это −Z, восток — +X.
export function whereOf(x, z) {
  const d = Math.hypot(x, z)
  if (d < 300) return 'прямо у спавна'
  const i = Math.round(Math.atan2(z, x) / (Math.PI / 4))
  const dir = DIRS[(i + 8) % 8]
  const dist = d < 1000 ? `${Math.round(d / 50) * 50} блоков` : `${(d / 1000).toFixed(1).replace('.', ',')} км`
  return `${dist} к ${dir} от спавна`
}

// Без высоты: ~ оставляет текущую. Подходит для ванильного мира с читами.
export const tpTown = t => `/tp @s ${t.x} ~ ${t.z}`

const DIM_IDS = { overworld: null, NORMAL: null, nether: 'minecraft:the_nether', end: 'minecraft:the_end' }
export const DIM_NAMES = { overworld: 'верхний мир', NORMAL: 'верхний мир', nether: 'незер', end: 'энд' }

export function tpPoint([x, y, z], dim = 'overworld') {
  const tp = `tp @s ${x} ${y + 1} ${z}`
  const id = DIM_IDS[dim]
  return id ? `/execute in ${id} run ${tp}` : `/${tp}`
}
export const isRealDim = d => d in DIM_IDS

// Город, где жил игрок: тот, в чьём списке жителей он есть; при нескольких — ближайший к кровати.
export function townOfPlayer(data, p) {
  const list = data.byNick.get(p.n.toLowerCase()) ?? []
  if (!list.length) return null
  if (!p.bed) return list[0]
  const dist = t => Math.hypot(t.x - p.bed[0], t.z - p.bed[2])
  const best = [...list].sort((a, b) => dist(a) - dist(b))[0]
  // Кровать дальше ~150 блоков от центра — числится жителем, но спал отдельно.
  return { ...best, far: dist(best) > 200 }
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
