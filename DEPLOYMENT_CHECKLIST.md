# Deployment Checklist

## Pre-Deployment

### Code Review
- [ ] Review all SEO fixes in git diff
- [ ] Verify no breaking changes introduced
- [ ] Check that all URLs use www prefix
- [ ] Confirm blog caching issue fixed (revalidate = 0)

### Testing
- [ ] Test blog page shows March 2026 posts
- [ ] Verify /services/patio-cleaning redirects to /services/patio-decking
- [ ] Verify /services/powerup redirects to /powerups
- [ ] Check that all internal links work
- [ ] Test that sitemap.xml is valid
- [ ] Verify all meta tags render correctly

## Deployment

### Environment
- [ ] Ensure DATABASE_URL is set in Vercel project
- [ ] Ensure CRON_SECRET is set (optional but recommended)
- [ ] Verify all environment variables are configured

### Git Push
```bash
git add .
git commit -m "fix: address semrush seo issues - www urls, redirects, titles"
git push origin main
```

### Vercel Deployment
- [ ] Monitor deployment progress
- [ ] Check build logs for any warnings/errors
- [ ] Verify deployment completes successfully
- [ ] Test production URL: https://www.powerwashbros.co.uk

### Testing in Production
- [ ] Access /blog - should show March 2026 posts
- [ ] Test 301 redirects working: /services/patio-cleaning, /services/powerup
- [ ] Verify sitemap.xml loads correctly
- [ ] Check robots.txt configuration
- [ ] Test OpenGraph meta tags with Facebook Debugger
- [ ] Verify Twitter card meta tags

## Post-Deployment

### Search Console
- [ ] Submit updated sitemap.xml to Google Search Console
- [ ] Request indexing for key pages if needed
- [ ] Monitor for crawl errors

### Monitoring
- [ ] Monitor website performance metrics
- [ ] Check for any 404 or 500 errors in logs
- [ ] Verify blog posts auto-publish on schedule
- [ ] Monitor Semrush audit results (24-48 hours)

### Re-audit
- [ ] Run Semrush audit after 48 hours
- [ ] Verify all previous issues are resolved
- [ ] Document any remaining items for future improvement

## Rollback Plan
If issues arise during deployment:

1. **Quick Rollback**:
   ```bash
   git revert HEAD
   git push origin main
   # Vercel will automatically deploy previous version
   ```

2. **Manual Revert**: Use Vercel Dashboard to deploy previous deployment

## Post-Launch Improvements
- [ ] Add 200-300 word content blocks to low-word-count pages
- [ ] Investigate 2 broken images flagged by Semrush
- [ ] Consider optimizing text-HTML ratio for service pages
- [ ] Monitor blog post performance over time

## Notes
- All changes are non-breaking and additive
- Redirects use permanent 301 status codes (preserve SEO value)
- Blog caching fix ensures fresh content display
- Monthly blog scheduling is automatic via cron

