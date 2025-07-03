import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const text0_64 = Object.fromEntries(
    Array.from(Array(65), (_, i) => [`text-${i}`])
)

export const customTwMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'font-size': Object.keys(text0_64),
            'text-color': [
                'text-sub-seoultech-blue',
                'text-sub-seoultech-red',
                'text-pri-white',
                'text-pri-black'
                // 기타 커스텀 색상들...
            ]
        }
    }
})

export function cn(...inputs: ClassValue[]) {
    return customTwMerge(clsx(inputs))
}
