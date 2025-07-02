'use client'

import { useState } from 'react'
import { faqList } from '@/constants/faq'
import FAQItem from '@/components/ui/introduction/FAQItem'
import { cn } from '@/lib/utils'
import HighlightenTitle from '@/components/HighlightenTitle'
import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'

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
                <HighlightenTitle text="FAQ" />
                <p className="text-20 font-bold leading-[30px] tracking-[-0.6px] text-pri-black font-pretendard mt-257">
                    필터 구분
                </p>
                <div className="h-full flex flex-col justify-between items-start mt-52">
                    <ToggleGroupButton options={categories.map(category => ({ label: category, value: category }))} value={selectedCategory} onValueChange={setSelectedCategory} itemClassName='text-16 font-bold' />
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