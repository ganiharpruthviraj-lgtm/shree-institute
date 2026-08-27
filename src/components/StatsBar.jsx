import { STATS } from '../data/content'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'
import { FrostCard, GUTTER, STAT_FONT, SectionHeading } from './ui'

const DELAYS = ['delay-0', 'delay-100', 'delay-200', 'delay-300']

function StatCard({ stat, inView, delayClass }) {
  const display = useCounter(stat.value, inView)

  return (
    <FrostCard className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} ${delayClass} p-5 sm:p-6`}>
      <div
        className={`text-2xl font-normal tracking-tight sm:text-3xl ${inView ? 'shimmer-text' : 'text-white'}`}
        style={STAT_FONT}
      >
        {display}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/60 sm:mt-3">{stat.label}</p>
    </FrostCard>
  )
}

export default function StatsBar() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className={`${GUTTER} py-12 sm:py-16`}>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} inView={inView} delayClass={DELAYS[i]} />
        ))}
      </div>
    </section>
  )
}
