import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStats } from '@/hooks/useLMS';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, BookOpen, Mail, GraduationCap, ArrowRight, LogOut, LayoutDashboard, GraduationCap as CoursesIcon, UsersIcon, MailIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LMS_ROUTES } from '@/lib/index';
import { useAuth } from '@/contexts/AuthContext';
import { IMAGES } from '@/assets/images';

interface EnrollmentWithDetails {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  payment_status: string;
  created_at: string;
  profile?: {
    id: string;
    full_name: string | null;
    email: string;
  };
  course?: {
    id: string;
    title: string;
  };
}

interface Lead {
  id: string;
  full_name: string;
  email: string;
  product_interest?: string;
  created_at: string;
}

const chartData = [
  { course: 'IA Marketing', enrollments: 45 },
  { course: 'Cohort Leaders', enrollments: 32 },
  { course: 'Mentoria 1:1', enrollments: 18 },
  { course: 'In-Company', enrollments: 12 },
  { course: 'Marketing Club', enrollments: 67 },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const { stats, loading: statsLoading } = useAdminStats();
  const [recentEnrollments, setRecentEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentData() {
      try {
        setLoading(true);

        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('*, profile:profiles(id, full_name, email), course:courses(id, title)')
          .order('created_at', { ascending: false })
          .limit(5);

        if (enrollmentsError) throw enrollmentsError;

        const enrollments = (enrollmentsData as any[] || []).map((item) => ({
          id: item.id,
          user_id: item.user_id,
          course_id: item.course_id,
          status: item.status,
          payment_status: item.payment_status,
          created_at: item.created_at,
          profile: item.profile,
          course: item.course,
        }));

        setRecentEnrollments(enrollments);

        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('id, full_name, email, product_interest, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (leadsError) throw leadsError;

        setRecentLeads((leadsData as Lead[]) || []);
      } catch (err) {
        console.error('Erro ao carregar dados recentes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentData();
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default' as const;
      case 'completed':
        return 'secondary' as const;
      case 'cancelled':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: 'Ativo',
      completed: 'Concluído',
      cancelled: 'Cancelado',
      pending: 'Pendente',
    };
    return labels[status] || status;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(LMS_ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-primary border-r border-primary/20 flex flex-col">
          <div className="p-6 border-b border-primary/20">
            <img src={IMAGES.LOGO_WQI_BRANCO} alt="WQI" className="h-10 w-auto" />
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => navigate(LMS_ROUTES.ADMIN)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-accent text-white font-medium transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => navigate(LMS_ROUTES.ADMIN_COURSES)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
            >
              <CoursesIcon className="h-5 w-5" />
              Cursos
            </button>
            <button
              onClick={() => navigate(LMS_ROUTES.ADMIN_STUDENTS)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
            >
              <UsersIcon className="h-5 w-5" />
              Alunos
            </button>
            <button
              onClick={() => navigate(LMS_ROUTES.ADMIN_LEADS)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
            >
              <MailIcon className="h-5 w-5" />
              Leads
            </button>
          </nav>

          <div className="p-4 border-t border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-accent text-white font-semibold">
                  {getInitials(profile?.full_name || 'Admin')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {profile?.full_name || 'Admin'}
                </p>
                <p className="text-xs text-white/60 truncate">{profile?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="bg-card border-b border-border px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Visão geral da plataforma</p>
          </header>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alunos</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.students}
                  </div>
                  <p className="text-xs text-muted-foreground">Total de estudantes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Matrículas</CardTitle>
                  <BookOpen className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.enrollments}
                  </div>
                  <p className="text-xs text-muted-foreground">Total de matrículas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cursos</CardTitle>
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.courses}
                  </div>
                  <p className="text-xs text-muted-foreground">Cursos disponíveis</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads</CardTitle>
                  <Mail className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.leads}
                  </div>
                  <p className="text-xs text-muted-foreground">Contatos recebidos</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate(LMS_ROUTES.ADMIN_COURSES)} className="bg-accent text-white hover:bg-accent/90">
                Novo Curso
              </Button>
              <Button variant="outline" onClick={() => navigate(LMS_ROUTES.ADMIN_STUDENTS)}>
                Ver Alunos
              </Button>
              <Button variant="outline" onClick={() => navigate(LMS_ROUTES.ADMIN_LEADS)}>
                Ver Leads
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Matrículas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-sm text-muted-foreground">Carregando...</div>
                  ) : recentEnrollments.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Nenhuma matrícula ainda</div>
                  ) : (
                    <div className="space-y-3">
                      {recentEnrollments.map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className="flex items-center gap-3 py-2 border-b last:border-0"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-accent text-white text-xs">
                              {getInitials(enrollment.profile?.full_name || 'A')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {enrollment.profile?.full_name || 'Aluno'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {enrollment.course?.title || 'Curso'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(enrollment.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant={getStatusBadgeVariant(enrollment.status)}>
                            {getStatusLabel(enrollment.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => navigate(LMS_ROUTES.ADMIN_STUDENTS)}
                  >
                    Ver Todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Leads Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-sm text-muted-foreground">Carregando...</div>
                  ) : recentLeads.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Nenhum lead ainda</div>
                  ) : (
                    <div className="space-y-3">
                      {recentLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="flex items-start gap-3 py-2 border-b last:border-0"
                        >
                          <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lead.full_name}</p>
                            <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                            {lead.product_interest && (
                              <p className="text-xs text-muted-foreground truncate">
                                Interesse: {lead.product_interest}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => navigate(LMS_ROUTES.ADMIN_LEADS)}
                  >
                    Ver Todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Matrículas por Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="course"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="enrollments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}