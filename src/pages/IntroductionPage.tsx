import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import GlowToggleButton from '../components/ui/glow-toggle-button'
import IntroSection from '../components/introduction/sections/IntroSection'
import CertificationSection from '../components/introduction/sections/CertificationSection'
import RecruitProcessSection from '../components/introduction/sections/RecruitProcessSection'
import ActivityReviewSection from '../components/introduction/sections/ActivityReviewSection'
import FAQSection from '../components/introduction/sections/FAQSection'
import ApplySection from '../components/introduction/sections/ApplySection'

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const applySectionRef = useRef<HTMLDivElement>(null)
    const dummyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current || !applySectionRef.current || !dummyRef.current) return;

        // ApplySection의 끝 위치 계산
        const applySectionEnd = applySectionRef.current.offsetLeft + applySectionRef.current.offsetWidth;
        const totalWidth = applySectionEnd - window.innerWidth;

        // 더미 div의 height를 totalWidth로만 설정
        dummyRef.current.style.height = `${totalWidth}px`;

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
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [])

    return (
        <div className="relative bg-white">
            <div ref={dummyRef}></div>

            <div
                ref={containerRef}
                className="flex h-screen fixed top-0 left-0 z-40 bg-white"
            >
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
                <section ref={applySectionRef} className="recruit-section h-screen flex ml-384">
                    <ApplySection />
                </section>
            </div>
        </div>
    )
} 