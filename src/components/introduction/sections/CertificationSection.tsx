'use client'

import CertificationItem from '@/components/ui/introduction/CertificationItem'

export default function CertificationSection() {
    return (
        <div className="w-screen h-screen bg-white flex justify-center">
            <div className="max-w-[960px] w-full flex flex-col items-start gap-78 mt-[17.5vh] mb-[11vh] ml-128">
                {/* 타이틀 */}
                <h2 className="text-64 font-bold text-white bg-sub_seoultech_red w-fit leading-none tracking-[-1.92px] font-pretendard">
                    지원 자격 & 모집 대상
                </h2>

                {/* 리스트 */}
                <ul className="flex flex-col flex-1 w-full gap-[21px]">
                    <li className="flex-1">
                        <CertificationItem text="서울과학기술대학교 모든 학우 " highlight="(재 · 휴학생)" />
                    </li>
                    <li className="flex-1">
                        <CertificationItem text="1년간 성실하게 활동 가능한, 열정 가득한 " highlight="누구나" />
                    </li>
                    <li className="flex-1">
                        <CertificationItem text="개발/창업에 도전하고 싶은 " highlight="누구나" />
                    </li>
                    <li className="flex-1">
                        <CertificationItem text="다양한 협업 경험을 쌓고 싶은 " highlight="누구나" />
                    </li>
                </ul>
            </div>
        </div>
    )
}