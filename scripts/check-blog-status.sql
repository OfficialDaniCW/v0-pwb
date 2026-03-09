-- Check all blog posts ordered by published_at
SELECT 
  id,
  title,
  slug,
  is_published,
  published_at,
  updated_at
FROM blog_posts
ORDER BY published_at DESC
LIMIT 20;
