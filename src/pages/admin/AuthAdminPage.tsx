import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import ArrowIcon from '@/assets/icons/FileUploadIcon.svg'
import { useAdminMembers, useUpdateMemberRole } from '@/query/admin'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import FilterButton from '@/components/archive/FilterButton'
import SharedButton from '@/components/SharedButton'
import useVerticalScroll from '@/hooks/useVerticalScroll'
import { useRef } from 'react'
import { RefObject } from 'react'

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
    useVerticalScroll(
        containerRef as RefObject<HTMLDivElement>,
        scrollRef as RefObject<HTMLDivElement>
    )
    const [selectedPart, setSelectedPart] = useState('all')
    const [selectedYear, setSelectedYear] = useState('2024')

    const { data: membersData, isLoading } = useAdminMembers({
        role: selectedPart === 'all' ? undefined : selectedPart.toUpperCase()
    })

    const { mutate: updateRole, isPending: isUpdating } = useUpdateMemberRole()

    const members = membersData?.data?.members || []

    const handleRoleChange = (memberId: string, newRole: string) => {
        updateRole({ memberId, role: newRole })
    }

    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'MASTER':
                return '마스터'
            case 'ADMIN':
                return '관리자'
            case 'MEMBER':
                return '아기사자'
            case 'GUEST':
                return '게스트'
            default:
                return role
        }
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'MASTER':
                return 'text-sub-seoultech-red'
            case 'ADMIN':
                return 'text-sub-seoultech-blue'
            case 'MEMBER':
            case 'GUEST':
                return 'text-pri-gray-disabled'
            default:
                return 'text-pri-gray-5'
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative flex h-screen w-full flex-row justify-end gap-164 overflow-y-hidden pt-185 pr-100 pl-128">
            <div className="flex flex-col gap-313">
                <HighlightenTitle
                    text="권한 설정"
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
                    <SharedButton
                        className="rounded-50 text-pri-white bg-sub-seoultech-blue h-auto w-fit border-2 px-16 py-8"
                        onClick={() => {}}>
                        저장하기
                    </SharedButton>
                </div>
                <div
                    ref={scrollRef}
                    className="-z-10 flex h-fit w-full">
                    <AuthList
                        items={members}
                        onRoleChange={handleRoleChange}
                        isLoading={isLoading}
                        isUpdating={isUpdating}
                    />
                </div>
            </div>
            <div className="from-background absolute top-0 -z-10 flex h-300 w-full bg-gradient-to-b to-transparent" />
        </div>
    )
}

interface AuthItemProps {
    id: string
    name: string
    role: string
    part?: string
    onRoleChange: (memberId: string, newRole: string) => void
    isUpdating: boolean
}

function AuthItem({
    id,
    name,
    role,
    part,
    onRoleChange,
    isUpdating
}: AuthItemProps) {
    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'MASTER':
                return '마스터'
            case 'ADMIN':
                return '관리자'
            case 'MEMBER':
                return '아기사자'
            case 'GUEST':
                return '게스트'
            default:
                return role
        }
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'MASTER':
                return 'text-sub-seoultech-red'
            case 'ADMIN':
                return 'text-sub-seoultech-blue'
            case 'MEMBER':
            case 'GUEST':
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
                        <span className="text-16 text-pri-gray-5">{part}</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-16">
                <select
                    value={role}
                    onChange={e => onRoleChange(id, e.target.value)}
                    disabled={isUpdating}
                    className="text-20 cursor-pointer border-none bg-transparent font-bold">
                    <option value="GUEST">게스트</option>
                    <option value="MEMBER">아기사자</option>
                    <option value="ADMIN">관리자</option>
                    <option value="MASTER">마스터</option>
                </select>
                <span className={cn('text-20 font-bold', getRoleColor(role))}>
                    {getRoleDisplayName(role)}
                </span>
            </div>
        </div>
    )
}
function AuthList({
    items,
    onRoleChange,
    isLoading,
    isUpdating,
    className
}: {
    items: any[]
    onRoleChange: (memberId: string, newRole: string) => void
    isLoading: boolean
    isUpdating: boolean
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
            {items.map(member => (
                <AuthItem
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    role={member.role}
                    part={member.part}
                    onRoleChange={onRoleChange}
                    isUpdating={isUpdating}
                />
            ))}
            {items.length === 0 && (
                <div className="text-pri-gray-5 text-center">
                    멤버가 없습니다.
                </div>
            )}
        </div>
    )
}
