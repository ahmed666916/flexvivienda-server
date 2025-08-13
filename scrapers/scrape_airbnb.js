// Run (PowerShell):
//   del urls.json; del airbnb_listings.json
//   $env:BROWSER="chromium"; $env:PERSISTENT="false"; $env:HEADLESS="false"
//   $env:HOST_URL="https://www.airbnb.com/users/show/518502780"
//   node scrape_airbnb.js

const fs = require('fs');
const path = require('path');
const { chromium, firefox, webkit, devices } = require('playwright');

/* ------------ config ------------ */
const BROWSER     = (process.env.BROWSER || 'chromium').toLowerCase(); // chromium | firefox | webkit
const PERSISTENT  = process.env.PERSISTENT === 'true';
const PROFILE_DIR = process.env.PROFILE_DIR || null;
const HEADLESS    = process.env.HEADLESS !== 'false';
const HOST_URL    = process.env.HOST_URL || 'https://www.airbnb.com/users/show/518502780';
const CONCURRENCY = Number(process.env.CONCURRENCY || 2);

const OUT_URLS = path.resolve('./urls.json');
const OUT_DATA = path.resolve('./airbnb_listings.json');

const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
const uniq  = (arr)=>Array.from(new Set(arr));
const rdelay = async (min=500,max=1200)=>sleep(Math.floor(Math.random()*(max-min+1))+min);

function pickBrowser(){
  if (BROWSER==='firefox')  return firefox;
  if (BROWSER==='webkit')   return webkit;
  return chromium;
}

function normalizeRoomUrl(u){
  try{
    const url = new URL(u, 'https://www.airbnb.com');
    if (!/\/rooms\/\d+/.test(url.pathname)) return null;
    url.search = '';
    return url.toString();
  }catch{ return null; }
}
const roomId = (u)=>(String(u).match(/\/rooms\/(\d+)/)||[])[1]||null;

/* ------------ launch ------------ */
async function launchContext(){
  const browserType = pickBrowser();
  if (PERSISTENT) {
    if (!PROFILE_DIR) throw new Error('PERSISTENT=true but PROFILE_DIR not set.');
    const context = await browserType.launchPersistentContext(PROFILE_DIR, { headless: HEADLESS });
    return { context, browser: null };
  }
  const browser = await browserType.launch({ headless: HEADLESS });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: devices['Desktop Chrome'].userAgent,
  });
  return { context, browser };
}

/* ------------ helpers ------------ */
async function acceptCookies(page){
  const sels = [
    'button[aria-label*="Accept"]',
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    'button:has-text("I agree")',
    'button:has-text("Got it")',
  ];
  for (const s of sels) {
    const el = await page.$(s).catch(()=>null);
    if (el) { await el.click().catch(()=>{}); break; }
  }
}

const extractLinks = async (root) => {
  const hrefs = await root.evaluate(node => {
    const A = node.querySelectorAll('a[href*="/rooms/"], a[data-testid="listing-card-link"]');
    return Array.from(A).map(a=>a.href).filter(Boolean);
  });
  return uniq(hrefs.map(normalizeRoomUrl).filter(Boolean));
};

