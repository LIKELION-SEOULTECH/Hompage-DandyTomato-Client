// Recruit DTO 타입 정의

export interface RecruitPostRequest {
    email: string
}

export interface ApplyPostRequest {
    id: number
    name: string
    studentId: string
    email: string
    phone: number
    major: string // enum은 string으로 처리
    part: string // enum은 string으로 처리
    qustion: string[]
    link: string
}

export interface ApplyDraftPostRequest {
    id: number
    name: string
    studentId: string
    email: string
    phone: number
    major: string
    part: string
    qustion: string[]
    link: string
}

export interface ApplyGetResponse {
    id: number
    name: string
    studentId: string
    email: string
    phone: number
    major: string
    part: string
    qustion: string[]
    link: string
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

export interface ApplyResultGetResponse {
    result: 'pass' | 'fail'
}
