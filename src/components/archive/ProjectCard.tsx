import { cn } from '@/lib/utils'
import React, { useState } from 'react'

interface ProjectCardProps {
    className?: string
    style?: React.CSSProperties
    index?: number
    // Add other props like title, imageUrl, etc. as needed
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    className,
    style,
    index
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
                    'flex h-full w-full flex-col items-baseline justify-end gap-10 bg-[oklch(0%_0_0/0.2)] p-32'
                )}>
                <h3 className="text-20 text-sub-seoultech-red bg-pri-white font-bold">
                    활동이름
                </h3>
                <p className="text-16 text-pri-whit text-center font-bold">
                    2025
                    <br /> 정기세션
                </p>
            </div>
        </div>
    )
}

export default ProjectCard
