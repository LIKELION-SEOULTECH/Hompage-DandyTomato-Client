import type {
    MemberInfoPostRequest,
    MemberInfoResponse,
    MemberListResponse
} from '@/types/member'
import { apiClient } from './client'

interface MemberListParams {
    page?: number
    size?: number
    part?: 'AI' | 'BACKEND' | 'FRONTEND' | 'DESIGN' | 'PLAN'
    sort?: 'latest' | 'oldest'
}

export async function postMemberInfo(
    data: MemberInfoPostRequest
): Promise<MemberInfoResponse> {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
    })

    const response = await apiClient.post<MemberInfoResponse>(
        '/member-info',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )

    return response.data
}

export async function getMembers(
    params: MemberListParams = {}
): Promise<MemberListResponse> {
    const { page = 1, size = 30, part, sort = 'latest' } = params
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort
    })

    if (part) {
        queryParams.append('part', part)
    }

    const response = await apiClient.get<MemberListResponse>(
        `/member?${queryParams}`
    )

    return response.data
}

export async function getMemberInfo(
    memberId: string
): Promise<MemberInfoResponse> {
    const response = await apiClient.get<MemberInfoResponse>(
        `/member-info/${memberId}`
    )
    return response.data
}

export async function updateMemberInfo(
    memberId: string,
    data: Partial<MemberInfoPostRequest>
): Promise<MemberInfoResponse> {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            formData.append(key, value)
        }
    })

    const response = await apiClient.patch<MemberInfoResponse>(
        `/member-info/${memberId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return response.data
}

export async function deleteMemberInfo(memberId: string): Promise<void> {
    await apiClient.delete(`/member-info/${memberId}`)
}
