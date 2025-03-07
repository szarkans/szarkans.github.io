---
hide:
  - navigation
  - footer
  - path
search:
  exclude: true
---

# Ультимативный гайд по работе Модератором

Последний раз обновлено: 22.10.2024

Привет, Всекотёнок! Твоя задача - следить за игроками на сервере, следить за их нарушениями и выдавать наказания, если они нарушили [заповеди](../../info/rules/rules.md). Если кто-то нарушил [закон](../../info/rules/laws.md), то ты можешь сообщить в КСБ - выдавать наказания не нужно.

Правила твоего поведения также описаны в [заповедях](../../info/rules/rules.md), но дополню здесь:

- Не общайся в Дискорде в канале `#без-правил`

- У тебя нет стороны в конфликтах. Решай всё с холодной головой, не смотря на ники и людей.

- Если кто-то разозлил тебя - кинь его в ЧС, не надо ругаться. По крайней мере я (серёжа) так и делаю.

??? tip "Чаты"

    Тебе нужно следить за двумя чатами - в Дискорде и в на сервере, в Майнкрафте. Также очень важно и тебе вести себя подобающе. Если хочется что-то спиздануть - лучше заведи твинк и делай это с него.

    ## Дискорд

    Тут просто запоминай:

    - `#основной`, и другие чаты общения (например обсуждения под постами) - нужно следить за соблюдением [правил](../info/rules/rules.md), а также отвечать на вопросы новичков или игроков. В Дискорде есть быстрые команды ЧаВо (Частые Вопросы), их можно узнать командой `!чаво` или `!faq`.

    - Форумы - следить за соблюдением правил. В `#баг-репорт` - чтоб баг был написан по шаблону, в `#ваше-творчество` - чтоб не было того, чего там быть не должно, и т.п.

    - `#без-правил` - игнорируем, **сами туда не пишем**. Там нет правил для всех, кроме тебя.

    Если кто-то что-то нарушил, то смотрим какое наказание нужно выдать по [заповедям](../../info/rules/rules.md). Если это прецедент (что-то новое, за что надо выдать наказание) - выдаём по своему усмотрению.

    Выдать мут в Дискорде можно командой `!мут [время в формате 1д, 12ч] [причина]`, ответив на сообщение, либо нажав `ПКМ` по человеку и выбрав "Выдать тайм-аут".

    ## Майнкрафт

    Тут всё попроще - нужно просто следить за соблюдением [правил общений](../info/rules/rules.md), и, если что, выдавать муты.

    Мут выдаётся командой `/mute [ник] [время в формате 1d, 12h] [причина]`

??? tip "Геймплей"

    Следить за котиками нужно не только в чате! Время от времени ты можешь патрулировать их с помощью команды `/patrol` или телепортируясь к ним через `/tp`.

    В основном самыми частыми нарушениями будут:

    - Обход анти-AFK

    - Мини-карты

    - Читы

    Также, в Дискорде, в канале `#античит`, всех модераторов и админов будет пинговать анти-чит, если он будет слишком активно ругаться на какого-то игрока. В данном канале стоит игнорировать нарушения **Inventory Тип А**, **Jump Тип A** и **Speed Тип А** - это либо режим принтера в схематике либо игрок надел на себя сет Космонавта.

    А вот другие отклики стоит проверять - **Ground Spoof**, **Invalid**, **Baritone** и прочие. С большой вероятностью это будет читер либо игрок с запрещенным модом.

