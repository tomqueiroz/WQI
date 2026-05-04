
-- Habilita a extensão de webhooks (pg_net é necessária para HTTP requests)
-- No Supabase, os webhooks de database usam supabase_functions.http_request
-- via a extensão pg_net que já vem habilitada.

-- Remove webhooks antigos se existirem (evita duplicatas)
DO $$
DECLARE
  hook_id bigint;
BEGIN
  -- Remove hooks existentes com o mesmo nome
  FOR hook_id IN
    SELECT id FROM supabase_functions.hooks
    WHERE hook_table_id IN (
      SELECT oid FROM pg_class
      WHERE relname IN (
        'leads',
        'novos_mentores_leads_2026_05_04',
        'empresas_leads_2026_05_02',
        'corp_programs_leads_2026_05_02'
      )
    )
    AND hook_name LIKE 'notify_lead_%'
  LOOP
    PERFORM supabase_functions.http_request FROM supabase_functions.hooks WHERE id = hook_id;
    DELETE FROM supabase_functions.hooks WHERE id = hook_id;
  END LOOP;
END $$;

-- ── 1. Tabela leads (formulário geral / home / contato) ───────────────────────
SELECT supabase_functions.http_request(
  'https://lbrtshklxkhvlewwdpfb.supabase.co/functions/v1/notify-new-lead',
  'POST',
  '{"Content-Type":"application/json"}',
  '{}',
  '5000'
) WHERE false; -- apenas valida a função, não executa

-- Webhook para tabela leads
INSERT INTO supabase_functions.hooks (hook_table_id, hook_name, hook_service_id, hook_events)
SELECT
  pc.oid,
  'notify_lead_general',
  1,
  ARRAY['INSERT']
FROM pg_class pc
JOIN pg_namespace pn ON pc.relnamespace = pn.oid
WHERE pc.relname = 'leads' AND pn.nspname = 'public'
ON CONFLICT DO NOTHING;

-- Webhook para novos_mentores_leads_2026_05_04
INSERT INTO supabase_functions.hooks (hook_table_id, hook_name, hook_service_id, hook_events)
SELECT
  pc.oid,
  'notify_lead_novos_mentores',
  1,
  ARRAY['INSERT']
FROM pg_class pc
JOIN pg_namespace pn ON pc.relnamespace = pn.oid
WHERE pc.relname = 'novos_mentores_leads_2026_05_04' AND pn.nspname = 'public'
ON CONFLICT DO NOTHING;

-- Webhook para empresas_leads_2026_05_02
INSERT INTO supabase_functions.hooks (hook_table_id, hook_name, hook_service_id, hook_events)
SELECT
  pc.oid,
  'notify_lead_empresas',
  1,
  ARRAY['INSERT']
FROM pg_class pc
JOIN pg_namespace pn ON pc.relnamespace = pn.oid
WHERE pc.relname = 'empresas_leads_2026_05_02' AND pn.nspname = 'public'
ON CONFLICT DO NOTHING;

-- Webhook para corp_programs_leads_2026_05_02
INSERT INTO supabase_functions.hooks (hook_table_id, hook_name, hook_service_id, hook_events)
SELECT
  pc.oid,
  'notify_lead_corp',
  1,
  ARRAY['INSERT']
FROM pg_class pc
JOIN pg_namespace pn ON pc.relnamespace = pn.oid
WHERE pc.relname = 'corp_programs_leads_2026_05_02' AND pn.nspname = 'public'
ON CONFLICT DO NOTHING;
