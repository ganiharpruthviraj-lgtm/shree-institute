import { useState } from 'react'
import { Award, Star, Trophy, Upload, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react'
import { TOPPERS, PERFORMANCE_STATS } from '../data/content'
import { useInView } from '../hooks/useInView'
import { FrostCard, GUTTER, STAT_FONT, SectionHeading } from './ui'

const CATEGORIES = ['All Ranks', 'Class 10th', 'Class 9th', 'Class 8th']

export default function Toppers() {
  const { ref, inView } = useInView()
  const [activeCategory, setActiveCategory] = useState('All Ranks')
  const [showPhotoInfo, setShowPhotoInfo] = useState(true)

  const filteredToppers = activeCategory === 'All Ranks'
    ? TOPPERS
    : TOPPERS.filter((t) => t.category === activeCategory)

  return (
    <section id="toppers" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28 relative`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeading
          eyebrow="Proven Track Record"
          title="Last Year Performance & Results Showcase"
          subtitle="Celebrating our students' outstanding academic excellence in 2024–2025 Board & Competitive Exams."
          inView={inView}
        />
        
        {/* Category Filter Pills & Wall of Fame Link */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/toppers-wall/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-2 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:scale-105 transition-all duration-300"
          >
            <Trophy className="h-4 w-4" />
            <span>Interactive Wall of Fame (2019–2024)</span>
            <ChevronRight className="h-4 w-4" />
          </a>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Summary Metrics Ribbon */}
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PERFORMANCE_STATS.map((stat, idx) => (
          <FrostCard key={idx} className="p-4 sm:p-5 flex flex-col justify-between border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
            <span className="text-xs font-medium text-amber-300/80 uppercase tracking-wider">{stat.label}</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span style={STAT_FONT} className="text-3xl sm:text-4xl font-extrabold text-amber-300">
                {stat.value}
              </span>
            </div>
            <span className="mt-1 text-[11px] text-white/50">{stat.sub}</span>
          </FrostCard>
        ))}
      </div>

      {/* Toppers Cards Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {filteredToppers.map((topper, index) => {
          const delayClass = index === 0 ? '' : index === 1 ? 'delay-150' : 'delay-300'

          return (
            <FrostCard
              key={topper.id || topper.name}
              className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} ${delayClass} group relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/10`}
            >
              <div>
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300 flex items-center gap-1.5">
                    {topper.badge}
                  </span>
                  <span className="text-xs font-semibold text-white/40">{topper.year}</span>
                </div>

                {/* Photo & Main Score Row */}
                <div className="flex items-center gap-4 mt-4">
                  {/* Photo Container */}
                  <div className="relative shrink-0">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-amber-400/40 bg-gradient-to-b from-white/10 to-white/5 p-0.5 group-hover:border-amber-400 transition-colors">
                      {topper.image ? (
                        <img
                          src={topper.image}
                          alt={topper.name}
                          className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full rounded-xl bg-amber-400/10 border border-dashed border-amber-400/30 flex flex-col items-center justify-center text-amber-300 p-1 text-center">
                          <Upload className="h-4 w-4 mb-1 text-amber-400" />
                          <span className="text-[9px] leading-tight font-medium">Add Photo</span>
                        </div>
                      )}
                    </div>
                    {/* Floating Rank tag */}
                    <div className="absolute -bottom-2 -right-1 bg-amber-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Name & Big Score */}
                  <div className="flex flex-col">
                    <span
                      style={STAT_FONT}
                      className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400"
                    >
                      {topper.score}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {topper.name}
                    </h3>
                    <p className="text-xs text-white/60">{topper.school || topper.category}</p>
                  </div>
                </div>

                {/* Subject Scores Pill Badges */}
                {topper.subjects && (
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block mb-2">Subject Breakdown</span>
                    <div className="flex flex-wrap gap-1.5">
                      {topper.subjects.map((sub, idx) => (
                        <span key={idx} className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[11px] font-medium text-amber-200/90 flex items-center justify-between gap-1">
                          <span>{sub.name}:</span>
                          <strong className="text-white">{sub.mark}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Testimonial Quote */}
                <p className="mt-4 text-xs italic leading-relaxed text-white/70 bg-white/5 p-3 rounded-xl border border-white/5">
                  &ldquo;{topper.quote}&rdquo;
                </p>
              </div>
            </FrostCard>
          )
        })}
      </div>

      {/* Interactive Helper Box explaining how user can customize photos */}
      {showPhotoInfo && (
        <div className="mt-12 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 sm:p-6 backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-amber-400 text-black p-2 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  Demo Performance Section Active
                  <span className="rounded bg-amber-400/20 text-amber-300 px-2 py-0.5 text-[10px] font-semibold uppercase">Ready for Original Photos</span>
                </h4>
                <p className="mt-1 text-xs text-white/80 leading-relaxed">
                  This demo displays sample student achievement cards. When you want to add original student photos or certificates, simply replace the images in <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">public/toppers/</code> or update <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">src/data/content.js</code>!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPhotoInfo(false)}
              className="text-xs font-semibold text-amber-300 hover:text-white underline shrink-0"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

