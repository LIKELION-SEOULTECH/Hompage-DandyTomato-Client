import useVerticalScroll from '@/hooks/useVerticalScroll'
import SessionResourceItem, {
    SessionResourceItemProps
} from './SessionResourceItem'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

export default function SessionResourceList({
    items,
    className
}: {
    items: SessionResourceItemProps[]
    className?: string
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    // useVerticalScroll(containerRef as React.RefObject<HTMLDivElement>)
    return (
        <div
            ref={containerRef}
            className={cn('flex h-768 w-1100 flex-col gap-16', className)}>
            {items.map((item, index) => (
                <SessionResourceItem
                    key={index}
                    {...item}
                />
            ))}
        </div>
    )
}
