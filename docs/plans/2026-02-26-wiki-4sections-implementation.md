# Wiki 4-Section Restructure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Переорганизовать навигацию вики с 6 разделов на 4, исключительно через изменение `.vitepress/config.mjs` — без перемещения файлов.

**Architecture:** Изменения только в `config.mjs`: новый `nav` массив (4 пункта) + два новых sidebar-константы (`startPlayingSidebar`, `mechanicsSidebar`), привязанных к обоим URL-паттернам каждого раздела (`/info/` + `/guides/`, `/gameplay/` + `/bestiary`).

**Tech Stack:** VitePress 1.6.4, JavaScript ES modules

**Откат:** `git checkout .vitepress/config.mjs` + `git checkout bestiary/test.md` (если удалён)

---

### Task 1: Удалить bestiary/test.md

**Files:**
- Delete: `bestiary/test.md`

**Step 1: Удалить тестовый файл**

```bash
rm bestiary/test.md
```

**Step 2: Убедиться что файл удалён**

```bash
ls bestiary/test.md
# Expected: No such file or directory
```

**Step 3: Commit**

```bash
git add bestiary/test.md
git commit -m "chore: удалить тестовый файл из продакшна"
```

---

### Task 2: Обновить nav — 6 пунктов → 4 пункта

**Files:**
- Modify: `.vitepress/config.mjs:153-161`

**Step 1: Найти текущий nav (строки 153-161)**

Текущий код:
```js
nav: [
  { text: 'О сервере', link: '/info/faq' },
  { text: "Геймплей", link: '/gameplay/unique/qol/small_features'},
  { text: "Бестиарий", link: "/bestiary/main.md"},
  { text: "Гайды", link: '/guides/gameplay/create_event.md'},
  { text: 'История сервера', link: '/history/1season/1season.md'},
  { text: 'Обновления', link: '/updates/7season/7_0_4.md'},
  { text: "Онлайн-карта", link: "https://map.catcraftmc.ru"}
],
```

**Step 2: Заменить на 4-пунктный nav**

```js
nav: [
  { text: 'Начать играть', link: '/info/faq' },
  { text: 'Механики', link: '/gameplay/unique/qol/small_features' },
  { text: 'История', link: '/history/7season/7season.md' },
  { text: 'Обновления', link: '/updates/7season/7_0_4.md' },
  { text: 'Онлайн-карта', link: 'https://map.catcraftmc.ru' }
],
```

**Step 3: Запустить dev-сервер и проверить navbar**

```bash
npm run docs:dev
```
Ожидаемо: navbar показывает 4 пункта + Онлайн-карта

**Step 4: Commit**

```bash
git add .vitepress/config.mjs
git commit -m "feat: обновить nav — 6 разделов → 4"
```

---

### Task 3: Создать константу startPlayingSidebar

**Files:**
- Modify: `.vitepress/config.mjs` — добавить константу перед `export default defineConfig`

**Step 1: Добавить константу `startPlayingSidebar` перед строкой `export default defineConfig({`**

Вставить после строки `const updatesPath = path.resolve(...)`:

```js
const startPlayingSidebar = [
  {
    text: 'Для новичков',
    items: [
      { text: 'Гайд для новичков', link: '/info/guide.md' },
      { text: 'Частые вопросы', link: '/info/faq.md' },
    ]
  },
  {
    text: 'Правила и законы',
    items: [
      { text: 'Правила', link: '/info/rules/rules' },
      { text: 'Законы', link: '/info/rules/laws' },
    ]
  },
  {
    text: 'Подключение к серверу',
    items: [
      { text: 'Моды для сервера', link: '/info/mods.md' },
      { text: 'Как скачивать моды?', link: '/guides/tech/mod_download.md' },
      { text: 'Ошибки с модами на Fabric', link: '/guides/tech/mod_errors.md' },
      { text: 'Фикс скинов на ТЛаунчере', link: '/guides/tech/skins_tlauncher.md' },
      { text: 'Какой лаунчер выбрать?', link: '/guides/other/launcher.md' },
      { text: 'Фермы, ядро сервера', link: '/info/farm.md' },
    ]
  },
  {
    text: 'О сервере',
    items: [
      { text: 'Администрация', link: '/info/admins' },
      { text: 'Донатик', link: '/info/donate.md' },
      { text: 'Префиксы и суффиксы', link: '/info/prefixes.md' },
      { text: 'Словарик', link: '/info/dict.md' },
      { text: 'Брендбук', link: '/info/brandbook.md' },
    ]
  },
  {
    text: 'Прочее',
    items: [
      { text: 'Как редактировать Вики?', link: '/guides/other/edit_wiki.md' },
    ]
  }
];
```

**Step 2: Проверить что dev-сервер не выдаёт ошибок**

```bash
npm run docs:dev
```
Ожидаемо: сервер стартует без ошибок

