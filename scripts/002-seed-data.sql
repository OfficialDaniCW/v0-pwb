-- Seed Data for PowerWash Bros

-- Service Areas
INSERT INTO service_areas (town_name, postcode_area) VALUES
('Bournemouth', 'BH1-BH11'),
('Poole', 'BH12-BH17'),
('Swanage', 'BH19'),
('Purbeck', 'BH19-BH20'),
('Wimborne', 'BH21'),
('Christchurch', 'BH23'),
('Wareham', 'BH20'),
('Ferndown', 'BH22')
ON CONFLICT DO NOTHING;

-- Sample Transformations
INSERT INTO transformations (title, location, service_type, before_image_url, after_image_url, description, featured, display_order) VALUES
('Victorian Terrace Transformation', 'Swanage, Purbeck', 'Driveway Cleaning', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', 'Complete restoration of original Victorian block paving using PowerUps Bio-Clean in the heart of Purbeck', true, 1),
('Heritage Roof Revival', 'Corfe Castle, Purbeck', 'Roof Cleaning', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', 'Gentle moss removal with biocide treatment on Purbeck stone building', true, 2),
('Commercial Excellence', 'Poole', 'Commercial', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', 'Office building exterior and patio restoration', true, 3),
('Patio Paradise', 'Swanage', 'Patio Cleaning', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', 'Purbeck stone patio cleaned and protected', true, 4),
('Gutter Rescue', 'Wareham, Purbeck', 'Gutter Cleaning', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', 'Blocked gutters cleared preventing water damage on Purbeck property', true, 5),
('Historic Stonework', 'Worth Matravers, Purbeck', 'Heritage', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', 'Careful cleaning of Grade II listed Purbeck stone property', true, 6)
ON CONFLICT DO NOTHING;

-- Sample Testimonials with proper location column
INSERT INTO testimonials (customer_name, property_type, location, service, quote, rating, featured, display_order) VALUES
('Sarah M.', '1930s Semi-Detached', 'Swanage', 'Driveway Restoration', 'PowerWash Bros transformed our 1930s driveway. They took time to explain the biocide treatment and the results are stunning. Six months later and it still looks brand new!', 5, true, 1),
('James R.', 'Commercial Portfolio', 'Purbeck Area', 'Multiple Services', 'As a property manager across Purbeck, I have worked with many cleaning companies. PWB''s property-centered approach is genuine - they treat each building uniquely and their PowerUps products deliver consistently excellent results.', 5, true, 2),
('Elizabeth H.', 'Grade II Listed', 'Corfe Castle', 'Heritage Building', 'Our listed Purbeck stone building required specialist care and PWB delivered. They understood the heritage aspects and worked with such attention to detail. Highly recommend for historic properties.', 5, true, 3),
('David T.', 'Modern Detached', 'Swanage', 'Roof & Gutter Cleaning', 'Living in Purbeck means dealing with constant moss growth. PWB''s biocide treatment has kept our roof clean for over a year now. Worth every penny.', 5, true, 4),
('Margaret W.', 'Victorian Terrace', 'Wareham', 'Patio Cleaning', 'Our Purbeck stone patio was completely green. The transformation is incredible and they were so careful with the historic stonework.', 5, true, 5)
ON CONFLICT DO NOTHING;

-- Sample Blog Posts with Purbeck focus
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, published_at, is_published, meta_title, meta_description, read_time_minutes) VALUES
(
  'What is Moss? Understanding This Common Purbeck Property Problem',
  'what-is-moss-understanding-property-problem',
  'Learn why moss damages Purbeck properties and how to prevent it with professional biocide treatments.',
  'Moss might look harmless, almost charming in that cottage-garden way. But here''s the reality: every day moss remains on your Purbeck property roof, it''s holding moisture against your tiles, pushing its roots under tiles and into joints, blocking your gutters and drainage, adding weight to your roof structure, and shortening your roof''s lifespan by years.

We''ve seen it hundreds of times across Purbeck and Dorset properties. A £200 moss treatment today, or a £3000+ roof repair in two years. Let''s talk about why this matters and what you can do about it.

## What is Moss?

Moss is a non-vascular plant that thrives in damp, shaded conditions - conditions that Purbeck''s coastal climate provides in abundance. Unlike flowering plants, moss doesn''t have true roots - instead it has rhizoids that attach to surfaces and absorb moisture directly.

## Why Moss Damages Purbeck Properties

In Purbeck''s climate, moss finds perfect growing conditions on roofs, walls, and hard surfaces. The damage it causes includes:

- **Moisture Retention**: Moss acts like a sponge, holding water against your property surfaces
- **Physical Damage**: Rhizoids penetrate joints and under tiles, causing structural issues
- **Weight**: Saturated moss adds significant weight to roofs
- **Drainage Blocking**: Moss growth blocks gutters and channels water incorrectly

## Our PowerUps Solution

At PowerWash Bros, based right here in Swanage, we use our PowerUps Bio-Clean treatment to eliminate moss at the source. Unlike simple pressure washing, our biocide treatment continues working after we leave, preventing regrowth for months or even years.',
  'Property Maintenance',
  ARRAY['moss', 'roof care', 'biocide', 'property damage', 'purbeck'],
  NOW() - INTERVAL '7 days',
  true,
  'What is Moss? Purbeck Property Guide | PowerWash Bros Swanage',
  'Learn why moss damages Purbeck properties and how biocide treatments provide long-term protection. Expert advice from Swanage.',
  8
),
(
  'The True Cost of Neglecting Roof Maintenance in Purbeck',
  'true-cost-neglecting-roof-maintenance-purbeck',
  'Why a £200 clean today saves £3000+ in roof repairs tomorrow for Purbeck homeowners.',
  'Your roof is one of your property''s most important defences against the elements - and in Purbeck, with our coastal weather and abundant tree coverage, roof maintenance is even more critical. In this article, we break down the real costs of neglecting roof care for Purbeck properties.

## The £200 vs £3000 Decision

Regular roof maintenance, including moss removal and biocide treatment, typically costs around £200-400 depending on property size in Swanage and surrounding Purbeck areas. Skip this maintenance, and you could face:

- Tile replacement: £1500-3000
- Rafter repairs: £2000-5000
- Interior water damage: £1000-10000+
- Emergency repairs: Premium rates + stress

## What Causes Roof Damage in Purbeck?

Purbeck''s unique climate creates specific challenges:

1. **Moss Growth**: Our damp climate accelerates moss growth
2. **Coastal Salt**: Swanage and coastal properties face salt corrosion
3. **Tree Coverage**: Purbeck''s wooded areas mean more organic debris
4. **Historic Materials**: Many Purbeck stone roofs need specialist care

## Our Preventative Approach

At PowerWash Bros, based in Swanage, we don''t just clean your roof - we protect it. Our process includes thorough inspection, gentle moss removal, PowerUps Bio-Clean application, gutter clearing, and maintenance recommendations specific to Purbeck properties.

The cost of prevention is always less than the cost of repair.',
  'Prevention Tips',
  ARRAY['roof maintenance', 'prevention', 'cost savings', 'property care', 'purbeck', 'swanage'],
  NOW() - INTERVAL '14 days',
  true,
  'Roof Maintenance Costs Purbeck | PowerWash Bros Swanage',
  'Why £200 roof maintenance prevents £3000+ repairs for Purbeck properties. Expert advice from Swanage-based specialists.',
  6
),
(
  'Caring for Purbeck Stone: A Property Owner''s Guide',
  'caring-for-purbeck-stone-property-guide',
  'Essential guide to maintaining and cleaning Purbeck stone properties with specialist techniques.',
  'Purbeck stone is one of the region''s most beautiful and historic building materials. From medieval churches to Victorian cottages across Swanage, Corfe Castle, and Worth Matravers, Purbeck stone defines our area''s character. But this precious stone needs specialist care.

## What is Purbeck Stone?

Purbeck stone (technically Purbeck marble) is a fossiliferous limestone quarried locally for centuries. Its unique composition makes it beautiful but also requires specific cleaning techniques.

## Why Purbeck Stone Needs Specialist Care

Standard pressure washing can damage Purbeck stone by:
- Eroding the softer limestone matrix
- Forcing water into the stone''s porous structure
- Damaging fossil details and surface patina
- Removing protective mineral layers

## Our Purbeck Stone Approach

At PowerWash Bros, based in Swanage, we understand Purbeck stone intimately. Our approach includes:

1. **Assessment**: Identifying stone condition and specific needs
2. **Gentle Cleaning**: Low-pressure soft wash techniques
3. **Biocide Treatment**: Preventing organic growth without damage
4. **Protection**: Recommendations for long-term stone health

## When to Clean Purbeck Stone

- Green algae or black lichen visible
- Annual maintenance for coastal properties
- Before repointing or restoration work
- After construction or renovation

As Swanage locals, we''ve cleaned hundreds of Purbeck stone properties and understand what this beautiful material needs.',
  'Property Maintenance',
  ARRAY['purbeck stone', 'heritage', 'stone cleaning', 'swanage', 'specialist care'],
  NOW() - INTERVAL '21 days',
  true,
  'Purbeck Stone Cleaning Guide | PowerWash Bros Swanage',
  'Expert guide to cleaning and maintaining Purbeck stone properties. Specialist advice from Swanage-based heritage cleaning experts.',
  10
)
ON CONFLICT DO NOTHING;
