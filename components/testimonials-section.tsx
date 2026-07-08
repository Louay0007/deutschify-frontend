"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    quote:
      "I stopped drowning in PDFs. With Deutschify I practiced Lesen and Sprachbausteine every day — and walked into my B2 exam knowing what to expect.",
    author: "Amira Ben Salah",
    role: "STUDENT · TUNIS → MUNICH",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amira&backgroundColor=382416",
  },
  {
    id: 2,
    quote:
      "The Mündlich topics with Redemittel and discussion examples made speaking practice feel real. Instant feedback fixed mistakes I used to repeat for months.",
    author: "Youssef Trabelsi",
    role: "ENGINEER · SFAX → BERLIN",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef&backgroundColor=40372e",
  },
  {
    id: 3,
    quote:
      "Hören with transcripts and scoring helped me train like the real exam. I could finally see my progress instead of guessing if I was ready.",
    author: "Sarra Mansouri",
    role: "MEDICAL STUDENT · SOUSSE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarra&backgroundColor=6c5f51",
  },
  {
    id: 4,
    quote:
      "Schreiben used to scare me. The structures, vocabulary, and model answers turned writing into a clear process. Deutschify feels like a modern platform — not a course packet.",
    author: "Karim Jebali",
    role: "PROFESSIONAL · TUNIS",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim&backgroundColor=dc5000",
  },
  {
    id: 5,
    quote:
      "All five B2 sections in one place. That's what I needed before applying for Germany — organized content and a dashboard that showed where I was weak.",
    author: "Nour Hammami",
    role: "UNIVERSITY STUDENT · NABEUL",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour&backgroundColor=382416",
  },
  {
    id: 6,
    quote:
      "My learning streak kept me consistent. Interactive exercises beat memorizing textbooks — I finally built real exam confidence.",
    author: "Omar Chaabane",
    role: "GRADUATE · GABÈS → COLOGNE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar&backgroundColor=40372e",
  },
]

function wrapSlice(start: number, count: number) {
  return Array.from({ length: count }, (_, i) =>
    testimonials[(start + i) % testimonials.length]
  )
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const mobileCards = wrapSlice(currentIndex, 1)
  const desktopCards = wrapSlice(currentIndex, 3)

  return (
    <section className="w-full bg-walnut-shadow py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-5">
          <div className="ios-fill ios-hairline flex w-fit items-center gap-2.5 rounded-full px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-ember-accent" />
            <span className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
              Learners
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h2 className="font-display text-balance text-[2rem] font-semibold tracking-[-0.028em] text-warm-cream sm:text-4xl md:text-5xl">
              {"Trusted by Tunisian B2 candidates.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <div className="flex flex-shrink-0 gap-2 self-start sm:self-auto">
              <button
                onClick={prevTestimonial}
                className="ios-fill ios-hairline flex size-11 items-center justify-center rounded-full text-warm-cream transition-colors hover:bg-warm-cream/10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="ios-fill ios-hairline flex size-11 items-center justify-center rounded-full text-warm-cream transition-colors hover:bg-warm-cream/10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: one card */}
        <div className="md:hidden">
          {mobileCards.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Desktop: three cards */}
        <div className="hidden grid-cols-3 gap-4 md:grid">
          {desktopCards.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number]
}) {
  return (
    <div className="ios-fill ios-hairline rounded-[20px] p-5 sm:p-6">
      <div className="mb-4 text-3xl font-semibold text-ember-accent sm:mb-5">&quot;</div>
      <p className="mb-6 min-h-0 text-[15px] leading-relaxed text-warm-cream sm:mb-8 md:min-h-[160px] md:text-[17px]">
        {testimonial.quote}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar || "/placeholder.svg"}
          alt={testimonial.author}
          className="size-11 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate text-[15px] font-semibold tracking-[-0.01em] text-warm-cream">
            {testimonial.author}
          </div>
          <div className="text-[11px] tracking-[0.04em] text-driftwood uppercase sm:text-[12px]">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  )
}
