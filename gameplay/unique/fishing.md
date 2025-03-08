---
icon: fontawesome/solid/fish
status: new
description: Кастомная рыбалка на Кошкокрафте
---

# Рыбалка

На сервере стоит уникальный плагин на рыбалку! Теперь вам не нужно тупо стоять в АФК полчаса, нажимая `ПКМ`, вместо этого ловля рыбы превращается в мини-игру!

Почти всех рыбок можно продать **Рыбака**. Цена рыб зависит от редкости, и варьируется от **0.1** до **5** АР!  

::: tip Список всех рыбок
Список всех рыбок доступен в [Рыбопедии](/bestiary/custom_items/cotopedia.md). Для её получения обратись к [Рыбаку](/bestiary/mobs/npc.md)!
:::

## Ловля рыбок

Многие рыбки отличаются **по условиям** ловли - некоторые могут ловиться лишь в определенной воде (например: речка, океан, тёплый океан), некоторые могут ловиться лишь на определенной высоте, а некоторые лишь **в других мирах**.

## Система приманок

Шанс вылавливания хорошей рыбы можно повысить при помощи **приманок**! Самые базовые приманки - **Хлеб** и **Золотая морковь** они повышают шанс на ловлю более крутой рыбки и уменьшают время ловли.

Также есть **специальные приманки**, которые помогают выловить определенные предметы.

Для использования достаточно положить приманку или предмет во вторую руку и начать ловить рыбку. Если приманка ушла вместе с крючком - она была использована!

## Все мини-игры

<!-- <Galleria :value="[
  { src: '/assets/gameplay/unique/fishing/click_game.gif', alt: 'Здесь нужно накликать для вылавливания рыбы' },
  { src: '/assets/gameplay/unique/fishing/click_v1.gif', alt: 'Здесь нужно попасть в зелёную область' },
  { src: '/assets/gameplay/unique/fishing/click_v2.gif', alt: 'Здесь нужно попасть в зелёную область' },
  { src: '/assets/gameplay/unique/fishing/click_v3.gif', alt: 'Здесь нужно попасть в зелёную область' },
  { src: '/assets/gameplay/unique/fishing/color.gif', alt: 'Здесь нужно попасть в нужный цвет' },
  { src: '/assets/gameplay/unique/fishing/dance.gif', alt: 'Здесь нужно нажимать определенные клавиши' },
  { src: '/assets/gameplay/unique/fishing/hold.gif', alt: 'Здесь нужно удержать рыбку' },
  { src: '/assets/gameplay/unique/fishing/race.gif', alt: 'Здесь нужно довести рыбку до финиша' },
  { src: '/assets/gameplay/unique/fishing/void_fishing.png', alt: 'Также есть пустотная рыбалка!' }
]"  :circular="true" :showItemNavigators="true" :showThumbnails="false" :showIndicators="false" :indicatorsPosition="inside">
    <template #item="{ item }">
        <Image :src="item.src" :alt="item.alt" class="galleria-image" />
    </template>
    <template #caption="slotProps">
        <p class="text-white">{{ slotProps.item.alt }}</p>
    </template>
</Galleria> -->

<CardGrid>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/click_game.gif" preview />
    </template>
    <template #subtitle>Здесь нужно накликать для вылавливания рыбы</template>
</Card>

<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/click_v1.gif" preview />
    </template>
    <template #subtitle>Здесь нужно попасть в зелёную область</template>
</Card>
</CardGrid>

<CardGrid>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/click_v2.gif" preview />
    </template>
    <template #subtitle>Здесь нужно попасть в зелёную область</template>
</Card>

<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/click_v3.gif" preview />
    </template>
    <template #subtitle>Здесь нужно замафонить гычу</template>
</Card>
</CardGrid>

<CardGrid>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/color.gif" preview />
    </template>
    <template #subtitle>Здесь нужно попасть в нужный цвет</template>
</Card>

<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/dance.gif" preview />
    </template>
    <template #subtitle>Здесь нужно нажимать определенные клавиши</template>
</Card>
</CardGrid>

<CardGrid>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/hold.gif" preview />
    </template>
    <template #subtitle>Здесь нужно удержать рыбку</template>
</Card>

<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/race.gif" preview />
    </template>
    <template #subtitle>Здесь нужно довести рыбку до финиша</template>
</Card>
</CardGrid>

<CardGrid>
<Card style="overflow: hidden;" class="m-0">
    <template #header>
        <Image alt="user header" src="/assets/gameplay/unique/fishing/void_fishing.png" preview />
    </template>
    <template #subtitle>Также есть пустотная рыбалка! Нужно кинуть поплавок в любую пустоту</template>
</Card>
</CardGrid>
