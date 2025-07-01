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
    // 2. 세션 과제 페이지 조회
    http.get(`${baseURL}/session/assignment/:part`, ({ request, params }) => {
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

        // 정상 응답
        return HttpResponse.json(
            {
                sessions: [
                    {
                        id: 'session-1',
                        title: `${params.part} 세션`,
                        content: `${params.part} 세션 내용`,
                        assignments: [
                            {
                                id: 'assignment-1',
                                title: '과제1',
                                description: '과제1 설명',
                                started_at: '2024-01-01T10:00:00Z',
                                ended_at: '2024-01-01T12:00:00Z',
                                status: 'ONGOING'
                            },
                            {
                                id: 'assignment-2',
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
    }),

    // 3. 세션 상세 페이지 조회
    http.get(`${baseURL}/session/:sessionId`, ({ request, params }) => {
        if (params.sessionId === 'not-found') {
            return HttpResponse.json(
                {
                    code: 'NOT_FOUND',
                    message: '세션을 찾을 수 없습니다.'
                },
                { status: 404 }
            )
        }
        return HttpResponse.json({
            id: params.sessionId,
            title: '세션 제목',
            content: '세션 내용',
            assignments: [
                {
                    id: 'assignment-1',
                    title: '과제1',
                    description: '과제1 설명',
                    started_at: '2024-06-01',
                    ended_at: '2024-06-02',
                    status: 'ONGOING'
                }
            ]
        })
    }),
    // 4. 세션 과제 제출
    http.post(
        `${baseURL}/session/assignment/:part/submission`,
        async ({ request, params }) => {
            try {
                const formData = await request.formData()
                const assignmentId = formData.get('assignmentId') as string
                const content = formData.get('content') as string
                const fileUrl = formData.get('fileUrl') as string

                // 필수 필드 검사
                if (!assignmentId || !fileUrl) {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'INVALID_REQUEST',
                                message: '필수 필드가 누락되었습니다.',
                                details: null
                            }
                        },
                        { status: 400 }
                    )
                }

                // URL 형식 검사
                try {
                    new URL(fileUrl)
                } catch {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'INVALID_URL_FORMAT',
                                message: '유효하지 않은 URL 형식입니다.',
                                details: null
                            }
                        },
                        { status: 400 }
                    )
                }

                // 과제 존재 여부 검사
                if (assignmentId === 'not-found') {
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
                if (assignmentId === 'expired') {
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
                if (assignmentId === 'already-submitted') {
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

                // 파일 크기 검사
                if (fileUrl.includes('large-file')) {
                    return HttpResponse.json(
                        {
                            status: 'error',
                            error: {
                                code: 'FILE_TOO_LARGE',
                                message: '파일 크기가 너무 큽니다. (최대 50MB)',
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
                            submission: {
                                id: `sub-${Date.now()}`,
                                assignmentId: assignmentId,
                                sessionId: params.part,
                                memberId: 'member-123',
                                submission_type: 'FILE',
                                content: content || null,
                                fileUrl: fileUrl,
                                submittedAt: new Date().toISOString()
                            }
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
    // 5. 복습 퀴즈 생성 요청
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
