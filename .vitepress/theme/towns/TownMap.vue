<template>
  <div ref="box" class="tmap">
    <svg
      v-if="w"
      class="tmap__svg" :width="w" :height="h" :viewBox="`0 0 ${w} ${h}`"
      role="group" :aria-label="`Схема мира ${season} сезона`"
      @click="tap" @pointermove="hoverAt" @pointerleave="hover = null"
    >
      <defs>
        <pattern :id="`tmap-dots-${season}`" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" fill="rgba(255,255,255,.06)" />
        </pattern>
        <radialGradient :id="`tmap-glow-${season}`">
          <stop offset="0" stop-color="#4f2dbe" stop-opacity=".22" />
          <stop offset="1" stop-color="#4f2dbe" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect :width="w" :height="h" fill="#0e0b15" />
      <rect :width="w" :height="h" :fill="`url(#tmap-dots-${season})`" />
      <circle :cx="sx(0)" :cy="sy(0)" :r="Math.max(w, h) * .45" :fill="`url(#tmap-glow-${season})`" />

      <g class="grid" aria-hidden="true">
        <template v-for="t in ticksX" :key="'x' + t.v">
          <line :x1="t.p" :x2="t.p" :y1="T" :y2="h" />
          <text :x="t.p" :y="T - 6" text-anchor="middle">{{ t.label }}</text>
        </template>
        <template v-for="t in ticksZ" :key="'z' + t.v">
          <line :x1="ox" :x2="right" :y1="t.p" :y2="t.p" />
          <text :x="ox - 5" :y="t.p + 4" text-anchor="end">{{ t.label }}</text>
        </template>
        <text :x="right - 2" :y="T - 6" text-anchor="end" class="axis">X</text>
        <text :x="ox - 5" :y="h - 6" text-anchor="end" class="axis">Z</text>
      </g>

      <path class="spawn" :transform="`translate(${sx(0)} ${sy(0)})`" d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" />

      <g
        v-for="t in dots" :key="t.id" class="dot"
        :class="{ named: t.g, small: t.small, sel: t.id === selected, hov: t.id === hover }"
        :transform="`translate(${t.px} ${t.py})`"
        tabindex="0" :aria-label="`${t.title || 'Без названия'}: ${fmt(t.x)}, ${fmt(t.z)}`"
        @focus="focused = t.id" @blur="focused = null" @keydown.enter.prevent="emit('select', t.id)"
      >
        <circle v-if="t.id === selected" class="ring" :r="t.r + 6" />
        <circle class="body" :r="t.r" />
      </g>

      <g v-if="bedAt" class="bed" :transform="`translate(${bedAt.x} ${bedAt.y})`">
        <rect x="-8" y="-5" width="16" height="9" rx="1" fill="#e04848" />
        <rect x="-8" y="-5" width="6" height="5" rx="1" fill="#f2eee8" />
      </g>

      <g class="labels" aria-hidden="true">
        <text v-for="g in tags" :key="'t' + g.id" :x="g.x" :y="g.y" :text-anchor="g.anchor" class="tag">
          <tspan v-if="g.title" :x="g.x" class="tag__name">{{ g.title }}</tspan>
          <tspan :x="g.x" :dy="g.title ? LH : 0">{{ g.xz }}</tspan>
        </text>
        <text
          v-for="l in labels" :key="l.id" :x="l.x" :y="l.y" :text-anchor="l.anchor"
          :class="{ spawnl: l.id === '·spawn' }"
        >{{ l.text }}</text>
      </g>
    </svg>
    <div v-else class="tmap__ph" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { isSmall, fmt } from './towns.js'

const props = defineProps({
  towns: { type: Array, required: true },
  season: { type: Number, required: true },
  selected: { type: String, default: null },
  bed: { type: Array, default: null },
})
const emit = defineEmits(['select'])

const box = ref(null)
const w = ref(0)
const hover = ref(null)
const focused = ref(null)

// Схема, а не карта: каждая ось сжата степенью — плотный центр раскрывается, а один дальний
// город не сплющивает в точку все остальные. Оси сжаты по отдельности, поэтому прямая X = const
// остаётся вертикальной и шкала по краям честная.
const P = .55
const f = v => Math.sign(v) * Math.abs(v) ** P
// Поля под шкалу: сверху X, слева Z.
const T = 20
const L = computed(() => w.value < 500 ? 34 : 40)

