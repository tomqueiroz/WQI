import { useState } from 'react';
import { useCourses, useEnrollments } from '@/hooks/useLMS';
import { CourseCard } from '@/components/lms/CourseCard';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LMS_ROUTES, getLevelLabel } from '@/lib/index';

export default function CoursesPage() {
  const { user } = useAuth();
  const { courses, loading: coursesLoading } = useCourses();
  const { enrolledCourseIds, loading: enrollmentsLoading } = useEnrollments();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const loading = coursesLoading || enrollmentsLoading;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = activeLevel === 'all' || course.level === activeLevel;
    return matchesSearch && matchesLevel;
  });

  const coursesWithChapterCount = filteredCourses.map((course) => ({
    ...course,
    chapters_count: 0,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            to={LMS_ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">Catálogo de Cursos</h1>
            <p className="text-muted-foreground">
              Explore todos os cursos disponíveis e continue sua jornada de aprendizado
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos por título ou descrição..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeLevel === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveLevel('all')}
            className="rounded-full"
          >
            Todos os Níveis
          </Button>
          <Button
            variant={activeLevel === 'beginner' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveLevel('beginner')}
            className="rounded-full"
          >
            {getLevelLabel('beginner')}
          </Button>
          <Button
            variant={activeLevel === 'intermediate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveLevel('intermediate')}
            className="rounded-full"
          >
            {getLevelLabel('intermediate')}
          </Button>
          <Button
            variant={activeLevel === 'advanced' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveLevel('advanced')}
            className="rounded-full"
          >
            {getLevelLabel('advanced')}
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery
                ? 'Tente ajustar os filtros ou buscar por outro termo'
                : 'Não há cursos disponíveis no momento'}
            </p>
            {(searchQuery || activeLevel !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveLevel('all');
                }}
                className="rounded-full"
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesWithChapterCount.map((course) => (
                <CourseCard
                  key={course.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  course={{ ...course, level: course.level as any }}
                  enrolled={enrolledCourseIds.includes(course.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
