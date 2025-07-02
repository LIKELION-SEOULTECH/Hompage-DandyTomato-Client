import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import ArrowIcon from '@/assets/icons/FileUploadIcon.svg'
import EditInput from '@/components/EditInput'
import { useState } from 'react'

interface QuestionBlock {
    question: string
    limit: string
    type: 'text' | 'select'
}

export default function RecruitQuestionAdminPage() {
    const [questionBlock, setQuestionBlock] = useState<QuestionBlock[]>([])

    return (
        <div className="relative flex h-full w-full flex-row justify-between gap-164 pt-185 pr-100 pl-128">
            <div className="flex flex-col gap-313">
                <HighlightenTitle
                    text="지원서 질문 작성"
                    className="text-nowrap"
                />
                <div className="flex flex-col gap-16">
                    <p className="text-24 text-pri-black font-bold">구분</p>
                    <ToggleGroupButton
                        options={[
                            { label: '공통 질문', value: 'common' },
                            { label: '포트폴리오', value: 'portfolio' },
                            { label: '기획 PM', value: 'pm' },
                            { label: '백엔드 BACK-END', value: 'backend' },
                            {
                                label: '프론트엔드 FRONT-END',
                                value: 'frontend'
                            },
                            {
                                label: '디자이너 DESIGNER',
                                value: 'designer'
                            },
                            { label: '인공지능 AI', value: 'ai' }
                        ]}
                        className="text-sub-seoultech-red"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col gap-16">
                {questionBlock.map(block => (
                    <QuestionBlock
                        key={block.question}
                        block={block}
                    />
                ))}
                <SharedButton
                    className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8"
                    onClick={() => {
                        const newBlock = {
                            question: '',
                            limit: '',
                            type: 'text'
                        }
                        setQuestionBlock([...questionBlock, newBlock])
                    }}>
                    질문 블럭 추가
                </SharedButton>
            </div>
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

const QuestionBlock = ({ block }: { block: QuestionBlock }) => {
    return (
        <div className="flex w-full flex-row gap-64">
            <Layout
                title="질문 작성"
                className="flex-2/4">
                <EditInput
                    placeholder="질문을 입력해주세요"
                    value={block.question}
                    onChange={() => {}}
                />
            </Layout>
            <Layout
                title="글자수"
                className="flex-1/4">
                <EditInput
                    placeholder="글자수 제한을 입력해주세요"
                    value={block.question}
                    onChange={() => {}}
                />
            </Layout>
        </div>
    )
}
