<template>
  <section class="htowns">
    <div class="htowns__variants" role="group" aria-label="Вариант оформления страницы">
      <span>Вариант:</span>
      <button
        v-for="v in VARIANTS" :key="v.id" type="button" :aria-pressed="variant === v.id"
        :class="{ on: variant === v.id }" @click="setVariant(v.id)"
      ><b>{{ v.n }}</b> {{ v.label }}</button>
    </div>

    <p v-if="error" class="htowns__error">Не получилось загрузить данные сезона: {{ error }}</p>
    <div v-else-if="!data" class="htowns__loading" aria-busy="true">
      <span v-for="k in 3" :key="k" />
      <p>Достаём карту {{ season }} сезона из архива…</p>
    </div>

    <template v-else>
      <p class="htowns__summary">
        <b>{{ main.length }}</b> {{ plural(main.length, 'поселение', 'поселения', 'поселений') }}
        <template v-if="bases.length"> и <b>{{ bases.length }}</b> {{ plural(bases.length, 'общая база', 'общие базы', 'общих баз') }}</template>
        · <b>{{ bedCount }}</b> {{ plural(bedCount, 'игрок оставил', 'игрока оставили', 'игроков оставили') }} кровать
      </p>

      <!-- Где жил игрок -->
      <div class="finder" :class="{ 'finder--open': player }">
        <label class="finder__label" :for="inputId">Где жил игрок?</label>
        <div class="finder__row">
          <input
            :id="inputId" ref="input" v-model="query" type="search" autocomplete="off" spellcheck="false"
            :placeholder="`Ник в ${season} сезоне`" aria-describedby="finder-hint"
            @keydown.enter.prevent="choose(suggestions[0])" @keydown.down.prevent="focusSuggestion(0)"
            @input="player = null"
          >
        </div>
        <p id="finder-hint" class="finder__hint">
          {{ data.players.length }} игроков в архиве сезона. Нажми на ник на табличке — найдём его кровать.
        </p>
        <ul v-if="query && !player && suggestions.length" ref="sugList" class="finder__sugs" aria-label="Подходящие ники">
          <li v-for="(p, i) in suggestions" :key="p.n">
            <button
              type="button" @click="choose(p)"
              @keydown.down.prevent="focusSuggestion(i + 1)" @keydown.up.prevent="i ? focusSuggestion(i - 1) : input.focus()"
            >{{ p.n }}<small v-if="!p.bed">без кровати</small></button>
          </li>
        </ul>
        <p v-else-if="query && !player" class="finder__none">Такого ника в {{ season }} сезоне нет. Может, он играл в другом?</p>

        <div v-if="player" class="finder__result" aria-live="polite">
          <h3>{{ player.n }}</h3>
          <div class="finder__facts">
            <div class="fact">
              <span class="fact__icon fact__icon--bed" aria-hidden="true" />
              <div>
                <p class="fact__t">Кровать</p>
                <template v-if="player.bed">
                  <p class="fact__v">{{ coord(player.bed) }}</p>
                  <CopyCmd :cmd="tpPoint(player.bed)" />
                </template>
                <p v-else class="fact__v fact__v--muted">не ставил — возрождался на спавне</p>
              </div>
            </div>
            <div class="fact">
              <span class="fact__icon fact__icon--door" aria-hidden="true" />
              <div>
                <p class="fact__t">Где вышел в последний раз</p>
                <template v-if="player.out && isRealDim(player.d)">
                  <p class="fact__v">{{ coord(player.out) }} <small>{{ DIM_NAMES[player.d] }}</small></p>
                  <CopyCmd :cmd="tpPoint(player.out, player.d)" />
                </template>
                <p v-else class="fact__v fact__v--muted">в служебном мире ({{ player.d || 'неизвестно' }}) — там уже ничего нет</p>
              </div>
            </div>
          </div>
          <p class="finder__home">
            <template v-if="home">
              Дом —
              <a :href="`#${home.id}`" @click.prevent="goTo(home.id)">{{ home.title }}</a>
              <span v-if="home.g && !home.ok" class="finder__guess">(название — догадка)</span>
              <span v-if="home.far" class="finder__guess">— числился жителем, но кровать стояла поодаль</span>
            </template>
            <template v-else-if="player.bed">Жил сам по себе: рядом с кроватью нет поселения из трёх и больше игроков.</template>
            <template v-else>Дом по кровати не найти.</template>
          </p>
        </div>
      </div>

      <!-- Вариант 1: таблички -->
      <template v-if="variant === 'signs'">
        <div class="signs">
          <TownCard
            v-for="t in main" :key="t.id" :town="t" look="sign" :highlight="player?.n" :flash="flashId === t.id"
            @nick="findNick"
          />
        </div>
      </template>

      <!-- Вариант 2: карта -->
      <template v-else>
        <div class="mapwrap">
          <TownMap :towns="data.towns" :season="season" :selected="selectedId" :bed="bedMark" @select="select" />
          <aside v-if="selectedTown" class="mapwrap__card" aria-live="polite">
            <TownCard :key="selectedTown.id" :town="selectedTown" look="plain" :anchor="false" :highlight="player?.n" @nick="findNick" />
            <a class="mapwrap__jump" :href="`#${selectedTown.id}`" @click.prevent="goTo(selectedTown.id)">к карточке в списке ↓</a>
          </aside>
        </div>
        <h2 class="htowns__h">Все поселения</h2>
        <div class="plain-list">
          <TownCard
            v-for="t in main" :key="t.id" :town="t" look="plain" :highlight="player?.n" :flash="flashId === t.id"
            @nick="findNick"
          />
        </div>
      </template>

      <details v-if="bases.length" ref="basesEl" class="bases" :open="basesOpen" @toggle="basesOpen = $event.target.open">
        <summary>
          <span>Общие базы <b>{{ bases.length }}</b></span>
          <small>3–4 игрока в одном месте — скорее база компании друзей, чем город</small>
        </summary>
        <div :class="variant === 'signs' ? 'signs signs--small' : 'plain-list'">
          <TownCard
            v-for="t in bases" :key="t.id" :town="t" :look="variant === 'signs' ? 'sign' : 'plain'"
            :highlight="player?.n" :flash="flashId === t.id" @nick="findNick"
          />
        </div>
      </details>

      <p class="htowns__how">
        Как пользоваться: скачай мир со страницы сезона, открой его в одиночной игре с читами и вставь команду.
        Без высоты (<code>~</code>) телепорт оставит тебя на текущей — безопаснее перейти в наблюдателя: <code>/gamemode spectator</code>.
        Поселение — это три и больше игроков, чьи кровати стоят в пределах 150 блоков друг от друга.
      </p>
    </template>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import TownCard from './TownCard.vue'
