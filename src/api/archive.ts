import { apiClient } from './client'
import type {
    ArchiveGalleryListParams,
    ArchiveGalleryListResponse,
    ArchiveGalleryPostRequest,
    ArchiveGalleryPostResponse,
    ArchiveProjectListParams,
    ArchiveProjectListResponse,
    ArchiveProjectPostResponse
} from '@/types/archive'

// 1. 갤러리 조회
export async function getArchiveGallery(
    params: ArchiveGalleryListParams
): Promise<ArchiveGalleryListResponse> {
    const res = await apiClient.get<ArchiveGalleryListResponse>(
        '/archive/gallery',
        { params }
    )
    return res.data
}

// 2. 갤러리 게시 (ADMIN)
export async function postArchiveGallery(
    data: ArchiveGalleryPostRequest,
    token: string
): Promise<ArchiveGalleryPostResponse> {
    const res = await apiClient.post<ArchiveGalleryPostResponse>(
        '/archive/gallery',
        data,
        {
            headers: { Authorization: token }
        }
    )
    return res.data
}

// 3. 프로젝트 조회
export async function getArchiveProjects(
    params: ArchiveProjectListParams
): Promise<ArchiveProjectListResponse> {
    const res = await apiClient.get<ArchiveProjectListResponse>(
        '/archive/projects',
        { params }
    )
    return res.data
}

// 4. 프로젝트 게시 (ADMIN)
export async function postArchiveProject(
    formData: FormData,
    token: string
): Promise<ArchiveProjectPostResponse> {
    const res = await apiClient.post<ArchiveProjectPostResponse>(
        '/archive/projects',
        formData,
        {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return res.data
}
