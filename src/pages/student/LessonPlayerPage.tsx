import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse, useLessonProgress, useMarkLessonComplete, useEnrollments } from '@/hooks/useLMS';
import { ChapterList } from '@/components/lms/ChapterList';
import { VideoPlayer } from '@/components/lms/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
// Local lesson type to avoid mismatch with useLMS hook types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Lesson = any;

export default function LessonPlayerPage() {
  const { courseSlug, lessonId } = useParams<{ courseSlug: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { course, chapters, loading: courseLoading } = useCourse(courseSlug || '');
  const { progressMap, loading: progressLoading, refetch: refetchProgress } = useLessonProgress(course?.id);
  const { markComplete } = useMarkLessonComplete();
  const { enrolledCourseIds } = useEnrollments();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const isEnrolled = useMemo(() => {
    return course ? enrolledCourseIds.includes(course.id) : false;
  }, [course, enrolledCourseIds]);

  const lessonsList = useMemo(() => {
    const allLessons: Lesson[] = [];
    chapters.forEach((chapter) => {
      if (chapter.lessons) {
        allLessons.push(...chapter.lessons);
      }
    });
    return allLessons;
  }, [chapters]);

  const currentLesson = useMemo(() => {
    return lessonsList.find((lesson) => lesson.id === lessonId);
  }, [lessonsList, lessonId]);

  const completedLessonIds = useMemo(() => {
    return Object.keys(progressMap).filter((key) => progressMap[key].completed);
  }, [progressMap]);

  const progressPercent = useMemo(() => {
    if (lessonsList.length === 0) return 0;
    return Math.round((completedLessonIds.length / lessonsList.length) * 100);
  }, [completedLessonIds.length, lessonsList.length]);

  const handleComplete = async () => {
    if (!currentLesson || !course) return;

    try {
      await markComplete(currentLesson.id, course.id);
      await refetchProgress();

      const currentIndex = lessonsList.findIndex((l) => l.id === lessonId);
      const nextLesson = lessonsList[currentIndex + 1];

      if (nextLesson) {
        navigate(`/learn/${courseSlug}/${nextLesson.id}`);
      } else {
        setShowCompletionModal(true);
      }
    } catch (err) {
      console.error('Erro ao marcar aula como concluída:', err);
    }
  };

  const navigateToLesson = (targetLessonId: string) => {
    navigate(`/learn/${courseSlug}/${targetLessonId}`);
  };

  const handleBackToCourse = () => {
    navigate(`/courses/${courseSlug}`);
  };

  const handleGoToCourses = () => {
    setShowCompletionModal(false);
    navigate('/courses');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Você precisa estar logado para acessar esta aula</p>
          <Button onClick={() => navigate('/login')}>Fazer Login</Button>
        </div>
      </div>
    );
  }

  if (courseLoading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando aula...</p>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Aula não encontrada</p>
          <Button onClick={() => navigate('/courses')}>Voltar aos Cursos</Button>
        </div>
      </div>
    );
  }

  if (!isEnrolled && !currentLesson.is_preview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-lg font-semibold mb-2">Acesso Restrito</p>
          <p className="text-muted-foreground mb-6">
            Você precisa estar matriculado neste curso para acessar esta aula.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleBackToCourse}>Ver Detalhes do Curso</Button>
            <Button variant="outline" onClick={() => navigate('/courses')}>
              Voltar aos Cursos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="h-14 bg-primary text-white flex items-center px-4 gap-3 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackToCourse}
          className="text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <h1 className="flex-1 truncate text-sm md:text-base font-medium">{course.title}</h1>

        <span className="text-xs text-white/70 hidden md:block">
          {completedLessonIds.length}/{lessonsList.length}
        </span>

        <div className="w-24 md:w-32 hidden md:block">
          <Progress value={progressPercent} className="h-2 bg-white/20" />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80 p-0">
            <div className="p-4 border-b bg-card">
              <h2 className="font-semibold text-lg">Capítulos</h2>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <span className="font-medium">
                  {completedLessonIds.length}/{lessonsList.length}
                </span>
                <Progress value={progressPercent} className="flex-1 h-2" />
              </div>
            </div>
            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 88px)' }}>
              <ChapterList
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                chapters={chapters as any}
                completedLessons={completedLessonIds}
                courseSlug={courseSlug || ''}
                onLessonClick={navigateToLesson}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="pt-14 flex flex-col lg:flex-row h-[calc(100vh-56px)]">
        <main className="flex-1 overflow-y-auto bg-background">
          <VideoPlayer
            videoUrl={currentLesson.video_url || ''}
            title={currentLesson.title}
            onComplete={handleComplete}
            autoPlay={false}
          />
        </main>

        <aside className="w-full lg:w-80 xl:w-96 hidden lg:flex flex-col border-l bg-card overflow-y-auto">
          <div className="p-4 border-b sticky top-0 bg-card z-10">
            <h2 className="font-semibold text-lg mb-3">Capítulos</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">
                {completedLessonIds.length}/{lessonsList.length}
              </span>
              <Progress value={progressPercent} className="flex-1 h-2" />
            </div>
          </div>
          <ChapterList
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chapters={chapters as any}
            completedLessons={completedLessonIds}
            courseSlug={courseSlug || ''}
            onLessonClick={navigateToLesson}
          />
        </aside>
      </div>

      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="w-12 h-12 text-accent" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold">
              Parabéns! Curso Concluído!
            </DialogTitle>
            <DialogDescription className="text-center text-base mt-2">
              Você completou todas as aulas deste curso. Continue sua jornada de aprendizado explorando
              outros cursos disponíveis na plataforma.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={handleGoToCourses} className="w-full" size="lg">
              Explorar Mais Cursos
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCompletionModal(false)}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}