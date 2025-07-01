// src/components/recruit/RecruitPage.tsx
import { useEffect, useRef, useState } from 'react'
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
import AnimatedButton from '../ui/AnimatedButton'

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionPage() {
  const [showButton, setShowButton] = useState(true)
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
        end: () => `+=${totalWidth}`,
        onUpdate: (self) => {
          if (self.progress >= 0.99) setShowButton(false)
          else setShowButton(true)
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])

  // 버튼 클릭 시 스크롤을 마지막까지 이동
  const handleGoToEnd = () => {
    if (!containerRef.current || !applySectionRef.current) return
    const applySectionEnd = applySectionRef.current.offsetLeft + applySectionRef.current.offsetWidth
    const totalWidth = applySectionEnd - window.innerWidth
    // 스크롤을 마지막까지 이동 (세로 스크롤이지만, pin 구조에서는 top이 맞음)
    window.scrollTo({ top: totalWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative bg-white overflow-y-scroll scrollbar-hide">
      {showButton && (
        <div className="fixed right-100 top-[19vh] z-50">
          <AnimatedButton text="바로 지원하기" color="#F14B2D" onClick={handleGoToEnd} />
        </div>
      )}
      <div className="h-[totalWidth]">
      </div>

      <div
        ref={containerRef}
        className="flex h-screen fixed top-0 left-0 z-40 bg-white"
      >
        <section className="recruit-section w-screen h-screen flex">
          <IntroSection />
        </section>
        <section className="recruit-section w-987 h-screen flex items-center justify-center ml-128">
          <CertificationSection />
        </section>
        <section className="recruit-section w-[2395px] h-screen ml-384">
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