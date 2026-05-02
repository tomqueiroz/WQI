import { useState, useRef, useEffect } from 'react';
import { AiFirstTm, GeracaoAiFirstTm } from '@/components/AiFirstTm';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Brain,
  Rocket,
  Award,
  MessageCircle,
  Stethoscope,
  X,
  GraduationCap,
  Globe,
  Zap,
  TrendingUp,
  Search,
  Lock,
  Calendar,
  Star,
} from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IMAGES } from '@/assets/images';
import { LMS_ROUTES } from '@/lib/index';
import { PRODUCTS_DATA } from '@/lib/products';
import { Layout } from '@/components/Layout';
import { LogoMarquee } from '@/components/LogoMarquee';
import { useTestimonials, useSubmitLead } from '@/hooks/useSupabaseData';
import { useFeaturedPosts } from '@/hooks/useBlog';
import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi.';

const FAQ_ITEMS = [
  {
    question: 'O que é a Geração AI First™ e por que isso importa?',
    answer:
      'A Geração AI First™ é o mote exclusivo da W-Qi que define um novo padrão de liderança para a era da inteligência artificial. Ser AI First não significa usar ferramentas de IA — significa desenvolver a habilidade estratégica de compreender, planejar, implementar e operar com IA como fator competitivo decisivo. Segundo o IDC, 90%+ das empresas enfrentarão escassez crítica de habilidades em IA até 2026. A Geração AI First™ é a resposta estruturada a esse gap.',
  },
  {
    question: 'Por que 95% dos projetos de IA falham nas empresas?',
    answer:
      'Segundo MIT (2025) e RAND Corporation, mais de 80-95% dos projetos de IA falham antes de ir à produção. A causa principal não é a tecnologia — é a ausência de lideranças que saibam o que pedir à IA, como estruturar iniciativas com âncora estratégica e como gerar adoção real nos times. É exatamente esse gap que a W-Qi foi criada para resolver.',
  },
  {
    question: 'Para quem são os programas W-Qi?',
    answer:
      'Para executivos C-Suite, diretores, VPs, gerentes sênior, fundadores e líderes corporativos que precisam desenvolver ou expandir sua capacidade de operar com IA no contexto estratégico dos seus negócios. Também para empresas que precisam formar times e lideranças preparadas para a nova era competitiva.',
  },
  {
    question: 'Quais são as soluções disponíveis?',
    answer:
      'Mentoria 1:1 (executivos sênior, 100% personalizada), Cohort Executivo (8-12 líderes por 6 meses), In-Company (transformação de times e organizações), MasterClass (imersão intensiva de 8h), Keynotes inspiracionais e Cursos Digitais sob demanda. Todos modulares e customizáveis para a realidade de cada contexto.',
  },
  {
    question: 'Quais resultados posso esperar?',
    answer:
      'Os programas definem KPIs específicos antes de começar. Cases documentados incluem: redução de 35% em CPA, 3x em leads qualificados, ROI de 10x em iniciativas com IA, +40% em clareza estratégica após 90 dias, e formação de times operando com IA em produção — não apenas em pilotos.',
  },
  {
    question: 'Os programas são personalizados?',
    answer:
      'Sim, 100%. Não existem modelos genéricos na W-Qi. Cada programa começa com um diagnóstico estratégico completo — de maturidade em IA, gaps de liderança e objetivos de negócio — e a proposta é construída a partir dessa realidade. Por isso não exibimos preços públicos.',
  },
  {
    question: 'Tom Queiroz tem experiência no meu setor?',
    answer:
      'Tom foi ex-executivo em Sony, Honda, Rakuten e Shell — cobrindo tecnologia, automotivo, e-commerce e energia. Como CEO e CAIO da Pareto (pareto.io) e criador da plataforma TESS AI (tess.im), trabalha com IA Generativa aplicada a negócios desde 2021. Como mentor e Professor FGV EAESP, atendeu executivos de 8 países e dezenas de setores.',
  },
  {
    question: 'Como posso começar?',
    answer:
      'Clique em Falar com Especialista em qualquer seção do site ou use o formulário de contato. Retornamos em até 24h úteis para agendar uma conversa estratégica sem compromisso — onde entendemos sua realidade antes de propor qualquer solução.',
  },
];

const MENTORIA_STEPS = [
  {
    icon: Brain,
    title: 'Diagnóstico Estratégico',
    description:
      'Análise completa da maturidade de IA na sua organização e identificação de oportunidades de alto impacto.',
  },
  {
    icon: Rocket,
    title: 'Plano de Habilidades AI First™',
    description:
      'Mapa personalizado de gaps e competências — do contexto atual à capacidade de operar IA com autonomia e impacto estratégico.',
  },
  {
    icon: Target,
    title: 'Desenvolvimento e Aplicação',
    description:
      'Desenvolvimento das habilidades com cases reais, ferramentas aplicadas e projetos práticos ancorados nos OKRs de negócio.',
  },
  {
    icon: Award,
    title: 'Liderança AI First Consolidada',
    description:
      'Resultados mensuráveis, mudança cultural documentada e o executivo ou time operando IA em produção — não apenas em pilotos.',
  },
];