---

### Task 4: Создать константу mechanicsSidebar

**Files:**
- Modify: `.vitepress/config.mjs` — добавить вторую константу после `startPlayingSidebar`

**Step 1: Добавить константу `mechanicsSidebar`**

Вставить сразу после `startPlayingSidebar`:

```js
const mechanicsSidebar = [
  // ── КАК ИГРАТЬ ──────────────────────────────────────
  {
    text: 'Роллплей',
    items: [
      { text: 'Правительство', link: '/gameplay/roleplay/goverment.md' },
      { text: 'РП роли', link: '/gameplay/roleplay/other_roles.md' },
      { text: 'Работа КСБ', link: '/gameplay/roleplay/police.md' },
      { text: 'Гайд по ГКСБ', link: '/guides/work/gksb.md' },
      { text: 'Гайд Офицера КСБ', link: '/guides/work/police.md' },
      { text: 'Гайд Модератора', link: '/guides/work/moderator.md' },
      { text: 'Гайд Президента', link: '/guides/work/president_guide.md' },
    ]
  },
  {
    text: 'Общие механики',
    items: [
      { text: 'Профиль игрока', link: '/gameplay/unique/qol/profile.md' },
      { text: 'Бартер β', link: '/gameplay/unique/qol/barter.md' },
      { text: 'Система наград', link: '/gameplay/unique/qol/rewards.md' },
      { text: 'Котячьи заслуги', link: '/gameplay/unique/qol/catpass.md' },
      { text: 'Авторизация для лицензий', link: '/gameplay/unique/qol/premium_auth.md' },
      { text: 'Быстрая смена скина', link: '/gameplay/unique/qol/skinswap.md' },
      { text: 'Подключение к Дискорду', link: '/gameplay/unique/qol/discord_link.md' },
      { text: 'Маленькие механики', link: '/gameplay/unique/qol/small_features.md' },
    ]
  },
  {
    text: 'Активности',
    items: [
      { text: 'Варка напитков', link: '/gameplay/unique/brewery.md' },
      { text: 'Рыбалка', link: '/gameplay/unique/fishing.md' },
      { text: 'Рисование', link: '/gameplay/unique/artmap.md' },
      { text: 'Мебель и декорации', link: '/gameplay/unique/decor.md' },
      { text: 'Реалистичные верёвки', link: '/gameplay/unique/catenary.md' },
    ]
  },
  {
    text: 'Прочее',
    items: [
      { text: 'Кланы β', link: '/gameplay/unique/clans.md' },
      { text: 'Гардеробная обликов', link: '/gameplay/unique/wardrobe.md' },
      { text: 'Команды', link: '/gameplay/unique/commands.md' },
      { text: 'Figura', link: '/gameplay/unique/mods/figura.md' },
      { text: 'Войсчат и диски', link: '/gameplay/unique/mods/voicechat.md' },
    ]
  },
  {
    text: 'Геймплейные гайды',
    items: [
      { text: 'Как провести ивент?', link: '/guides/gameplay/create_event.md' },
      { text: 'Как сделать разноцветный ник?', link: '/guides/gameplay/rgb_nick.md' },
      { text: 'Как поставить другой скин?', link: '/guides/gameplay/set_skin.md' },
    ]
  },
  // ── ЧТО СУЩЕСТВУЕТ ──────────────────────────────────
  {
    text: 'Ванилла (изменения)',
    items: [
      { text: 'Изменения крафтов', link: '/bestiary/vanilla/vanilla_crafts.md' },
      { text: 'Изменения механик', link: '/bestiary/vanilla/vanilla_edits.md' },
    ]
  },
  {
    text: 'Зачарования',
    link: '/bestiary/enchantments.md'
  },
  {
    text: 'Предметы',
    collapsed: true,
    items: [
      { text: 'Котик+', link: '/bestiary/usable/kplus.md' },
      { text: 'Модуль CatTrack', link: '/bestiary/usable/cattrack.md' },
      { text: 'Свиток облика', link: '/bestiary/usable/scroll.md' },
      { text: 'UltraDragonblood', link: '/bestiary/usable/ultradragonblood.md' },
      { text: 'Пустотное зелье', link: '/bestiary/usable/void_potion.md' },
      { text: 'Крюк-кошка', link: '/bestiary/custom_items/grappling_hook.md' },
      { text: 'Эхо-колокол', link: '/bestiary/custom_items/echo_bell.md' },
      { text: 'Малярная кисть', link: '/bestiary/custom_items/paint_brush.md' },
      { text: 'Детектор аномальной активности', link: '/bestiary/custom_items/anomaly_detector.md' },
      { text: 'Рация', link: '/bestiary/custom_items/transmitter.md' },
      { text: 'Старый автомат', link: '/bestiary/custom_items/kalak.md' },
      { text: 'Котопедии', link: '/bestiary/custom_items/cotopedia.md' },
      { text: 'Плюшевые игрушки', link: '/bestiary/custom_items/plushie.md' },
      { text: 'Котомат', link: '/bestiary/custom_items/kotomat.md' },
      { text: 'Священные писания', link: '/bestiary/custom_items/holy_books.md' },
      { text: 'Тренировочный манекен', link: '/bestiary/custom_items/dummy.md' },
      { text: 'Игральные карты', link: '/bestiary/custom_items/cards.md' },
      { text: 'Игральные кости', link: '/bestiary/custom_items/dice.md' },
    ]
  },
  {
    text: 'Блоки и сущности',
    collapsed: true,
    items: [
      { text: 'Жители Столицы', link: '/bestiary/mobs/npc.md' },
      { text: 'Драконья Чешуя', link: '/bestiary/materials/dragon_scale.md' },
      { text: 'Блок Гычи', link: '/bestiary/blocks/gycha.md' },
      { text: 'Сжатые блоки', link: '/bestiary/blocks/compressed.md' },
      { text: 'Укреплённый глубинный сланец', link: '/bestiary/blocks/reinforced_deepslate.md' },
      { text: 'Блок света', link: '/bestiary/blocks/light.md' },
      { text: 'Невидимые рамки', link: '/bestiary/blocks/invis_frame.md' },
      { text: 'Стол декора', link: '/bestiary/blocks/decor_table.md' },
      { text: 'Шкафы и ящики', link: '/bestiary/blocks/cabinets.md' },
      { text: 'Шахматы', link: '/bestiary/blocks/chess.md' },
    ]
  }
];
```

