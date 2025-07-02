import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import TagBadge from './TagBadge'

interface ProjectCardProps {
    className?: string
    style?: React.CSSProperties
    index?: number
    title?: string
    description?: string
    tag?: string[]
    // Add other props like title, imageUrl, etc. as needed
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    className,
    style,
    index,
    title = '서비스명',
    description = '서비스 설명',
    tag = ['해시태그']
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
                'bg-sub-seoultech-red flex items-center justify-center overflow-hidden rounded-[15px]',
                className
            )}
            style={style}>
            <div
                className={cn(
                    !isHovered && 'opacity-0',
                    'flex h-full w-full flex-col items-baseline justify-end gap-10 bg-[oklch(0%_0_0/0.3)] p-32'
                )}>
                <h3 className="text-20 text-sub-seoultech-red bg-pri-white font-bold">
                    {title}
                </h3>
                <p className="text-16 text-pri-whit text-left font-bold">
                    {description}
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

export default ProjectCard
