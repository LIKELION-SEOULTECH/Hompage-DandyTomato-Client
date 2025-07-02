// Admin 도메인 API 타입 정의

// 지원자 현황 조회
export interface GetApplicantsParams {
    part?: string
    round?: string
}

// 지원자 응답 확인
export interface GetApplicantDetailParams {
    applicationId: string
    part?: string
}

// 멤버 권한 수정
export interface UpdateMemberRoleParams {
    memberId: string
    // 예: 'ADMIN', 'MEMBER', 'MASTER' 등
    role: string
}

// 멤버 제명
export interface ExpelMemberParams {
    memberId: string
    year: string
}

// 멤버 프로필 파트 수정
export interface UpdateMemberPartParams {
    memberId: string
    part: string
}

// 갤러리 게시물 업로드
export interface ArchiveGalleryPostRequest {
    // 실제 명세에 따라 필드 추가 필요
    title: string
    content: string
    imageUrl: string
    year: string
}

// 프로젝트 게시물 업로드
export interface ArchiveProjectPostRequest {
    // 실제 명세에 따라 필드 추가 필요
    title: string
    description: string
    team: string
    year: string
    // ...
}

// 지원서 질문 항목 업로드
export interface RecruitQuestionPostRequest {
    // 실제 명세에 따라 필드 추가 필요
    questions: string[]
}

// 기타 엔드포인트별로 필요시 추가
