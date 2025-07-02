import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, logout, refreshToken } from '@/api/auth'

// 로그인
export function useLogin() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({ code, redirect_uri }: { code: string; redirect_uri: string }) => 
            login(code, redirect_uri),
        onSuccess: (data) => {
            // 로그인 성공 시 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
            console.log('로그인 성공:', data)
        },
        onError: (error) => {
            console.error('로그인 실패:', error)
        }
    })
}

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
        mutationFn: (token: string) => refreshToken(token),
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