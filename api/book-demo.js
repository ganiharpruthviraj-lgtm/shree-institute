// ---------------------------------------------------------------------------
// Vercel Serverless Function — POST /api/book-demo
// ---------------------------------------------------------------------------

const ALLOWED_CLASSES = ['Class 8', 'Class 9', 'Class 10']

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
  // CORS handling
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(45) ? res.status(200).json({ service: 'shree-institute-vercel-api' }) : null
  }

  const { error, lead } = validate(req.body || {})
  if (error) {
    return res.status(400).json({ success: false, error })
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, MANAGER_WHATSAPP_TO } =
    process.env

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
