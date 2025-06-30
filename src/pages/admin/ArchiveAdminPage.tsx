import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import EditInput from '@/components/EditInput'
import { useState, useReducer } from 'react'
import FileUploadIcon from '@/assets/icons/FileUploadIcon.svg'
import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton'
import { Input } from '@/components/ui/input'
import PlusIcon from '@/assets/icons/CrossIcon.svg'
import XIcon from '@/assets/icons/CrossIcon.svg'
import { cn } from '@/lib/utils'

const projectInitialState = {
    title: '',
    subtitle: '',
    link: '',
    period: '',
    year: '',
    tag: '',
    type: '',
    isExcellent: false,
    description: '',
    team: '',
    teamMembers: [],
    images: []
}

const projectReducer = (state: typeof projectInitialState, action: any) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload }
        case 'SET_SUBTITLE':
            return { ...state, subtitle: action.payload }
        case 'SET_LINK':
            return { ...state, link: action.payload }
        case 'SET_PERIOD':
            return { ...state, period: action.payload }
        case 'SET_YEAR':
            return { ...state, year: action.payload }
        case 'SET_TAG':
            return { ...state, tag: action.payload }
        case 'SET_TYPE':
            return { ...state, type: action.payload }
        case 'SET_IS_EXCELLENT':
            return { ...state, isExcellent: action.payload }
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload }
        case 'SET_TEAM':
            return { ...state, team: action.payload }
        case 'SET_TEAM_MEMBERS':
            return { ...state, teamMembers: action.payload }
        case 'SET_TEAM_MEMBERS_NAME':
            return {
                ...state,
                teamMembers: state.teamMembers.map(
                    (member: { name: string; part: string }, index: number) =>
                        index === action.index
                            ? { ...member, name: action.payload }
                            : member
                )
            }
        case 'SET_TEAM_MEMBERS_PART':
            return {
                ...state,
                teamMembers: state.teamMembers.map(
                    (member: { name: string; part: string }, index: number) =>
                        index === action.index
                            ? { ...member, part: action.payload }
                            : member
                )
            }
        case 'SET_IMAGE':
            if (state.images.length >= 5) {
                alert('최대 5개까지 업로드할 수 있습니다.')
                return state
            }
            return { ...state, images: [action.payload, ...state.images] }
        case 'DELETE_IMAGE':
            return {
                ...state,
                images: state.images.filter((_, i) => i !== action.payload)
            }
        default:
            return state
    }
}

const galleryInitialState = {
    title: '',
    description: '',
    period: '',
    year: '',
    tag: '',
    image: null
}

const galleryReducer = (state: typeof galleryInitialState, action: any) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload }
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload }
        case 'SET_PERIOD':
            return { ...state, period: action.payload }
        case 'SET_YEAR':
            return { ...state, year: action.payload }
        case 'SET_TAG':
            return { ...state, tag: action.payload }
        case 'SET_IMAGE':
            return { ...state, image: action.payload }
        default:
            return state
    }
}

