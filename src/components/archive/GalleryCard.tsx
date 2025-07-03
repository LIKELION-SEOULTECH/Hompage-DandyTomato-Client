import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import TagBadge from './TagBadge'
import WeeklySession from '@/assets/images/WeeklySession.png'
import DemoDay from '@/assets/images/DemoDay.png'
import CentralHackerthon from '@/assets/images/CentralHackerthon.png'
import Ideathon from '@/assets/images/Ideathon.png'

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

    // 예시 이미지 배열
    const exampleImages = [WeeklySession, DemoDay, CentralHackerthon, Ideathon, WeeklySession, DemoDay, CentralHackerthon, Ideathon, WeeklySession, DemoDay]
    const backgroundImage = exampleImages[index || 0]

    return (
        <div
            onMouseOver={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            className={cn(
                'flex items-center justify-center overflow-hidden rounded-[15px] aspect-video bg-cover bg-center',
                className,
                `w-[${width}]`,
                `h-[${height}]`
            )}
            style={{
                ...style,
                backgroundImage: `url(${backgroundImage})`
            }}>
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
                    {Array.isArray(tag) ? tag.map(tagItem => (
                        <TagBadge
                            key={tagItem}
                            tag={tagItem}
                        />
                    )) : (
                        <TagBadge
                            key={tag}
                            tag={tag}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default GalleryCard
