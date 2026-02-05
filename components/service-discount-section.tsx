"use client"

import { ServiceDiscountSignupModal } from "@/components/service-discount-signup-modal"

export function ServiceDiscountSection() {
  return (
    <section className="py-16 bg-primary/40">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-success/20 to-accent/20 rounded-xl p-8 border-2 border-success/30">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground/70 mb-3 uppercase tracking-wide">Exclusive Offers</p>
              <h2 className="text-3xl font-bold text-foreground mb-3">Get Notified About Service Discounts</h2>
              <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
                Join our mailing list to receive periodic offers and exclusive discounts on our professional cleaning services throughout the year.
              </p>
              <ServiceDiscountSignupModal />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
