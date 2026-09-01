import { useEffect, useState } from 'react'
import { Trophy, X, Maximize2, Sparkles, Award, Medal, ChevronRight } from 'lucide-react'
import { STAT_FONT } from './ui'

const BATCHES = {
  '2023-24': {
    academicYear: '2023–24',
    title: 'CBSE & SSLC RESULTS 2023–24',
    posterUrl: '/toppers-wall/poster_2023_24.jpg',
    director: {
      name: 'Sridhar H.K.',
      qualification: 'M.Sc B.Ed',
      title: 'Academic Director',
      photo: '/toppers-wall/students/2024/director_2024.jpg',
      message: '100% Success in Grade X CBSE & State syllabus from the last 10 consecutive years!',
    },
    stats: {
      overallPass: '100%',
      topScore: '94%',
      specialRecord: 'GRADE X RECORD',
      totalStudents: '23+',
    },
  },
  '2022-23': {
    academicYear: '2022–23',
    title: 'CBSE & SSLC RESULTS 2022–23',
    posterUrl: '/toppers-wall/poster.jpg',
    director: {
      name: 'Sridhar H.K.',
      qualification: 'M.Sc B.Ed',
      title: 'Academic Director',
      photo: '/toppers-wall/students/director.jpg',
      message: 'Guiding students to master core concepts and achieve phenomenal 100% board exam success year after year.',
    },
    stats: {
      overallPass: '100%',
      topScore: '96.6%',
      specialRecord: '100/100 RECORD',
      totalStudents: '30+',
    },
  },
  'old-batch': {
    academicYear: 'Earlier Batch',
    title: 'SSLC RESULTS — Earlier Batch',
    posterUrl: '/toppers-wall/poster_old_batch.jpg',
    director: {
      name: 'Mr. Sridhar',
      qualification: 'M.Sc., B.Ed',
      title: 'Academic Director',
      photo: '/toppers-wall/students/director.jpg',
      message: '100% Result. Sai Presidency Degree College — Near Sai Mandir, Kalaburagi.',
    },
    stats: {
      overallPass: '100%',
      topScore: '99.04%',
      specialRecord: 'DIST. 3RD RANK',
      totalStudents: '18+',
    },
  },
  '2019-20': {
    academicYear: '2019–20',
    title: 'CBSE & STATE RESULTS 2019–20',
    posterUrl: '/toppers-wall/poster_2019_20.jpg',
    director: {
      name: 'Mr. Sridhar',
      qualification: 'M.Sc., B.Ed',
      title: 'Academic Director',
      photo: '/toppers-wall/students/director.jpg',
      message: '100% Result. Hearty Congratulations and Blessings from: Mr. Vinod, Mr. Natraj.',
    },
    stats: {
      overallPass: '100%',
      topScore: '96.3%',
      specialRecord: 'NIVEDITA S.M TOPPER',
      totalStudents: '13+',
    },
  },
}

