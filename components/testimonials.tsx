"use client"

import { Star } from 'lucide-react'
import { useState } from 'react'

export function Testimonials() {
  const [activeSource, setActiveSource] = useState<"google" | "trustpilot">("google")

  const googleTestimonials = [
    {
      rating: 5,
      quote: "Messaged the team over at Powerwash Bros who got back to me exceptionally quickly, I was having overflowing gutters and water ingress in to the building, living near trees means that my area is prone to blocked drains.",
      author: "Ashbydelazoosh",
      location: "Swanage",
      service: "Gutter Cleaning",
      source: "google"
    },
    {
      rating: 5,
      quote: "I asked the Powerwash Bros to service our front driveway as it has seen a few winters without a good clean and any treatment, quite mouldy and full of weeds. They turned up prompt and eager to get on. Gave the whole driveway a full and thorough clean.",
      author: "Alex Brown",
      location: "Purbeck",
      service: "Driveway Cleaning",
      source: "google"
    },
    {
      rating: 5,
      quote: "Amazing job by the best power wash man in the south, no doubt!! Quick, efficient and handsome. My patio, gutters and windows have never looked better.",
      author: "Matthew Lapham",
      location: "Dorset",
      service: "Patio & Gutters",
      source: "google"
    },
    {
      rating: 5,
      quote: "Fantastic service and great value. Highly recommend!",
      author: "Alex Gousseau",
      location: "Swanage",
      service: "Property Cleaning",
      source: "google"
    },
    {
      rating: 5,
      quote: "Really good they came and cleaned my patio and it now looks like new brilliant service.",
      author: "David Perry",
      location: "Purbeck",
      service: "Patio Cleaning",
      source: "google"
    },
    {
      rating: 5,
      quote: "Found their services incredibly professional, quick and effective will definitely book again.",
      author: "Adrian Downton",
      location: "Dorset",
      service: "Property Maintenance",
      source: "google"
    }
  ]

  const trustpilotTestimonials = [
    {
      rating: 5,
      quote: "Dani and his brother were extremely efficient and pleasant to deal with - great communication and carried out the job without any fuss. They cleared my gutters, and alerted me to a wasps' nest and a broken tile. Will definitely ask them back to clear the roof of moss in the spring.",
      author: "Jenphil",
      location: "UK",
      service: "Gutter Cleaning",
      source: "trustpilot"
    },
    {
      rating: 5,
      quote: "Extremely helpful, knowledgeable and reliable. Work was completed to a high standard.",
      author: "Hollie Cameron",
      location: "UK",
      service: "Property Cleaning",
      source: "trustpilot"
    },
    {
      rating: 5,
      quote: "Santos was so good, punctual, professional, committed, clean and everything you want.",
      author: "Matthew Lapham",
      location: "UK",
      service: "Professional Clean",
      source: "trustpilot"
    },
    {
      rating: 5,
      quote: "The guys were so attentive to what I asked to be done. They were respectful of the property and did an excellent job. A few months later I can say my drive is still without the slippy moss they removed at the time. My gutters were grateful too!",
      author: "Lindy Cameron",
      location: "UK",
      service: "Driveway & Gutters",
      source: "trustpilot"
    },
    {
      rating: 5,
      quote: "Outstanding! Completely refreshed our terrace and made it look new again. Thank you so much.",
      author: "Dan",
      location: "UK",
      service: "Terrace Cleaning",
      source: "trustpilot"
    },
    {
      rating: 5,
      quote: "What a difference! Over the moon with how it all turned out, well worth it. The guys are very friendly, I couldn't have asked for more. The guys came and cleaned everything, sky lantern (on the roof), windows, balcony, house and patio (which now looks like It was laid yesterday).",
      author: "George Ridges",
      location: "UK",
      service: "Full Property Clean",
      source: "trustpilot"
    },
    {
      rating: 5,
      quote: "Quick response to panicked message when blocked gutter left water pouring down our walls. Friendly demeanour and spotless gutters, what more could you ask for?!?",
      author: "Customer",
      location: "UK",
      service: "Emergency Gutter Clear",
      source: "trustpilot"
    }
  ]

  const currentTestimonials = activeSource === "google" ? googleTestimonials : trustpilotTestimonials

  return (
    <section 
      className="py-24 bg-white/5 relative"
      style={{
        backgroundImage: 'url(/backgrounds/pwb-dark-white.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-[#0B1E3F]/80 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              What Purbeck Property Owners Say
            </h2>
            
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
                <span className="text-white font-semibold">4.9 Rating</span>
              </button>

              <button
                onClick={() => setActiveSource("trustpilot")}
                className={`flex items-center gap-3 transition-opacity ${
                  activeSource === "trustpilot" ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />
                  ))}
                </div>
                <span className="text-white font-semibold">Excellent Trustpilot</span>
              </button>
            </div>

            <p className="text-white/60">
              100+ Five-Star Reviews from satisfied customers across Swanage and Purbeck
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {currentTestimonials.map((testimonial, index) => (
              <div key={index} className="glass-border rounded-xl p-6 relative">
                <div className="absolute top-4 right-4">
                  {testimonial.source === "google" ? (
                    <div className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      Google
                    </div>
                  ) : (
                    <div className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                      Trustpilot
                    </div>
                  )}
                </div>

                <div className={`flex mb-4 ${testimonial.source === "google" ? "text-yellow-400" : "text-green-500"}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.location}</p>
                  <p className="text-sm text-[#1E90FF] mt-1">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.google.com/maps/place/Powerwash+Bros+Ltd/@50.6119,-1.9598,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E90FF] font-medium hover:underline"
            >
              Read More on Google Reviews →
            </a>
            <span className="text-white/40">•</span>
            <a
              href="https://uk.trustpilot.com/review/powerwashbros.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E90FF] font-medium hover:underline"
            >
              Read More on Trustpilot →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
