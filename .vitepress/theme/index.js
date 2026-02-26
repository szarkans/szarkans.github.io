// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'

import Button from 'primevue/button';

import Card from 'primevue/card';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Divider from 'primevue/divider';

import Fieldset from 'primevue/fieldset';

import ImageCompare from 'primevue/imagecompare';

import Galleria from 'primevue/galleria';

import DataView from 'primevue/dataview';

import Tooltip from 'primevue/tooltip';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

import Image from 'primevue/image';

import Tag from 'primevue/tag';

import { Carousel } from 'primevue';

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// MY VUE COMPONENTS
import CardGrid from './CardGrid.vue';
import Spoiler from './Spoiler.vue';
import ItemCard from './ItemCard.vue';
import File from './File.vue';
import ClanLevelCalculator from './ClanLevelCalculator.vue';
import Neon from './Neon.vue';
import Reviews from './Reviews.vue';
import InfoCard from './InfoCard.vue';
import Countdown from './Countdown.vue';
import InlineValue from './InlineValue.vue';
import ImageBlur from './ImageBlur.vue';
import HomeFaq from './HomeFaq.vue';
import Album from './Album.vue';
import HeroSection from './HeroSection.vue';
import NotFound from './NotFound.vue';
//

import VueEasyLightbox from 'vue-easy-lightbox';


import ItemPageLayout from './ItemPageLayout.vue';

import googleAnalytics from 'vitepress-plugin-google-analytics';

import Aura from '@primevue/themes/aura';
import './style.css';
import CraftingGrid from './CraftingGrid.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'not-found': () => h(NotFound),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(PrimeVue, {
      theme: {
        preset: Aura
      }
    }); // Инициализируем PrimeVue
    app.use(googleAnalytics({ id: 'G-X3KCR2ZW65' }));
    enhanceAppWithTabs(app);
    app.component('Button', Button); // Регистрируем компонент Button глобально
    app.component('Card', Card);
    app.component('Tabs', Tabs);
    app.component('TabList', TabList);
    app.component('Tab', Tab);
    app.component('TabPanels', TabPanels);
    app.component('TabPanel', TabPanel);
    app.component('Divider', Divider);
    app.component('ImageCompare', ImageCompare);
    app.component('Fieldset', Fieldset);
    app.component('Galleria', Galleria);
    app.component('DataView', DataView);
    app.component('Accordion', Accordion);
    app.component('AccordionPanel', AccordionPanel);
    app.component('AccordionHeader', AccordionHeader);
    app.component('AccordionContent', AccordionContent);
    app.component('Image', Image);
    app.component('Tag', Tag);
    app.component('Carousel', Carousel);
    app.component('VueEasyLightbox', VueEasyLightbox);
    // MY VUE COMPONENTS
    app.component('Spoiler', Spoiler);
    app.component('CardGrid', CardGrid);
    app.component('ItemCard', ItemCard);
    app.component('File', File);
    app.component('ClanLevelCalculator', ClanLevelCalculator);
    app.component('Neon', Neon);
    app.component('Reviews', Reviews);
    app.component('InfoCard', InfoCard);
    app.component('Countdown', Countdown);
    app.component('InlineValue', InlineValue);
    app.component('ImageBlur', ImageBlur);
    app.component('HomeFaq', HomeFaq);
    app.component('Album', Album);
    app.component('CraftingGrid', CraftingGrid);
    app.component('HeroSection', HeroSection);
    //
    app.directive('tooltip', Tooltip);
  }
};
