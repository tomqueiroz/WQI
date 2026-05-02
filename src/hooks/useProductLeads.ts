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
}

type UseProductLeadReturn = {
  submitLead: (data: LeadData) => Promise<void>
  loading: boolean
  success: boolean
  error: string | null
  reset: () => void
}

const VALID_TABLES = [
  'mentoria_1on1_leads',
  'mentoria_cohort_leads',
  'inhouse_leads',
  'masterclass_ai_leads',
  'keynote_leads',
  'digital_course_leads'
] as const

export function useProductLead(tableName: string): UseProductLeadReturn {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitLead = async (data: LeadData) => {
    if (!VALID_TABLES.includes(tableName as typeof VALID_TABLES[number])) {
      setError('Tabela inválida')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: insertError } = await supabase
        .from(tableName)
        .insert([data])

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
