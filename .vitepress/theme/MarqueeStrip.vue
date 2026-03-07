<template>
  <div class="marquee">
    <div class="marquee__fade marquee__fade--l"></div>
    <div class="marquee__fade marquee__fade--r"></div>
    <div class="marquee__track">
      <div class="marquee__item" v-for="(p, i) in doubled" :key="i">
        <img
          :src="`https://cravatar.eu/avatar/${p}/32.png`"
          :alt="p"
          loading="lazy"
          width="32"
          height="32"
        />
        <span>{{ p }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const players = [
  'Szarkan', 'sm1lly', 'Ystika', 'Sibirius', 'dark_moooon',
  'CharaBell', 'Kaban4Ever', 'l_vitek_l', 'TM_Kocherga',
  'artlaks', 'Charanixy', 'Kvar1kc', 'Mrs_Tori', 'Skorohodon'
]
const doubled = [...players, ...players]
</script>

<style scoped>
.marquee {
  position: relative;
  overflow: hidden;
  padding: 22px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(0, 0, 0, 0.15);
}

.marquee__fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}
.marquee__fade--l {
  left: 0;
  background: linear-gradient(90deg, rgba(10, 10, 15, 1) 0%, transparent 100%);
}
.marquee__fade--r {
  right: 0;
  background: linear-gradient(270deg, rgba(10, 10, 15, 1) 0%, transparent 100%);
}

.marquee__track {
  display: flex;
  gap: 40px;
  width: max-content;
  animation: scroll 50s linear infinite;
}

.marquee__track:hover {
  animation-play-state: paused;
}

.marquee__item {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.marquee__item img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  image-rendering: pixelated;
}

.marquee__item span {
  font-size: 0.88rem;
  color: #6b6a78;
  white-space: nowrap;
  font-weight: 500;
  transition: color 0.2s;
}

.marquee__item:hover span {
  color: #a78bfa;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
