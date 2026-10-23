<template>
  <article :id="town.id" class="town" :class="[`wood--${wood}`, { sel: selected }]" tabindex="-1">
    <span class="nail nail--l" aria-hidden="true" />
    <span class="nail nail--r" aria-hidden="true" />

    <h3 class="town__title" :class="{ none: !town.title }">
      <a :href="`#${town.id}`" @click.prevent="$emit('select', town.id)">{{ town.title || 'Без названия' }}</a><sup v-if="town.g && !town.ok" aria-label="название не подтверждено">?</sup>
    </h3>
    <p class="town__xz">{{ fmt(town.x) }}, {{ fmt(town.z) }}</p>

    <CopyCmd :cmd="tpTown(town)" />

    <p class="town__people">
      <span class="town__count">{{ town.n }} {{ plural(town.n, 'житель', 'жителя', 'жителей') }}</span>
      <template v-for="(nick, i) in shown" :key="nick">
        <b v-if="nick.toLowerCase() === hl">{{ nick }}</b><template v-else>{{ nick }}</template><template v-if="i < shown.length - 1">, </template>
      </template>
      {{ ' ' }}<button v-if="hidden" type="button" class="more" @click="open = true">и ещё {{ hidden }}</button>
    </p>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import CopyCmd from './CopyCmd.vue'
import { fmt, tpTown, isSmall } from './towns.js'
import { plural } from '../library/data.js'

const props = defineProps({
  town: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  highlight: { type: String, default: '' },
})
defineEmits(['select'])

const LIMIT = 8
const open = ref(false)
const hl = computed(() => props.highlight.toLowerCase())
const shown = computed(() => {
  const p = props.town.p
  if (open.value || p.length <= LIMIT + 2) return p
  const first = p.slice(0, LIMIT)
  const hit = p.find(n => n.toLowerCase() === hl.value)
  return hit && !first.includes(hit) ? [hit, ...first.slice(0, LIMIT - 1)] : first
})
const hidden = computed(() => props.town.p.length - shown.value.length)

// Дерево таблички: багровая — спавн, тёмный дуб — названный город, берёза — маленькая база.
const wood = computed(() => {
  const t = props.town
  if (t.s) return 'crimson'
  if (t.g) return 'dark'
  return isSmall(t) ? 'birch' : 'oak'
})
</script>

<style scoped>
@font-face {
  font-family: 'Minecraft Rus';
  src: url('/assets/minecraft.ttf') format('truetype');
  font-display: swap;
}

.town {
  --ink: #2a1b0b; --ink-2: #5a4022;
  --w1: #b8945f; --w2: #a7834f; --w3: #8c6a3c; --edge: #4c3519;
  position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; min-width: 0;
  padding: 24px 18px 18px; scroll-margin: 90px 0 24px; color: var(--ink); text-align: center;
  background:
    repeating-linear-gradient(180deg, transparent 0 27px, var(--w3) 27px 29px),
    repeating-linear-gradient(90deg, transparent 0 46px, rgba(0,0,0,.05) 46px 52px, transparent 52px 90px),
    repeating-linear-gradient(90deg, var(--w1) 0 6px, var(--w2) 6px 8px, var(--w1) 8px 22px, var(--w2) 22px 24px, var(--w1) 24px 40px);
  box-shadow: inset 0 0 0 4px var(--edge), inset 0 0 0 6px rgba(255,255,255,.12), 0 10px 24px rgba(0,0,0,.45);
  clip-path: polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px));
  font-family: 'Minecraft Rus', 'Rubik', monospace;
}
.town:focus { outline: none; }
.town > * { margin: 0; }
.town.sel { box-shadow: inset 0 0 0 4px #f5c451, inset 0 0 0 6px rgba(255,255,255,.2), 0 10px 24px rgba(0,0,0,.45); }

.wood--birch { --w1: #d8c48b; --w2: #c9b278; --w3: #ad955c; --edge: #6e5c34; }
.wood--dark { --w1: #5c3e22; --w2: #50351c; --w3: #3c2711; --edge: #22150a; --ink: #f3e3c4; --ink-2: #cdb38b; }
.wood--crimson { --w1: #7b3a55; --w2: #6c3049; --w3: #4f2035; --edge: #2d0f1d; --ink: #f6dce8; --ink-2: #dba9bf; }

.nail { position: absolute; top: 12px; width: 6px; height: 6px; background: #8d8d96; box-shadow: inset -2px -2px 0 #55555d, inset 2px 2px 0 #c9c9d2; }
.nail--l { left: 12px; } .nail--r { right: 12px; }

.town__title { padding: 0 10px; border: 0; color: var(--ink); font: 21px/1.25 'Minecraft Rus', monospace; overflow-wrap: anywhere; }
.town__title a { color: inherit !important; text-decoration: none !important; }
.town__title a:hover { text-decoration: underline !important; }
.town__title a:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }
.town__title.none { color: var(--ink-2); font-size: 18px; }
.town__title sup { margin-left: 4px; color: var(--ink-2); font-size: 13px; }
.wood--dark .town__title:not(.none) { color: #fff4c8; text-shadow: 2px 0 #3d2a10, -2px 0 #3d2a10, 0 2px #3d2a10, 0 -2px #3d2a10; }

.town__xz { font-size: 16px; font-variant-numeric: tabular-nums; letter-spacing: .02em; }

.town :deep(.copy-cmd) { align-self: stretch; border-color: var(--edge); border-radius: 0; background: rgba(20,12,4,.82); }
.town :deep(.copy-cmd code) { font-size: 13px; overflow-wrap: anywhere; }

.town__people { color: var(--ink-2); font-size: 13px; line-height: 1.6; overflow-wrap: anywhere; }
.town__count { display: block; color: var(--ink); }
.town__people b { color: var(--ink); font-weight: 400; text-decoration: underline; text-underline-offset: 3px; }
.more { padding: 0; border: 0; background: none; color: var(--ink); font: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.more:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }
</style>
