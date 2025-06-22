import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export function ToggleGroupButton({
    options = [
        { label: '전체', value: '전체' },
        { label: '정기세션', value: '정기세션' },
        { label: '중앙활동', value: '중앙활동' },
        { label: '자체활동', value: '자체활동' },
        { label: '친목활동', value: '친목활동' }
    ]
}: {
    options: { label: string; value: string }[]
}) {
    return (
        <ToggleGroup
            type="single"
            className="flex flex-col items-baseline gap-16">
            {options.map(option => (
                <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                    className="text-sub-seoultech-red text-20 border-sub-seoultech-red rounded-50 data-[state=on]:bg-sub-seoultech-red hover:bg-sub-seoultech-red data-[slot=toggle-group-item]:rounded-50 items-center justify-center border-2 bg-transparent font-bold hover:text-white data-[state=on]:text-white">
                    {option.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
