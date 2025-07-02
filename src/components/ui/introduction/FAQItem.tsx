'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ } from '@/constants/faq'
import { cn } from '@/lib/utils'
import TagBadge from '@/components/archive/TagBadge'

export default function FAQItem({ category, question, answerTitle, answerContent }: FAQ) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="bg-pri-gray-1 rounded-16 px-36 py-36 shadow-sm transition-all duration-300 cursor-pointer w-708"
            onClick={() => setOpen(!open)}
        >
            {/* 카테고리 */}
            <TagBadge tag={category} withHash={false} className="mb-16" />

            {/* 질문 + 토글 */}
            <div className="flex justify-between items-start w-full">
                <p className="text-sub-seoultech-blue font-pretendard text-24 font-bold leading-[36px] tracking-[-0.72px] whitespace-pre-line">
                    Q. {question}
                </p>
                <div className="w-[44px] h-[44px] rounded-full bg-sub-seoultech-red flex items-center justify-center">
                    <ChevronDown
                        size={28}
                        className={cn(
                            'text-white transition-transform duration-300',
                            open ? 'rotate-180' : ''
                        )}
                    />
                </div>
            </div>

            {/* 답변 */}
            {open && (
                <div>
                    <p className="text-sub-seoultech-red text-24 font-bold leading-[36px]  mt-16 mb-16">
                        A. {answerTitle}
                    </p>
                    <p className="text-pri-black text-16 font-medium whitespace-pre-line">
                        {answerContent}
                    </p>
                </div>
            )}
        </div>
    )
}