import TownMap from './TownMap.vue'
import CopyCmd from './CopyCmd.vue'
import { loadSeason, isSharedBase, townOfPlayer, tpPoint, isRealDim, DIM_NAMES, fmt } from './towns.js'

const props = defineProps({ season: { type: Number, required: true } })

const VARIANTS = [
  { id: 'signs', n: 1, label: 'Таблички' },
  { id: 'map', n: 2, label: 'Карта' },
]
const inputId = `finder-${props.season}`

const data = ref(null)
const error = ref('')
const variant = ref('signs')
const query = ref('')
const player = ref(null)
const selectedId = ref(null)
const flashId = ref(null)
const basesOpen = ref(false)
const input = ref(null)
const sugList = ref(null)

const main = computed(() => data.value?.towns.filter(t => !isSharedBase(t)) ?? [])
const bases = computed(() => data.value?.towns.filter(isSharedBase) ?? [])
const bedCount = computed(() => data.value?.players.filter(p => p.bed).length ?? 0)
const selectedTown = computed(() => data.value?.towns.find(t => t.id === selectedId.value))
const home = computed(() => player.value && townOfPlayer(data.value, player.value))
const bedMark = computed(() => player.value?.bed ? { x: player.value.bed[0], z: player.value.bed[2], nick: player.value.n } : null)

const suggestions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q || !data.value) return []
  const starts = [], has = []
  for (const p of data.value.players) {
    const n = p.n.toLowerCase()
    if (n.startsWith(q)) starts.push(p)
    else if (n.includes(q)) has.push(p)
    if (starts.length >= 8) break
  }
  return [...starts, ...has].slice(0, 8)
})

const plural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? few : many
}
const coord = ([x, y, z]) => `${fmt(x)}, ${y}, ${fmt(z)}`

function setUrl(mut) {
  const u = new URL(location.href)
  mut(u)
  history.replaceState(history.state, '', u)
}

function setVariant(v) {
  variant.value = v
  setUrl(u => u.searchParams.set('v', VARIANTS.find(x => x.id === v).n))
}

function choose(p) {
  if (!p) return
  player.value = p
  query.value = p.n
  setUrl(u => u.searchParams.set('player', p.n))
  const t = townOfPlayer(data.value, p)
  if (t) selectedId.value = t.id
}

