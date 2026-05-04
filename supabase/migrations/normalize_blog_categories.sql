
-- Padronizar categorias dos posts do blog
UPDATE public.blog_posts SET category = 'Insights' WHERE LOWER(category) IN ('insights', 'insight');
UPDATE public.blog_posts SET category = 'Liderança' WHERE LOWER(category) IN ('lideranca', 'liderança', 'lideranca');
UPDATE public.blog_posts SET category = 'Tendências' WHERE LOWER(category) IN ('tendencias', 'tendências');
UPDATE public.blog_posts SET category = 'Carreira' WHERE LOWER(category) IN ('carreira');
UPDATE public.blog_posts SET category = 'Inovação' WHERE LOWER(category) IN ('inovacao', 'inovação');
UPDATE public.blog_posts SET category = 'Estratégia' WHERE LOWER(category) IN ('estrategia', 'estratégia');
UPDATE public.blog_posts SET category = 'Bem-Estar' WHERE LOWER(category) IN ('bem-estar', 'bem-estar');
UPDATE public.blog_posts SET category = 'Governança' WHERE LOWER(category) IN ('governanca', 'governança');
UPDATE public.blog_posts SET category = 'Eventos' WHERE LOWER(category) IN ('eventos', 'evento');
UPDATE public.blog_posts SET category = 'Tech & IA' WHERE LOWER(category) IN ('tech & ia', 'tech&ia');

-- Verificar resultado
SELECT category, COUNT(*) as total FROM public.blog_posts GROUP BY category ORDER BY total DESC;
