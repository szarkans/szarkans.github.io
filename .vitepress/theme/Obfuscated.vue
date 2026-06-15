<template>
  <span class="obfuscated" ref="root" :aria-label="text">
    <!-- Реальный текст: читают скринридеры и поисковики, виден при копировании -->
    <span class="obfuscated__source" ref="source"><slot /></span>

    <!-- Свистопляска: чисто декорация, спрятана от скринридеров -->
    <span v-if="ready" class="obfuscated__glyphs" aria-hidden="true">
      <span
        v-for="(ch, i) in display"
        :key="i"
        class="obfuscated__char"
        :class="{ 'obfuscated__char--space': realChars[i] === ' ' }"
        :style="realChars[i] === ' ' ? null : { width: widths[i] + 'px' }"
      >{{ ch }}</span>
    </span>
  </span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  // мс между сменами глифов (в игре ~50мс)
  speed: { type: Number, default: 65 },
  // можно выключить анимацию, оставив статичный текст
  scramble: { type: Boolean, default: true },
});

// Набор символов: похожая по ширине кириллица/латиница + глитч-псевдографика
const LETTERS =
  'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' +
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GLITCH = '▓░▒╳╱╲#@$%&§¶±‡†×∞◊√≈ø';
const CHARSET = (LETTERS + GLITCH).split('');

const root = ref(null);
const source = ref(null);
const ready = ref(false);

const text = ref('');
const realChars = ref([]);
const widths = ref([]);
const display = ref([]);

let timer = null;
let observer = null;
let onScreen = true;

function randomGlyph() {
  return CHARSET[(Math.random() * CHARSET.length) | 0];
}

// Замеряем ширину каждого реального символа, чтобы строка не «прыгала»
function measureWidths(str) {
  const cs = getComputedStyle(root.value);
  const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily}`;
  const canvas = measureWidths._c || (measureWidths._c = document.createElement('canvas'));
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  return str.split('').map((ch) => Math.ceil(ctx.measureText(ch).width));
}

function tick() {
  display.value = realChars.value.map((ch) => (ch === ' ' ? ' ' : randomGlyph()));
}

function start() {
  if (timer || !props.scramble) return;
  timer = setInterval(tick, props.speed);
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

// Крутим только когда вкладка активна и элемент на экране
function sync() {
  if (onScreen && document.visibilityState === 'visible') start();
  else stop();
}

function onVisibility() {
  sync();
}

onMounted(() => {
  text.value = (source.value?.textContent || '').replace(/\s+/g, ' ').trim();
  realChars.value = text.value.split('');
  widths.value = measureWidths(text.value);

  if (!props.scramble) {
    // Статика: показываем настоящий текст (через :scramble="false")
    display.value = realChars.value.slice();
    ready.value = true;
    return;
  }

  tick();
  ready.value = true;

  observer = new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    sync();
  });
  observer.observe(root.value);
  document.addEventListener('visibilitychange', onVisibility);
  sync();
});

onBeforeUnmount(() => {
  stop();
  observer?.disconnect();
  document.removeEventListener('visibilitychange', onVisibility);
});
</script>

<style scoped>
.obfuscated {
  /* наследует шрифт/размер контекста: работает и в тексте, и в заголовках */
  display: inline;
}

/* Настоящий текст — только для скринридеров и копирования, без визуальной ширины */
.obfuscated__source {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.obfuscated__glyphs {
  white-space: normal;
}

.obfuscated__char {
  display: inline-block;
  text-align: center;
  font-variant-ligatures: none;
}

.obfuscated__char--space {
  display: inline; /* пробел остаётся точкой переноса строки */
  width: auto;
}
</style>
