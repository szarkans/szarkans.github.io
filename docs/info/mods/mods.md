---
icon: material/order-alphabetical-descending
title: Моды для сервера
description: Готовая сборка сервера Кошкокрафт
toc_depth: 1
---

# Моды для сервера

Для самого комфортного геймплея тебе нужно скачать **обязательные моды**. Они позволят полностью насладиться фишками нашего сервера!

<div class="grid cards" markdown>
-    __Как скачивать моды?__

    ---
    Мы написали гайд только для тебя! Он доступен по [этой ссылке](../../guides/mod_download.md)!
</div>

Если тебе лень скачивать все нужные моды для сервера - у нас есть [готовая сборка :material-download:](../../assets/CatCraft%201.20.6.zip) на **Fabric 1.20.6**!

<div class="grid cards" markdown>

-    __В неё входят__

    - **Куча** модов на оптимизацию! С ~45 ФПС до стабильных **150-250**!

    - Полезные моды (свет от факела в руке, зум камеры и т.д.)

    - Все обязательные для сервера моды

    - Вспомогательные моды для ресурспака, по типу его загрузки без экрана загрузки, просмотр всех переименований в наковальне и т.д.

    - Конфиги к модам, чтобы не настраивать всё по полчаса =)

    ??? tip "Полный список модов в сборке"
        - [Animatica](https://modrinth.com/mod/animatica)
        - [Architectury API](https://modrinth.com/mod/architectury-api)
        - [Concurrent Chunk Management Engine](https://modrinth.com/mod/c2me-fabric)
        - [Cloth Config API](https://modrinth.com/mod/cloth-config)
        - [Customizable Player Models](https://modrinth.com/plugin/custom-player-models)
        - [[EMF] Entity Model Features](https://modrinth.com/mod/entity-model-features)
        - [[ETF] Entity Texture Features](https://modrinth.com/mod/entitytexturefeatures)
        - [Entity Culling](https://modrinth.com/mod/entityculling)
        - [Fabric API](https://modrinth.com/mod/fabric-api)
        - [Fabric Language Kotlin](https://modrinth.com/mod/fabric-language-kotlin)
        - [Falling Leaves](https://modrinth.com/mod/fallingleaves)
        - [fast-ip-ping](https://modrinth.com/mod/fast-ip-ping)
        - [FastQuit](https://modrinth.com/mod/fastquit)
        - [FerriteCore](https://modrinth.com/mod/ferrite-core)
        - [ImmediatelyFast](https://modrinth.com/mod/immediatelyfast)
        - [Indium](https://modrinth.com/mod/indium)
        - [Iris Shaders](https://modrinth.com/mod/iris)
        - [Krypton](https://modrinth.com/mod/krypton)
        - LambDynamicLights (В сборке самодельная, портированная версия)
        - [Language Reload](https://modrinth.com/mod/language-reload)
        - [LazyDFU](https://modrinth.com/mod/lazydfu)
        - [Lithium](https://modrinth.com/mod/lithium)
        - [ModernFix](https://modrinth.com/mod/modernfix)
        - [Mod Menu](https://modrinth.com/mod/modmenu)
        - [No Chat Reports](https://modrinth.com/mod/no-chat-reports)
        - [OptiGUI](https://modrinth.com/mod/optigui)
        - [Text Placeholder API](https://modrinth.com/mod/placeholder-api)
        - [Plasmo Voice](https://modrinth.com/plugin/plasmo-voice)
        - [Reese's Sodium Options](https://modrinth.com/mod/reeses-sodium-options)
        - [Sodium](https://modrinth.com/mod/sodium)
        - [Sodium Extra](https://modrinth.com/mod/sodium-extra)
        - [ThreadTweak](https://modrinth.com/mod/threadtweak)
        - [Very Many Players](https://modrinth.com/mod/vmp-fabric)
</div>

## Гайд по установке

??? tip "Для ванильного лаунчера, TL, TLegacy и прочих"
    1. [Скачиваешь архив :material-download:](../../assets/CatCraft%201.20.6.zip)

    2. Открываешь папку **игры**
        
        - Открыть папку игры можно нажав ++win+r++, написав `%appdata%` и перейдя в папку `.minecraft`
        
        - Или нажав в лаунчере иконку **папки**, она есть почти везде ![folder](../../assets/guides/folder.png){ width=750 }
    
    3. Открываешь архив 

        - Для этого нужно иметь установленный архиватор [WinRAR](https://ru.wikipedia.org/wiki/WinRAR) или [7-Zip](https://ru.wikipedia.org/wiki/7-Zip)
    
    4. Перекидываешь **все** файлы из архива в папку `.minecraft` или в папку своей версии

    !!! danger ""
        Обязательно убедись, что ты перекинул(а) папку `config`, в ней нужные конфигурации для работы ресурспака!

??? tip "Для MultiMC, ModrinthApp, PrismLauncher и т.п."
    1. [Скачиваешь файл .mrpack :material-download:](../../assets/CatCraft%201.20.6%201.0.0.mrpack)

    2. Создаёшь новую сборку

    3. В настройках сборки выбираешь пункт "Импортировать из файла" или что-то похожее ![mrpack](../../assets/guides/mrpack.png){ width=650 }

    `.mrpack` это файл всей сборки в... одном файле. И конфиги, и иконка, и моды, и всё всё всё!

<!-- ??? abstract "Список обязательных модов"

    <div class="grid cards" markdown>

    -    :fontawesome-solid-microphone: __PlasmoVoice__

        ---
        ![plasmo](https://cdn.modrinth.com/data/1bZhdhsH/icon.png){ align=right width="100" }
        Войсчат внутри игры! **Говорить необязательно**, но слушать тебе никак не помешает, верно?

        [:octicons-arrow-right-24: Перейти на сайт мода](https://modrinth.com/plugin/plasmo-voice/versions?g=1.20.1&l=fabric&l=forge)

    -    :material-human-female-dance: __EmoteCraft__

        ---
        ![emote](https://cdn.modrinth.com/data/pZ2wrerK/icon.png){ align=right width="100" }

        <span class="red">Мод недоступен на 1.20.6, поэтому на данный момент необязателен.</span>

        Мод на эмоции для РП! Как и с войсчатом - пользоваться никто не заставляет, но смотреть ведь никак не помешает, верно?

        [:octicons-arrow-right-24: Перейти на сайт мода](https://modrinth.com/mod/emotecraft)

    -    :material-pickaxe: __CIT Resewn__

        ---
        ![cit](https://cdn.modrinth.com/data/otVJckYQ/icon.png){ align=right width="100" }

        <span class="red">Мод недоступен на 1.20.6, поэтому на данный момент необязателен.</span>

        Замена многих функций Optifine для текстур предметов. Как пример - переименование текстур через наковальню!

        [:octicons-arrow-right-24: Перейти на сайт мода](https://modrinth.com/mod/cit-resewn)

    -    :material-tshirt-v: __Customizable Player Models__

        ---
        ![cpm](https://cdn.modrinth.com/data/h1E7sQNL/icon.png){ align=right width="100" }
        Мод, позволяющий полностью изменять модель персонажа - от кастомных рук/ног/глаз, до полностью проработанной модели с анимациями!

        [:octicons-arrow-right-24: Перейти на сайт мода](https://modrinth.com/plugin/custom-player-models)

    -    :material-loading:{ .rotate-animation } __RRLS__

        ---
        ![rrls](https://cdn.modrinth.com/data/ZP7xHXtw/7a416b09817a79adfa6a3ef9368990135e276821.png){ align=right width="100" }

        <span class="red">Мод бесполезен, т.к. загрузка ресурспака происходит <bold>до</bold> захода на сервер.</span>

        Мод, позволяющий играть, пока загружается ресурспак, а не стоять афк минуту.

        [:octicons-arrow-right-24: Перейти на сайт мода](https://modrinth.com/mod/rrls)

    </div> -->