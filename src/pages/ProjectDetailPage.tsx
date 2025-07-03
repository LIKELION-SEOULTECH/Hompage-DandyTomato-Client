import TagBadge from '@/components/archive/TagBadge'
import HighlightenTitle from '@/components/HighlightenTitle'
import { RefObject, useEffect, useRef } from 'react'
import DemoDay from '@/assets/images/DemoDay.png'
import Ideathon from '@/assets/images/Ideathon.png'
import CentralHackerthon from '@/assets/images/CentralHackerthon.png'
import WeeklySession from '@/assets/images/WeeklySession.png'
import useVerticalScroll from '@/hooks/useVerticalScroll'
import React from 'react'
import gsap from 'gsap'

interface ProjectDetailPageProps {
    title?: string
    description?: string
    tag?: string[]
    teamName?: string
    parts?: string[]
    members?: string[]
    isExcellent?: boolean
    year?: string
    category?: string
    platform?: string
    period?: string
}

export default function ProjectDetailPage({
    title = 'VOICE LABEL\n시각장애인을 위한 친절한 \n제품 분류 음성 제공 서비스',
    description = '시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스',
    tag = ['#VOICE', '#LABEL'],
    teamName = '사자육남매',
    parts = ['BE_김리사', 'FE_노경인', 'PM_박진홍', 'DESIGN_이주승'],
    isExcellent = false,
    year = '2024',
    category = '정기세션',
    platform = 'Web',
    period = '2024.01.01 ~ 2024.01.01'
}: ProjectDetailPageProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(containerRef as RefObject<HTMLDivElement>, scrollRef as RefObject<HTMLDivElement>, [images])
    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-row justify-between gap-16 pl-128 overflow-y-hidden">
            <div className='absolute top-0 left-0 w-full h-200 bg-gradient-to-b from-background to-transparent z-10' />
            <div className="flex flex-col justify-between">
                <VerticalInfiniteCarousel images={images} />
            </div>
            <div className="pt-185 pb-128 pr-100 h-fit w-fit" ref={scrollRef}>
                {/* 제목 */}
                <div className="flex w-fit flex-col gap-8">
                    {title.split('\n').map((word, index) => (
                        <HighlightenTitle
                            className="text-32"
                            key={index}
                            text={word}
                        />
                    ))}
                </div>
                {/* 태그 */}
                <div className="mt-28 flex flex-wrap gap-10">
                    {isExcellent && (
                        <TagBadge
                            tag={"우수작"}
                            withHash={false}
                            className="text-20 text-pri-white bg-sub-seoultech-red px-16 py-8"
                        />
                    )}
                    <TagBadge
                        tag={year}
                        withHash={false}
                        className="text-20 text-sub-seoultech-red px-16 py-8"
                    />
                    <TagBadge
                        tag={category}
                        withHash={false}
                        className="text-20 text-sub-seoultech-red px-16 py-8"
                    />
                </div>

                <div className="mt-36 flex flex-col gap-36">
                    {/* 팀명 */}
                    <Layout title="TEAM">
                        <h3 className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-fit px-16 py-16 font-medium">
                            {teamName}
                        </h3>
                    </Layout>
                    {/* 멤버 */}
                    <Layout title="TEAM MEMBER">
                        <div className="flex flex-row flex-wrap gap-16">
                            {parts.map((str, idx) => {
                                const part = str.split('_')[0]
                                const member = str.split('_')[1]
                                return (
                                    <p className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-fit px-16 py-16 font-medium" key={str}>
                                        <span className="text-sub-seoultech-red mr-8 font-bold">
                                            {part}
                                        </span>
                                        {member}
                                    </p>
                                )
                            })}
                        </div>
                    </Layout>
                    <Layout title="PLATFORM">

                        <p className="text-sub-seoultech-red bg-pri-gray-1 text-16 rounded-15 w-fit px-16 py-16 font-bold">
                            {platform}
                        </p>

                    </Layout>
                    <Layout title="PROJECT PERIOD">
                        <p className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-fit px-16 py-16 font-medium">
                            {period}
                        </p>
                    </Layout>
                    {/* 프로젝트 설명 */}
                    <Layout title="PROJECT OVERVIEW">
                        <div className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-600 px-16 py-16 font-medium">
                            {description}
                        </div>
                    </Layout>
                </div>
            </div>
        </div>
    )
}


