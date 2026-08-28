import { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, MapPin, Phone } from 'lucide-react'
import { ADMISSIONS, CONTACT, INSTITUTE, LOGO_PATH } from '../data/content'
import { bookDemo } from '../lib/api'
import { useInView } from '../hooks/useInView'
import { FrostCard, GUTTER, GradientButton, Logo, SectionHeading } from './ui'

const FIELD =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder-white/40 focus:border-white/30 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)] disabled:opacity-50'

export default function Admissions() {
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const { ref, inView } = useInView()

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
      await bookDemo({
        studentName: form.studentName.value,
        studentClass: form.studentClass.value,
        parentPhone: rawPhone,
      })
      form.reset()
      setStatus('sent')
    } catch (submitError) {
      setError(submitError.message)
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <section id="batches" ref={ref} className={`${GUTTER} py-16 sm:py-20 lg:py-28`}>
      <SectionHeading
        eyebrow="Admissions"
        title={ADMISSIONS.title}
        subtitle={ADMISSIONS.subtitle}
        inView={inView}
      />

      <FrostCard
        className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} delay-300 mt-10 max-w-3xl p-6 sm:mt-12 sm:p-8`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              type="text"
              name="studentName"
              required
              disabled={sending}
              autoComplete="name"
              placeholder={ADMISSIONS.fields.name}
              aria-label={ADMISSIONS.fields.name}
              className={FIELD}
            />

            <div className="relative">
              <select
                name="studentClass"
                required
                disabled={sending}
                defaultValue=""
                aria-label={ADMISSIONS.fields.classLabel}
                className={`${FIELD} cursor-pointer appearance-none pr-10`}
              >
                <option value="" disabled className="bg-[#0b0b0b]">
                  {ADMISSIONS.fields.classLabel}
                </option>
                {ADMISSIONS.classes.map((option) => (
                  <option key={option} value={option} className="bg-[#0b0b0b] text-white">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                aria-hidden="true"
              />
            </div>

            <input
              type="tel"
              name="parentPhone"
              required
              disabled={sending}
              autoComplete="tel"
              inputMode="numeric"
              placeholder={ADMISSIONS.fields.phone}
              aria-label={ADMISSIONS.fields.phone}
              className={FIELD}
            />
          </div>

          <GradientButton
            type="submit"
            disabled={sending}
            className="w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start sm:px-8"
          >
            {sending ? 'Sending…' : ADMISSIONS.submit}
          </GradientButton>

          {/* aria-live so a screen reader announces the outcome without a refocus */}
          <div aria-live="polite">
            {status === 'sent' && (
              <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-sm text-emerald-300 backdrop-blur-md">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>Thanks &mdash; we&rsquo;ve received your request and will call you back shortly to arrange the demo class!</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-300 backdrop-blur-md">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <span>{error}</span>{' '}
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="underline font-medium hover:text-white">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </form>
      </FrostCard>

      {/* ------------------------------------------------------------- footer */}
      <footer
        id="contact"
        className={`reveal reveal-fade-up ${inView ? 'is-visible' : ''} delay-400 mt-16 flex flex-col gap-8 border-t border-white/10 pt-10 sm:mt-20`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Logo name={INSTITUTE.name} path={LOGO_PATH} />

          <div className="flex flex-col gap-3 text-sm sm:gap-4">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="link-underline flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
              {CONTACT.phone}
            </a>

            <p className="flex items-start gap-2.5 text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
              {CONTACT.address}
            </p>

            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline flex items-center gap-2.5 text-white/70 hover:text-white"
            >
              <MapPin className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>
        </div>

        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} {INSTITUTE.fullName}. All rights reserved.
        </p>
      </footer>
    </section>
  )
}
