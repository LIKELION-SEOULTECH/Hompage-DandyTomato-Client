import { http, HttpResponse } from 'msw'
import { baseURL } from '@/api/client'

export const recruitHandlers = [
    // 지원서 제출
    http.post(`${baseURL}/recruit/apply`, async ({ request }) => {
        const formData = await request.formData()
        
        // FormData에서 데이터 추출
        const name = formData.get('name') as string
        const phone = formData.get('phone') as string
        const student_id = formData.get('student_id') as string
        const email = formData.get('email') as string
        const major = formData.get('major') as string
        const part = formData.get('part') as string
        const portfolioUrl = formData.get('portfolioUrl') as string
        const common_questions = JSON.parse(formData.get('common_questions') as string)
        const part_questions = JSON.parse(formData.get('part_questions') as string)

        // 필수 필드 체크
        if (!name || !student_id || !email || !phone || !major || !part) {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'MISSING_FIELD',
                        message: '필수 필드가 누락되었습니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }

        return HttpResponse.json({
            status: 'success',
            data: {
                application_id: Math.floor(Math.random() * 10000).toString(),
                message: '지원서가 성공적으로 제출되었습니다.'
            }
        })
    }),

    // 지원서 중간저장
    http.put(`${baseURL}/recruit/apply/draft`, async ({ request }) => {
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

        return HttpResponse.json({
            status: 'success',
            data: {
                application: {
                    id: Math.floor(Math.random() * 10000).toString(),
                    memberId: 'mock-member-id',
                    name: body.name,
                    phone: body.phone,
                    student_id: body.student_id,
                    major: body.major,
                    part: body.part,
                    portfolioUrl: body.portfolioUrl,
                    common_questions: body.common_questions,
                    part_questions: body.part_questions,
                    created_at: new Date().toISOString()
                }
            }
        })
    }),

    // 지원서 조회
    http.get(`${baseURL}/recruit/apply/draft`, () => {
        return HttpResponse.json({
            status: 'success',
            data: {
                application: {
                    id: '12345',
                    memberId: 'mock-member-id',
                    name: '홍길동',
                    phone: '010-1234-5678',
                    student_id: '202012345',
                    major: '컴퓨터공학과',
                    part: 'FRONTEND',
                    portfolioUrl: 'https://github.com/example',
                    common_questions: [
                        {
                            question_id: 'common-1',
                            question: '자기소개를 해주세요.',
                            answer: '안녕하세요. 저는 컴퓨터공학을 전공하는 학생입니다.'
                        }
                    ],
                    part_questions: [
                        {
                            question_id: 'frontend-1',
                            question: '프론트엔드 개발 경험을 말씀해주세요.',
                            answer: 'React와 TypeScript를 사용한 프로젝트를 진행했습니다.'
                        }
                    ],
                    access_token: 'mock-access-token',
                    created_at: '2024-01-01T00:00:00Z'
                }
            }
        })
    }),

    // 모집 알림 신청
    http.post(`${baseURL}/recruit/subscribe`, async ({ request }) => {
        const body = await request.json() as { email?: string }
        
        if (!body || !body.email) {
            return HttpResponse.json(
                {
                    status: 'error',
                    error: {
                        code: 'INVALID_EMAIL',
                        message: '이메일이 올바르지 않습니다.',
                        details: null
                    }
                },
                { status: 400 }
            )
        }

        return HttpResponse.json({
            status: 'success',
            data: {
                message: '구독 신청이 완료되었습니다.'
            }
        })
    }),

    // 지원서 질문 조회
    http.get(`${baseURL}/recruit/questions/:part`, ({ params }) => {
        const { part } = params
        
        // 파트별 질문 데이터
        const questionsData = {
            'AI': {
                part: 'AI',
                uploadedCount: 3,
                questions: [
                    {
                        id: 'ai-1',
                        questionText: 'AI/ML에 대한 본인의 관심사와 경험을 말씀해주세요.',
                        orderIndex: 1,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'ai-2',
                        questionText: '최근 관심 있는 AI 기술이나 논문이 있다면 소개해주세요.',
                        orderIndex: 2,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'ai-3',
                        questionText: 'AI 프로젝트를 진행한 경험이 있다면 설명해주세요.',
                        orderIndex: 3,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    }
                ]
            },
            'BACKEND': {
                part: 'BACKEND',
                uploadedCount: 3,
                questions: [
                    {
                        id: 'backend-1',
                        questionText: '백엔드 개발에 대한 본인의 관심사와 경험을 말씀해주세요.',
                        orderIndex: 1,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'backend-2',
                        questionText: '사용해본 백엔드 기술 스택을 소개해주세요.',
                        orderIndex: 2,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'backend-3',
                        questionText: '백엔드 프로젝트를 진행한 경험이 있다면 설명해주세요.',
                        orderIndex: 3,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    }
                ]
            },
            'FRONTEND': {
                part: 'FRONTEND',
                uploadedCount: 3,
                questions: [
                    {
                        id: 'frontend-1',
                        questionText: '프론트엔드 개발에 대한 본인의 관심사와 경험을 말씀해주세요.',
                        orderIndex: 1,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'frontend-2',
                        questionText: '사용해본 프론트엔드 기술 스택을 소개해주세요.',
                        orderIndex: 2,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'frontend-3',
                        questionText: '프론트엔드 프로젝트를 진행한 경험이 있다면 설명해주세요.',
                        orderIndex: 3,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    }
                ]
            },
            'DESIGN': {
                part: 'DESIGN',
                uploadedCount: 3,
                questions: [
                    {
                        id: 'design-1',
                        questionText: '디자인에 대한 본인의 관심사와 경험을 말씀해주세요.',
                        orderIndex: 1,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'design-2',
                        questionText: '사용해본 디자인 도구를 소개해주세요.',
                        orderIndex: 2,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'design-3',
                        questionText: '디자인 프로젝트를 진행한 경험이 있다면 설명해주세요.',
                        orderIndex: 3,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    }
                ]
            },
            'PLAN': {
                part: 'PLAN',
                uploadedCount: 3,
                questions: [
                    {
                        id: 'plan-1',
                        questionText: '기획/PM에 대한 본인의 관심사와 경험을 말씀해주세요.',
                        orderIndex: 1,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'plan-2',
                        questionText: '프로젝트 기획 경험이 있다면 설명해주세요.',
                        orderIndex: 2,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    },
                    {
                        id: 'plan-3',
                        questionText: '팀 프로젝트에서의 역할과 경험을 말씀해주세요.',
                        orderIndex: 3,
                        answerLimit: 500,
                        createdAt: '2024-01-01T00:00:00Z'
                    }
                ]
            }
        }

        // 유효한 파트인지 확인
        const validParts = ['AI', 'BACKEND', 'FRONTEND', 'DESIGN', 'PLAN'];
        if (!validParts.includes(part as string)) {
            return HttpResponse.json(
                {
                    success: false,
                    error: '유효하지 않은 파트입니다. (AI, BACKEND, FRONTEND, DESIGN, PLAN 중 하나여야 합니다.)'
                },
                { status: 400 }
            )
        }

        const partData = questionsData[part as keyof typeof questionsData]
        
        if (!partData) {
            return HttpResponse.json(
                {
                    success: false,
                    error: '존재하지 않는 파트입니다.'
                },
                { status: 404 }
            )
        }

        return HttpResponse.json({
            success: true,
            data: partData
        }, {
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            }
        })
    })
] 