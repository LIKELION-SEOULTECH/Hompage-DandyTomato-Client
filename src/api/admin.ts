import { apiClient } from './client'
import type { MemberListResponse } from '@/types/member'
import type {
    GetApplicantsParams,
    GetApplicantDetailParams,
    UpdateMemberRoleParams,
    UpdateMemberProfileRequest,
    RecruitQuestionPostRequest,
    RecruitQuestionPostResponse,
    RecruitQuestionUpdateRequest,
    RecruitQuestionUpdateResponse,
    PromotePassedApplicantsBody,
    SessionAssignmentUploadRequest,
    SessionAssignmentUploadResponse,
    SessionAssignmentUpdateRequest,
    SessionAssignmentUpdateResponse
} from '@/types/admin'
import type {
    ArchiveGalleryPostRequest,
    ArchiveGalleryPostResponse,
    ArchiveProjectPostRequest,
    ArchiveProjectPostResponse
} from '@/types/admin'
import { KeyRound } from 'lucide-react'
// 필요시 타입 추가 import

// 관리자 멤버 목록 조회 ?
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

// 멤버 권한 변경 - 굳
export async function setMemberRole(
    memberId: string,
    role: string
): Promise<{ status: string }> {
    const res = await apiClient.patch<{ status: string }>(
        `/admin/members/${memberId}`,
        { role }
    )
    return res.data
}

// 지원자 현황 조회 - 굳
export async function getApplicants(params: GetApplicantsParams) {
    const res = await apiClient.get('/admin/recruit/applicants', {
        params
    })
    return res.data
}

// 지원자 응답 확인 - 굳
export async function getApplicantDetail({
    applicationId,
    part,
    round
}: GetApplicantDetailParams) {
    const res = await apiClient.get(
        `/admin/recruit/applicants/${applicationId}`,
        { 
            params: { 
                ...(part && { part }), 
                ...(round && { round }) 
            } 
        }
    )
    return res.data
}

// 합격 지원자 아기사자 승격 - 굳
export async function promotePassedApplicants(
    round: string, 
    body: PromotePassedApplicantsBody
): Promise<{ status: string; message: string }> {
    const res = await apiClient.post<{ status: string; message: string }>(
        `/admin/recruit/pass/${round}`, 
        body
    )
    return res.data
}

// 합격자 메일 발송 - 굳
export async function sendPassNotification(
    round: string

) {
    const res = await apiClient.post(
        `/admin/recruit/notifications/pass/${round}`
    )
    return res.data
}

// 멤버 권한 수정 (PATCH) - 굳
export async function updateMemberRole({
    memberId,
    role
}: UpdateMemberRoleParams) {
    const res = await apiClient.patch(`/admin/member/${memberId}`, { role })
    return res.data
}



// 멤버 프로필 수정 (PATCH) - 굳
export async function updateMemberProfile(
    memberId: string,
    data: Partial<UpdateMemberProfileRequest>
) {
    const res = await apiClient.patch(
        `/admin/member/${memberId}`,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res.data
}

// 세션 과제 및 자료 업로드 (POST) - 굳
export async function uploadSessionAssignment(
    sessionId: string,
    data: SessionAssignmentUploadRequest
): Promise<SessionAssignmentUploadResponse> {
    const res = await apiClient.post<SessionAssignmentUploadResponse>(
        `/admin/sessions/${sessionId}/assignments`,
        data
    )
    return res.data
}

// 세션 과제 및 자료 수정 (PATCH) - 굳
export async function updateSessionAssignment(
    sessionId: string,
    assignmentId: string,
    data: SessionAssignmentUpdateRequest
): Promise<SessionAssignmentUpdateResponse> {
    const res = await apiClient.patch<SessionAssignmentUpdateResponse>(
        `/admin/sessions/${sessionId}/assignments/${assignmentId}`,
        data
    )
    return res.data
}

// 세션 과제 및 자료 삭제 (DELETE) - 굳
export async function deleteSession(sessionId: string, assignmentId: string) {
    const res = await apiClient.delete(`/admin/sessions/${sessionId}/assignments/${assignmentId}`)
    return res.data
}

// 갤러리 게시물 업로드 (POST)
export async function uploadGalleryPost(body: ArchiveGalleryPostRequest) {
    const res = await apiClient.post('/admin/archive/gallery', body)
    return res.data
}

// 갤러리 게시물 삭제 (DELETE) - 굳
export async function deleteGalleryPost(galleryId: string) {
    const res = await apiClient.delete(
        `/admin/archive/gallery/${galleryId}`
    )
    return res.data
}

// 갤러리 게시물 수정 (PUT) - 굳
export async function updateGalleryPost(galleryId:string,body: ArchiveGalleryPostRequest) {
    const res = await apiClient.put(`/admin/archive/gallery/${galleryId}`, body)
    return res.data
}

// 프로젝트 게시물 업로드 (POST) - 굳
export async function uploadProjectPost(body: ArchiveProjectPostRequest) {
    const res = await apiClient.post('/admin/archive/projects', body)
    return res.data
}

// 프로젝트 게시물 삭제 (DELETE) - 굳
export async function deleteProjectPost(projectId: string) {
    const res = await apiClient.delete(
        `/admin/archive/projects/${projectId}`
    )
    return res.data
}

// 지원서 질문 항목 업로드 (POST) - ADMIN 권한 필요
export async function uploadRecruitQuestions(
    part: string,
    body: RecruitQuestionPostRequest
): Promise<RecruitQuestionPostResponse> {
    const res = await apiClient.post<RecruitQuestionPostResponse>(
        `/admin/recruit/question?part=${part}`,
        body
    )
    return res.data
}

// 지원서 질문 항목 수정 (PATCH) - ADMIN 권한 필요
export async function updateRecruitQuestions(
    body: RecruitQuestionUpdateRequest
): Promise<RecruitQuestionUpdateResponse> {
    const res = await apiClient.patch<RecruitQuestionUpdateResponse>(
        '/admin/recruit/questions',
        body
    )
    return res.data
}


