import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-accent/20">404</h1>
            <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
          </div>
          <div className="space-y-4">
            <p className="text-foreground/70 text-lg">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <p className="text-foreground/50 text-sm">
              If you think this is a mistake, please <Link href="/contact" className="text-accent hover:underline font-medium">contact us</Link>.
            </p>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all bg-accent text-accent-foreground hover:opacity-90"
            >
              Return Home
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all border border-accent text-accent hover:bg-accent/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </main>
      <PWBFooter />
    </>
  )
}
