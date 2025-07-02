// Archive DTO 타입 정의

// 갤러리 조회 요청
export interface ArchiveGalleryListParams {
    category?: string
    page?: number
    size?: number
    year?: number
}

// 갤러리 단일 항목
export interface ArchiveGalleryItem {
    id: string
    year: number
    category: string
    title: string
    description: string
    thumbnail_url: string
    image_urls: string[]
    uploaded_at: number
    uploaded_by: string
}

// 갤러리 목록 응답
export interface ArchiveGalleryListResponse {
    status: 'success' | 'error'
    data: {
        galleries: ArchiveGalleryItem[]
        pagination: {
            page: number
            size: number
            total: number
            total_pages: number
        }
        categories: { name: string }[]
    }
    error?: ArchiveError
}

// 갤러리 등록 요청
export interface ArchiveGalleryPostRequest {
    title: string
    subtitle: string
    content: string
    image_urls: string[]
    project_url?: string
    thumbnail: File
    images?: File[]
    team_members: string[]
    uploaded_by: string
}

// 갤러리 등록 응답
export interface ArchiveGalleryPostResponse {
    status: 'success' | 'error'
    data?: {
        gallery: ArchiveGalleryItem
    }
    error?: ArchiveError
}

// 프로젝트 조회 요청
export interface ArchiveProjectListParams {
    category?: string
    year?: number
    page?: number
    size?: number
}

// 프로젝트 단일 항목
export interface ArchiveProjectItem {
    id: string
    thumbnail_url: File
    images: File[]
    team_name: string
    team_members: string[]
    title: string
    subtitle: string
    project_url: string
    started_at: number
    finished_at: number
    year: number
    category: string
    type: string
    is_excellent: boolean
    description: string
}

// 프로젝트 목록 응답
export interface ArchiveProjectListResponse {
    status: 'success' | 'error'
    data: {
        projects: ArchiveProjectItem[]
        pagination: {
            page: number
            size: number
            total: number
            total_pages: number
        }
    }
    error?: ArchiveError
}

// 프로젝트 등록 요청 (FormData)
// (명세서에 따라 FormData 필드명/타입 맞춰야 함)

// 프로젝트 등록 응답
export interface ArchiveProjectPostResponse {
    status: 'success' | 'error'
    data?: {
        project: ArchiveProjectItem
    }
    error?: ArchiveError
}

// 에러 구조
export interface ArchiveError {
    code: string
    message: string
    details?: any
}
