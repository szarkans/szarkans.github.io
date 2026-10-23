<template>
  <div ref="box" class="tmap">
    <svg
      v-if="w"
      class="tmap__svg" :width="w" :height="h" :viewBox="`0 0 ${w} ${h}`"
      role="img" :aria-label="`Схема мира ${season} сезона`"
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

      <path class="spawn" :transform="`translate(${sx(0)} ${sy(0)})`" d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" />

      <g
        v-for="t in dots" :key="t.id" class="dot"
        :class="{ named: t.g, small: t.small, sel: t.id === selected, hov: t.id === hover }"
        :transform="`translate(${t.px} ${t.py})`"
      >
        <circle v-if="t.id === selected" class="ring" :r="t.r + 6" />
        <circle class="body" :r="t.r" />
      </g>

      <g v-if="bedAt" class="bed" :transform="`translate(${bedAt.x} ${bedAt.y})`">
        <rect x="-8" y="-5" width="16" height="9" rx="1" fill="#e04848" />
        <rect x="-8" y="-5" width="6" height="5" rx="1" fill="#f2eee8" />
      </g>

      <g class="labels" aria-hidden="true">
        <text
          v-for="l in labels" :key="l.id" :x="l.x" :y="l.y" :text-anchor="l.anchor"
          :class="{ sel: l.id === selected, spawnl: l.id === '·spawn' }"
        >{{ l.text }}</text>
      </g>
    </svg>
    <div v-else class="tmap__ph" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { isSmall } from './towns.js'

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

// Схема, а не карта: расстояние от спавна сжато степенью — плотный центр раскрывается,
// а один дальний город не сплющивает в точку все остальные. Направления сохраняются.
const P = .55
function proj(x, z) {
  const d = Math.hypot(x, z)
  const k = d ? d ** P / d : 0
  return [x * k, z * k]
}
const pts = computed(() => props.towns.map(t => proj(t.x, t.z)))
const bounds = computed(() => {
  const xs = pts.value.map(p => p[0]).concat(0), zs = pts.value.map(p => p[1]).concat(0)
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs)
  const px = (x1 - x0) * .08 + 15, pz = (z1 - z0) * .08 + 15
  return { x0: x0 - px, x1: x1 + px, z0: z0 - pz, z1: z1 + pz }
})
const scale = computed(() => {
  const { x0, x1, z0, z1 } = bounds.value
  const maxH = Math.min(560, Math.max(300, w.value * 1.05))
  return Math.min(w.value / (x1 - x0), maxH / (z1 - z0))
})
const h = computed(() => Math.round((bounds.value.z1 - bounds.value.z0) * scale.value))
// Карта по центру коробки, если по ширине осталось место.
const ox = computed(() => (w.value - (bounds.value.x1 - bounds.value.x0) * scale.value) / 2)
const sx = x => (x - bounds.value.x0) * scale.value + ox.value
const sy = z => (z - bounds.value.z0) * scale.value
const at = (x, z) => { const [px, pz] = proj(x, z); return [sx(px), sy(pz)] }

const maxN = computed(() => Math.max(...props.towns.map(t => t.n)))
const rMax = computed(() => w.value < 500 ? 9 : 15)
const dots = computed(() => props.towns.map(t => ({
  ...t,
  px: at(t.x, t.z)[0], py: at(t.x, t.z)[1], small: isSmall(t),
  r: isSmall(t) ? 2.5 : 3.5 + Math.sqrt(t.n / maxN.value) * (rMax.value - 3.5),
})).sort((a, b) => b.r - a.r))

const bedAt = computed(() => props.bed && { x: at(props.bed[0], props.bed[2])[0], y: at(props.bed[0], props.bed[2])[1] })

// Подписи только у названных поселений и у выбранного; не влезает без наложения — не рисуем.
const CHAR = 6.8, LH = 14
const labels = computed(() => {
  // Мешают другие подписи и заметные точки; мелкие под подписью видны сквозь обводку.
  const boxes = dots.value.filter(d => d.title || d.id === props.selected || d.r >= 6)
    .map(d => ({ x0: d.px - d.r, x1: d.px + d.r, y0: d.py - d.r, y1: d.py + d.r, id: d.id }))
  const placed = []
  const free = (b, own) => b.x0 >= 2 && b.x1 <= w.value - 2 && b.y0 >= 2 && b.y1 <= h.value - 2 &&
    !placed.some(p => p.x0 < b.x1 && b.x0 < p.x1 && p.y0 < b.y1 && b.y0 < p.y1) &&
    !boxes.some(p => p.id !== own && p.x0 < b.x1 && b.x0 < p.x1 && p.y0 < b.y1 && b.y0 < p.y1)
  const sel = dots.value.find(d => d.id === props.selected)
  const want = [
    ...(sel?.title ? [sel] : []),
    ...dots.value.filter(d => d.title && d.id !== props.selected).sort((a, b) => b.n - a.n),
    ...(props.towns.some(t => t.s) ? [] : [{ id: '·spawn', title: 'спавн', px: sx(0), py: sy(0), r: 6 }]),
  ]
  const out = []
  for (const d of want) {
    const tw = d.title.length * CHAR + 4
    const tries = [
      { anchor: 'start', x: d.px + d.r + 5, y: d.py + 4 },
      { anchor: 'end', x: d.px - d.r - 5, y: d.py + 4 },
      { anchor: 'middle', x: d.px, y: d.py - d.r - 6 },
      { anchor: 'middle', x: d.px, y: d.py + d.r + 14 },
    ]
    for (const t of tries) {
      const x0 = t.anchor === 'start' ? t.x : t.anchor === 'end' ? t.x - tw : t.x - tw / 2
      const b = { x0, x1: x0 + tw, y0: t.y - LH + 3, y1: t.y + 3 }
      if (free(b, d.id) || (d.id === props.selected && t === tries.at(-1))) {
        placed.push(b)
        out.push({ id: d.id, text: d.title, ...t })
        break
      }
    }
  }
  return out
})

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

.spawn { fill: #e8a0bf; }

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
.labels text.sel { fill: #fff; }
.labels text.spawnl { fill: #e8a0bf; font-weight: 500; font-size: 11px; }
</style>
