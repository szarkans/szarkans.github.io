<template>
  <div>
    <div class="toolbar">
      <button class="sort-btn" @click="toggleSort">
        {{ sortOrder === 'asc' ? '↑ Сначала старые' : '↓ Сначала новые' }}
      </button>
    </div>

    <div class="grid">
      <div
        v-for="(src, i) in visiblePhotos"
        :key="src"
        class="thumb"
        role="button"
        tabindex="0"
        @click="open(i)"
        @keydown.enter="open(i)"
      >
        <img
          :src="src"
          :alt="`Скриншот с ${seasonNumber} сезона Кошкокрафта`"
          loading="lazy"
          decoding="async"
          @load="loadedSrcs.add(src)"
          @error="loadedSrcs.add(src)"
        />

        <div v-if="!loadedSrcs.has(src)" class="placeholder"></div>
      </div>
    </div>

    <button v-if="hasMore" class="show-more" @click="showMore">
      Показать ещё {{ Math.min(PAGE_SIZE, sortedPhotos.length - visibleCount) }} (осталось {{ sortedPhotos.length - visibleCount }})
    </button>

    <VueEasyLightbox
      :visible="visible"
      :imgs="sortedPhotos"
      :index="lightboxIndex"
      @hide="visible = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({ season: { type: String, required: true } })

const modules = import.meta.glob('../../_data/*.json', { eager: true })
const dataMap = Object.fromEntries(
  Object.entries(modules).map(([p, m]) => [p.match(/\/([^/]+)\.json$/)[1], m.default])
)

const photos       = computed(() => dataMap[props.season] || [])
const seasonNumber = computed(() => props.season.replace('season', ''))

const sortOrder    = ref('asc')
const sortedPhotos = computed(() =>
  sortOrder.value === 'asc' ? photos.value : [...photos.value].reverse()
)

const PAGE_SIZE     = 100
const visibleCount  = ref(PAGE_SIZE)
const visiblePhotos = computed(() => sortedPhotos.value.slice(0, visibleCount.value))
const hasMore       = computed(() => visibleCount.value < sortedPhotos.value.length)

// статус загрузки хранится по URL, а не по индексу — не зависит от порядка
const loadedSrcs = reactive(new Set())

// при смене сезона сбрасываем всё; при смене сортировки — только пагинацию
watch(photos, () => {
  loadedSrcs.clear()
  visibleCount.value = PAGE_SIZE
}, { immediate: false })

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  visibleCount.value = PAGE_SIZE
}

function showMore() {
  visibleCount.value = Math.min(visibleCount.value + PAGE_SIZE, sortedPhotos.value.length)
}

const visible       = ref(false)
const lightboxIndex = ref(0)
function open(i) { lightboxIndex.value = i; visible.value = true }
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.sort-btn {
  padding: 6px 14px;
  background: transparent;
  border: 1px solid var(--cc-main);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.85rem;
  min-height: 44px;
  transition: background 0.2s;
}

.sort-btn:hover {
  background: rgba(79, 45, 190, 0.15);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}

.thumb {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
}

.thumb:focus-visible {
  outline: 2px solid var(--cc-main);
  outline-offset: 2px;
}

.thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.thumb img:hover {
  transform: scale(1.05);
}

.placeholder {
  position: absolute;
  inset: 0;
  background: #8c8c8c;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%   { opacity: 1; }
  50%  { opacity: 0.8; }
  100% { opacity: 1; }
}

.show-more {
  display: block;
  margin: 16px auto 0;
  padding: 8px 24px;
  background: transparent;
  border: 1px solid var(--cc-main);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.9rem;
  min-height: 44px;
  transition: background 0.2s;
}

.show-more:hover {
  background: rgba(79, 45, 190, 0.15);
}

@media (max-width: 480px) {
  .sort-btn {
    width: 100%;
  }
}
</style>
