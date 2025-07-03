import { cn } from '@/lib/utils'

export default function HighlightenTitle({
    text,
    className,
    ref
}: {
    text: string
    className?: string
    ref?: React.RefObject<HTMLDivElement>
}) {
    return (
        <h1
            ref={ref}
            className={cn(
                'font-pretendard text-pri-white bg-sub-seoultech-red text-64 w-fit leading-none font-bold tracking-[-1.92px]',
                className
            )}>
            {text}
        </h1>
    )
}
