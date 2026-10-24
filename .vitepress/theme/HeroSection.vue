<template>
  <section class="home-hero">
    <div class="home-hero__copy">
      <h1>Лучший. Кошачий. <span class="glitch" ref="glitch"><span v-for="(ch, i) in 'Навсегда!'" :key="i">{{ ch }}</span></span></h1>
      <p>Сервер-песочница с обилием новых механик и уклоном в сторону РПГ со всеми его вытекающими!</p>
      <div class="home-hero__actions">
        <a class="home-button cc-primary-button" href="/history/">Читать историю</a>
        <a class="home-button home-button--secondary" href="https://discord.gg/6f3FwFRJWC" target="_blank" rel="noopener">Discord</a>
      </div>
    </div>

    <article class="server-card">
      <div class="server-card__head">
        <img src="/favicon.png" alt="Кошкокрафт" width="52" height="52" />
        <div class="server-card__name">
          <strong>Кошкокрафт</strong>
          <span>Java Edition</span>
        </div>
        <div class="server-card__status">
          <span class="server-card__dot"></span>
          <span>на паузе</span>
        </div>
      </div>
      <a class="ip-copy" href="/history/">
        <strong>8 сезонов · 2021–2026</strong><span>скачать миры →</span>
      </a>
      <p>Новости первыми — в <a href="https://discord.gg/6f3FwFRJWC" target="_blank" rel="noopener">Discord</a></p>
    </article>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Омаж закрытию сервера: «Навсегда!» изредка едва заметно сбоит.
const glitch = ref(null)
let timer

function tick() {
  const letters = [...glitch.value.children]
  const picked = letters.filter(() => Math.random() < 0.3)
  for (const el of picked) {
    el.style.top = `${Math.round(Math.random() * 6 - 3)}px`
    el.style.left = `${Math.round(Math.random() * 4 - 2)}px`
  }
  setTimeout(() => picked.forEach(el => { el.style.top = el.style.left = '' }), 60 + Math.random() * 90)
  timer = setTimeout(tick, 1800 + Math.random() * 4500)
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setTimeout(tick, 2500)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.home-hero { display:grid; grid-template-columns:1fr 420px; gap:56px; align-items:center; }
.home-hero__copy { display:flex; flex-direction:column; gap:20px; }
.home-hero h1 { margin:0; max-width:650px; border:0; background:linear-gradient(100deg,#fff 20%,#c299e5 90%); background-clip:text; color:transparent; font:900 58px/1.04 'Unbounded',sans-serif; letter-spacing:-1px; text-shadow:none; }
.glitch span { position:relative; }
.home-hero__copy > p { max-width:520px; margin:0; color:#9a94ab; font-size:18px; line-height:1.6; }
.home-hero__actions { display:flex; gap:12px; }
.home-button { display:inline-flex; align-items:center; justify-content:center; padding:13px 28px; border-radius:12px; color:#fff; font-size:16px; font-weight:600; text-decoration:none; transition:.2s ease; }
.home-button--secondary { padding-inline:24px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.06); color:#d0d0e0; }
.home-button--secondary:hover { background:rgba(255,255,255,.12); color:#fff; }
.server-card { display:flex; flex-direction:column; gap:14px; padding:20px 22px; border:1px solid rgba(255,255,255,.08); border-radius:16px; background:#1c1826; }
.server-card__head { display:flex; align-items:center; gap:14px; }
.server-card__head img { image-rendering:pixelated; }
.server-card__name { display:flex; flex:1; flex-direction:column; gap:4px; min-width:0; }
.server-card__name strong { font-size:17px; }
.server-card__name span,.server-card > p { color:#9a94ab; font-size:13.5px; }
.server-card__status { display:flex; align-items:center; gap:7px; font-size:13.5px; font-weight:600; white-space:nowrap; }
.server-card__dot { width:9px; height:9px; border-radius:50%; background:#facc15; box-shadow:0 0 10px #facc15; }
.ip-copy { display:flex; text-decoration:none; align-items:center; justify-content:space-between; padding:14px 16px; border:1px dashed rgba(255,255,255,.18); border-radius:10px; background:#0f0d14; color:#e8e7f0; cursor:pointer; font-family:'Rubik',sans-serif; }
.ip-copy:hover { border-color:#8758f3; }
.ip-copy strong { color:#e8e7f0; font-size:16px; font-weight:600; white-space:nowrap; }
.ip-copy span { color:#a67cf5; font-size:13px; font-weight:600; white-space:nowrap; }
.ip-copy { flex-wrap:wrap; gap:6px 12px; }
.server-card > p { margin:0; }
.server-card > p a { color:#c4b5fd; font-weight:600; }
@media (max-width:900px) { .home-hero { grid-template-columns:1fr; } .home-hero h1 { font-size:clamp(38px,8vw,58px); } }
@media (max-width:560px) { .home-hero__actions { flex-wrap:wrap; } .server-card__head { flex-wrap:wrap; } .server-card__status { width:100%; } }
</style>
