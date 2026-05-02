import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, Radio, ClipboardList, FileText, HelpCircle, CheckCircle2, Lock } from 'lucide-react';
import { formatDuration } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  duration_minutes: number;
  is_free: boolean;
}

interface Chapter {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface ChapterListProps {
  chapters: Chapter[];
  completedLessons: string[];
  courseSlug: string;
  onLessonClick: (lessonId: string) => void;
}

export function ChapterList({
  chapters,
  completedLessons,
  courseSlug,
  onLessonClick,
}: ChapterListProps) {
  const [openChapters, setOpenChapters] = useState<Set<string>>(
    new Set(chapters.length > 0 ? [chapters[0].id] : [])
  );

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const getCompletedCount = (lessons: Lesson[]) => {
    return lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  };

  return (
    <div className="overflow-y-auto h-full">
      {chapters.map((chapter) => {
        const isOpen = openChapters.has(chapter.id);
        const completedCount = getCompletedCount(chapter.lessons);
        const totalLessons = chapter.lessons.length;

        return (
          <div key={chapter.id} className="border-b border-border">
            <Button
              variant="ghost"
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-none"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold text-sm text-left">{chapter.title}</span>
                <span className="text-xs text-muted-foreground">
                  {completedCount}/{totalLessons} aulas
                </span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>

            {isOpen && (
              <div className="bg-muted/20">
                {chapter.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = !lesson.is_free;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onLessonClick(lesson.id)}
                      disabled={isLocked}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 pl-6 text-left transition-colors',
                        !isLocked && 'hover:bg-muted/50 cursor-pointer',
                        isLocked && 'cursor-not-allowed opacity-60'
                      )}
                    >
                      <div className="text-muted-foreground">
                        <PlayCircle className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{lesson.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDuration(lesson.duration_minutes * 60)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                        {isLocked && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}