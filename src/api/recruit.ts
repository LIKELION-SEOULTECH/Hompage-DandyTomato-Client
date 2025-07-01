import { apiClient } from './client'
import type {
    ApplyPostRequest,
    ApplyGetResponse,
    ApplyDraftPostRequest
} from '../types/recruit'

export async function postApplicant(
    data: ApplyPostRequest
): Promise<ApplyGetResponse> {
    const res = await apiClient.post<ApplyGetResponse>(
        '/recruit/application',
        data
    )
    return res.data
}

export async function postApplicantDraft(
    data: ApplyDraftPostRequest
): Promise<ApplyGetResponse> {
    const res = await apiClient.post<ApplyGetResponse>(
        '/recruit/apply/draft',
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
}
