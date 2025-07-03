import { describe, it, expect } from 'vitest'
import {
    getArchiveGallery,
    postArchiveGallery,
    getArchiveProjects,
    postArchiveProject
} from '@/api/archive'
import type {
    ArchiveGalleryListParams,
    ArchiveGalleryPostRequest,
    ArchiveProjectListParams
} from '@/types/archive'

describe('Archive API', () => {
    // 1. 갤러리 조회
    it('갤러리 조회 성공 (200)', async () => {
        const params: ArchiveGalleryListParams = {
            category: 'dev',
            page: 1,
            size: 2,
            sort: 'latest'
        }
        const res = await getArchiveGallery(params)
        expect(res.status).toBe('success')
        expect(Array.isArray(res.data.galleries)).toBe(true)
        expect(res.data.pagination).toHaveProperty('page', 1)
    })
    it('갤러리 조회 실패 (카테고리 오류)', async () => {
        await expect(
            getArchiveGallery({ category: 'invalid' })
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    it('갤러리 조회 실패 (정렬 오류)', async () => {
        await expect(
            getArchiveGallery({ sort: 'wrong' as any })
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })

    // 2. 갤러리 게시
    it('갤러리 게시 성공 (200)', async () => {
        const data: ArchiveGalleryPostRequest = {
            category: 'dev',
            tag: 'tag1',
            title: 'Test Gallery',
            subtitle: 'Sub',
            content: 'Content',
            image_urls: ['https://img.com/1.png'],
            started_at: Date.now(),
            finished_at: Date.now(),
            uploaded_by: 'admin'
        }
        const res = await postArchiveGallery(data, 'Bearer admin_token')
        expect(res.status).toBe('success')
        expect(res.data?.gallery).toHaveProperty('id')
    })
    // (토큰/권한 에러 테스트는 실제 인증 로직 구현 후 활성화)

    // 3. 프로젝트 조회
    it('프로젝트 조회 성공 (200)', async () => {
        const params: ArchiveProjectListParams = {
            category: 'web',
            status: 'completed',
            page: 1,
            size: 2
        }
        const res = await getArchiveProjects(params)
        expect(res.status).toBe('success')
        expect(Array.isArray(res.data.projects)).toBe(true)
        expect(res.data.pagination).toHaveProperty('page', 1)
    })
    it('프로젝트 조회 실패 (카테고리 오류)', async () => {
        await expect(
            getArchiveProjects({ category: 'invalid' })
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    it('프로젝트 조회 실패 (상태 오류)', async () => {
        await expect(
            getArchiveProjects({ status: 'wrong' })
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })

    // 4. 프로젝트 게시
    it('프로젝트 게시 성공 (201)', async () => {
        const formData = new FormData()
        formData.append('title', 'Project')
        formData.append('subtitle', 'Sub')
        formData.append('content', 'Content')
        formData.append('project_url', 'https://project.com')
        // 실제 명세서에 맞게 team_members 등 추가 필요
        formData.append('upload_by', 'member-1')
        const res = await postArchiveProject(formData, 'Bearer member_token')
        expect(res.status).toBe('success')
        expect(res.data?.project).toHaveProperty('id')
    })
    it('프로젝트 게시 실패 (제목 길이 오류)', async () => {
        const formData = new FormData()
        formData.append('title', 'a')
        await expect(
            postArchiveProject(formData, 'Bearer member_token')
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
})
