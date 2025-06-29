import { useRef } from 'react'
import GalleryGrid from '@/components/archive/GalleryGrid'
import useHorizontalScroll from '@/hooks/useHorizontalScroll'
import FilterButton from '@/components/archive/FilterButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import ProjectGrid from '@/components/archive/ProjectGrid'

export default function ProjectPage() {
    const projectItems = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }))

    const containerRef = useRef<HTMLDivElement>(null)
    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>)

    return (
        <>
            <div className="fixed top-[185px] right-[100px] z-10">
                <div className="box-border flex flex-row content-stretch items-center justify-end gap-16">
                    <FilterButton
                        text="기수"
                        options={[
                            { label: '2025', value: '2025' },
                            { label: '2024', value: '2024' },
                            { label: '2023', value: '2023' }
                        ]}
                    />
                    <FilterButton
                        text="전체"
                        options={[
                            { label: '전체', value: '전체' },
                            { label: '정기세션', value: '정기세션' },
                            { label: '중앙활동', value: '중앙활동' },
                            { label: '자체활동', value: '자체활동' },
                            { label: '친목활동', value: '친목활동' }
                        ]}
                    />
                </div>
            </div>
            <div
                ref={containerRef}
                className="relative h-[100%] w-auto">
                <HighlightenTitle
                    text="프로젝트"
                    className="absolute top-[185px] left-32"
                />

                <ProjectGrid projectItems={projectItems} />
            </div>
        </>
    )
}
