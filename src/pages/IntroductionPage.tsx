import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntroSection from '../components/introduction/sections/IntroSection'
import CertificationSection from '../components/introduction/sections/CertificationSection'
import RecruitProcessSection from '../components/introduction/sections/RecruitProcessSection'
import ActivityReviewSection from '../components/introduction/sections/ActivityReviewSection'
import FAQSection from '../components/introduction/sections/FAQSection'
import ApplySection from '../components/introduction/sections/ApplySection'
import useHorizontalScroll from '@/hooks/useHorizontalScroll'
import AnimatedButton from '@/components/ui/AnimatedButton'

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const applySectionRef = useRef<HTMLDivElement>(null)

    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>)
    // 버튼 클릭 시 스크롤을 마지막까지 이동
    const handleGoToEnd = () => {
        if (!containerRef.current || !applySectionRef.current) return
        const applySectionEnd = applySectionRef.current.offsetLeft + applySectionRef.current.offsetWidth
        const totalWidth = applySectionEnd - window.innerWidth
        // 스크롤을 마지막까지 이동 (세로 스크롤이지만, pin 구조에서는 top이 맞음)
        window.scrollTo({ top: totalWidth, behavior: 'smooth' })
    }
    return (

        <div className="relative overflow-y-scroll scrollbar-hide">
            <div
                ref={containerRef}
                className="flex h-screen fixed top-0 left-0 z-40"
            >
                <section className="recruit-section w-screen h-screen flex">
                    <IntroSection handleGoToEnd={handleGoToEnd} />
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