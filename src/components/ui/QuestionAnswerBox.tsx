import React, { useEffect, useRef } from 'react';

interface QuestionAnswerBoxProps {
    question: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength: number;
    onSubmit: () => void;
    countLabel: string;
    type: 'common' | 'part';
}

export default function QuestionAnswerBox({ question, value, onChange, maxLength, onSubmit, countLabel, type }: QuestionAnswerBoxProps) {
    const scrollRef = useRef<HTMLTextAreaElement>(null);
    const [showGradient, setShowGradient] = React.useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // wheel → 가로 스크롤
        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };
        el.addEventListener('wheel', onWheel, { passive: false });

        // scroll → 그라데이션 표시
        const onScroll = () => setShowGradient(el.scrollLeft > 0);
        el.addEventListener('scroll', onScroll);

        // mount 시 초기 상태도 반영
        setShowGradient(el.scrollLeft > 0);

        return () => {
            el.removeEventListener('wheel', onWheel);
            el.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className="w-full max-w-2xl h-full flex flex-col">
            <div className="mb-24 flex items-center gap-3 shrink-0">
                <span
                    className={
                        type === 'common'
                            ? 'border-2 border-sub_seoultech_blue text-sub_seoultech_blue rounded-50 px-14 py-6 text-lg font-bold leading-30 tracking-[-0.6px] text-16'
                            : 'border-2 border-sub_seoultech_red text-sub_seoultech_red rounded-50 px-14 py-6 text-lg font-bold leading-30 tracking-[-0.6px] text-16'
                    }
                >
                    {countLabel}
                </span>
            </div>
            <div className="mb-72 text-[#0A0E11] font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px] min-h-[108px] shrink-0">
                <span>{question}</span>
                <span>(공백 포함 500자 이내)</span>
            </div>
            <div className="bg-gray rounded-15 p-36 flex flex-col flex-1 min-h-0">
                <textarea
                    className="w-full flex-1 min-h-0 bg-transparent resize-none outline-none text-16 text-sub_seoultech_blue placeholder:sub_seoultech_blue leading-24 tracking-[-0.48px]"
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder="답변을 입력해 주세요."
                />
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sub_seoultech_blue font-normal text-16 leading-[24px] tracking-[-0.48px]">{value.length}/{maxLength}</span>
                    <button
                        className="bg-sub_seoultech_red text-white rounded-50 px-16 py-6 font-bold text-11 leading-[16.5px] tracking-[-0.33px]"
                        onClick={() => { }}
                    >
                        맞춤법 검사하기
                    </button>
                </div>
            </div>
        </div>
    );
} 