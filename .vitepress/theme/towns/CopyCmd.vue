<template>
  <button type="button" class="copy-cmd" :class="{ done: state === 'ok', fail: state === 'fail' }" :aria-label="`Скопировать ${cmd}`" @click="copy">
    <code>{{ cmd }}</code>
    <svg class="copy-cmd__icon" viewBox="0 0 16 16" aria-hidden="true">
      <path v-if="state === 'ok'" d="M3 8.5l3 3 7-7" />
      <path v-else-if="state === 'fail'" d="M4 4l8 8M12 4l-8 8" />
      <template v-else><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" /></template>
    </svg>
    <span class="sr" aria-live="polite">{{ state === 'ok' ? 'скопировано' : state === 'fail' ? 'не скопировалось' : '' }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { copyText } from './towns.js'

const props = defineProps({ cmd: { type: String, required: true } })
const state = ref('')
let timer

async function copy() {
  const ok = await copyText(props.cmd)
  if (!ok) console.error('Не удалось скопировать команду', props.cmd)
  state.value = ok ? 'ok' : 'fail'
  clearTimeout(timer)
  timer = setTimeout(() => { state.value = '' }, 1600)
}
</script>

<style scoped>
.copy-cmd {
  display: inline-flex; align-items: center; gap: 12px; max-width: 100%; min-height: 44px;
  padding: 8px 12px 8px 14px; border: 1px solid rgba(255,255,255,.12); border-radius: 10px;
  background: #0f0d14; color: #e8e7f0; cursor: pointer; text-align: left;
  font: inherit; transition: border-color .15s, background .15s;
}
.copy-cmd code {
  min-width: 0; padding: 0; background: none; color: #e8e7f0;
  font-size: 14px; line-height: 1.5; font-variant-numeric: tabular-nums;
}
.copy-cmd__icon { flex: none; width: 18px; height: 18px; fill: none; stroke: #a67cf5; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.copy-cmd:hover { border-color: #8b5ee8; background: #15121d; }
.copy-cmd:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }
.copy-cmd.done { border-color: #3fae6e; }
.copy-cmd.done .copy-cmd__icon { stroke: #5fd08e; stroke-width: 2; }
.copy-cmd.fail .copy-cmd__icon { stroke: #f06a7c; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
</style>
