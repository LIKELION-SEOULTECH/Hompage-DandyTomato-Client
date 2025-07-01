import type {
    MemberPostRequest,
    MemberResponse,
    MemberListParams,
    MemberListResponse
} from '@/types/member'
import { apiClient } from './client'

export async function postMember(
    data: MemberPostRequest
): Promise<MemberResponse> {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as any)
        }
    })
    const response = await apiClient.post<MemberResponse>('/member', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export async function getMembers(
    params: MemberListParams = {}
): Promise<MemberListResponse> {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.size) queryParams.append('size', params.size.toString())
    if (params.part) queryParams.append('part', params.part)
    if (params.year) queryParams.append('year', params.year.toString())
    if (params.keyword) queryParams.append('keyword', params.keyword)
    const response = await apiClient.get<MemberListResponse>(
        `/member?${queryParams.toString()}`
    )
    return response.data
}

export async function getMember(memberId: string): Promise<MemberResponse> {
    const response = await apiClient.get<MemberResponse>(`/member/${memberId}`)
    return response.data
}

export async function updateMember(
    memberId: string,
    data: Partial<MemberPostRequest>
): Promise<MemberResponse> {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as any)
        }
    })
    const response = await apiClient.patch<MemberResponse>(
        `/member/${memberId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return response.data
}

export async function deleteMember(memberId: string): Promise<void> {
    await apiClient.delete(`/member/${memberId}`)
}
