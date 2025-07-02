import { apiClient } from './client'
import type { LoginSuccessResponse, LoginErrorResponse } from '@/types/auth'

// 로그인
export async function login(
    email: string,
    password: string
): Promise<LoginSuccessResponse | LoginErrorResponse> {
    const res = await apiClient.post<LoginSuccessResponse | LoginErrorResponse>(
        '/auth/login',
        { email, password }
    )
    return res.data
}

// 로그아웃
export async function logout(): Promise<void> {
    await apiClient.post('/auth/logout')
}

// 토큰 갱신
export async function refreshToken(
    refreshToken: string
): Promise<LoginSuccessResponse | LoginErrorResponse> {
    const res = await apiClient.post<LoginSuccessResponse | LoginErrorResponse>(
        '/auth/refresh',
        { refresh_token: refreshToken }
    )
    return res.data
}
