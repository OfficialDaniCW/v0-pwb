import { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { PWBFooter } from '@/components/pwb-footer'
import { Button } from '@/components/ui/button'
import { MessageCircle, Sun, TrendingUp, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Panel Cleaning Swanage & Purbeck | PowerWash Bros Dorset',
  description: 'Professional solar panel cleaning in Swanage, Purbeck & Dorset. Restore efficiency, increase energy output. Expert PV cleaning service.',
  keywords: 'solar panel cleaning swanage, solar panel cleaning purbeck, solar panel cleaning dorset, pv cleaning swanage, solar panel maintenance purbeck',
}

export default function SolarPanelCleaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0B1E3F] text-white">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
              {' > '}
              <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
              {' > '}
              <span className="text-white">Solar Panel Cleaning</span>
            </nav>
            
            <div className="inline-block px-4 py-2 bg-[#1E90FF]/20 rounded-full mb-6">
              <span className="text-[#1E90FF] font-semibold">Solar Panel Cleaning</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
              Professional Solar Panel Cleaning in Swanage & Purbeck
            </h1>
            <p className="text-xl text-white/80 mb-8 text-balance max-w-3xl mx-auto">
              Restore your solar panel efficiency with expert cleaning. Increase energy output by up to 30% across Dorset properties.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#00C853] hover:bg-[#00A844] text-white" asChild>
                <a
                  href="https://wa.me/447418610731?text=Hi, I'd like a quote for solar panel cleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white" asChild>
                <Link href="/quote">Get Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Why Solar Panel Cleaning is Essential in Purbeck
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Sun className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Coastal Contamination</h3>
                <p className="text-white/70">
                  Swanage's sea air deposits salt and minerals on panels, reducing efficiency by up to 30%. Regular cleaning restores output.
                </p>
              </div>
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <TrendingUp className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Maximize ROI</h3>
                <p className="text-white/70">
                  Dirty panels generate less electricity. Professional cleaning pays for itself through increased energy production.
                </p>
              </div>
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Shield className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Safe Access</h3>
                <p className="text-white/70">
                  PASMA-trained technicians safely clean roof-mounted panels without risk to you or damage to your Purbeck property.
                </p>
              </div>
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Zap className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Warranty Protection</h3>
                <p className="text-white/70">
                  Many warranties require regular maintenance. Professional cleaning ensures compliance and protects your investment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto">
            <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-8 md:p-12 bg-[#0B1E3F]/50">
              <h2 className="text-3xl font-bold mb-6 text-white">The Cost of Dirty Solar Panels in Dorset</h2>
              <p className="text-lg text-white/80 mb-6">
                Research shows dirty solar panels lose 15-30% efficiency. For an average Swanage home with a 4kW system, that's £150-£300 lost annually in generation. Bird droppings, lichen, moss, and coastal salt all block sunlight reaching photovoltaic cells.
              </p>
              <p className="text-lg text-white/80 mb-6">
                Regular professional cleaning (recommended annually in Purbeck's coastal environment) costs far less than the energy production you're losing. Our specialist cleaning restores panels to near-new efficiency.
              </p>
              <div className="mt-8 p-6 bg-[#1E90FF]/20 rounded-xl border border-[#1E90FF]/30">
                <h3 className="text-xl font-semibold mb-3 text-white">Professional vs DIY Cleaning</h3>
                <p className="text-white/70">
                  DIY cleaning risks panel damage, personal injury from roof access, and voiding warranties. Our deionised water system and specialist brushes safely remove contamination without scratching panels or leaving mineral deposits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Restore Your Solar Panel Efficiency</h2>
              <p className="text-xl text-white/90 mb-8">
                Professional solar panel cleaning across Swanage, Purbeck and Dorset. Maximize your energy generation today.
              </p>
              <Button size="lg" className="bg-white text-[#1E90FF] hover:bg-white/90 font-bold" asChild>
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Quote via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PWBFooter />
    </>
  )
}
