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
import FAQSection from './sections/FAQSection'
import ApplySection from './sections/ApplySection'

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const applySectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !applySectionRef.current) return;

    // ApplySection의 끝 위치 계산
    const applySectionEnd = applySectionRef.current.offsetLeft + applySectionRef.current.offsetWidth;
    const totalWidth = applySectionEnd - window.innerWidth;

    gsap.to(containerRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => `+=${totalWidth - 384}`
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])

  return (
    <div className="relative bg-white overflow-y-scroll scrollbar-hide">
      <div className="h-[totalWidth]">
      </div>

      <div
        ref={containerRef}
        className="flex h-screen fixed top-0 left-0 z-40 bg-white"
      >
        <section className="recruit-section w-screen h-screen flex">
          <IntroSection />
        </section>
        <section className="recruit-section w-987 h-screen flex items-center justify-center ml-384">
          <CertificationSection />
        </section>
        <section className="recruit-section w-[1484px] h-screen ml-384">
          <RecruitProcessSection scrollerRef={containerRef as React.RefObject<HTMLDivElement>} />
        </section>
        <section className="recruit-section h-screen flex ml-384">
          <ActivityReviewSection />
        </section>
        <section className="recruit-section h-screen flex ml-384">
          <FAQSection />
        </section>
        <section ref={applySectionRef} className="recruit-section h-screen flex ml-384">
          <ApplySection />
        </section>
      </div>
    </div>
  )
}