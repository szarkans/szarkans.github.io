---
description: Команды на Кошкокрафте
icon: material/note-plus
---

# Команды в игре

::: tip Обозначения
`< >` - обязательное значение

`( )` - необязательное
:::

## Общение

| Команда                                                               | Назначение                                                                                  |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `!<сообщение>`                                                        | Отправить сообщение в **глобальный** чат                                                    |
| `<сообщение>`                                                         | Отправить сообщение в **локальный** чат - в радиусе 40 блоков от себя                            |
| `.<сообщение>`                                                         | Отправить сообщение в чат **шёпота** - в радиусе 5 блоков от себя                            |
| `/msg <ник> <сообщение>` или `/tell <ник> <сообщение>` или `/w <ник> <сообщение>` | Отправить личное сообщение игроку                                                           |
|`/reply <сообщение>`|Ответить последнему написавшему в ЛС|

## Действия

| Команда                     | Назначение                                                                                                                                                                                 |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|`/profile` или `/menu`|Открыть свой профиль игрока|
|`/profile open <никнейм>`|Открыть чужой профиль игрока|
|`/profile changedesc`|Поменять описание своего профиля. Нужно держать книгу в руке.|
|`/profile addshowcase <число от 1 до 4>`|Добавить предмет в руке на витрину профиля. Не может быть шалкером, мешком или книгой.|
|`/profile removeshowcase <число от 1 до 4>`|Убрать предмет из витрины профиля.|
| `/premium`                  | Перевести свой аккаунт в режим лицензии - позволяет заходить на сервер без ввода пароля. <br><span class="red bold">Если у тебя пиратка - не прописывай! Ты больше не попадёшь на сервер!</span> |
| `/rp`                       | Загрузить ресурспак сервера                                                                                                                                                                |
| `/afk`                      | Встать в режим AFK. Перед ником появится префикс, и будет уведомление о том, что ты АФК                                                                                                    |
| `/afkcheck <ник>`           | Проверить в AFK ли котик                                                                                                                                                                   |
| `/kit (название)`           | Без названия - открыть меню китов. С названием - выдать себе кит.                                                                                                                          |
| `/tpa <ник>`                | Отправить запрос на телепортацию к котику. Принять запрос можно только если у тебя есть [Котик+++](/info/donate.md)                                                                        |
| `/wspeed <скорость>`        | Позволяет установить свою скорость ходьбы. Число должно быть меньше 1, например `/wspeed 0.5`                                                                                                     |
| `/seen <ник>`               | Увидеть когда котик был последний раз на сервере                                                                                                                                           |
| `/suicide`                  | Позволяет покинуть кошачий мир                                                                                                                                                                |
| `/playtime (ник)`           | Покажет сколько ты наиграл. Если с ником - покажет сколько наиграл другой котик                                                                                                            |
| `/playtimetop`              | Посмотреть топ по наигранным часам                                                                                                                                                         |
| `/itemframe`                | Включить настройку рамки                                                                                                                                                                   |
| `/help`                     | Получить этот список команд внутри игры                                                                                                                                                    |
| `/findnick <примерный ник>` | Поиск ника котика по примерному<br>`/findnick Szar` -> `Нашёл примерный ник - Szarkan`                                                                                                     |
| `/qmenu`                    | Открыть меню текущих квестов                                                                                                                                                               |
| `/eggowner`                 | Посмотреть кто сейчас владеет [Яйцом Дракона](/gameplay/unique/qol/dragon_egg.md)                                                                                                          |

## Экономика

| Команда              | Назначение                                                           |
| :------------------- | :------------------------------------------------------------------- |
| `/balance (ник)`     | Проверить твой или чужой баланс АРов                                 |
| `/pay <ник> <сумма>` | Перевести котику АРы с эл. счёта                                     |
| `/cheque <сумма>`    | Выписать бумажный чек. Обналичить чек можно нажав `ПКМ` с ним в руке |
| `/baltop`            | Топ богачей по АРам                                                  |

## РП Команды

