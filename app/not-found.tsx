import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0B1E3F] flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <h1 className="text-9xl font-bold text-[#1E90FF]/20">404</h1>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
            <p className="text-white/70 text-lg">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>
          <div className="pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-3 bg-[#1E90FF] text-white font-semibold rounded-lg hover:bg-[#1E90FF]/90 transition-all"
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
