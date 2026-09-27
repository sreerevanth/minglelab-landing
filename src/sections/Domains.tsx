import AnimatedContent from '@/components/reactbits/AnimatedContent'
import FlowingMenu from '@/components/reactbits/FlowingMenu'
import { Container, SectionHeading, SectionLabel } from '@/components/ui'
import { domains } from '@/data/content'
import DomainMarquee from '@/sections/DomainMarquee'
import { useTheme } from '@/theme'

const items = domains.map(d => ({ ...d, link: '#people' }))

export default function Domains() {
  const { palette } = useTheme()
  return (
    <section className="min-h-[100svh] pb-24 pt-24">
      <DomainMarquee />
      <Container className="grid gap-12 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel index="01">Domains</SectionLabel>
          <SectionHeading text="Different minds. Same room." />
          <AnimatedContent distance={40} delay={0.2}>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-paper/60">
              Thirteen fields, zero walls. Hover one to peek at what people are trading in it — then go find someone
              from the row below yours.
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={60}>
          <div className="overflow-hidden rounded-[28px] border border-line" style={{ height: domains.length * 64 }}>
            <FlowingMenu
              items={items}
              speed={18}
              textColor={palette.paper}
              bgColor="transparent"
              marqueeBgColor={palette.lime}
              marqueeTextColor={palette.onLime}
              borderColor={palette.line}
            />
          </div>
        </AnimatedContent>
      </Container>
    </section>
  )
}
