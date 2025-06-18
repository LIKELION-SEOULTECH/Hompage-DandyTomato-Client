import { http, HttpResponse } from 'msw'
import { baseURL } from '@/api/client'

export const archiveHandlers = [
    // 1. 갤러리 조회
    http.get(`${baseURL}/archive/gallery`, ({ request }) => {
        try {
            const url = new URL(request.url)
            const category = url.searchParams.get('category')
            const sort = url.searchParams.get('sort')

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
            if (sort === 'wrong') {
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
            return HttpResponse.json({
                status: 'success',
                data: {
                    galleries: [
                        {
                            id: 'g1',
                            category: category || 'dev',
                            tag: 'tag1',
                            title: 'Gallery1',
                            subtitle: 'Sub1',
                            content: 'Content1',
                            thumbnail_url: 'https://img.com/1.png',
                            image_urls: ['https://img.com/1.png'],
                            started_at: Date.now(),
                            finished_at: Date.now(),
                            uploaded_at: Date.now(),
                            uploaded_by: 'admin'
                        }
                    ],
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
        // const auth = request.headers.get('authorization')
        // if (!auth) {
        //     return HttpResponse.json(
        //         {
        //             status: 'error',
        //             error: {
        //                 code: 'AUTH_FAILED',
        //                 message: '인증이 필요합니다.',
        //                 details: null
        //             }
        //         },
        //         { status: 401 }
        //     )
        // }
        // if (auth !== 'Bearer admin_token') {
        //     return HttpResponse.json(
        //         {
        //             status: 'error',
        //             error: {
        //                 code: 'ADMIN_REQUIRED',
        //                 message: '관리자 권한이 필요합니다.',
        //                 details: null
        //             }
        //         },
        //         { status: 403 }
        //     )
        // }
        const body: any = await request.json()
        return HttpResponse.json({
            status: 'success',
            data: {
                gallery: {
                    ...body,
                    id: 'g1',
                    uploaded_at: Date.now()
                }
            }
        })
    }),

    // 3. 프로젝트 조회
    http.get(`${baseURL}/archive/projects`, ({ request }) => {
        try {
            const url = new URL(request.url)
            const category = url.searchParams.get('category')
            const status = url.searchParams.get('status')
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
            return HttpResponse.json({
                status: 'success',
                data: {
                    projects: [
                        {
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
                            team_members: [
                                { id: 'm1', name: 'AI', part: 'AI' },
                                { id: 'm2', name: 'FE', part: 'FRONTEND' }
                            ],
                            created_at: new Date().toISOString()
                        }
                    ],
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
        // const auth = request.headers.get('authorization')
        // if (!auth) {
        //     return HttpResponse.json(
        //         {
        //             status: 'error',
        //             error: {
        //                 code: 'AUTH_FAILED',
        //                 message: '인증이 필요합니다.',
        //                 details: null
        //             }
        //         },
        //         { status: 401 }
        //     )
        // }
        // if (auth !== 'Bearer member_token') {
        //     return HttpResponse.json(
        //         {
        //             status: 'error',
        //             error: {
        //                 code: 'MEMBER_REQUIRED',
        //                 message: '멤버 권한이 필요합니다.',
        //                 details: null
        //             }
        //         },
        //         { status: 403 }
        //     )
        // }
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
        return HttpResponse.json(
            {
                status: 'success',
                data: {
                    project: {
                        id: 'p1',
                        title,
                        subtitle: formData.get('subtitle'),
                        content: formData.get('content'),
                        tag: 'tag1',
                        project_url: formData.get('project_url'),
                        thumbnail_url: 'https://img.com/1.png',
                        image_urls: ['https://img.com/1.png'],
                        started_at: Date.now(),
                        finished_at: Date.now(),
                        team_members: formData.get('team_members'),
                        uploaded_by: {
                            id: 'member-1',
                            name: '홍길동',
                            part: 'FRONTEND'
                        },
                        uploaded_at: new Date().toISOString()
                    }
                }
            },
            { status: 201 }
        )
    })
]
