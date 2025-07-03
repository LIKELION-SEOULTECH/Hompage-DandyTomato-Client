import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GlobalNavigationButton from '@/components/ㅎlobalNavigationButton'
import { BrowserRouter } from 'react-router-dom'

describe('GlobalNavigation', () => {
    it('GNB에 모든 메뉴가 렌더링되는지 확인', () => {
        render(
            <BrowserRouter>
                <GlobalNavigationButton />
            </BrowserRouter>
        )

        // 메뉴 텍스트가 모두 보이는지 확인
        expect(screen.getByText('ABOUT US')).toBeInTheDocument()
        expect(screen.getByText('ARCHIVE')).toBeInTheDocument()
        expect(screen.getByText('MEMBERS')).toBeInTheDocument()
        expect(screen.getByText('RECRUIT')).toBeInTheDocument()
        expect(screen.getByText('SIGN UP')).toBeInTheDocument()
        expect(screen.getByText('LOGIN')).toBeInTheDocument()
    })

    it('각 메뉴가 올바른 경로로 이동하는지 확인', () => {
        render(
            <BrowserRouter>
                <GlobalNavigationButton />
            </BrowserRouter>
        )

        expect(screen.getByText('ABOUT US').closest('a')).toHaveAttribute(
            'href',
            '/'
        )
        expect(screen.getByText('ARCHIVE').closest('a')).toHaveAttribute(
            'href',
            '/archive'
        )
        expect(screen.getByText('MEMBERS').closest('a')).toHaveAttribute(
            'href',
            '/members'
        )
        expect(screen.getByText('RECRUIT').closest('a')).toHaveAttribute(
            'href',
            '/recruit'
        )
        expect(screen.getByText('SIGN UP').closest('a')).toHaveAttribute(
            'href',
            '/signup'
        )
        expect(screen.getByText('LOGIN').closest('a')).toHaveAttribute(
            'href',
            '/login'
        )
    })
})
