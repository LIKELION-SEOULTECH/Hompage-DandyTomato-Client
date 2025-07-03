import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MainBanner from '@/assets/introduction/introduction_banner.png'
// import GlobalNavigation from './globalNavigation'
import mainBanner from '@/assets/main_banner.svg'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    useCarousel
} from '../components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import HighlightenTitle from '../components/HighlightenTitle'
import { useGSAP } from '@gsap/react'
import TagBadge from '../components/archive/TagBadge'
import PM from '@/assets/icons/PMIcon.svg'
import Design from '@/assets/icons/DesignIcon.svg'
import Backend from '@/assets/icons/BackendIcon.svg'
import Frontend from '@/assets/icons/FrontendIcon.svg'
import AI from '@/assets/icons/AIIcon.svg'
import { cn } from '@/lib/utils'
import PartBG1 from '@/assets/images/PartBoxBackground01.png'
import PartBG2 from '@/assets/images/PartBoxBackground02.png'
import PartBG3 from '@/assets/images/PartBoxBackground03.png'
import PartBG4 from '@/assets/images/PartBoxBackground04.png'
import PartBG5 from '@/assets/images/PartBoxBackground05.png'
import AnimatedButton from '@/components/ui/AnimatedButton'
import SharedButton from '@/components/SharedButton'
import InstaIcon from '@/assets/icons/insta_icon.svg'
import KakaoIcon from '@/assets/icons/kakao_icon.svg'
import ContactIcon from '@/assets/icons/contact_icon.svg'

import sticker01 from '@/assets/stickers/sticker01.png'
import sticker02 from '@/assets/stickers/sticker02.png'
import sticker03 from '@/assets/stickers/sticker03.png'
import sticker04 from '@/assets/stickers/sticker04.png'
import sticker05 from '@/assets/stickers/sticker05.png'
import sticker06 from '@/assets/stickers/sticker06.png'
import sticker07 from '@/assets/stickers/sticker07.png'
import sticker08 from '@/assets/stickers/sticker08.png'
import sticker09 from '@/assets/stickers/sticker09.png'
import sticker10 from '@/assets/stickers/sticker10.png'
import sticker11 from '@/assets/stickers/sticker11.png'
import sticker12 from '@/assets/stickers/sticker12.png'
import sticker13 from '@/assets/stickers/sticker13.png'
import sticker14 from '@/assets/stickers/sticker14.png'
import sticker15 from '@/assets/stickers/sticker15.png'
import sticker16 from '@/assets/stickers/sticker16.png'
import sticker17 from '@/assets/stickers/sticker17.svg'
import slogun from '@/assets/stickers/slogun.png'
import logo from '@/assets/stickers/logo.png'

import { subscribeRecruit } from '@/api/recruit'

