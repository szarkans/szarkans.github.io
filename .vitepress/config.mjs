import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import fs from 'fs';
import path from 'path';

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
      { text: 'Донатик', link: '/info/donate.md' },
      { text: 'Префиксы и суффиксы', link: '/info/prefixes.md' },
      { text: 'Брендбук', link: '/info/brandbook.md' },
    ]
  },
  {
    text: 'Подключение к серверу',
    items: [
      { text: 'Моды для сервера', link: '/info/mods.md' },
      { text: 'Фермы, ядро сервера', link: '/info/farm.md' },
      { text: 'Как скачивать моды?', link: '/guides/tech/mod_download.md' },
      { text: 'Ошибки с модами на Fabric', link: '/guides/tech/mod_errors.md' },
      { text: 'Фикс скинов на ТЛаунчере', link: '/guides/tech/skins_tlauncher.md' },
      { text: 'Какой лаунчер выбрать?', link: '/guides/other/launcher.md' },
      { text: 'Как редактировать Вики?', link: '/guides/other/edit_wiki.md' }
    ]
  }
];

const mechanicsSidebar = [
  // ── КАК ИГРАТЬ ───────────────────────────────────────
  {
    text: 'Роллплей',
    items: [
      { text: 'Правительство', link: '/gameplay/roleplay/goverment.md' },
      { text: 'РП роли', link: '/gameplay/roleplay/other_roles.md' },
      { text: 'Работа КСБ', link: '/gameplay/roleplay/police.md' },
    ]
  },
  {
    text: 'Общие механики',
    items: [
      { text: 'Команды', link: '/gameplay/unique/commands.md' },
      { text: 'Профиль игрока', link: '/gameplay/unique/qol/profile.md' },
      { text: 'Награды игрокам', link: '/gameplay/unique/qol/rewards.md' },
      { text: 'Котячьи заслуги', link: '/gameplay/unique/qol/catpass.md' },
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
];

const bestiarySidebar = [
  {
    text: 'Изменения Ваниллы',
    items: [
      { text: 'Изменения крафтов', link: '/bestiary/vanilla/vanilla_crafts.md' },
      { text: 'Изменения механик', link: '/bestiary/vanilla/vanilla_edits.md' },
    ]
  },
  {
    text: 'Разное',
    items: [
      { text: 'Жители Столицы', link: '/bestiary/mobs/npc.md' },
      { text: 'Зачарования', link: '/bestiary/enchantments.md' },
      
    ]

  },
  {
    text: 'Предметы',
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
      { text: 'Драконья Чешуя', link: '/bestiary/materials/dragon_scale.md' },
    ]
  },
  {
    text: 'Блоки',
    items: [
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

const adhdVideosPlugin = {
  name: 'adhd-videos',
  resolveId(id) {
    if (id === 'virtual:adhd-videos') return '\0virtual:adhd-videos'
  },
  load(id) {
    if (id === '\0virtual:adhd-videos') {
      const videosDir = path.resolve(__dirname, '../public/videos')
      const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.webm')).sort()
      return `export default ${JSON.stringify(files.map(f => `/videos/${f}`))}`
    }
  }
}

export default defineConfig({
  title: "Кошкокрафт",
  lang: 'ru',
  description: "Вики самого Кошачьего сервера - Кошкокрафт!",
  base: '/',

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
    const siteUrl = 'https://wiki.catcraftmc.ru';

    const pageTitle = pageData.title || 'Кошкокрафт';
    const pageDescription = pageData.description || pageData.frontmatter?.description || 'Вики самого Кошачьего сервера - Кошкокрафт!';
    const pageUrl = `${siteUrl}/${pageData.relativePath.replace(/\.md$/, '')}`;

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
      updates:  { name: 'Обновления', url: '/updates/7season/7_0_4' },
      history:  { name: 'История',    url: '/history/1season/1season' },
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
    hostname: 'https://wiki.catcraftmc.ru',
    transformItems: (items) => {
      return items.map((item) => {
        if (item.url === '') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }

        if (item.url.includes('/updates/7season/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }

        if (item.url.includes('/info/faq') || item.url.includes('/guides/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        if (item.url.includes('/gameplay/') || item.url.includes('/bestiary/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        if (item.url.includes('/updates/')) {
          return { ...item, priority: 0.5, changefreq: 'monthly' };
        }

        // История
        if (item.url.includes('/history/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }

        return { ...item, priority: 0.5, changefreq: 'monthly' };
      });
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.png'}],
    ['meta', { name: 'google-site-verification', content: 'r54JPpg5sYhuUs5E00v4XJ-BweKdustH7r9E2w_QpnQ' }],
    // Google Analytics
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
    ['meta', { property: 'og:image', content: 'https://wiki.catcraftmc.ru/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Вики самого Кошачьего сервера - Кошкокрафт!' }],

    // SEO: Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://wiki.catcraftmc.ru/og-image.png' }],
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
      url: 'https://wiki.catcraftmc.ru',
      logo: 'https://wiki.catcraftmc.ru/icon_purple.png',
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
                  selectKeyAriaLabel: '输入',
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
      { text: 'Начать играть', link: '/info/faq' },
      { text: 'Механики', link: '/gameplay/unique/qol/small_features' },
      { text: 'Бестиарий', link: '/bestiary/main.md' },
      { text: 'История', link: '/history/1season/1season.md' },
      { text: 'Обновления', link: '/updates/7season/7_0_4.md' }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/6f3FwFRJWC' },
      { icon: 'telegram', link: 'https://t.me/catcraftmc_tg' },
      { icon: 'youtube', link: 'https://youtube.com/@catcraftminecraft' },
      { icon: 'googlemaps', link: "https://map.catcraftmc.ru"}
    ],

    sidebar: {
      '/updates': [
        {
          text: "8 сезон",
          items: []
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
                  "link": "/updates/archive/29_10_2022.md"
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
      '/bestiary': bestiarySidebar,
      '/history/': [
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
