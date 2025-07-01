// Member API 명세서 기반 타입 정의 (2024 최신)

export interface MemberPostRequest {
    name: string
    part: string
    year: number
    major: string
    email: string
    phone: string
    github_url?: string
    blog_url?: string
    profile_image?: File
    description?: string
}

export interface MemberResponse {
    id: string
    name: string
    part: string
    year: number
    major: string
    email: string
    phone: string
    github_url?: string
    blog_url?: string
    profile_image_url?: string
    description?: string
    created_at: string
    updated_at: string
}

export interface MemberListParams {
    page?: number
    size?: number
    part?: string
    year?: number
    keyword?: string
}

export interface MemberListItem {
    id: string
    name: string
    part: string
    year: number
    major: string
    profile_image_url?: string
}

export interface MemberListResponse {
    members: MemberListItem[]
    pagination: {
        page: number
        size: number
        total: number
        total_pages: number
    }
}

export interface MemberError {
    code: string
    message: string
    details?: any
}
