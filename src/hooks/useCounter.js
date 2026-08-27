import { useEffect, useState } from 'react'

/**
 * Animates a numeric string (e.g. "1,200+", "98.4%") from 0 to its final value
 * when `active` becomes true.
 *
 * Parses the leading number; suffix (e.g. "+", "%", ":15") is preserved.
 */
export function useCounter(rawValue, active, duration = 1400) {
  // Extract numeric part and the suffix
  const match = String(rawValue).match(/^([\d,\.]+)(.*)$/)
  const numeric = match ? parseFloat(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : ''
  const hasDecimal = String(numeric).includes('.')
  const decimalPlaces = hasDecimal ? (String(numeric).split('.')[1] || '').length : 0

  const [display, setDisplay] = useState('0' + suffix)

  useEffect(() => {
    if (!active) return

    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numeric * eased

      // Format with commas for large numbers
      const formatted =
        numeric >= 1000
          ? current.toLocaleString('en-IN', {
              maximumFractionDigits: decimalPlaces,
              minimumFractionDigits: decimalPlaces,
            })
          : current.toFixed(decimalPlaces)

      setDisplay(formatted + suffix)

      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [active])

  return display
}
