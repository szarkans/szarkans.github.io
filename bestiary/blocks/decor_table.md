---
aside: false
---

# Стол декора

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/crafts/decor_table.png" width="40%"/>
    </template>
    <template #title>Стол декора</template>
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

**Стол декора** - особый верстак для создания [мебели и декораций](../../gameplay/unique/decor.md).

## Использование

При взаимодействии открывает меню с рассортированными по категориям рецептами.

<Image src="/assets/bestiary/items/decor_table_menu.png" width="600" preview />

Рецепты не требуют сетки крафта, а только необходимые ресурсы чертежа.

## Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    {
      image: "https://minecraft.wiki/images/Blue_Dye_JE2_BE2.png?d8f99",
      name: "Синий краситель",
      link: "https://minecraft.wiki/w/Dye#Blue"
    },
    { 
      image: 'https://minecraft.wiki/images/Paper_JE2_BE2.png?9c3be', 
      name: 'Бумага',
      link: 'https://minecraft.wiki/w/Paper'
    },
    null,
  ],
  [
    { 
      image: 'https://minecraft.wiki/images/thumb/Mangrove_Planks_JE1_BE1.png/150px-Mangrove_Planks_JE1_BE1.png?7e1aa', 
      name: 'Мангровые доски',
      link: 'https://minecraft.wiki/w/Planks#Mangrove'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Mangrove_Planks_JE1_BE1.png/150px-Mangrove_Planks_JE1_BE1.png?7e1aa', 
      name: 'Мангровые доски',
      link: 'https://minecraft.wiki/w/Planks#Mangrove'
    },
    null
  ],
  // Третья строка
  [
    { 
      image: 'https://minecraft.wiki/images/thumb/Mangrove_Planks_JE1_BE1.png/150px-Mangrove_Planks_JE1_BE1.png?7e1aa', 
      name: 'Мангровые доски',
      link: 'https://minecraft.wiki/w/Planks#Mangrove'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Mangrove_Planks_JE1_BE1.png/150px-Mangrove_Planks_JE1_BE1.png?7e1aa', 
      name: 'Мангровые доски',
      link: 'https://minecraft.wiki/w/Planks#Mangrove'
    },
    null
  ],
]

const gunpowderResult = {
  image: '/assets/crafts/decor_table.png',
  name: 'Стол декора',
  count: 1
}
</script>