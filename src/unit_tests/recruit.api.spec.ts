import { describe, it, expect } from 'vitest'
import {
    postRecruitApplication,
    postRecruitDraft,
    getRecruitResult
} from '@/api/recruit'
import type {
    RecruitApplicationResponse,
    RecruitApplicationRequest
} from '@/types/recruit'

describe('postRecruitApplication API', () => {
    it('지원서 제출 성공', async () => {
        const res: RecruitApplicationResponse =
            await postRecruitApplication(mockApplicant)
        expect(res).toHaveProperty('id')
        expect(res.name).toBe(mockApplicant.name)
        expect(res.email).toBe(mockApplicant.email)
        expect(res.status).toBe('submitted')
        expect(typeof res.id).toBe('number')
        expect(res.id).not.toBe(0)
    })
    it('지원서 제출 실패 (필수 필드 누락)', async () => {
        const invalid = { ...mockApplicant, name: '' }
        await expect(postRecruitApplication(invalid as any)).rejects.toThrow()
    })
})

describe('postRecruitDraft API', () => {
    it('임시저장 성공', async () => {
        const res: RecruitApplicationResponse =
            await postRecruitDraft(mockApplicant)
        expect(res).toHaveProperty('id')
        expect(res.name).toBe(mockApplicant.name)
        expect(res.email).toBe(mockApplicant.email)
        expect(res.status).toBe('draft')
        expect(typeof res.id).toBe('number')
        expect(res.id).not.toBe(0)
    })
})

describe('getRecruitResult API', () => {
    it('합불 결과 조회 성공', async () => {
        const res = await getRecruitResult(1)
        expect(['pass', 'fail']).toContain(res.result)
    })
    it('합불 결과 조회 실패 (없는 지원서)', async () => {
        await expect(getRecruitResult(0)).rejects.toThrow()
    })
})

export const mockApplicant: RecruitApplicationRequest = {
    name: '테스트 지원자',
    student_id: '20239999',
    email: 'test@likelion.org',
    phone: '01012345678',
    major: '컴퓨터공학',
    part: '프론트엔드',
    answers: ['왜 지원하셨나요?', '관심 기술은?'],
    link: 'https://github.com/test'
}