/* ------------ Phase 1: collect URLs ------------ */
async function collectAllUrls(context){
  const page = await context.newPage();
  await page.goto(HOST_URL, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(()=>{});
  await acceptCookies(page);
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(()=>{});

  // helper: locate the listings section on the profile page
  const listingsSection = page.locator(':is(section,div):has(h2:has-text("listings"))').first();

  // 1) Try to open the modal ("View all 126 listings")
  const viewAll = listingsSection.locator(':is(a,button):has-text("View all")');
  if (await viewAll.count()) {
    await viewAll.first().click({ timeout: 10000 }).catch(()=>{});
    // wait for dialog or content to render
    const dialog = page.locator('div[role="dialog"]').first();
    await dialog.waitFor({ state:'visible', timeout: 15000 }).catch(()=>{});

    if (await dialog.count()) {
      // Wait for the grid inside dialog to appear (cards container)
      await dialog.locator(':is(a,div) :text("Entire home")').first().waitFor({ state:'visible', timeout: 8000 }).catch(()=>{});
      // paginate: click "Show more listings" until no growth
      let total = new Set(await extractLinks(await dialog.elementHandle()));
      console.log(`modal: collected ${total.size}`);

      for (let round = 1; round <= 60; round++) {
        const btn = dialog.locator(':is(button,a):has-text("Show more listings")').first();
        if (!(await btn.count()) || !(await btn.isVisible().catch(()=>false))) break;

        const before = total.size;
        await Promise.all([
          btn.click().catch(()=>{}),
          page.waitForTimeout(500), // let it render
        ]);

        // Wait briefly for new cards to mount, then harvest
        for (let i=0; i<10; i++){
          await page.waitForTimeout(400);
          const now = await extractLinks(await dialog.elementHandle());
          now.forEach(u => total.add(u));
          if (total.size > before) break;
        }
        console.log(`  modal round ${round}: ${total.size}`);
        if (total.size === before) break;
      }

      const urls = Array.from(total);
      fs.writeFileSync('debug_buttons.txt', (await dialog.locator(':is(button,a)').allInnerTexts()).join('\n'));
      fs.writeFileSync('debug_host.html', await page.content());
      await page.close();
      return urls;
    }
  }

  // 2) Fallback: collect from the profile grid and try the carousel arrows
  console.log('Using carousel fallback…');
  let urls = new Set(await extractLinks(await listingsSection.elementHandle()));
  console.log(`  carousel: collected ${urls.size}`);

  // try clicking next chevron a bunch of times
  const nextBtn = listingsSection.locator(':is(button,a)[aria-label*="Next"], :is(button,a):has(svg)');
  for (let i=1; i<=30; i++){
    if (!(await nextBtn.count())) break;
    await nextBtn.first().click().catch(()=>{});
    await page.waitForTimeout(700);
    const now = await extractLinks(await listingsSection.elementHandle());
    now.forEach(u => urls.add(u));
    console.log(`  carousel click ${i}: total=${urls.size}`);
  }

  fs.writeFileSync('debug_buttons.txt', (await page.locator(':is(button,a)').allInnerTexts()).join('\n'));
  fs.writeFileSync('debug_host.html', await page.content());

  await page.close();
  return Array.from(urls);
}

/* ------------ Phase 2: scrape each room ------------ */
async function scrapeRoom(context, url){
  const page = await context.newPage();
  try{
    await page.goto(url, { waitUntil:'domcontentloaded', timeout:60000 });
    await acceptCookies(page);
    await page.waitForLoadState('networkidle', { timeout: 45000 }).catch(()=>{});

    // expand "Show more"
    const expanders = await page.$$('button:has-text("Show more"), a:has-text("Show more")');
    for (const b of expanders){ await b.click().catch(()=>{}); await rdelay(200,600); }

    const title = (await page.locator('h1').first().textContent().catch(()=>null))?.trim() || null;

    const priceText =
      await page.locator('[data-testid="book-it-default"] >> :text-matches("US\\$|\\€|\\£|₺|\\$")').first().textContent().catch(()=>null)
      || await page.locator(':text-matches("US\\$|\\€|\\£|₺|\\$")').first().textContent().catch(()=>null);

    const metaLine = await page.locator('div:has-text("guest"):has-text("bed")').first().textContent().catch(()=>null);

    const description =
      await page.locator('[data-section-id="DESCRIPTION"] div, section:has(h2:has-text("About")) p')
        .first().textContent().catch(()=>null);

    // coordinates from inline JSON
    let lat=null,lng=null;
    try{
      const html = await page.content();
      const m = html.match(/"lat":\s*([0-9.\-]+)\s*,\s*"lng":\s*([0-9.\-]+)/);
      if(m){ lat=parseFloat(m[1]); lng=parseFloat(m[2]); }
    }catch{}

    const amenities = await page.$$eval(
      '[data-section-id="AMENITIES"] li, div:has-text("What this place offers") ~ div li',
      lis => lis.map(li=>li.textContent.trim()).filter(Boolean)
    ).catch(()=>[]);

    const photos = await page.$$eval('img', imgs=>{
      const set=new Set(), out=[];
      for(const img of imgs){
        const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
        if(src && src.includes('muscache') && !set.has(src)){ set.add(src); out.push(src); }
      }
      return out.slice(0,40);
    }).catch(()=>[]);

    const locationText = await page.locator('a[data-testid="breadcrumb-text"]').last().textContent().catch(()=>null);

    const parseCount = (label)=>{
      if(!metaLine) return null;
      const m = metaLine.match(new RegExp(`(\\d+)\\s*${label}`, 'i'));
      return m ? parseInt(m[1],10) : null;
    };

    const id = roomId(url);
    await page.close();

    return {
      id, url, title,
      description: description?.trim() || null,
      city: locationText || null,
      country: null,
      latitude: lat, longitude: lng,
      maxGuests: parseCount('guest'),
      bedrooms:  parseCount('bedroom'),
      beds:      parseCount('bed(?!room)'),
      bathrooms: parseCount('bath'),
      pricePerNight: priceText || null,
      amenities, photos,
      icalUrl: id ? `https://www.airbnb.com/calendar/ical/${id}.ics` : null,
      propertyType: null,
      stayType: 'short',
    };
  }catch(e){
    await page.close();
    throw e;
  }
}

/* ------------ main ------------ */
(async ()=>{
  const { context, browser } = await launchContext();

  // Phase 1 — collect URLs (resume-safe)
  let urls = [];
  if (fs.existsSync(OUT_URLS)) {
    try { urls = JSON.parse(fs.readFileSync(OUT_URLS,'utf-8')); } catch { urls = []; }
  }
  if (urls.length === 0) {
    console.log('Phase 1: collecting listing URLs from host page…');
    urls = await collectAllUrls(context);
    fs.writeFileSync(OUT_URLS, JSON.stringify(urls, null, 2));
    console.log(`Saved urls.json with ${urls.length} URLs`);
  } else {
    console.log(`Loaded ${urls.length} URLs from urls.json`);
  }

  // Phase 2 — scrape each room (resume-safe)
  let existing = [];
  if (fs.existsSync(OUT_DATA)) {
    try { existing = JSON.parse(fs.readFileSync(OUT_DATA,'utf-8')); } catch { existing = []; }
  }
  const done  = new Set(existing.map(x=>x.id));
  const queue = urls.filter(u => roomId(u) && !done.has(roomId(u)));

  console.log(`Phase 2: scraping ${queue.length} listings… (concurrency=${CONCURRENCY})`);
  const results = existing;
  let idx = 0;

  async function worker(){
    while (true){
      const myIndex = idx++;
      if (myIndex >= queue.length) break;
      const url = queue[myIndex];
      const id  = roomId(url);
      try{
        await rdelay();
        const data = await scrapeRoom(context, url);
        results.push(data);
        fs.writeFileSync(OUT_DATA, JSON.stringify(results, null, 2));
        console.log(`✓ ${id}  (${results.length}/${existing.length + queue.length})`);
      }catch(e){
        console.warn(`x ${id}: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({length: CONCURRENCY}, () => worker()));

  await context.close(); if (browser) await browser.close();
  console.log(`Done. Saved ${results.length} listings to ${OUT_DATA}`);
})();
