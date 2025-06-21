import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import ArchivePage from './pages/archive'
import MyPage from './pages/myPage'

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        element={<MainPage />}
                        path="/"
                    />
                    <Route
                        element={<ArchivePage />}
                        path="/archive"
                    />
                    <Route
                        element={<MyPage />}
                        path="/myPage"
                    />
                </Route>
            </Routes>
        </>
    )
}
