// Auth DTO 타입 정의

export interface LoginSuccessResponse {
    status: 'success'
    data: {
        access_token: string
        refresh_token: string
        expiresIn: number
        member: {
            id: string
            email: string
            name: string
            profileUrl: string
        }
    }
}

export interface LoginErrorResponse {
    status: 'error'
    error: {
        code: string
        message: string
        details: string | null
    }
}
