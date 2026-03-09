-- Fix blog post dates to 1st of each month
UPDATE blog_posts 
SET published_at = '2026-03-01'::timestamp
WHERE slug = 'how-often-clean-roof-dorset-seasonal-maintenance-guide';

UPDATE blog_posts 
SET published_at = '2026-04-01'::timestamp
WHERE slug = 'commercial-pressure-washing-services-dorset-industrial-cleaning';

UPDATE blog_posts 
SET published_at = '2026-05-01'::timestamp
WHERE slug = 'before-after-professional-property-cleaning-transformations-dorset';

UPDATE blog_posts 
SET published_at = '2026-05-01'::timestamp
WHERE slug = 'driveway-sealing-after-pressure-washing-protection-guide';

UPDATE blog_posts 
SET published_at = '2026-06-01'::timestamp
WHERE slug = 'solar-panel-cleaning-benefits-increase-energy-efficiency-dorset';

UPDATE blog_posts 
SET published_at = '2026-07-01'::timestamp
WHERE slug = 'roof-cleaning-vs-moss-treatment-professional-comparison';
