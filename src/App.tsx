import ClickSpark from '@/components/reactbits/ClickSpark'
import Deck from '@/deck/Deck'
import type { SlideDef } from '@/deck/DeckContext'
import DeckRail from '@/deck/DeckRail'
import Activity from '@/sections/Activity'
import Connections from '@/sections/Connections'
import CoreIdea from '@/sections/CoreIdea'
import Domains from '@/sections/Domains'
import Exchange from '@/sections/Exchange'
import FinalCta from '@/sections/FinalCta'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import People from '@/sections/People'
import { ThemeProvider, useTheme } from '@/theme'

// The site is a deck: one page at a time, each arriving with its own transition.
const slides: SlideDef[] = [
  { id: 'top', title: 'Intro', transition: 'cover', Component: Hero },
  { id: 'explore', title: 'Domains', transition: 'cover', Component: Domains },
  { id: 'exchange', title: 'Exchange', transition: 'wipe', Component: Exchange },
  { id: 'connections', title: 'Connections', transition: 'zoom', Component: Connections },
  { id: 'activity', title: 'Activity', transition: 'slide', Component: Activity },
  { id: 'about', title: 'The idea', transition: 'iris', Component: CoreIdea },
  { id: 'people', title: 'People', transition: 'wipe', Component: People },
  { id: 'join', title: 'Join', transition: 'iris', Component: FinalCta },
]

function Site() {
  const { palette } = useTheme()
  return (
    <ClickSpark sparkColor={palette.accent} sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
      <Deck slides={slides}>
        <Navbar />
        <DeckRail />
      </Deck>
    </ClickSpark>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  )
}
