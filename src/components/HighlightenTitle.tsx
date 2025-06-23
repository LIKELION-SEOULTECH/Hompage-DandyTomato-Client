import { cn } from '@/lib/utils'

export default function HighlightenTitle({
    text,
    className
}: {
    text: string
    className?: string
}) {
    return (
        <h1
            className={cn(
                'font-pretendard text-pri-white bg-sub-seoultech-red text-64 w-fit leading-none font-bold tracking-[-1.92px]',
                className
            )}>
            {text}
        </h1>
    )
}
