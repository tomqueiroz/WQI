import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle, ArrowRight, Rocket, Star, Zap, Globe, Shield, Clock, Users,
  Play, Layers, BookOpen, Video, FileText, Headphones,
  BarChart3, Sparkles, X, MessageSquare, Calendar, ChevronRight,
  Minus, TrendingUp, AlertTriangle, Award, Lock
} from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { Layout } from '@/components/Layout';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

const NAVY = '#001123';
const COPPER = '#7a6207';
const COPPER_LIGHT = '#c9a227';
const WA_LINK = 'https://wa.me/5511915513210?text=Quero%20saber%20mais%20sobre%20Plataformas%20para%20Mentores';
const CALENDLY = 'https://calendly.com/tom-queiroz-pareto/30min';

const COMPARISON = [
  {
    aspecto: 'Presença digital',
    semRecognise: 'Site genérico, bio do Instagram, link.tree',
    comRecognise: 'Plataforma própria exclusiva, identidade única e páginas de alta conversão',
    icon: Globe,
  },
  {
    aspecto: 'Plataforma de cursos',
    semRecognise: 'Hotmart, Eduzz ou Kiwify — mensalidade, padrão, sem diferenciação',
    comRecognise: 'LMS proprietário 100% customizado à sua metodologia e marca',
    icon: Layers,
  },
  {
    aspecto: 'Captação de leads',
    semRecognise: 'Formulário básico ou link de WhatsApp improvisado',
    comRecognise: 'Funis de conversão integrados, formulários segmentados e automações por IA',
    icon: Users,
  },
  {
    aspecto: 'Conteúdo e copy',
    semRecognise: 'Textos genéricos, sem posicionamento claro',
    comRecognise: 'Copy especializada por time de especialistas + IA generativa',
    icon: MessageSquare,
  },
  {
    aspecto: 'Tempo para lançar',
    semRecognise: '3 a 6 meses tentando montar tudo sozinho — ou nunca',
    comRecognise: 'Tudo pronto e lançado em até 3 semanas. Sem stress.',
    icon: Clock,
  },
  {
    aspecto: 'Suporte estratégico',
    semRecognise: 'Tutoriais, grupos de Facebook, chute e tentativa',
    comRecognise: 'Time de especialistas em IA, tech e mentoria ao seu lado',
    icon: Shield,
  },
];

const DELIVERABLES_TOP = [
  { icon: Globe, title: 'Site Profissional Completo', desc: 'Domínio, hospedagem, design premium alinhado à sua marca e nicho' },
  { icon: FileText, title: 'Páginas de Alta Conversão', desc: 'Hero, sobre, programas, depoimentos, CTA e formulários integrados' },
  { icon: BookOpen, title: 'Blog Estratégico', desc: 'Blog com SEO e estrutura para posicionamento de autoridade' },
  { icon: Users, title: 'Captação de Leads', desc: 'Formulários integrados, pop-ups e automações iniciais' },
  { icon: Zap, title: 'Diagnóstico + Planejamento', desc: 'Entrevista em profundidade + pesquisa de mercado + plano editorial' },
  { icon: Sparkles, title: 'Powered by IA', desc: 'Copy, imagens e otimizações geradas por IA especializada no seu nicho' },
];

const DELIVERABLES_FULL = [
  ...DELIVERABLES_TOP,
  { icon: Layers, title: 'LMS Proprietário', desc: 'Plataforma de aprendizagem exclusiva — sem Hotmart, sem mensalidade' },
  { icon: Video, title: 'Trilhas Gamificadas', desc: 'Módulos em vídeo, PDF, áudio, exercícios — trilhas personalizadas por perfil' },
  { icon: Headphones, title: 'Podcasts & Materiais Ricos', desc: 'Upload de qualquer formato de conteúdo com player integrado' },
  { icon: BarChart3, title: 'Dashboard do Mentorando', desc: 'Painel individual com progresso, badges e certificados automáticos' },
  { icon: Award, title: 'Área do Mentorando Premium', desc: 'Login exclusivo, histórico de sessões, recursos e comunicação direta' },
  { icon: Shield, title: 'Suporte Pós-Lançamento', desc: 'Suporte técnico e estratégico por 30 dias após o go-live' },
];