// ─── Fictional testimonials for the slider ───
const SLIDER_TESTIMONIALS = [
  { id: 's1', name: 'Rodrigo Mendes', role: 'CMO', company: 'Grupo Saraiva', avatar: 'RM', content: 'Em 90 dias meu time passou de pilotos sem resultado para IA em produção — com KPIs mensuráveis desde a semana 1. A metodologia Geração AI First™ é o que diferencia a W-Qi de tudo que vi no mercado.' },
  { id: 's2', name: 'Cláudia Ferreira', role: 'VP de Estratégia', company: 'BTG Pactual', avatar: 'CF', content: 'Eramos o clichê: muito investimento em IA, resultados perto de zero. Tom Queiroz identificou o problema em menos de uma sessão: faltava liderança AI First. Em 60 dias a história mudou.' },
  { id: 's3', name: 'André Nakamura', role: 'Head of Innovation', company: 'iFood', avatar: 'AN', content: 'O Cohort Executivo foi a decisão mais estratégica do meu ano. Além de frameworks práticos de IA aplicada, o peer learning com outros C-levels foi transformador para a minha visão.' },
  { id: 's4', name: 'Bianca Torres', role: 'Diretora de Transformação Digital', company: 'Ambev', avatar: 'BT', content: 'Nossa iniciativa de IA havia fracassado duas vezes por falta de liderança qualificada. Com a formação da W-Qi, construímos o comitê interno de IA e entregamos resultado no Q3.' },
  { id: 's5', name: 'Felipe Carvalho', role: 'CEO', company: 'Scale-Up BR', avatar: 'FC', content: 'A MasterClass AI-First foi investimento com ROI imediato. No dia seguinte já implementei dois frameworks no nosso processo de decisão. Execução real, sem teoria vazia.' },
  { id: 's6', name: 'Mariana Souza', role: 'CDO', company: 'Grupo Fleury', avatar: 'MS', content: 'Tom tem algo raro: experiência real de C-suite somada a profundidade técnica em IA Generativa. Ele não fala de IA — ele fez IA acontecer em grandes organizações. A mentoria 1:1 me deu essa clareza.' },
  { id: 's7', name: 'Lucas Prado', role: 'VP de Inovação', company: 'Embraer', avatar: 'LP', content: 'Participamos do programa In-Company com 20 líderes. O nível de personalização foi surpreendente. Saímos com um roadmap de IA construído internamente — com competência e autonomia.' },
  { id: 's8', name: 'Tatiana Vieira', role: 'Chief Marketing Officer', company: 'Magazine Luiza', avatar: 'TV', content: 'A Geração AI First™ não é slogan — é uma transformação real de mindset e habilidade. Seis meses depois do Cohort, minha equipe lidera a agenda de IA na empresa. Esse é o resultado que importa.' },
];

// ─── Marquee vertical hero: 7 colunas com logos descendo continuamente ───
// Cada coluna tem velocidade diferente para efeito orgânico
const VERTICAL_MARQUEE_COLS: Array<{ keys: string[]; speed: number; left: string; width: string }> = [
  {
    keys: ['ANIMA_19', 'GPA_17', 'ITAU_14', 'SPOTIFY_30', 'NVIDIA_28', 'REMAX_31', 'IBM_37'],
    speed: 28, left: '1%', width: '11%',
  },
  {
    keys: ['CEA_18', 'HERING_15', 'IMG_2_51', 'COINBASE_26', 'MULTIP_32', 'WMC_29'],
    speed: 38, left: '15%', width: '11%',
  },
  {
    keys: ['GREENP_16', 'IMG_3_56', 'IMG_7_40', 'PEPSI_24', 'SAMS_22', 'IMG_11_55', 'COBASI_38'],
    speed: 22, left: '29%', width: '11%',
  },
  {
    keys: ['IMG_4_45', 'IMG_8_39', 'IMG_14_47', 'SHOPIFY_34', 'PUBLI_23', 'UNIVERSAL_20'],
    speed: 34, left: '43%', width: '11%',
  },
  {
    keys: ['FLAM_33', 'IMG_9_37', 'IMG_15_52', 'NIVEA_36', 'SG_27', 'IMG_20_46', 'PETZ_39'],
    speed: 26, left: '57%', width: '11%',
  },
  {
    keys: ['IMG_5_44', 'IMG_10_38', 'IMG_16_49', 'MCD_13', 'STONE_21', 'IMG_21_41'],
    speed: 42, left: '71%', width: '11%',
  },
  {
    keys: ['EPIC_25', 'IMG_6_43', 'IMG_13_53', 'SALTA_35', 'IMG_17_50', 'IMG_18_48'],
    speed: 32, left: '85%', width: '11%',
  },
];

