// ---------------------------------------------------------------------------
// Shared design tokens + primitives. Keeping these in one file is what makes
// the hero and the scrolled sections read as a single system.
// ---------------------------------------------------------------------------

export const CTA_GRADIENT = { background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }

// Silkscreen is the "data" typeface — numerals only. All prose is Geist.
export const STAT_FONT = { fontFamily: "'Silkscreen', cursive" }

/**
 * Two text tones.
 *  - flip: hero only. Near-black on small screens, white at lg+, because the
 *          background video reads lighter at narrow widths.
 *  - dark: every section below the hero, which sits on the #010101 page.
 */
export const TONE = {
  flip: {
    strong: 'text-[#010101] lg:text-white',
    body: 'text-[#010101]/80 lg:text-white/80',
    dim: 'text-[#010101]/70 lg:text-white/70',
    muted: 'text-[#010101]/60 lg:text-white/60',
    fill: 'fill-[#010101] lg:fill-white',
  },
  dark: {
    strong: 'text-white',
    body: 'text-white/80',
    dim: 'text-white/70',
    muted: 'text-white/60',
    fill: 'fill-white',
  },
}

/** Horizontal rhythm shared by every section, including the hero. */
export const GUTTER = 'px-5 sm:px-8 lg:px-12'

export function GradientButton({ children, className = '', ...rest }) {
  return (
    <button
      {...rest}
      style={CTA_GRADIENT}
      className={`btn-shine rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  )
}

/** Hero-weight glass: the two hero cards and the testimonial cards. */
export function GlassCard({ className = '', children }) {
  return (
    <div className={`card-hover rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

/** Frosted glass for the dark sections: stats bar, programs, features, form. */
export function FrostCard({ className = '', children }) {
  return (
    <div
      className={`card-hover rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  )
}

export function Logo({ tone = TONE.dark, name, path }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        className={tone.fill}
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
      <span className={`text-lg font-semibold ${tone.strong}`}>{name}</span>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, className = '', inView = true }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <span
          className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} delay-0 text-xs font-medium uppercase tracking-[0.18em] text-white/40`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} delay-100 mt-3 text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-4xl`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} delay-200 mt-3 text-sm leading-relaxed text-white/60 sm:text-base`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

/** Initials stand in for photos so no real student's face is a stock placeholder. */
function initials(name) {
  return name
    .replace(/^(Mrs|Mr|Ms|Dr)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ name, tone = TONE.dark }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold ${tone.strong}`}
    >
      {initials(name)}
    </div>
  )
}

/**
 * One testimonial card, used by both the hero and the Toppers section so the
 * two never drift apart.
 */
export function TestimonialCard({ brand, quote, author, subtext, tone = TONE.dark, className = '' }) {
  return (
    <GlassCard className={className}>
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-xs font-bold text-white">
          S
        </div>
        <span className={`text-sm font-semibold ${tone.strong}`}>{brand}</span>
      </div>

      <p className={`text-sm leading-relaxed ${tone.body}`}>&ldquo;{quote}&rdquo;</p>

      <div className="mt-4 flex items-center gap-3 sm:mt-5">
        <Avatar name={author} tone={tone} />
        <div>
          <div className={`text-sm font-semibold ${tone.strong}`}>{author}</div>
          <div className={`text-xs ${tone.muted}`}>{subtext}</div>
        </div>
      </div>
    </GlassCard>
  )
}
