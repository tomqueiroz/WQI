import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Users, Target, Clock, TrendingUp, ChevronDown, ChevronUp, Stethoscope, X } from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import { Layout } from '@/components/Layout'
import { ProductLeadModal } from '@/components/ProductLeadModal'
import { PRODUCTS_DATA, type ProductData } from '@/lib/products'
import { IMAGES } from '@/assets/images'
import { useProductLead } from '@/hooks/useProductLeads'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const CATEGORIES = [
  { key: 'todos', label: 'Todos' },
  { key: 'mentoria', label: 'Mentoria' },
  { key: 'cohort', label: 'Cohort' },
  { key: 'inhouse', label: 'In-Company' },
  { key: 'masterclass', label: 'MasterClass' },
  { key: 'evento', label: 'Eventos' },
  { key: 'digital', label: 'Cursos Digitais' },
]

function ProductCard({ product }: { product: ProductData }) {
  const [expanded, setExpanded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const { submitLead, loading: waitlistLoading, success: waitlistSuccess } = useProductLead(product.table)

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead({
      full_name: waitlistName,
      email: waitlistEmail,
      message: `Lista de espera - ${product.cohort_info?.next}`,
    })
    if (waitlistSuccess) {
      setWaitlistName('')
      setWaitlistEmail('')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl overflow-hidden border border-border shadow-md bg-card"
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={product.heroImage}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <Badge variant="secondary" className="text-xs mb-2">
            {CATEGORIES.find(c => c.key === product.category)?.label || product.category}
          </Badge>

          <h3 className="font-bold text-xl mt-2 text-foreground">{product.title}</h3>
          <p className="italic text-muted-foreground text-sm mt-1 line-clamp-2">{product.tagline}</p>

          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <ul className="mt-4 space-y-2">
            {product.topics.slice(0, 3).map((topic, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>

          <p className="italic text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
            Todos os programas são 100% personalizados de acordo com seu perfil e objetivos.
          </p>

          {product.cohort_info && (
            <Badge className="bg-accent/10 text-accent text-xs font-semibold rounded-full px-3 py-1 mt-3">
              Próxima turma: {product.cohort_info.next}
              {product.cohort_info.spots && ` • ${product.cohort_info.spots} vagas`}
            </Badge>
          )}

          <div className="flex gap-2 mt-4">
            {product.link && (
              <Link to={product.link}>
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90 text-xs rounded-full"
                >
                  Saiba Mais
                </Button>
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-xs"
            >
              {expanded ? (
                <>
                  Ocultar <ChevronUp className="w-3 h-3 ml-1" />
                </>
              ) : (
                <>
                  Detalhes <ChevronDown className="w-3 h-3 ml-1" />
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={() => setModalOpen(true)}
              className="bg-accent text-white hover:bg-accent/90 text-xs rounded-full flex-1"
            >
              Falar com Especialista
            </Button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-muted/30 rounded-xl p-4 mt-2 space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-sm">Para Quem</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.target}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-sm">Objetivos</h4>
                  </div>
                  <ul className="space-y-1">
                    {product.objectives.map((obj, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-sm">Formato & Duração</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.format} • {product.duration}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-sm">Resultados</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.metrics}</p>
                </div>

                {product.cohort_info && (
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-sm mb-3">Lista de Espera</h4>
                    <form onSubmit={handleWaitlistSubmit} className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Nome completo"
                        value={waitlistName}
                        onChange={(e) => setWaitlistName(e.target.value)}
                        required
                        className="text-sm"
                      />
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        required
                        className="text-sm"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={waitlistLoading || waitlistSuccess}
                        className="w-full bg-accent text-white hover:bg-accent/90 text-xs"
                      >
                        {waitlistSuccess ? 'Cadastrado!' : waitlistLoading ? 'Enviando...' : 'Avise-me'}
                      </Button>
                    </form>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <ProductLeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productId={product.id}
        productTitle={product.title}
        tableName={product.table}
      />
    </>
  )
}

function ProgramContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await new Promise(r => setTimeout(r, 800))
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(122,98,7,0.1)', border: '1px solid rgba(122,98,7,0.3)' }}>
        <CheckCircle2 size={40} style={{ color: '#c9a227', margin: '0 auto 16px' }} />
        <h3 className="text-white font-bold text-xl mb-2">Mensagem Enviada!</h3>
        <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>Nossa equipe entrará em contato em até 24h. Obrigado pelo interesse na Recognise.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div>
        <label className="block text-xs text-white/50 mb-1.5 font-medium uppercase tracking-wider">Nome Completo *</label>
        <input
          type="text" required
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="Seu nome completo"
        />
      </div>
      <div>
        <label className="block text-xs text-white/50 mb-1.5 font-medium uppercase tracking-wider">E-mail *</label>
        <input
          type="email" required
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label className="block text-xs text-white/50 mb-1.5 font-medium uppercase tracking-wider">WhatsApp</label>
        <input
          type="tel"
          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="+55 11 99999-9999"
        />
      </div>
      <div>
        <label className="block text-xs text-white/50 mb-1.5 font-medium uppercase tracking-wider">Conte seu momento</label>
        <textarea
          rows={3}
          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition resize-none"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="Qual o seu desafio ou objetivo com IA neste momento?"
        />
      </div>
      <button type="submit" disabled={sending}
        className="w-full rounded-full py-3 font-bold text-sm text-white transition"
        style={{ background: '#7a6207' }}>
        {sending ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}

export default function ProgramasPage() {
  const [activeCategory, setActiveCategory] = useState('todos')

  const filteredProducts = activeCategory === 'todos'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeCategory)

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden" style={{ minHeight: '65vh' }}>
          <div className="absolute inset-0 w-full h-full">
            <img
              src={IMAGES.PARALLAX_EXECUTIVE}
              alt="Executive Background"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary/70" />

          <div className="relative z-20 flex flex-col justify-end pb-16 px-4 max-w-7xl mx-auto h-full" style={{ minHeight: '65vh' }}>
            <p className="text-white/40 text-xs mb-4">
              <Link to="/" className="hover:text-white/60 transition">Início</Link> / Programas
            </p>

            <h1 className="text-white font-black text-4xl md:text-6xl leading-tight">
              Programas de Transformação Executiva
            </h1>

            <p className="text-white/70 mt-4 max-w-2xl text-base md:text-lg">
              Cada programa é desenhado para o seu momento, seu mercado e seus objetivos. Todos os programas são personalizados — nunca exibimos preços, pois cada proposta é construída individualmente.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/5511915513210?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-6 py-3 font-semibold hover:bg-accent/90 transition text-sm md:text-base"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </section>

        {/* ── SEÇÃO INTRODUTÓRIA PERSUASIVA ── */}
        <section className="py-16 md:py-24" style={{ background: '#f8f9fb' }}>
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(122,98,7,0.1)', color: '#7a6207' }}>
                Metodologia Exclusiva
              </span>
              <h2 className="text-primary font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Por que escolher a Recognise?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed" style={{ fontWeight: 300 }}>
                Não somos uma escola de tecnologia. Somos uma empresa especializada em <strong className="text-primary">desenvolvimento de novas capacidades cognitivas e culturais para a era da IA</strong> — formada por especialistas que a constroem, diariamente, em empresas reais.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {[
                { icon: Target, title: 'Geração AI First™', desc: 'Metodologia proprietária desenvolvida a partir de 500+ casos reais de líderes transformados. Não ensinamos ferramentas — desenvolvemos o novo modelo mental que cada profissional precisa para liderar com IA.' },
                { icon: Users, title: 'Corpo Docente de Referência', desc: 'Tom Queiroz, CEO da Pareto e criador da TESS AI — pioneiro em IA Generativa no Brasil desde 2021, Professor FGV e palestrante em +200 eventos executivos. Um time que constrói IA, não só a comenta.' },
                { icon: TrendingUp, title: 'Diagnóstico e Personalização Total', desc: 'Cada programa começa com um diagnóstico profundo do seu perfil, cultura, setor e momento. Nunca vendemos pacotes genéricos — cada proposta é construída para você.' },
                { icon: CheckCircle2, title: 'Módulos Práticos com KPIs', desc: 'Cada módulo é desenhado com entregáveis concretos, projetos aplicados ao seu negócio real e métricas claras de progresso. Aprendizado que se mede em resultado, não em horas de vídeo.' },
                { icon: Stethoscope, title: 'Recomendado Para Quem', desc: 'C-Level, VPs, diretores, fundadores e high-performers que já decidiram agir — e querem um parceiro que entende tanto de negócio quanto de IA para guiar essa jornada com segurança.' },
                { icon: Clock, title: 'Formatos que Encaixam na Sua Agenda', desc: 'Mentoria 1:1, cohorts, imersões in-company, masterclasses e cursos digitais — com formatos que se adaptam ao ritmo da sua liderança, sem comprometer a profundidade.' },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-7 border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(122,98,7,0.1)' }}>
                    <item.icon size={20} style={{ color: '#7a6207' }} />
                  </div>
                  <h3 className="font-bold text-primary mb-2 text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://calendly.com/tom-queiroz-pareto/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold text-sm text-white transition"
                style={{ background: '#7a6207' }}>
                Agendar com Especialista
              </a>
              <a href="https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold text-sm border-2 transition"
                style={{ borderColor: '#7a6207', color: '#7a6207', background: 'transparent' }}>
                Falar com Especialista no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    activeCategory === cat.key
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nenhum programa encontrado nesta categoria.</p>
            </div>
          )}
        </div>

        <section id="contato" className="py-20 md:py-28" style={{ background: '#001123' }}>
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227' }}>Fale Conosco</span>
              <h2 className="text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>Pronto para o Próximo Nível?</h2>
              <p className="text-white/60 max-w-xl mx-auto" style={{ fontWeight: 300 }}>Cada programa começa com uma conversa. Conte o seu momento e nosso time entrará em contato em até 24h com uma proposta personalizada.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(122,98,7,0.15)' }}>
                    <CheckCircle2 size={18} style={{ color: '#c9a227' }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Diagnóstico Gratuito</p>
                    <p className="text-white/50 text-xs mt-0.5" style={{ fontWeight: 300 }}>Agende 30 min e receba análise de maturidade em IA sem custo ou compromisso.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(122,98,7,0.15)' }}>
                    <TrendingUp size={18} style={{ color: '#c9a227' }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Proposta 100% Personalizada</p>
                    <p className="text-white/50 text-xs mt-0.5" style={{ fontWeight: 300 }}>Nenhum preço exibido aqui — porque cada proposta é construída para a sua realidade.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(122,98,7,0.15)' }}>
                    <Users size={18} style={{ color: '#c9a227' }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Atendimento Direto</p>
                    <p className="text-white/50 text-xs mt-0.5" style={{ fontWeight: 300 }}>Você fala diretamente com Tom Queiroz ou com um especialista sênior da Recognise.</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <a href="https://calendly.com/tom-queiroz-pareto/30min" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition"
                    style={{ background: '#7a6207' }}>
                    Agendar com Especialista
                  </a>
                  <a href="https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise." target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition"
                    style={{ border: '1px solid rgba(229,184,0,0.4)', color: '#c9a227', background: 'transparent' }}>
                    <FaWhatsapp size={14} /> Falar no WhatsApp
                  </a>
                </div>
              </div>
              <ProgramContactForm />
            </div>
          </div>
        </section>
      </div>

      {/* ── Diagnóstico Gratuito — pop-up flutuante canto inferior esquerdo ── */}
      <DiagnosticoFloat />
    </Layout>
  )
}

const WA_LINK_PROG = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20Recognise.';

function DiagnosticoFloat() {
  const [open, setOpen] = useState(false)
  return (
    <AnimatePresence mode="wait">
      {!open ? (
        <motion.button
          key="btn"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-accent hover:bg-accent/90 text-white rounded-full px-4 py-3 shadow-2xl font-semibold text-sm flex items-center gap-2 transition-colors"
        >
          <Stethoscope size={16} /> Diagnóstico Gratuito
        </motion.button>
      ) : (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-50 w-80 bg-[#001123] rounded-2xl shadow-2xl p-6 border border-[#7a6207]/25"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white font-bold text-base">Diagnóstico Gratuito</h3>
              <p className="text-white/60 text-xs mt-0.5">30 min · sem compromisso</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors mt-0.5 ml-2 flex-shrink-0">
              <X size={16} />
            </button>
          </div>
          <p className="text-white/70 text-sm mb-4 leading-relaxed">
            Agende 30 minutos e receba uma análise da maturidade digital da sua organização — sem custo, sem compromisso.
          </p>
          <a href={WA_LINK_PROG} target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-[#7a6207] hover:bg-[#7a6207]/90 text-white rounded-full py-2.5 font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
              <FaWhatsapp size={14} /> Agendar no WhatsApp
            </button>
          </a>
          <a
            href="https://www.linkedin.com/in/wellingtonqueiroz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 text-white/50 hover:text-white text-xs transition-colors"
          >
            <FaLinkedinIn size={12} /> Conectar no LinkedIn
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}