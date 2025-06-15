// MemberInfoPostRequest와 MemberInfoGetResponse 타입 정의

export interface MemberInfoPostRequest {
    member_id: string
    name: string
    profile: string // 링크 타입은 string으로 처리
    기수: number
    session: string
    major: string
    contactEmail: string
    tech: string
    introduce: string
    link: string
}

export interface MemberInfoGetResponse {
    member_id: string
    name: string
    profile: string
    기수: number
    session: string
    major: string
    contactEmail: string
    tech: string
    introduce: string
    link: string
}
