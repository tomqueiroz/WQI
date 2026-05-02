import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeadData {
  full_name: string;
  email: string;
  company?: string;
  role?: string;
  whatsapp?: string;
  message?: string;
}

const STATIC_PRODUCTS = [
  {
    id: 'mentoria-1on1',
    name: 'Mentoria Executiva 1:1',
    description: 'Mentoria personalizada para executivos C-Suite',
    price: 'Sob consulta',
    duration: '3-12 meses',
    features: ['Sessões individuais', 'Suporte assíncrono', 'Plano personalizado'],
  },
  {
    id: 'cohort-program',
    name: 'Programa de Cohort Executivo',
    description: 'Aprendizado coletivo com pares de alto calibre',
    price: 'Sob consulta',
    duration: '6 meses',
    features: ['Turmas fechadas', 'Peer learning', 'Mentor office hours'],
  },
];

const STATIC_TESTIMONIALS = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'CMO',
    company: 'Tech Corp',
    text: 'A mentoria transformou completamente minha visão estratégica.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Ana Costa',
    role: 'VP Marketing',
    company: 'Innovation Labs',
    text: 'Resultados mensuráveis em menos de 90 dias.',
    rating: 5,
  },
];

export function useProducts() {
  const [products, setProducts] = useState<any[]>(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error: dbError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (dbError) {
          console.warn('Supabase products fetch failed, using static data:', dbError.message);
          setProducts(STATIC_PRODUCTS);
        } else if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(STATIC_PRODUCTS);
        }
      } catch (err) {
        console.warn('Error fetching products, using static data:', err);
        setProducts(STATIC_PRODUCTS);
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>(STATIC_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error: dbError } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true)
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (dbError) {
          console.warn('Supabase testimonials fetch failed, using static data:', dbError.message);
          setTestimonials(STATIC_TESTIMONIALS);
        } else if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(STATIC_TESTIMONIALS);
        }
      } catch (err) {
        console.warn('Error fetching testimonials, using static data:', err);
        setTestimonials(STATIC_TESTIMONIALS);
        setError(err instanceof Error ? err.message : 'Erro ao carregar depoimentos');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

export function useSubmitLead(tableName: string = 'leads') {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitLead(leadData: LeadData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: dbError } = await supabase
        .from(tableName)
        .insert([{
          full_name: leadData.full_name,
          email: leadData.email,
          company: leadData.company || null,
          role: leadData.role || null,
          whatsapp: leadData.whatsapp || null,
          message: leadData.message || null,
          source: 'website_form',
          status: 'new',
          created_at: new Date().toISOString(),
        }]);

      if (dbError) throw dbError;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setSuccess(false);
    setError(null);
  }

  return { submitLead, loading, success, error, reset };
}
