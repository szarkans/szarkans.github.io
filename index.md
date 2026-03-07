---
layout: home
description: "Кошкокрафт - это лучший майнкрафт-сервер песочница с обилием новых механик и широким уклоном в жанр MMORPG со всеми его вытекающими!"
---

<HeroSection />

<BentoFeatures />

<ReviewWall />

<div class="home-faq-section">
  <div class="home-section-head">
    <span class="home-section-tag">FAQ</span>
    <h2 class="home-section-title">Частые вопросы</h2>
  </div>
  <HomeFaq />
</div>

<div class="home-cta-section">
  <h2 class="home-cta__title">Готов присоединиться?</h2>
  <p class="home-cta__desc">Подай заявку в Discord и начни своё приключение</p>
  <div class="home-cta__btns">
    <a href="/info/guide" class="home-cta__btn home-cta__btn--primary">
      Начать играть
    </a>
    <a href="https://discord.gg/6f3FwFRJWC" target="_blank" rel="noopener" class="home-cta__btn home-cta__btn--ghost">
      Discord
    </a>
  </div>
</div>

<style>
.home-faq-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 40px;
}

.home-section-head {
  text-align: center;
  margin-bottom: 36px;
}

.home-section-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7c3aed;
  margin-bottom: 12px;
}

.home-section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #e8e7f0;
  margin: 0;
  letter-spacing: -0.02em;
  border: none !important;
}

/* ===== Footer CTA ===== */
.home-cta-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 80px 24px 100px;
  text-align: center;
}

.home-cta__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #e8e7f0;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
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

.home-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.home-cta__btn--primary {
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  color: #fff;
  box-shadow: 0 0 24px rgba(124, 58, 237, 0.35), 0 4px 16px rgba(124, 58, 237, 0.25);
}
.home-cta__btn--primary:hover {
  box-shadow: 0 0 48px rgba(124, 58, 237, 0.5), 0 8px 32px rgba(124, 58, 237, 0.35);
  transform: translateY(-3px);
  color: #fff;
}

.home-cta__btn--ghost {
  background: rgba(255, 255, 255, 0.05);
  color: #c8c7d4;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.home-cta__btn--ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-3px);
  color: #fff;
}

@media (max-width: 640px) {
  .home-cta__btns {
    flex-direction: column;
    align-items: center;
  }
  .home-cta__btn {
    width: 100%;
    max-width: 260px;
    justify-content: center;
  }
  .home-cta-section {
    padding: 50px 16px 70px;
  }
}
</style>
