'use client'

import { useRef, useEffect, useState } from 'react'
import ProcessBubble from '@/components/ui/introduction/ProcessBubble'
import processLine from '@/assets/processLine.svg'
import { motion } from 'framer-motion'
import HighlightenTitle from '@/components/HighlightenTitle'

// 단계 데이터
const steps = [
    {
        title: '신규 운영진\n서류 지원 기간',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub-seoultech-red',
        left: 137.775 + 18, // 첫 마커 중심 (x + width/2)
    },
    {
        title: '신규 운영진\n서류 합격',
        date: '2026.00.00. (금)',
        highlight: false,
        isTop: false,
        titleColor: 'text-sub-seoultech-red',
        left: 378.375 + 10, // 두번째 마커 중심 (x + width/2)
    },
    {
        title: '신규 운영진\n대면 면접',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub-seoultech-red',
        left: 752.66 + 10, // 세번째 마커 중심
    },
    {
        title: '신규 운영진\n최종 합격',
        date: '2026.00.00. (금)',
        highlight: true,
        isTop: false,
        titleColor: 'text-sub-seoultech-red',
        left: 974.944 + 10, // 네번째 마커 중심
    },
    {
        title: '14기 아기사자\n서류 지원 기간',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub-seoultech-blue',
        left: 1351.54 + 18, // 다섯번째 마커 중심
    },
    {
        title: '14기 아기사자\n서류 합격',
        date: '2026.00.00. (금)',
        highlight: false,
        isTop: false,
        titleColor: 'text-sub-seoultech-blue',
        left: 1609.14 + 10, // 여섯번째 마커 중심
    },
    {
        title: '14기 아기사자\n대면 면접',
        date: '2026.00.00. (금) - 2026.00.00. (금)',
        highlight: false,
        isTop: true,
        titleColor: 'text-sub-seoultech-blue',
        left: 1970.42 + 10, // 일곱번째 마커 중심
    },
    {
        title: '14기 아기사자\n최종 합격',
        date: '2026.00.00. (금)',
        highlight: true,
        isTop: false,
        titleColor: 'text-sub-seoultech-blue',
        left: 2210.71 + 10, // 여덟번째 마커 중심
    },
]

const tailOffset = 36 // 말풍선 내 꼬리의 left값(px)

type RecruitProcessSectionProps = {
    scrollerRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
};

// 말풍선이 오른쪽 뷰포트 끝에 닿을 때만 사라지도록 감지하는 커스텀 훅
function useRightOutView(ref: React.RefObject<HTMLDivElement | null>, scrollRoot: HTMLDivElement | null, offset = 30) {
    const [rightOut, setRightOut] = useState(false);

    useEffect(() => {
        function check() {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            // 오른쪽 끝에서 offset(px) 이내로 닿으면 사라짐
            setRightOut(rect.right > (window.innerWidth - offset));
        }
        const root: HTMLElement | Window = scrollRoot || window;
        root.addEventListener('scroll', check, { passive: true });
        window.addEventListener('resize', check);
        check();
        return () => {
            root.removeEventListener('scroll', check);
            window.removeEventListener('resize', check);
        };
    }, [ref, scrollRoot, offset]);

    return rightOut;
}

function AnimatedBubble({ children, left, top, scrollRoot }: { children: React.ReactNode; left: number; top: number; scrollRoot: HTMLDivElement | null }) {
    const ref = useRef<HTMLDivElement>(null);
    const rightOut = useRightOutView(ref, scrollRoot, 100);
    return (
        <motion.div
            ref={ref}
            className="absolute w-[180px] flex flex-col items-center"
            style={{ left, top }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={!rightOut ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{
                duration: 0.7,
                type: 'spring',
                bounce: 0.5,
            }}
        >
            {children}
        </motion.div>
    );
}

export default function RecruitProcessSection({ scrollerRef }: RecruitProcessSectionProps) {
    // scrollerRef.current가 null일 수 있으므로 안전하게 넘김
    const scrollRoot = (scrollerRef && 'current' in scrollerRef ? scrollerRef.current : null) as HTMLDivElement | null;
    return (
        <div className="w-full min-h-screen flex justify-center overflow-x-auto">
            <div className="relative min-w-[2395px] flex flex-col items-start mt-[17.5vh] mb-[11vh]">
                <HighlightenTitle text="14기 모집 절차" />
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
                            <AnimatedBubble key={idx} left={step.left - tailOffset} top={bubbleTop} scrollRoot={scrollRoot}>
                                <ProcessBubble
                                    title={step.title}
                                    date={step.date}
                                    highlight={step.highlight}
                                    direction={step.isTop ? 'bottom' : 'top'}
                                    titleColor={step.titleColor}
                                />
                            </AnimatedBubble>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}