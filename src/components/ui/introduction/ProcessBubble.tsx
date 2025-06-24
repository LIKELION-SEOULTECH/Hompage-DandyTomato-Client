'use client'

type Props = {
    title: string
    date: string
    highlight?: boolean
    direction?: 'top' | 'bottom' // 말풍선 꼬리 방향
}

export default function ProcessBubble({
    title,
    date,
    highlight = false,
    direction = 'bottom',
}: Props) {
    const isTop = direction === 'top'

    return (
        <div
            className={`relative bg-gray text-black px-4 py-3 text-center shadow-md rounded-xl
        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2
        ${isTop
                    ? 'before:-top-2 before:border-[10px] before:border-b-gray before:border-x-transparent before:border-t-0'
                    : 'before:-bottom-2 before:border-[10px] before:border-t-gray before:border-x-transparent before:border-b-0'
                }`}
        >
            <div
                className={`font-bold text-[18px] leading-snug ${highlight ? 'text-sub_seoultech_red' : 'text-sub_seoultech_blue'
                    }`}
            >
                {title}
            </div>
            <div className="text-[14px] mt-1">{date}</div>
        </div>
    )
}