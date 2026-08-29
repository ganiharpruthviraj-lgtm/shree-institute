import { Trophy, ChevronRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { FrostCard, GUTTER, SectionHeading } from './ui'

export default function Toppers() {
  const { ref, inView } = useInView()

  return (
    <section id="toppers" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28 relative`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <SectionHeading
          eyebrow="Our Star Performers"
          title="Top Achievers 2025–26"
          subtitle="Shree Institute of Learning Congratulations & Honours"
          inView={inView}
        />
        <a
          href="/toppers-wall/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-2 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:scale-105 transition-all duration-300 shrink-0"
        >
          <Trophy className="h-4 w-4" />
          <span>Past Batches Wall (2019–2024)</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      {/* Showcase Both Topper Pictures Cleanly */}
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <FrostCard className="group relative overflow-hidden rounded-3xl border-amber-400/40 p-3 bg-gradient-to-b from-amber-500/10 to-transparent hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <img
              src="/topper_anu.png"
              alt="Anu - 608/625 Topper of Our Institute"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
            />
          </div>
        </FrostCard>

        <FrostCard className="group relative overflow-hidden rounded-3xl border-amber-400/40 p-3 bg-gradient-to-b from-amber-500/10 to-transparent hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <img
              src="/topper_vaishnavi.png"
              alt="Vaishnavi - 600/625 2nd Topper of Our Institute"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
            />
          </div>
        </FrostCard>
      </div>
    </section>
  )
}


