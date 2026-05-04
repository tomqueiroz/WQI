import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { LMS_ROUTES } from '@/lib/index';
import type { BlogPost } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import {
  Search, Calendar, MapPin, ExternalLink, Star, ChevronRight,
  Tag, TrendingUp, Users, Globe, BookOpen, Zap, Eye, Clock,
} from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { AiFirstTm } from '@/components/AiFirstTm';
import { useAllBlogPosts } from '@/hooks/useBlog';

// ─── Constantes de cores ──────────────────────────────────────────────────────
const NAVY = '#001123';
const COPPER = '#7a6207';
const COPPER_LIGHT = '#c9a227';

// ─── Artigos estáticos (6 cards premium) ─────────────────────────────────────
const STATIC_POSTS = [
  {
    id: '1',
    slug: 'projetos-ia-falham',
    title: '95% dos projetos de IA nas empresas fracassam. E agora?',
    excerpt: 'MIT (2025) e RAND Corporation documentaram que o gap de liderança — não a tecnologia — é o maior inibidor de ROI em IA corporativa. Entenda o diagnóstico e o que fazer a respeito.',
    category: 'Insights',
    categoryColor: '#0ea5e9',
    image: IMAGES.PARALLAX_HUMAN_ROBOT,
    readTime: 7,
    views: 2841,
    isFeatured: true,
    tags: ['IA Corporativa', 'Liderança', 'ROI', 'MIT'],
    keyInsight: '80% das iniciativas de IA falham por falta de liderança capacitada, não por problemas técnicos.',
    sources: ['MIT Sloan Management Review 2025', 'RAND Corporation', 'Gartner Hype Cycle 2025'],
    author: 'Tom Queiroz',
    authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '28 Abr 2026',
  },
  {
    id: '2',
    slug: 'gap-talentos-ia-brasil',
    title: 'O Brasil tem um gap gigantesco de talentos em IA. E agora?',
    excerpt: '98% das empresas no Brasil relatam dificuldade em encontrar profissionais com habilidades em IA. TI Inside (2026). Enquanto isso, o mundo avança.',
    category: 'Liderança',
    categoryColor: '#8b5cf6',
    image: IMAGES.PARALLAX_AI_MARKETING,
    readTime: 6,
    views: 1623,
    isFeatured: true,
    tags: ['Talentos', 'Brasil', 'Mercado de Trabalho', 'IA'],
    keyInsight: 'O Brasil ocupa a 52ª posição no ranking global de prontidão para IA — abaixo de países como Chile e Colômbia.',
    sources: ['TI Inside 2026', 'ManpowerGroup Talent Shortage Survey', 'INSEAD AI Talent Index'],
    author: 'Tom Queiroz',
    authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '22 Abr 2026',
  },
  {
    id: '3',
    slug: 'agentes-ia-risco-csuite',
    title: 'Agentes de IA: o maior risco que o C-suite ainda não precificou',
    excerpt: 'Sistemas agentic chegam com autonomia real para tomar decisões em produção. A maioria dos executivos ainda não sabe o que isso significa para seus negócios — e para sua responsabilidade.',
    category: 'Tendências',
    categoryColor: '#f59e0b',
    image: IMAGES.PARALLAX_HOLOGRAPHIC,
    readTime: 8,
    views: 1987,
    isFeatured: true,
    tags: ['Agentes de IA', 'Riscos', 'C-Suite', 'Governança'],
    keyInsight: 'Até 2027, 25% das iniciativas de IA corporativas usarão agentes autônomos com impacto direto em decisões de negócio.',
    sources: ['Gartner Predictions 2026', 'Anthropic Safety Research', 'Forbes C-Suite AI Survey'],
    author: 'Tom Queiroz',
    authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '15 Abr 2026',
  },
  {
    id: '4',
    slug: 'brasil-ia-generativa-janela',
    title: 'O Brasil e a IA Generativa: estamos aproveitando a janela?',
    excerpt: 'Enquanto EUA e China definem o padrão global, o Brasil debate regulamentação e tenta entender o impacto. Uma análise honesta de onde estamos — e o que nos separa da liderança.',
    category: 'Inovação',
    categoryColor: '#10b981',
    image: IMAGES.PARALLAX_AI_PRESENTATION,
    readTime: 9,
    views: 2204,
    isFeatured: false,
    tags: ['Brasil', 'IA Generativa', 'Política', 'Competitividade'],
    keyInsight: 'O Brasil investe apenas 1,2% do PIB em P&D — contra 3,5% da Coreia do Sul. A janela de oportunidade está se fechando.',
    sources: ['WEF Global Competitiveness 2026', 'INSEAD Innovation Index', 'Estratégia Brasileira de IA (EBIA)'],
    author: 'Tom Queiroz',
    authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '08 Abr 2026',
  },
  {
    id: '5',
    slug: 'hierarquia-corporativa-ia',
    title: 'Da pirâmide à rede: como a IA está destruindo a hierarquia corporativa',
    excerpt: 'O executivo do futuro não gerencia pessoas em silos — gerencia sistemas inteligentes que operam em rede. HBR e McKinsey apontam uma mudança estrutural que a maioria das empresas ignora.',
    category: 'Carreira',
    categoryColor: '#ec4899',
    image: IMAGES.PARALLAX_EXECUTIVE,
    readTime: 7,
    views: 1456,
    isFeatured: false,
    tags: ['Futuro do Trabalho', 'Gestão', 'Transformação', 'HBR'],
    keyInsight: 'Empresas com IA bem implementada reduziram camadas hierárquicas em 30% — e aumentaram velocidade de decisão em 45%.',
    sources: ['Harvard Business Review 2026', 'McKinsey Quarterly', 'MIT Sloan Work of the Future'],
    author: 'Tom Queiroz',
    authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '01 Abr 2026',
  },
  {
    id: '6',
    slug: 'ia-regulacao-brasil-ue',
    title: 'IA e regulação: enquanto a UE corre, o Brasil ainda debate',
    excerpt: 'O EU AI Act já está em vigor. O Brasil tem um PL em tramitação desde 2021. O risco não é só legal — é de competitividade. O que os executivos precisam saber agora.',
    category: 'Bem-Estar',
    categoryColor: '#f97316',
    image: IMAGES.PARALLAX_HANDSHAKE_ROBOT,
    readTime: 6,
    views: 1102,
    isFeatured: false,
    tags: ['Regulação', 'EU AI Act', 'Compliance', 'Governança'],
    keyInsight: '72% dos executivos globais temem riscos regulatórios de IA, mas apenas 18% têm um plano de compliance estruturado.',
    sources: ['EU AI Act Official', 'OneTrust AI Governance Report', 'PwC AI Predictions 2026'],
    author: 'Tom Queiroz',
    authorTitle: 'CEO & CAIO Pareto Plus · Prof. Me. FGV IA Aplicada aos Negócios',
    linkedIn: 'https://www.linkedin.com/in/wellingtonqueiroz/',
    date: '25 Mar 2026',
  },
];

