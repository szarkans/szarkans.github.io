import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Кошкокрафт",
  lang: 'ru',
  description: "Вики самого Кошачьего сервера - Кошкокрафт!",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  head: [
    ['link', { rel: 'icon', href: '/icon.png'}]
  ],

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Редактировать страницу'
    },
    outline: { label: 'Содержание страницы' },
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
      { text: 'О сервере', link: '/docs/info/rules/laws' },
      { text: "Геймплей", link: '/docs/gameplay/unique/qol'},
      { text: "Бестиарий", link: "/docs/bestiary/main.md"},
      { text: "Гайды", link: '/docs/guides/gameplay_event'},
      { text: 'История сервера', link: '/docs/history/1season.md'},
      { text: 'Обновления'}
    ],

    sidebar: {
      '/docs/info/': [
        {
          text: "О сервере",
          items: [
            { text: 'Правила и законы',
              items: [
                {
                  text: 'Правила',
                  link: '/docs/info/rules/rules'
                },
                {
                  text: "Законы",
                  link: '/docs/info/rules/laws'
                }
              ]
            },
            {
              text: 'О сервере',
              items: [
                {
                  text: 'Частые вопросы',
                  link: '/docs/info/faq.md'
                },
                {
                  text: 'Локации Сервера',
                  link: '/docs/info/map.md'
                },
                {
                  text: 'Моды для сервера',
                  link: '/docs/info/mods.md'
                },
                {
                  text: "Фермы, ядро сервера",
                  link: '/docs/info/farm.md'
                }
              ]
            },
            {
              text: 'Информация',
              items: [
                {
                  text: 'Администрация',
                  link: "/docs/info/admins"
                },
                {
                  text: "Донатик",
                  link: '/docs/info/donate.md'
                },
                {
                  text: "Гайд для новичков",
                  link: '/docs/info/guide.md'
                },
                {
                  text: "Для контент-мейкеров",
                  link: '/docs/info/for_media.md'
                },
                {
                  text: "Бан-лист",
                  link: '/docs/info/banlist.md'
                },
                {
                  text: "Префиксы и суффиксы",
                  link: '/docs/info/prefixes.md'
                },
                {
                  text: "Брендбук"
                  // link: '/docs/info/brandbook.md'
                }
              ]
            },
            {
              text: "Бюрократия",
              items: [
                {
                  text: "Оферта",
                  link: '/docs/info/oferta.md'
                }
              ]
            }
          ]
        }
      ],
      '/docs/gameplay/': [
        {
          text: "Геймплей",
          items: [
            {
              text: "Общие фишки",
              link: "/docs/gameplay/unique/qol.md"
            },
            {
              text: "Команды",
              link: "/docs/gameplay/unique/commands.md"
            },
            {
              text: "Защита территорий",
              link: "/docs/gameplay/unique/land_protection.md"
            },
            {
              text: "Яйцо Дракона",
              link: "/docs/gameplay/unique/dragon_egg.md"
            },
            {
              text: "Мебель и декорации",
              link: "/docs/gameplay/unique/decor.md"
            },
            {
              text: "Рисование",
              link: "/docs/gameplay/unique/artmap.md"
            },
            {
              text: "Варка напитков",
              link: "/docs/gameplay/unique/brewery.md"
            },
            {
              text: "Рыбалка",
              link: "/docs/gameplay/unique/fishing.md"
            },
            {
              text: "NPC",
              link: "/docs/gameplay/unique/npc.md"
            },
            {
              text: "Кланы",
              link: "/docs/gameplay/unique/clans.md"
            },
            {
              text: "Модели игрока",
              link: "/docs/gameplay/unique/cpm.md"
            },
            {
              text: "Войсчат и диски",
              link: "/docs/gameplay/unique/voicechat.md"
            },
            {
              text: "Ресурспак",
              link: "/docs/gameplay/unique/resourcepack.md"
            }
          ]
        },
        {
          text: "Роллплей",
          items: [
            {
              text: "Правительство",
              link: "/docs/gameplay/roleplay/goverment.md"
            },
            {
              text: "Работа КСБ",
              link: "/docs/gameplay/roleplay/police.md"
            }
          ]
        },
        {
          text: "Награды игрокам",
          items: [
            {
              text: "Котячьи Заслуги",
              link: "/docs/gameplay/rewards/catpass.md"
            },
            {
              text: "Все награды",
              link: "/docs/gameplay/rewards/list.md"
            }
            
          ]
        }
      ],
      '/docs/bestiary': [
        {
          text: "Ванилла",
          items: [
            {
              text: 'Изменения крафтов',
              link: '/docs/bestiary/vanilla/vanilla_crafts.md'
            },
            {
              text: 'Изменения механик',
              link: '/docs/bestiary/vanilla/vanilla_edits.md'
            }
          ]
        },
        {
          text: "Кошкокрафт",
          
          items: [
            {
              // Блоки
              text: "Блоки",
              items: [
                {
                  text: "Блок Гычи",
                  link: "/docs/bestiary/blocks/gycha.md"
                },
                {
                  text: "Скомпресированные блоки",
                  link: "/docs/bestiary/blocks/compressed.md"
                },
                {
                  text: "Блок света",
                  link: "/docs/bestiary/blocks/light.md"
                },
                {
                  text: "Невидимые рамки",
                  link: "/docs/bestiary/blocks/invis_frame.md"
                },
                {
                  text: "Стол декора",
                  link: "/docs/bestiary/blocks/decor_table.md"
                },
                {
                  text: "Шкафы и ящики",
                  link: "/docs/bestiary/blocks/cabinets.md"
                },
                {
                  text: "Шахматы",
                  link: "/docs/bestiary/blocks/chess.md"
                }
              ]
            },
            {
              text: "Используемое",
              items: [
                {
                  text: "Котик+",
                  link: '/docs/bestiary/usable/kplus.md'
                },
                {
                  text: "Модуль CatTrack",
                  link: '/docs/bestiary/usable/cattrack.md'
                },
                {
                  text: "Свиток облика",
                  link: "/docs/bestiary/usable/scroll.md"
                }
              ]
            },
            {
              text: "Инструменты",
              items: [
                {
                  text: "Крюк-кошка",
                  link: '/docs/bestiary/custom_items/gh.md'
                },
                {
                  text: "Эхо-колокол",
                  link: "/docs/bestiary/custom_items/echo_bell.md"
                },
                {
                  text: "Малярная кисть",
                  link: "/docs/bestiary/custom_items/paint_brush.md"
                }
              ]
            },
            {
              text: "Прочее",
              items: [
                {
                  text: "Плюшевые игрушки",
                  link: "/docs/bestiary/custom_items/plushie.md"
                },
                {
                  text: "Котомат",
                  link: "/docs/bestiary/custom_items/kotomat.md"
                },
                {
                  text: "Священные писания",
                  link: "/docs/bestiary/custom_items/holy_books.md"
                },
                {
                  text: "Тренировочный манекен",
                  link: "/docs/bestiary/custom_items/dummy.md"
                },
                {
                  text: "Игральные карты",
                  link: "/docs/bestiary/custom_items/cards.md"
                },
                {
                  text: "Игральные кости",
                  link: "/docs/bestiary/custom_items/dice.md"
                }
              ]
            }
          ],

        }
      ],
      '/docs/history/': [
        {
          text: '1 сезон',
          link: '/docs/history/1season'
        },
        {
          text: '2 сезон',
          link: '/docs/history/2season'
        },
        {
          text: '3 сезон',
          link: '/docs/history/3season'
        },
        {
          text: '4 сезон',
          link: '/docs/history/4season'
        },
        {
          text: '5 сезон',
          link: '/docs/history/5season'
        },
        {
          text: '6 сезон',
          link: '/docs/history/6season'
        }
      ]
      
    }

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
