// Загрузка JSON из public/ в браузере, по одному запросу на адрес.
// Упавшую загрузку не кэшируем, иначе повторить её можно только перезагрузкой.

import { withBase } from 'vitepress'

const cache = new Map()

export function fetchJson(path) {
  if (!cache.has(path)) {
    const p = fetch(withBase(path)).then((r) => {
      if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`)
      return r.json()
    })
    p.catch(() => cache.delete(path))
    cache.set(path, p)
  }
  return cache.get(path)
}
