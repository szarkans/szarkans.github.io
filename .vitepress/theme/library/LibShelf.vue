<template>
  <div class="shelf">
    <div
      class="case"
      :style="{ '--row-h': `${rowH}px` }"
      @pointerdown="swipe.down"
      @pointerup="swipe.up"
      @click.capture="swipe.click"
    >
      <div class="case__top">
        <span v-if="plate" class="case__plate">{{ plate }}</span>
      </div>
      <div ref="rowsEl" class="case__rows">
        <div v-for="(row, i) in cabinet" :key="i" class="case__row">
          <BookSpine v-for="b in row" :key="b.id" :book="b" :mode="mode" :active="b.id === activeId" />
        </div>
      </div>
    </div>
    <LibPager v-model:page="page" :pages="cabinets.length" noun="Шкаф" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BookSpine from './BookSpine.vue'
import LibPager from './LibPager.vue'
import { SPINE_GAP, initial, spineMaxH, spineSize } from './data.js'
import { useSwipe, useWidth } from './gestures.js'

const props = defineProps({
  books: { type: Array, required: true },
  activeId: { type: String, default: null },
  narrow: Boolean,
})

const mode = computed(() => (props.narrow ? 'narrow' : 'wide'))
// Шкаф — несколько полок. Все книги одной стеной — это прокрутка на пять
// экранов и ни одной точки, за которую зацепиться глазу.
const ROWS = computed(() => (props.narrow ? 6 : 4))
const rowH = computed(() => spineMaxH(mode.value) + 32)

const rowsEl = ref(null)
const width = useWidth(rowsEl)

// Раскладка по рядам: книга не влезла — переезжает на следующую полку.
const rows = computed(() => {
  const max = width.value || (props.narrow ? 320 : 980)
  const out = []
  let row = []
  let used = 0
  for (const b of props.books) {
    const w = spineSize(b, mode.value).w + SPINE_GAP
    if (row.length && used + w > max) {
      out.push(row)
      row = []
      used = 0
    }
    row.push(b)
    used += w
  }
  if (row.length) out.push(row)
  return out
})
const cabinets = computed(() => {
  const out = []
  for (let i = 0; i < rows.value.length; i += ROWS.value) out.push(rows.value.slice(i, i + ROWS.value))
  return out.length ? out : [[]]
})

const page = ref(0)
const cabinet = computed(() => cabinets.value[Math.min(page.value, cabinets.value.length - 1)])
watch(() => props.books, () => { page.value = 0 })
watch(cabinets, (c) => { if (page.value >= c.length) page.value = c.length - 1 })

// Табличка на шкафу — какие буквы на нём стоят. Названия вроде «-» или «+»
// букв не дают, их пропускаем.
const plate = computed(() => {
  const all = cabinet.value.flat()
  const ini = all.filter((b) => b.signed).map((b) => initial(b.title)).filter(Boolean)
  const unsigned = all.some((b) => !b.signed)
  const a = ini[0]
  const z = unsigned ? 'без подписи' : ini.at(-1)
  if (!a) return unsigned ? 'Без подписи' : ''
  return a === z ? a : `${a} — ${z}`
})

const swipe = useSwipe((d) => {
  const n = page.value + d
  if (n >= 0 && n < cabinets.value.length) page.value = n
})
</script>

<style scoped>
.case {
  --plank: 12px;
  position: relative;
  padding: 0 14px 14px;
  background:
    repeating-linear-gradient(90deg, transparent 0 63px, rgba(0, 0, 0, 0.18) 63px 64px),
    linear-gradient(180deg, #2f2740, #262035);
  border: 2px solid #120e18;
  box-shadow: inset 0 2px 0 #3d3350, inset 0 -3px 0 #1a1524, 0 18px 40px -16px rgba(0, 0, 0, 0.8);
  image-rendering: pixelated;
  touch-action: pan-y;
}

.case__top {
  display: flex;
  justify-content: center;
  padding: 10px 0 8px;
}
.case__plate {
  font: 14px/1 'Minecraft Rus', monospace;
  color: #c9c0dc;
  background: #1a1522;
  padding: 6px 14px 5px;
  border: 2px solid #120e18;
  box-shadow: inset 0 -2px 0 #120e18;
}

.case__rows {
  padding: 0 8px;
  background:
    repeating-linear-gradient(90deg, #17131f 0 30px, #131019 30px 31px, #19151f 31px 47px, #131019 47px 48px),
    #16121d;
  box-shadow: inset 6px 0 8px -4px rgba(0, 0, 0, 0.7), inset -6px 0 8px -4px rgba(0, 0, 0, 0.7);
  min-height: var(--row-h);
}

/* Полка: тень от доски сверху, книги стоят на доске снизу. */
.case__row {
  display: flex;
  align-items: flex-end;
  height: var(--row-h);
  margin: 0 -8px;
  padding: 0 8px var(--plank);
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0 6px, rgba(0, 0, 0, 0.2) 6px 14px, transparent 14px) top / 100% 14px no-repeat,
    linear-gradient(180deg, #4a3f5c 0 2px, #382f47 2px calc(100% - 3px), #1d1826 calc(100% - 3px)) bottom / 100% var(--plank) no-repeat;
}

@media (max-width: 640px) {
  .case { padding: 0 6px 8px; }
  .case__rows { padding: 0 4px; }
  .case__row { margin: 0 -4px; padding: 0 4px var(--plank); }
}
</style>
