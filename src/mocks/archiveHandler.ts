import { http, HttpResponse } from 'msw'
import { baseURL } from '@/api/client'
import type { ArchiveGalleryItem, ArchiveProjectItem } from '@/types/archive'

export const archiveHandlers = [
    // 1. 갤러리 조회
    http.get(`${baseURL}/archive/gallery`, ({ request }) => {
        try {
            const url = new URL(request.url)
            const category = url.searchParams.get('category') || 'web'
            const year = url.searchParams.get('year') || 2024

            if (category === 'invalid') {
                return HttpResponse.json(
                    {
                        status: 'error',
                        error: {
                            code: 'INVALID_CATEGORY',
                            message: '유효하지 않은 카테고리입니다.',
                            details: null
                        }
                    },
                    { status: 400 }
                )
            }
            if (year === 'wrong') {
                return HttpResponse.json(
                    {
                        status: 'error',
                        error: {
                            code: 'INVALID_SORT_OPTION',
                            message: '유효하지 않은 정렬 옵션입니다.',
                            details: null
                        }
                    },
                    { status: 400 }
                )
            }
            const gallery: ArchiveGalleryItem = {
                id: 'g1',
                category,
                year,
                title: 'Gallery1',
                description: 'Description1',
                thumbnail_url: 'https://img.com/1.png',
                image_urls: ['https://img.com/1.png'],
                started_at: Date.now(),
                finished_at: Date.now()
            }
            return HttpResponse.json({
                status: 'success',
                data: {
                    galleries: [gallery],
                    pagination: { page: 1, size: 20, total: 1, total_pages: 1 },
                    categories: [{ name: 'dev' }]
                }
            })
        } catch (error) {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'INVALID_URL',
                        message: '유효하지 않은 URL입니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }
    }),

    // 2. 갤러리 게시
    http.post(`${baseURL}/archive/gallery`, async ({ request }) => {
        const body = await request.json()
        if (!body || typeof body !== 'object') {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'INVALID_BODY',
                        message: '요청 본문이 올바르지 않습니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }
        const gallery: ArchiveGalleryItem = {
            id: 'g1',
            category: body.category || 'web',
            title: body.title || '',
            description: body.description || '',
            thumbnail_url: body.thumbnail_url || '',
            year: body.year || 2024,
            started_at: body.started_at || Date.now(),
            finished_at: body.finished_at || Date.now()
        }
        return HttpResponse.json({
            status: 'success',
            data: { gallery }
        })
    }),

    // 3. 프로젝트 조회
    http.get(`${baseURL}/archive/projects`, ({ request }) => {
        try {
            const url = new URL(request.url)
            const category = url.searchParams.get('category') || 'web'
            const status = url.searchParams.get('status') || 'completed'
            if (category === 'invalid') {
                return HttpResponse.json(
                    {
                        status: 'error',
                        error: {
                            code: 'INVALID_CATEGORY',
                            message: '유효하지 않은 카테고리입니다.',
                            details: null
                        }
                    },
                    { status: 400 }
                )
            }
            if (status === 'wrong') {
                return HttpResponse.json(
                    {
                        status: 'error',
                        error: {
                            code: 'INVALID_STATUS',
                            message: '유효하지 않은 상태값입니다.',
                            details: null
                        }
                    },
                    { status: 400 }
                )
            }
            const project: ArchiveProjectItem = {
                id: 'p1',
                title: 'Project1',
                subtitle: 'Sub1',
                content: 'Content1',
                tag: 'tag1',
                project_url: 'https://project.com',
                thumbnail_url: 'https://img.com/1.png',
                image_urls: ['https://img.com/1.png'],
                started_at: Date.now(),
                finished_at: Date.now(),
                author: {
                    id: 'a1',
                    name: '홍길동',
                    profile_image: 'https://img.com/profile.png'
                },
                team_members: ['AI_홍길동', 'FE_김철수', 'BE_이영희'],
                team_name: '팀1',
                year: 2024,
                category: 'web',
                type: 'web',
                is_excellent: false
            }
            return HttpResponse.json({
                status: 'success',
                data: {
                    projects: [project],
                    pagination: { page: 1, size: 20, total: 1, total_pages: 1 },
                    filters: {}
                }
            })
        } catch (error) {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'INVALID_URL',
                        message: '유효하지 않은 URL입니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }
    }),

    // 4. 프로젝트 게시
    http.post(`${baseURL}/archive/projects`, async ({ request }) => {
        const formData = await request.formData()
        const title = formData.get('title')
        if (!title || (typeof title === 'string' && title.length < 3)) {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'INVALID_TITLE_LENGTH',
                        message: '제목은 3자 이상 100자 이하여야 합니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }
        const project: ArchiveProjectItem = {
            id: 'p1',
            title: title as string,
            subtitle: formData.get('subtitle') as string,
            project_url: formData.get('project_url') as string,
            thumbnail_url: formData.get('thumbnail') as File,
            images: formData.getAll('images') as File[],
            started_at: Date.now(),
            finished_at: Date.now(),
            team_members: ['AI_홍길동', 'FE_김철수', 'BE_이영희'],
            team_name: '팀1',
            year: 2024,
            category: 'web',
            type: 'web',
            description: formData.get('description') as string,
            is_excellent: false
        }
        return HttpResponse.json(
            {
                status: 'success',
                data: { project }
            },
            { status: 201 }
        )
    })
]
