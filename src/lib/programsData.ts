import { IMAGES } from '@/assets/images';

// ============================================================
// GLOBAL STATISTICS — cited from official sources
// Used across all program pages for credibility
// ============================================================
export const GLOBAL_STATS = {
  aiProjectFailure: {
    value: '95%',
    label: 'dos projetos de IA empresariais falham antes de gerar ROI',
    source: 'MIT Media Lab / Forbes, 2025',
  },
  genAiFailure: {
    value: '50%',
    label: 'dos projetos de IA Generativa são abandonados após o POC',
    source: 'Gartner, Jan 2026',
  },
  ceoNoRoi: {
    value: '56%',
    label: 'dos CEOs afirmam não ter obtido nenhum retorno de seus investimentos em IA',
    source: 'PwC Global CEO Survey, 2026 — 4.454 CEOs em 95 países',
  },
  aiFluentyDemand: {
    value: '7x',
    label: 'de crescimento na demanda por profissionais com fluência em IA em 2 anos (2023–2025)',
    source: 'McKinsey State of AI, 2025',
  },
  skillsChange: {
    value: '39%',
    label: 'das habilidades-chave no mercado de trabalho vão mudar até 2030',
    source: 'WEF Future of Jobs Report, 2025',
  },
  aiEconomicValue: {
    value: 'US$ 4,4 tri',
    label: 'em potencial de produtividade adicional gerado pela IA Generativa',
    source: 'McKinsey Global Institute, 2025',
  },
  productivityGain: {
    value: '26–55%',
    label: 'de ganho de produtividade com adoção de IA em empresas maduras',
    source: 'Fullview.io / McKinsey AI Enterprise Report, 2025',
  },
  aiInvestmentGrowing: {
    value: '92%',
    label: 'das empresas estão aumentando investimentos em IA — mas apenas 1% atingiu escala real',
    source: 'McKinsey, 2025',
  },
  aiMaturiy: {
    value: '9%',
    label: 'das organizações com uso de IA atingiram maturidade real em seus processos',
    source: 'Gloat AI Skills Demand Report, 2026',
  },
};

// ============================================================
// BRAZIL SPECIFIC CONTEXT
// ============================================================
export const BRAZIL_CONTEXT = {
  talentGap: {
    value: '98%',
    label: 'das médias e grandes empresas brasileiras relatam dificuldade em contratar talentos em tecnologia e IA',
    source: 'Forbes Brasil / Ford-Datafolha, Abr 2026',
  },
  aiSpecialists: {
    value: '35%',
    label: 'das vagas mais difíceis de preencher são de especialistas em IA',
    source: 'Forbes Brasil / Ford-Datafolha, 2026',
  },
  itSkillsGap: {
    value: '90%',
    label: 'das empresas globais enfrentarão escassez crítica de habilidades em IA até 2026',
    source: 'Iternal AI Skills Gap Report, Abr 2026',
  },
  insead: {
    value: 'Risco real',
    label: 'O Brasil pode ser "deixado para trás" na era da IA por baixo índice de atração de talentos globais e desenvolvimento de competências técnicas',
    source: 'INSEAD Global Talent Competitiveness Index, Set 2025',
  },
};

// ============================================================
// SWOT — Opportunities mapped from top university programs
// MIT Sloan, HBS, Kellogg, Wharton, INSEAD, Stanford GSB, LBS
// ============================================================
export const SWOT_OPPORTUNITIES = [
  {
    theme: 'AI Strategy & Business Value',
    kpp: 'Executivos não sabem como vincular IA a resultados de negócio (ROI)',
    source: 'MIT Sloan AI: Implications for Business Strategy',
    module: 'AI Business Value Mapping™',
  },
  {
    theme: 'Generative AI for Decision Making',
    kpp: 'Líderes usam GenAI superficialmente, sem explorar seu potencial estratégico',
    source: 'HBS Online AI for Leaders / Harvard DPE AI Strategy',
    module: 'GenAI Decision Intelligence',
  },
  {
    theme: 'AI Governance & Ethics',
    kpp: 'Empresas implementam IA sem framework de governança, gerando risco e retrabalho',
    source: 'Wharton Leadership in AI and Analytics — Módulo "Legal, Ethical and Business Responsibilities"',
    module: 'AI Governance Framework',
  },
  {
    theme: 'Data Readiness & AI Infrastructure',
    kpp: '50% dos projetos GenAI falham por dados não preparados (Gartner)',
    source: 'Kellogg AI Strategies for Business Transformation',
    module: 'Data Readiness & AI Infrastructure Assessment',
  },
  {
    theme: 'AI-First Operations & Process Redesign',
    kpp: 'Processos operacionais não foram redesenhados para operar com IA',
    source: 'INSEAD AI for Business / Transforming Business with AI',
    module: 'AI-First Process Redesign',
  },
  {
    theme: 'Change Management & AI Culture',
    kpp: 'Resistência cultural e falta de gestão de mudança travam adoção de IA',
    source: 'Stanford GSB (30 courses on AI ethics and culture)',
    module: 'AI Change Leadership & Culture',
  },
  {
    theme: 'AI Talent Strategy & Development',
    kpp: 'Escassez de talentos com habilidades em IA — 98% das empresas no Brasil afetadas',
    source: 'MIT Executive Academy + Kellogg AI Senior Management Program',
    module: 'AI Talent Architecture & Upskilling',
  },
  {
    theme: 'Agentic AI & Automation',
    kpp: 'Executivos não entendem IA Agêntica e perdem oportunidades de automação avançada',
    source: 'Kellogg AI Strategies (Gen AI + Agentic AI insights)',
    module: 'Agentic AI for Business Leaders',
  },
  {
    theme: 'AI Marketing & Customer Intelligence',
    kpp: 'Marketing perde vantagem competitiva por não usar AI para personalização em escala',
    source: 'Wharton AI in Marketing + HBS Digital Strategy',
    module: 'AI-First Marketing & CX Intelligence',
  },
  {
    theme: 'AI ROI Measurement & Reporting',
    kpp: 'Empresas investem em IA mas não sabem medir ou comunicar resultados ao board',
    source: 'LBS AI Programme + PwC AI ROI Framework',
    module: 'AI ROI Measurement & Board Communication',
  },
];

// ============================================================
// INDIVIDUAL PROGRAMS DATA
// ============================================================
export interface ProgramModule {
  number: string;
  title: string;
  duration: string;
  topics: string[];
  benchmark?: string;
}

export interface IndividualProgram {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  badge: string;
  description: string;
  targetTitle: string;
  targetProfiles: string[];
  challenge: string;
  challengeStats: { value: string; label: string; source: string }[];
  methodologyTitle: string;
  methodologyDesc: string;
  methodologyPoints: string[];
  modules: ProgramModule[];
  outcomes: { metric: string; desc: string }[];
  format: string;
  duration: string;
  investment: string;
  nextEdition: string;
  tableName: string;
}

