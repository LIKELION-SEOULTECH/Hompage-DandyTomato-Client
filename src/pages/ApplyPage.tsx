import React from 'react';
import { cn } from '@/lib/utils';
import ApplyInput from '@/components/Apply/ApplyInput';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useApplyFormStore } from '@/stores/applyForm';

const parts = [
    '기획 PM',
    '디자인 DESIGN',
    '백엔드 BACK-END',
    '프론트엔드 FRONT-END',
    '인공지능 AI',
];

export default function ApplyPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const initialPart = params.get('part') || parts[0];
    const navigate = useNavigate();

    const { formData, updateFormData } = useApplyFormStore();

    // URL 파라미터가 있으면 selectedPart 업데이트
    React.useEffect(() => {
        if (initialPart && initialPart !== formData.selectedPart) {
            updateFormData({ selectedPart: initialPart });
        }
    }, [initialPart, formData.selectedPart, updateFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handlePartChange = (part: string) => {
        updateFormData({ selectedPart: part });
    };

    return (
        <div className="w-full h-screen flex flex-col bg-white">
            {/* 상단 타이틀 */}
            <div className="mt-[17.5vh] mb-[11vh] flex flex-col w-full px-0">
                <h1 className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard px-6 py-2 ml-[8vw]">
                    지원하기
                </h1>
                {/* 메인 컨텐츠 */}
                <div className="flex flex-row gap-[128px] w-full mt-[6vh] px-[8vw]">
                    {/* 좌측 지원자 정보 */}
                    <div className="flex flex-col gap-12">
                        <div className="grid grid-cols-[256px_438px] gap-x-64 gap-y-36">
                            <ApplyInput
                                label="이름"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="홍길동"
                            />
                            <ApplyInput
                                label="전화번호"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="010-0000-0000"
                            />
                            <ApplyInput
                                label="학번"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="23101051"
                            />
                            <ApplyInput
                                label="이메일"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seoultech.likelion@gmail.com"
                                type="email"
                            />
                            <ApplyInput
                                label="학과"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="산업공학과 ITM전공"
                            />
                        </div>
                    </div>
                    {/* 우측 지원 파트 */}
                    <div className="flex flex-col items-start min-w-[260px]">
                        <div className="text-[24px] font-bold mb-16 leading-36 tracking-[-0.72px]">지원 파트</div>
                        <div className="flex flex-col gap-[20px]">
                            {parts.map((part) => (
                                <button
                                    key={part}
                                    onClick={() => handlePartChange(part)}
                                    className={cn(
                                        'flex flex-col justify-center items-center px-12 py-[6px] rounded-50 border-2 text-sm font-semibold whitespace-nowrap font-pretendard self-start',
                                        formData.selectedPart === part
                                            ? 'bg-sub_seoultech_red text-white border-sub_seoultech_red'
                                            : 'text-sub_seoultech_red border-sub_seoultech_red bg-white'
                                    )}
                                >
                                    {part}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* 우측 하단 버튼 */}
            <div className="flex w-full justify-end items-end pr-[8vw] mt-auto mb-[11vh]">
                <AnimatedButton
                    text="파트별 지원서 작성하기"
                    color="#E74C2E"
                    onClick={() => {
                        console.log('버튼 클릭됨');
                        console.log('선택된 파트:', formData.selectedPart);
                        const url = `/apply/part?part=${encodeURIComponent(formData.selectedPart)}`;
                        console.log('이동할 URL:', url);
                        navigate(url);
                    }}
                />
            </div>
        </div>
    );
} 