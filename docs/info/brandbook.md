---
icon: material/language-css3
description: Брендбук Кошкокрафта
---

# Брендбук

## Цвета

<div class="grid" markdown>

<div data-clipboard-text="#804feb #4728b6" onclick="copyToClipboard(this)">
    <b>Основной градиент</b><br>#804feb -> #4728b6
    { .card .brand-book-color-gradient .cursor-pointer .margin-center }
</div>

<div data-clipboard-text="#4f2dbe" onclick="copyToClipboard(this)">
    <b>Основной цвет</b><br>#4f2dbe
    { .card .margin-center .cursor-pointer .brand-book-color-main }
</div>

<div data-clipboard-text="#f5f5f5" onclick="copyToClipboard(this)">
    <b>Наш белый</b><br>#f5f5f5
    { .card .margin-center .cursor-pointer .brand-book-color-white }
</div>

<div data-clipboard-text="#101114" onclick="copyToClipboard(this)">
    <b>Наш чёрный</b><br>#101114
    { .card .margin-center .cursor-pointer .brand-book-color-black }
</div>

</div>

## Логотипы

<div class="image-grid">
  <img src="../../assets/icon.png" alt="icon">
  <img src="../../assets/icon_purple.png" alt="icon">
  <img src="../../assets/ava.png" alt="icon">
</div>

[Скачать логотипы](../../assets/logos.rar){ .md-button .md-button--primary .big-button }

## Фоны

### Обычный

![fon](../../assets/fon.png)

### Для донатов

![plashka](../../assets/плашка.png)

<script>
  function copyToClipboard(element) {
    const text = element.getAttribute('data-clipboard-text');
    navigator.clipboard.writeText(text).then(() => {
      console.log('Скопирован цвет: ' + text); 
    }, (err) => {
      console.error('Ошибка копирования цвета: ', err);
    });
  }
</script>