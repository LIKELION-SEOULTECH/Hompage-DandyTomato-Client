import { describe, it, expect } from 'vitest'
import type {
    RecruitPostRequest,
    ApplyPostRequest,
    ApplyDraftPostRequest,
    ApplyGetResponse,
    ApplyPutRequest,
    ApplyResultGetResponse
} from '@/types/recruit'

// 지원자 등록 테스트

describe('지원자 DTO 타입 유효성 검사', () => {
    it('RecruitPostRequest 타입이 올바르게 생성되어야 한다', () => {
        const req: RecruitPostRequest = { email: 'test@example.com' }
        expect(req.email).toBeTypeOf('string')
    })

    it('ApplyPostRequest 타입이 올바르게 생성되어야 한다', () => {
        const req: ApplyPostRequest = {
            id: 1,
            name: '홍길동',
            studentId: '20231234',
            email: 'hong@test.com',
            phone: 1234567890,
            major: '컴퓨터공학',
            part: '프론트엔드',
            qustion: ['Q1', 'Q2'],
            link: 'https://github.com/hong'
        }
        expect(req.name).toBeTypeOf('string')
        expect(req.qustion).toBeInstanceOf(Array)
    })

    it('ApplyDraftPostRequest 타입이 올바르게 생성되어야 한다', () => {
        const req: ApplyDraftPostRequest = {
            id: 2,
            name: '이몽룡',
            studentId: '20231235',
            email: 'lee@test.com',
            phone: 9876543210,
            major: '전자공학',
            part: '백엔드',
            qustion: ['Q1'],
            link: 'https://github.com/lee'
        }
        expect(req.id).toBeTypeOf('number')
        expect(req.link).toMatch(/^https?:\/\//)
    })

    it('ApplyGetResponse 타입이 올바르게 생성되어야 한다', () => {
        const res: ApplyGetResponse = {
            id: 3,
            name: '성춘향',
            studentId: '20231236',
            email: 'sung@test.com',
            phone: 11112222,
            major: '경영학',
            part: '디자인',
            qustion: ['Q1', 'Q2', 'Q3'],
            link: 'https://github.com/sung'
        }
        expect(res.studentId).toBeTypeOf('string')
        expect(res.qustion.length).toBeGreaterThan(0)
    })

    it('ApplyPutRequest 타입이 올바르게 생성되어야 한다', () => {
        const req: ApplyPutRequest = {
            name: '임꺽정',
            studentId: '20231237',
            email: 'lim@test.com',
            phone: 22221111,
            major: '수학',
            part: '기획',
            qustion: ['Q1'],
            link: 'https://github.com/lim'
        }
        expect(req.major).toBeTypeOf('string')
    })

    it('합격 결과가 pass인 ApplyResultGetResponse 타입이 올바르게 생성되어야 한다', () => {
        const res: ApplyResultGetResponse = { result: 'pass' }
        expect(res.result).toBe('pass')
    })

    it('불합격 결과가 fail인 ApplyResultGetResponse 타입이 올바르게 생성되어야 한다', () => {
        const res: ApplyResultGetResponse = { result: 'fail' }
        expect(res.result).toBe('fail')
    })
})
