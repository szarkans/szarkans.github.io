---
icon: material/account-edit
description: Кастомные модели персонажа
title: Модели игрока
---

# Customizable Player Models

На сервере есть поддержка мода на изменение модельки персонажа - он называется **Customizable Player Models**. Данный мод позволяет менять тело игрока как частично (например: добавить шляпу, лицо и анимацию, протез ноги), так и полностью на любую вами созданную!

::: details Скачать
Скачивание доступно на любой загрузчик модов!

**Ссылка:** [https://modrinth.com/plugin/custom-player-models/versions](https://modrinth.com/plugin/custom-player-models/versions)
:::

::: details Настройка мода
Когда скачаешь мод - нажми английскую `G`, зайди в `Safety Settings` справа снизу и выбери `Profile: Off`! Иначе ты не увидишь многие модельки игроков!

![Настройка CPM](/assets/gameplay/unique/cpm/settings1.png){width=700}

***

![Настройка CPM 2](/assets/gameplay/unique/cpm/settings2.png){width=700}
:::

## Пример модели

Вот пример модели с разными волосами и с разными лицевыми анимациями, которые можно менять прямо во время игры.

<Galleria :value="[
  { src: '/assets/gameplay/unique/cpm/showcase1.png', alt: 'Пример модели Customizable Player Models' },
  { src: '/assets/gameplay/unique/cpm/showcase2.png', alt: 'Пример модели Customizable Player Models' },
  { src: '/assets/gameplay/unique/cpm/showcase3.png', alt: 'Пример модели Customizable Player Models' }
]"  :circular="true" :showItemNavigators="true" :showThumbnails="false" :showIndicators="true" :indicatorsPosition="inside">
  <template #item="{ item }">
    <img :src="item.src" class="galleria-image" />
  </template>
</Galleria>


## Как установить/создать свою модель CPM?

1. В внутриигровом меню мода нажимаешь `File` -> `Export`, выбираешь `Model`, выбираешь `Gist`, копируешь текст в поле

2. Регистрируешься на [GitHub](https://github.com)

3. Создаёшь `gist`, вставляешь туда скопированный текст

    ![Что такое gist](/assets/gameplay/unique/cpm/guide/gist.png){ width=450 }

4. Копируешь ссылку на этот `gist`

5. Вставляешь в игре, экспортируешь модель

6. Готово!