function focusSuggestion(i) {
  const btns = sugList.value?.querySelectorAll('button')
  btns?.[Math.min(i, btns.length - 1)]?.focus()
}

function findNick(nick) {
  const p = data.value.playerByNick.get(nick.toLowerCase())
  if (!p) { console.warn('Ника нет в списке игроков сезона', nick); query.value = nick; player.value = null; return }
  choose(p)
  nextTick(() => {
    const el = document.querySelector('.finder')
    el?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' })
  })
}

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

let flashTimer
async function goTo(id, { replace = false } = {}) {
  const t = data.value?.towns.find(x => x.id === id)
  if (!t) { console.warn('Нет такого поселения в сезоне', props.season, id); return }
  if (isSharedBase(t)) basesOpen.value = true
  selectedId.value = id
  if (location.hash !== `#${id}`) {
    if (replace) setUrl(u => { u.hash = id })
    else history.pushState(history.state, '', `#${id}`)
  }
  await nextTick()
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' })
  el.focus({ preventScroll: true })
  flashId.value = null
  await nextTick()
  flashId.value = id
  clearTimeout(flashTimer)
  flashTimer = setTimeout(() => { flashId.value = null }, 1800)
}

function select(id) { selectedId.value = id }

function onHash() {
  const id = decodeURIComponent(location.hash.slice(1))
  if (id && data.value?.towns.some(t => t.id === id)) goTo(id, { replace: true })
}

onMounted(async () => {
  const q = new URLSearchParams(location.search)
  const v = VARIANTS.find(x => String(x.n) === q.get('v'))
  if (v) variant.value = v.id
  window.addEventListener('hashchange', onHash)
  try {
    data.value = await loadSeason(props.season)
  } catch (e) {
    console.error(e)
    error.value = e.message
    return
  }
  selectedId.value = main.value[0]?.id ?? null
  const nick = q.get('player')
  if (nick) {
    query.value = nick
    const p = data.value.playerByNick.get(nick.toLowerCase())
    if (p) choose(p)
  }
  await nextTick()
  onHash()
})
onBeforeUnmount(() => window.removeEventListener('hashchange', onHash))

watch(variant, () => nextTick(onHash))
</script>

