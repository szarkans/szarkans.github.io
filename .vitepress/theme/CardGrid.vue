<template>
    <div class="card-grid">
      <!-- Здесь <slot> позволяет передавать полностью настраиваемые карточки из md-файла -->
      <slot />
    </div>
  </template>

<script setup>
</script>

<style>
.card-grid {
  display: flex;
  gap: 0.5em;
  justify-content: space-around;
  align-items: stretch; /* Растягивает элементы по высоте */
  margin-bottom: 10px;
}

.card-grid .p-card {
  transition: box-shadow 0.3s ease-in-out 0.2s; /* Задержка 0.2s перед началом анимации */
}

.card-grid .p-card:hover {
  box-shadow: 10px 5px 5px black;
}

</style>
