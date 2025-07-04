import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            {...props}
        />
    )
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn(
                'border-b border-[#E5E5E5] bg-[#F8F8F8] px-6 py-0 last:border-b-0',
                className
            )}
            {...props}
        />
    )
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    'font-pretendard flex flex-1 items-start justify-between gap-4 rounded-md px-0 py-6 text-left text-[18px] leading-tight font-bold text-[#222] transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[#222]/30 disabled:pointer-events-none disabled:opacity-50',
                    '[&[data-state=open]>svg]:rotate-180',
                    className
                )}
                {...props}>
                {children}
                <ChevronDownIcon className="pointer-events-none size-5 shrink-0 translate-y-0.5 text-[#222] transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down font-pretendard overflow-hidden px-6 text-[16px] font-normal text-[#666]"
            {...props}>
            <div className={cn('px-0 pt-0 pb-5', className)}>{children}</div>
        </AccordionPrimitive.Content>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
