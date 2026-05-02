import { useState, useRef, useEffect } from 'react';
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
import { useTestimonials, useSubmitLead } from '@/hooks/useSupabaseData';
import { useFeaturedPosts } from '@/hooks/useBlog';
import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/5511915513210?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20programas%20W-Qi.';

const FAQ_ITEMS = [
  {
    question: 'Para quem são os programas WQI?',
    answer:
      'Nossos programas são desenhados para executivos C-Suite, diretores de marketing, VPs de estratégia, fundadores e líderes que buscam dominar IA aplicada ao marketing e acelerar resultados de negócio.',
  },
  {
    question: 'Qual é a diferença entre os programas disponíveis?',
    answer:
      'A Mentoria 1:1 oferece atenção 100% personalizada para executivos sênior. O Cohort reúne 8-12 líderes por 6 meses. A MasterClass é uma imersão de 8h. O In-Company transforma times inteiros. Keynotes inspiram eventos corporativos.',
  },
  {
    question: 'Wellington Queiroz tem experiência no meu setor?',
    answer:
      'Wellington liderou marketing em Sony, Honda, Rakuten e Shell, cobrindo tecnologia, automotivo, e-commerce e energia. Como CAIO desde 2021 e Professor FGV EAESP, trabalhou com executivos de 8 países e dezenas de indústrias.',
  },
  {
    question: 'Quais resultados posso esperar?',
    answer:
      'Cases documentados: -35% em CPA, 3x em leads qualificados, ROI de 10x em campanhas com IA, e +40% em clareza estratégica após 90 dias. Cada programa define KPIs específicos no início para mensuração rigorosa.',
  },
  {
    question: 'Como funciona o Programa de Cohort Executivo?',
    answer:
      'O Cohort reúne 8-12 executivos selecionados em sessões semanais ao vivo por 6 meses. Inclui peer learning, mentor office hours, projetos práticos e networking de alto nível. Próxima turma: Agosto 2026.',
  },
  {
    question: 'Os programas são personalizados?',
    answer:
      'Sim. Todos os programas WQI são 100% personalizados. Não exibimos preços públicos porque cada proposta é construída individualmente após diagnóstico estratégico completo.',
  },
  {
    question: 'Qual é o investimento necessário?',
    answer:
      'O investimento varia conforme escopo, duração e formato. Após contato inicial, realizamos diagnóstico estratégico e apresentamos proposta personalizada. O retorno documentado supera 10x o investimento em até 90 dias.',
  },
  {
    question: 'Como posso começar?',
    answer:
      'Clique em Falar com Especialista em qualquer seção do site ou use o formulário de contato. Retornamos em até 24h para agendar conversa estratégica sem compromisso.',
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
    title: 'Plano de 90 Dias',
    description:
      'Roadmap personalizado com OKRs claros, marcos de execução e quick wins para gerar tração desde a primeira semana.',
  },
  {
    icon: Target,
    title: 'Implementação Guiada',
    description:
      'Acompanhamento contínuo com revisão de estratégias, campanhas e decisões de time em tempo real.',
  },
  {
    icon: Award,
    title: 'Resultados Mensuráveis',
    description:
      'Métricas rigorosas de ROI, redução de CPA, aumento de leads e transformação cultural reportados mensalmente.',
  },
];

// ─── Fictional testimonials for the slider ───
const SLIDER_TESTIMONIALS = [
  { id: 's1', name: 'Rodrigo Mendes', role: 'CMO', company: 'Grupo Saraiva', avatar: 'RM', content: 'Em 90 dias reduzi o CPA em 38% e estruturei meu time com metodologia AI-First. Wellington entrega clareza onde havia apenas ruído.' },
  { id: 's2', name: 'Cláudia Ferreira', role: 'VP de Marketing', company: 'BTG Pactual', avatar: 'CF', content: 'Nunca imaginei que estratégia e inteligência artificial poderiam se conectar de forma tão prática. O ROI foi imediato e mensurável.' },
  { id: 's3', name: 'André Nakamura', role: 'Head of Growth', company: 'iFood', avatar: 'AN', content: 'O Cohort Executivo foi divisor de águas. Além do conteúdo brutal, o networking com outros executivos valeu cada hora investida.' },
  { id: 's4', name: 'Bianca Torres', role: 'Diretora de Estratégia', company: 'Ambev', avatar: 'BT', content: 'Wellington tem a rara habilidade de transformar complexidade em ação. Em 60 dias já colhíamos resultados mensuráveis.' },
  { id: 's5', name: 'Felipe Carvalho', role: 'CEO', company: 'StartupBR', avatar: 'FC', content: 'A MasterClass AI-First foi a melhor decisão que tomei em 2025. Frameworks prontos, implementação imediata.' },
  { id: 's6', name: 'Mariana Souza', role: 'CDO', company: 'Grupo Fleury', avatar: 'MS', content: 'A mentoria 1:1 me deu o mapa que eu precisava para liderar a transformação digital. Resultado em 45 dias.' },
  { id: 's7', name: 'Lucas Prado', role: 'VP de Inovação', company: 'Embraer', avatar: 'LP', content: 'Executivo com 15 anos de carreira, nunca pensei que aprenderia tanto em tão pouco tempo. Altamente recomendado.' },
  { id: 's8', name: 'Tatiana Vieira', role: 'Chief Marketing Officer', company: 'Magazine Luiza', avatar: 'TV', content: 'Wellington conecta academia e mercado de uma forma que só quem viveu os dois lados consegue fazer. Transformador.' },
];

