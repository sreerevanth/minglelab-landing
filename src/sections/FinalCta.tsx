import DotGrid from '@/components/reactbits/DotGrid'
import Magnet from '@/components/reactbits/Magnet'
import SplitText from '@/components/reactbits/SplitText'
import { Container, CtaButton } from '@/components/ui'
import { finalCta } from '@/data/content'
import Footer from '@/sections/Footer'
import { useTheme } from '@/theme'

export default function FinalCta() {
  const { palette } = useTheme()
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotGrid
            dotSize={5}
            gap={24}
            baseColor={palette.dotBase}
            activeColor={palette.accent}
            proximity={140}
            shockRadius={260}
            shockStrength={4}
            resistance={750}
            returnDuration={1.4}
            className="p-0!"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_50%,color-mix(in_oklab,var(--ink)_92%,transparent)_0%,color-mix(in_oklab,var(--ink)_50%,transparent)_60%,transparent_100%)]" />

        <Container className="py-32 text-center">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{finalCta.body}</p>
          <SplitText
            tag="h2"
            text={finalCta.headline}
            splitType="words"
            delay={60}
            duration={0.9}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            className="mx-auto max-w-[14ch] pb-[0.08em] font-display text-[clamp(2.25rem,7.5vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-paper"
          />
          <div className="mt-12 flex justify-center">
            <Magnet padding={80} magnetStrength={3}>
              <CtaButton href={finalCta.cta.href} size="lg">
                {finalCta.cta.label}
              </CtaButton>
            </Magnet>
          </div>
          <p className="mt-6 text-sm text-paper/45">Bring a friend from another field while you’re at it.</p>
        </Container>
      </section>
      <Footer />
    </>
  )
}
