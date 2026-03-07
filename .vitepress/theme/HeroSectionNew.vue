<template>
  <section class="hero" ref="heroEl" @mousemove="onMouse">
    <!-- Fixed background blobs (persist across all pages) -->
    <div class="bg-fx">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
      <div class="blob blob--3"></div>
      <div class="blob blob--4"></div>
      <div class="blob blob--5"></div>
    </div>

    <!-- Interactive spotlight -->
    <div
      class="hero__spot"
      :style="{ left: spotX + 'px', top: spotY + 'px' }"
    ></div>

    <div class="hero__inner">
      <h1 class="hero__title anim-up" style="--d:.15s">КОШКОКРАФТ</h1>

      <p class="hero__sub anim-up" style="--d:.35s">
        Песочница с новыми механиками и&nbsp;уклоном
        в&nbsp;RPG, где каждый сезон&nbsp;&mdash; новая история
      </p>

      <div class="hero__pills anim-up" style="--d:.5s">
        <span class="pill" :class="statusCls">
          <i class="pill__dot"></i>{{ statusText }}
        </span>
        <span class="pill pill--muted">1.21.8 Java</span>
      </div>

      <div class="hero__cta anim-up" style="--d:.65s">
        <a href="/info/guide" class="btn btn--glow">
          <span>Начать играть</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="https://discord.gg/6f3FwFRJWC" target="_blank" rel="noopener" class="btn btn--glass">
          <svg viewBox="0 0 127.14 96.36" width="18" height="18">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" fill="currentColor"/>
          </svg>
          Discord
        </a>
        <a href="https://t.me/catcraftmc_tg" target="_blank" rel="noopener" class="btn btn--glass">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/>
          </svg>
          Telegram
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const SERVER_MODE = 'offseason'

const heroEl = ref(null)
const spotX = ref(-500)
const spotY = ref(-500)
const playerCount = ref(null)
const fetchError = ref(false)
const loaded = ref(false)

function onMouse(e) {
  if (!heroEl.value) return
  const r = heroEl.value.getBoundingClientRect()
  spotX.value = e.clientX - r.left
  spotY.value = e.clientY - r.top
}

const statusCls = computed(() => {
  if (SERVER_MODE === 'online' && !fetchError.value && loaded.value) return 'pill--online'
  if (SERVER_MODE === 'maintenance') return 'pill--danger'
  return 'pill--warn'
})

const statusText = computed(() => {
  if (SERVER_MODE === 'offseason') return 'Межсезонье'
  if (SERVER_MODE === 'maintenance') return 'Тех. работы'
  if (SERVER_MODE === 'online') {
    if (fetchError.value) return 'Тех. работы'
    if (!loaded.value) return 'Загрузка...'
    return `${playerCount.value} онлайн`
  }
  return ''
})

onMounted(async () => {
  if (SERVER_MODE !== 'online') return
  const cacheKey = 'cc_status'
  const cacheTimeKey = 'cc_status_t'
  const cached = sessionStorage.getItem(cacheKey)
  const cachedTime = sessionStorage.getItem(cacheTimeKey)
  if (cached && cachedTime && Date.now() - Number(cachedTime) < 60000) {
    try {
      const d = JSON.parse(cached)
      playerCount.value = d.players
      loaded.value = true
      return
    } catch {}
  }
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 5000)
    const res = await fetch('https://api.mcsrvstat.us/2/play.catcraftmc.ru', { signal: ctrl.signal })
    clearTimeout(t)
    const data = await res.json()
    playerCount.value = data.players?.online ?? 0
    loaded.value = true
    sessionStorage.setItem(cacheKey, JSON.stringify({ players: playerCount.value }))
    sessionStorage.setItem(cacheTimeKey, String(Date.now()))
  } catch {
    fetchError.value = true
    loaded.value = true
  }
})
</script>

<style scoped>
/* ========== HERO ========== */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  overflow: hidden;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
}

