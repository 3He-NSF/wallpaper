const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const width = 390;
  const height = 844;
  const htmlPath = path.resolve(__dirname, 'index.html');
  const outputPath = path.resolve(__dirname, 'wallpaper.png');

  if (!fs.existsSync(htmlPath)) {
    console.error('index.html not found');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.months-grid');
  await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width, height } });
  await browser.close();

  console.log(`Generated ${outputPath}`);
})();
