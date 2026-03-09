-- Fix any scheduled posts that were inserted with is_published = false
-- This ensures all March-June 2026 posts are now visible on the blog

UPDATE blog_posts
SET is_published = true
WHERE slug IN (
  'how-often-clean-roof-dorset-seasonal-maintenance-guide',
  'commercial-pressure-washing-services-dorset-industrial-cleaning',
  'before-after-professional-property-cleaning-transformations-dorset',
  'driveway-sealing-after-pressure-washing-protection-guide',
  'solar-panel-cleaning-benefits-increase-energy-efficiency-dorset',
  'roof-cleaning-vs-moss-treatment-professional-comparison'
);