export default function ToppersModal({ isOpen, onClose }) {
  const [selectedBatch, setSelectedBatch] = useState('2023-24')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Preload all batch poster images immediately on mount so tab switching is instantaneous
  useEffect(() => {
    Object.values(BATCHES).forEach((b) => {
      const img = new Image()
      img.src = b.posterUrl
      if (b.director.photo) {
        const dImg = new Image()
        dImg.src = b.director.photo
      }
    })
  }, [])

  // Lock body scrolling when modal is open and handle ESC key
  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, isLightboxOpen, onClose])

  if (!isOpen) return null

  const currentData = BATCHES[selectedBatch]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[95vh] flex flex-col rounded-3xl border border-white/15 bg-[#010101] shadow-2xl overflow-hidden text-white">
        {/* Top Navigation Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-[#010101]/95 backdrop-blur-md gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white block leading-tight">
                  Shree Institute
                </span>
                <span className="text-[10px] text-amber-300/90 font-semibold uppercase tracking-wider block">
                  Past Batches Wall of Fame
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="sm:hidden text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Batch Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 border border-amber-400/30 shrink-0">
              <button
                onClick={() => setSelectedBatch('2023-24')}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedBatch === '2023-24'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-md scale-105'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                🔥 2023–24
              </button>
              <button
                onClick={() => setSelectedBatch('2022-23')}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedBatch === '2022-23'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-md scale-105'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                ⭐ 2022–23
              </button>
              <button
                onClick={() => setSelectedBatch('old-batch')}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedBatch === 'old-batch'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-md scale-105'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                🏅 Earlier
              </button>
              <button
                onClick={() => setSelectedBatch('2019-20')}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedBatch === '2019-20'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-md scale-105'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                🏆 2019–20
              </button>
            </div>

            {/* Close button Desktop */}
            <button
              onClick={onClose}
              className="hidden sm:flex text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-9 h-9 items-center justify-center transition ml-2"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Banner & Director Spotlight */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/10 via-transparent to-white/5">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Academic Year {currentData.academicYear} Results</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Congratulations To All Our Toppers!
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                Shree Institute of Learning (Classes 8th, 9th & 10th CBSE & State Syllabus). Outstanding 100% Board Pass Rate & Top Ranks in Kalaburagi.
              </p>

              {/* Quick Stats Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <span className="text-[10px] uppercase font-semibold text-amber-300/80 tracking-wider block">Pass Rate</span>
                  <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5" style={STAT_FONT}>
                    {currentData.stats.overallPass}
                  </div>
                </div>
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <span className="text-[10px] uppercase font-semibold text-amber-300/80 tracking-wider block">Top Score</span>
                  <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5" style={STAT_FONT}>
                    {currentData.stats.topScore}
                  </div>
                </div>
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <span className="text-[10px] uppercase font-semibold text-amber-300/80 tracking-wider block">Record</span>
                  <div className="text-xs sm:text-sm font-bold text-amber-300 mt-1 truncate">
                    {currentData.stats.specialRecord}
                  </div>
                </div>
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <span className="text-[10px] uppercase font-semibold text-amber-300/80 tracking-wider block">Toppers</span>
                  <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-0.5" style={STAT_FONT}>
                    {currentData.stats.totalStudents}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Director Card */}
            <div className="shrink-0 w-full lg:w-72 p-4 rounded-2xl border border-amber-400/30 bg-black/60 flex flex-col items-center text-center shadow-xl">
              <div className="relative mb-2">
                <div className="h-28 w-24 rounded-xl overflow-hidden border-2 border-amber-400/60 p-0.5 bg-black">
                  <img
                    src={currentData.director.photo}
                    alt={currentData.director.name}
                    className="h-full w-full object-cover object-top rounded-lg"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap shadow">
                  Director
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">{currentData.director.name}</h3>
              <span className="text-[11px] font-medium text-amber-300">{currentData.director.qualification}</span>
              <p className="mt-2 text-[11px] italic text-white/70 leading-snug border-t border-white/10 pt-2">
                &ldquo;{currentData.director.message}&rdquo;
              </p>
            </div>
          </div>

          {/* HD Poster Showcase */}
          <div className="p-4 sm:p-6 rounded-3xl border border-amber-400/30 bg-black/40 text-center relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 text-left">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🖼️ Official {currentData.academicYear} Toppers Poster</span>
                </h3>
                <p className="text-xs text-white/60">Click image to inspect high-definition full screen poster</p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-all shadow-lg flex items-center gap-1.5 shrink-0"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Full HD Lightbox</span>
              </button>
            </div>

            {/* Poster image */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="cursor-pointer relative group rounded-2xl overflow-hidden border border-white/15 hover:border-amber-400 transition-all shadow-2xl bg-black max-h-[600px]"
            >
              <img
                src={currentData.posterUrl}
                alt={`Shree Institute ${currentData.academicYear} Poster`}
                className="w-full h-auto object-contain rounded-xl max-h-[580px] mx-auto bg-black"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                <span className="bg-amber-400 text-black font-extrabold text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2">
                  <Maximize2 className="h-4 w-4" />
                  <span>Inspect HD Poster ({currentData.academicYear})</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-6xl h-[94vh] flex flex-col rounded-3xl border border-white/20 bg-black overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/90 shrink-0">
              <div className="flex items-center gap-2 text-amber-400">
                <Trophy className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  Shree Institute {currentData.academicYear} Toppers HD Poster
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-black">
              <img
                src={currentData.posterUrl}
                alt={`Original Poster ${currentData.academicYear} HD`}
                className="max-w-full h-auto object-contain rounded-xl shadow-2xl max-h-[82vh]"
              />
            </div>

            <div className="px-5 py-3 border-t border-white/10 bg-black/90 flex items-center justify-between text-xs text-white/60 shrink-0">
              <span>Pinch or scroll on mobile to zoom into student marks</span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-1.5 rounded-full text-xs transition"
              >
                Close HD View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
