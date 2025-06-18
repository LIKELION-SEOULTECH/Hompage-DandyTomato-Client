// MemberInfoPostRequest와 MemberInfoGetResponse 타입 정의

export interface MemberInfoPostRequest {
    id: string
    contactEmail: string
    name: string
    major: string
    profileUrl: string
    introduce: string
    tech: string
    link: string
}

export interface MemberInfoResponse {
    id: string
    contactEmail: string
    name: string
    major: string
    year: number
    profileUrl: string
    introduce: string
    part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    tech: string
    link: string
    role: 'ADMIN' | 'MEMBER'
    created_at?: string
}

export interface MemberListItem {
    id: string
    name: string
    bio: string
    position: string
    skills: string[]
    github_url: string
    linkedin_url: string
    portfolio_url: string
    profile_image: string
    join_date: string
    project_count: number
    is_active: boolean
}

export interface Pagination {
    page: number
    size: number
    total: number
    total_pages: number
}

export interface MemberListResponse {
    members: MemberListItem[]
    pagination: Pagination
}

export interface MemberListParams {
    page?: number
    size?: number
    part?: string
    sort?: string
}
