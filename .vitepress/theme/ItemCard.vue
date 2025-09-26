<template>
  <div class="item-card">
    <slot />
  </div>
</template>

<script setup>
</script>

<style>
.item-card {
  float: right;
  margin: 0 10px 10px 10px;
  max-width: 33%;
  width: auto;
  clear: both;
  border-radius: 12px;
  box-shadow: 
    0 6px 12px rgba(139, 92, 246, 0.15),
    0 12px 28px rgba(139, 92, 246, 0.12),
    0 2px 6px rgba(0, 0, 0, 0.2);
}

@media (max-width: 958px) {
  .item-card {
    float: none;
    margin: 0 auto 20px;
    max-width: 100%;
  }
}

.item-card .p-item {
  float: right;
}

.p-image {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  margin-top: 20px;
}

/* Добавь это для контейнера страницы */
.vp-doc:has(.item-card)::after {
  content: "";
  display: block;
  clear: both;
}
</style>