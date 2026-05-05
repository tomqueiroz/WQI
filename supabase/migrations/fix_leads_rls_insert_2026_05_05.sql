
-- ============================================================
-- CORREÇÃO RLS: permitir INSERT anônimo em todas as tabelas de leads
-- ============================================================

-- 1. Tabela principal leads
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "leads_anon_insert" ON public.leads;
CREATE POLICY "leads_anon_insert" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

-- 2. mentoria_1on1_leads
ALTER TABLE IF EXISTS public.mentoria_1on1_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "mentoria_1on1_leads_anon_insert" ON public.mentoria_1on1_leads;
CREATE POLICY "mentoria_1on1_leads_anon_insert" ON public.mentoria_1on1_leads
  FOR INSERT TO anon WITH CHECK (true);

-- 3. mentoria_cohort_leads
ALTER TABLE IF EXISTS public.mentoria_cohort_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "mentoria_cohort_leads_anon_insert" ON public.mentoria_cohort_leads;
CREATE POLICY "mentoria_cohort_leads_anon_insert" ON public.mentoria_cohort_leads
  FOR INSERT TO anon WITH CHECK (true);

-- 4. inhouse_leads
ALTER TABLE IF EXISTS public.inhouse_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "inhouse_leads_anon_insert" ON public.inhouse_leads;
CREATE POLICY "inhouse_leads_anon_insert" ON public.inhouse_leads
  FOR INSERT TO anon WITH CHECK (true);

-- 5. masterclass_ai_leads
ALTER TABLE IF EXISTS public.masterclass_ai_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "masterclass_ai_leads_anon_insert" ON public.masterclass_ai_leads;
CREATE POLICY "masterclass_ai_leads_anon_insert" ON public.masterclass_ai_leads
  FOR INSERT TO anon WITH CHECK (true);

-- 6. keynote_leads
ALTER TABLE IF EXISTS public.keynote_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "keynote_leads_anon_insert" ON public.keynote_leads;
CREATE POLICY "keynote_leads_anon_insert" ON public.keynote_leads
  FOR INSERT TO anon WITH CHECK (true);

-- 7. digital_course_leads
ALTER TABLE IF EXISTS public.digital_course_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "digital_course_leads_anon_insert" ON public.digital_course_leads;
CREATE POLICY "digital_course_leads_anon_insert" ON public.digital_course_leads
  FOR INSERT TO anon WITH CHECK (true);

-- 8. corp_ai_leadership_leads_2026_05_02
ALTER TABLE IF EXISTS public.corp_ai_leadership_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "corp_ai_leadership_leads_anon_insert" ON public.corp_ai_leadership_leads_2026_05_02;
CREATE POLICY "corp_ai_leadership_leads_anon_insert" ON public.corp_ai_leadership_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);

-- 9. corp_mentor_form_leads_2026_05_02
ALTER TABLE IF EXISTS public.corp_mentor_form_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "corp_mentor_form_leads_anon_insert" ON public.corp_mentor_form_leads_2026_05_02;
CREATE POLICY "corp_mentor_form_leads_anon_insert" ON public.corp_mentor_form_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);

-- 10. corp_ai_immersion_leads_2026_05_02
ALTER TABLE IF EXISTS public.corp_ai_immersion_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "corp_ai_immersion_leads_anon_insert" ON public.corp_ai_immersion_leads_2026_05_02;
CREATE POLICY "corp_ai_immersion_leads_anon_insert" ON public.corp_ai_immersion_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);

-- 11. corp_exec_advisory_leads_2026_05_02
ALTER TABLE IF EXISTS public.corp_exec_advisory_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "corp_exec_advisory_leads_anon_insert" ON public.corp_exec_advisory_leads_2026_05_02;
CREATE POLICY "corp_exec_advisory_leads_anon_insert" ON public.corp_exec_advisory_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);

-- 12. empresas_leads_2026_05_02
ALTER TABLE IF EXISTS public.empresas_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "empresas_leads_anon_insert" ON public.empresas_leads_2026_05_02;
CREATE POLICY "empresas_leads_anon_insert" ON public.empresas_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);

-- 13. novos_mentores_leads_2026_05_04
ALTER TABLE IF EXISTS public.novos_mentores_leads_2026_05_04 ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "novos_mentores_leads_anon_insert" ON public.novos_mentores_leads_2026_05_04;
CREATE POLICY "novos_mentores_leads_anon_insert" ON public.novos_mentores_leads_2026_05_04
  FOR INSERT TO anon WITH CHECK (true);
