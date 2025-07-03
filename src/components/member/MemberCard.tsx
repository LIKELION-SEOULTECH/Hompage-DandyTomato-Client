import { RefObject } from 'react'
import TagBadge from '../archive/TagBadge'
import LinkIcon from '../LinkIcon'

export default function MemberCard({
    isOpen,
    handleClose,
    name,
    major,
    image,
    part,
    generation,
    email,
    description,
    links,
    ref,
    dimmedRef
}: {
    isOpen: boolean
    handleClose: () => void
    name: string
    major: string
    image?: string
    part: string
    generation: string
    email?: string
    description?: string
    links?: string[]
    ref: RefObject<HTMLDivElement>
    dimmedRef: RefObject<HTMLDivElement>
}) {
    return (
        <div
            className={`fixed z-100 flex h-screen w-screen flex-col items-center justify-center transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}>
            {/* 카드 */}
            <div
                ref={ref}
                className="rounded-15 bg-pri-white relative z-10 px-128 py-64"
                style={{
                    transformStyle: 'preserve-3d'
                }}>
                <div
                    className="bg-pri-white relative z-10 flex w-fit flex-col items-center justify-center gap-36"
                    style={{
                        transform: 'rotateY(0deg)',
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d'
                    }}>
                    <img
                        src={
                            image || '/src/assets/images/MemberCardDefault.png'
                        }
                        alt={name}
                        className="rounded-15 h-265 w-265 object-cover"
                    />
                    <div className="flex w-265 flex-col gap-25 text-center">
                        <div className="flex flex-row items-center justify-center gap-16">
                            <TagBadge
                                tag={generation}
                                withHash={false}
                                className="text-20 text-sub-seoultech-red px-16 py-8"
                            />
                            <TagBadge
                                tag={part}
                                withHash={false}
                                className="text-20 px-16 py-8"
                            />
                        </div>
                        <div className="flex flex-col gap-16">
                            <p>
                                <span className="text-24 text-pri-black font-bold">
                                    {name}/{major}
                                </span>
                                <span className="text-20 text-pri-black font-medium">
                                    {email || ''}
                                </span>
                            </p>

                            <p className="text-16 text-pri-black font-medium">
                                {description || ''}
                            </p>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-16">
                            {links?.map(link => (
                                <LinkIcon
                                    key={link}
                                    link={link}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 카드 뒷면 */}
                <div
                    className="bg-sub-seoultech-blue rounded-15 absolute top-0 left-0 z-9 flex h-full w-full flex-col items-center justify-center gap-36 overflow-hidden px-128 py-64"
                    style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d'
                    }}>
                    {/* 이미지 */}
                    <div className="absolute top-0 left-0 z-1 h-full w-full">
                        <img
                            src={
                                image ||
                                '/src/assets/images/MemberCardDefault.png'
                            }
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    </div>
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
            </div>
            {/* 딤드 배경 */}
            <div
                ref={dimmedRef}
                className="bg-pri-black/15 absolute bottom-0 h-screen w-screen"
                onClick={handleClose}
            />
        </div>
    )
}
