import { describe, it, expect, beforeEach } from 'vitest'
import { apiClient } from '@/api/client'
import { useAuthZustandStore } from '@/stores/auth'
import { server } from '@/mocks/server'
import { http, HttpResponse } from 'msw'

describe('apiClient refresh 토큰 재발급 로직', () => {
    const initialTokens = {
        access_token: 'expired-access-token',
        refresh_token: 'valid-refresh-token'
    }

    beforeEach(() => {
        useAuthZustandStore.setState({ accessToken: '', refreshToken: '' })
        useAuthZustandStore.getState().setTokens(initialTokens)
    })

    it('access 토큰 만료 시 refresh 토큰으로 재발급 후 원래 요청을 재시도한다', async () => {
        let firstCall = true
        server.use(
            http.get('/api/v1/protected', () => {
                if (firstCall) {
                    firstCall = false
                    console.log('firstCall')
                    return HttpResponse.json('unauthorized', { status: 401 })
                }
                return HttpResponse.json('success', { status: 200 })
            }),
            http.post('/api/v1/auth/refresh', () => {
                console.log('refresh')
                return HttpResponse.json({
                    access_token: 'new-access-token',
                    refresh_token: 'valid-refresh-token'
                })
            })
        )

        const response = await apiClient.get('/protected')
        expect(response.status).toBe(200)
        // expect(response.data.data).toBe('success')
        expect(useAuthZustandStore.getState().accessToken).toBe(
            'new-access-token'
        )
    })

    it('refresh 토큰도 만료되면 로그아웃(스토어 초기화)된다', async () => {
        server.use(
            http.get('/api/v1/protected', () => {
                return HttpResponse.json('unauthorized', { status: 401 })
            }),
            http.post('/api/v1auth/refresh', () => {
                return HttpResponse.json('expired-refresh-token', {
                    status: 401
                })
            })
        )

        await expect(apiClient.get('/protected')).rejects.toThrow()
        expect(useAuthZustandStore.getState().accessToken).toBe('')
        expect(useAuthZustandStore.getState().refreshToken).toBe('')
    })
})
