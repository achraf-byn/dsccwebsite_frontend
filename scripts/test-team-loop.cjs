// Real-time verification: no animation speed overrides or skipped cycle time.
// node scripts/test-team-loop.cjs <path-to-playwright-package>
const { chromium } = require(process.argv[2] || 'playwright')
const assert = require('node:assert/strict')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const base = process.env.TEST_URL || 'http://localhost:3010'
  try {
    const runs = []
    for (const route of ['/', '/about']) for (const width of [1440, 375]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      await page.goto(base + route)
      await page.waitForLoadState('networkidle')
      await page.locator('.about-team-carousel').scrollIntoViewIfNeeded()
      await page.mouse.move(0, 0)
      const setup = await page.evaluate(() => {
        const viewport = document.querySelector('.about-team-carousel')
        const track = viewport.querySelector('.about-team-track')
        const sets = [...track.querySelectorAll('.team-set')]
        const animation = track.getAnimations()[0]
        const gap = parseFloat(getComputedStyle(sets[0]).gap)
        const a = sets[0].getBoundingClientRect()
        const b = sets[1].getBoundingClientRect()
        const last = sets[0].lastElementChild.getBoundingClientRect()
        const firstB = sets[1].firstElementChild.getBoundingClientRect()
        return { width: a.width, secondWidth: b.width, stride: b.left - a.left, seamGap: firstB.left - last.right, gap, duration: animation?.effect.getTiming().duration, playState: animation?.playState, overflow: getComputedStyle(viewport).overflowX }
      })
      console.log('Starting two real cycles', route, width, setup)
      assert.equal(setup.overflow, 'hidden')
      assert.equal(setup.playState, 'running')
      assert.ok(Math.abs(setup.width - setup.secondWidth) < .1)
      assert.ok(Math.abs(setup.width - setup.stride) < .1)
      assert.ok(Math.abs(setup.seamGap - setup.gap) < .1, `Incorrect A/B spacing: ${JSON.stringify(setup)}`)
      runs.push((async () => {
        const result = await page.evaluate(async () => {
          const viewport = document.querySelector('.about-team-carousel')
          const track = viewport.querySelector('.about-team-track')
          const sets = [...track.querySelectorAll('.team-set')]
          const cards = [...track.querySelectorAll('.about-team-card')]
          const animation = track.getAnimations()[0]
          const duration = animation.effect.getTiming().duration
          const stride = sets[0].getBoundingClientRect().width
          const gap = parseFloat(getComputedStyle(sets[0]).gap)
          const failures = []
          let samples = 0, wraps = 0, transitionSamples = 0, previousOffset = null, previousTime = null
          // Start at A's first card, then let the actual production animation run.
          animation.currentTime = 0
          return await new Promise(resolve => {
            const sample = () => {
              const time = Number(animation.currentTime)
              const box = viewport.getBoundingClientRect()
              const rectangles = cards.map(card => card.getBoundingClientRect())
              const offset = -new DOMMatrixReadOnly(getComputedStyle(track).transform).m41
              const visible = rectangles.filter(rect => rect.right > box.left && rect.left < box.right)
              const fail = message => { if (failures.length < 20) failures.push({ message, time, offset }) }
              if (!visible.length || visible[0].left > box.left + gap + 1 || visible.at(-1).right < box.right - gap - 1) fail('Empty viewport area')
              for (let i = 1; i < visible.length; i++) if (Math.abs(visible[i].left - visible[i - 1].right - gap) > 1) fail('Uneven gap')
              if (viewport.scrollLeft !== 0) fail('Viewport scrolled')
              if (animation.playState !== 'running') fail('Animation stopped')
              if (previousOffset !== null) {
                const elapsed = time - previousTime
                if (offset < previousOffset - 1) wraps++
                const actual = (offset - previousOffset + stride) % stride
                const expected = elapsed * stride / duration
                if (Math.abs(actual - expected) > 1 && elapsed < duration) fail('Snap or speed change')
              }
              const lastA = rectangles[sets[0].children.length - 1]
              if (lastA.left < box.right && lastA.right > box.left) transitionSamples++
              previousOffset = offset; previousTime = time; samples++
              if (time >= duration * 2 + 800) resolve({ duration, cycles: time / duration, wraps, samples, transitionSamples, failures })
              else requestAnimationFrame(sample)
            }
            requestAnimationFrame(sample)
          })
        })
        console.log('Completed', route, width, JSON.stringify(result))
        assert.deepEqual(result.failures, [])
        assert.ok(result.wraps >= 2)
        assert.ok(result.transitionSamples > 0)
        assert.deepEqual(errors, [])
        return { page, context, route, width }
      })())
    }
    const status = setInterval(() => console.log('Two-cycle monitoring continues at the production animation speed…'), 30000)
    let completed
    try { completed = await Promise.all(runs) } finally { clearInterval(status) }
    for (const { page, context, route, width } of completed) {
      // Jump only after the real-time two-cycle verification to inspect the seam.
      await page.evaluate(() => {
        const track = document.querySelector('.about-team-track')
        const animation = track.getAnimations()[0]
        animation.pause()
        animation.currentTime = Number(animation.effect.getTiming().duration) * 12 / 14
      })
      await page.screenshot({ path: `.next/team-seam-${route === '/' ? 'home' : 'about'}-${width}.png` })
      // Drag around the boundary repeatedly in both directions: never scroll the viewport.
      const viewport = page.locator('.about-team-carousel')
      const bounds = await viewport.boundingBox()
      for (const direction of [-1, 1, -1]) {
        const x = bounds.x + bounds.width / 2
        const y = bounds.y + 50
        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x + direction * Math.min(140, bounds.width / 3), y, { steps: 12 })
        await page.mouse.up()
        assert.equal(await viewport.evaluate(element => element.scrollLeft), 0)
        const covered = await viewport.evaluate(element => {
          const box = element.getBoundingClientRect()
          const cards = [...element.querySelectorAll('.about-team-card')].map(card => card.getBoundingClientRect()).filter(rect => rect.right > box.left && rect.left < box.right)
          return cards.length > 0 && cards[0].left <= box.left + 17 && cards.at(-1).right >= box.right - 17
        })
        assert.ok(covered)
      }
      await context.close()
    }
    console.log('PASS: two full unaccelerated cycles on Home and About at desktop and mobile widths; seamless boundaries and wrapped dragging.')
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
