'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { reviews } from '@/constants/review'
import ReviewBox from '@/components/ui/introduction/ReviewBox'

export default function ActivityReviewSection() {
    const [scrollable, setScrollable] = useState(false)

    return (
        <div className="relative w-screen bg-white flex justify-center ml-0">
            <div className="max-w-screen w-full flex flex-col items-start mt-[17.5vh]">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-none tracking-[-1.92px] font-pretendard ml-32">
                    이전 기수 활동 후기
                </h2>

                <div
                    onMouseEnter={() => setScrollable(true)}
                    onMouseLeave={() => setScrollable(false)}
                    className={`relative mt-78 ml-32 w-[calc(100%-8rem)] transition-all duration-300 pr-[17px] ${scrollable ? 'overflow-y-auto scrollbar-hide' : 'overflow-hidden'
                        }`}
                    style={{ scrollbarGutter: 'stable' }}
                >
                    <div
                        className="columns-3 gap-x-[36px]"
                        style={{ columnWidth: '422px', columnGap: '36px' }}
                    >
                        {reviews.map((review, idx) => (
                            <ReviewBox
                                key={idx}
                                title={review.title}
                                content={review.content}
                                className="mb-[36px] break-inside-avoid"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-[21vh] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>
    )
}