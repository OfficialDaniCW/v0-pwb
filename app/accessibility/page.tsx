import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Accessibility Statement | PowerWash Bros",
  description:
    "Accessibility statement for the PowerWash Bros website. We are committed to making our website accessible to all users.",
  robots: "noindex, follow",
}

export default function AccessibilityStatement() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              &larr; Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#0B1E3F]">Accessibility Statement</h1>
            <p className="text-gray-600">Last updated: March 2026</p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-gray-700">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">1. Our Commitment</h2>
              <p>
                PowerWash Bros Ltd is committed to ensuring that our website is accessible to the widest possible
                audience, regardless of technology or ability. We aim to comply with the Web Content Accessibility
                Guidelines (WCAG) 2.1 at Level AA, in accordance with the Public Sector Bodies (Websites and Mobile
                Applications) Accessibility Regulations 2018 and best practices for private businesses operating in the
                United Kingdom.
              </p>
              <p>
                We are continually improving the user experience for everyone and applying relevant accessibility
                standards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">2. How Accessible Is This Website?</h2>
              <p>We know some parts of this website are not fully accessible. We are working to improve the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Some older PDF documents may not be fully accessible to screen reader software</li>
                <li>Some images may have limited alternative text descriptions</li>
                <li>Some video content may not have captions or audio descriptions</li>
              </ul>
              <p>The following features are in place to support accessibility:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Semantic HTML structure throughout the site for screen reader compatibility</li>
                <li>Sufficient colour contrast ratios between text and backgrounds</li>
                <li>Keyboard-navigable interface with visible focus states</li>
                <li>Descriptive link text and ARIA labels where appropriate</li>
                <li>Responsive design that works across all screen sizes and devices</li>
                <li>Text resizable up to 200% without loss of content or functionality</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">3. Technical Information</h2>
              <p>
                PowerWash Bros Ltd is committed to making its website accessible in accordance with the Public Sector
                Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.
              </p>
              <p>
                This website is built using modern web technologies including Next.js and follows best practices for
                semantic HTML and ARIA accessibility. The site has been tested using automated accessibility tools and
                manual testing with assistive technologies.
              </p>
              <h3 className="text-xl font-semibold text-[#0B1E3F] mt-4">Compliance Status</h3>
              <p>
                This website is partially compliant with the Web Content Accessibility Guidelines (WCAG) version 2.1 AA
                standard. The non-compliances and exemptions are listed in Section 2 above.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">4. Known Issues and Limitations</h2>
              <p>
                Despite our best efforts to ensure accessibility, there may be some limitations. Below is a description
                of known limitations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Interactive maps:</strong> Our coverage area maps may not be fully accessible to screen readers.
                  If you require information about our service areas, please contact us directly.
                </li>
                <li>
                  <strong>Before and after image sliders:</strong> These interactive elements may be difficult to operate
                  with keyboard-only navigation. Static versions of key before-and-after images are available on request.
                </li>
                <li>
                  <strong>Third-party content:</strong> Some embedded third-party content such as Google Maps or social
                  media feeds may not fully meet accessibility standards. These are outside our direct control.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">5. Reporting Accessibility Problems</h2>
              <p>
                We welcome your feedback on the accessibility of this website. If you experience any difficulty
                accessing content or functionality, please contact us and we will endeavour to respond within 5 working
                days:
              </p>
              <p className="font-semibold text-[#0B1E3F]">
                PowerWash Bros Ltd
                <br />
                Email:{" "}
                <a href="mailto:info@powerwashbros.co.uk" className="text-[#1E90FF] hover:underline font-normal">
                  info@powerwashbros.co.uk
                </a>
                <br />
                Phone: 07418 610731
                <br />
                Address: Hardingredmans, Bridge House, Court Road, Swanage, BH19 1DX
              </p>
              <p>When you contact us, please include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The web address (URL) of the page with the accessibility problem</li>
                <li>Your name and contact details</li>
                <li>A description of the problem you experienced</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">6. Enforcement Procedure</h2>
              <p>
                If you are not satisfied with our response, you can contact the Equality Advisory and Support Service
                (EASS):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Website:{" "}
                  <a
                    href="https://www.equalityadvisoryservice.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E90FF] hover:underline"
                  >
                    www.equalityadvisoryservice.com
                  </a>
                </li>
                <li>Telephone: 0808 800 0082</li>
                <li>Textphone: 0808 800 0084</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">7. Alternative Formats</h2>
              <p>
                If you need information on this website in a different format, such as accessible PDF, large print, or
                audio recording, please contact us at{" "}
                <a href="mailto:info@powerwashbros.co.uk" className="text-[#1E90FF] hover:underline">
                  info@powerwashbros.co.uk
                </a>
                . We will consider your request and get back to you within 5 working days.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">8. Preparation of This Statement</h2>
              <p>
                This statement was prepared in March 2026. It was last reviewed in March 2026. The website was last
                tested in March 2026 using a combination of automated tools and manual testing across desktop, tablet,
                and mobile devices.
              </p>
            </section>
          </div>

          <div className="pt-8 border-t">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>

      <PWBFooter />
    </>
  )
}
