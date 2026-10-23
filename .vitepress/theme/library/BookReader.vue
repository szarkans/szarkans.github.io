<template>
  <Teleport to="body">
    <div class="rd" role="dialog" aria-modal="true" :aria-label="book.title" @click.self="$emit('close')" @keydown="onKey">
      <div class="rd__wrap">
        <svg class="rd__defs" aria-hidden="true">
          <filter id="rd-marker" x="-5%" y="-30%" width="110%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09 0.6" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <button ref="closeBtn" type="button" class="mcbtn rd__close" aria-label="Закрыть книгу" @click="$emit('close')">✕</button>

        <div class="rd__book" :class="{ 'rd__book--black': book.censor === 'all' }">
          <div class="rd__page">
            <p class="rd__counter">Страница {{ page + 1 }} из {{ total }}</p>
            <div
              ref="textEl"
              class="rd__text"
              tabindex="-1"
              @pointerover="onBar"
              @focusin="onBar"
              @pointerout="offBar"
              @focusout="offBar"
              @scroll="note = null"
            >
              <template v-for="(s, i) in segments" :key="i">
                <span
                  v-if="s.bar"
                  class="bar"
                  :class="`bar--${i % 4}`"
                  tabindex="0"
                  :data-note="s.note"
                  :aria-label="`Вымарано. ${s.note}`"
                >{{ s.t }}</span>
                <template v-else>{{ s.t }}</template>
              </template>
              <span v-if="!text.trim()" class="rd__empty">Страница пуста</span>
            </div>
            <!-- Подпись цензора живёт вне прокрутки текста, иначе её обрезает. -->
            <span
              v-if="note"
              class="note"
              :class="{ 'note--below': note.below }"
              :style="{ left: `${note.x}px`, top: `${note.y}px` }"
              aria-hidden="true"
            >{{ note.text }}</span>
            <span v-if="book.censor" class="stamp" :class="{ 'stamp--big': book.censor === 'all' }" aria-hidden="true">Отцензурировано</span>
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

        <aside class="rd__info">
          <h2 class="rd__title">{{ book.title }}</h2>
          <p class="rd__by">{{ book.signed ? `от ${book.author || 'неизвестного автора'}` : 'Без подписи — книгу так и не закрыли' }}</p>
          <dl class="rd__facts">
            <div><dt>Страниц</dt><dd>{{ total }}</dd></div>
            <div><dt>Экземпляров в мире</dt><dd>{{ book.copies }}</dd></div>
            <div v-if="book.sigs.length" class="rd__wide"><dt>Ещё подписывали</dt><dd>{{ book.sigs.join(', ') }}</dd></div>
            <div class="rd__wide">
              <dt>Где лежала</dt>
              <dd>
                <ul class="rd__where">
                  <li v-for="(w, i) in book.where" :key="i">
                    {{ w.place }}<i v-if="w.note">{{ ` (${w.note})` }}</i>
                    <code v-if="w.xyz">{{ w.xyz }}</code>
                  </li>
                  <li v-if="book.more">и ещё {{ book.more }} {{ plural(book.more, 'место', 'места', 'мест') }}</li>
                  <li v-if="!book.where.length && !book.more">неизвестно</li>
                </ul>
              </dd>
            </div>
          </dl>
          <p class="rd__keys">← → листать · Esc закрыть</p>
        </aside>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { censorSegments, hashStr, plural } from './data.js'

const props = defineProps({ book: { type: Object, required: true } })
const emit = defineEmits(['close'])

// Стрелка листания: пиксельная, 18×10, остриём вправо.
const ARROW = 'M0 4h12v-4h2v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1h-2v-4h-12z'

// Подписи под вымаранным. Выбор — по месту плашки в книге, поэтому
// у одной и той же плашки всегда одна и та же причина.
const NOTES = [
  'Удалено по требованию Роскомнадзора',
  'Материал признан нежелательным',
  'Изъято по решению суда',
  'Информация недоступна в вашем регионе',
  'Содержит недостоверные сведения',
  'Скрыто в целях защиты детей',
  'Удалено: оскорбляет чувства котиков',
  'Фраза внесена в реестр запрещённых',
  'Согласовано. Не публиковать',
  'Вымарано цензором III разряда',
  'Дискредитирует администрацию',
  'Пропаганда. Изъять',
]

const page = ref(0)
const total = computed(() => props.book.pages.length)
const text = computed(() => props.book.pages[page.value] || '')
const segments = computed(() =>
  censorSegments(text.value).map((s, i) =>
    s.bar ? { ...s, note: NOTES[hashStr(`${props.book.id}:${page.value}:${i}`) % NOTES.length] } : s))

