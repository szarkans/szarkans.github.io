import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── НАСТРОЙКИ ───────────────────────────────────────────────────────────────

// Корень проекта. Для другого репозитория замени на абсолютный путь:
// const PROJECT_ROOT = '/path/to/other/repo';
const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Директории с изображениями (относительно PROJECT_ROOT)
const IMAGE_DIRS = ['assets', 'public'];

// Директории для полного пропуска
const SKIP_DIRS = ['node_modules', '.vitepress/dist', '.vitepress/cache', 'vibecode'];

// Конкретные файлы для пропуска (критически важные)
const SKIP_FILES = new Set([
  'public/favicon.png',
  'public/og-image.png',
  'public/icon_purple.png',
]);

// Расширения исходных форматов
const SRC_EXTS = new Set(['.png', '.jpg', '.jpeg']);

// Расширения файлов для обновления ссылок
const CONTENT_EXTS = new Set(['.md', '.vue']);

// Качество WebP по размеру файла:
//   < 10KB  → lossless (пиксель-арт иконки)
//   10–100KB → quality 85
//   > 100KB  → quality 82 (скриншоты/фото)
const TINY_THRESHOLD  = 10  * 1024;
const SMALL_THRESHOLD = 100 * 1024;

function webpOpts(sizeBytes) {
  if (sizeBytes < TINY_THRESHOLD)  return { lossless: true };
  if (sizeBytes < SMALL_THRESHOLD) return { quality: 85 };
  return { quality: 82 };
}

// ─────────────────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE   = args.includes('--force');

const toRel = (p) => path.relative(PROJECT_ROOT, p).replace(/\\/g, '/');

function shouldSkipDir(absPath) {
  const r = toRel(absPath);
  return SKIP_DIRS.some(d => r === d || r.startsWith(d + '/'));
}

function shouldSkipFile(absPath) {
  return SKIP_FILES.has(toRel(absPath));
}

// Рекурсивный обход директории
function walk(dir, predicate) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!shouldSkipDir(full)) results.push(...walk(full, predicate));
    } else if (entry.isFile() && predicate(full)) {
      results.push(full);
    }
  }
  return results;
}

// ── Шаг 1: Конвертация ───────────────────────────────────────────────────────

async function convertImages() {
  console.log('📸 Шаг 1: Конвертация изображений\n');

  const images = IMAGE_DIRS.flatMap(d =>
    walk(path.join(PROJECT_ROOT, d), f =>
      SRC_EXTS.has(path.extname(f).toLowerCase()) && !shouldSkipFile(f)
    )
  );

  let converted = 0, skipped = 0, errors = 0, totalSaved = 0;

  for (const src of images) {
    const ext  = path.extname(src).toLowerCase();
    const dest = src.slice(0, -ext.length) + '.webp';

    if (fs.existsSync(dest) && !FORCE) {
      skipped++;
      continue;
    }

    const stat = fs.statSync(src);
    const opts = webpOpts(stat.size);
    const label = opts.lossless ? 'lossless' : `q${opts.quality}`;

    if (DRY_RUN) {
      console.log(`  → ${toRel(src)}  [${label}]`);
      converted++;
      continue;
    }

    try {
      await sharp(src).webp(opts).toFile(dest);

      const destStat = fs.statSync(dest);
      if (destStat.size === 0) throw new Error('Выходной файл пуст');

      const saved = stat.size - destStat.size;
      totalSaved += saved;
      const pct = Math.round((1 - destStat.size / stat.size) * 100);
      console.log(`  ✓ ${toRel(src)} → .webp  [${pct}% меньше, -${Math.round(saved / 1024)}KB]`);

      fs.unlinkSync(src);
      converted++;
    } catch (err) {
      console.error(`  ✗ ${toRel(src)}: ${err.message}`);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      errors++;
    }
  }

  const savedMB = (totalSaved / 1024 / 1024).toFixed(1);
  console.log(`\nИтого: конвертировано ${converted}, пропущено ${skipped}, ошибок ${errors}`);
  if (!DRY_RUN && converted > 0) console.log(`Освобождено: ~${savedMB}MB\n`);
  else console.log();
}

// ── Шаг 2: Обновление ссылок ─────────────────────────────────────────────────

function isExternal(p) {
  return p.startsWith('http://') || p.startsWith('https://') || p.startsWith('//');
}

// Возвращает обновлённый путь (с .webp) если файл существует, иначе null
function resolveWebp(contentFile, imgPath) {
  const ext = path.extname(imgPath).toLowerCase();
  const webpRelPath = imgPath.slice(0, -ext.length) + '.webp';

  if (imgPath.startsWith('/')) {
    // Абсолютный путь от корня сайта.
    // VitePress отдаёт файлы из `public/` напрямую с корня,
    // поэтому проверяем оба места на диске.
    const candidates = [
      path.join(PROJECT_ROOT, webpRelPath),
      path.join(PROJECT_ROOT, 'public', webpRelPath),
    ];
    if (candidates.some(p => fs.existsSync(p))) return webpRelPath;
    return null;
  }

  // Относительный путь от файла
  const absWebp = path.resolve(path.dirname(contentFile), webpRelPath);
  return fs.existsSync(absWebp) ? webpRelPath : null;
}

function updateReferences() {
  console.log('🔗 Шаг 2: Обновление ссылок в .md и .vue\n');

  const files = walk(PROJECT_ROOT, f => CONTENT_EXTS.has(path.extname(f).toLowerCase()));

  let updatedFiles = 0, totalReplaces = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf-8');
    let updated = original;
    let count = 0;

    // Markdown: ![alt](path.png) и ![alt](path.png){ attrs }
    updated = updated.replace(
      /(\!\[[^\]]*\]\()([^)]+\.(png|jpg|jpeg))(\))/gi,
      (match, pre, imgPath, _ext, post) => {
        if (isExternal(imgPath)) return match;
        const webp = resolveWebp(file, imgPath);
        if (!webp) return match;
        count++;
        return pre + webp + post;
      }
    );

    // HTML/Vue: src="path.png", src='path.jpg', href="path.png"
    updated = updated.replace(
      /((?:src|href)=["'])([^"']+\.(png|jpg|jpeg))(["'])/gi,
      (match, attrOpen, imgPath, _ext, quote) => {
        if (isExternal(imgPath)) return match;
        const webp = resolveWebp(file, imgPath);
        if (!webp) return match;
        count++;
        return attrOpen + webp + quote;
      }
    );

    if (count > 0) {
      if (DRY_RUN) {
        console.log(`  → ${toRel(file)}  (${count} замен)`);
      } else {
        fs.writeFileSync(file, updated, 'utf-8');
        console.log(`  ✓ ${toRel(file)}  (${count} замен)`);
      }
      totalReplaces += count;
      updatedFiles++;
    }
  }

  console.log(`\nИтого: обновлено ${updatedFiles} файлов, ${totalReplaces} замен`);
}

// ── Точка входа ───────────────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) console.log('🔍 Режим --dry-run: изменения не вносятся\n');
  if (FORCE)   console.log('⚡ Режим --force: существующие .webp будут перезаписаны\n');

  await convertImages();
  updateReferences();

  if (!DRY_RUN) console.log('\n✅ Готово!');
}

main().catch(err => {
  console.error('\n💥 Ошибка:', err.message);
  process.exit(1);
});
