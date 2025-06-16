import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/v1/demo/', () => {
        return HttpResponse.json({
            message: 'From mock server'
        })
    }),
    http.get('/api/v1/demo/:id', ({ params }) => {
        return HttpResponse.json({
            id: params.id
        })
    }),
    http.get('/api/user', () => {
        return HttpResponse.json({
            name: '홍길동',
            age: 30
        })
    }),
    http.post('/api/applicant', async ({ request }) => {
        const body = await request.json()
        if (typeof body === 'object' && body !== null) {
            return HttpResponse.json({
                ...body,
                id: Math.floor(Math.random() * 100)
            })
        }
        return HttpResponse.json({ id: Math.floor(Math.random() * 10000) })
    }),
    http.post('/api/applicant/draft', async ({ request }) => {
        const body = await request.json()
        if (typeof body === 'object' && body !== null) {
            return HttpResponse.json({
                ...body,
                id: Math.floor(Math.random() * 100)
            })
        }
        return HttpResponse.json({ id: Math.floor(Math.random() * 100) })
    })
]