??? tip "Команды"

    ## Дискорд
    
    В Дискорде у нас много префиксных команд (которые пишутся через `!`), их всех можно посмотреть командой `!команды`. Там можно найти необходимые команды с ответами на вопросы, ссылки на карты и прочее.

    Также тебе доступна команда `!мут`. Она работает **ответом на сообщение**. Использование: `!мут <время в формате 1д, 12ч> <причина>`

    Также ты можешь отклонять баг-репорты через `/declined [причина]`, но это вряд ли стоит использовать. Можешь, например, отклонять дубликаты багов.

    ## Майнкрафт

    - `/tp [ник]` - очевидно, тп на игрока. Использовать только если очень нужно - за использование в свою выгоду шлёпаем по жопе.

    - `/tpo [ник]` тоже самое что выше, но телепортация к оффлайн игроку (к месту, где он вышел).

    - `/hidenick [ник] [on/off]` - включает или выключает видимость ника игрока

    - `/inv [ник]` - просмотр чужого инвентаря

    - `/ec [ник]` - просмотр чужого эндер-сундука

    - `/patrol` - удобная команда, которая телепортирует к тебя к **каждому** игроку **по очереди** для наблюдения.

    - `/gamemode [0 или 3]` - смена режим игры на выживание/наблюдателя. Для наблюдения. Аналогично с `/tp` - не использовать в свою выгоду

    - `/mute [ник] [время] [причина]` - замутить игрока. Пример написания - `/mute Szarkan 1d Две смешные буквы`. Можно замутить "втихую", добавив в конце `-s`

    - `/tempban [ник] [время] [причина]` - временно забанить игрока, максимум - 999 дней. Пример написания - `/tempban Szarkan 7d Крупный гриф`. Можно забанить "втихую", добавив в конце `-s`.

    - `/ban [ник] [причина]` - забанить игрока навсегда. Можно забанить "втихую", добавив в конце `-s`

    ## CoreProtect

    КорПротект - логи любых блоков, предметов и игроков. Можно узнать кто сломал блоки, кто взял вещи из сундука, кто взорвал ТнТ и прочее. Они есть у КСБ и Парламента, но у вас более расширенная версия.

    `/co i` - так называемая **база**. Включает режим поиска логов по клику. 
    
    - `ПКМ` по блоку покажет все **действия** с данным блоком - кто его поставил, что и кто написал на табличке, какой ТНТ взорвал этот блок и прочее.

    - `ЛКМ` по блоку покажет кто его сломал или поставил.

    ***

    `/co near` - позволяет посмотреть логи в радиусе 10 блоков с пролистыванием страниц

    ***

    `/co l(ookup)` - тоже **база**. Позволяет увидеть логи по радиусу, гражданину, времени, определенному действию и т.д.

    Команда принимает данные аргументы:
        
    - `user:<ник игрока или ник сущности>` - позволяет увидеть логи конкретной сущности - необязательно игрока.
        
        - Например: `user:Szarkan` - игрок Szarkan, `user:#chicken` - курица (моб)

        - **Важно**! Если хочешь найти логи **сущности** а не игрока, то пиши перед именем `#`!

    - `radius:<кол-во блоков>` - узнать логи по определенному радиусу.

        - Данный аргумент обязательный!

        - Например: `radius:10` - 10 блоков
    
    - `time:<время>` - узнать логи за до определенного времени. Принимает значения по типу `1d` (1 день), `30min` (30 минут), `5h` (5 часов) и т.д.

        - Например: `time:30s` - 30 секунд, `time:12.5h` - 12.5 часов, `time:100d` - **не рекомедуется ставить огромные значения** - 100 дней.

    - `action:<действие>` - позволяет смотреть логи лишь по определенному действию, например - сломанные блоки.

        - Например: `action:+block` - поставил блок, `action:-item` - выкинул предмет на землю, `action:kill` - убийство

    - `include:<предмет(ы)>` - позволяет смотреть логи лишь по определенному предмету (предметам). Принимает множественные аргументы!

        - Например: `include:dirt` - логи с землёй, `include:diamond_sword,totem_of_undying` - улики с алмазным мечом и тотемом бессмертия.

    - `exclude<предмет(ы)>` - тоже самое что `include`, но **убирает** логи с определенными предметами

        - Например: `exclude:dirt` - логи без земли, `exclude:diamond_sword,totem_of_undying` - логи без алмазного меча и тотема бессмертия. -->