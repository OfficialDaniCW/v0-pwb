-- Migrate scheduled blog posts to database
-- This script inserts the scheduled posts from lib/blog-posts.tsx into the database

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
) VALUES
(
  'How Often Should You Clean Your Roof in Dorset? Seasonal Guide',
  'how-often-clean-roof-dorset-seasonal-maintenance-guide',
  'How often should you get your roof cleaned in Dorset? Expert seasonal recommendations for moss, algae, and lichen prevention in Purbeck.',
  '<h1>How Often Should You Clean Your Roof? Dorset Seasonal Maintenance Guide</h1><p>Knowing how frequently to clean your roof is crucial for protecting your property. Our Dorset specialists recommend biannual cleaning in spring and autumn to prevent moss, algae, and lichen damage. High-moisture areas like Swanage may benefit from quarterly maintenance. Contact us for a personalized roof maintenance assessment.</p>',
  'Maintenance Tips',
  false,
  '2026-03-15'::timestamp,
  null,
  5,
  'PowerWash Bros',
  ARRAY['roof cleaning', 'roof maintenance', 'moss prevention', 'seasonal care', 'Dorset', 'how often']
),
(
  'Commercial Pressure Washing Services Dorset - Business Solutions',
  'commercial-pressure-washing-services-dorset-industrial-cleaning',
  'Professional commercial pressure washing for Dorset businesses. Industrial cleaning solutions for forecourts, retail parks, warehouses & factories.',
  '<h1>Commercial Pressure Washing Services Dorset</h1><p>Protect your business image with professional commercial pressure washing. We service forecourts, retail parks, industrial units, and warehouses across Dorset. Our PowerUps biocide treatments ensure long-lasting cleanliness and professional appearance for commercial properties.</p>',
  'Commercial Services',
  false,
  '2026-04-01'::timestamp,
  null,
  7,
  'PowerWash Bros',
  ARRAY['commercial cleaning', 'pressure washing', 'industrial cleaning', 'business services', 'Dorset', 'forecourt cleaning']
),
(
  'Before and After: Transform Your Home with Professional Cleaning',
  'before-after-professional-property-cleaning-transformations-dorset',
  'See stunning before and after transformations. Professional cleaning projects across Dorset show the power of expert exterior cleaning services.',
  '<h1>Property Transformation: Before & After Professional Cleaning</h1><p>Explore our gallery of remarkable property transformations. From moss-covered roofs to grimy driveways, see how professional cleaning restores your property''s curb appeal. Visit our portfolio for more stunning Dorset cleaning results.</p>',
  'Case Studies',
  false,
  '2026-04-15'::timestamp,
  null,
  6,
  'PowerWash Bros',
  ARRAY['before after', 'transformations', 'case studies', 'property cleaning', 'results', 'Dorset']
),
(
  'Driveway Sealing After Pressure Washing - Protection Guide',
  'driveway-sealing-after-pressure-washing-protection-guide',
  'Should you seal your driveway after pressure washing? Expert guide on driveway protection and sealant options for Dorset properties.',
  '<h1>Driveway Sealing After Pressure Washing: Complete Protection Guide</h1><p>After professional pressure washing, sealing protects your investment. Learn about driveway sealant options, timing, and benefits for Dorset properties. Our specialists can recommend the best protection strategy for your specific driveway type.</p>',
  'Expert Tips',
  false,
  '2026-05-01'::timestamp,
  null,
  6,
  'PowerWash Bros',
  ARRAY['driveway sealing', 'pressure washing', 'driveway protection', 'maintenance', 'Dorset', 'preservation']
),
(
  'Solar Panel Cleaning Benefits - Increase Energy Output by 25%',
  'solar-panel-cleaning-benefits-increase-energy-efficiency-dorset',
  'Increase solar panel efficiency by up to 25%. Learn why regular professional solar panel cleaning is essential for maximum energy output in Dorset.',
  '<h1>Solar Panel Cleaning Benefits: Maximize Energy Efficiency</h1><p>Dirty solar panels lose up to 25% efficiency. Professional cleaning restores output, improves ROI on your renewable investment, and extends panel lifespan. Dorset''s coastal climate requires regular maintenance for optimal performance.</p>',
  'Expert Tips',
  false,
  '2026-05-15'::timestamp,
  null,
  6,
  'PowerWash Bros',
  ARRAY['solar panels', 'energy efficiency', 'renewable energy', 'maintenance', 'Dorset', 'cleaning']
),
(
  'Roof Cleaning vs Moss Treatment - What''s the Difference?',
  'roof-cleaning-vs-moss-treatment-professional-comparison',
  'Confused about roof cleaning vs moss treatment? Expert comparison explaining the difference and when to use each service for Dorset homes.',
  '<h1>Roof Cleaning vs Moss Treatment: Complete Comparison</h1><p>Roof cleaning removes visible debris; moss treatment prevents biological growth. Both are essential for complete protection. Our integrated approach combines soft wash cleaning with PowerUps biocide for lasting results on Dorset properties.</p>',
  'Expert Tips',
  false,
  '2026-06-01'::timestamp,
  null,
  5,
  'PowerWash Bros',
  ARRAY['roof cleaning', 'moss treatment', 'biocide', 'comparison', 'Dorset', 'maintenance']
)
ON CONFLICT (slug) DO NOTHING;
