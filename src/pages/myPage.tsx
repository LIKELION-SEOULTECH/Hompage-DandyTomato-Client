import FilterButton from '@/components/archive/FilterButton'
import TagBadge from '@/components/archive/TagBadge'
import HighlightenTitle from '@/components/HighlightenTitle'
import LinkIcon from '@/components/LinkIcon'

export default function MyPage() {
    const { image, name, major, email, description, links, generation, part } =
        {
            image: '/src/assets/testpng.png',
            name: '김철수',
            major: '도예학과',
            email: 'bogus_j@naver.com',
            description:
                '기획으로 들어오게 된 정재현이라고 합니다! 잘 부탁드립니다~!',
            links: [
                'https://www.behance.net/bogus_j',
                'https://github.com/bogus-j'
            ],
            generation: '13기',
            part: '기획'
        }
    return (
        <div className="relative flex h-[100vh] flex-row pt-185 pr-100 pl-128">
            <ProfileCard
                image={image}
                name={name}
                major={major}
                email={email}
                description={description}
                links={links}
                generation={generation}
                part={part}
            />
            {/* Main Content */}
            <div className="">
                {/* Main Title */}
                <HighlightenTitle
                    text="제출한 과제"
                    className="absolute top-[185px] left-[521px]"
                />
                {/* Sort Button */}
                <FilterButton
                    text="최신순"
                    options={[
                        { label: '최신순', value: '최신순' },
                        { label: '오래된순', value: '오래된순' }
                    ]}
                    className="absolute top-[185px] right-[100px]"
                />
                {/* Assignment List */}
                <div
                    className="absolute left-[521px] w-[1107px]"
                    style={{ top: 'calc(25% + 73px)' }}>
                    <div className="relative box-border flex w-[1107px] flex-col content-stretch items-start justify-start gap-6 p-0">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className="relative w-full shrink-0 rounded-[15px] bg-[#e4e5e9]">
                                <div className="relative flex size-full flex-row items-center">
                                    <div className="relative box-border flex w-full flex-row content-stretch items-center justify-between p-[36px] leading-[0] text-nowrap not-italic">
                                        <div className="relative shrink-0 text-center text-[24px] font-bold tracking-[-0.72px] text-[#0a0e11]">
                                            <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                                                과제 제목
                                            </p>
                                        </div>
                                        <div className="relative shrink-0 text-left text-[20px] font-medium tracking-[-0.6px] text-[#0b4066]">
                                            <p className="adjustLetterSpacing block leading-[1.5] text-nowrap whitespace-pre">
                                                2025.06.18
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileCard = ({
    image,
    name,
    major,
    email,
    description,
    links,
    generation,
    part
}: {
    image: string
    name: string
    major: string
    email: string
    description: string
    links: string[]
    generation: string
    part: string
}) => {
    return (
        <div className="bg-pri-white relative z-10 flex w-[265px] flex-col items-start justify-start gap-36">
            <img
                src={image}
                alt={name}
                className="rounded-15 h-265 w-265 object-cover"
            />
            {/* Profile Info */}
            <div className="flex w-265 flex-col gap-25 text-left">
                <div className="flex flex-row items-center justify-start gap-16">
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
                            {email}
                        </span>
                    </p>

                    <p className="text-16 text-pri-black font-medium">
                        {description}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-start gap-16">
                    {links.map(link => (
                        <LinkIcon
                            key={link}
                            link={link}
                        />
                    ))}
                </div>
            </div>
            {/* Profile Buttons */}
            <div className="rounded-50 bg-sub-seoultech-blue px-16 py-8">
                <p className="text-20 text-pri-white font-bold">프로필 수정</p>
            </div>
        </div>
    )
}
