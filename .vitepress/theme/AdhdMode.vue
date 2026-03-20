<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import VIDEOS from 'virtual:adhd-videos'

const showPrompt = ref(false)
const adhdEnabled = ref(false)
const currentIndex = ref(0)
const videoEl = ref(null)
let observer = null

onMounted(() => {
  if (typeof window === 'undefined' || !VIDEOS.length) return

  const target = document.querySelector('.VPDoc h1, .VPDoc h2')
  if (!target) return

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      showPrompt.value = true
      observer.disconnect()
    }
  }, { threshold: 0.5 })

  observer.observe(target)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

function enable() {
  adhdEnabled.value = true
  showPrompt.value = false
}

function dismiss() {
  showPrompt.value = false
}

function close() {
  adhdEnabled.value = false
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + VIDEOS.length) % VIDEOS.length
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % VIDEOS.length
}

watch(currentIndex, async () => {
  await nextTick()
  if (videoEl.value) {
    videoEl.value.load()
    videoEl.value.play().catch(() => {})
  }
})
</script>

<template>
  <Transition name="popup">
    <div v-if="showPrompt && !adhdEnabled" class="adhd-popup">
      <span class="adhd-popup__icon">🧠</span>
      <span class="adhd-popup__text">Включить СДВГ режим?</span>
      <div class="adhd-popup__btns">
        <button class="adhd-popup__yes" @click="enable">Да</button>
        <button class="adhd-popup__no" @click="dismiss">Нет</button>
      </div>
    </div>
  </Transition>

  <Transition name="widget">
    <div v-if="adhdEnabled" class="adhd-widget">
      <video
        ref="videoEl"
        class="adhd-widget__video"
        :src="VIDEOS[currentIndex]"
        muted
        autoplay
        loop
        playsinline
        preload="none"
      />
      <div class="adhd-widget__overlay">
        <button class="adhd-widget__close" @click="close">✕</button>
        <div class="adhd-widget__nav">
          <button class="adhd-widget__arrow" @click="prev">‹</button>
          <button class="adhd-widget__arrow" @click="next">›</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Popup ──────────────────────────────────────────── */
.adhd-popup {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(14, 7, 32, 0.96);
  border: 1px solid rgba(124, 58, 237, 0.4);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 24px rgba(79, 45, 190, 0.2);
  backdrop-filter: blur(8px);
  white-space: nowrap;
}

.adhd-popup__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.adhd-popup__text {
  font-size: 0.875rem;
  color: rgba(225, 215, 245, 0.9);
  font-weight: 500;
}

.adhd-popup__btns {
  display: flex;
  gap: 6px;
  margin-left: 4px;
}

.adhd-popup__yes,
.adhd-popup__no {
  border: none;
  border-radius: 8px;
  padding: 5px 14px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s, box-shadow 0.12s;
}

.adhd-popup__yes {
  background: #4f2dbe;
  color: #fff;
  box-shadow: 0 0 12px rgba(79, 45, 190, 0.5);
}
.adhd-popup__yes:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 20px rgba(79, 45, 190, 0.7);
}

.adhd-popup__no {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(210, 200, 230, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.adhd-popup__no:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* ── Widget ─────────────────────────────────────────── */
.adhd-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  width: 500px;
  max-height: 70vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(79, 45, 190, 0.15);
}

.adhd-widget__video {
  display: block;
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  background: #000;
}

/* Controls — transparent overlay, always visible */
.adhd-widget__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.adhd-widget__close {
  position: absolute;
  top: 8px;
  right: 8px;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.55);
  border: none;
  color: rgba(255, 255, 255, 0.75);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
  backdrop-filter: blur(4px);
}
.adhd-widget__close:hover {
  background: rgba(200, 0, 0, 0.7);
  color: #fff;
}

.adhd-widget__nav {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  pointer-events: auto;
}

.adhd-widget__arrow {
  background: rgba(0, 0, 0, 0.55);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.15s;
}
.adhd-widget__arrow:hover {
  background: rgba(79, 45, 190, 0.65);
  color: #fff;
}

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .adhd-popup {
    bottom: 16px;
    right: 12px;
    left: 12px;
    right: 12px;
    flex-wrap: wrap;
    gap: 8px;
    white-space: normal;
  }

  .adhd-widget {
    width: 250px;
    bottom: auto;
    top: 68px;
    right: 10px;
  }

  .adhd-widget__close {
    width: 22px;
    height: 22px;
    font-size: 0.65rem;
    top: 5px;
    right: 5px;
  }

  .adhd-widget__arrow {
    width: 26px;
    height: 26px;
    font-size: 1rem;
  }
}

/* ── Transitions ────────────────────────────────────── */
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.widget-enter-active,
.widget-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.widget-enter-from,
.widget-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.97);
}
</style>
