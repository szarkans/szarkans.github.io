<template>
  <div ref="box" class="tmap">

    <svg
      v-if="w"
      class="tmap__svg" :class="{ panning: zoom > 1, dragging }"
      :width="w" :height="h" :viewBox="`0 0 ${w} ${h}`"
      role="group" :aria-label="`Схема мира ${season} сезона: ${towns.length} поселений`"
      @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up"
    >
      <defs>
        <pattern id="tmap-dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" fill="rgba(255,255,255,.05)" />
        </pattern>
      </defs>
      <rect :width="w" :height="h" fill="#100d17" />
      <rect :width="w" :height="h" fill="url(#tmap-dots)" />

      <g class="grid">
        <template v-for="t in ticksX" :key="'x' + t">
          <line :x1="sx(t)" :x2="sx(t)" y1="0" :y2="h" :class="{ zero: t === 0 }" />
          <text :x="sx(t) + 4" y="14">{{ tickLabel(t) }}</text>
        </template>
        <template v-for="t in ticksZ" :key="'z' + t">
          <line x1="0" :x2="w" :y1="sy(t)" :y2="sy(t)" :class="{ zero: t === 0 }" />
          <text x="4" :y="sy(t) - 4">{{ tickLabel(t) }}</text>
        </template>
        <text :x="w - 8" :y="h - 8" text-anchor="end" class="axis">X → восток · Z ↓ юг</text>
      </g>

      <g class="spawn" :transform="`translate(${sx(0)} ${sy(0)})`" aria-hidden="true">
        <path d="M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5 Z" />
      </g>

      <g
        v-for="t in drawn" :key="t.id" class="dot" :class="[t.cls, { sel: t.id === selected, hov: t.id === hover }]"
        :transform="`translate(${sx(t.x)} ${sy(t.z)})`"
        role="button" tabindex="0" :aria-label="`${t.title}, жителей ${t.n}`" :aria-pressed="t.id === selected"
        @click="pick(t.id)" @keydown.enter.prevent="pick(t.id)" @keydown.space.prevent="pick(t.id)"
        @pointerenter="hover = t.id" @pointerleave="hover = null" @focus="hover = t.id" @blur="hover = null"
      >
        <circle class="hit" :r="Math.max(t.r + 6, 12)" />
        <circle class="ring" :r="t.r + 5" />
        <circle class="body" :r="t.r" />
      </g>

      <g v-if="bed" class="bed" :transform="`translate(${sx(bed.x)} ${sy(bed.z)})`" aria-hidden="true">
        <rect x="-9" y="-6" width="18" height="10" fill="#c22b2b" />
        <rect x="-9" y="-6" width="7" height="5" fill="#eee" />
        <rect x="-9" y="4" width="2" height="3" fill="#6b4a25" /><rect x="7" y="4" width="2" height="3" fill="#6b4a25" />
        <text y="-11" text-anchor="middle">кровать {{ bed.nick }}</text>
      </g>

      <g class="labels" aria-hidden="true">
        <text :x="sx(0)" :y="sy(0) - 12" text-anchor="middle" class="spawnl">спавн</text>
        <text
          v-for="t in labelled" :key="'l' + t.id" :x="sx(t.x) + t.r + 6" :y="sy(t.z) + 4"
          :class="{ strong: t.id === hover || t.id === selected }"
        >{{ t.title }}</text>
      </g>
    </svg>
    <div v-else class="tmap__ph" />
    <div class="tmap__tools" role="group" aria-label="Масштаб карты">
      <button type="button" :disabled="zoom >= 32" aria-label="Приблизить" @click="zoomBy(2)">+</button>
      <button type="button" :disabled="zoom <= 1" aria-label="Отдалить" @click="zoomBy(.5)">−</button>
      <button type="button" class="wide" :disabled="zoom === 1 && cx === home.cx && cz === home.cz" @click="reset">весь мир</button>
      <button type="button" class="wide" @click="toSpawn">к спавну</button>
      <span v-if="zoom > 1" class="hint">карту можно двигать</span>
    </div>

    <ul class="tmap__legend" aria-label="Легенда">
      <li><i class="lg named" />название подтверждено</li>
      <li><i class="lg guess" />название — догадка</li>
      <li><i class="lg town" />без названия</li>
      <li><i class="lg base" />общая база</li>
      <li><i class="lg spawnl" />район спавна</li>
      <li>размер точки — сколько построено</li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { isSharedBase } from './towns.js'

