import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { logout, refreshToken, getGoogleLoginUrl } from '@/api/auth'

// 로그아웃
export function useLogout() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // 로그아웃 시 모든 쿼리 무효화
            queryClient.clear()
            console.log('로그아웃 성공')
        },
        onError: (error) => {
            console.error('로그아웃 실패:', error)
        }
    })
}

// 토큰 갱신
export function useRefreshToken() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: refreshToken,
        onSuccess: (data) => {
            // 토큰 갱신 성공 시 인증 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            console.log('토큰 갱신 성공:', data)
        },
        onError: (error) => {
            console.error('토큰 갱신 실패:', error)
            // 토큰 갱신 실패 시 로그아웃 처리
            queryClient.clear()
        }
    })
}

// Google 로그인 URL 가져오기
export function useGoogleLoginUrl() {
    return useQuery({
        queryKey: ['auth', 'googleLoginUrl'],
        queryFn: getGoogleLoginUrl,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
    })
} 