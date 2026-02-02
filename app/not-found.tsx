import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h1 className="text-9xl font-bold text-accent/20">404</h1>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
            <p className="text-foreground/70 text-lg">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>
          <div className="pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)',
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <PWBFooter />
    </>
  )
}
