// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';

import Card from 'primevue/card';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Divider from 'primevue/divider'

import './style.css';
import Aura from '@primevue/themes/aura';

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
    app.component('Button', Button); // Регистрируем компонент Button глобально
    app.component('Card', Card);
    app.component('Tabs', Tabs);
    app.component('TabList', TabList);
    app.component('Tab', Tab);
    app.component('TabPanels', TabPanels);
    app.component('TabPanel', TabPanel);
    app.component('Divider', Divider);
  }
};
