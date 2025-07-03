import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
interface FilterButtonProps {
    text: string
    options: {
        label: string
        value: string
    }[]
    className?: string
}

const FilterButton: React.FC<FilterButtonProps> = ({
    text,
    options = [],
    className
}) => {
    const [open, setOpen] = useState(false)
    return (
        <Select
            open={open}
            onOpenChange={setOpen}>
            <SelectTrigger
                open={open}
                className={cn(
                    'text-sub-seoultech-red text-20 border-sub-seoultech-red rounded-50 sticky border-2 bg-transparent',
                    className
                )}>
                <SelectValue placeholder={text} />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem
                        key={option.value}
                        value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default FilterButton
