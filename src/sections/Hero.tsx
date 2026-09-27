import BlurText from '@/components/reactbits/BlurText'
import CountUp from '@/components/reactbits/CountUp'
import DecryptedText from '@/components/reactbits/DecryptedText'
import Magnet from '@/components/reactbits/Magnet'
import ShinyText from '@/components/reactbits/ShinyText'
import SplitText from '@/components/reactbits/SplitText'
import Threads from '@/components/reactbits/Threads'
import { Container, CtaButton } from '@/components/ui'
import { domains, hero } from '@/data/content'
import { useTheme } from '@/theme'

export default function Hero() {
  const { theme, palette } = useTheme()
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Threads key={theme} color={palette.threads} amplitude={1.4} distance={0.2} enableMouseInteraction />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_20%_35%,color-mix(in_oklab,var(--ink)_85%,transparent)_0%,color-mix(in_oklab,var(--ink)_35%,transparent)_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* Overlay passes pointer events through so Threads can react to the cursor */}
      <Container className="pointer-events-none flex flex-1 flex-col justify-center pb-16 pt-32 md:pt-40">
        <p className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-paper/15 bg-ink/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">
          <span className="size-1.5 rounded-full bg-lime" />
          <DecryptedText text={hero.eyebrow} animateOn="view" sequential speed={35} encryptedClassName="text-accent" />
        </p>

        <SplitText
          tag="h1"
          text={hero.headline}
          splitType="words"
          delay={70}
          duration={1}
          from={{ opacity: 0, y: 60, rotate: 3 }}
          to={{ opacity: 1, y: 0, rotate: 0 }}
          textAlign="left"
          rootMargin="0px"
          className="max-w-[15ch] pb-[0.08em] font-display text-[clamp(3.25rem,8.2vw,8.25rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-paper"
        />

        <BlurText
          text={hero.body}
          delay={25}
          animateBy="words"
          direction="bottom"
          className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 md:text-xl"
        />

        <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnet padding={60} magnetStrength={4}>
            <CtaButton href={hero.primary.href} size="lg">
              {hero.primary.label} →
            </CtaButton>
          </Magnet>
          <a href={hero.secondary.href} className="group inline-flex items-center gap-2 text-base font-medium">
            <ShinyText text={hero.secondary.label} color={palette.paperMuted} shineColor={palette.accent} speed={3} />
            <span className="text-accent transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </Container>

      <Container className="pointer-events-none hidden pb-20 sm:block lg:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-paper/10 pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
          <p>
            <CountUp to={domains.length} duration={1.5} className="text-accent" /> fields · 1 room · endless overlaps
          </p>
          <p className="hidden sm:block">Scroll, swipe or press ↓ to turn the page</p>
        </div>
      </Container>
    </section>
  )
}
