import { useState, useEffect } from 'react';
import { useStudentList } from '@/hooks/useLMS';
import { supabase } from '@/integrations/supabase/client';
import type { Profile } from '@/lib/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search, Download } from 'lucide-react';

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  payment_status: string;
  created_at: string;
  course?: {
    title: string;
  };
}

export default function AdminStudentsPage() {
  const { students, loading } = useStudentList();
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollmentCounts, setEnrollmentCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchEnrollmentCounts() {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('user_id, course_id');

        if (error) throw error;

        const counts: Record<string, number> = {};
        (data || []).forEach((enrollment) => {
          counts[enrollment.user_id] = (counts[enrollment.user_id] || 0) + 1;
        });

        setEnrollmentCounts(counts);
      } catch (err) {
        console.error('Erro ao carregar contagem de matrículas:', err);
      }
    }

    if (students.length > 0) {
      fetchEnrollmentCounts();
    }
  }, [students]);

  const filteredStudents = students.filter(
    (student) =>
      student.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    if (!name) return 'NA';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleExportCSV = () => {
    const headers = ['Nome', 'Email', 'Empresa', 'Cursos Matriculados', 'Data de Cadastro'];
    const rows = filteredStudents.map((student) => [
      student.full_name || '',
      student.email,
      student.company || '',
      enrollmentCounts[student.id] || 0,
      formatDate(student.created_at),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `alunos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Alunos</h1>
              <p className="text-muted-foreground mt-1">Gerencie todos os alunos da plataforma</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{students.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Cadastrados na plataforma</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alunos com Matrículas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {Object.keys(enrollmentCounts).length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Com pelo menos um curso</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Alunos</CardTitle>
                  <CardDescription>Visualize e exporte dados dos alunos</CardDescription>
                </div>
                <Button onClick={handleExportCSV} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou empresa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aluno</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-center">Cursos Matriculados</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            {searchQuery
                              ? 'Nenhum aluno encontrado com os critérios de busca'
                              : 'Nenhum aluno cadastrado'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={student.avatar_url || undefined} />
                                  <AvatarFallback className="bg-accent text-accent-foreground">
                                    {getInitials(student.full_name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{student.full_name || 'Sem nome'}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{student.email}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {student.company || '-'}
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                {enrollmentCounts[student.id] || 0}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(student.created_at)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
