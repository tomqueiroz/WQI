
-- Corporate AI Leadership Program leads
CREATE TABLE IF NOT EXISTS corp_ai_leadership_leads_2026_05_02 (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo text NOT NULL,
  instituicao text NOT NULL,
  cargo text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  tamanho_empresa text,
  setor text,
  num_colaboradores text,
  desafio text,
  mensagem text,
  origem text DEFAULT 'landing-page-corp-ai-leadership',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE corp_ai_leadership_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_corp_ai_leadership" ON corp_ai_leadership_leads_2026_05_02 FOR INSERT WITH CHECK (true);

-- Corporate Mentor Formation Program leads
CREATE TABLE IF NOT EXISTS corp_mentor_form_leads_2026_05_02 (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo text NOT NULL,
  instituicao text NOT NULL,
  cargo text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  tamanho_empresa text,
  setor text,
  num_colaboradores text,
  objetivo text,
  mensagem text,
  origem text DEFAULT 'landing-page-corp-mentor-formation',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE corp_mentor_form_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_corp_mentor_form" ON corp_mentor_form_leads_2026_05_02 FOR INSERT WITH CHECK (true);

-- Corporate AI Immersion Workshop leads
CREATE TABLE IF NOT EXISTS corp_ai_immersion_leads_2026_05_02 (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo text NOT NULL,
  instituicao text NOT NULL,
  cargo text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  tamanho_empresa text,
  setor text,
  num_participantes text,
  objetivo text,
  mensagem text,
  origem text DEFAULT 'landing-page-corp-ai-immersion',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE corp_ai_immersion_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_corp_ai_immersion" ON corp_ai_immersion_leads_2026_05_02 FOR INSERT WITH CHECK (true);

-- Corporate Executive Advisory leads
CREATE TABLE IF NOT EXISTS corp_exec_advisory_leads_2026_05_02 (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo text NOT NULL,
  instituicao text NOT NULL,
  cargo text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  tamanho_empresa text,
  setor text,
  num_executivos text,
  foco_estrategico text,
  mensagem text,
  origem text DEFAULT 'landing-page-corp-exec-advisory',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE corp_exec_advisory_leads_2026_05_02 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_corp_exec_advisory" ON corp_exec_advisory_leads_2026_05_02 FOR INSERT WITH CHECK (true);
