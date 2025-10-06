<CraftingGrid
  :ingredients="gychaBlockRecipe"
  :result="gychaBlockResult"
  :scale="2"
/>

<script setup>
const gychaBlockRecipe = [
  [
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' },
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' },
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' }
  ],
  [
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' },
    { image: 'https://minecraft.wiki/images/Ancient_Debris_JE1_BE1.png?571c1&20231016040214', name: 'Древний обломок', link: 'https://minecraft.wiki/w/Ancient_Debris' },
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' }
  ],
  [
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' },
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' },
    { image: 'https://minecraft.wiki/images/thumb/Cobbled_Deepslate.png/150px-Cobbled_Deepslate.png?86523', name: 'Сланец', link: 'https://minecraft.wiki/w/Cobbled_Deepslate' }
  ]
]

const gychaBlockResult = {
  image: 'https://minecraft.wiki/images/thumb/Reinforced_Deepslate_JE1.png/150px-Reinforced_Deepslate_JE1.png?96376',
  name: 'Укрепленный глубинный сланец',
  count: 3,
  link: 'https://minecraft.wiki/w/Reinforced_Deepslate'
}
</script>