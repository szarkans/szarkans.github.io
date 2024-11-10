import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Кошкокрафт",
  lang: 'ru-RU',
  description: "Вики самого Кошачьего сервера - Кошкокрафт!",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'О сервере', link: '/docs/info/rules/laws' },
      { text: 'История сервера', link: '/docs/history/1season.md'},
      { text: "Геймплей", link: '/docs/gameplay/unique/qol'},
      { text: "Гайды", link: '/docs/guides/gameplay_event'}
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
                  text: 'Частые вопросы'
                },
                {
                  text: 'Локации Сервера'
                },
                {
                  text: 'Моды для сервера'
                },
                {
                  text: "Фермы, ядро сервера"
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
                  text: "Донатик"
                },
                {
                  text: "Гайд для новичков"
                },
                {
                  text: "Для контент-мейкеров"
                },
                {
                  text: "Бан-лист"
                },
                {
                  text: "Префиксы и суффиксы"
                },
                {
                  text: "Брендбук"
                }
              ]
            },
            {
              text: "Бюрократия",
              items: [
                {
                  text: "Оферта"
                }
              ]
            }
          ]
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
      ]
    }

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
