import { defineConfig } from 'vitepress'

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
      { text: 'О сервере', link: '/info/rules/laws' },
      { text: 'История сервера', link: '/history/1season.md'},
      { text: "Геймплей", link: '/gameplay/unique/qol'},
      { text: "Гайды", link: '/guides/gameplay_event'}
    ],

    sidebar: {
      '/info/': [
        {
          text: "О сервере",
          items: [
            { text: 'Правила и законы',
              items: [
                {
                  text: 'Правила',
                  link: '/info/rules/rules'
                },
                {
                  text: "Законы",
                  link: '/info/rules/laws'
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
                  text: 'Администрация'
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
      '/history/': [
        {
          text: '1 сезон',
          link: '/history/1season'
        },
        {
          text: '2 сезон',
          link: '/history/2season'
        },
        {
          text: '3 сезон',
          link: '/history/3season'
        },
        {
          text: '4 сезон',
          link: '/history/4season'
        },
        {
          text: '5 сезон',
          link: '/history/5season'
        },
        {
          text: '6 сезон',
          link: '/history/6season'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
