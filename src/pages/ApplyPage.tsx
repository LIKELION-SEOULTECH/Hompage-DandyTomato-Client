import React from 'react';

const applicant = {
    name: '홍길동',
    studentId: '23101051',
    department: '산업공학과 ITM전공',
    phone: '010-0000-0000',
    email: 'seoultech.likelion@gmail.com',
};

const parts = [
    { label: '기획 PM', filled: true },
    { label: '디자인 DESIGN' },
    { label: '백엔드 BACK-END' },
    { label: '프론트엔드 FRONT-END' },
    { label: '인공지능 AI' },
];

export default function ApplyPage() {
    return (
        <div className="w-full h-screen flex flex-col bg-white">
            {/* 상단 타이틀 */}
            <div className="mt-[17.5vh] mb-[11vh] flex flex-col w-full px-0">
                <h1 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard px-6 py-2 ml-[8vw]">
                    지원하기
                </h1>
                {/* 메인 컨텐츠 */}
                <div className="flex flex-row w-full justify-between mt-[6vh] px-[8vw]">
                    {/* 좌측 지원자 정보 */}
                    <div className="flex flex-col gap-12 w-[50%] max-w-[700px]">
                        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
                            <div>
                                <div className="text-[20px] font-bold mb-2">이름</div>
                                <div className="bg-[#E9EDF3] rounded-[10px] px-6 py-3 text-[18px] font-semibold text-[#032B49]">{applicant.name}</div>
                            </div>
                            <div>
                                <div className="text-[20px] font-bold mb-2">전화번호</div>
                                <div className="bg-[#E9EDF3] rounded-[10px] px-6 py-3 text-[18px] font-semibold text-[#032B49]">{applicant.phone}</div>
                            </div>
                            <div>
                                <div className="text-[20px] font-bold mb-2">학번</div>
                                <div className="bg-[#E9EDF3] rounded-[10px] px-6 py-3 text-[18px] font-semibold text-[#032B49]">{applicant.studentId}</div>
                            </div>
                            <div>
                                <div className="text-[20px] font-bold mb-2">이메일</div>
                                <div className="bg-[#E9EDF3] rounded-[10px] px-6 py-3 text-[18px] font-semibold text-[#032B49]">{applicant.email}</div>
                            </div>
                            <div>
                                <div className="text-[20px] font-bold mb-2">학과</div>
                                <div className="bg-[#E9EDF3] rounded-[10px] px-6 py-3 text-[18px] font-semibold text-[#032B49]">{applicant.department}</div>
                            </div>
                        </div>
                    </div>
                    {/* 우측 지원 파트 */}
                    <div className="flex flex-col items-start min-w-[260px] ml-[4vw]">
                        <div className="text-[20px] font-bold mb-6">지원 파트</div>
                        <div className="flex flex-col gap-4">
                            {parts.map((part, idx) => (
                                <button
                                    key={part.label}
                                    className={
                                        part.filled
                                            ? 'bg-sub_seoultech_red text-white font-bold rounded-full px-6 py-2 text-[18px]'
                                            : 'border-2 border-sub_seoultech_red text-sub_seoultech_red font-bold rounded-full px-6 py-2 text-[18px] bg-white'
                                    }
                                >
                                    {part.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* 우측 하단 버튼 */}
            <div className="flex w-full justify-end items-end pr-[8vw] pb-[5vh] mt-auto">
                <button className="flex items-center gap-2 text-sub_seoultech_red font-bold text-[20px]">
                    파트별 지원서 작성하기
                    <span className="inline-flex items-center justify-center rounded-full bg-sub_seoultech_red w-8 h-8 text-white text-xl ml-1">→</span>
                </button>
            </div>
        </div>
    );
} 