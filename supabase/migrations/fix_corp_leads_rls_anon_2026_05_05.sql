
-- ============================================================
-- CORRIGE: políticas RLS para INSERT anônimo nas tabelas corporativas
-- As políticas anteriores usavam WITH CHECK mas sem especificar TO anon
-- ============================================================

-- corp_ai_leadership_leads
DROP POLICY IF EXISTS "insert_corp_ai_leadership" ON public.corp_ai_leadership_leads_2026_05_02;
DROP POLICY IF EXISTS "corp_ai_leadership_leads_anon_insert" ON public.corp_ai_leadership_leads_2026_05_02;
CREATE POLICY "corp_ai_leadership_anon_insert" ON public.corp_ai_leadership_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "corp_ai_leadership_auth_insert" ON public.corp_ai_leadership_leads_2026_05_02
  FOR INSERT TO authenticated WITH CHECK (true);

-- corp_mentor_form_leads
DROP POLICY IF EXISTS "insert_corp_mentor_form" ON public.corp_mentor_form_leads_2026_05_02;
DROP POLICY IF EXISTS "corp_mentor_form_leads_anon_insert" ON public.corp_mentor_form_leads_2026_05_02;
CREATE POLICY "corp_mentor_form_anon_insert" ON public.corp_mentor_form_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "corp_mentor_form_auth_insert" ON public.corp_mentor_form_leads_2026_05_02
  FOR INSERT TO authenticated WITH CHECK (true);

-- corp_ai_immersion_leads
DROP POLICY IF EXISTS "insert_corp_ai_immersion" ON public.corp_ai_immersion_leads_2026_05_02;
DROP POLICY IF EXISTS "corp_ai_immersion_leads_anon_insert" ON public.corp_ai_immersion_leads_2026_05_02;
CREATE POLICY "corp_ai_immersion_anon_insert" ON public.corp_ai_immersion_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "corp_ai_immersion_auth_insert" ON public.corp_ai_immersion_leads_2026_05_02
  FOR INSERT TO authenticated WITH CHECK (true);

-- corp_exec_advisory_leads
DROP POLICY IF EXISTS "insert_corp_exec_advisory" ON public.corp_exec_advisory_leads_2026_05_02;
DROP POLICY IF EXISTS "corp_exec_advisory_leads_anon_insert" ON public.corp_exec_advisory_leads_2026_05_02;
CREATE POLICY "corp_exec_advisory_anon_insert" ON public.corp_exec_advisory_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "corp_exec_advisory_auth_insert" ON public.corp_exec_advisory_leads_2026_05_02
  FOR INSERT TO authenticated WITH CHECK (true);

-- empresas_leads
DROP POLICY IF EXISTS "Anyone can insert empresas_leads" ON public.empresas_leads_2026_05_02;
DROP POLICY IF EXISTS "empresas_leads_anon_insert" ON public.empresas_leads_2026_05_02;
CREATE POLICY "empresas_leads_anon_insert" ON public.empresas_leads_2026_05_02
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "empresas_leads_auth_insert" ON public.empresas_leads_2026_05_02
  FOR INSERT TO authenticated WITH CHECK (true);
