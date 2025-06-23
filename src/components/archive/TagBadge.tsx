import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

export default function TagBadge({
    tag,
    withHash = true,
    className
}: {
    tag: string
    withHash?: boolean
    className?: string
}) {
    return (
        <Badge
            className={cn(
                'text-16 text-sub-seoultech-red border-sub-seoultech-red rounded-50 border-2 bg-transparent px-8 py-4 font-bold',
                className
            )}
            variant={'default'}>
            {withHash && `#`}
            {tag}
        </Badge>
    )
}
