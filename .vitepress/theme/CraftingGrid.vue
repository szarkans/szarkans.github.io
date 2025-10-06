<template>
  <div class="mc-crafting" :style="rootVars" role="group" aria-label="Crafting recipe">
    <!-- Левая панель 3x3 -->
    <div class="mc-panel mc-panel--grid">
      <div class="mc-grid" aria-label="Ingredients grid 3x3">
        <template v-for="(row, rIdx) in ingredientsMatrix" :key="`r-${rIdx}`">
          <div v-for="(slot, cIdx) in row" :key="`c-${rIdx}-${cIdx}`" class="mc-slot">
            <component
              :is="slot?.link ? 'a' : 'div'"
              class="mc-slot__link"
              :href="slot?.link || undefined"
              :title="slot?.name || undefined"
              @click="slot?.link ? null : ($event)=>$event.preventDefault()"
              @mouseenter="slot && showTip(`i-${rIdx}-${cIdx}`)"
              @mouseleave="hideTip(`i-${rIdx}-${cIdx}`)"
              @mousemove="slot && moveTip($event, `i-${rIdx}-${cIdx}`)"
              @focus="slot && showTip(`i-${rIdx}-${cIdx}`, true)"
              @blur="hideTip(`i-${rIdx}-${cIdx}`)"
            >
              <img
                v-if="slot?.image"
                class="mc-item"
                :src="slot.image"
                :alt="slot.name || 'Item'"
                draggable="false"
              />
            </component>

            <!-- Tooltip -->
            <div
              v-if="tips[`i-${rIdx}-${cIdx}`]"
              class="mc-tip visible"
              :style="tipStyles[`i-${rIdx}-${cIdx}`]"
            >
              {{ row[cIdx]?.name }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Стрелка как ассет-разделитель -->
    <img class="mc-arrow" :src="ARROW_SRC" alt="Arrow" draggable="false" />

    <!-- Правая панель результата -->
    <div class="mc-panel mc-panel--result">
      <div class="mc-slot">
        <component
          :is="result.link ? 'a' : 'div'"
          class="mc-slot__link"
          :href="result.link || undefined"
          :title="result.name || undefined"
          @click="result.link ? null : ($event)=>$event.preventDefault()"
          @mouseenter="showTip('result')"
          @mouseleave="hideTip('result')"
          @mousemove="moveTip($event, 'result')"
          @focus="showTip('result', true)"
          @blur="hideTip('result')"
        >
          <img
            v-if="result?.image"
            class="mc-item"
            :src="result.image"
            :alt="result.name || 'Result'"
            draggable="false"
          />
          <span v-if="result.count && result.count > 1" class="mc-count">{{ result.count }}</span>
        </component>

        <div v-if="tips.result" class="mc-tip visible" :style="tipStyles.result">
          {{ result.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'

// единый ассет стрелки
const ARROW_SRC = '/assets/arrow.png'

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
    validator: v => v.length === 3 && v.every(row => Array.isArray(row) && row.length === 3)
  },
  result: {
    type: Object,
    required: true,
    validator: v => !!(v && v.image && v.name)
  },
  // масштаб в целых значениях 1, 2, 3...
  scale: { type: Number, default: 2 }
})

const ingredientsMatrix = computed(() =>
  props.ingredients.map(row =>
    row.map(item => {
      if (!item) return null
      if (typeof item === 'string') return { image: item, name: 'Item', link: null }
      return { image: item.image, name: item.name || 'Item', link: item.link || null }
    })
  )
)

// Minecraft-like tooltip: следует за курсором
const tips = reactive({})
const tipStyles = reactive({})

const showTip = (key, keyboard = false) => {
  tips[key] = true
  // для клавиатуры привязываем над слотом, если нет координат мыши
  if (keyboard && !tipStyles[key]) {
    tipStyles[key] = { left: '0px', top: '0px' }
  }
}
const hideTip = key => { tips[key] = false }

