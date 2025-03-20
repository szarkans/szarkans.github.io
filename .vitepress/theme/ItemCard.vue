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
  overflow: auto;
}

.item-card::after {
  content: "";
  display: table;
  clear: both;
}


@media (max-width: 958px) {
  .item-card {
    float: none; /* Отключить float на мобильных устройствах */
    margin: 0 auto 20px; /* Центрировать карточку и добавить отступ */
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

</style>


<!-- 
<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/bestiary/items/black_dye.png" width="25%"/>
    </template>
    <template #title>Чёрный краситель</template>
    <template #content>
        <p>Придумал - Szarkan</p>
        <Divider />
        <p>Текстура - Szarkan</p>
    </template>
</Card>
</ItemCard>
-->