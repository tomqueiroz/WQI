import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
};

// Mapa de tabelas para nomes amigáveis
const TABLE_LABELS: Record<string, string> = {
  leads: 'Formulário Geral / Home',
  contact_leads: 'Página de Contato',
  program_leads: 'Programas (geral)',
  novos_mentores_leads_2026_05_04: 'Plataformas para Novos Mentores',
  empresas_leads_2026_05_02: 'Para Empresas',
  corp_programs_leads_2026_05_02: 'Programas Corporativos',
  executive_mentoring_leads: 'Mentoria Executiva 1:1',
  ai_leadership_leads: 'AI Leadership Program',
  ai_transformation_leads: 'Transformação Corporativa com IA',
  digital_marketing_leads: 'Marketing Digital com IA',
  corp_mentor_leads: 'Formação de Mentores Corporativos',
};

// Formata um valor para exibição no e-mail
function formatValue(val: unknown): string {
  if (val === null || val === undefined || val === '') return '—';
  if (typeof val === 'boolean') return val ? 'Sim' : 'Não';
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

// Campos a omitir no e-mail (metadados internos)
const OMIT_FIELDS = new Set(['id', 'created_at', 'updated_at']);

// Campos com labels legíveis
const FIELD_LABELS: Record<string, string> = {
  full_name: 'Nome completo',
  name: 'Nome',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  phone: 'Telefone',
  instagram: 'Instagram',
  company: 'Empresa',
  role: 'Cargo',
  nicho_mentoria: 'Nicho de mentoria',
  pacote_interesse: 'Pacote de interesse',
  program: 'Programa',
  mensagem: 'Mensagem',
  message: 'Mensagem',
  subject: 'Assunto',
  institution: 'Instituição',
  team_size: 'Tamanho do time',
  goals: 'Objetivos',
};

function getFromEmail(): string {
  const domain = Deno.env.get('RESEND_DOMAIN');
  if (domain) return `send@${domain}`;
  return 'onboarding@resend.dev';
}

function buildEmailHtml(tableName: string, record: Record<string, unknown>): string {
  const sourceLabel = TABLE_LABELS[tableName] || tableName;
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const rows = Object.entries(record)
    .filter(([key]) => !OMIT_FIELDS.has(key))
    .map(([key, val]) => {
      const label = FIELD_LABELS[key] || key.replace(/_/g, ' ');
      const value = formatValue(val);
      return `
        <tr>
          <td style="padding:10px 16px;background:#f5f5f0;border-bottom:1px solid #e8e4d8;
                     font-family:Roboto,sans-serif;font-size:13px;color:#555;font-weight:500;
                     width:180px;vertical-align:top;">
            ${label}
          </td>
          <td style="padding:10px 16px;border-bottom:1px solid #e8e4d8;
                     font-family:Roboto,sans-serif;font-size:13px;color:#222;vertical-align:top;">
            ${value}
          </td>
        </tr>`;
    }).join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0eb;font-family:Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0eb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;
               background:#fff;border-radius:12px;overflow:hidden;
               box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#001123;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-family:'Montserrat',Arial,sans-serif;font-size:22px;
                        font-weight:700;color:#fff;letter-spacing:2px;">RECOGNISE</p>
              <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.4);
                        letter-spacing:3px;text-transform:uppercase;">IA Multimodal Ltda.</p>
            </td>
          </tr>

          <!-- Alert bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#7a6207,#c9a227);
                       padding:14px 32px;text-align:center;">
              <p style="margin:0;font-size:13px;font-weight:700;color:#fff;
                        letter-spacing:1px;text-transform:uppercase;">
                Novo Lead Recebido
              </p>
            </td>
          </tr>

          <!-- Meta info -->
          <tr>
            <td style="padding:20px 32px 8px;border-bottom:2px solid #e8e4d8;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#888;font-family:Roboto,Arial,sans-serif;">
                    <strong style="color:#001123;">Origem:</strong> ${sourceLabel}
                  </td>
                  <td align="right" style="font-size:12px;color:#888;font-family:Roboto,Arial,sans-serif;">
                    ${now} (horário de Brasília)
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Data rows -->
          <tr>
            <td style="padding:8px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;
                     overflow:hidden;border:1px solid #e8e4d8;">
                ${rows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 32px;text-align:center;">
              <a href="https://supabase.com/dashboard" target="_blank"
                 style="display:inline-block;padding:12px 28px;background:#001123;
                        color:#fff;text-decoration:none;border-radius:8px;
                        font-size:13px;font-weight:600;font-family:Roboto,Arial,sans-serif;">
                Ver no Supabase
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f5f5f0;padding:16px 32px;text-align:center;
                       border-top:1px solid #e8e4d8;">
              <p style="margin:0;font-size:11px;color:#aaa;font-family:Roboto,Arial,sans-serif;">
                Este e-mail foi gerado automaticamente pelo sistema Recognise.<br>
                <a href="mailto:tom@recognise.com.br" style="color:#7a6207;text-decoration:none;">
                  tom@recognise.com.br
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // O webhook do Supabase envia: { type, table, schema, record, old_record }
    const { type, table, record } = body as {
      type: string;
      table: string;
      schema: string;
      record: Record<string, unknown>;
    };

    // Só processa INSERTs
    if (type !== 'INSERT') {
      return new Response(JSON.stringify({ skipped: true, reason: 'not INSERT' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const adminEmail = Deno.env.get('RESEND_ADMIN_EMAIL') || 'tom@recognise.com.br';
    const resendKey = Deno.env.get('RESEND_API_KEY');

    if (!resendKey) {
      throw new Error('RESEND_API_KEY não configurada');
    }

    // Nome do lead para o assunto
    const leadName =
      (record.full_name as string) ||
      (record.name as string) ||
      (record.email as string) ||
      'Novo lead';

    const sourceLabel = TABLE_LABELS[table] || table;
    const subject = `[Recognise] Novo lead: ${leadName} — ${sourceLabel}`;
    const html = buildEmailHtml(table, record);

    const emailPayload = {
      from: getFromEmail(),
      to: adminEmail,
      subject,
      html,
      text: `Novo lead de ${leadName} via ${sourceLabel}.\n\nDados:\n${
        Object.entries(record)
          .filter(([k]) => !OMIT_FIELDS.has(k))
          .map(([k, v]) => `${FIELD_LABELS[k] || k}: ${formatValue(v)}`)
          .join('\n')
      }`,
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      throw new Error(`Resend API error: ${resendRes.status} — ${errBody}`);
    }

    const result = await resendRes.json();

    return new Response(
      JSON.stringify({ success: true, email_id: result.id, to: adminEmail }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('notify-new-lead error:', err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
