import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import RecruitPage from '@/components/introduction/IntroductionPage' // 경로 맞춰서!
import IntroductionPage from '@/components/introduction/IntroductionPage'
import ApplyPage from '@/pages/ApplyPage'
import ApplyPartPage from '@/pages/ApplyPartPage'

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
                    <Route
                        element={<ApplyPartPage />}
                        path="/apply/part" />
                </Route>
            </Routes>
        </>
    )
}