| Команда                                    | Назначение                                                                                                |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `/police <wantedlist/warns/list/jaillist>` | Узнать список разыскиваемых, список выговоров, список Офицеров КСБ или список осужденных!                 |
| `/me <действие>`                           | Описать действие, совершенное твоим персонажем<br><br>`/me Погладил котика` -> `*Szarkan погладил котика` |
| `/do <описание>`                           | Описать своего персонажа от 3-го лица<br><br>`/do в зубах сигарета` -> `*В зубах сигарета (Szarkan)`      |
| `/roll <число>`                            | Получить случайное число от 1 до твоего выбранного.<br>`/roll 20` изображает работу кубика Д20<br><br>`/roll 100` -> `*Szarkan рольнул 12 из 100`    |
| `/hidenicks`                               | Скрыть у себя ники котиков                                                                                |
| `/coinflip`                                | Подкинуть монетку - выпадет орёл или решка                                                                |
| `/sex <ник> (тип) (скорость)`              | Пригласить игрока поСЭКСиться. Работает только с скачанным EmoteCraft.                                    |
| `/sex (off/on)`                            | Выключить или включить запросы на СЭКС от других игроков                                                  |
| `/sex stop`                                | Остановить СЭКС                                                                                           |

## Скины

| Команда                                  | Назначение                                                                   |
| :--------------------------------------- | :--------------------------------------------------------------------------- |
| `/skin set <ник>`                        | Установить себе скин по **нику**                                             |
| `/skin url <ссылка>`                     | Установить скин по **ссылке**                                                |
| `/skin update`                           | Обновить свой скин                                                           |
| `/skin clear`                            | Убрать свой скин                                                             |
| `/sw <ник/ссылка на скин> <комментарий>` | Добавить скин в меню [быстрой смены скина](/gameplay/unique/qol/skinswap.md) |

## Плейсхолдеры

**Плейсхолдеры** это текст, который заменяется на другой в чате!

Всё что нужно - ввести плейсхолдер в чат.

| Плейсхолдер               | Назначение                                                                                                             |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| `[pos]`                   | Показать в чат своё местоположение                                                                                     |
| `[ping]`                  | Показать в чат свой пинг                                                                                               |
| `[item]`                  | Показать в чат предмет в руке. Карты можно будет увидеть, книгу прочитать, а остальное - посмотреть. Не работает в ЛС! |
| `[inv]`                   | Показать в чат свой инвентарь                                                                                          |
| `[ec]`                    | Показать в чат свой Эндер-сундук                                                                                       |
| `[wiki]` или `[вики]`     | Ссылка на Вики                                                                                                         |
| `[ptime]` или `[наиграл]` | Показать в чат сколько ты наиграл(а)                                                                                   |
| `[mods]` или `[моды]`     | Ссылка на страницу модов для сервера                                                                                   |

## Команды только для Котиков+

| Команда                      | Назначение                                                         |
| :--------------------------- | :----------------------------------------------------------------- |
| `/sethome (название)`        | Поставить точку дома                                               |
| `/home (название)`           | Телепортироваться на точку дома. Без названия откроется меню домов |
| `/homes`                     | Список домов                                                       |
| `/spawn`                     | Телепортироваться на спавн                                         |
| `/ec`                        | Открыть виртуальный эндер-сундук                                   |
| `/back`                      | Вернуться на место телепортации                                    |
| `/repair`                    | Починить предмет в руке                                            |
| `/heal` `/feed`              | Исцелить или накормить себя                                        |
| `/itemname <новое название>` | Поменять название предмета в руке                                  |
| `/hat`                       | Надеть предмет в руке на голову                                    |
| `/wb`                        | Открыть виртуальный верстак                                        |
| `/anvil`                     | Открыть виртуальную наковальню                                     |
| `/loom`                      | Открыть виртуальный ткацкий станок                                 |
| `/smithingtable`             | Открыть виртуальный кузнечный стол                                 |
| `/tpaaccept`                 | Принять запрос на телепортацию                                     |
