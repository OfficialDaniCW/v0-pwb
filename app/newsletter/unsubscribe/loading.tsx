import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Loader2 } from 'lucide-react'

export default function UnsubscribeLoading() {
  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Mail className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Unsubscribe from Newsletter
              </h1>
              <p className="text-xl text-white/70">
                We're sorry to see you go. You can unsubscribe from our newsletter below.
              </p>
            </div>

            <Card className="glass-border-enhanced">
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <Loader2 className="h-12 w-12 text-[#1E90FF] animate-spin" />
                  <p className="text-white/70">Loading...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PWBFooter />
    </main>
  )
}
