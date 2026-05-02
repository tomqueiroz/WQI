import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/ProtectedRoute";
import { LMS_ROUTES } from "@/lib/index";
import Home from "@/pages/Home";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "@/pages/student/DashboardPage";
import CoursesPage from "@/pages/student/CoursesPage";
import CourseDetailPage from "@/pages/student/CourseDetailPage";
import LessonPlayerPage from "@/pages/student/LessonPlayerPage";
import ProfilePage from "@/pages/student/ProfilePage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminCoursesPage from "@/pages/admin/AdminCoursesPage";
import AdminStudentsPage from "@/pages/admin/AdminStudentsPage";
import AdminLeadsPage from "@/pages/admin/AdminLeadsPage";
import ProgramasPage from "@/pages/ProgramasPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path={LMS_ROUTES.HOME} element={<Home />} />
            <Route
              path={LMS_ROUTES.LOGIN}
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path={LMS_ROUTES.REGISTER}
              element={
                <PublicOnlyRoute>
                  <RegisterPage />
                </PublicOnlyRoute>
              }
            />
            <Route path={LMS_ROUTES.PROGRAMAS} element={<ProgramasPage />} />
            <Route path={LMS_ROUTES.BLOG} element={<BlogPage />} />
            <Route path={LMS_ROUTES.BLOG_POST} element={<BlogPostPage />} />
            <Route path={LMS_ROUTES.PRIVACY} element={<PrivacyPage />} />
            <Route path={LMS_ROUTES.TERMS} element={<TermsPage />} />
            <Route path={LMS_ROUTES.COURSE_DETAIL} element={<CourseDetailPage />} />
            <Route
              path={LMS_ROUTES.COURSES}
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.LESSON_PLAYER}
              element={
                <ProtectedRoute>
                  <LessonPlayerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.ADMIN}
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.ADMIN_COURSES}
              element={
                <ProtectedRoute adminOnly>
                  <AdminCoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.ADMIN_STUDENTS}
              element={
                <ProtectedRoute adminOnly>
                  <AdminStudentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={LMS_ROUTES.ADMIN_LEADS}
              element={
                <ProtectedRoute adminOnly>
                  <AdminLeadsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={LMS_ROUTES.HOME} replace />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;