import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, ArrowRight, Rocket, Star, Zap, Globe, Shield, Clock, Users,
  ChevronDown, Play, Award, Layers, BookOpen, Video, FileText, Headphones,
  BarChart3, Sparkles, X, MessageSquare, Calendar
} from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { Layout } from '@/components/Layout';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

const NAVY = '#001123';
const COPPER = '#7a6207';
const COPPER_LIGHT = '#c9a227';
const WA_LINK = 'https://wa.me/5511999999999?text=Quero%20saber%20mais%20sobre%20Plataformas%20para%20Mentores';
const CALENDLY = 'https://calendly.com/tom-queiroz-pareto/30min';

const COMPARISON = [
  {
    aspecto: 'Presença digital',
    semRecognise: 'Site genérico, bio do Instagram, link.tree',
    comRecognise: 'Plataforma própria exclusiva, com identidade única e páginas de alta conversão',
    icon: Globe,
  },
  {
    aspecto: 'Plataforma de cursos',
    semRecognise: 'Hotmart, Eduzz ou Kiwify — mensal, padrão, sem diferenciação',
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
    semRecognise: 'Textos genéricos, sem posicionamento claro, copy fraca',
    comRecognise: 'Copy especializada desenvolvida por time de especialistas + IA generativa',
    icon: MessageSquare,
  },
  {
    aspecto: 'Tempo para lançar',
    semRecognise: '3 a 6 meses tentando montar tudo sozinho (ou nunca)',
    comRecognise: 'Tudo pronto e lançado em até 3 semanas. Sem stress.',
    icon: Clock,
  },
  {
    aspecto: 'Suporte estratégico',
    semRecognise: 'Tutoriais no YouTube, grupos de Facebook, chute e tentativa',
    comRecognise: 'Time de especialistas em IA, tech e mentoria ao seu lado do começo ao fim',
    icon: Shield,
  },
];

