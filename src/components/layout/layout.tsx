import { Outlet } from 'react-router-dom'
import GlobalNavigationButton from '@/components/GlobalNavigationButton'

export default function Layout() {
    return (
        <>
            <GlobalNavigationButton />
            <Outlet />
        </>
    )
}
