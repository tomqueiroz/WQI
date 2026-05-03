-- Remover políticas conflitantes e recriar com nome único
DROP POLICY IF EXISTS "blog_posts_public_read" ON blog_posts;
DROP POLICY IF EXISTS "public_read_blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read" ON blog_posts;

-- Garantir que RLS está habilitado
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Criar política de leitura pública para posts publicados
CREATE POLICY "blog_posts_anon_read_2026_05_03"
ON blog_posts FOR SELECT
TO public
USING (is_published = true);

-- Política de update anônimo para incrementar views
DROP POLICY IF EXISTS "blog_posts_anon_update_views" ON blog_posts;
CREATE POLICY "blog_posts_anon_update_views"
ON blog_posts FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Verificar
SELECT schemaname, tablename, policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'blog_posts';
