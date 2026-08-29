import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, Menu, X } from 'lucide-react'
import { HERO, INSTITUTE, LOGO_PATH, NAV_CTA, NAV_LINKS, VIDEO_SRC } from '../data/content'
import { bookDemo } from '../lib/api'
import {
  CTA_GRADIENT,
  GlassCard,
  Logo,
  STAT_FONT,
  TONE,
  TestimonialCard,
} from './ui'

const tone = TONE.flip

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // This form only asks for a phone number — name and class are optional on the
  // API, and `source` tags the lead so the manager knows which form it came from.
  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const rawPhone = form.parentPhone.value.trim()

    // Validate phone number
    const cleaned = rawPhone.replace(/\D/g, '')
    const isValid =
      (cleaned.length === 10 && /^[6-9]/.test(cleaned)) ||
      (cleaned.length === 11 && cleaned.startsWith('0') && /^[6-9]/.test(cleaned.slice(1))) ||
      (cleaned.length === 12 && cleaned.startsWith('91') && /^[6-9]/.test(cleaned.slice(2)))

    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number (e.g. 96117 92157).')
      setStatus('error')
      return
    }

    setStatus('sending')
    setError('')

    try {
      await bookDemo({ parentPhone: rawPhone, source: 'hero' })
      form.reset()
      setStatus('sent')
    } catch (submitError) {
      setError(submitError.message)
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    // min-h-screen rather than h-screen: the page scrolls now, and the taller
    // hero copy would otherwise be clipped at the top on short viewports.
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* ---------------------------------------------------------------- nav */}
        <nav className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
          <Logo tone={tone} name={INSTITUTE.name} path={LOGO_PATH} />

          {/* desktop nav — lg, not md: five links plus a CTA overflow at 768px */}
          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                  {link.chevron && <ChevronDown className="h-3.5 w-3.5" />}
                </a>
              ))}
            </div>

            <a
              href="#batches"
              style={CTA_GRADIENT}
              className="flex items-center self-stretch rounded-full px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {NAV_CTA}
            </a>
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg lg:hidden"
          >
            <Menu
              className={`absolute h-5 w-5 text-[#010101] transition-all duration-300 ${
                menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              className={`absolute h-5 w-5 text-[#010101] transition-all duration-300 ${
                menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </button>
        </nav>

        {/* -------------------------------------------------- mobile menu glass */}
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
            menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        <div
          className={`fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-black/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-2 px-6 pt-24">
            {NAV_LINKS.map((link, index) => (
              <div
                key={link.label}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                  transition: 'opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: menuOpen ? `${(index + 1) * 60}ms` : '0ms',
                }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                  {link.chevron && <ChevronDown className="h-4 w-4" />}
                </a>
              </div>
            ))}
          </div>

          <div
            className="mt-auto px-6 pb-10"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 400ms ease, transform 400ms ease',
              transitionDelay: menuOpen ? '300ms' : '0ms',
            }}
          >
            <a
              href="#batches"
              onClick={() => setMenuOpen(false)}
              style={CTA_GRADIENT}
              className="block w-full rounded-full py-3.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {NAV_CTA}
            </a>
          </div>
        </div>

        {/* ----------------------------------------------------- bottom content */}
        {/* Row layout waits for xl, not lg: the left column can't shrink below the
            form's 464px min-content, so 464 + 32 + 532 overflows a 1024px viewport. */}
        <main className="mt-auto flex flex-col gap-6 px-5 pb-8 sm:gap-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            {/* Location Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <span>📍 Near Sai Mandir, Behind Atharva Hotel, Kalaburagi</span>
            </div>

            <h1
              className={`text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-[3.5rem] ${tone.strong}`}
            >
              {HERO.headline}
            </h1>

            <p className={`mt-4 max-w-lg text-sm leading-relaxed sm:mt-5 sm:text-base ${tone.dim}`}>
              {HERO.subheadline}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:inline-flex sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5"
            >
              <input
                type="tel"
                name="parentPhone"
                required
                disabled={sending}
                autoComplete="tel"
                inputMode="numeric"
                placeholder={HERO.inputPlaceholder}
                aria-label={HERO.inputPlaceholder}
                className="rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none disabled:opacity-60 sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2"
              />
              <button
                type="submit"
                disabled={sending}
                style={CTA_GRADIENT}
                className="whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:py-2.5"
              >
                {sending ? 'Sending…' : HERO.cta}
              </button>
            </form>

            <div aria-live="polite">
              {status === 'sent' && (
                <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 backdrop-blur-md">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Got it &mdash; we&rsquo;ll call you back shortly to arrange the free demo class!</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-md">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* glass cards */}
          <div className="flex w-full flex-col gap-4 sm:flex-row xl:w-auto xl:gap-5">
            <GlassCard className="flex flex-col justify-between sm:w-64">
              <div
                className={`text-3xl font-normal tracking-tight sm:text-4xl ${tone.strong}`}
                style={STAT_FONT}
              >
                {HERO.stat.value}
              </div>
              <p className={`mt-3 text-sm leading-relaxed sm:mt-4 ${tone.dim}`}>
                {HERO.stat.label}
              </p>
            </GlassCard>

            <TestimonialCard
              className="sm:w-64"
              tone={tone}
              brand={INSTITUTE.name}
              quote={HERO.quote.text}
              author={HERO.quote.author}
              subtext={HERO.quote.subtext}
            />
          </div>
        </main>
      </div>
    </section>
  )
}
