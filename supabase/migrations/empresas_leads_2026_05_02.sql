-- Tabela de leads corporativos (Para Empresas)
CREATE TABLE IF NOT EXISTS public.empresas_leads_2026_05_02 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  role text,
  company_size text,
  interest text,       -- qual solução corporativa tem interesse
  employees_count text,
  message text,
  source text DEFAULT 'para_empresas',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.empresas_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert empresas_leads" ON public.empresas_leads_2026_05_02
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view empresas_leads" ON public.empresas_leads_2026_05_02
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
