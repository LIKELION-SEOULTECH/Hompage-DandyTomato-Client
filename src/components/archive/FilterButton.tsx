import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
interface FilterButtonProps {
    text: string
}

const FilterButton: React.FC<FilterButtonProps> = ({ text }) => {
    return (
        <Select className="text-sub-seoultech-red text-20 border-sub-seoultech-red rounded-50 border-2 bg-transparent font-bold">
            <SelectTrigger className="text-sub-seoultech-red text-20 border-sub-seoultech-red rounded-50 border-2 bg-transparent font-bold">
                <SelectValue
                    placeholder={text}
                    className="text-sub-seoultech-red text-20 font-bold"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default FilterButton
