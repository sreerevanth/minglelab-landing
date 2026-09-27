import AnimatedContent from '@/components/reactbits/AnimatedContent'
import ChromaGrid, { type ChromaItem } from '@/components/reactbits/ChromaGrid'
import { Container, SectionHeading, SectionLabel, slideClass } from '@/components/ui'
import { profiles } from '@/data/content'

const items: ChromaItem[] = profiles.map(p => ({
  title: p.name,
  know: p.know,
  learn: p.learn,
  borderColor: p.color,
  gradient: `linear-gradient(165deg, ${p.color}33 0%, var(--surface) 55%)`,
  // Poster-style "portrait": the field is the face, not a headshot.
  visual: (
    <div
      className="relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[16px] p-4 text-on-lime"
      style={{ background: p.color }}
    >
      <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span>#{p.field.toLowerCase()}</span>
        <span>open to swap ⇄</span>
      </span>
      <span className="pointer-events-none absolute -bottom-8 -right-3 font-display text-[10rem] font-bold leading-none tracking-[-0.06em] opacity-15">
        {p.name[0]}
      </span>
      <span className="relative font-display text-[2.6rem] font-semibold leading-[0.9] tracking-[-0.04em]">{p.field}</span>
    </div>
  ),
}))

export default function People() {
  return (
    <section className={slideClass}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="06">People</SectionLabel>
            <SectionHeading text="People worth bumping into." className="max-w-4xl" />
          </div>
          <p className="max-w-xs text-paper/55">No titles, no endorsements. Just what someone knows and what they’re chasing next.</p>
        </div>

        <AnimatedContent distance={60} className="mt-12">
          <ChromaGrid items={items} columns={3} radius={280} damping={0.4} fadeOut={0.6} className="chroma-grid" />
        </AnimatedContent>
      </Container>
    </section>
  )
}
