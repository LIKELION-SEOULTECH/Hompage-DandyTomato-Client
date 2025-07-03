import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import ArrowIcon from '@/assets/icons/FileUploadIcon.svg'

export default function AuthAdminPage() {
    const items = [
        { name: '김철수', authState: '마스터' },
        { name: '이영희', authState: '관리자' },
        { name: '박영수', authState: '아기사자' },
        { name: '최영희', authState: '게스트' },
        { name: '김철수', authState: '마스터' },
        { name: '이영희', authState: '관리자' },
        { name: '박영수', authState: '아기사자' },
        { name: '최영희', authState: '게스트' }
    ]
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(containerRef as RefObject<HTMLDivElement>, scrollRef as RefObject<HTMLDivElement>)
    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-row justify-end gap-164 pt-185 pr-100 pl-128 overflow-y-hidden">
            <div className="flex flex-col gap-313">
                <HighlightenTitle text="권한 설정" className='text-nowrap' />
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
                <div className="flex flex-row gap-16">
                    <FilterButton
                        text="기수"
                        options={[
                            { label: '2025', value: '2025' },
                            { label: '2024', value: '2024' },
                            { label: '2023', value: '2023' }
                        ]}
                    />
                    <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8" onClick={() => { }}>
                        저장하기
                    </SharedButton>
                </div>
                <div ref={scrollRef} className="flex h-fit w-full -z-10">
                    <AuthList items={items} />
                </div>
            </div>
            <div className="flex h-300 w-full -z-10 bg-gradient-to-b from-background to-transparent absolute top-0" />
        </div>
    )
}

interface AuthItemProps {
    name: string
    authState: '마스터' | '관리자' | '아기사자' | '게스트'
}

function AuthItem({ name, authState }: AuthItemProps) {
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
                {authState === '마스터' && (
                    <span className="text-sub-seoultech-red">마스터</span>
                )}
                {authState === '관리자' && (
                    <span className="text-sub-seoultech-blue">관리자</span>
                )}
                {authState === '아기사자' && (
                    <span className="text-pri-gray-disabled">아기사자</span>
                )}
                {authState === '게스트' && (
                    <span className="text-pri-gray-disabled">게스트</span>
                )}
            </p>
        </div>
    )
}

import { cn } from '@/lib/utils'
import FilterButton from '@/components/archive/FilterButton'
import SharedButton from '@/components/SharedButton'
import useVerticalScroll from '@/hooks/useVerticalScroll'
import { useRef } from 'react'
import { RefObject } from 'react'

function AuthList({
    items,
    className
}: {
    items: AuthItemProps[]
    className?: string
}) {
    return (
        <div className={cn('flex h-full w-full flex-col gap-16', className)}>
            {items.map((item, index) => (
                <AuthItem
                    key={index}
                    {...item}
                />
            ))}
        </div>
    )
}
