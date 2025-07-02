// Recruit API 명세서 기반 타입 정의 (2024 최신)

export interface RecruitApplicationRequest {
    name: string
    student_id: string
    email: string
    phone: string
    major: string
    part: string
    answers: string[]
    link?: string
}

export interface RecruitApplicationResponse {
    id: number
    name: string
    student_id: string
    email: string
    phone: string
    major: string
    part: string
    answers: string[]
    link?: string
    status: 'submitted' | 'draft'
}

export interface ApplyPutRequest {
    name: string
    studentId: string
    email: string
    phone: number
    major: string
    part: string
    qustion: string[]
    link: string
}

export interface RecruitError {
    code: string
    message: string
    details?: any
}
