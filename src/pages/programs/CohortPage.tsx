import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Target, TrendingUp, Calendar, Clock, CheckCircle2, Star, Award, Zap, ChevronRight, ArrowRight, Shield } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'jornada', label: 'Jornada de 6 Meses' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'formato', label: 'Formato Semanal' },
  { id: 'proxima-turma', label: 'Próxima Turma' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export default function CohortPage() {
  const { submitLead, loading, success, error, reset } = useSubmitLead('mentoria_cohort_leads')
  const [formData, setFormData] = useState({ full_name: '', email: '', whatsapp: '', company: '', role: '' })
  const [activeTab, setActiveTab] = useState('para-quem')
  const tabsRef = useRef<HTMLDivElement>(null)
  const [tabsSticky, setTabsSticky] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Layout>
      <div className="min-h-screen" id="top">

        {/* ── HERO ── dark navy */}
        <section style={{ background: '#001123' }} className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ background: 'radial-gradient(ellipse 90% 60% at 30% 50%, rgba(122,98,7,0.12) 0%, transparent 70%)' }} className="absolute inset-0" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(122,98,7,0.5)', background: 'rgba(122,98,7,0.12)' }}>
                  <Users className="w-4 h-4" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold tracking-widest" style={{ color: '#c4a217' }}>COHORT EXECUTIVO — TURMAS FECHADAS</span>
                </div>
                <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
                  className="text-4xl lg:text-5xl xl:text-6xl mb-6">
                  Sua Maior Vantagem Competitiva Pode Estar Sentada ao Seu Lado
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                  Os melhores líderes do mundo não aprendem sozinhos. Aprendem em comunidade — com pares que os desafiam, parceiros que os expandem e um mentor que os orienta.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-xl px-4 py-2" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.3)' }}>
                    <Calendar className="w-4 h-4" style={{ color: '#c4a217' }} />
                    <span className="text-sm font-semibold" style={{ color: '#c4a217' }}>Próxima turma: Agosto 2026</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl px-4 py-2" style={{ background: 'rgba(196,162,23,0.1)', border: '1px solid rgba(196,162,23,0.3)' }}>
                    <Star className="w-4 h-4" style={{ color: '#c4a217' }} />
                    <span className="text-sm font-semibold" style={{ color: '#c4a217' }}>Apenas 3 vagas</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Button size="lg" className="text-white font-semibold"
                    style={{ background: '#7a6207', border: 'none' }}
                    onClick={() => scrollTo('proxima-turma')}>
                    <FaWhatsapp className="mr-2 h-5 w-5" />
                    Garantir Minha Vaga
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                    asChild>
                    <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="mr-2 h-4 w-4" /> Conectar com Tom
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
                  <img src={IMAGES.PROG_COHORT_1} alt="Cohort Executivo" className="w-full h-auto" style={{ maxHeight: '480px', objectFit: 'cover' }} />
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

        {/* ── POR QUE COHORT ── white */}
        <section className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#7a6207' }}>O PODER DO COLETIVO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl mb-6">Peer Learning: A Vantagem Competitiva que Poucos Exploram</h2>
              <p className="text-lg leading-relaxed mb-12" style={{ color: '#475569', fontWeight: 300 }}>
                Estudos do Yale Global Leadership Program mostram que líderes em programas cohort têm 2.3x mais probabilidade de promoção em 12 meses. 
                O aprendizado peer-to-peer com pares de alto calibre expande sua perspectiva de formas que nenhum livro ou curso individual consegue replicar.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Users, title: 'Pares que Elevam', desc: 'Cada participante é cuidadosamente selecionado. Você estará rodeado de pessoas que te desafiam e te expandem.' },
                { icon: Shield, title: 'Accountability Real', desc: 'A pressão positiva do grupo cria momentum que a auto-disciplina sozinha raramente sustenta.' },
                { icon: TrendingUp, title: 'Rede de Valor', desc: 'Ao final dos 6 meses, você terá uma rede de 8-12 executivos de alto nível com quem cresceu juntos.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA QUEM É ── gray */}
        <section id="para-quem" className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>CRITÉRIOS DE SELEÇÃO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Perfil dos Participantes</h2>
              <p className="mt-4 max-w-2xl mx-auto text-base" style={{ color: '#64748b', fontWeight: 300 }}>
                O programa Cohort é seletivo por design. Apenas participantes com o perfil certo garantem a qualidade coletiva que transforma cada sessão.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Award, title: 'C-Suite ou VP+', desc: 'Executivos em posições de liderança sênior ou em transição para este nível' },
                { icon: Clock, title: '10+ Anos de Experiência', desc: 'Trajetória consolidada com histórico de resultados mensuráveis' },
                { icon: Zap, title: 'Growth Mindset', desc: 'Abertura genuína para desafio, feedback e crescimento acelerado' },
                { icon: Target, title: 'Comprometimento Total', desc: 'Presença consistente nas sessões e participação ativa no grupo' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 text-center" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                  </div>
                  <h3 className="font-bold mb-2 text-base" style={{ color: '#001123' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: '#64748b', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JORNADA DOS 6 MESES ── navy */}
        <section id="jornada" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>ESTRUTURA DO PROGRAMA</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff' }}
                className="text-3xl lg:text-4xl">A Jornada de 6 Meses</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { month: 'M1', title: 'Diagnóstico e Alinhamento', desc: 'Assessment individual profundo. Definição de objetivos pessoais e do grupo. Criação do contrato de cohort.' },
                { month: 'M2', title: 'Estratégia e Posicionamento', desc: 'Go-to-market individual. Posicionamento de carreira. Digital presence strategy. Exercícios peer-to-peer.' },
                { month: 'M3', title: 'Execução e KPIs', desc: 'Implementação das estratégias. Definição de KPIs e tracking. Primeiras revisões de resultados.' },
                { month: 'M4', title: 'Liderança e Influência', desc: 'Stakeholder management avançado. Comunicação executiva. Cultura de alta performance e políticas organizacionais.' },
                { month: 'M5', title: 'IA e Inovação', desc: 'AI-First leadership. Ferramentas de decisão aumentada por IA. Innovation sprints com o grupo.' },
                { month: 'M6', title: 'Legado e Próximo Nível', desc: 'Consolidação dos resultados. Planejamento do próximo nível. Celebração e ativação da rede do cohort.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-7 flex gap-5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(122,98,7,0.25)' }}>
                  <div className="text-3xl font-black flex-shrink-0 mt-1" style={{ color: '#c4a217', fontFamily: 'Montserrat, sans-serif' }}>{item.month}</div>
                  <div>
                    <h3 className="font-bold mb-2 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{item.desc}</p>
                  </div>
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
                className="text-3xl lg:text-4xl">5 Módulos de Alto Impacto</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Go-To-Market Strategy in the AI Era', topics: ['Customer segmentation com IA preditiva', 'Revenue architecture e flywheel growth', 'Digital channels optimization 2026', 'Competitive intelligence automatizada'] },
                { title: 'Digital Revenue Architecture', topics: ['Pipeline design e lead lifecycle', 'Marketing attribution multi-touch', 'CRO e conversion rate science', 'Pricing strategy e value capture'] },
                { title: 'Leading High-Performance Teams', topics: ['Hiring para times digitais de elite', 'Performance management data-driven', 'Cultura de inovação contínua', 'Remote leadership avançado'] },
                { title: 'Executive Communication & Influence', topics: ['Apresentações executivas de alto impacto', 'Narrativa estratégica para C-Suite', 'Influence sem autoridade formal', 'Thought leadership B2B'] },
                { title: 'Innovation Sprint Methodology', topics: ['Design Sprint adaptado para executivos', 'Rapid prototyping de ideias de negócio', 'Gestão de portfólio de inovação', 'From insight to MVP em 5 dias'] },
              ].map((mod, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-7" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                  <h3 className="font-bold text-base mb-4" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{mod.title}</h3>
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
            </div>
          </div>
        </section>

        {/* ── FORMATO ── copper */}
        <section id="formato" style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>CADÊNCIA SEMANAL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }} className="text-3xl lg:text-4xl">
                Formato Semanal do Programa
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, time: '2h/semana', title: 'Sessão Coletiva', desc: 'Análise de casos, apresentações dos participantes e orientação do mentor' },
                { icon: Shield, time: '1h/semana', title: 'Peer Accountability', desc: 'Grupos menores de 3-4 pessoas para revisão de metas e desafios' },
                { icon: Star, time: '30min/semana', title: 'Mentor Office Hours', desc: 'Acesso direto a Tom para questões específicas e pontos cegos' },
                { icon: Zap, time: 'Assíncrono', title: 'Comunidade Slack', desc: 'Canal exclusivo para troca entre sessões, recursos e networking contínuo' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7 text-center" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                  <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.time}</div>
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTADOS ── gray */}
        <section className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>IMPACTO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }} className="text-3xl lg:text-4xl">
                Resultados dos Nossos Cohorts
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { stat: '2.3x', label: 'Taxa de Promoção', detail: 'nos 12 meses pós-programa' },
                { stat: '8–12', label: 'Executivos por Turma', detail: 'seleção rigorosa garantida' },
                { stat: '6', label: 'Meses de Jornada', detail: 'com acompanhamento contínuo' },
                { stat: '94', label: 'NPS Médio', detail: 'satisfação dos participantes' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7 text-center" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div className="text-4xl font-black mb-2" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>{item.stat}</div>
                  <div className="font-bold mb-1 text-sm" style={{ color: '#001123' }}>{item.label}</div>
                  <div className="text-xs" style={{ color: '#94a3b8', fontWeight: 300 }}>{item.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRÓXIMA TURMA ── navy */}
        <section id="proxima-turma" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <motion.div {...fadeUp}>
                <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#c4a217' }}>VAGAS LIMITADAS</p>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                  className="text-3xl lg:text-4xl mb-6">Próxima Turma: Agosto 2026</h2>
                <div className="rounded-2xl p-6 mb-6" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.3)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#c4a217' }} />
                    <span className="font-bold" style={{ color: '#c4a217' }}>Apenas 3 vagas disponíveis</span>
                  </div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
                    O processo de seleção inclui um briefing de 30 minutos para garantir o fit entre o candidato e o grupo. 
                    Candidatos aprovados recebem confirmação em até 72h.
                  </p>
                </div>
                <ul className="space-y-3">
                  {['Início: Agosto de 2026','Duração: 6 meses','Formato: Semanal ao vivo + async','Idioma: Português','Vagas: 8-12 executivos selecionados'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#c4a217' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
                {success ? (
                  <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
                    <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#c4a217' }} />
                    <h3 className="text-xl font-bold text-white mb-2">Candidatura Recebida</h3>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Retornaremos em até 72h para agendar seu briefing de seleção.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(122,98,7,0.3)' }}>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Candidatar-se ao Cohort</h3>
                    <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                      Preencha e nossa equipe entrará em contato para o briefing de seleção.
                    </p>
                    {[
                      { name: 'full_name', label: 'Nome Completo *', placeholder: 'Seu nome', type: 'text', required: true },
                      { name: 'email', label: 'E-mail Profissional *', placeholder: 'email@empresa.com', type: 'email', required: true },
                      { name: 'whatsapp', label: 'WhatsApp', placeholder: '+55 11 99999-9999', type: 'text', required: false },
                      { name: 'company', label: 'Empresa', placeholder: 'Sua empresa', type: 'text', required: false },
                      { name: 'role', label: 'Cargo Atual', placeholder: 'VP, CMO, Founder...', type: 'text', required: false },
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
                    <Button type="submit" size="lg" disabled={loading} className="w-full text-white font-semibold"
                      style={{ background: '#7a6207' }}>
                      {loading ? 'Enviando...' : 'Candidatar-se ao Cohort'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── copper */}
        <section style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div {...fadeUp}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl mb-4">Pronto para Crescer com os Melhores?</h2>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                Vagas são limitadas por design. Candidate-se agora ou fale diretamente com um especialista.
              </p>
              <Button size="lg" asChild className="font-semibold text-white px-10"
                style={{ background: '#001123', border: '1px solid rgba(255,255,255,0.3)' }}>
                <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20saber%20sobre%20o%20Cohort%20Executivo" target="_blank" rel="noopener noreferrer">
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
