import { http, HttpResponse, delay } from 'msw'
import type {
    MemberListResponse
} from '@/types/member'
import { baseURL } from '@/api/client'
import type {
    GetApplicantsParams,
    GetApplicantDetailParams,
    UpdateMemberRoleParams,
    ArchiveGalleryPostRequest,
    ArchiveProjectPostRequest,
    RecruitQuestionPostRequest
} from '@/types/admin'

// 샘플 데이터 (실제 프로젝트에 맞게 보완 필요)
const applicants = [
    { id: '1', name: '홍길동', part: 'FRONTEND', round: '1', status: 'PASS' },
    { id: '2', name: '김철수', part: 'BACKEND', round: '2', status: 'FAIL' },
    { id: '3', name: '이영희', part: 'AI', round: '1', status: 'PENDING' },
    { id: '4', name: '박민수', part: 'DESIGN', round: '1', status: 'PASS' },
    { id: '5', name: '정수진', part: 'PM', round: '2', status: 'PENDING' }
]

const members = [
    { id: '1', name: '홍길동', role: 'MEMBER', part: 'FRONTEND', year: '2024' },
    { id: '2', name: '김철수', role: 'ADMIN', part: 'BACKEND', year: '2024' }
]

const gallery = [
    {
        id: '1',
        title: '갤러리1',
        content: '내용',
        imageUrl: 'https://picsum.photos/510/280',
        year: '2024'
    }
]

const projects = [
    {
        id: '1',
        title: '프로젝트1',
        description: '설명',
        team: 'A',
        year: '2024'
    }
]

