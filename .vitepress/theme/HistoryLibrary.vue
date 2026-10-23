<template>
  <div class="lib">
    <p class="lib__disclaimer">
      Тексты книг перенесены из миров как есть, без правок, только чтобы показать архив. За их содержание администрация не отвечает.
    </p>

    <div class="lib__bar">
      <div class="lib__views" role="radiogroup" aria-label="Как показать книги">
        <span class="lib__views-label">Вид</span>
        <button
          v-for="v in VIEWS"
          :key="v.id"
          type="button"
          role="radio"
          class="seg"
          :aria-checked="view === v.id"
          @click="setView(v.id)"
        >{{ v.label }}</button>
      </div>

      <label class="lib__search">
        <span class="sr">Поиск по названию и автору</span>
        <input v-model="query" type="search" placeholder="Название или автор" autocomplete="off" />
      </label>

      <div class="lib__sort" role="radiogroup" aria-label="Сортировка">
        <button
          v-for="s in SORTS"
          :key="s.id"
          type="button"
          role="radio"
          class="seg seg--small"
          :aria-checked="sort === s.id"
          @click="sort = s.id"
        >{{ s.label }}</button>
      </div>

      <label class="lib__check">
        <input v-model="signedOnly" type="checkbox" />
        <span>Только подписанные</span>
      </label>
    </div>

    <p v-if="books" class="lib__stats">
      {{ shown.length }} {{ plural(shown.length, 'книга', 'книги', 'книг') }}
      <template v-if="shown.length !== books.length"> из {{ books.length }}</template>
      · {{ authors }} {{ plural(authors, 'автор', 'автора', 'авторов') }}
      <template v-if="censored"> · <span class="lib__red">{{ censored }} под цензурой</span></template>
    </p>

    <div v-if="error" class="lib__msg">
      Не получилось достать книги: {{ error }}.
      <button type="button" class="mcbtn lib__retry" @click="load">Ещё раз</button>
    </div>
    <div v-else-if="!books" class="lib__msg lib__msg--wait">Снимаем книги с полок…</div>
    <div v-else-if="!shown.length" class="lib__msg">Таких книг в этом мире не нашлось.</div>

    <div
      v-else
      class="lib__stage"
      @pointerdown="onPointerDown"
      @pointerover="onOver"
      @pointerout="onOut"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      @click="onClick"
    >
      <LibShelf v-if="view === '1'" :books="shown" :sort="sort" :active-id="activeId" :narrow="narrow" />
      <LibChest v-else-if="view === '2'" :books="shown" :sort="sort" :active-id="activeId" />
      <LibAuthors v-else :books="shown" :sort="sort" :active-id="activeId" :narrow="narrow" />
    </div>

    <!-- Одна подсказка на всю библиотеку: 600 подсказок в DOM — это тормоза. -->
    <Teleport to="body">
      <div
        v-if="tip && !sheet"
        ref="tipEl"
        class="mctip"
        :style="{ left: `${tipPos.x}px`, top: `${tipPos.y}px`, visibility: tipPos.ready ? 'visible' : 'hidden' }"
        role="tooltip"
      >
        <BookInfo :book="tip" />
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="sheet" class="mcsheet" role="dialog" aria-label="О книге">
        <div class="mctip mctip--sheet">
          <BookInfo :book="sheet" />
          <div class="mcsheet__btns">
            <button type="button" class="mcbtn mcbtn--go" @click="openBook(sheet)">Читать</button>
            <button type="button" class="mcbtn" aria-label="Закрыть" @click="clearActive">✕</button>
          </div>
        </div>
      </div>
    </Teleport>

    <BookReader v-if="reading" :book="reading" @close="closeBook" />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import LibShelf from './library/LibShelf.vue'
import LibChest from './library/LibChest.vue'
import LibAuthors from './library/LibAuthors.vue'
import BookReader from './library/BookReader.vue'
import BookInfo from './library/BookInfo.vue'
import { SORTS, filterBooks, loadSeasonBooks, plural, sortBooks } from './library/data.js'

const props = defineProps({ season: { type: [Number, String], required: true } })

const VIEWS = [
  { id: '1', label: 'Полка' },
  { id: '2', label: 'Сундук' },
  { id: '3', label: 'По авторам' },
]

const books = shallowRef(null)
const error = ref('')
const view = ref('1')
const sort = ref('author')
const query = ref('')
const signedOnly = ref(false)
const narrow = ref(false)

const byId = computed(() => new Map((books.value || []).map((b) => [b.id, b])))
const shown = computed(() =>
  books.value ? sortBooks(filterBooks(books.value, { signedOnly: signedOnly.value, query: query.value }), sort.value) : [])
