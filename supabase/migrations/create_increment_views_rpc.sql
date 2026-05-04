
-- Criar função para incrementar views_count de forma segura
CREATE OR REPLACE FUNCTION public.increment_blog_views(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blog_posts
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE slug = post_slug AND is_published = true;
END;
$$;

-- Dar permissão de execução para qualquer usuário
GRANT EXECUTE ON FUNCTION public.increment_blog_views(text) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_blog_views(text) TO authenticated;
