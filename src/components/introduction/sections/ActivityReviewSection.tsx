'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { reviews } from '@/constants/review'
import ReviewBox from '@/components/ui/introduction/ReviewBox'

export default function ActivityReviewSection() {
    const [scrollable, setScrollable] = useState(false)

    // 리뷰를 3개의 컬럼으로 분배
    const columns = 3;
    const columnedReviews = Array.from({ length: columns }, () => [] as typeof reviews);
    reviews.forEach((review, idx) => {
        columnedReviews[idx % columns].push(review);
    });

    return (
        <div className="relative w-auto bg-white flex justify-center ml-0">
            <div className="max-w-1356 w-full flex flex-col items-start mt-[17.5vh]">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard">
                    이전 기수 활동 후기
                </h2>

                <div
                    onMouseEnter={() => setScrollable(true)}
                    onMouseLeave={() => setScrollable(false)}
                    className={cn(
                        "relative mt-78 w-[1356px] transition-all duration-300 pr-[10px] overflow-y-auto",
                        scrollable ? "scrollbar-hide" : "overflow-hidden"
                    )}
                    style={{ maxHeight: '600px', scrollbarGutter: 'stable' }} // 필요시 maxHeight 조정
                >
                    <div className="flex gap-x-[36px]">
                        {columnedReviews.map((col, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-y-[36px]">
                                {col.map((review, idx) => (
                                    <ReviewBox
                                        key={idx}
                                        title={review.title}
                                        content={review.content}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-[11.5vh] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>
    )
}