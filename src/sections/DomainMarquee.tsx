import { Fragment, useMemo, type RefObject } from 'react'
import ScrollVelocity from '@/components/reactbits/ScrollVelocity'
import { domains } from '@/data/content'
import { useSlideScroller } from '@/lib/slide-scroller'

const half = Math.ceil(domains.length / 2)
const rows = [domains.slice(0, half), domains.slice(half)].map((row, r) => (
  <span key={r} className="inline-flex items-center">
    {row.map(d => (
      <Fragment key={d.text}>
        <span
          className={
            r === 0
              ? 'text-paper'
              : 'text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--paper)_45%,transparent)]'
          }
        >
          {d.text}
        </span>
        <span className="mx-6 text-accent md:mx-10">✳</span>
      </Fragment>
    ))}
  </span>
))

export default function DomainMarquee() {
  // Speeds up with scrolling inside this page
  const scroller = useSlideScroller()
  const scrollRef = useMemo(() => ({ current: scroller }) as RefObject<HTMLElement>, [scroller])

  return (
    <div aria-hidden className="border-y border-line py-4 md:py-6">
      <ScrollVelocity
        texts={rows}
        velocity={40}
        numCopies={3}
        scrollContainerRef={scrollRef}
        className="font-display font-semibold tracking-[-0.04em]"
        scrollerClassName="scroller py-1 md:py-2"
      />
    </div>
  )
}
