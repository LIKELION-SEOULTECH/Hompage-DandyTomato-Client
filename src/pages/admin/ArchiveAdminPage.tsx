import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import EditInput from '@/components/EditInput'
import { useState } from 'react'
import TagBadge from '@/components/archive/TagBadge'
import FileUploadIcon from '@/assets/icons/FileUploadIcon.svg'
import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'

export default function ArchiveAdminPage() {
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [part, setPart] = useState('')
    const [portfolioLink1, setPortfolioLink1] = useState('')
    const [portfolioLink2, setPortfolioLink2] = useState('')
    const [portfolioLink3, setPortfolioLink3] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [type, setType] = useState('갤러리')
    const [team, setTeam] = useState('')
    const [teamMembers, setTeamMembers] = useState('')
    return (
        <div className="relative flex h-full w-full flex-col gap-82 pt-185 pr-100 pl-128">
            <div className="flex flex-row items-start justify-between">
                <HighlightenTitle text={`${type} 업로드`} />
                <ToggleGroupButton
                    className="flex-row"
                    itemClassName="font-bold text-20"
                    value={type}
                    onValueChange={setType}
                    options={[
                        { label: '프로젝트', value: '프로젝트' },
                        { label: '갤러리', value: '갤러리' }
                    ]}
                />
            </div>
            {type === '프로젝트' && (
                <div className="flex h-full w-full flex-row justify-between gap-128">
                    <div className="flex w-full max-w-344 flex-col gap-36">
                        <Layout title="사진">
                            <div
                                className="bg-pri-gray-1 rounded-15 flex h-344 w-344 flex-col items-center justify-center gap-12 overflow-hidden"
                                onClick={() => {
                                    // 파일 선택
                                    const fileInput =
                                        document.createElement('input')
                                    fileInput.type = 'file'
                                    fileInput.accept = 'image/*'
                                    fileInput.onchange = e => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            // 파일 업로드
                                            const formData = new FormData()
                                            formData.append('file', file)
                                            formData.append('type', 'profile')
                                            formData.append('id', '1')
                                            formData.append('name', 'profile')
                                            formData.append(
                                                'size',
                                                file.size.toString()
                                            )
                                        }
                                    }
                                    fileInput.click()
                                }}>
                                <img
                                    src={FileUploadIcon}
                                    alt="파일 업로드"
                                    className="h-90 w-90"
                                />
                                <p className="text-20 text-sub-seoultech-blue text-center font-medium">
                                    사진 업로드
                                    <br />
                                    최대 업로드 파일 크기 20MB
                                </p>
                            </div>
                        </Layout>
                        <Layout title="TEAM">
                            <EditInput
                                placeholder="팀명을 입력해주세요"
                                value={team}
                                onChange={setTeam}
                            />
                        </Layout>
                        <Layout title="TEAM MEMBERS">
                            <EditInput
                                placeholder="팀원을 입력해주세요"
                                value={teamMembers}
                                onChange={setTeamMembers}
                            />
                        </Layout>
                    </div>
                    <div className="flex w-full flex-col gap-36">
                        <div className="flex w-full flex-row justify-between gap-64">
                            <div className="flex w-full flex-3/8 flex-col gap-36">
                                <Layout title="제목">
                                    <EditInput
                                        placeholder="제목을 입력해주세요"
                                        value={name}
                                        onChange={setName}
                                    />
                                </Layout>
                                <Layout title="부제목">
                                    <EditInput
                                        placeholder="부제목을 입력해주세요"
                                        value={department}
                                        onChange={setDepartment}
                                    />
                                </Layout>
                                <Layout title="링크">
                                    <EditInput
                                        placeholder="링크를 입력해주세요"
                                        value={email}
                                        onChange={setEmail}
                                    />
                                </Layout>
                                <Layout title="프로젝트 기간">
                                    <TagBadge
                                        tag="NONE"
                                        className="text-20 px-16 py-8 font-bold"
                                        withHash={false}
                                    />
                                </Layout>
                            </div>
                            <div className="flex w-full flex-5/8 flex-col gap-36">
                                <Layout title="기수">
                                    <EditInput
                                        placeholder="기수를 입력해주세요"
                                        value={portfolioLink1}
                                        onChange={setPortfolioLink1}
                                    />
                                </Layout>
                                <Layout title="활동태그">
                                    <ToggleGroupButton
                                        className="flex flex-row gap-16 px-12 py-6"
                                        options={[
                                            {
                                                label: '정기세션',
                                                value: '정기세션'
                                            },
                                            {
                                                label: '중앙활동',
                                                value: '중앙활동'
                                            },
                                            {
                                                label: '자체활동',
                                                value: '자체활동'
                                            },
                                            {
                                                label: '친목활동',
                                                value: '친목활동'
                                            }
                                        ]}
                                    />
                                </Layout>
                                <Layout title="프로젝트 형태">
                                    <EditInput
                                        placeholder="프로젝트 형태를 입력해주세요"
                                        value={portfolioLink3}
                                        onChange={setPortfolioLink3}
                                    />
                                </Layout>
                                <Layout title="프로젝트 형태">
                                    <SharedButton className="rounded-50 border-sub-seoultech-red text-sub-seoultech-red h-auto w-fit border-2 bg-transparent px-16 py-8">
                                        우수작
                                    </SharedButton>
                                </Layout>
                            </div>
                        </div>
                        <Layout title="Project Overview">
                            <textarea
                                placeholder="프로젝트 소개를 입력해주세요"
                                value={introduction}
                                onChange={e => setIntroduction(e.target.value)}
                                className="text-16 text-sub-seoultech-blue bg-pri-gray-1 dark:bg-pri-gray-1 placeholder:text-sub-seoultech-blue h-full min-h-125 w-full resize-none px-16 py-16 align-text-bottom font-medium"
                            />
                        </Layout>
                    </div>
                </div>
            )}
            {type === '갤러리' && (
                <div className="flex h-full w-full flex-row justify-between gap-128">
                    <div className="flex w-full max-w-344 flex-col gap-36">
                        <Layout title="사진">
                            <div
                                className="bg-pri-gray-1 rounded-15 flex h-344 w-344 flex-col items-center justify-center gap-12 overflow-hidden"
                                onClick={() => {
                                    // 파일 선택
                                    const fileInput =
                                        document.createElement('input')
                                    fileInput.type = 'file'
                                    fileInput.accept = 'image/*'
                                    fileInput.onchange = e => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            // 파일 업로드
                                            const formData = new FormData()
                                            formData.append('file', file)
                                            formData.append('type', 'profile')
                                            formData.append('id', '1')
                                            formData.append('name', 'profile')
                                            formData.append(
                                                'size',
                                                file.size.toString()
                                            )
                                        }
                                    }
                                    fileInput.click()
                                }}>
                                <img
                                    src={FileUploadIcon}
                                    alt="파일 업로드"
                                    className="h-90 w-90"
                                />
                                <p className="text-20 text-sub-seoultech-blue text-center font-medium">
                                    사진 업로드
                                    <br />
                                    최대 업로드 파일 크기 20MB
                                </p>
                            </div>
                        </Layout>
                    </div>
                    <div className="flex w-full flex-row justify-between gap-64">
                        <div className="flex w-full flex-3/8 flex-col gap-36">
                            <Layout title="제목">
                                <EditInput
                                    placeholder="제목을 입력해주세요"
                                    value={name}
                                    onChange={setName}
                                />
                            </Layout>
                            <Layout title="한 줄 설명">
                                <EditInput
                                    placeholder="한 줄 설명을 입력해주세요"
                                    value={department}
                                    onChange={setDepartment}
                                />
                            </Layout>
                            <Layout title="활동 날짜">
                                <EditInput
                                    placeholder="활동 날짜를 입력해주세요"
                                    value={email}
                                    onChange={setEmail}
                                />
                            </Layout>
                        </div>
                        <div className="flex w-full flex-5/8 flex-col gap-36">
                            <Layout title="기수">
                                <EditInput
                                    placeholder="기수를 입력해주세요"
                                    value={portfolioLink1}
                                    onChange={setPortfolioLink1}
                                />
                            </Layout>
                            <Layout title="활동태그">
                                <ToggleGroupButton
                                    className="flex flex-row gap-16 px-12 py-6"
                                    options={[
                                        {
                                            label: '정기세션',
                                            value: '정기세션'
                                        },
                                        {
                                            label: '중앙활동',
                                            value: '중앙활동'
                                        },
                                        {
                                            label: '자체활동',
                                            value: '자체활동'
                                        },
                                        {
                                            label: '친목활동',
                                            value: '친목활동'
                                        }
                                    ]}
                                />
                            </Layout>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const Layout = ({
    title,
    children
}: {
    title: string
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col gap-16">
            <p className="text-24 text-pri-black font-bold">{title}</p>
            {children}
        </div>
    )
}
