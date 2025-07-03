import { http, HttpResponse, delay } from 'msw'
import type {
    MemberPostRequest,
    MemberResponse,
    MemberListResponse,
    MemberListItem
} from '@/types/member'
import { baseURL } from '@/api/client'

const mockMember: MemberResponse = {
    id: 'test-id',
    name: 'Test User',
    part: 'FRONTEND',
    year: 2024,
    major: 'Computer Science',
    email: 'test@example.com',
    phone: '010-1234-5678',
    github_url: 'https://github.com/testuser',
    blog_url: 'https://blog.com/testuser',
    profile_image_url: 'https://example.com/profile.jpg',
    description: 'Hello, I am a test user',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
}

const mockMembers: MemberListItem[] = Array.from({ length: 30 }, (_, i) => ({
    id: `member-${i + 1}`,
    name: `Member ${i + 1}`,
    part: 'FRONTEND',
    year: 2024,
    major: 'Computer Science',
    profile_image_url: 'https://example.com/image.jpg'
}))

const memberHandlers = [
    // POST /api/v1/member
    http.post(`${baseURL}/member`, async ({ request }) => {
        const formData = await request.formData()
        const rawData = Object.fromEntries(formData.entries())
        const data: MemberPostRequest = {
            name: rawData.name as string,
            part: rawData.part as string,
            year: Number(rawData.year),
            major: rawData.major as string,
            email: rawData.email as string,
            phone: rawData.phone as string,
            github_url: rawData.github_url as string,
            blog_url: rawData.blog_url as string,
            description: rawData.description as string
        }
        if (!data.name || data.name.length < 2) {
            return HttpResponse.json(
                {
                    code: 'INVALID_NAME',
                    message: '이름은 2자 이상이어야 합니다.'
                },
                { status: 400 }
            )
        }
        const response: MemberResponse = {
            ...mockMember,
            ...data,
            id: `member-${Math.floor(Math.random() * 10000)}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        return HttpResponse.json(response, { status: 201 })
    }),

    // GET /api/v1/member
    http.get(`${baseURL}/member`, async ({ request }) => {
        const url = new URL(request.url)
        const page = parseInt(url.searchParams.get('page') || '1')
        const size = parseInt(url.searchParams.get('size') || '30')
        const part = url.searchParams.get('part')
        const year = url.searchParams.get('year')
        const keyword = url.searchParams.get('keyword')

        await delay(100)

        let filteredMembers = mockMembers
        if (part) filteredMembers = filteredMembers.filter(m => m.part === part)
        if (year)
            filteredMembers = filteredMembers.filter(
                m => m.year === Number(year)
            )
        if (keyword)
            filteredMembers = filteredMembers.filter(m =>
                m.name.includes(keyword)
            )

        const start = (page - 1) * size
        const end = start + size
        const paginatedMembers = filteredMembers.slice(start, end)

        const response: MemberListResponse = {
            members: paginatedMembers,
            pagination: {
                page,
                size,
                total: filteredMembers.length,
                total_pages: Math.ceil(filteredMembers.length / size)
            }
        }
        return HttpResponse.json(response, { status: 200 })
    }),

    // GET /api/v1/member/:memberId
    http.get(`${baseURL}/member/:memberId`, ({ params }) => {
        const { memberId } = params
        if (memberId === 'not-found') {
            return HttpResponse.json(
                { code: 'NOT_FOUND', message: '멤버를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }
        const response: MemberResponse = {
            ...mockMember,
            id: memberId as string
        }
        return HttpResponse.json(response, { status: 200 })
    }),

    // PATCH /api/v1/member/:memberId
    http.patch(`${baseURL}/member/:memberId`, async ({ request, params }) => {
        const { memberId } = params
        if (memberId === 'not-found') {
            return HttpResponse.json(
                { code: 'NOT_FOUND', message: '멤버를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }
        const formData = await request.formData()
        const rawData = Object.fromEntries(formData.entries())
        const data: Partial<MemberPostRequest> = {
            name: rawData.name as string,
            part: rawData.part as string,
            year: rawData.year ? Number(rawData.year) : undefined,
            major: rawData.major as string,
            email: rawData.email as string,
            phone: rawData.phone as string,
            github_url: rawData.github_url as string,
            blog_url: rawData.blog_url as string,
            description: rawData.description as string
        }
        const response: MemberResponse = {
            ...mockMember,
            ...data,
            id: memberId as string,
            updated_at: new Date().toISOString()
        }
        return HttpResponse.json(response, { status: 200 })
    }),

    // DELETE /api/v1/member/:memberId
    http.delete(`${baseURL}/member/:memberId`, ({ params }) => {
        const { memberId } = params
        if (memberId === 'not-found') {
            return HttpResponse.json(
                { code: 'NOT_FOUND', message: '멤버를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }
        return HttpResponse.json(
            { message: '멤버가 삭제되었습니다.' },
            { status: 200 }
        )
    })
]

export default memberHandlers
