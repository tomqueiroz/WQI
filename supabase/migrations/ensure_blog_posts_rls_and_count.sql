
-- Garantir que RLS está habilitado e que há política de leitura pública
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Remover política antiga se existir e criar nova
DROP POLICY IF EXISTS "blog_posts_public_read" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;

CREATE POLICY "blog_posts_public_read" ON public.blog_posts
  FOR SELECT
  TO public
  USING (is_published = true);

-- Garantir política de update para visualizações
DROP POLICY IF EXISTS "Anyone can increment views" ON public.blog_posts;
CREATE POLICY "Anyone can increment views" ON public.blog_posts
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Verificar contagem
SELECT COUNT(*) as total_posts, COUNT(*) FILTER (WHERE is_published = true) as published_posts
FROM public.blog_posts;
