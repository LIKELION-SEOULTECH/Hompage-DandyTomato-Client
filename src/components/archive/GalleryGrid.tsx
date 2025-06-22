import GalleryCard from './GalleryCard'

export default function GalleryGrid({ galleryItems }: { galleryItems: any[] }) {
    const columns = Math.ceil(galleryItems.length / 3) + 1
    const rows = 3

    // 각 아이템 grid 위치 및 span 계산
    const getGridPosition = (index: number) => {
        const row = (index % rows) + 1
        // const row = Math.floor(Math.random() * 3) + 1
        const col = Math.floor(index / rows) + 1

        let colSpan = Math.floor(Math.random() * 3) + 1
        let rowSpan = Math.floor(Math.random() * 3) + 1
        // 2행 이상은 1로
        if (row >= 2 && rowSpan >= 2) {
            rowSpan = 1
        }
        if (colSpan >= 3 && col % 3 === 0) {
            colSpan = 1
        }

        // 끝부분 자연스럽게 끝나게
        if (index >= galleryItems.length - 10) {
            colSpan = Math.floor(Math.random() * 2) + 1
            rowSpan = Math.floor(Math.random() * 2) + 1
        }

        if (index >= galleryItems.length - 5) {
            colSpan = 1
            rowSpan = 1
        }

        return {
            gridColumnStart: col,
            gridRowStart: row,
            gridColumnEnd: `span ${colSpan}`,
            gridRowEnd: `span ${rowSpan}`
        }
    }
    return (
        <div
            className="absolute top-[280px] left-32 grid gap-16"
            style={{
                // gridTemplateColumns: `repeat(${galleryItems.length}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, minmax(200px, 1fr))`,
                gridAutoFlow: 'column dense',

                // height: `100%`
                width: `${galleryItems.length * 200}px`
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
