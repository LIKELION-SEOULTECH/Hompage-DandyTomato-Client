import { Outlet } from 'react-router-dom'
import GlobalNavigationButton from '@/components/globalNavigationButton'

export default function Layout() {
    return (
        <>
            <GlobalNavigationButton />
            <Outlet />
        </>
    )
}
