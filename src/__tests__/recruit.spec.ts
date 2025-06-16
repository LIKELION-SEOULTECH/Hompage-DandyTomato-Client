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

describe('Recruit API DTO', () => {
    it('should create a valid RecruitPostRequest', () => {
        const req: RecruitPostRequest = { email: 'test@example.com' }
        expect(req.email).toBeTypeOf('string')
    })

    it('should create a valid ApplyPostRequest', () => {
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

    it('should create a valid ApplyDraftPostRequest', () => {
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

    it('should create a valid ApplyGetResponse', () => {
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

    it('should create a valid ApplyPutRequest', () => {
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

    it('should create a valid ApplyResultGetResponse (pass)', () => {
        const res: ApplyResultGetResponse = { result: 'pass' }
        expect(res.result).toBe('pass')
    })

    it('should create a valid ApplyResultGetResponse (fail)', () => {
        const res: ApplyResultGetResponse = { result: 'fail' }
        expect(res.result).toBe('fail')
    })
})
