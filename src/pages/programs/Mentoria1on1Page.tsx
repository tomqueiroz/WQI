import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, TrendingUp, Users, Target, Zap, ArrowRight, Linkedin, MessageCircle, X, ChevronRight, Award, Brain, Shield, BarChart3 } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia Exclusiva' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'solicitar', label: 'Solicitar Diagnóstico' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export default function Mentoria1on1Page() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('mentoria_1on1_leads')
  const [formData, setFormData] = useState({ full_name: '', email: '', whatsapp: '', company: '', role: '', message: '' })
  const [activeTab, setActiveTab] = useState('para-quem')
  const tabsRef = useRef<HTMLDivElement>(null)
  const [tabsSticky, setTabsSticky] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (tabsRef.current) {
        setTabsSticky(window.scrollY > tabsRef.current.offsetTop - 80)
      }
      const sections = TABS.map(t => document.getElementById(t.id))
      let current = TABS[0].id
      sections.forEach((sec) => {
        if (sec && window.scrollY >= sec.offsetTop - 160) current = sec.id
      })
      setActiveTab(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Layout>
      <div className="min-h-screen" id="top">

        {/* ── HERO ── dark navy */}
        <section style={{ background: '#001123' }} className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(122,98,7,0.13) 0%, transparent 70%)' }} className="absolute inset-0" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(122,98,7,0.5)', background: 'rgba(122,98,7,0.12)' }}>
                  <Award className="w-4 h-4" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold tracking-widest" style={{ color: '#c4a217' }}>MENTORIA EXCLUSIVA 1:1</span>
                </div>
                <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
                  className="text-4xl lg:text-5xl xl:text-6xl mb-6">
                  O Caminho Mais Rápido Para o Seu Próximo Patamar
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                  A aceleração mais rara: atenção total de quem já navegou até onde você quer chegar. 100% personalizado. Sem fórmulas. Sem atalhos falsos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-white font-semibold px-8"
                    style={{ background: '#7a6207', border: 'none' }}
                    onClick={() => scrollTo('solicitar')}>
                    Solicitar Diagnóstico Gratuito
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline"
                    className="font-medium"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                    asChild>
                    <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="mr-2 h-4 w-4" />
                      Conectar com Tom
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
                  <img src={IMAGES.TOM_PROFILE_ALT} alt="Tom Queiroz Mentoria" className="w-full h-auto object-cover" style={{ maxHeight: '520px', objectPosition: 'top' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.7) 0%, transparent 50%)' }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="rounded-xl px-5 py-4" style={{ background: 'rgba(0,17,35,0.85)', border: '1px solid rgba(122,98,7,0.3)' }}>
                      <p className="text-sm font-semibold" style={{ color: '#c4a217' }}>Tom Queiroz</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>Ex-executivo Sony, Honda, Rakuten e Shell · 20 anos de C-Suite</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TABS / ÍNDICE ── sticky */}
        <div ref={tabsRef} className={`z-30 transition-all duration-300 ${tabsSticky ? 'fixed top-[72px] left-0 right-0 shadow-lg' : 'relative'}`}
          style={{ background: '#001123', borderBottom: '1px solid rgba(122,98,7,0.3)' }}>
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-0 scrollbar-hide">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => scrollTo(tab.id)}
                  className="px-5 py-4 text-sm whitespace-nowrap transition-all font-medium border-b-2 flex-shrink-0"
                  style={{
                    color: activeTab === tab.id ? '#c4a217' : 'rgba(255,255,255,0.6)',
                    borderBottomColor: activeTab === tab.id ? '#c4a217' : 'transparent',
                    background: 'transparent',
                    letterSpacing: '0.04em'
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {tabsSticky && <div style={{ height: '53px' }} />}

        {/* ── PROPÓSITO ── white */}
        <section className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#7a6207' }}>O PRINCÍPIO FUNDAMENTAL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123', lineHeight: 1.15 }}
                className="text-3xl lg:text-4xl xl:text-5xl mb-6">
                "Mentoria não é consultoria. É a transferência direta de modelos mentais testados."
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#334155', fontWeight: 300 }}>
                Pesquisas da Harvard Business School mostram que executivos com mentores ativos atingem posições de liderança sênior 
                em média 5 anos antes e reportam 23% mais satisfação com sua trajetória. A mentoria 1:1 com Tom Queiroz vai além da 
                orientação — é uma parceria de transformação onde cada sessão é construída inteiramente ao redor do seu momento, do 
                seu mercado e dos seus objetivos específicos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PARA QUEM É ── gray */}
        <section id="para-quem" className="py-20" style={{ background: '#f8f9fa' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>PERFIL IDEAL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Para Quem É Esta Mentoria</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: TrendingUp, title: 'Executivo em Transição', desc: 'Você está mirando o próximo nível — de VP para C-Suite, de gestor para líder estratégico — e precisa de um mapa claro, não de teoria.', tag: 'C-Suite Track' },
                { icon: Zap, title: 'Founder Escalando', desc: 'Você fundou ou co-fundou uma empresa e enfrenta os desafios reais de escala: time, produto, mercado e o peso da liderança solitária.', tag: 'Startup & Scale-up' },
                { icon: Brain, title: 'Líder Dominando IA', desc: 'Você sente a urgência da IA e quer ir além dos buzzwords — com implementação real, impacto mensurável e liderança de transformação.', tag: 'AI-First Leader' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl p-8 flex flex-col gap-4"
                  style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,17,35,0.07)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                  </div>
                  <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full w-fit" style={{ background: 'rgba(122,98,7,0.1)', color: '#7a6207' }}>{item.tag}</span>
                  <h3 className="text-xl font-bold" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METODOLOGIA ── dark navy */}
        <section id="metodologia" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>PROCESSO EXCLUSIVO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff' }}
                className="text-3xl lg:text-4xl">Metodologia Exclusiva</h2>
              <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                Desenvolvida ao longo de 20 anos de execução em mercados complexos, nossa metodologia combina rigor analítico com intuição executiva.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Pré-Diagnóstico Minucioso', desc: 'Assessment profundo de perfil, histórico, gaps e objetivos. Entendemos onde você está antes de definir onde quer chegar.' },
                { num: '02', title: 'Mapeamento de Gaps', desc: 'Identificação precisa dos gaps de habilidade, mindset e visibilidade que impedem o próximo salto na carreira.' },
                { num: '03', title: 'Plano Personalizado', desc: 'Roadmap único: metas mensuráveis, sessões estruturadas, recursos específicos e milestones de 30/60/90 dias.' },
                { num: '04', title: 'Acompanhamento Contínuo', desc: 'Suporte assíncrono entre sessões, ajustes de rota em tempo real e accountability estruturado para manter o momentum.' },
              ].map((step, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl p-7"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(122,98,7,0.25)' }}>
                  <div className="text-4xl font-black mb-4" style={{ color: 'rgba(122,98,7,0.4)', fontFamily: 'Montserrat, sans-serif' }}>{step.num}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MÓDULOS ── white */}
        <section id="modulos" className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>CONTEÚDO PROGRAMÁTICO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Módulos Programáticos</h2>
              <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: '#64748b', fontWeight: 300 }}>
                5 pilares de desenvolvimento para líderes de alto impacto — personalizados de acordo com seu momento e contexto.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Executive Presence & Personal Brand', duration: '3–4 semanas', topics: ['Autoridade executiva e comunicação de impacto', 'Construção de marca pessoal B2B e LinkedIn', 'Storytelling executivo para líderes', 'Presença em board e stakeholders sênior'] },
                { icon: Brain, title: 'AI-First Decision Making', duration: '3–4 semanas', topics: ['Frameworks de decisão acelerada com IA', 'Ferramentas de análise preditiva para líderes', 'Implementação de IA em processos de gestão', 'AI literacy para o C-Suite'] },
                { icon: TrendingUp, title: 'Career Architecture for Senior Leaders', duration: '2–3 semanas', topics: ['Mapeamento de trajetória para C-Suite', 'Negociação e posicionamento salarial sênior', 'Transições inter-setoriais estratégicas', 'Board readiness e advisory roles'] },
                { icon: Users, title: 'Stakeholder Influence & Politics', duration: '2–3 semanas', topics: ['Navegação de política organizacional', 'Influência sem autoridade formal', 'Gestão de board e acionistas', 'Construção de coalizões internas'] },
                { icon: BarChart3, title: 'Data-Driven Growth Strategy', duration: '2–4 semanas', topics: ['OKRs e KPIs estratégicos de marketing', 'Revenue architecture e pipeline management', 'Attribution modeling avançado', 'Growth loops e flywheel estratégico'] },
              ].map((mod, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl p-7"
                  style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(122,98,7,0.1)' }}>
                      <mod.icon className="w-5 h-5" style={{ color: '#7a6207' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{mod.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(122,98,7,0.1)', color: '#7a6207', fontWeight: 600 }}>{mod.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {mod.topics.map((t, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#475569', fontWeight: 300 }}>
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#7a6207' }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Copper CTA card */}
              <motion.div {...fadeUp} transition={{ delay: 0.4, duration: 0.5 }}
                className="rounded-2xl p-7 flex flex-col justify-between"
                style={{ background: 'linear-gradient(135deg, #7a6207 0%, #a07d08 100%)', border: 'none' }}>
                <div>
                  <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>PERSONALIZAÇÃO TOTAL</p>
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Todos os programas são adaptados ao seu perfil após o pré-diagnóstico individual.
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}>
                    Não existe uma mentoria igual a outra. Cada jornada é única.
                  </p>
                </div>
                <Button variant="outline" className="w-fit font-semibold"
                  style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', background: 'rgba(255,255,255,0.1)' }}
                  onClick={() => scrollTo('solicitar')}>
                  Iniciar Agora
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COMPARATIVO ── light gray */}
        <section className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>REASON-WHY</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Por Que Mentoria com Tom Queiroz</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-6 h-6 text-red-400" />
                  <h3 className="text-lg font-bold" style={{ color: '#334155' }}>Sem Mentoria Estratégica</h3>
                </div>
                <ul className="space-y-4">
                  {['Tentativa e erro custoso em transições críticas','Decisões sem respaldo de quem já passou pelo desafio','Crescimento lento sem accountability externo','Blind spots de carreira que você não vê','Network limitado ao círculo atual'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#64748b', fontWeight: 300 }}>
                      <span className="mt-1.5 w-4 h-0.5 flex-shrink-0" style={{ background: '#cbd5e1' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-8" style={{ background: '#001123' }}>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6" style={{ color: '#c4a217' }} />
                  <h3 className="text-lg font-bold text-white">Com Tom Queiroz</h3>
                </div>
                <ul className="space-y-4">
                  {['Mapa claro e testado para o próximo salto','20 anos de experiência aplicados ao seu desafio','Accountability semanal que mantém o momentum','Perspectiva externa que expande suas possibilidades','Acesso à rede de 500+ executivos mentoreados'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#c4a217' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── RESULTADOS ── copper */}
        <section id="resultados" style={{ background: 'linear-gradient(135deg, #7a6207 0%, #5c4a05 100%)' }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>IMPACTO MENSURÁVEL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff' }}
                className="text-3xl lg:text-4xl">Resultados Comprovados</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { stat: '+40%', label: 'Clareza Estratégica', detail: 'em média após 90 dias de mentoria ativa' },
                { stat: '500+', label: 'Executivos Mentoreados', detail: 'ao longo de 20 anos de carreira' },
                { stat: '94', label: 'NPS Médio', detail: 'satisfaction score consistente em todos os programas' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-center rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div className="text-5xl font-black mb-2 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.stat}</div>
                  <div className="text-lg font-bold mb-1 text-white">{item.label}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>{item.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULÁRIO ── white */}
        <section id="solicitar" className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div {...fadeUp} className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>PRIMEIRO PASSO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl mb-4">Solicitar Diagnóstico Gratuito</h2>
              <p style={{ color: '#64748b', fontWeight: 300 }}>Preencha o formulário abaixo. Tom ou um especialista WQI retornará em até 24h úteis.</p>
            </motion.div>

            {success ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: '#001123' }}>
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#c4a217' }} />
                <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>Retornaremos em até 24h úteis para agendar seu diagnóstico.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
                style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#001123' }}>Nome Completo *</label>
                    <Input name="full_name" required value={formData.full_name} onChange={handleChange}
                      className="bg-white border-slate-200" placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#001123' }}>E-mail Profissional *</label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="bg-white border-slate-200" placeholder="email@empresa.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#001123' }}>WhatsApp</label>
                    <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                      className="bg-white border-slate-200" placeholder="+55 11 99999-9999" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#001123' }}>Empresa</label>
                    <Input name="company" value={formData.company} onChange={handleChange}
                      className="bg-white border-slate-200" placeholder="Sua empresa" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#001123' }}>Cargo Atual</label>
                  <Input name="role" value={formData.role} onChange={handleChange}
                    className="bg-white border-slate-200" placeholder="Ex.: VP de Marketing, CMO, Founder" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#001123' }}>Qual é o seu principal desafio agora?</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange}
                    className="bg-white border-slate-200 min-h-[110px]"
                    placeholder="Descreva brevemente onde você está e onde quer chegar..." />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" size="lg" disabled={loading} className="w-full text-white font-semibold"
                  style={{ background: '#7a6207' }}>
                  {loading ? 'Enviando...' : 'Solicitar Diagnóstico Gratuito'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                  Seus dados são protegidos. Retorno em até 24h úteis.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ── CTA FINAL ── navy */}
        <section className="py-16" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4 text-center">
            <motion.div {...fadeUp}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff' }}
                className="text-3xl lg:text-4xl mb-4">Pronto para o Próximo Nível?</h2>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                Converse agora com um especialista WQI e descubra o programa ideal para você.
              </p>
              <Button size="lg" asChild className="font-semibold text-white px-10"
                style={{ background: '#7a6207', border: 'none' }}>
                <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20Mentoria%201:1" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Falar com Especialista Agora
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  )
}
