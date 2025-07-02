import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import TagBadge from './TagBadge'

interface GalleryCardProps {
    className?: string
    style?: React.CSSProperties
    index?: number
    title?: string
    date?: string
    description?: string
    tag?: string[]
    width?: string
    height?: string
    // Add other props like title, imageUrl, etc. as needed
}

const GalleryCard: React.FC<GalleryCardProps> = ({
    className,
    style,
    index,
    title = '활동이름',
    date = '2025.01.01',
    description = '간단한 설명',
    tag = ['해쉬태그'],
    width,
    height
}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
            onMouseOver={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            className={cn(
                'bg-sub-seoultech-red flex items-center justify-center overflow-hidden rounded-[15px] aspect-video',
                className,
                `w-[${width}]`,
                `h-[${height}]`
            )}
            style={style}>
            <div
                className={cn(
                    !isHovered && 'opacity-0',
                    'flex h-full w-full flex-col items-center justify-center gap-10 bg-[oklch(0%_0_0/0.2)]'
                )}>
                <h3 className="text-20 text-sub-seoultech-red bg-pri-white font-bold">
                    {title}
                </h3>
                <p className="text-16 text-pri-whit text-center font-bold">
                    {date}
                    <br /> {description}
                </p>
                <div className="flex flex-wrap gap-10">
                    {tag.map(tag => (
                        <TagBadge
                            key={tag}
                            tag={tag}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GalleryCard