const closeBtn = ref(null)
const textEl = ref(null)

// Наведение мышью или фокус (тап на телефоне ставит фокус) — показать подпись.
const note = ref(null)
function onBar(e) {
  const bar = e.target.closest?.('.bar')
  if (!bar) return
  const box = bar.closest('.rd__page').getBoundingClientRect()
  // У переноса строки плашка — два прямоугольника, берём первый.
  const r = bar.getClientRects()[0] || bar.getBoundingClientRect()
  const x = Math.min(Math.max(r.left + r.width / 2 - box.left, 110), box.width - 110)
  const below = r.top - box.top < 70
  note.value = { text: bar.dataset.note, x, y: below ? r.bottom - box.top + 8 : r.top - box.top - 8, below }
}
function offBar(e) {
  if (e.type === 'pointerout' && document.activeElement?.classList.contains('bar')) return
  if (!e.relatedTarget?.closest?.('.bar')) note.value = null
}

function go(d) {
  const n = Math.min(total.value - 1, Math.max(0, page.value + d))
  if (n !== page.value) page.value = n
}
watch(page, () => {
  note.value = null
  if (textEl.value) textEl.value.scrollTop = 0
})
watch(() => props.book.id, () => { page.value = 0 })

function onKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); emit('close') }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  else if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  else if (e.key === 'Tab') trapTab(e)
}

