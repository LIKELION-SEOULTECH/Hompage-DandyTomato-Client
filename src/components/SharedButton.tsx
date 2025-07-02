import { Button as ShadButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SharedButton({
    children,
    className,
    ...props
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <ShadButton
            className={cn(
                'text-20 text-pri-white bg-sub-seoultech-red rounded-15 px-16 py-8 font-bold h-fit w-fit',
                className
            )}
            {...props}>
            {children}
        </ShadButton>
    )
}
