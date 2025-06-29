import TagBadge from '../archive/TagBadge'

export default function MemberItem({
    name,
    image,
    part,
    generation,
    onClick
}: {
    name: string
    image?: string
    part: string
    generation: string
    onClick: () => void
}) {
    return (
        <div
            className="rounded-15 relative h-286 w-286 overflow-hidden bg-transparent"
            onClick={onClick}>
            {/* 이미지 */}
            <img
                src={image || '/src/assets/images/MemberCardDefault.png'}
                alt={name}
                className="rounded-15 absolute top-0 left-0 z-1 h-full w-full overflow-hidden object-cover"
            />
            {/* 이름, 태그 */}
            <div className="relative z-9 flex h-full w-full flex-col items-center justify-end px-36 py-24">
                <div className="flex flex-col items-center justify-center gap-8 text-center">
                    <p className="text-16 text-pri-white font-semibold">
                        {name}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-8">
                        <TagBadge
                            tag={generation}
                            className="text-11 text-sub-seoultech-red px-8 py-4"
                        />
                        <TagBadge
                            tag={part}
                            className="text-11 px-8 py-4"
                        />
                    </div>
                </div>
            </div>
            {/* 그라데이션 딤드 */}
            <div className="absolute bottom-0 z-2 h-96 w-full bg-gradient-to-t from-black to-transparent" />
        </div>
    )
}
