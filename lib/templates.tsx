export interface NewsletterTemplate {
  id: string
  name: string
  category: string
  subject_line: string
  description: string
  content: string
  cta_text: string
  cta_url: string
  seasonal?: boolean
  best_sending_period?: string
}

export const newsletterTemplates: NewsletterTemplate[] = [
  {
    id: "spring-maintenance-alert",
    name: "Spring Maintenance Alert",
    category: "Seasonal",
    subject_line: "Spring is Here! Prepare Your Property with Our Maintenance Checklist",
    description: "Spring maintenance reminder encouraging seasonal cleaning services",
    content: `<h2>Spring Property Maintenance Checklist</h2>
<p>As spring arrives, it's the perfect time to refresh your property! After winter weather, your home needs some TLC.</p>
<h3>Essential Spring Services:</h3>
<ul>
<li>Gutter & downpipe cleaning (debris from winter)</li>
<li>Roof inspection & moss treatment</li>
<li>Driveway cleaning & sealing</li>
<li>Patio & decking refresh</li>
<li>Window cleaning</li>
</ul>
<p><strong>Spring Special:</strong> Book any two services and receive 10% off your second service!</p>`,
    cta_text: "Get Spring Quote",
    cta_url: "https://powerwashbros.co.uk/contact?source=spring-newsletter",
    seasonal: true,
    best_sending_period: "March 15-31",
  },
  {
    id: "summer-entertaining",
    name: "Summer Entertaining Special",
    category: "Seasonal",
    subject_line: "Summer Season = Perfect Time for Outdoor Entertaining!",
    description: "Promote outdoor cleaning services for summer entertaining",
    content: `<h2>Get Your Outdoor Spaces Ready for Summer Fun!</h2>
<p>Planning to host friends and family this summer? First impressions start with a pristine outdoor space.</p>
<h3>Perfect for Summer Entertaining:</h3>
<ul>
<li>Patio & decking deep clean</li>
<li>Garden furniture washing</li>
<li>Driveway power washing</li>
<li>Window cleaning for that sparkling finish</li>
</ul>
<p><strong>Limited Time:</strong> Book by May 31st and get 15% off your complete garden refresh package!</p>`,
    cta_text: "Book Now for Summer",
    cta_url: "https://powerwashbros.co.uk/quote?service=patio-decking",
    seasonal: true,
    best_sending_period: "April 15-May 31",
  },
  {
    id: "autumn-storm-prep",
    name: "Autumn Storm Preparation",
    category: "Seasonal",
    subject_line: "Autumn Storms Coming: Protect Your Property!",
    description: "Encourage preventative gutter and roof maintenance before autumn storms",
    content: `<h2>Prepare Your Property for Autumn Storms</h2>
<p>Autumn brings severe weather. Don't let clogged gutters and weak roofs catch you off guard!</p>
<h3>Protect Your Home:</h3>
<ul>
<li>Gutter cleaning (prevents water damage)</li>
<li>Roof inspection & maintenance</li>
<li>Downpipe clearing</li>
<li>Fascia & soffit cleaning</li>
</ul>
<p><strong>Early Bird Offer:</strong> Schedule your autumn maintenance this month and save £50 on any package over £200!</p>`,
    cta_text: "Schedule Maintenance",
    cta_url: "https://powerwashbros.co.uk/services/gutter-cleaning",
    seasonal: true,
    best_sending_period: "August 20-September 15",
  },
  {
    id: "winter-protection",
    name: "Winter Property Protection",
    category: "Seasonal",
    subject_line: "Winter is Coming: Protect Your Property Investment",
    description: "Winter protection and preventative maintenance",
    content: `<h2>Winterproof Your Property Now</h2>
<p>Cold, wet winter months can damage your property. Prepare now!</p>
<h3>Winter Protection Services:</h3>
<ul>
<li>Roof cleaning & ice dam prevention</li>
<li>Gutter clearing for proper water flow</li>
<li>External surfaces cleaning (algae prevention)</li>
<li>Property inspection before harsh weather</li>
</ul>
<p><strong>Winter Bundle:</strong> Roof cleaning + gutter service + exterior wall wash = Save 20%!</p>`,
    cta_text: "Winter Protection Quote",
    cta_url: "https://powerwashbros.co.uk/contact?source=winter-newsletter",
    seasonal: true,
    best_sending_period: "October 15-November 30",
  },
  {
    id: "customer-appreciation",
    name: "Customer Appreciation Month",
    category: "Loyalty",
    subject_line: "Thank You! Enjoy 15% Off Your Next Service",
    description: "Thank loyal customers and offer discount on next service",
    content: `<h2>We Appreciate Your Business!</h2>
<p>To our valued clients: Thank you for choosing PowerWash Bros. Your trust means everything to us.</p>
<p>As a token of our appreciation, we're offering our loyal customers an exclusive discount!</p>
<h3>Your Special Offer:</h3>
<p><strong>15% OFF</strong> any service when you mention this email. Valid until end of month.</p>
<p>Quality service, competitive prices, and results you can see – that's our promise to you.</p>`,
    cta_text: "Claim Your Discount",
    cta_url: "https://powerwashbros.co.uk/contact",
    seasonal: false,
    best_sending_period: "Any month - use quarterly",
  },
  {
    id: "referral-reward",
    name: "Referral Reward Program",
    category: "Loyalty",
    subject_line: "Share PowerWash Bros & Earn a Reward!",
    description: "Encourage customer referrals with reward incentive",
    content: `<h2>Refer a Friend & Both Save!</h2>
<p>Know someone who needs cleaning services? Share the love and both of you get rewarded!</p>
<h3>How It Works:</h3>
<ul>
<li>Refer a friend to PowerWash Bros</li>
<li>They book a service worth £100+</li>
<li>You both receive 10% off your next service</li>
</ul>
<p>There's no limit to referrals, so keep sharing and keep saving!</p>`,
    cta_text: "Refer Now",
    cta_url: "https://powerwashbros.co.uk/referral",
    seasonal: false,
    best_sending_period: "Quarterly",
  },
  {
    id: "seasonal-discount-spring",
    name: "Spring Flash Sale",
    category: "Promotional",
    subject_line: "⏰ 48-Hour Spring Flash Sale: 20% Off Everything!",
    description: "Limited time spring promotional discount",
    content: `<h2>Spring Flash Sale - 48 Hours Only!</h2>
<p><strong>This weekend only:</strong> Save 20% on ALL cleaning services!</p>
<h3>Available Services:</h3>
<ul>
<li>Pressure washing</li>
<li>Roof cleaning</li>
<li>Gutter maintenance</li>
<li>Driveway restoration</li>
<li>Window cleaning</li>
<li>And more...</li>
</ul>
<p><strong>Offer valid: [DATE] - [DATE] only</strong></p>
<p>Act fast - slots fill quickly during our sales!</p>`,
    cta_text: "Claim 20% Off",
    cta_url: "https://powerwashbros.co.uk/quote",
    seasonal: true,
    best_sending_period: "Spring (March-April)",
  },
  {
    id: "maintenance-reminder",
    name: "Regular Maintenance Reminder",
    category: "Educational",
    subject_line: "Your Semi-Annual Maintenance Reminder",
    description: "Educational reminder about regular maintenance benefits",
    content: `<h2>Has It Been 6 Months? Time for Maintenance!</h2>
<p>Regular maintenance prevents costly repairs. Here's what we recommend every 6 months:</p>
<h3>6-Month Maintenance Plan:</h3>
<ul>
<li><strong>Roof & gutters:</strong> Spring and autumn checks</li>
<li><strong>Exterior surfaces:</strong> Bi-annual cleaning prevents buildup</li>
<li><strong>Driveways:</strong> Twice-yearly cleaning maintains curb appeal</li>
<li><strong>Windows:</strong> 4 times per year for optimal clarity</li>
</ul>
<p>Stay ahead of damage with a regular maintenance schedule. Contact us for a customized plan!</p>`,
    cta_text: "Request Maintenance Plan",
    cta_url: "https://powerwashbros.co.uk/contact",
    seasonal: false,
    best_sending_period: "Bi-annually (every 6 months)",
  },
  {
    id: "new-service-launch",
    name: "New Service Announcement",
    category: "Announcement",
    subject_line: "✨ NEW SERVICE: Solar Panel Cleaning Now Available!",
    description: "Announce new service offerings",
    content: `<h2>Exciting News! We're Expanding Our Services</h2>
<p>By popular request, we've added a new service to our lineup:</p>
<h3>Professional Solar Panel Cleaning</h3>
<p>Dirty solar panels lose up to 25% efficiency. Our specialized solar panel cleaning restores performance and maximizes your green energy investment.</p>
<ul>
<li>Extends panel lifespan</li>
<li>Increases energy output</li>
<li>Improves ROI on solar systems</li>
<li>Environmentally responsible process</li>
</ul>
<p>Special launch pricing available for first 50 customers!</p>`,
    cta_text: "Learn More About Solar Cleaning",
    cta_url: "https://powerwashbros.co.uk/services/solar-panel-cleaning",
    seasonal: false,
    best_sending_period: "Upon launch",
  },
  {
    id: "heritage-property-special",
    name: "Heritage Property Special",
    category: "Targeted",
    subject_line: "Listed Property? Specialist Cleaning Available!",
    description: "Target customers with listed/heritage properties",
    content: `<h2>Heritage Property Specialists</h2>
<p>Listed buildings need specialized care. Our biocide-trained specialists understand conservation requirements.</p>
<h3>Why Choose Us for Listed Properties:</h3>
<ul>
<li>Expert knowledge of Grade I, II, II* requirements</li>
<li>Gentle soft-washing methods</li>
<li>Purbeck stone specialists</li>
<li>Conservation-compliant treatments</li>
<li>Listed building safe products</li>
</ul>
<p>We work across Dorset's conservation areas. Let's discuss your property's specific needs.</p>`,
    cta_text: "Schedule Heritage Assessment",
    cta_url: "https://powerwashbros.co.uk/services/heritage-buildings",
    seasonal: false,
    best_sending_period: "Anytime",
  },
  {
    id: "commercial-offering",
    name: "Commercial Property Services",
    category: "B2B",
    subject_line: "Commercial Property Maintenance Solutions",
    description: "Promote commercial cleaning services",
    content: `<h2>Keep Your Business Looking Professional</h2>
<p>First impressions matter for your clients and employees. Professional appearance drives business success.</p>
<h3>Our Commercial Services:</h3>
<ul>
<li>Forecourt & car park cleaning</li>
<li>Commercial building facades</li>
<li>Retail park maintenance</li>
<li>Industrial unit cleaning</li>
<li>Regular maintenance contracts</li>
</ul>
<p><strong>Special B2B Rates:</strong> Contract pricing available for ongoing maintenance. Contact us for a commercial quote!</p>`,
    cta_text: "Commercial Quote",
    cta_url: "https://powerwashbros.co.uk/services/commercial",
    seasonal: false,
    best_sending_period: "Anytime",
  },
  {
    id: "before-after-showcase",
    name: "Before & After Success Stories",
    category: "Social Proof",
    subject_line: "See the Transformation: Before & After Results",
    description: "Showcase customer transformations",
    content: `<h2>See What We Can Achieve</h2>
<p>Pictures speak louder than words. Check out these amazing transformations from recent projects:</p>
<h3>Recent Transformations:</h3>
<ul>
<li>20-year moss-covered roof → pristine condition</li>
<li>Grimy driveway → showroom ready</li>
<li>Stained patio → entertaining ready</li>
<li>Heritage property restoration</li>
</ul>
<p>These are real results from real customers in Dorset. Could your property be next?</p>
<p>Visit our portfolio page to see more amazing transformations.</p>`,
    cta_text: "View Portfolio",
    cta_url: "https://powerwashbros.co.uk/our-work",
    seasonal: false,
    best_sending_period: "Monthly",
  },
  {
    id: "blog-spotlight",
    name: "Blog Spotlight: Expert Tips",
    category: "Educational",
    subject_line: "This Week's Expert Cleaning Tips & Advice",
    description: "Share blog content with subscribers",
    content: `<h2>Expert Property Care Tips This Week</h2>
<p>We share weekly insights on property maintenance, cleaning techniques, and seasonal advice.</p>
<h3>Latest Blog Posts:</h3>
<ul>
<li>"How Often Should You Clean Your Roof?" - Expert seasonal guide</li>
<li>"Moss vs Algae vs Lichen" - Identification & treatment</li>
<li>"Solar Panel Efficiency" - Maintenance increases output by 25%</li>
</ul>
<p>Read our full blog for more expert insights on keeping your property in perfect condition year-round.</p>`,
    cta_text: "Read Latest Articles",
    cta_url: "https://powerwashbros.co.uk/blog",
    seasonal: false,
    best_sending_period: "Weekly",
  },
  {
    id: "seasonal-discount-summer",
    name: "Summer Discount Offer",
    category: "Promotional",
    subject_line: "Summer Savings: 15% Off Outdoor Cleaning Services",
    description: "Summer promotional discount",
    content: `<h2>Summer Cleaning Special</h2>
<p>Beat the heat and refresh your outdoor spaces with summer specials!</p>
<h3>Save 15% on:</h3>
<ul>
<li>Patio & decking cleaning</li>
<li>Driveway pressure washing</li>
<li>Outdoor furniture washing</li>
<li>Window cleaning</li>
</ul>
<p><strong>Valid through August 31st</strong> - Book your summer refresh today!</p>`,
    cta_text: "Book Summer Services",
    cta_url: "https://powerwashbros.co.uk/quote",
    seasonal: true,
    best_sending_period: "June-July",
  },
  {
    id: "seasonal-discount-autumn",
    name: "Autumn Maintenance Special",
    category: "Promotional",
    subject_line: "Autumn Special: Prep for Winter - Save 15% This Month",
    description: "Autumn preventative maintenance discount",
    content: `<h2>Autumn Maintenance Special</h2>
<p>Prepare for winter now and save! Autumn is the perfect time for preventative maintenance.</p>
<h3>15% Off These Services:</h3>
<ul>
<li>Roof inspection & treatment</li>
<li>Gutter cleaning & clearing</li>
<li>Exterior wall cleaning</li>
<li>Fascia & soffit maintenance</li>
</ul>
<p><strong>Valid through September 30th</strong> - Don't wait for winter damage!</p>`,
    cta_text: "Autumn Maintenance Quote",
    cta_url: "https://powerwashbros.co.uk/quote",
    seasonal: true,
    best_sending_period: "August-September",
  },
]
