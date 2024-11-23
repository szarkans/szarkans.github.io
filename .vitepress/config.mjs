import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import fs from 'fs';
import path from 'path';

const updatesPath = path.resolve(__dirname, '../updates/6season/');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Кошкокрафт",
  lang: 'ru',
  description: "Вики самого Кошачьего сервера - Кошкокрафт!",
  base: '/',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  appearance: 'force-dark',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png'}]
  ],

  vue: {
    template: {
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
    logo: '/favicon.png',
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/:path',
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
      { text: 'О сервере', link: '/info/rules/laws' },
      { text: "Геймплей", link: '/gameplay/unique/qol/small_features'},
      { text: "Бестиарий", link: "/bestiary/main.md"},
      { text: "Гайды", link: '/guides/gameplay/create_event.md'},
      { text: 'История сервера', link: '/history/1season.md'},
      { text: 'Обновления', link: '/updates/6season/6_2_5.md'}
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/catcraftmc' }
    ],

    sidebar: {
      '/updates': [
        {
          text: "Главная",
          link: "/updates/index.md"
        },
        {
          text: "6 сезон",
          items: generateSidebar(updatesPath, '/updates/6season/')
        },
        {
          text: "Архив",
          items: [
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
            },
            {
              "text": "25.03.2022",
              "link": "/updates/archive/25_03_2022.md"
            },
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
          },
        ]
        
        }
      ],
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
                  text: 'Частые вопросы',
                  link: '/info/faq.md'
                },
                {
                  text: 'Локации Сервера',
                  link: '/info/map.md'
                },
                {
                  text: 'Моды для сервера',
                  link: '/info/mods.md'
                },
                {
                  text: "Фермы, ядро сервера",
                  link: '/info/farm.md'
                }
              ]
            },
            {
              text: 'Информация',
              items: [
                {
                  text: 'Администрация',
                  link: "/info/admins"
                },
                {
                  text: "Донатик",
                  link: '/info/donate.md'
                },
                {
                  text: "Гайд для новичков",
                  link: '/info/guide.md'
                },
                {
                  text: "Для контент-мейкеров",
                  link: '/info/for_media.md'
                },
                {
                  text: "Бан-лист",
                  link: '/info/banlist.md'
                },
                {
                  text: "Префиксы и суффиксы",
                  link: '/info/prefixes.md'
                },
                {
                  text: "Брендбук"
                  // link: '/info/brandbook.md'
                }
              ]
            },
            {
              text: "Бюрократия",
              items: [
                {
                  text: "Оферта",
                  link: '/info/oferta.md'
                }
              ]
            }
          ]
        }
      ],
      '/gameplay/': [
        {
          text: "Геймплей",
          items: [
            {
              text: "Общие фишки",
              items: [
                {
                  text: "Маленькие фишки",
                  link: '/gameplay/unique/qol/small_features.md'
                },
                {
                  text: "Бартер [Бета]",
                  link: '/gameplay/unique/qol/barter.md'
                },
                {
                  text: "Система магазинов [Бета]",
                  link: "/gameplay/unique/qol/shop.md"
                },
                {
                  text: "Система наград Кошкокрафта",
                  link: '/gameplay/unique/qol/rewards.md'
                },
                {
                  text: "Авторизация для лицензий",
                  link: '/gameplay/unique/qol/premium_auth.md'
                },
                {
                  text: "Быстрая смена скина",
                  link: '/gameplay/unique/qol/skinswap.md'
                },
                {
                  text: "Изменение полублоков",
                  link: '/gameplay/unique/qol/plits.md'
                },
                {
                  text: "Подключение к Дискорду",
                  link: "/gameplay/unique/qol/discord_link.md"
                },
                {
                  text: "Ребаланс трейдов жителей",
                  link: "/gameplay/unique/qol/trade_rebalance.md"
                },
                {
                  text: "Датапаки сервера",
                  link: "/gameplay/unique/qol/datapacks.md"
                },
                {
                  text: "Владелец Яйца Дракона",
                  link: "/gameplay/unique/qol/dragon_egg.md"
                }
              ]
            },
            {
              text: "Команды",
              link: "/gameplay/unique/commands.md"
            },
            {
              text: "Защита территорий [Бета]",
              link: "/gameplay/unique/land_protection.md"
            },
            {
              text: "Мебель и декорации",
              link: "/gameplay/unique/decor.md"
            },
            {
              text: "Рисование",
              link: "/gameplay/unique/artmap.md"
            },
            {
              text: "Варка напитков",
              link: "/gameplay/unique/brewery.md"
            },
            {
              text: "Рыбалка",
              link: "/gameplay/unique/fishing.md"
            },
            {
              text: "Кланы",
              link: "/gameplay/unique/clans.md"
            },
            {
              text: "Модели игрока",
              link: "/gameplay/unique/cpm.md"
            },
            {
              text: "Войсчат и диски",
              link: "/gameplay/unique/voicechat.md"
            },
            {
              text: "Ресурспак",
              link: "/gameplay/unique/resourcepack.md"
            }
          ]
        },
        {
          text: "Роллплей",
          items: [
            {
              text: "Правительство",
              link: "/gameplay/roleplay/goverment.md"
            },
            {
              text: "Работа КСБ",
              link: "/gameplay/roleplay/police.md"
            }
          ]
        }
      ],
      '/bestiary': [
        {
          text: "Ванилла",
          items: [
            {
              text: 'Изменения крафтов',
              link: '/bestiary/vanilla/vanilla_crafts.md'
            },
            {
              text: 'Изменения механик',
              link: '/bestiary/vanilla/vanilla_edits.md'
            }
          ]
        },
        {
          text: "Кошкокрафт",
          
          items: [
            {
              text: "Сущности",
              items: [
                {
                  text: "Жители Столицы",
                  link: '/bestiary/mobs/npc.md'
                }
              ]
            },
            {
              // Блоки
              text: "Блоки",
              items: [
                {
                  text: "Блок Гычи",
                  link: "/bestiary/blocks/gycha.md"
                },
                {
                  text: "Скомпресированные блоки",
                  link: "/bestiary/blocks/compressed.md"
                },
                {
                  text: "Блок света",
                  link: "/bestiary/blocks/light.md"
                },
                {
                  text: "Невидимые рамки",
                  link: "/bestiary/blocks/invis_frame.md"
                },
                {
                  text: "Стол декора",
                  link: "/bestiary/blocks/decor_table.md"
                },
                {
                  text: "Шкафы и ящики",
                  link: "/bestiary/blocks/cabinets.md"
                },
                {
                  text: "Шахматы",
                  link: "/bestiary/blocks/chess.md"
                }
              ]
            },
            {
              text: "Используемое",
              items: [
                {
                  text: "Котик+",
                  link: '/bestiary/usable/kplus.md'
                },
                {
                  text: "Модуль CatTrack",
                  link: '/bestiary/usable/cattrack.md'
                },
                {
                  text: "Свиток облика",
                  link: "/bestiary/usable/scroll.md"
                }
              ]
            },
            {
              text: "Инструменты",
              items: [
                {
                  text: "Крюк-кошка",
                  link: '/bestiary/custom_items/gh.md'
                },
                {
                  text: "Эхо-колокол",
                  link: "/bestiary/custom_items/echo_bell.md"
                },
                {
                  text: "Малярная кисть",
                  link: "/bestiary/custom_items/paint_brush.md"
                }
              ]
            },
            {
              text: "Прочее",
              items: [
                {
                  text: "Плюшевые игрушки",
                  link: "/bestiary/custom_items/plushie.md"
                },
                {
                  text: "Котомат",
                  link: "/bestiary/custom_items/kotomat.md"
                },
                {
                  text: "Священные писания",
                  link: "/bestiary/custom_items/holy_books.md"
                },
                {
                  text: "Тренировочный манекен",
                  link: "/bestiary/custom_items/dummy.md"
                },
                {
                  text: "Игральные карты"
                },
                {
                  text: "Игральные кости",
                  link: "/bestiary/custom_items/dice.md"
                }
              ]
            }
          ],

        }
      ],
      '/guides/': [
        {
          text: "Технические",
          items: [
            {
              text: "Ошибки с модами на Fabric",
              link: '/guides/tech/mod_errors.md'
            },
            {
              text: "Как скачивать моды?",
              link: '/guides/tech/mod_download.md'
            },
            {
              text: "Фикс скинов на ТЛаунчере",
              link: '/guides/tech/skins_tlauncher.md'
            }
          ]
        },
        {
          text: "Геймпленые",
          items: [
            {
              text: "Как провести ивент?",
              link: '/guides/gameplay/create_event.md'
            },
            {
              text: "Как сделать разноцветный ник?",
              link: '/guides/gameplay/rgb_nick.md'
            },
            {
              text: "Как поставить другой скин?",
              link: '/guides/gameplay/set_skin.md'
            }
          ]
        },
        {
          text: "Прочие",
          items: [
            {
              text: "Как редактировать Вики?",
              link: '/guides/other/edit_wiki.md'
            },
            {
              text: "Какой лаунчер выбрать для игры?",
              link: '/guides/other/launcher.md'
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