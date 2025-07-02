import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PartInfoSection from '../components/applyPart/PartInfoSection';
import { partQuestion, commonQuestions } from '../constants/partQuestion';
import QuestionSection from '../components/applyPart/QuestionSection';
import { useApplyFormStore } from '@/stores/applyForm';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import SharedButton from '@/components/SharedButton';

export default function ApplyPartPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const part = params.get('part') || '기획 PM';
    const navigate = useNavigate();

    const { formData, updateFormData, updateAnswer, updatePortfolioLink } = useApplyFormStore();

    const partData = partQuestion.find((item) => item.name === part);

    // 공통 질문과 파트별 질문을 합쳐서(공통→파트) type 정보도 같이 넘김
    const commonQ = commonQuestions.map(q => ({ text: q.text, type: q.type }));
    const partQ = partData ? partData.questions.map(q => ({ text: q.text, type: q.type })) : [];
    const allQuestions = [...commonQ, ...partQ];
    const maxLength = 500;
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>, scrollRef as React.RefObject<HTMLDivElement>)
    // 질문 개수가 변경되면 answers 배열 크기 조정
    useEffect(() => {
        if (formData.answers.length !== allQuestions.length) {
            const newAnswers = Array(allQuestions.length).fill('');
            // 기존 답변 유지
            formData.answers.forEach((answer, index) => {
                if (index < newAnswers.length) {
                    newAnswers[index] = answer;
                }
            });
            updateFormData({ answers: newAnswers });
        }
    }, [allQuestions.length, formData.answers, updateFormData]);

    // 모든 질문 답변이 채워졌는지 확인
    const isAllQuestionsAnswered = React.useMemo(() => {
        return formData.answers.every(answer => answer.trim() !== '');
    }, [formData.answers]);

    const handleEdit = () => {
        navigate('/apply');
    };

    const handleAnswerChange = (idx: number, value: string) => {
        updateAnswer(idx, value);
    };

    const handleSpellCheck = (idx: number) => {
        alert('맞춤법 검사 기능은 추후 제공됩니다.');
    };

    const handlePortfolioChange = (idx: number, value: string) => {
        updatePortfolioLink(idx, value);
    };

    const handleSave = () => {
        // 저장 로직 구현
        console.log('저장하기 버튼 클릭됨');
    };

    const handleSubmit = () => {
        if (!isAllQuestionsAnswered) return;
        // 제출 로직 구현
        console.log('제출하기 버튼 클릭됨');
    };

    if (!partData) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-pri-white">
                <div className="text-2xl text-red-500 font-bold">존재하지 않는 파트입니다.</div>
            </div>
        );
    }

    return (
        <>
            {/* 버튼 영역 */}
            <div className="fixed top-[17.5vh] right-100 flex justify-end items-center gap-16 z-10">
                <SharedButton className='bg-sub-seoultech-blue rounded-50'>
                    저장하기
                </SharedButton>
                <SharedButton className='bg-sub-seoultech-red rounded-50'>
                    제출하기
                </SharedButton>

            </div>
            <div className="flex flex-row w-fit h-screen items-start" ref={containerRef}>
                {/* 왼쪽 InfoSection */}
                <PartInfoSection part={partData.name} description={partData.description} onEdit={handleEdit} />
                <QuestionSection
                    questions={allQuestions}
                    answers={formData.answers}
                    onChange={handleAnswerChange}
                    maxLength={maxLength}
                    onSpellCheck={handleSpellCheck}
                    portfolioLinks={formData.portfolioLinks}
                    onPortfolioChange={handlePortfolioChange}
                    scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
                />

            </div>
        </>
    );
} 