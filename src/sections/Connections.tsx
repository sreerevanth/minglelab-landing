import AnimatedContent from '@/components/reactbits/AnimatedContent'
import MagicBento from '@/components/reactbits/MagicBento'
import { Container, SectionHeading, SectionLabel, slideClass } from '@/components/ui'
import { connections } from '@/data/content'
import { useTheme } from '@/theme'

export default function Connections() {
  const { palette } = useTheme()
  return (
    <section className={slideClass}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="03">Connections</SectionLabel>
            <SectionHeading text="Meet people outside your bubble." className="max-w-4xl" />
          </div>
          <p className="max-w-xs text-paper/55">
            Move across the grid. Every card lights up the ones near it — that’s kind of the whole point.
          </p>
        </div>

        <AnimatedContent distance={60} className="mt-12">
          <MagicBento
            cards={connections}
            glowColor={palette.glowRgb}
            spotlightRadius={320}
            particleCount={10}
            enableTilt={false}
            enableMagnetism
            clickEffect
            textAutoHide={false}
          />
        </AnimatedContent>
      </Container>
    </section>
  )
}
