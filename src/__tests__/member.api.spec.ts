import { describe, expect, it } from 'vitest'
import {
    postMemberInfo,
    getMembers,
    getMemberInfo,
    updateMemberInfo,
    deleteMemberInfo
} from '../api/member'
import type { MemberInfoPostRequest } from '@/types/member'

describe('Member API', () => {
    const mockMemberData: MemberInfoPostRequest = {
        id: 'test-id',
        contactEmail: 'test@example.com',
        name: 'Test User',
        major: 'Computer Science',
        profileUrl: 'https://example.com/profile.jpg',
        introduce: 'Hello, I am a test user with more than 10 characters',
        tech: 'React, TypeScript',
        link: 'https://github.com/testuser'
    }

    describe('postMemberInfo', () => {
        it('멤버 소개 생성 성공', async () => {
            const response = await postMemberInfo(mockMemberData)

            expect(response).toMatchObject({
                id: mockMemberData.id,
                name: mockMemberData.name,
                part: expect.any(String),
                role: expect.any(String)
            })
        })

        it('멤버 소개 생성 실패 (이름 길이 오류)', async () => {
            const invalidData = {
                ...mockMemberData,
                name: 'A' // Too short
            }

            await expect(postMemberInfo(invalidData)).rejects.toThrow()
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

        it('멤버 목록 조회 성공 (파트 필터링)', async () => {
            const params = { part: 'FRONTEND' as const }
            const response = await getMembers(params)

            expect(response.members.length).toBeGreaterThan(0)
        })
    })

    describe('getMemberInfo', () => {
        it('멤버 소개 조회 성공', async () => {
            const response = await getMemberInfo('test-id')

            expect(response).toMatchObject({
                id: 'test-id',
                name: expect.any(String),
                part: expect.any(String)
            })
        })

        it('멤버 소개 조회 실패 (멤버 없음)', async () => {
            await expect(getMemberInfo('not-found')).rejects.toThrow()
        })
    })

    describe('updateMemberInfo', () => {
        it('멤버 소개 수정 성공', async () => {
            const updateData = {
                name: 'Updated Name',
                introduce: 'Updated introduction'
            }

            const response = await updateMemberInfo('test-id', updateData)

            expect(response).toMatchObject({
                id: 'test-id',
                name: updateData.name,
                introduce: updateData.introduce
            })
        })

        it('멤버 소개 수정 실패 (멤버 없음)', async () => {
            await expect(
                updateMemberInfo('not-found', { name: 'New Name' })
            ).rejects.toThrow()
        })
    })

    describe('deleteMemberInfo', () => {
        it('멤버 소개 삭제 성공', async () => {
            await expect(deleteMemberInfo('test-id')).resolves.not.toThrow()
        })

        it('멤버 소개 삭제 실패 (멤버 없음)', async () => {
            await expect(deleteMemberInfo('not-found')).rejects.toThrow()
        })
    })
})
