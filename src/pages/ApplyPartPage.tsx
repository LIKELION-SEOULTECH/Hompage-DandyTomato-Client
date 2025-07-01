import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PartInfoSection from '../components/applyPart/PartInfoSection';
import { partQuestion, commonQuestions } from '../constants/partQuestion';
import QuestionSection from '../components/applyPart/QuestionSection';
import { useApplyFormStore } from '@/stores/applyForm';

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

    if (!partData) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="text-2xl text-red-500 font-bold">존재하지 않는 파트입니다.</div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex bg-white">
            {/* 왼쪽 InfoSection */}
            <div className="max-w-[600px] min-w-[600px] h-full flex">
                <div className="w-full mt-[17.5vh] mb-[11vh] ml-[8vw]">
                    <PartInfoSection part={partData.name} description={partData.description} onEdit={handleEdit} />
                </div>
            </div>
            <div className="w-[180px] flex-shrink-0" />
            {/* 오른쪽 영역 */}
            <div className="flex-1 h-full flex flex-col">
                {/* 버튼 영역: InfoSection과 같은 y축에서 시작, 오른쪽 정렬 */}
                <div className="flex justify-end items-center mt-[17.5vh] mb-8 gap-16 pr-316 pb-72">
                    <button className="bg-sub_seoultech_blue text-white font-bold rounded-full px-16 py-8 text-20 leading-[30px] tracking-[-0.6px]">저장하기</button>
                    <button className="bg-sub_seoultech_red text-white font-bold rounded-full px-16 py-8 text-20 leading-[30px] tracking-[-0.6px]">제출하기</button>
                </div>
                {/* 질문 카드(가로 스크롤) 영역 */}
                <div className="flex-1 flex items-center">
                    <div className="w-full mr-[8vw]">
                        <QuestionSection
                            questions={allQuestions}
                            answers={formData.answers}
                            onChange={handleAnswerChange}
                            maxLength={maxLength}
                            onSpellCheck={handleSpellCheck}
                            portfolioLinks={formData.portfolioLinks}
                            onPortfolioChange={handlePortfolioChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 