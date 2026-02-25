<template>
  <div class="hero-section">
    <!-- Animated background blobs (fixed, full-page) -->
    <div class="bg-effects">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="blob blob-4"></div>
      <div class="blob blob-5"></div>
      <div class="sparkle sparkle-1"></div>
      <div class="sparkle sparkle-2"></div>
      <div class="sparkle sparkle-3"></div>
      <div class="sparkle sparkle-4"></div>
      <div class="sparkle sparkle-5"></div>
      <div class="sparkle sparkle-6"></div>
    </div>

    <div class="hero-content">
      <!-- Title -->
      <h1 class="hero-title">Кошкокрафт</h1>

      <!-- Subtitle -->
      <p class="hero-subtitle">
        Лучший. Кошачий. <span class="neon-word">Навсегда!</span>
      </p>

      <!-- Description -->
      <p class="hero-description">
        Сервер-песочница с обилием новых механик и уклоном в сторону РПГ со всеми его вытекающими!
      </p>

      <!-- Server status line -->
      <div class="server-status">
        <span class="status-line"></span>
        <span class="status-indicator" :class="statusClass"></span>
        <span class="status-text">{{ statusText }}</span>
        <span class="status-line"></span>
      </div>

      <span class="version-tag">1.21.8 Java Edition</span>

      <!-- CTA buttons -->
      <div class="hero-buttons">
        <a href="/info/guide" class="hero-btn hero-btn--primary">
          Начать играть
        </a>
        <a href="https://discord.gg/6f3FwFRJWC" target="_blank" rel="noopener" class="hero-btn hero-btn--secondary">
          <svg class="hero-btn__icon" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" fill="currentColor"/>
          </svg>
          Discord
        </a>
        <a href="https://t.me/catcraftmc_tg" target="_blank" rel="noopener" class="hero-btn hero-btn--secondary">
          <svg class="hero-btn__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/>
          </svg>
          Telegram
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Server mode: 'offseason' | 'maintenance' | 'online'
const SERVER_MODE = 'offseason'

const playerCount = ref(null)
const tps = ref(null)
const fetchError = ref(false)
const loaded = ref(false)

const statusClass = computed(() => {
  if (SERVER_MODE === 'online' && !fetchError.value && loaded.value) return 'status--online'
  if (SERVER_MODE === 'maintenance') return 'status--maintenance'
  return 'status--offseason'
})

const statusText = computed(() => {
  if (SERVER_MODE === 'offseason') return 'Мы на межсезонье'
  if (SERVER_MODE === 'maintenance') return 'Сервер на тех. работах!'
  if (SERVER_MODE === 'online') {
    if (fetchError.value) return 'Сервер на тех. работах!'
    if (!loaded.value) return 'Загрузка...'
    const fakeTps = (18.0 + Math.random() * 1.1).toFixed(1)
    return `${playerCount.value} игроков | ${fakeTps} ТПС`
  }
  return ''
})

onMounted(async () => {
  if (SERVER_MODE !== 'online') return

  // Check sessionStorage cache
  const cacheKey = 'catcraft_server_status'
  const cacheTimeKey = 'catcraft_server_status_time'
  const cached = sessionStorage.getItem(cacheKey)
  const cachedTime = sessionStorage.getItem(cacheTimeKey)

  if (cached && cachedTime && Date.now() - Number(cachedTime) < 60000) {
    try {
      const data = JSON.parse(cached)
      playerCount.value = data.players
      loaded.value = true
      return
    } catch { /* ignore bad cache */ }
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch('https://api.mcsrvstat.us/2/play.catcraftmc.ru', {
      signal: controller.signal
    })
    clearTimeout(timeout)
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
.hero-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 12px 150px;
}

/* ===== BACKGROUND EFFECTS (full-page, parallax) ===== */
.bg-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  pointer-events: none;
  will-change: transform;
}
.blob-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(79, 45, 190, 0.45), transparent 70%);
  top: -10%;
  left: -5%;
  animation: blobMove1 18s ease-in-out infinite;
}
.blob-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(135, 88, 243, 0.35), transparent 70%);
  bottom: -5%;
  right: -5%;
  animation: blobMove2 20s ease-in-out infinite;
}
.blob-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(200, 100, 255, 0.25), transparent 70%);
  top: 30%;
  right: 10%;
  animation: blobMove3 16s ease-in-out infinite;
}
.blob-4 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(100, 140, 255, 0.2), transparent 70%);
  bottom: 20%;
  left: 10%;
  animation: blobMove4 22s ease-in-out infinite;
}
.blob-5 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(150, 80, 220, 0.3), transparent 70%);
  top: 55%;
  left: 40%;
  animation: blobMove5 19s ease-in-out infinite;
}

