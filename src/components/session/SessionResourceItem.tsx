export interface SessionResourceItemProps {
    week: number
    title: string
    assignmentState:
        | '과제 할당됨'
        | '과제 진행 중'
        | '과제 제출 완료'
        | '과제 없음'
        | '기한 만료'
}

export default function SessionResourceItem({
    week,
    title,
    assignmentState
}: SessionResourceItemProps) {
    return (
        <div className="bg-pri-gray-1 rounded-15 flex w-full flex-row items-center justify-between gap-36 px-36 py-36">
            <p className="flex flex-row gap-16">
                <span className="text-24 text-sub-seoultech-red font-bold">
                    {week}주차
                </span>
                <span className="text-24 text-sub-seoultech-blue font-bold">
                    {title}
                </span>
            </p>

            <p className="text-20 text-pri-gray-5 font-bold">
                {assignmentState === '과제 할당됨' && (
                    <span className="text-sub-seoultech-red">과제 할당됨</span>
                )}
                {assignmentState === '과제 진행 중' && (
                    <span className="text-sub-seoultech-blue">
                        과제 진행 중
                    </span>
                )}
                {(assignmentState === '과제 제출 완료' ||
                    assignmentState === '기한 만료' ||
                    assignmentState === '과제 없음') && (
                    <span className="text-pri-gray-disabled">
                        과제 제출 완료
                    </span>
                )}
            </p>
        </div>
    )
}