const authors = computed(() => new Set(shown.value.filter((b) => b.author).map((b) => b.author)).size)
const censored = computed(() => shown.value.filter((b) => b.censor).length)

// ── Адрес: ?v=1|2|3 и ?book=<id> ─────────────────────────────────────────
function readUrl() {
  const q = new URLSearchParams(location.search)
  if (VIEWS.some((v) => v.id === q.get('v'))) view.value = q.get('v')
  return q.get('book')
}
function writeUrl(patch) {
  const url = new URL(location.href)
  for (const [k, v] of Object.entries(patch)) {
    if (v == null) url.searchParams.delete(k)
    else url.searchParams.set(k, v)
  }
  history.replaceState(history.state, '', url)
}
function setView(id) {
  view.value = id
  clearActive()
  writeUrl({ v: id })
}

// ── Загрузка ─────────────────────────────────────────────────────────────
let wantBook = null
async function load() {
  error.value = ''
  try {
    books.value = await loadSeasonBooks(props.season)
    if (wantBook) {
      const b = byId.value.get(wantBook)
      if (b) reading.value = b
      else console.warn(`[Библиотека] книги ${wantBook} нет в ${props.season} сезоне`)
      wantBook = null
    }
  } catch (e) {
    console.error('[Библиотека]', e)
    error.value = e.message || String(e)
  }
}

let mq
const onMq = () => { narrow.value = mq.matches }
onMounted(() => {
  wantBook = readUrl()
  mq = matchMedia('(max-width: 640px)')
  onMq()
  mq.addEventListener('change', onMq)
  window.addEventListener('scroll', hideTip, { passive: true })
  load()
})
onBeforeUnmount(() => {
  mq?.removeEventListener('change', onMq)
  window.removeEventListener('scroll', hideTip)
})

// ── Наведение, фокус, тап ────────────────────────────────────────────────
// Слушаем на общем контейнере, а не на каждой книге.
const tip = shallowRef(null)
const sheet = shallowRef(null)
const activeId = ref(null)
const tipEl = ref(null)
const tipPos = reactive({ x: 0, y: 0, ready: false })
let anchor = null
let lastPointer = 'mouse'

const bookEl = (e) => e.target.closest?.('[data-book]')

function showTip(el) {
  const b = byId.value.get(el.dataset.book)
  if (!b) return
  anchor = el
  tip.value = b
  activeId.value = b.id
  tipPos.ready = false
  nextTick(placeTip)
}
function placeTip() {
  if (!anchor || !tipEl.value) return
  const r = anchor.getBoundingClientRect()
  const t = tipEl.value.getBoundingClientRect()
  const vw = document.documentElement.clientWidth
  let x = r.left + r.width / 2 - t.width / 2
  x = Math.max(8, Math.min(vw - t.width - 8, x))
  // Над книгой; не влезает — под ней. Книга при наведении выезжает на 14px.
  let y = r.top - t.height - 22
  if (y < 64) y = r.bottom + 10
  tipPos.x = Math.round(x)
  tipPos.y = Math.round(y)
  tipPos.ready = true
}
function hideTip() {
  if (!tip.value) return
  tip.value = null
  anchor = null
  if (!sheet.value) activeId.value = null
}
function clearActive() {
  tip.value = null
  sheet.value = null
  anchor = null
  activeId.value = null
}

function onPointerDown(e) { lastPointer = e.pointerType || 'mouse' }
function onOver(e) {
  if (e.pointerType !== 'mouse') return
  const el = bookEl(e)
  if (el && el !== anchor) showTip(el)
}
function onOut(e) {
  if (e.pointerType !== 'mouse' || !anchor) return
  if (!anchor.contains(e.relatedTarget)) hideTip()
}
function onFocusIn(e) {
  const el = bookEl(e)
  if (el && el.matches(':focus-visible') && !sheet.value) showTip(el)
}
function onFocusOut() { if (!sheet.value) hideTip() }

function onClick(e) {
  const el = bookEl(e)
  // Тап мимо книг (по полке, по стрелкам) убирает карточку.
  if (!el) return clearActive()
  const b = byId.value.get(el.dataset.book)
  if (!b) return
  // Пальцем: первый тап — карточка, второй по той же книге — читать.
  if (e.detail > 0 && lastPointer !== 'mouse') {
    if (sheet.value?.id === b.id) openBook(b)
    else {
      tip.value = null
      sheet.value = b
      activeId.value = b.id
    }
    return
  }
  openBook(b)
}

