import { apiClient } from './client'

// 1. 갤러리 조회
export async function getArchiveGallery(params: {
    category?: string
    page?: number
    size?: number
    sort?: string
}): Promise<any> {
    const res = await apiClient.get('/archive/gallery', { params })
    return res.data
}

// 2. 갤러리 게시 (ADMIN)
export async function postArchiveGallery(
    data: any,
    token: string
): Promise<any> {
    const res = await apiClient.post('/archive/gallery', data, {
        headers: { Authorization: token }
    })
    return res.data
}

// 3. 프로젝트 조회
export async function getArchiveProjects(params: {
    category?: string
    status?: string
    page?: number
    size?: number
    sort?: string
    keyword?: string
}): Promise<any> {
    const res = await apiClient.get('/archive/projects', { params })
    return res.data
}

// 4. 프로젝트 게시 (MEMBER)
export async function postArchiveProject(
    formData: FormData,
    token: string
): Promise<any> {
    const res = await apiClient.post('/archive/projects', formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}
