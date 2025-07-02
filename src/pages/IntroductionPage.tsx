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

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>)
    return (
        <div className="relative bg-pri-white">
            <div ref={containerRef} className="flex h-screen fixed top-0 left-0 z-40 bg-pri-white">
                <section className="recruit-section w-screen h-screen flex ">
                    <IntroSection />
                </section>
                <section className="recruit-section w-987 h-screen flex items-center justify-center">
                    <CertificationSection />
                </section>
                <section className="recruit-section w-[1484px] h-screen">
                    <RecruitProcessSection scrollerRef={containerRef as React.RefObject<HTMLDivElement>} />
                </section>
                <section className="recruit-section h-screen flex ml-384">
                    <ActivityReviewSection />
                </section>
                <section className="recruit-section h-screen flex ml-384">
                    <FAQSection />
                </section>
                <section className="recruit-section h-screen flex ml-384">
                    <ApplySection />
                </section>
            </div>
        </div>
    )
} 