
const fs = require('fs');
const path = require('path');

const GITHUB = 'szarkans/catcraft-album';
const BRANCH = 'main';

const PREFIX = `https://cdn.jsdelivr.net/gh/${GITHUB}@${BRANCH}/`;

const IMAGES_ROOT = path.resolve(__dirname, '..', '..', 'catcraft-album');

const DATA_DIR = path.resolve(__dirname, '..', '_data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const entries = fs.readdirSync(IMAGES_ROOT, { withFileTypes: true });
const seasons = entries.filter(e => e.isDirectory()).map(e => e.name);

if (seasons.length === 0) {
  console.warn('⚠️ Не найдено ни одной подпапки-сезона.');
}

seasons.forEach(season => {
  const folder = path.join(IMAGES_ROOT, season);


  const files = fs.readdirSync(folder)
    .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort();

  const urls = files.map(f => `${PREFIX}${season}/${encodeURIComponent(f)}`);

  const outFile = path.join(DATA_DIR, `${season}.json`);
  fs.writeFileSync(outFile, JSON.stringify(urls, null, 2), 'utf8');

  console.log(`✅ ${season}: ${urls.length} файлов → ${outFile}`);
});

console.log('🎉 Все манифесты сезонов сгенерированы.');
