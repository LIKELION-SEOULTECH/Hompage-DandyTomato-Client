import { apiClient } from './client'
import type { MemberListResponse } from '@/types/member'
import type {
    GetApplicantsParams,
    GetApplicantDetailParams,
    UpdateMemberRoleParams,
    ExpelMemberParams,
    UpdateMemberPartParams,
    ArchiveGalleryPostRequest,
    ArchiveProjectPostRequest,
    RecruitQuestionPostRequest
} from '@/types/admin'
// 필요시 타입 추가 import

// 관리자 멤버 목록 조회
export async function getAdminMembers(params: {
    page?: number
    size?: number
    role?: string
}): Promise<MemberListResponse> {
    const res = await apiClient.get<MemberListResponse>('/admin/members', {
        params
    })
    return res.data
}

// 멤버 권한 변경
export async function setMemberRole(
    memberId: string,
    role: string
): Promise<{ status: string }> {
    const res = await apiClient.patch<{ status: string }>(
        `/admin/members/${memberId}/role`,
        { role }
    )
    return res.data
}

// 지원자 현황 조회
export async function getApplicants(params: GetApplicantsParams) {
    const res = await apiClient.get('/api/v1/admin/recruit/applicants', {
        params
    })
    return res.data
}

// 지원자 응답 확인
export async function getApplicantDetail({
    applicationId,
    part
}: GetApplicantDetailParams) {
    const res = await apiClient.get(
        `/api/v1/admin/recruit/applicants/${applicationId}` +
            (part ? `?part=${part}` : '')
    )
    return res.data
}

// 합격 지원자 아기사자 승격
export async function promotePassedApplicants(round: string) {
    const res = await apiClient.post(`/api/v1/admin/recurit/pass/${round}`)
    return res.data
}

// 합격자 메일 발송
export async function sendPassNotification(round: string) {
    const res = await apiClient.post(
        `/api/v1/admin/recruit/notifications/pass/${round}`
    )
    return res.data
}

// 멤버 권한 수정 (PUT)
export async function updateMemberRole({
    memberId,
    role
}: UpdateMemberRoleParams) {
    const res = await apiClient.put(`/api/v1/admin/member/${memberId}`, {
        role
    })
    return res.data
}

// 멤버 제명 (DELETE)
export async function expelMember({ memberId, year }: ExpelMemberParams) {
    const res = await apiClient.delete(`/api/v1/admin/member/${memberId}`, {
        params: { year }
    })
    return res.data
}

// 멤버 프로필 파트 수정 (PUT)
export async function updateMemberPart({
    memberId,
    part
}: UpdateMemberPartParams) {
    const res = await apiClient.put(`/api/v1/admin/member/${memberId}`, {
        part
    })
    return res.data
}

// 세션 과제 및 자료 업로드 (POST)
export async function uploadSessionAssignment(sessionId: string, body: any) {
    const res = await apiClient.post(
        `/api/v1/admin/session/${sessionId}/assignment`,
        body
    )
    return res.data
}

// 세션 과제 및 자료 수정 (PATCH)
export async function updateSession(sessionId: string, body: any) {
    const res = await apiClient.patch(
        `/api/v1/admin/sessions/${sessionId}`,
        body
    )
    return res.data
}

// 세션 과제 및 자료 삭제 (DELETE)
export async function deleteSession(sessionId: string) {
    const res = await apiClient.delete(`/api/v1/admin/sessions/${sessionId}`)
    return res.data
}

// 갤러리 게시물 업로드 (POST)
export async function uploadGalleryPost(body: ArchiveGalleryPostRequest) {
    const res = await apiClient.post('/api/v1/admin/archive/gallery', body)
    return res.data
}

// 갤러리 게시물 삭제 (DELETE)
export async function deleteGalleryPost(galleryId: string) {
    const res = await apiClient.delete(
        `/api/v1/admin/archive/gallery/${galleryId}`
    )
    return res.data
}

// 갤러리 게시물 수정 (PUT)
export async function updateGalleryPost(body: ArchiveGalleryPostRequest) {
    const res = await apiClient.put('/api/v1/admin/archive/gallery', body)
    return res.data
}

// 프로젝트 게시물 업로드 (POST)
export async function uploadProjectPost(body: ArchiveProjectPostRequest) {
    const res = await apiClient.post('/api/v1/admin/archive/projects', body)
    return res.data
}

// 프로젝트 게시물 삭제 (DELETE)
export async function deleteProjectPost(projectId: string) {
    const res = await apiClient.delete(
        `/api/v1/admin/archive/projects/${projectId}`
    )
    return res.data
}

// 지원서 질문 항목 업로드 (POST)
export async function uploadRecruitQuestions(body: RecruitQuestionPostRequest) {
    const res = await apiClient.post('/api/v1/admin/recruit/questions', body)
    return res.data
}

// 지원서 질문 항목 수정 (PATCH)
export async function updateRecruitQuestions(body: any) {
    const res = await apiClient.patch('/api/v1/admin/recruit/questions', body)
    return res.data
}
