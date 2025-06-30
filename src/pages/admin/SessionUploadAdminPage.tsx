import HighlightenTitle from '@/components/HighlightenTitle'
import PDFViewer from '@/components/session/PDFViewer'
import { useParams } from 'react-router-dom'
import SharedButton from '@/components/SharedButton'
import EditInput from '@/components/EditInput'
import { useReducer, useState } from 'react'

const initialState = {
    week: '',
    title: '',
    uploadDate: '',
    deadline: '',
    pdf: ''
}

const reducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
        case 'SET_WEEK':
            return { ...state, week: action.payload }
        case 'SET_TITLE':
            return { ...state, title: action.payload }
        case 'SET_UPLOAD_DATE':
            return { ...state, uploadDate: action.payload }
        case 'SET_DEADLINE':
            return { ...state, deadline: action.payload }
        case 'SET_PDF':
            return { ...state, pdf: action.payload }
        default:
            return state
    }

    return state
}

export default function SessionUploadAdminPage() {
    const { sessionId } = useParams()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const onUploadPdf = () => {
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = 'application/pdf'
        fileInput.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const fileUrl = URL.createObjectURL(file)
                setPdfUrl(fileUrl)
            }
            dispatch({
                type: 'SET_PDF',
                payload: file
            })
        }
        fileInput.click()
    }
    return (
        <div className="relative flex h-screen w-screen flex-row justify-between gap-64 overflow-x-scroll pt-185 pr-100 pl-128">
            <div className="flex w-334 flex-col gap-36">
                <Layout title="주차">
                    <EditInput
                        placeholder="주차"
                        value={state.week}
                        onChange={value =>
                            dispatch({
                                type: 'SET_WEEK',
                                payload: value
                            })
                        }
                    />
                </Layout>
                <Layout title="제목">
                    <EditInput
                        placeholder="제목"
                        value={state.title}
                        onChange={value =>
                            dispatch({
                                type: 'SET_TITLE',
                                payload: value
                            })
                        }
                    />
                </Layout>
                <Layout title="게시일">
                    <EditInput
                        placeholder="게시일"
                        value={state.uploadDate}
                        onChange={value =>
                            dispatch({
                                type: 'SET_UPLOAD_DATE',
                                payload: value
                            })
                        }
                    />
                </Layout>
                <Layout title="과제 마감 기한">
                    <EditInput
                        placeholder="과제 마감 기한"
                        value={state.deadline}
                        onChange={value =>
                            dispatch({
                                type: 'SET_DEADLINE',
                                payload: value
                            })
                        }
                    />
                </Layout>
                <SharedButton className="rounded-50 mt-80 h-auto w-fit px-16 py-8 font-bold">
                    자료 업로드
                </SharedButton>
            </div>
            <div className="flex w-full flex-col items-end gap-50">
                {state.pdf ? (
                    <PDFViewer url={state.pdf} />
                ) : (
                    <div
                        className="bg-pri-gray-1 rounded-15 flex h-full w-full items-center justify-center"
                        onClick={onUploadPdf}>
                        <p className="text-16 text-pri-black">
                            PDF 파일이 없습니다.
                        </p>
                    </div>
                )}
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
