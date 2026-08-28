// ---------------------------------------------------------------------------
// Single place that talks to the booking API. Both forms (hero + admissions)
// go through this so error handling and the base URL never drift.
// ---------------------------------------------------------------------------

// Set VITE_API_BASE_URL in .env for staging/production. The default is the local
// Express server from shree-institute/server.
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')
const GOOGLE_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  'https://script.google.com/macros/s/AKfycbxZc7A0gyKCxZ0biM-5J_0boNcLzOU9PZA4SkYXvU--mFOzQyTIIvTmogr38kgAuEs4/exec'

const TIMEOUT_MS = 10_000

/**
 * Send lead payload directly to Google Apps Script Web App if configured.
 */
async function postToGoogleSheet(payload) {
  if (!GOOGLE_SHEET_URL) return false
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: payload.studentName || 'Not provided',
        class: payload.studentClass || 'Not specified',
        phone: payload.parentPhone,
        source: payload.source || 'Website',
      }),
      mode: 'no-cors',
    })
    return true
  } catch (sheetError) {
    console.warn('[GoogleSheet] Lead sync warning:', sheetError.message)
    return false
  }
}

/**
 * POST a demo-class booking.
 *
 * @param {{ studentName?: string, studentClass?: string, parentPhone: string, source?: 'hero' }} payload
 * @returns {Promise<{ success: true, notified: boolean, mode: string }>}
 * @throws {Error} with a message that is safe to show a parent verbatim.
 */
export async function bookDemo(payload) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let sheetSaved = false
  try {
    sheetSaved = await postToGoogleSheet(payload)
  } catch (err) {
    console.warn('[GoogleSheet] Sync error:', err)
  }

  try {
    const response = await fetch(`${BASE_URL}/api/book-demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    // A 400/429 still carries a useful message, so parse before checking status.
    const data = await response.json().catch(() => ({}))

    if (!response.ok || !data.success) {
      if (sheetSaved) {
        return { success: true, notified: false, mode: 'google-sheet' }
      }
      throw new Error(data.error || `Something went wrong (${response.status}). Please call us.`)
    }

    return data
  } catch (error) {
    // If the data was saved to Google Sheets, show success on the website!
    if (sheetSaved) {
      return { success: true, notified: false, mode: 'google-sheet' }
    }
    if (error.name === 'AbortError') {
      throw new Error('That took too long. Please try again or call us directly.')
    }
    // fetch() rejects with a TypeError when the server is unreachable or CORS
    // blocked the request — both look identical from here.
    if (error instanceof TypeError) {
      throw new Error('Could not reach the server. Please call us directly.')
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}
