const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

async function downloadImage(page, url, savePath) {
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) {
      console.log(`❌ Failed to fetch: ${url}`);
      return false;
    }
    const buffer = await response.body();
    await fs.outputFile(savePath, buffer);
    console.log(`✅ Saved: ${savePath}`);
    return true;
  } catch (err) {
    console.error(`❌ Error downloading ${url}:`, err.message);
    return false;
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Read Airbnb JSON file
  const listings = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'airbnb_listings_updated.json'), 'utf8')
  );

  for (const listing of listings) {
    if (!listing.photos || listing.photos.length <= 1) continue;

    const folder = path.join(__dirname, 'downloaded_images', listing.id);
    await fs.ensureDir(folder);

    // skip first logo image
    const photos = listing.photos.slice(1, 9);

    for (let i = 0; i < photos.length; i++) {
      const url = photos[i];
      const ext = path.extname(new URL(url).pathname) || '.jpg';
      const savePath = path.join(folder, `${i + 1}${ext}`);
      await downloadImage(page, url, savePath);
    }
  }

  await browser.close();
})();
