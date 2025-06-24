import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import RecruitPage from '@/components/introduction/IntroductionPage' // 경로 맞춰서!
import IntroductionPage from '@/components/introduction/IntroductionPage'

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
                </Route>
            </Routes>
        </>
    )
}
