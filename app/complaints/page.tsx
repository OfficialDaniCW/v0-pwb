import { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Complaints Policy | PowerWash Bros",
  description:
    "Our complaints policy and procedure. PowerWash Bros Ltd is committed to resolving any concerns quickly and fairly.",
  robots: "noindex, follow",
}

export default function ComplaintsPolicy() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <Link href="/" className="text-[#1E90FF] hover:underline">
              &larr; Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#0B1E3F]">Complaints Policy</h1>
            <p className="text-gray-600">Last updated: March 2026</p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-gray-700">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">1. Our Commitment</h2>
              <p>
                PowerWash Bros Ltd takes all complaints seriously. We are committed to providing a professional,
                high-quality service and we recognise that, on occasion, things can go wrong. When they do, we want to
                resolve the issue as quickly and fairly as possible.
              </p>
              <p>
                We treat every complaint as an opportunity to improve our service. All complaints are handled with
                respect, confidentiality, and without any detriment to the complainant.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">2. What Is a Complaint?</h2>
              <p>
                A complaint is any expression of dissatisfaction with our service, staff, or products that requires a
                formal response. This includes, but is not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quality of workmanship below the agreed standard</li>
                <li>Damage to property during service delivery</li>
                <li>Failure to arrive at the agreed time without reasonable notice</li>
                <li>Unsatisfactory communication or conduct by our team</li>
                <li>Billing or pricing disputes</li>
                <li>Failure to deliver a quoted or agreed service</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">3. How to Make a Complaint</h2>
              <p>You can raise a complaint through any of the following channels:</p>
              <p className="font-semibold text-[#0B1E3F]">
                Email:{" "}
                <a href="mailto:info@powerwashbros.co.uk" className="text-[#1E90FF] hover:underline font-normal">
                  info@powerwashbros.co.uk
                </a>
                <br />
                Phone: 07418 610731
                <br />
                Post: PowerWash Bros Ltd, Hardingredmans, Bridge House, Court Road, Swanage, BH19 1DX
              </p>
              <p>When making a complaint, please provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your full name and contact details</li>
                <li>The date and address of the service</li>
                <li>A clear description of the issue</li>
                <li>Any photographs or supporting evidence</li>
                <li>Your preferred resolution</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">4. Our Complaints Procedure</h2>

              <h3 className="text-xl font-semibold text-[#0B1E3F]">Stage 1 &mdash; Acknowledgement</h3>
              <p>
                We will acknowledge your complaint within <strong>2 working days</strong> of receipt. We will confirm
                that we have received it and provide you with the name of the person handling your complaint.
              </p>

              <h3 className="text-xl font-semibold text-[#0B1E3F] mt-4">Stage 2 &mdash; Investigation</h3>
              <p>
                We will investigate your complaint thoroughly and fairly. This may include reviewing photographs,
                speaking with our team, and revisiting the property if required. We will aim to provide a full written
                response within <strong>10 working days</strong> of acknowledging your complaint.
              </p>
              <p>
                If the investigation takes longer than 10 working days, we will keep you updated and provide a revised
                timescale.
              </p>

              <h3 className="text-xl font-semibold text-[#0B1E3F] mt-4">Stage 3 &mdash; Resolution</h3>
              <p>Our response will set out:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The outcome of our investigation</li>
                <li>Any steps we will take to resolve the issue</li>
                <li>Any remedial work, refund, or compensation offered where appropriate</li>
                <li>Lessons learnt and any changes to our processes</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">5. Remedies and Compensation</h2>
              <p>Where we uphold a complaint, remedies may include one or more of the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A return visit to rectify any workmanship issues at no additional cost</li>
                <li>A partial or full refund where the service was not delivered as agreed</li>
                <li>Compensation for documented damage caused directly by our team</li>
                <li>A formal written apology</li>
              </ul>
              <p>
                Any damage claims will be assessed in accordance with our public liability insurance policy, which
                provides cover up to &pound;5 million.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">6. If You Are Not Satisfied</h2>
              <p>
                If you are not satisfied with our response at Stage 3, you may request a review by a senior member of
                the business. Please state clearly why you remain dissatisfied and what outcome you are seeking.
              </p>
              <p>
                We will provide a final written response within <strong>10 working days</strong> of receiving your
                request for review. This final response represents the conclusion of our internal complaints process.
              </p>
              <p>After exhausting our internal process, you may wish to seek independent advice from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Citizens Advice:</strong>{" "}
                  <a
                    href="https://www.citizensadvice.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E90FF] hover:underline"
                  >
                    www.citizensadvice.org.uk
                  </a>
                </li>
                <li>
                  <strong>Trading Standards:</strong> Via your local council or the Citizens Advice consumer helpline on
                  0808 223 1133
                </li>
                <li>
                  <strong>Small Claims Court:</strong> For disputes involving sums up to &pound;10,000 in England and
                  Wales
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">7. Confidentiality and Record Keeping</h2>
              <p>
                All complaints are handled in strict confidence. Records of complaints and their outcomes are retained
                for a minimum of 3 years and are used solely for the purpose of improving our services. Personal data
                within complaint records is processed in accordance with our{" "}
                <Link href="/privacy" className="text-[#1E90FF] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0B1E3F]">8. Contact Us</h2>
              <p>
                If you have a concern or would like to discuss any aspect of our service before raising a formal
                complaint, please do not hesitate to get in touch:
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
                <br />
                Company No. 16100439
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
