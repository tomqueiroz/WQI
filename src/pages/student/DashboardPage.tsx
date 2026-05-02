import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LMS_ROUTES } from '@/lib/index';
import { useEnrollments } from '@/hooks/useLMS';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Clock, Award, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface LessonProgress {
  id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
}

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const { enrollments, loading: enrollmentsLoading } = useEnrollments();
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    async function fetchProgress() {
      if (!user) return;

      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true);

      if (progressData) {
        setCompletedLessons(progressData as LessonProgress[]);

        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('duration_minutes')
          .in('id', progressData.map((p) => p.lesson_id));

        if (lessonsData) {
          const totalMinutes = lessonsData.reduce((sum, lesson) => sum + (lesson.duration_minutes || 0), 0);
          setTotalHours(Math.round(totalMinutes / 60));
        }
      }
    }

    fetchProgress();
  }, [user]);

  const enrolledCourses = enrollments
    .map((enrollment) => enrollment.course)
    .filter((course) => course !== undefined);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-card border-r border-border p-6 hidden md:block">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-primary">WQI Mentorship</h2>
          </div>
          <nav className="space-y-2">
            <Link
              to={LMS_ROUTES.DASHBOARD}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              <BookOpen className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              to={LMS_ROUTES.COURSES}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition"
            >
              <GraduationCap className="w-5 h-5" />
              Cursos
            </Link>
            <Link
              to={LMS_ROUTES.PROFILE}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition"
            >
              <User className="w-5 h-5" />
              Perfil
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-black text-primary mb-2">
                Bem-vindo, {profile?.full_name || 'Aluno'}!
              </h1>
              <p className="text-muted-foreground">
                Continue sua jornada de aprendizado executivo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-primary">{enrollments.length}</div>
                        <div className="text-sm text-muted-foreground">Cursos Matriculados</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-primary">{completedLessons.length}</div>
                        <div className="text-sm text-muted-foreground">Aulas Concluídas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-chart-3" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-primary">{totalHours}h</div>
                        <div className="text-sm text-muted-foreground">Horas Assistidas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-chart-5/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-chart-5" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Certificados</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">Meus Cursos</CardTitle>
                    {enrolledCourses.length > 0 && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={LMS_ROUTES.COURSES}>Ver Todos</Link>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {enrollmentsLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />
                      ))}
                    </div>
                  ) : enrolledCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Nenhum curso matriculado</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Você ainda não está matriculado em nenhum curso. Explore nosso catálogo e comece sua jornada de transformação executiva!
                      </p>
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to={LMS_ROUTES.COURSES}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Explorar Cursos
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enrolledCourses.slice(0, 3).map((course) => (
                        <Link
                          key={course.id}
                          to={`${LMS_ROUTES.COURSES}/${course.slug}`}
                          className="group block"
                        >
                          <div className="rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                            {course.thumbnail_url ? (
                              <div className="aspect-video w-full overflow-hidden bg-muted">
                                <img
                                  src={course.thumbnail_url}
                                  alt={course.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                            ) : (
                              <div className="aspect-video w-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-white/50" />
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {course.description}
                              </p>
                              <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {course.duration_hours}h de conteúdo
                                </span>
                                <span className="text-xs font-semibold text-accent">Continuar →</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {completedLessons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Progresso Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {completedLessons.slice(0, 5).map((progress) => (
                        <div
                          key={progress.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-4 h-4 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">Aula concluída</div>
                            <div className="text-xs text-muted-foreground">
                              {progress.completed_at
                                ? new Date(progress.completed_at).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                  })
                                : 'Data não disponível'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
