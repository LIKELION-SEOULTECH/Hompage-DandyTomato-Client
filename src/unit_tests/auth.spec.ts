import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useAuthZustandStore } from '@/stores/auth'
import { apiClient } from '@/api/client'

const mockTokens = {
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token'
}

describe('JWT 토큰 핸들링 및 저장(zustand persist)', () => {
    beforeEach(() => {
        localStorage.clear() // persist 미들웨어가 localStorage에서 로드하므로 초기화
    })

    afterEach(() => {
        localStorage.clear()
    })

    it('로그인 성공 시 토큰이 localStorage와 zustand에 저장된다', () => {
        useAuthZustandStore.getState().setTokens(mockTokens)
        expect(localStorage.getItem('auth-storage')).toContain(
            mockTokens.access_token
        ) // persist 키로 확인
        expect(localStorage.getItem('auth-storage')).toContain(
            mockTokens.refresh_token
        )
        expect(useAuthZustandStore.getState().accessToken).toBe(
            mockTokens.access_token
        )
        expect(useAuthZustandStore.getState().refreshToken).toBe(
            mockTokens.refresh_token
        )
    })

    it('로그아웃 시 토큰이 localStorage와 zustand에서 삭제된다', () => {
        useAuthZustandStore.getState().setTokens(mockTokens) // 로그아웃 전 상태 설정
        useAuthZustandStore.getState().logout()
        expect(localStorage.getItem('auth-storage')).not.toContain(
            mockTokens.access_token
        )
        expect(localStorage.getItem('auth-storage')).not.toContain(
            mockTokens.refresh_token
        )
        expect(useAuthZustandStore.getState().accessToken).toBe('')
        expect(useAuthZustandStore.getState().refreshToken).toBe('')
    })

    it('apiClient 요청 시 access_token이 Authorization 헤더에 포함된다', async () => {
        useAuthZustandStore.getState().setTokens(mockTokens)
        // 인터셉터가 헤더에 토큰을 추가하는지 확인
        const request = await apiClient.get('/user')
        // 실제 네트워크 요청 대신 인터셉터 동작만 확인
        expect(request.config.headers.Authorization).toBe(
            `Bearer ${mockTokens.access_token}`
        )
    })
})
