import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element enters the viewport.
 * @param {IntersectionObserverInit} options
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // trigger once
        }
      },
      { threshold: 0.12, ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
