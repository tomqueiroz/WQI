export const LMS_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:slug',
  LESSON_PLAYER: '/learn/:courseSlug/:lessonId',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_LEADS: '/admin/leads',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  PROGRAMAS: '/programas',
  PROG_1ON1: '/programas/mentoria-1on1',
  PROG_COHORT: '/programas/cohort',
  PROG_INHOUSE: '/programas/inhouse',
  PROG_MASTERCLASS: '/programas/masterclass-ai',
  PROG_KEYNOTE: '/programas/keynote',
  PROG_DIGITAL: '/programas/cursos-digitais',
  SOBRE: '/sobre',
  CONTATO: '/contato',
  EMPRESAS: '/para-empresas',
  CORP_AI_LEADERSHIP: '/para-empresas/lideranca-ai-first',
  CORP_AI_IMMERSION: '/para-empresas/imersao-ai-first',
  CORP_MENTOR_FORM: '/para-empresas/formacao-mentores',
  CORP_EXEC_ADVISORY: '/para-empresas/advisory-executivo',
  PRIVACY: '/privacidade',
  TERMS: '/termos',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Programas', href: '/programas' },
  { label: 'Para Empresas', href: '/para-empresas' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];

export interface BlogCategory {
  key: string;
  label: string;
  color: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { key: 'todos', label: 'Todos', color: '#001123' },
  { key: 'insights', label: 'Insights', color: '#7a6207' },
  { key: 'lideranca', label: 'Liderança', color: '#0f766e' },
  { key: 'inovacao', label: 'Inovação', color: '#6d28d9' },
  { key: 'tendencias', label: 'Tendências', color: '#dc2626' },
  { key: 'bem-estar', label: 'Bem-Estar', color: '#059669' },
  { key: 'eventos', label: 'Eventos', color: '#ea580c' },
  { key: 'carreira', label: 'Carreira', color: '#2563eb' },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  image_url?: string;
  category: string;
  category_color?: string;
  tags: string[];
  author_name: string;
  author_bio?: string;
  read_time_minutes: number;
  read_time?: number;
  is_published: boolean;
  is_featured: boolean;
  views_count: number;
  published_at?: string;
  created_at: string;
  key_insight?: string;
  sources?: string[];
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'admin' | 'mentor';
  avatar_url?: string;
  company?: string;
  created_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  trailer_url?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  total_hours: number;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Chapter {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  sort_order: number;
  is_published: boolean;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  chapter_id: string;
  course_id: string;
  title: string;
  description?: string;
  video_url?: string;
  video_duration_seconds: number;
  content_type: 'video' | 'live' | 'pdf' | 'quiz' | 'assignment';
  is_preview: boolean;
  is_published: boolean;
  sort_order: number;
  resources: any[];
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  progress_seconds: number;
  completed_at?: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  payment_status: string;
  created_at: string;
  course?: Course;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'cohort',
    name: 'AI Marketing Leaders - Cohort Executive',
    description: 'Programa intensivo de 12 semanas para transformação executiva em Marketing Digital e IA Generativa',
    price: 'R$ 4.997',
    duration: '12 semanas',
    features: [
      '24 sessões ao vivo com Wellington Queiroz',
      'Projetos práticos com feedback personalizado',
      'Networking com executivos C-level',
      'Certificado de conclusão',
      'Acesso vitalício ao conteúdo',
      'Comunidade exclusiva Alumni',
    ],
    badge: 'Mais Popular',
  },
  {
    id: 'masterclass',
    name: 'Masterclass IA para Marketing',
    description: 'Workshop intensivo de 4 horas sobre fundamentos de IA Generativa aplicada ao Marketing',
    price: 'R$ 997',
    duration: '4 horas',
    features: [
      'Framework AI First Marketing',
      'Ferramentas e prompts práticos',
      'Cases reais de redução de CPA',
      'Material de apoio completo',
      'Gravação por 30 dias',
    ],
  },
  {
    id: 'mentoring',
    name: 'Mentoria Executiva 1:1',
    description: 'Acompanhamento individual personalizado para executivos C-suite e diretores',
    price: 'Sob consulta',
    duration: '3-6 meses',
    features: [
      'Diagnóstico estratégico completo',
      'Plano de 90 dias personalizado',
      'Acesso direto via WhatsApp',
      'Revisão de estratégias em tempo real',
      'Co-criação de frameworks',
    ],
  },
  {
    id: 'incompany',
    name: 'In-Company AI Transformation',
    description: 'Programa de transformação de times de marketing para médias e grandes empresas',
    price: 'Sob consulta',
    duration: 'Customizado',
    features: [
      'Diagnóstico organizacional',
      'Treinamento de equipes (até 50 pessoas)',
      'Implementação de processos com IA',
      'Consultoria estratégica contínua',
      'Suporte pós-projeto',
    ],
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ana Paula Silva',
    role: 'CMO',
    company: 'TechCorp Brasil',
    text: 'A mentoria com Wellington transformou completamente nossa estratégia de marketing. Implementamos IA em 90% das campanhas e reduzimos CPA em 42%.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Carlos Mendes',
    role: 'Diretor de Marketing',
    company: 'Varejo Digital S.A.',
    text: 'O Cohort foi um divisor de águas. Networking com outros executivos e conteúdo de altíssimo nível. Valeu cada centavo do investimento.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Mariana Costa',
    role: 'VP de Growth',
    company: 'FinTech Innovations',
    text: 'Wellington não é só um mentor, é um parceiro estratégico. Sua experiência em grandes marcas trouxe insights que aceleraram nosso crescimento.',
    rating: 5,
  },
];

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };
  return labels[level] || level;
}

export function getContentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    video: 'Vídeo',
    live: 'Ao Vivo',
    pdf: 'PDF',
    quiz: 'Quiz',
    assignment: 'Atividade',
  };
  return labels[type] || type;
}
