// Auth DTO 타입 정의

export interface LoginUrlResponse {
    status: 'success'
    message: string
    data: string // Google OAuth URL
}

export interface LogoutResponse {
    status: 'success'
    message: string
}

export interface RefreshResponse {
    status: 'success'
    message: string
}
