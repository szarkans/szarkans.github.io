<template>
  <section class="htowns">
    <p v-if="error" class="htowns__error">Не получилось загрузить данные сезона: {{ error }}</p>
    <div v-else-if="!data" class="htowns__loading" aria-busy="true"><span v-for="k in 3" :key="k" /></div>

    <template v-else>
      <div class="finder">
        <label class="sr" :for="inputId">Ник игрока</label>
        <div class="finder__field">
          <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
          <input
            :id="inputId" ref="input" v-model="query" type="search" autocomplete="off" spellcheck="false"
            placeholder="Где жил игрок"
            @keydown.enter.prevent="choose(suggestions[0])" @keydown.down.prevent="focusSuggestion(0)"
            @input="player = null"
          >
        </div>
        <ul v-if="query && !player && suggestions.length" ref="sugList" class="finder__sugs">
          <li v-for="(p, i) in suggestions" :key="p.n">
            <button
              type="button" @click="choose(p)"
              @keydown.down.prevent="focusSuggestion(i + 1)" @keydown.up.prevent="i ? focusSuggestion(i - 1) : input.focus()"
            >{{ p.n }}</button>
          </li>
        </ul>
        <p v-else-if="query.trim() && !player" class="finder__muted">В {{ season }} сезоне такого ника нет.</p>

        <div v-if="player" class="finder__result" aria-live="polite">
          <template v-if="player.bed">
            <CopyCmd :cmd="tpBed(player.bed)" />
            <p v-if="home" class="finder__muted">
              Жил в <a :href="`#${home.id}`" @click.prevent="goTo(home.id)">{{ home.title || `поселении у ${fmt(home.x)}, ${fmt(home.z)}` }}</a>
            </p>
          </template>
          <p v-else class="finder__muted">Кровати не осталось.</p>
        </div>
      </div>

      <div class="layout">
        <div class="layout__map">
          <TownMap :towns="data.towns" :season="season" :selected="selectedId" :bed="player?.bed" @select="pick" />
        </div>

        <ul class="list">
          <li
            v-for="t in shownTowns" :id="t.id" :key="t.id" class="row" :class="{ open: t.id === selectedId }" tabindex="-1"
          >
            <button type="button" class="row__head" :aria-expanded="t.id === selectedId" @click="toggle(t.id)">
              <i class="row__dot" :class="{ named: t.g, small: isSmall(t) }" aria-hidden="true" />
              <span class="row__name" :class="{ none: !t.title }">
                {{ t.title || 'Без названия' }}<sup v-if="t.g && !t.ok" aria-label="название не подтверждено">?</sup>
              </span>
              <span class="row__xz">{{ fmt(t.x) }}, {{ fmt(t.z) }}</span>
            </button>
            <div v-if="t.id === selectedId" class="row__body">
              <CopyCmd :cmd="tpTown(t)" />
              <p class="row__people">
                <span class="row__count">{{ t.n }} {{ plural(t.n, 'житель', 'жителя', 'жителей') }}</span>
                <template v-for="(nick, i) in people(t)" :key="nick">
                  <b v-if="nick.toLowerCase() === hl">{{ nick }}</b><template v-else>{{ nick }}</template><template v-if="i < people(t).length - 1">, </template>
                </template>
                {{ ' ' }}<button v-if="t.p.length > people(t).length" type="button" class="link" @click="allPeople = t.id">
                  и ещё {{ t.p.length - people(t).length }}
                </button>
              </p>
            </div>
          </li>
          <li v-if="!showSmall && smallCount" class="more">
            <button type="button" class="link" @click="showSmall = true">Ещё {{ smallCount }} {{ plural(smallCount, 'маленькое', 'маленьких', 'маленьких') }}</button>
          </li>
        </ul>
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import TownMap from './TownMap.vue'
import CopyCmd from './CopyCmd.vue'
import { loadSeason, isSmall, townOfPlayer, tpTown, tpBed, fmt } from './towns.js'
import { plural } from '../library/data.js'

const props = defineProps({ season: { type: Number, required: true } })
const inputId = `finder-${props.season}`

const data = ref(null)
const error = ref('')
const query = ref('')
const player = ref(null)
const selectedId = ref(null)
const showSmall = ref(false)
const allPeople = ref(null)
const input = ref(null)
const sugList = ref(null)

const smallCount = computed(() => data.value?.towns.filter(isSmall).length ?? 0)
const shownTowns = computed(() => data.value?.towns.filter(t => showSmall.value || !isSmall(t)) ?? [])
const home = computed(() => player.value && townOfPlayer(data.value, player.value))
const hl = computed(() => player.value?.n.toLowerCase() ?? '')

const LIMIT = 12
function people(t) {
  if (allPeople.value === t.id || t.p.length <= LIMIT + 2) return t.p
  const first = t.p.slice(0, LIMIT)
  const hit = t.p.find(n => n.toLowerCase() === hl.value)
  return hit && !first.includes(hit) ? [hit, ...first.slice(0, LIMIT - 1)] : first
}

const suggestions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q || !data.value) return []
  const starts = [], has = []
  for (const p of data.value.players) {
    const n = p.n.toLowerCase()
    if (n.startsWith(q)) starts.push(p)
    else if (n.includes(q)) has.push(p)
    if (starts.length >= 6) break
  }
  return [...starts, ...has].slice(0, 6)
})

function setUrl(mut) {
  const u = new URL(location.href)
  mut(u)
  history.replaceState(history.state, '', u)
}

function choose(p) {
  if (!p) return
  player.value = p
  query.value = p.n
  setUrl(u => u.searchParams.set('player', p.n))
  const t = townOfPlayer(data.value, p)
  if (t) open(t.id)
}