export default function ArchiveAdminPage() {
    const [projectState, projectDispatch] = useReducer(
        projectReducer,
        projectInitialState
    )
    const [galleryState, galleryDispatch] = useReducer(
        galleryReducer,
        galleryInitialState
    )
    const [type, setType] = useState('프로젝트')
    const {
        title: projectTitle,
        subtitle: projectSubtitle,
        link: projectLink,
        period: projectPeriod,
        year: projectYear,
        tag: projectTag,
        type: projectType,
        isExcellent: projectIsExcellent,
        description: projectDescription,
        team: projectTeam,
        teamMembers: projectTeamMembers,
        images: projectImages
    } = projectState
    const {
        title: galleryTitle,
        description: galleryDescription,
        period: galleryPeriod,
        year: galleryYear,
        tag: galleryTag,
        image: galleryImage
    } = galleryState

    const [projectImageSelected, setProjectImageSelected] = useState(0)
    const onUploadGalleryImage = () => {
        // 파일 선택
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = 'image/*'
        fileInput.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0]
            const fileUrl = URL.createObjectURL(file as Blob)
            galleryDispatch({
                type: 'SET_IMAGE',
                payload: fileUrl
            })
        }
        fileInput.click()
    }
    const onUploadProjectImage = () => {
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = 'image/*'
        fileInput.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0]
            const fileUrl = URL.createObjectURL(file as Blob)
            projectDispatch({
                type: 'SET_IMAGE',
                payload: fileUrl
            })
            setProjectImageSelected(0)
            console.log(
                projectImages.length - 1,
                projectImageSelected,
                projectImages
            )
        }
        fileInput.click()
    }
    return (
        <div className="relative flex h-full w-full flex-col gap-82 pt-185 pr-100 pl-128">
            <div className="flex flex-row items-start justify-between">
                <HighlightenTitle text={`${type} 업로드`} />
                <ToggleGroupButton
                    className="flex-row"
                    itemClassName="font-bold text-20"
                    value={type}
                    onValueChange={value => setType(value)}
                    options={[
                        { label: '프로젝트', value: '프로젝트' },
                        { label: '갤러리', value: '갤러리' }
                    ]}
                />
            </div>
            {type === '프로젝트' && (
                <div className="flex h-full w-full flex-row justify-between gap-64">
                    <div className="flex w-full max-w-480 flex-col gap-36">
                        <Layout title="사진">
                            {projectImages.length > 0 ? (
                                <img
                                    src={projectImages[projectImageSelected]}
                                    alt="파일 업로드"
                                    className="rounded-15 h-270 w-480 cursor-pointer object-cover"
                                    onClick={onUploadProjectImage}
                                />
                            ) : (
                                <div
                                    className="bg-pri-gray-1 rounded-15 flex h-270 w-480 flex-col items-center justify-center gap-12 overflow-hidden"
                                    onClick={onUploadProjectImage}>
                                    <img
                                        src={FileUploadIcon}
                                        alt="파일 업로드"
                                        className="h-90 w-90 cursor-pointer"
                                    />
                                    <p className="text-20 text-sub-seoultech-blue text-center font-medium">
                                        사진 업로드
                                        <br />
                                        최대 업로드 파일 크기 20MB
                                    </p>
                                </div>
                            )}
                            <div className="relative flex flex-row justify-between">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    return (
                                        <div className="rounded-8 relative h-53 w-91 cursor-pointer">
                                            {projectImages[index] ? (
                                                <>
                                                    <img
                                                        key={index}
                                                        src={
                                                            projectImages[index]
                                                        }
                                                        alt="파일 업로드"
                                                        className="rounded-8 h-53 w-91 cursor-pointer object-cover"
                                                        onClick={() => {
                                                            setProjectImageSelected(
                                                                index
                                                            )
                                                            console.log(
                                                                projectImages.length -
                                                                    1,
                                                                projectImageSelected,
                                                                projectImages
                                                            )
                                                        }}
                                                    />
                                                    <div
                                                        className="bg-pri-white rounded-50 absolute -top-4 -right-4 flex cursor-pointer flex-row items-center justify-center px-4 py-4"
                                                        onClick={() => {
                                                            setProjectImageSelected(
                                                                0
                                                            )
                                                            projectDispatch({
                                                                type: 'DELETE_IMAGE',
                                                                payload: index
                                                            })
                                                        }}>
                                                        <img
                                                            src={XIcon}
                                                            alt="파일 삭제"
                                                            className="h-12 w-12 rotate-45"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="bg-pri-gray-1 rounded-8 h-53 w-91 cursor-pointer" />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </Layout>
                        <Layout title="TEAM">
                            <EditInput
                                placeholder="팀명을 입력해주세요"
                                value={projectTeam}
                                onChange={value => {
                                    projectDispatch({
                                        type: 'SET_TEAM',
                                        payload: value
                                    })
                                }}
                            />
                        </Layout>
                        <Layout title="TEAM MEMBERS">
                            <div className="flex flex-row flex-wrap gap-16">
                                {projectTeamMembers.map((member, index) => (
                                    <MemberInput
                                        key={index}
                                        index={index}
                                        projectDispatch={projectDispatch}
                                        teamMembers={projectTeamMembers}
                                    />
                                ))}
                                <div
                                    className="bg-pri-gray-1 rounded-15 flex h-56 w-56 flex-row items-center justify-center p-16"
                                    onClick={() => {
                                        projectDispatch({
                                            type: 'SET_TEAM_MEMBERS',
                                            payload: [
                                                ...projectTeamMembers,
                                                { name: '', part: '' }
                                            ]
                                        })
                                    }}>
                                    <img
                                        src={PlusIcon}
                                        alt="팀원 추가"
                                    />
                                </div>
                            </div>
                        </Layout>
                    </div>
                    <div className="flex w-full flex-col gap-36">
                        <div className="flex w-full flex-row justify-between gap-64">
                            <div className="flex w-full flex-3/8 flex-col gap-36">
                                <Layout title="제목">
                                    <EditInput
                                        placeholder="제목을 입력해주세요"
                                        value={projectTitle}
                                        onChange={value =>
                                            projectDispatch({
                                                type: 'SET_TITLE',
                                                payload: value
                                            })
                                        }
                                    />
                                </Layout>
                                <Layout title="부제목">
                                    <EditInput
                                        placeholder="부제목을 입력해주세요"
                                        value={projectSubtitle}
                                        onChange={value =>
                                            projectDispatch({
                                                type: 'SET_SUBTITLE',
                                                payload: value
                                            })
                                        }
                                    />
                                </Layout>
                                <Layout title="링크">
                                    <EditInput
                                        placeholder="링크를 입력해주세요"
                                        value={projectLink}
                                        onChange={value =>
                                            projectDispatch({
                                                type: 'SET_LINK',
                                                payload: value
                                            })
                                        }
                                    />
                                </Layout>
                                <Layout title="프로젝트 기간">
                                    <EditInput
                                        placeholder="프로젝트 기간을 입력해주세요"
                                        value={projectPeriod}
                                        onChange={value => {
                                            projectDispatch({
                                                type: 'SET_PERIOD',
                                                payload: value
                                            })
                                        }}
                                        onBlur={() => {
                                            const result =
                                                validateDateRange(projectPeriod)
                                            if (!result.valid) {
                                                alert(result.message)
                                            }
                                        }}
                                    />
                                </Layout>
                            </div>
                            <div className="flex w-full flex-5/8 flex-col gap-36">
                                <Layout title="기수">
                                    <EditInput
                                        placeholder="기수를 입력해주세요"
                                        value={projectYear}
                                        onChange={value =>
                                            projectDispatch({
                                                type: 'SET_YEAR',
                                                payload: value
                                            })
                                        }
                                    />
                                </Layout>
                                <Layout title="활동태그">
                                    <ToggleGroupButton
                                        className="flex flex-row gap-16 px-12"
                                        itemClassName="text-16 font-bold w-full px-16"
                                        options={[
                                            {
                                                label: '아이디어톤',
                                                value: '아이디어톤'
                                            },
                                            {
                                                label: '중앙해커톤',
                                                value: '중앙해커톤'
                                            },
                                            {
                                                label: '장기프로젝트',
                                                value: '장기프로젝트'
                                            },
                                            {
                                                label: '기타',
                                                value: '기타'
                                            }
                                        ]}
                                    />
                                </Layout>
                                <Layout title="프로젝트 형태">
                                    <EditInput
                                        placeholder="프로젝트 형태를 입력해주세요"
                                        value={projectType}
                                        onChange={value =>
                                            projectDispatch({
                                                type: 'SET_TYPE',
                                                payload: value
                                            })
                                        }
                                    />
                                </Layout>
                                <Layout title="프로젝트 형태">
                                    <SharedButton
                                        className={cn(
                                            'rounded-50 border-sub-seoultech-red text-sub-seoultech-red h-auto w-fit border-2 bg-transparent px-16 py-8',
                                            projectIsExcellent &&
                                                'border-sub-seoultech-red text-pri-white bg-sub-seoultech-red'
                                        )}
                                        onClick={() =>
                                            projectDispatch({
                                                type: 'SET_IS_EXCELLENT',
                                                payload: !projectIsExcellent
                                            })
                                        }>
                                        우수작
                                    </SharedButton>
                                </Layout>
                            </div>
                        </div>
                        <Layout title="Project Overview">
                            <textarea
                                placeholder="프로젝트 소개를 입력해주세요"
                                value={projectDescription}
                                onChange={e =>
                                    projectDispatch({
                                        type: 'SET_DESCRIPTION',
                                        payload: e.target.value
                                    })
                                }
                                className="text-16 text-sub-seoultech-blue bg-pri-gray-1 dark:bg-pri-gray-1 placeholder:text-sub-seoultech-blue h-full min-h-125 w-full resize-none px-16 py-16 align-text-bottom font-medium"
                            />
                        </Layout>
                    </div>
                </div>
            )}
            {type === '갤러리' && (
                <div className="flex h-full w-full flex-row justify-between gap-128">
                    <div className="flex min-w-480 flex-col gap-36">
                        <Layout title="사진">
                            {galleryImage ? (
                                <img
                                    src={galleryImage}
                                    alt="파일 업로드"
                                    className="min-h-270 w-480 cursor-pointer object-cover"
                                    onClick={onUploadGalleryImage}
                                />
                            ) : (
                                <div
                                    className="bg-pri-gray-1 rounded-15 flex h-270 w-480 flex-col items-center justify-center gap-12 overflow-hidden"
                                    onClick={onUploadGalleryImage}>
                                    <img
                                        src={FileUploadIcon}
                                        alt="파일 업로드"
                                        className="h-90 w-90 cursor-pointer"
                                    />
                                    <p className="text-20 text-sub-seoultech-blue text-center font-medium">
                                        사진 업로드
                                        <br />
                                        최대 업로드 파일 크기 20MB
                                    </p>
                                </div>
                            )}
                        </Layout>
                    </div>
                    <div className="flex w-full flex-row justify-between gap-64">
                        <div className="flex w-full flex-3/8 flex-col gap-36">
                            <Layout title="제목">
                                <EditInput
                                    placeholder="제목을 입력해주세요"
                                    value={galleryTitle}
                                    onChange={value =>
                                        galleryDispatch({
                                            type: 'SET_TITLE',
                                            payload: value
                                        })
                                    }
                                />
                            </Layout>
                            <Layout title="한 줄 설명">
                                <EditInput
                                    placeholder="한 줄 설명을 입력해주세요"
                                    value={galleryDescription}
                                    onChange={value =>
                                        galleryDispatch({
                                            type: 'SET_DESCRIPTION',
                                            payload: value
                                        })
                                    }
                                />
                            </Layout>
                            <Layout title="활동 날짜">
                                <EditInput
                                    placeholder="활동 날짜를 입력해주세요"
                                    value={galleryPeriod}
                                    onChange={value =>
                                        galleryDispatch({
                                            type: 'SET_PERIOD',
                                            payload: value
                                        })
                                    }
                                />
                            </Layout>
                        </div>
                        <div className="flex w-full flex-5/8 flex-col gap-36">
                            <Layout title="기수">
                                <EditInput
                                    placeholder="기수를 입력해주세요"
                                    value={galleryYear}
                                    onChange={value =>
                                        galleryDispatch({
                                            type: 'SET_YEAR',
                                            payload: value
                                        })
                                    }
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

const MemberInput = ({
    index,
    projectDispatch,
    teamMembers
}: {
    index: number
    projectDispatch: (action: any) => void
    teamMembers: { name: string; part: string }[]
}) => {
    const [isPartSelected, setIsPartSelected] = useState(
        teamMembers[index].part === '' ? false : true
    )
    const onClickPart = (part: string) => {
        projectDispatch({
            type: 'SET_TEAM_MEMBERS_PART',
            payload: part,
            index
        })
        setIsPartSelected(true)
    }
    return (
        <div className="rounded-15 bg-pri-gray-1 relative flex w-fit flex-row items-center justify-center px-16 py-16">
            {isPartSelected ? (
                <div className="flex w-fit flex-row items-center justify-center gap-8">
                    <p
                        className="text-16 text-sub-seoultech-red w-fit font-bold text-nowrap"
                        onClick={() => setIsPartSelected(false)}>
                        {teamMembers[index].part || ''}
                    </p>
                    <Input
                        placeholder="이름을 입력해주세요"
                        value={teamMembers[index].name}
                        onChange={e =>
                            projectDispatch({
                                type: 'SET_TEAM_MEMBERS_NAME',
                                payload: e.target.value,
                                index
                            })
                        }
                        className="text-16 text-sub-seoultech-blue selection:text-pri-white selection:bg-sub-seoultech-blue selection:rounded-0 field-sizing-content h-full w-fit border-none font-bold shadow-none focus-visible:border-none focus-visible:ring-0"
                    />
                    <div
                        className="bg-pri-white rounded-50 absolute -top-4 -right-4 flex cursor-pointer flex-row items-center justify-center px-4 py-4"
                        onClick={() => {
                            projectDispatch({
                                type: 'SET_TEAM_MEMBERS',
                                payload: teamMembers.filter(
                                    (_, i) => i !== index
                                )
                            })
                        }}>
                        <img
                            src={XIcon}
                            alt="팀원 삭제"
                            className="h-12 w-12 rotate-45"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-row gap-8">
                    <p
                        className="text-16 text-sub-seoultech-red font-bold"
                        onClick={e =>
                            onClickPart(e.currentTarget.dataset.part || '')
                        }
                        data-part="PM">
                        PM
                    </p>
                    <p
                        className="text-16 text-sub-seoultech-red font-bold"
                        onClick={e =>
                            onClickPart(e.currentTarget.dataset.part || '')
                        }
                        data-part="DESIGN">
                        DESIGN
                    </p>
                    <p
                        className="text-16 text-sub-seoultech-red font-bold"
                        onClick={e =>
                            onClickPart(e.currentTarget.dataset.part || '')
                        }
                        data-part="BE">
                        BE
                    </p>
                    <p
                        className="text-16 text-sub-seoultech-red font-bold"
                        onClick={e =>
                            onClickPart(e.currentTarget.dataset.part || '')
                        }
                        data-part="FE">
                        FE
                    </p>
                    <p
                        className="text-16 text-sub-seoultech-red font-bold"
                        onClick={e =>
                            onClickPart(e.currentTarget.dataset.part || '')
                        }
                        data-part="AI">
                        AI
                    </p>
                </div>
            )}
        </div>
    )
}

function validateDateRange(dateRangeStr: string) {
    // 정규표현식으로 형식 확인
    const regex = /^(\d{4})\.(\d{2})\.(\d{2})~(\d{4})\.(\d{2})\.(\d{2})$/
    const match = dateRangeStr.match(regex)
    if (!match) {
        return {
            valid: false,
            message: '형식이 올바르지 않습니다. 예: 2025.06.01~2025.06.30'
        }
    }

    const [, sy, sm, sd, ey, em, ed] = match.map(Number)

    // 월이 0부터 시작하므로 -1
    const startDate = new Date(sy, sm - 1, sd)
    const endDate = new Date(ey, em - 1, ed)

    // 날짜가 실제 존재하는 날짜인지 확인 (자동 보정되는 날짜 방지)
    if (
        startDate.getFullYear() !== sy ||
        startDate.getMonth() !== sm - 1 ||
        startDate.getDate() !== sd ||
        endDate.getFullYear() !== ey ||
        endDate.getMonth() !== em - 1 ||
        endDate.getDate() !== ed
    ) {
        return {
            valid: false,
            message: '존재하지 않는 날짜가 포함되어 있습니다.'
        }
    }

    // 날짜 순서 확인
    if (startDate > endDate) {
        return {
            valid: false,
            message: '시작일이 종료일보다 늦을 수 없습니다.'
        }
    }

    return { valid: true, message: '유효한 날짜 범위입니다.' }
}
