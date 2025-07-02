import { apiClient } from './client'
import type {
    SubmitApplicationRequest,
    SubmitApplicationResponse,
    SaveApplicationRequest,
    SaveApplicationResponse,
    GetApplicationResponse,
    SubscribeRequest,
    SubscribeResponse,
    CorrectTextRequest,
    CorrectTextResponse,
    GetRecruitQuestionsResponse
} from '@/types/recruit'

// 지원서 제출 (GUEST 권한 이상, 구글 OAuth 인증 필요)
export async function submitApplication(
    data: SubmitApplicationRequest
): Promise<SubmitApplicationResponse> {
    const formData = new FormData()
    
    // 기본 정보
    formData.append('name', data.name)
    formData.append('phone', data.phone)
    formData.append('student_id', data.student_id)
    formData.append('email', data.email)
    formData.append('major', data.major)
    formData.append('part', data.part)
    
    // 선택적 필드
    if (data.portfolioUrl) {
        formData.append('portfolioUrl', data.portfolioUrl)
    }
    
    // JSON 배열을 문자열로 변환하여 전송
    formData.append('common_questions', JSON.stringify(data.common_questions))
    formData.append('part_questions', JSON.stringify(data.part_questions))
    
    const res = await apiClient.post<SubmitApplicationResponse>(
        '/recruit/apply',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return res.data
}

// 지원서 중간저장 
export async function saveApplication(
    data: SaveApplicationRequest
): Promise<SaveApplicationResponse> {
    const res = await apiClient.put<SaveApplicationResponse>(
        '/recruit/apply/draft',
        data
    )
    return res.data
}

// 지원서 조회 (GUEST 권한, 구글 OAuth 인증 필요)
export async function getApplication(): Promise<GetApplicationResponse> {
    const res = await apiClient.get<GetApplicationResponse>(
        '/recruit/apply/draft'
    )
    return res.data
}

// 모집 알림 신청 (GUEST 권한)
export async function subscribeRecruit(data: SubscribeRequest): Promise<SubscribeResponse> {
    const res = await apiClient.post<SubscribeResponse>(
        '/recruit/subscribe',
        data
    )
    return res.data
}

// 맞춤법 교정 (외부 Docker 서비스)
export async function correctText(data: CorrectTextRequest): Promise<CorrectTextResponse> {
    const res = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    if (!res.ok) {
        throw new Error(`맞춤법 교정 실패: ${res.status}`)
    }
    
    return res.json()
}

// 지원서 질문 조회
export async function getRecruitQuestions(part: string): Promise<GetRecruitQuestionsResponse> {
    const res = await apiClient.get<GetRecruitQuestionsResponse>(
        `/recruit/questions/${part}`
    )
    return res.data
}

