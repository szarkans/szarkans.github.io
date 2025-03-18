<template>
  <!-- 
    Carousel - это стандартный компонент PrimeVue
    :value="reviews" - сюда передаём массив отзывов
    :numVisible="3" - показываем 3 карточки за раз
    :numScroll="1" - скроллим по 1 карточке при переключении
    circular - после последнего отзыва идём на первый
  -->
  <Carousel
    :value="reviews"
    :numVisible="1"
    :numScroll="1"
    circular
  >
    <!-- 
      #item="slotProps" — в slotProps.data будет лежать 
      один объект из массива reviews (avatar, name, text).
      Затем мы выводим его данные в вёрстке.
    -->
    <template #item="slotProps">
      <div class="review-wrapper">
        <div class="review-header">
          <img
            class="review-avatar"
            :src="slotProps.data.avatar"
            alt="Автор"
          />
          <span class="review-name">{{ slotProps.data.name }}</span>
        </div>

        <!-- Разделитель (Divider) из PrimeVue -->
        <Divider type="solid" />

        <div class="review-text">
          {{ slotProps.data.text }}
        </div>
      </div>
    </template>
  </Carousel>
</template>

<script setup>
/* 
  Если у тебя глобальная регистрация в .vitepress/theme/index.js:
    import Carousel from 'primevue/carousel'
    import Divider from 'primevue/divider'
    app.component('Carousel', Carousel)
    app.component('Divider', Divider)

  То локально импортировать их не надо. 
  Но если хочешь локально — раскомментируй эти строки:

  // import Carousel from 'primevue/carousel'
  // import Divider from 'primevue/divider'
  // import 'primevue/resources/primevue.min.css'
  // import 'primeicons/primeicons.css'
  // import 'primeflex/primeflex.css'
*/

// Будем работать с Composition API
import { ref, onMounted } from 'vue'

// Массив отзывов (то, что ты уже использовал у себя).
// Просто выносим всё это в отдельный ref (reactive) — карусель будет бежать по этому массиву.
const reviews = ref([
  {
    avatar: 'https://cravatar.eu/avatar/Szarkan/50.png',
    name: 'Не Szarkan',
    text: 'я НЕ основатель этого сервера и я ТОЧНО НЕ подкупал игроков АРами чтобы они написали сюда хороший отзыв.'
  },
  {
    avatar: 'https://cravatar.eu/avatar/sm1lly/50.png',
    name: 'sm1lly',
    text: 'крутой сервер. меня не подкупали АРами.'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Ystika/50.png',
    name: 'Ystika',
    text: 'Вчера я играл на кошкокрафте до 2 часов ночи...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Sibirius/50.png',
    name: 'Sibirius',
    text: 'КошкоКрафт очень крутой сервер...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/dark_mooon/50.png',
    name: 'dark_moooon',
    text: 'Кошкокрафт это мой второй сервер, где я остался окончательно...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/CharaBell/50.png',
    name: 'CharaBell',
    text: 'самый лучший сервер, у админа большой хуй. я не жена админа.'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Kaban4Ever/50.png',
    name: 'Kaban4Ever',
    text: 'Играю с 5 сезона, название сервер оправдывает. Коты везде и повсюду...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Jodich/50.png',
    name: 'Jodich',
    text: 'Кошкокрафт - лучший и единственный кошачий сервер...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/l_vitek_l/50.png',
    name: 'l_vitek_l',
    text: 'СНРВЕР ДАСТАТАЧНА ХАРОШЫЙ ДЛЯ ИГРЫ С ДРУЗЬЯМИ...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/TM_Kocherga/50.png',
    name: 'TM_Kocherga',
    text: 'Кошкокрафт хороший сервер, играю с 5 и атмосферка хорошая...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/artlaks/50.png',
    name: 'artlaks',
    text: 'До того как я узнал о Кошкокрафте, у меня была импотенция...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Charanixy/50.png',
    name: 'Charanixy',
    text: 'всем привет'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Kvar1kc/50.png',
    name: 'Kvar1kc',
    text: 'Играю с 5-го сезона. Блин, очень круто!  Сервер всегда находится в онлайн!...'
  },
  {
    avatar: 'https://cravatar.eu/avatar/Mrs_Tori/50.png',
    name: 'Mrs_Tori',
    text: 'Сервер хорош, каждую неделю выходят разоблачения и интриги...'
  }
])

// При монтировании можно "предзагрузить" эти аватарки, чтобы 
// не было задержки при прокрутке карусели
onMounted(() => {
  reviews.value.forEach((r) => {
    const img = new Image()
    img.src = r.avatar
  })
})
</script>

<style scoped>
.review-wrapper {
  position: relative;
  margin: 0.5rem;       /* Небольшие отступы между карточками */
  border: 3px solid #2828286d;
  border-radius: 15px;
  padding: 1rem;
  box-sizing: border-box;
  max-width: 350px;     /* Чтобы не растягивалось слишком сильно */
}

/* То, что было у тебя */
.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.review-avatar {
  width: 50px;
  height: 50px;
  border-radius: 25%;
}

.review-name {
  font-weight: bold;
  margin-left: 10px;
}

.review-text {
  margin-top: 10px;
}
</style>
