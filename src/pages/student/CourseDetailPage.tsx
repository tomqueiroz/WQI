import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Layers } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse, useEnrollments, useLessonProgress } from '@/hooks/useLMS';
import { getLevelLabel } from '@/lib/index';
import { ChapterList } from '@/components/lms/ChapterList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { course, chapters, loading } = useCourse(slug || '');
  const { enrolledCourseIds } = useEnrollments();
  const { progressMap } = useLessonProgress(course?.id);

  const isEnrolled = course ? enrolledCourseIds.includes(course.id) : false;
  const completedLessonIds = Object.keys(progressMap).filter(
    (lessonId) => progressMap[lessonId]?.completed
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleLessonClick = (lessonId: string) => {
    if (!course) return;

    if (isEnrolled) {
      navigate(`/learn/${course.slug}/${lessonId}`);
    } else {
      const enrollmentCard = document.getElementById('enrollment-card');
      enrollmentCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast({
        title: 'Matrícula necessária',
        description: 'Você precisa estar matriculado para acessar as aulas.',
        variant: 'destructive',
      });
    }
  };

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      toast({
        title: 'Entre em contato',
        description: 'Para se matricular neste curso, entre em contato através do formulário na página inicial.',
      });
    }
  };

  const handleContinueLearning = () => {
    if (course && chapters.length > 0 && chapters[0].lessons && chapters[0].lessons.length > 0) {
      const firstLesson = chapters[0].lessons[0];
      navigate(`/learn/${course.slug}/${firstLesson.id}`);
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-24 mb-6" />
          <Skeleton className="w-full h-72 rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Curso não encontrado</p>
              <Button onClick={handleBack} className="mt-4">
                Voltar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const learningPoints = [
    'Fundamentos de IA Generativa aplicada ao Marketing',
    'Estratégias práticas para implementação de IA',
    'Ferramentas essenciais e casos de uso reais',
    'Otimização de campanhas com inteligência artificial',
    'Análise de dados e métricas de performance',
    'Tendências e futuro do Marketing Digital com IA',
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {course.thumbnail_url && (
          <div className="relative w-full aspect-video md:max-h-72 rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className={getLevelBadgeColor(course.level)}>
                  {getLevelLabel(course.level)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration_hours}h
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {chapters.length} capítulos
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {course.description}
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  O que você vai aprender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {learningPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Conteúdo do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <ChapterList
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  chapters={chapters as any}
                  completedLessons={completedLessonIds}
                  courseSlug={course.slug}
                  onLessonClick={handleLessonClick}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Instrutor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Avatar className="w-16 h-16 flex-shrink-0">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xl font-bold">
                      WQ
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Wellington Queiroz</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Professor FGV EAESP | CMO/CAIO
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      CMO | CAIO Fracionado com +20 anos de experiência executiva em C-suite.
                      Pioneiro em IA Generativa desde 2021, com resultados comprovados em grandes
                      marcas como Sony, Honda, Rakuten e Shell.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card id="enrollment-card" className="lg:sticky lg:top-8 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nível</span>
                  <Badge className={getLevelBadgeColor(course.level)}>
                    {getLevelLabel(course.level)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-semibold">{course.duration_hours}h</span>
                </div>
                <div className="border-t pt-4">
                  {isEnrolled ? (
                    <Button
                      onClick={handleContinueLearning}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all"
                      size="lg"
                    >
                      Continuar Aprendendo
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEnrollClick}
                      className="w-full font-semibold transition-all"
                      size="lg"
                    >
                      Quero me Matricular
                    </Button>
                  )}
                </div>
                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Acesso vitalício ao conteúdo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Certificado de conclusão</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Suporte direto do instrutor</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}