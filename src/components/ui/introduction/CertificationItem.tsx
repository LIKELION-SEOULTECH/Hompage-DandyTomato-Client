// src/components/recruit/sections/RecruitConditionItem.tsx
'use client'

import checkCircle from '@/assets/icons/check.svg'

type Props = {
    text: string
    highlight?: string
}

export default function CertificationItem({ text, highlight }: Props) {
    return (
        <li className="flex items-center bg-pri-gray-1 rounded-15 w-731 h-full text-black text-30 font-bold leading-[30px] pl-42 gap-22">
            <img
                src={checkCircle}
                alt="체크"
                className="h-30 w-30 block"
            />
            <span className="text-30 font-bold leading-48 tracking-[-0.96px] font-pretendard text-black">
                {text}
                {highlight && (
                    <span className="text-sub_seoultech_blue ml-1">{highlight}</span>
                )}
            </span>
        </li>
    )
}