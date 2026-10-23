import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import fs from 'fs';
import path from 'path';
import { bestiarySidebar, mechanicsSidebar } from './sidebars.js';

const updatesPath = path.resolve(__dirname, '../updates/6season/');

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
    text: 'О сервере',
    items: [
      { text: 'Администрация', link: '/info/admins' },
      { text: 'Префиксы и суффиксы', link: '/info/prefixes.md' },
      { text: 'Брендбук', link: '/info/brandbook.md' },
    ]
  },
  {
    text: 'Моды и техническое',
    items: [
      { text: 'Моды для сервера', link: '/info/mods.md' },
      { text: 'Фермы, ядро сервера', link: '/info/farm.md' },
      { text: 'Как скачивать моды?', link: '/guides/tech/mod_download.md' },
      { text: 'Ошибки с модами на Fabric', link: '/guides/tech/mod_errors.md' },
      // { text: 'Фикс скинов на ТЛаунчере', link: '/guides/tech/skins_tlauncher.md' }, - скрыто
      { text: 'Какой лаунчер выбрать?', link: '/guides/other/launcher.md' },
      { text: 'Как редактировать Вики?', link: '/guides/other/edit_wiki.md' }
    ]
  }
];

const adhdVideosPlugin = {
  name: 'adhd-videos',
  resolveId(id) {
    if (id === 'virtual:adhd-videos') return '\0virtual:adhd-videos'
  },
  load(id) {
    if (id === '\0virtual:adhd-videos') {
      const videosDir = path.resolve(__dirname, '../public/videos')
      // Папки может не быть (свежий клон без 166 МБ видео, частичный чекаут в CI).
      // AdhdMode.vue уже умеет в пустой список, поэтому деградируем в него,
      // а не роняем всю сборку на ENOENT при загрузке конфига.
      const files = fs.existsSync(videosDir)
        ? fs.readdirSync(videosDir).filter(f => f.endsWith('.webm')).sort()
        : []
      return `export default ${JSON.stringify(files.map(f => `/videos/${f}`))}`
    }
  }
}

// Важность страниц для поисковиков (sitemap, поле priority ниже).
//
// Разложено по тому, ЗАЧЕМ человек приходит на страницу из поиска, а не по
// тому, где она лежит в дереве. Хочешь поменять — правь эти два списка,
// остальное считается по разделам.

// За этим приходят чаще всего: человек выбирает, заходить ли на сервер,
// и человек, которого касаются правила. Плюс нормативка живых игроков.
const SEARCH_ENTRY = [
  '/info/faq',        // как зайти, версия, что за сервер
  '/info/guide',      // гайд для новичка
  '/info/rules/',     // правила и законы
];

// Служебное: нужно редко, целенаправленно из поиска не ищется, ссылок
// внутри сайта почти нет (брендбук и «для медиа» — по одной и по нулю).
const SERVICE_PAGES = [
  '/info/brandbook',
  '/info/for_media',
  '/info/prefixes',
];

