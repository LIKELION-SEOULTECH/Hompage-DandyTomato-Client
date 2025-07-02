import React, { useRef, useEffect, useState } from 'react';
import QuestionAnswerBox from '../ui/QuestionAnswerBox';
import PortfolioLinksSection from './PortfolioLinksSection';

interface Question {
    text: string;
    type: 'common' | 'part';
}

interface QuestionSectionProps {
    questions: Question[];
    answers: string[];
    onChange: (idx: number, value: string) => void;
    maxLength: number;
    onSpellCheck: (idx: number) => void;
    portfolioLinks: string[];
    onPortfolioChange: (idx: number, value: string) => void;
}

export default function QuestionSection({
    questions,
    answers,
    onChange,
    maxLength,
    onSpellCheck,
    portfolioLinks,
    onPortfolioChange,
}: QuestionSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        // wheel → 가로 스크롤 (세로 스크롤만 변환, 가로 제스처는 무시)
        const onWheel = (e: WheelEvent) => {
            // 세로 스크롤만 가로로 변환
            if (e.deltaY !== 0) {
                const { scrollLeft, scrollWidth, clientWidth } = el;

                // 왼쪽 끝에서 왼쪽으로 스크롤 시도 시 막기
                if (e.deltaY < 0 && scrollLeft === 0) {
                    e.preventDefault();
                    return;
                }
                // 오른쪽 끝에서 오른쪽으로 스크롤 시도 시 막기
                if (e.deltaY > 0 && scrollLeft + clientWidth >= scrollWidth) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }

            // 트랙패드 가로 제스처는 완전히 무시
            if (e.deltaX !== 0) {
                e.preventDefault();
            }
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
        <div className="relative w-full h-full min-w-0 flex-1 flex flex-col mb-[11vh]">
            {/* 가로 스크롤 영역 */}
            <div
                ref={scrollRef}
                className="flex flex-row gap-8 overflow-x-auto scrollbar-hide w-full h-full min-w-0 pl-2 pr-8"
                style={{ width: `1000px` }}
            >
                {questions.map((question, idx) => (
                    <div key={idx} className="min-w-[520px] max-w-2xl flex-shrink-0 h-auto mr-128">
                        <QuestionAnswerBox
                            question={question.text}
                            value={answers[idx]}
                            onChange={e => onChange(idx, e.target.value)}
                            maxLength={maxLength}
                            onSubmit={() => onSpellCheck(idx)}
                            countLabel={question.type === 'common' ? `공통 질문 ${idx + 1}` : `파트 질문 ${idx + 1 - questions.filter((q, i) => i < idx && q.type === 'common').length}`}
                            type={question.type}
                        />
                    </div>
                ))}
                <div className="min-w-[520px] max-w-2xl flex-shrink-0 h-full mr-128">
                    <PortfolioLinksSection
                        links={portfolioLinks}
                        onChange={onPortfolioChange}
                    />
                </div>
            </div>
            {showGradient && (
                <div
                    className="pointer-events-none absolute left-0 top-0 h-full w-90 z-10 bg-gradient-to-r from-white to-transparent"
                />
            )}
        </div>
    );
} 