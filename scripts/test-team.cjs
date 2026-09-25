// Run: node scripts/test-team.cjs <path-to-playwright-package>
const { chromium } = require(process.argv[2] || 'playwright')
const assert = require('node:assert/strict')
const members = require('../src/data/team.json').slice().sort((a, b) => a.order - b.order || a.id - b.id)

;(async () => {
  assert.ok(members.length > 0)
  assert.equal(new Set(members.map(member => member.id)).size, members.length)
  for (const member of members) {
    assert.deepEqual(Object.keys(member).sort(), ['id', 'name', 'role', 'image', 'linkedin', 'order'].sort())
    assert.ok(member.image === null || typeof member.image === 'string')
  }
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', hasTouch: true })
    // Verify new-tab navigation without contacting LinkedIn.
    await context.route('https://www.linkedin.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Profile navigation test</title>' }))
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    const base = process.env.TEST_URL || 'http://localhost:3010'
    for (const route of ['/', '/about']) {
      await page.goto(`${base}${route}`)
      await page.waitForLoadState('networkidle')
      const carousel = page.locator('.about-team-carousel')
      await carousel.scrollIntoViewIfNeeded()
      const cards = carousel.locator('.about-team-card')
      assert.equal(await cards.count(), members.length * 2)
      assert.deepEqual(await cards.locator('h3').allTextContents(), [...members, ...members].map(member => member.name))
      for (let index = 0; index < members.length; index++) {
        const member = members[index]
        const link = cards.nth(index).locator('.about-team-portrait a')
        assert.equal(await link.count(), member.linkedin ? 1 : 0)
        if (member.linkedin) {
          assert.equal(await link.getAttribute('href'), member.linkedin)
          assert.equal(await link.getAttribute('target'), '_blank')
          assert.equal(await link.getAttribute('rel'), 'noopener noreferrer')
          assert.equal(await link.getAttribute('aria-label'), `Open ${member.name}'s LinkedIn profile`)
        }
        if (member.image === null) assert.equal(await cards.nth(index).locator('.team-avatar').innerText(), Array.from(member.name.trim())[0].toUpperCase())
      }
      const firstLink = cards.first().locator('a')
      console.log('Checking direct click', route, await firstLink.boundingBox())
      await page.screenshot({ path: '.next/team-before-click.png' })
      const [popup] = await Promise.all([page.waitForEvent('popup'), firstLink.click()])
      await popup.waitForLoadState()
      assert.equal(popup.url(), members[0].linkedin)
      await popup.close()
      assert.equal(await page.locator('.about-team-linkedin-popover').count(), 0)
      // A horizontal drag beginning on a linked avatar must scroll, not open it.
      const bounds = await firstLink.boundingBox()
      const before = await carousel.evaluate(element => element.scrollLeft)
      await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
      await page.mouse.down()
      await page.mouse.move(bounds.x + bounds.width / 2 - 80, bounds.y + bounds.height / 2, { steps: 10 })
      await page.mouse.up()
      assert.ok(await carousel.evaluate(element => element.scrollLeft) > before)
      assert.equal(context.pages().length, 1)
      await firstLink.focus()
      console.log('Checking keyboard link', route)
      const [keyboardPopup] = await Promise.all([page.waitForEvent('popup'), page.keyboard.press('Enter')])
      await keyboardPopup.close()

      await page.setViewportSize({ width: 375, height: 812 })
      await carousel.evaluate(element => { element.scrollLeft = 0 })
      await firstLink.scrollIntoViewIfNeeded()
      console.log('Checking mobile tap', route)
      const [tapped] = await Promise.all([page.waitForEvent('popup'), firstLink.tap()])
      await tapped.close()
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false)
      await page.screenshot({ path: `.next/team-${route === '/' ? 'home' : 'about'}-mobile.png` })
      await page.setViewportSize({ width: 1440, height: 1000 })
    }
    // The existing continuous marquee still runs and pauses on hover.
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
    const motionPage = await desktop.newPage()
    await motionPage.goto(`${base}/about`)
    await motionPage.waitForLoadState('networkidle')
    await motionPage.locator('.about-team-carousel').scrollIntoViewIfNeeded()
    await motionPage.waitForFunction(() => getComputedStyle(document.querySelector('.about-team-track')).animationPlayState === 'running')
    const transform = await motionPage.locator('.about-team-track').evaluate(element => getComputedStyle(element).transform)
    await motionPage.waitForFunction(previous => getComputedStyle(document.querySelector('.about-team-track')).transform !== previous, transform)
    await motionPage.locator('.about-team-card').first().hover({ force: true })
    await motionPage.waitForFunction(() => getComputedStyle(document.querySelector('.about-team-track')).animationPlayState === 'paused')
    assert.deepEqual(errors, [])
    console.log(`Passed: shared JSON, ${members.length} members / ${members.filter(member => member.linkedin).length} URLs, sorting, initials, direct click/tap/keyboard links, drag suppression, responsive layout and marquee animation.`)
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
