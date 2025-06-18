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
        title: string
        오지선다: string[]
        answer: string
        해설: string
    }>
}
