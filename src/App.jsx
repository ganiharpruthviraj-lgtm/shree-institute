import { useEffect } from 'react'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Programs from './components/Programs'
import WhyUs from './components/WhyUs'
import Toppers from './components/Toppers'
import Testimonials from './components/Testimonials'
import Admissions from './components/Admissions'

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#010101] text-white">
      <ScrollProgress />
      <Hero />
      <StatsBar />
      <Programs />
      <WhyUs />
      <Toppers />
      <Testimonials />
      <Admissions />
    </div>
  )
}