const bounds = computed(() => {
  const xs = props.towns.map(t => f(t.x)).concat(0), zs = props.towns.map(t => f(t.z)).concat(0)
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs)
  const px = (x1 - x0) * .05 + 6, pz = (z1 - z0) * .05 + 6
  return { x0: x0 - px, x1: x1 + px, z0: z0 - pz, z1: z1 + pz }
})
const scale = computed(() => {
  const { x0, x1, z0, z1 } = bounds.value
  const maxH = Math.min(560, Math.max(300, w.value * 1.05))
  return Math.min((w.value - L.value) / (x1 - x0), maxH / (z1 - z0))
})
const h = computed(() => Math.round((bounds.value.z1 - bounds.value.z0) * scale.value) + T)
const ox = computed(() => L.value + (w.value - L.value - (bounds.value.x1 - bounds.value.x0) * scale.value) / 2)
const right = computed(() => ox.value + (bounds.value.x1 - bounds.value.x0) * scale.value)
const sx = x => (f(x) - bounds.value.x0) * scale.value + ox.value
const sy = z => (f(z) - bounds.value.z0) * scale.value + T

// Деления в блоках, на своих настоящих местах; ставим от нуля наружу, пока не теснят друг друга.
const NICE = [100, 250, 500, 1000, 2000, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000]
const tickLabel = v => (Math.abs(v) >= 1000 ? `${v / 1000}к` : String(v)).replace('-', '−')
function ticks(pos, lo, hi, gap) {
  const out = [{ v: 0, p: pos(0) }]
  for (const sign of [1, -1]) {
    let last = pos(0)
    for (const n of NICE) {
      const p = pos(sign * n)
      if (p < lo || p > hi) break
      if (Math.abs(p - last) >= gap) { out.push({ v: sign * n, p }); last = p }
    }
  }
  return out.map(t => ({ ...t, label: tickLabel(t.v) }))
}
const ticksX = computed(() => ticks(sx, ox.value + 14, right.value - 18, w.value < 500 ? 36 : 44))
const ticksZ = computed(() => ticks(sy, T + 8, h.value - 22, 26))

const maxN = computed(() => Math.max(...props.towns.map(t => t.n)))
const rMax = computed(() => w.value < 500 ? 9 : 15)
const dots = computed(() => props.towns.map(t => ({
  ...t,
  px: sx(t.x), py: sy(t.z), small: isSmall(t),
  r: isSmall(t) ? 2.5 : 3.5 + Math.sqrt(t.n / maxN.value) * (rMax.value - 3.5),
})).sort((a, b) => b.r - a.r))

const bedAt = computed(() => props.bed && { x: sx(props.bed[0]), y: sy(props.bed[2]) })

// Подписи только у названных поселений; у наведённой и выбранной точки — название и X, Z.
// Не влезает без наложения — не рисуем (кроме активных точек).
const CHAR = 6.8, LH = 14
const rect = (anchor, x, y, tw, lines) => {
  const x0 = anchor === 'start' ? x : anchor === 'end' ? x - tw : x - tw / 2
  return { x0, x1: x0 + tw, y0: y - LH + 3, y1: y + 3 + (lines - 1) * LH }
}
const tries = (d, lines) => [
  { anchor: 'start', x: d.px + d.r + 5, y: d.py + 4 - (lines - 1) * LH / 2 },
  { anchor: 'end', x: d.px - d.r - 5, y: d.py + 4 - (lines - 1) * LH / 2 },
  { anchor: 'middle', x: d.px, y: d.py - d.r - 6 - (lines - 1) * LH },
  { anchor: 'middle', x: d.px, y: d.py + d.r + 14 },
]
const inside = b => b.x0 >= L.value + 2 && b.x1 <= w.value - 2 && b.y0 >= T + 2 && b.y1 <= h.value - 2
const hits = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

const active = computed(() => [...new Set([hover.value, focused.value, props.selected].filter(Boolean))]
  .map(id => dots.value.find(d => d.id === id)).filter(Boolean))

