import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useSubmitLead } from '@/hooks/useSupabaseData'
import { IMAGES } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, ArrowRight, Mic, Target, TrendingUp, Users, Zap, BarChart3, Sparkles, Award, ChevronRight, Calendar, MapPin, Clock } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'

const TABS = [
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'formatos', label: 'Formatos de Palestra' },
  { id: 'temas', label: 'Temas Exclusivos' },
  { id: 'depoimentos', label: 'Feedbacks' },
  { id: 'contratar', label: 'Contratar Palestra' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export default function KeynotePage() {
  const { submitLead, loading, success, error } = useSubmitLead('keynote_leads')
  const [formData, setFormData] = useState({ full_name: '', email: '', whatsapp: '', company: '', role: '', message: '' })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <Layout>
      <div className="min-h-screen" id="top">

        {/* ── HERO ── dark navy */}
        <section style={{ background: '#001123' }} className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ background: 'radial-gradient(ellipse 90% 60% at 60% 50%, rgba(122,98,7,0.15) 0%, transparent 70%)' }} className="absolute inset-0" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(122,98,7,0.5)', background: 'rgba(122,98,7,0.12)' }}>
                  <Mic className="w-4 h-4" style={{ color: '#c4a217' }} />
                  <span className="text-sm font-semibold tracking-widest" style={{ color: '#c4a217' }}>KEYNOTE & PALESTRA EXECUTIVA</span>
                </div>
                <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
                  className="text-4xl lg:text-5xl xl:text-6xl mb-6">
                  Uma Palestra Que Não Termina Quando Tom Sai do Palco
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                  As melhores palestras não são as mais bonitas. São as que plantam uma ideia irrecusável que muda a forma como a audiência pensa, decide e age — para sempre.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="text-white font-semibold"
                    style={{ background: '#7a6207' }}
                    onClick={() => scrollTo('contratar')}>
                    Contratar Palestra
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                    asChild>
                    <a href="https://linkedin.com/in/wellingtonqueiroz" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn className="mr-2 h-4 w-4" /> Perfil de Tom
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
                  <img src={IMAGES.PROG_KEYNOTE_1} alt="Tom Queiroz Keynote" className="w-full h-auto" style={{ maxHeight: '480px', objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.7) 0%, transparent 40%)' }} />
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl px-5 py-4"
                    style={{ background: 'rgba(0,17,35,0.88)', border: '1px solid rgba(122,98,7,0.3)' }}>
                    <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#c4a217' }}>PALESTRANTE CONFIRMADO</p>
                    <p className="text-sm text-white" style={{ fontWeight: 300 }}>Tom Queiroz — 20 anos em C-Suite, Sony, Honda, Rakuten e Shell.</p>
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

        {/* ── POR QUE TOM ── white */}
        <section className="py-20" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#7a6207' }}>O DIFERENCIAL</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Por Que Tom Queiroz Como Palestrante</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: 'Credenciais Reais', desc: 'Ex-executivo de Sony, Honda, Rakuten e Shell. 20 anos em posições de liderança em mercados globais de altíssima competição.' },
                { icon: BarChart3, title: 'Conteúdo com Dados', desc: 'Cada palestra é apoiada em pesquisas, cases reais e métricas. Não há espaço para genérico ou motivacional sem substância.' },
                { icon: Sparkles, title: 'Impacto Duradouro', desc: 'NPS médio de 94 em palestras. Audiências que saem com plano de ação, não apenas inspiração.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-8" style={{ background: '#f8f9fa', border: '1px solid #e2e8f0' }}>
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

        {/* ── PARA QUEM É ── gray */}
        <section id="para-quem" className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>CONTEXTOS</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">Para Quem e Quando Contratar</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: 'Convenções de Empresas', desc: 'Kickoffs anuais, convenções de vendas, reuniões de liderança — quando a empresa precisa de alinhamento e energia renovada.' },
                { icon: Calendar, title: 'Eventos do Setor', desc: 'Congressos, summits, conferências de marketing, inovação, digital e liderança — onde a audiência exige substância.' },
                { icon: Award, title: 'Programas de Educação Executiva', desc: 'MBAs, cursos de extensão, programas corporativos de desenvolvimento de lideranças.' },
                { icon: Target, title: 'Feiras e Exposições B2B', desc: 'Opening keynotes e closing sessions que elevam o posicionamento do evento e da marca patrocinadora.' },
                { icon: Zap, title: 'Retiros de Liderança', desc: 'Offsite meetings de boards e C-Suite — quando o time precisa de perspectiva externa provocativa e fundamentada.' },
                { icon: MapPin, title: 'Brasil e Internacional', desc: 'Tom palestrante em português, inglês e espanhol. Disponível para eventos nacionais e internacionais.' },
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

        {/* ── FORMATOS ── navy */}
        <section id="formatos" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>COMO FUNCIONA</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Formatos de Palestra</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Clock, time: '30–60 min', title: 'Keynote Executiva', desc: 'Palestra focada para abrir ou fechar eventos. Alta densidade de conteúdo, narrativa envolvente e call-to-action forte.' },
                { icon: TrendingUp, time: '90–120 min', title: 'Workshop Interativo', desc: 'Combinação de apresentação e atividades práticas. A audiência sai com framework aplicado ao seu contexto.' },
                { icon: Users, time: 'Meio-dia ou Dia', title: 'Imersão para Líderes', desc: 'Formato mais profundo para grupos menores de liderança sênior. Diagnóstico, conteúdo e plano de ação.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(122,98,7,0.25)' }}>
                  <item.icon className="w-8 h-8 mb-4" style={{ color: '#c4a217' }} />
                  <div className="text-xs font-bold tracking-widest mb-2" style={{ color: '#c4a217' }}>{item.time}</div>
                  <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEMAS ── copper */}
        <section id="temas" style={{ background: 'linear-gradient(135deg, #7a6207, #5c4a05)' }} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>REPERTÓRIO</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl lg:text-4xl">Temas Exclusivos</h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                Cada palestra é preparada com base no contexto e no objetivo específico do evento. Estes são os temas de maior impacto e demanda.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'AI First Era: Você Está Preparado?', desc: 'Como a IA está reformulando mercados, profissões e lideranças — e o que os executivos precisam fazer agora.' },
                { title: 'O Futuro do Marketing é Hoje', desc: 'Novas fronteiras do marketing digital: IA, dados first-party, personalização em escala e o fim dos cookies.' },
                { title: 'Liderança na Era da Incerteza Permanente', desc: 'Frameworks de tomada de decisão em ambientes VUCA e BANI — para líderes que precisam agir sem certeza.' },
                { title: 'Inovação Executiva: Da Ideia ao Impacto', desc: 'Como grandes empresas inovam sem perder eficiência — metodologia prática baseada em cases reais.' },
                { title: 'Digital Culture: Como Criar Times Extraordinários', desc: 'A cultura que separa empresas mediocres das extraordinárias — e como construí-la de propósito.' },
                { title: 'Carreira 2030: O Executivo do Futuro', desc: 'Quais competências, mentalidades e posicionamentos definem os líderes que dominarão a próxima década.' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                  <h3 className="font-bold mb-3 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEPOIMENTOS ── gray */}
        <section id="depoimentos" className="py-20" style={{ background: '#f1f5f9' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#7a6207' }}>FEEDBACKS</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#001123' }}
                className="text-3xl lg:text-4xl">O Que Dizem os Organizadores</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { text: 'A palestra do Tom foi o ponto alto do nosso summit de liderança. A audiência de 300 executivos foi unânime: conteúdo denso, delivery inspirador e ação imediata.', name: 'Renata Oliveira', role: 'Diretora de Eventos — Summit Digital Brasil' },
                { text: 'Nunca vi um palestrante preparar tanto para um evento específico. Tom entendeu nosso contexto, customizou o conteúdo e entregou exatamente o que o time de liderança precisava ouvir.', name: 'Carlos Mendes', role: 'VP de RH — Multinacional de Varejo' },
                { text: 'NPS de 96 na palestra de encerramento. Em 10 anos organizando eventos corporativos, foi a pontuação mais alta que registramos.', name: 'Patricia Alves', role: 'Gerente de Comunicação — Congresso Nacional de Marketing' },
                { text: 'A combinação de experiência real em C-Suite com dados atuais e entrega carismática é rara. Tom é um palestrante de nível internacional.', name: 'Roberto Lima', role: 'CEO — Hub de Inovação São Paulo' },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-7" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-base" style={{ color: '#7a6207' }}>★</span>)}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 italic" style={{ color: '#475569', fontWeight: 300 }}>"{item.text}"</p>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#001123' }}>{item.name}</p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULÁRIO ── navy */}
        <section id="contratar" className="py-20" style={{ background: '#001123' }}>
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div {...fadeUp} className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#c4a217' }}>CONTRATAR PALESTRA</p>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#fff' }}
                className="text-3xl mb-4">Solicitar Proposta de Palestra</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                Compartilhe as informações do seu evento. Nossa equipe retorna em até 24h com proposta e disponibilidade.
              </p>
            </motion.div>
            {success ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
                <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: '#c4a217' }} />
                <h3 className="text-xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Nossa equipe retornará com proposta e disponibilidade em até 24h úteis.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(122,98,7,0.3)' }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Nome *</label>
                    <Input name="full_name" required value={formData.full_name} onChange={handleChange}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="Seu nome" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">E-mail *</label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="email@empresa.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">WhatsApp</label>
                    <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="+55 11 99999-9999" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Empresa / Organização</label>
                    <Input name="company" value={formData.company} onChange={handleChange}
                      className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                      placeholder="Nome da empresa" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Tipo e Data do Evento</label>
                  <Input name="role" value={formData.role} onChange={handleChange}
                    className="text-white placeholder:text-white/30 border-white/10" style={{ background: 'rgba(255,255,255,0.07)' }}
                    placeholder="Ex.: Convenção anual — março 2026, 200 pessoas" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Tema de Interesse e Contexto do Evento</label>
                  <Textarea name="message" value={formData.message} onChange={handleChange}
                    className="text-white placeholder:text-white/30 border-white/10 min-h-[110px]" style={{ background: 'rgba(255,255,255,0.07)' }}
                    placeholder="Descreva o tema de interesse, objetivo da palestra e perfil da audiência..." />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" size="lg" disabled={loading} className="w-full text-white font-semibold"
                  style={{ background: '#7a6207' }}>
                  {loading ? 'Enviando...' : 'Solicitar Proposta de Palestra'}
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
                className="text-3xl mb-4">Elevando o Nível do Seu Evento</h2>
              <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
                Fale com nossa equipe agora. Verificamos disponibilidade e enviamos proposta em até 24h.
              </p>
              <Button size="lg" asChild className="text-white font-semibold px-10"
                style={{ background: '#001123', border: '1px solid rgba(255,255,255,0.3)' }}>
                <a href="https://wa.me/5511915513210?text=Olá,%20gostaria%20de%20contratar%20uma%20palestra%20com%20Tom%20Queiroz" target="_blank" rel="noopener noreferrer">
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
