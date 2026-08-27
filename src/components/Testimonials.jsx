import { INSTITUTE, TESTIMONIALS } from '../data/content'
import { useInView } from '../hooks/useInView'
import { GUTTER, SectionHeading, TestimonialCard } from './ui'

const SLIDE_CLASSES = ['reveal-slide-left', 'reveal-slide-right']

export default function Testimonials() {
  const { ref, inView } = useInView()

  return (
    <section id="toppers" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28`}>
      <SectionHeading eyebrow="Toppers" title="Parent & Student Testimonials" inView={inView} />

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
        {TESTIMONIALS.map((item, i) => (
          <div
            key={item.author}
            className={`reveal ${SLIDE_CLASSES[i % 2]} ${inView ? 'is-visible' : ''} delay-${i * 200}`}
          >
            <TestimonialCard
              brand={INSTITUTE.name}
              quote={item.quote}
              author={item.author}
              subtext={item.subtext}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
