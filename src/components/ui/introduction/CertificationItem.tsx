// src/components/recruit/sections/RecruitConditionItem.tsx
'use client'

type Props = {
    text: string
    highlight?: string
}

export default function CertificationItem({ text, highlight }: Props) {
    return (
        <li className="flex items-center gap-4 bg-gray rounded-15 w-731 h-full text-black text-30 font-bold leading-[30px] pl-42 gap-22">
            <img
                src="/assets/introduction/check_circle.svg"
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