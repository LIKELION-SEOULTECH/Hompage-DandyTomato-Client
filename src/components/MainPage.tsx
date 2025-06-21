import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StickerRain from '@/test'
// import GlobalNavigation from './globalNavigation'
import mainBanner from '@/assets/main_banner.svg'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    useCarousel
} from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
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
            className="scrollbar-hide relative flex h-screen w-[400vw] overflow-y-hidden">
            {/* Hero Section */}
            <section
                className="main-section flex h-[100vh] w-[100vw] items-center justify-center border-b border-[#E5E5E5] bg-white py-128"
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
            <section className="main-section flex h-screen flex-row items-end gap-128 bg-[#F8F8F8] px-128 py-128">
                <div className="flex flex-col items-baseline justify-center">
                    <h2 className="font-pretendard text-64 text-pri-white bg-sub-seoultech-red mt-61 leading-none font-bold tracking-[-1.92px]">
                        가능성을 현실로, 도전을 성장으로.
                    </h2>
                    <p className="font-pretendard text-32 text-pri-black mt-42 leading-[150%] tracking-[-0.96px] whitespace-pre-line">
                        국내 121개 대학 지점을 보유한 대학생 연합 IT 벤처 창업
                        동아리
                        <br />
                        멋쟁이사자처럼 대학을 소개합니다 👏
                    </p>
                    <div className="mt-155 flex flex-row gap-48">
                        <AboutBox
                            title="과기대 멋대,
                        SINCE"
                            description="2024"
                        />
                        <AboutBox
                            title="과기대 멋대와 함께한
                         아기사자들"
                            description="55명"
                        />
                        <AboutBox
                            title="과기대 멋대에서
                        제작한 프로젝트들"
                            description="NN개"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-48">
                    <AboutImageBox
                        image={''}
                        title="정기 세션"
                        description="기초부터 실천까지!
과기대 멋대만의 자료를 통해
실습 중심의 스터디를 진행해요."
                        note="매주 목요일 오후 7시 - 오후 9시 (시험기간 제외)"
                    />
                    <AboutImageBox
                        image={''}
                        title="아이디어톤"
                        description="멋쟁이사자처럼 대학 중앙에서 주관하는 행사로,
머릿속에만 있던 아이디어를 구체화하고
결과물의 형태로 꺼내보는 여정이에요."
                        note="5월 중 진행"
                    />
                    <AboutImageBox
                        image={''}
                        title="중앙해커톤"
                        description="팀과 함께 성장하는 협업의 경험
짧은 시간 안에 함께 완성해가는 협업 중심의
프로젝트예요."
                        note="7월 - 8월 중 진행"
                    />
                    <AboutImageBox
                        image={''}
                        title="데모데이"
                        description="런칭부터 검증까지, 완성도를 향해 나아가는ㅡ
기획, 개발, 릴리즈, 그리고 그 이후까지.
더 나은 결과를 위한 전 과정을 함께 경험해요."
                        note="12월 중 진행"
                    />
                </div>
            </section>
            <section className="main-section flex h-screen flex-row items-baseline gap-145 bg-[#F8F8F8] px-128 py-128">
                <div className="flex flex-col items-baseline justify-center">
                    <h2 className="font-pretendard text-64 text-pri-white bg-sub-seoultech-red mt-61 leading-none font-bold tracking-[-1.92px]">
                        프로젝트
                    </h2>
                    <p className="font-pretendard text-32 text-pri-black mt-42 leading-[150%] tracking-[-0.96px] whitespace-pre-line">
                        아이디어톤, 중앙해커톤, 그리고 장기 프로젝트까지!
                        <br />
                        과기대 멋대의 다양한 프로젝트를 확인해보세요 ✨
                    </p>
                </div>
                <div>
                    <Carousel
                        orientation="vertical"
                        plugins={[Autoplay({ delay: 2000 })]}>
                        <CarouselContent>
                            <CarouselItem>
                                <AboutImageBox
                                    image={''}
                                    title="데모데이"
                                    description="런칭부터 검증까지, 완성도를 향해 나아가는ㅡ
기획, 개발, 릴리즈, 그리고 그 이후까지.
더 나은 결과를 위한 전 과정을 함께 경험해요."
                                    note="12월 중 진행"
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <AboutImageBox
                                    image={''}
                                    title="데모데이"
                                    description="런칭부터 검증까지, 완성도를 향해 나아가는ㅡ
기획, 개발, 릴리즈, 그리고 그 이후까지.
더 나은 결과를 위한 전 과정을 함께 경험해요."
                                    note="12월 중 진행"
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <AboutImageBox
                                    image={''}
                                    title="데모데이"
                                    description="런칭부터 검증까지, 완성도를 향해 나아가는ㅡ
기획, 개발, 릴리즈, 그리고 그 이후까지.
더 나은 결과를 위한 전 과정을 함께 경험해요."
                                    note="12월 중 진행"
                                />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </section>
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

const AboutBox = ({
    title,
    description
}: {
    title: string
    description: string
}) => {
    return (
        <div className="px- 43 rounded-15 bg-pri-gray-1 flex h-394 w-394 flex-col items-center justify-center gap-6 py-80 text-center">
            <h3 className="font-pretendard text-32 font-bold whitespace-pre-line text-[#222]">
                {title}
            </h3>
            <p className="font-pretendard text-100 text-sub-seoultech-blue font-bold whitespace-pre-line">
                {description}
            </p>
        </div>
    )
}

const AboutImageBox = ({
    image,
    title,
    description,
    note
}: {
    image?: string
    title: string
    description: string
    note: string
}) => {
    return (
        <div className="rounded-15 relative flex h-645 w-394 flex-col items-baseline justify-baseline bg-amber-950 bg-[url('/images/about_image.png')] bg-cover bg-center px-32 py-64">
            <div className="absolute top-422 flex flex-col justify-center gap-16">
                <div>
                    <span className="font-pretendard text-32 text-sub-seoultech-blue bg-pri-white leading-none font-bold tracking-[-0.96px] whitespace-pre-line">
                        {title}
                    </span>
                </div>
                <p className="font-pretendard text-16 text-pri-white leading-[150%] font-medium whitespace-pre-line">
                    {description}
                </p>
                <p className="font-pretendard text-11 leading-[150%] font-bold whitespace-pre-line text-[#EEA596]">
                    {note}
                </p>
            </div>
        </div>
    )
}

const CarouselControl = () => {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
        useCarousel()

    return (
        <div>
            <Button onClick={scrollPrev}>Previous</Button>
        </div>
    )
}
