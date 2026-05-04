
-- Verificar todos os posts publicados
SELECT id, slug, title, is_published, is_featured, 
       published_at, category
FROM public.blog_posts
WHERE is_published = true
ORDER BY published_at DESC;
