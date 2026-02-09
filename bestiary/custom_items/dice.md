---
aside: false
---

# Игральные кости

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/crafts/dice.png" width="40%"/>
    </template>
    <template #title>Игральные кости</template>
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

**Игральные кости** - предмет, который при использовании выдаёт случайное число от 1 до 6.

## Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    {
      image: "https://minecraft.wiki/images/Invicon_Bone.png?d8310",
      name: "Кость",
      link: "https://minecraft.wiki/w/Bone"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Black_Dye.png?3cc1a",
      name: "Чёрный краситель",
      link: "https://minecraft.wiki/w/Dye"
    },
    null,
  ],
  [
    null,
    null,
    null,
  ],
  // Третья строка
  [
    null,
    null,
    null,
  ],
]

const gunpowderResult = {
  image: '/assets/crafts/dice.png',
  name: 'Игральная кость',
  count: 1
}
</script>

## Демонстрация

![Использование игральных костей](/assets/bestiary/items/dice_demo.gif){ width=600 }