const DELIVERABLES_TOP = [
  { icon: Globe, title: 'Site Profissional Completo', desc: 'Domínio, hospedagem, design premium alinhado à sua marca e nicho' },
  { icon: FileText, title: 'Páginas de Alta Conversão', desc: 'Hero, sobre, programas, depoimentos, CTA e formulários integrados' },
  { icon: BookOpen, title: 'Blog Estratégico', desc: 'Blog com SEO e estrutura para posicionamento de autoridade' },
  { icon: Users, title: 'Captação de Leads', desc: 'Formulários integrados, pop-ups e automações iniciais de e-mail' },
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
  { value: '20', unit: 'vagas', label: 'primeiros 45 dias com condições exclusivas' },
  { value: '100%', unit: '', label: 'customizado para o seu nicho' },
  { value: '0', unit: '', label: 'dependência de plataformas genéricas' },
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
      setError('Erro ao enviar. Tente via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(122,98,7,0.15)', border: '1px solid rgba(122,98,7,0.4)' }}>
          <CheckCircle size={32} style={{ color: COPPER_LIGHT }} />
        </div>
        <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Proposta solicitada com sucesso!
        </h3>
        <p className="text-white/60 text-sm">Nossa equipe entrará em contato em até 24h úteis.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, color: '#fff' }}>
          <Clock size={14} /> Agendar conversa agora
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Nome completo *</label>
          <input required value={form.full_name} onChange={e => set('full_name', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:ring-2 transition"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            placeholder="Seu nome" />
        </div>
        <div>
          <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">E-mail *</label>
          <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            placeholder="seu@email.com" />
        </div>
        <div>
          <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">WhatsApp</label>
          <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            placeholder="(11) 99999-9999" />
        </div>
        <div>
          <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Instagram</label>
          <input value={form.instagram} onChange={e => set('instagram', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            placeholder="@seuinsta" />
        </div>
      </div>
      <div>
        <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Seu nicho / área de mentoria</label>
        <input value={form.nicho_mentoria} onChange={e => set('nicho_mentoria', e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="Ex: Carreira, Negócios, Liderança, Saúde, IA..." />
      </div>
      <div>
        <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Pacote de interesse</label>
        <select value={form.pacote_interesse} onChange={e => set('pacote_interesse', e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition"
          style={{ background: '#0a1e35', border: '1px solid rgba(255,255,255,0.12)' }}>
          <option value="ainda_decidindo">Ainda estou decidindo</option>
          <option value="top">Mentoria Top — Plataforma Completa</option>
          <option value="full">Mentoria Full — Plataforma + LMS</option>
        </select>
      </div>
      <div>
        <label className="text-white/60 text-xs uppercase tracking-wider mb-1 block">Mensagem (opcional)</label>
        <textarea value={form.mensagem} onChange={e => set('mensagem', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition resize-none"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          placeholder="Conte um pouco sobre sua mentoria e seus objetivos..." />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="submit" disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105 disabled:opacity-60"
          style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
          {loading ? 'Enviando...' : (<><Rocket size={16} /> Solicitar Minha Proposta</>)}
        </button>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
          style={{ background: '#25D366' }}>
          <FaWhatsapp size={16} /> Falar pelo WhatsApp
        </a>
      </div>
      <p className="text-white/30 text-xs text-center">Sem compromisso. 100% gratuito. Resposta em até 24h.</p>
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
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
          <div className="p-6 md:p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X size={20} />
            </button>
            <div className="mb-2" style={{ color: COPPER_LIGHT }}>
              <span className="text-xs font-bold uppercase tracking-widest">
                {isTop ? 'Mentoria Top' : 'Mentoria Full'}
              </span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {isTop ? 'Plataforma Profissional Completa' : 'Plataforma + LMS Proprietário'}
            </h2>
            <p className="text-white/60 text-sm mb-6">
              {isTop
                ? 'Tudo que você precisa para ter uma presença digital única, atrair mentorandos qualificados e lançar sua mentoria em até 3 semanas.'
                : 'O pacote mais completo do mercado. Plataforma exclusiva + sistema de aprendizagem proprietário sem pagar mensalidade para Hotmart ou Kiwify.'}
            </p>
            <div className="grid gap-3 mb-8">
              {deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(122,98,7,0.15)' }}>
                    <d.icon size={16} style={{ color: COPPER_LIGHT }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{d.title}</p>
                    <p className="text-white/50 text-xs">{d.desc}</p>
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Tabs for anchor nav
  const tabs = [
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
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: NAVY }}>
        {/* BG image parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src={IMAGES.IMG_1550_1} alt=""
            className="w-full h-full object-cover object-center opacity-20" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${NAVY} 40%, rgba(0,17,35,0.7) 100%)` }} />
        </motion.div>

        {/* Sticky anchor tabs */}
        <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block">
          <div className="site-container">
            <div className="flex gap-1 pb-0">
              {tabs.map(t => (
                <a key={t.id} href={`#${t.id}`}
                  className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-all"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none', letterSpacing: '0.05em' }}>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 site-container py-32 md:py-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(122,98,7,0.18)', border: `1px solid rgba(201,162,39,0.4)`, color: COPPER_LIGHT }}>
              <Rocket size={12} /> Novo • Plataformas para Mentores • Powered by IA
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-white font-bold leading-tight mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
              Sua Mentoria Merece<br />
              <span style={{ color: COPPER_LIGHT }}>Uma Plataforma</span><br />
              Tão Única Quanto Você.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-white/70 text-lg mb-3 max-w-2xl" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Chega de depender de plataformas genéricas que não foram feitas para você.
              A Recognise cria <strong className="text-white/90">sua plataforma exclusiva em até 3 semanas</strong>,
              com tecnologia de ponta e IA embarcada — para que você conquiste mais mentorandos
              e entregue uma experiência que ninguém mais tem.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-sm mb-10" style={{ color: COPPER_LIGHT, fontWeight: 500 }}>
              ⚡ Apenas 20 vagas com condições especiais nos próximos 45 dias.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3">
              <a href="#form"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
                <Rocket size={16} /> Quero Minha Plataforma
              </a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white/90 text-sm font-semibold transition-all hover:bg-white/10 border"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                <Play size={16} /> Agendar Conversa Gratuita
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section style={{ background: '#040d1a', borderTop: `2px solid rgba(122,98,7,0.2)` }}>
        <div className="site-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center">
                <div className="text-3xl md:text-4xl font-bold" style={{ color: COPPER_LIGHT, fontFamily: 'Montserrat, sans-serif' }}>
                  {s.value}<span className="text-lg ml-1">{s.unit}</span>
                </div>
                <div className="text-white/50 text-xs mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEXTO ──────────────────────────────────────────────────────── */}
      <section id="contexto" className="py-20 md:py-28" style={{ background: '#f5f6f8' }}>
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COPPER }}>O Momento é Agora</p>
              <h2 className="font-bold mb-5 leading-tight"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: NAVY }}>
                O Brasil tem fome de mentores. Mas o mercado pune quem não tem estrutura.
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                O mercado de mentoria e coaching no Brasil cresceu <strong>47% em 3 anos</strong> — e o Brasil
                já é o <strong>3º maior mercado mundial de coaching</strong>, segundo a ICF. Há demanda real e crescente
                por mentores de qualidade em todas as áreas.
              </p>
              <p className="text-gray-600 mb-4" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                O problema: <strong>mais de 80% dos mentores perdem oportunidades</strong> por falta de presença
                digital profissional, processo de captação ineficiente ou uma plataforma que não reflete
                a qualidade do que entregam. O mercado julga pela embalagem antes de conhecer o conteúdo.
              </p>
              <p className="text-gray-600 mb-6" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Na era da IA, o diferencial não é mais só conhecimento — é <strong>experiência, exclusividade
                e presença digital de alto impacto</strong>. Mentores que têm isso conquistam mentorandos
                de alto ticket com muito mais facilidade.
              </p>
              <a href="#pacotes"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                style={{ color: COPPER }}>
                Ver os pacotes disponíveis <ArrowRight size={14} />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: 380 }}>
              <img src={IMAGES.IMG_307768_2} alt="Mentor celebrando conquistas"
                className="w-full h-full object-cover" style={{ minHeight: 380 }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(122,98,7,0.9)', color: '#fff' }}>
                  <Star size={11} /> Você pode ser esse mentor referência no seu nicho
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pain points */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { icon: '😤', title: 'Cansado de plataformas caras que não convertem?', desc: 'Hotmart, Eduzz, Kiwify... você paga mensalidade, segue as regras deles e sua marca some na multidão.' },
              { icon: '⏰', title: 'Perdendo tempo montando tudo do zero?', desc: 'Meses configurando ferramentas, escrevendo copy, tentando aprender Wordpress sozinho. E a mentoria esperando.' },
              { icon: '🎯', title: 'Sua expertise merece mais do que um link.tree?', desc: 'Você tem conhecimento de elite. Está na hora de ter uma presença digital que reflita isso e atraia os melhores mentorandos.' },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border"
                style={{ background: '#fff', borderColor: 'rgba(0,17,35,0.08)' }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>{p.title}</h3>
                <p className="text-gray-500 text-sm" style={{ fontWeight: 300 }}>{p.desc}</p>
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
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COPPER_LIGHT }}>Comparativo Real</p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Com ou sem a Recognise?<br />
              <span style={{ color: COPPER_LIGHT }}>A diferença é impossível de ignorar.</span>
            </h2>
          </motion.div>

          {/* Comparison header */}
          <div className="grid grid-cols-3 mb-4 text-xs font-bold uppercase tracking-wider px-4">
            <div className="text-white/40">Aspecto</div>
            <div className="text-center text-red-400">❌ Sem Recognise</div>
            <div className="text-center" style={{ color: COPPER_LIGHT }}>✅ Com Recognise</div>
          </div>

          <div className="space-y-3">
            {COMPARISON.map((row, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="grid grid-cols-3 gap-4 p-4 rounded-xl items-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2">
                  <row.icon size={14} style={{ color: COPPER_LIGHT, flexShrink: 0 }} />
                  <span className="text-white/70 text-xs font-semibold">{row.aspecto}</span>
                </div>
                <div className="text-red-300/80 text-xs text-center" style={{ fontWeight: 300 }}>{row.semRecognise}</div>
                <div className="text-green-300/90 text-xs text-center" style={{ fontWeight: 400 }}>{row.comRecognise}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mt-10">
            <a href="#pacotes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-bold transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
              Quero ser o mentor com Recognise <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PACOTES ───────────────────────────────────────────────────────── */}
      <section id="pacotes" className="py-20 md:py-28" style={{ background: '#f5f6f8' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COPPER }}>Escolha o Seu Nível</p>
            <h2 className="font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: NAVY }}>
              Dois pacotes. Um único propósito:<br />tornar sua mentoria irresistível.
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm" style={{ fontWeight: 300 }}>
              Cada proposta é personalizada após diagnóstico. Sem preço fixo — porque sua mentoria é única e merece uma solução sob medida.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card TOP */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ border: '1px solid rgba(0,17,35,0.12)' }}>
              {/* Header */}
              <div className="p-8 text-white relative overflow-hidden" style={{ background: NAVY }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: COPPER, transform: 'translate(30%, -30%)' }} />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ background: 'rgba(201,162,39,0.15)', color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.3)` }}>
                  <Zap size={10} /> Mentoria Top
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Plataforma Profissional
                </h3>
                <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>
                  Para mentores que querem presença digital de alto impacto com lançamento rápido e sem dor de cabeça.
                </p>
              </div>
              {/* Body */}
              <div className="p-8 bg-white">
                <div className="space-y-3 mb-8">
                  {DELIVERABLES_TOP.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: COPPER }} />
                      <div>
                        <span className="text-sm font-semibold" style={{ color: NAVY }}>{d.title}</span>
                        <span className="text-gray-400 text-xs ml-2" style={{ fontWeight: 300 }}>{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl mb-6 text-center"
                  style={{ background: 'rgba(122,98,7,0.06)', border: '1px solid rgba(122,98,7,0.15)' }}>
                  <p className="text-xs text-gray-500 mb-1">Investimento personalizado após diagnóstico</p>
                  <p className="font-bold text-lg" style={{ color: NAVY }}>Solicite sua proposta</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveModal('top')}
                    className="w-full py-3.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
                    Quero o Mentoria Top <ArrowRight size={14} className="inline ml-1" />
                  </button>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold border transition-all hover:bg-gray-50"
                    style={{ borderColor: 'rgba(0,17,35,0.15)', color: NAVY }}>
                    Agendar conversa gratuita
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card FULL */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl relative"
              style={{ border: `2px solid rgba(201,162,39,0.5)` }}>
              {/* BEST badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})`, color: '#fff' }}>
                ⭐ Mais Completo
              </div>
              {/* Header */}
              <div className="p-8 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0a1e35 100%)` }}>
                <div className="absolute inset-0 opacity-10">
                  <img src={IMAGES.MENTOR_AI_1} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ background: `rgba(201,162,39,0.2)`, color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.4)` }}>
                    <Star size={10} /> Mentoria Full
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Plataforma + LMS Proprietário
                  </h3>
                  <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>
                    O ecossistema digital completo da sua mentoria — exclusivo, sem mensalidades, powered by IA.
                  </p>
                </div>
              </div>
              {/* Body */}
              <div className="p-8 bg-white">
                <div className="space-y-3 mb-8">
                  {DELIVERABLES_FULL.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5"
                        style={{ color: i < DELIVERABLES_TOP.length ? COPPER : '#059669' }} />
                      <div>
                        <span className="text-sm font-semibold" style={{ color: NAVY }}>{d.title}</span>
                        {i >= DELIVERABLES_TOP.length && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 rounded font-bold"
                            style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}>+Full</span>
                        )}
                        <span className="text-gray-400 text-xs ml-1" style={{ fontWeight: 300 }}>{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl mb-6 text-center"
                  style={{ background: 'rgba(122,98,7,0.06)', border: `1px solid rgba(201,162,39,0.3)` }}>
                  <p className="text-xs text-gray-500 mb-1">Investimento personalizado após diagnóstico</p>
                  <p className="font-bold text-lg" style={{ color: NAVY }}>Solicite sua proposta</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveModal('full')}
                    className="w-full py-3.5 rounded-xl text-white text-sm font-bold transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` }}>
                    Quero o Mentoria Full <ArrowRight size={14} className="inline ml-1" />
                  </button>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold border transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                    style={{ borderColor: '#25D366', color: '#25D366' }}>
                    <FaWhatsapp size={14} /> Falar com especialista agora
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
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COPPER_LIGHT }}>Processo Exclusivo</p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Do diagnóstico ao lançamento<br />
              <span style={{ color: COPPER_LIGHT }}>em até 3 semanas.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Diagnóstico Profundo', icon: Sparkles, desc: 'Entrevista em profundidade com você. Pesquisa de mercado, concorrentes, público-alvo e seu diferencial único.' },
              { step: '02', title: 'Planejamento Estratégico', icon: BarChart3, desc: 'Nossa equipe cria o plano completo: arquitetura da plataforma, copy, conteúdo, identidade e funil.' },
              { step: '03', title: 'Desenvolvimento com IA', icon: Zap, desc: 'Time tech + IA em ação. Construímos tudo em tempo recorde com tecnologia exclusiva e qualidade premium.' },
              { step: '04', title: 'Lançamento & Suporte', icon: Rocket, desc: 'Go-live com checklist completo, suporte técnico e estratégico pós-lançamento para você começar a conquistar mentorandos.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-5xl font-black mb-4 opacity-10 absolute top-4 right-5"
                  style={{ color: COPPER_LIGHT, fontFamily: 'Montserrat, sans-serif' }}>{s.step}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(122,98,7,0.2)' }}>
                  <s.icon size={18} style={{ color: COPPER_LIGHT }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{s.title}</h3>
                <p className="text-white/50 text-xs" style={{ fontWeight: 300 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Por que a Recognise */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto"
            style={{ border: '1px solid rgba(122,98,7,0.3)' }}>
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COPPER_LIGHT }}>Por que só a Recognise</p>
                <h3 className="text-white text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Ninguém no Brasil une IA, mentoria e tech com entrega em 3 semanas.
                </h3>
                <div className="space-y-3">
                  {[
                    'Especialistas em IA aplicada ao negócio de mentoria',
                    'Plataformas 100% customizadas — sem template genérico',
                    'Time multidisciplinar: tech, copy, design e estratégia',
                    'Powered by IA proprietária da Recognise (TESS AI)',
                    'Entrega rápida sem abrir mão da qualidade premium',
                    'Suporte estratégico pós-lançamento incluído',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: COPPER_LIGHT, flexShrink: 0 }} />
                      <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[260px]">
                <img src={IMAGES.IMG_93703_4} alt="Parceria e excelência"
                  className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,17,35,0.3)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0A66C2' }}>
                      <FaLinkedinIn size={14} color="white" />
                    </div>
                    <span className="text-white text-xs" style={{ fontWeight: 300 }}>Tom Queiroz — CEO Recognise & Pareto</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DEPOIMENTOS / SOCIAL PROOF ────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#f5f6f8' }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: COPPER }}>Prova Real</p>
            <h2 className="font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: NAVY }}>
              Mentores que já escolheram ter exclusividade.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Mariana T.', role: 'Mentora de Carreira', quote: 'Minha plataforma ficou impossível de copiar. Em 3 semanas, lançamos e já fechei 4 mentorandos novos com ticket 2x maior que antes.' },
              { name: 'Ricardo A.', role: 'Mentor de Negócios', quote: 'Parei de pagar Hotmart, Eduzz e mais dois sistemas que não conversavam. Hoje tenho tudo em um só lugar, com minha cara, e meus mentorandos adoraram.' },
              { name: 'Luciana F.', role: 'Mentora de Liderança', quote: 'O diagnóstico inicial já me abriu os olhos para o que eu precisava. A plataforma entregue superou tudo que eu imaginava. Recomendo sem hesitar.' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white shadow-sm border"
                style={{ borderColor: 'rgba(0,17,35,0.06)' }}>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill={COPPER_LIGHT} style={{ color: COPPER_LIGHT }} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic" style={{ fontWeight: 300 }}>"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: NAVY }}>{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COPPER} 0%, #5a4705 100%)` }}>
        <div className="absolute inset-0 opacity-15">
          <img src={IMAGES.IMG_5172_3} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 site-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/70 text-xs uppercase tracking-widest mb-3 font-bold">Apenas 20 vagas — 45 dias</p>
            <h2 className="text-white font-bold mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
              Sua mentoria pode começar<br />em 3 semanas. Ou não começar nunca.
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm" style={{ fontWeight: 300 }}>
              A escolha é sua. Mas o mercado não vai esperar enquanto outros mentores tomam o espaço com plataformas exclusivas e IA. Solicite sua proposta agora — é gratuito e sem compromisso.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-105 bg-white"
                style={{ color: COPPER }}>
                <Rocket size={16} /> Quero Minha Plataforma Agora
              </a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-semibold border border-white/30 transition-all hover:bg-white/10">
                <Calendar size={16} /> Agendar Conversa Gratuita
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TABS DO PACOTE ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COPPER_LIGHT }}>Detalhes dos Pacotes</p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
              O que está incluído em cada pacote?
            </h2>
          </motion.div>
          {/* Tab switcher */}
          <div className="flex justify-center gap-3 mb-10">
            {[{ id: 'top', label: '⚡ Mentoria Top' }, { id: 'full', label: '⭐ Mentoria Full' }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id as 'top' | 'full')}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: activeTab === t.id ? `linear-gradient(135deg, ${COPPER}, ${COPPER_LIGHT})` : 'rgba(255,255,255,0.05)',
                  color: activeTab === t.id ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {(activeTab === 'top' ? DELIVERABLES_TOP : DELIVERABLES_FULL).map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'rgba(122,98,7,0.2)' }}>
                  <d.icon size={16} style={{ color: COPPER_LIGHT }} />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{d.title}</h4>
                <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM PRINCIPAL ────────────────────────────────────────────────── */}
      <section id="form" className="py-20 md:py-28" style={{ background: '#040d1a' }}>
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COPPER_LIGHT }}>Solicite Sua Proposta</p>
              <h2 className="text-white font-bold mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}>
                Sua plataforma exclusiva começa aqui.
              </h2>
              <p className="text-white/60 text-sm mb-6" style={{ fontWeight: 300 }}>
                Preencha o formulário ao lado. Nossa equipe entrará em contato em até 24h úteis com
                uma proposta personalizada após um breve diagnóstico gratuito.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: CheckCircle, text: '100% gratuito e sem compromisso' },
                  { icon: Clock, text: 'Resposta em até 24h úteis' },
                  { icon: Shield, text: 'Seus dados são protegidos pela LGPD' },
                  { icon: Rocket, text: 'Lançamento em até 3 semanas' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={16} style={{ color: COPPER_LIGHT, flexShrink: 0 }} />
                    <span className="text-white/60 text-sm" style={{ fontWeight: 300 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(122,98,7,0.1)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: COPPER_LIGHT }}>Prefere falar diretamente?</p>
                <div className="flex flex-col gap-2">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                    <FaWhatsapp size={14} style={{ color: '#25D366' }} /> WhatsApp direto com o time
                  </a>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                    <Clock size={14} style={{ color: COPPER_LIGHT }} /> Agendar conversa no Calendly
                  </a>
                  <a href="mailto:tom@recognise.com.br"
                    className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                    <MessageSquare size={14} style={{ color: COPPER_LIGHT }} /> tom@recognise.com.br
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Solicitar Proposta Personalizada
              </h3>
              <MentorForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      {activeModal && <PackageModal pkg={activeModal} onClose={() => setActiveModal(null)} />}
    </Layout>
  );
}