**Step 2: Проверить что dev-сервер стартует без ошибок**

```bash
npm run docs:dev
```

---

### Task 5: Переключить sidebar на новые константы

**Files:**
- Modify: `.vitepress/config.mjs:170-915` — заменить весь `sidebar` объект

**Step 1: Найти объект `sidebar:` (строка ~170)**

Найти блок:
```js
sidebar: {
  '/updates': [...],
  '/info/': [...],
  '/gameplay/': [...],
  '/bestiary': [...],
  '/guides/': [...],
  '/history/': [...]
}
```

**Step 2: Заменить на новую структуру sidebar**

```js
sidebar: {
  '/info/': startPlayingSidebar,
  '/guides/': startPlayingSidebar,
  '/gameplay/': mechanicsSidebar,
  '/bestiary': mechanicsSidebar,
  '/updates': [
    // --- без изменений, вставить существующий массив ---
  ],
  '/history/': [
    // --- без изменений, вставить существующий массив ---
  ]
}
```

> ВАЖНО: Содержимое `/updates` и `/history/` массивов копируется без изменений из оригинального файла.

**Step 3: Открыть dev-сервер и проверить каждый раздел**

```bash
npm run docs:dev
```

Checklist:
- [ ] Зайти на `/info/faq` → sidebar "Начать играть" отображается
- [ ] Зайти на `/guides/tech/mod_download` → sidebar "Начать играть" отображается (НЕ старый "Гайды")
- [ ] Зайти на `/gameplay/unique/clans` → sidebar "Механики" отображается
- [ ] Зайти на `/bestiary/blocks/compressed` → sidebar "Механики" отображается (НЕ старый "Бестиарий")
- [ ] В sidebar "Механики" → раздел "Роллплей" → видны все 7 пунктов включая Гайды по работе
- [ ] Зайти на `/history/7season/7season` → sidebar "История" без изменений
- [ ] Зайти на `/updates/7season/7_0_4` → sidebar "Обновления" без изменений

**Step 4: Commit**

```bash
git add .vitepress/config.mjs
git commit -m "feat: реструктурировать wiki — 6 разделов → 4 (Начать играть, Механики, История, Обновления)"
```

---

### Task 6: Финальная проверка сборки

**Step 1: Запустить production build**

```bash
npm run docs:build
```

Ожидаемо: сборка завершается без ошибок

**Step 2: Проверить preview**

```bash
npm run docs:preview
```

Ожидаемо: сайт работает корректно на localhost:4173

**Step 3: Commit финального результата (если есть несохранённые изменения)**

```bash
git add -A
git commit -m "chore: финальная проверка — wiki 4-section restructure"
```

---

## Итоговый результат

| До | После |
|----|-------|
| 6 разделов в nav | 4 раздела |
| guides/work невидимы в nav | Видны в "Механики → Роллплей" |
| bestiary/test.md в продакшне | Удалён |
| /guides/ — отдельный раздел | Контент распределён по другим разделам |
| 4 уровня вложенности в бестиарии | 3 уровня максимум |

## Откат

```bash
git checkout .vitepress/config.mjs
git checkout bestiary/test.md  # если нужно восстановить
```
