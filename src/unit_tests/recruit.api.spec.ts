import { describe, it, expect } from 'vitest'
import { postApplicant, postApplicantDraft } from '@/api/recruit'
import type { ApplyGetResponse, ApplyPostRequest } from '@/types/recruit'

// postApplicant 함수 단위 테스트

describe('postApplicant API', () => {
    it('새로운 id가 포함된 ApplyGetResponse를 반환해야 한다', async () => {
        const res: ApplyGetResponse = await postApplicant(mockApplicant)
        expect(res).toHaveProperty('id')
        expect(res.name).toBe(mockApplicant.name)
        expect(res.email).toBe(mockApplicant.email)
        expect(typeof res.id).toBe('number')
        expect(res.id).not.toBe(0)
    })
})

describe('postApplicantDraft API', () => {
    it('새로운 id가 포함된 ApplyGetResponse(draft)를 반환해야 한다', async () => {
        const res: ApplyGetResponse = await postApplicantDraft(mockApplicant)
        expect(res).toHaveProperty('id')
        expect(res.name).toBe(mockApplicant.name)
        expect(res.email).toBe(mockApplicant.email)
        expect(typeof res.id).toBe('number')
        expect(res.id).not.toBe(0)
    })
})

export const mockApplicant: ApplyPostRequest = {
    id: 0,
    name: '테스트 지원자',
    studentId: '20239999',
    email: 'test@likelion.org',
    phone: 1012345678,
    major: '컴퓨터공학',
    part: '프론트엔드',
    qustion: ['왜 지원하셨나요?', '관심 기술은?'],
    link: 'https://github.com/test'
}