// Фокус не уходит из книги на страницу под ней.
function trapTab(e) {
  const root = e.currentTarget
  const items = [...root.querySelectorAll('button:not([disabled]), [tabindex="0"]')]
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

let prevOverflow = ''
onMounted(async () => {
  prevOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  await nextTick()
  closeBtn.value?.focus({ preventScroll: true })
})
onBeforeUnmount(() => {
  document.documentElement.style.overflow = prevOverflow
})
</script>

<style scoped>
.rd {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(8, 5, 14, 0.82);
  backdrop-filter: blur(3px);
  animation: rd-fade 0.18s ease-out;
  overflow-y: auto;
}
@keyframes rd-fade { from { opacity: 0; } }

.rd__wrap {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 28px;
  max-width: 900px;
  animation: rd-pop 0.24s cubic-bezier(0.2, 1.3, 0.4, 1);
}
@keyframes rd-pop { from { transform: translateY(16px) scale(0.97); opacity: 0; } }

.rd__defs { position: absolute; width: 0; height: 0; }

.rd__close {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 40px;
  height: 40px;
  z-index: 3;
  font: 16px/1 'Minecraft Rus', monospace;
}

/* Книга как в игре: кожаная обложка по краю, внутри кремовая страница. */
.rd__book {
  flex: none;
  padding: 12px 12px 12px 22px;
  background:
    linear-gradient(90deg, #3d240f 0 4px, #6b4322 4px 8px, transparent 8px),
    linear-gradient(180deg, #7a4d27, #5e3a1b);
  border: 3px solid #1f1207;
  box-shadow: inset 0 3px 0 #9a6536, inset 0 -3px 0 #3a210c, 0 26px 50px -18px rgba(0, 0, 0, 0.9);
  image-rendering: pixelated;
}
.rd__page {
  position: relative;
  width: 420px;
  height: 540px;
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
  outline: none;
  scrollbar-width: thin;
  scrollbar-color: #b49a62 transparent;
  /* Место сверху, чтобы подпись над плашкой в первой строке не обрезалась. */
  padding-top: 2px;
}
.rd__empty { color: #8a7a58; font-style: italic; }

/* ── Плашка цензора: маркер, а не ровный прямоугольник ───────────────── */
/* Рваный край даёт SVG-фильтр #rd-marker (рябь + смещение), неровную
   заливку — полосы, как от нескольких проходов маркером. */
.bar {
  position: relative;
  color: transparent;
  background:
    linear-gradient(178deg, transparent 0 18%, rgba(70, 60, 90, 0.35) 18% 24%, transparent 24% 70%, rgba(70, 60, 90, 0.25) 70% 76%, transparent 76%),
    linear-gradient(90deg, rgba(20, 18, 26, 0.92), #08070b 12%, #0d0b12 55%, #050407 88%, rgba(20, 18, 26, 0.9));
  border-radius: 5px 9px 4px 8px / 8px 4px 9px 5px;
  padding: 2px 4px 1px;
  margin: 0 -2px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  filter: url(#rd-marker);
  cursor: help;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.bar--1 { border-radius: 9px 4px 8px 5px / 4px 9px 5px 8px; padding: 1px 5px 2px; }
.bar--2 { border-radius: 4px 8px 9px 4px / 9px 5px 4px 8px; }
.bar--3 { border-radius: 8px 5px 4px 9px / 5px 8px 9px 4px; padding: 2px 3px; }
.bar:hover, .bar:focus { background-color: #000; box-shadow: 0 0 0 2px rgba(196, 18, 26, 0.35); }

.note {
  position: absolute;
  z-index: 5;
  width: max-content;
  max-width: 210px;
  padding: 6px 9px 5px;
  font: 12px/1.3 'Minecraft Rus', monospace;
  text-align: center;
  text-transform: uppercase;
  color: #b3121b;
  background: #fff6f1;
  border: 2px solid #b3121b;
  outline: 1px solid #b3121b;
  outline-offset: 2px;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -100%) rotate(-2.5deg);
  pointer-events: none;
  animation: note-in 0.14s ease-out;
}
.note--below { transform: translate(-50%, 0) rotate(2deg); }
@keyframes note-in { from { opacity: 0; } }

/* ── Штамп ──────────────────────────────────────────────────────────── */
.stamp {
  position: absolute;
  right: 14px;
  bottom: 56px;
  padding: 4px 10px 3px;
  font: 16px/1 'Minecraft Rus', monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(196, 18, 26, 0.82);
  border: 3px solid rgba(196, 18, 26, 0.82);
  border-radius: 3px;
  transform: rotate(-11deg);
  mix-blend-mode: multiply;
  pointer-events: none;
}
.stamp--big {
  right: 50%;
  bottom: 45%;
  transform: translate(50%, 50%) rotate(-14deg);
  font-size: 24px;
  padding: 8px 14px 6px;
}

.rd__nav {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
}
.arrow {
  width: 54px;
  height: 32px;
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
.arrow:hover svg, .arrow:focus-visible svg { color: #c0392b; fill: #a3281c; }
.arrow:focus-visible { outline: 2px dashed #6b4b24; outline-offset: 2px; }
.arrow--hidden { visibility: hidden; }

/* ── Справка о книге ───────────────────────────────────────────────── */
.rd__info {
  width: 320px;
  padding-top: 8px;
  color: #e8e7f0;
}
.rd__title {
  margin: 0;
  padding: 0;
  border: 0;
  font: 22px/1.25 'Minecraft Rus', monospace;
  color: #ffff55;
  text-shadow: 2px 2px 0 #3f3f15;
  overflow-wrap: anywhere;
  padding-right: 44px;
}
.rd__by {
  margin: 6px 0 18px;
  font: 14px/1.3 'Minecraft Rus', monospace;
  color: #aaa;
}
.rd__facts { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; }
.rd__facts dt { font-size: 12px; color: #9a94ab; text-transform: uppercase; letter-spacing: 0.06em; }
.rd__facts dd { margin: 2px 0 0; font-size: 15px; }
.rd__wide { grid-column: 1 / -1; }
.rd__where { list-style: none; margin: 4px 0 0; padding: 0; font-size: 14px; line-height: 1.5; }
.rd__where li { margin: 0; }
.rd__where i { color: #9a94ab; font-style: normal; }
.rd__where code {
  margin-left: 6px;
  padding: 1px 6px;
  font: 13px 'Minecraft Rus', monospace;
  color: #55ffff;
  background: rgba(85, 255, 255, 0.08);
  border-radius: 3px;
}
.rd__keys { margin: 20px 0 0; font: 12px 'Minecraft Rus', monospace; color: #605a72; }

/* ── Телефон: книга на весь экран ──────────────────────────────────── */
@media (max-width: 860px) {
  .rd { padding: 0; align-items: stretch; display: block; }
  .rd__wrap { flex-direction: column; gap: 0; max-width: none; min-height: 100%; animation: none; }
  .rd__close { top: 10px; right: 10px; }
  .rd__book { padding: 8px 8px 8px 14px; border-width: 0 0 3px; }
  .rd__page {
    width: auto;
    height: calc(100dvh - 19px);
    padding: 16px 16px 8px;
  }
  .rd__counter { padding-right: 46px; line-height: 24px; }
  .rd__info { width: auto; padding: 22px 16px 40px; }
  .rd__keys { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .rd, .rd__wrap, .note { animation: none; }
}
</style>
