-- 1. Verificar quantos posts existem
SELECT COUNT(*) as total, 
       COUNT(*) FILTER (WHERE is_published = true) as published,
       COUNT(*) FILTER (WHERE is_published = false) as unpublished
FROM blog_posts;

-- 2. Garantir que todos estejam publicados
UPDATE blog_posts SET is_published = true WHERE is_published IS NULL OR is_published = false;

-- 3. Listar todos os slugs existentes
SELECT slug, title, is_published, is_featured FROM blog_posts ORDER BY published_at DESC LIMIT 30;
