import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getLevelLabel, LMS_ROUTES } from '@/lib/index';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail_url?: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration_hours: number;
    chapters_count: number;
    is_published: boolean;
  };
  enrolled?: boolean;
  progress?: number;
}

export function CourseCard({ course, enrolled = false, progress = 0 }: CourseCardProps) {
  const getLevelBadgeClasses = (level: 'beginner' | 'intermediate' | 'advanced') => {
    const classes = {
      beginner: 'bg-accent/20 text-accent border border-accent/40',
      intermediate: 'bg-primary/20 text-white border border-primary/40',
      advanced: 'bg-destructive/20 text-destructive border border-destructive/40',
    };
    return classes[level];
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-card hover:shadow-2xl transition-all duration-200 border border-border">
        <Link to={LMS_ROUTES.COURSE_DETAIL.replace(':slug', course.slug)} className="block">
          <div className="aspect-video w-full overflow-hidden relative">
            {course.thumbnail_url ? (
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-2 left-2 md:top-3 md:left-3">
              <Badge className={getLevelBadgeClasses(course.level)}>
                {getLevelLabel(course.level)}
              </Badge>
            </div>
          </div>
        </Link>
        <CardContent className="flex-1 p-3 md:p-4 space-y-2 md:space-y-3">
          <Link to={LMS_ROUTES.COURSE_DETAIL.replace(':slug', course.slug)}>
            <h3 className="font-bold text-base md:text-lg line-clamp-2 text-foreground hover:text-primary transition">
              {course.title}
            </h3>
          </Link>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span>{course.duration_hours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
              <span>{course.chapters_count} capítulos</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          {enrolled ? (
            <div className="w-full space-y-2">
              <Progress value={progress} className="h-1.5 md:h-2" />
              <Link to={LMS_ROUTES.COURSE_DETAIL.replace(':slug', course.slug)} className="block">
                <Button className="w-full text-xs md:text-sm bg-accent text-white hover:bg-accent/90">
                  Continuar Aprendendo
                </Button>
              </Link>
            </div>
          ) : (
            <Link to={LMS_ROUTES.COURSE_DETAIL.replace(':slug', course.slug)} className="block w-full">
              <Button className="w-full text-xs md:text-sm" variant="outline">
                Ver Curso
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}