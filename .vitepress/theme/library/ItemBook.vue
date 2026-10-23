<template>
  <!-- Подписанная книга, нарисованная по пикселю. Книгу с пером берём
       готовую иконку из игры, она уже лежит в public/assets. -->
  <img
    v-if="!signed"
    class="ib ib--quill"
    :src="QUILL"
    alt=""
    width="16"
    height="16"
    draggable="false"
  />
  <svg v-else class="ib" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
    <path v-for="(d, k) in PATHS" :key="k" :d="d" :fill="fill(k)" />
  </svg>
</template>

<script>
// 16×16, по символу на пиксель. o контур, C блик корешка, c обложка,
// d тень, g тиснение, r закладка, p и s — обрез страниц.
const ART = [
  '................',
  '...ooooooooooo..',
  '..oCCCCCCCCCCdo.',
  '..oCcccccccccdo.',
  '..oCcgggggggcdo.',
  '..oCcgcccccgcdo.',
  '..oCcgggggggcdo.',
  '..oCcccccccccdo.',
  '..oCcccccccccdo.',
  '..oCcccccccccdo.',
  '..oCcccccccccdo.',
  '..oCccccccccrdo.',
  '..oCddddddddrdo.',
  '..oppppppppprpo.',
  '..osssssssssrso.',
  '...oooooooooroo.',
]

// Один path на цвет: так на странице сундука 54 иконки, а не 54×200 прямоугольников.
// Через переменную, а не строкой в шаблоне: иначе сборщик ищет файл в корневой assets/.
const QUILL = '/assets/mechanics/writable_book.webp'

const PATHS = {}
ART.forEach((row, y) => {
  ;[...row].forEach((ch, x) => {
    if (ch === '.' || ch === ' ') return
    PATHS[ch] = (PATHS[ch] || '') + `M${x} ${y}h1v1h-1z`
  })
})
</script>

<script setup>
const props = defineProps({
  signed: { type: Boolean, default: true },
  hue: { type: Number, default: 28 },
})

function fill(k) {
  const h = props.hue
  switch (k) {
    case 'o': return `hsl(${h} 45% 9%)`
    case 'C': return `hsl(${h} 50% 52%)`
    case 'c': return `hsl(${h} 46% 36%)`
    case 'd': return `hsl(${h} 50% 24%)`
    case 'g': return '#e8b93e'
    case 'r': return '#d23a3a'
    case 'p': return '#efe6c8'
    case 's': return '#b3a47e'
  }
}
</script>

<style scoped>
.ib {
  display: block;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
</style>
