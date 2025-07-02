import React from 'react';
import { ReverseAnimatedButton } from '../ui/AnimatedButton';
import HighlightenTitle from '../HighlightenTitle';

interface PartInfoSectionProps {
    part: string;
    description: string;
    onEdit: () => void;
}

export default function PartInfoSection({ part, description, onEdit }: PartInfoSectionProps) {
    return (
        <div className='min-w-500  w-fit h-full flex flex-row z-100'>
            <div className="flex flex-col items-start justify-between h-full w-fit text-nowrap bg-[oklch(96.7%_0.002869_84.6)] pl-128 pt-189 pb-128">
                <div className="mb-42">
                    <HighlightenTitle text={part} />
                </div>
                <div className="mb-auto ">
                    <p className="text-32 font-medium text-pri-black whitespace-pre-line w-450">{description}</p>
                </div>
                <ReverseAnimatedButton
                    text="지원자 정보 수정하기"
                    color="#F24E1E"
                    onClick={onEdit}
                />
            </div >
            <div
                className="pointer-events-none h-full w-150 -z-10 bg-gradient-to-l to-[oklch(96.7%_0.002869_84.6)] from-transparent"
            />

        </div>
    );
} 