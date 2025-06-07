---
icon: material/order-alphabetical-descending
title: Моды для сервера
description: Готовая сборка сервера Кошкокрафт
---

# Моды для сервера

## Моды

Для самого комфортного геймплея тебе нужно скачать **обязательные моды**. Они позволят полностью насладиться фишками нашего сервера!

::: warning Как скачивать моды?
Мы написали гайд только для тебя! Он доступен по [этой ссылке](/guides/tech/mod_download.md)!
:::

::: tip В неё входят

- Все обязательные для сервера моды

- **Куча** модов на оптимизацию! С ~45 ФПС до стабильных **150-250**!

- Полезные моды (свет от факела в руке, зум камеры и т.д.)

- Вспомогательные моды для ресурспака, по типу его загрузки без экрана загрузки, просмотр всех переименований в наковальне и т.д.

- Конфиги к модам, чтобы не настраивать всё по полчаса =)

::: details Список модов в сборке
- [Customizable Player Models](https://modrinth.com/plugin/custom-player-models)  
- [[EMF] Entity Model Features](https://modrinth.com/mod/entity-model-features)  
- [[ETF] Entity Texture Features](https://modrinth.com/mod/entitytexturefeatures)  
- [Entity Culling](https://modrinth.com/mod/entityculling)  
- [Figura Mod](https://modrinth.com/mod/figura)
- [Distant Horizons](https://modrinth.com/mod/distanthorizons)
- [EmoteCraft](https://modrinth.com/plugin/noemotecraft)  
- [Falling Leaves](https://modrinth.com/mod/fallingleaves)  
- [fast-ip-ping](https://modrinth.com/mod/fast-ip-ping)  
- [FastQuit](https://modrinth.com/mod/fastquit)  
- [FerriteCore](https://modrinth.com/mod/ferrite-core)  
- [ImmediatelyFast](https://modrinth.com/mod/immediatelyfast)  
- [Iris](https://modrinth.com/mod/iris)  
- [Krypton](https://modrinth.com/mod/krypton)  
- [LambDynamicLights](https://modrinth.com/mod/lambdynamiclights)  
- [Language Reload](https://modrinth.com/mod/language-reload)  
- [Lithium](https://modrinth.com/mod/lithium)  
- [ModernFix](https://modrinth.com/mod/modernfix)  
- [Mod Menu](https://modrinth.com/mod/modmenu)  
- [Plasmo Voice](https://modrinth.com/plugin/plasmo-voice)  
- [Reese's Sodium Options](https://modrinth.com/mod/reeses-sodium-options)  
- [Remove Reloading Screen](https://modrinth.com/mod/rrls)  
- [Sodium](https://modrinth.com/mod/sodium)  
- [Sodium Extra](https://modrinth.com/mod/sodium-extra)  
- [Very Many Players](https://modrinth.com/mod/vmp-fabric)  
- И библиотеки для модов  
:::

## Нужные моды

Если ты не хочешь скачивать готовую сборку, то вот список самых нужных модов для нашего сервера:

- [PlasmoVoice](https://modrinth.com/plugin/plasmo-voice/versions) - войсчат
- [ETF](https://modrinth.com/mod/entitytexturefeatures/versions) - текстуры существ
- [EMF](https://modrinth.com/mod/entity-model-features/versions) - модели существ
- [CIT Resewn](https://modrinth.com/mod/cit-resewn/versions) - ресурспак с переименованиями
- [EmoteCraft](https://modrinth.com/plugin/emotecraft/versions) - эмоции внутри игры

## Сборка сервера

::: tip Установка для ванильного лаунчера, TL, TLegacy и прочих
1. Скачиваешь архив

<File
  filePath="/downloads/catcraft_mods.zip"
/>

1. Открываешь папку **игры**
    
    - Открыть папку игры можно нажав `Win` + `R`, написав `%appdata%` и перейдя в папку `.minecraft`
    
    - Или нажав в лаунчере иконку **папки**, она есть почти везде <Image src="/assets/guides/folder.png" alt="Mods Folder" width="100%" preview />

2. Открываешь архив 

    - Для этого нужно иметь установленный архиватор, советуем [7-Zip](https://ru.wikipedia.org/wiki/7-Zip)

3. Перекидываешь все моды из архива в папку `mods`

4. Запускаешь игру на версии **1.21.1 Fabric**

5. Готово!
:::

::: tip Установка для MultiMC, ModrinthApp, PrismLauncher и т.п.
1. Скачиваешь файл .mrpack

<File
  filePath="/downloads/catcraft.mrpack"
/>

1. Создаёшь новую сборку

2. В настройках сборки выбираешь пункт "Импортировать из файла" или что-то похожее <Image src="/assets/guides/mrpack.png" alt="Via .mrpack" width="100%" preview />

`.mrpack` это файл всей сборки - все моды, все конфиги, иконка и всё-всё-всё!
:::
