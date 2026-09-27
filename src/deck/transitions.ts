import type { Transition, Variants } from 'motion/react'

// PPT-style page transitions. Every state sets `clipPath` as an inset() shape so any two states can interpolate.
export type TransitionType = 'cover' | 'wipe' | 'zoom' | 'iris' | 'slide'
export type DeckMotion = { dir: 1 | -1; type: TransitionType }

const FULL = 'inset(0% 0% 0% 0% round 0px)'

// The page underneath shrinks into a rounded card, like a slide stepping back.
const receded = { x: '0%', y: '0%', scale: 0.9, opacity: 0.45, clipPath: 'inset(0% 0% 0% 0% round 48px)' }

const offstage: Record<TransitionType, Record<string, string | number>> = {
  cover: { x: '0%', y: '100%', scale: 1, opacity: 1, clipPath: FULL },
  wipe: { x: '0%', y: '0%', scale: 1, opacity: 1, clipPath: 'inset(100% 0% 0% 0% round 0px)' },
  zoom: { x: '0%', y: '0%', scale: 1.12, opacity: 0, clipPath: FULL },
  iris: { x: '0%', y: '0%', scale: 1.04, opacity: 1, clipPath: 'inset(44% 42% 44% 42% round 999px)' },
  slide: { x: '100%', y: '0%', scale: 1, opacity: 1, clipPath: FULL },
}

export const slideVariants: Variants = {
  // Going forward the new page arrives on top; going back it rises from the receded stack.
  enter: ({ dir, type }: DeckMotion) => (dir === 1 ? { ...offstage[type], zIndex: 2 } : { ...receded, zIndex: 1 }),
  center: { x: '0%', y: '0%', scale: 1, opacity: 1, clipPath: FULL, zIndex: 2 },
  // Going forward the old page recedes underneath; going back it leaves the way it came in.
  exit: ({ dir, type }: DeckMotion) => (dir === 1 ? { ...receded, zIndex: 1 } : { ...offstage[type], zIndex: 2 }),
}

export const slideTransition: Transition = { duration: 0.95, ease: [0.76, 0, 0.24, 1] }

export const reducedTransition: Transition = { duration: 0.35, ease: 'easeOut' }
export const reducedVariants: Variants = {
  enter: { opacity: 0, zIndex: 2 },
  center: { opacity: 1, zIndex: 2 },
  exit: { opacity: 0, zIndex: 1 },
}
