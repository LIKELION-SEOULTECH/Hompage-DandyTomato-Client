import HighlightenTitle from '@/components/HighlightenTitle'
import { cn } from '@/lib/utils'

type ReviewBoxProps = {
    title: string
    content: string
    className?: string
}

export default function ReviewBox({ title, content, className }: ReviewBoxProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-start gap-[10px] p-[36px] rounded-15 bg-pri-gray-1 w-422 ',
                className
            )}
        >

            <HighlightenTitle text={title} className="text-24 text-sub-seoultech-red font-bold leading-[36px] tracking-[-0.72px] bg-pri-white" />
            <p className="text-pri-black font-pretendard text-[16px] font-medium leading-[24px] tracking-[-0.48px] whitespace-pre-wrap">
                {content}
            </p>

        </div>
    )
}