export const INDIVIDUAL_PROGRAMS_DATA: Record<string, IndividualProgram> = {
  mentoria1on1: {
    id: 'mentoria1on1',
    slug: '/programas/mentoria-1on1',
    title: 'Mentoria Executiva 1:1',
    tagline: 'Seu mapa personalizado para a Liderança AI First™',
    heroImage: IMAGES.CORP_AI_TRAIN_1,
    badge: 'PROGRAMA EXCLUSIVO · VAGAS LIMITADAS',
    description:
      'O único programa de mentoria executiva no Brasil construído sobre a metodologia AI-First Framework™, desenvolvida a partir de 500+ casos reais e calibrada contra os melhores programas do MIT Sloan, Harvard HBS e Kellogg. Cada jornada começa com um diagnóstico profundo do seu perfil, contexto e gaps — e se transforma em um plano de ação personalizado, único e executável.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'CEOs, CFOs, CMOs, CTOs e C-suite em transição para uma liderança AI First',
      'Diretores e VPs que precisam liderar transformações digitais com IA em suas áreas',
      'Executivos que investiram em IA mas não estão obtendo ROI mensurável',
      'Líderes que querem dominar GenAI sem virar técnicos — apenas estrategistas de elite',
      'Profissionais em busca de aceleração de carreira em posições que exigem fluência em IA',
    ],
    challenge:
      'O mercado já chegou onde a maioria dos executivos ainda não chegou. A demanda por fluência em IA cresceu 7x em dois anos (McKinsey, 2025). Enquanto 92% das empresas aumentam investimentos em IA, apenas 1% chegou a escala real — e a diferença está na liderança, não na tecnologia.',
    challengeStats: [
      GLOBAL_STATS.aiFluentyDemand,
      GLOBAL_STATS.ceoNoRoi,
      GLOBAL_STATS.skillsChange,
      GLOBAL_STATS.aiEconomicValue,
    ],
    methodologyTitle: 'AI-First Framework™ — Metodologia Exclusiva',
    methodologyDesc:
      'Desenvolvida com base em 500+ casos reais e alinhada ao que os melhores programas executivos do mundo ensinam — MIT Sloan, HBS, Kellogg, Wharton — mas com uma diferença fundamental: é personalizada para a sua realidade, seu setor, sua equipe e seus objetivos.',
    methodologyPoints: [
      'Diagnóstico de Maturidade AI First™ — mapeamento do seu gap real de liderança',
      'AI Business Value Mapping™ — vinculação de iniciativas de IA a resultados de negócio',
      'Roteiro de 90 dias com marcos mensuráveis e checkpoints de ROI',
      'Sessões de Role Play Executivo com simulações de decisão estratégica com IA',
      'Acesso ao Vault de Casos Reais — 500+ estudos de caso de transformação com IA',
      'Peer review e accountability bimestral com relatório de progresso',
    ],
    modules: [
      {
        number: '01',
        title: 'Diagnóstico e Mapeamento AI First',
        duration: '2 sessões · 2h cada',
        topics: ['Avaliação de maturidade digital', 'Mapeamento de gaps de liderança em IA', 'Definição de objetivos e KPIs do programa', 'Análise de contexto setorial'],
        benchmark: 'Inspirado no MIT AI Readiness Assessment',
      },
      {
        number: '02',
        title: 'AI Strategy for Business Leaders',
        duration: '3 sessões · 2h cada',
        topics: ['Fundamentos estratégicos de IA (sem código)', 'Como construir um business case de IA', 'AI ROI Measurement Framework', 'Machine learning e GenAI para tomada de decisão'],
        benchmark: 'Baseado em MIT Sloan + HBS AI for Leaders',
      },
      {
        number: '03',
        title: 'Generative AI & Decision Intelligence',
        duration: '2 sessões · 2h cada',
        topics: ['Large Language Models para executivos', 'GenAI aplicado à sua função e setor', 'Prompt Engineering Executivo', 'Casos práticos com TESS AI e ferramentas de ponta'],
        benchmark: 'HBS Leading with Generative AI + Kellogg GenAI insights',
      },
      {
        number: '04',
        title: 'AI Governance, Ethics & Risk',
        duration: '1 sessão · 2h',
        topics: ['Framework de governança de IA para líderes', 'Responsabilidades legais e éticas', 'Gestão de risco em projetos de IA', 'Como comunicar IA ao board e stakeholders'],
        benchmark: 'Wharton AI Legal & Ethical Responsibilities Module',
      },
      {
        number: '05',
        title: 'AI-First Operations & Change Leadership',
        duration: '2 sessões · 2h cada',
        topics: ['Redesenho de processos com IA', 'Gestão da mudança e cultura AI First', 'Como liderar equipes na transição para IA', 'AI Talent Strategy para sua área'],
        benchmark: 'INSEAD AI for Business + Stanford GSB AI Culture',
      },
      {
        number: '06',
        title: 'Plano de Execução e Accountability',
        duration: '2 sessões · 2h cada',
        topics: ['Construção do roadmap AI First 12 meses', 'Definição de quick wins e métricas', 'Plano de comunicação interna', 'Sessão de revisão e próximos passos'],
        benchmark: 'McKinsey Executive Accountability Framework',
      },
    ],
    outcomes: [
      { metric: '12 sessões', desc: 'de 2h cada, totalmente personalizadas ao seu contexto' },
      { metric: '90 dias', desc: 'para ter um roadmap AI First executável na sua organização' },
      { metric: '500+ casos', desc: 'de transformação real disponíveis no Vault exclusivo' },
      { metric: 'ROI garantido', desc: 'ou extensão do programa sem custo adicional' },
    ],
    format: 'Online ao vivo (Zoom) ou presencial em São Paulo',
    duration: '12 sessões de 2h ao longo de 4–6 meses',
    investment: 'Personalizado por perfil e objetivos — solicite proposta',
    nextEdition: 'Início imediato · Vagas limitadas',
    tableName: 'mentoria_1on1_leads',
  },

  cohort: {
    id: 'cohort',
    slug: '/programas/cohort',
    title: 'Cohort AI First Leadership',
    tagline: '8 semanas para você e seus pares dominarem a Liderança AI First™',
    heroImage: IMAGES.PROG_COHORT_1,
    badge: 'PROGRAMA EM GRUPO · TURMAS FECHADAS',
    description:
      'Um programa intensivo de 8 semanas em formato cohort — inspirado nos melhores modelos de Kellogg, HBS e INSEAD — para executivos que querem aprender com pares de mesmo nível. Combina aulas ao vivo, estudos de caso reais, sessões de peer coaching e um projeto capstone de transformação AI First em sua organização.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Grupos de 8 a 20 executivos de nível sênior (Diretores, VPs, C-suite)',
      'Líderes que valorizam o aprendizado com pares de diferentes setores',
      'Profissionais que precisam de um programa estruturado com entregáveis claros',
      'Times executivos que querem alinhar visão de IA dentro da organização',
      'Executivos que buscam networking qualificado e comunidade permanente',
    ],
    challenge:
      'Gartner (2026) mostra que 50% dos projetos de IA Generativa são abandonados após o POC. A principal causa: ausência de lideranças capacitadas para sustentar a transformação. O problema não é tecnológico — é de liderança e cultura.',
    challengeStats: [
      GLOBAL_STATS.genAiFailure,
      GLOBAL_STATS.aiProjectFailure,
      GLOBAL_STATS.aiMaturiy,
      BRAZIL_CONTEXT.talentGap,
    ],
    methodologyTitle: 'Metodologia Cohort AI First™',
    methodologyDesc:
      'Inspirada no modelo Kellogg "Leading with AI" e no HBS Cohort Learning, combina o rigor acadêmico das melhores universidades com a praticidade de quem já transformou operações reais com IA.',
    methodologyPoints: [
      '8 módulos semanais ao vivo com Tom Queiroz e especialistas convidados',
      'Estudos de caso reais do Brasil e do mundo — discussão em grupo Kellogg-style',
      'Peer coaching sessions: aprendizado horizontal entre executivos',
      'Projeto capstone: cada participante entrega um AI First Roadmap para sua organização',
      'Acesso a comunidade exclusiva de alumni por 12 meses após o programa',
      'Certificado Recognise AI First Leadership — reconhecido pelo mercado',
    ],
    modules: [
      { number: '01', title: 'AI First Mindset & Business Context', duration: '1 semana · 4h', topics: ['O que separa líderes AI First dos demais', 'Contexto global e brasileiro da IA', 'Estatísticas e impacto no seu setor', 'Diagnóstico individual de maturidade'], benchmark: 'MIT Sloan AI Implications + HBS AI for Leaders Week 1' },
      { number: '02', title: 'AI Strategy & Value Creation', duration: '1 semana · 4h', topics: ['Frameworks de estratégia em IA', 'Como identificar oportunidades de alto valor', 'AI Business Case — estrutura e argumentação', 'Case: Como Amazon, Google e Apple lideram com IA'], benchmark: 'Kellogg AI Strategies Module 2' },
      { number: '03', title: 'Generative AI for Executives', duration: '1 semana · 4h', topics: ['LLMs, RAG e Agentes de IA desmistificados', 'GenAI aplicado por função (Marketing, Ops, Finance, HR)', 'Hands-on com TESS AI e principais ferramentas', 'Oportunidades e riscos do uso corporativo de GenAI'], benchmark: 'HBS Leading with Generative AI + Kellogg GenAI & Agentic AI' },
      { number: '04', title: 'Data Readiness & AI Infrastructure', duration: '1 semana · 4h', topics: ['Por que 50% dos projetos GenAI falham (dados!)', 'Como avaliar a maturidade de dados da sua org', 'Construindo a infraestrutura de dados para IA', 'Decisões de build vs. buy em IA'], benchmark: 'Gartner GenAI failure analysis + Kellogg Data Module' },
      { number: '05', title: 'AI Governance & Ethics', duration: '1 semana · 4h', topics: ['Framework de Governança AI para o Board', 'LGPD, EU AI Act e regulação global', 'Gestão de risco e responsabilidade em IA', 'Comunicando IA com ética para stakeholders'], benchmark: 'Wharton AI Legal & Ethics + Stanford GSB AI Governance' },
      { number: '06', title: 'AI-First Operations & Process Design', duration: '1 semana · 4h', topics: ['Redesenhando processos para operar com IA', 'Automação inteligente: de RPA a Agentes Autônomos', 'Mapeamento de fluxos AI-ready', 'Case: transformações operacionais reais com IA'], benchmark: 'INSEAD AI for Business Operations Module' },
      { number: '07', title: 'Change Leadership & AI Culture', duration: '1 semana · 4h', topics: ['Como liderar a mudança cultural para IA', 'Frameworks de gestão de resistência', 'Construindo times AI First', 'Comunicação interna da estratégia de IA'], benchmark: 'Stanford GSB AI Culture + LBS Change Leadership' },
      { number: '08', title: 'Capstone: AI First Roadmap 12 Meses', duration: '1 semana · 4h + apresentação', topics: ['Consolidação do plano AI First individual', 'Apresentação para peers (banca executiva)', 'Feedback coletivo e plano de ação', 'Celebração, certificação e comunidade alumni'], benchmark: 'Kellogg Capstone Project + MIT AI Executive Academy' },
    ],
    outcomes: [
      { metric: '8 semanas', desc: 'de imersão intensiva com pares de alto nível' },
      { metric: '1 Roadmap', desc: 'AI First completo e apresentado ao grupo' },
      { metric: '12 meses', desc: 'de acesso à comunidade alumni exclusiva' },
      { metric: '500+ casos', desc: 'de transformação real discutidos em grupo' },
    ],
    format: 'Online ao vivo (Zoom) — Sextas-feiras 8h–12h',
    duration: '8 semanas · 4h/semana + projeto capstone',
    investment: 'Por vaga — turmas fechadas · Solicite proposta',
    nextEdition: 'Próxima turma: consulte disponibilidade',
    tableName: 'mentoria_cohort_leads',
  },

  inhouse: {
    id: 'inhouse',
    slug: '/programas/in-house',
    title: 'In-House AI First Training',
    tagline: 'Transformação AI First customizada para o seu time executivo',
    heroImage: IMAGES.PROG_INHOUSE_1,
    badge: 'EXCLUSIVO B2B · CUSTOMIZÁVEL',
    description:
      'Programa modular e totalmente customizável para empresas que querem transformar suas lideranças internamente. Do diagnóstico à execução, combinamos o melhor dos programas INSEAD "AI for Business", Wharton "Leadership in AI and Analytics" e Kellogg "Senior Management Program in AI" — adaptados à realidade do mercado brasileiro.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Empresas com times de liderança de 10 a 200+ executivos',
      'CHROs e CLOs que precisam estruturar um programa de AI upskilling',
      'CEOs que querem alinhar toda a liderança em torno de uma visão AI First',
      'Empresas que já investiram em tecnologia de IA mas não veem adoção',
      'Organizações que precisam acelerar a transformação digital com IA',
    ],
    challenge:
      'Enquanto 98% das empresas brasileiras relatam dificuldade em contratar talentos em IA (Forbes/Datafolha 2026), a solução mais eficaz e imediata não é recrutar — é desenvolver as lideranças que você já tem.',
    challengeStats: [
      BRAZIL_CONTEXT.talentGap,
      GLOBAL_STATS.aiProjectFailure,
      GLOBAL_STATS.aiInvestmentGrowing,
      GLOBAL_STATS.productivityGain,
    ],
    methodologyTitle: 'Programa Modular AI First™ In-House',
    methodologyDesc:
      'Cada programa começa com um diagnóstico organizacional de maturidade AI First, que gera um mapa personalizado de módulos, carga horária e metodologia para o perfil e setor da sua empresa.',
    methodologyPoints: [
      'Diagnóstico organizacional de maturidade AI First (pré-programa)',
      'Módulos selecionados por função: Marketing, Finance, Ops, HR, Legal, Product',
      'Workshops presenciais e/ou online ao vivo — flexibilidade total',
      'Estudos de caso do setor da empresa e da realidade brasileira',
      'Projeto aplicado: cada time entrega um plano AI First real',
      'Relatório final com recomendações e roadmap organizacional',
    ],
    modules: [
      { number: 'M1', title: 'AI First Foundation', duration: '4h · Todos os níveis', topics: ['O que é IA, GenAI e IA Agêntica para executivos', 'Impacto real no seu setor e função', 'Oportunidades e riscos imediatos', 'Primeiros passos práticos com IA'], benchmark: 'MIT Sloan AI Fundamentals for Executives' },
      { number: 'M2', title: 'AI Strategy & Business Value', duration: '4h · Diretores e C-suite', topics: ['Como construir uma estratégia de IA com ROI', 'AI Business Case para o board', 'Priorização de iniciativas de IA', 'Frameworks de decisão make vs. buy vs. partner'], benchmark: 'HBS Driving Digital & AI Strategy + Kellogg AI Strategies' },
      { number: 'M3', title: 'Generative AI Aplicado', duration: '4h · Todos', topics: ['LLMs e ferramentas de GenAI por função', 'Hands-on: TESS AI, ChatGPT Enterprise, Gemini for Workspace', 'Casos práticos do setor', 'Limites e cuidados no uso corporativo'], benchmark: 'Kellogg AI Strategies Generative AI Module' },
      { number: 'M4', title: 'Data, Governance & Ethics', duration: '4h · Tech, Legal, Finance', topics: ['Data Readiness Assessment', 'LGPD e regulação de IA no Brasil', 'Framework de governança AI', 'Auditoria e accountability em IA'], benchmark: 'Wharton AI Legal & Ethics Module' },
      { number: 'M5', title: 'AI-First Operations', duration: '4h · Ops, Produto, TI', topics: ['Redesenho de processos para IA', 'Automação inteligente e Agentes de IA', 'Integração de IA nos fluxos existentes', 'Métricas de operações AI First'], benchmark: 'INSEAD AI for Business Operations' },
      { number: 'M6', title: 'Change Leadership & AI Culture', duration: '4h · RH, Gestão de Pessoas', topics: ['Gestão de mudança para adoção de IA', 'Construindo cultura AI First', 'Comunicação interna da transformação', 'AI Talent Strategy e retenção'], benchmark: 'Stanford GSB AI Culture + LBS Change Management' },
    ],
    outcomes: [
      { metric: '16–40h', desc: 'de programa modular adaptado ao seu contexto' },
      { metric: '100%', desc: 'customizável por setor, função e nível de maturidade' },
      { metric: '1 roadmap', desc: 'organizacional AI First ao final do programa' },
      { metric: 'Time AI Ready', desc: 'liderança alinhada e capacitada para executar IA' },
    ],
    format: 'Presencial (São Paulo/Brasil) ou Online ao vivo — híbrido disponível',
    duration: '16h a 40h — divididas em módulos flexíveis',
    investment: 'Por número de participantes e módulos — solicite diagnóstico gratuito',
    nextEdition: 'Início mediante diagnóstico organizacional',
    tableName: 'inhouse_leads',
  },

  masterclass: {
    id: 'masterclass',
    slug: '/programas/masterclass',
    title: 'Masterclass AI First™',
    tagline: 'Um dia para transformar sua visão sobre IA nos negócios',
    heroImage: IMAGES.PROG_COHORT_2,
    badge: 'FORMATO INTENSIVO · 1 DIA',
    description:
      'Uma imersão intensiva de 1 dia para executivos que precisam de um ponto de partida claro, rápido e de alto impacto. Inspirada no MIT AI Executive Academy (formato 2 semanas) e nos Stanford GSB Executive Seminars, a Masterclass AI First™ entrega em 8 horas o que muitos programas demoram meses para cobrir — com foco absoluto em aplicação prática.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Executivos que nunca participaram de um programa formal de IA para negócios',
      'Líderes que precisam de uma visão clara antes de investir em programas mais longos',
      'Times de liderança que querem um ponto de partida comum sobre IA',
      'Empreendedores que querem entender como aplicar IA para escalar',
      'Profissionais em posições de tomada de decisão sobre tecnologia e IA',
    ],
    challenge:
      'Deloitte (2026) revela: 66% dos líderes reportam ganhos de produtividade com IA, mas apenas 20% reportam crescimento de receita. A diferença está em saber onde e como aplicar IA — não apenas em usar ferramentas.',
    challengeStats: [
      { value: '66%', label: 'dos líderes reportam ganhos de produtividade com IA, mas só 20% crescimento de receita', source: 'Deloitte State of AI in the Enterprise, 2026' },
      GLOBAL_STATS.ceoNoRoi,
      GLOBAL_STATS.genAiFailure,
      GLOBAL_STATS.skillsChange,
    ],
    methodologyTitle: 'Formato Intensivo AI First™',
    methodologyDesc:
      'Em 8 horas intensas, passamos pelos pilares fundamentais que separam executivos que entregam resultado com IA dos que ficam apenas testando ferramentas.',
    methodologyPoints: [
      'Formato 8h com blocos de 90min e intervalos estratégicos',
      'Cases reais discutidos ao vivo — sem teoria vazia',
      'Hands-on com ferramentas de GenAI selecionadas para executivos',
      'AI Opportunity Map™: cada participante sai com seu mapa de oportunidades',
      'Certificado de participação W-Qi + acesso digital ao material',
      'Opcional: sessão de follow-up individual 30 dias depois',
    ],
    modules: [
      { number: '9h', title: 'AI First Orientation', duration: '90 min', topics: ['O estado atual da IA nos negócios (dados e contexto)', 'O que é real, o que é hype — sem ilusões', 'Como os líderes mais bem-sucedidos estão usando IA', 'Autodiagnóstico rápido de maturidade AI First'], benchmark: 'MIT Sloan AI Orientation Block' },
      { number: '10h30', title: 'GenAI & LLMs para Tomada de Decisão', duration: '90 min', topics: ['Como funciona GenAI (sem código — só estratégia)', 'Casos práticos por função executiva', 'O que fazer e o que não fazer com GenAI', 'Hands-on rápido: prompts executivos de alto impacto'], benchmark: 'HBS AI for Leaders Generative AI Session' },
      { number: '13h', title: 'AI Business Value Mapping™', duration: '90 min', topics: ['Onde IA cria valor real no seu negócio', 'Frameworks de priorização de iniciativas', 'Como construir um business case de IA em 1 página', 'ROI de curto prazo vs. transformação estrutural'], benchmark: 'Kellogg AI Value Creation Framework' },
      { number: '14h30', title: 'AI First Execution Plan', duration: '90 min', topics: ['Como sair do piloto para a escala', 'Os 5 erros que fazem 95% dos projetos falharem', 'Quick Wins: o que fazer nos próximos 30 dias', 'Seu AI Opportunity Map™ personalizado'], benchmark: 'McKinsey AI Execution Playbook' },
    ],
    outcomes: [
      { metric: '1 dia', desc: 'de imersão de alto impacto com Tom Queiroz' },
      { metric: '1 mapa', desc: 'AI Opportunity Map™ personalizado para seu negócio' },
      { metric: 'Quick wins', desc: 'definidos para implementação nos próximos 30 dias' },
      { metric: 'Acesso', desc: 'ao material digital exclusivo por 12 meses' },
    ],
    format: 'Presencial em São Paulo ou Online ao vivo',
    duration: '8h (9h–18h) em formato intensivo',
    investment: 'Individual ou grupo — solicite cotação',
    nextEdition: 'Datas sob demanda — turmas abertas e fechadas',
    tableName: 'masterclass_ai_leads',
  },

  keynote: {
    id: 'keynote',
    slug: '/programas/keynote',
    title: 'Keynote & Palestra Executiva',
    tagline: 'A visão AI First que vai mover sua audiência a agir',
    heroImage: IMAGES.CORP_AI_TRAIN_2,
    badge: 'PALESTRAS & CONFERÊNCIAS',
    description:
      'Tom Queiroz leva para o seu evento, convenção ou congresso uma palestra que combina dados de fontes oficiais globais, casos reais de transformação com IA e uma narrativa executiva que inspira ação imediata. Ideal para eventos corporativos, convenções de liderança, fóruns setoriais e programas de desenvolvimento executivo.',
    targetTitle: 'Para quais eventos?',
    targetProfiles: [
      'Convenções e eventos corporativos de liderança e transformação digital',
      'Congressos e fóruns setoriais (Saúde, Varejo, Financeiro, Educação, Indústria)',
      'Programas de desenvolvimento de lideranças (in-company)',
      'Eventos de startups, inovação e empreendedorismo',
      'Conferências de marketing digital e tecnologia',
    ],
    challenge:
      'O WEF Future of Jobs Report 2025 mostra que 39% das habilidades-chave do mercado vão mudar até 2030. Líderes precisam não apenas de informação — precisam de perspectiva, contexto e um ponto de virada emocional que gera movimento.',
    challengeStats: [
      GLOBAL_STATS.skillsChange,
      GLOBAL_STATS.aiFluentyDemand,
      GLOBAL_STATS.aiEconomicValue,
      { value: '170M', label: 'novos empregos serão criados pela IA até 2030 — e as empresas precisam estar prontas', source: 'WEF Future of Jobs Report, 2025' },
    ],
    methodologyTitle: 'Keynotes de Alto Impacto',
    methodologyDesc:
      'Cada keynote é customizada para o tema, setor e público do evento. Tom Queiroz combina a profundidade de quem implementou IA em operações reais com a capacidade de comunicar de forma clara, envolvente e inspiradora.',
    methodologyPoints: [
      'Conteúdo 100% customizado por setor e perfil de audiência',
      'Dados e fontes oficiais atualizados (WEF, McKinsey, Gartner, PwC)',
      'Narrativa storytelling executivo de alto nível — sem jargão técnico',
      'Casos reais brasileiros e internacionais de transformação com IA',
      'Call to action claro e prático para a audiência',
      'Q&A estruturado e painel de debate disponível',
    ],
    modules: [
      { number: '45min', title: 'Keynote Padrão', duration: '45 minutos', topics: ['Contexto global e brasileiro da IA', 'Os 3 erros que fazem líderes perderem a corrida da IA', 'O que separa empresas AI First das demais', 'Call to action para a audiência'] },
      { number: '75min', title: 'Keynote Extended', duration: '75 minutos', topics: ['Todos os temas do formato 45min', 'Cases detalhados por setor', 'Metodologia AI First Framework™ apresentada', 'Q&A facilitado (20min)'] },
      { number: '90min', title: 'Palestra + Workshop', duration: '90 minutos', topics: ['Keynote completa (45min)', 'Workshop prático de AI Opportunity Mapping (30min)', 'Síntese e plano de ação (15min)', 'Ideal para convenções internas de liderança'] },
      { number: 'Painel', title: 'Mesa-Redonda / Painel', duration: 'Flexível', topics: ['Moderação ou participação em painéis de debate', 'Temas: IA & Liderança, Futuro do Trabalho, IA no Brasil', 'Formato adaptável ao contexto do evento'] },
    ],
    outcomes: [
      { metric: '45–90 min', desc: 'formatos flexíveis para qualquer tipo de evento' },
      { metric: '100%', desc: 'customizado para setor e perfil de audiência' },
      { metric: 'Dados oficiais', desc: 'WEF, McKinsey, Gartner, PwC — credibilidade total' },
      { metric: 'Engajamento', desc: 'audiências que saem com plano de ação, não apenas inspiração' },
    ],
    format: 'Presencial (Brasil e exterior) ou Webinar/Live Online',
    duration: '45min, 75min ou 90min — formatos flexíveis',
    investment: 'Por evento — solicite disponibilidade e proposta',
    nextEdition: 'Agenda sob demanda — disponibilidade limitada',
    tableName: 'keynote_leads',
  },

  cursosDigitais: {
    id: 'cursosDigitais',
    slug: '/programas/cursos-digitais',
    title: 'Cursos Digitais AI First™',
    tagline: 'Aprenda no seu ritmo. Execute no seu mercado.',
    heroImage: IMAGES.CORP_MENTOR_1,
    badge: 'SELF-PACED · ACESSO IMEDIATO',
    description:
      'Cursos online gravados e estruturados para executivos e profissionais que querem aprender IA para negócios no próprio ritmo — sem precisar esperar a próxima turma. Inspirado no HBS Online "AI for Leaders" (formato 16–20h com 90 dias de acesso) e nos programas MIT Sloan online, mas com foco total no mercado brasileiro.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Executivos e gerentes que precisam de flexibilidade de horário',
      'Profissionais em início de jornada AI First que querem estrutura',
      'Times que precisam de conteúdo escalável para múltiplos colaboradores',
      'Empreendedores que querem aprender IA para seus negócios',
      'Profissionais de marketing, vendas, operações e RH que querem aplicar IA à sua função',
    ],
    challenge:
      'HBS Online reporta que profissionais com acesso a conteúdo estruturado de IA têm 3x mais chances de implementar projetos bem-sucedidos. O problema: a maioria dos cursos disponíveis no Brasil é genérica, desatualizada ou técnica demais para executivos.',
    challengeStats: [
      GLOBAL_STATS.aiProjectFailure,
      GLOBAL_STATS.aiFluentyDemand,
      GLOBAL_STATS.skillsChange,
      { value: '3x', label: 'mais chance de implementar IA com sucesso com educação estruturada', source: 'HBS Online Research, 2025' },
    ],
    methodologyTitle: 'Aprendizado AI First™ Self-Paced',
    methodologyDesc:
      'Conteúdo desenvolvido com a metodologia AI First Framework™ e estruturado para máxima retenção e aplicação prática — não apenas teoria.',
    methodologyPoints: [
      'Aulas em vídeo de 10–20 minutos (design HBS Online)',
      'Exercícios práticos aplicados ao seu contexto profissional',
      'Ferramentas e templates prontos para usar no trabalho',
      'Acesso por 12 meses após a compra',
      'Certificado de conclusão Recognise AI First',
      'Comunidade Discord exclusiva para alunos',
    ],
    modules: [
      { number: 'Módulo 1', title: 'AI First Strategy Fundamentals', duration: '4h · 12 aulas', topics: ['O contexto global e brasileiro da IA', 'Frameworks de estratégia AI para executivos', 'Como identificar oportunidades no seu negócio', 'Cases reais de transformação com IA'], benchmark: 'MIT Sloan AI Implications for Business Strategy' },
      { number: 'Módulo 2', title: 'Generative AI na Prática Executiva', duration: '4h · 12 aulas', topics: ['LLMs e GenAI desmistificados', 'Aplicações por função: Marketing, Finance, Ops, HR', 'Prompt Engineering Executivo', 'Ferramentas essenciais: TESS AI, ChatGPT, Gemini, Copilot'], benchmark: 'HBS Online AI for Leaders Generative AI Module' },
      { number: 'Módulo 3', title: 'AI para Marketing e CX', duration: '4h · 12 aulas', topics: ['AI-driven marketing strategy', 'Personalização em escala com IA', 'AI para Customer Intelligence e CRM', 'Cases: como marcas globais usam IA em marketing'], benchmark: 'Wharton AI in Marketing + Tom Queiroz expertise' },
      { number: 'Módulo 4', title: 'AI Governance & Implementation', duration: '4h · 12 aulas', topics: ['Governança de IA para não-técnicos', 'Como tirar projetos de IA do POC para produção', 'LGPD e ética no uso de IA', 'Seu plano de implementação AI First'], benchmark: 'Kellogg AI Governance Module + MIT AI Ethics' },
    ],
    outcomes: [
      { metric: '16h+', desc: 'de conteúdo estruturado por especialistas' },
      { metric: '12 meses', desc: 'de acesso para aprender no seu ritmo' },
      { metric: 'Certificado', desc: 'Recognise AI First reconhecido pelo mercado' },
      { metric: 'Templates', desc: 'prontos para implementar IA no seu trabalho' },
    ],
    format: '100% Online · Self-paced · Acesso imediato',
    duration: '16h+ de conteúdo · Acesso por 12 meses',
    investment: 'Inscrição individual ou licença corporativa',
    nextEdition: 'Acesso imediato após inscrição',
    tableName: 'digital_course_leads',
  },
};

