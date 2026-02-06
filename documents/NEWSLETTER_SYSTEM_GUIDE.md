# Newsletter Management System - Complete Guide

## System Overview

PowerWash Bros now has a complete newsletter management system built into the admin panel, allowing you to create, schedule, and send newsletters to subscriber groups with rich formatting and professional branding.

## Features

### 1. Subscriber Management
- **View all subscribers** - See complete list of newsletter subscribers
- **Active/Inactive status** - Track subscription status for each user
- **Export subscribers** - Download subscriber list as CSV for analysis
- **Search functionality** - Find specific subscribers by email

### 2. Campaign Creation
- **Rich text editor** - Format newsletters with bold, italic, headings, lists, and links
- **Live preview** - See exactly how emails will look before sending
- **PowerWash Bros branding** - Professional header and footer with logo and brand colours
- **CTA integration** - Add custom buttons linking to any page or external URL

### 3. Scheduling
- **Send immediately** - Send newsletter right now
- **Schedule for later** - Set specific date and time for sending
- **Recipient targeting** - Select which subscriber groups receive each newsletter

### 4. User Groups/Segments
The system supports targeting different subscriber segments:
- **All Subscribers** - Your entire newsletter list
- **Service Discount List** - Users who opted in for service offers
- **Premium Members** - VIP or paying subscribers (expandable)
- **Engaged Subscribers** - Recently active users (expandable)

### 5. Campaign Management
- **View all campaigns** - See drafts, scheduled, and sent campaigns
- **Edit drafts** - Modify campaigns before sending
- **Track metrics** - Monitor how many people received each newsletter
- **Delivery tracking** - See open and click rates (future enhancement)

## How to Create a Newsletter

### Step 1: Navigate to Newsletter Manager
In the admin panel, click **Newsletter** → **Manage Campaigns**

### Step 2: Start New Campaign
Click the green **"New Campaign"** button

### Step 3: Fill in Campaign Details
- **Campaign Title**: Internal name (e.g., "January 2026 Service Discounts")
- **Subject Line**: What appears in email subject line
- **Description**: Internal notes about the campaign

### Step 4: Write Newsletter Content
Use the rich text editor with these formatting options:
- **Bold**: Highlight important text (`**text**`)
- **Italic**: Emphasize words (`_text_`)
- **Headings**: Create section headers (`## Heading`)
- **Lists**: Organize information (`- Item`)
- **Links**: Add clickable links (`[Link text](URL)`)

**Pro Tips**:
- Keep paragraphs short for readability
- Use headings to break up content
- Start with a compelling reason why customers should read
- End with a clear call-to-action

### Step 5: Add Call-to-Action
- **CTA Button Text**: What the button says (e.g., "Get Your Quote")
- **CTA Link**: Where it goes (e.g., `https://powerwashbros.co.uk/get-quote`)

### Step 6: Select Recipients
- **Target Group**: Choose who receives this newsletter
  - All Subscribers: Entire list
  - Service Discount List: Those who opt in for special offers
  - Premium Members: VIP subscribers
  - Engaged Subscribers: Recently active users

### Step 7: Schedule or Send
- **Immediate**: Click **"Send Now"** to send immediately
- **Scheduled**: Set a date/time, click **"Schedule"**, then the system sends automatically
- **Draft**: Click **"Save Draft"** to work on it later

### Step 8: Preview Before Sending
Click **"Preview"** to see exactly how the email will look with:
- PowerWash Bros branded header
- Your content and formatting
- CTA button
- Professional footer with contact details

## Database Schema

### newsletter_campaigns Table
Stores all newsletter campaigns with content and scheduling info:
```sql
- id: Unique campaign identifier
- title: Campaign name
- subject_line: Email subject line
- content: Newsletter body content (markdown)
- cta_text: Button text
- cta_url: Button link destination
- target_group: Recipient segment (all/service_discount/premium/engaged)
- status: draft/scheduled/sent
- scheduled_for: When to send (if scheduled)
- sent_at: When actually sent
- recipient_count: Number of people who'll receive it
- opened_count: Email open count (future)
- clicked_count: CTA click count (future)
```