export default function Home() {
  const quoteRef1 = useRef<HTMLDivElement>(null);
  const quoteRef2 = useRef<HTMLDivElement>(null);
  const quoteRef3 = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { testimonials: dbTestimonials } = useTestimonials();
  const { submitLead, loading: submitLoading, success, error } = useSubmitLead();
  const { data: featuredPosts } = useFeaturedPosts();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    message: '',
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [diagOpen, setDiagOpen] = useState(false);

  // Auto-scroll testimonial slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animId: number;
    let pos = 0;
    const speed = 0.55;
    const step = () => {
      pos += speed;
      const half = slider.scrollWidth / 2;
      if (pos >= half) pos = 0;
      slider.scrollLeft = pos;
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);
    return () => {
      cancelAnimationFrame(animId);
      slider.removeEventListener('mouseenter', pause);
      slider.removeEventListener('mouseleave', resume);
    };
  }, []);

  // ── Scroll-top indicator ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Parallax: rAF loop permanente — garante efeito sempre ativo ─────
  useEffect(() => {
    let rafId: number;
    const refs = [quoteRef1, quoteRef2, quoteRef3];

    const loop = () => {
      refs.forEach((ref) => {
        if (!ref.current) return;
        const img = ref.current.querySelector('.parallax-img') as HTMLElement | null;
        if (!img) return;
        const rect = ref.current.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `translate3d(0, ${centerOffset * 0.18}px, 0)`;
      });
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLead({
      full_name: contactForm.name,
      email: contactForm.email,
      whatsapp: contactForm.whatsapp,
      company: contactForm.company,
      message: contactForm.message,
    });
  };

  // Normalize testimonials - Supabase uses author_name, static data uses name
  const normalizeTestimonial = (t: Record<string, unknown>) => ({
    id: t.id,
    name: (t.name || t.author_name || 'Anônimo') as string,
    role: (t.role || t.author_role || '') as string,
    company: (t.company || t.author_company || '') as string,
    content: (t.content || t.text || t.testimonial_text || '') as string,
    rating: (t.rating || 5) as number,
  });

  const testimonials = (dbTestimonials.length > 0
    ? dbTestimonials.map(normalizeTestimonial)
    : [
        {
          id: '1',
          name: 'Ana Lima',
          role: 'CMO',
          company: 'TechCorp',
          content: 'A mentoria transformou minha visão de marketing digital. Resultados em 60 dias.',
          rating: 5,
        },
        {
          id: '2',
          name: 'Carlos Matos',
          role: 'Diretor de Inovação',
          company: 'FinBank',
          content: 'O framework de AI-First mudou completamente nossa abordagem. ROI incrível.',
          rating: 5,
        },
        {
          id: '3',
          name: 'Fernanda Costa',
          role: 'VP de Growth',
          company: 'Ecommerce S.A.',
          content: 'Reduzimos o CPA em 35% e triplicamos os leads qualificados em 90 dias.',
          rating: 5,
        },
      ].map(normalizeTestimonial));

  return (
    <Layout>
      {/* ============ HERO ============ */}
      <section id="hero" className="min-h-screen relative overflow-hidden flex flex-col">
        {/* fundo azul escuro sólido enquanto o vídeo carrega */}
        <div className="absolute inset-0 z-0" style={{ background: '#001123' }} />

        {/* === VIDEO BG (loop, muted, lazy) === */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1, opacity: 0.45 }}
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay escuro — sobre o vídeo, mais leve no lado direito para logos ficarem visíveis */}
        <div className="absolute inset-0" style={{ zIndex: 2, background: 'linear-gradient(to right, rgba(0,17,35,0.93) 0%, rgba(0,17,35,0.80) 42%, rgba(0,17,35,0.55) 70%, rgba(0,17,35,0.40) 100%)' }} />

        {/* === VERTICAL MARQUEE LOGO COLUMNS — descendo continuamente ===
             7 colunas com velocidades distintas, usando CSS animation pura */}
        <style>{`
          @keyframes hero-scroll-down {
            0%   { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .hero-vmq-track {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 48px;
            animation: hero-scroll-down linear infinite;
            will-change: transform;
          }
        `}</style>
        <div className="absolute inset-0 pointer-events-none select-none hidden md:flex" style={{ zIndex: 3, overflow: 'hidden' }}>
          {VERTICAL_MARQUEE_COLS.map((col, ci) => (
            <div
              key={ci}
              className="absolute top-0 bottom-0"
              style={{ left: col.left, width: col.width, overflow: 'hidden' }}
            >
              {/* track duplicado para loop infinito contínuo */}
              <div
                className="hero-vmq-track"
                style={{
                  animationDuration: `${col.speed}s`,
                  /* offset de início diferente por coluna para não sincronizar */
                  animationDelay: `${-(col.speed * (ci * 0.13)) % col.speed}s`,
                  paddingTop: '16px',
                }}
              >
                {/* logos originais + duplicados para loop seamless */}
                {[...col.keys, ...col.keys].map((key, li) => (
                  <div key={`${key}-${li}`} style={{ opacity: 0.28, flexShrink: 0 }}>
                    <img
                      src={(IMAGES as Record<string, string>)[key]}
                      alt=""
                      style={{
                        width: '120px',
                        height: 'auto',
                        maxHeight: '52px',
                        objectFit: 'contain',
                        filter: 'brightness(10) saturate(0)',
                        mixBlendMode: 'screen',
                      }}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Content — z-index 4, acima dos logos */}
        <div className="relative container mx-auto px-4 flex flex-1 items-center" style={{ zIndex: 4, paddingTop: '80px', paddingBottom: '40px' }}>
          {/* 2-column layout: copy left (5/12) + photo right (7/12) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* ── LEFT COLUMN — Copy + CTAs + Stats (5 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 text-center lg:text-left"
            >
              <span className="inline-flex items-center gap-2 text-accent bg-accent/10 border border-accent/20 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                Geração AI First™ · W-Qi Development
              </span>

              <h1
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.7rem, 3.83vw, 2.975rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'white',
                  marginBottom: '1rem',
                }}
              >
                Desenvolva uma Liderança{' '}
                <span style={{ color: 'var(--color-accent)' }}>AI First<sup style={{ fontSize: '0.5em', fontWeight: 700, verticalAlign: 'super', lineHeight: 0 }}>™</sup></span>{' '}que o Mercado vai Seguir
              </h1>

              <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0" style={{ fontWeight: 300 }}>
                Mais de 95% dos projetos de IA nas empresas falham — não por falta de tecnologia, mas por falta de líderes preparados. A W-Qi forma a <strong style={{ color: '#c9a227', fontWeight: 600 }}>Geração AI First™</strong>: executivos e times que compreendem, implementam e operam IA como vantagem competitiva real.
              </p>

              <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                <Link to={LMS_ROUTES.PROGRAMAS}>
                  <Button className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-full h-auto text-sm">
                    Explorar Programas
                  </Button>
                </Link>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-2.5 rounded-full h-auto bg-transparent text-sm">
                    <FaWhatsapp className="mr-2" /> Falar com Especialista
                  </Button>
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: '95%', label: 'projetos de IA falham · MIT 2025' },
                  { value: '$5,5T', label: 'perdidos no gap · IDC' },
                  { value: '500+', label: 'Líderes AI First formados' },
                  { value: '72%', label: 'sem talento em IA · ManpowerGroup' },
                ].map((s) => (
                  <div key={s.value} className="border border-white/10 rounded-xl p-3 text-center bg-white/5 backdrop-blur-sm">
                    <div className="text-xl font-black text-accent">{s.value}</div>
                    <div className="text-white/55 text-xs mt-0.5" style={{ fontWeight: 300 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Scroll indicator */}
              <div className="flex items-center gap-1.5 mt-8 justify-center lg:justify-start">
                <span className="text-white/40 text-xs">Role para baixo</span>
                <ChevronDown className="text-accent animate-bounce" size={16} />
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN — Foto horizontal (7 cols) ── */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl ring-2 ring-accent/25" style={{ maxHeight: '520px' }}>
                <img
                  src={IMAGES.TOM_HERO_PORTRAIT}
                  alt="Wellington Queiroz — Palestrante"
                  className="w-full object-cover object-top"
                  style={{ height: '520px', objectFit: 'cover' }}
                  loading="eager"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============ DEVELOPMENT & GROWTH — frase tipográfica ============ */}
      <div
        aria-hidden
        className="relative overflow-hidden py-10 md:py-14 bg-background select-none"
        style={{ borderTop: '1px solid rgba(0,17,35,0.06)', borderBottom: '1px solid rgba(0,17,35,0.06)' }}
      >
        {/* Watermark gigante — Roboto Thin, quase invisível */}
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 100,
            fontSize: 'clamp(4rem, 13vw, 11rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'rgba(0,17,35,0.07)',
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          DEVELOPMENT &amp; GROWTH
        </p>
        {/* Frase legível em cobre, 50% opaca */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 100,
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
              letterSpacing: '0.18em',
              color: '#7a6207',
              opacity: 0.55,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Development
          </p>
          <span style={{ fontSize: 'clamp(1.2rem,2vw,2rem)', color: 'rgba(122,98,7,0.3)', fontWeight: 100, letterSpacing:'0.3em' }}>
            &amp;
          </span>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
              letterSpacing: '0.18em',
              color: '#7a6207',
              opacity: 0.55,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Growth
          </p>
        </div>
      </div>

      {/* ============ O GRANDE DESAFIO — KEY PAIN POINTS ============ */}
      <section className="py-20 md:py-28 bg-[#001123]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">O Diagnóstico Global</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">O Gap que está Custando Trilhões às Empresas</h2>
            <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
              Os números são brutais — e a maioria das organizações ainda não percebeu o tamanho do problema que está construindo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { stat: '95%', label: 'dos projetos de IA Generativa em empresas falham antes de ir à produção', source: 'MIT · 2025' },
              { stat: '$5,5T', label: 'em perdas globais projetadas pelo gap de talentos em IA até 2026', source: 'IDC' },
              { stat: '72%', label: 'dos empregadores globais relatam dificuldade crítica em encontrar talentos em IA', source: 'ManpowerGroup 2026' },
              { stat: '90%+', label: 'das empresas globais enfrentarão escassez crítica de habilidades em IA este ano', source: 'IDC · 2026' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-black" style={{ color: '#c9a227' }}>{item.stat}</div>
                <p className="text-white/70 text-sm mt-2 leading-relaxed" style={{ fontWeight: 300 }}>{item.label}</p>
                <p className="text-white/30 text-xs mt-3 font-semibold tracking-wider">{item.source}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">Os 5 Grandes Key Pain Points das Corporações</h3>
              <div className="space-y-4">
                {[
                  { n: '01', title: 'Líderes que não sabem o que pedir à IA', desc: 'C-suites aprovam investimentos em IA sem ter clareza sobre casos de uso, KPIs ou governança — resultando em projetos sem tração.' },
                  { n: '02', title: 'Times operacionais sem reskilling estruturado', desc: 'Ferramentas chegam antes da capacitação. O resultado: adoção superficial, resistência cultural e ROI próximo de zero.' },
                  { n: '03', title: 'Iniciativas de IA sem âncora estratégica', desc: 'IA implementada como projeto de TI, não como alavanca de negócio — desconectada dos OKRs que importam.' },
                  { n: '04', title: 'Ausência de lideranças que traduzem IA em resultado', desc: 'O gap não é tecnológico — é de liderança. Faltam executivos que entendam IA o suficiente para tomar as decisões certas.' },
                  { n: '05', title: 'Velocidade da mudança vs. capacidade de adaptação', desc: 'O ciclo de inovação em IA é medido em semanas. As estruturas corporativas de aprendizado, em anos. A distância cresce.' },
                ].map((kpp) => (
                  <div key={kpp.n} className="flex gap-4">
                    <span className="text-accent font-black text-lg flex-shrink-0 w-8">{kpp.n}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{kpp.title}</p>
                      <p className="text-white/50 text-xs mt-1 leading-relaxed" style={{ fontWeight: 300 }}>{kpp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-white/5 border border-accent/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain size={24} style={{ color: '#c9a227' }} />
                <h3 className="text-white font-bold text-lg">A Resposta: <GeracaoAiFirstTm /></h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                O mote exclusivo da W-Qi que define um novo padrão de liderança e operação para a era que está começando. <strong style={{ color: '#c9a227' }}>Geração AI First™</strong> não é sobre aprender a usar ferramentas — é sobre desenvolver a habilidade de compreender, planejar, implementar e operar com IA como fator competitivo decisivo.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Compreender o potencial transformador da IA em cada área do negócio',
                  'Planejar iniciativas com âncora estratégica e KPIs claros desde o início',
                  'Implementar com governança, metodologia e foco em adoção real',
                  'Operar com IA integrada ao dia a dia — não como projeto isolado',
                  'Liderar equipes através da mudança cultural que a IA exige',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle size={15} style={{ color: '#c9a227', flexShrink: 0, marginTop: 2 }} />
                    <p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5511915513210?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Gera%C3%A7%C3%A3o%20AI%20First%20W-Qi." target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-3 h-auto font-semibold text-sm w-full">
                  <Zap size={15} className="mr-2" /> Quero Fazer Parte da Geração AI First™
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ QUOTE PARALLAX 1 ============ */}
      <section ref={quoteRef1} className="min-h-[45vh] relative overflow-hidden flex items-center">
        {/* IMG real — translate3d move a imagem de verdade */}
        <img
          src={IMAGES.PARALLAX_AI_PRESENTATION}
          alt=""
          aria-hidden
          className="parallax-img absolute left-0 w-full object-cover pointer-events-none will-change-transform"
          style={{ top: '-15%', height: '130%', zIndex: 0 }}
        />
        <div className="absolute inset-0 z-10 bg-primary/80" />
        <div className="relative z-20 w-full flex items-center justify-center px-4 py-16">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-black text-2xl md:text-4xl text-white text-center italic max-w-3xl leading-snug"
          >
            "95% dos projetos de IA falham. O problema nunca foi a tecnologia — foi a ausência de líderes da Geração AI First™ capazes de operá-la."
            <cite className="block text-accent text-base font-semibold not-italic mt-4">— Tom Queiroz · CEO Pareto · CAIO · IBM Watson Alumni</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ============ SOBRE ============ */}
      <section id="sobre" className="py-20 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image — comes second on mobile, first on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.TOM_SOBRE}
                  alt="Wellington Queiroz palestrando"
                  className="w-full h-[380px] md:h-[540px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <blockquote className="absolute bottom-5 left-5 right-5 text-white/90 text-sm font-light italic border-l-2 border-accent pl-3">
                  "Não ensino o que li. Ensino o que executei — em salas de conselho, em campanhas de 9 dígitos."
                </blockquote>
              </div>
              <div className="absolute -top-3 -right-3 bg-accent text-white rounded-xl px-4 py-3 shadow-xl text-center hidden md:block">
                <div className="text-2xl font-black leading-none">500+</div>
                <div className="text-[10px] font-light mt-0.5 leading-tight">Executivos<br/>mentoreados</div>
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="order-1 lg:order-2"
            >
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">O Arquiteto da Sua Virada</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary mb-2">Wellington Queiroz</h2>
              <p className="text-accent text-sm font-medium mb-6">CEO Pareto · CAIO · FGV EAESP · 20 anos de execução global</p>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>Há uma distinção silenciosa que os executivos de alto nível reconhecem rapidamente: <strong className="text-primary">quem sabe falar sobre estratégia digital — e quem já precisou entregar resultado com ela</strong>. Wellington pertence à segunda categoria, sem nenhuma concessão.</p>
                <p>Ex-executivo em <strong className="text-primary">Sony, Honda, Rakuten e Shell</strong>, responsável por operações de marketing que movimentaram centenas de milhões em mercados altamente competitivos, ele sabe exatamente onde um executivo erra — e como corrigir com precisão cirúrgica.</p>
                <p>Pioneiro em IA Generativa no Brasil, Tom trabalhou com <strong className="text-primary">IBM Watson desde 2021</strong> — antes mesmo do boom global de 2023. Hoje é <strong className="text-primary">CEO e CAIO da <a href="https://pareto.io" target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 hover:decoration-accent transition-colors">Pareto</a></strong>, startup brasileira referência em IA Generativa para empresas com operações no Brasil e no Vale do Silício, criadora da plataforma proprietária <strong className="text-primary"><a href="https://tess.im" target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 hover:decoration-accent transition-colors">TESS AI</a></strong>.</p>
                <p>Entre uma rotina executiva, docente e criativa, Tom Queiroz reserva um tempo especialmente para atuar como <strong className="text-primary">mentor e conselheiro</strong> — acreditando no potencial inovador da troca de experiências nesses projetos.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-7 mb-7">
                {[
                  { Icon: GraduationCap, label: 'FGV EAESP', sub: 'Professor Convidado' },
                  { Icon: Globe,         label: '8 Países',  sub: 'Mentorados Ativos' },
                  { Icon: Zap,           label: 'AI-First™', sub: 'Metodologia Proprietária' },
                  { Icon: TrendingUp,    label: 'ROI 10x',   sub: 'Média em Projetos Reais' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3 bg-muted/40 rounded-xl p-3">
                    <c.Icon size={18} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div className="text-primary font-bold text-sm">{c.label}</div>
                      <div className="text-muted-foreground text-xs">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-3 h-auto font-semibold text-sm">
                    <MessageCircle className="mr-2" size={15} /> Agendar Conversa Estratégica
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/20 hover:border-accent hover:text-accent text-primary rounded-full px-5 py-3 text-sm font-medium transition-colors">
                  <FaLinkedinIn size={15} /> Ver no LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FAIXAS DE LOGOS CLIENTES ============ */}
      <LogoMarquee />

      {/* ============ PROGRAMAS PREVIEW ============ */}
      <section id="produtos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Soluções Modulares · Geração AI First™</p>
            <h2 className="text-2xl md:text-4xl font-black text-primary">Programas 100% Customizáveis</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Para executivos individuais, times ou organizações — cada solução é desenhada após diagnóstico estratégico, endereçando o gap real de habilidades em IA da sua realidade. Sem preços públicos, sem modelos genéricos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS_DATA.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.heroImage}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <Badge variant="secondary" className="w-fit text-xs mb-2">{product.category}</Badge>
                    <h3 className="font-bold text-base text-primary mb-1">{product.title}</h3>
                    <p className="text-muted-foreground text-sm italic line-clamp-2 flex-1">{product.tagline}</p>
                    <div className="flex flex-wrap gap-1 mt-3 mb-4">
                      {product.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link to={LMS_ROUTES.PROGRAMAS} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs rounded-full">Saiba Mais</Button>
                      </Link>
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="w-full text-xs rounded-full bg-accent hover:bg-accent/90 text-white">
                          Falar com Especialista
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to={LMS_ROUTES.PROGRAMAS}>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3 h-auto font-semibold">
                Ver Todos os Programas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ QUOTE PARALLAX 2 ============ */}
      <section ref={quoteRef2} className="min-h-[45vh] relative overflow-hidden flex items-center">
        <img
          src={IMAGES.PARALLAX_HOLOGRAPHIC}
          alt=""
          aria-hidden
          className="parallax-img absolute left-0 w-full object-cover pointer-events-none will-change-transform"
          style={{ top: '-15%', height: '130%', zIndex: 0 }}
        />
        <div className="absolute inset-0 z-10 bg-primary/80" />
        <div className="relative z-20 w-full flex items-center justify-center px-4 py-16">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-black text-2xl md:text-4xl text-white text-center italic max-w-3xl leading-snug"
          >
            "A vantagem competitiva do próximo ciclo não é de quem tem mais IA. É de quem formou líderes da Geração AI First™ — capazes de transformar potencial em resultado."
            <cite className="block text-accent text-base font-semibold not-italic mt-4">— Tom Queiroz · CEO Pareto · CAIO</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section id="mentoria" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">AI-First Framework™</p>
            <h2 className="text-2xl md:text-4xl font-black text-primary">Do Diagnóstico à <GeracaoAiFirstTm /></h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Quatro etapas rigorosas e modulares — personalizadas para a realidade de cada executivo, time ou organização. Com KPIs definidos antes de começar e métricas revisadas ao longo de todo o processo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENTORIA_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full text-center p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-accent" size={22} />
                    </div>
                    <div className="text-accent font-black text-2xl mb-1">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTEMUNHAIS — RÉGUA DINÂMICA AUTO-SCROLL ============ */}
      <section id="resultados" className="py-20 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Testemunhais</p>
            <h2 className="text-2xl md:text-4xl font-black text-primary">Da Incerteza à Liderança <AiFirstTm /></h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm">
              Executivos e líderes que superaram o gap de habilidades em IA e passaram a liderar — e não mais a seguir — a transformação em suas organizações.
            </p>
          </motion.div>
        </div>

        {/* Auto-scrolling rail — items duplicated for seamless infinite loop */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-hidden"
          style={{ scrollBehavior: 'auto', userSelect: 'none' }}
        >
          {[...SLIDER_TESTIMONIALS, ...SLIDER_TESTIMONIALS].map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="flex-shrink-0 w-80 bg-background rounded-2xl p-6 shadow-sm border border-border/40"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} fill="#7a6207" style={{ color: '#7a6207' }} />
                ))}
              </div>
              <p className="text-muted-foreground text-sm italic leading-relaxed mb-5">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-primary">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.linkedin.com/in/wellingtonqueiroz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-primary/25 hover:border-accent hover:text-accent text-primary rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            <FaLinkedinIn size={16} /> Ver Recomendações no LinkedIn
          </a>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">Sua empresa está formando a <span style={{ color: '#c9a227' }}><GeracaoAiFirstTm /></span>?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              O IDC estima US$ 5,5 trilhões em perdas globais pelo gap de talentos em IA até 2026. O custo de não agir já está sendo contabilizado. A W-Qi conecta você às lideranças e às metodologias que fecham esse gap — agora.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={LMS_ROUTES.PROGRAMAS}>
                <Button className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 h-auto rounded-full text-base">
                  Explorar Programas
                </Button>
              </Link>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 h-auto rounded-full text-base bg-transparent">
                  <FaWhatsapp className="mr-2" /> Falar com Especialista
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ INSIGHTS & EVENTOS ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Blog & Eventos</p>
            <h2 className="text-2xl md:text-4xl font-black text-primary">Insights & Perspectivas</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">Análises executivas sobre IA, liderança e transformação digital — com dados reais, sem hype.</p>
          </motion.div>

          {/* ── Grid premium de artigos estáticos ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">

            {/* Card principal grande */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Link to={LMS_ROUTES.BLOG}>
                <div
                  className="relative overflow-hidden rounded-2xl group cursor-pointer"
                  style={{ height: '380px', backgroundImage: `url(${IMAGES.PARALLAX_HUMAN_ROBOT})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001123] via-[#001123]/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#001123]/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(122,98,7,0.25)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.3)' }}>Insights</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3
                      className="text-white font-black leading-snug mb-3 group-hover:text-accent transition-colors"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      95% dos projetos de IA nas empresas fracassam. O problema não é a tecnologia.
                    </h3>
                    <p className="text-white/65 text-sm line-clamp-2" style={{ fontWeight: 300 }}>MIT (2025) e RAND Corporation documentaram que o gap de liderança é o maior inibidor de ROI em IA nas organizações.</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">TQ</div>
                        <span className="text-white/50 text-xs">Tom Queiroz · CEO Pareto · FGV</span>
                      </div>
                      <span className="text-accent text-xs font-semibold group-hover:underline">Ler artigo →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Coluna direita — 2 cards médios */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {[
                {
                  img: IMAGES.PARALLAX_AI_MARKETING,
                  cat: 'Liderança',
                  title: 'O Brasil tem um gap gigantesco de talentos em IA. E agora?',
                  excerpt: '98% das empresas relatam dificuldade em encontrar profissionais com skills em IA. TI Inside (2026).',
                  time: '6 min',
                },
                {
                  img: IMAGES.PARALLAX_HOLOGRAPHIC,
                  cat: 'Tendências',
                  title: 'Agentes de IA: o maior risco que o C-suite ainda não precificou',
                  excerpt: 'Sistemas agentic chegam com autonomia real. E a maioria dos executivos ainda não sabe o que isso significa para seus negócios.',
                  time: '8 min',
                },
              ].map((art, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Link to={LMS_ROUTES.BLOG}>
                    <div
                      className="relative overflow-hidden rounded-2xl group cursor-pointer"
                      style={{ height: '175px', backgroundImage: `url(${art.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001123] via-[#001123]/65 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(122,98,7,0.25)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.3)' }}>{art.cat}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3
                          className="text-white font-bold leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-2"
                          style={{ fontSize: '0.88rem', fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {art.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/40 text-[10px]">{art.time} leitura</span>
                          <span className="text-accent text-[10px] font-semibold group-hover:underline">Ler →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Próximos Eventos ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <Calendar size={18} style={{ color: '#7a6207' }} />
                <span className="font-bold text-primary text-sm uppercase tracking-widest">Próximos Eventos de IA</span>
              </div>
              <Link to={LMS_ROUTES.BLOG + '#coming-up'} className="text-accent text-xs font-semibold hover:underline flex items-center gap-1">
                Ver agenda completa <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'FEBRABAN Tech 2026', date: '10–12 Jun', city: 'São Paulo', format: 'Presencial', flag: '🇧🇷', highlight: true, url: 'https://febrabantech.com.br' },
                { name: 'AI Summit São Paulo 2026', date: '15–16 Set', city: 'São Paulo', format: 'Presencial', flag: '🇧🇷', highlight: true, url: 'https://aisummit.com.br' },
                { name: 'Web Summit Lisboa 2026', date: '02–05 Nov', city: 'Lisboa', format: 'Presencial', flag: '🇵🇹', highlight: false, url: 'https://websummit.com' },
                { name: 'MIT EmTech 2026', date: 'Out 2026', city: 'Cambridge', format: 'Presencial', flag: '🇺🇸', highlight: false, url: 'https://events.technologyreview.com' },
              ].map((ev, i) => (
                <motion.a
                  key={i}
                  href={ev.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="block rounded-xl p-4 border transition-all cursor-pointer group"
                  style={{
                    background: ev.highlight ? 'linear-gradient(135deg, rgba(0,17,35,0.04) 0%, rgba(122,98,7,0.05) 100%)' : 'white',
                    borderColor: ev.highlight ? 'rgba(122,98,7,0.25)' : '#e4e7ed',
                    boxShadow: ev.highlight ? '0 2px 12px rgba(122,98,7,0.08)' : 'none',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-lg">{ev.flag}</span>
                    {ev.highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(122,98,7,0.15)', color: '#7a6207' }}>Destaque</span>
                    )}
                  </div>
                  <p className="text-primary font-bold text-sm leading-snug mb-1 group-hover:text-accent transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>{ev.name}</p>
                  <p className="text-muted-foreground text-xs" style={{ fontWeight: 300 }}>{ev.date} · {ev.city}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{ev.format}</span>
                    <span className="text-accent text-[10px] font-semibold group-hover:underline">Inscrição →</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-10 flex flex-wrap gap-3 justify-center">
            <Link to={LMS_ROUTES.BLOG}>
              <Button variant="outline" className="border-primary text-primary rounded-full px-8 py-3 h-auto font-semibold text-sm">
                Ver Todos os Artigos
              </Button>
            </Link>
            <Link to={LMS_ROUTES.BLOG + '#coming-up'}>
              <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-3 h-auto font-semibold text-sm">
                <Calendar size={14} className="mr-2" /> Agenda de Eventos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ QUOTE PARALLAX 3 ============ */}
      <section ref={quoteRef3} className="min-h-[45vh] relative overflow-hidden flex items-center">
        <img
          src={IMAGES.PARALLAX_HANDSHAKE_ROBOT}
          alt=""
          aria-hidden
          className="parallax-img absolute left-0 w-full object-cover pointer-events-none will-change-transform"
          style={{ top: '-15%', height: '130%', zIndex: 0 }}
        />
        <div className="absolute inset-0 z-10 bg-primary/80" />
        <div className="relative z-20 w-full flex items-center justify-center px-4 py-16">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-black text-2xl md:text-4xl text-white text-center italic max-w-3xl leading-snug"
          >
            "Liderar na era da IA não é uma vantagem competitiva. É o requisito mínimo."
            <cite className="block text-accent text-base font-semibold not-italic mt-4">— Tom Queiroz</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-2xl md:text-4xl font-black text-primary">Perguntas Frequentes</h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4 bg-background">
                <AccordionTrigger className="text-left font-semibold text-primary text-sm md:text-base py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============ CONTATO ============ */}
      <section id="contato" className="py-20 md:py-28" style={{ background: '#001123' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — value proposition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Primeiro Passo</p>
              <h2 className="text-2xl md:text-3xl text-white mb-4">Uma Conversa pode Mudar sua Trajetória</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Líderes de alto desempenho não esperam a situação ideal. Eles constroem a situação ideal — a partir de uma decisão precisa e bem assessorada. Esse é o ponto de partida.
              </p>

              <div className="space-y-5">
                {[
                  { Icon: Search,   title: 'Diagnóstico sem custo',    desc: 'Na primeira conversa, mapeamos gaps, oportunidades e o seu maior alavancador de resultado agora.' },
                  { Icon: Zap,      title: 'Proposta sob medida',       desc: 'Cada programa é desenhado para o seu contexto — setor, momento de carreira, objetivos de negócio.' },
                  { Icon: Lock,     title: 'Confidencialidade total',   desc: 'Seus desafios e planos estratégicos são tratados com o mesmo sigilo de um advisor de board.' },
                  { Icon: Calendar, title: 'Resposta em 24h',           desc: 'Sua mensagem chega direto ao time W-Qi. Sem burocracia, sem SDRs. Só conversa qualificada.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <item.Icon size={20} style={{ color: '#7a6207', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Prefere falar agora?</p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-6 py-3 text-sm transition-colors">
                  <FaWhatsapp size={16} /> Chamar no WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
            >

              <p className="text-white/50 text-xs mb-4">Preencha o formulário — resposta garantida em até 24h.</p>
              {success ? (
                <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <CheckCircle className="text-accent" size={20} />
                  <p className="text-white text-sm font-medium">Mensagem recebida! Retornamos em até 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                      <AlertCircle className="text-destructive" size={18} />
                      <p className="text-destructive text-xs">{error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name2" className="text-white/70 text-xs font-medium">Nome *</Label>
                      <Input id="name2" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Seu nome" required className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-accent" />
                    </div>
                    <div>
                      <Label htmlFor="email2" className="text-white/70 text-xs font-medium">Email *</Label>
                      <Input id="email2" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="seu@email.com" required className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-accent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="whatsapp2" className="text-white/70 text-xs font-medium">WhatsApp</Label>
                      <Input id="whatsapp2" value={contactForm.whatsapp} onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })} placeholder="+55 11 99999-9999" className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-accent" />
                    </div>
                    <div>
                      <Label htmlFor="company2" className="text-white/70 text-xs font-medium">Empresa</Label>
                      <Input id="company2" value={contactForm.company} onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })} placeholder="Sua empresa" className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-accent" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message2" className="text-white/70 text-xs font-medium">Mensagem *</Label>
                    <Textarea id="message2" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Qual é o seu principal desafio hoje? Onde você quer chegar nos próximos 12 meses?" rows={4} required className="mt-1 bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-accent resize-none" />
                  </div>
                  <Button type="submit" disabled={submitLoading} className="w-full bg-accent hover:bg-accent/90 text-white rounded-full py-3 h-auto font-semibold text-sm">
                    {submitLoading ? <><Loader2 className="mr-2 animate-spin" size={15} /> Enviando...</> : 'Solicitar Conversa Estratégica'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-40 bg-primary/80 text-white rounded-full p-3 shadow-lg hover:bg-primary transition"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============ DIAGNÓSTICO GRATUITO — Pop-up flutuante fixo canto inferior esquerdo ============ */}
      <AnimatePresence mode="wait">
        {!diagOpen ? (
          <motion.button
            key="diag-btn"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            onClick={() => setDiagOpen(true)}
            className="fixed bottom-6 left-6 z-50 bg-accent hover:bg-accent/90 text-white rounded-full px-4 py-3 shadow-2xl font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <Stethoscope size={16} /> Diagnóstico Gratuito
          </motion.button>
        ) : (
          <motion.div
            key="diag-panel"
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 w-80 bg-primary rounded-2xl shadow-2xl p-6 border border-accent/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-base">Diagnóstico Gratuito</h3>
                <p className="text-white/60 text-xs mt-0.5">30 min · sem compromisso</p>
              </div>
              <button
                onClick={() => setDiagOpen(false)}
                className="text-white/40 hover:text-white transition-colors mt-0.5 ml-2 flex-shrink-0"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Agende 30 minutos e receba uma análise da maturidade digital da sua organização — sem custo, sem compromisso.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent hover:bg-accent/90 text-white w-full rounded-full font-semibold text-sm">
                <FaWhatsapp className="mr-2" size={14} /> Agendar no WhatsApp
              </Button>
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
    </Layout>
  );
}