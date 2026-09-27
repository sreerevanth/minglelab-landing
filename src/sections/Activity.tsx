import { useEffect, useState } from 'react'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import AnimatedList from '@/components/reactbits/AnimatedList'
import { Container, SectionHeading, SectionLabel, slideClass } from '@/components/ui'
import { activity } from '@/data/content'

const VISIBLE = 4
const TICK_MS = 3200
const timeLabels = ['just now', '2m ago', '6m ago', '11m ago']

// Rotates the example feed so the newest event lands on top.
function useLiveFeed() {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setOffset(o => (o + 1) % activity.length), TICK_MS)
    return () => window.clearInterval(id)
  }, [])
  return Array.from({ length: VISIBLE }, (_, i) => activity[(offset - i + activity.length * 2) % activity.length])
}

export default function Activity() {
  const feed = useLiveFeed()

  return (
    <section className={slideClass}>
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionLabel index="04">Activity</SectionLabel>
          <SectionHeading text="Things are happening." />
          <AnimatedContent distance={40} delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/60">
              Small collisions, all day. A question here, a late-night study session there — and sometimes, a project
              that outlives the conversation.
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={60}>
          <div className="rounded-[28px] border border-line bg-surface p-2">
            <div className="flex items-center justify-between px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-lime" />
                </span>
                Live in the lab
              </span>
              <span>feed</span>
            </div>
            <AnimatedList
              items={feed}
              showGradients={false}
              enableArrowNavigation={false}
              displayScrollbar={false}
              renderItem={(item, index, selected) => (
                <div
                  className={`flex items-center gap-4 rounded-2xl border px-4 py-4 transition-colors duration-300 ${
                    selected ? 'border-accent/40 bg-lime/[0.06]' : 'border-transparent bg-ink/60'
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-xs ${
                      index === 0 ? 'bg-lime text-on-lime' : 'bg-paper/5 text-paper/50'
                    }`}
                  >
                    ↗
                  </span>
                  <p className="flex-1 text-[15px] leading-snug text-paper/90">{item}</p>
                  <span className="shrink-0 font-mono text-[11px] text-paper/35">{timeLabels[index]}</span>
                </div>
              )}
            />
          </div>
        </AnimatedContent>
      </Container>
    </section>
  )
}
