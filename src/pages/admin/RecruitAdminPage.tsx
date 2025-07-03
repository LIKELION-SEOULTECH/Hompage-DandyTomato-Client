import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import ArrowIcon from '@/assets/icons/FileUploadIcon.svg'
import { useNavigate } from 'react-router-dom'

export default function RecruitAdminPage() {
    const navigate = useNavigate()
    const items = [
        { name: '김철수', acceptState: '합격' },
        { name: '이영희', acceptState: '불합격' },
        { name: '박영수', acceptState: '합불 여부 입력' },
        { name: '박영수', acceptState: '합불 여부 입력' },
        { name: '박영수', acceptState: '합불 여부 입력' },
        { name: '박영수', acceptState: '합불 여부 입력' },
        { name: '박영수', acceptState: '합불 여부 입력' },
        { name: '박영수', acceptState: '합불 여부 입력' },
    ]
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(containerRef as RefObject<HTMLDivElement>, scrollRef as RefObject<HTMLDivElement>)
    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-row justify-end gap-164 pt-185 pr-100 pl-128 overflow-y-hidden">
            <div className="flex flex-col gap-313">
                <HighlightenTitle
                    text="지원서 관리"
                    className="text-nowrap"
                />
                <div className="flex flex-col gap-52">
                    <p className="text-24 text-pri-black font-bold">
                        파트 구분
                    </p>
                    <ToggleGroupButton
                        options={[
                            { label: '전체', value: 'all' },
                            { label: '기획 PM', value: 'pm' },
                            { label: '백엔드 BACK-END', value: 'backend' },
                            {
                                label: '프론트엔드 FRONT-END',
                                value: 'frontend'
                            },
                            { label: '디자이너 DESIGNER', value: 'designer' },
                            { label: '인공지능 AI', value: 'ai' }
                        ]}
                        className="text-sub-seoultech-red"
                    />
                </div>
            </div>
            <div className="flex h-full w-full flex-col items-end gap-115">
                <div className="flex flex-row gap-16 justify-between w-full">
                    <div className='flex flex-row gap-16'>
                        <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8" onClick={() => { }}>
                            합격 여부 저장
                        </SharedButton>
                        <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-red h-auto w-fit border-2 px-16 py-8">
                            합격 여부 전송하기
                        </SharedButton></div>
                    <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8" onClick={() => navigate('/admin/recruit/question')}>
                        질문 작성하기
                    </SharedButton>
                </div>
                <div ref={scrollRef} className="flex h-fit w-full -z-10">
                    <RecruitList items={items} />
                </div>
            </div>
            <div className="flex h-300 w-full -z-10 bg-gradient-to-b from-background to-transparent absolute top-0" />
        </div>
    )
}

interface RecruitItemProps {
    name: string
    acceptState: '합격' | '불합격' | '합불 여부 입력'
}

function RecruitItem({ name, acceptState }: RecruitItemProps) {
    return (
        <div className="bg-pri-gray-1 rounded-15 flex w-full flex-row items-center justify-between gap-36 px-36 py-36">
            <div className="flex flex-row items-center gap-36">
                <img
                    src={ArrowIcon}
                    alt=""
                    className="h-44 w-44 rotate-90"
                />
                <p className="flex flex-row gap-16">
                    <span className="text-24 text-sub-seoultech-blue font-bold">
                        {name}
                    </span>
                </p>
            </div>

            <p className="text-20 text-pri-gray-5 font-bold">
                {acceptState === '불합격' && (
                    <span className="text-sub-seoultech-red">불합격</span>
                )}
                {acceptState === '합격' && (
                    <span className="text-sub-seoultech-blue">합격</span>
                )}
                {acceptState === '합불 여부 입력' && (
                    <span className="text-pri-gray-disabled">
                        합불 여부 입력
                    </span>
                )}
            </p>
        </div>
    )
}

import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { RefObject } from 'react'
import useVerticalScroll from '@/hooks/useVerticalScroll'

function RecruitList({
    items,
    className
}: {
    items: RecruitItemProps[]
    className?: string
}) {
    return (
        <div className={cn('flex h-full w-full flex-col gap-16', className)}>
            {items.map((item, index) => (
                <RecruitItem
                    key={index}
                    {...item}
                />
            ))}
        </div>
    )
}
