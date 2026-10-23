<template>
  <article
    :id="anchor ? town.id : undefined"
    class="town"
    :class="[`town--${look}`, `wood--${wood}`, { 'town--flash': flash }]"
    tabindex="-1"
  >
    <template v-if="look === 'sign'">
      <span class="nail nail--l" aria-hidden="true"></span>
      <span class="nail nail--r" aria-hidden="true"></span>
    </template>

    <p class="town__kind">
      {{ kind }}
      <span v-if="town.s" class="badge badge--spawn" title="Здесь всё срастается в одно большое поселение">спавн</span>
    </p>
    <h3 class="town__title" :class="{ glow: town.g && town.ok }">
      <a v-if="anchor" :href="`#${town.id}`" class="town__self">{{ town.title }}</a>
      <template v-else>{{ town.title }}</template>
    </h3>
    <p v-if="town.g && !town.ok" class="town__guess" title="Название взято с табличек рядом, админ его не подтверждал">название — догадка</p>
    <p class="town__where">{{ town.where }}</p>

    <dl class="town__stats">
      <div><dt>жителей</dt><dd>{{ town.n }}</dd></div>
      <div>
        <dt>размах</dt>
        <dd>
          {{ size.word }}
          <span class="bar" :title="`${fmtInt(town.b)} поставленных блоков`" aria-hidden="true">
            <i v-for="k in 8" :key="k" :class="{ on: k <= size.bars }"></i>
          </span>
        </dd>
      </div>
    </dl>

    <p class="town__xz"><span>X</span> {{ fmt(town.x) }} <span>Z</span> {{ fmt(town.z) }}</p>

    <CopyCmd :cmd="tpTown(town)" />

    <div class="town__people">
      <button
        v-for="nick in shown" :key="nick" type="button" class="nick" :class="{ 'nick--hit': nick.toLowerCase() === hl }"
        :title="`Где жил ${nick}`" @click="$emit('nick', nick)"
      >{{ nick }}</button>
      <button v-if="hidden > 0" type="button" class="nick nick--more" @click="open = true">ещё {{ hidden }}</button>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import CopyCmd from './CopyCmd.vue'
import { fmt, fmtInt, tpTown, isSharedBase } from './towns.js'

const props = defineProps({
  town: { type: Object, required: true },
  look: { type: String, default: 'sign' },
  anchor: { type: Boolean, default: true },
  highlight: { type: String, default: '' },
  flash: { type: Boolean, default: false },
})
defineEmits(['nick'])

const LIMIT = 9
const open = ref(false)
const hl = computed(() => props.highlight.toLowerCase())
const shown = computed(() => {
  if (open.value || props.town.p.length <= LIMIT + 1) return props.town.p
  const first = props.town.p.slice(0, LIMIT)
  const hit = props.town.p.find(n => n.toLowerCase() === hl.value)
  return hit && !first.includes(hit) ? [hit, ...first.slice(0, LIMIT - 1)] : first
})
const hidden = computed(() => props.town.p.length - shown.value.length)

const kind = computed(() => {
  const t = props.town
  if (t.s) return t.g ? 'Город у спавна' : 'Сердце сезона'
  if (isSharedBase(t)) return 'Общая база'
  if (t.g && t.ok) return 'Город'
  return t.g ? 'Поселение' : t.n >= 10 ? 'Город без вывески' : 'Без названия'
})

// Дерево таблички: багровая — спавн, берёзовая — общая база, тёмный дуб — подтверждённый город.
const wood = computed(() => {
  const t = props.town
  if (t.s) return 'crimson'
  if (isSharedBase(t)) return 'birch'
  if (t.g && t.ok) return 'dark'
  return 'oak'
})

const size = computed(() => {
  const b = props.town.b
  const word = b < 5000 ? 'хутор' : b < 25000 ? 'посёлок' : b < 100000 ? 'город' : 'мегаполис'
  const bars = Math.max(1, Math.min(8, Math.round((Math.log10(b) - 2) / 3.6 * 8)))
  return { word, bars }
})
</script>

<style scoped>
@font-face {
  font-family: 'Minecraft Rus';
  src: url('/assets/minecraft.ttf') format('truetype');
  font-display: swap;
}

.town {
  --ink: #e8e7f0; --ink-2: #9a94ab; --line: rgba(255,255,255,.08);
  position: relative; display: flex; flex-direction: column; gap: 10px; min-width: 0;
  padding: 18px 18px 16px; scroll-margin-top: 90px; color: var(--ink);
}
.town:focus { outline: none; }
.town > * { margin: 0; }

/* ── простая карточка (вариант «Карта») ── */
.town--plain {
  border: 1px solid rgba(255,255,255,.08); border-radius: 14px; background: #1c1826;
  transition: border-color .2s, box-shadow .2s;
}
.town--plain.wood--dark { border-color: rgba(166,124,245,.35); }
.town--plain.wood--crimson { border-color: rgba(232,160,191,.4); }

