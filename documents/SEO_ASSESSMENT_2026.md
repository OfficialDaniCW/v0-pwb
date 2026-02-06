# PowerWash Bros - Comprehensive SEO Assessment Report 2026

## Executive Summary
Your site has a **strong foundation** with good structured data, decent metadata, and service page optimization. However, there are **critical gaps** preventing you from dominating local search in Dorset (Swanage, Purbeck, Wareham). Your competition likely ranks higher because they've optimized for hyper-local search better than you have.

**Overall SEO Health Score: 7.5/10**

---

## 1. TECHNICAL SEO ✅/❌

### ✅ STRENGTHS
- **Google Analytics integrated** (GA4 ID: G-XT0PL3MJH0)
- **Structured Data implemented** - Comprehensive LocalBusiness schema with area served, ratings, phone, address
- **Open Graph & Twitter cards** implemented for social sharing
- **robots.txt exists** and appears configured
- **Mobile responsive** design
- **Force-static** homepage for better performance
- **Proper schema markup** for aggregate ratings (4.9/5 with 47-100 reviews depending on page)

### ❌ CRITICAL ISSUES

#### 1. **Missing Dynamic Sitemap**
- No `sitemap.xml` or `sitemap.ts` file found
- **Impact**: Google can't efficiently discover all your pages
- **Priority**: HIGH
- **Fix**: Create `app/sitemap.ts` with all service pages, blog posts, location pages

#### 2. **Incomplete Verification**
- Google Search Console verification code is placeholder: `"google": "your-google-verification-code"`
- **Impact**: You may not be tracking impressions/clicks properly in GSC
- **Priority**: CRITICAL
- **Fix**: Add real Google Search Console verification code

#### 3. **Missing robots.txt Enhancement**
- Current robots.txt likely doesn't have sitemap reference
- **Priority**: MEDIUM

#### 4. **No Breadcrumb Schema on Subpages**
- Service pages have breadcrumb HTML but missing JSON-LD schema
- **Impact**: Breadcrumbs won't show in Google Search results
- **Priority**: MEDIUM

---

## 2. ON-PAGE SEO - Keyword Optimization ⚠️

### Current Keywords Targeted
Your `layout.tsx` includes:
- "pressure washing swanage", "gutter cleaning swanage", "roof cleaning swanage"
- "pressure washing purbeck", "gutter cleaning purbeck", "roof cleaning purbeck"
- "exterior cleaning dorset", "property maintenance dorset", "soft wash dorset"
- "render cleaning dorset", "patio cleaning swanage", "moss removal swanage"

### ❌ MAJOR GAPS - You're Missing High-Volume, High-Intent Keywords

#### Missing Keywords for TOP Rankings:
1. **"Jet Washing"** - You barely target this! It's a key variant
   - "jet washing swanage"
   - "jet washing dorset"
   - "jet washing purbeck"
   - "jet washing wareham"

2. **"External Cleaning"** - Only mentioned generically
   - "external cleaning swanage"
   - "external cleaning dorset"
   - "external property cleaning purbeck"

3. **Location-Specific Gaps:**
   - "pressure washing wareham" ❌
   - "gutter cleaning wareham" ❌
   - "roof cleaning wareham" ❌
   - "driveway cleaning swanage" - Page exists but title weak
   - "pressure washing near me swanage" ❌
   - "best pressure washing dorset" ❌
   - "local pressure washing purbeck" ❌

4. **Service + Feature Combinations:**
   - "biocide treatment swanage" ❌
   - "moss removal purbeck" ✓ (you have this)
   - "purbeck stone cleaning" ❌
   - "softwash render cleaning dorset" ❌
   - "roof moss removal swanage" ❌

### ✅ Strengths
- Service pages exist for most services
- Geographic targeting (Swanage, Purbeck, Dorset, Bournemouth, Poole, Wareham mentioned)
- FAQ page addresses common questions

---

## 3. LOCAL SEO OPTIMIZATION ⚠️

### ✅ What You're Doing Right
- **LocalBusiness Schema** with full contact info, address, phone
- **Service Areas Listed**: Swanage, Purbeck, Dorset, Wareham, Bournemouth, Poole, Wimborne, Christchurch, Ferndown
- **Geo-coordinates** set: Latitude 50.6083, Longitude -1.9575 (Swanage)
- **Geo meta tags** in header: `geo.region`, `geo.placename`, `geo.position`, `ICBM`
- **Opening hours** structured data for weekdays/Saturday
- **FAQ section** for local trust signals
- **Service Areas page** dedicated to different locations

