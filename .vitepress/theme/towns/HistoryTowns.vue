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

      <TownMap :towns="data.towns" :season="season" :selected="selectedId" :bed="player?.bed" @select="pick" />

      <div class="signs">
        <TownCard
          v-for="t in shownTowns" :key="t.id" :town="t" :selected="t.id === selectedId" :highlight="player?.n ?? ''"
          @select="pick"
        />
      </div>
      <button v-if="!showSmall && smallCount" type="button" class="link more" @click="showSmall = true">
        Ещё {{ smallCount }} {{ plural(smallCount, 'маленькое', 'маленьких', 'маленьких') }}
      </button>
    </template>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import TownMap from './TownMap.vue'
import CopyCmd from './CopyCmd.vue'
import TownCard from './TownCard.vue'
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
const input = ref(null)
const sugList = ref(null)

const smallCount = computed(() => data.value?.towns.filter(isSmall).length ?? 0)
const shownTowns = computed(() => data.value?.towns.filter(t => showSmall.value || !isSmall(t)) ?? [])
const home = computed(() => player.value && townOfPlayer(data.value, player.value))

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

.signs { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.more { align-self: flex-start; min-height: 32px; font-size: 14px; }

@media (prefers-reduced-motion: reduce) {
  .htowns__loading span { animation: none; }
}
</style>