// ─── Floating brand logos in hero ───
const HERO_LOGOS = [
  { key: 'MCD_13',     style: { top: '12%', left: '5%'   } },
  { key: 'ITAU_14',    style: { top: '22%', left: '15%'  } },
  { key: 'GREENP_16', style: { top: '55%', left: '3%'   } },
  { key: 'GPA_17',    style: { top: '70%', left: '18%'  } },
  { key: 'HERING_15', style: { top: '82%', left: '8%'   } },
  { key: 'NVIDIA_28', style: { top: '10%', right: '6%'  } },
  { key: 'SHOPIFY_34',style: { top: '30%', right: '4%'  } },
  { key: 'SPOTIFY_30',style: { top: '60%', right: '7%'  } },
  { key: 'STONE_21',  style: { top: '75%', right: '3%'  } },
  { key: 'COINBASE_26',style:{ top: '45%', left: '7%'   } },
];

const LOGO_DELAYS = [0, 0.5, 1.1, 0.3, 1.8, 0.7, 1.4, 0.2, 1.6, 0.9];
const LOGO_WIDTHS = [80, 100, 90, 85, 95, 110, 88, 92, 85, 100];
const LOGO_DURATIONS = [4.5, 5.2, 4.1, 5.8, 3.9, 5.5, 4.8, 6.0, 4.3, 5.1];

