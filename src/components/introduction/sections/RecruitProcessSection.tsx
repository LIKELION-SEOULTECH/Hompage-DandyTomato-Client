'use client'

import { useRef, useEffect } from 'react'
import ProcessBubble from '@/components/ui/introduction/ProcessBubble'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RecruitProcessSectionProps = {
    scrollerRef: React.RefObject<HTMLDivElement>
}

export default function RecruitProcessSection({ scrollerRef }: RecruitProcessSectionProps) {
    const lineRef = useRef<HTMLDivElement>(null)
    const bubbleRefs = useRef<(HTMLDivElement | null)[]>([])
    const markerRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (!lineRef.current || !scrollerRef.current) return

        // 줄 애니메이션: 스크롤보다 살짝 느리게, 되돌릴 땐 줄어듦
        gsap.fromTo(
            lineRef.current,
            { width: 0 },
            {
                width: 1400,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: lineRef.current,
                    start: 'left center',
                    end: 'right center',
                    scrub: 1.5, // 살짝 느리게
                    horizontal: true,
                    scroller: scrollerRef.current,
                },
            }
        )
    }, [scrollerRef])

    const setMarkerRef = (el: HTMLDivElement | null, index: number) => {
        if (el) markerRefs.current[index] = el
    }

    const setBubbleRef = (el: HTMLDivElement | null, index: number) => {
        bubbleRefs.current[index] = el
    }

    return (
        <div className="w-screen min-h-screen bg-white flex justify-center">
            <div className="max-w-[1600px] w-full flex flex-col items-start mt-[17.5vh] mb-[11vh] ml-32">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard">
                    14기 모집 절차
                </h2>

                <div className="relative w-full pt-[20%] pb-[100px]">
                    <div
                        ref={lineRef}
                        className="relative h-[10px] flex-shrink-0 rounded-full z-0"
                        style={{
                            width: '1400px',
                            background:
                                'linear-gradient(90deg, rgba(11, 64, 102, 0.00) 0.36%, #0B4066 2.57%, #0B4066 98.01%, rgba(11, 64, 102, 0.00) 100%)',
                        }}
                    >
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                ref={(el) => setMarkerRef(el, i)}
                                className="absolute top-1/2 translate-y-[-50%] w-[24px] h-[24px] rotate-45 flex-shrink-0 rounded-[5px]"
                                style={{
                                    left: `${37.36 + 256 * i}px`,
                                    backgroundColor: '#0B4066',
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute top-[34%] h-[360px] w-[1536px] z-10" style={{ left: '133px' }}>
                        {[
                            { title: '서류 모집', date: '2026.00.00. (금) - 2026.00.00. (금)' },
                            { title: '서류 합격 발표', date: '2026.00.00. (금)' },
                            { title: '대면 면접', date: '2026.00.00. (금) - 2026.00.00. (금)' },
                            { title: '최종 합격 발표', date: '2026.00.00. (금)', highlight: true },
                            { title: '서울과기대 멋대 자체 OT', date: '2026.00.00. (금)' },
                        ].map((step, idx) => {
                            const isTop = idx % 2 === 0
                            const markerLeft = 37.36 + 256 * idx
                            const bubbleLeft = markerLeft + 9 - 90 + (isTop ? 0 : -60)

                            return (
                                <div
                                    key={idx}
                                    ref={(el) => setBubbleRef(el, idx)}
                                    className="absolute w-[180px] flex flex-col items-center"
                                    style={{
                                        left: `${bubbleLeft}px`,
                                        top: isTop ? '0px' : 'auto',
                                        bottom: isTop ? 'auto' : '0px',
                                        transform: isTop ? 'translateY(-31px)' : 'translateY(48px)',
                                    }}
                                >
                                    <ProcessBubble
                                        title={step.title}
                                        date={step.date}
                                        highlight={step.highlight}
                                        direction={isTop ? 'bottom' : 'top'}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}