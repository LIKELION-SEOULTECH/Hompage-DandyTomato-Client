import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import ArrowIcon from '@/assets/icons/FileUploadIcon.svg'
import { useNavigate } from 'react-router-dom'
    useApplicants,
    usePromotePassedApplicants,
    useSendPassNotification
} from '@/query/admin'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { RefObject } from 'react'
import useVerticalScroll from '@/hooks/useVerticalScroll'

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
        { name: '박영수', acceptState: '합불 여부 입력' }
    ]
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useVerticalScroll(
        containerRef as RefObject<HTMLDivElement>,
        scrollRef as RefObject<HTMLDivElement>
    )

    const [selectedPart, setSelectedPart] = useState('all')
    const [selectedRound, setSelectedRound] = useState('1')

    const { data: applicantsData, isLoading } = useApplicants({
        part: selectedPart === 'all' ? undefined : selectedPart.toUpperCase(),
        round: selectedRound
    })

    const { mutate: promoteApplicants, isPending: isPromoting } =
        usePromotePassedApplicants()
    const { mutate: sendNotification, isPending: isSending } =
        useSendPassNotification()

    const applicants = applicantsData?.data?.applicants || []

    const handlePromote = () => {
        // 합격자 승격 로직 (실제로는 선택된 지원자들을 처리)
        const passedApplicants = {
            [selectedPart.toUpperCase()]: applicants
                .filter((app: any) => app.status === 'PASS')
                .map((app: any) => ({ id: app.id }))
        }

        promoteApplicants({ round: selectedRound, body: passedApplicants })
    }

    const handleSendNotification = () => {
        sendNotification(selectedRound)
    }

    return (
        <div
            ref={containerRef}
            className="relative flex h-screen w-full flex-row justify-end gap-164 overflow-y-hidden pt-185 pr-100 pl-128">
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
                        value={selectedPart}
                        onValueChange={setSelectedPart}
                    />
                </div>
                <div className="flex flex-col gap-52">
                    <p className="text-24 text-pri-black font-bold">기수</p>
                    <ToggleGroupButton
                        options={[
                            { label: '1차', value: '1' },
                            { label: '2차', value: '2' },
                            { label: '3차', value: '3' }
                        ]}
                        className="text-sub-seoultech-red"
                        value={selectedRound}
                        onValueChange={setSelectedRound}
                    />
                </div>
            </div>
            <div className="flex h-full w-full flex-col items-end gap-115">
                <div className="flex w-full flex-row justify-between gap-16">
                    <div className="flex flex-row gap-16">
                        <SharedButton
                            className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8"
                            onClick={() => {}}>
                            합격 여부 저장
                        </SharedButton>
                        <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-red h-auto w-fit border-2 px-16 py-8">
                            합격 여부 전송하기
                        </SharedButton>
                    </div>
                    <SharedButton
                        className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8"
                        onClick={() => navigate('/admin/recruit/question')}>
                        질문 작성하기
                    </SharedButton>
                </div>
                <div
                    ref={scrollRef}
                    className="-z-10 flex h-fit w-full">
                    <RecruitList
                        items={applicants}
                        isLoading={isLoading}
                    />
                </div>

                <div className="flex flex-row gap-16">
                    <SharedButton
                        className="rounded-50 text-pri-white bg-sub-seoultech-red h-auto w-fit border-2 px-16 py-8"
                        onClick={handlePromote}
                        disabled={isPromoting}>
                        {isPromoting ? '처리 중...' : '합격자 승격'}
                    </SharedButton>
                    <SharedButton
                        className="rounded-50 text-pri-white bg-sub-seoultech-green h-auto w-fit border-2 px-16 py-8"
                        onClick={handleSendNotification}
                        disabled={isSending}>
                        {isSending ? '발송 중...' : '합격자 메일 발송'}
                    </SharedButton>
                </div>
            </div>
            <div className="from-background absolute top-0 -z-10 flex h-300 w-full bg-gradient-to-b to-transparent" />
        </div>
    )
}

interface RecruitItemProps {
    id: string
    name: string
    status: string
    part?: string
    round?: string
}

function RecruitItem({ id, name, status, part, round }: RecruitItemProps) {
    const getStatusDisplayName = (status: string) => {
        switch (status) {
            case 'PASS':
                return '합격'
            case 'FAIL':
                return '불합격'
            case 'PENDING':
                return '합불 여부 입력'
            default:
                return status
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PASS':
                return 'text-sub-seoultech-blue'
            case 'FAIL':
                return 'text-sub-seoultech-red'
            case 'PENDING':
                return 'text-pri-gray-disabled'
            default:
                return 'text-pri-gray-5'
        }
    }

    return (
        <div className="bg-pri-gray-1 rounded-15 flex w-full flex-row items-center justify-between gap-36 px-36 py-36">
            <div className="flex flex-row items-center gap-36">
                <img
                    src={ArrowIcon}
                    alt=""
                    className="h-44 w-44 rotate-90"
                />
                <div className="flex flex-col gap-8">
                    <span className="text-24 text-sub-seoultech-blue font-bold">
                        {name}
                    </span>
                    {part && (
                        <span className="text-16 text-pri-gray-5">
                            {part} - {round}차
                        </span>
                    )}
                </div>
            </div>

            <span className={cn('text-20 font-bold', getStatusColor(status))}>
                {getStatusDisplayName(status)}
            </span>
        </div>
    )
}

function RecruitList({
    items,
    isLoading,
    className
}: {
    items: any[]
    isLoading: boolean
    className?: string
}) {
    if (isLoading) {
        return (
            <div
                className={cn('flex h-full w-full flex-col gap-16', className)}>
                <div className="text-pri-gray-5 text-center">로딩 중...</div>
            </div>
        )
    }

    return (
        <div className={cn('flex h-full w-full flex-col gap-16', className)}>
            {items.map(applicant => (
                <RecruitItem
                    key={applicant.id}
                    id={applicant.id}
                    name={applicant.name}
                    status={applicant.status}
                    part={applicant.part}
                    round={applicant.round}
                />
            ))}
            {items.length === 0 && (
                <div className="text-pri-gray-5 text-center">
                    지원자가 없습니다.
                </div>
            )}
        </div>
    )
}
