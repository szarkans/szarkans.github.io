<template>
  <button
    type="button"
    class="sp"
    :class="[`sp--p${book.pattern}`, { 'sp--active': active }]"
    :style="style"
    :data-book="book.id"
    :aria-label="label"
  >
    <span class="sp__deco" aria-hidden="true"></span>
    <span v-if="book.signed" class="sp__title" aria-hidden="true">{{ book.title }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { spineSize } from './data.js'

const props = defineProps({
  book: { type: Object, required: true },
  active: Boolean,
  mode: { type: String, default: 'wide' },
})

const style = computed(() => {
  const s = spineSize(props.book, props.mode)
  return { '--h': props.book.hue, '--w': `${s.w}px`, '--ht': `${s.h}px`, '--fs': `${s.font}px` }
})

const label = computed(() => {
  const b = props.book
  return b.signed ? `«${b.title}», ${b.author || 'без автора'}` : 'Книга с пером, без подписи'
})
</script>

<style scoped>
.sp {
  --leather: hsl(var(--h) 42% 34%);
  --leather-hi: hsl(var(--h) 46% 46%);
  --leather-lo: hsl(var(--h) 48% 20%);
  position: relative;
  flex: none;
  width: var(--w);
  height: var(--ht);
  margin: 0 1px;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  border: 0;
  border-radius: 1px 1px 0 0;
  cursor: pointer;
  background:
    linear-gradient(90deg, var(--leather-hi) 0 2px, transparent 2px calc(100% - 3px), var(--leather-lo) calc(100% - 3px)),
    linear-gradient(90deg, transparent 0 2px, rgba(255, 255, 255, 0.1) 2px 6px, transparent 6px 55%, rgba(0, 0, 0, 0.16) 55% calc(100% - 3px), transparent 0),
    linear-gradient(180deg, var(--leather-lo) 0 3px, var(--leather) 3px calc(100% - 3px), var(--leather-lo) calc(100% - 3px));
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.55), 2px 0 0 rgba(0, 0, 0, 0.35);
  transform: translateY(0);
  transition: transform 0.18s cubic-bezier(0.3, 1.5, 0.5, 1), filter 0.18s;
  overflow: hidden;
  image-rendering: pixelated;
}

.sp:hover,
.sp:focus-visible,
.sp--active {
  transform: translateY(-14px);
  filter: brightness(1.18);
  z-index: 2;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.55), 2px 0 0 rgba(0, 0, 0, 0.35), 0 10px 14px -4px rgba(0, 0, 0, 0.7);
}

.sp:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 1px;
}

/* Узоры корешков: у каждого автора свой цвет и свой узор. */
.sp__deco { position: absolute; inset: 0; pointer-events: none; }

.sp--p0 .sp__deco {
  background:
    linear-gradient(#e2b23c, #e2b23c) 0 9px / 100% 2px no-repeat,
    linear-gradient(#e2b23c, #e2b23c) 0 13px / 100% 1px no-repeat,
    linear-gradient(#e2b23c, #e2b23c) 0 calc(100% - 13px) / 100% 1px no-repeat,
    linear-gradient(#e2b23c, #e2b23c) 0 calc(100% - 9px) / 100% 2px no-repeat;
}
.sp--p1 .sp__deco {
  background:
    linear-gradient(#f0e4c0, #f0e4c0) 50% 12px / calc(100% - 6px) 14px no-repeat,
    linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)) 50% 11px / calc(100% - 4px) 16px no-repeat;
}
.sp--p2 .sp__deco {
  background:
    linear-gradient(90deg, transparent 0 calc(50% - 2px), hsl(var(--h) 60% 62%) calc(50% - 2px) calc(50% - 1px), transparent calc(50% - 1px) calc(50% + 1px), hsl(var(--h) 60% 62%) calc(50% + 1px) calc(50% + 2px), transparent 0)
      0 6px / 100% calc(100% - 12px) no-repeat;
}
.sp--p3 .sp__deco {
  background:
    repeating-linear-gradient(90deg, #e2b23c 0 2px, transparent 2px 4px) 0 8px / 100% 2px no-repeat,
    repeating-linear-gradient(90deg, transparent 0 2px, #e2b23c 2px 4px) 0 10px / 100% 2px no-repeat,
    linear-gradient(hsl(var(--h) 50% 14%), hsl(var(--h) 50% 14%)) 0 calc(100% - 14px) / 100% 6px no-repeat;
}
.sp--p4 .sp__deco {
  background:
    linear-gradient(hsl(var(--h) 45% 16%), hsl(var(--h) 45% 16%)) 0 0 / 100% 16px no-repeat,
    linear-gradient(#e2b23c, #e2b23c) 50% 6px / 4px 4px no-repeat,
    linear-gradient(hsl(var(--h) 45% 16%), hsl(var(--h) 45% 16%)) 0 100% / 100% 10px no-repeat;
}
/* Книга с пером: потёртая кожа и чернильная клякса. */
.sp--p5 { --leather: #6e4a2a; --leather-hi: #8d6238; --leather-lo: #432b16; }
.sp--p5 .sp__deco {
  background:
    radial-gradient(circle at 50% 50%, #15110d 0 2px, transparent 3px) 50% 14px / 100% 8px no-repeat,
    linear-gradient(#cfc3a3, #cfc3a3) 50% calc(100% - 8px) / calc(100% - 6px) 2px no-repeat;
}

.sp__title {
  position: absolute;
  left: 50%;
  top: 28px;
  bottom: 22px;
  transform: translateX(-50%);
  writing-mode: vertical-rl;
  font: var(--fs)/1 'Minecraft Rus', monospace;
  color: #f6edd2;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}
.sp--p5 .sp__title { color: #e9dcbb; }

@media (prefers-reduced-motion: reduce) {
  .sp { transition: none; }
  .sp:hover, .sp:focus-visible, .sp--active { transform: translateY(-4px); }
}
</style>
