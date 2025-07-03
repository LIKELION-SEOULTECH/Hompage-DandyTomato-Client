import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PartInfoSection from '../components/applyPart/PartInfoSection';
import { partQuestion } from '../constants/partQuestion';
import QuestionSection from '../components/applyPart/QuestionSection';
import { useApplyFormStore } from '@/stores/applyForm';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import SharedButton from '@/components/SharedButton';
import { useSaveApplication, useSubmitApplication } from '@/query/recruit';

export default function ApplyPartPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const part = params.get('part') || '기획 PM';
    const navigate = useNavigate();

    const { formData, updateFormData, updateAnswer, updatePortfolioLink } = useApplyFormStore();

    // 파트 이름 매핑
    const partNameMap: { [key: string]: string } = {
        '기획 PM': '기획 PM',
        'AI': '인공지능 AI',
        '백엔드': '백엔드 BACK-END',
        '프론트엔드': '프론트엔드 FRONT-END',
        '디자인': '디자인 DESIGN'
    };

    const mappedPartName = partNameMap[part] || part;
    const partData = partQuestion.find((item) => item.name === mappedPartName);

    // 파트 이름을 API 형식으로 변환
    const getPartForAPI = (partName: string) => {
        const partMap: { [key: string]: string } = {
            '기획 PM': 'PLAN',
            '인공지능 AI': 'AI',
            '백엔드 BACK-END': 'BACKEND',
            '프론트엔드 FRONT-END': 'FRONTEND',
            '디자인 DESIGN': 'DESIGN'
        };
        const apiPart = partMap[partName];

        // 유효한 파트인지 확인
        const validParts = ['AI', 'BACKEND', 'FRONTEND', 'DESIGN', 'PLAN'];
        if (!apiPart || !validParts.includes(apiPart)) {
            console.warn(`Invalid part: ${partName}, using PLAN as default`);
            return 'PLAN';
        }

        return apiPart;
    };

    const apiPart = getPartForAPI(part);

    // constants에서 질문 가져오기
    const allQuestions = partData?.questions || [];

    // API 훅 추가
    const saveApplicationMutation = useSaveApplication();
    const submitApplicationMutation = useSubmitApplication();

    const maxLength = 500;
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>, scrollRef as React.RefObject<HTMLDivElement>)

    // 질문 개수가 변경되면 answers 배열 크기 조정
    useEffect(() => {
        if (allQuestions.length > 0 && formData.answers.length !== allQuestions.length) {
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
    const isAllQuestionsAnswered = formData.answers.every(answer => answer.trim() !== '');

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

    const handleSave = async () => {
        try {
            // 질문-답변 데이터 준비
            const partQuestions = allQuestions.map((question, index) => ({
                question_id: `part-${index + 1}`,
                answer: formData.answers[index] || ''
            }));

            const saveData = {
                name: formData.name || '',
                phone: formData.phone || '',
                student_id: formData.studentId || '',
                major: formData.department || '',
                part: apiPart as 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN',
                portfolioUrl: formData.portfolioLinks.join(',') || '',
                common_questions: [], // 공통 질문은 현재 없음
                part_questions: partQuestions
            };

            await saveApplicationMutation.mutateAsync(saveData);
            alert('지원서가 저장되었습니다.');
        } catch (error) {
            console.error('저장 실패:', error);
            alert('저장에 실패했습니다.');
        }
    };

    const handleSubmit = async () => {
        if (!isAllQuestionsAnswered) {
            alert('모든 질문에 답변해주세요.');
            return;
        }

        try {
            // 질문-답변 데이터 준비
            const partQuestions = allQuestions.map((question, index) => ({
                question_id: `part-${index + 1}`,
                answer: formData.answers[index] || ''
            }));

            const submitData = {
                name: formData.name || '',
                phone: formData.phone || '',
                student_id: formData.studentId || '',
                email: formData.email || '',
                major: formData.department || '',
                part: apiPart as 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN',
                portfolioUrl: formData.portfolioLinks.join(',') || '',
                common_questions: [], // 공통 질문은 현재 없음
                part_questions: partQuestions
            };

            await submitApplicationMutation.mutateAsync(submitData);
            alert('지원서가 제출되었습니다.');
            navigate('/recruit'); // 제출 후 /recruit 페이지로 이동
        } catch (error) {
            console.error('제출 실패:', error);
            alert('제출에 실패했습니다.');
        }
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
                <SharedButton
                    className='bg-sub-seoultech-blue rounded-50'
                    onClick={handleSave}
                    disabled={saveApplicationMutation.isPending}
                >
                    {saveApplicationMutation.isPending ? '저장 중...' : '저장하기'}
                </SharedButton>
                <SharedButton
                    className='bg-sub-seoultech-red rounded-50'
                    onClick={handleSubmit}
                    disabled={submitApplicationMutation.isPending || !isAllQuestionsAnswered}
                >
                    {submitApplicationMutation.isPending ? '제출 중...' : '제출하기'}
                </SharedButton>
            </div>
            <div className="flex flex-row w-fit h-screen items-start" ref={containerRef}>
                {/* 왼쪽 InfoSection */}
                <PartInfoSection part={partData.name} description={partData.description} onEdit={handleEdit} />
                <QuestionSection
                    questions={allQuestions}
                    answers={formData.answers || []}
                    onChange={handleAnswerChange}
                    maxLength={maxLength}
                    onSpellCheck={handleSpellCheck}
                    portfolioLinks={formData.portfolioLinks || []}
                    onPortfolioChange={handlePortfolioChange}
                    scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
                />
            </div>
        </>
    );
} 