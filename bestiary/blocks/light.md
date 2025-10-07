---
aside: false
---

# Блок света

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/bestiary/block/light.png" width="40%"/>
    </template>
    <template #title>Блок света</template>
    <template #content>
      <Divider />
      <h3>Получение:</h3>
      <ul>
      <li>Крафт</li>
      </ul>
    </template>
</Card>
</ItemCard>

**Блок света** - строительный блок, позволяющий ставить свет... без блока!

Чтобы увидеть блок света, нужно нажать `Shift` + `ПКМ`, держа предмет в руке. Чтобы настроить яркость блока света, нужно нажать по нему `ПКМ` предметом.

### Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    null,
    { 
      image: 'https://minecraft.wiki/images/Diamond_JE3_BE3.png?99d00', 
      name: 'Алмаз',
      link: 'https://minecraft.wiki/w/Diamond'
    },
    null,
  ],
  [
    { 
      image: 'https://minecraft.wiki/images/Diamond_JE3_BE3.png?99d00', 
      name: 'Алмаз',
      link: 'https://minecraft.wiki/w/Diamond'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Glowstone_JE4_BE2.png/150px-Glowstone_JE4_BE2.png?0d5b0', 
      name: 'Светокамень',
      link: 'https://minecraft.wiki/w/Glowstone'
    },
    { 
      image: 'https://minecraft.wiki/images/Diamond_JE3_BE3.png?99d00', 
      name: 'Алмаз',
      link: 'https://minecraft.wiki/w/Diamond'
    },
  ],
  // Третья строка
  [
    null,
    { 
      image: 'https://minecraft.wiki/images/Diamond_JE3_BE3.png?99d00', 
      name: 'Алмаз',
      link: 'https://minecraft.wiki/w/Diamond'
    },
    null
  ],
]

const gunpowderResult = {
  image: '/assets/bestiary/block/light.png',
  name: 'Блок света',
  count: 9
}
</script>