const props = defineProps({
  towns: { type: Array, required: true },
  season: { type: Number, required: true },
  selected: { type: String, default: null },
  bed: { type: Object, default: null },
})
const emit = defineEmits(['select'])

const box = ref(null)
const w = ref(0)
const hover = ref(null)
const zoom = ref(1)
const dragging = ref(false)

const bounds = computed(() => {
  const xs = props.towns.map(t => t.x).concat(0), zs = props.towns.map(t => t.z).concat(0)
  let x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs)
  const px = (x1 - x0) * .07 + 200, pz = (z1 - z0) * .07 + 200
  return { x0: x0 - px, x1: x1 + px, z0: z0 - pz, z1: z1 + pz }
})
const home = computed(() => ({ cx: (bounds.value.x0 + bounds.value.x1) / 2, cz: (bounds.value.z0 + bounds.value.z1) / 2 }))
const cx = ref(0), cz = ref(0)
watch(home, v => { cx.value = v.cx; cz.value = v.cz }, { immediate: true })

const base = computed(() => {
  const { x0, x1, z0, z1 } = bounds.value
  const maxH = Math.min(680, Math.max(320, w.value * 1.1))
  return Math.min(w.value / (x1 - x0), maxH / (z1 - z0))
})
const h = computed(() => Math.round((bounds.value.z1 - bounds.value.z0) * base.value))
const scale = computed(() => base.value * zoom.value)
const sx = x => (x - cx.value) * scale.value + w.value / 2
const sy = z => (z - cz.value) * scale.value + h.value / 2

const STEPS = [50, 100, 250, 500, 1000, 2000, 2500, 5000, 10000]
const step = computed(() => STEPS.find(s => s * scale.value >= 64) ?? 10000)
function ticks(lo, hi) {
  const s = step.value, out = []
  for (let v = Math.ceil(lo / s) * s; v <= hi; v += s) out.push(v)
  return out
}
const view = computed(() => {
  const hw = w.value / 2 / scale.value, hh = h.value / 2 / scale.value
  return { x0: cx.value - hw, x1: cx.value + hw, z0: cz.value - hh, z1: cz.value + hh }
})
const ticksX = computed(() => ticks(view.value.x0, view.value.x1))
const ticksZ = computed(() => ticks(view.value.z0, view.value.z1))
const tickLabel = v => v === 0 ? '0' : (Math.abs(v) >= 1000 && v % 1000 === 0 ? `${v / 1000}к` : String(v)).replace('-', '−')

const maxB = computed(() => Math.max(...props.towns.map(t => t.b)))
const drawn = computed(() => props.towns.map(t => ({
  ...t,
  r: 2.5 + Math.sqrt(t.b / maxB.value) * Math.min(15, Math.max(6, w.value / 55)) * Math.sqrt(zoom.value) ** .5,
  cls: t.s ? 'spawnd' : t.g ? (t.ok ? 'named' : 'guess') : isSharedBase(t) ? 'base' : 'town',
})).sort((a, b) => b.r - a.r))

// Подписи: названные и спавн всегда, при приближении — и остальные города; плюс наведённая точка.
const labelled = computed(() => drawn.value.filter(t =>
  t.g || t.s || t.id === hover.value || t.id === props.selected || (zoom.value >= 4 && !isSharedBase(t)) || zoom.value >= 8))

function pick(id) { emit('select', id) }

function clampCenter() {
  const { x0, x1, z0, z1 } = bounds.value
  cx.value = Math.min(x1, Math.max(x0, cx.value))
  cz.value = Math.min(z1, Math.max(z0, cz.value))
}
function zoomBy(f) {
  zoom.value = Math.min(32, Math.max(1, zoom.value * f))
  if (zoom.value === 1) reset()
}
function reset() { zoom.value = 1; cx.value = home.value.cx; cz.value = home.value.cz }
function toSpawn() { zoom.value = Math.max(zoom.value, 8); cx.value = 0; cz.value = 0 }

watch(() => props.bed, b => {
  if (!b) return
  const v = view.value
  if (b.x < v.x0 || b.x > v.x1 || b.z < v.z0 || b.z > v.z1) { cx.value = b.x; cz.value = b.z }
})

