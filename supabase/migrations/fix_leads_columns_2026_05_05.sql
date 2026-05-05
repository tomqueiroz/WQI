
-- Adicionar colunas faltantes na tabela leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS whatsapp text,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS company text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'website_form',
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

-- Garantir RLS para anon
DROP POLICY IF EXISTS "leads_anon_insert" ON public.leads;
CREATE POLICY "leads_anon_insert" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "leads_auth_insert" ON public.leads
  FOR INSERT TO authenticated WITH CHECK (true);
