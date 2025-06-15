// Archive DTO 타입 정의

export interface ArchiveProjectPostRequest {
    image: string
    title: string
    subtitle: string
    content: string
    tag: string
    started_at: string // timestamp는 string으로 처리
    finished_at: string
    link: string
    crews: Array<{
        member_id: number
    }>
}

export interface ArchiveProjectGetResponse {
    thumneil: Array<{
        image: string
        title: string
        subtitle: string
        content: string
        type: string // enum은 string으로 처리
    }>
    crews: Array<{
        member_id: number
        part: string
        name: string
    }>
    started_at: string
    finished_at: string
    link: string
    isExcellent: boolean
}

export interface ArchiveGalleryPostRequest {
    category: string
    tag: string
    image: string
    title: string
    subtitle: string
    content: string
    started_at: string
    finished_at: string
}

export interface ArchiveGalleryGetResponse {
    id: number
    tag: string
    image: string
    title: string
    subtitle: string
    content: string
    started_at: string
    finished_at: string
}
