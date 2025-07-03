import React, { useState } from 'react';
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
    scrollRef: React.RefObject<HTMLDivElement>;
}

export default React.memo(function QuestionSection({
    questions,
    answers,
    onChange,
    maxLength,
    onSpellCheck,
    portfolioLinks,
    onPortfolioChange,
    scrollRef,
}: QuestionSectionProps) {
    return (
        <div className="flex flex-row gap-128 w-fit h-full items-end justify-center pb-128 pr-100" ref={scrollRef}>
            {questions.map((question, idx) => (
                <QuestionAnswerBox
                    key={`${question.type}-${idx}`}
                    question={question.text}
                    value={answers[idx] || ''}
                    onChange={e => onChange(idx, e.target.value)}
                    maxLength={maxLength}
                    onSubmit={() => onSpellCheck(idx)}
                    countLabel={question.type === 'common' ? `공통 질문 ${idx + 1}` : `파트 질문 ${idx + 1 - questions.filter((q, i) => i < idx && q.type === 'common').length}`}
                    type={question.type}
                />
            ))}
            <PortfolioLinksSection
                links={portfolioLinks}
                onChange={onPortfolioChange}
            />
        </div>
    );
}); 