<style scoped>
.htowns { --card: #1c1826; display: flex; flex-direction: column; gap: 22px; margin-top: 24px; font-family: 'Rubik', sans-serif; }
.htowns > * { margin: 0; }

.htowns__variants {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px; align-self: flex-start; max-width: 100%;
  padding: 5px; border: 1px dashed rgba(166,124,245,.45); border-radius: 12px; background: #12101a;
}
.htowns__variants > span { padding: 0 8px; color: #9a94ab; font-size: 13px; }
.htowns__variants button {
  padding: 7px 14px; border: 0; border-radius: 8px; background: transparent; color: #c9c5d6;
  font: 600 14px 'Rubik', sans-serif; cursor: pointer; transition: background .15s, color .15s;
}
.htowns__variants button b { margin-right: 4px; color: #8f87a3; }
.htowns__variants button:hover { background: rgba(255,255,255,.06); }
.htowns__variants button.on { background: #4f2dbe; color: #fff; box-shadow: 0 0 18px rgba(79,45,190,.5); }
.htowns__variants button.on b { color: #d5bcff; }
.htowns__variants button:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }

.htowns__summary { color: #9a94ab; font-size: 15px; }
.htowns__summary b { color: #e8e7f0; }
.htowns__error { padding: 14px 16px; border: 1px solid rgba(240,80,100,.4); border-radius: 12px; color: #ffb4be; }

.htowns__loading { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 30px 0; color: #9a94ab; }
.htowns__loading span { width: 12px; height: 12px; background: #a67cf5; animation: blink 1s steps(2) infinite; }
.htowns__loading span:nth-child(2) { animation-delay: .2s; } .htowns__loading span:nth-child(3) { animation-delay: .4s; }
.htowns__loading p { margin: 0 0 0 8px; }
@keyframes blink { 50% { opacity: .2; } }

/* поиск игрока */
.finder { display: flex; flex-direction: column; gap: 8px; padding: 18px; border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: linear-gradient(160deg, #201a2e, #17141f); }
.finder > * { margin: 0; }
.finder__label { font: 800 18px 'Unbounded', sans-serif; }
.finder input {
  width: 100%; padding: 12px 14px; border: 1px solid rgba(255,255,255,.14); border-radius: 10px;
  background: #0f0d14; color: #e8e7f0; font: 16px 'Rubik', sans-serif;
}
.finder input:focus { border-color: #8b5ee8; outline: none; box-shadow: 0 0 0 3px rgba(139,94,232,.25); }
.finder__hint, .finder__none { color: #8f87a3; font-size: 13px; }
.finder__sugs { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 !important; padding: 0 !important; list-style: none; }
.finder__sugs li { margin: 0 !important; }
.finder__sugs button {
  display: inline-flex; align-items: baseline; gap: 6px; padding: 6px 10px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px;
  background: rgba(255,255,255,.04); color: #e8e7f0; font: 14px 'Rubik', sans-serif; cursor: pointer;
}
.finder__sugs button small { color: #8f87a3; font-size: 11px; }
.finder__sugs button:hover, .finder__sugs button:focus-visible { border-color: #a67cf5; background: rgba(166,124,245,.16); outline: none; }

.finder__result { display: flex; flex-direction: column; gap: 14px; margin-top: 6px !important; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.08); }
.finder__result > * { margin: 0; }
.finder__result h3 { margin: 0; padding: 0; border: 0; font: 22px 'Minecraft Rus', monospace; color: #fff; overflow-wrap: anywhere; }
.finder__facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.fact { display: flex; gap: 12px; min-width: 0; }
.fact > div { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.fact p { margin: 0; }
.fact__t { color: #8f87a3; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
.fact__v { font-size: 16px; font-weight: 600; font-variant-numeric: tabular-nums; }
.fact__v small { color: #9a94ab; font-weight: 400; }
.fact__v--muted { color: #9a94ab; font-size: 14px; font-weight: 400; }
.fact__icon { flex: none; width: 32px; height: 32px; image-rendering: pixelated; }
/* кровать и дверь — пиксели на градиентах */
.fact__icon--bed {
  background:
    linear-gradient(#eee, #eee) 2px 10px / 10px 8px no-repeat,
    linear-gradient(#c22b2b, #c22b2b) 2px 10px / 28px 12px no-repeat,
    linear-gradient(#8a1d1d, #8a1d1d) 2px 22px / 28px 3px no-repeat,
    linear-gradient(#6b4a25, #6b4a25) 2px 25px / 4px 5px no-repeat,
    linear-gradient(#6b4a25, #6b4a25) 26px 25px / 4px 5px no-repeat;
}
.fact__icon--door {
  background:
    linear-gradient(#3b2a14, #3b2a14) 21px 16px / 3px 3px no-repeat,
    linear-gradient(#9c7a48, #9c7a48) 10px 4px / 6px 6px no-repeat,
    linear-gradient(#9c7a48, #9c7a48) 18px 4px / 6px 6px no-repeat,
    linear-gradient(#7c5a2e, #7c5a2e) 8px 2px / 18px 28px no-repeat;
}
.finder__home { color: #c9c5d6; font-size: 15px; }
.finder__home a { color: #d5bcff; font-weight: 600; }
.finder__guess { color: #f5a623; font-size: 13px; }

/* таблички */
.signs { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 26px 20px; align-items: start; }
.signs--small { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }

/* карта */
.mapwrap { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 16px; align-items: start; }
.mapwrap__card { display: flex; flex-direction: column; gap: 8px; position: sticky; top: 90px; }
.mapwrap__jump { align-self: flex-end; color: #a67cf5 !important; font-size: 13px; }
.htowns__h { margin: 10px 0 -6px !important; padding: 0 !important; border: 0 !important; font: 800 22px 'Unbounded', sans-serif; }
.plain-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; align-items: start; }

.bases { border: 1px solid rgba(255,255,255,.08); border-radius: 14px; background: #12101a; }
.bases > summary { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; padding: 14px 18px; cursor: pointer; }
.bases > summary span { font: 700 17px 'Unbounded', sans-serif; }
.bases > summary b { margin-left: 4px; color: #a67cf5; }
.bases > summary small { color: #8f87a3; font-size: 13px; }
.bases > summary:focus-visible { outline: 2px solid #bd96ff; outline-offset: -2px; border-radius: 14px; }
.bases > div { padding: 6px 18px 20px; }

.htowns__how { color: #8f87a3; font-size: 13.5px; line-height: 1.6; }

@media (max-width: 900px) {
  .mapwrap { grid-template-columns: 1fr; }
  .mapwrap__card { position: static; }
}
@media (max-width: 560px) {
  .finder { padding: 14px; }
  .signs, .signs--small, .plain-list { grid-template-columns: 1fr; }
  .bases > div { padding: 4px 10px 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .htowns__loading span { animation: none; }
}
</style>
