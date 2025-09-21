import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
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
    search: {
      provider: 'local'
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
      { text: 'О сервере', link: '/info/faq' },
      { text: "Геймплей", link: '/gameplay/unique/qol/small_features'},
      { text: "Бестиарий", link: "/bestiary/main.md"},
      { text: "Гайды", link: '/guides/gameplay/create_event.md'},
      { text: 'История сервера', link: '/history/1season/1season.md'},
      { text: 'Обновления', link: '/updates/7season/7_0_3.md'}
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/6f3FwFRJWC' },
      { icon: 'telegram', link: 'https://t.me/catcraftmc_tg' },
      { icon: 'youtube', link: 'https://youtube.com/@catcraftminecraft' }
    ],

    sidebar: {
      '/updates': [
        {
          text: "7 сезон",
          items: [
            {
              "text": "7.0.3",
              link: "/updates/7season/7_0_3.md"
            },
            {
              "text": "7.0.2",
              link: "/updates/7season/7_0_2.md"
            },
            {
              "text": "7.0.1",
              link: "/updates/7season/7_0_1.md"
            },
            {
              "text": "7.0.0",
              link: "/updates/7season/7_0_0.md"
            }
          ]
        },
        {
          text: "Архив",
          items: [
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
      '/info/': [
        {
          text: "О сервере",
          items: [
            {
              text: "Новичкам",
              items: [
                {
                  text: "Гайд для новичков",
                  link: '/info/guide.md'
                },
                {
                  text: 'Частые вопросы',
                  link: '/info/faq.md'
                }
              ]
            },
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
                
                // {
                //   text: 'Локации Сервера',
                //   link: '/info/map.md'
                // },
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
                  text: "Для контент-мейкеров",
                  link: '/info/for_media.md'
                },
                // {
                //   text: "Бан-лист",
                //   link: '/info/banlist.md'
                // },
                {
                  text: "Префиксы и суффиксы",
                  link: '/info/prefixes.md'
                },
                {
                  text: "Брендбук",
                  link: '/info/brandbook.md'
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
            },
            {
              text: "Общие фишки",
              items: [
                {
                  text: "Маленькие фишки",
                  link: '/gameplay/unique/qol/small_features.md'
                },
                {
                  text: "Профиль игрока",
                  link: "/gameplay/unique/qol/profile.md"
                },
                {
                  text: "Бартер β",
                  link: '/gameplay/unique/qol/barter.md'
                },
                {
                  text: "Система наград",
                  link: '/gameplay/unique/qol/rewards.md'
                },
                {
                  text: "Котячьи заслуги",
                  link: '/gameplay/unique/qol/catpass.md'
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
                  text: "Подключение к Дискорду",
                  link: "/gameplay/unique/qol/discord_link.md"
                }
                // {
                //   text: "Датапаки сервера",
                //   link: "/gameplay/unique/qol/datapacks.md"
                // },
                // {
                //   text: "Владелец Яйца Дракона",
                //   link: "/gameplay/unique/qol/dragon_egg.md"
                // }
              ]
            },
            {
              text: "Поддерживаемые моды",
              items: [
                {
                  text: "Figura",
                  link: "/gameplay/unique/mods/figura.md"
                },
                // {
                //   text: "Distant Horizons",
                //   link: "/gameplay/unique/mods/dh.md"
                // },
                // {
                //   text: "CPM",
                //   link: "/gameplay/unique/mods/cpm.md"
                // },
                {
                  text: "Войсчат и диски",
                  link: "/gameplay/unique/mods/voicechat.md"
                },
              ]
            },
            {
              text: "Верёвки с физикой",
              link: "/gameplay/unique/catenary.md"
            },
            {
              text: "Команды",
              link: "/gameplay/unique/commands.md"
            },
            {
              text: "Гардеробная обликов",
              link: "/gameplay/unique/wardrobe.md"
            },
            // {
            //   text: "Защита территорий β",
            //   link: "/gameplay/unique/land_protection.md"
            // },
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
              text: "Кланы β",
              link: "/gameplay/unique/clans.md"
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
          "text": "Зачарования",
          link: "/bestiary/enchantments.md"
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
              text: "Материалы",
              items: [
                {
                  text: "Драконья Чешуя",
                  link: "/bestiary/materials/dragon_scale.md"
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
                  text: "Укреплённый глубинный сланец",
                  link: "/bestiary/blocks/reinforced_deepslate.md"
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
                },
                {
                  text: "UltraDragonblood",
                  link: "/bestiary/usable/ultradragonblood.md"
                },
                {
                  text: "Пустотное зелье",
                  link: "/bestiary/usable/void_potion.md"
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
                },
                {
                  text: "Детектор аномальной активности",
                  link: "/bestiary/custom_items/anomaly_detector.md"
                },
                {
                  text: "Рация",
                  link: "/bestiary/custom_items/transmitter.md"
                },
                {
                  text: "Старый автомат",
                  link: "/bestiary/custom_items/kalak.md"
                }
              ]
            },
            {
              text: "Прочее",
              items: [
                {
                  text: "Котопедии",
                  link: '/bestiary/custom_items/cotopedia.md'
                },
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
                  text: "Игральные карты",
                  link: '/bestiary/custom_items/cards.md'
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
          text: "Геймплейные",
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
          text: '7 сезон',
          items: [
            {
              text: 'История',
              link: '/history/7season/7season.md'
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