gsap.registerPlugin(ScrollTrigger, useGSAP)
// 실제 섹션별 컴포넌트는 추후 분리/구현
export default function MainPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const lionContainerRef = useRef<HTMLDivElement>(null)
    const aboutContainerRef = useRef<HTMLDivElement>(null)
    const lionTitleRef = useRef<HTMLDivElement>(null)
    const aboutTitleRef = useRef<HTMLDivElement>(null)
    const projectContainerRef = useRef<HTMLDivElement>(null)
    const [isComplete, setIsComplete] = useState(false)
    useGSAP(
        () => {
            const sections = gsap.utils.toArray('.main-section')
            const totalWidth =
                containerRef.current.scrollWidth - window.innerWidth
            const lionWidth = containerRef.current?.scrollWidth - window.innerWidth
            const aboutWidth = containerRef.current?.scrollWidth - window.innerWidth
            if (isComplete) {
                const tween = gsap.to(containerRef.current, {
                    x: -totalWidth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        end: () => `+=${totalWidth}`,
                        // markers: true,
                    }
                })
                // HighlightenTitle sticky 효과
                gsap.to(lionTitleRef.current, {
                    x: lionWidth,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: lionTitleRef.current,
                        containerAnimation: tween,
                        start: `left 10%`, // 타이틀이 화면 상단에 닿을 때
                        end: () => `${lionWidth + window.innerWidth} left`,// 원하는 지점까지
                        pin: true,
                        pinSpacing: false, // 섹션이 밀리지 않게
                        // markers: true,// 섹션이 밀리지 않게
                        scrub: 0,
                        toggleActions: "play none reverse none",
                    },
                    // onEnter, onLeave 등으로 추가 효과도 가능
                });
                gsap.to(aboutTitleRef.current, {
                    display: 'hidden',
                    x: -window.innerWidth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: projectContainerRef.current,
                        containerAnimation: tween,
                        start: `left left`, // 타이틀이 화면 상단에 닿을 때
                        end: () => `${projectContainerRef.current?.scrollWidth + window.innerWidth / 2} left`,// 원하는 지점까지
                        toggleActions: "play none reverse none ",
                    }
                });
                gsap.to(aboutTitleRef.current, {
                    x: aboutWidth - window.innerWidth / 2,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: aboutTitleRef.current, // 타이틀이 화면 상단에 닿을 때
                        containerAnimation: tween,
                        start: `left 10%`, // 타이틀이 화면 상단에 닿을 때
                        end: () => `${aboutWidth + window.innerWidth / 2} left`,// 원하는 지점까지
                        pin: true,
                        pinSpacing: false, // 섹션이 밀리지 않게
                        scrub: 0,
                        toggleActions: "play none reverse none ",
                    },
                    // onEnter, onLeave 등으로 추가 효과도 가능
                });
            }
        },
        [isComplete]
    )
    const handleSubscribe = async () => {
        // if (!isLoggedIn) {
        //     navigate('/login')
        //     return
        // }
        // try {
        //     const res = await subscribeRecruit({ email })
        // } catch (e) {
        //     console.log('구독 요청에 실패했습니다.')
        // }
    }

    return (
        <div
            ref={containerRef}
            className="relative flex-row flex h-screen w-fit overflow-y-hidden">
            {/* Hero Section */}
            <StickerRain onCompleteHandler={() => setIsComplete(true)} />
            {/* LILON section */}
            <SectionLayout containerRef={lionContainerRef}>
                <SectionLion titleRef={lionTitleRef} />
            </SectionLayout>
            {/* About Section */}
            <SectionLayout className="gap-256 z-10">
                <SectionAbout titleRef={aboutTitleRef} containerRef={aboutContainerRef} />
            </SectionLayout>
            <SectionLayout className='bg-[oklch(96.7%_0.002869_84.6)]' containerRef={projectContainerRef}>
                <div className="flex flex-col items-baseline justify-center">
                    <HighlightenTitle
                        text="프로젝트"
                        className="mt-61"
                    />
                    <p className="font-pretendard text-32 text-pri-black mt-42 leading-[150%] tracking-[-0.96px] whitespace-pre-line">
                        아이디어톤, 중앙해커톤, 그리고 장기 프로젝트까지!
                        <br />
                        과기대 멋대의 다양한 프로젝트를 확인해보세요 ✨
                    </p>
                </div>
            </SectionLayout>
            <SectionLayout>
                <div className='w-screen h-full flex flex-row items-end justify-baseline gap-164'>
                    <img src={MainBanner} alt="" className=' object-left-top h-[100vh] top-0' />
                    <div className="flex flex-col items-start justify-between h-full w-fit">
                        <div>
                            <div className='flex flex-col items-start justify-center gap-16'>
                                <HighlightenTitle text="함께 성장할 14기를" />
                                <HighlightenTitle text="모집합니다!" />
                            </div>

                            <div className='flex flex-col items-start justify-center gap-28 mt-68'>
                                <AnimatedButton text="모집 페이지로 이동하기" color="#0B4066" onClick={() => navigate('/apply')} />

                                <SharedButton onClick={handleSubscribe} className='px-16 py-8 rounded-50'>
                                    모집 알림 받기
                                </SharedButton>
                            </div>

                        </div>


                        <div className="flex gap-24 flex-row">
                            <div className="flex items-center gap-10 bg-[#E4E5E9] p-24 rounded-15 font-pretendard text-[#032B49] font-bold tracking-[-0.6px] text-sub_seoultech_blue">
                                <img src={InstaIcon} alt="인스타그램" className="w-20 h-20" /> @likelion_st
                            </div>
                            <div className="flex items-center gap-10 bg-[#E4E5E9] p-24 rounded-15 font-pretendard text-[#032B49] font-bold tracking-[-0.6px] text-sub_seoultech_blue">
                                <img src={KakaoIcon} alt="카카오톡" className="w-20 h-20" /> @ajh1215hoo
                            </div>
                            <div className="flex items-center gap-10 bg-[#E4E5E9] px-24 rounded-15 font-pretendard text-[#032B49] font-bold tracking-[-0.6px] text-sub_seoultech_blue">
                                <img src={ContactIcon} alt="이메일" className="w-20 h-20" /> seoultech.likelion@gmail.com
                            </div>
                        </div>
                    </div>
                </div>

            </SectionLayout>
        </div>
    )
}

