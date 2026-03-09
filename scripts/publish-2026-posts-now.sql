UPDATE blog_posts 
SET published_at = '2026-03-09'::timestamp 
WHERE published_at >= '2026-03-15'::timestamp;
