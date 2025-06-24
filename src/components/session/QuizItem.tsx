import { cn } from '@/lib/utils'
import CheckIcon from '@/assets/icons/check.svg'

export default function QuizItem({
    index,
    answer,
    isCorrect,
    isGrading,
    isSelected
}: {
    index: number
    answer: string
    isCorrect: boolean
    isGrading: boolean
    isSelected: boolean
}) {
    const order = ['A', 'B', 'C', 'D', 'E']
    return (
        <div
            className={cn(
                'bg-pri-gray-1 rounded-15 flex h-fit w-full flex-row items-center justify-between gap-12 p-16',
                {
                    'bg-[#E74C2E]/10': !isCorrect && isGrading,
                    'bg-[#0B4066]/10': isCorrect && isGrading
                }
            )}>
            <p className="text-16 flex flex-row gap-10 font-bold">
                <span className="text-sub-seoultech-red text-center">
                    {order[index]}
                </span>
                <span className="text-sub-seoultech-blue leading-[150%] text-wrap">
                    {answer}
                </span>
            </p>
            {isSelected && (
                <img
                    src={CheckIcon}
                    alt="check"
                />
            )}
        </div>
    )
}
