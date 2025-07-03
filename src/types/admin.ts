// Admin 도메인 API 타입 정의

// 지원자 현황 조회
export interface GetApplicantsParams {
    part?: string
    round?: string
}

// 지원자 응답 확인
export interface GetApplicantDetailParams {
    applicationId: string
    part?: string
    round:string
}

// 멤버 권한 수정
export interface UpdateMemberRoleParams {
    memberId: string
    // 예: 'ADMIN', 'MEMBER', 'MASTER' 등
    role: string
}



// 멤버 프로필 수정 요청
export interface UpdateMemberProfileRequest {
    id?: string
    email?: string
    name?: string
    major?: string
    part?: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    profileImg?: File
    introduce?: string
    links?: string
}



//합격 지원자 아기사자 승격
export interface PromotePassedApplicantsBody {
  [part: string]: { id: string }[]
}

// 프로젝트 게시물 업로드
export interface ArchiveProjectPostRequest {
    // 실제 명세에 따라 필드 추가 필요
    title: string
    description: string
    team: string
    year: string
    // ...
}

// 지원서 질문 항목 업로드 요청
export interface RecruitQuestionPostRequest {
    questions: {
        questionText: string
        orderIndex: number
        answerLimit: number
    }[]
}

// 지원서 질문 항목 업로드 응답
export interface RecruitQuestionPostResponse {
    success: boolean
    data: {
        part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN' | 'COMMON'
        uploadedCount: number
        questions: {
            id: string
            questionText: string
            orderIndex: number
            answerLimit: number
            createdAt: string
        }[]
    }
}

// 지원서 질문 항목 수정 요청
export interface RecruitQuestionUpdateRequest {
    questions: {
        questionId: string
        questionText?: string
        answerLimit?: number
        orderIndex?: number
    }[]
}

// 지원서 질문 항목 수정 응답
export interface RecruitQuestionUpdateResponse {
    success: boolean
    data: {
        part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN' | 'COMMON'
        uploadedCount: number
        questions: {
            id: string
            questionText: string
            answerLimit: number
            orderIndex: number
            createdAt: string
        }[]
    }
}

// ===== Archive 관리 타입들 =====

// 갤러리 등록 요청
export interface ArchiveGalleryPostRequest {
    title: string
    year: number                           
    category: 'REGURAL_SESSION' | 'CENTRAL_ACITVITY' | 'OWN_ACTIVITY' | 'SOCIAL_ACTIVITY' | 'ETC'
    description: string
    prefix: string                         // S3 prefix
    filekey: string                        
}

// 갤러리 등록 응답
export interface ArchiveGalleryPostResponse {
    status: 'success' | 'error'
    data?: {
        gallery: ArchiveGalleryItem
    }
    error?: ArchiveError
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

// 프로젝트 등록 요청
export interface ArchiveProjectPostRequest {
    title: string
    subtitle: string
    project_url: string
    started_at: string
    finished_at: string
    prefix: string
    filename: string
    team_members: string[]
    team_name: string
    description: string
    years: number
    category: 'IDEA_THON' | 'CENTRAL_HACKTHON' | 'LONG_PROJECT' | 'ETC'
    platform: 'WEB' | 'ANDROID' | 'IOS'
    is_excellent: boolean
}

// 프로젝트 등록 응답
export interface ArchiveProjectPostResponse {
    status: 'success' | 'error'
    data?: {
        project: ArchiveProjectItem
    }
    error?: ArchiveError
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

// 에러 구조
export interface ArchiveError {
    code: string
    message: string
    details?: any
}

// 세션 과제 및 자료 업로드 요청
export interface SessionAssignmentUploadRequest {
    week: number
    title: string
    part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    due_date: string
    description: string
    file_key: string
    mime_type: string
}

// 세션 과제 및 자료 업로드 응답
export interface SessionAssignmentUploadResponse {
    status: 'success' | 'error'
    data?: {
        message: string
        presigned_url: string
        filekey: string
    }
    error?: {
        code: string
        message: string
        details?: any
    }
}

// 세션 과제 및 자료 수정 요청
export interface SessionAssignmentUpdateRequest {
    title?: string
    description?: string
    due_date?: string
}

// 세션 과제 및 자료 수정 응답
export interface SessionAssignmentUpdateResponse {
    status: 'success' | 'error'
    data?: {
        assignment: {
            id: string
            session_id: string
            title: string
            description: string
            due_date: string
            created_at: string
            updated_at: string
            created_by: string
        }
    }
    error?: {
        code: string
        message: string
        details?: any
    }
}

// 기타 엔드포인트별로 필요시 추가