const layout = computed(() => {
  const obstacles = dots.value.filter(d => d.title || d.r >= 6)
    .map(d => ({ x0: d.px - d.r, x1: d.px + d.r, y0: d.py - d.r, y1: d.py + d.r, id: d.id }))
  const placed = []
  const tags = []
  for (const d of active.value) {
    const xz = `${fmt(d.x)}, ${fmt(d.z)}`
    const lines = d.title ? 2 : 1
    const tw = Math.max(xz.length, d.title?.length ?? 0) * CHAR + 4
    const opts = tries(d, lines).map(t => ({ ...t, b: rect(t.anchor, t.x, t.y, tw, lines) }))
    const t = opts.find(o => inside(o.b) && !placed.some(p => hits(p, o.b))) ??
      opts.find(o => inside(o.b)) ?? opts[0]
    placed.push(t.b)
    tags.push({ id: d.id, title: d.title, xz, anchor: t.anchor, x: t.x, y: t.y })
  }
  const activeIds = new Set(active.value.map(d => d.id))
  const free = (b, own) => inside(b) && !placed.some(p => hits(p, b)) &&
    !obstacles.some(p => p.id !== own && hits(p, b))
  const want = [
    ...dots.value.filter(d => d.title && !activeIds.has(d.id)).sort((a, b) => b.n - a.n),
    ...(props.towns.some(t => t.s) ? [] : [{ id: '·spawn', title: 'спавн', px: sx(0), py: sy(0), r: 6 }]),
  ]
  const labels = []
  for (const d of want) {
    const tw = d.title.length * CHAR + 4
    for (const t of tries(d, 1)) {
      const b = rect(t.anchor, t.x, t.y, tw, 1)
      if (free(b, d.id)) {
        placed.push(b)
        labels.push({ id: d.id, text: d.title, ...t })
        break
      }
    }
  }
  return { tags, labels }
})
const tags = computed(() => layout.value.tags)
const labels = computed(() => layout.value.labels)

// Палец толще точки: берём ближайшую в радиусе 28px.
function nearest(e) {
  const r = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - r.left, y = e.clientY - r.top
  let best = null, bd = 28
  for (const d of dots.value) {
    const dist = Math.hypot(d.px - x, d.py - y) - d.r
    if (dist < bd) { bd = dist; best = d }
  }
  return best
}
function tap(e) { const d = nearest(e); if (d) emit('select', d.id) }
function hoverAt(e) { if (e.pointerType === 'mouse') hover.value = nearest(e)?.id ?? null }

let ro
onMounted(() => {
  const measure = () => { w.value = Math.floor(box.value.clientWidth) }
  measure()
  ro = new ResizeObserver(measure)
  ro.observe(box.value)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<style scoped>
.tmap { min-width: 0; }
.tmap__svg { display: block; border-radius: 16px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; }
.tmap__ph { height: 340px; border-radius: 16px; background: #0e0b15; }

.grid line { stroke: rgba(255,255,255,.05); stroke-width: 1; shape-rendering: crispEdges; }
.grid text { fill: #6f6888; font: 10.5px 'Rubik', sans-serif; font-variant-numeric: tabular-nums; }
.grid text.axis { fill: #9a94ab; font-weight: 600; }

.spawn { fill: #e8a0bf; }
.dot { outline: none; }
.dot:focus-visible .body { stroke: #bd96ff; stroke-width: 2.5; fill-opacity: 1; }

.dot .body { fill: #8b5ee8; fill-opacity: .75; stroke: #0e0b15; stroke-width: 1.5; transition: fill-opacity .15s; }
.dot.small .body { fill: #8f87a3; fill-opacity: .45; stroke-width: 1; }
.dot.named .body { fill: #f5c451; fill-opacity: 1; }
.dot.hov .body { fill-opacity: 1; stroke: #fff; }
.dot.sel .body { fill-opacity: 1; stroke: #fff; stroke-width: 2; }
.dot .ring { fill: none; stroke: rgba(255,255,255,.55); stroke-width: 1.5; }

.labels text {
  fill: #ece9f5; font: 600 12px 'Rubik', sans-serif; pointer-events: none;
  paint-order: stroke; stroke: #0e0b15; stroke-width: 4px; stroke-linejoin: round;
}
.labels text.tag { fill: #fff; font-weight: 500; font-variant-numeric: tabular-nums; }
.labels .tag__name { font-weight: 600; }
.labels text.spawnl { fill: #e8a0bf; font-weight: 500; font-size: 11px; }
</style>
