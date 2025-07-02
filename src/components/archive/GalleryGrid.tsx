import { useEffect, useRef, useState } from 'react'
import GalleryCard from './GalleryCard'

export default function GalleryGrid({ galleryItems, scrollRef }: { galleryItems: any[], scrollRef: React.RefObject<HTMLDivElement> }) {
    const columns = Math.ceil(galleryItems.length / 3) + 1
    const rows = 3

    // 각 아이템 grid 위치 및 span 계산
    const getGridPosition = (index: number) => {
        const row = (index % rows) + 1
        const col = Math.floor(index / rows) + 1

        // 1~3 중 하나를 랜덤으로 뽑아서 rowSpan/colSpan에 동시에 할당
        const r = Math.random()
        let span
        if (r < 0.5) span = 1
        else if (r < 0.75) span = 2
        else span = 3
        // 끝부분 자연스럽게 마무리
        if (index >= galleryItems.length - 10) {
            span = Math.floor(Math.random() * 2) + 1
        }
        if (index >= galleryItems.length - 5) {
            span = 1
        }

        return {
            gridColumnStart: col,
            gridRowStart: row,
            gridColumnEnd: `span ${span}`,
            gridRowEnd: `span ${span}`
        }

    }
    return (
        <div
            ref={scrollRef}
            className="grid gap-16 pr-100 h-[57.129629629629626vh]"
            style={{
                gridAutoColumns: `calc(59.129629629629626vh * 9/16)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridAutoFlow: 'column dense',
                width: `calc(57.129629629629626vh * 9/16 * ${galleryItems.length})`
            }}>
            {galleryItems.map((item, index) => {
                const pos = getGridPosition(index)
                return (
                    <>
                        <GalleryCard
                            key={item.id}
                            style={{
                                gridColumnEnd: pos.gridColumnEnd,
                                gridRowEnd: pos.gridRowEnd
                            }}
                            index={index}
                        />
                    </>
                )
            })}
        </div>
    )
}
