import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Cookie Policy | PowerWash Bros Swanage",
  description: "Learn about how PowerWash Bros uses cookies on our website.",
}

export default function CookiePolicy() {
  return (
    <>
      <SiteHeader />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#0B1E3F]">Cookie Policy</h1>
            <p className="text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-gray-700">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
              <p>PowerWash Bros uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold">3.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.
              </p>

              <h3 className="text-xl font-semibold">3.2 Analytics Cookies (Google Analytics)</h3>
              <p>
                We use Google Analytics to understand how visitors interact with our website. These cookies collect information such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Number of visitors to our site</li>
                <li>How visitors found our site</li>
                <li>Pages visited and time spent on each page</li>
                <li>Device and browser information</li>
              </ul>
              <p>
                This data is anonymized and helps us improve our website and services. Google Analytics cookies expire after 26 months.
              </p>

              <h3 className="text-xl font-semibold">3.3 Third-Party Cookies</h3>
              <p>
                Some pages on our website may include content from third-party services such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Maps:</strong> For displaying service area maps</li>
                <li><strong>YouTube:</strong> For embedding video content</li>
                <li><strong>Trustpilot:</strong> For displaying customer reviews</li>
              </ul>
              <p>
                These services may set their own cookies. We do not control these cookies, and you should check the respective third-party websites for more information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Cookie Duration</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Managing Cookies</h2>
              <p>
                You can control and manage cookies in various ways:
              </p>

              <h3 className="text-xl font-semibold">5.1 Browser Settings</h3>
              <p>
                Most browsers allow you to refuse or accept cookies, delete existing cookies, or set preferences for certain websites. Check your browser's help menu for instructions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold">5.2 Opt-Out Tools</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Opt-out browser add-on</a></li>
                <li><strong>All Advertising:</strong> <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a></li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Impact of Disabling Cookies</h2>
              <p>
                Please note that blocking or deleting cookies may impact your experience on our website. Some features may not work as intended, and you may need to manually adjust preferences each time you visit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. Please check this page periodically for updates.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p>If you have questions about our use of cookies:</p>
              <p className="font-semibold">
                PowerWash Bros Ltd<br />
                Email: info@powerwashbros.co.uk<br />
                Phone: 07418 610731<br />
                Address: Hardingredmans, Bridge House, Court Road, Swanage, Dorset, BH19 1DX
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. More Information</h2>
              <p>
                For more information about cookies and how they work, visit:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">All About Cookies</a></li>
                <li><a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ICO - Cookies Guidance</a></li>
              </ul>
              <p>
                For our full privacy practices, please see our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
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
