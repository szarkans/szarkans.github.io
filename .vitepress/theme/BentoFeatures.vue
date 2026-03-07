<template>
  <section class="bento-section">
    <div class="bento-head">
      <span class="bento-head__tag">features</span>
      <h2 class="bento-head__title">Что делает нас <em>особенными</em></h2>
    </div>

    <div class="bento" ref="gridRef">
      <!-- Big card: Vanilla+ with screenshot bg -->
      <div
        class="bento__card bento__card--big bento__reveal"
        @mousemove="tilt" @mouseleave="untilt"
      >
        <img src="/vanilla.webp" alt="" class="bento__bg" />
        <div class="bento__overlay"></div>
        <div class="bento__body bento__body--bottom">
          <h3 class="bento__card-title">Vanilla+</h3>
          <p class="bento__card-desc">
            Самописные механики, свой ресурспак,
            крутейшие NPC, ребалансы ванильных механик
          </p>
        </div>
      </div>

      <!-- Stat: achievements -->
      <div
        class="bento__card bento__card--stat bento__reveal"
        @mousemove="tilt" @mouseleave="untilt"
      >
        <span class="bento__num" data-target="10000" data-suffix="+">0</span>
        <span class="bento__label">игроков прошло через нас</span>
      </div>

      <!-- Stat: seasons -->
      <div
        class="bento__card bento__card--stat bento__reveal"
        @mousemove="tilt" @mouseleave="untilt"
      >
        <span class="bento__num" data-target="7" data-suffix="">0</span>
        <span class="bento__label">сезонов истории</span>
      </div>

      <!-- Feature: RolePlay -->
      <div
        class="bento__card bento__reveal"
        @mousemove="tilt" @mouseleave="untilt"
      >
        <div class="bento__body">
          <h3 class="bento__card-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            RolePlay
          </h3>
          <p class="bento__card-desc">
            Система правительства из обычных игроков:
            преступники, экономика, ивенты
          </p>
        </div>
      </div>

      <!-- Feature: Community -->
      <div
        class="bento__card bento__reveal"
        @mousemove="tilt" @mouseleave="untilt"
      >
        <div class="bento__body">
          <h3 class="bento__card-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Комьюнити
          </h3>
          <p class="bento__card-desc">
            Награды за постройки и идеи, партнёрство
            с ютуберами, и лучшие люди в мире
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const gridRef = ref(null)
let observer = null

function tilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
}

function untilt(e) {
  e.currentTarget.style.transform = ''
}

function animateNum(el, target, suffix) {
  const dur = target > 100 ? 1800 : 1000
  let start = null
  function step(ts) {
    if (!start) start = ts
    const p = Math.min((ts - start) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.floor(eased * target) + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (!gridRef.value) return

  const cards = gridRef.value.querySelectorAll('.bento__reveal')
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('bento__visible')
        }, i * 80)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  cards.forEach(c => observer.observe(c))

  // Counter animation
  const nums = gridRef.value.querySelectorAll('.bento__num[data-target]')
  const numObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        animateNum(el, parseInt(el.dataset.target), el.dataset.suffix || '')
        numObs.unobserve(el)
      }
    })
  }, { threshold: 0.5 })
  nums.forEach(n => numObs.observe(n))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.bento-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 60px;
}

/* Section header */
.bento-head {
  text-align: center;
  margin-bottom: 48px;
}

.bento-head__tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7c3aed;
  margin-bottom: 12px;
}

.bento-head__title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #e8e7f0;
  margin: 0;
  letter-spacing: -0.02em;
  border: none !important;
}

.bento-head__title em {
  font-style: normal;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Grid */
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;
}

.bento__card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
}

.bento__card:hover {
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 8px 40px rgba(124, 58, 237, 0.12);
}

/* Scroll reveal */
.bento__reveal {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.bento__visible {
  opacity: 1;
  transform: translateY(0);
}

.bento__visible:hover {
  /* tilt override from JS */
}

/* Big card (2x2) */
.bento__card--big {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  min-height: 320px;
}

.bento__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  transition: opacity 0.4s ease, transform 0.6s ease;
}

.bento__card--big:hover .bento__bg {
  opacity: 0.7;
  transform: scale(1.05);
}

.bento__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(6, 6, 12, 0.92) 0%, rgba(6, 6, 12, 0.3) 50%, transparent 100%);
}

.bento__body--bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px;
}

.bento__body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

/* Stat cards */
.bento__card--stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  text-align: center;
}

.bento__num {
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #c4b5fd, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bento__label {
  font-size: 0.9rem;
  color: #6b6a78;
  margin-top: 8px;
  font-weight: 500;
}

/* Card text */
.bento__card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #e8e7f0;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.bento__card-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  color: #8b8a96;
  margin: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  .bento__card--big {
    grid-column: 1 / -1;
    grid-row: auto;
    min-height: 240px;
  }
}

@media (max-width: 540px) {
  .bento {
    grid-template-columns: 1fr;
  }

  .bento__card--big {
    min-height: 200px;
  }

  .bento-section {
    padding: 50px 16px 40px;
  }
}
</style>
