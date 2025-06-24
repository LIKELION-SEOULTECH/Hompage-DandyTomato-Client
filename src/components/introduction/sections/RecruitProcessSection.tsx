'use client'

import ProcessBubble from "@/components/ui/introduction/ProcessBubble"


export default function RecruitProcessSection() {
    return (
        <div className="w-screen h-screen bg-[#FDF6ED] flex justify-center">
            <div className="max-w-[960px] w-full flex flex-col items-start gap-78 mt-[17.5vh] mb-[11vh] ml-128">
                {/* 타이틀 */}
                <h2 className="text-64 font-bold text-white bg-sub_seoultech_red w-fit leading-none tracking-[-1.92px] font-pretendard">
                    14기 모집 절차
                </h2>

                {/* 타임라인 */}
                <div className="relative w-full h-[180px] top-144">
                    {/* 선 */}
                    <div className="absolute top-[50%] left-0 right-0 h-[4px] bg-sub_seoultech_blue" />

                    {/* 단계들 */}
                    <div className="absolute flex justify-between w-full top-0">
                        {[
                            { title: '서류 모집', date: '2026.00.00. (금) - 2026.00.00. (금)' },
                            { title: '서류 합격 발표', date: '2026.00.00. (금)' },
                            { title: '대면 면접', date: '2026.00.00. (금) - 2026.00.00. (금)' },
                            { title: '최종 합격 발표', date: '2026.00.00. (금)', highlight: true },
                            { title: '서울과기대 멋대 자체 OT', date: '2026.00.00. (금)' },
                        ].map((step, idx) => {
                            const isEven = idx % 2 === 1
                            return (
                                <div
                                    key={idx}
                                    className={`flex ${isEven ? 'flex-col-reverse' : 'flex-col'} items-center w-[180px]`}
                                >
                                    {/* 점 */}
                                    <div className={`w-4 h-4 rounded-full bg-sub_seoultech_blue ${isEven ? 'mt-4' : 'mb-4'}`} />

                                    {/* 말풍선 컴포넌트 */}
                                    <ProcessBubble
                                        title={step.title}
                                        date={step.date}
                                        highlight={step.highlight}
                                        direction={isEven ? 'top' : 'bottom'}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}