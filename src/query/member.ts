import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMembers, getMemberDetail, updateMyProfile } from '@/api/member'
import type { MemberListParams, UpdateMyProfileRequest } from '@/types/member'

// 멤버 목록 조회
export function useMembers(params?: MemberListParams) {
    return useQuery({
        queryKey: ['members', params],
        queryFn: () => getMembers(params ?? {}),
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 멤버 상세 조회
export function useMemberDetail(memberId: string) {
    return useQuery({
        queryKey: ['member', memberId],
        queryFn: () => getMemberDetail(memberId),
        enabled: !!memberId,
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 내 프로필 수정
export function useUpdateMyProfile() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ memberId, data }: { memberId: string; data: UpdateMyProfileRequest }) => 
            updateMyProfile(memberId, data),
        onSuccess: (data) => {
            // 멤버 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['members'] })
            queryClient.invalidateQueries({ queryKey: ['member'] })
            alert('프로필이 수정되었습니다.')
        },
        onError: (error) => {
            console.error('프로필 수정 실패:', error)
            alert('프로필 수정에 실패했습니다.')
        }
    })
} 