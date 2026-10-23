<template>
  <section class="wiki-hub">
    <header class="wiki-hub__head">
      <span>Вся вики</span>
      <button class="hub-search" type="button" aria-label="Открыть поиск по вики" @click="openSearch">
        <span>Поиск</span>
        <svg class="hub-search__lens" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        <kbd>Ctrl K</kbd>
      </button>
    </header>

    <div class="wiki-hub__body">
      <div class="hub-start">
        <h2>С чего начать</h2>
        <a v-for="item in startItems" :key="item.link" :href="hrefOf(item.link)">{{ item.text }}</a>
      </div>

      <div class="hub-column">
        <h2>Механики · {{ mechanicsCount }}</h2>
        <div v-for="group in mechanicsGroups" :key="group.text" class="hub-group">
          <h3>{{ group.text }}</h3>
          <a v-for="item in visibleItems(group, MECHANICS_CAP, mechanicsUncapped)" :key="item.link" class="hub-row" :href="hrefOf(item.link)">
            <img v-if="item.icon" :src="withBase(item.icon)" alt="" /><span>{{ item.text }}</span>
          </a>
          <button v-if="hiddenCount(group, MECHANICS_CAP, mechanicsUncapped)" class="hub-chip hub-chip--more" type="button" :aria-expanded="isExpanded(group)" @click="toggleGroup(group)">
            <span class="hub-expand__chevron" :class="{ 'is-open': isExpanded(group) }">▸</span>
            {{ isExpanded(group) ? 'свернуть' : `ещё ${hiddenCount(group, MECHANICS_CAP, mechanicsUncapped)}` }}
          </button>
        </div>
      </div>

      <div class="hub-column">
        <h2>Бестиарий · {{ bestiaryCount }}</h2>
        <div v-for="group in bestiaryGroups" :key="group.text" class="hub-group hub-group--chips">
          <h3>{{ group.text }}</h3>
          <div>
            <a v-for="item in visibleItems(group, BESTIARY_CAP, bestiaryUncapped)" :key="item.link" class="hub-chip" :href="hrefOf(item.link)">
              <img v-if="item.icon" :src="withBase(item.icon)" alt="" /><span>{{ item.text }}</span>
            </a>
            <button v-if="hiddenCount(group, BESTIARY_CAP, bestiaryUncapped)" class="hub-chip hub-chip--more" type="button" :aria-expanded="isExpanded(group)" @click="toggleGroup(group)">
              <span class="hub-expand__chevron" :class="{ 'is-open': isExpanded(group) }">▸</span>
              {{ isExpanded(group) ? 'свернуть' : `ещё ${hiddenCount(group, BESTIARY_CAP, bestiaryUncapped)}` }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <nav class="hub-exits" aria-label="Полные разделы вики">
      <a class="hub-exit cc-pill" href="/info/faq">
        <img src="/assets/info/brandbook/paw_white.svg" alt="" />
        <span>Все статьи</span>
        <span class="hub-exit__arrow">→</span>
      </a>
      <a class="hub-exit cc-pill" href="/gameplay/main">
        <img src="/assets/info/brandbook/paw_white.svg" alt="" />
        <span>Все механики</span>
        <span class="hub-exit__arrow">→</span>
      </a>
      <a class="hub-exit cc-pill" href="/bestiary/main">
        <img src="/assets/info/brandbook/paw_white.svg" alt="" />
        <span>Весь бестиарий</span>
        <span class="hub-exit__arrow">→</span>
      </a>
    </nav>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { sidebarsBySection } from '../sidebars.js'

const MECHANICS_CAP = 5
const BESTIARY_CAP = 4
const mechanicsUncapped = ['Чем заняться', 'Изменения ваниллы']
const bestiaryUncapped = ['Разное']
const expandedGroups = ref({})
const hrefOf = link => withBase(String(link).replace(/\.md$/, ''))

const startItems = [
  { text:'Частые вопросы', link:'/info/faq.md' },
  { text:'Правила', link:'/info/rules/rules' }, { text:'Законы', link:'/info/rules/laws' },
  { text:'Моды для сервера', link:'/info/mods.md' }, { text:'Администрация', link:'/info/admins' },
]

const groupsOf = section => (sidebarsBySection[section] ?? []).filter(group => group.items?.length)
function requireGroup(groups, name) {
  const group = groups.find(candidate => candidate.text === name)
  if (!group) throw new Error(`WikiHub: expected sidebar group "${name}" was not found`)
  return group
}
const mechanicsGroups = computed(() => {
  const groups = groupsOf('mechanics')
  return ['Чем заняться','Общие механики','Изменения ваниллы'].map(name => requireGroup(groups, name))
})
const bestiaryGroups = computed(() => {
  const groups = groupsOf('bestiary')
  const instruments = requireGroup(groups, 'Инструменты')
  const items = requireGroup(groups, 'Предметы')
  const misc = requireGroup(groups, 'Разное')
  const blocks = requireGroup(groups, 'Блоки')
  return [instruments, items, { ...misc, items:[...misc.items, ...blocks.items] }]
})
const mechanicsCount = computed(() => mechanicsGroups.value.reduce((sum, group) => sum + group.items.length, 0))
const bestiaryCount = computed(() => bestiaryGroups.value.reduce((sum, group) => sum + group.items.length, 0))

function groupKey(group) {
  return `${group.text}:${group.items[0]?.link ?? ''}`
}
function isExpanded(group) {
  return Boolean(expandedGroups.value[groupKey(group)])
}
function toggleGroup(group) {
  const key = groupKey(group)
  expandedGroups.value[key] = !expandedGroups.value[key]
}
function isUncapped(group, uncappedNames) {
  return uncappedNames.includes(group.text)
}
function visibleItems(group, cap, uncappedNames) {
  return isExpanded(group) || isUncapped(group, uncappedNames) ? group.items : group.items.slice(0, cap)
}
function hiddenCount(group, cap, uncappedNames) {
  return isUncapped(group, uncappedNames) ? 0 : Math.max(0, group.items.length - cap)
}
function openSearch() {
  const nativeSearch = document.querySelector('#local-search button')
  if (nativeSearch instanceof HTMLElement) {
    nativeSearch.click()
    return
  }
  window.dispatchEvent(new KeyboardEvent('keydown', { key:'k', code:'KeyK', ctrlKey:true, bubbles:true }))
}
</script>

<style scoped>
.wiki-hub { overflow:hidden; border:1px solid rgba(255,255,255,.08); border-radius:16px; background:#1c1826; }
.wiki-hub__head { display:flex; align-items:center; gap:16px; padding:18px 28px; border-bottom:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.02); }
.wiki-hub__head > span,.wiki-hub h2 { color:#c4b5fd; font-size:12px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; }
.hub-search { display:flex; flex:1; align-items:center; justify-content:space-between; gap:16px; min-width:0; padding:11px 12px 11px 16px; border:1px solid rgba(255,255,255,.1); border-radius:10px; outline:0; background:#0f0d14; color:#9a94ab; font:15px 'Rubik',sans-serif; text-align:left; cursor:pointer; }
.hub-search:hover,.hub-search:focus-visible { border-color:#8758f3; color:#c9c4d8; }
.hub-search > span { flex:0 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.hub-search__lens { flex:0 0 auto; margin-right:auto; opacity:.75; }
.hub-search kbd { flex:0 0 auto; padding:3px 7px; border:1px solid rgba(255,255,255,.1); border-radius:6px; background:rgba(255,255,255,.04); color:#605a72; font:500 11px 'Rubik',sans-serif; white-space:nowrap; }
.wiki-hub__body { display:grid; grid-template-columns:1fr 1.1fr 1.3fr; gap:36px; padding:26px 32px 30px; }
.wiki-hub h2 { margin:0; border:0; color:#7c3aed; font-family:'Rubik',sans-serif; }
.hub-start { display:flex; flex-direction:column; gap:4px; }
.hub-start h2 { padding-bottom:8px; }
.hub-start a,.hub-row { padding:5px 8px; border-radius:8px; color:#c9c4d8; font-size:15px; text-decoration:none; }
.hub-start a:hover,.hub-row:hover { background:#2d0a5f; box-shadow:inset 0 0 0 2px #5b21b6; color:#fff; }
.hub-column { display:flex; min-width:0; flex-direction:column; gap:16px; }
.hub-group { display:flex; min-width:0; flex-direction:column; gap:2px; }
.hub-group h3 { margin:0 0 4px; border:0; color:#605a72; font:600 12.5px/1.4 'Rubik',sans-serif; }
.hub-row { display:flex; align-items:center; gap:9px; padding-block:4px; }
.hub-row img,.hub-chip img { width:20px; height:20px; object-fit:contain; image-rendering:pixelated; }
.hub-group:not(.hub-group--chips) .hub-chip--more { align-self:flex-start; margin-top:6px; }
.hub-expand__chevron { display:inline-block; transition:transform .2s ease; }
.hub-expand__chevron.is-open { transform:rotate(90deg); }
.hub-group--chips { gap:8px; }
.hub-group--chips > div { display:flex; min-width:0; flex-wrap:wrap; gap:8px; }
.hub-chip { display:flex; align-items:center; gap:7px; max-width:100%; padding:6px 13px 6px 8px; border:1px solid rgba(255,255,255,.1); border-radius:999px; background:#0f0d14; color:#c9c4d8; font:14px 'Rubik',sans-serif; text-decoration:none; }
.hub-chip span { overflow-wrap:anywhere; }
.hub-chip:hover { border-color:#8758f3; color:#fff; }
.hub-chip--more { padding-inline:14px; border-style:dashed; border-color:rgba(166,124,245,.4); background:transparent; color:#a67cf5; cursor:pointer; }
.hub-exits { display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin:0 32px 30px; padding-top:24px; border-top:1px solid rgba(255,255,255,.06); }
.hub-exit { max-width:100%; min-height:44px; }
.hub-exit__arrow { color:#a67cf5; transition:color .18s,transform .18s; }
.hub-exit:hover { color:#fff!important; }
.hub-exit:hover .hub-exit__arrow { color:#fff; transform:translateX(3px); }
@media (max-width:900px) { .wiki-hub__body { grid-template-columns:1fr 1fr; } .hub-start { grid-column:1/-1; } }
@media (max-width:760px) { .wiki-hub__head { align-items:stretch; flex-direction:column; padding:18px 20px; } .hub-search { width:100%; min-height:44px; } .wiki-hub__body { grid-template-columns:minmax(0,1fr); padding:24px 20px; } .hub-start { grid-column:auto; } .hub-start a,.hub-row,.hub-chip,.hub-exit { min-height:42px; } .hub-start a { display:flex; align-items:center; } .hub-row { padding-block:9px; } .hub-chip { padding-block:11px; } .hub-chip--more { padding-block:9px; font-size:14px; } .hub-exits { margin:0 20px 24px; } }
@media (pointer:coarse) { .hub-search kbd { display:none; } }
</style>
