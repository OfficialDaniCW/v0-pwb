# Blog Post Scheduling System

## Overview
The blog system now supports automatic scheduling and publishing of blog posts. Scheduled posts are stored in the database with a future `published_at` date and are automatically published when that date arrives.

## How It Works

1. **Database Storage**: Scheduled blog posts are stored in the `blog_posts` table with `is_published = false` and a future `published_at` timestamp.

2. **Automatic Publishing**: A Vercel Cron job runs daily at midnight (UTC) and calls the `/api/admin/blog/publish-scheduled` endpoint, which:
   - Finds all posts where `published_at <= NOW()` and `is_published = false`
   - Updates them to `is_published = true`
   - Returns a list of published posts

3. **Manual Triggers**: You can also manually trigger the publishing endpoint:
   ```bash
   POST /api/admin/blog/publish-scheduled
   Authorization: Bearer YOUR_CRON_SECRET
   ```

## Setting Up

1. **Optional Security**: Add a `CRON_SECRET` environment variable to secure the endpoint:
   - Go to your Vercel project settings
   - Add `CRON_SECRET=your-secret-key` to your environment variables
   - The cron job will automatically include this in the Authorization header

2. **Vercel Cron Configuration**: The `vercel.json` file configures the daily cron job. The schedule `0 0 * * *` means:
   - Run at 00:00 (midnight) UTC every day
   - Adjust the cron expression if needed (standard cron format)

## Check Scheduled Posts

View upcoming scheduled posts and posts ready to publish:
```bash
GET /api/admin/blog/publish-scheduled
Authorization: Bearer YOUR_CRON_SECRET
```

Response includes:
- `scheduledCount`: Number of posts scheduled for the future
- `readyToPublishCount`: Number of posts ready to publish now
- `scheduled`: List of upcoming scheduled posts
- `readyToPublish`: List of posts ready to publish

## Blog Page Query

The blog page automatically displays all published posts using:
```sql
WHERE is_published = true AND published_at <= NOW()
ORDER BY published_at DESC
```

This means:
- Only published posts are displayed
- Only posts with `published_at` in the past are shown
- Posts are ordered newest first

## Future Enhancements

- Add a UI for managing scheduled posts in the admin panel
- Send notifications when posts are published
- Support recurring/recurring post series
- Allow scheduling via the admin interface
