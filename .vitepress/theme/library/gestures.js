// Ширина полки и свайп пальцем: полка и читалка.

import { onBeforeUnmount, onMounted, ref } from 'vue'

// Внутренняя ширина элемента (без padding), следит за ресайзом.
export function useWidth(elRef) {
  const width = ref(0)
  let ro
  onMounted(() => {
    ro = new ResizeObserver(([e]) => { width.value = Math.floor(e.contentRect.width) })
    if (elRef.value) ro.observe(elRef.value)
  })
  onBeforeUnmount(() => ro?.disconnect())
  return width
}

// Горизонтальный свайп пальцем: влево — вперёд (+1), вправо — назад (−1).
// Клик, которым браузер заканчивает свайп, гасится, чтобы не открыть книгу.
export function useSwipe(onSwipe) {
  let start = null
  let swallow = false
  let timer
  return {
    down(e) {
      start = e.pointerType === 'mouse' ? null : { x: e.clientX, y: e.clientY }
    },
    up(e) {
      if (!start) return
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      start = null
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swallow = true
        clearTimeout(timer)
        timer = setTimeout(() => { swallow = false }, 350)
        onSwipe(dx < 0 ? 1 : -1)
      }
    },
    click(e) {
      if (!swallow) return
      swallow = false
      e.stopPropagation()
      e.preventDefault()
    },
  }
}