function focusSuggestion(i) {
  const btns = sugList.value?.querySelectorAll('button')
  btns?.[Math.min(i, btns.length - 1)]?.focus()
}

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function open(id) {
  const t = data.value.towns.find(x => x.id === id)
  if (!t) { console.warn('Нет такого поселения в сезоне', props.season, id); return null }
  if (isSmall(t)) showSmall.value = true
  selectedId.value = id
  return t
}

function toggle(id) {
  if (selectedId.value === id) { selectedId.value = null; return }
  open(id)
  setUrl(u => { u.hash = id })
}

async function pick(id) {
  if (!open(id)) return
  setUrl(u => { u.hash = id })
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' })
}

async function goTo(id) {
  if (!open(id)) return
  setUrl(u => { u.hash = id })
  await nextTick()
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' })
  el.focus({ preventScroll: true })
}

function onHash() {
  const id = decodeURIComponent(location.hash.slice(1))
  if (id && data.value?.towns.some(t => t.id === id)) goTo(id)
}

onMounted(async () => {
  window.addEventListener('hashchange', onHash)
  try {
    data.value = await loadSeason(props.season)
  } catch (e) {
    console.error(e)
    error.value = e.message
    return
  }
  const nick = new URLSearchParams(location.search).get('player')
  if (nick) {
    query.value = nick
    const p = data.value.playerByNick.get(nick.toLowerCase())
    if (p) choose(p)
  }
  await nextTick()
  onHash()
})
onBeforeUnmount(() => window.removeEventListener('hashchange', onHash))
</script>

<style scoped>
.htowns { display: flex; flex-direction: column; gap: 20px; margin-top: 28px; font-family: 'Rubik', sans-serif; }
.htowns > * { margin: 0; }
.htowns ul, .htowns li { margin: 0 !important; padding: 0 !important; list-style: none; }
.htowns p { margin: 0; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

.htowns__error { padding: 14px 16px; border: 1px solid rgba(240,80,100,.4); border-radius: 12px; color: #ffb4be; }
.htowns__loading { display: flex; gap: 8px; padding: 40px 0; }
.htowns__loading span { width: 10px; height: 10px; background: #a67cf5; animation: blink 1s steps(2) infinite; }
.htowns__loading span:nth-child(2) { animation-delay: .2s; } .htowns__loading span:nth-child(3) { animation-delay: .4s; }
@keyframes blink { 50% { opacity: .2; } }

.link {
  padding: 0; border: 0; background: none; color: #a67cf5; font: inherit; cursor: pointer;
}
.link:hover { color: #d5bcff; }
.link:focus-visible, .htowns button:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; border-radius: 6px; }

/* поиск игрока */
.finder { display: flex; flex-direction: column; gap: 12px; max-width: 460px; }
.finder__field { position: relative; }
.finder__field svg { position: absolute; left: 14px; top: 50%; width: 16px; height: 16px; translate: 0 -50%; fill: none; stroke: #8f87a3; stroke-width: 1.6; stroke-linecap: round; pointer-events: none; }
.finder input {
  width: 100%; height: 46px; padding: 0 14px 0 40px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px;
  background: #15121d; color: #e8e7f0; font: 16px 'Rubik', sans-serif;
}
.finder input::placeholder { color: #8f87a3; }
.finder input:focus { border-color: #8b5ee8; outline: none; }
.finder__sugs { display: flex; flex-wrap: wrap; gap: 6px; }
.finder__sugs button {
  padding: 7px 12px; border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
  background: #15121d; color: #e8e7f0; font: 14px 'Rubik', sans-serif; cursor: pointer;
}
.finder__sugs button:hover { border-color: #8b5ee8; }
.finder__muted { color: #9a94ab; font-size: 14px; }
.finder__muted a { color: #d5bcff; font-weight: 500; }
.finder__result { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }

/* карта + список */
.layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 24px; align-items: start; }
.layout__map { position: sticky; top: calc(var(--vp-nav-height, 64px) + 20px); }

.list { display: flex; flex-direction: column; }
.row { border-bottom: 1px solid rgba(255,255,255,.06); scroll-margin: 90px 0 24px; }
.row:focus { outline: none; }
.row__head {
  display: flex; align-items: center; gap: 12px; width: 100%; min-height: 46px; padding: 0 6px;
  border: 0; background: none; color: #e8e7f0; font: 500 15px 'Rubik', sans-serif; text-align: left; cursor: pointer;
}
.row__head:hover .row__name { color: #fff; }
.row__dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: #8b5ee8; }
.row__dot.named { background: #f5c451; }
.row__dot.small { background: #6f6488; }
.row__name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.row__name.none { color: #8f87a3; font-weight: 400; }
.row__name sup { margin-left: 3px; color: #8f87a3; font-size: 11px; }
.row__xz { flex: none; color: #8f87a3; font-size: 13px; font-variant-numeric: tabular-nums; }
.row.open .row__name { color: #fff; font-weight: 600; }
.row.open .row__name.none { color: #c9c5d6; }

.row__body { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 2px 6px 18px 26px; }
.row__people { color: #9a94ab; font-size: 13.5px; line-height: 1.6; overflow-wrap: anywhere; }
.row__count { display: block; color: #c9c5d6; font-weight: 500; }
.row__people b { color: #fff; font-weight: 600; }
.more { padding: 14px 6px 0 26px !important; font-size: 14px; }

@media (max-width: 900px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
  .layout__map { position: static; }
}
@media (prefers-reduced-motion: reduce) {
  .htowns__loading span { animation: none; }
}
</style>
