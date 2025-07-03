import MainPage from '@/components/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/layout'
import IntroductionPage from '@/pages/IntroductionPage'
import ApplyPage from '@/pages/ApplyPage'
import ApplyPartPage from '@/pages/ApplyPartPage'
import GalleryPage from './pages/GalleryPage'
import MyPage from './pages/myPage'
import ProjectPage from './pages/ProejctPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import SessionResourcesPage from './pages/SessionResourcesPage'
import SessionAssignmentPage from './pages/SessionAssignmentPage'
import SessionAIQuizPage from './pages/SessionAIQuizPage'
import MemberPage from './pages/MemberPage'
import MyPageEdit from './pages/MyPageEdit'
import ArchiveAdminPage from './pages/admin/ArchiveAdminPage'
import AuthAdminPage from './pages/admin/AuthAdminPage'
import RecruitAdminPage from './pages/admin/RecruitAdminPage'
import SessionAdminPage from './pages/admin/SessionAdminPage'
import SessionUploadAdminPage from './pages/admin/SessionUploadAdminPage'
import RecruitQuestionAdminPage from './pages/admin/RecruitQuestionAdminPage'

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
                        path="/recruit"
                    />
                    <Route
                        element={<ApplyPage />}
                        path="/apply"
                    />
                    <Route
                        element={<ApplyPartPage />}
                        path="/apply/part"
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
                    <Route
                        element={<MyPageEdit />}
                        path="/mypage/edit"
                    />
                    <Route
                        element={<ArchiveAdminPage />}
                        path="/admin/archive"
                    />
                    <Route
                        element={<SessionAdminPage />}
                        path="/admin/session"
                    />
                    <Route
                        element={<AuthAdminPage />}
                        path="/admin/auth"
                    />
                    <Route
                        element={<RecruitAdminPage />}
                        path="/admin/recruit"
                    />
                    <Route
                        element={<SessionUploadAdminPage />}
                        path="/admin/session-upload"
                    />
                    <Route
                        element={<RecruitQuestionAdminPage />}
                        path="/admin/recruit-question"
                    />
                </Route>
            </Routes>
        </>
    )
}
