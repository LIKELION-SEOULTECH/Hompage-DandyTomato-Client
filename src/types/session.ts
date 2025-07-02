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
        status: 'ONGOING' | 'COMPLETED' | 'EXPIRED'
    }>
}

export interface SessionListResponse {
    sessions: SessionAssignmentDetailResponse[]
}

export interface SessionAssignmentSubmissionRequest {
    assignmentId: string
    fileUrl: string
    content?: string
}

export interface SessionAssignmentSubmissionResponse {
    status: 'success' | 'error'
    data?: {
        submission: {
            id: string
            assignmentId: string
            sessionId: string
            memberId: string
            submission_type: 'FILE' | 'TEXT'
            content?: string
            fileUrl?: string
            submittedAt: string
        }
    }
    error?: SessionError
}

export interface SessionQuizCreateRequest {
    sessionIds: string[]
}

export interface SessionQuizCreateResponse {
    quiz: Array<{
        question: string
        options: string[]
        answer: string
        explanation?: string
    }>
}

export interface SessionError {
    code: string
    message: string
    details?: any
}
