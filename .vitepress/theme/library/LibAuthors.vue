<template>
  <div class="au">
    <div class="au__grid" :style="{ '--row-h': `${rowH}px` }">
      <section
        v-for="g in slice"
        :key="g.key"
        class="nook"
        :style="{ '--h': g.hue }"
      >
        <header class="sign">
          <span class="sign__chain" aria-hidden="true"></span>
          <h3 class="sign__name">{{ g.name }}</h3>
        </header>
        <div class="nook__rows">
          <BookSpine v-for="b in g.books" :key="b.id" :book="b" :mode="mode" :active="b.id === activeId" />
        </div>
      </section>
    </div>
    <LibPager v-model:page="page" :pages="pages.length" :label="label" noun="Стеллаж" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BookSpine from './BookSpine.vue'
import LibPager from './LibPager.vue'
import { groupByAuthor, initial, spineMaxH } from './data.js'

const props = defineProps({
  books: { type: Array, required: true },
  activeId: { type: String, default: null },
  narrow: Boolean,
})

const mode = computed(() => (props.narrow ? 'narrow' : 'small'))
const rowH = computed(() => spineMaxH(mode.value) + 18)

const groups = computed(() => groupByAuthor(props.books))

// Стеллаж набирается авторами, пока на нём не наберётся сколько-то книг:
// по числу авторов страницы выходили то пустые, то на три экрана.
const pages = computed(() => {
  const budget = props.narrow ? 36 : 110
  const out = [[]]
  let n = 0
  for (const g of groups.value) {
    if (n && n + g.books.length > budget) {
      out.push([])
      n = 0
    }
    out.at(-1).push(g)
    n += g.books.length
  }
  return out
})
const page = ref(0)
const slice = computed(() => pages.value[Math.min(page.value, pages.value.length - 1)])
watch(() => props.books, () => { page.value = 0 })
// Узкий и широкий экран режут стеллажи по-разному: номер страницы не должен выйти за край.
watch(pages, (p) => { if (page.value >= p.length) page.value = p.length - 1 })

const label = computed(() => {
  const s = slice.value
  if (!s.length) return ''
  const ini = (g) => (g.rank ? g.name.toLowerCase() : initial(g.name))
  const a = ini(s[0])
  const z = ini(s.at(-1))
  return a === z ? a : `${a} — ${z}`
})
</script>

<style scoped>
.au__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 26px 14px;
}

.nook {
  --plank: 10px;
  display: flex;
  flex-direction: column;
  /* Ширина ниши — по её книгам: у автора одной записки узкая полочка,
     у плодовитого — длинная, у книг с пером — во всю ширину. */
  flex: 1 1 auto;
  min-width: 150px;
  max-width: 100%;
}

/* Табличка автора на двух цепочках. */
.sign {
  position: relative;
  align-self: center;
  max-width: calc(100% - 20px);
  margin: 14px 0 -2px;
  padding: 7px 14px 6px;
  text-align: center;
  background:
    linear-gradient(180deg, #2a2337, #221c2e);
  border: 2px solid #120e18;
  box-shadow: inset 0 2px 0 #3a3049, 0 4px 0 rgba(0, 0, 0, 0.35);
  z-index: 1;
}
.sign__chain {
  position: absolute;
  top: -16px;
  left: 12px;
  right: 12px;
  height: 14px;
  background:
    repeating-linear-gradient(180deg, #3d3650 0 3px, transparent 3px 5px) left / 3px 100% no-repeat,
    repeating-linear-gradient(180deg, #3d3650 0 3px, transparent 3px 5px) right / 3px 100% no-repeat;
}
.sign__name {
  margin: 0;
  padding: 0;
  border: 0;
  font: 14px/1.2 'Minecraft Rus', monospace;
  letter-spacing: 0;
  color: #c9c0dc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nook__rows {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  align-content: flex-start;
  min-height: var(--row-h);
  padding: 0 8px;
  border: 8px solid #2b2439;
  border-top-width: 0;
  border-bottom: 0;
  background:
    repeating-linear-gradient(180deg,
      rgba(0, 0, 0, 0.55) 0 5px,
      rgba(0, 0, 0, 0.18) 5px 12px,
      transparent 12px calc(var(--row-h) - var(--plank)),
      #4a3f5c calc(var(--row-h) - var(--plank)) calc(var(--row-h) - var(--plank) + 2px),
      #382f47 calc(var(--row-h) - var(--plank) + 2px) calc(var(--row-h) - 3px),
      #1d1826 calc(var(--row-h) - 3px) var(--row-h)),
    linear-gradient(180deg, hsl(var(--h) 10% 13%), #15111c 70%);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6), 0 14px 26px -14px rgba(0, 0, 0, 0.8);
}
.nook__rows > :deep(.sp) {
  margin-top: calc(var(--row-h) - var(--plank) - var(--ht));
  margin-bottom: var(--plank);
}

@media (max-width: 520px) {
  .au__grid { gap: 22px 10px; }
  .nook { min-width: 140px; }
  .nook__rows { padding: 0 4px; border-width: 0 5px; }
  .sign { padding: 6px 8px 5px; }
  .sign__name { font-size: 12px; }
}
</style>
