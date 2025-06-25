'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { reviews } from '@/constants/review'
import ReviewBox from '@/components/ui/introduction/ReviewBox'

export default function ActivityReviewSection() {
    const [scrollable, setScrollable] = useState(false)

    return (
        <div className="w-screen h-screen bg-white flex justify-center">
            <div className="max-w-[1280px] w-full flex flex-col items-start mt-[17.5vh] mb-[11vh]">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-none tracking-[-1.92px] font-pretendard ml-32">
                    이전 기수 활동 후기
                </h2>

                <div
                    onMouseEnter={() => setScrollable(true)}
                    onMouseLeave={() => setScrollable(false)}
                    className={cn(
                        'mt-12 grid grid-cols-3 gap-6 px-4 h-[600px] transition-all duration-300 ml-32',
                        scrollable ? 'overflow-y-auto pr-4' : 'overflow-hidden'
                    )}
                >
                    {reviews.map((review, idx) => (
                        <ReviewBox key={idx} title={review.title} content={review.content} />
                    ))}
                </div>
            </div>
        </div>
    )
}