// Session DTO 타입 정의

export interface SessionGetResponse {
    sessions: Array<{
        session_id: string
        title: string
        started_at: string
        ended_at: string
    }>
}

export interface SessionPostRequest {
    title: string
    text: string
    link: string
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
