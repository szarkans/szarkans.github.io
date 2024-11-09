<template>
    <div class="card-grid">
      <!-- Здесь <slot> позволяет передавать полностью настраиваемые карточки из md-файла -->
      <slot />
    </div>
  </template>

<script setup>
import Card from 'primevue/card';

const items = [
  { title: 'Card 1', content: 'Content of Card 1', src: '/assets/gameplay/unique/artmap/example_art.gif' },
  { title: 'Card 2', content: 'Content of Card 2', src: '/assets/gameplay/unique/artmap/example_art.gif' },
  { title: 'Card 3', content: 'Content of Card 3', src: '/assets/gameplay/unique/artmap/example_art.gif' }
];
</script>

<style>
.card-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5em;
  justify-content: space-around;
}
</style>
