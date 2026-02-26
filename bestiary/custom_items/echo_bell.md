---
aside: false
---

# Эхо-колокол

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/crafts/echo_bell.webp" width="40%"/>
    </template>
    <template #title>Эхо-колокол</template>
    <template #content>
      <Divider />
      <h3>Получение:</h3>
      <ul>
      <li>Крафт</li>
      </ul>
      <Divider />
      <p>Текстура: bykkake747</p>
    </template>
</Card>
</ItemCard>

**Эхо-колокол** - позволяет по нажатию `ПКМ` подсветить всех в некотором радиусе на **15 секунд**. Один колокол имеет **8 зарядов**, между которыми есть перезарядка в **30 секунд**

Окончание перезарядки сопровождается звуковым сигналом.

## Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
  ],
  [
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Bell.png?325d0",
      name: "Колокол",
      link: "https://ru.minecraft.wiki/w/Колокол"
    },
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
  ],
  // Третья строка
  [
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
    {
      image: "https://ru.minecraft.wiki/images/%D0%9E%D1%81%D0%BA%D0%BE%D0%BB%D0%BE%D0%BA_%D1%8D%D1%85%D0%B0_JE1_BE1.png?d0d12",
      name: "Осколок Эха",
      link: "https://ru.minecraft.wiki/w/Осколок_эха"
    },
  ],
]

const gunpowderResult = {
  image: '/assets/crafts/echo_bell.png',
  name: 'Эхо-колокол',
  count: 1
}
</script>

## Демонстрация

<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/bestiary/items/echo_bell_demo.gif" width="75%"/>
    </template>
</Card>
