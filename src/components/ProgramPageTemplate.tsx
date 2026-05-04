import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { renderAiFirst } from '@/components/AiFirstTm';
import { ArrowRight, CheckCircle, Award, Users, Clock, Target, MessageCircle, ChevronDown, ChevronUp, Building2, Briefcase, Phone, Mail, User, Send } from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { Layout } from '@/components/Layout';
import type { IndividualProgram, CorporateProgram } from '@/lib/programsData';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  cargo: string;
  instituicao: string;
  empresa?: string;
  num_participantes?: string;
  num_mentores?: string;
  objetivo?: string;
  nivel_hierarquico?: string;
  desafio_principal?: string;
  data_preferencial?: string;
  event_type?: string;
  audience_size?: string;
}

interface ProgramPageTemplateProps {
  programData: IndividualProgram | CorporateProgram;
  formType: 'individual' | 'corporate';
  tableName: string;
}

// ─── Tab Index ────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'contexto', label: 'Contexto' },
  { id: 'para-quem', label: 'Para Quem É' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'inscricao', label: 'Inscrição' },
];

// ─── Section animations ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function AnimatedSection({ children, id, className = '', style }: { children: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// ─── Module Accordion ─────────────────────────────────────────────────────────
function ModuleCard({ mod, idx }: { mod: { number: string; title: string; duration: string; topics: string[]; benchmark?: string }; idx: number }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left transition-all"
        style={{ background: open ? 'linear-gradient(90deg, #001123, #001f3f)' : undefined }}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#7a6207', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
            {mod.number}
          </span>
          <div>
            <div className={`font-semibold text-base ${open ? 'text-white' : 'text-foreground'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {mod.title}
            </div>
            <div className="text-xs mt-1" style={{ color: '#7a6207' }}>{mod.duration}</div>
          </div>
        </div>
        {open ? <ChevronUp className="text-white/60" size={18} /> : <ChevronDown className="text-muted-foreground" size={18} />}
      </button>
      {open && (
        <div className="p-6 border-t border-border bg-background/50">
          <ul className="space-y-2">
            {mod.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: '#7a6207' }} />
                {t}
              </li>
            ))}
          </ul>
          {mod.benchmark && (
            <div className="mt-4 text-xs text-muted-foreground/60 italic border-l-2 pl-3" style={{ borderColor: '#7a6207' }}>
              Benchmarked from: {mod.benchmark}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProgramPageTemplate({ programData, formType, tableName }: ProgramPageTemplateProps) {
  const [activeTab, setActiveTab] = useState('contexto');
  const [formState, setFormState] = useState<FormData>({
    nome: '', email: '', whatsapp: '', cargo: '', instituicao: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // ── Scroll ao topo ao montar a página ──────────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Sticky tab bar
  const tabBarRef = useRef<HTMLDivElement>(null);
  const [tabBarSticky, setTabBarSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (tabBarRef.current) {
        const rect = tabBarRef.current.getBoundingClientRect();
        setTabBarSticky(rect.top <= 72);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const payload: Record<string, string> = {
        nome: formState.nome,
        email: formState.email,
        whatsapp: formState.whatsapp,
        cargo: formState.cargo,
        programa: programData.title,
        origem: 'landing_page',
      };
      if (formType === 'corporate') {
        payload.instituicao = formState.instituicao;
        if (formState.num_participantes) payload.num_participantes = formState.num_participantes;
        if (formState.num_mentores) payload.num_mentores = formState.num_mentores;
        if (formState.objetivo) payload.objetivo = formState.objetivo;
        if (formState.nivel_hierarquico) payload.nivel_hierarquico = formState.nivel_hierarquico;
        if (formState.desafio_principal) payload.desafio_principal = formState.desafio_principal;
        if (formState.data_preferencial) payload.data_preferencial = formState.data_preferencial;
      } else {
        if (formState.empresa) payload.empresa = formState.empresa;
        if (formState.objetivo) payload.objetivo = formState.objetivo;
        if (formState.event_type) payload.event_type = formState.event_type;
        if (formState.audience_size) payload.audience_size = formState.audience_size;
      }
      const { error: dbError } = await supabase.from(tableName).insert([payload]);
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError('Erro ao enviar. Tente novamente ou entre em contato via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const prog = programData;
  const isCorp = formType === 'corporate';
  const corpData = isCorp ? (prog as CorporateProgram) : null;

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: '#001123' }}>
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={prog.heroImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001123 55%, rgba(0,17,35,0.7) 100%)' }} />
        </div>
        {/* Decorative copper line */}
        <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: 'linear-gradient(90deg, transparent, #7a6207, transparent)' }} />

        <div className="container mx-auto px-6 relative z-10 pt-28 pb-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-6" style={{ background: '#7a6207', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
                {prog.badge}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.7rem, 4.25vw, 2.975rem)', lineHeight: 1.1 }}
            >
              {renderAiFirst(prog.title)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-4 font-light"
              style={{ color: '#7a6207', fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            >
              {renderAiFirst(prog.tagline)}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/70 text-base mb-10 max-w-2xl"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, lineHeight: 1.8 }}
            >
              {prog.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('inscricao')}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}
              >
                <MessageCircle size={18} />
                Solicitar Mais Informações
              </button>
              <a
                href={`https://wa.me/5511915513210?text=Tenho interesse no programa ${encodeURIComponent(prog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90 hover:scale-105 border border-white/20 text-white"
                style={{ fontFamily: 'Montserrat, sans-serif', background: 'rgba(255,255,255,0.08)' }}
              >
                <FaWhatsapp size={18} />
                Falar com Especialista
              </a>
            </motion.div>

            {/* Hero metadata row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { icon: <Clock size={16} />, label: prog.duration },
                { icon: <Target size={16} />, label: prog.format },
                { icon: <Users size={16} />, label: prog.nextEdition },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <span style={{ color: '#7a6207' }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL TAB INDEX ── */}
      <div
        ref={tabBarRef}
        className={`sticky top-[72px] z-40 border-b border-border transition-all ${tabBarSticky ? 'shadow-lg' : ''}`}
        style={{ background: 'rgba(0,17,35,0.97)', backdropFilter: 'blur(16px)' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'border-b-[#7a6207] text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTEXTO (Challenge + Stats) ── */}
      <AnimatedSection id="contexto" className="py-24" style={{ background: '#f8f9fa' }}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
              O Contexto que Não Pode Ser Ignorado
            </span>
            <h2 className="text-foreground mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
              {isCorp && corpData ? 'O gap que está custando trilhões às empresas' : 'Por que este programa?'}
            </h2>
            <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
              {isCorp && corpData ? corpData.brazilChallenge : (prog as IndividualProgram).challenge}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prog.challengeStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 border border-border bg-white shadow-sm"
              >
                <div className="text-4xl font-bold mb-2" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground/60 italic">{stat.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── PARA QUEM É ── */}
      <AnimatedSection id="para-quem" className="py-24" style={{ background: '#001123' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
                Perfil Ideal
              </span>
              <h2 className="text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {renderAiFirst(prog.targetTitle)}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prog.targetProfiles.map((profile, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/10"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <CheckCircle size={20} className="shrink-0 mt-0.5" style={{ color: '#7a6207' }} />
                  <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                    {profile}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── METODOLOGIA ── */}
      <AnimatedSection id="metodologia" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
                Metodologia Exclusiva
              </span>
              <h2 className="mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {renderAiFirst(prog.methodologyTitle)}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                {prog.methodologyDesc}
              </p>
              <div className="flex gap-4 mt-8">
                <a
                  href="https://www.linkedin.com/in/wellingtonqueiroz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <FaLinkedinIn size={16} />
                  Conectar com Tom Queiroz
                </a>
              </div>
            </div>
            <div className="space-y-4">
              {prog.methodologyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card"
                >
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ background: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── MÓDULOS ── */}
      <section id="modulos" className="py-24" style={{ background: '#f8f9fa' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
              Conteúdo Programático
            </span>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>Módulos do Programa</h2>
            <p className="text-muted-foreground mt-4 text-sm max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
              Conteúdo calibrado contra os melhores programas executivos de IA do mundo — MIT Sloan, HBS, Kellogg, Wharton, INSEAD — e adaptado à realidade e ao mercado brasileiro.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {prog.modules.map((mod, idx) => (
              <ModuleCard key={idx} mod={mod} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTADOS ── */}
      <AnimatedSection id="resultados" className="py-24" style={{ background: '#001123' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
              O Que Você Vai Ganhar
            </span>
            <h2 className="text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
              Resultados Concretos
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {prog.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-white/10"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="text-3xl font-bold mb-2" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
                  {outcome.metric}
                </div>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                  {outcome.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Program details */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Clock size={20} />, label: 'Duração', value: prog.duration },
              { icon: <Target size={20} />, label: 'Formato', value: prog.format },
              { icon: <Award size={20} />, label: 'Investimento', value: prog.investment },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/10 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="flex justify-center mb-3" style={{ color: '#7a6207' }}>{item.icon}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.label}</div>
                <div className="text-white text-sm font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── FORMULÁRIO ── */}
      <section id="inscricao" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}>
                Próximo Passo
              </span>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                Solicite Mais Informações
              </h2>
              <p className="text-muted-foreground mt-4 text-sm" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
                Todos os programas são personalizados para o seu perfil e objetivos. Preencha o formulário e entraremos em contato em até 24h úteis.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 rounded-3xl border border-border bg-card"
              >
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#7a6207' }} />
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Recebemos sua solicitação!</h3>
                <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Entraremos em contato em até 24h úteis. Ou se preferir, fale conosco agora via WhatsApp.
                </p>
                <a
                  href={`https://wa.me/5511915513210?text=Tenho interesse no programa ${encodeURIComponent(prog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
                  style={{ background: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <FaWhatsapp size={18} />
                  Falar no WhatsApp
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 space-y-5">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <User size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                    Nome Completo *
                  </label>
                  <input
                    name="nome"
                    type="text"
                    required
                    value={formState.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                </div>

                {/* Instituição (corporate) ou Empresa (individual) */}
                {isCorp ? (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      <Building2 size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                      Instituição / Empresa *
                    </label>
                    <input
                      name="instituicao"
                      type="text"
                      required
                      value={formState.instituicao}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa ou organização"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      <Building2 size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                      Empresa (opcional)
                    </label>
                    <input
                      name="empresa"
                      type="text"
                      value={formState.empresa || ''}
                      onChange={handleChange}
                      placeholder="Sua empresa atual"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    />
                  </div>
                )}

                {/* Cargo */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Briefcase size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                    Cargo *
                  </label>
                  <input
                    name="cargo"
                    type="text"
                    required
                    value={formState.cargo}
                    onChange={handleChange}
                    placeholder="Seu cargo atual"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Phone size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                    WhatsApp *
                  </label>
                  <input
                    name="whatsapp"
                    type="tel"
                    required
                    value={formState.whatsapp}
                    onChange={handleChange}
                    placeholder="+55 11 99999-9999"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Mail size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                </div>

                {/* Corporate extras */}
                {isCorp && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <Users size={14} className="inline mr-2" style={{ color: '#7a6207' }} />
                        Nº estimado de participantes
                      </label>
                      <select
                        name="num_participantes"
                        value={formState.num_participantes || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Selecione...</option>
                        <option value="5-10">5 a 10</option>
                        <option value="10-20">10 a 20</option>
                        <option value="20-50">20 a 50</option>
                        <option value="50+">Mais de 50</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Principal objetivo com o programa
                      </label>
                      <textarea
                        name="objetivo"
                        value={formState.objetivo || ''}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Descreva brevemente o que deseja alcançar com este programa..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all resize-none"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      />
                    </div>
                  </>
                )}

                {/* Individual extras */}
                {!isCorp && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Seu principal objetivo com este programa
                    </label>
                    <textarea
                      name="objetivo"
                      value={formState.objetivo || ''}
                      onChange={handleChange}
                      rows={3}
                      placeholder="O que você quer alcançar com este programa?"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 transition-all resize-none"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    />
                  </div>
                )}

                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                <div className="text-xs text-muted-foreground/60 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Todos os programas são personalizados. Nenhum preço é divulgado antes de uma conversa exploratória.
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {submitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send size={18} />
                      Solicitar Informações
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href={`https://wa.me/5511915513210?text=Tenho interesse no programa ${encodeURIComponent(prog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: '#7a6207', fontFamily: 'Roboto, sans-serif' }}
                  >
                    <FaWhatsapp size={16} />
                    Falar no WhatsApp
                  </a>
                  <span className="text-muted-foreground/40">·</span>
                  <a
                    href="mailto:tom@midia-digital.com"
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity text-muted-foreground"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    <Mail size={16} />
                    tom@midia-digital.com
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16" style={{ background: '#7a6207' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-white/80 mb-8 text-sm max-w-xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
            Fale com um especialista Recognise e descubra qual programa faz mais sentido para o seu momento profissional ou para a sua organização.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5511915513210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-white/15 hover:bg-white/25 transition-all"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <FaWhatsapp size={18} />
              Falar no WhatsApp
            </a>
            <button
              onClick={() => scrollToSection('inscricao')}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white transition-all hover:opacity-90"
              style={{ color: '#7a6207', fontFamily: 'Montserrat, sans-serif' }}
            >
              <ArrowRight size={18} />
              Solicitar Proposta
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
