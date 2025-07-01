'use client'

import { useRef } from 'react'
import ProcessBubble from '@/components/ui/introduction/ProcessBubble'
import processLine from '@/assets/processLine.svg'

// 단계 데이터
const steps = [
    {
        title: '신규 운영진\n서류 지원 기간',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub_seoultech_red',
        left: 137.775 + 18, // 첫 마커 중심 (x + width/2)
    },
    {
        title: '신규 운영진\n서류 합격',
        date: '2026.00.00. (금)',
        highlight: false,
        isTop: false,
        titleColor: 'text-sub_seoultech_red',
        left: 378.375 + 10, // 두번째 마커 중심 (x + width/2)
    },
    {
        title: '신규 운영진\n대면 면접',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub_seoultech_red',
        left: 752.66 + 10, // 세번째 마커 중심
    },
    {
        title: '신규 운영진\n최종 합격',
        date: '2026.00.00. (금)',
        highlight: true,
        isTop: false,
        titleColor: 'text-sub_seoultech_red',
        left: 974.944 + 10, // 네번째 마커 중심
    },
    {
        title: '14기 아기사자\n서류 지원 기간',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub_seoultech_blue',
        left: 1351.54 + 18, // 다섯번째 마커 중심
    },
    {
        title: '14기 아기사자\n서류 합격',
        date: '2026.00.00. (금)',
        highlight: false,
        isTop: false,
        titleColor: 'text-sub_seoultech_blue',
        left: 1609.14 + 10, // 여섯번째 마커 중심
    },
    {
        title: '14기 아기사자\n대면 면접',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub_seoultech_blue',
        left: 1970.42 + 10, // 일곱번째 마커 중심
    },
    {
        title: '14기 아기사자\n최종 합격',
        date: '2026.00.00. (금)',
        highlight: true,
        isTop: false,
        titleColor: 'text-sub_seoultech_blue',
        left: 2207.71 + 10, // 여덟번째 마커 중심
    },
]

const tailOffset = 36 // 말풍선 내 꼬리의 left값(px)

export default function RecruitProcessSection() {
    return (
        <div className="w-full min-h-screen bg-white flex justify-center overflow-x-auto">
            <div className="relative min-w-[2395px] flex flex-col items-start mt-[17.5vh] mb-[11vh]">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard mb-20">
                    14기 모집 절차
                </h2>
                <div className="relative w-[2395px] h-[139px] mt-[30vh]">
                    {/* SVG 타임라인+마커 */}
                    <img src={processLine} alt="process line" className="absolute left-0 top-0 w-[2395px] h-[139px] select-none pointer-events-none" draggable={false} />
                    {/* 말풍선 */}
                    {steps.map((step, idx) => {
                        // 위쪽: 마커 중심에서 23.04px 위, 아래쪽: 50.83px 아래
                        const bubbleTop = step.isTop
                            ? 20.8169 - 23.04 - 238 // 선의 y + 오프셋 - 말풍선 높이(대략)
                            : 20.8169 + 10.2779 + 50.83;
                        return (
                            <div
                                key={idx}
                                className="absolute w-[180px] flex flex-col items-center"
                                style={{
                                    left: step.left - tailOffset,
                                    top: bubbleTop,
                                }}
                            >
                                <ProcessBubble
                                    title={step.title}
                                    date={step.date}
                                    highlight={step.highlight}
                                    direction={step.isTop ? 'bottom' : 'top'}
                                    titleColor={step.titleColor}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}