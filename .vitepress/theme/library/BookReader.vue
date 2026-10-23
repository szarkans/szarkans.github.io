<template>
  <Teleport to="body">
    <div ref="root" class="rd" role="dialog" aria-modal="true" :aria-label="book.title" tabindex="-1" @click.capture="swipe.click" @click.self="$emit('close')">
      <button ref="closeBtn" type="button" class="mcbtn rd__close" aria-label="Закрыть книгу" @click="$emit('close')">✕</button>

      <div class="rd__wrap" @click.self="$emit('close')">
        <div class="rd__book">
          <div class="rd__page" @pointerdown="swipe.down" @pointerup="swipe.up">
            <p class="rd__counter">Страница {{ page + 1 }} из {{ total }}</p>
            <div ref="textEl" class="rd__text">{{ text }}<span v-if="!text.trim()" class="rd__empty">Страница пуста</span></div>
            <div class="rd__nav">
              <button type="button" class="arrow" :class="{ 'arrow--hidden': page <= 0 }" :disabled="page <= 0" aria-label="Предыдущая страница" @click="go(-1)">
                <svg viewBox="0 0 18 10" shape-rendering="crispEdges" aria-hidden="true"><path :d="ARROW" /></svg>
              </button>
              <button type="button" class="arrow arrow--next" :class="{ 'arrow--hidden': page >= total - 1 }" :disabled="page >= total - 1" aria-label="Следующая страница" @click="go(1)">
                <svg viewBox="0 0 18 10" shape-rendering="crispEdges" aria-hidden="true"><path :d="ARROW" /></svg>
              </button>
            </div>
          </div>
        </div>

        <footer class="rd__meta">
          <h2 class="rd__title">
            {{ book.title }}<span class="rd__by">{{ book.signed ? ` от ${book.author || 'неизвестного автора'}` : ' без подписи' }}</span>
          </h2>
          <ul class="rd__facts">
            <li v-for="(w, i) in book.where" :key="i">
              {{ w.place }}<i v-if="w.note">{{ ` (${w.note})` }}</i><code v-if="w.xyz">{{ w.xyz }}</code>
            </li>
            <li v-if="book.more">и ещё {{ book.more }} {{ plural(book.more, 'место', 'места', 'мест') }}</li>
            <li v-if="book.copies > 1">{{ book.copies }} {{ plural(book.copies, 'экземпляр', 'экземпляра', 'экземпляров') }}</li>
            <li v-if="book.sigs.length">Ещё подписывали: {{ book.sigs.join(', ') }}</li>
          </ul>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { plural } from './data.js'
import { useSwipe } from './gestures.js'

const props = defineProps({ book: { type: Object, required: true } })
const emit = defineEmits(['close'])

// Стрелка листания: пиксельная, 18×10, остриём вправо.
const ARROW = 'M0 4h12v-4h2v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1h-2v-4h-12z'

const page = ref(0)
const total = computed(() => props.book.pages.length)
const text = computed(() => props.book.pages[page.value] || '')

const root = ref(null)
const closeBtn = ref(null)
const textEl = ref(null)

function go(d) {
  const n = Math.min(total.value - 1, Math.max(0, page.value + d))
  if (n === page.value) return
  // Стрелка на краю книги станет disabled, и фокус с неё упадёт на body — уводим его заранее.
  const edge = n === 0 || n === total.value - 1
  if (edge && document.activeElement?.classList.contains('arrow')) root.value?.focus({ preventScroll: true })
  page.value = n
}
const swipe = useSwipe(go)
watch(page, () => {
  if (textEl.value) textEl.value.scrollTop = 0
})
watch(() => props.book.id, () => { page.value = 0 })

function onKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); emit('close') }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  else if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  else if (e.key === 'Tab') trapTab(e)
}

// Фокус не уходит из книги на страницу под ней. Клавиши слушает документ, пока книга открыта:
// клик по тексту страницы уводит фокус на body, и на самой читалке их бы уже никто не услышал.
function trapTab(e) {
  const items = [...root.value.querySelectorAll('button:not([disabled])')]
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  const inside = root.value.contains(document.activeElement)
  if (e.shiftKey && (!inside || document.activeElement === first || document.activeElement === root.value)) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && (!inside || document.activeElement === last)) { e.preventDefault(); first.focus() }
}

let prevOverflow = ''
onMounted(async () => {
  prevOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.addEventListener('keydown', onKey)
  await nextTick()
  closeBtn.value?.focus({ preventScroll: true })
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = prevOverflow
})
</script>

