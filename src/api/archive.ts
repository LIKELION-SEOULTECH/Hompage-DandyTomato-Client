import { apiClient } from './client'
import type {
    ArchiveGalleryListParams,
    ArchiveGalleryListResponse,
    ArchiveProjectListParams,
    ArchiveProjectListResponse,
    ArchiveProjectDetailResponse
} from '@/types/archive'

// 1. 갤러리 게시물 조회 - 굳
export async function getArchiveGallery(
    params: ArchiveGalleryListParams
): Promise<ArchiveGalleryListResponse> {
    const res = await apiClient.get<ArchiveGalleryListResponse>(
        '/archive/gallery',
        { params }
    )
    return res.data
}



// 2. 프로젝트 게시물 조회 - 굳
export async function getArchiveProjects(
    params: ArchiveProjectListParams
): Promise<ArchiveProjectListResponse> {
    const res = await apiClient.get<ArchiveProjectListResponse>(
        '/archive/projects',
        { params }
    )
    return res.data
}

//3. 프로젝트 게시물 상세조회 - 굳
export async function getArchiveProjectDetail(
    projectId: string
): Promise<ArchiveProjectDetailResponse> {
    const res = await apiClient.get<ArchiveProjectDetailResponse>(
        `/archive/projects/${projectId}`
    )
    return res.data
}

