'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import galleryData from '@/src/data/gallery.json'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { animate, motion, useReducedMotion, useMotionValue } from 'framer-motion'

type GalleryImage = (typeof galleryData.rows)[number]['images'][number]
type GalleryRowData = (typeof galleryData.rows)[number]

const GALLERY_SPEED = 35 // pixels per second for every row

function GalleryPhoto({ item, rowId, index }: { item: GalleryImage; rowId: number; index: number }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (imageFailed || !item.image.trim()) return null

  return <div className={`gallery-photo gallery-photo-${(index % 3) + 1}`}>
    <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 42vw, (max-width: 1100px) 27vw, 240px" className="gallery-photo-image" onError={() => setImageFailed(true)} priority={rowId === 1 && index < 2} />
  </div>
}

function GalleryRow({ row }: { row: GalleryRowData }) {
  const validImages = row.images.filter((item) => item.image && item.image.trim() !== '')
  const loopImages = validImages.length ? Array.from({ length: Math.max(validImages.length, 10) }, (_, index) => validImages[index % validImages.length]) : []
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<{ stop: () => void } | null>(null)
  const resumeTimer = useRef<number | null>(null)
  const [distance, setDistance] = useState(0)
  const [paused, setPaused] = useState(false)
  const pointer = useRef({ active: false, moved: false, startX: 0, startY: 0, startOffset: 0, pointerId: -1 })

  useEffect(() => {
    const track = trackRef.current
    const set = setRef.current
    if (!track || !set) return
    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0
      // Include the gap between Set A and Set B in one full loop distance.
      setDistance(set.getBoundingClientRect().width + gap)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(set)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    animationRef.current?.stop()
    animationRef.current = null
    if (!distance || reduce || paused) return

    let active = true
    const boundary = row.direction === 'left' ? -distance : 0
    const loopStart = row.direction === 'left' ? 0 : -distance
    const current = Number(x.get())
    const remaining = row.direction === 'left' ? current - boundary : boundary - current

    const startFullLoop = () => {
      if (!active) return
      // Set A and Set B are identical, so this boundary swap is visually seamless.
      x.set(loopStart)
      animationRef.current = animate(x, [loopStart, boundary], {
        duration: distance / GALLERY_SPEED,
        ease: 'linear',
        onComplete: startFullLoop,
      })
    }

    if (remaining <= 0.5) {
      startFullLoop()
    } else {
      // Resume from the exact paused visual position, then continue at the normal speed.
      animationRef.current = animate(x, [current, boundary], {
        duration: remaining / GALLERY_SPEED,
        ease: 'linear',
        onComplete: startFullLoop,
      })
    }

    return () => {
      active = false
      animationRef.current?.stop()
      animationRef.current = null
    }
  }, [distance, paused, reduce, row.direction, x])

  useEffect(() => () => { if (resumeTimer.current) window.clearTimeout(resumeTimer.current) }, [])

  const pauseRow = () => {
    animationRef.current?.stop()
    animationRef.current = null
    setPaused(true)
  }

  const resumeRow = () => {
    if (reduce || !distance || pointer.current.active) return
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 900)
  }

  const wrapPosition = (value: number) => {
    if (!distance) return value
    const wrapped = ((value % distance) + distance) % distance
    return row.direction === 'left' ? -wrapped : wrapped - distance
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return
    pauseRow()
    pointer.current = { active: true, moved: false, startX: event.clientX, startY: event.clientY, startOffset: Number(x.get()), pointerId: event.pointerId }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.active) return
    const deltaX = event.clientX - pointer.current.startX
    const deltaY = event.clientY - pointer.current.startY
    if (!pointer.current.moved) {
      if (Math.abs(deltaX) < 6) return
      // Give vertical page scrolling back to the browser on touch devices.
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        pointer.current.active = false
        return
      }
      pointer.current.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    event.preventDefault()
    x.set(wrapPosition(pointer.current.startOffset + deltaX))
  }

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.active) return
    pointer.current.active = false
    if (event.currentTarget.hasPointerCapture(pointer.current.pointerId)) event.currentTarget.releasePointerCapture(pointer.current.pointerId)
    resumeRow()
  }

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!distance || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return
    event.preventDefault()
    pauseRow()
    x.set(wrapPosition(Number(x.get()) - event.deltaX))
    resumeRow()
  }

  if (!loopImages.length) return null

  return <div className={`gallery-row gallery-row-${row.id}`} onMouseEnter={pauseRow} onMouseLeave={resumeRow} onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
    <motion.div className="gallery-track" style={{ x }} ref={trackRef}>
      {[false, true].map((duplicate) => <div className="gallery-set" key={duplicate ? 'duplicate' : 'original'} ref={duplicate ? undefined : setRef} aria-hidden={duplicate || undefined}>{loopImages.map((item, index) => <GalleryPhoto item={item} rowId={row.id} index={index} key={`${duplicate ? 'copy-' : ''}${index}-${item.id}`} />)}</div>)}
    </motion.div>
  </div>
}

export default function InfiniteGallery() {
  return <section className="infinite-gallery" aria-labelledby="gallery-title">
    <div className="gallery-heading">
      <div><span className="home-section-eyebrow"><T>DSCC MOMENTS</T></span><h2 id="gallery-title"><T>Life Inside Our </T><span><T>Community.</T></span></h2></div>
      <p><T>Workshops, competitions, projects and moments we&apos;ve built together.</T></p>
    </div>
    <div className="gallery-rows">{galleryData.rows.map((row) => <GalleryRow key={row.id} row={row} />)}</div>
  </section>
}
