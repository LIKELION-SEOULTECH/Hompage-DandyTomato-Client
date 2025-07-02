import { apiClient } from './client'
import type {
    RecruitApplicationRequest,
    RecruitApplicationResponse,
    RecruitDraftRequest,
    RecruitResultResponse
} from '../types/recruit'

export async function postRecruitApplication(
    data: RecruitApplicationRequest
): Promise<RecruitApplicationResponse> {
    const res = await apiClient.post<RecruitApplicationResponse>(
        '/recruit/application',
        data
    )
    return res.data
}

export async function postRecruitDraft(
    data: RecruitDraftRequest
): Promise<RecruitApplicationResponse> {
    const res = await apiClient.post<RecruitApplicationResponse>(
        '/recruit/application/draft',
        data
    )
    return res.data
}

export async function postRecruitSubscribe(email: string, accessToken: string): Promise<{ is_subscriped: boolean }> {
    const res = await apiClient.post(
        '/recruit/subscribe',
        { email },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )
    return res.data.data
export async function getRecruitResult(
    applicationId: number
): Promise<RecruitResultResponse> {
    const res = await apiClient.get<RecruitResultResponse>(
        `/recruit/application/${applicationId}/result`
    )
    return res.data
}