export default defineConfig({
  title: "Кошкокрафт",
  lang: 'ru',
  description: "Вики самого Кошачьего сервера - Кошкокрафт!",
  base: '/',

  // Служебные .md вне вики: план-доки задач, README, файлы Claude Code.
  // Без этого VitePress собирает их как страницы сайта, и docs:build краснеет
  // на ссылках внутри рабочих заметок.
  srcExclude: [
    'docs/**', 'README.md', 'CLAUDE.md', 'CLAUDE.local.md', 'vibecode/**',
    'PRODUCT.md', 'DESIGN.md',          // записи плагина impeccable, не страницы вики

    // Скрытые страницы: файлы остаются в репозитории, но сайт их не собирает -
    // по прямой ссылке их тоже не открыть. Вернуть = убрать строку отсюда.
    'guides/work/gksb.md',              // КСБ распущен
    'guides/work/police.md',            // КСБ распущен
    'guides/tech/skins_tlauncher.md',   // сервер теперь лицензионный

    'gameplay/roleplay/goverment.md',   // КСБ распущен
    'gameplay/roleplay/police.md',      // КСБ распущен
    'bestiary/test.md',

    // Скрыто при переписывании раздела под новый сервер (01.08.2026):
    'gameplay/unique/qol/discord_link.md', // /discord link не работает: discord_main.dsc.disabled
    'gameplay/unique/decor.md',            // ждёт сверки с новым CraftEngine
    'gameplay/unique/wardrobe.md',         // гардеробная не перенесена на новый сервер
    'gameplay/unique/mods/figura.md',      // ждёт решения по моду

    // Скрыто 09.08.2026: страница есть, механики на сервере пока нет.
    // Кланы вернулись 01.09.2026 — реализованы в 8.0.5b.
    'gameplay/unique/catenary.md',         // верёвки с физикой
  ],

  // ignoreDeadLinks намеренно не задан: заглушка под скрытые страницы КСБ
  // была неякорной подстрокой и глушила бы любую будущую опечатку в этом
  // разделе. Ссылок на те страницы в тексте не осталось — проверять нечего.

  transformHead: ({ pageData }) => {
    const head = [
      [
        'script',
        { type: 'text/javascript' },
        `(function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107063260', 'ym');
        ym(107063260, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`
      ],
      [
        'noscript',
        {},
        '<div><img src="https://mc.yandex.ru/watch/107063260" style="position:absolute; left:-9999px;" alt="" /></div>'
      ]
    ];
    const siteUrl = 'https://wiki.catcraft.ru';

    const pageTitle = pageData.title || 'Кошкокрафт';
    const pageDescription = pageData.description || pageData.frontmatter?.description || 'Вики самого Кошачьего сервера - Кошкокрафт!';
    // cleanUrls: true отдаёт index.md по адресу каталога, а не по `/index`.
    // Без срезания `index` каноникал главной указывал на несуществующий URL.
    const pagePath = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '');
    const pageUrl = `${siteUrl}/${pagePath}`;

    const fullTitle = pageTitle === 'Кошкокрафт' ? pageTitle : `${pageTitle} | Кошкокрафт`;

    // Патчноуты и история — это статьи, остальное — обычные страницы
    const topSegment = pageData.relativePath.split('/')[0];
    const isArticle = topSegment === 'updates' || topSegment === 'history';

    head.push(['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }]);
    if (isArticle && pageData.lastUpdated) {
      head.push(['meta', { property: 'article:modified_time', content: new Date(pageData.lastUpdated).toISOString() }]);
    }

    head.push(['meta', { property: 'og:title', content: fullTitle }]);
    head.push(['meta', { property: 'og:description', content: pageDescription }]);
    head.push(['meta', { property: 'og:url', content: pageUrl }]);

    head.push(['meta', { name: 'twitter:title', content: fullTitle }]);
    head.push(['meta', { name: 'twitter:description', content: pageDescription }]);

    head.push(['link', { rel: 'canonical', href: pageUrl }]);

    head.push(['meta', { name: 'description', content: pageDescription }]);

    // SEO: Schema.org — хлебные крошки (Главная › Раздел › Страница)
    const sections = {
      info:     { name: 'Информация', url: '/info/faq' },
      guides:   { name: 'Информация', url: '/info/faq' },
      gameplay: { name: 'Механики',   url: '/gameplay/unique/qol/small_features' },
      bestiary: { name: 'Бестиарий',  url: '/bestiary/main' },
      updates:  { name: 'Обновления', url: '/updates/8season/8_0_4' },
      history:  { name: 'История',    url: '/history/' },
    };

    const section = sections[pageData.relativePath.split('/')[0]];
    if (section) {
      const sectionUrl = `${siteUrl}/${section.url.replace(/^\//, '')}`;
      const crumbs = [
        { '@type': 'ListItem', position: 1, name: 'Кошкокрафт', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: section.name, item: sectionUrl },
      ];
      if (pageUrl !== sectionUrl) {
        crumbs.push({ '@type': 'ListItem', position: 3, name: pageTitle, item: pageUrl });
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs,
      })]);
    }

    return head;
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  appearance: 'force-dark',

  sitemap: {
    hostname: 'https://wiki.catcraft.ru',
    transformItems: (items) => {
      return items.map((item) => {
        // 🛑 VitePress отдаёт `url` БЕЗ ведущего слеша: `updates/8season/8_0_2`,
        // а не `/updates/8season/8_0_2`. Поэтому проверки ниже, написанные как
        // `includes('/updates/')`, не срабатывали ни разу за всё время: из 153
        // страниц приоритет получали четыре, и три из них — по случайности,
        // у гайдов кусок `/gameplay/` нашёлся в СЕРЕДИНЕ адреса
        // (`guides/gameplay/rgb_nick`). Остальные 149 уходили в поиск с 0.5.
        // Нормализуем один раз — дальше правила работают так, как написаны.
        const url = item.url.startsWith('/') ? item.url : `/${item.url}`;

        if (url === '/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }

        if (url.includes('/updates/8season/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }

        if (SEARCH_ENTRY.some((p) => url.startsWith(p))) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }

        if (SERVICE_PAGES.some((p) => url.startsWith(p))) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }

        // Остальная справка: донат, моды, карта, баны, администрация, фермы
        // и все гайды. За этим приходят целенаправленно, но реже.
        if (url.startsWith('/info/') || url.includes('/guides/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        if (url.includes('/gameplay/') || url.includes('/bestiary/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        if (url.includes('/updates/')) {
          return { ...item, priority: 0.5, changefreq: 'monthly' };
        }

        // История
        if (url.includes('/history/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }

        return { ...item, priority: 0.5, changefreq: 'monthly' };
      });
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.png'}],
    ['meta', { name: 'google-site-verification', content: 'r54JPpg5sYhuUs5E00v4XJ-BweKdustH7r9E2w_QpnQ' }],
    // ВНИМАНИЕ: на сайте ДВЕ разные Google Analytics — эта (G-ZP5H997C51) и
    // G-X3KCR2ZW65 через плагин в theme/index.js. Обе пишут в один dataLayer,
    // цифры в отчётах расходятся. Одну надо убрать; какую — не решено.
    // Эта считает только первую страницу за визит (вики — SPA, переходы
    // не перезагружают страницу), плагин считает переходы правильно.
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-ZP5H997C51' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZP5H997C51');`],
    ['meta', { name: 'yandex-verification', content: '8361658880757eb9' }],
    // SEO: Open Graph Meta Tags
    // og:type задаётся динамически в transformHead (website / article)
    ['meta', { property: 'og:locale', content: 'ru_RU' }],
    ['meta', { property: 'og:site_name', content: 'Кошкокрафт Вики' }],
    ['meta', { property: 'og:image', content: 'https://wiki.catcraft.ru/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Вики самого Кошачьего сервера - Кошкокрафт!' }],

    // SEO: Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://wiki.catcraft.ru/og-image.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'Вики самого Кошачьего сервера - Кошкокрафт!' }],

    // SEO: Additional Meta Tags
    ['meta', { name: 'theme-color', content: '#9333ea' }],
    ['meta', { name: 'keywords', content: 'Minecraft, сервер, Кошкокрафт, Catcraft, Vanilla+, RolePlay, майнкрафт' }],
    ['meta', { name: 'author', content: 'Кошкокрафт' }],
    ['meta', { name: 'robots', content: 'index, follow' }],

    // SEO: Schema.org — организация (для карточки бренда в выдаче)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Кошкокрафт',
      alternateName: 'CatCraft',
      url: 'https://wiki.catcraft.ru',
      logo: 'https://wiki.catcraft.ru/icon_purple.png',
      sameAs: [
        'https://discord.gg/6f3FwFRJWC',
        'https://t.me/catcraftmc_tg',
        'https://youtube.com/@catcraftminecraft'
      ]
    })]
  ],
  vite: {
    plugins: [adhdVideosPlugin]
  },

  vue: {
    template: {
      // Отключаем строковую склейку статики: иначе инлайн-компоненты
      // (напр. <Obfuscated>) внутри больших статичных абзацев «застывают»
      // как обычный текст и не оживают. См. Obfuscated.vue.
      compilerOptions: {
        hoistStatic: false
      },
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: ['src'],
        img: ['src'],
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
        Image: ['src']
      }
    }
  },

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    skipToContentLabel: 'К содержанию',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonAriaLabel: "Поиск",
                buttonText: "Поиск"
              },
              modal: {
                displayDetails: 'Показать детально',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Назад',
                noResultsText: 'Ничего не найдено для',
                footer: {
                  selectText: 'выбор',
                  selectKeyAriaLabel: 'выбрать',
                  navigateText: 'навигация',
                  navigateUpKeyAriaLabel: 'Наверх',
                  navigateDownKeyAriaLabel: 'Вниз',
                  closeText: 'выйти',
                  closeKeyAriaLabel: 'ESC'
                }
              }
            }
          }
        }
      }
    },

    logo: '/favicon.png',
    editLink: {
      pattern: 'https://github.com/szarkans/szarkans.github.io/edit/main/:path',
      text: 'Редактировать страницу'
    },
  
    outline: { label: 'Содержание страницы',
      level: [2, 3]
     },
  
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
  
    lastUpdated: {
      text: 'Обновлено'
    },
    darkModeSwitchLabel: 'Оформление',
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на тёмную тему',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Вернуться к началу',
    langMenuLabel: 'Изменить язык',
    nav: [
      { text: 'История', link: '/history/', activeMatch: '^/history/' },
      { text: 'Обновления', link: '/updates/8season/8_0_5_1', activeMatch: '^/updates/' },
      { text: 'Discord', link: 'https://discord.gg/6f3FwFRJWC' },
      { text: 'Telegram', link: 'https://t.me/catcraftmc_tg' }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/6f3FwFRJWC' },
      { icon: 'telegram', link: 'https://t.me/catcraftmc_tg' },
      { icon: 'youtube', link: 'https://youtube.com/@catcraftminecraft' }
    ],

    sidebar: {
      '/updates': [
        {
          text: "8 сезон",
          items: [
            {
              "text": "8.0.5.2b",
              link: "/updates/8season/8_0_5_2.md"
            },
            {
              "text": "8.0.5.1b",
              link: "/updates/8season/8_0_5_1.md"
            },
            {
              "text": "8.0.5b",
              link: "/updates/8season/8_0_5.md"
            },
            {
              "text": "8.0.4b",
              link: "/updates/8season/8_0_4.md"
            },
            {
              "text": "8.0.3b",
              link: "/updates/8season/8_0_3.md"
            },
            {
              "text": "8.0.2b",
              link: "/updates/8season/8_0_2.md"
            },
            {
              "text": "8.0.1b",
              link: "/updates/8season/8_0_1.md"
            }
          ]
        },
        {
          text: "Архив",
              "collapsed": true,
          items: [
            {
              text: "? сезон",
              "collapsed": true,
              items: [
                {
                  "text": "?.0.4",
                  link: "/updates/7season/7_0_4.md"
                },
                {
                  "text": "?.0.3",
                  link: "/updates/7season/7_0_3.md"
                },
                {
                  "text": "?.0.2",
                  link: "/updates/7season/7_0_2.md"
                },
                {
                  "text": "?.0.1",
                  link: "/updates/7season/7_0_1.md"
                },
                {
                  "text": "?.0.0",
                  link: "/updates/7season/7_0_0.md"
                }
              ]
            },
            {
              "text": "6 сезон",
              "collapsed": true,
              "items": generateSidebar(updatesPath, '/updates/6season/')
            },
            {
              "text": "5 сезон",
              "collapsed": true,
              "items": [
                {
                  "text": "5.9",
                  "link": "/updates/5season/5_9.md"
                },
                {
                  "text": "5.8",
                  "link": "/updates/5season/5_8.md"
                },
                {
                  "text": "5.7",
                  "link": "/updates/5season/5_7.md"
                },
                {
                  "text": "5.6",
                  "link": "/updates/5season/5_6.md"
                },
                {
                  "text": "5.5",
                  "link": "/updates/5season/5_5.md"
                },
                {
                  "text": "5.4",
                  "link": "/updates/5season/5_4.md"
                },
                {
                  "text": "5.3",
                  "link": "/updates/5season/5_3.md"
                },
                {
                  "text": "5.2",
                  "link": "/updates/5season/5_2.md"
                },
                {
                  "text": "5.1",
                  "link": "/updates/5season/5_1.md"
                }
              ]
            },
            {
              "text": "4 сезон",
              "collapsed": true,
              "items": [
                {
                  "text": "4.3.4",
                  "link": "/updates/4season/4_3_4.md"
                },
                {
                  "text": "4.3.3",
                  "link": "/updates/4season/4_3_3.md"
                },
                {
                  "text": "4.3.2",
                  "link": "/updates/4season/4_3_2.md"
                },
                {
                  "text": "4.3.1",
                  "link": "/updates/4season/4_3_1.md"
                },
                {
                  "text": "4.2.0",
                  "link": "/updates/4season/4_2_0.md"
                },
                {
                  "text": "4.1.2",
                  "link": "/updates/4season/4_1_2.md"
                },
                {
                  "text": "4.1.1.1",
                  "link": "/updates/4season/4_1_1_1.md"
                },
                {
                  "text": "4.1.1",
                  "link": "/updates/4season/4_1_1.md"
                },
                {
                  "text": "4.1",
                  "link": "/updates/4season/4_1.md"
                },
                {
                  "text": "4 сезон",
                  "link": "/updates/4season/init.md"
                },
              ]
            },
            {
              "text": "3 сезон",
              "collapsed": true,
              "items": [
                {
                  "text": "03.12.2022",
                  "link": "/updates/archive/03_12_2022.md"
                },
                {
                  "text": "16.11.2022",
                  "link": "/updates/archive/16_11_2022.md"
                },
                {
                  "text": "30.10.2022",
                  "link": "/updates/archive/30_10_2022.md"
                },
                {
                  "text": "04.10.2022",
                  "link": "/updates/archive/04_10_2022.md"
                },
                {
                  "text": "10.09.2022",
                  "link": "/updates/archive/10_09_2022.md"
                },
                {
                  "text": "24.08.2022",
                  "link": "/updates/archive/24_08_2022.md"
                },
                {
                  "text": "18.08.2022",
                  "link": "/updates/archive/18_08_2022.md"
                },
                {
                  "text": "12.08.2022",
                  "link": "/updates/archive/12_08_2022.md"
                },
                {
                  "text": "01.08.2022",
                  "link": "/updates/archive/01_08_2022.md"
                },
                {
                  "text": "11.07.2022",
                  "link": "/updates/archive/11_07_2022.md"
                },
                {
                  "text": "08.07.2022",
                  "link": "/updates/archive/08_07_2022.md"
                },
                {
                  "text": "05.07.2022",
                  "link": "/updates/archive/05_07_2022.md"
                },
                {
                  "text": "02.07.2022",
                  "link": "/updates/archive/02_07_2022.md"
                },
                {
                  "text": "20.07.2022",
                  "link": "/updates/archive/20_07_2022.md"
                },
                {
                  "text": "14.02.2022",
                  "link": "/updates/archive/14_07_2022.md"
                },
                {
                  "text": "01.07.2022",
                  "link": "/updates/archive/01_07_2022.md"
                },
                {
                  "text": "29.06.2022",
                  "link": "/updates/archive/29_06_2022.md"
                }
              ]
            },
            {
              "text": "2 сезон",
              "collapsed": true,
              "items": [
                {
                  "text": "25.03.2022",
                  "link": "/updates/archive/25_03_2022.md"
                }
              ]
            },
            {
              "text": "1 сезон",
              "collapsed": true,
              "items":  [
                {
                  "text": "01.03.2022",
                  "link": "/updates/archive/01_03_2022.md"
                },
                {
                  "text": "15.02.2022",
                  "link": "/updates/archive/15_02_2022.md"
                },
                {
                  "text": "28.01.2022",
                  "link": "/updates/archive/28_01_2022.md"
                }
              ]
            }
        ]
        }
      ],
      '/info/': startPlayingSidebar,
      '/guides/': startPlayingSidebar,
      '/gameplay/': mechanicsSidebar,
      // Ванильные страницы физически лежат в /bestiary/, но по смыслу они из
      // Механик — отдаём им меню Механик. Префикс длиннее '/bestiary',
      // поэтому VitePress выберет именно его.
      '/bestiary/vanilla/': mechanicsSidebar,
      '/bestiary': bestiarySidebar,
      '/history/': [
        // Обратно на страницу-вход: из статьи сезона иначе не выбраться,
        // кроме как через навбар.
        { text: '<span class="sidebar-back">← Все сезоны</span>', link: '/history/' },
        {
          text: '1 сезон',
          items: [
            {
              text: 'История',
              link: '/history/1season/1season.md'
            },
            {
              text: "Альбом",
              link: '/history/1season/album.md'
            },
            {
              text: "Библиотека",
              link: '/history/1season/library.md'
            }
          ],
        },
        {
          text: '2 сезон',
          items: [
            {
              text: 'История',
              link: '/history/2season/2season.md'
            },
            {
              text: "Альбом",
              link: '/history/2season/album.md'
            }
          ],
        },
        {
          text: '3 сезон',
          items: [
            {
              text: 'История',
              link: '/history/3season/3season.md'
            },
            {
              text: "Альбом",
              link: '/history/3season/album.md'
            },
            {
              text: "Библиотека",
              link: '/history/3season/library.md'
              },
              {
              text: "Города",
              link: '/history/3season/towns.md'
            }
          ]
        },
        {
          text: '4 сезон',
          items: [
            {
              text: 'История',
              link: '/history/4season/4season.md'
            },
            {
              text: "Альбом",
              link: '/history/4season/album.md'
            },
            {
              text: "Библиотека",
              link: '/history/4season/library.md'
              },
              {
              text: "Города",
              link: '/history/4season/towns.md'
            }
          ]
        },
        {
          text: '5 сезон',
          items: [
            {
              text: 'История',
              link: '/history/5season/5season.md'
            },
            {
              text: "Альбом",
              link: '/history/5season/album.md'
            },
            {
              text: "Библиотека",
              link: '/history/5season/library.md'
              },
              {
              text: "Города",
              link: '/history/5season/towns.md'
            }
          ]
        },
        {
          text: '6 сезон',
          items: [
            {
              text: 'История',
              link: '/history/6season/6season.md'
            },
            {
              text: "Альбом",
              link: '/history/6season/album.md'
            },
            {
              text: "Библиотека",
              link: '/history/6season/library.md'
              },
              {
              text: "Города",
              link: '/history/6season/towns.md'
            }
          ]
        },
        {
          text: '??? сезон',
          items: [
            {
              text: 'История',
              link: '/history/7season/7season.md'
            },
            {
              text: "Альбом",
              link: '/history/7season/album.md'
            },
            {
              text: "Библиотека",
              link: '/history/7season/library.md'
              },
              {
              text: "Города",
              link: '/history/7season/towns.md'
            }
          ]
        },
        {
          text: '8 сезон',
          items: [
            {
              text: 'История',
              link: '/history/8season/8season.md'
            }
          ]
        }
      ]
      
    }
  }
})

function generateSidebar(folderPath, basePath = '') {
  const files = fs.readdirSync(folderPath);

  // Формируем элементы для сайдбара
  return files
    .filter((file) => file.endsWith('.md')) // Оставляем только Markdown файлы
    .map((file) => {
      const name = path.parse(file).name; // Имя файла без расширения
      return {
        text: name === 'index' ? 'Главная' : name.replace(/_/g, '.'), // Если index.md, то 'Главная'
        link: `${basePath}/${name}`,
        isIndex: name === 'index', // Флаг для index.md
      };
    })
    .sort((a, b) => {
      // Всегда ставим index.md первым
      if (a.isIndex) return -1;
      if (b.isIndex) return 1;

      // Перевернуть порядок по имени файла (обратная сортировка)
      return b.text.localeCompare(a.text, undefined, { numeric: true });
    });
}
