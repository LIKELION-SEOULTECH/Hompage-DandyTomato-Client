// src/components/recruit/RecruitPage.tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import GlowToggleButton from '../ui/glow-toggle-button'
import IntroSection from './sections/IntroSection'
import CertificationSection from './sections/CertificationSection'
import RecruitProcessSection from './sections/RecruitProcessSection'
import ActivityReviewSection from './sections/ActivityReviewSection'

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const totalWidth = containerRef.current.scrollWidth - window.innerWidth

    gsap.to(containerRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => `+=${totalWidth}`
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="relative bg-white">
      <div className="h-[400vh]">

      </div>

      <div
        ref={containerRef}
        className="flex h-screen w-[800vw] fixed top-0 left-0 z-40  bg-white"
      >
        <section className="recruit-section w-[987px] h-screen flex ">
          <IntroSection />
        </section>
        <section className="recruit-section w-987 h-screen flex items-center justify-center">
          <CertificationSection />
        </section>
        <section className="recruit-section w-[1484px] h-screen">
          <RecruitProcessSection scrollerRef={containerRef as React.RefObject<HTMLDivElement>} />
        </section>
        <section className="recruit-section w-[1484px] h-screen flex ml-200">
          <ActivityReviewSection />
        </section>
        <section className="recruit-section w-screen h-screen flex ">
          안녕
        </section>
      </div>
    </div>
  )
}