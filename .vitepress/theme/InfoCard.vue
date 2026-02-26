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
import { computed } from 'vue'

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
  margin: 1.5rem 0;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid rgba(79, 45, 190, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}

.info-block:hover {
  transform: translateY(-2px);
  background: rgba(0, 0, 0, 0.32);
  border-color: rgba(255, 255, 255, 0.13);
  border-left-color: rgba(79, 45, 190, 0.8);
  box-shadow: 0 8px 24px rgba(79, 45, 190, 0.14);
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
  margin-right: 1.25rem;
  padding: 1.25rem 0;
}

.info-block__title {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1, #fff);
}

.info-block__separator {
  margin: 0.75rem 0 1rem 0;
  border: none;
  border-bottom: 1px solid rgba(79, 45, 190, 0.3);
}

.info-block__text {
  margin: 0;
  color: var(--vp-c-text-2, #aaaabc);
  line-height: 1.7;
  font-size: 0.975rem;
}

@media (max-width: 960px) {
  .info-block__text {
    padding: 10px;
  }
}

@media (max-width: 960px) {
  .info-block__text ul {
    text-align: left !important;
  }
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
