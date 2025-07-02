import { apiClient } from './client'
import type { LoginSuccessResponse, LoginErrorResponse } from '@/types/auth'

// Google OAuth 로그인 - 굳
export async function login(
    code: string,
    redirect_uri: string
): Promise<LoginSuccessResponse | LoginErrorResponse> {
    const res = await apiClient.post<LoginSuccessResponse | LoginErrorResponse>(
        'auth/google-login',
        { code, redirect_uri }
    )
    return res.data
}

// 로그아웃 - 굳
export async function logout(): Promise<void> {
    await apiClient.post('auth/logout')
}

// 토큰 갱신 - 굳
export async function refreshToken(
    refreshToken: string
): Promise<LoginSuccessResponse | LoginErrorResponse> {
    const res = await apiClient.post<LoginSuccessResponse | LoginErrorResponse>(
        'auth/refresh',
        { refresh_token: refreshToken }
    )
    return res.data
}
