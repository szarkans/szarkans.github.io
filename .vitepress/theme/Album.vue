<template>
    <div>
      <div class="grid">
        <div
          v-for="(src, i) in photos"
          :key="i"
          class="thumb"
          @click="open(i)"
        >
          <img :src="src" alt="Скриншот" loading="lazy" />
        </div>
      </div>
  
      <VueEasyLightbox
        :visible="visible"
        :imgs="photos"
        :index="index"
        @hide="visible = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vitepress';
  
  // пропс-схема: передаём "1season", "2season" и т.п.
  const props = defineProps({
    season: { type: String, required: true }
  });
  
  // загружаем ВСЕ сгенерированные JSON из _data одним махом
  const modules = import.meta.glob('../../_data/*.json', { eager: true });
  
  // превращаем объект вида { '../../_data/1season.json': { default: […] }, … }
  // в { '1season': […], '2season': […], … }
  const dataMap = Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => {
      const name = path.match(/\/([^\/]+)\.json$/)[1];
      return [name, mod.default];
    })
  );
  
  const photos = computed(() => dataMap[props.season] || []);
  
  const visible = ref(false);
  const index   = ref(0);
  
  function open(i) {
    index.value = i;
    visible.value = true;
  }
  </script>
  
  <style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
  }
  .thumb {
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .2s;
  }
  .thumb img:hover {
    transform: scale(1.05);
  }
  </style>
  