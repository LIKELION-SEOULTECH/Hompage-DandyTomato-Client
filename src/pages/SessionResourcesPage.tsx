import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SessionResourceList from '@/components/session/SessionResourceList'

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

    return (
        <div className="relative flex h-full w-full flex-row justify-end gap-164 pt-185 pr-100 pl-128">
            <div className="flex flex-col gap-313">
                <HighlightenTitle text="세션 자료" />
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
                <ToggleGroupButton
                    options={[
                        { label: '세션 자료', value: 'resources' },
                        { label: 'AI QUIZ', value: 'ai-quiz' }
                    ]}
                    className="text-sub-seoultech-red flex-row"
                    itemClassName="px-16 py-8 h-auto"
                />
                <SessionResourceList items={items} />
            </div>
        </div>
    )
}
