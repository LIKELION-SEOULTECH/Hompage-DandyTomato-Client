'use client'

import React from 'react'

type ProcessBubbleProps = {
    title: string | React.ReactNode
    date: string
    highlight?: boolean
    direction?: 'top' | 'bottom'
    bgColor?: string
    textColor?: string
    highlightColor?: string
    titleColor?: string
}

export default function ProcessBubble({
    title,
    date,
    highlight = false,
    direction = 'bottom',
    bgColor = '#E4E5E9',
    textColor = '#000000',
    highlightColor, // sub_seoultech_blue
    titleColor,
}: ProcessBubbleProps) {
    const isTop = direction === 'top'

    // title이 string이면 \n 줄바꿈 처리
    let renderedTitle: React.ReactNode = title;
    if (typeof title === 'string') {
        renderedTitle = title.split('\n').map((line, idx) => (
            <span key={idx} className="block">{line}</span>
        ));
    }

    return (
        <div className="relative w-fit text-left font-pretendard">
            {/* 꼬리 */}
            <div
                className="absolute"
                style={{
                    left: '36px',
                    width: '34.641px',
                    height: '30px',
                    aspectRatio: '34.64 / 30',
                    backgroundColor: bgColor,
                    clipPath: isTop
                        ? 'path("M21.6506 3C19.7261 0 14.9149 0 12.9904 3L0 25L34.641 25L21.6506 3Z")'
                        : 'path("M21.6506 22.5C19.7261 25.8333 14.9149 25.8333 12.9904 22.5L0 0L34.641 0L21.6506 22.5Z")',
                    top: isTop ? undefined : 'calc(100% - 5px)',
                    bottom: isTop ? 'calc(100% - 5px)' : undefined,
                }}
            />

            {/* 말풍선 본체 */}
            <div
                className="rounded-xl shadow-md w-fit text-left whitespace-nowrap px-[36px] py-[36px] gap-10"
                style={{
                    backgroundColor: bgColor,
                    color: textColor,
                }}
            >
                <div
                    className={`text-[32px] font-bold leading-[48px] tracking-[-0.96px] ${highlight ? 'text-sub_seoultech_blue' : ''}`}
                    style={titleColor ? { color: titleColor } : {}}
                >
                    {renderedTitle}
                </div>
                <div className="text-[20px] font-semibold leading-[30px] tracking-[-0.6px] text-black">
                    {date}
                </div>
            </div>
        </div>
    )
}