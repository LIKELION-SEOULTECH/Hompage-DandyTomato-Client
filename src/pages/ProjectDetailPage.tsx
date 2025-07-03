import TagBadge from '@/components/archive/TagBadge'
import HighlightenTitle from '@/components/HighlightenTitle'

interface ProjectDetailPageProps {
    title?: string
    description?: string
    tag?: string[]
    teamName?: string
    parts?: string[]
    members?: string[]
}

export default function ProjectDetailPage({
    title = 'VOICE LABEL\n시각장애인을 위한 친절한 \n제품 분류 음성 제공 서비스',
    description = '시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스시각장애인을 위한 친절한 제품 분류 음성 제공 서비스',
    tag = ['#VOICE', '#LABEL'],
    teamName = '사자육남매',
    parts = ['BE', 'FE', 'PM', 'DESIGN'],
    members = ['김리사', '노경인', '박진홍', '이주승']
}: ProjectDetailPageProps = {}) {
    return (
        <div>
            <div className="flex flex-col justify-between">
                {/* TODO 배경 이미지 캐러셀 */}
            </div>
            <div className="absolute top-185 right-100">
                {/* 제목 */}
                <div className="flex w-fit flex-col gap-8">
                    {title.split('\n').map((word, index) => (
                        <HighlightenTitle
                            className="text-32"
                            key={index}
                            text={word}
                        />
                    ))}
                </div>
                {/* 태그 */}
                <div className="mt-28 flex flex-wrap gap-10">
                    {tag.map(tag => (
                        <TagBadge
                            key={tag}
                            tag={tag}
                            withHash={false}
                            className="text-20 text-sub-seoultech-red px-16 py-8"
                        />
                    ))}
                </div>

                <div className="mt-36 flex flex-col gap-36">
                    {/* 팀명 */}
                    <div className="flex flex-col gap-16">
                        <h3 className="text-24 text-pri-black font-bold">
                            TEAM
                        </h3>
                        <p className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-fit px-16 py-16 font-medium">
                            {teamName}
                        </p>
                    </div>
                    {/* 멤버 */}
                    <div className="flex flex-col gap-16">
                        <h3 className="text-24 text-pri-black font-bold">
                            TEAM MEMBER
                        </h3>
                        <div className="flex flex-row flex-wrap gap-16">
                            {parts.map((part, idx) => {
                                return (
                                    <p className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-fit px-16 py-16 font-medium">
                                        <span className="text-sub-seoultech-red mr-8">
                                            {part}
                                        </span>
                                        {members[idx]}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    {/* 프로젝트 설명 */}
                    <div className="flex flex-col gap-16">
                        <h3 className="text-24 text-pri-black font-bold">
                            PROJECT OVERVIEW
                        </h3>
                        <p className="text-sub-seoultech-blue bg-pri-gray-1 text-16 rounded-15 w-600 px-16 py-16 font-medium">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
