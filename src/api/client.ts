import axios from 'axios'

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
    // 필요시 withCredentials 등 옵션 추가 가능
})