<style scoped>
.rd {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  overflow-y: auto;
  background: radial-gradient(ellipse at 50% 40%, rgba(40, 22, 70, 0.78), rgba(8, 5, 14, 0.92) 70%);
  backdrop-filter: blur(4px);
  animation: rd-fade 0.18s ease-out;
}
@keyframes rd-fade { from { opacity: 0; } }
.rd:focus { outline: none; }

/* Книга — по центру экрана; когда не влезает по высоте, окно прокручивается. */
.rd__wrap {
  margin: auto;
  padding: 40px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: rd-pop 0.24s cubic-bezier(0.2, 1.3, 0.4, 1);
}
@keyframes rd-pop { from { transform: translateY(16px) scale(0.97); opacity: 0; } }

.rd__close {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  z-index: 3;
  font: 16px/1 'Minecraft Rus', monospace;
}

/* Книга как в игре: кожаная обложка по краю, внутри кремовая страница. */
.rd__book {
  padding: 12px 12px 12px 22px;
  background:
    linear-gradient(90deg, #3d240f 0 4px, #6b4322 4px 8px, transparent 8px),
    linear-gradient(180deg, #7a4d27, #5e3a1b);
  border: 3px solid #1f1207;
  box-shadow: inset 0 3px 0 #9a6536, inset 0 -3px 0 #3a210c, 0 30px 60px -20px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(160, 120, 255, 0.08);
  image-rendering: pixelated;
}
.rd__page {
  position: relative;
  width: 440px;
  height: min(560px, calc(100dvh - 190px));
  min-height: 360px;
  display: flex;
  flex-direction: column;
  padding: 18px 26px 10px;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.35), transparent 60%),
    repeating-linear-gradient(0deg, transparent 0 3px, rgba(140, 110, 60, 0.05) 3px 4px),
    #efe3c2;
  border: 3px solid #c2ab78;
  box-shadow: inset 4px 0 0 #dccb9c, inset -2px -2px 0 #d6c28f;
  color: #000;
  touch-action: pan-y;
}
.rd__counter {
  margin: 0 0 12px;
  text-align: right;
  font: 16px/1 'Minecraft Rus', monospace;
  color: #000;
}
.rd__text {
  flex: 1;
  overflow-y: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font: 16px/20px 'Minecraft Rus', monospace;
  color: #000;
  scrollbar-width: thin;
  scrollbar-color: #b49a62 transparent;
}
.rd__empty { color: #8a7a58; }

.rd__nav {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
}
.arrow {
  width: 54px;
  height: 36px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  color: #6b4b24;
  display: grid;
  place-items: center;
}
.arrow svg { width: 36px; height: 20px; fill: currentColor; filter: drop-shadow(0 2px 0 #c2ab78); }
.arrow:first-child svg { transform: scaleX(-1); }
.arrow:hover svg, .arrow:focus-visible svg { fill: #a3281c; }
.arrow:focus-visible { outline: 2px dashed #6b4b24; outline-offset: 2px; }
.arrow--hidden { visibility: hidden; }

/* ── Подпись под книгой: тихая, книге не соперник ──────────────────── */
.rd__meta {
  max-width: 560px;
  margin-top: 18px;
  text-align: center;
  color: #b9b3cc;
}
.rd__title {
  margin: 0;
  padding: 0;
  border: 0;
  font: 18px/1.35 'Minecraft Rus', monospace;
  letter-spacing: 0;
  color: #ffff55;
  text-shadow: 2px 2px 0 #3f3f15;
  overflow-wrap: anywhere;
}
.rd__by { color: #9f99b3; text-shadow: none; font-size: 14px; }
.rd__facts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 18px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
  line-height: 1.5;
}
.rd__facts li { margin: 0; }
.rd__facts i { color: #7f7894; font-style: normal; }
.rd__facts code {
  margin-left: 6px;
  padding: 0 5px;
  font: 13px 'Minecraft Rus', monospace;
  color: #55ffff;
  background: rgba(85, 255, 255, 0.07);
  border-radius: 3px;
}

/* ── Телефон: книга во всю ширину ──────────────────────────────────── */
@media (max-width: 640px) {
  .rd__wrap { padding: 0 0 28px; margin: 0 auto auto; width: 100%; animation: none; }
  .rd__close { top: 10px; right: 10px; }
  .rd__book { align-self: stretch; padding: 8px 8px 8px 14px; border-width: 0 0 3px; }
  .rd__page {
    width: auto;
    height: calc(100dvh - 92px);
    min-height: 0;
    padding: 16px 16px 8px;
  }
  .rd__counter { padding-right: 46px; line-height: 24px; }
  .rd__meta { padding: 0 16px; margin-top: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .rd, .rd__wrap { animation: none; }
}
</style>