/* ── табличка ── */
.town--sign {
  --ink: #2a1b0b; --ink-2: #5a4022; --line: rgba(42,27,11,.18);
  --w1: #b8945f; --w2: #a7834f; --w3: #8c6a3c; --edge: #4c3519;
  padding: 22px 20px 18px;
  background:
    repeating-linear-gradient(180deg, transparent 0 27px, var(--w3) 27px 29px),
    repeating-linear-gradient(90deg, transparent 0 46px, rgba(0,0,0,.05) 46px 52px, transparent 52px 90px),
    repeating-linear-gradient(90deg, var(--w1) 0 6px, var(--w2) 6px 8px, var(--w1) 8px 22px, var(--w2) 22px 24px, var(--w1) 24px 40px);
  box-shadow: inset 0 0 0 4px var(--edge), inset 0 0 0 6px rgba(255,255,255,.12), 0 10px 24px rgba(0,0,0,.45);
  clip-path: polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px));
  font-family: 'Minecraft Rus', 'Rubik', monospace;
  transform-origin: 50% 0;
  transition: transform .25s cubic-bezier(.3,1.6,.5,1), filter .2s;
}
.town--sign:hover { transform: rotate(-.6deg) translateY(-2px); filter: brightness(1.05); }
.wood--birch { --w1: #d8c48b; --w2: #c9b278; --w3: #ad955c; --edge: #6e5c34; }
.wood--dark { --w1: #5c3e22; --w2: #50351c; --w3: #3c2711; --edge: #22150a; --ink: #f3e3c4; --ink-2: #cdb38b; --line: rgba(243,227,196,.18); }
.wood--crimson { --w1: #7b3a55; --w2: #6c3049; --w3: #4f2035; --edge: #2d0f1d; --ink: #f6dce8; --ink-2: #dba9bf; --line: rgba(246,220,232,.2); }

.nail { position: absolute; top: 12px; width: 6px; height: 6px; background: #8d8d96; box-shadow: inset -2px -2px 0 #55555d, inset 2px 2px 0 #c9c9d2; }
.nail--l { left: 12px; } .nail--r { right: 12px; }

.town__kind { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: var(--ink-2); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.town--sign .town__kind { justify-content: center; text-align: center; letter-spacing: .04em; }
.town__title { padding: 0; border: 0; color: var(--ink); font: 700 21px/1.2 'Unbounded', sans-serif; letter-spacing: -.01em; overflow-wrap: anywhere; }
.town--sign .town__title { font: 22px/1.25 'Minecraft Rus', monospace; text-align: center; }
.town__self { color: inherit !important; text-decoration: none !important; }
.town__self:hover { text-decoration: underline !important; }
.town--sign .glow { color: #fff4c8; text-shadow: 2px 0 #3d2a10, -2px 0 #3d2a10, 0 2px #3d2a10, 0 -2px #3d2a10, 0 0 18px rgba(255,228,140,.55); }
.town--plain .glow { color: #d5bcff; }

.town__guess {
  align-self: flex-start; padding: 2px 8px; border: 1px dashed currentColor; border-radius: 4px;
  color: #f5a623; font-size: 12px;
}
.town--sign .town__guess { align-self: center; color: #7a2c12; background: rgba(255,240,200,.45); }
.wood--dark .town__guess, .wood--crimson .town__guess { color: #ffd08a; background: rgba(0,0,0,.25); }
.town__where { color: var(--ink-2); font-size: 13.5px; }
.town--sign .town__where { text-align: center; font-size: 13px; }

.badge { padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: .06em; }
.badge--spawn { background: #e8a0bf; color: #2d0f1d; }

.town__stats { display: grid; grid-template-columns: auto 1fr; gap: 4px 14px; margin: 0; padding: 10px 0; border-block: 1px solid var(--line); }
.town__stats div { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.town__stats dt { color: var(--ink-2); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
.town__stats dd { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 15px; font-weight: 600; white-space: nowrap; }
.town--sign .town__stats dd { font-weight: 400; }
.town__xz { font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: .02em; }
.town__xz span { margin: 0 2px 0 8px; color: var(--ink-2); font-size: 12px; font-weight: 400; }
.town__xz span:first-child { margin-left: 0; }
.town--sign .town__xz { font-weight: 400; text-align: center; }

.bar { display: inline-flex; gap: 2px; }
.bar i { width: 4px; height: 10px; background: var(--line); }
.bar i.on { background: #a67cf5; }
.town--sign .bar i.on { background: #4f8a2b; box-shadow: inset 0 -3px 0 #3a6a1e; }
.wood--dark .bar i.on, .wood--crimson .bar i.on { background: #8fd16a; box-shadow: none; }

.town .copy-cmd { align-self: stretch; }
.town--sign :deep(.copy-cmd) { border-color: var(--edge); border-radius: 0; background: rgba(20,12,4,.82); }

.town__people { display: flex; flex-wrap: wrap; gap: 6px; }
.nick {
  padding: 3px 8px; border: 1px solid var(--line); border-radius: 6px; background: rgba(255,255,255,.04);
  color: var(--ink); font: 12.5px/1.3 'Rubik', sans-serif; cursor: pointer; transition: background .15s, border-color .15s;
}
.town--sign .nick { border-radius: 0; background: rgba(255,255,255,.14); font-family: 'Minecraft Rus', monospace; font-size: 12px; }
.nick:hover { border-color: #a67cf5; background: rgba(166,124,245,.18); }
.nick:focus-visible { outline: 2px solid #bd96ff; outline-offset: 1px; }
.nick--hit { border-color: #f5a623; background: rgba(245,166,35,.28); }
.nick--more { color: var(--ink-2); font-style: italic; }

.town--flash { animation: town-flash 1.6s ease-out; }
.town--plain.town--flash { border-color: #a67cf5; }
@keyframes town-flash {
  0%, 30% { box-shadow: 0 0 0 3px #f5a623, 0 0 36px rgba(245,166,35,.6); }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.town--sign.town--flash { animation-name: sign-flash; }
@keyframes sign-flash {
  0% { transform: rotate(-3deg); filter: brightness(1.35); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(-1deg); }
  100% { transform: none; filter: none; }
}

@media (prefers-reduced-motion: reduce) {
  .town--sign, .town--sign:hover { transition: none; transform: none; }
  .town--flash, .town--sign.town--flash { animation: none; outline: 3px solid #f5a623; outline-offset: 3px; }
}
</style>
