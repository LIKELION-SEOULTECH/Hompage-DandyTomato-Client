'use client'

import HighlightenTitle from "@/components/HighlightenTitle"
import AnimatedButton from "@/components/ui/AnimatedButton"
import IntroBanner from '@/assets/introduction/introduction_banner.png'
export default function IntroSection({ handleGoToEnd }: { handleGoToEnd: () => void }) {
    return (
        <div className="relative w-screen h-screen flex items-center justify-center">
            <div className="absolute right-100 top-[19vh] z-50">
                <AnimatedButton text="바로 지원하기" color="#F14B2D" onClick={handleGoToEnd} />
            </div>
            <div className="flex w-full h-full items-center justify-between">
                {/* 왼쪽: 배너 이미지 */}
                <div className="w-4/9 h-full flex items-center justify-center overflow-hidden">
                    <img
                        src={IntroBanner}
                        alt="배너"
                        className="h-full w-auto block"
                    />
                </div>

                {/* 오른쪽: 콘텐츠 */}
                <div className="w-5/9 h-full pb-[11vh] flex flex-col gap-6">
                    <div className="flex flex-col gap-16  mt-[17.5vh]">
                        <HighlightenTitle text="14기 아기사자" />
                        <HighlightenTitle text="리크루팅 진행중" />
                    </div>

                    {/* 일정 */}
                    <p className="text-32 font-bold text-black  pt-[3.8%]">
                        2026.00.00. - 2026.00.00.
                    </p>

                    {/* 설명 */}
                    <div className="text-20 text-pri-black font-medium   mt-auto">
                        <p>
                            멋쟁이사자처럼 대학은 국내 최대 규모의 IT 창업 동아리로, “내 아이디어를 내 손으로 실현하자!”는<br />
                            모토로 비전공자/전공자 구분 없이 자신이 원하는 IT 서비스를 구현할 수 있도록 각종 행사와 스터디,<br />
                            네트워킹을 지원합니다.<br /><br />
                            이러한 이념 아래에서 열정적으로 이번 14기를 함께 할 아기사자들을 모집합니다!<br />
                            아기사자들은 각기 기획, 디자인, 백엔드, 프론트엔드, AI 총 5가지 파트로 나뉘어 활동하게 됩니다.
                        </p>
                    </div>


                </div>
            </div>
        </div>
    )
}