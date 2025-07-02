import { describe, expect, it } from 'vitest'
import {
    postMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember
} from '../api/member'
import type { MemberPostRequest } from '@/types/member'

describe('Member API', () => {
    const mockMemberData: MemberPostRequest = {
        name: 'Test User',
        part: 'FRONTEND',
        year: 2024,
        major: 'Computer Science',
        email: 'test@example.com',
        phone: '010-1234-5678',
        github_url: 'https://github.com/testuser',
        blog_url: 'https://blog.com/testuser',
        description: 'Hello, I am a test user'
    }

    describe('postMember', () => {
        it('멤버 생성 성공', async () => {
            const response = await postMember(mockMemberData)
            expect(response).toMatchObject({
                name: mockMemberData.name,
                part: mockMemberData.part,
                year: mockMemberData.year
            })
        })
        it('멤버 생성 실패 (이름 길이 오류)', async () => {
            const invalidData = { ...mockMemberData, name: 'A' }
            await expect(postMember(invalidData)).rejects.toThrow()
        })
    })

    describe('getMembers', () => {
        it('멤버 목록 조회 성공', async () => {
            const response = await getMembers()
            expect(response).toHaveProperty('members')
            expect(response.members).toBeInstanceOf(Array)
            expect(response).toHaveProperty('pagination')
        })
        it('멤버 목록 조회 성공 (페이지네이션 파라미터 처리)', async () => {
            const params = { page: 2, size: 20 }
            const response = await getMembers(params)
            expect(response.pagination.page).toBe(params.page)
            expect(response.pagination.size).toBe(params.size)
        })
        it('멤버 목록 조회 성공 (파트/연도/키워드 필터링)', async () => {
            const params = { part: 'FRONTEND', year: 2024, keyword: 'Member' }
            const response = await getMembers(params)
            expect(response.members.length).toBeGreaterThanOrEqual(0)
        })
    })

    describe('getMember', () => {
        it('멤버 단일 조회 성공', async () => {
            const response = await getMember('test-id')
            expect(response).toMatchObject({
                id: 'test-id',
                name: expect.any(String),
                part: expect.any(String)
            })
        })
        it('멤버 단일 조회 실패 (멤버 없음)', async () => {
            await expect(getMember('not-found')).rejects.toThrow()
        })
    })

    describe('updateMember', () => {
        it('멤버 수정 성공', async () => {
            const updateData = { name: 'Updated Name', description: 'Updated' }
            const response = await updateMember('test-id', updateData)
            expect(response).toMatchObject({
                id: 'test-id',
                name: updateData.name,
                description: updateData.description
            })
        })
        it('멤버 수정 실패 (멤버 없음)', async () => {
            await expect(
                updateMember('not-found', { name: 'New Name' })
            ).rejects.toThrow()
        })
    })

    describe('deleteMember', () => {
        it('멤버 삭제 성공', async () => {
            await expect(deleteMember('test-id')).resolves.not.toThrow()
        })
        it('멤버 삭제 실패 (멤버 없음)', async () => {
            await expect(deleteMember('not-found')).rejects.toThrow()
        })
    })
})