@keyframes blobMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(60px, 40px) scale(1.1); }
  66% { transform: translate(-30px, 60px) scale(0.95); }
}
@keyframes blobMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-50px, -30px) scale(1.05); }
  66% { transform: translate(40px, -50px) scale(0.9); }
}
@keyframes blobMove3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, 30px) scale(1.08); }
}
@keyframes blobMove4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -40px) scale(1.05); }
}
@keyframes blobMove5 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-45px, 25px) scale(1.07); }
  66% { transform: translate(35px, -35px) scale(0.93); }
}

/* ===== SPARKLES ===== */
.sparkle {
  position: absolute;
  width: 7px;
  height: 7px;
  background: rgba(200, 170, 255, 0.8);
  transform: rotate(45deg);
  pointer-events: none;
  animation: sparklePulse 3s ease-in-out infinite;
}
.sparkle-1 { top: 12%; left: 8%; animation-delay: 0s; }
.sparkle-2 { top: 8%; left: 45%; animation-delay: 0.7s; }
.sparkle-3 { top: 25%; right: 12%; animation-delay: 1.4s; }
.sparkle-4 { bottom: 30%; left: 15%; animation-delay: 2.1s; }
.sparkle-5 { bottom: 18%; right: 20%; animation-delay: 0.4s; }
.sparkle-6 { top: 50%; left: 30%; animation-delay: 1.8s; }

@keyframes sparklePulse {
  0%, 100% { opacity: 0.2; transform: rotate(45deg) scale(0.8); }
  50% { opacity: 1; transform: rotate(45deg) scale(1.2); }
}

/* ===== CONTENT ===== */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 700px;
}

/* Title */
.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 16px;
  background: linear-gradient(100deg, #ffffff 10%, #c299e5 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  border: none !important;
}

/* Subtitle */
.hero-subtitle {
  font-size: 1.8rem;
  font-weight: 600;
  color: #e0d6f0;
  margin: 0 0 16px;
  line-height: 1.3;
}

.neon-word {
  color: #a67cf5;
  text-shadow:
    0 0 10px rgba(166, 124, 245, 0.6),
    0 0 30px rgba(166, 124, 245, 0.3),
    0 0 60px rgba(166, 124, 245, 0.15);
}

/* Description */
.hero-description {
  font-size: 1.1rem;
  color: #a0a0b0;
  line-height: 1.6;
  margin: 0 0 28px;
  max-width: 550px;
}

/* ===== SERVER STATUS ===== */
.server-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: #808090;
  font-size: 0.95rem;
}
.status-line {
  width: 40px;
  height: 1px;
  background: rgba(128, 128, 144, 0.3);
}
.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status--online {
  background: #4ade80;
  box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
}
.status--offseason {
  background: #facc15;
  box-shadow: 0 0 8px rgba(250, 204, 21, 0.4);
}
.status--maintenance {
  background: #f87171;
  box-shadow: 0 0 8px rgba(248, 113, 113, 0.4);
}
.status-text {
  white-space: nowrap;
}

/* Version tag */
.version-tag {
  font-size: 0.8rem;
  color: #606070;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

/* ===== CTA BUTTONS ===== */
.hero-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.hero-btn--primary {
  background: var(--cc-main, #4f2dbe);
  color: #fff;
  box-shadow:
    0 0 20px rgba(79, 45, 190, 0.4),
    0 4px 15px rgba(79, 45, 190, 0.3);
}
.hero-btn--primary:hover {
  background: #5c35d4;
  box-shadow:
    0 0 30px rgba(79, 45, 190, 0.6),
    0 6px 20px rgba(79, 45, 190, 0.4);
  transform: translateY(-2px);
  color: #fff;
}

.hero-btn--secondary {
  background: rgba(255, 255, 255, 0.06);
  color: #d0d0e0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.hero-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  color: #fff;
}

.hero-btn__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 8px 60px;
  }
  .hero-content {
    max-width: 95%;
  }
  .hero-title {
    font-size: 3rem;
    width: 100%;
  }
  .hero-subtitle {
    font-size: 1.3rem;
  }
  .hero-description {
    font-size: 0.95rem;
  }
  .server-status {
    font-size: 0.85rem;
  }
  .version-tag {
    font-size: 0.7rem;
  }
  .blob { filter: blur(40px); }
  .blob-1 { width: 300px; height: 300px; }
  .blob-2 { width: 250px; height: 250px; }
  .blob-3 { width: 200px; height: 200px; }
  .blob-4 { width: 180px; height: 180px; }
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .hero-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

/* @media (max-width: 480px) {
  .hero-title {
    font-size: 2.3rem;
  }
  .hero-subtitle {
    font-size: 1.05rem;
  }
  .hero-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 375px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 0.95rem;
  }
} */
</style>
