import { http, HttpResponse, passthrough } from 'msw'
import { baseURL } from '@/api/client'
import memberHandlers from './handlers/memberHandler'
import { sessionHandlers } from './sessionHandler'
import { archiveHandlers } from './archiveHandler'
import { recruitHandlers } from './handlers/recruitHandler'

export const handlers = [
    // 맞춤법 검사 API는 외부 서비스이므로 MSW에서 제외
    http.post('http://localhost:5001/api/v1/recruit/wordcorrect', () => {
        return passthrough()
    }),
    http.post('http://localhost:5173/api/v1/recruit/wordcorrect', () => {
        return passthrough()
    }),
    
    // 라우팅 요청은 MSW에서 제외
    http.get('/apply/part', () => {
        return passthrough()
    }),
    
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
    
    ...recruitHandlers,
    ...memberHandlers,
    ...sessionHandlers,
    ...archiveHandlers
]
