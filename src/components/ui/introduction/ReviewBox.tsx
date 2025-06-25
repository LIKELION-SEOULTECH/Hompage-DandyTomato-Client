// src/components/recruit/ReviewBox.tsx
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
                'inline-flex flex-col items-start gap-[10px] p-[36px] rounded-15 bg-gray',
                className
            )}
        >
            <h3 className="text-[#F0433A] bg-white font-bold text-[18px] leading-tight px-1">
                {title}
            </h3>
            <p className="text-black text-[16px] leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
    )
}