const moveTip = (e, key) => {
  if (!tips[key]) return
  const offset = 14 // отступ от курсора как в игре
  let x = e.clientX + offset
  let y = e.clientY + offset

  // простая защита от выхода за правый/нижний край экрана
  const vw = window.innerWidth
  const vh = window.innerHeight
  const estW = 160
  const estH = 34
  if (x + estW > vw) x = vw - estW - 6
  if (y + estH > vh) y = vh - estH - 6

  tipStyles[key] = { left: `${x}px`, top: `${y}px` }
}

const rootVars = computed(() => ({
  '--mc-slot': '32px',
  '--mc-gap': '4px',
  '--mc-scale': props.scale,
  '--mc-panel-pad': '6px',
  '--mc-arrow-w': '48px'
}))
</script>

<style scoped>
@font-face {
  font-family: 'Minecraft Rus';
  src: url('/assets/minecraft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.mc-crafting {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--mc-gap) * var(--mc-scale));
  font-family: 'Minecraft Rus', 'Courier New', monospace;
  user-select: none;

  transform: scale(var(--mc-scale));
  transform-origin: top left;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* Панели задника рисуются кодом */
.mc-panel {
  position: relative;
  background: #C6C6C6;
  border: 4px solid;
  border-color: #FCFCFC #555555 #555555 #FCFCFC;
  box-shadow:
    inset 2px 2px 0 rgba(255,255,255,0.4),
    inset -2px -2px 0 rgba(0,0,0,0.3);
  padding: var(--mc-panel-pad);
}
.mc-panel--grid { display: inline-block; }
.mc-panel--result { display: grid; place-items: center; }

.mc-grid {
  display: grid;
  grid-template-columns: repeat(3, var(--mc-slot));
  grid-template-rows: repeat(3, var(--mc-slot));
  gap: var(--mc-gap);
}

/* Слоты рисуются кодом */
.mc-slot {
  position: relative;
  width: var(--mc-slot);
  height: var(--mc-slot);
  background: #8B8B8B;
  border: 2px solid;
  border-color: #373737 #FCFCFC #FCFCFC #373737;
  box-shadow:
    inset -1px -1px 0 #555555,
    inset 1px 1px 0 #000000;
}

/* Кликабельная зона слота */
.mc-slot__link {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
}
.mc-slot__link:focus-visible {
  box-shadow: 0 0 0 2px #2D0A4E;
}

/* Иконка предмета: убран оффсет вниз, идеальный центр */
.mc-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--mc-slot);
  height: var(--mc-slot);
  transform: translate(-50%, -50%);
  display: block;
  image-rendering: pixelated;
}

/* Количество результата */
.mc-count {
  position: absolute;
  right: 3px;
  bottom: 1px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
  text-shadow:
    2px 2px 0 #3f3f3f,
    -1px 1px 0 #3f3f3f,
    1px -1px 0 #3f3f3f,
    -1px -1px 0 #3f3f3f,
    1px 2px 0 #3f3f3f;
  pointer-events: none;
}

/* Стрелка ассет */
.mc-arrow {
  width: var(--mc-arrow-w);
  height: auto;
  image-rendering: pixelated;
  flex: 0 0 auto;
}

/* Tooltip как в Minecraft — следует за курсором */
.mc-tip {
  position: fixed;
  padding: 6px 10px;
  background: rgba(16, 0, 16, 0.94);
  border: 2px solid #2D0A4E;
  border-radius: 3px;
  box-shadow:
    inset 0 0 0 1px #28284E,
    0 0 0 1px #000;
  color: #fff;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  transition: opacity 0.12s;
  text-shadow: 1px 1px 0 #3f3f3f;
}
.mc-tip.visible { opacity: 1; }
.mc-tip::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 8px;
  border: 4px solid transparent;
  border-bottom-color: #2D0A4E;
}
</style>
