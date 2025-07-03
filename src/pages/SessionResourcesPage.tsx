import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SessionResourceList from '@/components/session/SessionResourceList'
import AnimatedButton from '@/components/ui/AnimatedButton'
import useVerticalScroll from '@/hooks/useVerticalScroll'
import { RefObject, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SessionResourcesPage() {
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
    const [sessionType, setSessionType] = useState('resources')
    const [part, setPart] = useState('all')
    const handlePartChange = (part: string) => {
        setPart(part)
    }
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(containerRef as RefObject<HTMLDivElement>, scrollRef as RefObject<HTMLDivElement>)
    const handleSessionTypeChange = (sessionType: string) => {
        setSessionType(sessionType)
    }
    const navigate = useNavigate()
    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-row justify-end gap-164 pt-185 pr-100 pl-128 overflow-y-hidden">
            <div className="flex flex-col justify-between">
                <HighlightenTitle text="세션 자료" className="text-nowrap" />
                <div className="flex flex-col gap-52 ">
                    <p className="text-24 text-pri-black font-bold">
                        파트 구분
                    </p>
                    <ToggleGroupButton
                        value={part}
                        onValueChange={handlePartChange}
                        options={[
                            { label: '전체', value: 'all' },
                            { label: '기획 PM', value: 'pm' },
                            { label: '백엔드 BACK-END', value: 'be' },
                            {
                                label: '프론트엔드 FRONT-END',
                                value: 'fe'
                            },
                            { label: '디자이너 DESIGNER', value: 'design' },
                            { label: '인공지능 AI', value: 'ai' }
                        ]}
                        className="text-sub-seoultech-red"
                    />
                </div>
            </div>
            <div className="flex h-full w-full flex-col items-end gap-115 relative">
                <ToggleGroupButton
                    options={[
                        { label: '세션 자료', value: 'resources' },
                        { label: 'AI QUIZ', value: 'ai-quiz' }
                    ]}
                    value={sessionType}
                    onValueChange={handleSessionTypeChange}

                    className="text-sub-seoultech-red flex-row"
                    itemClassName="px-16 py-8 h-auto"
                />
                <div ref={scrollRef} className="flex h-fit w-full -z-10">
                    <SessionResourceList items={items} />
                </div>
            </div>
            {sessionType === 'ai-quiz' && (
                <AnimatedButton
                    className="absolute bottom-128 right-100 z-100 "
                    text="과제 제출"
                    color="#E74C2E"
                    onClick={() => {
                        navigate('/session/ai-quiz')
                    }}
                >
                </AnimatedButton>
            )}
            <div className="flex h-300 w-full -z-10 bg-gradient-to-b from-background to-transparent absolute top-0" />
        </div>
    )
}
