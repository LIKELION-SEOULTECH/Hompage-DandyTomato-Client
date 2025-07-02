import { http, HttpResponse } from 'msw'
import { baseURL } from '@/api/client'
import memberHandlers from './handlers/memberHandler'
import { sessionHandlers } from './sessionHandler'
import { archiveHandlers } from './archiveHandler'

export const handlers = [
    http.get(`${baseURL}/demo/`, () => {
        return HttpResponse.json({
            message: 'From mock server'
        })
    }),
    http.get(`${baseURL}/demo/:id`, ({ params }) => {
        return HttpResponse.json({
            id: params.id
        })
    }),
    http.get(`${baseURL}/user`, () => {
        return HttpResponse.json({
            name: '홍길동',
            age: 30
        })
    }),
    http.post(`${baseURL}/recruit/application`, async ({ request }) => {
        const body = await request.json()
        if (!body || typeof body !== 'object') {
            return HttpResponse.json(
                {
                    code: 'INVALID_BODY',
                    message: '요청 본문이 올바르지 않습니다.'
                },
                { status: 400 }
            )
        }
        // 필수 필드 체크
        if (
            !body.name ||
            !body.student_id ||
            !body.email ||
            !body.phone ||
            !body.major ||
            !body.part ||
            !Array.isArray(body.answers)
        ) {
            return HttpResponse.json(
                {
                    code: 'MISSING_FIELD',
                    message: '필수 필드가 누락되었습니다.'
                },
                { status: 400 }
            )
        }
        return HttpResponse.json({
            id: Math.floor(Math.random() * 10000),
            name: body.name,
            student_id: body.student_id,
            email: body.email,
            phone: body.phone,
            major: body.major,
            part: body.part,
            answers: body.answers,
            link: body.link,
            status: 'submitted'
        })
    }),
    http.post(`${baseURL}/recruit/application/draft`, async ({ request }) => {
        const body = await request.json()
        if (!body || typeof body !== 'object') {
            return HttpResponse.json(
                {
                    code: 'INVALID_BODY',
                    message: '요청 본문이 올바르지 않습니다.'
                },
                { status: 400 }
            )
        }
        return HttpResponse.json({
            id: Math.floor(Math.random() * 10000),
            name: body.name,
            student_id: body.student_id,
            email: body.email,
            phone: body.phone,
            major: body.major,
            part: body.part,
            answers: body.answers,
            link: body.link,
            status: 'draft'
        })
    }),
    http.get(
        `${baseURL}/recruit/application/:applicationId/result`,
        ({ params }) => {
            const { applicationId } = params
            if (applicationId === '0') {
                return HttpResponse.json(
                    {
                        code: 'NOT_FOUND',
                        message: '지원서를 찾을 수 없습니다.'
                    },
                    { status: 404 }
                )
            }
            return HttpResponse.json({
                result: Math.random() > 0.5 ? 'pass' : 'fail'
            })
        }
    ),
    http.post(`${baseURL}/recruit/subscribe`, async ({ request }) => {
        // 항상 구독 성공 응답 반환
        return new HttpResponse(
            JSON.stringify({
                status: 'success',
                data: { is_subscriped: true }
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
    }),
    ...memberHandlers,
    ...sessionHandlers,
    ...archiveHandlers
]
