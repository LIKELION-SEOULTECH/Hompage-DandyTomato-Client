import { describe, it, expect } from 'vitest'
import {
    getSessionAssignmentPage,
    getSessionDetail,
    postSessionAssignmentSubmission,
    updateSessionAssignment,
    postSessionQuiz
} from '@/api/session'
import type {
    SessionQuizCreateRequest,
    SessionQuizCreateResponse
} from '@/types/session'



// 2. 세션 과제 페이지 조회
describe('getSessionAssignmentPage', () => {
    it('세션 과제 페이지 조회 성공 (200)', async () => {
        const res = await getSessionAssignmentPage('frontend')
        expect(res.status).toBe('success')
        expect(res.data?.sessions[0]).toHaveProperty('title', 'frontend 세션 1주차')
        expect(res.data?.sessions[0]).toHaveProperty('week', 1)
        expect(res.data?.sessions[0]).toHaveProperty('isSubmitted', true)
    })
    
    it('세션 과제 페이지 조회 - 주차 필터링 (200)', async () => {
        const res = await getSessionAssignmentPage('frontend', 2)
        expect(res.status).toBe('success')
        expect(res.data?.sessions[0]).toHaveProperty('week', 2)
    })
})

// 3. 세션 상세 조회 (GET /session/:sessionId)
describe('getSessionDetail', () => {
    it('세션 상세 조회 성공 (200)', async () => {
        const res = await getSessionDetail('session-1')
        expect(res.status).toBe('success')
        expect(res.data?.session).toHaveProperty('id', 'session-1')
        expect(res.data?.session).toHaveProperty('title', '기획 실습 - 인터뷰 질문 만들기')
        expect(res.data?.session).toHaveProperty('year', 13)
        expect(res.data?.session).toHaveProperty('part', 'BACKEND')
        expect(Array.isArray(res.data?.session.resources)).toBe(true)
    })
    it('세션 상세 조회 실패 (404)', async () => {
        await expect(getSessionDetail('not-found')).rejects.toBeTruthy()
    })
})

// 4. 세션 과제 제출 (POST /session/:assignmentId/assignment)
describe('postSessionAssignmentSubmission', () => {
    const assignmentId = 'assignment-1'
    const links = 'www.example.com, www.github.com'
    
    it('세션 과제 제출 성공 (201)', async () => {
        const res = await postSessionAssignmentSubmission(
            assignmentId,
            links
        )
        expect(res.status).toBe('success')
        expect(res.data).toHaveProperty('message')
        expect(res.data?.message).toBe('정상적으로 등록되었습니다')
    })
    
    it('세션 과제 제출 실패 (400) - links 누락', async () => {
        await expect(
            postSessionAssignmentSubmission(assignmentId, '')
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    
    it('세션 과제 제출 실패 (404)', async () => {
        await expect(
            postSessionAssignmentSubmission('not-found', links)
        ).rejects.toMatchObject({
            response: { status: 404 }
        })
    })
    
    it('세션 과제 제출 실패 (만료된 과제)', async () => {
        await expect(
            postSessionAssignmentSubmission('expired', links)
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    
    it('세션 과제 제출 실패 (이미 제출된 과제)', async () => {
        await expect(
            postSessionAssignmentSubmission('already-submitted', links)
        ).rejects.toMatchObject({
            response: { status: 409 }
        })
    })
})

// 5. 세션 과제 수정 (PUT /session/:assignmentId/assignment)
describe('updateSessionAssignment', () => {
    const assignmentId = 'assignment-1'
    const links = 'www.example.com, www.github.com'
    
    it('세션 과제 수정 성공 (201)', async () => {
        const res = await updateSessionAssignment(
            assignmentId,
            links
        )
        expect(res.status).toBe('success')
        expect(res.data).toHaveProperty('message')
        expect(res.data?.message).toBe('세션 과제가 정상적으로 수정되었습니다')
    })
    
    it('세션 과제 수정 실패 (400) - links 누락', async () => {
        await expect(
            updateSessionAssignment(assignmentId, '')
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    
    it('세션 과제 수정 실패 (404)', async () => {
        await expect(
            updateSessionAssignment('not-found', links)
        ).rejects.toMatchObject({
            response: { status: 404 }
        })
    })
    
    it('세션 과제 수정 실패 (만료된 과제)', async () => {
        await expect(
            updateSessionAssignment('expired', links)
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
})

// 6. 복습 퀴즈 생성 요청
describe('postSessionQuiz', () => {
    const req: SessionQuizCreateRequest = {
        sessionIds: ['session-1', 'session-2']
    }
    it('복습 퀴즈 생성 성공 (200)', async () => {
        const res: SessionQuizCreateResponse = await postSessionQuiz(req)
        expect(Array.isArray(res.quiz)).toBe(true)
        expect(res.quiz[0]).toHaveProperty('question')
        expect(res.quiz[0]).toHaveProperty('options')
        expect(res.quiz[0]).toHaveProperty('answer')
    })
    it('복습 퀴즈 생성 실패 (빈 세션 ID 목록)', async () => {
        await expect(postSessionQuiz({ sessionIds: [] })).rejects.toBeTruthy()
    })
})
