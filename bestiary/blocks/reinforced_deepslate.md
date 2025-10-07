---
aside: false
---

# Укрепленный глубинный сланец

<ItemCard>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/bestiary/block/reinforced_deepslate.png" width="40%"/>
    </template>
    <template #title>Укреплённый глубинный сланец</template>
    <template #content>
      <Divider />
      <h3>Получение:</h3>
      <ul>
      <li>Крафт</li>
      </ul>
    </template>
</Card>
</ItemCard>

По характеристикам схож с обсидианом, но ломается гораздо дольше и не выпадает при поломке даже с "Шёлковым касанием". Находится в **Древнем городе**, но добыть его нельзя, поэтому и был добавлен крафт.

### Крафт

<CraftingGrid
  :ingredients="gunpowderRecipe"
  :result="gunpowderResult"
/>

<script setup>

const gunpowderRecipe = [
  [
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    }
  ],
  [
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Ancient_Debris_JE1_BE1.png/150px-Ancient_Debris_JE1_BE1.png?571c1', 
      name: 'Древний обломок',
      link: 'https://minecraft.wiki/w/Ancient_Debris'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    }
  ],
  // Третья строка
  [
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    },
    { 
      image: 'https://minecraft.wiki/images/thumb/Deepslate_%28UD%29_JE3.png/150px-Deepslate_%28UD%29_JE3.png?7635f', 
      name: 'Глубинный сланец',
      link: 'https://minecraft.wiki/w/Deepslate'
    }
  ],
]

const gunpowderResult = {
  image: '/assets/bestiary/block/reinforced_deepslate.png',
  name: 'Укреплённый глубинный сланец',
  count: 8
}
</script>
