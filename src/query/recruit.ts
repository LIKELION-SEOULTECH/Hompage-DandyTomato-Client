import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { 
    submitApplication, 
    saveApplication, 
    getApplication, 
    subscribeRecruit, 
    correctText, 
    getRecruitQuestions 
} from '@/api/recruit'
import type { 
    SubmitApplicationRequest, 
    SaveApplicationRequest, 
    SubscribeRequest, 
    CorrectTextRequest 
} from '@/types/recruit'

// 지원서 제출
export function useSubmitApplication() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: submitApplication,
        onSuccess: () => {
            // 지원서 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['application'] })
        },
        onError: (error) => {
            console.error('지원서 제출 실패:', error)
        }
    })
}

// 지원서 중간저장
export function useSaveApplication() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: saveApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['application'] })
        },
        onError: (error) => {
            console.error('지원서 저장 실패:', error)
        }
    })
}

// 지원서 조회
export function useApplication() {
    return useQuery({
        queryKey: ['application'],
        queryFn: getApplication,
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 모집 알림 구독
export function useSubscribeRecruit() {
    return useMutation({
        mutationFn: subscribeRecruit,
        onSuccess: () => {
            alert('구독 신청이 완료되었습니다!')
        },
        onError: () => {
            alert('구독 신청에 실패했습니다.')
        }
    })
}

// 맞춤법 교정
export function useCorrectText() {
    return useMutation({
        mutationFn: correctText,
        onError: (error) => {
            console.error('맞춤법 교정 실패:', error)
        }
    })
}

// 맞춤법 검사
export function useSpellCheck() {
    return useMutation({
        mutationFn: (data: CorrectTextRequest) => correctText(data),
        onError: (error) => {
            console.error('맞춤법 검사 실패:', error)
        }
    })
}

// 지원서 질문 조회
export function useRecruitQuestions(part: string) {
    return useQuery({
        queryKey: ['recruit-questions', part],
        queryFn: () => getRecruitQuestions(part),
        enabled: !!part,
        staleTime: 1 * 60 * 1000, // 1분으로 단축
        gcTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false, // 윈도우 포커스 시 리페치 비활성화
        refetchOnMount: false, // 마운트 시 리페치 비활성화 (캐시된 데이터 사용)
    })
}
