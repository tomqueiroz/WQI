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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-xs"
            >
              {expanded ? (
                <>
                  Ocultar Detalhes <ChevronUp className="w-3 h-3 ml-1" />
                </>
              ) : (
                <>
                  Ver Detalhes <ChevronDown className="w-3 h-3 ml-1" />
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={() => setModalOpen(true)}
              className="bg-accent text-white hover:bg-accent/90 text-xs rounded-full flex-1"
            >
              Solicitar Mais Infos
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
                href="https://wa.me/5511915513210?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-6 py-3 font-semibold hover:bg-accent/90 transition text-sm md:text-base"
              >
                Falar com Especialista
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

        <section className="bg-primary py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-white font-black text-3xl md:text-4xl mb-4">
              Pronto para o Próximo Nível?
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Cada programa é desenhado para acelerar sua transformação executiva. Vamos conversar sobre o seu momento e objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/programas"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-full px-8 py-4 font-semibold hover:bg-accent/90 transition"
              >
                Explorar Programas
              </Link>
              <a
                href="https://wa.me/5511915513210?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white rounded-full px-8 py-4 font-semibold hover:bg-white/10 transition"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── Diagnóstico Gratuito — pop-up flutuante canto inferior esquerdo ── */}
      <DiagnosticoFloat />
    </Layout>
  )
}

const WA_LINK_PROG = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi.';

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