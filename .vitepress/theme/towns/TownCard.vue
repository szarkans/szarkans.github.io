<template>
  <article :id="town.id" class="town" :class="{ sel: selected }" tabindex="-1">
    <h3 class="town__title" :class="{ none: !town.title }">
      <a :href="`#${town.id}`" @click.prevent="$emit('select', town.id)">{{ town.title || 'Без названия' }}</a><sup v-if="town.g && !town.ok" aria-label="название не подтверждено">?</sup>
    </h3>

    <CopyCmd :cmd="tpTown(town)" :label="`${fmt(town.x)}, ${fmt(town.z)}`" />

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
import { fmt, tpTown } from './towns.js'
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
</script>

<style scoped>
.town {
  display: flex; flex-direction: column; align-items: flex-start; gap: 12px; min-width: 0;
  padding: 16px 18px 18px; scroll-margin: 90px 0 24px;
  border: 1px solid rgba(255,255,255,.06); border-radius: 14px; background: rgba(255,255,255,.02);
  transition: border-color .2s, background .2s;
}
.town:focus { outline: none; }
.town > * { margin: 0; }
.town:hover { border-color: rgba(167,139,250,.25); }
.town.sel { border-color: rgba(167,139,250,.6); background: rgba(124,58,237,.08); }

.town__title { padding: 0; border: 0; color: var(--cc-text-1); font: 500 17px/1.3 'Rubik', sans-serif; letter-spacing: 0; overflow-wrap: anywhere; }
.town__title a { color: inherit !important; text-decoration: none !important; }
.town__title a:hover { color: var(--cc-purple-300) !important; }
.town__title a:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; border-radius: 4px; }
.town__title.none { color: var(--cc-text-2); font-weight: 400; }
.town__title sup { margin-left: 3px; color: var(--cc-text-3); font-size: 12px; }

.town__people { color: var(--cc-text-2); font-size: 13px; line-height: 1.6; overflow-wrap: anywhere; }
.town__count { display: block; color: var(--cc-text-1); }
.town__people b { color: var(--cc-text-1); font-weight: 500; }
.more { padding: 0; border: 0; background: none; color: var(--cc-purple-400); font: inherit; cursor: pointer; }
.more:hover { color: var(--cc-purple-300); }
.more:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }
</style>
