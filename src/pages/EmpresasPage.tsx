import { useState, useRef } from 'react';
import { AiFirstTm, GeracaoAiFirstTm } from '@/components/AiFirstTm';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Target, Zap, TrendingUp, Award, CheckCircle, ArrowRight,
  Building2, Brain, Lightbulb, BarChart3, Shield, Globe2, ChevronDown,
  Rocket, BookOpen, Cpu, Star, Clock, MessageCircle,
} from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';

// ── Constantes de marca ──────────────────────────────────────────────
const NAVY = '#001123';
const COPPER = '#7a6207';
const WA_LINK = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20corporativas%20da%20Recognise%20para%20empresas.';

// ── Seções da página (índice) ────────────────────────────────────────
const PAGE_SECTIONS = [
  { id: 'desafio', label: 'O Desafio' },
  { id: 'solucoes', label: 'Soluções' },
  { id: 'formacao-mentores', label: 'Formação de Mentores' },
  { id: 'metodologia', label: 'Metodologia' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Fale Conosco' },
];

// ── Soluções Corporativas ────────────────────────────────────────────
const SOLUTIONS = [
  {
    icon: Cpu,
    tag: 'IMERSÃO EXECUTIVA',
    title: 'AI-First Leadership Program',
    subtitle: 'Para líderes que precisam agir agora — não daqui a 2 anos.',
    desc: 'Programa intensivo para executivos C-Level e VPs que precisam compreender, decidir e liderar com IA Generativa como vantagem competitiva real. Baseado em 500+ casos aplicados e na metodologia proprietária AI-First Framework™.',
    features: ['Diagnóstico organizacional de maturidade em IA', 'Workshops práticos com TESS AI e ferramentas enterprise', 'Roadmap de implementação personalizado por setor', 'Sessões 1:1 com Tom Queiroz para alinhamento estratégico'],
    duration: '3 a 6 meses',
    format: 'In-Company + Online',
    audience: 'C-Level, VPs, Diretores',
    color: NAVY,
    bg: 'bg-[#001123]',
    textClass: 'text-white',
    link: '/para-empresas/lideranca-ai-first',
  },
  {
    icon: Users,
    tag: 'FORMAÇÃO DE TIMES',
    title: 'Squads de IA para Negócios',
    subtitle: 'Transforme equipes inteiras em operadores estratégicos de IA.',
    desc: 'Trilha estruturada para times de marketing, vendas, produto e operações aprenderem a integrar IA Generativa nos processos do dia a dia — com foco em produtividade, decisão e inovação aplicada.',
    features: ['Trilha por função (Marketing, Vendas, RH, Operações)', 'Certificação interna por competência', 'Projetos práticos com KPIs definidos', 'Acompanhamento mensal de resultados'],
    duration: '2 a 4 meses',
    format: 'In-Company / Híbrido',
    audience: 'Times operacionais e táticos',
    color: COPPER,
    bg: 'bg-white',
    textClass: 'text-[#001123]',
    link: '/para-empresas/imersao-ai-first',
  },
  {
    icon: Building2,
    tag: 'TRANSFORMAÇÃO SISTÊMICA',
    title: 'AI Transformation Consulting',
    subtitle: 'Estratégia, implementação e governança — do plano ao resultado.',
    desc: 'Consultoria end-to-end para empresas que querem implementar IA de forma estruturada: diagnóstico de gaps, roadmap executivo, formação de comitês internos de IA e acompanhamento de OKRs de transformação.',
    features: ['Diagnóstico organizacional 360° em 30 dias', 'Arquitetura de Governança de IA', 'Seleção e integração de ferramentas enterprise', 'Mentoria para o time de liderança durante implementação'],
    duration: '6 a 12 meses',
    format: 'Consultoria contínua',
    audience: 'Alta liderança + RH + TI',
    color: '#f4f5f7',
    bg: 'bg-[#f4f5f7]',
    textClass: 'text-[#001123]',
    link: '/para-empresas/advisory-executivo',
  },
  {
    icon: Brain,
    tag: 'PROGRAMA EMBLEMÁTICO',
    title: 'Formação de Mentores com IA',
    subtitle: 'Multiplique o capital humano da sua organização.',
    desc: 'Forme líderes internos como mentores certificados especializados em Transformação Corporativa com IA. Crie um ecossistema de desenvolvimento contínuo e sustentável — com metodologia exclusiva, baseada nas melhores práticas internacionais.',
    features: ['16h de formação prática em metodologia de mentoria', 'Certificação Internacional em Mentoring com IA', 'Matching e acompanhamento de duplas mentor-mentorado', 'Plataforma digital para gestão do programa'],
    duration: '4 a 8 meses',
    format: 'In-Company + Plataforma LMS',
    audience: 'Gestores, líderes sêniores, RH',
    color: NAVY,
    bg: 'bg-[#001123]',
    textClass: 'text-white',
    featured: true,
    link: '/para-empresas/formacao-mentores',
  },
  {
    icon: Star,
    tag: 'EVENTOS CORPORATIVOS',
    title: 'Keynotes & MasterClasses',
    subtitle: 'Inspire equipes inteiras em um único evento transformador.',
    desc: 'Palestras e masterclasses executivas sobre IA Generativa, liderança digital e inovação corporativa — com Tom Queiroz como keynote speaker. Conteúdo sob medida para a cultura e desafios da sua empresa.',
    features: ['Palestra personalizada para o contexto da empresa', 'Dinâmicas interativas e cases aplicados', 'Material exclusivo pós-evento', 'Q&A estratégico com CEO e liderança'],
    duration: '3h a 1 dia',
    format: 'Presencial / Online',
    audience: 'Todos os níveis organizacionais',
    color: COPPER,
    bg: 'bg-white',
    textClass: 'text-[#001123]',
    link: '/para-empresas/imersao-ai-first',
  },
  {
    icon: Rocket,
    tag: 'ACELERAÇÃO DE TALENTOS',
    title: 'AI Talent Acceleration',
    subtitle: 'Identifique, desenvolva e retenha talentos-chave para a era da IA.',
    desc: 'Programa de aceleração individual para high performers e talentos emergentes — combinando mentoria 1:1 com Tom Queiroz, trilhas digitais e projetos de impacto real dentro da empresa.',
    features: ['Assessment de perfil digital e prontidão para IA', 'Mentoria 1:1 personalizada (mensal)', 'Trilha de aprendizado adaptativa', 'Projeto de impacto com sponsor executivo'],
    duration: '6 meses',
    format: 'Individual + Corporativo',
    audience: 'High performers e talentos de alto potencial',
    color: '#f4f5f7',
    bg: 'bg-[#f4f5f7]',
    textClass: 'text-[#001123]',
    link: '/para-empresas/advisory-executivo',
  },
];

// ── Programa Formação de Mentores (detalhado) ────────────────────────
const MENTOR_MODULES = [
  { num: '01', title: 'Fundamentos do Mentoring com IA', hours: '3h', desc: 'O que é mentoring autêntico, papel do mentor, diferenças de coaching e consultoria. Como IA transforma a dinâmica de desenvolvimento humano nas organizações.' },
  { num: '02', title: 'Competências do Mentor Corporativo Digital', hours: '3h', desc: 'Escuta ativa, questionamento poderoso, feedback de alta performance. Integração de ferramentas de IA para personalizar jornadas de desenvolvimento.' },
  { num: '03', title: 'Metodologia AI-First em Mentoring', hours: '3h', desc: 'Aplicação do AI-First Framework™ no contexto de desenvolvimento de pessoas. Uso de dados e IA para diagnóstico, matching e acompanhamento de mentorados.' },
  { num: '04', title: 'Gestão de Programas de Mentoria Corporativa', hours: '3h', desc: 'Estruturação, matching, governança e métricas de programas internos de mentoria. KPIs de desenvolvimento, retenção e impacto organizacional.' },
  { num: '05', title: 'Prática Supervisionada e Certificação', hours: '4h', desc: 'Simulações de sessões de mentoria com feedback especializado. Projeto final de estruturação de programa interno. Certificação internacional.' },
];

const MENTOR_BENEFITS = [
  { icon: TrendingUp, text: 'Redução de turnover entre talentos em até 40%' },
  { icon: Users, text: 'Multiplicação do impacto do RH sem aumentar headcount' },
  { icon: Shield, text: 'Cultura de colaboração e aprendizado contínuo' },
  { icon: Award, text: 'Certificação internacional reconhecida pelo mercado' },
  { icon: Globe2, text: 'Modelo replicável para toda a organização' },
  { icon: BarChart3, text: 'Métricas claras de ROI do desenvolvimento' },
];

// ── Estatísticas de impacto ──────────────────────────────────────────
const IMPACT_STATS = [
  { value: '500+', label: 'Executivos desenvolvidos', icon: Users },
  { value: '98%', label: 'das Fortune 500 usam mentoria', icon: Building2 },
  { value: '40%', label: 'mais retenção com mentoria', icon: TrendingUp },
  { value: '3.7x', label: 'ROI médio em programas de IA', icon: BarChart3 },
];

// ── Metodologia ──────────────────────────────────────────────────────
const METHODOLOGY = [
  { step: '01', icon: Target, title: 'Diagnóstico Organizacional', desc: 'Mapeamento profundo da maturidade digital, gaps de competências em IA e oportunidades de alto impacto nos primeiros 30 dias.' },
  { step: '02', icon: Lightbulb, title: 'Desenho da Solução', desc: 'Programa 100% personalizado para a cultura, setor, tamanho e objetivos estratégicos da empresa — sem soluções genéricas.' },
  { step: '03', icon: Zap, title: 'Implementação Acelerada', desc: 'Execução com times mistos (Recognise + empresa), acelerando adoção e garantindo transferência real de conhecimento.' },
  { step: '04', icon: BarChart3, title: 'Medição de Resultados', desc: 'KPIs definidos desde o início. Dashboards de acompanhamento e sessões de revisão periódica com a alta liderança.' },
];

// ── FAQ ──────────────────────────────────────────────────────────────
const FAQ = [
  { q: 'Em quanto tempo vemos resultados mensuráveis?', a: 'Para programas de imersão executiva, os primeiros resultados aparecem já nas primeiras 4 semanas, com líderes tomando decisões mais qualificadas sobre IA. Para transformação sistêmica, o marco mais significativo ocorre entre 90 e 120 dias.' },
  { q: 'Como a Recognise se diferencia de cursos online e plataformas de IA?', a: 'A diferença é radicalmente simples: Tom Queiroz é CEO de uma empresa de IA (Pareto), criador de uma plataforma proprietária (TESS AI) e já implementou IA em multinacionais. Não ensinamos teoria — compartilhamos o que funciona na prática, com responsabilidade de resultado.' },
  { q: 'É possível personalizar para diferentes níveis hierárquicos?', a: 'Sim. Desenvolvemos trilhas distintas por nível (C-Level, média gerência, times operacionais) com linguagem, profundidade e ferramentas apropriadas para cada público — sempre integradas em uma visão organizacional única.' },
  { q: 'Como funciona o programa de Formação de Mentores?', a: 'Com 16h de duração (podendo ser distribuídas em módulos), o programa certifica líderes internos como mentores especializados em IA e transformação digital. Inclui metodologia exclusiva, suporte da plataforma LMS e acompanhamento de 8 meses.' },
  { q: 'Existe um número mínimo de participantes?', a: 'Para programas in-company, recomendamos turmas de 12 a 25 participantes por cohort, garantindo qualidade na experiência e na dinâmica de grupo. Para consultoria executiva, atendemos empresas a partir de 50 colaboradores.' },
  { q: 'Como é o processo de diagnóstico inicial?', a: 'Realizamos um Diagnóstico de Maturidade em IA gratuito — um assessment online + sessão de apresentação dos resultados com a liderança de RH e CEO, em até 15 dias após o contrato.' },
];

// ── Formulário ───────────────────────────────────────────────────────
interface FormData {
  contact_name: string;
  company_name: string;
  role: string;
  email: string;
  whatsapp: string;
  company_size: string;
  interest: string;
  message: string;
}

const initialForm: FormData = {
  contact_name: '',
  company_name: '',
  role: '',
  email: '',
  whatsapp: '',
  company_size: '',
  interest: '',
  message: '',
};

const INTEREST_OPTIONS = [
  'AI-First Leadership Program',
  'Squads de IA para Negócios',
  'AI Transformation Consulting',
  'Formação de Mentores com IA',
  'Keynotes & MasterClasses',
  'AI Talent Acceleration',
  'Diagnóstico Gratuito de Maturidade',
  'Outro / Preciso de orientação',
];

const COMPANY_SIZES = [
  '1 a 50 colaboradores',
  '51 a 200 colaboradores',
  '201 a 500 colaboradores',
  '501 a 2.000 colaboradores',
  'Acima de 2.000 colaboradores',
];

// ── Componente principal ─────────────────────────────────────────────
export default function EmpresasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('empresas_leads_2026_05_02').insert({
        ...form,
        source: 'para_empresas',
      });
      if (error) throw error;
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: NAVY }}
      >
        {/* Imagem de fundo com overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.EMPRESAS_HERO_2}
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${NAVY} 35%, rgba(0,17,35,0.6) 65%, rgba(0,17,35,0.85) 100%)` }} />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 py-32 md:py-40">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ background: `rgba(122,98,7,0.18)`, color: '#c9a227', border: '1px solid rgba(122,98,7,0.35)' }}>
                <Building2 size={12} /> Geração AI First™ · Soluções Corporativas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(2.04rem, 4.25vw, 3.4rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Forme a <span style={{ color: '#c9a227' }}><GeracaoAiFirstTm /></span><br />
              na sua organização.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/65 mb-4 max-w-2xl"
              style={{ fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7 }}
            >
              Mais de 95% dos projetos de IA nas empresas falham — não por falta de tecnologia, mas por ausência de líderes e times capacitados para operá-la. A Recognise é a referência no Brasil para acelerar a formação da Geração AI First™: lideranças e times que compreendem, planejam, implementam e operam IA como vantagem competitiva real e decisiva.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-white/45 mb-10 max-w-xl"
              style={{ fontWeight: 300, fontSize: '0.95rem' }}
            >
              Liderado por Tom Queiroz — CEO da Pareto, criador da TESS AI e pioneiro em IA Generativa corporativa no Brasil desde 2021.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={() => scrollToSection('contato')}
                className="text-white font-semibold px-8 py-4 rounded-xl text-base shadow-lg transition-all hover:scale-105"
                style={{ background: COPPER, border: 'none' }}
              >
                Solicitar Diagnóstico Gratuito
              </Button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline"
                  className="border-white/25 text-white/90 hover:bg-white/10 px-8 py-4 rounded-xl text-base"
                  style={{ background: 'transparent' }}
                >
                  <FaWhatsapp size={18} className="mr-2" style={{ color: '#25D366' }} />
                  Falar com Especialista
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats flutuantes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ background: 'rgba(0,17,35,0.85)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(122,98,7,0.2)' }}
        >
          <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '95%', label: 'dos projetos de IA falham · MIT 2025', icon: BarChart3 },
              { value: '$5,5T', label: 'em perdas pelo gap de talentos · IDC', icon: TrendingUp },
              { value: '72%', label: 'empresas sem talentos em IA · ManpowerGroup', icon: Users },
              { value: '500+', label: 'Líderes AI First formados pela Recognise', icon: Award },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <s.icon size={20} style={{ color: COPPER, flexShrink: 0 }} />
                <div>
                  <div className="text-white font-black text-lg leading-none">{s.value}</div>
                  <div className="text-white/50 text-[11px] mt-0.5" style={{ fontWeight: 300 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ÍNDICE HORIZONTAL ────────────────────────────────────────── */}
      <div className="sticky top-14 md:top-16 z-40 overflow-x-auto"
        style={{ background: 'rgba(0,17,35,0.97)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(122,98,7,0.2)' }}>
        <div className="container mx-auto px-4 flex gap-1 py-1 min-w-max md:min-w-0 md:justify-center">
          {PAGE_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { scrollToSection(s.id); setActiveSection(i); }}
              className="px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all"
              style={{
                fontWeight: activeSection === i ? 600 : 300,
                color: activeSection === i ? '#c9a227' : 'rgba(255,255,255,0.6)',
                background: activeSection === i ? 'rgba(122,98,7,0.15)' : 'transparent',
                letterSpacing: '0.04em',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── O DESAFIO ────────────────────────────────────────────────── */}
      <section id="desafio" className="py-20 md:py-28" style={{ background: '#f4f5f7' }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COPPER }}>O Diagnóstico Global · Geração AI First™</p>
              <h2 className="text-primary mb-5">O gap que está custando<br />trilhões às empresas</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg" style={{ fontWeight: 300 }}>
                Os números são brutais. Mais de 95% dos projetos de IA falham antes de ir à produção (MIT, 2025). O IDC projeta US$ 5,5 trilhões em perdas globais pelo gap de talentos em IA até 2026. E o ManpowerGroup revela que 72% dos empregadores globais não encontram profissionais com habilidades em IA. A questão não é se sua empresa vai enfrentar esse problema — é se ela vai agir antes ou depois da concorrência.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { stat: '95%', text: 'dos projetos de IA Generativa em empresas falham antes de atingir produção.', source: 'MIT · 2025' },
              { stat: '$5,5T', text: 'em perdas globais projetadas pelo gap de talentos em IA até 2026.', source: 'IDC · 2026' },
              { stat: '72%', text: 'dos empregadores globais relatam dificuldade crítica em encontrar talentos em IA.', source: 'ManpowerGroup · 2026' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-border/30 hover:border-accent/30 transition-colors"
              >
                <div className="font-black mb-3" style={{ fontSize: '2.8rem', color: COPPER, lineHeight: 1 }}>{item.stat}</div>
                <p className="text-primary text-sm leading-relaxed mb-3" style={{ fontWeight: 400 }}>{item.text}</p>
                <p className="text-muted-foreground text-xs" style={{ fontWeight: 300 }}>{item.source}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-14 p-8 md:p-10 rounded-2xl max-w-4xl mx-auto"
            style={{ background: NAVY, color: 'white' }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>A resposta: Geração AI First™</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Empresas não falham em IA por falta de tecnologia.
                  <span style={{ color: '#c9a227' }}> Falham por falta de líderes da Geração AI First™.</span>
                </h3>
                <p className="text-white/60 leading-relaxed" style={{ fontWeight: 300 }}>
                  A Recognise forma a Geração AI First™ dentro da sua organização — com a experiência única de quem não apenas entende de IA, mas a constrói, opera e implementa em escala real, com casos documentados em dezenas de setores.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {['IA sem estratégia de pessoas gera desperdício', 'Treinamento genérico não cria vantagem competitiva', 'Sem mentoria, o gap de liderança aumenta', 'Com a Recognise: resultado com responsabilidade'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: i === 3 ? '#c9a227' : 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                    <span className={`text-sm ${i === 3 ? 'font-semibold text-white' : 'text-white/55'}`} style={{ fontWeight: i === 3 ? 600 : 300 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOLUÇÕES ─────────────────────────────────────────────────── */}
      <section id="solucoes" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COPPER }}>Portfólio Corporativo · Geração AI First™</p>
            <h2 className="text-primary mb-4">Soluções Modulares para<br />cada etapa da jornada <AiFirstTm /></h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              Cada empresa tem um ponto de partida diferente e um gap específico de liderança e talentos em IA. A Recognise desenvolve soluções 100% personalizadas — não pacotes genéricos, não teoria vazia. Do diagnóstico ao resultado mensurável.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SOLUTIONS.map((sol, i) => (
              <motion.div key={sol.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 hover:shadow-xl ${sol.bg} ${sol.featured ? 'ring-2' : ''}`}
                style={{
                  borderColor: sol.featured ? COPPER : 'rgba(0,0,0,0.08)',
                  outline: sol.featured ? `2px solid ${COPPER}` : 'none',
                }}
              >
                {sol.featured && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{ background: COPPER, color: 'white' }}>
                    Programa Emblemático
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 rounded-xl" style={{ background: sol.featured ? 'rgba(201,162,39,0.15)' : 'rgba(122,98,7,0.1)' }}>
                    <sol.icon size={20} style={{ color: '#c9a227' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: sol.textClass === 'text-white' ? 'rgba(255,255,255,0.4)' : COPPER }}>
                      {sol.tag}
                    </p>
                  </div>
                </div>

                <h3 className={`text-lg font-bold mb-1 ${sol.textClass}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {sol.title}
                </h3>
                <p className={`text-sm mb-4 ${sol.textClass === 'text-white' ? 'text-white/60' : 'text-muted-foreground'}`}
                  style={{ fontWeight: 300 }}>
                  {sol.subtitle}
                </p>
                <p className={`text-sm mb-5 leading-relaxed ${sol.textClass === 'text-white' ? 'text-white/50' : 'text-muted-foreground'}`}
                  style={{ fontWeight: 300 }}>
                  {sol.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {sol.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs"
                      style={{ color: sol.textClass === 'text-white' ? 'rgba(255,255,255,0.65)' : '#374151', fontWeight: 300 }}>
                      <CheckCircle size={13} style={{ color: '#c9a227', flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-5">
                  {[{ icon: Clock, label: sol.duration }, { icon: Globe2, label: sol.format }, { icon: Users, label: sol.audience }].map((tag) => (
                    <span key={tag.label} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
                      style={{
                        background: sol.textClass === 'text-white' ? 'rgba(255,255,255,0.08)' : 'rgba(0,17,35,0.06)',
                        color: sol.textClass === 'text-white' ? 'rgba(255,255,255,0.5)' : '#374151',
                        fontWeight: 300
                      }}>
                      <tag.icon size={9} />
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  {sol.link && (
                    <Link to={sol.link}>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl font-semibold text-sm"
                        style={{
                          borderColor: sol.textClass === 'text-white' ? 'rgba(255,255,255,0.25)' : COPPER,
                          color: sol.textClass === 'text-white' ? 'rgba(255,255,255,0.85)' : COPPER,
                          background: 'transparent',
                        }}
                      >
                        Saiba Mais <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={() => scrollToSection('contato')}
                    className="w-full rounded-xl font-semibold text-sm"
                    style={{
                      background: COPPER,
                      color: 'white',
                      border: 'none',
                    }}
                  >
                    Solicitar Proposta <ArrowRight size={14} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMAÇÃO DE MENTORES (DETALHADO) ─────────────────────────── */}
      <section id="formacao-mentores" className="py-20 md:py-32 relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.EMPRESAS_TEAM_2} alt="" className="w-full h-full object-cover object-center opacity-10" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY} 50%, rgba(0,17,35,0.88) 100%)` }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227', border: '1px solid rgba(122,98,7,0.3)' }}>
                <Brain size={12} /> Programa Emblemático
              </span>
              <h2 className="text-white mb-4">Formação de Mentores Corporativos<br />
                <span style={{ color: '#c9a227' }}>com Foco em Transformação com IA</span>
              </h2>
              <p className="text-white/55 max-w-2xl mx-auto leading-relaxed" style={{ fontWeight: 300, fontSize: '1.05rem' }}>
                Inspirado nas melhores práticas internacionais de mentoring organizacional, este programa cria multiplicadores internos — líderes que desenvolvem outros líderes, alavancando a transformação com IA de dentro para fora.
              </p>
            </motion.div>

            {/* Citação de impacto */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="rounded-2xl p-8 mb-14 text-center"
              style={{ background: 'rgba(122,98,7,0.1)', border: '1px solid rgba(122,98,7,0.25)' }}>
              <p className="text-white text-xl md:text-2xl font-light italic mb-3">
                "98% das empresas listadas na Fortune 500 possuem programas de mentoring.
                <span style={{ color: '#c9a227' }}> As que não possuem, ainda não entenderam por quê estão ficando para trás."</span>
              </p>
              <p className="text-white/40 text-xs" style={{ fontWeight: 300 }}>Mentoring Impact Report 2024 — MentorCliQ</p>
            </motion.div>

            {/* Benefícios */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              {MENTOR_BENEFITS.map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <b.icon size={18} style={{ color: '#c9a227', flexShrink: 0 }} />
                  <p className="text-white/70 text-sm leading-snug" style={{ fontWeight: 300 }}>{b.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Módulos */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-14">
              <h3 className="text-white text-xl font-bold mb-8 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Grade Programática — 16 horas de formação prática
              </h3>
              <div className="space-y-4">
                {MENTOR_MODULES.map((mod, i) => (
                  <motion.div key={mod.num}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-5 p-5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="text-2xl font-black flex-shrink-0 w-10" style={{ color: COPPER, fontFamily: 'Montserrat, sans-serif' }}>
                      {mod.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm">{mod.title}</h4>
                        <span className="text-xs flex-shrink-0 px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(122,98,7,0.2)', color: '#c9a227', fontWeight: 600 }}>
                          {mod.hours}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{mod.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Formação */}
            <div className="text-center">
              <Button
                onClick={() => scrollToSection('contato')}
                className="text-white font-bold px-10 py-4 rounded-xl text-base shadow-lg hover:scale-105 transition-transform"
                style={{ background: COPPER, border: 'none' }}
              >
                Quero formar mentores na minha empresa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── METODOLOGIA ──────────────────────────────────────────────── */}
      <section id="metodologia" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COPPER }}>Como funciona</p>
            <h2 className="text-primary mb-4">Nossa Metodologia</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontWeight: 300 }}>
              Do diagnóstico ao resultado — um processo estruturado, sem improvisação.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {METHODOLOGY.map((m, i) => (
              <motion.div key={m.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-border/30 hover:border-accent/30 transition-colors bg-white shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(122,98,7,0.1)' }}>
                  <m.icon size={22} style={{ color: COPPER }} />
                </div>
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: COPPER }}>{m.step}</div>
                <h4 className="text-primary font-bold text-sm mb-2">{m.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Diferencial Tom Queiroz */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl"
            style={{ border: `1px solid rgba(122,98,7,0.2)` }}
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10" style={{ background: NAVY }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#c9a227' }}>Por que a Recognise</p>
                <h3 className="text-white text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Você aprende com quem faz — não com quem fala sobre fazer.
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                  Tom Queiroz é o CEO que constrói IA (Pareto + TESS AI), o executivo que implementou estratégia em Sony, Shell e Rakuten, e o mentor que já acompanhou 500+ líderes. Ninguém no Brasil une essas três dimensões na mesma pessoa.
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#c9a227' }}>
                  Falar com Tom Queiroz <ArrowRight size={14} />
                </a>
              </div>
              <div className="relative min-h-[220px]">
                <img src={IMAGES.EMPRESAS_DIGITAL_3} alt="Tom Queiroz keynote"
                  className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,17,35,0.35)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white text-xs" style={{ fontWeight: 300 }}>
                    <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0A66C2' }}>
                        <FaLinkedinIn size={14} color="white" />
                      </div>
                      <span>Tom Queiroz no LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RESULTADOS / CTA CENTRAL ─────────────────────────────────── */}
      <section id="resultados" className="py-20 md:py-28" style={{ background: '#f4f5f7' }}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COPPER }}>Resultados Esperados</p>
            <h2 className="text-primary mb-4">O que sua empresa ganha</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">
            {[
              { icon: Cpu, title: 'Times que operam com IA', desc: 'Colaboradores capazes de integrar IA Generativa aos processos com autonomia e resultado — não apenas experimentar ferramentas.' },
              { icon: TrendingUp, title: 'Liderança que decide com IA', desc: 'Executivos que entendem as implicações estratégicas da IA, sabem priorizar investimentos e lideram com confiança.' },
              { icon: Users, title: 'Cultura de desenvolvimento contínuo', desc: 'Um ecossistema interno de mentoria e aprendizado que se auto-sustenta — com líderes que desenvolvem outros líderes.' },
              { icon: Shield, title: 'Governança de IA robusta', desc: 'Políticas claras, comitês ativos e processos auditáveis para uso responsável e estratégico da IA na organização.' },
              { icon: BarChart3, title: 'ROI mensurável e previsível', desc: 'KPIs definidos antes do início, revisados periodicamente e entregues com transparência. Sem promessas vazias.' },
              { icon: Globe2, title: 'Vantagem competitiva sustentável', desc: 'A diferença entre empresas que dominam a Era da IA e as que foram dominadas por ela. A escolha acontece agora.' },
            ].map((r, i) => (
              <motion.div key={r.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border/30 hover:border-accent/30 transition-colors"
              >
                <r.icon size={22} style={{ color: COPPER, marginBottom: 12 }} />
                <h4 className="text-primary font-bold text-sm mb-2">{r.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontWeight: 300 }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center rounded-2xl p-10 shadow-xl"
            style={{ background: NAVY }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>Diagnóstico Gratuito</p>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Saiba em 30 dias exatamente onde<br />sua empresa está e onde precisa chegar.
            </h3>
            <p className="text-white/50 mb-8" style={{ fontWeight: 300 }}>
              Uma sessão de diagnóstico de Maturidade em IA — gratuita, sem compromisso — com a equipe da Recognise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => scrollToSection('contato')}
                className="text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-transform"
                style={{ background: COPPER, border: 'none' }}>
                Solicitar Diagnóstico Gratuito
              </Button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline"
                  className="border-white/20 text-white/80 hover:bg-white/10 px-8 py-3.5 rounded-xl"
                  style={{ background: 'transparent' }}>
                  <FaWhatsapp size={16} className="mr-2" style={{ color: '#25D366' }} />
                  WhatsApp direto
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: COPPER }}>Dúvidas Frequentes</p>
            <h2 className="text-primary">Perguntas das empresas</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-border/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-primary font-medium text-sm hover:bg-accent/5 transition-colors"
                >
                  <span style={{ fontWeight: 500 }}>{item.q}</span>
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 ml-3 transition-transform"
                    style={{ color: COPPER, transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO DE CONTATO ─────────────────────────────────────── */}
      <section id="contato" className="py-20 md:py-32 relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.EMPRESAS_HERO_4} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${NAVY} 0%, rgba(0,17,35,0.92) 100%)` }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            {/* Lado esquerdo */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c9a227' }}>Fale Conosco</p>
              <h2 className="text-white mb-5">Comece com um<br />diagnóstico gratuito.</h2>
              <p className="text-white/55 mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                Preencha o formulário e um especialista da Recognise entrará em contato em até 24 horas para entender os desafios da sua empresa e apresentar as melhores soluções.
              </p>

              <div className="space-y-5">
                {[
                  { icon: CheckCircle, text: 'Diagnóstico de Maturidade em IA — gratuito' },
                  { icon: CheckCircle, text: 'Proposta customizada para o seu setor' },
                  { icon: CheckCircle, text: 'Sem compromisso na primeira conversa' },
                  { icon: CheckCircle, text: 'Atendimento direto com especialista sênior' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon size={16} style={{ color: '#c9a227', flexShrink: 0 }} />
                    <span className="text-white/65 text-sm" style={{ fontWeight: 300 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-4">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#25D366', fontWeight: 400 }}>
                  <FaWhatsapp size={20} />
                  +55 11 91551-3210
                </a>
                <span className="text-white/20">|</span>
                <a href="mailto:tom@midia-digital.com"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
                  tom@midia-digital.com
                </a>
              </div>
            </motion.div>

            {/* Formulário */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div ref={formRef} className="rounded-2xl p-7 md:p-8"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                {success ? (
                  <div className="text-center py-10">
                    <CheckCircle size={44} className="mx-auto mb-4" style={{ color: '#c9a227' }} />
                    <h3 className="text-white text-xl font-bold mb-2">Mensagem enviada!</h3>
                    <p className="text-white/55 text-sm" style={{ fontWeight: 300 }}>
                      Nossa equipe entrará em contato em até 24 horas.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-white/60 mb-1">Seu Nome *</label>
                        <input required name="contact_name" value={form.contact_name} onChange={handleChange}
                          placeholder="Nome completo"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 transition"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }} />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-white/60 mb-1">Empresa *</label>
                        <input required name="company_name" value={form.company_name} onChange={handleChange}
                          placeholder="Nome da empresa"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 transition"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1">Cargo / Função</label>
                      <input name="role" value={form.role} onChange={handleChange}
                        placeholder="CEO, Diretor de RH, CMO..."
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1">E-mail *</label>
                        <input required type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="email@empresa.com"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1">WhatsApp</label>
                        <input name="whatsapp" value={form.whatsapp} onChange={handleChange}
                          placeholder="+55 11 9..."
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1">Tamanho da empresa</label>
                      <select name="company_size" value={form.company_size} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition"
                        style={{ background: '#0a1e35', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }}>
                        <option value="">Selecione...</option>
                        {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1">Principal interesse</label>
                      <select name="interest" value={form.interest} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition"
                        style={{ background: '#0a1e35', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }}>
                        <option value="">Selecione a solução...</option>
                        {INTEREST_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1">Contexto / Desafio</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        rows={3} placeholder="Descreva brevemente o principal desafio ou objetivo que sua empresa enfrenta..."
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none resize-none transition"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 300 }} />
                    </div>

                    <Button type="submit" disabled={loading}
                      className="w-full text-white font-bold py-4 rounded-xl text-sm shadow-lg hover:scale-[1.02] transition-transform"
                      style={{ background: COPPER, border: 'none' }}>
                      {loading ? 'Enviando...' : 'Solicitar Diagnóstico Gratuito'}
                    </Button>

                    <p className="text-white/25 text-[10px] text-center" style={{ fontWeight: 300 }}>
                      Ao enviar, você concorda com nossa{' '}
                      <Link to="/privacidade" className="underline hover:text-white/50 transition-colors">Política de Privacidade</Link>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
