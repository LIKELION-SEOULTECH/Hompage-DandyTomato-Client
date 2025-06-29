import HighlightenTitle from '@/components/HighlightenTitle'
import TagBadge from '@/components/archive/TagBadge'
import SharedButton from '@/components/SharedButton'
import QuizItem from '@/components/session/QuizItem'
import { RefObject, useRef } from 'react'
import useHorizontalScroll from '@/hooks/useHorizontalScroll'

export default function SessionAIQuizPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    useHorizontalScroll(containerRef as RefObject<HTMLDivElement>)
    return (
        <>
            <SharedButton className="rounded-50 text-pri-white bg-sub-seoultech-red fixed top-185 right-128 h-auto w-fit px-16 py-8">
                제출하기
            </SharedButton>
            <div
                className="flex h-screen w-screen flex-row items-end justify-baseline gap-175 px-128 pt-185 pb-128"
                ref={containerRef}>
                <div className="flex h-full w-auto flex-col gap-360">
                    <HighlightenTitle
                        text="AI QUIZ"
                        className="text-nowrap"
                    />
                    <div className="flex flex-col gap-52">
                        <p className="text-24 text-pri-black font-bold">
                            퀴즈 범위
                        </p>
                        <div>
                            <TagBadge
                                tag="AI QUIZ"
                                withHash={false}
                                className="bg-sub-seoultech-blue text-pri-white font-16 h-auto w-fit border-none px-12 py-6 font-bold"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex w-auto flex-row gap-128">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="flex w-690 flex-col gap-52">
                            <div className="flex flex-col gap-24">
                                <TagBadge
                                    tag="질문 1"
                                    withHash={false}
                                    className="text-20 text-sub-seoultech-red h-auto w-fit px-16 py-8 font-bold"
                                />
                                <p className="text-24 text-pri-black leading-[150%] font-bold text-wrap">
                                    다음 중 '사용자 페르소나(Persona)'에 대한
                                    설명으로 가장 적절한 것은?
                                </p>
                            </div>
                            <div className="flex flex-col gap-24">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <QuizItem
                                        key={index}
                                        index={index}
                                        answer="사용자 페르소나(Persona)는 사용자의 특성."
                                        isCorrect={true}
                                        isGrading={true}
                                        isSelected={true}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
