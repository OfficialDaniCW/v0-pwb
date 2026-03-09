-- Add January 2026 blog post
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  is_published,
  published_at,
  featured_image_url,
  read_time_minutes,
  author,
  tags
) VALUES (
  'Winter Roof Maintenance - Preventing Ice Damage in Dorset',
  'winter-roof-maintenance-preventing-ice-damage-dorset',
  'Prepare your Dorset home for winter. Expert guide on roof maintenance, gutter cleaning, and ice dam prevention for coastal properties.',
  '<h1>Winter Roof Maintenance: Preventing Ice Damage in Dorset</h1><p>Winter weather poses unique challenges for Dorset properties. Coastal winds and moisture create conditions for moss, algae, and ice buildup. Learn how professional winter roof maintenance protects your investment from seasonal damage and extends roof lifespan.</p>',
  'Seasonal Maintenance',
  true,
  '2026-01-01'::timestamp,
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800',
  5,
  'PowerWash Bros',
  ARRAY['roof maintenance', 'winter care', 'ice damage']
);

-- Add February 2026 blog post
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  is_published,
  published_at,
  featured_image_url,
  read_time_minutes,
  author,
  tags
) VALUES (
  'Spring Cleaning Checklist - Prepare Your Property After Winter',
  'spring-cleaning-checklist-prepare-property-after-winter',
  'Get ready for spring with our comprehensive property cleaning checklist. Remove winter grime, moss, and prepare for the warmer months.',
  '<h1>Spring Cleaning Checklist: Prepare Your Property After Winter</h1><p>As spring approaches, it''s time to refresh your property after winter. This guide covers everything from roof cleaning to driveway restoration. Professional spring cleaning restores your property''s appearance and prepares it for the year ahead.</p>',
  'Seasonal Maintenance',
  true,
  '2026-02-01'::timestamp,
  'https://images.unsplash.com/photo-1584622181404-fa8c37e4f84b?w=800',
  6,
  'PowerWash Bros',
  ARRAY['spring cleaning', 'seasonal care', 'property maintenance']
);