const STATS = [
  { value: '3', unit: 'semanas', label: 'do briefing ao lançamento' },
  { value: '20', unit: 'vagas', label: 'condições especiais — 45 dias' },
  { value: '100%', unit: '', label: 'customizado para o seu nicho' },
  { value: '0', unit: '', label: 'dependência de plataformas genéricas' },
];

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: 'Plataformas caras que não convertem',
    desc: 'Hotmart, Eduzz, Kiwify — você paga mensalidade, segue as regras deles e sua marca some na multidão.',
  },
  {
    icon: Clock,
    title: 'Tempo perdido montando tudo do zero',
    desc: 'Meses configurando ferramentas, escrevendo copy, tentando aprender Wordpress sozinho. E a mentoria esperando.',
  },
  {
    icon: TrendingUp,
    title: 'Expertise que merece presença de elite',
    desc: 'Você tem conhecimento de alto nível. Está na hora de ter uma plataforma que reflita isso e atraia os melhores mentorandos.',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Diagnóstico Profundo', icon: Sparkles, desc: 'Entrevista em profundidade. Pesquisa de mercado, concorrentes, público-alvo e seu diferencial único.' },
  { step: '02', title: 'Planejamento Estratégico', icon: BarChart3, desc: 'Nossa equipe cria o plano completo: arquitetura da plataforma, copy, conteúdo, identidade e funil.' },
  { step: '03', title: 'Desenvolvimento com IA', icon: Zap, desc: 'Time tech + IA em ação. Construímos tudo em tempo recorde com tecnologia exclusiva e qualidade premium.' },
  { step: '04', title: 'Lançamento & Suporte', icon: Rocket, desc: 'Go-live com checklist completo, suporte técnico e estratégico pós-lançamento para você conquistar mentorandos.' },
];

const WHY_RECOGNISE = [
  'Especialistas em IA aplicada ao negócio de mentoria',
  'Plataformas 100% customizadas — sem template genérico',
  'Time multidisciplinar: tech, copy, design e estratégia',
  'Powered by IA proprietária da Recognise (TESS AI)',
  'Entrega rápida sem abrir mão da qualidade premium',
  'Suporte estratégico pós-lançamento incluído',
];

const TESTIMONIALS = [
  { name: 'Mariana T.', role: 'Mentora de Carreira', quote: 'Minha plataforma ficou impossível de copiar. Em 3 semanas, lançamos e já fechei 4 mentorandos novos com ticket 2x maior que antes.' },
  { name: 'Ricardo A.', role: 'Mentor de Negócios', quote: 'Parei de pagar Hotmart, Eduzz e mais dois sistemas que não conversavam. Hoje tenho tudo em um só lugar, com minha cara, e meus mentorandos adoraram.' },
  { name: 'Luciana F.', role: 'Mentora de Liderança', quote: 'O diagnóstico inicial já me abriu os olhos para o que eu precisava. A plataforma entregue superou tudo que eu imaginava. Recomendo sem hesitar.' },
];

