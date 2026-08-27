import { LineChart, MessagesSquare, Trophy, Users } from 'lucide-react'
import { FEATURES } from '../data/content'
import { useInView } from '../hooks/useInView'
import { FrostCard, GUTTER, SectionHeading } from './ui'

const ICONS = {
  batch: Users,
  doubt: MessagesSquare,
  tracking: LineChart,
  olympiad: Trophy,
}

const DELAYS = ['delay-0', 'delay-100', 'delay-200', 'delay-300']

export default function WhyUs() {
  const { ref, inView } = useInView()

  return (
    <section id="why-us" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28`}>
      <SectionHeading
        eyebrow="Why Us"
        title="Why Choose Us"
        subtitle="Small rooms, daily contact hours, and parents who always know where their child stands."
        inView={inView}
      />

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
        {FEATURES.map((feature, i) => {
          const Icon = ICONS[feature.icon]
          return (
            <FrostCard
              key={feature.title}
              className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} ${DELAYS[i]} p-6 sm:p-7`}
            >
              <div className={`icon-glow reveal reveal-scale-in ${inView ? 'is-visible' : ''} ${DELAYS[i]} flex h-10 w-10 items-center justify-center rounded-xl bg-white/10`}>
                <Icon className="h-5 w-5 text-white/80" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-white sm:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{feature.desc}</p>
            </FrostCard>
          )
        })}
      </div>
    </section>
  )
}
