import { createContext, useContext } from 'react'

// Each deck slide is its own scroll container. Scroll-driven ReactBits components read it from here
// so their ScrollTriggers measure against the slide instead of the (never-scrolling) window.
export const SlideScrollerContext = createContext<HTMLElement | null>(null)

export const useSlideScroller = () => useContext(SlideScrollerContext)
