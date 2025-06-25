import TagBadge from '../archive/TagBadge'

export default function MemberItem({
    name,
    image,
    part,
    generation,
    onClick
}: {
    name: string
    image: string
    part: string
    generation: string
    onClick: () => void
}) {
    return (
        <div
            className="bg-sub-seoultech-blue rounded-15 relative h-286 w-286 overflow-hidden"
            onClick={onClick}>
            <div className="relative z-9 flex h-full w-full flex-col items-center justify-end px-36 py-24">
                <div className="flex flex-col gap-12">
                    <img
                        src={image}
                        alt={name}
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-8 text-center">
                    <p className="text-16 text-pri-white font-semibold">
                        {name}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-8">
                        <TagBadge
                            tag={generation}
                            className="text-sub-seoultech-red px-16 py-8"
                        />
                        <TagBadge
                            tag={part}
                            className="px-16 py-8"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 h-96 w-full bg-gradient-to-t from-black to-transparent" />
        </div>
    )
}
