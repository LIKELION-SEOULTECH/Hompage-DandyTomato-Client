import axios from 'axios'
import { useAuthZustandStore } from '@/stores/auth'
export const baseURL = '/api/v1'
export const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
    // 필요시 withCredentials 등 옵션 추가 가능
})

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

// JWT access_token을 Authorization 헤더에 자동으로 추가하는 인터셉터
apiClient.interceptors.request.use(
    config => {
        const { accessToken } = useAuthZustandStore.getState()
        if (accessToken) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        console.log(config.headers)
        return config
    },
    error => Promise.reject(error)
)

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const { refreshToken, logout, setTokens } =
                useAuthZustandStore.getState()

            // refresh 토큰이 없으면 로그아웃
            if (!refreshToken) {
                logout()
                return Promise.reject(error)
            }

            // 발급 시도 프로미스, 이미 발급 중이면 대기
            if (!isRefreshing) {
                isRefreshing = true
                refreshPromise = axios
                    .post('/api/v1/auth/refresh', {
                        refresh_token: refreshToken
                    })
                    .then(res => {
                        const { access_token, refresh_token } = res.data
                        setTokens({ access_token, refresh_token })
                        return access_token
                    })
                    .catch(err => {
                        logout()
                        throw err
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            }

            // 발급 완료 후 요청 재시도
            try {
                const newAccessToken = await refreshPromise
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return apiClient(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)
