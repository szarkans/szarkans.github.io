---
aside: false
---

# Скомпресированные блоки

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/bestiary/block/enchanted_cobblestone.png" width="40%"/>
    </template>
    <template #title>Скомпресированные блоки</template>
    <template #content>
      <Divider />
      <h3>Получение:</h3>
      <ul>
      <li>Крафт</li>
      </ul>
    </template>
</Card>
</ItemCard>

**Скомпресированные блоки** - блоки, которые содержат в себе 9 блоков одного типа. **Данные блоки нельзя ставить на землю!**

Скомпресировать можно:

- Синий лёд
- Колотый глубинный сланец
- Булыжник
- Бетон (сухой и твёрдый)
- Глубинный сланец
- Земля
- Стекло
- Гравий
- Незерак
- Обсидиан
- Красный песок
- Песок
- Камень

## Крафт

Пример крафта Сжатого булыжника

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
  ],
  [
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
  ],
  // Третья строка
  [
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
    {
      image: "https://minecraft.wiki/images/thumb/Cobblestone_JE5_BE3.png/150px-Cobblestone_JE5_BE3.png?29624",
      name: "Булыжник",
      link: "https://minecraft.wiki/w/Cobblestone"
    },
  ],
]

const gunpowderResult = {
  image: '/assets/bestiary/block/enchanted_cobblestone.png',
  name: 'Сжатый булыжник 1х',
  count: 1
}
</script>