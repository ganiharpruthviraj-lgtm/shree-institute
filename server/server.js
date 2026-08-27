// ---------------------------------------------------------------------------
// Shree Institute of Learning — demo-booking API.
//
// One job: accept a lead from the landing page, never lose it, and ping the
// institute manager on WhatsApp.
//
// Run:  npm install && npm start   (from this directory)
// ---------------------------------------------------------------------------

const fs = require('fs')
const path = require('path')

// Load .env from THIS directory, not process.cwd(). The server is often started
// from the repo root (`node shree-institute/server/server.js`), and the default
// cwd-relative lookup would silently find nothing.
require('dotenv').config({ path: path.join(__dirname, '.env') })

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = Number(process.env.PORT) || 5000
const LEADS_FILE = path.join(__dirname, 'leads.jsonl')

// --------------------------------------------------------------------- twilio

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

/** Twilio wants both endpoints as `whatsapp:+E164`. Tolerate either form in .env. */
function whatsappAddress(value) {
  if (!value) return ''
  const trimmed = value.trim()
  return trimmed.startsWith('whatsapp:') ? trimmed : `whatsapp:${trimmed}`
}

// Default is Twilio's shared WhatsApp Sandbox number.
const WHATSAPP_FROM = whatsappAddress(process.env.TWILIO_WHATSAPP_FROM || '+14155238886')
const MANAGER_TO = whatsappAddress(process.env.MANAGER_WHATSAPP_TO)

let twilioClient = null
let twilioError = null

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && MANAGER_TO) {
  try {
    twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  } catch (error) {
    twilioError = error.message
  }
}

// Without credentials the server still works — it prints the WhatsApp message it
// *would* have sent. That keeps the front-end fully testable before anyone signs
// up for Twilio.
const MODE = twilioClient ? 'twilio' : 'dry-run'

// ----------------------------------------------------------------- middleware

// Deliberately an allowlist rather than a bare `cors()`: this endpoint writes to
// disk and spends Twilio credit, so it should not accept cross-origin posts from
// anywhere on the internet. Add your production origin to ALLOWED_ORIGINS.
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  'http://localhost:5180,http://localhost:5181,http://localhost:5173,http://127.0.0.1:5180'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    // `cb(null, false)` omits the CORS header so the browser blocks it. Throwing
    // here would turn a rejected origin into a confusing 500 instead.
    origin: (origin, cb) => cb(null, !origin || ALLOWED_ORIGINS.includes(origin)),
    methods: ['GET', 'POST'],
  })
)

app.use(express.json({ limit: '10kb' }))

// Behind nginx / Render / Railway, req.ip is the proxy's address unless this is
// set — which would put every visitor in the same rate-limit bucket. Off by
// default because trusting X-Forwarded-For when you aren't behind a proxy lets
// a client spoof its own IP.
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1)

// Crude in-memory throttle — enough to stop a bored visitor from draining the
// Twilio balance. Swap for `express-rate-limit` + Redis if you scale out.
const MAX_PER_WINDOW = 5
const WINDOW_MS = 10 * 60 * 1000
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

// ----------------------------------------------------------------- validation

const ALLOWED_CLASSES = ['Class 8', 'Class 9', 'Class 10']

/**
 * Normalise an Indian mobile number to +91XXXXXXXXXX.
 * Accepts 9876543210, 09876543210, 919876543210, +91 98765 43210, etc.
 */
function normalisePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '')
  const local = digits.startsWith('91') && digits.length === 12
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

  // The hero form only collects a phone number, so name and class are optional.
  const studentName = String(body.studentName || '').trim().slice(0, 80)
  if (studentName && studentName.length < 2) {
    return { error: 'Please enter the student’s full name.' }
  }

  const studentClass = String(body.studentClass || '').trim()
  if (studentClass && !ALLOWED_CLASSES.includes(studentClass)) {
    return { error: 'Please choose Class 8, Class 9 or Class 10.' }
  }

  return {
    lead: {
      studentName: studentName || 'Not provided',
      studentClass: studentClass || 'Not specified',
      parentPhone,
      source: body.source === 'hero' ? 'Hero form' : 'Admission form',
    },
  }
}

// -------------------------------------------------------------------- storage

/** Append-only log. Written before the WhatsApp attempt so a lead is never lost. */
async function recordLead(lead) {
  const line = JSON.stringify({ ...lead, receivedAt: new Date().toISOString() })
  await fs.promises.appendFile(LEADS_FILE, `${line}\n`, 'utf8')
}

// ---------------------------------------------------------------- notification

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

async function notifyManager(lead) {
  const body = composeMessage(lead)

  if (!twilioClient) {
    console.log('\n--- WhatsApp (dry-run, no Twilio credentials) ---')
    console.log(`to: ${MANAGER_TO || '(MANAGER_WHATSAPP_TO not set)'}`)
    console.log(body)
    console.log('------------------------------------------------\n')
    return { notified: false, reason: 'Twilio not configured — message logged instead.' }
  }

  const message = await twilioClient.messages.create({ from: WHATSAPP_FROM, to: MANAGER_TO, body })
  return { notified: true, sid: message.sid }
}

// ------------------------------------------------------------------- routes

app.get('/', (_req, res) => {
  res.json({
    service: 'shree-institute-server',
    endpoints: ['GET /api/health', 'POST /api/book-demo'],
  })
})

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mode: MODE,
    manager: MANAGER_TO ? 'configured' : 'missing MANAGER_WHATSAPP_TO',
    twilioError,
    allowedOrigins: ALLOWED_ORIGINS,
  })
})

app.post('/api/book-demo', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'

  if (rateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please call us directly and we’ll book you in.',
    })
  }

  const { error, lead } = validate(req.body || {})
  if (error) {
    return res.status(400).json({ success: false, error })
  }

  try {
    await recordLead(lead)
  } catch (writeError) {
    // Losing the lead is the only truly unrecoverable failure here.
    console.error('[book-demo] could not write lead:', writeError)
    return res.status(500).json({
      success: false,
      error: 'Something went wrong on our side. Please call us directly.',
    })
  }

  try {
    const result = await notifyManager(lead)
    console.log(
      `[book-demo] ${lead.parentPhone} (${lead.studentClass}) — notified: ${result.notified}`
    )
    return res.json({ success: true, notified: result.notified, mode: MODE })
  } catch (notifyError) {
    // The lead is already on disk, so this is not the parent's problem: still
    // report success to them, but make it loud in the logs.
    console.error('[book-demo] WhatsApp send failed:', notifyError.message)
    return res.json({ success: true, notified: false, mode: MODE })
  }
})

app.use((_req, res) => res.status(404).json({ success: false, error: 'Not found' }))

app.use((error, _req, res, _next) => {
  // Malformed JSON lands here via express.json().
  console.error('[server]', error.message)
  res.status(400).json({ success: false, error: 'Bad request' })
})

app.listen(PORT, () => {
  console.log(`shree-institute-server listening on http://localhost:${PORT}`)
  console.log(`WhatsApp mode: ${MODE}${MODE === 'dry-run' ? ' (messages printed to this console)' : ''}`)
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`)
})
