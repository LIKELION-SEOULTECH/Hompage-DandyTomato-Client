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

    // value가 undefined일 수 있으므로 안전하게 처리
    const safeValue = value || '';

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
        <div className="min-w-690 h-645 flex flex-col justify-between">
            <div className="flex flex-col justify-between gap-24">
                <div className=" flex items-center gap-3">
                    <span
                        className={
                            type === 'common'
                                ? 'border-2 border-sub-seoultech-blue text-sub-seoultech-blue rounded-50 px-14 py-6 text-lg font-bold leading-30 tracking-[-0.6px] text-20'
                                : 'border-2 border-sub-seoultech-red text-sub-seoultech-red rounded-50 px-14 py-6 text-lg font-bold leading-30 tracking-[-0.6px] text-20'
                        }
                    >
                        {countLabel}
                    </span>
                </div>
                <div className="text-pri-black font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px]">
                    <span>{question}</span>
                    <span>(공백 포함 500자 이내)</span>
                </div>
            </div>

            <div className="bg-pri-gray-1 rounded-15 p-36 flex flex-col  min-h-0 h-430">
                <textarea
                    className="w-full h-430 min-h-0 bg-transparent resize-none outline-none text-16 text-sub-seoultech-blue placeholder:sub-seoultech-blue leading-24 tracking-[-0.48px]"
                    value={safeValue}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder="답변을 입력해 주세요."
                />
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sub-seoultech-blue font-normal text-16 leading-[24px] tracking-[-0.48px]">{safeValue.length}/{maxLength}</span>
                    <button
                        className="bg-sub-seoultech-red text-white rounded-50 px-16 py-6 font-bold text-11 leading-[16.5px] tracking-[-0.33px]"
                        onClick={() => { }}
                    >
                        맞춤법 검사하기
                    </button>
                </div>
            </div>
        </div>
    );
} 