/* ========== SPOTLIGHT ========== */
.hero__spot {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 65%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: left 0.25s ease-out, top 0.25s ease-out;
  z-index: 0;
}

/* ========== TITLE ========== */
.hero__title {
  font-size: clamp(2.8rem, 9.5vw, 8rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  white-space: nowrap;
  margin: 0 0 24px;
  border: none !important;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e0d0ff 20%,
    #b794f6 45%,
    #e0d0ff 70%,
    #ffffff 100%
  );
  background-size: 250% 250%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 8s ease infinite;
  text-shadow: none;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ========== SUBTITLE ========== */
.hero__sub {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #9a99a8;
  max-width: 500px;
  margin: 0 0 28px;
}

/* ========== STATUS PILLS ========== */
.hero__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 32px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #b0afbc;
}

.pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  font-style: normal;
}

.pill--warn .pill__dot { background: #facc15; box-shadow: 0 0 10px rgba(250, 204, 21, 0.5); }
.pill--online .pill__dot { background: #4ade80; box-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
.pill--danger .pill__dot { background: #f87171; box-shadow: 0 0 10px rgba(248, 113, 113, 0.5); }
.pill--muted { color: #6b6a78; border-color: rgba(255, 255, 255, 0.05); }

/* ========== CTA BUTTONS ========== */
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  border: none;
  white-space: nowrap;
}

.btn--glow {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
  color: #fff;
  box-shadow:
    0 0 24px rgba(124, 58, 237, 0.35),
    0 4px 16px rgba(124, 58, 237, 0.25);
}
.btn--glow:hover {
  box-shadow:
    0 0 48px rgba(124, 58, 237, 0.5),
    0 8px 32px rgba(124, 58, 237, 0.35);
  transform: translateY(-3px);
  color: #fff;
}

.btn--glass {
  background: rgba(255, 255, 255, 0.05);
  color: #c8c7d4;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}
.btn--glass:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-3px);
  color: #fff;
}

/* ========== ENTRANCE ANIMATIONS ========== */
.anim-up {
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0s) both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(35px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ========== BACKGROUND BLOBS (global fixed) ========== */
.bg-fx {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  will-change: transform;
}

.blob--1 {
  width: 550px; height: 550px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent 70%);
  top: -12%; left: -8%;
  animation: drift1 20s ease-in-out infinite;
}
.blob--2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.3), transparent 70%);
  bottom: -8%; right: -6%;
  animation: drift2 22s ease-in-out infinite;
}
.blob--3 {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(192, 132, 252, 0.22), transparent 70%);
  top: 35%; right: 12%;
  animation: drift3 18s ease-in-out infinite;
}
.blob--4 {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18), transparent 70%);
  bottom: 25%; left: 8%;
  animation: drift4 24s ease-in-out infinite;
}
.blob--5 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%);
  top: 55%; left: 38%;
  animation: drift5 21s ease-in-out infinite;
}

@keyframes drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(70px, 50px) scale(1.08); }
  66% { transform: translate(-35px, 70px) scale(0.95); }
}
@keyframes drift2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-55px, -35px) scale(1.05); }
  66% { transform: translate(45px, -55px) scale(0.92); }
}
@keyframes drift3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-45px, 35px) scale(1.1); }
}
@keyframes drift4 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(35px, -45px) scale(1.06); }
}
@keyframes drift5 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-50px, 30px) scale(1.08); }
  66% { transform: translate(40px, -40px) scale(0.94); }
}

/* ========== RESPONSIVE ========== */
@media (max-width: 860px) {
  .hero { padding: 100px 16px 40px; }

  .hero__cta {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .hero__spot { display: none; }

  .blob { filter: blur(50px); }
  .blob--1 { width: 320px; height: 320px; }
  .blob--2 { width: 260px; height: 260px; }
  .blob--3 { width: 220px; height: 220px; }
  .blob--4 { width: 200px; height: 200px; }
  .blob--5 { width: 240px; height: 240px; }
}
</style>
