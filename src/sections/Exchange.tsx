import AnimatedContent from '@/components/reactbits/AnimatedContent'
import CardSwap, { Card } from '@/components/reactbits/CardSwap'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import { Container, SectionHeading, SectionLabel, slideClass } from '@/components/ui'
import { useTheme } from '@/theme'
import { examplePeople, exchangeIdeas } from '@/data/content'

export default function Exchange() {
  const { palette } = useTheme()
  return (
    <section className={slideClass}>
      <Container>
        <SectionLabel index="02">Knowledge exchange</SectionLabel>
        <SectionHeading text="Know something. Learn something." className="max-w-4xl" />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="grid gap-4">
            {exchangeIdeas.map((idea, i) => (
              <AnimatedContent key={idea.tag} distance={50} delay={i * 0.1}>
                <SpotlightCard spotlightColor={palette.spotlight} className="p-6! md:p-8!">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-xs text-paper/40">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-accent md:text-4xl">
                        {idea.tag}
                      </h3>
                      <p className="mt-2 text-lg text-paper">{idea.body}</p>
                      <p className="mt-1 font-mono text-xs text-paper/40">{idea.example}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>

          {/* CardSwap stacks cards up and to the right, so leave room for the offset */}
          <div className="flex justify-center overflow-hidden pb-4 pt-8 lg:overflow-visible">
            <div className="origin-top scale-[0.8] pr-[120px] pt-[140px] sm:scale-100">
              <CardSwap width={340} height={280} cardDistance={50} verticalDistance={60} delay={4200} pauseOnHover>
                {examplePeople.map(p => (
                  <Card key={p.name} className="flex flex-col p-6 text-paper shadow-2xl shadow-black/30">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
                      <span>minglelab / profile</span>
                      <span className="rounded-full bg-lime px-2 py-0.5 text-on-lime">{p.field}</span>
                    </div>
                    <p className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em]">{p.name}</p>
                    <dl className="mt-auto grid gap-2 text-sm">
                      {[
                        ['I know', p.know],
                        ["I'm learning", p.learning],
                        ["I'm looking for", p.lookingFor],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 border-t border-paper/10 pt-2">
                          <dt className="text-paper/45">{k}</dt>
                          <dd className="text-right font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
