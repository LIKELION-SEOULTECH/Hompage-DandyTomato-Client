import React from 'react';
import { ReverseAnimatedButton } from '../ui/AnimatedButton';

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
            <div className="mt-auto">
                <ReverseAnimatedButton
                    text="지원자 정보 수정하기"
                    color="#F24E1E"
                    onClick={onEdit}
                />
            </div>
        </div>
    );
} 