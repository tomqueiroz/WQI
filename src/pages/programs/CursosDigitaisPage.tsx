import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, ArrowRight, BookOpen, Play, Award, Clock, Users, Target, TrendingUp, Brain, ChevronRight, Zap, Sparkles, BarChart3, Calendar } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'trilhas', label: 'Trilhas de Conteúdo' },
  { id: 'formato', label: 'Formato' },
  { id: 'lista-espera', label: 'Lista de Espera' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export default function CursosDigitaisPage() {
  const { submitLead, loading, success, error } = useSubmitLead('digital_course_leads')
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
            <div style={{ background: 'radial-gradient(ellipse 100% 60% at 60% 50%, rgba(122,98,7,0.14) 0%, transparent 70%)' }} className="absolute inset-0" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(122,98,7,0.5)', background: 'rgba(122,98,7,0.12)' }}>
                  <BookOpen className="w-4 h-4" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold tracking-widest" style={{ color: '#c4a217' }}>CURSOS DIGITAIS PREMIUM</span>
                </div>
                <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
                  className="text-4xl lg:text-5xl xl:text-6xl mb-6">
                  Aprenda no Seu Tempo. Execute com Urgência.
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                  Cursos digitais premium desenvolvidos por Tom Queiroz — baseados nos mesmos frameworks usados com executivos C-Suite globais. Sem fluff. Sem rellotagem. 100% aplicável no dia seguinte.
                </p>
                <div className="flex items-center gap-3 mb-8 p-4 rounded-xl" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.3)' }}>
                  <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: '#c4a217' }} />
                  <span className="text-sm" style={{ color: '#c4a217', fontWeight: 500 }}>
                    Novos cursos em produção. Inscreva-se para ser notificado no lançamento.
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="text-white font-semibold"
                    style={{ background: '#7a6207' }}
                    onClick={() => scrollTo('lista-espera')}>
                    Ser Notificado no Lançamento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                    asChild>
                    <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="mr-2 h-4 w-4" /> Seguir Tom
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
                  <img src={IMAGES.PROG_DIGITAL_2} alt="Cursos Digitais" className="w-full h-auto" style={{ maxHeight: '480px', objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.7) 0%, transparent 45%)' }} />
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl px-5 py-4"
                    style={{ background: 'rgba(0,17,35,0.88)', border: '1px solid rgba(122,98,7,0.3)' }}>
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5" style={{ color: '#c4a217' }} />
                      <p className="text-sm text-white" style={{ fontWeight: 300 }}>Cursos 100% online. Acesso vitalício após o lançamento.</p>
                    </div>
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

        {/* ── POR QUE CURSOS DIGITAIS ── white */}
        <section className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#7a6207' }}>O PRINCÍPIO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl mb-6">
                "O maior obstáculo para o aprendizado executivo não é acesso — é relevância."
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#475569', fontWeight: 300 }}>
                A maioria dos cursos online repete o óbvio ou foi criada por teóricos que nunca testaram suas próprias ideias. 
                Os cursos digitais WQI são diferentes: cada módulo foi desenvolvido com base em situações reais vividas por Tom Queiroz 
                em C-Suite de empresas globais como Sony, Honda, Rakuten e Shell — e testado com centenas de executivos brasileiros.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PARA QUEM É ── gray */}
        <section id="para-quem" className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>PERFIL IDEAL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Para Quem São os Cursos Digitais WQI</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: 'Profissionais de Marketing', desc: 'Que querem dominar as novas fronteiras do marketing digital — IA, dados, automação e performance avançada.' },
                { icon: Brain, title: 'Gestores em Evolução', desc: 'Que precisam de frameworks práticos de liderança para gerir times digitais de alta performance.' },
                { icon: Target, title: 'Empreendedores Digitais', desc: 'Que querem estratégias testadas por executivos globais aplicadas à realidade das startups e PMEs brasileiras.' },
                { icon: Zap, title: 'Profissionais de IA', desc: 'Que precisam desenvolver visão estratégica e vocabulário executivo para posicionar IA nas suas organizações.' },
                { icon: BarChart3, title: 'Analistas e Especialistas', desc: 'Que buscam avançar para posições de liderança e precisam desenvolver o pensamento estratégico de um executivo.' },
                { icon: Sparkles, title: 'Lifelong Learners', desc: 'Profissionais comprometidos com desenvolvimento contínuo que buscam aprendizado denso, relevante e aplicável.' },
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

        {/* ── DIFERENCIAIS ── navy */}
        <section id="diferenciais" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>POR QUE WQI</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Diferenciais dos Cursos WQI</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Brain, title: 'Conteúdo de C-Suite Real', desc: 'Desenvolvido por quem executou — não apenas estudou — as estratégias ensinadas.' },
                { icon: Play, title: 'Formato Denso e Direto', desc: 'Sem rellotagem. Cada minuto de vídeo entrega valor. Módulos de 15-30 min aplicáveis imediatamente.' },
                { icon: Award, title: 'Certificação WQI', desc: 'Certificado com credibilidade no mercado executivo e no LinkedIn.' },
                { icon: Users, title: 'Comunidade Exclusiva', desc: 'Acesso ao grupo de ex-alunos WQI — uma rede de profissionais de alto nível.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(122,98,7,0.25)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ background: 'rgba(122,98,7,0.15)' }}>
                    <item.icon className="w-6 h-6" style={{ color: '#c4a217' }} />
                  </div>
                  <h3 className="font-bold mb-2 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRILHAS ── copper */}
        <section id="trilhas" style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>CONTEÚDO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Trilhas de Conteúdo em Desenvolvimento</h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                Cinco trilhas sendo desenvolvidas simultaneamente para lançamento em 2026.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Brain, title: 'AI-First Marketing', duration: '8 módulos · 4h total', topics: ['IA generativa aplicada ao marketing', 'Prompts avançados para conteúdo', 'Automação de campanhas com IA', 'Analytics preditivo para líderes'] },
                { icon: TrendingUp, title: 'Digital Revenue Architecture', duration: '10 módulos · 5h total', topics: ['Pipeline design e lifecycle', 'Attribution modeling avançado', 'CRO e otimização de conversão', 'Revenue operations (RevOps)'] },
                { icon: Target, title: 'Executive Personal Brand', duration: '6 módulos · 3h total', topics: ['Posicionamento estratégico no LinkedIn', 'Storytelling executivo B2B', 'Thought leadership e PR digital', 'Visibilidade sem vaidade'] },
                { icon: Users, title: 'High-Performance Leadership', duration: '8 módulos · 4h total', topics: ['Hiring para times digitais', 'Gestão de performance data-driven', 'Feedback radical e cultura de alto nível', 'Remote leadership avançado'] },
                { icon: BarChart3, title: 'Data Literacy for Leaders', duration: '6 módulos · 3h total', topics: ['Leitura de dashboards executivos', 'KPIs que realmente importam', 'Decisões baseadas em dados', 'Comunicação de dados para board'] },
              ].map((trilha, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                  <trilha.icon className="w-7 h-7 mb-4 text-white" />
                  <h3 className="font-bold mb-1 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{trilha.title}</h3>
                  <p className="text-xs mb-4 font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>{trilha.duration}</p>
                  <ul className="space-y-2">
                    {trilha.topics.map((t, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300 }}>
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              <motion.div {...fadeUp} transition={{ delay: 0.5 }}
                className="rounded-2xl p-7 flex flex-col justify-center text-center" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                <Clock className="w-10 h-10 mx-auto mb-4 text-white" />
                <h3 className="font-bold text-xl text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Em Breve</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                  Inscreva-se na lista de espera e seja notificado no momento do lançamento com condições especiais de early bird.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FORMATO ── white */}
        <section id="formato" className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>EXPERIÊNCIA DE APRENDIZAGEM</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Formato dos Cursos</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Play, title: 'Videoaulas Diretas', desc: 'Módulos de 15-30 minutos gravados em alta qualidade. Sem enrolação.' },
                { icon: BookOpen, title: 'Material de Apoio', desc: 'Templates, playbooks e frameworks em PDF para aplicação imediata.' },
                { icon: Award, title: 'Avaliações Práticas', desc: 'Exercícios aplicados ao seu contexto real — não provas teóricas.' },
                { icon: Clock, title: 'Acesso Vitalício', desc: 'Uma vez comprado, acesse para sempre — com atualizações incluídas.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon className="w-6 h-6" style={{ color: '#7a6207' }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: '#001123', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LISTA DE ESPERA ── navy */}
        <section id="lista-espera" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4 max-w-xl">
            <motion.div {...fadeUp} className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>PRIORIDADE NO LANÇAMENTO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl mb-4">Entrar na Lista de Espera</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                Seja notificado primeiro quando os cursos forem lançados — e garanta condições especiais de early bird.
              </p>
            </motion.div>
            {success ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
                <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#c4a217' }} />
                <h3 className="text-xl font-bold text-white mb-2">Você está na Lista!</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Avisaremos você assim que os cursos estiverem disponíveis.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(122,98,7,0.3)' }}>
                {[
                  { name: 'full_name', label: 'Nome Completo *', type: 'text', required: true, placeholder: 'Seu nome' },
                  { name: 'email', label: 'E-mail *', type: 'email', required: true, placeholder: 'email@empresa.com' },
                  { name: 'whatsapp', label: 'WhatsApp', type: 'text', required: false, placeholder: '+55 11 99999-9999' },
                  { name: 'company', label: 'Empresa', type: 'text', required: false, placeholder: 'Sua empresa' },
                  { name: 'role', label: 'Cargo', type: 'text', required: false, placeholder: 'Ex.: Gerente de Marketing, CEO...' },
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
                <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Nenhum pagamento necessário agora. Notificaremos sobre o lançamento.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ── CTA FINAL ── copper */}
        <section style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div {...fadeUp}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl mb-4">Prefere Algo Mais Personalizado?</h2>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                Conheça os programas de mentoria 1:1 e Cohort para uma jornada de transformação mais profunda.
              </p>
              <Button size="lg" asChild className="text-white font-semibold px-10"
                style={{ background: '#001123', border: '1px solid rgba(255,255,255,0.3)' }}>
                <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos%20digitais" target="_blank" rel="noopener noreferrer">
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