// ─── FORM ─────────────────────────────────────────────────────────────────────
function MentorForm({ pacotePreSelected }: { pacotePreSelected?: string }) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    instagram: '',
    nicho_mentoria: '',
    pacote_interesse: pacotePreSelected || 'ainda_decidindo',
    mensagem: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: err } = await supabase.from('novos_mentores_leads_2026_05_04').insert(form);
      if (err) throw err;
      setSuccess(true);
    } catch {
      setError('Erro ao enviar. Tente pelo WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
          <CheckCircle size={28} style={{ color: COPPER_LIGHT }} />
        </div>
        <h3 className="text-white text-lg font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Proposta solicitada com sucesso
        </h3>
        <p className="text-white/50 text-sm mb-6">Nossa equipe entrará em contato em até 24h úteis.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
          <Calendar size={14} /> Agendar conversa agora
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">Nome completo *</label>
          <input required value={form.full_name} onChange={e => set('full_name', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={inputStyle} placeholder="Seu nome" />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">E-mail *</label>
          <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={inputStyle} placeholder="seu@email.com" />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">WhatsApp</label>
          <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={inputStyle} placeholder="(11) 99999-9999" />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">Instagram</label>
          <input value={form.instagram} onChange={e => set('instagram', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={inputStyle} placeholder="@seuinsta" />
        </div>
      </div>
      <div>
        <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">Seu nicho de mentoria</label>
        <input value={form.nicho_mentoria} onChange={e => set('nicho_mentoria', e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
          style={inputStyle} placeholder="Ex: Carreira, Negócios, Liderança, Saúde, IA..." />
      </div>
      <div>
        <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">Pacote de interesse</label>
        <select value={form.pacote_interesse} onChange={e => set('pacote_interesse', e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
          style={{ background: '#0a1e35', border: '1px solid rgba(255,255,255,0.12)' }}>
          <option value="ainda_decidindo">Ainda estou decidindo</option>
          <option value="top">Mentoria Top — Plataforma Completa</option>
          <option value="full">Mentoria Full — Plataforma + LMS</option>
        </select>
      </div>
      <div>
        <label className="text-white/50 text-xs uppercase tracking-wider mb-1 block">Mensagem (opcional)</label>
        <textarea value={form.mensagem} onChange={e => set('mensagem', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition resize-none"
          style={inputStyle}
          placeholder="Conte um pouco sobre sua mentoria e seus objetivos..." />
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="submit" disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
          {loading ? 'Enviando...' : <><Rocket size={15} /> Solicitar Minha Proposta</>}
        </button>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: '#25D366' }}>
          <FaWhatsapp size={15} /> WhatsApp
        </a>
      </div>
      <p className="text-white/25 text-xs text-center">Sem compromisso. Gratuito. Resposta em até 24h.</p>
    </form>
  );
}

// ─── PACKAGE MODAL ────────────────────────────────────────────────────────────
function PackageModal({ pkg, onClose }: { pkg: 'top' | 'full'; onClose: () => void }) {
  const isTop = pkg === 'top';
  const deliverables = isTop ? DELIVERABLES_TOP : DELIVERABLES_FULL;
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{ background: NAVY, border: `1px solid rgba(122,98,7,0.4)` }}
          initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }}>
          <div className="p-6 md:p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
              <X size={18} />
            </button>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: COPPER_LIGHT }}>
              {isTop ? 'Mentoria Top' : 'Mentoria Full'}
            </p>
            <h2 className="text-white text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {isTop ? 'Plataforma Profissional Completa' : 'Plataforma + LMS Proprietário'}
            </h2>
            <p className="text-white/50 text-sm mb-6" style={{ fontWeight: 300 }}>
              {isTop
                ? 'Tudo que você precisa para ter presença digital única, atrair mentorandos qualificados e lançar em até 3 semanas.'
                : 'O ecossistema mais completo do mercado. Plataforma exclusiva + sistema de aprendizagem proprietário sem mensalidades.'}
            </p>
            <div className="grid gap-2.5 mb-8">
              {deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(122,98,7,0.15)' }}>
                    <d.icon size={15} style={{ color: COPPER_LIGHT }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{d.title}</p>
                    <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <MentorForm pacotePreSelected={pkg} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function NovosMentoresPage() {
  const [activeModal, setActiveModal] = useState<'top' | 'full' | null>(null);
  const [activeTab, setActiveTab] = useState<'top' | 'full'>('top');

  const TABS = [
    { id: 'contexto', label: 'O Momento' },
    { id: 'comparativo', label: 'Comparativo' },
    { id: 'pacotes', label: 'Pacotes' },
    { id: 'entregaveis', label: 'O Que Inclui' },
    { id: 'form', label: 'Solicitar Proposta' },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <Layout>
      {/* ── HERO — vídeo BG igual à Home ──────────────────────────────────── */}
      <section className="min-h-screen relative overflow-hidden flex flex-col">
        {/* Fundo sólido enquanto o vídeo carrega */}
        <div className="absolute inset-0 z-0" style={{ background: NAVY }} />

        {/* Vídeo BG */}
        <video
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1, opacity: 0.45 }}
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlays — igual à Home */}
        <div className="absolute inset-0" style={{ zIndex: 2, background: 'rgba(0,0,0,0.15)' }} />
        <div className="absolute inset-0" style={{ zIndex: 2, background: 'linear-gradient(to right, rgba(0,17,35,0.96) 0%, rgba(0,17,35,0.88) 42%, rgba(0,17,35,0.70) 70%, rgba(0,17,35,0.55) 100%)' }} />

        {/* Tabs âncora — fixas na parte inferior da hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:block"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="site-container">
            <div className="flex gap-0.5">
              {TABS.map(t => (
                <a key={t.id} href={`#${t.id}`}
                  className="px-4 py-2.5 text-xs font-semibold transition-all"
                  style={{
                    background: 'rgba(0,17,35,0.85)',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderBottom: 'none',
                    borderRadius: '6px 6px 0 0',
                    letterSpacing: '0.08em',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 300,
                  }}>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative site-container flex flex-1 items-center"
          style={{ zIndex: 5, paddingTop: '100px', paddingBottom: '80px' }}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Coluna esquerda — copy */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{
                  background: 'rgba(122,98,7,0.18)',
                  border: `1px solid rgba(201,162,39,0.4)`,
                  color: COPPER_LIGHT,
                  fontFamily: 'Roboto, sans-serif',
                  letterSpacing: '0.1em',
                }}>
                <Sparkles size={11} />
                Novo Serviço · Plataformas para Mentores · Powered by IA
              </div>

              {/* H1 */}
              <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Sua Mentoria Merece<br />
                <span style={{ color: COPPER_LIGHT }}>Uma Plataforma</span><br />
                Tão Única Quanto Você.
              </h1>

              <p className="text-white/65 mb-3 max-w-xl"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 1.75 }}>
                Chega de depender de plataformas genéricas que não foram feitas para você.
                A Recognise cria <strong className="text-white/85 font-semibold">sua plataforma exclusiva em até 3 semanas</strong>,
                com tecnologia de ponta e IA embarcada — para que você conquiste mentorandos
                e entregue uma experiência que ninguém mais tem.
              </p>

              <p className="text-sm font-semibold mb-8 flex items-center gap-2 justify-center lg:justify-start"
                style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif' }}>
                <Lock size={13} />
                Apenas 20 vagas com condições especiais nos próximos 45 dias
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="#form"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, fontFamily: 'Montserrat, sans-serif' }}>
                  <Rocket size={15} /> Quero Minha Plataforma
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white/80 text-sm font-semibold transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  <Play size={15} /> Agendar Conversa Gratuita
                </a>
              </div>
            </motion.div>

            {/* Coluna direita — imagem */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: 440 }}>
                <img src={IMAGES.IMG_1550_1} alt="Mentor de alto impacto"
                  className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,17,35,0.75) 100%)' }} />
                {/* Stats flutuantes */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  {[{ v: '3', u: 'semanas' }, { v: '20', u: 'vagas' }, { v: '100%', u: 'customizado' }].map((s, i) => (
                    <div key={i} className="flex-1 text-center p-3 rounded-xl"
                      style={{ background: 'rgba(0,17,35,0.75)', border: '1px solid rgba(201,162,39,0.25)' }}>
                      <p className="font-bold text-lg" style={{ color: COPPER_LIGHT, fontFamily: 'Montserrat, sans-serif' }}>{s.v}</p>
                      <p className="text-white/50 text-[10px]" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{s.u}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#040d1a', borderTop: `1px solid rgba(122,98,7,0.2)` }}>
        <div className="site-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: COPPER_LIGHT, fontFamily: 'Montserrat, sans-serif' }}>
                  {s.value}<span className="text-base ml-1" style={{ fontWeight: 400 }}>{s.unit}</span>
                </div>
                <div className="text-white/40 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEXTO ──────────────────────────────────────────────────────── */}
      <section id="contexto" className="py-20 md:py-28" style={{ background: '#f5f6f8' }}>
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: COPPER, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
                O Momento é Agora
              </p>
              <h2 className="font-bold mb-5 leading-tight"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', color: NAVY }}>
                O Brasil tem fome de mentores. Mas o mercado pune quem não tem estrutura.
              </h2>
              <p className="text-gray-600 mb-4"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
                O mercado de mentoria e coaching no Brasil cresceu <strong className="font-semibold text-gray-800">47% em 3 anos</strong> — e o Brasil
                já é o <strong className="font-semibold text-gray-800">3° maior mercado mundial de coaching</strong> segundo a ICF. Há demanda real e crescente
                por mentores de qualidade em todas as áreas.
              </p>
              <p className="text-gray-600 mb-4"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
                O problema: <strong className="font-semibold text-gray-800">mais de 80% dos mentores perdem oportunidades</strong> por falta de presença
                digital profissional, processo de captação ineficiente ou uma plataforma que não reflete
                a qualidade do que entregam. O mercado julga pela embalagem antes de conhecer o conteúdo.
              </p>
              <p className="text-gray-600 mb-6"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
                Na era da IA, o diferencial não é mais só conhecimento — é <strong className="font-semibold text-gray-800">experiência, exclusividade
                e presença digital de alto impacto</strong>. Mentores que têm isso conquistam mentorandos
                de alto ticket com muito mais facilidade.
              </p>
              <a href="#pacotes"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                style={{ color: COPPER, fontFamily: 'Roboto, sans-serif' }}>
                Ver os pacotes disponíveis <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: 380 }}>
              <img src={IMAGES.IMG_307768_2} alt="Mentor de referência no mercado"
                className="w-full h-full object-cover" style={{ minHeight: 380 }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(122,98,7,0.9)', color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
                  <Star size={11} fill="currentColor" /> Mentores de referência começam aqui
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pain points */}
          <div className="grid md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white shadow-sm border"
                style={{ borderColor: 'rgba(0,17,35,0.07)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(122,98,7,0.08)' }}>
                  <p.icon size={18} style={{ color: COPPER }} />
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>{p.title}</h3>
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIVO ───────────────────────────────────────────────────── */}
      <section id="comparativo" className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
              Comparativo Real
            </p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}>
              Com ou sem a Recognise?{' '}
              <span style={{ color: COPPER_LIGHT }}>A diferença é impossível de ignorar.</span>
            </h2>
          </motion.div>

          {/* Header da tabela */}
          <div className="grid grid-cols-3 mb-3 px-4">
            <div className="text-white/30 text-xs uppercase tracking-wider" style={{ fontFamily: 'Roboto, sans-serif' }}>Aspecto</div>
            <div className="text-center text-xs uppercase tracking-wider flex items-center justify-center gap-1"
              style={{ color: 'rgba(220,80,80,0.7)', fontFamily: 'Roboto, sans-serif' }}>
              <Minus size={11} /> Sem Recognise
            </div>
            <div className="text-center text-xs uppercase tracking-wider flex items-center justify-center gap-1"
              style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif' }}>
              <CheckCircle size={11} /> Com Recognise
            </div>
          </div>

          <div className="space-y-2">
            {COMPARISON.map((row, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="grid grid-cols-3 gap-4 p-4 rounded-xl items-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <row.icon size={13} style={{ color: COPPER_LIGHT, flexShrink: 0 }} />
                  <span className="text-white/60 text-xs font-semibold"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>{row.aspecto}</span>
                </div>
                <div className="text-xs text-center" style={{ color: 'rgba(220,100,100,0.75)', fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{row.semRecognise}</div>
                <div className="text-xs text-center" style={{ color: 'rgba(180,230,180,0.85)', fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{row.comRecognise}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mt-10">
            <a href="#pacotes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, fontFamily: 'Montserrat, sans-serif' }}>
              Quero ser o mentor com Recognise <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PACOTES ───────────────────────────────────────────────────────── */}
      <section id="pacotes" className="py-20 md:py-28" style={{ background: '#f5f6f8' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: COPPER, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
              Escolha o Seu Nível
            </p>
            <h2 className="font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', color: NAVY }}>
              Dois pacotes. Um único propósito:<br />tornar sua mentoria irresistível.
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
              Cada proposta é personalizada após diagnóstico. Sem preço fixo — porque sua mentoria é única e merece uma solução sob medida.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card TOP */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ border: '1px solid rgba(0,17,35,0.1)' }}>
              <div className="p-8 text-white" style={{ background: NAVY }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ background: 'rgba(201,162,39,0.15)', color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.3)`, fontFamily: 'Roboto, sans-serif' }}>
                  <Zap size={10} /> Mentoria Top
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Plataforma Profissional
                </h3>
                <p className="text-white/50 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  Para mentores que querem presença digital de alto impacto com lançamento rápido e sem complicações.
                </p>
              </div>
              <div className="p-8 bg-white">
                <div className="space-y-3 mb-8">
                  {DELIVERABLES_TOP.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: COPPER }} />
                      <div>
                        <span className="text-sm font-semibold" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>{d.title} </span>
                        <span className="text-gray-400 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl mb-6 text-center"
                  style={{ background: 'rgba(122,98,7,0.05)', border: '1px solid rgba(122,98,7,0.12)' }}>
                  <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>Investimento personalizado após diagnóstico</p>
                  <p className="font-bold" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Solicite sua proposta</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveModal('top')}
                    className="w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, fontFamily: 'Montserrat, sans-serif' }}>
                    Quero o Mentoria Top <ArrowRight size={14} />
                  </button>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold border flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: 'rgba(0,17,35,0.12)', color: NAVY, fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}>
                    <Calendar size={13} /> Agendar conversa
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card FULL */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl relative"
              style={{ border: `2px solid rgba(201,162,39,0.45)` }}>
              {/* Selo "Mais Completo" */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
                <Star size={10} fill="currentColor" /> Mais Completo
              </div>
              <div className="p-8 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0a1e35 100%)` }}>
                <div className="absolute inset-0 opacity-10">
                  <img src={IMAGES.MENTOR_AI_1} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ background: 'rgba(201,162,39,0.2)', color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.4)`, fontFamily: 'Roboto, sans-serif' }}>
                    <Award size={10} /> Mentoria Full
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Plataforma + LMS Proprietário
                  </h3>
                  <p className="text-white/50 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                    O ecossistema digital completo da sua mentoria — exclusivo, sem mensalidades, powered by IA.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-white">
                <div className="space-y-3 mb-8">
                  {DELIVERABLES_FULL.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5"
                        style={{ color: i < DELIVERABLES_TOP.length ? COPPER : '#059669' }} />
                      <div>
                        <span className="text-sm font-semibold" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>{d.title} </span>
                        {i >= DELIVERABLES_TOP.length && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold mr-1"
                            style={{ background: 'rgba(5,150,105,0.08)', color: '#059669' }}>+Full</span>
                        )}
                        <span className="text-gray-400 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl mb-6 text-center"
                  style={{ background: 'rgba(122,98,7,0.05)', border: `1px solid rgba(201,162,39,0.25)` }}>
                  <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>Investimento personalizado após diagnóstico</p>
                  <p className="font-bold" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Solicite sua proposta</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveModal('full')}
                    className="w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, fontFamily: 'Montserrat, sans-serif' }}>
                    Quero o Mentoria Full <ArrowRight size={14} />
                  </button>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold border flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    style={{ borderColor: '#25D366', color: '#25D366', fontFamily: 'Roboto, sans-serif' }}>
                    <FaWhatsapp size={13} /> Falar com especialista
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section id="entregaveis" className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
              Processo Exclusivo
            </p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}>
              Do diagnóstico ao lançamento{' '}
              <span style={{ color: COPPER_LIGHT }}>em até 3 semanas.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-5 max-w-5xl mx-auto mb-16">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-5xl font-black mb-4 opacity-8 absolute top-4 right-4"
                  style={{ color: COPPER_LIGHT, fontFamily: 'Montserrat, sans-serif', opacity: 0.08, fontSize: '4rem' }}>{s.step}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(122,98,7,0.2)' }}>
                  <s.icon size={18} style={{ color: COPPER_LIGHT }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{s.title}</h3>
                <p className="text-white/40 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Por que a Recognise */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl overflow-hidden max-w-4xl mx-auto"
            style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
                  Por que só a Recognise
                </p>
                <h3 className="text-white text-xl font-bold mb-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Ninguém no Brasil une IA, mentoria e tech com entrega em 3 semanas.
                </h3>
                <div className="space-y-3">
                  {WHY_RECOGNISE.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ChevronRight size={13} style={{ color: COPPER_LIGHT, flexShrink: 0 }} />
                      <span className="text-white/60 text-sm"
                        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0A66C2' }}>
                      <FaLinkedinIn size={13} color="white" />
                    </div>
                    <span className="text-white/40 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                      Tom Queiroz — CEO Recognise & Pareto
                    </span>
                  </a>
                </div>
              </div>
              <div className="relative min-h-[260px]">
                <img src={IMAGES.IMG_93703_4} alt="Parceria e excelência"
                  className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,17,35,0.3)' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TABS DE DETALHES DOS PACOTES ──────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: '#040d1a' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
              Detalhes dos Pacotes
            </p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)' }}>
              O que está incluído em cada pacote?
            </h2>
          </motion.div>

          <div className="flex justify-center gap-3 mb-10">
            {[{ id: 'top', label: 'Mentoria Top', icon: Zap }, { id: 'full', label: 'Mentoria Full', icon: Award }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id as 'top' | 'full')}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                style={{
                  background: activeTab === t.id ? `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` : 'rgba(255,255,255,0.05)',
                  color: activeTab === t.id ? '#fff' : 'rgba(255,255,255,0.45)',
                  border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'Montserrat, sans-serif',
                }}>
                <t.icon size={13} /> {t.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {(activeTab === 'top' ? DELIVERABLES_TOP : DELIVERABLES_FULL).map((d, i) => (
              <motion.div key={`${activeTab}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'rgba(122,98,7,0.18)' }}>
                  <d.icon size={16} style={{ color: COPPER_LIGHT }} />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{d.title}</h4>
                <p className="text-white/35 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ───────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#f5f6f8' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: COPPER, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
              Prova Real
            </p>
            <h2 className="font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', color: NAVY }}>
              Mentores que já escolheram ter exclusividade.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white shadow-sm border"
                style={{ borderColor: 'rgba(0,17,35,0.06)' }}>
                <div className="flex mb-3 gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} fill={COPPER_LIGHT} style={{ color: COPPER_LIGHT }} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>{t.name}</p>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COPPER} 0%, #5a4705 100%)` }}>
        <div className="absolute inset-0 opacity-10">
          <img src={IMAGES.IMG_5172_3} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 site-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-xs uppercase tracking-widest mb-3 font-bold"
              style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '0.12em' }}>
              Apenas 20 vagas — 45 dias
            </p>
            <h2 className="text-white font-bold mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)' }}>
              Sua mentoria pode começar<br />em 3 semanas. Ou não começar nunca.
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
              A escolha é sua. Mas o mercado não vai esperar enquanto outros mentores tomam o espaço
              com plataformas exclusivas e IA. Solicite sua proposta agora — gratuito e sem compromisso.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-105 bg-white"
                style={{ color: COPPER, fontFamily: 'Montserrat, sans-serif' }}>
                <Rocket size={15} /> Quero Minha Plataforma Agora
              </a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-semibold border border-white/30 transition-all hover:bg-white/10"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}>
                <Calendar size={15} /> Agendar Conversa Gratuita
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORMULÁRIO PRINCIPAL ──────────────────────────────────────────── */}
      <section id="form" className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.1em' }}>
                Solicite Sua Proposta
              </p>
              <h2 className="text-white font-bold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}>
                Sua plataforma exclusiva começa aqui.
              </h2>
              <p className="text-white/50 text-sm mb-6"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, lineHeight: 1.75 }}>
                Preencha o formulário ao lado. Nossa equipe entrará em contato em até 24h úteis
                com uma proposta personalizada após breve diagnóstico gratuito.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: CheckCircle, text: '100% gratuito e sem compromisso' },
                  { icon: Clock, text: 'Resposta em até 24h úteis' },
                  { icon: Shield, text: 'Seus dados são protegidos pela LGPD' },
                  { icon: Rocket, text: 'Lançamento em até 3 semanas' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} style={{ color: COPPER_LIGHT, flexShrink: 0 }} />
                    <span className="text-white/50 text-sm"
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl space-y-3"
                style={{ background: 'rgba(122,98,7,0.08)', border: '1px solid rgba(201,162,39,0.18)' }}>
                <p className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: COPPER_LIGHT, fontFamily: 'Roboto, sans-serif' }}>
                  Prefere falar diretamente?
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  <FaWhatsapp size={13} style={{ color: '#25D366' }} /> WhatsApp direto com o time
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  <Calendar size={13} style={{ color: COPPER_LIGHT }} /> Agendar conversa no Calendly
                </a>
                <a href="mailto:tom@recognise.com.br"
                  className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  <MessageSquare size={13} style={{ color: COPPER_LIGHT }} /> tom@recognise.com.br
                </a>
              </div>

              {/* Link voltar */}
              <div className="mt-8">
                <Link to="/programas"
                  className="inline-flex items-center gap-2 text-white/30 text-xs hover:text-white/60 transition-colors"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  <ArrowRight size={12} className="rotate-180" /> Voltar para Programas
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-white font-bold text-base mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Solicitar Proposta Personalizada
              </h3>
              <MentorForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modais de pacote */}
      {activeModal && <PackageModal pkg={activeModal} onClose={() => setActiveModal(null)} />}
    </Layout>
  );
}
