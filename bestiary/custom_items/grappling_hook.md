---
aside: false
---

# Крюк-кошка

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/crafts/grappling_hook.webp" width="40%"/>
    </template>
    <template #title>Крюк-кошка</template>
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

**Крюк-кошка** - предмет, позволяющий цеплятся за блоки и "прыгать" к ним, или цеплять мобов и притягивать их к себе!

Существует модифицированная версия Крюка-кошки - [УПМ из Атаки титанов!](/info/donate.md)

## Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    null,
    {
      image: "https://minecraft.wiki/images/Copper_Ingot_JE2_BE1.png?0d410",
      name: "Медный слиток",
      link: "https://minecraft.wiki/w/Copper_Ingot"
    },
    {
      image: "https://minecraft.wiki/images/Breeze_Rod_JE1_BE1.png?28670",
      name: "Стержень вихря",
      link: "https://ru.minecraft.wiki/w/Стержень_вихря"
    },
  ],
  [
    null,
    {
      image: "https://minecraft.wiki/images/Invicon_Iron_Chain.png?5d1e7",
      name: "Железная цепь",
      link: "https://ru.minecraft.wiki/w/Железная_цепь"
    },
    {
      image: "https://minecraft.wiki/images/Copper_Ingot_JE2_BE1.png?0d410",
      name: "Медный слиток",
      link: "https://minecraft.wiki/w/Copper_Ingot"
    },
  ],
  // Третья строка
  [
    {
      image: "https://minecraft.wiki/images/Invicon_Iron_Chain.png?5d1e7",
      name: "Железная цепь",
      link: "https://ru.minecraft.wiki/w/Железная_цепь"
    },
    null,
    null,
  ],
]

const gunpowderResult = {
  image: '/assets/crafts/grappling_hook.png',
  name: 'Крюк Кошка',
  count: 1
}
</script>