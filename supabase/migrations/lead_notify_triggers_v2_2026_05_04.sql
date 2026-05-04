
-- Habilita pg_net para chamadas HTTP assíncronas
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ── Função genérica de notificação por e-mail ─────────────────────────────────
CREATE OR REPLACE FUNCTION notify_lead_by_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM net.http_post(
    url     := 'https://lbrtshklxkhvlewwdpfb.supabase.co/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicnRzaGtseWhodmxld3dkcGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NzkwMjUsImV4cCI6MjA5MzI1NTAyNX0.B0wed6AjzVJIucCfvJYfdEgSRkRGNiEU1CQDKEwbik'
    ),
    body := jsonb_build_object(
      'type',   TG_OP,
      'table',  TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$;

-- ── Remove triggers antigos se existirem ──────────────────────────────────────
DROP TRIGGER IF EXISTS trg_notify_novos_mentores ON public.novos_mentores_leads_2026_05_04;
DROP TRIGGER IF EXISTS trg_notify_empresas ON public.empresas_leads_2026_05_02;
DROP TRIGGER IF EXISTS trg_notify_corp_ai_leadership ON public.corp_ai_leadership_leads_2026_05_02;
DROP TRIGGER IF EXISTS trg_notify_corp_mentor ON public.corp_mentor_form_leads_2026_05_02;
DROP TRIGGER IF EXISTS trg_notify_corp_immersion ON public.corp_ai_immersion_leads_2026_05_02;
DROP TRIGGER IF EXISTS trg_notify_corp_advisory ON public.corp_exec_advisory_leads_2026_05_02;

-- ── Trigger: novos_mentores_leads_2026_05_04 ──────────────────────────────────
CREATE TRIGGER trg_notify_novos_mentores
  AFTER INSERT ON public.novos_mentores_leads_2026_05_04
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: empresas_leads_2026_05_02 ───────────────────────────────────────
CREATE TRIGGER trg_notify_empresas
  AFTER INSERT ON public.empresas_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: corp_ai_leadership_leads_2026_05_02 ──────────────────────────────
CREATE TRIGGER trg_notify_corp_ai_leadership
  AFTER INSERT ON public.corp_ai_leadership_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: corp_mentor_form_leads_2026_05_02 ────────────────────────────────
CREATE TRIGGER trg_notify_corp_mentor
  AFTER INSERT ON public.corp_mentor_form_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: corp_ai_immersion_leads_2026_05_02 ───────────────────────────────
CREATE TRIGGER trg_notify_corp_immersion
  AFTER INSERT ON public.corp_ai_immersion_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();

-- ── Trigger: corp_exec_advisory_leads_2026_05_02 ─────────────────────────────
CREATE TRIGGER trg_notify_corp_advisory
  AFTER INSERT ON public.corp_exec_advisory_leads_2026_05_02
  FOR EACH ROW EXECUTE FUNCTION notify_lead_by_email();
