import { useQuery } from '@tanstack/react-query'
import { getArchiveProjects, getArchiveProjectDetail, getArchiveGallery } from '@/api/archive'
import type { ArchiveProjectListParams, ArchiveGalleryListParams } from '@/types/archive'

// 프로젝트 목록 조회
export function useProjects(params?: ArchiveProjectListParams) {
    return useQuery({
        queryKey: ['projects', params],
        queryFn: () => getArchiveProjects(params ?? {}),
        staleTime: 10 * 60 * 1000, // 10분
    })
}

// 프로젝트 상세 조회
export function useProjectDetail(projectId: string) {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getArchiveProjectDetail(projectId),
        enabled: !!projectId,
        staleTime: 10 * 60 * 1000, // 10분
    })
}

// 갤러리 목록 조회
export function useGalleries(params?: ArchiveGalleryListParams) {
    return useQuery({
        queryKey: ['galleries', params],
        queryFn: () => getArchiveGallery(params ?? {}),
        staleTime: 10 * 60 * 1000, // 10분
    })
} 