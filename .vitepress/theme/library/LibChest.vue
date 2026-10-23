<template>
  <div class="chest">
    <div class="gui">
      <p class="gui__title">Большой сундук <span>· {{ from }}–{{ to }} из {{ books.length }}</span></p>
      <div class="gui__grid">
        <button
          v-for="b in slice"
          :key="b.id"
          type="button"
          class="slot"
          :class="{ 'slot--active': b.id === activeId, 'slot--cens': b.censor }"
          :data-book="b.id"
          :aria-label="b.signed ? `«${b.title}», ${b.author || 'без автора'}` : 'Книга с пером, без подписи'"
        >
          <span class="slot__item" :class="{ 'slot__item--black': b.censor === 'all' }">
            <ItemBook :signed="b.signed" :hue="b.hue" />
          </span>
          <span v-if="b.censor" class="slot__tape" aria-hidden="true"></span>
          <span v-if="b.copies > 1" class="slot__count" aria-hidden="true">{{ b.copies > 99 ? '99+' : b.copies }}</span>
        </button>
        <span v-for="n in empty" :key="`e${n}`" class="slot slot--empty" aria-hidden="true"></span>
      </div>
    </div>
    <LibPager v-model:page="page" :pages="pages" :label="rangeOf(slice, sort)" noun="Сундук" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ItemBook from './ItemBook.vue'
import LibPager from './LibPager.vue'
import { rangeOf } from './data.js'

const props = defineProps({
  books: { type: Array, required: true },
  sort: { type: String, required: true },
  activeId: { type: String, default: null },
})

// Двойной сундук: шесть рядов по девять, как в игре.
const PER = 54
const page = ref(0)
const pages = computed(() => Math.max(1, Math.ceil(props.books.length / PER)))
const slice = computed(() => props.books.slice(page.value * PER, (page.value + 1) * PER))
const empty = computed(() => PER - slice.value.length)
const from = computed(() => (props.books.length ? page.value * PER + 1 : 0))
const to = computed(() => page.value * PER + slice.value.length)
watch(() => props.books, () => { page.value = 0 })

defineExpose({ page, per: PER })
</script>

<style scoped>
.chest { display: flex; flex-direction: column; align-items: center; }

/* Окно инвентаря: светло-серая панель со скошенными пиксельными краями. */
.gui {
  width: 100%;
  max-width: 560px;
  padding: 10px 12px 14px;
  background: #c6c6c6;
  border: 2px solid #000;
  border-radius: 6px;
  box-shadow:
    inset 3px 3px 0 #fff,
    inset -3px -3px 0 #555,
    0 20px 40px -14px rgba(0, 0, 0, 0.85);
  image-rendering: pixelated;
}
.gui__title {
  margin: 0 0 8px 2px;
  font: 16px/1.2 'Minecraft Rus', monospace;
  color: #404040;
}
.gui__title span { color: #6d6d6d; }

.gui__grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}

.slot {
  position: relative;
  aspect-ratio: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  background: #8b8b8b;
  box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff;
  cursor: pointer;
}
.slot--empty { cursor: default; }

.slot__item {
  position: absolute;
  inset: 16%;
  transition: transform 0.15s ease-out;
}
.slot__item--black :deep(.ib) { filter: brightness(0.15) saturate(0); }

/* Подсветка ячейки под курсором — белая вуаль, как в игре. */
.slot:not(.slot--empty):hover::after,
.slot:focus-visible::after,
.slot--active::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: rgba(255, 255, 255, 0.45);
  pointer-events: none;
}
.slot:hover .slot__item,
.slot:focus-visible .slot__item,
.slot--active .slot__item { transform: translateY(-2px) scale(1.08); }
.slot:focus-visible { outline: 2px solid #fff; outline-offset: -2px; z-index: 1; }

.slot__tape {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 44%;
  height: 16%;
  background: repeating-linear-gradient(135deg, #d42020 0 4px, #a51010 4px 6px);
  transform: rotate(-22deg);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.slot__count {
  position: absolute;
  right: 3px;
  bottom: 1px;
  font: 16px/1 'Minecraft Rus', monospace;
  color: #fff;
  text-shadow: 2px 2px 0 #3f3f3f;
  pointer-events: none;
}

@media (max-width: 640px) {
  .gui { padding: 8px 6px 10px; border-radius: 4px; }
  .gui__title { font-size: 12px; }
  .slot { box-shadow: inset 1px 1px 0 #373737, inset -1px -1px 0 #fff; }
  .slot__count { font-size: 11px; right: 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .slot__item { transition: none; }
}
</style>
