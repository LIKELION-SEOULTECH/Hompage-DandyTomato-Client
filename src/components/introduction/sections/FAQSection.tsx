'use client'

import { useState } from 'react'
import { faqList } from '@/constants/faq'
import FAQItem from '@/components/ui/introduction/FAQItem'
import { cn } from '@/lib/utils'

const categories = [
    '전체',
    '공통',
    '기획 PM',
    '디자인 DESIGN',
    '백엔드 BACK-END',
    '프론트엔드 FRONT-END',
    '인공지능 AI'
]

export default function FAQSection() {
    const [selectedCategory, setSelectedCategory] = useState('전체')
    const [scrollable, setScrollable] = useState(false)

    const filteredList =
        selectedCategory === '전체'
            ? faqList
            : faqList.filter(faq => faq.category === selectedCategory)

    return (
        <div className="flex w-auto gap-193 bg-white ">
            {/* 왼쪽 필터 */}
            <div className="flex flex-col min-w-[180px]  mt-[17.5vh] mb-[11vh]">
                <h2 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard">
                    FAQ
                </h2>
                <p className="text-[20px] font-bold leading-[30px] tracking-[-0.6px] text-[#0A0E11] font-pretendard mt-[23.7vh]">
                    필터 구분
                </p>
                <div className="h-full flex flex-col justify-between items-start mt-[4.8vh]">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                'flex flex-col justify-center items-center px-12 py-[6px] rounded-50 border-2 text-sm font-semibold whitespace-nowrap font-pretendard self-start',
                                selectedCategory === category
                                    ? 'bg-sub_seoultech_red text-white border-sub_seoultech_red'
                                    : 'text-sub_seoultech_red border-sub_seoultech_red bg-white'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* 오른쪽 FAQ 리스트 */}
            <div
                onMouseEnter={() => setScrollable(true)}
                onMouseLeave={() => setScrollable(false)}
                className={cn(
                    "min-w-[708px] h-screen pr-2 pt-[17.5vh] transition-all duration-300",
                    scrollable ? "overflow-y-auto scrollbar-hide" : "overflow-hidden"
                )}
            >
                <div className="flex flex-col gap-48">
                    {filteredList.map((faq, idx) => (
                        <FAQItem key={idx} {...faq} />
                    ))}
                </div>
                <div className="pointer-events-none absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-white to-transparent z-10" />
            </div>
        </div>
    )
}