const ALL_CATEGORIES = ['Todos', 'Insights', 'Liderança', 'Tendências', 'Inovação', 'Estratégia', 'Carreira', 'Bem-Estar', 'Governança', 'Tech & IA', 'Eventos'];

// ─── Eventos de IA (estáticos) ─────────────────────────────────────────────
const AI_EVENTS = [
  {
    id: 'febraban-2026',
    name: 'FEBRABAN Tech 2026',
    date: '2026-06-10', dateEnd: '2026-06-12',
    city: 'São Paulo', state: 'SP', country: 'Brasil', countryCode: 'BR',
    format: 'Presencial',
    summary: 'O maior evento de tecnologia e inovação do setor financeiro da América Latina. Em 2026, IA Generativa e Open Finance dominam a agenda com cases reais e C-Suite panels.',
    relevance: 'Referência obrigatória para executivos de fintechs, bancos e seguradoras que precisam entender como a IA está redesenhando o setor financeiro.',
    relevanceScore: 5,
    categories: ['Brasil', 'IA Generativa', 'Empresas', 'C-Suite'],
    registrationUrl: 'https://febrabantech.com.br',
    isFeatured: true,
  },
  {
    id: 'ai-summit-sp-2026',
    name: 'AI Summit São Paulo 2026',
    date: '2026-09-15', dateEnd: '2026-09-16',
    city: 'São Paulo', state: 'SP', country: 'Brasil', countryCode: 'BR',
    format: 'Presencial',
    summary: 'Summit executivo focado exclusivamente em IA aplicada a negócios. Palestrantes globais, cases reais e trilhas para C-suite, operações e produto.',
    relevance: 'O evento mais focado em IA aplicada para o executivo brasileiro. Essencial para sair com implementação prática, não teoria.',
    relevanceScore: 5,
    categories: ['Brasil', 'IA Generativa', 'Empresas', 'C-Suite'],
    registrationUrl: 'https://aisummit.com.br',
    isFeatured: true,
  },
  {
    id: 'futurecom-2026',
    name: 'Futurecom 2026',
    date: '2026-10-06', dateEnd: '2026-10-08',
    city: 'São Paulo', state: 'SP', country: 'Brasil', countryCode: 'BR',
    format: 'Presencial',
    summary: 'Maior congresso de tecnologia e telecomunicações da América Latina. Em 2026, trilha dedicada a IA aplicada, transformação digital e liderança.',
    relevance: 'Referência para executivos de tecnologia, inovação e liderança. Congrega C-suite, investidores e os maiores players do mercado.',
    relevanceScore: 5,
    categories: ['Brasil', 'Empresas', 'Liderança'],
    registrationUrl: 'https://futurecom.com.br',
    isFeatured: true,
  },
  {
    id: 'campus-party-2026',
    name: 'Campus Party Brasil 2026',
    date: '2026-07-14', dateEnd: '2026-07-19',
    city: 'São Paulo', state: 'SP', country: 'Brasil', countryCode: 'BR',
    format: 'Presencial',
    summary: 'O maior festival de tecnologia e inovação da América Latina. Em 2026, foco especial em IA Generativa, startups e carreira tech.',
    relevance: 'Excelente para ampliar networking, descobrir startups emergentes e entender o ecossistema digital brasileiro de perto.',
    relevanceScore: 4,
    categories: ['Brasil', 'IA Generativa'],
    registrationUrl: 'https://brasil.campus-party.org',
    isFeatured: false,
  },
  {
    id: 'bett-brasil-2026',
    name: 'Bett Brasil 2026',
    date: '2026-08-19', dateEnd: '2026-08-22',
    city: 'São Paulo', state: 'SP', country: 'Brasil', countryCode: 'BR',
    format: 'Presencial',
    summary: 'Maior evento de tecnologia educacional da América Latina. Em 2026, IA aplicada ao treinamento corporativo e educação executiva são temas centrais.',
    relevance: 'Para gestores de L&D, RH e líderes interessados em como IA está transformando o desenvolvimento de talentos.',
    relevanceScore: 3,
    categories: ['Brasil', 'Liderança', 'Empresas'],
    registrationUrl: 'https://bettbrasil.com.br',
    isFeatured: false,
  },
  {
    id: 'web-summit-2026',
    name: 'Web Summit Lisboa 2026',
    date: '2026-11-02', dateEnd: '2026-11-05',
    city: 'Lisboa', state: '', country: 'Portugal', countryCode: 'PT',
    format: 'Presencial',
    summary: 'O maior evento de tecnologia do mundo, com 70.000 participantes. Em 2026, IA Agentic, regulação europeia e o futuro do trabalho dominam a agenda.',
    relevance: 'Indispensável para quem quer visão global, conexões internacionais e acesso à vanguarda do que está vindo em tecnologia e IA.',
    relevanceScore: 5,
    categories: ['Internacional', 'IA Generativa', 'Liderança', 'C-Suite'],
    registrationUrl: 'https://websummit.com',
    isFeatured: true,
  },
  {
    id: 'nvidia-gtc-2026',
    name: 'NVIDIA GTC 2026',
    date: '2026-03-17', dateEnd: '2026-03-21',
    city: 'San Jose', state: 'CA', country: 'EUA', countryCode: 'US',
    format: 'Híbrido',
    summary: 'A principal conferência de IA e computação acelerada do mundo. Keynotes de Jensen Huang e anúncios de produtos que definem o rumo da IA para os próximos 18 meses.',
    relevance: 'Para CTOs, CDOs e qualquer executivo que precisa entender para onde a infraestrutura de IA está indo. Acesso online gratuito.',
    relevanceScore: 5,
    categories: ['Internacional', 'IA Generativa', 'C-Suite'],
    registrationUrl: 'https://www.nvidia.com/gtc/',
    isFeatured: true,
  },
  {
    id: 'mit-emtech-2026',
    name: 'MIT EmTech 2026',
    date: '2026-10-14', dateEnd: '2026-10-16',
    city: 'Cambridge', state: 'MA', country: 'EUA', countryCode: 'US',
    format: 'Presencial',
    summary: 'Conferência de tecnologias emergentes do MIT Technology Review. Em 2026, IA, biotecnologia e sustentabilidade são os pilares da agenda.',
    relevance: 'O evento mais academicamente rigoroso sobre IA e impacto nos negócios. Ideal para executivos que querem dados e não hype.',
    relevanceScore: 5,
    categories: ['Internacional', 'IA Generativa', 'Liderança'],
    registrationUrl: 'https://events.technologyreview.com',
    isFeatured: false,
  },
  {
    id: 'dreamforce-2026',
    name: 'Dreamforce 2026',
    date: '2026-09-09', dateEnd: '2026-09-12',
    city: 'São Francisco', state: 'CA', country: 'EUA', countryCode: 'US',
    format: 'Presencial',
    summary: 'O maior evento de CRM e cloud do mundo, agora completamente centrado em "Agentforce" — a plataforma de agentes de IA da Salesforce para empresas.',
    relevance: 'Para executivos de vendas, marketing e operações. IA aplicada ao CRM e automação de receita são os temas centrais.',
    relevanceScore: 4,
    categories: ['Internacional', 'Empresas', 'IA Generativa'],
    registrationUrl: 'https://www.salesforce.com/dreamforce/',
    isFeatured: false,
  },
  {
    id: 'hbs-ai-business-2026',
    name: 'HBS AI in Business Summit 2026',
    date: '2026-05-19', dateEnd: '2026-05-21',
    city: 'Boston', state: 'MA', country: 'EUA', countryCode: 'US',
    format: 'Presencial',
    summary: 'Cúpula da Harvard Business School reunindo CEOs, professores e pesquisadores para debater estratégias de IA para a alta liderança.',
    relevance: 'Para C-suite que quer o rigor acadêmico de Harvard combinado com aplicação real. Cases de grandes corporações globais.',
    relevanceScore: 5,
    categories: ['Internacional', 'Liderança', 'C-Suite'],
    registrationUrl: 'https://hbswk.hbs.edu',
    isFeatured: true,
  },
  {
    id: 'microsoft-build-2026',
    name: 'Microsoft Build 2026',
    date: '2026-05-19', dateEnd: '2026-05-21',
    city: 'Seattle', state: 'WA', country: 'EUA', countryCode: 'US',
    format: 'Híbrido',
    summary: 'A principal conferência de desenvolvedores da Microsoft, com foco em Copilot, Azure AI e ferramentas de desenvolvimento com IA.',
    relevance: 'Para CTOs, CDOs e líderes de produto que querem entender o ecossistema Microsoft de IA e integrações para a empresa.',
    relevanceScore: 4,
    categories: ['Internacional', 'IA Generativa', 'Empresas'],
    registrationUrl: 'https://build.microsoft.com',
    isFeatured: false,
  },
  {
    id: 'stanford-hai-2026',
    name: 'Stanford HAI Conference 2026',
    date: '2026-04-22', dateEnd: '2026-04-23',
    city: 'Stanford', state: 'CA', country: 'EUA', countryCode: 'US',
    format: 'Híbrido',
    summary: 'Conferência do Human-Centered AI Institute de Stanford, com foco em IA responsável, governança e impacto humano da tecnologia.',
    relevance: 'Para executivos que lidam com ética em IA, regulação e responsabilidade corporativa. A visão mais equilibrada sobre IA.',
    relevanceScore: 4,
    categories: ['Internacional', 'IA Generativa', 'C-Suite'],
    registrationUrl: 'https://hai.stanford.edu',
    isFeatured: false,
  },
  {
    id: 'davos-2026',
    name: 'WEF Annual Meeting 2026',
    date: '2026-01-20', dateEnd: '2026-01-24',
    city: 'Davos', state: '', country: 'Suíça', countryCode: 'CH',
    format: 'Presencial',
    summary: 'O Fórum Econômico Mundial discutiu governança de IA, futuro do trabalho e impacto econômico da inteligência artificial para líderes globais.',
    relevance: 'A maior conversa global sobre o impacto da IA em governos, empresas e sociedade. Documentação pública indispensável para benchmarking.',
    relevanceScore: 5,
    categories: ['Internacional', 'IA Generativa', 'C-Suite', 'Liderança'],
    registrationUrl: 'https://weforum.org',
    isFeatured: false,
  },
  {
    id: 'google-io-2026',
    name: 'Google I/O 2026',
    date: '2026-05-14', dateEnd: '2026-05-15',
    city: 'Mountain View', state: 'CA', country: 'EUA', countryCode: 'US',
    format: 'Híbrido',
    summary: 'A conferência anual de desenvolvedores do Google, onde Gemini e Google Cloud AI dominam os anúncios para produtos e serviços empresariais.',
    relevance: 'Para líderes que usam ou avaliam o ecossistema Google Cloud. IA Generativa integrada a todos os produtos corporativos.',
    relevanceScore: 4,
    categories: ['Internacional', 'IA Generativa', 'Empresas'],
    registrationUrl: 'https://io.google',
    isFeatured: false,
  },
  {
    id: 'ai-expo-europe-2026',
    name: 'AI & Big Data Expo Europe 2026',
    date: '2026-06-25', dateEnd: '2026-06-26',
    city: 'Amsterdã', state: '', country: 'Holanda', countryCode: 'NL',
    format: 'Presencial',
    summary: 'A maior feira de IA e Big Data da Europa, com mais de 5.000 participantes de 60 países e palestras de líderes de Google, Microsoft, IBM e SAP.',
    relevance: 'Para executivos que precisam entender o ecossistema europeu de IA, com foco em regulação GDPR/EU AI Act e implementação enterprise.',
    relevanceScore: 4,
    categories: ['Internacional', 'Empresas', 'IA Generativa'],
    registrationUrl: 'https://www.ai-expo.net/europe/',
    isFeatured: false,
  },
];