const Layout = ({
    title,
    children
}: {
    title: string
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col gap-16">
            <p className="text-24 text-pri-black font-bold">{title}</p>
            {children}
        </div>
    )
}

const images = [DemoDay, Ideathon, CentralHackerthon, WeeklySession]
const VerticalInfiniteCarousel = ({ images }: { images: string[] }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = React.useState(0)
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])

    const itemHeight = 398 + 48 // 이미지 높이 + gap
    const totalImages = images.length
    const totalItems = totalImages * 2

    // 무한 스크롤을 위해 2배로 배열을 만듦
    const extendedImages = images.concat(images)

    // 이동 애니메이션
    const scrollToIndex = (idx: number) => {
        const container = containerRef.current
        if (!container) return
        const newY = idx * itemHeight
        gsap.to(container, {
            y: -newY,
            duration: 0.6,
            ease: 'power2.inOut',
            onUpdate: () => {
                // 현재 y값을 상태로 저장해 중앙 scale 계산에 사용
                const matrix = window.getComputedStyle(container).transform
                if (matrix && matrix !== 'none') {
                    const values = matrix.split(', ')
                    const y = Math.abs(parseFloat(values[5] || '0'))
                    setScrollY(y)
                } else {
                    setScrollY(newY)
                }
            },
            onComplete: () => {
                // 무한 스크롤 처리
                let realIdx = idx
                if (idx >= totalImages) {
                    realIdx = idx - totalImages
                    gsap.set(container, { y: -realIdx * itemHeight })
                    setScrollY(realIdx * itemHeight)
                } else if (idx < 0) {
                    realIdx = idx + totalImages
                    gsap.set(container, { y: -realIdx * itemHeight })
                    setScrollY(realIdx * itemHeight)
                }
                setCurrentIndex(realIdx)
            }
        })
    }

    const handleNext = () => {
        scrollToIndex(currentIndex + 1)
    }
    const handlePrev = () => {
        scrollToIndex(currentIndex - 1)
    }

    // 가운데 이미지 scale 효과 적용 (GSAP 없이 계산)
    return (
        <div
            className="overflow-hidden h-screen w-fit relative"
        >
            <div ref={containerRef} className="flex flex-col gap-48 will-change-transform">
                {extendedImages.map((src, i) => {
                    // 이미지의 중앙 위치 계산
                    const containerHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
                    const centerY = containerHeight / 2
                    const itemTop = i * itemHeight - scrollY
                    const itemCenter = itemTop + 398 / 2
                    const distance = Math.abs(centerY - itemCenter)
                    // scale: 중앙에 가까울수록 1.3, 멀수록 0.6
                    const maxScale = 1.2
                    const minScale = 0.8
                    const maxDistance = containerHeight / 2 - 100
                    const scale = Math.max(minScale, maxScale - (distance / maxDistance) * (maxScale - minScale))
                    // 중앙에 오도록 이동할 인덱스 계산
                    const targetIndex = i % totalImages
                    const isCentral = distance < 1 // 중앙에 거의 가까운 경우
                    // 클릭한 이미지가 중앙보다 위/아래에 있는지 판단
                    let clickHandler = undefined
                    if (!isCentral) {
                        if (itemCenter < centerY) {
                            // 위쪽 이미지: 이전으로 이동
                            clickHandler = () => scrollToIndex(currentIndex - 1)
                        } else {
                            // 아래쪽 이미지: 다음으로 이동
                            clickHandler = () => scrollToIndex(currentIndex + 1)
                        }
                    }
                    return (
                        <div
                            key={i}
                            ref={el => { itemRefs.current[i] = el; }}
                            className="flex flex-col items-center justify-center rounded-15 overflow-hidden z-5"
                            style={{
                                transform: `scale(${scale})`,
                                transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)'
                            }}
                            onClick={clickHandler}
                            role="button"
                            tabIndex={0}
                            aria-label={isCentral ? '현재 선택됨' : '이 이미지로 이동'}
                        >
                            <img src={src} alt={`carousel-${i}`} className="w-708 h-398 object-cover aspect-video rounded-15 select-none pointer-events-none" />
                        </div>
                    )
                })}
            </div>
            {/* 딤드 */}
            <div className='absolute bottom-0 left-0 w-full h-200 bg-gradient-to-t from-background to-transparent' />
        </div>
    )
}