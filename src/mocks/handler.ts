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
        if (typeof body === 'object' && body !== null) {
            return HttpResponse.json({
                ...body,
                id: Math.floor(Math.random() * 100)
            })
        }
        return HttpResponse.json({ id: Math.floor(Math.random() * 10000) })
    }),
    http.post(`${baseURL}/recruit/apply/draft`, async ({ request }) => {
        const body = await request.json()
        if (typeof body === 'object' && body !== null) {
            return HttpResponse.json({
                ...body,
                id: Math.floor(Math.random() * 100)
            })
        }
        return HttpResponse.json({ id: Math.floor(Math.random() * 100) })
    }),
    ...memberHandlers,
    ...sessionHandlers,
    ...archiveHandlers
]
