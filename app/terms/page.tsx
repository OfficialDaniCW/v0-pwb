import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Terms & Conditions | PowerWash Bros Swanage",
  description: "Terms and conditions for PowerWash Bros Ltd services. Read our service terms, payment policies, and cancellation terms.",
}

export default function TermsAndConditions() {
  return (
    <>
      <SiteHeader />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#0B1E3F]">Terms & Conditions</h1>
            <p className="text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-gray-700">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. About These Terms</h2>
              <p>
                These Terms and Conditions ("Terms") govern your use of services provided by PowerWash Bros Ltd ("we", "our", "us"), a company registered in England and Wales (Company No. 16100439).
              </p>
              <p className="font-semibold">
                Registered Address: Hardingredmans, Bridge House, Court Road, Swanage, Dorset, BH19 1DX<br />
                Contact: info@powerwashbros.co.uk | 07418 610731
              </p>
              <p>
                By booking our services, you agree to these Terms. Please read them carefully before proceeding.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Services Provided</h2>
              <p>PowerWash Bros provides professional exterior property cleaning services including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Driveway cleaning and restoration</li>
                <li>Roof cleaning and moss removal</li>
                <li>Gutter cleaning and maintenance</li>
                <li>Exterior wall and render cleaning</li>
                <li>Patio and decking cleaning</li>
                <li>Commercial property cleaning</li>
                <li>Heritage building specialist care</li>
                <li>Biocide treatments (PowerUps range)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Booking and Quotes</h2>
              <h3 className="text-xl font-semibold">3.1 Free Assessments</h3>
              <p>
                We offer free, no-obligation property assessments. Quotes are valid for 30 days from the date of issue.
              </p>

              <h3 className="text-xl font-semibold">3.2 Acceptance</h3>
              <p>
                A binding contract is formed when you accept our quote in writing (email, WhatsApp, or signed quote form) and pay any required deposit.
              </p>

              <h3 className="text-xl font-semibold">3.3 Accuracy of Information</h3>
              <p>
                You must provide accurate information about your property, including access restrictions, surface materials, and any known damage. Incorrect information may result in revised quotes or additional charges.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Pricing and Payment</h2>
              <h3 className="text-xl font-semibold">4.1 Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Small jobs (under £500): Payment due upon completion</li>
                <li>Larger jobs (over £500): 25% deposit required, balance due upon completion</li>
                <li>Commercial contracts: Terms agreed separately</li>
              </ul>

              <h3 className="text-xl font-semibold">4.2 Payment Methods</h3>
              <p>We accept payment by bank transfer, card payment, or cash. Payment details will be provided in your quote.</p>

              <h3 className="text-xl font-semibold">4.3 Late Payment</h3>
              <p>
                Invoices are due within 7 days of completion. Late payments may incur interest charges of 8% per annum above the Bank of England base rate.
              </p>

              <h3 className="text-xl font-semibold">4.4 Additional Work</h3>
              <p>
                Any work beyond the original quote requires your approval and will be charged separately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Cancellation and Rescheduling</h2>
              <h3 className="text-xl font-semibold">5.1 Customer Cancellation</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>48+ hours notice: Full refund of any deposit</li>
                <li>24-48 hours notice: 50% deposit retained</li>
                <li>Less than 24 hours: Full deposit retained</li>
              </ul>

              <h3 className="text-xl font-semibold">5.2 Weather Cancellations</h3>
              <p>
                We reserve the right to reschedule work due to adverse weather conditions (heavy rain, frost, high winds) that would compromise quality or safety. No cancellation fees apply.
              </p>

              <h3 className="text-xl font-semibold">5.3 Rescheduling</h3>
              <p>
                Rescheduling requests with 48+ hours notice are accommodated free of charge, subject to availability.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Access and Site Conditions</h2>
              <h3 className="text-xl font-semibold">6.1 Access Requirements</h3>
              <p>You must provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Safe access to all areas requiring cleaning</li>
                <li>Water supply and electrical outlet (if required)</li>
                <li>Parking for our vehicle within reasonable distance</li>
                <li>Clearance of obstacles and breakable items from work area</li>
              </ul>

              <h3 className="text-xl font-semibold">6.2 Access Failures</h3>
              <p>
                If access cannot be provided on the scheduled date, you will be charged a £50 call-out fee. Repeat access failures may result in contract termination.
              </p>

              <h3 className="text-xl font-semibold">6.3 Keys and Codes</h3>
              <p>
                If you provide keys or access codes, we will treat them with utmost security. We are not liable for third-party access issues.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Our Responsibilities</h2>
              <h3 className="text-xl font-semibold">7.1 Professional Standards</h3>
              <p>We will:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Carry out work with reasonable skill and care</li>
                <li>Use appropriate techniques for your property type</li>
                <li>Protect surrounding plants, vehicles, and property</li>
                <li>Clean up after ourselves and dispose of waste responsibly</li>
                <li>Comply with health and safety regulations</li>
              </ul>

              <h3 className="text-xl font-semibold">7.2 Insurance</h3>
              <p>
                We maintain public liability insurance covering up to £5,000,000. Proof of insurance available on request.
              </p>

              <h3 className="text-xl font-semibold">7.3 Biocide Use</h3>
              <p>
                Our team is fully trained and registered in the safe use of biocidal products. We follow all safety protocols and manufacturer guidelines.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Limitations of Liability</h2>
              <h3 className="text-xl font-semibold">8.1 Existing Damage</h3>
              <p>
                We are not liable for pre-existing damage or defects that become visible after cleaning. We will conduct a pre-work inspection and photograph any concerns.
              </p>

              <h3 className="text-xl font-semibold">8.2 Natural Variations</h3>
              <p>
                Natural stone, aged surfaces, and heritage materials may show color variations after cleaning. This is a natural result of removing dirt layers and is not considered damage.
              </p>

              <h3 className="text-xl font-semibold">8.3 Organic Regrowth</h3>
              <p>
                While our biocide treatments provide long-term protection, we cannot guarantee permanent prevention of moss, algae, or lichen growth due to environmental factors.
              </p>

              <h3 className="text-xl font-semibold">8.4 Force Majeure</h3>
              <p>
                We are not liable for delays or failures caused by events beyond our reasonable control (extreme weather, pandemics, civil unrest, etc.).
              </p>

              <h3 className="text-xl font-semibold">8.5 Liability Cap</h3>
              <p>
                Our total liability for any claim shall not exceed the value of the specific service contract or £5,000,000 (whichever is lower), subject to insurance coverage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Customer Responsibilities</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate property information</li>
                <li>Ensuring safe access to work areas</li>
                <li>Removing or protecting fragile items and plants</li>
                <li>Informing us of any health and safety concerns</li>
                <li>Securing pets during work hours</li>
                <li>Notifying neighbors if shared access is affected</li>
                <li>Paying invoices on time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Complaints and Quality Guarantee</h2>
              <h3 className="text-xl font-semibold">10.1 Quality Standards</h3>
              <p>
                We strive for excellence. If you're not satisfied with our work, please contact us within 7 days of completion.
              </p>

              <h3 className="text-xl font-semibold">10.2 Rectification</h3>
              <p>
                We will investigate any legitimate complaints and, if necessary, return to remedy any issues at no extra charge.
              </p>

              <h3 className="text-xl font-semibold">10.3 Dispute Resolution</h3>
              <p>
                If we cannot resolve a complaint directly, you may refer the matter to a relevant trade association or ombudsman.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Intellectual Property</h2>
              <h3 className="text-xl font-semibold">11.1 Before/After Photos</h3>
              <p>
                We may photograph your property before and after cleaning for quality control, training, and marketing purposes. By accepting our services, you consent to this unless you specifically opt out in writing.
              </p>

              <h3 className="text-xl font-semibold">11.2 PowerUps Brand</h3>
              <p>
                PowerUps is our proprietary product range. Unauthorized use of our brand name or products is prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Data Protection</h2>
              <p>
                We process your personal data in accordance with UK GDPR and our Privacy Policy. For full details, see our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">13. General Terms</h2>
              <h3 className="text-xl font-semibold">13.1 Entire Agreement</h3>
              <p>
                These Terms, together with our quote, constitute the entire agreement between you and PowerWash Bros Ltd.
              </p>

              <h3 className="text-xl font-semibold">13.2 Amendments</h3>
              <p>
                We may update these Terms from time to time. Changes will be posted on our website with an updated date.
              </p>

              <h3 className="text-xl font-semibold">13.3 Severability</h3>
              <p>
                If any part of these Terms is found to be unenforceable, the remaining provisions shall continue in full effect.
              </p>

              <h3 className="text-xl font-semibold">13.4 Governing Law</h3>
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">14. Contact Information</h2>
              <p>For questions about these Terms:</p>
              <p className="font-semibold">
                PowerWash Bros Ltd<br />
                Company No. 16100439<br />
                Email: info@powerwashbros.co.uk<br />
                Phone: 07418 610731<br />
                WhatsApp: 07418 610731<br />
                Address: Hardingredmans, Bridge House, Court Road, Swanage, Dorset, BH19 1DX
              </p>
            </section>
          </div>

          <div className="pt-8 border-t">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      <PWBFooter />
    </>
  )
}
