<template>
  <div :class="['info-block', imagePositionClass]">
    <!-- Обёртка для картинки -->
    <div class="info-block__image-wrapper">
      <img :src="imageSrc" :alt="title" />
    </div>

    <!-- Обёртка для текстов -->
    <div class="info-block__content">
      <h3 class="info-block__title">{{ title }}</h3>
      <hr class="info-block__separator" />
      <p class="info-block__text" style="white-space: pre-line;">
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  /**
   * Ссылка на изображение (URL)
   */
  imageSrc: {
    type: String,
    required: true
  },
  /**
   * Заголовок
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Основной текст
   */
//   content: {
//     type: String,
//     default: ''
//   },
  /**
   * Позиция картинки: "left" или "right"
   */
  imagePosition: {
    type: String,
    default: 'left'
  }
})

/**
 * Определяем класс для позиционирования картинки.
 * В CSS ниже настроено, что "info-block--image-left" ставит картинку слева,
 * а "info-block--image-right" — справа.
 */
const imagePositionClass = computed(() => {
  return props.imagePosition === 'right'
    ? 'info-block--image-right'
    : 'info-block--image-left'
})
</script>

<style scoped>
/* 
   Общие стили компонента: 
   - Флекс-верстка для картинки и текстов
   - Растягивается на всю ширину родителя
*/
.info-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  /* padding: 1rem; */
  margin: 1.5rem 0;
  background-color: var(--vp-c-bg, #1e1e1e); /* Можно заменить, если нужны свои цвета */
  border-radius: 0.5rem;
  border: 3px solid #2828286d;
}

/* Обёртка для картинки */
.info-block__image-wrapper {
  flex: 0 0 auto;
  /* Можно задать максимальную ширину при необходимости */
  max-width: 40%;
  text-align: center;
}

.info-block__image-wrapper img {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem; /* чуть скруглим */
}

/* Контейнер для текстов */
.info-block__content {
  flex: 1;
  margin-left: 1rem;
  margin-right: 1rem;
}

.info-block__title {
  margin: 0;
  font-size: 2.25rem;
  color: var(--vp-c-text, #fff);
}

.info-block__separator {
  margin: 0.75rem 0;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider, #666);
}

.info-block__text {
  margin: 0;
  color: var(--vp-c-text, #ccc);
  line-height: 1.5;
}

/* 
   Вариации для картинки слева/справа
   "left" просто оставляем как есть, а "right" переставляем порядок 
*/
.info-block--image-left {
  flex-direction: row; /* картинка слева, текст справа */
}

.info-block--image-right {
  flex-direction: row-reverse; /* картинка справа, текст слева */
}

/* Адаптив под мобильные устройства */
@media (max-width: 768px) {
  .info-block {
    flex-direction: column;
    text-align: center;
  }
  .info-block--image-left,
  .info-block--image-right {
    flex-direction: column; /* всегда картинка сверху, текст снизу */
  }
  .info-block__image-wrapper {
    max-width: 100%;
    margin-bottom: 1rem;
  }
  .info-block__content {
    margin: 0;
  }
}
</style>
