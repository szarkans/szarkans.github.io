import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const contentDirs = ['bestiary', 'gameplay', 'guides', 'history', 'info', 'updates'];

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  }

  return frontmatter;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      results.push(...scanDirectory(fullPath));
    } else if (file.name.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const frontmatter = extractFrontmatter(content);

      if (!frontmatter || !frontmatter.description) {
        const relativePath = path.relative(rootDir, fullPath);
        results.push(relativePath);
      }
    }
  }

  return results;
}

console.log('🔍 Scanning for pages without descriptions...\n');

const missingDescriptions = [];

for (const dir of contentDirs) {
  const dirPath = path.join(rootDir, dir);
  if (fs.existsSync(dirPath)) {
    missingDescriptions.push(...scanDirectory(dirPath));
  }
}

console.log(`📊 Found ${missingDescriptions.length} pages without descriptions:\n`);
missingDescriptions.forEach(file => console.log(`  - ${file}`));