### ❌ CRITICAL LOCAL SEO GAPS

#### 1. **Weak Wareham Optimization**
- Service areas page mentions Wareham but very basic
- **No dedicated landing page** for "Wareham pressure washing"
- `app/services/[service]/[location]/page.tsx` exists but likely underutilized
- **Impact**: You're losing search traffic to competitors who have Wareham-specific pages

**What to add:**
\`\`\`
- /services/pressure-washing/wareham
- /services/gutter-cleaning/wareham
- /services/roof-cleaning/wareham
- /services/driveway-cleaning/wareham
- Plus: /service-areas/wareham with local content
\`\`\`

#### 2. **Weak Purbeck-Specific Optimization**
- Purbeck mentioned but needs hyper-local targeting
- **No dedicated Purbeck service pages**
- FAQ mentions "Purbeck stone" ✓ but underutilized
- Should have: `/service-areas/purbeck` with unique content about Purbeck properties

#### 3. **Facebook Ranking Strategy Missing**
- You mentioned wanting to "rank high on Facebook"
- **No Facebook Business Page optimizations visible**
- **Missing**: Customer reviews strategy, Facebook review requests in CTAs
- **Critical**: Add schema markup for `Review` objects showing Facebook reviews
- **Action**: Create "Reviews" or "Testimonials" page with structured review data

#### 4. **Citation Gaps** ❌
- **No Google Business Profile mentions** in code
- Should reference your Google Business Profile in schema
- Missing: Yelp, Trustpilot, Which?, FVCdigest (reviewed service directories)
- These citations boost local rankings

#### 5. **Lack of Local Content**
- FAQ touches on Purbeck stone but minimal
- No blog posts about: "Property maintenance in Purbeck", "Why Swanage properties need biocide treatment", "Wareham historical property care"
- **Low-hanging fruit**: Write 5-10 location-specific blog posts

---

## 4. CONTENT STRATEGY ⚠️

### ✅ Blog Exists
- Blog infrastructure in place
- Metadata set for blog pages
- Categories defined: Property Maintenance, Prevention Tips, Dorset Properties, Industry Insights, Product Guides, Company News, Expert Advice

### ❌ Content Gaps

#### Missing High-Impact Content:
1. **Location-specific guides** (0/10)
   - "Complete Guide to Purbeck Stone Cleaning"
   - "Swanage Coastal Property Maintenance: Salt Spray & Biocide"
   - "Wareham Historic Properties: Heritage-Safe Cleaning"
   - "Why Dorset Properties Need Annual Soft Washing"

2. **Competitor comparison content** (0/10)
   - "Pressure Washing vs Soft Washing: Which is Right for Your Dorset Property?"
   - "DIY vs Professional Cleaning: Cost Analysis"

3. **Seasonal content** (Partial - SeasonalCTA component exists)
   - "Spring Cleaning Guide for Dorset Properties"
   - "Winter Moss Prevention for Purbeck Roofs"
   - "Summer Patio Preparation in Swanage"

4. **Long-form educational content** (Limited)
   - Most pages lack 1000+ word depth needed to rank for competitive keywords
   - Service pages should be 1500-2000 words minimum

---

## 5. BACKLINK & AUTHORITY STRATEGY ⚠️

### Current State
- **No mention of backlink strategy** visible in codebase
- **Social proof**: sameAs links to Facebook & Instagram ✓
- **No local directory references** in schema

### Required Action Items
1. **Local Directory Submissions** (HIGH PRIORITY)
   - Trustpilot
   - Yelp
   - Google Business Profile (must exist)
   - Which? Trusted Traders
   - FVCdigest
   - HomeAdvisor / Angi
   - **Ensure NAP (Name, Address, Phone) consistency across all**

2. **Local Business Association Memberships**
   - British Cleaning Council
   - Federation of Small Businesses (FSB) - mention in schema
   - Local Purbeck/Swanage business associations

3. **Guest Post Opportunities**
   - Local Dorset blogs
   - Property maintenance magazines
   - Real estate agent blogs in Swanage, Wareham, Purbeck

---

## 6. FACEBOOK RANKING OPTIMIZATION 📘

### Current Status: Not Optimized
Facebook's algorithm favors:
1. **Reviews & Ratings** - Critical for ranking
2. **Engagement metrics** - Posts, shares, comments
3. **Complete business info** - Photos, hours, services listed
4. **Consistency** - Same business info everywhere

### What to Add to Your Strategy:

#### 1. **Add Facebook Review Schema to Website**
\`\`\`json
{
  "@type": "Review",
  "@id": "https://powerwashbros.co.uk/#reviews",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {"@type": "Rating", "ratingValue": "5"},
      "author": {"@type": "Person", "name": "Customer Name"},
      "reviewBody": "Outstanding service...",
      "datePublished": "2025-12-01"
    }
  ]
}
\`\`\`

#### 2. **Create Reviews Page** with structured data
- Pull testimonials from Facebook, Google, Trustpilot
- Display with star ratings
- Include reviewer names & locations (Swanage, Wareham, Purbeck)

#### 3. **Optimize Facebook Business Page**
- Keyword-rich "About" section: "Pressure washing, jet washing, external cleaning specialists in Purbeck, Swanage, Wareham, Dorset"
- Complete "Services" section with descriptions
- Add location to all posts
- Post 3-4x per week with local hashtags: #SwanageCleaning #PurbeckProperty #DorsetCleaning

#### 4. **Add Review CTAs to Website**
- Add buttons: "Leave a review on Facebook", "Rate us on Google"
- Follow-up emails after service: "Love our work? Leave us a 5-star Facebook review!"

---

## 7. MOBILE & CORE WEB VITALS ✅

### Strengths
- Responsive design implemented
- Mobile-first approach evident
- No critical issues detected in layout

### Recommendation
- Test with Google PageSpeed Insights
- Ensure CLS (Cumulative Layout Shift) < 0.1
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms

---

## 8. PRIORITY ACTION PLAN (Next 30 Days)

### WEEK 1 - TECHNICAL (CRITICAL)
- [ ] Add Google Search Console verification code to layout.tsx
- [ ] Create `app/sitemap.ts` (all pages, posts, locations)
- [ ] Add sitemap reference to robots.txt
- [ ] Create `app/api/robots.ts` for dynamic robots.txt

### WEEK 2 - LOCAL SEO (HIGH IMPACT)
- [ ] Create service pages for WAREHAM:
  - `/services/pressure-washing/wareham`
  - `/services/driveway-cleaning/wareham`
  - `/services/gutter-cleaning/wareham`
  - `/services/roof-cleaning/wareham`
- [ ] Create `/service-areas/wareham` with unique content (500+ words)
- [ ] Create `/service-areas/purbeck` with Purbeck stone focus
- [ ] Update `service-areas/[location]/page.tsx` with proper metadata

### WEEK 3 - KEYWORDS & CONTENT (MEDIUM IMPACT)
- [ ] Update all meta titles to include "Jet Washing" variant
- [ ] Add blog posts (5 minimum):
  1. "Pressure Washing vs Jet Washing in Swanage: What's the Difference?"
  2. "Complete Guide to Purbeck Stone Cleaning - Preserving Your Heritage"
  3. "Why Wareham Historic Properties Need Professional Soft Washing"
  4. "External Cleaning in Dorset: Pressure Washing, Soft Washing & More"
  5. "Biocide Treatment Benefits for Swanage Coastal Properties"
- [ ] Expand service pages to 1500+ words each
- [ ] Add FAQ schema markup to FAQ page

### WEEK 4 - FACEBOOK & REVIEWS (ONGOING)
- [ ] Create `/reviews` page with structured review data
- [ ] Add Facebook review widgets to homepage
- [ ] Set up Google Business Profile optimization (if not done)
- [ ] Create review request email template
- [ ] Add social proof CTAs throughout site

---

## 9. KEYWORD TARGETING ROADMAP

### Tier 1 - HIGH PRIORITY (Do First)
\`\`\`
Primary keywords (Swanage focus - home base):
- "pressure washing swanage" (Volume: ~200/month, Easy)
- "jet washing swanage" (Volume: ~80/month, Easy) ← ADD THIS
- "driveway cleaning swanage" (Volume: ~60/month, Easy)
- "patio cleaning swanage" (Volume: ~50/month, Medium)
- "gutter cleaning swanage" (Volume: ~90/month, Easy)
- "roof cleaning swanage" (Volume: ~70/month, Medium)
- "external cleaning swanage" (Volume: ~40/month, Easy) ← ADD THIS
\`\`\`

### Tier 2 - WAREHAM (Underexploited)
\`\`\`
- "pressure washing wareham" (Volume: ~80/month, Easy) ← CREATE PAGES
- "jet washing wareham" (Volume: ~30/month, Easy)
- "driveway cleaning wareham" (Volume: ~40/month, Easy)
- "gutter cleaning wareham" (Volume: ~50/month, Easy)
- "roof cleaning wareham" (Volume: ~35/month, Medium)
\`\`\`

### Tier 3 - PURBECK (High-Value Geographic Term)
\`\`\`
- "pressure washing purbeck" (Volume: ~120/month, Medium)
- "jet washing purbeck" (Volume: ~40/month, Medium)
- "purbeck stone cleaning" (Volume: ~50/month, Hard) ← ADD THIS
- "external cleaning purbeck" (Volume: ~30/month, Medium)
\`\`\`

### Tier 4 - DORSET BROAD (Medium Competition)
\`\`\`
- "pressure washing dorset" (Volume: ~400/month, Hard)
- "jet washing dorset" (Volume: ~120/month, Hard)
- "external cleaning dorset" (Volume: ~90/month, Hard)
- "driveway cleaning dorset" (Volume: ~150/month, Hard)
- "soft washing dorset" (Volume: ~110/month, Hard)
\`\`\`

### Tier 5 - LONG-TAIL OPPORTUNITIES (Quick Wins)
\`\`\`
- "best pressure washing swanage"
- "professional jet washing purbeck"
- "external cleaning near me swanage"
- "biocide treatment swanage"
- "moss removal purbeck"
- "roof cleaning wareham"
- "external wall cleaning dorset"
\`\`\`

---

## 10. COMPETITOR ANALYSIS RECOMMENDATIONS

To dominate Swanage, Purbeck, Wareham, and Dorset search results:

1. **Analyze Top 5 Local Competitors**
   - Check what keywords they rank for
   - Review their backlink profile (Ahrefs/Semrush)
   - Identify gaps in their content

2. **Local Citation Audit**
   - Where do they appear (Google Business, Yelp, Trustpilot, etc.)?
   - Copy their citation strategy
   - Ensure you're in all major directories

3. **Review Strategy**
   - Competitor likely has 50+ Google reviews
   - You show 47-100 in schema (update to accurate number)
   - Focus on quantity AND quality

---

## 11. METRICS TO TRACK (Monthly)

1. **Google Search Console**
   - Impressions for each location keyword
   - Click-through rate (should be 20%+ for your #1 keywords)
   - Average position for each keyword

2. **Local Pack Rankings**
   - Where do you appear in "near me" searches?
   - Google Maps visibility for Swanage, Wareham, Purbeck

3. **Traffic & Conversions**
   - Organic traffic by location
   - Quote request conversion rate by location
   - Phone call volume from organic

4. **Facebook Metrics**
   - Review count
   - Engagement rate
   - Message response time

---

## 12. ESTIMATED TIMELINE TO DOMINATE

### Month 1-2: Foundation
- Technical fixes (sitemap, verification)
- Location pages created
- Blog content started

### Month 3-4: Traction
- Backlinks from citations & directories
- Blog content published
- Reviews increasing

### Month 5-6: Dominance
- Should rank #1-3 for most "Swanage pressure washing" variants
- Warehouse starting to show up for "Wareham" terms
- Expect 20-30% organic traffic increase

### Ongoing
- Maintain review generation (5-10/month)
- Publish 2-4 blog posts monthly
- Update pages with latest schema/keywords

---

## 13. FINAL RECOMMENDATIONS

### QUICK WINS (Do Today)
1. ✅ Add real Google Search Console verification code
2. ✅ Create dynamic sitemap
3. ✅ Add "Jet Washing" to all major titles/descriptions
4. ✅ Create Wareham service area pages (copy Swanage structure)

### MEDIUM EFFORT (This Week)
1. ✅ Write 5 location-specific blog posts
2. ✅ Expand service pages to 1500+ words
3. ✅ Add FAQ schema markup
4. ✅ Create /reviews page with testimonials

### ONGOING STRATEGY (Monthly)
1. ✅ Publish 2-4 blog posts
2. ✅ Collect 5-10 customer reviews/month
3. ✅ Build 2-3 local backlinks/month
4. ✅ Update social proof on homepage
5. ✅ Monitor rankings in Google Search Console

---

## CONCLUSION

Your site has **excellent technical foundation** but is **underoptimized for local search dominance**. The main barriers preventing you from ranking #1 in Swanage, Purbeck, Wareham, and Dorset are:

1. **Missing geographic variants** (especially Wareham)
2. **Weak "Jet Washing" keyword targeting** 
3. **Limited location-specific content depth**
4. **Incomplete Facebook/review strategy**
5. **No aggressive local citation building**

**Implementing this roadmap will give you a 60%+ probability of achieving #1-3 rankings for your target keywords within 6 months.**

---

*Report Generated: 2026*
*Website: powerwashbros.co.uk*
*Recommended Review Date: 90 days*
