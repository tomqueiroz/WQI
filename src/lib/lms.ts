export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'student' | 'admin' | 'mentor';
  company?: string;
  job_title?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
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

export const LMS_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_LEADS: '/admin/leads',
} as const;

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}

export function getLevelLabel(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const labels = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };
  return labels[level];
}

export function getContentTypeLabel(type: 'video' | 'live' | 'pdf' | 'quiz' | 'assignment'): string {
  const labels = {
    video: 'Vídeo',
    live: 'Ao Vivo',
    pdf: 'Material PDF',
    quiz: 'Quiz',
    assignment: 'Atividade',
  };
  return labels[type];
}
