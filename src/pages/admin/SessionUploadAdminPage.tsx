import HighlightenTitle from '@/components/HighlightenTitle'
import PDFViewer from '@/components/session/PDFViewer'
import { useParams } from 'react-router-dom'
import SharedButton from '@/components/SharedButton'
export default function SessionUploadAdminPage() {
    const { sessionId } = useParams()
    const { week, part, assignmentTitle } = {
        week: '1',
        part: '기획',
        assignmentTitle: '인터뷰 질문 만들기'
    }
    return (
        <div className="relative flex h-screen w-screen flex-row justify-between gap-64 overflow-x-scroll pt-185 pr-100 pl-128">
            <div className="flex w-334 flex-col gap-36">
                <h1>
                    <HighlightenTitle
                        text={`${week}주차 ${part} 세션`}
                        className="text-32 mb-8"
                    />
                    <p className="text-32 text-pri-black w-334 leading-[150%] font-bold text-wrap">
                        {part} 실슬 -{assignmentTitle}
                    </p>
                </h1>
                <div className="flex flex-col gap-16">
                    <h2 className="text-24 text-pri-black font-bold">게시일</h2>
                    <p className="text-16 text-sub-seoultech-blue bg-pri-gray-1 rounded-15 px-16 py-16 font-medium">
                        2025-06-24
                    </p>
                </div>
                <div className="flex flex-col gap-16">
                    <h2 className="text-24 text-pri-black font-bold">
                        과제 마감 기한
                    </h2>
                    <p className="text-16 text-sub-seoultech-blue bg-pri-gray-1 rounded-15 px-16 py-16 font-medium">
                        2025-06-24
                    </p>
                </div>
                <div className="flex flex-col gap-16">
                    <h2 className="text-24 text-pri-black font-bold">
                        과제 제출
                    </h2>
                    <input
                        type="text"
                        placeholder="과제 제출 링크"
                        className="text-16 text-sub-seoultech-blue bg-pri-gray-1 rounded-15 px-16 py-16 font-medium"
                    />
                </div>
                <SharedButton className="rounded-50 mt-80 h-auto w-fit px-16 py-8 font-bold">
                    과제 제출
                </SharedButton>
            </div>
            <div className="flex w-full flex-col items-end gap-50">
                <SharedButton className="rounded-50 border-sub-seoultech-red text-sub-seoultech-red h-auto w-fit border-2 bg-transparent px-16 py-8">
                    AI QUIZ 생성하기
                </SharedButton>
                <PDFViewer url={'src/assets/testpdf.pdf'} />
            </div>
        </div>
    )
}
