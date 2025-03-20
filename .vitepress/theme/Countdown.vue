<template>
  <p id="countdown">Мы вернёмся через {{ countdownText }}!</p>
</template>

<script setup>
// Импортируем функции из Vue для реактивности
import { ref, onMounted, onUnmounted } from 'vue';

// Реактивная переменная для текста таймера
const countdownText = ref('Загрузка таймера...');

// Указываем целевую дату (по московскому времени UTC+3)
const targetDate = new Date('2025-06-01T18:00:00+03:00');

// Функция обновления таймера
function updateCountdown() {
  // Текущее время по Москве (UTC+3)
  const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  const difference = targetDate - now;

  // Проверка, если дата уже прошла
  if (difference <= 0) {
    countdownText.value = "Событие уже началось!";
    return;
  }

  // Вычисляем дни, часы, минуты и секунды
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownText.value = `${days} дн. ${hours} ч. ${minutes} мин. ${seconds} сек`;
}

// Настройка таймера при монтировании компонента
let timerInterval;

onMounted(() => {
  updateCountdown(); // Инициализация
  timerInterval = setInterval(updateCountdown, 1000); // Обновление каждую секунду
});

// Очистка интервала при удалении компонента для оптимизации
onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped>
#countdown {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff; /* Цвет Vue.js :) */
  text-align: center;
  margin: 0;
  border-bottom: 12px dashed #602bb569;
  border-top: 12px dashed #602bb569;
  padding: 40px 0 40px 0;
}
</style>
