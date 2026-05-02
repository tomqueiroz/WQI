import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, ArrowRight, Brain, Zap, BarChart3, TrendingUp, Clock, Users, Target, ChevronRight, Award, Sparkles, Calendar } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'modulos', label: 'Conteúdo Programático' },
  { id: 'formato', label: 'Formato' },
  { id: 'lista-espera', label: 'Lista de Espera' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export default function MasterclassPage() {
  const { submitLead, loading, success, error } = useSubmitLead('masterclass_ai_leads')
  const [formData, setFormData] = useState({ full_name: '', email: '', whatsapp: '', company: '', role: '' })
  const [activeTab, setActiveTab] = useState('para-quem')
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
    await submitLead(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <Layout>
      <div className="min-h-screen" id="top">

        {/* ── HERO ── dark navy */}
        <section style={{ background: '#001123' }} className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ background: 'radial-gradient(ellipse 100% 70% at 80% 50%, rgba(122,98,7,0.15) 0%, transparent 70%)' }} className="absolute inset-0" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(122,98,7,0.5)', background: 'rgba(122,98,7,0.12)' }}>
                  <Brain className="w-4 h-4" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold tracking-widest" style={{ color: '#c4a217' }}>MASTERCLASS — AI FIRST LEADERSHIP</span>
                </div>
                <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
                  className="text-4xl lg:text-5xl xl:text-6xl mb-6">
                  Domine a IA Antes Que a IA Domine o Seu Mercado
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                  Uma masterclass intensa de 2 dias que transforma executivos em líderes AI-First: com frameworks práticos, ferramentas reais e clareza estratégica para agir imediatamente.
                </p>
                <div className="flex items-center gap-3 mb-8 p-4 rounded-xl" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.3)' }}>
                  <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold" style={{ color: '#c4a217' }}>Próxima edição: Setembro 2026 — Vagas limitadas a 40 participantes</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="text-white font-semibold"
                    style={{ background: '#7a6207' }}
                    onClick={() => scrollTo('lista-espera')}>
                    Entrar na Lista de Espera
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                    asChild>
                    <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="mr-2 h-4 w-4" /> Conectar com Tom
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
                  <img src={IMAGES.PROG_MASTERCLASS_1} alt="AI Masterclass" className="w-full h-auto" style={{ maxHeight: '480px', objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.6) 0%, transparent 50%)' }} />
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl px-5 py-4" style={{ background: 'rgba(0,17,35,0.85)', border: '1px solid rgba(122,98,7,0.3)' }}>
                    <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#c4a217' }}>EXCLUSIVO</p>
                    <p className="text-sm text-white" style={{ fontWeight: 300 }}>Apenas 40 participantes por edição. 100% ao vivo com Tom Queiroz.</p>
                  </div>
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

        {/* ── URGÊNCIA ── white */}
        <section className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#7a6207' }}>O CONTEXTO URGENTE</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl mb-6">
                O Líder Que Não Entende IA em 2026 Toma Decisões no Escuro
              </h2>
              <p className="text-lg leading-relaxed mb-12" style={{ color: '#475569', fontWeight: 300 }}>
                McKinsey Global Institute prevê que 70% das funções executivas incorporarão ferramentas de IA até 2027. 
                Líderes que não desenvolvem AI literacy estratégica hoje estarão gerenciando recursos com visão limitada, 
                enquanto pares mais ágeis acelerarão suas decisões e resultados em até 5x.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { stat: '5x', label: 'Velocidade de Decisão', detail: 'com ferramentas de IA bem implementadas' },
                  { stat: '70%', label: 'das Funções Executivas', detail: 'incorporarão IA até 2027 (McKinsey)' },
                  { stat: '2 Dias', label: 'de Imersão Total', detail: 'para mudar sua relação com a IA para sempre' },
                ].map((item, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                    className="rounded-2xl p-7" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                    <div className="text-4xl font-black mb-2" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>{item.stat}</div>
                    <div className="font-bold mb-1" style={{ color: '#001123' }}>{item.label}</div>
                    <div className="text-sm" style={{ color: '#94a3b8', fontWeight: 300 }}>{item.detail}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PARA QUEM É ── gray */}
        <section id="para-quem" className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>PERFIL IDEAL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Para Quem É Esta Masterclass</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: 'CMO & VP de Marketing', desc: 'Que precisa traduzir IA em vantagem competitiva real — não em buzzword no slide de estratégia.' },
                { icon: Target, title: 'CEO & Founders', desc: 'Que quer tomar decisões estratégicas com dados preditivos e IA aplicada ao negócio.' },
                { icon: BarChart3, title: 'COO & CTO', desc: 'Que busca frameworks de automação inteligente e eficiência operacional com IA.' },
                { icon: Brain, title: 'Diretores de Inovação', desc: 'Que precisa de metodologia clara para criar e escalar projetos de IA dentro da organização.' },
                { icon: Sparkles, title: 'Líderes de Transformação Digital', desc: 'Que quer acelerar a adoção de IA na cultura e nos processos da empresa.' },
                { icon: Users, title: 'Executivos em Transição', desc: 'Que quer se posicionar como AI-First Leader no mercado e ampliar sua empregabilidade.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-7" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon className="w-5 h-5" style={{ color: '#7a6207' }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METODOLOGIA ── navy */}
        <section id="metodologia" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>FRAMEWORK EXCLUSIVO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">O AI-First Leadership Framework™</h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                Desenvolvido por Tom Queiroz com base em 500 casos reais de implementação de IA em organizações brasileiras e internacionais.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Diagnóstico de Maturidade AI', desc: 'Avalie objetivamente onde você e sua organização estão na curva de adoção de IA.' },
                { num: '02', title: 'Mapeamento de Oportunidades', desc: 'Identifique os 3 processos de maior impacto para automação e augmentation com IA.' },
                { num: '03', title: 'Implementação Progressiva', desc: 'Frameworks práticos para implementar IA sem disruption do time e sem dependência de TI.' },
                { num: '04', title: 'Cultura AI-First', desc: 'Como criar uma cultura onde a IA é utilizada naturalmente em todas as decisões.' },
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

        {/* ── MÓDULOS / CONTEÚDO ── white */}
        <section id="modulos" className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>AGENDA DOS 2 DIAS</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Conteúdo Programático</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl p-8" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#001123' }}>
                    <span className="text-xs font-bold text-white">D1</span>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>Dia 1 — Estratégia AI-First</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Fundamentos de IA para executivos: o que realmente importa',
                    'O estado da arte: GPT-4, Claude, Gemini e o que vem aí',
                    'AI-First Decision Framework™ aplicado ao seu negócio',
                    'Marketing e vendas aumentados por IA: casos reais',
                    'Workshop: mapeamento de oportunidades na sua empresa',
                    'Ferramentas essenciais: demonstração e hands-on',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#475569', fontWeight: 300 }}>
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#7a6207' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-8" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#7a6207' }}>
                    <span className="text-xs font-bold text-white">D2</span>
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>Dia 2 — Implementação e Cultura</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Automação inteligente: processos, fluxos e ROI mensurável',
                    'Construindo times AI-Ready: hiring e upskilling',
                    'Change management para adoção de IA na cultura',
                    'Proteção de dados e governança de IA (LGPD + frameworks)',
                    'Plano de implementação: primeiros 90 dias na sua empresa',
                    'Pitch e apresentação do plano: feedback ao vivo de Tom',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#475569', fontWeight: 300 }}>
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#7a6207' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORMATO ── copper */}
        <section id="formato" style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>COMO FUNCIONA</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Formato da Masterclass</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: '2 Dias Intensivos', desc: '9h às 18h nos dois dias, com intervalos e networking' },
                { icon: Users, title: 'Máx. 40 Pessoas', desc: 'Turma reduzida para garantir acesso e interação real com Tom' },
                { icon: Award, title: 'Certificado WQI', desc: 'Certificação de AI-First Leader emitida pela WQI Development' },
                { icon: Zap, title: 'Material Exclusivo', desc: 'Templates, frameworks e playbooks para implementação imediata' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7 text-center" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LISTA DE ESPERA ── navy */}
        <section id="lista-espera" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4 max-w-xl">
            <motion.div {...fadeUp} className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>SEJA O PRIMEIRO A SABER</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl mb-4">Entrar na Lista de Espera</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                As vagas abrirão primeiro para a lista de espera. Inscreva-se para garantir prioridade e receber informações quando a nova edição for anunciada.
              </p>
            </motion.div>
            {success ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
                <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#c4a217' }} />
                <h3 className="text-xl font-bold text-white mb-2">Você está na Lista!</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Enviaremos informações sobre a próxima edição assim que disponível.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(122,98,7,0.3)' }}>
                {[
                  { name: 'full_name', label: 'Nome Completo *', type: 'text', required: true, placeholder: 'Seu nome' },
                  { name: 'email', label: 'E-mail *', type: 'email', required: true, placeholder: 'email@empresa.com' },
                  { name: 'whatsapp', label: 'WhatsApp', type: 'text', required: false, placeholder: '+55 11 99999-9999' },
                  { name: 'company', label: 'Empresa', type: 'text', required: false, placeholder: 'Sua empresa' },
                  { name: 'role', label: 'Cargo', type: 'text', required: false, placeholder: 'Ex.: CMO, CEO, VP...' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold mb-2 text-white">{field.label}</label>
                    <Input name={field.name} type={field.type} required={field.required}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="text-white placeholder:text-white/30 border-white/10"
                      style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder={field.placeholder} />
                  </div>
                ))}
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" size="lg" disabled={loading} className="w-full text-white font-semibold" style={{ background: '#7a6207' }}>
                  {loading ? 'Enviando...' : 'Entrar na Lista de Espera'}
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
                className="text-3xl mb-4">Quer Falar Antes de Decidir?</h2>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                Um especialista WQI pode tirar todas as suas dúvidas em menos de 20 minutos.
              </p>
              <Button size="lg" asChild className="text-white font-semibold px-10"
                style={{ background: '#001123', border: '1px solid rgba(255,255,255,0.3)' }}>
                <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20saber%20sobre%20a%20Masterclass%20AI%20First" target="_blank" rel="noopener noreferrer">
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
