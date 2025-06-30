import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import RecruitPage from '@/pages/IntroductionPage' // 경로 맞춰서!
import IntroductionPage from '@/pages/IntroductionPage'
import ApplyPage from '@/pages/ApplyPage'

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
                        element={<IntroductionPage />}
                        path="/recruit" />
                    <Route
                        element={<ApplyPage />}
                        path="/apply" />
                </Route>
            </Routes>
        </>
    )
}
