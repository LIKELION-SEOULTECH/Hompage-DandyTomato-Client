// src/components/recruit/RecruitPage.tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import GlowToggleButton from '../ui/glow-toggle-button'
import IntroSection from './sections/IntroSection'

gsap.registerPlugin(ScrollTrigger)

export default function RecruitPage() {
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
        <div className="h-[400vh] bg-gray-100">

        </div>
  
        <div
          ref={containerRef}
          className="flex h-screen w-[400vw] fixed top-0 left-0 z-40"
        >
          <section className="recruit-section w-screen h-screen flex">
            <IntroSection/>
          </section>
          <section className="recruit-section w-screen h-screen flex items-center justify-center border bg-[#FDEBD0] text-4xl font-bold">
            Section 2: 일정
          </section>
          <section className="recruit-section w-screen h-screen flex items-center justify-center border bg-[#D5F5E3] text-4xl font-bold">
            Section 3: 지원 방법
            <Button variant="default" size="lg" asChild>
            <a
              href="https://your-google-form-link.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              지원하러 가기 →
            </a>
          </Button>
          </section>
          <section className="recruit-section w-screen h-screen flex items-center justify-center border bg-[#FADBD8] text-4xl font-bold">
            Section 4: 자주 묻는 질문
          </section>
        </div>
      </div>
    )
  }