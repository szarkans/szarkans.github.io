<template>
  <div class="glitch-block" ref="root" aria-hidden="true"></div>
  <span class="glitch-sr">{{ text }}</span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  // Повторяемая строка
  text: { type: String, required: true },
  // Сколько строк сгенерировать
  lines: { type: Number, default: 200 },
  // мс между сменами глифов
  speed: { type: Number, default: 85 },
  // Кривизна нарастания «лагов»: больше — дольше держится слабый глитч
  power: { type: Number, default: 3 },
  // Минимум глючащих символов в самой первой строке
  startChars: { type: Number, default: 1 },
});

const LETTERS =
  'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' +
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GLITCH = '▓░▒╳╱╲#@$%&§¶±‡†×∞◊√≈ø';
const CHARSET = (LETTERS + GLITCH).split('');

const root = ref(null);
let timer = null;
let observer = null;
let onScreen = false;
let built = false;
let rowsNodes = []; // [[span, ...] на каждую строку] — только анимируемые символы

function randomGlyph() {
  return CHARSET[(Math.random() * CHARSET.length) | 0];
}

// Детерминированный ГПСЧ — стабильный набор «битых» позиций по строке
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Строим DOM один раз — лениво, когда блок подъезжает к экрану
function build() {
  if (built) return;
  built = true;
  root.value.style.minHeight = ''; // снимаем резерв высоты

  const chars = [...props.text];

  const cs = getComputedStyle(root.value);
  const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily}`;
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = font;
  const widths = chars.map((c) => Math.ceil(ctx.measureText(c).width));

  const nonSpace = chars.map((c, i) => (c === ' ' ? -1 : i)).filter((i) => i >= 0);

  const frag = document.createDocumentFragment();
  rowsNodes = [];
  const N = props.lines;

  for (let r = 0; r < N; r++) {
    const t = N > 1 ? r / (N - 1) : 1;
    const intensity = Math.pow(t, props.power);
    let k = Math.round(intensity * nonSpace.length);
    k = Math.min(Math.max(props.startChars, k), nonSpace.length);

    const rand = seeded(r * 2654435761 + 1);
    const pool = nonSpace.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = (rand() * (i + 1)) | 0;
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const glitchSet = new Set(pool.slice(0, k));

    const row = document.createElement('div');
    row.className = 'glitch-row';
    const rowGlitch = [];
    chars.forEach((c, i) => {
      if (c === ' ') {
        row.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.className = 'glitch-ch';
      span.style.width = widths[i] + 'px';
      span.textContent = c;
      if (glitchSet.has(i)) rowGlitch.push(span);
      row.appendChild(span);
    });
    rowsNodes.push(rowGlitch);
    frag.appendChild(row);
  }

  root.value.appendChild(frag);
}

// Тик: обновляем глифы ТОЛЬКО в строках, попадающих в видимую область
function tick() {
  if (!built) return;
  const rect = root.value.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const N = rowsNodes.length;
  const rowH = rect.height / N;
  if (!rowH) return;

  const buf = 150; // небольшой запас сверху/снизу
  let from = Math.floor((-rect.top - buf) / rowH);
  let to = Math.ceil((vh - rect.top + buf) / rowH);
  from = Math.max(0, from);
  to = Math.min(N - 1, to);

  for (let r = from; r <= to; r++) {
    const ns = rowsNodes[r];
    for (let i = 0; i < ns.length; i++) ns[i].textContent = randomGlyph();
  }
}

function start() {
  if (!timer) timer = setInterval(tick, props.speed);
}
function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
function sync() {
  if (built && onScreen && document.visibilityState === 'visible') start();
  else stop();
}

onMounted(() => {
  // Резервируем высоту, чтобы скролл не «дёргался», пока DOM ещё не построен
  const cs = getComputedStyle(root.value);
  let lh = parseFloat(cs.lineHeight);
  if (!lh) lh = parseFloat(cs.fontSize) * 1.6;
  root.value.style.minHeight = props.lines * lh + 'px';

  observer = new IntersectionObserver(
    (e) => {
      onScreen = e[0].isIntersecting;
      if (onScreen) build(); // ленивая сборка при подъезде к блоку
      sync();
    },
    { rootMargin: '400px' } // начать готовить чуть заранее
  );
  observer.observe(root.value);
  document.addEventListener('visibilitychange', sync);
});

onBeforeUnmount(() => {
  stop();
  observer?.disconnect();
  document.removeEventListener('visibilitychange', sync);
});
</script>

<style>
/* НЕ scoped: ноды создаются через createElement и не получают data-v атрибут */
.glitch-row {
  white-space: normal;
}
.glitch-ch {
  display: inline-block;
  text-align: center;
  font-variant-ligatures: none;
}
.glitch-sr {
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
</style>
