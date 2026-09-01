// ---------------------------------------------------------------------------
// Vercel Serverless Function — POST /api/book-demo
// Security Hardened: Strict CORS, Input Sanitization, IP Rate Limiting
// ---------------------------------------------------------------------------

const ALLOWED_CLASSES = ['Class 8', 'Class 9', 'Class 10']

// Configure allowed origins (override via ALLOWED_ORIGINS env var if set)
const DEFAULT_ORIGINS = [
  'http://localhost:5180',
  'http://localhost:5181',
  'http://localhost:5173',
  'http://127.0.0.1:5180',
]

function getTargetOrigin(reqOrigin) {
  const customOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  const allowed = customOrigins.length > 0 ? customOrigins : DEFAULT_ORIGINS

  if (!reqOrigin || allowed.includes(reqOrigin)) {
    return reqOrigin || allowed[0]
  }
  return null
}

// In-memory rate limiting per IP (5 requests per 10 minutes)
const hits = new Map()
const MAX_PER_WINDOW = 5
const WINDOW_MS = 10 * 60 * 1000

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

/** Sanitize input strings to prevent XSS / Script Injection */
function sanitizeString(str) {
  return String(str || '')
    .replace(/[<>'"&]/g, '')
    .trim()
}

function normalisePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  const local =
    digits.startsWith('91') && digits.length === 12
      ? digits.slice(2)
      : digits.startsWith('0') && digits.length === 11
        ? digits.slice(1)
        : digits

  if (!/^[6-9]\d{9}$/.test(local)) return null
  return `+91${local}`
}

function validate(body) {
  const parentPhone = normalisePhone(body.parentPhone)
  if (!parentPhone) {
    return { error: 'Please enter a valid 10-digit Indian mobile number.' }
  }

  const rawName = sanitizeString(body.studentName).slice(0, 80)
  if (rawName && rawName.length < 2) {
    return { error: 'Please enter the student’s full name.' }
  }

  const studentClass = sanitizeString(body.studentClass)
  if (studentClass && !ALLOWED_CLASSES.includes(studentClass)) {
    return { error: 'Please choose Class 8, Class 9 or Class 10.' }
  }

  return {
    lead: {
      studentName: rawName || 'Not provided',
      studentClass: studentClass || 'Not specified',
      parentPhone,
      source: body.source === 'hero' ? 'Hero form' : 'Admission form',
    },
  }
}

const IST = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  dateStyle: 'medium',
  timeStyle: 'short',
})

function composeMessage(lead) {
  return [
    '*New Demo Class Request*',
    '',
    `Student: ${lead.studentName}`,
    `Class: ${lead.studentClass}`,
    `Parent's phone: ${lead.parentPhone}`,
    '',
    `Source: ${lead.source}`,
    `Received: ${IST.format(new Date())} IST`,
  ].join('\n')
}

export default async function handler(req, res) {
  const reqOrigin = req.headers.origin
  const origin = getTargetOrigin(reqOrigin)

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ service: 'shree-institute-vercel-api' })
  }

  // Rate limit check by IP
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (rateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please call us directly.',
    })
  }

  const { error, lead } = validate(req.body || {})
  if (error) {
    return res.status(400).json({ success: false, error })
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, MANAGER_WHATSAPP_TO, GOOGLE_SHEET_URL } =
    process.env

  const sheetUrl =
    GOOGLE_SHEET_URL ||
    'https://script.google.com/macros/s/AKfycbxZc7A0gyKCxZ0biM-5J_0boNcLzOU9PZA4SkYXvU--mFOzQyTIIvTmogr38kgAuEs4/exec'

  // Google Sheet sync
  if (sheetUrl) {
    try {
      await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.studentName,
          class: lead.studentClass,
          phone: lead.parentPhone,
          source: lead.source,
        }),
      })
    } catch (sheetErr) {
      console.error('[vercel-api] Google Sheet sync failed:', sheetErr.message)
    }
  }

  const from = TWILIO_WHATSAPP_FROM
    ? (TWILIO_WHATSAPP_FROM.startsWith('whatsapp:') ? TWILIO_WHATSAPP_FROM : `whatsapp:${TWILIO_WHATSAPP_FROM}`)
    : 'whatsapp:+14155238886'

  const to = MANAGER_WHATSAPP_TO
    ? (MANAGER_WHATSAPP_TO.startsWith('whatsapp:') ? MANAGER_WHATSAPP_TO : `whatsapp:${MANAGER_WHATSAPP_TO}`)
    : ''

  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && to) {
    try {
      const twilio = (await import('twilio')).default
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
      const body = composeMessage(lead)
      await client.messages.create({ from, to, body })
      return res.status(200).json({ success: true, notified: true, mode: 'twilio' })
    } catch (twilioErr) {
      console.error('[vercel-api] Twilio send failed:', twilioErr.message)
      return res.status(200).json({ success: true, notified: false, mode: 'twilio-error' })
    }
  }

  // Dry-run mode if Twilio is unconfigured
  console.log('[vercel-api] Lead received (dry-run mode):', lead)
  return res.status(200).json({ success: true, notified: false, mode: 'dry-run' })
}
