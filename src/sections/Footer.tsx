import { Container } from '@/components/ui'
import { navLinks } from '@/data/content'
import { useTheme } from '@/theme'

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer className="border-t border-line pb-24 pt-10 lg:pb-10">
      <Container className="flex flex-col gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="MingleLab home">
          <img src={`${import.meta.env.BASE_URL}brand/mark-${theme}.png`} alt="" className="h-8 w-auto" />
          <img src={`${import.meta.env.BASE_URL}brand/word-${theme}.png`} alt="MingleLab" className="h-5 w-auto" />
        </a>
        <nav className="flex gap-6">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} MingleLab · Built by people from different fields</p>
      </Container>
    </footer>
  )
}