const FLAG_MAP: Record<string, string> = { BR: '🇧🇷', US: '🇺🇸', PT: '🇵🇹', CH: '🇨🇭', NL: '🇳🇱' };

function formatEventDate(dateStr: string, dateEndStr?: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDate();
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  if (dateEndStr) {
    const dEnd = new Date(dateEndStr + 'T12:00:00');
    if (dEnd.getMonth() === d.getMonth()) {
      return `${day}–${dEnd.getDate()} ${month} ${year}`;
    }
    return `${day} ${month} – ${dEnd.getDate()} ${months[dEnd.getMonth()]} ${year}`;
  }
  return `${day} ${month} ${year}`;
}

const EVENT_FILTERS = [
  { label: 'Todos', value: 'todos' },
  { label: '🇧🇷 No Brasil', value: 'brasil' },
  { label: '🌐 Internacional', value: 'internacional' },
  { label: 'IA Generativa', value: 'IA Generativa' },
  { label: 'Liderança', value: 'Liderança' },
  { label: 'Para Empresas', value: 'Empresas' },
  { label: 'C-Suite', value: 'C-Suite' },
];

// ─── Componente EventCard ─────────────────────────────────────────────────────
function EventCard({ ev, i }: { ev: typeof AI_EVENTS[0]; i: number }) {
  const isPast = new Date(ev.date) < new Date('2026-05-02');
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.07 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{
        borderColor: ev.isFeatured ? 'rgba(122,98,7,0.3)' : '#e4e7ed',
        background: isPast ? '#f9f9fb' : 'white',
        boxShadow: ev.isFeatured ? '0 4px 20px rgba(122,98,7,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: isPast ? 0.65 : 1,
      }}
    >
      {/* Header colorido */}
      <div
        className="px-5 py-4 flex items-start justify-between gap-3"
        style={{ background: ev.isFeatured ? `linear-gradient(135deg, ${NAVY} 0%, #0d2040 100%)` : '#f4f5f7' }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{FLAG_MAP[ev.countryCode] || '🌐'}</span>
            {ev.isFeatured && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,162,39,0.2)', color: COPPER_LIGHT }}>
                Destaque
              </span>
            )}
            {isPast && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">Encerrado</span>
            )}
          </div>
          <p
            className="font-black leading-tight line-clamp-2"
            style={{ color: ev.isFeatured ? 'white' : NAVY, fontSize: '0.88rem', fontFamily: 'Montserrat, sans-serif' }}
          >
            {ev.name}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-xs" style={{ color: ev.isFeatured ? COPPER_LIGHT : COPPER }}>
            {formatEventDate(ev.date, ev.dateEnd)}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: ev.isFeatured ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>
            {ev.city}{ev.state ? `, ${ev.state}` : ''}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Formato badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: ev.format === 'Presencial' ? 'rgba(16,185,129,0.1)' : ev.format === 'Online' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)',
              color: ev.format === 'Presencial' ? '#059669' : ev.format === 'Online' ? '#3b82f6' : '#8b5cf6' }}>
            {ev.format}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(ev.relevanceScore)].map((_, j) => (
              <Star key={j} size={10} fill={COPPER_LIGHT} stroke={COPPER_LIGHT} />
            ))}
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-3 line-clamp-3" style={{ color: '#6b7280', fontWeight: 300 }}>
          {ev.summary}
        </p>

        {/* Por que é relevante */}
        <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(122,98,7,0.06)', border: '1px solid rgba(122,98,7,0.12)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: COPPER }}>Por que é relevante</p>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#374151', fontWeight: 300 }}>{ev.relevance}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {ev.categories.map((cat) => (
            <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: 'rgba(0,17,35,0.1)', color: '#6b7280' }}>
              {cat}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={ev.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
          style={{ background: isPast ? '#e5e7eb' : ev.isFeatured ? COPPER : NAVY, color: 'white', fontSize: '0.8rem' }}
        >
          {isPast ? 'Saiba mais' : 'Inscrever-se'}
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function BlogSidebar() {
  const upcomingEvents = AI_EVENTS
    .filter(e => new Date(e.date) >= new Date('2026-05-02'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const topPosts = STATIC_POSTS.slice(0, 4);

  const allTags = Array.from(new Set(STATIC_POSTS.flatMap(p => p.tags)));

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Autor */}
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(122,98,7,0.2)' }}>
        <div className="p-5" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2040 100%)` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: COPPER }}>
              <img src={IMAGES.TOM_HERO_PORTRAIT} alt="Tom Queiroz" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <p className="font-black text-white text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Tom Queiroz</p>
              <p className="text-white/50 text-[10px] leading-snug">CEO & CAIO Pareto Plus<br/>Prof. Me. FGV IA Aplicada</p>
            </div>
          </div>
          <p className="text-white/65 text-xs leading-relaxed">
            Pioneiro em IA Generativa no Brasil. Escrevendo sobre <strong className="text-white/80">liderança AI First</strong> e transformação digital executiva desde 2021.
          </p>
        </div>
        <div className="px-5 py-4 bg-white">
          <a
            href="https://www.linkedin.com/in/wellingtonqueiroz/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#0077b5', color: 'white' }}
          >
            <FaLinkedinIn size={14} /> Seguir no LinkedIn
          </a>
        </div>
      </div>

      {/* Mais lidos */}
      <div className="rounded-2xl border p-5" style={{ borderColor: '#e4e7ed' }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} style={{ color: COPPER }} />
          <p className="font-black text-sm uppercase tracking-wide" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Mais Lidos</p>
        </div>
        <div className="space-y-3">
          {topPosts.map((p, i) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="flex items-start gap-3 group">
              <span className="font-black text-xl leading-none flex-shrink-0 mt-0.5" style={{ color: 'rgba(0,17,35,0.1)', fontFamily: 'Montserrat, sans-serif' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors" style={{ color: NAVY }}>
                  {p.title}
                </p>
                <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#94a3b8' }}>
                  <Eye size={10} /> {p.views.toLocaleString('pt-BR')} · <Clock size={10} /> {p.readTime} min
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Próximos Eventos */}
      <div className="rounded-2xl border p-5" style={{ borderColor: '#e4e7ed' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={15} style={{ color: COPPER }} />
            <p className="font-black text-sm uppercase tracking-wide" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Próximos Eventos</p>
          </div>
          <a href="#coming-up" className="text-[10px] font-semibold hover:underline" style={{ color: COPPER }}>ver todos →</a>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((ev) => (
            <a key={ev.id} href={ev.registrationUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
              <span className="text-base flex-shrink-0 mt-0.5">{FLAG_MAP[ev.countryCode] || '🌐'}</span>
              <div>
                <p className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors" style={{ color: NAVY }}>
                  {ev.name}
                </p>
                <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#94a3b8' }}>
                  <Calendar size={9} /> {formatEventDate(ev.date)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="rounded-2xl border p-5" style={{ borderColor: '#e4e7ed' }}>
        <div className="flex items-center gap-2 mb-4">
          <Tag size={14} style={{ color: COPPER }} />
          <p className="font-black text-sm uppercase tracking-wide" style={{ color: NAVY, fontFamily: 'Montserrat, sans-serif' }}>Tópicos</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <span key={tag} className="text-[11px] px-3 py-1 rounded-full border cursor-pointer hover:border-accent hover:text-accent transition-colors" style={{ borderColor: '#e4e7ed', color: '#6b7280' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${COPPER} 0%, #5c4805 100%)` }}>
        <Zap size={20} className="mb-3 opacity-80" />
        <p className="font-black text-sm mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Insights exclusivos</p>
        <p className="text-white/70 text-xs mb-4 leading-relaxed">Receba análises de Tom Queiroz antes de publicar no LinkedIn.</p>
        <a
          href="https://wa.me/5511915513210?text=Quero%20receber%20insights%20exclusivos%20do%20Tom%20Queiroz"
          target="_blank" rel="noopener noreferrer"
          className="block text-center py-2 rounded-xl text-xs font-bold bg-white hover:bg-white/90 transition-colors"
          style={{ color: COPPER }}
        >
          Receber via WhatsApp
        </a>
      </div>
    </aside>
  );
}

