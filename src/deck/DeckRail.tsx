import Counter from '@/components/reactbits/Counter'
import { useTheme } from '@/theme'
import { useDeck } from './DeckContext'

const pad = (n: number) => String(n).padStart(2, '0')

// Page indicator: a rolling page number plus one tick per page.
export default function DeckRail() {
  const { slides, index, goTo } = useDeck()
  const { palette } = useTheme()
  const isLast = index === slides.length - 1

  return (
    <>
      {/* desktop: vertical rail on the right edge */}
      <nav
        aria-label="Pages"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex xl:right-6"
      >
        <div className="flex items-baseline gap-1 font-mono text-paper">
          <Counter
            value={index + 1}
            places={[10, 1]}
            fontSize={22}
            gap={0}
            horizontalPadding={0}
            gradientHeight={6}
            gradientFrom={palette.ink}
            fontWeight={500}
          />
          <span className="text-[11px] text-paper/40">/{pad(slides.length)}</span>
        </div>
        <ul className="flex flex-col items-end gap-2.5">
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.title}`}
                aria-current={i === index ? 'page' : undefined}
                className="group flex h-4 items-center gap-3"
              >
                <span
                  className={`translate-x-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                    i === index ? 'text-accent' : 'text-paper/60'
                  }`}
                >
                  {s.title}
                </span>
                <span
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-accent' : 'w-3 bg-paper/25 group-hover:w-5 group-hover:bg-paper/60'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* mobile + tablet: compact pill at the bottom */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center lg:hidden">
        <div className="flex items-center gap-3 rounded-full border border-line bg-ink/85 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70 backdrop-blur">
          <span className="text-accent">
            {pad(index + 1)}/{pad(slides.length)}
          </span>
          <span>{slides[index].title}</span>
          {!isLast && <span className="animate-bounce text-paper/50">↓</span>}
        </div>
      </div>
    </>
  )
}
