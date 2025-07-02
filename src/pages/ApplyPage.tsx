import React from 'react';
import { cn } from '@/lib/utils';
import ApplyInput from '@/components/Apply/ApplyInput';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useApplyFormStore } from '@/stores/applyForm';
import { ToggleGroupButton } from '@/components/archive/ToggleGroupButton';

const parts = [
    '기획 PM',
    '디자인 DESIGN',
    '백엔드 BACK-END',
    '프론트엔드 FRONT-END',
    '인공지능 AI',
];

export default function ApplyPage() {
    const navigate = useNavigate();

    const { formData, updateFormData } = useApplyFormStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handlePartChange = (part: string) => {
        updateFormData({ selectedPart: part });
    };

    // 모든 필수 입력 필드가 채워졌는지 확인
    const isFormComplete = React.useMemo(() => {
        return (
            formData.name.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.studentId.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.department.trim() !== '' &&
            formData.selectedPart !== ''
        );
    }, [formData]);

    const handleButtonClick = () => {
        if (!isFormComplete) return;

        console.log('버튼 클릭됨');
        console.log('선택된 파트:', formData.selectedPart);
        const url = `/apply/part?part=${encodeURIComponent(formData.selectedPart)}`;
        console.log('이동할 URL:', url);
        navigate(url);
    };

    return (
        <div className="w-full h-screen flex flex-col bg-pri-white">
            {/* 상단 타이틀 */}
            <div className="mt-[17.5vh] mb-[11vh] flex flex-col w-full px-0">
                <h1 className="text-[64px] font-bold text-pri-white bg-sub-seoultech-red w-fit leading-76 tracking-[-1.92px] font-pretendard px-6 py-2 ml-[8vw]">
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
                        <div className="text-[24px] font-bold mb-16 leading-36 tracking-[-0.72px] text-pri-black">지원 파트</div>
                        <ToggleGroupButton options={parts.map(part => ({ label: part, value: part }))} value={formData.selectedPart} onValueChange={handlePartChange} />
                    </div>
                </div>
            </div>
            {/* 우측 하단 버튼 */}
            <div className="flex w-full justify-end items-end pr-[8vw] mt-auto mb-[11vh]">
                {isFormComplete ? (
                    <AnimatedButton
                        text="파트별 지원서 작성하기"
                        color="#E74C2E"
                        onClick={handleButtonClick}
                    />
                ) : (
                    <div className="relative flex items-center font-bold text-[24px] leading-[36px] tracking-[-0.72px] px-0 py-0 bg-transparent border-none outline-none cursor-not-allowed">
                        <span
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 9999,
                                background: '#c8c8c8',
                                marginRight: 16,
                            }}
                        />
                        <span className="flex items-center relative z-16" style={{ padding: '0 16px 0 0' }}>
                            <span
                                style={{
                                    color: '#c8c8c8',
                                    marginRight: 12,
                                }}
                            >
                                파트별 지원서 작성하기
                            </span>
                            <span className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                    <path d="M10.6465 20.8535L8.66895 18.876L15.708 11.8359H0.396484V9.03906H15.583L8.66895 2.12402L10.6465 0.146484L21 10.5L10.6465 20.8535Z" fill="#F5F4F2" />
                                </svg>
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
} 