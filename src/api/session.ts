import { apiClient } from './client'
import type {
    SessionAssignmentDetailResponse,
    SessionListResponse,
    SessionAssignmentSubmissionRequest,
    SessionAssignmentSubmissionResponse,
    SessionQuizCreateRequest,
    SessionQuizCreateResponse
} from '@/types/session'

// 1. 세션 과제 상세 조회
export async function getSessionAssignmentDetail(
    assignmentId: string
): Promise<SessionListResponse> {
    const res = await apiClient.get<SessionListResponse>(
        `/session/assignment/${assignmentId}`
    )
    return res.data
}

// 2. 세션 과제 페이지 조회
export async function getSessionAssignmentPage(
    part: string
): Promise<SessionListResponse> {
    const res = await apiClient.get<SessionListResponse>(
        `/session/assignment/${part}`
    )
    return res.data
}

// 3. 세션 상세 조회
export async function getSessionDetail(
    sessionId: string
): Promise<SessionAssignmentDetailResponse> {
    const res = await apiClient.get<SessionAssignmentDetailResponse>(
        `/session/${sessionId}`
    )
    return res.data
}

// 4. 세션 과제 제출
export async function postSessionAssignmentSubmission(
    part: string,
    assignmentId: string,
    fileUrl: string,
    content?: string
): Promise<SessionAssignmentSubmissionResponse> {
    const formData = new FormData()
    formData.append('assignmentId', assignmentId)
    formData.append('fileUrl', fileUrl)
    if (content) formData.append('content', content)
    const res = await apiClient.post<SessionAssignmentSubmissionResponse>(
        `/session/assignment/${part}/submission`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
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
