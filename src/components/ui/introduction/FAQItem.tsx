'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ } from '@/constants/faq'
import { cn } from '@/lib/utils'

export default function FAQItem({ category, question, answerTitle, answerContent }: FAQ) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="bg-gray rounded-[16px] px-36 py-36 shadow-sm transition-all duration-300 cursor-pointer w-708"
            onClick={() => setOpen(!open)}
        >
            {/* 카테고리 */}
            <span className="inline-block px-12 py-6 rounded-[50px] border border-sub_seoultech_red bg-gray text-sub_seoultech_red text-[14px] font-bold leading-[150%] mb-16">
                {category}
            </span>

            {/* 질문 + 토글 */}
            <div className="flex justify-between items-start w-full">
                <p className="text-sub_seoultech_blue font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px] whitespace-pre-line">
                    Q. {question}
                </p>
                <div className="w-[44px] h-[44px] rounded-full bg-sub_seoultech_red flex items-center justify-center">
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
                    <p className="text-sub_seoultech_red font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px] mt-16 mb-16">
                        A. {answerTitle}
                    </p>
                    <p className="text-black font-pretendard text-[16px] font-medium leading-[24px] tracking-[-0.48px] whitespace-pre-line">
                        {answerContent}
                    </p>
                </div>
            )}
        </div>
    )
}