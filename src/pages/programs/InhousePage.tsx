import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Users, Target, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Zap, BarChart3, ChevronRight, Award, Clock } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

const TABS = [
  { id: 'desafio', label: 'O Desafio' },
  { id: 'abordagem', label: 'Nossa Abordagem' },
  { id: 'formatos', label: 'Formatos' },
  { id: 'temas', label: 'Temas' },
  { id: 'solicitar', label: 'Solicitar Proposta' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export default function InhousePage() {
  const { submitLead, loading, success, error } = useSubmitLead('inhouse_leads')
  const [formData, setFormData] = useState({ company: '', full_name: '', email: '', whatsapp: '', employees: 'none', message: '' })
  const [activeTab, setActiveTab] = useState('desafio')
  const tabsRef = useRef<HTMLDivElement>(null)
  const [tabsSticky, setTabsSticky] = useState(false)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [])

  useEffect(() => {
    const onScroll = () => {
      if (tabsRef.current) setTabsSticky(window.scrollY > tabsRef.current.offsetTop - 80)
      const sections = TABS.map(t => document.getElementById(t.id))
      let current = TABS[0].id
      sections.forEach(sec => { if (sec && window.scrollY >= sec.offsetTop - 160) current = sec.id })
      setActiveTab(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead({
      full_name: formData.full_name,
      email: formData.email,
      company: formData.company,
      whatsapp: formData.whatsapp,
      message: `Funcionários: ${formData.employees}. Objetivo: ${formData.message}`
    })
  }

  return (
    <Layout>
      <div className="min-h-screen" id="top">

        {/* ── HERO ── dark navy */}
        <section style={{ background: '#001123' }} className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(122,98,7,0.12) 0%, transparent 70%)' }} className="absolute inset-0" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(122,98,7,0.5)', background: 'rgba(122,98,7,0.12)' }}>
                  <Building2 className="w-4 h-4" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold tracking-widest" style={{ color: '#c4a217' }}>IN-COMPANY TRANSFORMATION</span>
                </div>
                <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
                  className="text-4xl lg:text-5xl xl:text-6xl mb-6">
                  A Transformação Mais Eficaz Começa Dentro de Casa
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                  Quando o conhecimento chega até o seu time — no contexto do seu negócio, com a linguagem da sua cultura e a urgência dos seus desafios — a mudança acontece de verdade.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="text-white font-semibold"
                    style={{ background: '#7a6207' }}
                    onClick={() => scrollTo('solicitar')}>
                    Solicitar Proposta Personalizada
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                    asChild>
                    <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20saber%20sobre%20In-Company" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="mr-2 h-4 w-4" /> Falar com Especialista
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
                  <img src={IMAGES.PROG_INHOUSE_3} alt="In-Company" className="w-full h-auto" style={{ maxHeight: '480px', objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.6) 0%, transparent 50%)' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TABS ── sticky */}
        <div ref={tabsRef} className={`z-30 transition-all ${tabsSticky ? 'fixed top-[72px] left-0 right-0 shadow-lg' : 'relative'}`}
          style={{ background: '#001123', borderBottom: '1px solid rgba(122,98,7,0.3)' }}>
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-0 scrollbar-hide">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => scrollTo(tab.id)}
                  className="px-5 py-4 text-sm whitespace-nowrap transition-all font-medium border-b-2 flex-shrink-0"
                  style={{ color: activeTab === tab.id ? '#c4a217' : 'rgba(255,255,255,0.6)', borderBottomColor: activeTab === tab.id ? '#c4a217' : 'transparent', background: 'transparent', letterSpacing: '0.04em' }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {tabsSticky && <div style={{ height: '53px' }} />}

        {/* ── DESAFIO ── white */}
        <section id="desafio" className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>O CONTEXTO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">O Desafio Real das Empresas Hoje</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, stat: '73%', title: 'Adoção Lenta de IA', desc: 'das empresas brasileiras reportam que suas lideranças ainda não adotaram ferramentas de IA nos processos decisórios.' },
                { icon: Target, stat: '68%', title: 'Desalinhamento Estratégico', desc: 'dos times de marketing operam desalinhados com a liderança C-Suite, gerando perda de recursos e oportunidades.' },
                { icon: BarChart3, stat: '82%', title: 'Cultura Ainda Analógica', desc: 'dos executivos admitem que suas equipes não usam dados de forma efetiva nas decisões do dia a dia.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-8" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                  </div>
                  <div className="text-3xl font-black mb-2" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>{item.stat}</div>
                  <h3 className="font-bold mb-3" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABORDAGEM ── navy */}
        <section id="abordagem" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>METODOLOGIA</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Nossa Abordagem em 4 Fases</h2>
              <p className="mt-4 max-w-2xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                Cada programa In-Company começa com um diagnóstico profundo antes de qualquer proposta. Nada é genérico.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Diagnóstico Organizacional', desc: 'Assessment de maturidade digital, cultura, gaps de competências e nível de adoção de IA no time.' },
                { num: '02', title: 'Design do Programa', desc: 'Criação de currículo personalizado, definição de formatos, KPIs de sucesso e cronograma de implementação.' },
                { num: '03', title: 'Implementação', desc: 'Execução com workshops, sprints, sessões ao vivo e materiais exclusivos — inteiramente no contexto da empresa.' },
                { num: '04', title: 'Medição de Resultados', desc: 'Avaliação de impacto com métricas pré-acordadas. Relatório executivo de ROI e próximos passos.' },
              ].map((step, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(122,98,7,0.25)' }}>
                  <div className="text-4xl font-black mb-4" style={{ color: 'rgba(122,98,7,0.4)', fontFamily: 'Montserrat, sans-serif' }}>{step.num}</div>
                  <h3 className="font-bold mb-2 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMATOS ── gray */}
        <section id="formatos" className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>FLEXIBILIDADE</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Formatos Disponíveis</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock, title: 'Workshop Imersivo', duration: '1–3 dias', tag: 'Alta Intensidade',
                  desc: 'Para equipes que precisam de transformação rápida e alto impacto em curto prazo.',
                  items: ['Até 50 participantes', 'Conteúdo 100% customizado', 'Dinâmicas práticas', 'Plano de ação pós-evento']
                },
                {
                  icon: TrendingUp, title: 'Programa Estruturado', duration: '4–16 semanas', tag: 'Transformação Profunda',
                  desc: 'Para equipes que buscam mudança real e duradoura, com implementação e acompanhamento.',
                  items: ['Módulos semanais ou quinzenais', 'Assessment individual', 'Projetos práticos internos', 'Relatório de evolução']
                },
                {
                  icon: Zap, title: 'Sprint de Inovação', duration: '5 dias intensivos', tag: 'Inovação Ágil',
                  desc: 'Metodologia baseada no Google Design Sprint para criar e testar soluções em tempo recorde.',
                  items: ['Times multifuncionais', 'Facilitação especializada', 'MVP ao final dos 5 dias', 'Roadmap de implementação']
                },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-8 flex flex-col" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,17,35,0.07)' }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(122,98,7,0.1)' }}>
                      <item.icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(122,98,7,0.1)', color: '#7a6207' }}>{item.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: '#7a6207' }}>{item.duration}</p>
                  <p className="text-sm mb-6 leading-relaxed flex-1" style={{ color: '#475569', fontWeight: 300 }}>{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((t, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: '#64748b', fontWeight: 300 }}>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#7a6207' }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEMAS ── copper */}
        <section id="temas" style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>CONTEÚDO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Temas Mais Solicitados</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: 'Digital Culture & AI Adoption', desc: 'Como criar uma cultura orientada a IA e acelerar a adoção em todos os níveis da organização.' },
                { icon: TrendingUp, title: 'Marketing Performance & Growth', desc: 'Arquitetura de marketing digital de alta performance com métricas, atribuição e automação.' },
                { icon: BarChart3, title: 'Data Literacy for Leaders', desc: 'Como líderes tomam melhores decisões usando dados: dashboards, KPIs e cultura analítica.' },
                { icon: Users, title: 'Customer Experience in AI Era', desc: 'CX avançada com personalização em escala, automação inteligente e jornadas preditivas.' },
                { icon: Sparkles, title: 'Innovation Sprint Methodology', desc: 'Design Sprint e Lean Innovation para criar e validar novas soluções com velocidade de startup.' },
                { icon: Target, title: 'Leadership in Digital Disruption', desc: 'Como liderar equipes e organizações em ambientes de alta incerteza e transformação acelerada.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                  <item.icon className="w-7 h-7 mb-4 text-white" />
                  <h3 className="font-bold mb-2 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTADOS ── white */}
        <section className="py-16" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { stat: '+35%', label: 'Performance de Marketing', detail: 'em média em 90 dias pós-programa' },
                { stat: '500+', label: 'Executivos Treinados', detail: 'em empresas de médio e grande porte' },
                { stat: 'ROI', label: 'Mensurável', detail: 'com métricas pré-acordadas e relatório executivo' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="text-center rounded-2xl p-8" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                  <div className="text-4xl font-black mb-2" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>{item.stat}</div>
                  <div className="font-bold mb-1" style={{ color: '#001123' }}>{item.label}</div>
                  <div className="text-sm" style={{ color: '#94a3b8', fontWeight: 300 }}>{item.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULÁRIO ── navy */}
        <section id="solicitar" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div {...fadeUp} className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>PRIMEIRO PASSO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl mb-4">Solicitar Proposta Personalizada</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>Compartilhe os dados da sua empresa e entraremos em contato em até 24h úteis.</p>
            </motion.div>
            {success ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
                <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#c4a217' }} />
                <h3 className="text-xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Nossa equipe de especialistas retornará em até 24h úteis.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(122,98,7,0.3)' }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Empresa *</label>
                    <Input name="company" required value={formData.company}
                      onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="Nome da empresa" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Nome Completo *</label>
                    <Input name="full_name" required value={formData.full_name}
                      onChange={e => setFormData(p => ({ ...p, full_name: e.target.value }))}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="Seu nome" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">E-mail *</label>
                    <Input name="email" type="email" required value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="email@empresa.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">WhatsApp</label>
                    <Input name="whatsapp" value={formData.whatsapp}
                      onChange={e => setFormData(p => ({ ...p, whatsapp: e.target.value }))}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="+55 11 99999-9999" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Número de Funcionários</label>
                  <Select value={formData.employees} onValueChange={v => setFormData(p => ({ ...p, employees: v }))}>
                    <SelectTrigger className="text-white border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <SelectValue placeholder="Selecione o porte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Selecione...</SelectItem>
                      <SelectItem value="5-50">5 a 50 funcionários</SelectItem>
                      <SelectItem value="51-200">51 a 200 funcionários</SelectItem>
                      <SelectItem value="201-500">201 a 500 funcionários</SelectItem>
                      <SelectItem value="500+">Acima de 500 funcionários</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Principal Objetivo do Programa</label>
                  <Textarea name="message" value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="text-white placeholder:text-white/30 border-white/10 min-h-[100px]" style={{ background: 'rgba(255,255,255,0.07)' }}
                    placeholder="Descreva o que sua empresa precisa transformar..." />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" size="lg" disabled={loading} className="w-full text-white font-semibold"
                  style={{ background: '#7a6207' }}>
                  {loading ? 'Enviando...' : 'Solicitar Proposta'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* ── CTA FINAL ── copper */}
        <section style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div {...fadeUp}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl mb-4">Pronto para Transformar Seu Time?</h2>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                Fale agora com um especialista e receba uma proposta personalizada para sua empresa.
              </p>
              <Button size="lg" asChild className="text-white font-semibold px-10"
                style={{ background: '#001123', border: '1px solid rgba(255,255,255,0.3)' }}>
                <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20saber%20sobre%20o%20programa%20In-Company" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2 h-5 w-5" /> Falar com Especialista
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
