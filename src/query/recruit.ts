import { useMutation } from '@tanstack/react-query'
import { postApplicant } from '../api/recruit'

export function usePostApplicant() {
    return useMutation({
        mutationFn: postApplicant,
        onSuccess: data => {
            console.log('지원자 등록 성공', data)
        },
        onError: error => {
            console.log('지원자 등록 실패', error)
        }
    })
}
