// Session DTO 타입 정의

export interface SessionGetResponse {
    sessions: Array<{
        id: string
        title: string
        content: string
        assignments: Array<{
            id: string
            title: string
            description: string
            started_at: string
            ended_at: string
            status: string
        }>
    }>
}

export interface SessionQuizCreateRequest {
    sessionIds: string[]
}

export interface SessionQuizCreateResponse {
    quiz: Array<{
        question: string
        options: {
            [key: string]: string
        }
        answer: string
    }>
}
