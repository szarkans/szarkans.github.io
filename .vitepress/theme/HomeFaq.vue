<template>
  <div class="faq-container">
    <!-- Левая колонка с дропдаунами -->
    <div class="faq-left">
      <div v-for="(item, index) in faqItems" :key="index" class="dropdown">
        <button class="dropdown-title" @click="toggle(index)">
          {{ item.title }}
        </button>
        <!-- Убираем v-show и применяем динамический стиль -->
        <div class="dropdown-content" :style="{ maxHeight: openStates[index] ? '200px' : '0px' }">
          <!-- Используем v-html для вывода HTML-содержимого -->
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>

    <!-- Блок ссылки на Discord -->
    <div class="faq-right">
      <div class="discord-box">
        <a href="https://discord.gg/catcraftmc" target="_blank" style="color: inherit; text-decoration: none;">
          <div class="discord-box-top">
            <!-- SVG-иконки Discord -->
            <svg class="discord-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
              <g id="图层_2" data-name="图层 2">
                <g id="Discord_Logos" data-name="Discord Logos">
                  <g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White">
                    <path class="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </g>
                </g>
              </g>
            </svg>

            <svg class="discord-box-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/>
            </svg>
          </div>
          <div class="discord-text">
            <h4>Есть ещё вопросы?</h4>
            <p class="discord-box_add_text">Заходи к нам в Discord!<br>С радостью ответим &gt;3&lt;</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Массив с вопросами и ответами (контент может содержать HTML)
const faqItems = [
  {
    title: 'Что вы такое?',
    content: `Мы Ванилла+ РП сервер - добавляем новый контент в ванильный Майнкрафт и приправляем это щепоткой РП!`
  },
  {
    title: 'Какая версия?',
    content: 'Версия следующего сезона - 1.21.5 Java Edition! С Bedrock Edition зайти нельзя.'
  },
  {
    title: 'Нужна лицензия?',
    content: 'Нет! Можно играть как с пиратки, так и с лицензии!'
  },
  {
    title: 'Как попасть на сервер?',
    content: 'Пока что никак - мы на межсезонье до 01.06.2025! Но обязательно зайди в наш <a href="https://discord.gg/catcraftmc">Discord</a> или <a href="https://t.me/catcraftmc_tg">Telegram</a> чтобы быть в курсе новостей!'
  },
  {
    title: 'Какая валюта сервера?',
    content: `<b>АРы</b> - Алмазная руда, в основном глубиносланцевая. Это намного лучше алмазов, ведь у "старичков" с "Удачей" нет преимущества над новичками!`
  },
  {
    title: 'Какие ограничения ферм?',
    content: 'Прорисовка и симуляция - 6 чанков, дюпы сыпучих блоков, рельс и ковров включёны и разрешены.'
  },
  {
    title: 'Почему "Кошкокрафт"? Вы "няняня"?',
    content: `У этого названия есть <a href="server-history/1season">целая история</a>!`
  }
]

// Массив булевых значений для отслеживания состояния каждого дропдауна
const openStates = ref(Array(faqItems.length).fill(false))

// Функция для переключения состояния выбранного элемента
function toggle(index) {
  openStates.value[index] = !openStates.value[index]
}
</script>

<style scoped>
/* Стили для контейнера FAQ */
.faq-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/* Левая и правая колонки */
.faq-left {
  width: 70%;
  box-sizing: border-box;
  padding: 10px;
}

.faq-right {
  width: 30%;
  box-sizing: border-box;
  padding: 10px;
}

/* Стили для дропдауна */
.dropdown {
  width: 100%;
  border: solid #2828286d;
  border-radius: 15px;
  margin-top: 5px;
}

.dropdown-title {
  color: #d5d5d5;
  padding: 22px;
  padding-right: 30px;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 20px;
  position: relative;
  background-image: url("data:image/svg+xml;utf8,<svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 1L7 7L13 1' stroke='%2379797A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  transition: background-color 0.2s !important;
}

.dropdown-title:hover {
  background-color: hsla(var(--md-hue),15%,18%,1);
}

/* Элемент с контентом дропдауна - переход max-height */
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease !important;
}

.dropdown-content p {
  padding: 15px;
  margin: 0;
}

/* Стили для Discord Link Box */
.discord-box {
  width: 100%;
  background-color: #7289da;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  flex: 0 0 35%;
  background: transparent;
  border: 0.2rem solid #2828286d;
  padding: 20px;
  cursor: pointer;
}

.discord-box:hover {
  background-color: hsla(var(--md-hue),15%,18%,1);
}

.discord-box-top {
  display: flex;
  margin-bottom: 20px;
}

.discord-logo {
  width: 60px;
  fill: #5865f2;
}

.discord-box-link {
  margin-left: auto;
  width: 30px;
  fill: #bbbbbb;
}

.discord-text h4 {
  margin: 10px 0 5px 0;
  font-size: 20px;
}

.discord-text p {
  margin: 0 0 15px 0;
  font-size: 16px;
}

/* Адаптивность для мобильных устройств */
@media screen and (max-width: 768px) {
  .faq-container {
    flex-direction: column;
    align-items: stretch;
  }

  .faq-left, .faq-right {
    width: 100%;
  }
}

.discord-box_add_text {
    color: #bfbfbf;
}

</style>
