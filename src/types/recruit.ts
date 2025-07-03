// Recruit API 타입 정의

// 질문-답변 구조
export interface QuestionAnswer {
    question_id: string
    answer: string
}

// 지원서 제출 요청
export interface SubmitApplicationRequest {
    name: string
    phone: string
    student_id: string
    email: string
    major: string
    part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    portfolioUrl?: string
    common_questions: QuestionAnswer[]
    part_questions: QuestionAnswer[]
}

// 지원서 제출 응답
export interface SubmitApplicationResponse {
    status: 'success' | 'error'
    data?: {
        application_id: string
        message: string
    }
    error?: {
        code: 'AUTH_FAILED' | 'INVALID_FORM_DATA' | 'DUPLICATE_APPLICATION' | 'APPLICATION_PERIOD_CLOSED'
        message: string
        details: string | null
    }
}

// 지원서 중간저장 요청
export interface SaveApplicationRequest {
    name: string
    phone: string
    student_id: string
    major: string
    part: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    portfolioUrl: string
    common_questions: QuestionAnswer[]
    part_questions: QuestionAnswer[]
}

// 지원서 중간저장 응답
export interface SaveApplicationResponse {
    status: 'success' | 'error'
    data?: {
        application: {
            id: string
            memberId: string
            name: string
            phone: string
            student_id: string
            major: string
            part: string
            portfolioUrl: string
            common_questions: {
                question_id: string
                question: string
                answer: string
            }[]
            part_questions: {
                question_id: string
                question: string
                answer: string
            }[]
            created_at: string
        }
    }
    error?: {
        code: 'AUTH_FAILED' | 'APPLICATION_NOT_FOUND' | 'APPLICATION_PERIOD_CLOSED' | 'ACCESS_DENIED'
        message: string
        details: string | null
    }
}

// 지원서 조회 응답 (GUEST 권한용)
export interface GetApplicationResponse {
    status: 'success' | 'error'
    data?: {
        application: {
            id: string
            memberId: string
            name: string
            phone: string
            student_id: string
            major: string
            part: string
            portfolioUrl: string
            common_questions: {
                question_id: string
                question: string
                answer: string
            }[]
            part_questions: {
                question_id: string
                question: string
                answer: string
            }[]
            access_token: string
            created_at: string
        }
    }
    error?: {
        code: 'AUTH_FAILED' | 'APPLICATION_NOT_FOUND' | 'APPLICATION_PERIOD_CLOSED' | 'ACCESS_DENIED'
        message: string
        details: string | null
    }
}

// 지원서 구독 요청
export interface SubscribeRequest {
    email: string
}

// 지원서 구독 응답
export interface SubscribeResponse {
    status: 'success' | 'error'
    data?: {
        message: string
    }
    error?: {
        code: 'AUTH_FAILED' | 'INVALID_EMAIL' | 'ALREADY_SUBSCRIBED' | 'SUBSCRIPTION_FAILED'
        message: string
        details: string | null
    }
}

// 맞춤법 교정 요청
export interface CorrectTextRequest {
    text: string
}

// 맞춤법 교정 응답
export interface CorrectTextResponse {
    corrected_text: string
}

// 지원서 질문 조회 응답
export interface GetRecruitQuestionsResponse {
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