let start = null
function down(e) {
  if (zoom.value <= 1 || e.button !== 0) return
  start = { x: e.clientX, y: e.clientY, cx: cx.value, cz: cz.value, id: e.pointerId, moved: false }
}
function move(e) {
  if (!start || e.pointerId !== start.id) return
  const dx = e.clientX - start.x, dy = e.clientY - start.y
  if (!start.moved && Math.hypot(dx, dy) < 5) return
  if (!start.moved) { start.moved = true; dragging.value = true; e.currentTarget.setPointerCapture(e.pointerId) }
  cx.value = start.cx - dx / scale.value
  cz.value = start.cz - dy / scale.value
  clampCenter()
}
function up() { start = null; setTimeout(() => { dragging.value = false }) }

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
.tmap { position: relative; min-width: 0; }
.tmap__svg { display: block; overflow: hidden; border: 1px solid rgba(255,255,255,.1); border-radius: 14px; user-select: none; touch-action: pan-y; }
.tmap__svg.panning { cursor: grab; touch-action: none; }
.tmap__svg.dragging { cursor: grabbing; }
.tmap__ph { height: 360px; border-radius: 14px; background: #100d17; }

.grid line { stroke: rgba(255,255,255,.07); stroke-width: 1; shape-rendering: crispEdges; }
.grid line.zero { stroke: rgba(166,124,245,.35); stroke-dasharray: 4 4; }
.grid text { fill: #605a72; font: 10.5px 'Rubik', sans-serif; }
.grid text.axis { fill: #8f87a3; font-size: 11px; }

.spawn path { fill: #e8a0bf; filter: drop-shadow(0 0 6px rgba(232,160,191,.8)); }
.spawn text, .bed text { fill: #e8a0bf; font: 600 11px 'Rubik', sans-serif; paint-order: stroke; stroke: #100d17; stroke-width: 3px; }
.bed text { fill: #ff8a8a; }

.dot { cursor: pointer; outline: none; }
.dot .hit { fill: transparent; }
.dot .body { stroke: #100d17; stroke-width: 1.5; transition: transform .15s; }
.dot .ring { fill: none; stroke: transparent; stroke-width: 2; }
.dot.named .body { fill: #f5c451; }
.dot.guess .body { fill: #f5a623; fill-opacity: .55; stroke: #f5a623; stroke-dasharray: 3 2; }
.dot.town .body { fill: #a67cf5; fill-opacity: .85; }
.dot.base .body { fill: #9a94ab; fill-opacity: .7; }
.dot.spawnd .body { fill: #e8a0bf; }
.dot.hov .body { transform: scale(1.18); }
.dot.hov .ring, .dot:focus-visible .ring { stroke: rgba(255,255,255,.6); }
.dot.sel .ring { stroke: #fff; stroke-width: 2.5; animation: ping 1.6s ease-out infinite; transform-origin: 0 0; transform-box: fill-box; }
@keyframes ping { 0% { stroke-opacity: 1; } 100% { stroke-opacity: .25; } }

.labels text {
  fill: #e8e7f0; font: 500 11.5px 'Rubik', sans-serif; pointer-events: none;
  paint-order: stroke; stroke: #100d17; stroke-width: 3.5px; stroke-linejoin: round;
}
.labels text.spawnl { fill: #e8a0bf; font-weight: 600; }
.labels text.strong { fill: #fff; font-weight: 700; font-size: 12.5px; }

.tmap__tools { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 10px; }
.tmap__tools .hint { color: #8f87a3; font-size: 12.5px; }
.tmap__tools button {
  min-width: 32px; height: 32px; padding: 0 8px; border: 1px solid rgba(255,255,255,.14); border-radius: 8px;
  background: rgba(21,18,28,.9); color: #e8e7f0; font: 600 15px 'Rubik', sans-serif; cursor: pointer;
}
.tmap__tools button.wide { font-size: 12.5px; }
.tmap__tools button:hover:not(:disabled) { border-color: #8b5ee8; }
.tmap__tools button:disabled { opacity: .4; cursor: default; }
.tmap__tools button:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }

.tmap__legend { display: flex; flex-wrap: wrap; gap: 6px 16px; margin: 10px 0 0 !important; padding: 0 !important; list-style: none; color: #9a94ab; font-size: 12.5px; }
.tmap__legend li { display: flex; align-items: center; gap: 6px; margin: 0 !important; }
.lg { display: inline-block; width: 10px; height: 10px; border-radius: 50%; }
.lg.named { background: #f5c451; } .lg.guess { border: 1.5px dashed #f5a623; background: rgba(245,166,35,.5); }
.lg.town { background: #a67cf5; } .lg.base { background: #9a94ab; } .lg.spawnl { background: #e8a0bf; }

@media (prefers-reduced-motion: reduce) {
  .dot .body { transition: none; }
  .dot.sel .ring { animation: none; }
}
</style>
