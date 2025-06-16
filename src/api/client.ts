import axios from 'axios'
import { useAuthZustandStore } from '@/stores/auth'

export const apiClient = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
    // 필요시 withCredentials 등 옵션 추가 가능
})

// JWT access_token을 Authorization 헤더에 자동으로 추가하는 인터셉터
apiClient.interceptors.request.use(
    config => {
        const { accessToken } = useAuthZustandStore.getState()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        console.log(config.headers)
        return config
    },
    error => Promise.reject(error)
)