// ─── ParallaxBanner ───────────────────────────────────────────────────────────
function ParallaxBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div ref={ref} className="relative overflow-hidden py-20 my-16" style={{ minHeight: 220, borderRadius: '1.5rem' }}>
      <motion.div style={{ y, position: 'absolute', inset: 0 }} className="w-full h-full">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${IMAGES.PARALLAX_AI_PRESENTATION})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(0,17,35,0.94) 0%, rgba(0,17,35,0.88) 100%)`, borderRadius: '1.5rem' }} />
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <p
          className="font-black text-white/10 leading-none select-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em', fontFamily: 'Montserrat, sans-serif' }}
        >
          AI FIRST
        </p>
        <p className="text-white text-base md:text-lg font-semibold mb-2 -mt-4">
          "O maior risco não é implementar IA. É deixar que a ignorância sobre IA defina sua estratégia."
        </p>
        <p className="text-xs font-semibold" style={{ color: COPPER_LIGHT }}>— Tom Queiroz</p>
      </div>
    </div>
  );
}

// ─── Main BlogPage ────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchMain, setSearchMain] = useState('');
  const [eventFilter, setEventFilter] = useState('todos');
  const [eventSearch, setEventSearch] = useState('');
  // Sanfona todos os posts
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [allPostsPage, setAllPostsPage] = useState(1);
  const [allPostsSearch, setAllPostsSearch] = useState('');
  const { data: supabasePosts, loading: supabaseLoading } = useAllBlogPosts();
  const ALL_POSTS_PER_PAGE = 10;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Usa posts do Supabase quando disponíveis, fallback para STATIC_POSTS
  // Cast para BlogPost[] para garantir type safety unificado
  const displayPosts: BlogPost[] = (supabasePosts && supabasePosts.length > 0)
    ? supabasePosts
    : (STATIC_POSTS as unknown as BlogPost[]);
  const featuredPosts = displayPosts.filter(p => p.isFeatured || p.is_featured);
  const regularPosts = displayPosts.filter(p => !p.isFeatured && !p.is_featured);

  const filteredPosts = displayPosts.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = !searchMain ||
      p.title.toLowerCase().includes(searchMain.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(searchMain.toLowerCase()) ||
      (p.tags || []).some((t: string) => t.toLowerCase().includes(searchMain.toLowerCase()));
    return matchCat && matchSearch;
  });

  const filteredEvents = AI_EVENTS.filter(ev => {
    const matchFilter = eventFilter === 'todos'
      ? true
      : eventFilter === 'brasil'
        ? ev.countryCode === 'BR'
        : eventFilter === 'internacional'
          ? ev.countryCode !== 'BR'
          : ev.categories.includes(eventFilter);
    const matchSearch = !eventSearch
      || ev.name.toLowerCase().includes(eventSearch.toLowerCase())
      || ev.city.toLowerCase().includes(eventSearch.toLowerCase())
      || ev.country.toLowerCase().includes(eventSearch.toLowerCase())
      || ev.summary.toLowerCase().includes(eventSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= new Date('2026-05-02'));
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < new Date('2026-05-02'));

  return (
    <Layout>
      {/* ── Hero com vídeo BG ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '70vh', background: NAVY, paddingTop: '120px' }}>
        {/* Vídeo de fundo */}
        <motion.div style={{ y: heroY, position: 'absolute', inset: 0 }} className="w-full h-full">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.6 }}
            onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }}
          >
            <source src="/video/future-bg.mp4" type="video/mp4" />
            <source src="/video/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Máscara preta 40% */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.40)' }} />
          {/* Gradiente da marca */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,17,35,0.55) 0%, rgba(13,32,64,0.40) 100%)' }} />
        </motion.div>

        {/* Linhas decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute border-l" style={{ left: `${12 + i * 18}%`, top: 0, bottom: 0, borderColor: 'rgba(122,98,7,0.07)', transform: 'skewX(-12deg)' }} />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 flex flex-col justify-end pb-14 px-4 max-w-7xl mx-auto min-h-[30vh]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 max-w-[36px]" style={{ background: COPPER }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: COPPER }}>Blog & Perspectivas</span>
          </div>
          <h1
            className="text-white font-black leading-none mb-4"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', fontFamily: 'Montserrat, sans-serif' }}
          >
            Insights para a<br />
            <span style={{ color: COPPER_LIGHT }}>Geração <AiFirstTm /></span>
          </h1>
          <p className="text-white/60 max-w-2xl mb-6 text-sm md:text-base" style={{ fontWeight: 300 }}>
            Análises executivas sobre IA, liderança e transformação digital — com dados reais, sem hype. Por <strong className="text-white/80">Tom Queiroz</strong>, CEO & CAIO Pareto Plus.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#artigos" className="text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors">
              <BookOpen size={13} /> Artigos
            </a>
            <a href="#coming-up" className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80" style={{ background: COPPER, color: 'white' }}>
              <span className="flex items-center gap-1.5"><Calendar size={12} /> Eventos de IA</span>
            </a>
            <a href="https://www.linkedin.com/in/wellingtonqueiroz/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors">
              <FaLinkedinIn size={12} /> Seguir Tom Queiroz
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Filtros ── */}
      <div className="sticky top-[72px] z-30 border-b border-border bg-white/90 backdrop-blur-md shadow-sm" id="artigos">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[160px] max-w-[240px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchMain}
              onChange={(e) => setSearchMain(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-full border bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ borderColor: '#e4e7ed' }}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  background: activeCategory === cat ? NAVY : 'transparent',
                  color: activeCategory === cat ? 'white' : '#6b7280',
                  border: `1px solid ${activeCategory === cat ? NAVY : '#e4e7ed'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <a href="#coming-up" className="ml-auto px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 hover:opacity-80" style={{ background: COPPER, color: 'white' }}>
            <Calendar size={11} /> Eventos AI
          </a>
        </div>
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Coluna de artigos ── */}
          <div className="lg:col-span-8">

            {/* Em Destaque */}
            {(activeCategory === 'Todos' || featuredPosts.some(p => p.category === activeCategory)) && !searchMain && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: NAVY }}>Em Destaque</h2>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(0,17,35,0.25)' }}>LEITURAS ESSENCIAIS</span>
                </div>

                {/* Card principal */}
                <Link to={`/blog/${featuredPosts[0]?.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-2xl group mb-5 cursor-pointer"
                    style={{ height: '360px', backgroundImage: `url(${featuredPosts[0]?.image || featuredPosts[0]?.cover_image_url || featuredPosts[0]?.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.95) 0%, rgba(0,17,35,0.6) 50%, rgba(0,17,35,0.2) 100%)' }} />
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: `rgba(122,98,7,0.2)`, color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.3)` }}>
                        {featuredPosts[0]?.category}
                      </span>
                      <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70">
                        {featuredPosts[0]?.readTime || featuredPosts[0]?.read_time_minutes || 7} min leitura
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {(featuredPosts[0]?.keyInsight || featuredPosts[0]?.key_insight) && (
                        <div className="mb-3 rounded-lg px-3 py-2 inline-block" style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.2)' }}>
                          <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: COPPER_LIGHT }}>Insight-chave</p>
                          <p className="text-white/85 text-xs">{featuredPosts[0].keyInsight || featuredPosts[0].key_insight}</p>
                        </div>
                      )}
                      <h2
                        className="text-white font-black leading-snug mb-3 group-hover:text-accent transition-colors"
                        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {featuredPosts[0]?.title}
                      </h2>
                      <p className="text-white/60 text-sm line-clamp-2 mb-4" style={{ fontWeight: 300 }}>{featuredPosts[0]?.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full overflow-hidden border" style={{ borderColor: COPPER }}>
                            <img src={IMAGES.TOM_HERO_PORTRAIT} alt="" className="w-full h-full object-cover object-top" />
                          </div>
                          <div>
                            <p className="text-white text-xs font-semibold">{featuredPosts[0]?.author || featuredPosts[0]?.author_name || 'Tom Queiroz'}</p>
                            <p className="text-white/40 text-[10px]">{featuredPosts[0]?.date} · {(featuredPosts[0]?.views || featuredPosts[0]?.views_count || 0).toLocaleString('pt-BR')} visualizações</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold flex items-center gap-1 group-hover:underline" style={{ color: COPPER_LIGHT }}>
                          Ler artigo <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                {/* Grid 2 cards secundários */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featuredPosts.slice(1, 3).map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="relative overflow-hidden rounded-2xl group cursor-pointer"
                        style={{ height: '220px', backgroundImage: `url(${post.image || post.cover_image_url || post.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      >
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,17,35,0.92) 0%, rgba(0,17,35,0.5) 60%, transparent 100%)' }} />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(122,98,7,0.2)', color: COPPER_LIGHT, border: `1px solid rgba(201,162,39,0.3)` }}>{post.category}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3
                            className="text-white font-bold leading-snug line-clamp-2 mb-2 group-hover:text-accent transition-colors"
                            style={{ fontSize: '0.875rem', fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-white/40 text-[10px]">{post.readTime || post.read_time_minutes || 7} min · {post.date}</span>
                            <span className="text-[10px] font-semibold group-hover:underline" style={{ color: COPPER_LIGHT }}>Ler →</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mais Artigos */}
            {(filteredPosts.length > 0) && (
              <div className="mb-10">
                <h2 className="font-black mb-5" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', color: NAVY }}>
                  {searchMain || activeCategory !== 'Todos' ? `Resultados (${filteredPosts.length})` : 'Mais Artigos'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(searchMain || activeCategory !== 'Todos' ? filteredPosts : regularPosts).map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border overflow-hidden group transition-shadow hover:shadow-md"
                        style={{ borderColor: '#e4e7ed' }}
                      >
                        <div
                          className="aspect-video"
                          style={{ backgroundImage: `url(${post.image || post.cover_image_url || post.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        />
                        <div className="p-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(122,98,7,0.1)', color: post.categoryColor || COPPER }}>
                            {post.category}
                          </span>
                          <h3
                            className="font-bold mt-2 line-clamp-2 group-hover:text-accent transition-colors"
                            style={{ fontSize: '0.85rem', color: NAVY, fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {post.title}
                          </h3>
                          <p className="text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: '#6b7280', fontWeight: 300 }}>{post.excerpt}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px]" style={{ color: '#94a3b8' }}>{post.date} · {post.readTime || post.read_time_minutes || 7} min</span>
                            <span className="text-[10px] font-semibold group-hover:underline" style={{ color: COPPER }}>Ler →</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── SANFONA: Ver todos os artigos (26 posts do Supabase) ── */}
            <div className="mb-10 mt-2">
              <button
                onClick={() => { setShowAllPosts(v => !v); setAllPostsPage(1); }}
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border font-semibold text-sm transition-all"
                style={{
                  borderColor: showAllPosts ? NAVY : '#e4e7ed',
                  background: showAllPosts ? NAVY : 'transparent',
                  color: showAllPosts ? 'white' : NAVY,
                }}
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={16} />
                  {supabaseLoading ? 'Carregando artigos...' : `Ver todos os ${supabasePosts?.length || 26} artigos publicados`}
                </span>
                <ChevronRight size={16} className="transition-transform" style={{ transform: showAllPosts ? 'rotate(90deg)' : 'rotate(0deg)' }} />
              </button>

              {showAllPosts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 rounded-2xl border overflow-hidden"
                  style={{ borderColor: '#e4e7ed' }}
                >
                  {/* Busca */}
                  <div className="p-4 border-b" style={{ borderColor: '#e4e7ed', background: '#f8fafc' }}>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                      <input
                        type="text"
                        placeholder="Buscar em todos os artigos..."
                        value={allPostsSearch}
                        onChange={e => { setAllPostsSearch(e.target.value); setAllPostsPage(1); }}
                        className="w-full pl-8 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2"
                        style={{ borderColor: '#e4e7ed', '--tw-ring-color': COPPER } as React.CSSProperties}
                      />
                    </div>
                  </div>

                  {/* Lista de posts */}
                  {(() => {
                    const sourcePosts: BlogPost[] = (supabasePosts && supabasePosts.length > 0 ? supabasePosts : STATIC_POSTS) as unknown as BlogPost[];
                    const searched = allPostsSearch
                      ? sourcePosts.filter(p =>
                          p.title?.toLowerCase().includes(allPostsSearch.toLowerCase()) ||
                          p.excerpt?.toLowerCase().includes(allPostsSearch.toLowerCase()) ||
                          (Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(allPostsSearch.toLowerCase())))
                        )
                      : sourcePosts;
                    const totalPages = Math.ceil(searched.length / ALL_POSTS_PER_PAGE);
                    const paginated = searched.slice((allPostsPage - 1) * ALL_POSTS_PER_PAGE, allPostsPage * ALL_POSTS_PER_PAGE);

                    return (
                      <>
                        <div>
                          {paginated.map((post, i) => (
                            <Link
                              key={post.id || post.slug}
                              to={`/blog/${post.slug}`}
                              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                              className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition-colors group"
                              style={{ borderColor: '#f1f5f9' }}
                            >
                              <span className="text-xs font-bold mt-0.5 w-5 text-center flex-shrink-0" style={{ color: '#94a3b8' }}>{(allPostsPage - 1) * ALL_POSTS_PER_PAGE + i + 1}</span>
                              <div className="flex-1 min-w-0">
                                <span
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-full mr-2"
                                  style={{ background: 'rgba(122,98,7,0.1)', color: COPPER }}
                                >
                                  {post.category}
                                </span>
                                <p className="text-sm font-semibold mt-1 group-hover:text-accent transition-colors leading-snug" style={{ color: NAVY }}>{post.title}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{post.date || (post.published_at ? post.published_at.split('T')[0] : '')} · {post.readTime || post.read_time_minutes || 8} min leitura</p>
                              </div>
                              <ChevronRight size={14} className="flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" style={{ color: COPPER }} />
                            </Link>
                          ))}
                        </div>
                        {/* Paginação */}
                        {totalPages > 1 && (
                          <div className="flex items-center justify-between px-4 py-3" style={{ background: '#f8fafc' }}>
                            <span className="text-xs" style={{ color: '#94a3b8' }}>{searched.length} artigos · Página {allPostsPage} de {totalPages}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setAllPostsPage(p => Math.max(1, p - 1))}
                                disabled={allPostsPage === 1}
                                className="px-3 py-1 rounded-lg text-xs font-semibold disabled:opacity-30 transition"
                                style={{ background: NAVY, color: 'white' }}
                              >← Anterior</button>
                              <button
                                onClick={() => setAllPostsPage(p => Math.min(totalPages, p + 1))}
                                disabled={allPostsPage === totalPages}
                                className="px-3 py-1 rounded-lg text-xs font-semibold disabled:opacity-30 transition"
                                style={{ background: NAVY, color: 'white' }}
                              >Próxima →</button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </div>

            {/* Parallax banner */}
            <ParallaxBanner />

            {/* ── COMING UP — Agenda de Eventos ── */}
            <div id="coming-up" className="mt-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px flex-1 max-w-[24px]" style={{ background: COPPER }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: COPPER }}>Agenda</span>
              </div>
              <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="font-black" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: NAVY }}>
                    Coming Up — Eventos de IA
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#6b7280', fontWeight: 300 }}>Os melhores eventos de IA no Brasil e no mundo para ficar por dentro.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} style={{ color: COPPER }} />
                  <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>{AI_EVENTS.length} eventos · 2026</span>
                </div>
              </div>

              {/* Filtros de eventos */}
              <div className="flex flex-wrap gap-2 mb-5">
                {EVENT_FILTERS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setEventFilter(f.value)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
                    style={{
                      background: eventFilter === f.value ? NAVY : 'transparent',
                      color: eventFilter === f.value ? 'white' : '#6b7280',
                      border: `1px solid ${eventFilter === f.value ? NAVY : '#e4e7ed'}`,
                    }}
                  >
                    {f.label}
                  </button>
                ))}
                <div className="relative ml-auto">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Buscar evento..."
                    value={eventSearch}
                    onChange={(e) => setEventSearch(e.target.value)}
                    className="pl-7 pr-3 py-1.5 rounded-full border text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                    style={{ borderColor: '#e4e7ed', minWidth: 160 }}
                  />
                </div>
              </div>

              {/* Próximos eventos */}
              {upcomingEvents.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={14} style={{ color: COPPER }} />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: NAVY }}>Próximos Eventos ({upcomingEvents.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
                  </div>
                </div>
              )}

              {/* Eventos passados */}
              {pastEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} style={{ color: '#94a3b8' }} />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>Já Aconteceram ({pastEvents.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastEvents.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
                  </div>
                </div>
              )}

              {filteredEvents.length === 0 && (
                <div className="text-center py-12 rounded-2xl border" style={{ borderColor: '#e4e7ed', borderStyle: 'dashed' }}>
                  <Search size={28} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-semibold" style={{ color: '#6b7280' }}>Nenhum evento encontrado</p>
                  <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Tente outro filtro ou termo de busca</p>
                </div>
              )}

              {/* CTA Recognise */}
              <div className="mt-10 rounded-2xl p-6 md:p-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2040 100%)` }}>
                <p className="font-black mb-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontFamily: 'Montserrat, sans-serif' }}>
                  Quer participar ao lado de Tom Queiroz?
                </p>
                <p className="text-white/60 text-sm mb-5" style={{ fontWeight: 300 }}>
                  A Recognise marca presença nos principais eventos de IA do Brasil e do mundo. Fale com a equipe para saber sobre próximas participações e eventos exclusivos.
                </p>
                <a
                  href="https://wa.me/5511915513210?text=Quero%20saber%20sobre%20eventos%20com%20Tom%20Queiroz"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: COPPER, color: 'white' }}
                >
                  <Users size={15} /> Falar com a equipe
                </a>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
