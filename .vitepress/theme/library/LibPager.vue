<template>
  <nav v-if="pages > 1" class="lp" :aria-label="`${noun}: листать`">
    <button type="button" class="mcbtn lp__arrow" :disabled="page <= 0" aria-label="Назад" @click="$emit('update:page', page - 1)">
      <svg viewBox="0 0 7 11" aria-hidden="true" shape-rendering="crispEdges"><path :d="ARROW" fill="currentColor" /></svg>
    </button>
    <div class="lp__mid">
      <span class="lp__n">{{ noun }} {{ page + 1 }} / {{ pages }}</span>
      <span v-if="label" class="lp__label">{{ label }}</span>
    </div>
    <button type="button" class="mcbtn lp__arrow" :disabled="page >= pages - 1" aria-label="Вперёд" @click="$emit('update:page', page + 1)">
      <svg viewBox="0 0 7 11" aria-hidden="true" shape-rendering="crispEdges" class="lp__flip"><path :d="ARROW" fill="currentColor" /></svg>
    </button>
  </nav>
</template>

<script setup>
// Пиксельная стрелка «влево», 7×11.
const ARROW = Array.from({ length: 6 }, (_, i) => `M${5 - i} ${i}h2v1h-2zM${5 - i} ${10 - i}h2v1h-2z`).join('')

defineProps({
  page: { type: Number, required: true },
  pages: { type: Number, required: true },
  label: { type: String, default: '' },
  noun: { type: String, default: 'Страница' },
})
defineEmits(['update:page'])
</script>

<style scoped>
.lp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 16px 0 0;
}
.lp__mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  font-family: 'Minecraft Rus', monospace;
  line-height: 1.35;
}
.lp__n { font-size: 16px; color: #f0ecff; text-shadow: 2px 2px 0 #2c2440; }
.lp__label { font-size: 12px; color: #a99fc4; }
.lp__arrow { width: 44px; height: 40px; }
.lp__arrow svg { width: 11px; height: 17px; }
.lp__flip { transform: scaleX(-1); }
</style>
