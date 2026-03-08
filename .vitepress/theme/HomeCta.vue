<template>
  <div class="home-cta-section">
    <h2 class="home-cta__title">Готов присоединиться?</h2>
    <p class="home-cta__desc">Так чего же ты ждёшь? Заходи к нам в Discord!</p>
    <div class="home-cta__btns">
      <a href="/info/guide" class="hero-btn hero-btn--primary">
        Начать играть
      </a>
      <a href="https://discord.gg/6f3FwFRJWC" target="_blank" rel="noopener" class="hero-btn hero-btn--secondary">
        Discord
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-cta-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 200px 24px 100px;
  text-align: center;
}

.home-cta__title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #e8e7f0;
  margin: 0 0 12px;
  letter-spacing: -0.03em;
  border: none !important;
}

.home-cta__desc {
  font-size: 1.05rem;
  color: #8b8a96;
  margin: 0 0 32px;
  line-height: 1.6;
}

.home-cta__btns {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== КНОПКИ (идентичны Hero) ===== */
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

@media (max-width: 640px) {
  .home-cta__btns {
    flex-direction: column;
    align-items: center;
  }
  .hero-btn {
    width: 100%;
    justify-content: center;
    padding: 16px 28px;
    font-size: 1.1rem;
  }
  .home-cta-section {
    padding: 100px 16px 70px;
  }
}
</style>
