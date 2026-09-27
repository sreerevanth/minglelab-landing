import { useMemo, type RefObject } from 'react'
import LightRays from '@/components/reactbits/LightRays'
import ScrollReveal from '@/components/reactbits/ScrollReveal'
import { Container, SectionLabel } from '@/components/ui'
import { coreIdea } from '@/data/content'
import { useSlideScroller } from '@/lib/slide-scroller'
import { useTheme } from '@/theme'

// A deliberately tall page: scrolling inside it reveals the statement word by word before the next page.
export default function CoreIdea() {
  const { theme, palette } = useTheme()
  const scroller = useSlideScroller()
  const scrollRef = useMemo(() => ({ current: scroller }) as RefObject<HTMLElement>, [scroller])

  return (
    <section className="relative isolate">
      {/* rays stay pinned to the viewport while the page scrolls */}
      <div
        className={`pointer-events-none sticky top-0 -z-10 -mb-[100svh] h-[100svh] [mask-image:linear-gradient(to_bottom,black_60%,transparent)] ${
          theme === 'light' ? 'opacity-55 mix-blend-multiply' : 'opacity-70'
        }`}
      >
        <LightRays
          key={theme}
          raysOrigin="top-center"
          raysColor={palette.rays}
          raysSpeed={0.6}
          lightSpread={0.9}
          rayLength={1.6}
          fadeDistance={1.1}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.05}
          lightMode={theme === 'light'}
        />
      </div>

      {/* the statement stays pinned while scrolling lights it up word by word */}
      <div className="h-[200svh]">
        <div className="sticky top-0 flex h-[100svh] items-center pt-16">
          <Container>
            <SectionLabel index="05">The idea</SectionLabel>
            <ScrollReveal
              scrollContainerRef={scrollRef}
              baseOpacity={0.14}
              baseRotation={2}
              blurStrength={8}
              containerClassName="m-0"
              textClassName="font-display text-[clamp(2.75rem,8.5vw,8.5rem)]! leading-[0.92]! font-semibold tracking-[-0.05em] text-paper"
              wordAnimationStart={0}
              wordAnimationEnd="+=85%"
              rotationEnd="+=85%"
            >
              {coreIdea}
            </ScrollReveal>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
              Keep scrolling — the page reads itself to you ↓
            </p>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-paper/60">
              That’s why MingleLab exists: a room where a biologist, a designer and a robotics kid end up at the same table
              — on purpose.
            </p>
          </Container>
        </div>
      </div>
    </section>
  )
}
