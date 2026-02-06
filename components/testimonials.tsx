"use client"

import { Star } from "lucide-react"
import { useState } from "react"
import Script from "next/script"

export function Testimonials() {
  const [activeSource, setActiveSource] = useState<"google" | "trustpilot">("google")

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "PowerWash Bros Ltd",
      "url": "https://powerwashbros.co.uk"
    }
  }

  const googleTestimonials = [
    {
      rating: 5,
      quote:
        "Messaged the team over at Powerwash Bros who got back to me exceptionally quickly, I was having overflowing gutters and water ingress in to the building, living near trees means that my area is prone to blocked drains.",
      author: "Ashbydelazoosh",
      location: "Swanage",
      service: "Gutter Cleaning",
      source: "google",
    },
    {
      rating: 5,
      quote:
        "I asked the Powerwash Bros to service our front driveway as it has seen a few winters without a good clean and any treatment, quite mouldy and full of weeds. They turned up prompt and eager to get on. Gave the whole driveway a full and thorough clean.",
      author: "Alex Brown",
      location: "Purbeck",
      service: "Driveway Cleaning",
      source: "google",
    },
    {
      rating: 5,
      quote:
        "Amazing job by the best power wash man in the south, no doubt!! Quick, efficient and handsome. My patio, gutters and windows have never looked better.",
      author: "Matthew Lapham",
      location: "Dorset",
      service: "Patio & Gutters",
      source: "google",
    },
    {
      rating: 5,
      quote: "Fantastic service and great value. Highly recommend!",
      author: "Alex Gousseau",
      location: "Swanage",
      service: "Property Cleaning",
      source: "google",
    },
    {
      rating: 5,
      quote: "Really good they came and cleaned my patio and it now looks like new brilliant service.",
      author: "David Perry",
      location: "Purbeck",
      service: "Patio Cleaning",
      source: "google",
    },
    {
      rating: 5,
      quote: "Found their services incredibly professional, quick and effective will definitely book again.",
      author: "Adrian Downton",
      location: "Dorset",
      service: "Property Maintenance",
      source: "google",
    },
  ]

  const trustpilotTestimonials = [
    {
      rating: 5,
      quote:
        "Dani and his brother were extremely efficient and pleasant to deal with - great communication and carried out the job without any fuss. They cleared my gutters, and alerted me to a wasps' nest and a broken tile. Will definitely ask them back to clear the roof of moss in the spring.",
      author: "Jenphil",
      location: "UK",
      service: "Gutter Cleaning",
      source: "trustpilot",
    },
    {
      rating: 5,
      quote: "Extremely helpful, knowledgeable and reliable. Work was completed to a high standard.",
      author: "Hollie Cameron",
      location: "UK",
      service: "Property Cleaning",
      source: "trustpilot",
    },
    {
      rating: 5,
      quote: "Santos was so good, punctual, professional, committed, clean and everything you want.",
      author: "Matthew Lapham",
      location: "UK",
      service: "Professional Clean",
      source: "trustpilot",
    },
    {
      rating: 5,
      quote:
        "The guys were so attentive to what I asked to be done. They were respectful of the property and did an excellent job. A few months later I can say my drive is still without the slippy moss they removed at the time. My gutters were grateful too!",
      author: "Lindy Cameron",
      location: "UK",
      service: "Driveway & Gutters",
      source: "trustpilot",
    },
    {
      rating: 5,
      quote: "Outstanding! Completely refreshed our terrace and made it look new again. Thank you so much.",
      author: "Dan",
      location: "UK",
      service: "Terrace Cleaning",
      source: "trustpilot",
    },
    {
      rating: 5,
      quote:
        "What a difference! Over the moon with how it all turned out, well worth it. The guys are very friendly, I couldn't have asked for more. The guys came and cleaned everything, sky lantern (on the roof), windows, balcony, house and patio (which now looks like It was laid yesterday).",
      author: "George Ridges",
      location: "UK",
      service: "Full Property Clean",
      source: "trustpilot",
    },
    {
      rating: 5,
      quote:
        "Quick response to panicked message when blocked gutter left water pouring down our walls. Friendly demeanour and spotless gutters, what more could you ask for?!?",
      author: "Customer",
      location: "UK",
      service: "Emergency Gutter Clear",
      source: "trustpilot",
    },
  ]

  const currentTestimonials = activeSource === "google" ? googleTestimonials : trustpilotTestimonials

  return (
    <section
      className="py-24 bg-white/5 relative"
      style={{
        backgroundImage: "url(/backgrounds/pwb-dark-white.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <Script id="aggregate-rating" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      <div className="absolute inset-0 bg-primary/80 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-foreground mb-6">What Purbeck Property Owners Say</h2>

            <div className="flex items-center justify-center gap-8 mb-6">
              <button
                onClick={() => setActiveSource("google")}
                className={`flex items-center gap-3 transition-opacity ${
                  activeSource === "google" ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-foreground font-semibold">4.9 Rating</span>
              </button>

              <button
                onClick={() => setActiveSource("trustpilot")}
                className={`flex items-center gap-3 transition-opacity ${
                  activeSource === "trustpilot" ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-success text-success" />
                  ))}
                </div>
                <span className="text-foreground font-semibold">Excellent Trustpilot</span>
              </button>
            </div>

            <p className="text-muted-foreground">100+ Five-Star Reviews from satisfied customers across Swanage and Purbeck</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {currentTestimonials.map((testimonial, index) => (
              <div key={index} className="glass-border rounded-xl p-6 relative">
                <div className="absolute top-4 right-4">
                  {testimonial.source === "google" ? (
                    <div className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Google</div>
                  ) : (
                    <div className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Trustpilot</div>
                  )}
                </div>

                <div className={`flex mb-4 ${testimonial.source === "google" ? "text-yellow-400" : "text-success"}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-sm text-accent mt-1">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 flex flex-wrap justify-center items-center gap-6">
            <a
              href="https://www.google.com/maps/place/Powerwash+Bros+Ltd/@50.6096156,-1.9657821,17z/data=!3m1!4b1!4m6!3m5!1s0x326cc51b7553d29:0x623817cb057a3b98!8m2!3d50.6096156!4d-1.9632018!16s%2Fg%2F11wty1x79b?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 transition-all px-6 py-3 rounded-lg shadow-lg text-primary"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-semibold text-primary">Google Reviews</span>
            </a>

            <a
              href="https://uk.trustpilot.com/review/powerwashbros.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-success hover:bg-success/90 transition-all px-6 py-3 rounded-lg shadow-lg text-success-foreground"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-semibold text-success-foreground">Trustpilot</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
