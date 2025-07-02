// Session API 명세서 기반 타입 정의 (2024 최신)

export interface SessionAssignmentDetailResponse {
    id: string
    title: string
    content: string
    assignments: Array<{
        id: string
        title: string
        description: string
        started_at: string
        ended_at: string
        status: 'ASSIGNED' | 'ONGOING' | 'COMPLETED' | 'NOT_EXIST' | 'NOT_COMPLETED'
    }>
}

// 세션 상세 조회 응답 (명세서 기반)
export interface SessionDetailResponse {
    status: 'success' | 'error'
    data: {
        session: {
            id: string
            year: number
            part: string
            title: string
            assignment_description: string
            assignment_links: string
            created_at: string
            ended_at: string
            resources: {
                file_key: string
                mime_type: string
                presigned_url: string
                expire_at: number
            }[]
        }
    }
}

export interface SessionListResponse {
    sessions: SessionAssignmentDetailResponse[]
}

// 세션 과제 페이지 조회 응답 (명세서 기반)
export interface SessionAssignmentPageResponse {
    status: 'success' | 'error'
    data: {
        sessions: {
            id: string
            week: number
            title: string
            started_at: string
            part: string
            isSubmitted: boolean
            ended_at: string
            status: 'ASSIGNED' | 'ONGOING' | 'COMPLETED' | 'NOT_EXIST' | 'NOT_COMPLETED'
        }[]
    }
}

export interface SessionAssignmentSubmissionRequest {
    links: string
}

export interface SessionAssignmentSubmissionResponse {
    status: 'success' | 'error'
    data?: {
        message: string
    }
    error?: SessionError
}

// 세션 과제 수정 응답
export interface SessionAssignmentUpdateResponse {
    status: 'success' | 'error'
    data?: {
        message: string
    }
    error?: SessionError
}

export interface SessionQuizCreateRequest {
    sessionIds: string[]
}

export interface SessionQuizCreateResponse {
    status: 'success' | 'error'
    data: {
        quiz: {
            session_id: string[]
            title: string
            total_questions: number
            questions: {
                id: string
                question: string
                options: {
                    id: string
                    text: string
                    is_correct?: boolean
                }[]
                answer: {
                    id: string
                    explanation: string
                }
            }[]
            created_at: string
            expires_at: string
        }
    }
}

export interface SessionError {
    code: string
    message: string
    details?: any
}
