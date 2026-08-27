import puppeteer from 'puppeteer-core';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  const baseDir = 'C:\\Users\\prash\\.gemini\\antigravity-ide\\brain\\bfc87bc8-2f87-4ada-9b44-0d6a84431dc9\\scratch';
  
  // 1. Home page hero section
  await page.screenshot({ path: path.join(baseDir, 'screenshot_1_hero.png') });
  
  // 4. Navbar (scrolled state)
  await page.evaluate(() => window.scrollBy(0, 150));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(baseDir, 'screenshot_4_navbar.png') });

  // 2. Mid-page section (e.g. Features/Stats)
  await page.evaluate(() => {
    const el = document.querySelector('#why-climate-craft') || document.querySelector('section:nth-of-type(3)');
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 2500);
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(baseDir, 'screenshot_2_mid.png') });

  // 3. CTA & Footer (bottom of page)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(baseDir, 'screenshot_3_footer.png') });

  await browser.close();
})();
