import PillNav from '@/components/reactbits/PillNav'
import ThemeToggle from '@/components/ThemeToggle'
import { CtaButton } from '@/components/ui'
import { navLinks } from '@/data/content'
import { useDeck } from '@/deck/DeckContext'
import { useTheme } from '@/theme'

export default function Navbar() {
  const { theme, palette } = useTheme()
  const { slides, index } = useDeck()
  const activeHref = `#${slides[index].id}`

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink via-ink/80 to-transparent" />
      <div className="relative mx-auto h-20 max-w-7xl">
        {/* PillNav positions itself absolutely; on desktop the flex parent centers it. */}
        <div className="absolute inset-x-0 top-0 md:flex md:justify-center">
          <PillNav
            logo={`${import.meta.env.BASE_URL}brand/mark-${theme}.png`}
            logoAlt="MingleLab"
            logoHref="#top"
            items={navLinks}
            activeHref={activeHref}
            baseColor={palette.lime}
            logoBackground={palette.ink}
            pillColor={palette.ink}
            pillTextColor={palette.paper}
            hoveredPillTextColor={palette.onLime}
          />
        </div>
        <a href="#top" aria-label="MingleLab home" className="absolute left-[4.5rem] top-[1.6em] md:left-6 lg:left-10">
          <img src={`${import.meta.env.BASE_URL}brand/word-${theme}.png`} alt="MingleLab" className="h-[22px] w-auto md:h-[26px]" />
        </a>
        <div className="absolute right-4 top-[1em] flex items-center gap-3 md:right-6 lg:right-10">
          <div className="hidden md:block">
            <CtaButton href="#join">Join MingleLab</CtaButton>
          </div>
          <div className="max-md:mr-[3.25rem]">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
