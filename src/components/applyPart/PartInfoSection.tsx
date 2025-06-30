import React from 'react';

interface PartInfoSectionProps {
    part: string;
    description: string;
    onEdit: () => void;
}

export default function PartInfoSection({ part, description, onEdit }: PartInfoSectionProps) {
    return (
        <div className="flex flex-col items-start justify-start w-full h-full p-8 bg-white">
            <div className="mb-42">
                <span className="text-[64px] font-bold text-white bg-sub_seoultech_red w-fit leading-76 tracking-[-1.92px] font-pretendard px-6 py-2">{part}</span>
            </div>
            <div className="mb-auto">
                <p className="text-32 font-normal leading-48 tracking-[-0.96px] text-black whitespace-pre-line">{description}</p>
            </div>
            <button
                className="flex items-center gap-2 mt-16 text-[#F24E1E] text-2xl font-bold"
                onClick={onEdit}
            >
                <span className="inline-block w-10 h-10 rounded-full bg-[#F24E1E] flex items-center justify-center">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                지원자 정보 수정하기
            </button>
        </div>
    );
} 