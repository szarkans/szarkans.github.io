import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Кошкокрафт",
  lang: 'ru-RU',
  description: "Вики самого Кошачьего сервера - Кошкокрафт!",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
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
              text: "Команды"
            },
            {
              text: "Защита территорий"
            },
            {
              text: "Яйцо Дракона"
            },
            {
              text: "Мебель и декорации"
            },
            {
              text: "Рисование"
            },
            {
              text: "Варка напитков"
            },
            {
              text: "Рыбалка"
            },
            {
              text: "NPC"
            },
            {
              text: "Кланы"
            },
            {
              text: "Модели игрока"
            },
            {
              text: "Войсчат и диски"
            },
            {
              text: "Ресурспак"
            }
          ]
        },
        {
          text: "Роллплей",
          items: [
            {
              text: "Правительство"
            },
            {
              text: "Работа КСБ"
            }
          ]
        },
        {
          text: "Награды игрокам",
          items: [
            {
              text: "Котячьи Заслуги"
            },
            {
              text: "Все награды"
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