// ── Читалка ──────────────────────────────────────────────────────────────
const reading = shallowRef(null)
let returnFocus = null
function openBook(b) {
  returnFocus = document.querySelector(`[data-book="${CSS.escape(b.id)}"]`)
  clearActive()
  reading.value = b
  writeUrl({ book: b.id })
}
function closeBook() {
  reading.value = null
  writeUrl({ book: null })
  returnFocus?.focus({ preventScroll: true })
  returnFocus = null
}

watch([view, sort, query, signedOnly], () => clearActive())
</script>

<style>
/* Шрифт игры — тот же файл, что у верстака (CraftingGrid.vue). */
@font-face {
  font-family: 'Minecraft Rus';
  src: url('/assets/minecraft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Каменная кнопка из игры: серый блок со скосом, белый текст с тенью. */
.mcbtn {
  display: inline-grid;
  place-items: center;
  padding: 0 14px;
  min-height: 36px;
  font: 16px/1 'Minecraft Rus', monospace;
  color: #fff;
  text-shadow: 2px 2px 0 #3f3f3f;
  background: #6f6f6f;
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0 #aaa, inset -2px -3px 0 #4a4a4a;
  cursor: pointer;
  image-rendering: pixelated;
}
.mcbtn:hover:not(:disabled),
.mcbtn:focus-visible {
  background: #7b6fb8;
  box-shadow: inset 2px 2px 0 #b9adf5, inset -2px -3px 0 #4a3d8a;
  outline: none;
}
.mcbtn:disabled { color: #a0a0a0; text-shadow: none; background: #2c2c2c; box-shadow: none; cursor: default; }
.mcbtn--go { flex: 1; }

/* Подсказка как у предмета в игре: почти чёрная, с фиолетовой рамкой. */
.mctip {
  position: fixed;
  z-index: 150;
  max-width: min(340px, calc(100vw - 16px));
  padding: 8px 10px 7px;
  font: 16px/20px 'Minecraft Rus', monospace;
  color: #fff;
  background: rgba(16, 0, 16, 0.94);
  border: 2px solid #100010;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #5000ff, inset 0 0 0 3px #28007f, 0 10px 24px rgba(0, 0, 0, 0.55);
  pointer-events: none;
  animation: mctip-in 0.12s ease-out;
}
@keyframes mctip-in { from { opacity: 0; transform: translateY(4px); } }

.mcsheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  padding: 0 10px calc(10px + env(safe-area-inset-bottom));
}
.mctip--sheet {
  position: static;
  max-width: none;
  pointer-events: auto;
  padding: 12px 14px;
}
.mcsheet__btns { display: flex; gap: 8px; margin-top: 12px; }

@media (prefers-reduced-motion: reduce) {
  .mctip { animation: none; }
}
</style>

<style scoped>
.lib { margin: 20px 0 40px; }

.lib__disclaimer {
  margin: 0 0 20px;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  border-left: 3px solid #c4121a;
  background: rgba(196, 18, 26, 0.08);
  border-radius: 0 6px 6px 0;
}

.lib__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 10px;
}
.lib__views,
.lib__sort {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.lib__views-label {
  padding: 0 6px 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}
.seg {
  padding: 6px 12px;
  font: 500 14px/1.2 'Rubik', sans-serif;
  color: var(--vp-c-text-2);
  border-radius: 7px;
  transition: background 0.15s, color 0.15s;
}
.seg--small { padding: 5px 10px; font-size: 13px; }
.seg:hover { color: var(--vp-c-text-1); }
.seg[aria-checked='true'] { color: #fff; background: var(--vp-c-brand-3); }
.seg:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }

.lib__search { flex: 1 1 200px; min-width: 0; }
.lib__search input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.lib__search input:focus { outline: none; border-color: var(--vp-c-brand-1); }

.lib__check { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--vp-c-text-2); cursor: pointer; }
.lib__check input { accent-color: var(--vp-c-brand-1); width: 16px; height: 16px; }

.lib__stats { margin: 0 0 22px; font-size: 13px; color: var(--vp-c-text-3); }
.lib__red { color: #f0646b; }

.lib__msg {
  padding: 48px 16px;
  text-align: center;
  font: 16px/1.5 'Minecraft Rus', monospace;
  color: var(--vp-c-text-2);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
}
.lib__msg--wait { animation: lib-blink 1.2s steps(2) infinite; }
@keyframes lib-blink { 50% { opacity: 0.55; } }
.lib__retry { margin-left: 10px; }

.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

@media (max-width: 640px) {
  .lib__views, .lib__sort { width: 100%; }
  .lib__views .seg, .lib__sort .seg { flex: 1; padding-left: 4px; padding-right: 4px; }
  .lib__views-label { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .lib__msg--wait { animation: none; }
}
</style>
