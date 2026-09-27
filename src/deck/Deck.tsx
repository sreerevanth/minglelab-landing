import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SlideScrollerContext } from '@/lib/slide-scroller'
import { DeckContext, type SlideDef } from './DeckContext'
import { reducedTransition, reducedVariants, slideTransition, slideVariants, type DeckMotion } from './transitions'

const LOCK_MS = 1050 // a little longer than the page transition
const GESTURE_GAP_MS = 180 // wheel events further apart than this start a new gesture
const WHEEL_THRESHOLD = 30
const SWIPE_THRESHOLD = 50

const atEdge = (el: HTMLElement | null, dir: 1 | -1) =>
  !el || (dir === 1 ? el.scrollTop + el.clientHeight >= el.scrollHeight - 2 : el.scrollTop <= 1)

function indexFromHash(slides: SlideDef[]) {
  const id = window.location.hash.slice(1)
  return Math.max(0, slides.findIndex(s => s.id === id))
}

export default function Deck({ slides, children }: { slides: SlideDef[]; children?: ReactNode }) {
  const [state, setState] = useState(() => {
    const index = indexFromHash(slides)
    return { index, from: index, dir: 1 as 1 | -1, landAtEnd: false }
  })
  const reduced = useReducedMotion() ?? false
  const scrollerRef = useRef<HTMLElement | null>(null)
  const lockUntil = useRef(0)

  const goTo = useCallback(
    (target: number, landAtEnd = false) => {
      const next = Math.max(0, Math.min(slides.length - 1, target))
      if (next === state.index || performance.now() < lockUntil.current) return
      lockUntil.current = performance.now() + (reduced ? 400 : LOCK_MS)
      setState({ index: next, from: state.index, dir: next > state.index ? 1 : -1, landAtEnd })
    },
    [slides.length, state.index, reduced],
  )

  // Step one page; stepping back lands at the end of a long page so it reads naturally upwards.
  const step = useCallback((dir: 1 | -1) => goTo(state.index + dir, dir === -1), [goTo, state.index])

  // Keep the URL in sync so pages can be linked to.
  useEffect(() => {
    const id = slides[state.index].id
    history.replaceState(null, '', state.index === 0 ? window.location.pathname : `#${id}`)
  }, [state.index, slides])

  // Wheel / trackpad: scroll inside a long page first, flip only with a fresh gesture that starts at the edge.
  useEffect(() => {
    let lastWheel = 0
    let gestureDir: 1 | -1 = 1
    let armed = false
    let accum = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX) || e.ctrlKey) return
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1
      const now = performance.now()
      if (now - lastWheel > GESTURE_GAP_MS || dir !== gestureDir) {
        gestureDir = dir
        armed = atEdge(scrollerRef.current, dir)
        accum = 0
      }
      lastWheel = now
      if (!armed || now < lockUntil.current || !atEdge(scrollerRef.current, dir)) return
      accum += Math.abs(e.deltaY)
      if (accum > WHEEL_THRESHOLD) {
        armed = false // ignore the rest of this gesture (trackpad momentum)
        step(dir)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [step])

  // Touch: swipe past the edge of the page to flip.
  useEffect(() => {
    let startY = 0
    let startedAtTop = false
    let startedAtBottom = false
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startedAtTop = atEdge(scrollerRef.current, -1)
      startedAtBottom = atEdge(scrollerRef.current, 1)
    }
    const onEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY
      if (Math.abs(dy) < SWIPE_THRESHOLD) return
      const dir: 1 | -1 = dy > 0 ? 1 : -1
      if ((dir === 1 ? startedAtBottom : startedAtTop) && atEdge(scrollerRef.current, dir)) step(dir)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [step])

  // Keyboard: arrows / page keys / space scroll a long page, then flip.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return
      const keyDir: Record<string, 1 | -1> = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }
      let dir = keyDir[e.key]
      if (e.key === ' ') dir = e.shiftKey ? -1 : 1
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault()
        return goTo(e.key === 'Home' ? 0 : slides.length - 1)
      }
      if (!dir) return
      e.preventDefault()
      const el = scrollerRef.current
      if (el && !atEdge(el, dir)) el.scrollBy({ top: dir * el.clientHeight * 0.7, behavior: reduced ? 'auto' : 'smooth' })
      else step(dir)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, step, slides.length, reduced])

  // In-page links (#explore, #join, ...) jump to that page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')!.slice(1)
      const i = id === '' || id === 'top' ? 0 : slides.findIndex(s => s.id === id)
      if (i === -1) return
      e.preventDefault()
      goTo(i)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [goTo, slides])

  const slide = slides[state.index]
  // Forward: the arriving page's transition. Back: the departing page reverses its own.
  const custom: DeckMotion = { dir: state.dir, type: slides[state.dir === 1 ? state.index : state.from].transition }
  const ctx = useMemo(() => ({ slides, index: state.index, goTo }), [slides, state.index, goTo])

  return (
    <DeckContext.Provider value={ctx}>
      <main className="fixed inset-0 overflow-hidden bg-ink">
        <AnimatePresence initial={false} custom={custom}>
          <Slide
            key={slide.id}
            slide={slide}
            custom={custom}
            reduced={reduced}
            landAtEnd={state.landAtEnd}
            onScroller={el => (scrollerRef.current = el)}
          />
        </AnimatePresence>
      </main>
      {children}
    </DeckContext.Provider>
  )
}

type SlideProps = {
  slide: SlideDef
  custom: DeckMotion
  reduced: boolean
  landAtEnd: boolean
  onScroller: (el: HTMLElement | null) => void
}

function Slide({ slide, custom, reduced, landAtEnd, onScroller }: SlideProps) {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const isPresent = useIsPresent()
  const Page = slide.Component

  useEffect(() => {
    if (!el) return
    onScroller(el)
    if (landAtEnd) requestAnimationFrame(() => (el.scrollTop = el.scrollHeight))
    // landAtEnd only matters on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el])

  return (
    <motion.div
      ref={setEl}
      custom={custom}
      variants={reduced ? reducedVariants : slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={reduced ? reducedTransition : slideTransition}
      aria-label={slide.title}
      role="region"
      className={`slide-scroller absolute inset-0 overflow-y-auto overflow-x-hidden bg-ink will-change-transform ${
        isPresent ? '' : 'pointer-events-none'
      }`}
    >
      {el && (
        <SlideScrollerContext.Provider value={el}>
          <Page />
        </SlideScrollerContext.Provider>
      )}
    </motion.div>
  )
}
