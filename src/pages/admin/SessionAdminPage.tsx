import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SessionResourceList from '@/components/session/SessionResourceList'
import SharedButton from '@/components/SharedButton'
import useVerticalScroll from '@/hooks/useVerticalScroll'
import { useRef } from 'react'
import { RefObject } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SessionAdminPage() {
    const navigate = useNavigate()
    const items = [
        { week: 1, title: '과제 1', assignmentState: '과제 할당됨' },
        { week: 2, title: '과제 2', assignmentState: '과제 진행 중' },
        { week: 3, title: '과제 3', assignmentState: '과제 제출 완료' },
        { week: 4, title: '과제 4', assignmentState: '과제 없음' },
        { week: 5, title: '과제 5', assignmentState: '기한 만료' },
        { week: 6, title: '과제 6', assignmentState: '과제 할당됨' },
        { week: 7, title: '과제 7', assignmentState: '과제 진행 중' },
        { week: 8, title: '과제 8', assignmentState: '과제 제출 완료' },
        { week: 9, title: '과제 9', assignmentState: '과제 없음' },
        { week: 10, title: '과제 10', assignmentState: '기한 만료' }
    ]

    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(containerRef as RefObject<HTMLDivElement>, scrollRef as RefObject<HTMLDivElement>)
    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-row justify-end gap-164 pt-185 pr-100 pl-128 overflow-y-hidden">
            <div className="flex flex-col gap-313">
                <HighlightenTitle text="세션 관리" className='text-nowrap' />
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
                <div className='flex flex-row gap-16'>
                    <SharedButton className="rounded-50 text-sub-seoultech-red border-sub-seoultech-red h-auto w-fit border-2 bg-transparent px-16 py-8" onClick={() => navigate('/admin/session/upload')}>
                        제출 확인
                    </SharedButton>
                    <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-red h-auto w-fit border-2 px-16 py-8" onClick={() => navigate('/admin/session/upload')}>
                        자료 업로드
                    </SharedButton>
                </div>
                <div ref={scrollRef} className="flex h-fit w-full -z-10">
                    <SessionResourceList items={items} />
                </div>
            </div>
            <div className="flex h-300 w-full -z-10 bg-gradient-to-b from-background to-transparent absolute top-0" />
        </div>
    )
}
