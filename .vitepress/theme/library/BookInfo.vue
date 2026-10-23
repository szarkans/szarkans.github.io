<template>
  <div class="bi">
    <p class="bi__title" :class="{ 'bi__title--q': !book.signed }">{{ book.title }}</p>
    <p class="bi__gray">
      {{ book.pages.length }} {{ plural(book.pages.length, 'страница', 'страницы', 'страниц') }}<template v-if="book.copies > 1"> · {{ book.copies }} {{ plural(book.copies, 'экземпляр', 'экземпляра', 'экземпляров') }}</template>
    </p>
    <ul class="bi__where">
      <li v-for="(w, i) in places" :key="i">
        <span class="bi__place">{{ w.place }}</span>
        <span v-if="w.xyz" class="bi__xyz">{{ w.xyz }}</span>
      </li>
      <li v-if="rest" class="bi__more">и ещё {{ rest }} {{ plural(rest, 'место', 'места', 'мест') }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { plural } from './data.js'

const props = defineProps({ book: { type: Object, required: true } })

const LIMIT = 3
const places = computed(() => props.book.where.slice(0, LIMIT))
const rest = computed(() => Math.max(0, props.book.where.length - LIMIT) + props.book.more)
</script>

<style scoped>
.bi p { margin: 0; }
.bi__title { color: #ffff55; overflow-wrap: anywhere; }
.bi__title--q { color: #fff; }
.bi__gray { color: #aaa; }
.bi__where { list-style: none; margin: 4px 0 0; padding: 0; }
.bi__where li { margin: 0; color: #a98fe0; }
.bi__xyz { margin-left: 6px; color: #55ffff; white-space: nowrap; }
.bi__more { color: #777 !important; }
</style>
