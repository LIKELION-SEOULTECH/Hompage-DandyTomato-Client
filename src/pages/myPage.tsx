import FilterButton from '@/components/archive/FilterButton'
import TagBadge from '@/components/archive/TagBadge'
import HighlightenTitle from '@/components/HighlightenTitle'
import LinkIcon from '@/components/LinkIcon'
import SessionResourceList from '@/components/session/SessionResourceList'

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
        <div className="relative flex h-[100vh] flex-row gap-128 pt-185 pr-100 pl-128">
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
            <div className="flex h-full w-full flex-col gap-82">
                <div className="flex flex-row items-center justify-between">
                    {/* Main Title */}
                    <HighlightenTitle text="제출한 과제" />
                    {/* Sort Button */}
                    <FilterButton
                        text="최신순"
                        options={[
                            { label: '최신순', value: '최신순' },
                            { label: '오래된순', value: '오래된순' }
                        ]}
                    />
                </div>

                {/* Assignment List */}

                <SessionResourceList
                    items={[
                        {
                            week: 1,
                            title: '과제 제목',
                            assignmentState: '과제 할당됨'
                        },

                        {
                            week: 1,
                            title: '과제 제목',
                            assignmentState: '과제 할당됨'
                        }
                    ]}
                />
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