const adminHandlers = [
    // 지원자 현황 조회
    http.get(`${baseURL}/admin/recruit/applicants`, async ({ request }) => {
        const url = new URL(request.url)
        const part = url.searchParams.get('part')
        const round = url.searchParams.get('round')
        let filtered = applicants
        if (part) filtered = filtered.filter(a => a.part === part)
        if (round) filtered = filtered.filter(a => a.round === round)
        await delay(100)
        return HttpResponse.json({ 
            data: { 
                applicants: filtered 
            } 
        }, { status: 200 })
    }),

    // 지원자 응답 확인
    http.get(
        `${baseURL}/admin/recruit/applicants/:applicationId`,
        async ({ params, request }) => {
            const { applicationId } = params
            const url = new URL(request.url)
            const part = url.searchParams.get('part')
            const found = applicants.find(a => a.id === applicationId)
            if (!found)
                return HttpResponse.json(
                    { message: 'Not found' },
                    { status: 404 }
                )
            await delay(100)
            return HttpResponse.json({ ...found, part }, { status: 200 })
        }
    ),

    // 합격 지원자 아기사자 승격
    http.post(`${baseURL}/admin/recurit/pass/:round`, async () => {
        await delay(100)
        return HttpResponse.json({ status: 'success' }, { status: 200 })
    }),

    // 합격자 메일 발송
    http.post(
        `${baseURL}/admin/recruit/notifications/pass/:round`,
        async () => {
            await delay(100)
            return HttpResponse.json({ status: 'sent' }, { status: 200 })
        }
    ),

    // 멤버 권한 수정
    http.put(
        `${baseURL}/admin/member/:memberId`,
        async ({ params, request }) => {
            const { memberId } = params
            const body = await request.json()
            const member = members.find(m => m.id === memberId)
            if (!member)
                return HttpResponse.json(
                    { message: 'Not found' },
                    { status: 404 }
                )
            if (typeof body === 'object' && body !== null) {
                if ('role' in body) member.role = body.role
                if ('part' in body) member.part = body.part
            }
            await delay(100)
            return HttpResponse.json(member, { status: 200 })
        }
    ),



    // 세션 과제 및 자료 업로드
    http.post(
        `${baseURL}/admin/session/:sessionId/assignment`,
        async ({ params, request }) => {
            const { sessionId } = params
            const body = await request.json()
            await delay(100)
            return HttpResponse.json(
                {
                    ...(typeof body === 'object' && body !== null ? body : {}),
                    sessionId
                },
                { status: 201 }
            )
        }
    ),

    // 세션 과제 및 자료 수정
    http.patch(
        `${baseURL}/admin/sessions/:sessionId`,
        async ({ params, request }) => {
            const { sessionId } = params
            const body = await request.json()
            await delay(100)
            return HttpResponse.json(
                {
                    ...(typeof body === 'object' && body !== null ? body : {}),
                    sessionId
                },
                { status: 200 }
            )
        }
    ),

    // 세션 과제 및 자료 삭제
    http.delete(`${baseURL}/admin/sessions/:sessionId`, async () => {
        await delay(100)
        return HttpResponse.json({ status: 'deleted' }, { status: 200 })
    }),

    // 갤러리 게시물 업로드
    http.post(`${baseURL}/admin/archive/gallery`, async ({ request }) => {
        const body = await request.json()
        let toPush: {
            id: string
            title: string
            content: string
            imageUrl: string
            year: string
        }
        if (typeof body === 'object' && body !== null) {
            toPush = {
                id: String(gallery.length + 1),
                title:
                    'title' in body && typeof body.title === 'string'
                        ? body.title
                        : '',
                content:
                    'content' in body && typeof body.content === 'string'
                        ? body.content
                        : '',
                imageUrl:
                    'imageUrl' in body && typeof body.imageUrl === 'string'
                        ? body.imageUrl
                        : '',
                year:
                    'year' in body && typeof body.year === 'string'
                        ? body.year
                        : ''
            }
        } else {
            toPush = {
                id: String(gallery.length + 1),
                title: '',
                content: '',
                imageUrl: '',
                year: ''
            }
        }
        gallery.push(toPush)
        await delay(100)
        return HttpResponse.json(toPush, { status: 201 })
    }),

    // 갤러리 게시물 삭제
    http.delete(
        `${baseURL}/admin/archive/gallery/:galleryId`,
        async ({ params }) => {
            const { galleryId } = params
            const idx = gallery.findIndex(g => g.id === galleryId)
            if (idx === -1)
                return HttpResponse.json(
                    { message: 'Not found' },
                    { status: 404 }
                )
            gallery.splice(idx, 1)
            await delay(100)
            return HttpResponse.json({ status: 'deleted' }, { status: 200 })
        }
    ),

    // 갤러리 게시물 수정
    http.put(`${baseURL}/admin/archive/gallery`, async ({ request }) => {
        const body = await request.json()
        await delay(100)
        return HttpResponse.json(
            typeof body === 'object' && body !== null
                ? body
                : { title: '', content: '', imageUrl: '', year: '' },
            { status: 200 }
        )
    }),

    // 프로젝트 게시물 업로드
    http.post(`${baseURL}/admin/archive/projects`, async ({ request }) => {
        const body = await request.json()
        let toPush: {
            id: string
            title: string
            description: string
            team: string
            year: string
        }
        if (typeof body === 'object' && body !== null) {
            toPush = {
                id: String(projects.length + 1),
                title:
                    'title' in body && typeof body.title === 'string'
                        ? body.title
                        : '',
                description:
                    'description' in body &&
                    typeof body.description === 'string'
                        ? body.description
                        : '',
                team:
                    'team' in body && typeof body.team === 'string'
                        ? body.team
                        : '',
                year:
                    'year' in body && typeof body.year === 'string'
                        ? body.year
                        : ''
            }
        } else {
            toPush = {
                id: String(projects.length + 1),
                title: '',
                description: '',
                team: '',
                year: ''
            }
        }
        projects.push(toPush)
        await delay(100)
        return HttpResponse.json(toPush, { status: 201 })
    }),

    // 프로젝트 게시물 삭제
    http.delete(
        `${baseURL}/admin/archive/projects/:projectId`,
        async ({ params }) => {
            const { projectId } = params
            const idx = projects.findIndex(p => p.id === projectId)
            if (idx === -1)
                return HttpResponse.json(
                    { message: 'Not found' },
                    { status: 404 }
                )
            projects.splice(idx, 1)
            await delay(100)
            return HttpResponse.json({ status: 'deleted' }, { status: 200 })
        }
    ),

    // 지원서 질문 항목 업로드
    http.post(`${baseURL}/admin/recruit/question`, async ({ request }) => {
        const body = await request.json()
        const url = new URL(request.url)
        const part = url.searchParams.get('part')
        await delay(100)
        return HttpResponse.json(
            typeof body === 'object' && body !== null
                ? body
                : { questions: [] },
            { status: 201 }
        )
    }),

    // 지원서 질문 항목 수정
    http.patch(`${baseURL}/admin/recruit/questions`, async ({ request }) => {
        const body = await request.json()
        await delay(100)
        return HttpResponse.json(
            typeof body === 'object' && body !== null
                ? body
                : { questions: [] },
            { status: 200 }
        )
    })
]

export default adminHandlers
