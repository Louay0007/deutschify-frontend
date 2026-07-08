"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-walnut-shadow">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-walnut-shadow/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-16 lg:py-36">
        <div className="ios-glass max-w-2xl rounded-[22px] p-6 sm:rounded-[28px] sm:p-8 md:p-10">
          <h2 className="font-display text-balance text-[2rem] font-semibold tracking-[-0.03em] text-warm-cream sm:text-4xl md:text-5xl">
            {"Prepare for your German future".split(" ").map((word, i) => (
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
          <p className="mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-warm-cream/75 sm:mt-5 sm:text-[17px]">
            Learning German shouldn&apos;t feel like reading a PDF. Practice step by step — and pass your B2 exam with confidence.
          </p>
          <Button size="lg" className="mt-6 w-full sm:mt-8 sm:w-auto">
            Start Learning
          </Button>
        </div>
      </div>
    </section>
  )
}
