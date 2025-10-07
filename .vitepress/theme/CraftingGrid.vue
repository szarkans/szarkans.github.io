<template>
  <div class="crafting-container">
    <!-- Основной контейнер крафта -->
    <div class="crafting-grid-wrapper">
      <!-- Сетка ингредиентов 3x3 -->
      <div class="ingredients-section">
        <div class="ingredients-grid">
          <!-- Итерация по строкам матрицы -->
          <template v-for="(row, rowIndex) in ingredientsMatrix" :key="`row-${rowIndex}`">
            <!-- Итерация по элементам в строке -->
            <div 
              v-for="(slot, colIndex) in row" 
              :key="`cell-${rowIndex}-${colIndex}`"
              class="ingredient-slot"
            >
              <!-- Кликабельный ингредиент с тултипом -->
              <a 
                v-if="slot && slot.image"
                :href="slot.link || '#'"
                target="_blank"
                @click="handleIngredientClick($event, slot)"
                class="ingredient-link"
                @mouseenter="showTooltip($event, slot.name, `ingredient-${rowIndex}-${colIndex}`, 'ingredient')"
                @mouseleave="hideTooltip(`ingredient-${rowIndex}-${colIndex}`)"
              >
                <img 
                  :src="slot.image" 
                  :alt="slot.name || 'Ingredient'"
                  class="item-icon"
                />
              </a>
              
              <!-- Тултип для ингредиента -->
              <div 
                v-if="tooltips[`ingredient-${rowIndex}-${colIndex}`]"
                :class="['minecraft-tooltip', 'tooltip-ingredient', { 'visible': tooltips[`ingredient-${rowIndex}-${colIndex}`] }]"
                :style="tooltipStyles[`ingredient-${rowIndex}-${colIndex}`]"
              >
                {{ slot.name }}
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <!-- Стрелка крафта -->
      <div class="crafting-arrow">
        <img 
          src="/assets/arrow.png" 
          alt="Crafting Arrow"
          class="arrow-image"
        />
      </div>
      
      <!-- Секция результата -->
      <div class="result-section">
        <div class="result-slot">
          <div 
            v-if="result && result.image"
            class="result-wrapper"
            @mouseenter="showTooltip($event, result.name, 'result', 'result')"
            @mouseleave="hideTooltip('result')"
          >
            <img 
              :src="result.image" 
              :alt="result.name || 'Result'"
              class="item-icon result-icon"
            />
            
            <!-- Количество результата (если указано) -->
            <span v-if="result.count && result.count > 1" class="item-count">
              {{ result.count }}
            </span>
          </div>
          
          <!-- Тултип для результата (особый стиль) -->
          <div 
            v-if="tooltips.result"
            :class="['minecraft-tooltip', 'tooltip-result', { 'visible': tooltips.result }]"
            :style="tooltipStyles.result"
          >
            {{ result.name }}
            <span v-if="result.count && result.count > 1" class="tooltip-count">
              x{{ result.count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Пропсы компонента
const props = defineProps({
  // Матрица ингредиентов 3x3 (массив из 3 массивов по 3 элемента)
  ingredients: {
    type: Array,
    required: true,
    validator: (value) => {
      // Проверяем что это матрица 3x3
      return value.length === 3 && 
             value.every(row => Array.isArray(row) && row.length === 3)
    }
  },
  // Объект результата крафта
  result: {
    type: Object,
    required: true,
    validator: (value) => value.image && value.name
  }
})

// Состояние тултипов
const tooltips = reactive({})
const tooltipStyles = reactive({})

// Преобразование матрицы ингредиентов для удобства работы
const ingredientsMatrix = computed(() => {
  return props.ingredients.map(row => {
    return row.map(item => {
      if (!item) return null
      // Нормализация данных ингредиента
      if (typeof item === 'string') {
        // Если передана только строка с путём к картинке
        return {
          image: item,
          name: 'Item',
          link: null
        }
      }
      // Если передан объект
      return {
        image: item.image,
        name: item.name || 'Item',
        link: item.link || null
      }
    })
  })
})

// Обработка клика по ингредиенту
const handleIngredientClick = (event, slot) => {
  // Если нет ссылки, предотвращаем переход
  if (!slot.link) {
    event.preventDefault()
  }
}

// Показать тултип при наведении
const showTooltip = (event, text, key, type) => {
  if (!text) return
  
  // Активируем тултип
  tooltips[key] = true
  
  // Вычисляем позицию тултипа относительно элемента
  const rect = event.currentTarget.getBoundingClientRect()
  const tooltipX = rect.left + rect.width / 2
  // Для результата тултип показываем чуть выше
  const tooltipY = type === 'result' ? rect.top - 15 : rect.top - 10
  
  // Устанавливаем стили позиционирования
  tooltipStyles[key] = {
    left: `${tooltipX}px`,
    top: `${tooltipY}px`
  }
}

// Скрыть тултип
const hideTooltip = (key) => {
  tooltips[key] = false
}
</script>

<style scoped>
/* Локальный шрифт Minecraft */
@font-face {
  font-family: 'Minecraft Rus';
  src: url('/assets/minecraft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Основной контейнер */
.crafting-container {
  display: flex;
  justify-content: flex-start; /* Выравнивание по левому краю на ПК */
  align-items: center;
  padding: 20px 0;
  font-family: 'Minecraft Rus', 'Courier New', monospace;
  user-select: none;
}

/* Обёртка всего крафта */
.crafting-grid-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #C6C6C6;
  border: 5px solid;
  border-color: #FCFCFC #555555 #555555 #FCFCFC;
  padding: 24px;
  box-shadow: 
    inset 2px 2px 0 rgba(255, 255, 255, 0.4),
    inset -2px -2px 0 rgba(0, 0, 0, 0.3);
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Секция ингредиентов */
.ingredients-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Сетка ингредиентов 3x3 */
.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(3, 52px);
  grid-template-rows: repeat(3, 52px);
  gap: 3px;
}

/* Слот для ингредиента */
.ingredient-slot {
  position: relative;
  width: 52px;
  height: 52px;
  background: #8B8B8B;
  border: 2px solid;
  border-color: #373737 #FCFCFC #FCFCFC #373737;
  box-shadow: 
    inset -1px -1px 0 #555555,
    inset 1px 1px 0 #000000;
}

/* Ссылка ингредиента */
.ingredient-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.1s;
}

.ingredient-link:hover {
  transform: scale(1.05);
}

/* Стрелка крафта */
.crafting-arrow {
  width: 48px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.arrow-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Секция результата */
.result-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Слот результата */
.result-slot {
  position: relative;
  width: 64px;
  height: 64px;
  background: #8B8B8B;
  border: 3px solid;
  border-color: #373737 #FCFCFC #FCFCFC #373737;
  box-shadow: 
    inset -1px -1px 0 #555555,
    inset 1px 1px 0 #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Обёртка результата */
.result-wrapper {
  position: relative;
  width: 56px;
  height: 56px;
  cursor: help;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Иконка предмета */
.item-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Иконка результата чуть больше */
.result-icon {
  width: 52px;
  height: 52px;
}

/* Количество предметов на иконке */
.item-count {
  position: absolute;
  bottom: 0;
  right: 2px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 
    2px 2px 0 #3f3f3f,
    -1px 1px 0 #3f3f3f,
    1px -1px 0 #3f3f3f,
    -1px -1px 0 #3f3f3f,
    1px 2px 0 #3f3f3f;
  pointer-events: none;
  z-index: 3;
}

/* Базовые стили для всех тултипов */
.minecraft-tooltip {
  position: fixed;
  padding: 6px 10px;
  border: 2px solid;
  border-radius: 3px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  transform: translateX(-50%) translateY(-100%);
  transition: opacity 0.15s;
}

/* Тултип для обычных ингредиентов (фиолетовый) */
.tooltip-ingredient {
  background: #100010;
  background: rgba(16, 0, 16, 0.94);
  border-color: #2D0A4E;
  color: #FFFFFF;
  text-shadow: 1px 1px 0 #3f3f3f;
  box-shadow:
    inset 0 0 0 1px #28284E,
    0 0 0 1px #000000;
}

/* Тултип для результата (зелёный/необычный предмет) */
.tooltip-result {
  background: #100010;
  background: rgba(16, 0, 16, 0.94);
  border-color: #55FF55;
  color: #55FF55;
  text-shadow: 1px 1px 0 #153F15;
  box-shadow:
    inset 0 0 0 1px #2A552A,
    0 0 0 1px #000000;
}

/* Альтернативный стиль для эпических предметов (фиолетовый результат) */
.tooltip-result.epic {
  border-color: #AA55FF;
  color: #AA55FF;
  text-shadow: 1px 1px 0 #3F153F;
  box-shadow:
    inset 0 0 0 1px #552A55,
    0 0 0 1px #000000;
}

/* Количество в тултипе результата */
.tooltip-count {
  color: #AAAAAA;
  font-size: 12px;
  margin-left: 4px;
}

.minecraft-tooltip.visible {
  opacity: 1;
}

/* Стрелочка под тултипом */
.minecraft-tooltip::before {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: inherit;
}

/* Адаптивность для планшетов */
@media (max-width: 768px) {
  .crafting-container {
    justify-content: center; /* На планшетах по центру */
    padding: 15px;
  }
  
  .crafting-grid-wrapper {
    width: 100%;
    max-width: 450px;
  }
  
  .minecraft-tooltip {
    font-size: 14px;
    padding: 8px 12px;
  }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 480px) {
  .crafting-container {
    padding: 0; /* Убираем отступы контейнера */
    justify-content: stretch;
  }
  
  .crafting-grid-wrapper {
    width: 100%; /* На всю ширину */
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding: 16px 12px;
    gap: 10px;
    justify-content: space-between; /* Распределяем элементы равномерно */
  }
  
  .ingredients-grid {
    grid-template-columns: repeat(3, 34px);
    grid-template-rows: repeat(3, 34px);
    gap: 2px;
  }
  
  .ingredient-slot {
    width: 34px;
    height: 34px;
    border-width: 1px;
  }
  
  .item-icon {
    width: 28px;
    height: 28px;
  }
  
  .result-slot {
    width: 44px;
    height: 44px;
    border-width: 2px;
  }
  
  .result-icon {
    width: 36px;
    height: 36px;
  }
  
  .result-wrapper {
    width: 38px;
    height: 38px;
  }
  
  .crafting-arrow {
    width: 30px;
    height: 24px;
  }
  
  .item-count {
    font-size: 13px;
    bottom: -2px;
    right: 0;
  }
  
  .minecraft-tooltip {
    font-size: 11px;
    padding: 5px 8px;
  }
}

/* Адаптивность для маленьких экранов */
@media (max-width: 360px) {
  .crafting-grid-wrapper {
    padding: 12px 8px;
    gap: 8px;
    border-width: 3px;
  }
  
  .ingredients-grid {
    grid-template-columns: repeat(3, 30px);
    grid-template-rows: repeat(3, 30px);
    gap: 1px;
  }
  
  .ingredient-slot {
    width: 30px;
    height: 30px;
  }
  
  .item-icon {
    width: 24px;
    height: 24px;
  }
  
  .result-slot {
    width: 40px;
    height: 40px;
  }
  
  .result-icon {
    width: 32px;
    height: 32px;
  }
  
  .result-wrapper {
    width: 34px;
    height: 34px;
  }
  
  .crafting-arrow {
    width: 26px;
    height: 20px;
  }
  
  .item-count {
    font-size: 12px;
  }
  
  .minecraft-tooltip {
    font-size: 10px;
    padding: 4px 6px;
  }
}
</style>