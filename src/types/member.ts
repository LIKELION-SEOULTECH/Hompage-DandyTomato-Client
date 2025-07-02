// 프로필 파일 정보
export interface ProfileFile {
    fileKey: string
    mimeType: string
    size: number
    presignedUrl: string
    expireAt: number
}

// 멤버 정보 (목록 조회용)
export interface Member {
    id: string
    email: string
    name: string
    major: string
    year: number
    profile_file?: ProfileFile
    introduce: string
    part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    links?: string
    role: 'MASTER' | 'ADMIN' | 'MEMBER' | 'GUEST'
}

// 멤버 목록 조회 파라미터
export interface MemberListParams {
    page?: number
    size?: number
    part?: string
    sort?: 'latest' | 'oldest'
}

// 멤버 목록 조회 응답
export interface MemberListResponse {
    status: 'success' | 'error'
    data: {
        members: Member[]
        page: number
        total_pages: number
    }
}

// 멤버 상세 조회 응답
export interface MemberDetailResponse {
    status: 'success' | 'error'
    data: {
        member: {
            id: string
            contactEmail: string
            name: string
            major: string
            year: number
            profileUrl: string
            introduce: string
            part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
            links: string
            role: 'MASTER' | 'ADMIN' | 'MEMBER' | 'GUEST'
        }
    }
    error?: {
        code: 'MEMBER_NOT_FOUND'
        message: string
        details: string | null
    }
}

// 내 프로필 수정 요청
export interface UpdateMyProfileRequest {
    id: string
    email?: string
    name?: string
    major?: string
    profileImg?: File
    introduce?: string
    links?: string
}

// 내 프로필 수정 응답
export interface UpdateMyProfileResponse {
    status: 'success' | 'error'
    data?: {
        member: {
            id: string
            contactEmail: string
            name: string
            major: string
            year: number
            profileUrl: string
            introduce: string
            part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PM'
            links: string
            role: 'MASTER' | 'ADMIN' | 'MEMBER' | 'GUEST'
        }
    }
    error?: {
        code: 'AUTH_FAILED' | 'ACCESS_DENIED' | 'MEMBER_NOT_FOUND' | 'INVALID_NAME_LENGTH' | 'INVALID_BIO_LENGTH'
        message: string
        details: string | null
    }
}
