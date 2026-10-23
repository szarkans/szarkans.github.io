<template>
  <div class="shelf">
    <div class="case">
      <div class="case__top">
        <span class="case__plate">{{ plate }}</span>
      </div>
      <div class="case__rows">
        <BookSpine v-for="b in slice" :key="b.id" :book="b" :active="b.id === activeId" />
      </div>
    </div>
    <LibPager v-model:page="page" :pages="pages" :label="rangeOf(slice, sort)" noun="Шкаф" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BookSpine from './BookSpine.vue'
import LibPager from './LibPager.vue'
import { rangeOf } from './data.js'

const props = defineProps({
  books: { type: Array, required: true },
  sort: { type: String, required: true },
  activeId: { type: String, default: null },
  narrow: Boolean,
})

// Шкаф — 4–5 полок. Все 600 книг одной стеной — это прокрутка на пять экранов
// на телефоне и ни одной точки, за которую зацепиться глазу.
const per = computed(() => (props.narrow ? 64 : 150))
const page = ref(0)
const pages = computed(() => Math.max(1, Math.ceil(props.books.length / per.value)))
const slice = computed(() => props.books.slice(page.value * per.value, (page.value + 1) * per.value))
watch(() => [props.books, per.value], () => { page.value = 0 })

const plate = computed(() => rangeOf(slice.value, props.sort) || 'Пусто')

defineExpose({ page, per })
</script>

<style scoped>
.case {
  --row-h: 128px;
  --plank: 12px;
  position: relative;
  padding: 0 14px 14px;
  background:
    repeating-linear-gradient(90deg, transparent 0 63px, rgba(0, 0, 0, 0.22) 63px 64px),
    linear-gradient(180deg, #b48a52, #9b7342);
  border: 2px solid #3b2510;
  box-shadow: inset 0 2px 0 #d1a96b, inset 0 -3px 0 #6b4a24, 0 18px 40px -16px rgba(0, 0, 0, 0.8);
  image-rendering: pixelated;
}

.case__top {
  display: flex;
  justify-content: center;
  padding: 10px 0 8px;
}
.case__plate {
  font: 12px/1 'Minecraft Rus', monospace;
  color: #3a2410;
  background: #d9c08a;
  padding: 5px 12px 4px;
  border: 2px solid #5a3a18;
  box-shadow: inset 0 -2px 0 #b89a62;
}

.case__rows {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  align-content: flex-start;
  min-height: var(--row-h);
  padding: 0 6px;
  /* Ряды полок: тёмная задняя стенка, тень под доской сверху, сама доска. */
  background:
    repeating-linear-gradient(180deg,
      rgba(0, 0, 0, 0.55) 0 6px,
      rgba(0, 0, 0, 0.2) 6px 14px,
      transparent 14px calc(var(--row-h) - var(--plank)),
      #c99c5e calc(var(--row-h) - var(--plank)) calc(var(--row-h) - var(--plank) + 2px),
      #a27845 calc(var(--row-h) - var(--plank) + 2px) calc(var(--row-h) - 3px),
      #5e3f1c calc(var(--row-h) - 3px) var(--row-h)),
    repeating-linear-gradient(90deg, #2c1d10 0 30px, #261809 30px 31px, #2f2012 31px 47px, #261809 47px 48px),
    #2a1c0f;
  box-shadow: inset 6px 0 8px -4px rgba(0, 0, 0, 0.7), inset -6px 0 8px -4px rgba(0, 0, 0, 0.7);
}

/* Каждый корешок занимает ровно высоту полки: низ — на доске. */
.case__rows > :deep(.sp) {
  margin-top: calc(var(--row-h) - var(--plank) - var(--ht));
  margin-bottom: var(--plank);
}

@media (max-width: 640px) {
  .case { padding: 0 8px 10px; }
  .case__rows { padding: 0 2px; }
}
</style>