### newsletter_subscribers Table (Existing)
Stores subscribers who signed up for newsletters:
```sql
- id: Unique subscriber
- email: Email address
- subscribed_at: When they joined
- is_active: If they're still subscribed
```

### newsletter_subscriber_groups Table
Organizes subscribers into targeting segments:
```sql
- id: Unique entry
- subscriber_id: References newsletter_subscribers
- group_name: Segment name (service_discount/premium/engaged/etc)
- added_at: When added to group
```

### newsletter_campaign_recipients Table
Tracks delivery status and engagement for each email sent:
```sql
- id: Unique record
- campaign_id: References newsletter_campaigns
- subscriber_id: References newsletter_subscribers
- sent_at: When email was delivered
- opened_at: When email was opened (if tracked)
- clicked_at: When CTA was clicked (if tracked)
- status: pending/sent/bounced/failed
```

## API Endpoints

### GET /api/admin/newsletter
Fetch list of subscribers
```
Returns: { subscribers: [{id, email, subscribed_at, is_active}, ...] }
```

### GET /api/admin/newsletter/campaigns
Fetch all campaigns
```
Returns: { campaigns: [{id, title, subject_line, status, ...}, ...] }
Optional: ?status=draft|scheduled|sent
```

### POST /api/admin/newsletter/campaigns
Create new campaign
```
Body: {
  title: string,
  subject_line: string,
  content: string,
  cta_text: string,
  cta_url: string,
  target_group: string,
  scheduled_for: datetime (optional)
}
```

### PUT /api/admin/newsletter/campaigns
Update existing campaign
```
Body: {
  id: number,
  ... (same fields as POST)
}
```

### POST /api/admin/newsletter/campaigns/send
Send or queue a campaign
```
Body: {
  campaign_id: number,
  send_now: boolean
}
Returns: { success: true, recipients_count: number }
```

## Best Practices

### Content
1. **Keep it concise** - Most people skim emails, not read word-for-word
2. **Lead with value** - Start with what the customer gets, not what you want
3. **One main message** - Focus on a single offer or announcement
4. **Mobile-friendly** - Test how it looks on phones
5. **Clear CTA** - Make the next step obvious

### Timing
1. **Tuesday-Thursday** - Best open rates typically mid-week
2. **10am-2pm** - Peak email checking times
3. **Consistency** - Same day/time builds habit (e.g., every 2 weeks on Tuesday)
4. **Avoid holidays** - Most people ignore emails during holidays

### Targeting
1. **Segment correctly** - Service discount list gets service offers, not PowerUps
2. **Respect preferences** - Honor unsubscribes and preference changes
3. **Test segments** - Try sending to small group first to check engagement

### Frequency
- **Too often** (daily): Unsubscribes increase
- **Sweet spot** (weekly-monthly): Keeps customers engaged
- **Too sparse** (yearly): Customers forget you exist

## Troubleshooting

### Newsletter not sending
1. Check campaign has recipients selected
2. Verify subject line and content are filled in
3. Check scheduled time is in the future
4. Ensure CTA URL is valid (if using external links)

### Subscribers not receiving
1. Verify they're marked as `is_active = true`
2. Check they're in the right target group
3. Confirm email address is valid
4. Check spam folder

### Formatting issues
1. Preview before sending
2. Avoid very long lines (wrap at 80 characters)
3. Use consistent spacing between sections
4. Test links in preview mode

## Future Enhancements

These features are planned for future development:

1. **Email tracking**
   - Open rate analytics
   - Click tracking on CTAs
   - Subscriber engagement scoring

2. **Advanced segmentation**
   - Tag-based targeting
   - Geographic targeting
   - Service-based segments

3. **Template library**
   - Reusable newsletter templates
   - Saved drafts and templates
   - Quick-start layouts

4. **A/B testing**
   - Test different subject lines
   - Test different CTA text
   - Automatic winner selection

5. **Automation**
   - Welcome series for new subscribers
   - Seasonal campaigns
   - Trigger-based newsletters

## Support

If you encounter issues with the newsletter system:

1. Check the admin logs for errors
2. Verify database tables exist (see Database Schema)
3. Confirm API routes are deployed
4. Test with small subscriber group first

For technical issues, contact development team with:
- Campaign ID (if applicable)
- Exact error message
- Steps to reproduce
- Browser and device information
