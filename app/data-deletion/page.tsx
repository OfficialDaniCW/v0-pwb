import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Data Deletion Request | PowerWash Bros Swanage",
  description:
    "Request deletion of your personal data from PowerWash Bros Ltd in compliance with GDPR and data protection regulations.",
}

export default function DataDeletion() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#0B1E3F]">Data Deletion Request</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-gray-700">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">Your Right to Data Deletion</h2>
              <p>
                PowerWash Bros Ltd is committed to protecting your privacy and complying with data protection
                regulations including GDPR. You have the right to request deletion of your personal data that we hold.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">What Data We Hold</h2>
              <p>We may hold the following information about you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact details (name, email address, phone number)</li>
                <li>Property address and service history</li>
                <li>Quote requests and service preferences</li>
                <li>Newsletter subscription status</li>
                <li>Communication history and customer service records</li>
                <li>Payment information (processed securely through third-party payment providers)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">How to Request Data Deletion</h2>
              <p>To request deletion of your personal data, please contact us using one of the following methods:</p>

              <div className="bg-[#0B1E3F]/5 border border-[#0B1E3F]/10 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-[#0B1E3F]">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@powerwashbros.co.uk" className="text-[#1E90FF] hover:underline">
                      info@powerwashbros.co.uk
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href="tel:07418610731" className="text-[#1E90FF] hover:underline">
                      07418 610731
                    </a>
                  </p>
                  <p>
                    <strong>Post:</strong> PowerWash Bros Ltd, Hardingredmans, Bridge House, Court Road, Swanage, BH19
                    1DX
                  </p>
                </div>
              </div>

              <p>When submitting your request, please provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your full name</li>
                <li>Email address or phone number associated with our services</li>
                <li>Details of the data you want deleted (or select "all personal data")</li>
                <li>Confirmation of your identity (for security purposes)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">Response Timeframe</h2>
              <p>
                We will respond to your data deletion request within <strong>30 days</strong> of receiving it. If we
                need additional time to process your request, we will notify you of the delay and provide a reason.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">Important Considerations</h2>
              <p>Please note the following regarding data deletion requests:</p>

              <h3 className="text-xl font-semibold mt-4">Legal Obligations</h3>
              <p>We may need to retain certain data where we have a legal obligation to do so, such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Financial records for tax and accounting purposes (up to 7 years)</li>
                <li>Records required for insurance or legal claims</li>
                <li>Compliance with health and safety regulations</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Active Services</h3>
              <p>
                If you have active bookings or ongoing services, we may need to retain certain data to fulfil our
                contractual obligations. We can discuss your options in such cases.
              </p>

              <h3 className="text-xl font-semibold mt-4">Anonymised Data</h3>
              <p>
                We may retain anonymised or aggregated data for statistical purposes, which cannot be linked back to you
                as an individual.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">Third-Party Services</h2>
              <p>
                If you have connected to our services through third-party platforms (such as Facebook, Instagram, or
                other social media), you may also need to revoke access or delete data directly through those platforms.
                We will provide guidance on this process upon request.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">After Deletion</h2>
              <p>Once your data is deleted:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You will receive confirmation that the deletion has been completed</li>
                <li>Your data will be permanently removed from our active systems</li>
                <li>Backup copies will be removed in accordance with our backup retention schedule</li>
                <li>You may need to re-provide information if you use our services in the future</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">Other Rights</h2>
              <p>In addition to data deletion, you also have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to processing</li>
              </ul>
              <p>
                For more information about these rights, please see our{" "}
                <Link href="/privacy" className="text-[#1E90FF] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">Questions or Concerns</h2>
              <p>
                If you have any questions about data deletion or your privacy rights, please contact us using the
                details above. You also have the right to lodge a complaint with the Information Commissioner's Office
                (ICO) if you are not satisfied with our response.
              </p>
              <p className="text-sm">
                <strong>ICO Contact:</strong>{" "}
                <a
                  href="https://ico.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E90FF] hover:underline"
                >
                  ico.org.uk
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <PWBFooter />
    </>
  )
}
