import { http, HttpResponse, delay } from 'msw'
import type {
    MemberInfoPostRequest,
    MemberInfoResponse,
    MemberListResponse,
    MemberListItem
} from '@/types/member'
import { baseURL } from '@/api/client'
const mockMember: MemberInfoResponse = {
    id: 'test-id',
    contactEmail: 'test@example.com',
    name: 'Test User',
    major: 'Computer Science',
    year: 12,
    profileUrl: 'https://example.com/profile.jpg',
    introduce: 'Hello, I am a test user',
    part: 'FRONTEND',
    tech: 'React, TypeScript',
    link: 'https://github.com/testuser',
    role: 'MEMBER',
    created_at: '2024-01-01T00:00:00Z'
}

const mockMembers: MemberListItem[] = Array.from({ length: 30 }, (_, i) => ({
    id: `member-${i + 1}`,
    name: `Member ${i + 1}`,
    bio: `Bio for member ${i + 1}`,
    position: 'Frontend Developer',
    skills: ['React', 'TypeScript'],
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    portfolio_url: 'https://portfolio.com',
    profile_image: 'https://example.com/image.jpg',
    join_date: '2024-01-01T00:00:00Z',
    project_count: Math.floor(Math.random() * 10),
    is_active: true
}))

const memberHandlers = [
    // POST /api/v1/member-info
    http.post(`${baseURL}/member-info`, async ({ request }) => {
        const formData = await request.formData()
        const rawData = Object.fromEntries(formData.entries())
        const data: MemberInfoPostRequest = {
            id: rawData.id as string,
            contactEmail: rawData.contactEmail as string,
            name: rawData.name as string,
            major: rawData.major as string,
            profileUrl: rawData.profileUrl as string,
            introduce: rawData.introduce as string,
            tech: rawData.tech as string,
            link: rawData.link as string
        }

        if (data.name.length < 2 || data.name.length > 50) {
            return HttpResponse.json(
                { message: '이름은 2자 이상 50자 이하여야 합니다.' },
                { status: 400 }
            )
        }

        const response: MemberInfoResponse = {
            ...mockMember,
            ...data
        }

        return HttpResponse.json(response, { status: 201 })
    }),

    // GET /api/v1/member
    http.get(`${baseURL}/member`, async ({ request }) => {
        const url = new URL(request.url)
        const page = parseInt(url.searchParams.get('page') || '1')
        const size = parseInt(url.searchParams.get('size') || '30')
        const part = url.searchParams.get('part')

        await delay(500) // Simulate network delay

        const filteredMembers = part
            ? mockMembers.filter(member =>
                  member.position.toUpperCase().includes(part)
              )
            : mockMembers

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

    // GET /api/v1/member-info/:memberId
    http.get(`${baseURL}/member-info/:memberId`, ({ params }) => {
        const { memberId } = params

        if (memberId === 'not-found') {
            return HttpResponse.json(
                { message: '멤버를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }

        const response: MemberInfoResponse = {
            ...mockMember,
            id: memberId as string
        }

        return HttpResponse.json(response, { status: 200 })
    }),

    // PATCH /api/v1/member-info/:memberId
    http.patch(
        `${baseURL}/member-info/:memberId`,
        async ({ request, params }) => {
            const { memberId } = params

            if (memberId === 'not-found') {
                return HttpResponse.json(
                    { message: '멤버를 찾을 수 없습니다.' },
                    { status: 404 }
                )
            }

            const formData = await request.formData()
            const rawData = Object.fromEntries(formData.entries())
            const data: MemberInfoPostRequest = {
                id: rawData.id as string,
                contactEmail: rawData.contactEmail as string,
                name: rawData.name as string,
                major: rawData.major as string,
                profileUrl: rawData.profileUrl as string,
                introduce: rawData.introduce as string,
                tech: rawData.tech as string,
                link: rawData.link as string
            }

            const response: MemberInfoResponse = {
                ...mockMember,
                ...data,
                id: memberId as string
            }

            return HttpResponse.json(response, { status: 200 })
        }
    ),

    // DELETE /api/v1/member-info/:memberId
    http.delete(`${baseURL}/member-info/:memberId`, ({ request, params }) => {
        const { memberId } = params

        if (memberId === 'not-found') {
            return HttpResponse.json(
                { message: '멤버를 찾을 수 없습니다.' },
                { status: 404 }
            )
        }

        return HttpResponse.json(
            { message: '멤버 소개가 삭제되었습니다.' },
            { status: 200 }
        )
    })
]

export default memberHandlers
