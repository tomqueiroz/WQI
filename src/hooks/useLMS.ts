import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string | null;
  level: string;
  duration_hours: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

interface Chapter {
  id: string;
  course_id: string;
  title: string;
  sort_order: number;
  created_at: string;
}

interface Lesson {
  id: string;
  course_id: string;
  chapter_id: string;
  title: string;
  video_url: string | null;
  duration_minutes: number;
  is_free: boolean;
  sort_order: number;
  created_at: string;
}

interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  payment_status: string;
  created_at: string;
  course: Course;
}

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  avatar_url: string | null;
  company: string | null;
  created_at: string;
}

interface UseCoursesReturn {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCourses(includeUnpublished = false): UseCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('courses').select('*');

      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error: dbError } = await query.order('sort_order', { ascending: true });

      if (dbError) throw dbError;
      setCourses((data as Course[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos');
    } finally {
      setLoading(false);
    }
  }, [includeUnpublished]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
}

interface UseCourseReturn {
  course: Course | null;
  chapters: (Chapter & { lessons: Lesson[] })[];
  loading: boolean;
  error: string | null;
}

export function useCourse(slug: string): UseCourseReturn {
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<(Chapter & { lessons: Lesson[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        setError(null);

        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .single();

        if (courseError) throw courseError;
        if (!courseData) throw new Error('Curso não encontrado');

        setCourse(courseData as Course);

        const { data: chaptersData, error: chaptersError } = await supabase
          .from('chapters')
          .select('*')
          .eq('course_id', courseData.id)
          .order('sort_order', { ascending: true });

        if (chaptersError) throw chaptersError;

        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseData.id)
          .order('sort_order', { ascending: true });

        if (lessonsError) throw lessonsError;

        const chaptersWithLessons = (chaptersData as Chapter[] || []).map((chapter) => ({
          ...chapter,
          lessons: (lessonsData as Lesson[] || []).filter((lesson) => lesson.chapter_id === chapter.id),
        }));

        setChapters(chaptersWithLessons);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar curso');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  return { course, chapters, loading, error };
}

interface UseLessonProgressReturn {
  progressMap: Record<string, LessonProgress>;
  loading: boolean;
  refetch: () => void;
}

export function useLessonProgress(courseId?: string): UseLessonProgressReturn {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user || !courseId) {
      setProgressMap({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data, error: dbError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (dbError) throw dbError;

      const map: Record<string, LessonProgress> = {};
      (data as LessonProgress[] || []).forEach((progress) => {
        map[progress.lesson_id] = progress;
      });

      setProgressMap(map);
    } catch (err) {
      console.error('Erro ao carregar progresso:', err);
    } finally {
      setLoading(false);
    }
  }, [user, courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progressMap, loading, refetch: fetchProgress };
}

interface UseMarkLessonCompleteReturn {
  markComplete: (lessonId: string, courseId: string) => Promise<void>;
  loading: boolean;
}

export function useMarkLessonComplete(): UseMarkLessonCompleteReturn {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const markComplete = async (lessonId: string, courseId: string) => {
    if (!user) return;

    try {
      setLoading(true);

      const { error: dbError } = await supabase.from('lesson_progress').upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          course_id: courseId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      );

      if (dbError) throw dbError;
    } catch (err) {
      console.error('Erro ao marcar aula como concluída:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { markComplete, loading };
}

interface UseEnrollmentsReturn {
  enrollments: Enrollment[];
  enrolledCourseIds: string[];
  loading: boolean;
}

export function useEnrollments(): UseEnrollmentsReturn {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrollments() {
      if (!user) {
        setEnrollments([]);
        setEnrolledCourseIds([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error: dbError } = await supabase
          .from('enrollments')
          .select('*, course:courses(*)')
          .eq('user_id', user.id);

        if (dbError) throw dbError;

        const enrollmentsData = (data as any[] || []).map((item) => ({
          id: item.id,
          user_id: item.user_id,
          course_id: item.course_id,
          status: item.status,
          payment_status: item.payment_status,
          created_at: item.created_at,
          course: item.course as Course,
        }));

        setEnrollments(enrollmentsData);
        setEnrolledCourseIds(enrollmentsData.map((e) => e.course_id));
      } catch (err) {
        console.error('Erro ao carregar matrículas:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, [user]);

  return { enrollments, enrolledCourseIds, loading };
}

interface AdminStats {
  students: number;
  enrollments: number;
  courses: number;
  leads: number;
}

interface UseAdminStatsReturn {
  stats: AdminStats;
  loading: boolean;
}

export function useAdminStats(): UseAdminStatsReturn {
  const [stats, setStats] = useState<AdminStats>({
    students: 0,
    enrollments: 0,
    courses: 0,
    leads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);

        const [studentsRes, enrollmentsRes, coursesRes, leadsRes] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('enrollments').select('id', { count: 'exact', head: true }),
          supabase.from('courses').select('id', { count: 'exact', head: true }),
          supabase.from('leads').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          students: studentsRes.count || 0,
          enrollments: enrollmentsRes.count || 0,
          courses: coursesRes.count || 0,
          leads: leadsRes.count || 0,
        });
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}

interface UseStudentListReturn {
  students: Profile[];
  loading: boolean;
  refetch: () => void;
}

export function useStudentList(): UseStudentListReturn {
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error: dbError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      setStudents((data as Profile[]) || []);
    } catch (err) {
      console.error('Erro ao carregar alunos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { students, loading, refetch: fetchStudents };
}
