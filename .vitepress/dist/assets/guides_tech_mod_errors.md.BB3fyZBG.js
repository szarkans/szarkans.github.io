import{_ as o,c as a,ac as e,o as i}from"./chunks/framework.BUevxtdZ.js";const p=JSON.parse('{"title":"Не запускаются моды: что делать?","description":"Гайд по ошибкам модов","frontmatter":{"description":"Гайд по ошибкам модов"},"headers":[],"relativePath":"guides/tech/mod_errors.md","filePath":"guides/tech/mod_errors.md","lastUpdated":1732143786000}'),t={name:"guides/tech/mod_errors.md"};function s(l,r,n,u,d,h){return i(),a("div",null,r[0]||(r[0]=[e('<h1 id="не-запускаются-моды-что-делать" tabindex="-1">Не запускаются моды: что делать? <a class="header-anchor" href="#не-запускаются-моды-что-делать" aria-label="Permalink to &quot;Не запускаются моды: что делать?&quot;">​</a></h1><p>!!! warning &quot;Важно&quot; Гайд написан <strong>только</strong> для проблем с Fabric!</p><p>Здесь мы разберём что означают ошибки вылетов в консоли Fabric!</p><p>Перед запуском сборок всегда убедись, что:</p><ul><li><p>Моды скачаны на правильную версию Майнкрафта</p></li><li><p>Fabric обновлён до последней версии</p></li><li><p>Моды скачаны на Fabric, а не Forge, Quilt, Neoforge и т.д.</p></li></ul><h2 id="простеишие-ошибки" tabindex="-1">Простейшие ошибки <a class="header-anchor" href="#простеишие-ошибки" aria-label="Permalink to &quot;Простейшие ошибки&quot;">​</a></h2><h3 id="процесс-завершен-с-кодом-1" tabindex="-1">&quot;Процесс завершён с кодом -1&quot; <a class="header-anchor" href="#процесс-завершен-с-кодом-1" aria-label="Permalink to &quot;&quot;Процесс завершён с кодом -1&quot;&quot;">​</a></h3><p><span class="gold">Это не ошибка и не даст никакой информации!</span> Все вылеты майнкрафта сопровождаются кодом -1, имейте это в виду!</p><p>Реальная причина ошибки кроется в логах консоли.</p><h3 id="скачал-мод-а-он-просто-не-работает" tabindex="-1">Скачал мод, а он просто не работает! <a class="header-anchor" href="#скачал-мод-а-он-просто-не-работает" aria-label="Permalink to &quot;Скачал мод, а он просто не работает!&quot;">​</a></h3><p>Если сборка запустилась, но мода в игре нет, то вариантов несколько:</p><ul><li><p>Мод скачан не на тот загрузчик, например на Forge или Quilt. Такие моды Fabric попросту игнорирует</p></li><li><p>Мод не является модом, тоесть возможно ты скачал архив с модом, а не сам мод</p></li></ul><hr><h2 id="известные-проблемы" tabindex="-1">Известные проблемы <a class="header-anchor" href="#известные-проблемы" aria-label="Permalink to &quot;Известные проблемы&quot;">​</a></h2><h3 id="mod-x-requires-version-y-of-z-which-is-missing" tabindex="-1">&quot;Mod &quot;<strong>X</strong>&quot; requires version <strong>Y</strong> of <strong>Z</strong>, which is missing!&quot; <a class="header-anchor" href="#mod-x-requires-version-y-of-z-which-is-missing" aria-label="Permalink to &quot;&quot;Mod &quot;**X**&quot; requires version **Y** of **Z**, which is missing!&quot;&quot;">​</a></h3><p>Под <strong>X</strong>, <strong>Y</strong> и <strong>Z</strong> будут написаны моды и их версии.</p><p>Довольно таки простая ошибка - какой-то из модов жалуется на отсуствие другого мода, без которого он не сможет запуститься!</p><h4 id="решение" tabindex="-1">Решение: <a class="header-anchor" href="#решение" aria-label="Permalink to &quot;Решение:&quot;">​</a></h4><ul><li><p>Скачать нужный мод нужной версии, который написан в конце.</p><ul><li>Например, на скриншоте нам нужно скачать CraterLib версии 1.0.2, без него мод Simple RPC не запускается.</li></ul></li></ul><p><img src="/assets/guides/mods/mod_error.png" alt="mod_error" loading="lazy"></p><h3 id="mod-x-requires-version-y-of-fabric-loader" tabindex="-1">&quot;Mod &quot;X&quot; requires version Y of &quot;Fabric Loader&quot;&quot; <a class="header-anchor" href="#mod-x-requires-version-y-of-fabric-loader" aria-label="Permalink to &quot;&quot;Mod &quot;X&quot; requires version Y of &quot;Fabric Loader&quot;&quot;&quot;">​</a></h3><p>Очень просто - поставлена не та версия Fabric. Это по сути та же самая проблема, что описана чуть выше =)</p><h4 id="решение-1" tabindex="-1">Решение: <a class="header-anchor" href="#решение-1" aria-label="Permalink to &quot;Решение:&quot;">​</a></h4><ul><li>Скачать последнюю версию Fabric</li></ul><p><img src="/assets/guides/mods/fabric_wrong_version.png" alt="fabric_wrong_version" loading="lazy"></p>',25)]))}const q=o(t,[["render",s]]);export{p as __pageData,q as default};