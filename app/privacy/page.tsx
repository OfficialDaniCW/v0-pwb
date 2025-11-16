import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Privacy Policy | PowerWash Bros Swanage",
  description: "Privacy policy for PowerWash Bros Ltd. Learn how we collect, use, and protect your personal data.",
}

export default function PrivacyPolicy() {
  return (
    <>
      <SiteHeader />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#0B1E3F]">Privacy Policy</h1>
            <p className="text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-gray-700">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">1. Introduction</h2>
              <p>
                PowerWash Bros Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="font-semibold text-[#0B1E3F]">
                Data Controller: PowerWash Bros Ltd<br />
                Company No. 16100439<br />
                Address: Hardingredmans, Bridge House, Court Road, Swanage, BH19 1DX<br />
                Email: info@powerwashbros.co.uk
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mt-4">2.1 Personal Data</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact details (email address, phone number, WhatsApp number)</li>
                <li>Property address and postcode</li>
                <li>Property details and photographs you share with us</li>
                <li>Service preferences and requirements</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Communication history (emails, WhatsApp messages, phone calls)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">2.2 Automatically Collected Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website and search terms used</li>
                <li>Device information and operating system</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">3. How We Use Your Information</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To provide property cleaning services, schedule appointments, and communicate about your service</li>
                <li><strong>Quotes and Assessments:</strong> To prepare accurate quotes and conduct property assessments</li>
                <li><strong>Communication:</strong> To respond to inquiries via email, phone, or WhatsApp</li>
                <li><strong>Marketing:</strong> To send newsletters and promotional offers (with your consent)</li>
                <li><strong>Improvements:</strong> To improve our website, services, and customer experience</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">4. Legal Basis for Processing</h2>
              <p>Under GDPR, we process your personal data based on:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contract Performance:</strong> Processing necessary to provide services you've requested</li>
                <li><strong>Legitimate Interests:</strong> To run our business, improve services, and prevent fraud</li>
                <li><strong>Consent:</strong> For marketing communications (you can withdraw consent anytime)</li>
                <li><strong>Legal Obligation:</strong> To comply with tax, accounting, and legal requirements</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">5. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Payment processors, email services (e.g., Google Workspace), WhatsApp Business</li>
                <li><strong>Analytics:</strong> Google Analytics to understand website usage</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>
              <p>We do NOT sell your personal data to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">6. Data Retention</h2>
              <p>We retain your personal data for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Active Customers:</strong> Duration of service relationship plus 7 years for tax/legal purposes</li>
                <li><strong>Quote Requests:</strong> 2 years from last contact</li>
                <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
                <li><strong>Website Analytics:</strong> 26 months (Google Analytics default)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">7. Your Rights Under GDPR</h2>
              <p>You have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Restriction:</strong> Limit how we use your data</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests or marketing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing at any time</li>
              </ul>
              <p>To exercise these rights, contact us at info@powerwashbros.co.uk</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">8. Cookies and Tracking</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze website traffic (Google Analytics)</li>
                <li>Improve user experience</li>
              </ul>
              <p>
                You can manage cookie preferences through your browser settings. For more information, see our <Link href="/cookies" className="text-[#1E90FF] hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">9. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure data storage with reputable providers</li>
                <li>Access controls and authentication</li>
                <li>Regular security assessments</li>
              </ul>
              <p>However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">10. Third-Party Services</h2>
              <p>Our website and services integrate with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics</li>
                <li><strong>WhatsApp Business:</strong> For customer communication</li>
                <li><strong>Google Reviews:</strong> For testimonials and reviews</li>
                <li><strong>Trustpilot:</strong> For reviews and ratings</li>
              </ul>
              <p>These services have their own privacy policies which govern their use of your information.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">11. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18. We do not knowingly collect personal data from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">13. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or wish to exercise your rights:</p>
              <p className="font-semibold text-[#0B1E3F]">
                PowerWash Bros Ltd<br />
                Email: info@powerwashbros.co.uk<br />
                Phone: 07418 610731<br />
                Address: Hardingredmans, Bridge House, Court Road, Swanage, BH19 1DX
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">14. Complaints</h2>
              <p>
                If you believe we have not handled your personal data properly, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
              </p>
              <p>
                ICO Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#1E90FF] hover:underline">https://ico.org.uk</a><br />
                Helpline: 0303 123 1113
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
