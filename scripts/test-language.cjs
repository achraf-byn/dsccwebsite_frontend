// Run with: node scripts/test-language.cjs <path-to-playwright-package>
const { chromium } = require(process.argv[2] || 'playwright')
const assert = require('node:assert/strict')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  const url = process.env.TEST_URL || 'http://localhost:3000'
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.locator('.language-button').waitFor()
  const select = async code => {
    console.log('Selecting', code, 'at', page.viewportSize().width)
    await page.locator('.language-button').click()
    await page.getByRole('menuitemradio').nth(['en', 'fr', 'ar'].indexOf(code)).click()
    await page.waitForFunction(code => document.documentElement.lang === code, code)
  }
  for (const [language, flag, heading] of [['fr', 'fr', 'DONNÉES.'], ['ar', 'ma', 'البيانات.'], ['en', 'gb', 'DATA.']]) {
    await select(language)
    assert.equal(await page.locator('html').getAttribute('dir'), language === 'ar' ? 'rtl' : 'ltr')
    assert.equal(await page.locator('.language-button img').getAttribute('src'), `/flags/${flag}.svg`)
    assert.ok((await page.locator('h1').innerText()).includes(heading))
    assert.equal(await page.evaluate(() => localStorage.getItem('dscc-language')), language)
  }
  await select('fr')
  await page.reload()
  await page.waitForFunction(() => document.documentElement.lang === 'fr')
  await page.locator('.desktop-nav a[href="/events"]').click()
  await page.waitForURL('**/events')
  assert.ok((await page.locator('h1').innerText()).includes('Apprendre'))
  assert.ok((await page.locator('.hub-card').first().innerText()).includes('Sortie'))
  await page.locator('.language-button').click()
  assert.equal(await page.getByRole('menuitemradio').count(), 3)
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('.language-button').getAttribute('aria-expanded'), 'false')
  await page.locator('.language-button').focus()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('End')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => document.documentElement.lang === 'ar')
  await page.locator('.language-button').click()
  await page.locator('h1').click()
  assert.equal(await page.locator('.language-button').getAttribute('aria-expanded'), 'false')

  const layoutIssues = []
  for (const width of [320, 375, 768, 1024, 1200, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const language of ['en', 'fr', 'ar']) {
      await select(language)
      const layout = await page.evaluate(() => {
        const header = document.querySelector('.site-navbar').getBoundingClientRect()
        const logo = document.querySelector('.dscc-logo').getBoundingClientRect()
        const actions = document.querySelector('.navbar-actions').getBoundingClientRect()
        const nav = document.querySelector('.desktop-nav').getBoundingClientRect()
        const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1
        return { overflow: document.documentElement.scrollWidth > innerWidth + 1, actionsOutside: actions.right > header.right + 1 || actions.left < header.left - 1, overlap: overlap(logo, actions) || (nav.width > 0 && (overlap(nav, actions) || overlap(nav, logo))) }
      })
      if (Object.values(layout).some(Boolean)) layoutIssues.push({ width, language, ...layout })
    }
  }
  await page.setViewportSize({ width: 375, height: 812 })
  await page.locator('.menu-button').click()
  await page.locator('#mobile-navigation').waitFor()
  assert.equal(await page.locator('#mobile-navigation .language-selector').count(), 0)
  await select('fr')
  assert.ok((await page.locator('#mobile-navigation').innerText()).includes('Accueil'))
  await page.locator('.navbar-actions > .theme-toggle').click()
  assert.ok((await page.locator('html').getAttribute('class')).includes('dark'))
  await page.locator('.language-button').click()
  await page.screenshot({ path: '.next/language-mobile.png' })
  await page.keyboard.press('Escape')
  await page.locator('.menu-button').click()
  await select('ar')
  for (const route of ['/', '/about', '/announcements', '/news', '/events', '/openlab', '/drive', '/contact', '/news/conversational-analytics-bigquery-ga', '/announcements/welcome-to-dscc-family']) {
    await page.goto(`${url}${route}`)
    await page.waitForFunction(() => document.documentElement.lang === 'ar')
    assert.match(await page.locator('h1').innerText(), /[\u0600-\u06ff]/, `Arabic heading missing: ${route}`)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)
    if (overflow) layoutIssues.push({ route, language: 'ar', width: 375, overflow })
    if (route === '/') await page.screenshot({ path: '.next/language-arabic-home.png', fullPage: true })
  }
  console.log(JSON.stringify({ errors, layoutIssues, result: 'interaction checks passed' }, null, 2))
  await browser.close()
  assert.deepEqual(errors, [])
  assert.deepEqual(layoutIssues, [])
})().catch(error => { console.error(error); process.exit(1) })
