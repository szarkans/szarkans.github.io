<template>
  <div class="blur-image-container">
    <img
      :src="src"
      :alt="alt"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      :class="{ 'blurred': !hovered }"
    />
    <div v-if="!hovered" class="blur-image-overlay">
      <div class="blur-image-text">
        <div class="nsfw-title">NSFW</div>
        <div class="nsfw-subtitle">Наведись, чтобы посмотреть</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
});

const hovered = ref(false);
</script>

<style scoped>
.blur-image-container {
  position: relative;
  display: inline-block;
}

.blur-image-container img {
  display: block;
  transition: filter 0.3s ease !important;
  width: 100%;
  height: auto;
}

.blurred {
  filter: blur(12px);
}

.blur-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.5); */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}

.nsfw-title {
  font-size: 2rem;
  font-weight: bold;
}

.nsfw-subtitle {
  font-size: 1rem;
  margin-top: 8px;
}
</style>
