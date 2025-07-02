import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    getAdminMembers,
    setMemberRole,
    getApplicants,
    getApplicantDetail,
    promotePassedApplicants,
    sendPassNotification,
    updateMemberRole,
    expelMember,
    updateMemberProfile,
    uploadSessionAssignment,
    updateSessionAssignment,
    deleteSession,
    uploadGalleryPost,
    deleteGalleryPost,
    updateGalleryPost,
    uploadProjectPost,
    deleteProjectPost,
    uploadRecruitQuestions,
    updateRecruitQuestions
} from '@/api/admin'
import type {
    GetApplicantsParams,
    GetApplicantDetailParams,
    UpdateMemberRoleParams,
    ExpelMemberParams,
    UpdateMemberProfileRequest,
    PromotePassedApplicantsBody,
    SessionAssignmentUploadRequest,
    SessionAssignmentUpdateRequest,
    ArchiveGalleryPostRequest,
    ArchiveProjectPostRequest,
    RecruitQuestionPostRequest,
    RecruitQuestionUpdateRequest
} from '@/types/admin'

// 관리자 멤버 목록 조회
export function useAdminMembers(params?: {
    page?: number
    size?: number
    role?: string
}) {
    return useQuery({
        queryKey: ['admin-members', params],
        queryFn: () => getAdminMembers(params ?? {}),
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 멤버 권한 변경
export function useSetMemberRole() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ memberId, role }: { memberId: string; role: string }) =>
            setMemberRole(memberId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-members'] })
            queryClient.invalidateQueries({ queryKey: ['members'] })
        },
        onError: (error) => {
            console.error('멤버 권한 변경 실패:', error)
        }
    })
}

// 지원자 현황 조회
export function useApplicants(params: GetApplicantsParams) {
    return useQuery({
        queryKey: ['applicants', params],
        queryFn: () => getApplicants(params),
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 지원자 응답 확인
export function useApplicantDetail(params: GetApplicantDetailParams) {
    return useQuery({
        queryKey: ['applicant-detail', params],
        queryFn: () => getApplicantDetail(params),
        enabled: !!params.applicationId,
        staleTime: 5 * 60 * 1000, // 5분
    })
}

// 합격 지원자 승격
export function usePromotePassedApplicants() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ round, body }: { round: string; body: PromotePassedApplicantsBody }) =>
            promotePassedApplicants(round, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applicants'] })
            alert('합격자 승격이 완료되었습니다.')
        },
        onError: (error) => {
            console.error('합격자 승격 실패:', error)
        }
    })
}

// 합격자 메일 발송
export function useSendPassNotification() {
    return useMutation({
        mutationFn: (round: string) => sendPassNotification(round),
        onSuccess: () => {
            alert('합격자 메일 발송이 완료되었습니다.')
        },
        onError: (error) => {
            console.error('메일 발송 실패:', error)
        }
    })
}

// 멤버 권한 수정
export function useUpdateMemberRole() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ memberId, role }: UpdateMemberRoleParams) =>
            updateMemberRole({ memberId, role }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-members'] })
            queryClient.invalidateQueries({ queryKey: ['members'] })
        },
        onError: (error) => {
            console.error('멤버 권한 수정 실패:', error)
        }
    })
}

// 멤버 제명
export function useExpelMember() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ memberId }: ExpelMemberParams) => expelMember({ memberId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-members'] })
            queryClient.invalidateQueries({ queryKey: ['members'] })
            alert('멤버가 제명되었습니다.')
        },
        onError: (error) => {
            console.error('멤버 제명 실패:', error)
        }
    })
}

// 멤버 프로필 수정
export function useUpdateMemberProfile() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ memberId, data }: { memberId: string; data: Partial<UpdateMemberProfileRequest> }) =>
            updateMemberProfile(memberId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-members'] })
            queryClient.invalidateQueries({ queryKey: ['members'] })
            alert('프로필이 수정되었습니다.')
        },
        onError: (error) => {
            console.error('프로필 수정 실패:', error)
        }
    })
}

// 세션 과제 업로드
export function useUploadSessionAssignment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ sessionId, data }: { sessionId: string; data: SessionAssignmentUploadRequest }) =>
            uploadSessionAssignment(sessionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['session-assignment-page'] })
            queryClient.invalidateQueries({ queryKey: ['session-detail'] })
        },
        onError: (error) => {
            console.error('세션 과제 업로드 실패:', error)
        }
    })
}

// 세션 과제 수정
export function useUpdateSessionAssignment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ sessionId, assignmentId, data }: { 
            sessionId: string; 
            assignmentId: string; 
            data: SessionAssignmentUpdateRequest 
        }) => updateSessionAssignment(sessionId, assignmentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['session-assignment-page'] })
            queryClient.invalidateQueries({ queryKey: ['session-detail'] })
        },
        onError: (error) => {
            console.error('세션 과제 수정 실패:', error)
        }
    })
}

// 세션 삭제
export function useDeleteSession() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ sessionId, assignmentId }: { sessionId: string; assignmentId: string }) =>
            deleteSession(sessionId, assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['session-assignment-page'] })
            queryClient.invalidateQueries({ queryKey: ['session-detail'] })
        },
        onError: (error) => {
            console.error('세션 삭제 실패:', error)
        }
    })
}

// 갤러리 게시물 업로드
export function useUploadGalleryPost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: ArchiveGalleryPostRequest) => uploadGalleryPost(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archive-gallery'] })
        },
        onError: (error) => {
            console.error('갤러리 업로드 실패:', error)
        }
    })
}

// 갤러리 게시물 삭제
export function useDeleteGalleryPost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (galleryId: string) => deleteGalleryPost(galleryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archive-gallery'] })
        },
        onError: (error) => {
            console.error('갤러리 삭제 실패:', error)
        }
    })
}

// 갤러리 게시물 수정
export function useUpdateGalleryPost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ galleryId, body }: { galleryId: string; body: ArchiveGalleryPostRequest }) =>
            updateGalleryPost(galleryId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archive-gallery'] })
        },
        onError: (error) => {
            console.error('갤러리 수정 실패:', error)
        }
    })
}

// 프로젝트 게시물 업로드
export function useUploadProjectPost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: ArchiveProjectPostRequest) => uploadProjectPost(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archive-projects'] })
        },
        onError: (error) => {
            console.error('프로젝트 업로드 실패:', error)
        }
    })
}

// 프로젝트 게시물 삭제
export function useDeleteProjectPost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (projectId: string) => deleteProjectPost(projectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archive-projects'] })
        },
        onError: (error) => {
            console.error('프로젝트 삭제 실패:', error)
        }
    })
}

// 지원서 질문 업로드
export function useUploadRecruitQuestions() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: RecruitQuestionPostRequest) => uploadRecruitQuestions(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruit-questions'] })
        },
        onError: (error) => {
            console.error('지원서 질문 업로드 실패:', error)
        }
    })
}

// 지원서 질문 수정
export function useUpdateRecruitQuestions() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: RecruitQuestionUpdateRequest) => updateRecruitQuestions(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruit-questions'] })
        },
        onError: (error) => {
            console.error('지원서 질문 수정 실패:', error)
        }
    })
} 