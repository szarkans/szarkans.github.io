<template>
  <button type="button" class="copy-cmd" :class="{ done: state === 'ok', fail: state === 'fail' }" :title="`Скопировать: ${cmd}`" @click="copy">
    <code>{{ cmd }}</code>
    <span class="copy-cmd__state" aria-live="polite">{{ state === 'ok' ? 'скопировано' : state === 'fail' ? 'не вышло' : 'копировать' }}</span>
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
  display: inline-flex; align-items: center; gap: 10px; max-width: 100%;
  padding: 6px 6px 6px 10px; border: 1px solid rgba(255,255,255,.14); border-radius: 8px;
  background: #0f0d14; color: #e8e7f0; cursor: pointer; text-align: left;
  font: inherit; transition: border-color .15s, box-shadow .15s;
}
.copy-cmd code {
  overflow: hidden; min-width: 0; padding: 0; background: none; color: #d5bcff;
  font-size: 12.5px; text-overflow: ellipsis; white-space: nowrap;
}
.copy-cmd__state {
  flex: none; padding: 3px 8px; border-radius: 5px; background: #4f2dbe; color: #fff;
  font-size: 11.5px; font-weight: 600; letter-spacing: .02em;
}
.copy-cmd:hover { border-color: #8b5ee8; box-shadow: 0 0 14px rgba(135,88,243,.3); }
.copy-cmd:focus-visible { outline: 2px solid #bd96ff; outline-offset: 2px; }
.copy-cmd.done .copy-cmd__state { background: #2f8a55; }
.copy-cmd.fail .copy-cmd__state { background: #a03244; }
</style>