export default function Home() {
  const heroBgRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 300);

      // Parallax for hero
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${y * 0.3}px)`;
      }
      // Parallax for quote sections
      [quoteRef1, quoteRef2, quoteRef3].forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.15;
          const img = ref.current.querySelector('.parallax-img') as HTMLElement;
          if (img) img.style.transform = `translateY(${offset}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        {/* === BG FALLBACK (foto de palco) === */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url(${IMAGES.TOM_HERO_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            height: '120%',
            top: '-10%',
          }}
        />

        {/* === VIDEO BG (loop, muted, lazy) — z-index 1 sobre o fallback === */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1, opacity: 0.35 }}
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay escuro — sobre o vídeo */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/78 to-primary/45" style={{ zIndex: 2 }} />

        {/* === FLOATING BRAND LOGOS — acima do overlay, abaixo do conteúdo === */}
        {HERO_LOGOS.map((logo, idx) => (
          <motion.div
            key={logo.key}
            className="absolute pointer-events-none select-none hidden md:block"
            style={{ ...logo.style, zIndex: 3, opacity: 0.22 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: LOGO_DURATIONS[idx], repeat: Infinity, ease: 'easeInOut', delay: LOGO_DELAYS[idx] }}
          >
            <img
              src={(IMAGES as Record<string, string>)[logo.key]}
              alt=""
              width={LOGO_WIDTHS[idx]}
              style={{ filter: 'brightness(10) saturate(0)', mixBlendMode: 'screen' }}
              aria-hidden
            />
          </motion.div>
        ))}

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
                Professor FGV EAESP · Ex-Sony · Ex-Honda · Ex-Rakuten
              </span>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.07] tracking-tight mb-4">
                Construa a Liderança Digital{' '}
                <span className="text-accent">que o Mercado vai Seguir</span>
              </h1>

              <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0" style={{ fontWeight: 300 }}>
                Na interseção entre estratégia, dados e IA, formamos os líderes que definirão os próximos dez anos do marketing global.
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
                  { value: '-35% CPA', label: 'Média em Campanhas' },
                  { value: 'ROI 10x', label: 'Em Projetos Reais' },
                  { value: '500+', label: 'Executivos Formados' },
                  { value: '20 anos', label: 'De Experiência' },
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

      {/* ============ QUOTE PARALLAX 1 ============ */}
      <section ref={quoteRef1} className="min-h-[45vh] relative overflow-hidden flex items-center">
        <div
          className="parallax-img absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url(${IMAGES.PARALLAX_AI_PRESENTATION})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120%',
            top: '-10%',
          }}
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
            "A IA não vai substituir você. Vai substituir quem não sabe usá-la."
            <cite className="block text-accent text-base font-semibold not-italic mt-4">— Wellington Queiroz</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ============ SOBRE ============ */}
      <section id="sobre" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left */}
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Sobre o Mentor</p>
              <h2 className="text-3xl md:text-5xl font-black text-primary mb-6">Wellington Queiroz</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Com mais de 20 anos liderando marketing digital em Sony, Honda, Rakuten e Shell, Wellington Queiroz construiu um histórico raro: ele não apenas teoriza sobre transformação digital — ele a entrega.
                </p>
                <p>
                  Como Chief AI & Innovation Officer (CAIO) desde 2021 e Professor convidado na FGV EAESP, une a profundidade acadêmica à brutalidade da execução corporativa — um diferencial que seus mais de 500 mentorados em 8 países reconhecem imediatamente.
                </p>
                <p>
                  Sua metodologia AI-First foi desenhada para executivos que não têm tempo a perder: clareza estratégica, implementação acelerada e resultados mensuráveis desde as primeiras semanas.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {['FGV EAESP', 'Sony', 'Honda', 'Rakuten', 'Shell', '500+ Mentorados', 'CAIO', '8 Países'].map((b) => (
                  <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-7 py-3 h-auto font-semibold">
                    <MessageCircle className="mr-2" size={16} /> Falar com Especialista
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/wellingtonqueiroz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/25 hover:border-accent hover:text-accent text-primary rounded-full px-5 py-3 text-sm font-semibold transition-colors"
                >
                  <FaLinkedinIn size={16} /> Conectar no LinkedIn
                </a>
              </div>
            </div>

            {/* Right */}
            <div>
              <img
                src={IMAGES.TOM_SOBRE}
                alt="Wellington Queiroz — Sobre"
                className="w-full h-96 md:h-[520px] rounded-2xl object-cover object-top shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

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
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Programas</p>
            <h2 className="text-3xl md:text-5xl font-black text-primary">Alta Performance Executive</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Cada programa é personalizado ao seu momento e mercado. Sem preços públicos — cada proposta é construída individualmente.
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
        <div
          className="parallax-img absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url(${IMAGES.PARALLAX_HOLOGRAPHIC})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120%',
            top: '-10%',
          }}
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
            "Marketing sem dados é opinião. Marketing sem IA é atraso."
            <cite className="block text-accent text-base font-semibold not-italic mt-4">— Wellington Queiroz</cite>
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
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Metodologia</p>
            <h2 className="text-3xl md:text-5xl font-black text-primary">Como Funciona</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Um processo de 4 etapas rigoroso, personalizado e orientado a resultados mensuráveis.
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
            <h2 className="text-3xl md:text-5xl font-black text-primary">O que Dizem os Mentorados</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm">
              Líderes de topo que transformaram resultados com a metodologia AI-First.
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
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-accent text-sm">★</span>
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
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Pronto para o Próximo Nível?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Cada dia sem uma estratégia AI-First é uma vantagem competitiva que você deixa para o concorrente.
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

      {/* ============ BLOG PREVIEW ============ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Blog</p>
            <h2 className="text-3xl md:text-5xl font-black text-primary">Insights & Perspectivas</h2>
          </motion.div>

          {(featuredPosts && featuredPosts.length > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(featuredPosts as import('@/lib/index').BlogPost[]).slice(0, 3).map((post, i: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full">
                      {post.cover_image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <CardContent className="p-5">
                        <Badge variant="secondary" className="text-xs mb-2">{post.category}</Badge>
                        <h3 className="font-bold text-primary text-base line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                        <p className="text-accent text-xs font-semibold mt-4">Ler artigo →</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>Carregando artigos...</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link to={LMS_ROUTES.BLOG}>
              <Button variant="outline" className="border-primary text-primary rounded-full px-8 py-3 h-auto font-semibold">
                Ver Todos os Artigos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ QUOTE PARALLAX 3 ============ */}
      <section ref={quoteRef3} className="min-h-[45vh] relative overflow-hidden flex items-center">
        <div
          className="parallax-img absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url(${IMAGES.PARALLAX_HANDSHAKE_ROBOT})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120%',
            top: '-10%',
          }}
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
            <cite className="block text-accent text-base font-semibold not-italic mt-4">— Wellington Queiroz</cite>
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
            <h2 className="text-3xl md:text-5xl font-black text-primary">Perguntas Frequentes</h2>
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

      {/* ============ CONTATO — somente form (dados de contato: footer e /contato) ============ */}
      <section id="contato" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Contato</p>
            <h2 className="text-3xl md:text-5xl font-black text-primary">Vamos Conversar</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Preencha o formulário e retornamos em até 24h para agendar sua conversa estratégica.
            </p>
          </motion.div>

          <form onSubmit={handleContactSubmit} className="space-y-4 max-w-2xl mx-auto">
            {success ? (
              <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <CheckCircle className="text-accent" size={20} />
                <p className="text-primary text-sm font-medium">Mensagem enviada! Retornamos em até 24h.</p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                    <AlertCircle className="text-destructive" size={20} />
                    <p className="text-destructive text-sm">{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nome *</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Seu nome completo"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="seu@email.com"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={contactForm.whatsapp}
                      onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                      placeholder="+55 11 99999-9999"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium">Empresa</Label>
                    <Input
                      id="company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      placeholder="Nome da empresa"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Mensagem *</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Conte sobre seus objetivos e desafios..."
                    rows={4}
                    required
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full bg-accent hover:bg-accent/90 text-white rounded-full py-3 h-auto font-semibold"
                >
                  {submitLoading ? (
                    <><Loader2 className="mr-2 animate-spin" size={16} /> Enviando...</>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </Button>
              </>
            )}
          </form>
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