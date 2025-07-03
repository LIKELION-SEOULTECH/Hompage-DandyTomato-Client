import type {
    MemberListParams,
    MemberListResponse,
    MemberDetailResponse,
    UpdateMyProfileRequest,
    UpdateMyProfileResponse
} from '@/types/member'
import { apiClient } from './client'

//1. 멤버 소개 페이지 조회 (ALL 권한) - 굳
export async function getMembers(
    params: MemberListParams = {}
): Promise<MemberListResponse> {
    const res = await apiClient.get<MemberListResponse>('/member', {
        params
    })
    return res.data
}

//2. 멤버 상세 조회 (ALL 권한) - 굳
export async function getMemberDetail(memberId: string): Promise<MemberDetailResponse> {
    const res = await apiClient.get<MemberDetailResponse>(`/member/${memberId}`)
    return res.data
}

//3. 내 프로필 수정 (MEMBER 권한 + 본인만) - 굳
export async function updateMyProfile(
    memberId: string,
    data: UpdateMyProfileRequest
): Promise<UpdateMyProfileResponse> {
    const formData = new FormData()
    
    // 필수 필드
    formData.append('id', data.id)
    if (data.name) formData.append('name', data.name)
    if (data.major) formData.append('major', data.major)
    if (data.introduce) formData.append('introduce', data.introduce)
    if (data.links) formData.append('links', data.links)
    if (data.profileImg) formData.append('profileImg', data.profileImg) 
    if (data.email) formData.append('email', data.email)
    
    const res = await apiClient.put<UpdateMyProfileResponse>(
        `/member/${memberId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return res.data
}

