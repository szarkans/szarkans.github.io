---
aside: false
---

# Невидимая рамка

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/bestiary/items/invisible_item_frame.webp" width="40%"/>
    </template>
    <template #title>Невидимая рамка</template>
    <template #content>
      <Divider />
      <h3>Получение:</h3>
      <ul>
      <li>Крафт</li>
      </ul>
    </template>
</Card>
</ItemCard>

**Невидимая рамка** - рамка... которую не видно! Положив в неё предмет она исчезнет! Если в ней нет предмета - она будет светиться.

Зелье невидимости на **3 минуты**!

### Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
  ],
  [
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Splash_Potion_of_Infestation.png?7ae99",
      name: "Зелье невидимости на 3 минуты",
      link: "https://minecraft.wiki/w/Splash_Potion"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
  ],
  // Третья строка
  [
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
    {
      image: "https://minecraft.wiki/images/Invicon_Item_Frame.png?68f6f",
      name: "Рамка",
      link: "https://minecraft.wiki/w/Item_Frame"
    },
  ],
]

const gunpowderResult = {
  image: '/assets/bestiary/items/invisible_item_frame.webp',
  name: 'Невидимая рамка',
  count: 9
}
</script>