import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import GalleryPage from './pages/GalleryPage'
import MyPage from './pages/MyPage'
import ProjectPage from './pages/ProejctPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import SessionResourcesPage from './pages/SessionResourcesPage'
import SessionAssignmentPage from './pages/SessionAssignmentPage'
import SessionAIQuizPage from './pages/SessionAIQuizPage'
import MemberPage from './pages/MemberPage'

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
                        element={<ProjectPage />}
                        path="/project"
                    />
                    <Route
                        element={<GalleryPage />}
                        path="/gallery"
                    />
                    <Route
                        element={<ProjectDetailPage />}
                        path="/project/:id"
                    />
                    <Route
                        element={<MyPage />}
                        path="/myPage"
                    />
                    <Route
                        element={<SessionResourcesPage />}
                        path="/session-resources"
                    />
                    <Route
                        element={<SessionAssignmentPage />}
                        path="/session-assignment"
                    />
                    <Route
                        element={<SessionAIQuizPage />}
                        path="/session-ai-quiz"
                    />
                    <Route
                        element={<MemberPage />}
                        path="/members"
                    />
                </Route>
            </Routes>
        </>
    )
}
