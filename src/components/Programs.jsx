import { Check } from 'lucide-react'
import { PROGRAMS } from '../data/content'
import { useInView } from '../hooks/useInView'
import { FrostCard, GUTTER, GradientButton, SectionHeading } from './ui'

const DELAYS = ['delay-0', 'delay-200', 'delay-400']

export default function Programs() {
  const { ref, inView } = useInView()

  return (
    <section id="programs" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28`}>
      <SectionHeading
        eyebrow="Programs"
        title="Programs for Classes 8th to 10th"
        subtitle="Three tracks, each built around where the syllabus actually gets hard."
        inView={inView}
      />

      <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3">
        {PROGRAMS.map((program, i) => (
          <FrostCard
            key={program.badge}
            className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} ${DELAYS[i]} flex flex-col p-6 sm:p-7`}
          >
            <span className="self-start rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {program.badge}
            </span>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {program.title}
            </h3>
            <p className="mt-2 text-sm text-white/50">{program.subjects}</p>

            <ul className="mt-5 flex flex-col gap-3">
              {program.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <GradientButton className="w-full py-3">{program.cta}</GradientButton>
            </div>
          </FrostCard>
        ))}
      </div>
    </section>
  )
}
