
-- Habilita pg_net para HTTP requests assíncronos
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ── Função genérica de notificação ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_lead_by_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  payload jsonb;
BEGIN
  payload := jsonb_build_object(
    'type',   TG_OP,
    'table',  TG_TABLE_NAME,
    'schema', TG_TABLE_SCHEMA,
    'record', row_to_json(NEW)
  );

  PERFORM net.http_post(
    url     := 'https://lbrtshklxkhvlewwdpfb.supabase.co/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicnRzaGtseWhodmxld3dkcGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NzkwMjUsImV4cCI6MjA5MzI1NTAyNX0.B0wed6AjzVJIucCfvJYfdEgSRkRGNiEU1CQDKEwbik'
    ),
    body    := payload
  );

  RETURN NEW;
END;
$$;

-- ── Drops de triggers antigos (idempotente) ───────────────────────────────────
DROP TRIGGER IF EXISTS trg_notify_leads ON public.leads;
DROP TRIGGER IF EXISTS trg_notify_novos_mentores ON public.novos_mentores_leads_2026_05_04;
DROP TRIGGER IF EXISTS trg_notify_empresas ON public.empresas_leads_2026_05_02;
DROP TRIGGER IF EXISTS trg_notify_corp ON public.corp_programs_leads_2026_05_02;

-- ── Trigger: leads (formulário geral) ────────────────────────────────────────
CREATE TRIGGER trg_notify_leads
  AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: novos_mentores_leads ────────────────────────────────────────────
CREATE TRIGGER trg_notify_novos_mentores
  AFTER INSERT ON public.novos_mentores_leads_2026_05_04
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: empresas_leads ──────────────────────────────────────────────────
CREATE TRIGGER trg_notify_empresas
  AFTER INSERT ON public.empresas_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: corp_programs_leads ─────────────────────────────────────────────
CREATE TRIGGER trg_notify_corp
  AFTER INSERT ON public.corp_programs_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();
