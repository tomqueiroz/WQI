import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { LMS_ROUTES } from "@/lib/index";
import Home from "@/pages/Home";
import ProgramasPage from "@/pages/ProgramasPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import SobrePage from "@/pages/SobrePage";
import ContatoPage from "@/pages/ContatoPage";
import EmpresasPage from "@/pages/EmpresasPage";
import Mentoria1on1Page from "@/pages/programs/Mentoria1on1Page";
import CohortPage from "@/pages/programs/CohortPage";
import InhousePage from "@/pages/programs/InhousePage";
import MasterclassPage from "@/pages/programs/MasterclassPage";
import KeynotePage from "@/pages/programs/KeynotePage";
import CursosDigitaisPage from "@/pages/programs/CursosDigitaisPage";
import CorpAiLeadershipPage from "@/pages/empresas/CorpAiLeadershipPage";
import CorpAiImmersionPage from "@/pages/empresas/CorpAiImmersionPage";
import CorpMentorFormPage from "@/pages/empresas/CorpMentorFormPage";
import CorpExecAdvisoryPage from "@/pages/empresas/CorpExecAdvisoryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HashRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path={LMS_ROUTES.HOME} element={<Home />} />
          <Route path={LMS_ROUTES.SOBRE} element={<SobrePage />} />
          <Route path={LMS_ROUTES.CONTATO} element={<ContatoPage />} />
          <Route path={LMS_ROUTES.PROGRAMAS} element={<ProgramasPage />} />
          <Route path={LMS_ROUTES.PROG_1ON1} element={<Mentoria1on1Page />} />
          <Route path={LMS_ROUTES.PROG_COHORT} element={<CohortPage />} />
          <Route path={LMS_ROUTES.PROG_INHOUSE} element={<InhousePage />} />
          <Route path={LMS_ROUTES.PROG_MASTERCLASS} element={<MasterclassPage />} />
          <Route path={LMS_ROUTES.PROG_KEYNOTE} element={<KeynotePage />} />
          <Route path={LMS_ROUTES.PROG_DIGITAL} element={<CursosDigitaisPage />} />
          <Route path={LMS_ROUTES.EMPRESAS} element={<EmpresasPage />} />
          <Route path={LMS_ROUTES.CORP_AI_LEADERSHIP} element={<CorpAiLeadershipPage />} />
          <Route path={LMS_ROUTES.CORP_AI_IMMERSION} element={<CorpAiImmersionPage />} />
          <Route path={LMS_ROUTES.CORP_MENTOR_FORM} element={<CorpMentorFormPage />} />
          <Route path={LMS_ROUTES.CORP_EXEC_ADVISORY} element={<CorpExecAdvisoryPage />} />
          <Route path={LMS_ROUTES.BLOG} element={<BlogPage />} />
          <Route path={LMS_ROUTES.BLOG_POST} element={<BlogPostPage />} />
          <Route path={LMS_ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={LMS_ROUTES.TERMS} element={<TermsPage />} />
          <Route path="*" element={<Navigate to={LMS_ROUTES.HOME} replace />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
