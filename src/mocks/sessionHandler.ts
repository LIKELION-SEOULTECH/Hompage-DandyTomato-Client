import { http, HttpResponse } from 'msw'
import { baseURL } from '@/api/client'

export const sessionHandlers = [
    // 1. 세션 과제 상세 조회
    http.get(
        `${baseURL}/session/assignment/:assignmentId`,
        ({ request, params }) => {
            // 정상 응답
            return HttpResponse.json(
                {
                    sessions: [
                        {
                            id: 'session-' + params.assignmentId,
                            title: 'frontend 세션',
                            content: 'frontend 세션 내용',
                            assignments: [
                                {
                                    id: 'assignment-' + params.assignmentId,
                                    title: '과제1',
                                    description: '과제1 설명',
                                    started_at: '2024-01-01T10:00:00Z',
                                    ended_at: '2024-01-01T12:00:00Z',
                                    status: 'ONGOING'
                                },
                                {
                                    id: 'assignment-' + params.assignmentId,
                                    title: '과제2',
                                    description: '과제2 설명',
                                    started_at: '2024-01-02T10:00:00Z',
                                    ended_at: '2024-01-02T12:00:00Z',
                                    status: 'COMPLETED'
                                }
                            ]
                        }
                    ]
                },
                { status: 200 }
            )
        }
    ),
    // 2. 세션 과제 페이지 조회 (명세서 기반)
    http.get(`${baseURL}/session/assignment/:part`, ({ request, params }) => {
        const url = new URL(request.url)
        const week = url.searchParams.get('week')
        
        // 파트 유효성 검사
        if (
            !params.part ||
            (typeof params.part === 'string' && params.part.trim() === '')
        ) {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'INVALID_PART',
                        message: '유효하지 않은 파트입니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }

        // 파트가 존재하지 않는 경우
        if (params.part === 'notfound') {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'PART_NOT_FOUND',
                        message: '해당 파트를 찾을 수 없습니다.',
                        details: null
                    }
                },
                { status: 404 }
            )
        }

        // 정상 응답 (명세서 구조에 맞게 수정)
        return HttpResponse.json(
            {
                status: 'success',
                data: {
                    sessions: [
                        {
                            id: 'session-1',
                            week: week ? parseInt(week) : 1,
                            title: `${params.part} 세션 1주차`,
                            started_at: '2024-01-01T10:00:00Z',
                            part: String(params.part).toUpperCase(),
                            isSubmitted: true,
                            ended_at: '2024-01-01T12:00:00Z',
                            status: 'ONGOING'
                        },
                        {
                            id: 'session-2',
                            week: week ? parseInt(week) : 2,
                            title: `${params.part} 세션 2주차`,
                            started_at: '2024-01-08T10:00:00Z',
                            part: String(params.part).toUpperCase(),
                            isSubmitted: false,
                            ended_at: '2024-01-08T12:00:00Z',
                            status: 'ASSIGNED'
                        }
                    ]
                }
            },
            { status: 200 }
        )
    }),

    // 3. 세션 상세 페이지 조회 (명세서 기반)
    http.get(`${baseURL}/session/:sessionId`, ({ request, params }) => {
        if (params.sessionId === 'not-found') {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'NOT_FOUND',
                        message: '세션을 찾을 수 없습니다.',
                        details: null
                    }
                },
                { status: 404 }
            )
        }
        
        return HttpResponse.json({
            status: 'success',
            data: {
                session: {
                    id: String(params.sessionId),
                    year: 13,
                    part: 'BACKEND',
                    title: '기획 실습 - 인터뷰 질문 만들기',
                    assignment_description: '과제설명',
                    assignment_links: 'link1, link2, link3',
                    created_at: '2025-04-01T09:00:00',
                    ended_at: '2025-04-01T11:00:00',
                    resources: [
                        {
                            file_key: 'session/1234/20250701-uuid-자료.pdf',
                            mime_type: 'application/pdf',
                            presigned_url: 'https://s3-...amazonaws.com/...?X-Amz-Signature=...',
                            expire_at: 1720000000000
                        }
                    ]
                }
            }
        })
    }),
    // 4. 세션 과제 제출 (명세서 기반)
    http.post(
        `${baseURL}/session/:assignmentId/assignment`,
        async ({ request, params }) => {
            try {
                const body = await request.json() as { links: string }
                const { links } = body

                // 필수 필드 검사
                if (!links) {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'INVALID_REQUEST',
                                message: 'links 필드가 누락되었습니다.',
                                details: null
                            }
                        },
                        { status: 400 }
                    )
                }

                // 과제 존재 여부 검사
                if (params.assignmentId === 'not-found') {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'ASSIGNMENT_NOT_FOUND',
                                message: '과제를 찾을 수 없습니다.',
                                details: null
                            }
                        },
                        { status: 404 }
                    )
                }

                // 과제 제출 기한 검사
                if (params.assignmentId === 'expired') {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'ASSIGNMENT_DEADLINE_PASSED',
                                message: '과제 제출 기한이 지났습니다.',
                                details: null
                            }
                        },
                        { status: 400 }
                    )
                }

                // 이미 제출 여부 검사
                if (params.assignmentId === 'already-submitted') {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'ASSIGNMENT_ALREADY_SUBMITTED',
                                message: '이미 제출된 과제입니다.',
                                details: null
                            }
                        },
                        { status: 409 }
                    )
                }

                // 정상 응답
                return HttpResponse.json(
                    {
                        status: 'success',
                        data: {
                            message: '정상적으로 등록되었습니다'
                        }
                    },
                    { status: 201 }
                )
            } catch (error) {
                return HttpResponse.json(
                    {
                        status: 'error',
                        error: {
                            code: 'INTERNAL_ERROR',
                            message: '서버 내부 오류가 발생했습니다.',
                            details: null
                        }
                    },
                    { status: 500 }
                )
            }
        }
    ),

    // 5. 세션 과제 수정 (PUT)
    http.put(
        `${baseURL}/session/:assignmentId/assignment`,
        async ({ request, params }) => {
            try {
                const body = await request.json() as { links: string }
                const { links } = body

                // 필수 필드 검사
                if (!links) {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'INVALID_REQUEST',
                                message: 'links 필드가 누락되었습니다.',
                                details: null
                            }
                        },
                        { status: 400 }
                    )
                }

                // 과제 존재 여부 검사
                if (params.assignmentId === 'not-found') {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'ASSIGNMENT_NOT_FOUND',
                                message: '과제를 찾을 수 없습니다.',
                                details: null
                            }
                        },
                        { status: 404 }
                    )
                }

                // 과제 제출 기한 검사
                if (params.assignmentId === 'expired') {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'ASSIGNMENT_DEADLINE_PASSED',
                                message: '과제 제출 기한이 지났습니다.',
                                details: null
                            }
                        },
                        { status: 400 }
                    )
                }

                // 정상 응답
                return HttpResponse.json(
                    {
                        status: 'success',
                        data: {
                            message: '세션 과제가 정상적으로 수정되었습니다'
                        }
                    },
                    { status: 201 }
                )
            } catch (error) {
                return HttpResponse.json(
                    {
                        status: 'error',
                        error: {
                            code: 'INTERNAL_ERROR',
                            message: '서버 내부 오류가 발생했습니다.',
                            details: null
                        }
                    },
                    { status: 500 }
                )
            }
        }
    ),

    // 6. 복습 퀴즈 생성 요청
    http.post(`${baseURL}/session/quiz`, async ({ request }) => {
        const body = await request.json()
        if (
            !body ||
            typeof body !== 'object' ||
            body === null ||
            !('sessionIds' in body) ||
            !Array.isArray(body.sessionIds) ||
            body.sessionIds.length === 0
        ) {
            return HttpResponse.json(
                { message: 'No sessionIds' },
                { status: 400 }
            )
        }
        return HttpResponse.json({
            quiz: [
                {
                    title: '세션 복습 퀴즈',
                    오지선다: ['A', 'B', 'C', 'D', 'E'],
                    answer: 'A',
                    해설: '정답은 A입니다.'
                }
            ]
        })
    })
]
