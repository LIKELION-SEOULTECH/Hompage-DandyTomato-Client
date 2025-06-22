import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
interface FilterButtonProps {
    text: string
    options: {
        label: string
        value: string
    }[]
}

const FilterButton: React.FC<FilterButtonProps> = ({ text, options = [] }) => {
    const [open, setOpen] = useState(false)
    return (
        <Select
            open={open}
            onOpenChange={setOpen}>
            <SelectTrigger
                open={open}
                className="text-sub-seoultech-red text-20 border-sub-seoultech-red rounded-50 sticky border-2 bg-transparent">
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
