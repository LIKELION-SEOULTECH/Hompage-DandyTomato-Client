import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
    getSessionAssignmentPage, 
    getSessionDetail, 
    postSessionAssignmentSubmission, 
    updateSessionAssignment, 
    postSessionQuiz 
} from '@/api/session'
import type { 
    SessionAssignmentSubmissionRequest, 
    SessionQuizCreateRequest 
} from '@/types/session'

// 세션 과제 페이지 조회
export function useSessionAssignmentPage(part: string, week?: number) {
    return useQuery({
        queryKey: ['session-assignment-page', part, week],
        queryFn: () => getSessionAssignmentPage(part, week),
        enabled: !!part,
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 세션 상세 조회
export function useSessionDetail(sessionId: string) {
    return useQuery({
        queryKey: ['session', sessionId],
        queryFn: () => getSessionDetail(sessionId),
        enabled: !!sessionId,
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 세션 과제 제출
export function useSubmitSessionAssignment() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ assignmentId, links }: { assignmentId: string; links: string }) => 
            postSessionAssignmentSubmission(assignmentId, links),
        onSuccess: (data, variables) => {
            // 세션 과제 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['session-assignment-page'] })
            alert('과제가 제출되었습니다.')
        },
        onError: (error) => {
            console.error('과제 제출 실패:', error)
            alert('과제 제출에 실패했습니다.')
        }
    })
}

// 세션 과제 수정
export function useUpdateSessionAssignment() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ assignmentId, links }: { assignmentId: string; links: string }) => 
            updateSessionAssignment(assignmentId, links),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['session-assignment-page'] })
            alert('과제가 수정되었습니다.')
        },
        onError: (error) => {
            console.error('과제 수정 실패:', error)
            alert('과제 수정에 실패했습니다.')
        }
    })
}

// 복습 퀴즈 생성
export function useCreateSessionQuiz() {
    return useMutation({
        mutationFn: (data: SessionQuizCreateRequest) => postSessionQuiz(data),
        onSuccess: () => {
            alert('복습 퀴즈가 생성되었습니다.')
        },
        onError: (error) => {
            console.error('퀴즈 생성 실패:', error)
            alert('퀴즈 생성에 실패했습니다.')
        }
    })
} 