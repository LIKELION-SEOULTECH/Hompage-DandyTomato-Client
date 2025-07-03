import { apiClient } from './client'
import type { LoginUrlResponse, LogoutResponse, RefreshResponse } from '@/types/auth'

// Google 로그인 URL 가져오기
export async function getGoogleLoginUrl(): Promise<LoginUrlResponse> {
    const res = await apiClient.get<LoginUrlResponse>('auth/login/google')
    return res.data
}

// 로그아웃
export async function logout(): Promise<LogoutResponse> {
    const res = await apiClient.post<LogoutResponse>('auth/logout')
    return res.data
}

// 토큰 갱신
export async function refreshToken(): Promise<RefreshResponse> {
    const res = await apiClient.get<RefreshResponse>('auth/refresh')
    return res.data
}
