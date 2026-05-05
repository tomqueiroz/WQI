import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

type LeadData = {
  full_name: string
  email: string
  whatsapp?: string
  company?: string
  role?: string
  message?: string
  team_size?: string
  event_interest?: string
  source?: string
  status?: string
}

type UseProductLeadReturn = {
  submitLead: (data: LeadData) => Promise<void>
  loading: boolean
  success: boolean
  error: string | null
  reset: () => void
}

// Todas as tabelas de leads válidas do projeto
const VALID_TABLES = [
  'leads',
  'mentoria_1on1_leads',
  'mentoria_cohort_leads',
  'inhouse_leads',
  'masterclass_ai_leads',
  'keynote_leads',
  'digital_course_leads',
  'corp_ai_leadership_leads_2026_05_02',
  'corp_mentor_form_leads_2026_05_02',
  'corp_ai_immersion_leads_2026_05_02',
  'corp_exec_advisory_leads_2026_05_02',
  'empresas_leads_2026_05_02',
  'novos_mentores_leads_2026_05_04',
] as const

export function useProductLead(tableName: string): UseProductLeadReturn {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitLead = async (data: LeadData) => {
    // Fallback seguro: se a tabela não for reconhecida, usar 'leads'
    const targetTable = VALID_TABLES.includes(tableName as typeof VALID_TABLES[number])
      ? tableName
      : 'leads'

    setLoading(true)
    setError(null)
    setSuccess(false)

    // Tabelas que NÃO têm coluna source/status (só têm full_name, email, whatsapp, etc.)
    const tablesWithoutSourceStatus = [
      'mentoria_1on1_leads',
      'mentoria_cohort_leads',
      'inhouse_leads',
      'masterclass_ai_leads',
      'keynote_leads',
      'digital_course_leads',
      'novos_mentores_leads_2026_05_04',
    ]
    const useSourceStatus = !tablesWithoutSourceStatus.includes(targetTable)

    // Limpar campos undefined do payload
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined && v !== '')
    )

    const payload = useSourceStatus
      ? { ...cleanData, source: data.source || 'website_form', status: data.status || 'new' }
      : cleanData

    try {
      const { error: insertError } = await supabase
        .from(targetTable)
        .insert([payload])

      if (insertError) {
        throw insertError
      }

      setSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar solicitação'
      setError(errorMessage)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setSuccess(false)
    setError(null)
  }

  return {
    submitLead,
    loading,
    success,
    error,
    reset
  }
}
