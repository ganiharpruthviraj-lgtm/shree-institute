import { Award, Star, Trophy } from 'lucide-react'
import { TOPPERS } from '../data/content'
import { useInView } from '../hooks/useInView'
import { FrostCard, GUTTER, STAT_FONT, SectionHeading } from './ui'

const ICONS = [Trophy, Award, Star]

export default function Toppers() {
  const { ref, inView } = useInView()

  return (
    <section id="toppers" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28`}>
      <SectionHeading
        eyebrow="Wall of Fame"
        title="Our Stars & Top Performers"
        subtitle="Consistent top ranks in Board Exams and Competitive Olympiads year after year."
        inView={inView}
      />

      <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {TOPPERS.map((topper, index) => {
          const IconComponent = ICONS[index % ICONS.length]
          const delayClass = index === 0 ? '' : index === 1 ? 'delay-150' : 'delay-300'

          return (
            <FrostCard
              key={topper.name}
              className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} ${delayClass} group relative flex flex-col justify-between p-6 sm:p-7`}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                    {topper.badge}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    style={STAT_FONT}
                    className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 sm:text-5xl"
                  >
                    {topper.score}
                  </span>
                  <span className="text-xs font-medium text-white/50">{topper.year}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-white">{topper.name}</h3>

                <p className="mt-1 text-xs font-medium text-amber-300/80">{topper.highlights}</p>

                <p className="mt-4 text-xs italic leading-relaxed text-white/70">
                  &ldquo;{topper.quote}&rdquo;
                </p>
              </div>
            </FrostCard>
          )
        })}
      </div>
    </section>
  )
}
