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

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// MY VUE COMPONENTS
import CardGrid from './CardGrid.vue';
import Spoiler from './Spoiler.vue';
import BanList from './BanList.vue';
import ItemCard from './ItemCard.vue';
import File from './File.vue';
// 

import ItemPageLayout from './ItemPageLayout.vue';

import Aura from '@primevue/themes/aura';
import './style.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(PrimeVue, {
      theme: {
        preset: Aura
      }
    }); // Инициализируем PrimeVue
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
    // MY VUE COMPONENTS
    app.component('Spoiler', Spoiler);
    app.component('CardGrid', CardGrid);
    app.component('BanList', BanList);
    app.component('ItemCard', ItemCard);
    app.component('File', File);
    // 
    app.directive('tooltip', Tooltip);
  }
};