const SectionLion = ({ titleRef }: { titleRef: React.RefObject<HTMLDivElement> }) => {
    const LIONBox = ({
        titleLetter,
        titleWord,
        titleHanguel,
        description,
        className
    }: {
        titleLetter?: string
        titleWord: string
        titleHanguel: string
        description: string
        className?: string
    }) => {
        return (
            <div
                className={cn(
                    'flex w-450 flex-col items-baseline justify-center',
                    className
                )}>
                <p className="font-pretendard text-sub-seoultech-red leading-trim text-[256px] font-black z-2">
                    {titleLetter}
                </p>
                <p className="font-pretendard text-32 mt-95 font-bold whitespace-pre-line t">
                    <span className="text-sub-seoultech-red">{titleWord} </span>
                    <span className="text-sub-seoultech-blue">{titleHanguel}</span>
                </p>
                <span className="font-pretendard text-32 text-pri-black mt-48 font-medium whitespace-pre-line text-nowrap">
                    {description}
                </span>
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-col items-baseline justify-center h-full">

                <HighlightenTitle
                    text="LIKELION, 멋쟁이사자처럼"
                    ref={titleRef}
                    className="absolute top-189 left-128"
                />
                <HighlightenTitle
                    text="LIKELION, 멋쟁이사자처럼"
                    className='hidden'
                />
                <div className="mt-155 flex flex-row " >
                    <LIONBox
                        titleLetter="L"
                        titleWord="LEAD"
                        titleHanguel="주도적으로 이끌다"
                        description={'더 나은 방향을 향해, 도전하고\n끊임없이 시도합니다.'}
                        className="mr-120"
                    />
                    <LIONBox
                        titleLetter="I"
                        titleWord="IMMERSE"
                        titleHanguel="몰입하다"
                        description={'하나에 깊게 몰두하며,\n끝까지 나아갑니다.'}
                        className="mr-64"
                    />
                    <LIONBox
                        titleLetter="O"
                        titleWord="OPEN"
                        titleHanguel="열다"
                        description={'서로 다른 관점을 소통으로\n이어가며, 함께 성장합니다.'}
                        className="mr-124"
                    />
                    <LIONBox
                        titleLetter="N"
                        titleWord="NETWORK"
                        titleHanguel="연결하다"
                        description={'팀워크와 협력을 통해\n결과물을 창출합니다.'}
                    />
                </div>
            </div>
        </>

    )
}
const PartBox = ({
    part,
    logo,
    tags,
    description,
    background
}: {
    part: string
    logo: React.ReactNode
    tags: string[]
    description: string
    background: string
}) => {
    return (
        <div className="rounded-15 relative flex h-645 w-394 flex-col items-baseline justify-between overflow-hidden bg-cover bg-center px-32 py-64">
            <img
                className="absolute top-0 left-0 z-1 h-full w-full"
                src={background}
                alt=""
                draggable={false}
            />
            <span className="font-pretendard text-32 text-sub-seoultech-red bg-pri-white z-2 font-bold whitespace-pre-line">
                {part}
            </span>
            <div className="z-2 flex flex-col items-baseline justify-baseline gap-28">
                <div className="flex flex-row items-center justify-center">
                    {logo}
                </div>
                <div className="flex flex-row flex-wrap items-center justify-baseline gap-10">
                    {tags.map((tag, index) => (
                        <TagBadge
                            key={index}
                            tag={tag}
                            withHash={false}
                            className="font-pretendard border-2 font-bold"
                        />
                    ))}
                </div>
                <div className="flex flex-row items-center justify-center">
                    <span className="font-pretendard text-16 text-pri-black font-medium whitespace-pre-line">
                        {description}
                    </span>
                </div>
            </div>
        </div>
    )
}
const SectionAbout = ({ titleRef, containerRef }: { titleRef: React.RefObject<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement> }) => {
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
            <div className="rounded-15 relative flex h-645 w-394 flex-col items-baseline justify-baseline bg-amber-950 bg-[url('/images/about_image.png')] bg-cover bg-center px-32 py-64 z-2">
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

    return (
        <>
            <div className="flex flex-col items-baseline justify-center h-full" ref={containerRef}>
                <HighlightenTitle
                    text="가능성을 현실로, 도전을 성장으로."
                    ref={titleRef}
                    className="absolute top-189 left-128 z-1"
                />

                <HighlightenTitle
                    text="가능성을 현실로, 도전을 성장으로."
                    className='hidden'
                />
                <p className="font-pretendard text-32 text-pri-black mt-42 font-medium whitespace-pre-line z-2">
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
            <div className="flex flex-row gap-48 justify-end">
                <PartBox
                    part="기획 PM"
                    logo={
                        <img
                            src={PM}
                            alt="PM"
                        />
                    }
                    tags={[
                        '린스타트업 모델',
                        '문제 정의',
                        'IA',
                        'BM',
                        '플로우차트',
                        '와이어프레임',
                        '기능명세서'
                    ]}
                    description="서비스의 아이디어를 구체화하고, 어떤 기능이 필요한지 고민하며 팀원들과 협업해 프로젝트를 이끌어가는 역할을 해요."
                    background={PartBG1}
                />
                <PartBox
                    part="디자인 DESIGN"
                    logo={
                        <img
                            src={Design}
                            alt="Design"
                        />
                    }
                    tags={[
                        'UI/UX',
                        'Figma',
                        '디자인 시스템',
                        '시각디자인 원칙',
                        '브랜딩',
                        '개발자와의 협업'
                    ]}
                    description="프로젝트에서 사용자들이 편리하게 이용할 수 있도록 UX/UI 디자인을 만들고, 서비스의 비주얼 아이덴티티를 구축하는 역할을 해요."
                    background={PartBG2}
                />
                <PartBox
                    part="백엔드 BACK-END"
                    logo={
                        <img
                            src={Backend}
                            alt="Backend"
                        />
                    }
                    tags={[
                        'NoSQL',
                        'Mongo DB',
                        'Spring',
                        'Messaging Queue',
                        'Redisson Lock'
                    ]}
                    description="서비스 요구에 맞는 API를 개발하고, 배포와 운영을 통해 서버와 DB를 효율적으로 관리해요. 프레임워크를 활용해 실제 서비스 운영에 필요한 인프라를 구현해요."
                    background={PartBG3}
                />
                <PartBox
                    part="프론트엔드 FRONT-END"
                    logo={
                        <img
                            src={Frontend}
                            alt="Frontend"
                        />
                    }
                    tags={[
                        'React Hook',
                        'HTML',
                        'CSS',
                        'React Native',
                        '서버 상태 관리'
                    ]}
                    description="사용자 인터페이스를 구현하고, 서버와의 통신을 통해 서비스를 구성해요. 웹 클라이언트 개발에 필요한 기술을 기초부터 심화까지 배워나가요."
                    background={PartBG4}
                />
                <PartBox
                    part="인공지능 AI"
                    logo={
                        <img
                            src={AI}
                            alt="AI"
                        />
                    }
                    tags={[
                        '감정분석',
                        'YOLO',
                        '데이터 전처리',
                        '가상환경',
                        'Colab'
                    ]}
                    description="데이터를 분석하여  AI 모델을 설계해요. 머신러닝과 딥러닝을 활용해 서비스 기능을 고도화하거나 자동화하는 기술을 다뤄요."
                    background={PartBG5}
                />
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
        </>
    )
}

const SectionLayout = ({ children, containerRef, className, style }: { children: React.ReactNode, containerRef?: React.RefObject<HTMLDivElement>, className?: string, style?: React.CSSProperties }) => {
    return (
        <section className={cn("main-section flex h-screen w-fit flex-row items-end justify-end gap-128 bg-[oklch(96.7%_0.002869_84.6)] pl-128 pt-189 pb-128 pr-64 relative", className)} ref={containerRef} style={style}>
            {children}
        </section>
    )
}
function StickerRain({ onCompleteHandler }: { onCompleteHandler: () => void }) {
    const containerRef = useRef(null)

    const stickers = [
        {
            id: 'sticker01',
            src: sticker01,
            x: 210,
            y: 137,
            rotation: -37
        },
        { id: 'sticker02', src: sticker02, x: 490.55, y: 176.4, rotation: 7 },
        { id: 'sticker03', src: sticker03, x: 1235, y: 195, rotation: 9 },
        {
            id: 'sticker04',
            src: sticker04,
            x: 1442.5,
            y: 298,
            rotation: 28
        },
        { id: 'sticker05', src: sticker05, x: 142.5, y: 263, rotation: 7 },
        {
            id: 'sticker06',
            src: sticker06,
            x: 720,
            y: 222,
            rotation: -14.75
        },
        {
            id: 'sticker07',
            src: sticker07,
            x: 1300,
            y: 364,
            rotation: -17.5
        },
        {
            id: 'sticker08',
            src: sticker08,
            x: 1374.45,
            y: 732,
            rotation: -9.65
        },
        { id: 'sticker09', src: sticker09, x: 220.42, y: 318.4, rotation: 13 },
        { id: 'sticker10', src: sticker10, x: 757.62, y: 322.88, rotation: 8.3 },
        { id: 'sticker11', src: sticker11, x: 1205.5, y: 572.07, rotation: 49.3 },
        { id: 'sticker12', src: sticker12, x: 649.13, y: 562.03, rotation: 8 },
        {
            id: 'sticker13',
            src: sticker13,
            x: 1140.76,
            y: 691.35,
            rotation: 16.5
        },
        { id: 'sticker14', src: sticker14, x: 103, y: 385.69, rotation: 18 },
        {
            id: 'sticker15',
            src: sticker15,
            x: 141.48,
            y: 658.53,
            rotation: -13.83
        },
        { id: 'sticker16', src: sticker16, x: 153.23, y: 727.69, rotation: 10.3 },
        { id: 'sticker17', src: sticker17, x: 611.98, y: 347, rotation: 0 }
    ]

    useGSAP(() => {
        const stickers1 = stickers.slice(0, stickers.length / 2)
        const stickers2 = stickers.slice(stickers.length / 2)
        stickers1.forEach(({ id, x, y }, index) => {
            const el = containerRef.current.querySelector(`#${id}`)


            gsap.from(el, {
                x: x + 1000,
                opacity: 1,
                ease: 'back.out',
                duration: 1.3,
                delay: Math.random() * 0.4 + index * 0.05 // 랜덤 + 살짝 시간차
            })
        })

        stickers2.forEach(({ id, x, y }, index) => {
            const el = containerRef.current.querySelector(`#${id}`)


            gsap.from(el, {
                y: y + 1000,
                opacity: 1,
                ease: 'back.out',
                duration: 1.3,
                delay: Math.random() * 0.6 + index * 0.05
            })
        })
        const tl = gsap.timeline()
        tl.to('#overlay', {
            opacity: 0.5,
            x: 0,
            y: 0,
            duration: 1,
            delay: 1.5,
        })
        tl.to('#finalReveal', {
            opacity: 1,
            duration: 1.2,
            delay: 0.5,
            ease: 'back.out',
            onComplete: () => {
                onCompleteHandler()
                tl.kill()
            }
        })
    }, [])

    return (
        <div className="main-section h-fit w-fit relative" ref={containerRef} style={{
            background:
                'radial-gradient(79.41% 100% at 50% 100%, rgba(255, 251, 244, 0.20) 57.66%, rgba(248, 193, 145, 0.20) 72.15%, rgba(239, 130, 130, 0.20) 87.14%, rgba(116, 118, 126, 0.20) 100%), #F5F4F2'
        }} >
            {/* 시안 1 */}
            <div

                className="pointer-events-none 
                w-screen h-screen"
            >
            </div>
            <div className="h-full w-full bg-pri-white z-10 absolute top-0 left-0 opacity-0" id="overlay" />
            <div
                className="flex flex-col items-center opacity-0 z-20 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                id="finalReveal">
                <img
                    src={logo}
                    id="logo"
                    className="drag-none select-none w-240 object-contain h-240 rotate-z-[13deg]"
                />
                <img
                    src={slogun}
                    id="slogun"
                    className="drag-none select-none"
                />
            </div>

            {
                stickers.map(({ id, src, x, y, rotation }) => (
                    <img
                        key={id}
                        id={id}
                        src={src}
                        className={`absolute translate-x-1/2 translate-y-1/2 scale-100 origin-center drag-none select-none`}
                        style={
                            {
                                left: `calc(${x} * 0.05787037037037037vw)`,
                                top: `calc(${y + 100} * 0.09259259259259259vh)`,
                                transform: `rotateZ(${rotation}deg)`
                            }
                        }
                    />
                ))
            }
        </div >

    )
}
