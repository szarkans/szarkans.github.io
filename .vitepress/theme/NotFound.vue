<template>
  <div class="not-found-page">
    <!-- Animated background blobs (identical to HeroSection) -->
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

    <div class="nf-content">
      <div class="nf-code">404</div>
      <h1 class="nf-title">Страница не найдена</h1>
      <p class="nf-desc">Если так не должно быть - напиши нам в Дискорд :3</p>

      <div class="nf-buttons">
        <a href="/" class="nf-btn nf-btn--primary">На главную</a>
        <a
          href="https://discord.gg/6f3FwFRJWC"
          target="_blank"
          rel="noopener"
          class="nf-btn nf-btn--secondary"
        >
          <svg class="nf-btn__icon" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" fill="currentColor"/>
          </svg>
          Сообщить о баге на Вики
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 12px;
  position: relative;
}

/* ===== BACKGROUND EFFECTS ===== */
.bg-effects {
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
  opacity: 0.6;
  pointer-events: none;
  will-change: transform;
}
.blob-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(79, 45, 190, 0.45), transparent 70%);
  top: -10%; left: -5%;
  animation: blobMove1 18s ease-in-out infinite;
}
.blob-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(135, 88, 243, 0.35), transparent 70%);
  bottom: -5%; right: -5%;
  animation: blobMove2 20s ease-in-out infinite;
}
.blob-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(200, 100, 255, 0.25), transparent 70%);
  top: 30%; right: 10%;
  animation: blobMove3 16s ease-in-out infinite;
}
.blob-4 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(100, 140, 255, 0.2), transparent 70%);
  bottom: 20%; left: 10%;
  animation: blobMove4 22s ease-in-out infinite;
}
.blob-5 {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(150, 80, 220, 0.3), transparent 70%);
  top: 55%; left: 40%;
  animation: blobMove5 19s ease-in-out infinite;
}

@keyframes blobMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(60px, 40px) scale(1.1); }
  66%       { transform: translate(-30px, 60px) scale(0.95); }
}
@keyframes blobMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-50px, -30px) scale(1.05); }
  66%       { transform: translate(40px, -50px) scale(0.9); }
}
@keyframes blobMove3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-40px, 30px) scale(1.08); }
}
@keyframes blobMove4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(30px, -40px) scale(1.05); }
}
@keyframes blobMove5 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-45px, 25px) scale(1.07); }
  66%       { transform: translate(35px, -35px) scale(0.93); }
}

/* ===== SPARKLES ===== */
.sparkle {
  position: absolute;
  width: 7px; height: 7px;
  background: rgba(200, 170, 255, 0.8);
  transform: rotate(45deg);
  pointer-events: none;
  animation: sparklePulse 3s ease-in-out infinite;
}
.sparkle-1 { top: 12%; left: 8%;    animation-delay: 0s; }
.sparkle-2 { top: 8%;  left: 45%;   animation-delay: 0.7s; }
.sparkle-3 { top: 25%; right: 12%;  animation-delay: 1.4s; }
.sparkle-4 { bottom: 30%; left: 15%; animation-delay: 2.1s; }
.sparkle-5 { bottom: 18%; right: 20%; animation-delay: 0.4s; }
.sparkle-6 { top: 50%; left: 30%;   animation-delay: 1.8s; }

@keyframes sparklePulse {
  0%, 100% { opacity: 0.2; transform: rotate(45deg) scale(0.8); }
  50%       { opacity: 1;   transform: rotate(45deg) scale(1.2); }
}

/* ===== CONTENT ===== */
.nf-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Animated 404 number */
.nf-code {
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 8px;
  background: linear-gradient(100deg, #ffffff 0%, #c299e5 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmer 4s linear infinite;
  letter-spacing: -4px;
}

@keyframes shimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Title */
.nf-title {
  font-size: 2rem;
  font-weight: 700;
  color: #e0d6f0;
  margin: 0 0 12px;
  border: none !important;
}

/* Description — замени на свой текст */
.nf-desc {
  font-size: 1.05rem;
  color: #a0a0b0;
  margin: 0 0 36px;
}

/* ===== BUTTONS ===== */
.nf-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.nf-btn {
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

.nf-btn--primary {
  background: var(--cc-main, #4f2dbe);
  color: #fff;
  box-shadow:
    0 0 20px rgba(79, 45, 190, 0.4),
    0 4px 15px rgba(79, 45, 190, 0.3);
}
.nf-btn--primary:hover {
  background: #5c35d4;
  box-shadow:
    0 0 30px rgba(79, 45, 190, 0.6),
    0 6px 20px rgba(79, 45, 190, 0.4);
  transform: translateY(-2px);
  color: #fff;
}

.nf-btn--secondary {
  background: rgba(255, 255, 255, 0.06);
  color: #d0d0e0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.nf-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  color: #fff;
}

.nf-btn__icon {
  width: 18px; height: 18px;
  flex-shrink: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .nf-code { font-size: 6rem; letter-spacing: -2px; }
  .nf-title { font-size: 1.5rem; }
  .blob { filter: blur(40px); }
  .blob-1 { width: 300px; height: 300px; }
  .blob-2 { width: 250px; height: 250px; }
  .blob-3 { width: 200px; height: 200px; }
  .blob-4 { width: 180px; height: 180px; }
  .nf-buttons { flex-direction: column; align-items: center; }
  .nf-btn { width: 100%; justify-content: center; }
}
</style>
