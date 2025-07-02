import useVerticalScroll from '@/hooks/useVerticalScroll'
import useWindowSize from '@/hooks/useWindowSize'
import React, { useState, useRef, RefObject } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Skeleton } from '../ui/skeleton'

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
    url: string
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const onDocumentLoadSuccess = (pdf: { numPages: number }) => {
        setNumPages(pdf.numPages)
    }

    const goPrev = () => {
        setPageNumber(prev => Math.max(prev - 1, 1))
    }

    const goNext = () => {
        if (numPages) {
            setPageNumber(prev => Math.min(prev + 1, numPages))
        }
    }

    const handleFullscreen = () => {
        if (viewerRef.current) {
            if (viewerRef.current.requestFullscreen) {
                viewerRef.current.requestFullscreen()
            } else if ((viewerRef.current as any).webkitRequestFullscreen) {
                ;(viewerRef.current as any).webkitRequestFullscreen()
            }
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = url
        link.download = url.split('/').pop() || 'document.pdf'
        link.click()
    }

    // PDF 뷰어 너비 조절(해상도 변경시 너비 자동 조절)
    const viewerRef = useRef<HTMLDivElement>(null)
    const [computedWidth, setComputedWidth] = useState(728) // Default fallback

    useVerticalScroll(viewerRef as RefObject<HTMLDivElement>)
    React.useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (viewerRef.current) {
                // Trigger a re-render by updating the memo dependency
                setComputedWidth(viewerRef.current.clientWidth || 728)
            }
        })

        if (viewerRef.current) {
            observer.observe(viewerRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [viewerRef])
    return (
        <div className="w-full overflow-y-hidden text-center">
            <div className="text-sub-seoultech-blue text-16 mb-38 flex w-full items-center justify-between font-bold">
                <div>
                    <button onClick={goPrev}>〈</button>
                    <span className="mx-10">
                        {pageNumber} / {numPages ?? '?'}
                    </span>
                    <button onClick={goNext}>〉</button>
                </div>
                <div>
                    <button
                        onClick={handleFullscreen}
                        className="ml-10">
                        ⛶ 전체 화면
                    </button>
                    <button onClick={handleDownload}>⬇ 다운로드</button>
                </div>
            </div>

            {/* {numPages && (
                <input
                    type="range"
                    min="1"
                    max={numPages}
                    value={pageNumber}
                    onChange={handleSliderChange}
                    style={{ width: '80%', marginBottom: '10px' }}
                />
            )} */}

            <div
                className="hide-scrollbar flex h-800 w-full justify-center overflow-y-scroll"
                ref={viewerRef}>
                <Document
                    className=""
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <Skeleton
                            className="h-600"
                            style={{ width: `${computedWidth}px` }}
                        />
                    }>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            className=""
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            // scale={scale} // 1280px 기준 비율
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={computedWidth} // 원하는 너비로 조절
                        />
                    ))}
                </Document>
            </div>
        </div>
    )
}

export default PDFViewer
