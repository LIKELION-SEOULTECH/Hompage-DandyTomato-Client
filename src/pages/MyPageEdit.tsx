import HighlightenTitle from '@/components/HighlightenTitle'
import SharedButton from '@/components/SharedButton'
import EditInput from '@/components/EditInput'
import { useState } from 'react'
import TagBadge from '@/components/archive/TagBadge'
import FileUploadIcon from '@/assets/icons/FileUploadIcon.svg'

export default function MyPageEdit() {
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [part, setPart] = useState('')
    const [portfolioLink1, setPortfolioLink1] = useState('')
    const [portfolioLink2, setPortfolioLink2] = useState('')
    const [portfolioLink3, setPortfolioLink3] = useState('')
    const [introduction, setIntroduction] = useState('')

    return (
        <div className="relative flex h-full w-full flex-col gap-82 pt-185 pr-100 pl-128">
            <div className="flex flex-row items-start justify-between">
                <HighlightenTitle text="프로필 수정" />
                <SharedButton className="px-16 py-8">저장하기</SharedButton>
            </div>
            <div className="flex h-full w-full flex-row justify-between gap-128">
                <div className="flex w-full max-w-344 flex-col gap-36">
                    <Layout title="프로필 사진">
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
                        <Layout title="이름">
                            <EditInput
                                placeholder="이름을 입력해주세요"
                                value={name}
                                onChange={setName}
                            />
                        </Layout>
                        <Layout title="학과">
                            <EditInput
                                placeholder="학과를 입력해주세요"
                                value={department}
                                onChange={setDepartment}
                            />
                        </Layout>
                        <Layout title="이메일">
                            <EditInput
                                placeholder="이메일을 입력해주세요"
                                value={email}
                                onChange={setEmail}
                            />
                        </Layout>
                        <Layout title="파트">
                            <TagBadge
                                tag="NONE"
                                className="text-20 px-16 py-8 font-bold"
                                withHash={false}
                            />
                        </Layout>
                    </div>
                    <div className="flex w-full flex-5/8 flex-col gap-36">
                        <Layout title="포트폴리오 링크 1">
                            <EditInput
                                placeholder="포트폴리오 링크를 입력해주세요"
                                value={portfolioLink1}
                                onChange={setPortfolioLink1}
                            />
                        </Layout>
                        <Layout title="포트폴리오 링크 2">
                            <EditInput
                                placeholder="포트폴리오 링크를 입력해주세요"
                                value={portfolioLink2}
                                onChange={setPortfolioLink2}
                            />
                        </Layout>
                        <Layout title="포트폴리오 링크 3">
                            <EditInput
                                placeholder="포트폴리오 링크를 입력해주세요"
                                value={portfolioLink3}
                                onChange={setPortfolioLink3}
                            />
                        </Layout>
                        <Layout title="자기소개">
                            <textarea
                                placeholder="자기소개를 입력해주세요"
                                value={introduction}
                                onChange={e => setIntroduction(e.target.value)}
                                className="text-16 text-sub-seoultech-blue bg-pri-gray-1 dark:bg-pri-gray-1 placeholder:text-sub-seoultech-blue h-full min-h-125 w-full resize-none px-16 py-16 align-text-bottom font-medium"
                            />
                        </Layout>
                    </div>
                </div>
            </div>
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
