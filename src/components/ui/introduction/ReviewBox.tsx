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
                'flex flex-col items-start gap-[10px] p-[36px] rounded-15 bg-gray w-422 ',
                className
            )}
        >
            <div className="flex h-[28px] justify-center items-center gap-[10px] bg-white px-2 rounded">
                <h3 className="text-sub_seoultech_red font-pretendard text-[24px] font-bold leading-[36px] tracking-[-0.72px]">
                    {title}
                </h3>
            </div>
            <p className="text-black font-pretendard text-[16px] font-medium leading-[24px] tracking-[-0.48px] whitespace-pre-wrap">
                {content}
            </p>
        </div>
    )
}