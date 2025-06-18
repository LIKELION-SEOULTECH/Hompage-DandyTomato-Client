import { describe, it, expect } from 'vitest'
import {
    getSessionAssignmentDetail,
    getSessionAssignmentPage,
    getSessionDetail,
    postSessionAssignmentSubmission,
    postSessionQuiz
} from '@/api/session'
import type {
    SessionQuizCreateRequest,
    SessionQuizCreateResponse
} from '@/types/session'

// 1. 세션 과제 상세 조회 (GET /session/assignment/:assignmentId)
describe('getSessionAssignmentDetail', () => {
    it('세션 과제 상세 조회 성공 (200)', async () => {
        const res = await getSessionAssignmentDetail('1')
        expect(Array.isArray(res.sessions[0].assignments)).toBe(true)
        expect(res.sessions[0].assignments[0]).toHaveProperty(
            'id',
            'assignment-1'
        )
        expect(res.sessions[0].assignments[0]).toHaveProperty('title', '과제1')
        expect(res.sessions[0].assignments[0]).toHaveProperty(
            'description',
            '과제1 설명'
        )
    })
})

// 2. 세션 과제 페이지 조회
describe('getSessionAssignmentPage', () => {
    it('세션 과제 페이지 조회 성공 (200)', async () => {
        const res = await getSessionAssignmentPage('frontend')
        expect(res.sessions[0]).toHaveProperty('title', 'frontend 세션')
        expect(Array.isArray(res.sessions[0].assignments)).toBe(true)
    })
})

// 3. 세션 상세 조회 (GET /session/:sessionId)
describe('getSessionDetail', () => {
    it('세션 상세 조회 성공 (200)', async () => {
        const res = await getSessionDetail('session-1')
        expect(res).toHaveProperty('id', 'session-1')
        expect(res).toHaveProperty('title')
        expect(res).toHaveProperty('content')
        expect(Array.isArray(res.assignments)).toBe(true)
    })
    it('세션 상세 조회 실패 (404)', async () => {
        await expect(getSessionDetail('not-found')).rejects.toBeTruthy()
    })
})

// 4. 세션 과제 제출 (POST /session/assignment/:part/submission)
describe('postSessionAssignmentSubmission', () => {
    const part = 'frontend'
    const assignmentId = 'assignment-1'
    const fileUrl = 'https://example.com/file.pdf'
    it('세션 과제 제출 성공 (201)', async () => {
        const res = await postSessionAssignmentSubmission(
            part,
            assignmentId,
            fileUrl
        )
        expect(res.status).toBe('success')
        expect(res.data).toHaveProperty('submission')
        expect(res.data.submission).toHaveProperty('assignmentId', assignmentId)
        expect(res.data.submission).toHaveProperty('fileUrl', fileUrl)
    })
    it('세션 과제 제출 실패 (400)', async () => {
        await expect(
            postSessionAssignmentSubmission(part, '', fileUrl)
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
        await expect(
            postSessionAssignmentSubmission(part, assignmentId, '')
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    it('세션 과제 제출 실패 (잘못된 파일 URL)', async () => {
        await expect(
            postSessionAssignmentSubmission(part, assignmentId, 'not-a-url')
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    it('세션 과제 제출 실패 (404)', async () => {
        await expect(
            postSessionAssignmentSubmission(part, 'not-found', fileUrl)
        ).rejects.toMatchObject({
            response: { status: 404 }
        })
    })
    it('세션 과제 제출 실패 (만료된 과제)', async () => {
        await expect(
            postSessionAssignmentSubmission(part, 'expired', fileUrl)
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
    it('세션 과제 제출 실패 (이미 제출된 과제)', async () => {
        await expect(
            postSessionAssignmentSubmission(part, 'already-submitted', fileUrl)
        ).rejects.toMatchObject({
            response: { status: 409 }
        })
    })
    it('세션 과제 제출 실패 (파일 크기 초과)', async () => {
        await expect(
            postSessionAssignmentSubmission(
                part,
                assignmentId,
                'https://example.com/large-file.pdf'
            )
        ).rejects.toMatchObject({
            response: { status: 400 }
        })
    })
})

// 5. 복습 퀴즈 생성 요청
describe('postSessionQuiz', () => {
    const req: SessionQuizCreateRequest = {
        sessionIds: ['session-1', 'session-2']
    }
    it('복습 퀴즈 생성 성공 (200)', async () => {
        const res: SessionQuizCreateResponse = await postSessionQuiz(req)
        expect(Array.isArray(res.quiz)).toBe(true)
        expect(res.quiz[0]).toHaveProperty('title')
        expect(res.quiz[0]).toHaveProperty('오지선다')
        expect(res.quiz[0]).toHaveProperty('answer')
        expect(res.quiz[0]).toHaveProperty('해설')
    })
    it('복습 퀴즈 생성 실패 (빈 세션 ID 목록)', async () => {
        await expect(postSessionQuiz({ sessionIds: [] })).rejects.toBeTruthy()
    })
})