// ============================================================
// CORPORATE PROGRAMS DATA
// ============================================================
export interface CorporateProgram {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  badge: string;
  description: string;
  targetTitle: string;
  targetProfiles: string[];
  brazilChallenge: string;
  challengeStats: { value: string; label: string; source: string }[];
  methodologyTitle: string;
  methodologyDesc: string;
  methodologyPoints: string[];
  modules: ProgramModule[];
  outcomes: { metric: string; desc: string }[];
  format: string;
  duration: string;
  investment: string;
  nextEdition: string;
  tableName: string;
  formFields: string[];
}

export const CORPORATE_PROGRAMS_DATA: Record<string, CorporateProgram> = {
  aiLeadership: {
    id: 'aiLeadership',
    slug: '/para-empresas/lideranca-ai-first',
    title: 'Liderança AI First™ Corporativa',
    tagline: 'Forme a geração de líderes que vai conduzir sua empresa na era da IA',
    heroImage: IMAGES.CORP_AI_TRAIN_2,
    badge: 'B2B EXCLUSIVO · TURMAS IN-COMPANY',
    description:
      'O programa mais completo do Brasil para transformar lideranças corporativas em executores de estratégias AI First. Baseado nos melhores modelos de Kellogg "AI Strategies for Business Transformation" (8 semanas), INSEAD "Leading AI and Digital Transformation" e Wharton "Leadership Program in AI and Analytics" (18 semanas) — adaptado à realidade e desafios específicos do mercado brasileiro.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Times de liderança de médio e grande porte (10 a 200 líderes)',
      'C-suite, diretores e VPs que precisam alinhar visão AI First',
      'Empresas que investiram em tecnologia de IA mas não veem adoção real',
      'Organizações que querem criar uma cultura AI First internamente',
      'CHROs e CLOs buscando estruturar AI upskilling para a liderança',
    ],
    brazilChallenge:
      'O Brasil enfrenta uma crise sem precedentes de talentos em IA. Segundo Forbes Brasil e Ford-Datafolha (2026): 98% das médias e grandes empresas brasileiras não conseguem contratar profissionais qualificados em tecnologia e IA. A posição de especialista em IA é a mais difícil de preencher (35% das vagas abertas). A solução mais rápida e eficaz não é recrutar externamente — é desenvolver os líderes que você já tem.',
    challengeStats: [
      BRAZIL_CONTEXT.talentGap,
      GLOBAL_STATS.genAiFailure,
      GLOBAL_STATS.aiProjectFailure,
      GLOBAL_STATS.aiInvestmentGrowing,
      BRAZIL_CONTEXT.aiSpecialists,
      GLOBAL_STATS.productivityGain,
    ],
    methodologyTitle: 'Metodologia AI First Framework™ Corporativa',
    methodologyDesc:
      'Programa de 40h modular, presencial e/ou online, com diagnóstico organizacional pré-programa, módulos por função executiva, projeto aplicado e entrega de roadmap organizacional AI First.',
    methodologyPoints: [
      'Diagnóstico de Maturidade AI First Organizacional (pré-programa)',
      '8 módulos customizáveis por função, setor e nível de maturidade',
      'Facilitação por Tom Queiroz + especialistas convidados em IA aplicada',
      'Estudos de caso do setor da empresa + benchmarks globais (Kellogg-style)',
      'Projeto aplicado: cada grupo entrega um AI First Roadmap departamental',
      'Relatório organizacional com diagnóstico, recomendações e KPIs de adoção',
      'Acesso à plataforma TESS AI durante o programa para prática real',
      'Follow-up trimestral de accountability por 6 meses',
    ],
    modules: [
      { number: 'M1', title: 'AI First Contexto e Estratégia', duration: '8h · Todos os líderes', topics: ['O contexto global e brasileiro da IA (com dados oficiais)', 'Como IA está transformando seu setor — agora', 'Frameworks de estratégia AI para C-suite e diretores', 'O que separa empresas AI First das demais'], benchmark: 'Kellogg AI Strategies Module 1 + MIT Sloan AI Business Strategy' },
      { number: 'M2', title: 'Generative AI na Prática Corporativa', duration: '8h · Todos', topics: ['LLMs e GenAI para decisões executivas', 'Hands-on com TESS AI, ChatGPT Enterprise, Copilot', 'GenAI por função: Marketing, Finance, HR, Ops, Product', 'Riscos, limites e governança básica de GenAI'], benchmark: 'Kellogg GenAI + Agentic AI insights, HBS AI for Leaders' },
      { number: 'M3', title: 'AI Business Value & ROI', duration: '4h · C-suite e Diretores', topics: ['Como vincular IA a resultados de negócio mensuráveis', 'AI Business Case — framework para board e stakeholders', 'Priorização: onde IA gera mais valor para sua organização', 'Métricas de AI ROI por função e área'], benchmark: 'McKinsey AI ROI Framework + Wharton AI Value Creation' },
      { number: 'M4', title: 'Data Readiness e Infraestrutura AI', duration: '4h · Tech, Produto, Ops', topics: ['Por que 50% dos projetos GenAI falham (a resposta está nos dados)', 'Como avaliar a maturidade de dados da sua organização', 'Decisões de infraestrutura: cloud, on-prem, APIs', 'Build vs. buy vs. partner em IA — como decidir'], benchmark: 'Gartner GenAI Failure Analysis + MIT AI Data Strategy' },
      { number: 'M5', title: 'AI Governance & Ethics Corporativo', duration: '4h · Legal, Compliance, C-suite', topics: ['Framework de governança de IA para o board', 'LGPD, Marco Legal da IA no Brasil e EU AI Act', 'Gestão de risco e responsabilidade em projetos de IA', 'Auditoria e transparência em modelos de IA'], benchmark: 'Wharton AI Legal & Ethics Module + Stanford GSB AI Governance' },
      { number: 'M6', title: 'AI-First Operations & Process Design', duration: '4h · Ops, Produto, Tecnologia', topics: ['Redesenhando processos para operar com IA', 'Automação inteligente: de RPA a Agentes Autônomos de IA', 'AI Integration Roadmap para operações existentes', 'Medindo eficiência operacional com IA'], benchmark: 'INSEAD AI for Business Operations Module' },
      { number: 'M7', title: 'Change Leadership & AI Culture', duration: '4h · RH, Liderança, Cultura', topics: ['Gestão de mudança para adoção de IA na organização', 'Como construir uma cultura AI First internamente', 'Comunicação da estratégia de IA para equipes', 'Gestão de resistência e engajamento'], benchmark: 'Stanford GSB AI Culture + LBS Change Leadership' },
      { number: 'M8', title: 'AI Talent Strategy & Capstone', duration: '4h · CHROs, C-suite', topics: ['Estratégia de talentos AI First: reskilling interno vs. hiring', 'Como criar trilhas de desenvolvimento AI para suas equipes', 'Apresentação dos roadmaps departamentais AI First (capstone)', 'Relatório final e plano de accountability'], benchmark: 'MIT AI Executive Academy Capstone + McKinsey AI Talent Framework' },
    ],
    outcomes: [
      { metric: '40h', desc: 'de programa modular customizado para sua organização' },
      { metric: '100%', desc: 'adaptado ao setor, cultura e maturidade AI da empresa' },
      { metric: '1 roadmap', desc: 'organizacional AI First ao final — executável imediatamente' },
      { metric: 'ROI medido', desc: 'relatório com KPIs de adoção e métricas de impacto' },
    ],
    format: 'Presencial (São Paulo/Brasil), Online ao vivo ou Híbrido',
    duration: '40h · Divididas em 8 módulos de 4–8h cada',
    investment: 'Por turma e número de participantes — solicite diagnóstico gratuito',
    nextEdition: 'Início após diagnóstico organizacional (2–4 semanas)',
    tableName: 'corp_ai_leadership_leads_2026_05_02',
    formFields: ['nome', 'instituicao', 'cargo', 'whatsapp', 'email', 'num_participantes', 'objetivo'],
  },

  aiImmersion: {
    id: 'aiImmersion',
    slug: '/para-empresas/imersao-ai-first',
    title: 'Imersão AI First™ In-Company',
    tagline: '2 dias para definir o futuro da IA na sua empresa',
    heroImage: IMAGES.CORP_AI_TRAIN_4,
    badge: 'FORMATO INTENSIVO · IN-COMPANY',
    description:
      'Uma imersão de 2 dias, totalmente presencial e on-site, para times executivos que precisam ir do zero ao plano executável rapidamente. Inspirada no MIT AI Executive Academy (formato 2 semanas reduzido para a realidade executiva brasileira) e no Stanford d.school Executive Program — a Imersão AI First™ entrega diagnóstico, alinhamento estratégico e plano de ação em 16 horas de trabalho intenso.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Comitês executivos que precisam alinhar visão sobre IA',
      'Times de inovação que querem definir as primeiras iniciativas de IA',
      'Boards e C-suite em processo de planejamento estratégico com IA',
      'Empresas que precisam definir rapidamente onde e como aplicar IA',
      'Organizações em situação de urgência competitiva por IA no setor',
    ],
    brazilChallenge:
      'KPMG (2025) aponta que ao menos 30% dos pilotos de IA travam antes de gerar ROI real. A IBM (2025) identifica que 40% dos projetos de IA Agêntica falham. O denominador comum: ausência de alinhamento estratégico no C-suite no início — um problema que 2 dias de imersão resolvem estruturalmente.',
    challengeStats: [
      { value: '30%', label: 'dos pilotos de IA travam antes de gerar ROI real', source: 'KPMG From Pilots to Production, 2025' },
      { value: '40%', label: 'dos projetos de IA Agêntica corporativos falham — por falta de alinhamento de liderança', source: 'IBM AI Enterprise Report, Set 2025' },
      GLOBAL_STATS.genAiFailure,
      BRAZIL_CONTEXT.talentGap,
    ],
    methodologyTitle: 'Imersão AI First™ — 2 dias, 16 horas, 1 Plano',
    methodologyDesc:
      'Metodologia de imersão executiva intensiva que combina diagnóstico em tempo real, facilitação estratégica, design thinking e a expertise de Tom Queiroz em transformações reais com IA.',
    methodologyPoints: [
      'Pré-imersão: questionário de diagnóstico organizacional online',
      'Dia 1: Diagnóstico, Contexto, Oportunidades e Casos de Uso',
      'Dia 2: Priorização, Roadmap, Quick Wins e Plano de Execução 90 dias',
      'Facilitação por Tom Queiroz + especialistas convidados',
      'Entregável: AI First Strategy Document — pronto para apresentação ao board',
      'Follow-up: 2 sessões de acompanhamento remoto (30 e 90 dias)',
    ],
    modules: [
      { number: 'Dia 1 · Manhã', title: 'AI First Context & Diagnosis', duration: '4h', topics: ['Contexto global e setorial de IA (dados oficiais)', 'Diagnóstico de maturidade AI da organização', 'Análise de forças, fraquezas e oportunidades em IA', 'Benchmark competitivo: o que o seu setor está fazendo'] },
      { number: 'Dia 1 · Tarde', title: 'Use Case Mapping & Prioritization', duration: '4h', topics: ['Mapeamento de casos de uso de IA por área/função', 'Critérios de priorização: impacto, viabilidade, urgência', 'Análise de dados disponíveis e gap de infraestrutura', 'Seleção dos 3–5 casos de uso prioritários'] },
      { number: 'Dia 2 · Manhã', title: 'AI First Roadmap Design', duration: '4h', topics: ['Construção do roadmap estratégico 90 dias / 1 ano', 'Definição de quick wins e projetos de médio prazo', 'Responsabilidades, recursos e budget estimado', 'Framework de governança e gestão de mudança'] },
      { number: 'Dia 2 · Tarde', title: 'Presentation & Commitment', duration: '4h', topics: ['Apresentação do plano final (board-ready)', 'Alinhamento e compromissos do time executivo', 'Definição de OKRs de AI First', 'Próximos passos e follow-up'] },
    ],
    outcomes: [
      { metric: '2 dias', desc: 'de imersão intensiva on-site com Tom Queiroz' },
      { metric: '1 documento', desc: 'AI First Strategy pronto para apresentação ao board' },
      { metric: '90 dias', desc: 'de roadmap de execução com quick wins definidos' },
      { metric: '2 follow-ups', desc: 'remotos de acompanhamento após a imersão' },
    ],
    format: 'Presencial on-site (sede da empresa) — São Paulo e capitais',
    duration: '2 dias consecutivos · 16h de imersão',
    investment: 'Por evento de imersão — solicite proposta personalizada',
    nextEdition: 'Agenda a partir de 3 semanas após a contratação',
    tableName: 'corp_ai_immersion_leads_2026_05_02',
    formFields: ['nome', 'instituicao', 'cargo', 'whatsapp', 'email', 'num_participantes', 'data_preferencial'],
  },

  mentorForm: {
    id: 'mentorForm',
    slug: '/para-empresas/formacao-mentores',
    title: 'Formação de Mentores AI First™',
    tagline: 'Multiplique a inteligência AI First de dentro para fora',
    heroImage: IMAGES.CORP_MENTOR_2,
    badge: 'PROGRAMA MULTIPLICADOR · 6 SEMANAS',
    description:
      'Forme champions internos de IA em sua organização — líderes que vão multiplicar a cultura AI First de dentro para fora. Inspirado no programa London Business School "Coaching for Leadership", Erlich Corporate Mentoring e nas melhores práticas de multiplicação de conhecimento das Fortune 500. Um programa de 6 semanas que transforma líderes em mentores AI First.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'Líderes sênior designados como AI Champions internos',
      'Gerentes e coordenadores que facilitarão transformação AI First em suas áreas',
      'Profissionais de L&D e RH que estruturarão trilhas de AI upskilling',
      'Coaches e mentores internos que precisam integrar IA à sua metodologia',
      'Equipes de inovação e transformação digital responsáveis por disseminar IA',
    ],
    brazilChallenge:
      'Empresas que formam multiplicadores internos de IA reduzem em até 60% o custo de transformação digital e aceleram em 3x a adoção de novas práticas. No Brasil, com 98% das empresas sem acesso a talentos externos em IA, a multiplicação interna deixou de ser opção — é imperativo estratégico.',
    challengeStats: [
      BRAZIL_CONTEXT.talentGap,
      GLOBAL_STATS.aiMaturiy,
      { value: '60%', label: 'de redução no custo de transformação digital com multiplicadores internos de IA', source: 'McKinsey Learning Organization Report, 2025' },
      { value: '3x', label: 'mais velocidade de adoção de IA com champions internos capacitados', source: 'Deloitte AI Talent Strategy Report, 2025' },
    ],
    methodologyTitle: 'Programa de Formação de Mentores AI First™',
    methodologyDesc:
      'Em 6 semanas, combinamos a metodologia AI First Framework™ com técnicas avançadas de coaching, facilitação e multiplicação de conhecimento — criando mentores AI First prontos para transformar equipes inteiras.',
    methodologyPoints: [
      'Semana 1–2: AI First Deep Dive — o mentor precisa dominar antes de multiplicar',
      'Semana 3: Metodologia de Mentoria e Facilitação AI First',
      'Semana 4: Coaching para transformação de mindset em IA',
      'Semana 5: Facilitação de workshops e treinamentos internos',
      'Semana 6: Certificação e plano de multiplicação (capstone)',
      '1 dia presencial (opcional) para integração e prática em grupo',
      'Toolbox completa de materiais para replicar internamente',
      'Acesso à plataforma TESS AI para demonstrações e prática',
    ],
    modules: [
      { number: 'Sem 1', title: 'AI First Foundation para Mentores', duration: '8h online', topics: ['Contexto global e brasileiro de IA (fontes oficiais)', 'AI First Framework™ completo', 'Cases reais de transformação com IA por setor', 'Diagnóstico de maturidade AI — como aplicar na equipe'], benchmark: 'MIT Sloan AI Foundation + LBS Coaching for Leadership Week 1' },
      { number: 'Sem 2', title: 'GenAI & Ferramentas na Prática', duration: '8h online', topics: ['GenAI aplicado por função (prática real)', 'TESS AI, ChatGPT, Copilot — como demonstrar para equipes', 'Prompt Engineering para facilitadores', 'Como desmistificar IA para times céticos'], benchmark: 'Kellogg GenAI Module + Tom Queiroz facilitation experience' },
      { number: 'Sem 3', title: 'Metodologia de Mentoria AI First', duration: '4h online + 2h live', topics: ['Princípios de mentoria executiva aplicados à IA', 'Como conduzir uma sessão de mentoria AI First 1:1', 'Frameworks de diagnóstico e planejamento para mentorandos', 'Role play e simulações práticas'], benchmark: 'LBS Coaching for Leadership + Erlich Corporate Mentoring' },
      { number: 'Sem 4', title: 'Facilitação de Workshops AI First', duration: '4h online + 2h live', topics: ['Como planejar e facilitar workshops de AI upskilling', 'Gestão de resistência e objeções à IA', 'Dinâmicas e atividades práticas para times', 'Como medir e reportar o impacto das sessões'], benchmark: 'Stanford d.school Facilitation + Erlich Workshop Design' },
      { number: 'Sem 5', title: 'AI Change Leadership & Culture', duration: '4h online', topics: ['Como liderar mudança cultural para IA', 'Estratégias de engajamento e comunicação interna', 'Construindo uma comunidade AI First internamente', 'Criando incentivos e reconhecimento para adoção de IA'], benchmark: 'Stanford GSB AI Culture + LBS Change Management' },
      { number: 'Sem 6', title: 'Certificação e Plano de Multiplicação', duration: '4h online + 1 dia presencial', topics: ['Apresentação do Plano de Multiplicação AI First (capstone)', 'Banca de certificação com Tom Queiroz', 'Toolbox final: todos os materiais para replicar', 'Comunidade de Mentores AI First Recognise'], benchmark: 'MIT Executive Certification + LBS Leadership Capstone' },
    ],
    outcomes: [
      { metric: '6 semanas', desc: 'de formação intensiva online + 1 dia presencial' },
      { metric: 'Certificado', desc: 'Mentor AI First Recognise — reconhecido pelo mercado' },
      { metric: 'Toolbox', desc: 'completo de materiais prontos para multiplicar internamente' },
      { metric: '3x', desc: 'mais velocidade de adoção de IA com champions certificados' },
    ],
    format: 'Online ao vivo (semanais) + 1 dia presencial em São Paulo',
    duration: '6 semanas · ~30h total (online + presencial)',
    investment: 'Por grupo de 5–20 mentores — solicite proposta',
    nextEdition: 'Próxima turma: consulte disponibilidade',
    tableName: 'corp_mentor_form_leads_2026_05_02',
    formFields: ['nome', 'instituicao', 'cargo', 'whatsapp', 'email', 'num_mentores', 'objetivo'],
  },

  execAdvisory: {
    id: 'execAdvisory',
    slug: '/para-empresas/advisory-executivo',
    title: 'Advisory Executivo AI First™',
    tagline: 'Inteligência estratégica de alto nível para liderar a era da IA',
    heroImage: IMAGES.CORP_MENTOR_3,
    badge: 'C-SUITE EXCLUSIVO · ONGOING',
    description:
      'Acesso direto e contínuo à expertise de Tom Queiroz para decisões estratégicas de IA de alto nível. Para CEOs, boards e comitês executivos que precisam de um parceiro estratégico confiável na navegação da era da IA — não apenas um consultor, mas um advisor que conhece profundamente a realidade operacional e o contexto brasileiro. Inspirado no modelo de advisory Wharton e McKinsey para C-suite.',
    targetTitle: 'Para quem é este programa?',
    targetProfiles: [
      'CEOs, CFOs, CTOs e C-suite que tomam decisões estratégicas sobre IA',
      'Boards e comitês executivos que precisam de visão externa qualificada',
      'Empresas em processo de transformação digital acelerada com IA',
      'Fundos de investimento e venture capital avaliando teses de IA',
      'Empresas internacionais estabelecendo operações de IA no Brasil',
    ],
    brazilChallenge:
      'PwC (2026) mostra que 56% dos CEOs afirmam não ter obtido nenhum retorno de seus investimentos em IA. McKinsey (2025) aponta que 92% das empresas estão aumentando investimentos em IA — mas apenas 1% chegou a escala real. A diferença está na qualidade das decisões estratégicas no topo. Um advisor certo no momento certo muda tudo.',
    challengeStats: [
      GLOBAL_STATS.ceoNoRoi,
      GLOBAL_STATS.aiInvestmentGrowing,
      GLOBAL_STATS.genAiFailure,
      { value: '1%', label: 'das empresas que aumentam investimento em IA chegam a escala real — o gap está no C-suite', source: 'McKinsey State of AI, 2025' },
    ],
    methodologyTitle: 'Advisory AI First™ — Modelo de Parceria Estratégica',
    methodologyDesc:
      'Não é consultoria tradicional. É uma parceria estratégica contínua — com acesso direto a Tom Queiroz para as decisões que mais importam na jornada AI First da sua organização.',
    methodologyPoints: [
      'Sessões mensais de advisory estratégico (2–4h/mês)',
      'Acesso assíncrono via WhatsApp e email para decisões urgentes',
      'Review trimestral de progresso com relatório executivo',
      'Participação em reuniões estratégicas e board meetings (presencial quando necessário)',
      'Acesso à rede exclusiva de especialistas em IA para casos complexos',
      'Diagnóstico anual de maturidade AI First da organização',
    ],
    modules: [
      { number: 'Contínuo', title: 'AI Strategy Advisory', duration: '2h/mês', topics: ['Revisão de iniciativas de IA em andamento', 'Decisões estratégicas de investimento em IA', 'Benchmark competitivo e tendências globais', 'Priorização e ajuste do roadmap AI First'], benchmark: 'McKinsey Executive Advisory + Wharton C-suite Consulting' },
      { number: 'Trimestral', title: 'AI Performance Review', duration: '4h/trimestre', topics: ['Revisão de KPIs e métricas de AI ROI', 'Análise de projetos de IA em andamento', 'Identificação de gargalos e recomendações', 'Atualização do roadmap estratégico'], benchmark: 'McKinsey Quarterly Business Review AI Framework' },
      { number: 'Semestral', title: 'Board AI Briefing', duration: '2h/semestre', topics: ['Apresentação executiva para o board', 'Estado atual e perspectivas de IA na empresa', 'Comparativo com mercado e concorrentes', 'Recomendações estratégicas para o próximo semestre'], benchmark: 'PwC Board AI Governance Framework' },
      { number: 'Anual', title: 'AI Maturity Assessment', duration: '8h/ano', topics: ['Diagnóstico completo de maturidade AI First', 'Benchmark externo com empresas do setor', 'Revisão e atualização da estratégia de IA', 'Planejamento do próximo ciclo de transformação'], benchmark: 'MIT AI Readiness Assessment + Gartner AI Maturity Model' },
    ],
    outcomes: [
      { metric: 'Ongoing', desc: 'parceria estratégica contínua — não um projeto pontual' },
      { metric: 'Acesso direto', desc: 'a Tom Queiroz para decisões estratégicas urgentes' },
      { metric: 'Board-ready', desc: 'relatórios e apresentações prontos para o board' },
      { metric: 'ROI claro', desc: 'métricas de AI ROI acompanhadas trimestralmente' },
    ],
    format: 'Online (sessões mensais) + Presencial em São Paulo quando necessário',
    duration: 'Contrato mínimo de 6 meses · Renovável anualmente',
    investment: 'Retainer mensal — por perfil e escopo de advisory',
    nextEdition: 'Vagas extremamente limitadas — candidatura sob análise',
    tableName: 'corp_exec_advisory_leads_2026_05_02',
    formFields: ['nome', 'instituicao', 'cargo', 'whatsapp', 'email', 'nivel_hierarquico', 'desafio_principal'],
  },
};
