import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import RecruitPage from '@/components/introduction/RecruitPage' // 경로 맞춰서!

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
                    element={<RecruitPage />}
                    path="/recruit" />
                </Route>
            </Routes>
        </>
    )
}
