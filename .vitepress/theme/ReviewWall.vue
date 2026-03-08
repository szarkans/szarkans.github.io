<template>
  <section class="rv-section" ref="sectionRef">
    <div class="rv-head">
      <span class="rv-head__tag">community</span>
      <h2 class="rv-head__title">Что говорят <em>игроки</em></h2>
    </div>

    <div class="rv-cols">
      <!-- Fade masks -->
      <div class="rv-fade rv-fade--top"></div>
      <div class="rv-fade rv-fade--bot"></div>

      <div class="rv-col" v-for="(col, ci) in columns" :key="ci">
        <div
          class="rv-track"
          :class="ci % 2 === 0 ? 'rv-track--up' : 'rv-track--down'"
        >
          <div
            class="rv-card"
            v-for="(r, ri) in col"
            :key="ri"
          >
            <div class="rv-card__head">
              <img
                :src="`https://cravatar.eu/avatar/${r.nick}/50.png`"
                :alt="r.name"
                class="rv-card__ava"
                loading="lazy"
                width="40"
                height="40"
              />
              <span class="rv-card__name">{{ r.name }}</span>
            </div>
            <p class="rv-card__text">{{ r.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const allReviews = [
  { nick: 'Szarkan', name: 'Не Szarkan', text: 'я НЕ основатель этого сервера и я ТОЧНО НЕ подкупал игроков АРами чтобы они написали сюда хороший отзыв.' },
  { nick: 'sm1lly', name: 'sm1lly', text: 'крутой сервер. меня не подкупали АРами.' },
  { nick: 'Ystika', name: 'Ystika', text: 'Вчера я играл на кошкокрафте до 2 часов ночи, было очень весело... Хохотал на весь дом всю ночь, но сегодня почему-то проснулся в детдоме.' },
  { nick: 'Sibirius', name: 'Sibirius', text: 'КошкоКрафт очень крутой сервер. Здесь добрые и веселые котики, хорошие ивенты, имеется много всяких кастомных приколюх, особенно сильно мне нравица мебель и рисовать. А так же, только здесь самая лучшая, отзывчивая и пиздец какая крутая модерация, особенно Всекотец (ака админ). Я рыгнул и у меня упал потолок.' },
  { nick: 'dark_mooon', name: 'dark_moooon', text: 'Кошкокрафт это мой второй сервер, где я остался окончательно. Честно, не могу сказать, почему я выбрал именно его. Но могу быть уверенным, что здесь много интересных людей, с которыми можно потерять свою жизнь, играя в майнкрафт.' },
  { nick: 'CharaBell', name: 'CharaBell', text: 'самый лучший сервер, у админа большой хуй. я не жена админа.' },
  { nick: 'Kaban4Ever', name: 'Kaban4Ever', text: 'Играю с 5 сезона, название сервер оправдывает. Коты везде и повсюду, даже в интерфейсе... За время игры познал себя в Блендере, т.к. нашел некое вдохновение. Тут играют ОЧЕНЬ интересные люди, непредсказуемые.' },
  { nick: 'l_vitek_l', name: 'l_vitek_l', text: 'СНРВЕР ДАСТАТАЧНА ХАРОШЫЙ ДЛЯ ИГРЫ С ДРУЗЬЯМИ, НО ЭТО НЕ ТОЧНО. Ладно потом что-то нормальное придумаю' },
  { nick: 'TM_Kocherga', name: 'TM_Kocherga', text: 'Кошкокрафт хороший сервер, играю с 5 и атмосферка хорошая, сервер оч интересный!! Всем советую' },
  { nick: 'artlaks', name: 'artlaks', text: 'До того как я узнал о Кошкокрафте, у меня была импотенция. Но когда я узнал о нем и начал играть... Так я и стал дедом в 16 лет. В общем, сервер объединяет ранее незнакомых людей в семьи.' },
  { nick: 'Charanixy', name: 'Charanixy', text: 'всем привет' },
  { nick: 'Kvar1kc', name: 'Kvar1kc', text: 'Играю с 5-го сезона. Блин, очень круто! Сервер всегда находится в онлайн! Игроки отзывчивые, админ делает новые фишки и крутые дополнения.' },
  { nick: 'Mrs_Tori', name: 'Mrs_Tori', text: 'Сервер хорош, каждую неделю выходят разоблачения и интриги, перестала смотреть криминальную Россию, так как и на Кошкокрафте хватает запутанных историй.' },
  { nick: 'Skorohodon', name: 'Skorohodon', text: 'Самый лучший сервер, админ мой лучший друг, я его очень люблю и не желаю ему адской и мучительной смерти каждый божий день.' }
]

// Split into 2 columns, duplicate each for seamless loop
const col1Source = allReviews.filter((_, i) => i % 2 === 0)
const col2Source = allReviews.filter((_, i) => i % 2 === 1)

const columns = [
  [...col1Source, ...col1Source],
  [...col2Source, ...col2Source]
]
</script>

<style scoped>
.rv-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 40px;
}

/* Header */
.rv-head {
  text-align: center;
  margin-bottom: 40px;
}

.rv-head__tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7c3aed;
  margin-bottom: 12px;
}

.rv-head__title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-family: 'Unbounded', sans-serif;
  font-weight: 800;
  color: #e8e7f0;
  margin: 0;
  letter-spacing: -0.02em;
  border: none !important;
}

.rv-head__title em {
  font-style: normal;
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Columns container */
.rv-cols {
  position: relative;
  display: flex;
  gap: 16px;
  height: 520px;
  overflow: hidden;
}

/* Fade masks */
.rv-fade {
  position: absolute;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 3;
  pointer-events: none;
}
.rv-fade--top {
  top: 0;
  background: linear-gradient(to bottom, var(--vp-c-bg, #1b1b1f) 0%, transparent 100%);
}
.rv-fade--bot {
  bottom: 0;
  background: linear-gradient(to top, var(--vp-c-bg, #1b1b1f) 0%, transparent 100%);
}

/* Column */
.rv-col {
  flex: 1;
  overflow: hidden;
}

.rv-col:hover .rv-track {
  animation-play-state: paused;
}

/* Scrolling tracks */
.rv-track {
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.rv-track--up {
  animation: tickUp 55s linear infinite !important;
}

.rv-track--down {
  animation: tickDown 55s linear infinite !important;
}

.rv-track .rv-card {
  margin-bottom: 14px;
}

@keyframes tickUp {
  0% { transform: translateY(0%); }
  100% { transform: translateY(-50%); }
}

@keyframes tickDown {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0%); }
}

/* Cards */
.rv-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 18px 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}

.rv-card:hover {
  border-color: rgba(124, 58, 237, 0.35);
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.1);
}

.rv-card__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.rv-card__ava {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.rv-card__name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #d0cfdf;
}

.rv-card__text {
  font-size: 0.85rem;
  line-height: 1.65;
  color: #8b8a96;
  margin: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .rv-cols {
    height: 420px;
    gap: 10px;
  }

  .rv-card {
    padding: 14px 16px;
  }

  .rv-card__ava {
    width: 32px;
    height: 32px;
  }

  .rv-card__text {
    font-size: 0.8rem;
  }

  .rv-section {
    padding: 40px 16px 30px;
  }
}
</style>
