import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import ArrowIcon from '@/assets/icons/FileUploadIcon.svg'
import EditInput from '@/components/EditInput'
import { useState, useRef } from 'react'
import { RefObject } from 'react'
import useVerticalScroll from '@/hooks/useVerticalScroll'

interface QuestionBlock {
    question: string
    limit: string
    type: 'text' | 'select'
}

const CATEGORY_OPTIONS = [
    { label: '공통 질문', value: 'common' },
    { label: '포트폴리오', value: 'portfolio' },
    { label: '기획 PM', value: 'pm' },
    { label: '백엔드 BACK-END', value: 'backend' },
    { label: '프론트엔드 FRONT-END', value: 'frontend' },
    { label: '디자이너 DESIGNER', value: 'designer' },
    { label: '인공지능 AI', value: 'ai' }
]

export default function RecruitQuestionAdminPage() {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0].value)
    const [questionBlocksByCategory, setQuestionBlocksByCategory] = useState<{ [key: string]: QuestionBlock[] }>({})

    const questionBlock = questionBlocksByCategory[selectedCategory] || []

    const handleBlockChange = (block: QuestionBlock, index: number) => {
        const newBlocks = [...questionBlock]
        newBlocks[index] = block
        setQuestionBlocksByCategory(prev => ({
            ...prev,
            [selectedCategory]: newBlocks
        }))
    }

    const handleAddBlock = () => {
        const newBlock = { question: '', limit: '', type: 'text' as const }
        setQuestionBlocksByCategory(prev => ({
            ...prev,
            [selectedCategory]: [...(prev[selectedCategory] || []), newBlock]
        }))
    }
    const handleDeleteBlock = (index: number) => {
        const newBlocks = [...questionBlock]
        newBlocks.splice(index, 1)
        setQuestionBlocksByCategory(prev => ({
            ...prev,
            [selectedCategory]: newBlocks
        }))
    }
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(containerRef as RefObject<HTMLDivElement>, scrollRef as RefObject<HTMLDivElement>, [questionBlock])
    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-row justify-between gap-164 pt-185 pr-100 pl-128 overflow-y-hidden">
            <div className="flex flex-col gap-313">

                <HighlightenTitle
                    text="지원서 질문 작성"
                    className="text-nowrap"
                />


                <div className="flex flex-col gap-16">
                    <p className="text-24 text-pri-black font-bold">구분</p>
                    <ToggleGroupButton
                        options={CATEGORY_OPTIONS}
                        className="text-sub-seoultech-red"
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col gap-16 items-end">

                <div className='flex flex-row gap-16 w-full z-100'>
                    <SharedButton
                        className="rounded-50 text-pri-white bg-sub-seoultech-red h-auto w-fit border-2 px-16 py-8 "
                        onClick={handleAddBlock}>
                        질문 블럭 추가
                    </SharedButton>
                    <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8" onClick={() => { }}>
                        저장하기
                    </SharedButton>
                </div>
                <div ref={scrollRef} className="h-fit w-full z-10 relative flex flex-col gap-16 items-end pb-64 ">
                    {questionBlock.map((block, index) => (
                        <QuestionBlock
                            key={index}
                            block={block}
                            index={index}
                            onChange={(newBlock) => handleBlockChange(newBlock, index)}
                            onDelete={() => handleDeleteBlock(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex h-300 w-full -z-10 bg-gradient-to-b from-background to-transparent absolute top-0" />
        </div>
    )
}

const Layout = ({
    title,
    children,
    className
}: {
    title: string
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={`flex flex-col gap-16 ${className}`}>
            <p className="text-24 text-pri-black font-bold">{title}</p>
            {children}
        </div>
    )
}

const QuestionBlock = ({ block, onChange, index, onDelete }: { block: QuestionBlock, onChange: (block: QuestionBlock) => void, index: number, onDelete: () => void }) => {
    return (
        <div className="flex w-full flex-row gap-64">
            <Layout
                title="질문 작성"
                className="flex-2/4">
                <EditInput
                    placeholder="질문을 입력해주세요"
                    value={block.question}
                    onChange={(value) => onChange({ ...block, question: value })}
                />
            </Layout>
            <Layout
                title="글자수"
                className="flex-1/4">
                <EditInput
                    placeholder="글자수 제한을 입력해주세요"
                    value={block.limit}
                    onChange={(value) => onChange({ ...block, limit: value })}
                />
            </Layout>
            {/* 삭제 */}
            <div className='flex flex-row gap-16 items-end'>
                <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-red h-fit w-fit border-2 px-16 py-8" onClick={onDelete}>
                    삭제
                </SharedButton>
            </div>
        </div>
    )
}
