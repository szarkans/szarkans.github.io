<template>
  <div>
    <div class="grid">
      <div
        v-for="(src, i) in photos"
        :key="i"
        class="thumb"
        @click="open(i)"
      >
        <!-- само изображение -->
        <img
          :src="src"
          loading="lazy"
          decoding="async"
          @load="onLoad(i)"
        />

        <!-- скелетон-заглушка поверх картинки -->
        <div v-if="!loaded[i]" class="placeholder"></div>
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
import { ref, computed, watchEffect } from 'vue'

const props = defineProps({ season: { type: String, required: true } })

// импортируем все JSON-манифесты
const modules = import.meta.glob('../../_data/*.json', { eager: true })
const dataMap = Object.fromEntries(
  Object.entries(modules).map(([p, m]) => [p.match(/\/([^/]+)\.json$/)[1], m.default])
)

const photos  = computed(() => dataMap[props.season] || [])
const loaded  = ref([])

// при первой загрузке и при смене сезона — сбрасываем loaded
watchEffect(() => { loaded.value = photos.value.map(() => false) })

function onLoad(i) { loaded.value[i] = true }

const visible = ref(false)
const index   = ref(0)
function open(i) { index.value = i; visible.value = true }
</script>

<style>
/* сетка изображений */
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:8px; }

/* каждая ячейка фиксирована 1:1, чтобы не прыгал лейаут */
.thumb { position:relative; aspect-ratio:1/1; overflow:hidden; border-radius:4px; cursor:pointer; }
.thumb img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .2s; }
.thumb img:hover { transform:scale(1.05); }

/* скелетон-плейсхолдер */
.placeholder {
  position:absolute; inset:0;
  background:#8c8c8c;
  animation:pulse 2s infinite ease-in-out;
}
@keyframes pulse {
  0%{opacity:1;} 
  50%{opacity:.8;} 
  100%{opacity:1;}
}
</style>
