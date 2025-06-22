import img21466Preview1 from '@/assets/stickers/logo.png'
import imgVector3 from '@/assets/stickers/sticker01.png'
import imgBehanceRoundSvgrepoCom from '@/assets/stickers/sticker02.png'
import imgIcons from '@/assets/stickers/sticker03.png'
import FilterButton from '@/components/archive/FilterButton'
import HighlightenTitle from '@/components/HighlightenTitle'

export default function MyPage() {
    return (
        <div
            className="relative h-[1080px] w-[1728px] bg-[#f5f4f2]"
            data-name="Mypage">
            {/* Main Content */}
            <div
                className="absolute top-0 left-0 h-[1080px] w-[1728px] bg-[#f5f4f2]"
                data-name="Main"
                id="node-1341_395">
                {/* Profile Card */}
                <div className="absolute top-[185px] left-32 h-[671px] w-[265px]">
                    {/* Profile Image */}
                    <div className="absolute top-0 left-0 size-[265px] overflow-clip rounded-[15px] bg-white">
                        <div
                            className="absolute top-[-32px] left-[-13px] h-[386px] w-[289.5px] bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${img21466Preview1})`
                            }}
                        />
                    </div>
                    {/* Profile Info */}
                    <div className="absolute top-[371px] left-0 w-[265px]">
                        <div className="relative box-border flex w-[265px] flex-col content-stretch items-start justify-start gap-6 p-0">
                            <div className="relative h-[146px] w-full shrink-0">
                                <div className="relative box-border flex h-[146px] w-full flex-col content-stretch items-start justify-start gap-4 p-0">
                                    <div className="relative w-[212px] shrink-0">
                                        <div className="relative box-border flex w-[212px] flex-col content-stretch items-start justify-start p-0 text-left leading-[0] text-[#0a0e11] not-italic">
                                            <div className="relative w-full shrink-0 text-[24px] font-bold tracking-[-0.72px]">
                                                <p className="block leading-[1.5]">
                                                    정재현 / 도예학과
                                                </p>
                                            </div>
                                            <div className="relative w-full shrink-0 text-[20px] font-medium tracking-[-0.6px]">
                                                <p className="block leading-[1.5]">
                                                    bogus_j@naver.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative min-h-px w-full min-w-px shrink-0 grow basis-0 text-left text-[20px] leading-[0] font-medium tracking-[-0.6px] text-[#0a0e11] not-italic">
                                        <p className="block leading-[1.5]">
                                            기획으로 들어오게 된 정재현이라고
                                            합니다! 잘 부탁드립니다~!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Social Icons */}
                            <div className="relative shrink-0">
                                <div className="relative box-border flex flex-row content-stretch items-start justify-start gap-2.5 p-0">
                                    <div className="relative size-12 shrink-0 overflow-clip">
                                        <img
                                            alt="behance"
                                            className="block size-full max-w-none"
                                            src={imgBehanceRoundSvgrepoCom}
                                        />
                                    </div>
                                    <div className="relative size-12 shrink-0 overflow-clip">
                                        <img
                                            alt="github"
                                            className="block size-full max-w-none"
                                            src={imgIcons}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Profile Buttons */}
                    <div className="absolute top-[625px] left-0 rounded-[50px] bg-[#0b4066]">
                        <div className="relative flex size-full flex-col items-center justify-center overflow-clip">
                            <div className="relative box-border flex flex-col content-stretch items-center justify-center gap-2.5 px-4 py-2">
                                <div className="relative flex shrink-0 flex-col justify-center text-left text-[20px] leading-[0] font-bold tracking-[-0.6px] text-nowrap text-[#f5f4f2] not-italic">
                                    <p className="block leading-[1.5] whitespace-pre">
                                        프로필 수정
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-[50px] border-2 border-solid border-[#0b4066]" />
                    </div>
                    {/* Profile Tags */}
                    <div className="absolute top-[301px] left-0 h-[46px]">
                        <div className="relative box-border flex h-[46px] flex-row content-stretch items-center justify-start gap-2 p-0">
                            <div className="relative shrink-0 rounded-[50px]">
                                <div className="relative flex size-full flex-col items-center justify-center overflow-clip">
                                    <div className="relative box-border flex flex-col content-stretch items-center justify-center gap-2.5 px-4 py-2">
                                        <div className="relative flex shrink-0 flex-col justify-center text-left text-[20px] leading-[0] font-bold tracking-[-0.6px] text-nowrap text-[#e74c2e] not-italic">
                                            <p className="block leading-[1.5] whitespace-pre">
                                                13기
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-[50px] border-2 border-solid border-[#e74c2e]" />
                            </div>
                            <div className="relative shrink-0 rounded-[50px]">
                                <div className="relative flex size-full flex-col items-center justify-center overflow-clip">
                                    <div className="relative box-border flex flex-col content-stretch items-center justify-center gap-2.5 px-4 py-2">
                                        <div className="relative flex shrink-0 flex-col justify-center text-left text-[20px] leading-[0] font-bold tracking-[-0.6px] text-nowrap text-[#e74c2e] not-italic">
                                            <p className="block leading-[1.5] whitespace-pre">
                                                기획
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-[50px] border-2 border-solid border-[#e74c2e]" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Title */}
                <HighlightenTitle
                    text="제출 파일"
                    className="absolute top-[185px] left-[521px]"
                />
                {/* Sort Button */}
                <FilterButton
                    text="정렬"
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
                                <div className="relative flex size-full flex-row items-center overflow-clip">
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
