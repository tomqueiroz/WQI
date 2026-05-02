import { useState } from 'react';
import { useCourses } from '@/hooks/useLMS';
import { supabase } from '@/integrations/supabase/client';
import { getLevelLabel } from '@/lib/index';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Course = any;
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminCoursesPage() {
  const { courses, loading, refetch } = useCourses(true);
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    total_hours: 0,
    thumbnail_url: '',
    is_published: false,
  });
  const [saving, setSaving] = useState(false);

  const handleOpenSheet = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        slug: course.slug,
        description: course.description,
        level: course.level,
        total_hours: course.duration_hours ?? course.total_hours ?? 0,
        thumbnail_url: course.thumbnail_url || '',
        is_published: course.is_published,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        level: 'beginner',
        total_hours: 0,
        thumbnail_url: '',
        is_published: false,
      });
    }
    setSheetOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugify(title),
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({
        title: 'Erro',
        description: 'Título e slug são obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);

      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            level: formData.level,
            duration_hours: formData.total_hours,
            thumbnail_url: formData.thumbnail_url || null,
            is_published: formData.is_published,
          })
          .eq('id', editingCourse.id);

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Curso atualizado com sucesso',
        });
      } else {
        const { error } = await supabase.from('courses').insert([{
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          level: formData.level,
          duration_hours: formData.total_hours,
          thumbnail_url: formData.thumbnail_url || null,
          is_published: formData.is_published,
          is_featured: false,
          sort_order: courses.length,
        }]);

        if (error) throw error;

        toast({
          title: 'Sucesso',
          description: 'Curso criado com sucesso',
        });
      }

      setSheetOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao salvar curso',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (course: Course) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !course.is_published })
        .eq('id', course.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: `Curso ${!course.is_published ? 'publicado' : 'despublicado'} com sucesso`,
      });

      refetch();
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao atualizar status',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      const { error } = await supabase.from('courses').delete().eq('id', courseId);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Curso excluído com sucesso',
      });

      refetch();
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao excluir curso',
        variant: 'destructive',
      });
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Gerenciar Cursos</h1>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => handleOpenSheet()} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Curso
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{editingCourse ? 'Editar Curso' : 'Novo Curso'}</SheetTitle>
                  <SheetDescription>
                    {editingCourse ? 'Atualize as informações do curso' : 'Preencha os dados do novo curso'}
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Nome do curso"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-amigavel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Descrição do curso"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Nível</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value as any }))}
                    >
                      <SelectTrigger id="level">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante</SelectItem>
                        <SelectItem value="intermediate">Intermediário</SelectItem>
                        <SelectItem value="advanced">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total_hours">Horas Totais</Label>
                    <Input
                      id="total_hours"
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.total_hours}
                      onChange={(e) => setFormData((prev) => ({ ...prev, total_hours: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">URL da Thumbnail</Label>
                    <Input
                      id="thumbnail_url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail_url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_published: checked }))}
                    />
                    <Label htmlFor="is_published">Publicado</Label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button onClick={handleSave} disabled={saving} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                      {saving ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button variant="outline" onClick={() => setSheetOpen(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Curso</th>
                      <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Nível</th>
                      <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Horas</th>
                      <th className="text-left p-3 md:p-4 font-semibold text-sm md:text-base">Status</th>
                      <th className="text-right p-3 md:p-4 font-semibold text-sm md:text-base">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground text-sm md:text-base">
                          Carregando cursos...
                        </td>
                      </tr>
                    ) : courses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground text-sm md:text-base">
                          Nenhum curso cadastrado
                        </td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 md:p-4">
                            <div className="flex items-center gap-2 md:gap-3">
                              {course.thumbnail_url ? (
                                <img
                                  src={course.thumbnail_url}
                                  alt={course.title}
                                  className="w-10 h-10 md:w-12 md:h-12 rounded object-cover flex-shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs flex-shrink-0">
                                  Sem imagem
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="font-semibold truncate text-sm md:text-base">{course.title}</div>
                                <div className="text-xs md:text-sm text-muted-foreground truncate">{course.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 md:p-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(course.level)}`}>
                              {getLevelLabel(course.level)}
                            </span>
                          </td>
                          <td className="p-3 md:p-4 text-xs md:text-sm">{course.duration_hours}h</td>
                          <td className="p-3 md:p-4">
                            <Switch
                              checked={course.is_published}
                              onCheckedChange={() => handleTogglePublish(course)}
                            />
                          </td>
                          <td className="p-3 md:p-4">
                            <div className="flex items-center justify-end gap-1 md:gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenSheet(course)}
                                className="h-8 w-8 md:h-10 md:w-10"
                              >
                                <Pencil className="w-3 h-3 md:w-4 md:h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                                    <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o curso "{course.title}"? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(course.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}