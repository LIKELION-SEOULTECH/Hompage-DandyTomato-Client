import { apiClient } from './client'
import type {
    SessionAssignmentDetailResponse,
    SessionListResponse,
    SessionAssignmentSubmissionRequest,
    SessionAssignmentSubmissionResponse,
    SessionQuizCreateRequest,
    SessionQuizCreateResponse,
    SessionAssignmentPageResponse,
    SessionDetailResponse,
    SessionAssignmentUpdateResponse
} from '@/types/session'


// 1. 세션 과제 페이지 조회 (MEMBER 권한 필요)
export async function getSessionAssignmentPage(
    part: string,
    week?: number
): Promise<SessionAssignmentPageResponse> {
    const params: any = {}
    if (week !== undefined) {
        params.week = week
    }
    
    const res = await apiClient.get<SessionAssignmentPageResponse>(
        `/session/assignment/${part}`,
        { params }
    )
    return res.data
}

// 2. 세션 상세 조회 (MEMBER 권한 필요)
export async function getSessionDetail(
    sessionId: string
): Promise<SessionDetailResponse> {
    const res = await apiClient.get<SessionDetailResponse>(
        `/session/${sessionId}`
    )
    return res.data
}

// 3. 세션 과제 제출 (MEMBER 권한 필요)
export async function postSessionAssignmentSubmission(
    assignmentId: string,
    links: string
): Promise<SessionAssignmentSubmissionResponse> {
    const res = await apiClient.post<SessionAssignmentSubmissionResponse>(
        `/session/${assignmentId}/assignment`,
        { links }
    )
    return res.data
}

// 4. 세션 과제 수정 (MEMBER 권한 필요)
export async function updateSessionAssignment(
    assignmentId: string,
    links: string
): Promise<SessionAssignmentUpdateResponse> {
    const res = await apiClient.put<SessionAssignmentUpdateResponse>(
        `/session/${assignmentId}/assignment`,
        { links }
    )
    return res.data
}

// 5. 복습 퀴즈 생성 요청
export async function postSessionQuiz(
    data: SessionQuizCreateRequest
): Promise<SessionQuizCreateResponse> {
    const res = await apiClient.post<SessionQuizCreateResponse>(
        '/session/quiz',
        data
    )
    return res.data
}
