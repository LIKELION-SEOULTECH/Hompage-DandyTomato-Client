import FilterButton from '@/components/archive/FilterButton'
import ProjectCard from '../components/archive/ProjectCard'
import HighlightenTitle from '@/components/HighlightenTitle'

const ArchivePage = () => {
    const galleryItems = [
        { id: 1, className: '[grid-area:2_/_1_/_span_2]' },
        { id: 2, className: '[grid-area:1_/_2_/_span_2_/_span_2]' },
        { id: 3, className: '[grid-area:3_/_2]' },
        { id: 4, className: '[grid-area:3_/_3]' },
        { id: 5, className: '[grid-area:1_/_7_/_span_3_/_span_2]' },
        { id: 6, className: '[grid-area:3_/_4_/_auto_/_span_2]' },
        { id: 7, className: '[grid-area:1_/_4]' },
        { id: 8, className: '[grid-area:2_/_4]' },
        { id: 9, className: '[grid-area:1_/_5_/_span_2] w-[530.457px]' },
        { id: 10, className: '[grid-area:3_/_6]' },
        { id: 11, className: '[grid-area:1_/_9_/_span_2]' },
        { id: 12, className: '[grid-area:3_/_9]' },
        { id: 13, className: '[grid-area:1_/_1]' }
    ]

    return (
        <div className="relative h-screen w-screen overflow-x-auto bg-[#f5f4f2]">
            <div className="relative h-full w-full">
                <HighlightenTitle
                    text="갤러리"
                    className="absolute top-[185px] left-32"
                />

                <div className="fixed top-[185px] right-[100px]">
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

                <div className="absolute top-[280px] left-32 h-[609px] w-[2796.29px]">
                    <div className="relative box-border grid h-full w-full grid-cols-[repeat(10,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] gap-9 p-0">
                        {galleryItems.map(item => (
                            <ProjectCard
                                key={item.id}
                                className={item.className}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchivePage
