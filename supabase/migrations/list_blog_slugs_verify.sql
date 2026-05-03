-- Verify blog posts slugs
SELECT 
  slug,
  title,
  is_published,
  is_featured,
  published_at
FROM blog_posts 
ORDER BY published_at DESC
LIMIT 30;