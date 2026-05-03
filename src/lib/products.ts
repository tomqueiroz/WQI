import { IMAGES } from "@/assets/images";

export interface ProductData {
  id: string;
  title: string;
  category: string;
  table: string;
  heroImage: string;
  tagline: string;
  description: string;
  topics: string[];
  tags: string[];
  duration: string;
  format: string;
  benefits?: string[];
  target: string;
  objectives: string[];
  metrics: string;
  link?: string;
  cohort_info: {
    next: string;
    spots: number | null;
  } | null;
}

export const PRODUCTS_DATA: ProductData[] = [
  {
    id: "mentoria-1on1",
    title: "Mentoria Executiva 1:1",
    category: "mentoria",
    table: "mentoria_1on1_leads",
    heroImage: IMAGES.TOM_PROFILE_ALT,
    tagline: "A aceleração mais rara: atenção total de quem já navegou até onde você quer chegar.",
    description: "Não existe atalho. Mas existe o caminho certo — percorrido com quem já mapeou cada obstáculo. Nossa Mentoria 1:1 é um compromisso de transformação: personalizado em cada detalhe, rigoroso em cada entrega, e construído inteiramente ao redor do seu momento, do seu mercado e dos seus objetivos.",
    topics: [
      "Executive Presence & Personal Brand",
      "AI-First Decision Making",
      "Career Architecture for Senior Leaders",
      "Stakeholder Influence & Organizational Politics",
      "Data-Driven Growth Strategy"
    ],
    tags: ["C-Suite", "Founders", "Senior VPs", "100% Personalizado"],
    duration: "3–12 meses",
    format: "Sessões individuais + async support",
    target: "Executivos sênior, fundadores e líderes que buscam o próximo patamar de impacto",
    objectives: [
      "Clareza estratégica de carreira",
      "Autoridade e presença executiva",
      "Adoção de IA no processo decisório",
      "Ampliação de network estratégico"
    ],
    metrics: "Líderes reportam média de +40% em clareza estratégica após 90 dias",
    link: '/programas/mentoria-1on1',
    cohort_info: null
  },
  {
    id: "cohort-program",
    title: "Programa de Cohort Executivo",
    category: "cohort",
    table: "mentoria_cohort_leads",
    heroImage: IMAGES.PARALLAX_EXECUTIVE,
    tagline: "Sua maior vantagem competitiva pode estar sentada ao seu lado.",
    description: "Os melhores líderes do mundo não aprendem sozinhos. Aprendem em comunidade — com pares que os desafiam, parceiros que os expandem e um mentor que os orienta. O Cohort Executivo reúne 8 a 12 líderes cuidadosamente selecionados em uma jornada de 6 meses de aprendizado coletivo, accountability e crescimento acelerado.",
    topics: [
      "Go-To-Market Strategy in the AI Era",
      "Digital Revenue Architecture",
      "Leading High-Performance Teams",
      "Executive Communication & Influence",
      "Innovation Sprint Methodology"
    ],
    tags: ["Turmas Fechadas", "8–12 Executivos", "Peer Learning", "6 Meses"],
    duration: "6 meses",
    format: "Sessões semanais ao vivo + peer groups + mentor office hours",
    target: "Líderes de marketing, estratégia e inovação buscando crescimento acelerado com pares de alto calibre",
    objectives: [
      "Visão estratégica ampliada",
      "Rede de executivos de alto nível",
      "Accountability estruturado",
      "Capacidade de liderança em ambientes de incerteza"
    ],
    metrics: "Taxa de promoção 2.3x maior em 12 meses pós-programa",
    link: '/programas/cohort',
    cohort_info: {
      next: "Agosto 2026",
      spots: 3
    }
  },
  {
    id: "inhouse",
    title: "In-Company Transformation",
    category: "inhouse",
    table: "inhouse_leads",
    heroImage: IMAGES.PARALLAX_AI_MARKETING,
    tagline: "A transformação mais eficaz começa dentro de casa.",
    description: "Quando o conhecimento chega até o seu time — no contexto do seu negócio, com a linguagem da sua cultura e a urgência dos seus desafios — a mudança acontece de verdade. O programa In-Company leva metodologias de classe mundial para dentro da sua organização, com total personalização de conteúdo, formato e cadência.",
    topics: [
      "Digital Culture & AI Adoption Roadmap",
      "Marketing Performance & Growth Architecture",
      "Data Literacy for Leadership Teams",
      "Customer Experience in the AI Era",
      "Organizational Innovation Sprints"
    ],
    tags: ["Empresas", "Times de 5–500", "Diagnóstico Incluído", "Resultados Mensuráveis"],
    duration: "Personalizado (4–16 semanas)",
    format: "Workshops presenciais + sprints + follow-up executivo",
    target: "Empresas que buscam elevar a maturidade digital de liderança e times de marketing",
    objectives: [
      "Adoção acelerada de IA nos processos",
      "Alinhamento estratégico entre liderança e execução",
      "Cultura de dados e decisão baseada em evidências",
      "ROI mensurável em 90 dias"
    ],
    metrics: "Média de +35% em performance de marketing digital em 90 dias",
    link: '/programas/inhouse',
    cohort_info: null
  },
  {
    id: "masterclass-ai",
    title: "MasterClass: AI-First Marketing",
    category: "masterclass",
    table: "masterclass_ai_leads",
    heroImage: IMAGES.PARALLAX_HOLOGRAPHIC,
    tagline: "Da estratégia ao pipeline. IA gerando resultados reais, hoje.",
    description: "8 horas que redefinirão a forma como você pensa sobre marketing. A MasterClass AI-First é uma imersão intensiva para líderes que querem dominar as ferramentas, metodologias e frameworks que estão redefinindo a indústria — com casos reais, implementação prática e a orientação de quem já aplicou em escala nos maiores players do mercado.",
    topics: [
      "Generative AI Strategy for Marketing Leaders",
      "Prompt Engineering & Content Automation",
      "AI-Driven Analytics & Attribution Modeling",
      "Predictive Lead Scoring & Personalization",
      "Automation Workflows: HubSpot, Make, n8n"
    ],
    tags: ["Online Ao Vivo", "8h Intensivo", "Certificado WQI", "Acesso Gravação"],
    duration: "8 horas",
    format: "Online ao vivo com Q&A + gravação + material exclusivo",
    target: "Gerentes, diretores e VPs de marketing que precisam dominar IA aplicada com urgência",
    objectives: [
      "Domínio das principais ferramentas de IA para marketing",
      "Framework próprio de AI-First Strategy",
      "Implementação imediata no dia seguinte ao curso",
      "Certificação reconhecida pelo mercado"
    ],
    metrics: "93% dos participantes aplicam ao menos 3 ferramentas na semana seguinte",
    link: '/programas/masterclass-ai',
    cohort_info: {
      next: "Junho 2026",
      spots: 50
    }
  },
  {
    id: "keynote",
    title: "Keynotes & Palestras Executivas",
    category: "evento",
    table: "keynote_leads",
    heroImage: IMAGES.TOM_HERO_BG,
    tagline: "Insights que movem platéias. Ideias que transformam organizações.",
    description: "Uma palestra memorável não informa — ela muda perspectivas. Com mais de 200 palestras em fóruns executivos, summits corporativos e eventos internacionais, Wellington Queiroz traz uma combinação rara: profundidade analítica, dados atuais e narrativa que engaja do CEO ao analista. Conteúdo customizado para o contexto e urgências da sua audiência.",
    topics: [
      "AI First Era & The Future of Work",
      "Digital Marketing in 2030: What Leaders Must Know",
      "Leading Transformational Change in Disrupted Markets",
      "The CMO of the Future: Data, AI & Human Judgment",
      "Building a Culture of Continuous Innovation"
    ],
    tags: ["Presencial ou Remoto", "Conteúdo Customizado", "60–90 min", "200+ Palestras Realizadas"],
    duration: "60–90 minutos",
    format: "Keynote + Q&A executivo + briefing pré-evento",
    target: "Eventos corporativos, summits de liderança, conferências de marketing e inovação",
    objectives: [
      "Inspirar e provocar reflexão estratégica",
      "Entregar frameworks aplicáveis imediatamente",
      "Elevar o nível do debate sobre IA e transformação digital",
      "Criar momentos memoráveis que ecoam além do evento"
    ],
    metrics: "NPS médio de 94 em eventos realizados",
    link: '/programas/keynote',
    cohort_info: null
  },
  {
    id: "cursos-digitais",
    title: "Cursos & Conteúdo Digital",
    category: "digital",
    table: "digital_course_leads",
    heroImage: IMAGES.PARALLAX_HUMAN_ROBOT,
    tagline: "Conhecimento de elite. No seu ritmo. No seu tempo.",
    description: "O acesso ao conhecimento de alto padrão nunca deveria depender de agenda ou fuso horário. Nosso ecossistema de cursos digitais reúne décadas de experiência prática em módulos estruturados, progressivos e aplicáveis — com suporte de comunidade, projetos reais e certificação reconhecida pelo mercado.",
    topics: [
      "Marketing Digital Avançado: Da Estratégia à Execução",
      "Analytics & BI para Líderes de Marketing",
      "Estratégia de Conteúdo com IA Generativa",
      "Performance & Growth Hacking na Prática",
      "LinkedIn para Executivos: Autoridade e Geração de Leads"
    ],
    tags: ["Self-Paced", "Certificado WQI", "LMS Exclusivo", "Acesso Vitalício"],
    duration: "Acesso vitalício",
    format: "Videoaulas + projetos práticos + comunidade + LMS exclusivo",
    target: "Profissionais e líderes de marketing em todos os estágios de carreira",
    objectives: [
      "Domínio prático das principais disciplinas de marketing digital",
      "Implementação imediata com projetos do mundo real",
      "Certificação que diferencia no mercado",
      "Acesso à comunidade de praticantes"
    ],
    metrics: "4.9/5 de satisfação média. 89% completam os cursos.",
    link: '/programas/cursos-digitais',
    cohort_info: {
      next: "Disponível agora",
      spots: null
    }
  }
];

export type ProductCategory = "mentoria" | "cohort" | "inhouse" | "masterclass" | "evento" | "digital";
