import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StickerRain from '@/test'
// import GlobalNavigation from './globalNavigation'
import mainBanner from '@/assets/main_banner.svg'
gsap.registerPlugin(ScrollTrigger)

// Figma: 메인페이지 전체 레이아웃 (node-id=1277-701)
// 실제 섹션별 컴포넌트는 추후 분리/구현
export default function MainPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const sections = gsap.utils.toArray('.main-section')
        if (!containerRef.current || sections.length === 0) return

        // gsap.to(sections, {
        //     xPercent: -100 * (sections.length - 1),
        //     ease: 'none',
        //     scrollTrigger: {
        //         trigger: containerRef.current,
        //         pin: true,
        //         scrub: 1,
        //         anticipatePin: 1,
        //         // snap: 1 / (sections.length - 1),
        //         end: () =>
        //             '+=' +
        //             (containerRef.current!.offsetWidth *
        //                 (sections.length - 1) *
        //                 1) /
        //                 10
        //     }
        // })
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
        <div
            ref={containerRef}
            className="scrollbar-hide relative flex h-screen w-[400vw] overflow-x-hidden">
            {/* Hero Section */}
            <section
                className="main-section flex h-[100vh] w-[100vw] items-center justify-center border-b border-[#E5E5E5] bg-white"
                style={{
                    background:
                        'radial-gradient(79.41% 100% at 50% 100%, rgba(255, 251, 244, 0.20) 57.66%, rgba(248, 193, 145, 0.20) 72.15%, rgba(239, 130, 130, 0.20) 87.14%, rgba(116, 118, 126, 0.20) 100%), #F5F4F2'
                }}>
                {/* <StickerRain /> */}

                <video
                    autoPlay
                    muted
                    loop
                    className="h-full w-full object-fill object-center"
                    poster={mainBanner}>
                    <source
                        src="/videos/main.mp4"
                        type="video/mp4"
                    />
                    <img
                        src={mainBanner}
                        alt="main_banner"
                        className="h-full w-full object-cover"
                    />
                </video>
            </section>
            {/* About Section */}
            <section className="main-section flex h-screen w-screen flex-col items-center justify-center bg-[#F8F8F8]">
                <h2 className="font-pretendard mb-6 text-[32px] font-bold text-[#222]">
                    About
                </h2>
                <p className="font-pretendard text-[18px] text-[#666]">
                    Figma 명세에 맞는 소개/설명 영역
                </p>
            </section>
            {/* Project Section */}
            {/* <section className="main-section flex h-screen w-screen flex-col items-center justify-center bg-white">
                <h2 className="font-pretendard mb-6 text-[32px] font-bold text-[#222]">
                    Project
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3"> */}
            {/* Project Card 예시 */}
            {/* <div className="rounded-xl bg-white p-8 text-center shadow">
                        <span className="mb-2 block text-[24px] font-bold">
                            Feature 1
                        </span>
                        <span className="text-[#666]">설명</span>
                    </div>
                    <div className="rounded-xl bg-white p-8 text-center shadow">
                        <span className="mb-2 block text-[24px] font-bold">
                            Feature 2
                        </span>
                        <span className="text-[#666]">설명</span>
                    </div>
                    <div className="rounded-xl bg-white p-8 text-center shadow">
                        <span className="mb-2 block text-[24px] font-bold">
                            Feature 3
                        </span>
                        <span className="text-[#666]">설명</span>
                    </div>
                </div>
            </section> */}
            {/* FAQ Section (아코디언 활용) */}
            {/* <section className="main-section flex h-screen w-screen flex-col items-center justify-center bg-[#F8F8F8]">
                <h2 className="font-pretendard mb-6 text-[32px] font-bold text-[#222]">
                    FAQ
                </h2> */}
            {/* FAQ Accordion 컴포넌트 자리 */}
            {/* </section> */}
            {/* Footer */}
            {/* <footer className="font-pretendard w-full border-t border-[#E5E5E5] bg-white py-10 text-center text-[14px] text-[#999]">
                © 2024 멋쟁이 토마토. All rights reserved.
            </footer> */}
        </div>
    )
}
