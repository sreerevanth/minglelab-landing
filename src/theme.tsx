import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'dark' | 'light'

// Colors for ReactBits components that take colors as props (canvas / WebGL can't read CSS variables).
const palettes = {
  dark: {
    ink: '#0B0B0A',
    paper: '#F4F1EA',
    paperMuted: 'rgba(244,241,234,0.65)',
    paperFaint: 'rgba(244,241,234,0.2)',
    line: '#262622',
    lime: '#D4FF3A',
    accent: '#D4FF3A',
    onLime: '#0B0B0A',
    threads: [212 / 255, 1, 58 / 255] as [number, number, number],
    glowRgb: '212, 255, 58',
    spotlight: 'rgba(212, 255, 58, 0.14)' as const,
    dotBase: '#23231F',
    rays: '#D4FF3A',
  },
  light: {
    ink: '#F4F1EA',
    paper: '#11110F',
    paperMuted: 'rgba(17,17,15,0.6)',
    paperFaint: 'rgba(17,17,15,0.18)',
    line: '#DCD8CC',
    lime: '#D0FB3C',
    accent: '#5F8200',
    onLime: '#0B0B0A',
    threads: [95 / 255, 130 / 255, 0] as [number, number, number],
    glowRgb: '120, 165, 0',
    spotlight: 'rgba(120, 165, 0, 0.14)' as const,
    dotBase: '#DAD5C6',
    rays: '#9BC400',
  },
}

export type Palette = (typeof palettes)[Theme]

type ThemeCtx = { theme: Theme; palette: Palette; toggle: (origin?: { x: number; y: number }) => void }
const ThemeContext = createContext<ThemeCtx | null>(null)

const STORAGE_KEY = 'minglelab-theme'

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palettes[theme].ink)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const apply = () => {
        document.documentElement.dataset.theme = next
        setTheme(next)
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!document.startViewTransition || reduced) return apply()

      // Circular reveal of the new theme, centered on the toggle.
      const x = origin?.x ?? window.innerWidth - 40
      const y = origin?.y ?? 40
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const transition = document.startViewTransition(() => flushSync(apply))
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
    },
    [theme],
  )

  const value = useMemo(() => ({ theme, palette: palettes[theme], toggle }), [theme, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
