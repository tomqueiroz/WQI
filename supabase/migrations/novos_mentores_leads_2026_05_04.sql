-- Tabela de leads para Plataformas para Novos Mentores
CREATE TABLE IF NOT EXISTS public.novos_mentores_leads_2026_05_04 (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  instagram text,
  nicho_mentoria text,
  pacote_interesse text CHECK (pacote_interesse IN ('top', 'full', 'ainda_decidindo')),
  mensagem text,
  source text DEFAULT 'plataformas-novos-mentores',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.novos_mentores_leads_2026_05_04 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_public_insert_novos_mentores_2026_05_04"
  ON public.novos_mentores_leads_2026_05_04
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "allow_authenticated_select_novos_mentores_2026_05_04"
  ON public.novos_mentores_leads_2026_05_04
  FOR SELECT TO authenticated USING (true);
