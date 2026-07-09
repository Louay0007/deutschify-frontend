"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { b2ModuleList, LandingIcon } from "@/components/landing/landing-icons"

const navLinks = [
  { href: "#modules", label: "Modules" },
  { href: "#journey", label: "Journey" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

export function ProblemSection() {
  return (
    <section className="relative w-full overflow-hidden bg-walnut-shadow py-16 sm:py-20 md:py-28">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -m-6 rounded-[40px] opacity-50 blur-3xl sm:-m-10"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--ember-accent) 28%, transparent), transparent 70%)",
              }}
            />
            <img
              src="/images/deutschify-logo.png"
              alt="Deutschify"
              className="relative h-44 w-44 rounded-[28px] border-2 border-ember-accent object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:h-56 sm:w-56 sm:rounded-[36px] md:h-72 md:w-72 md:rounded-[44px] lg:h-[22rem] lg:w-[22rem] lg:rounded-[48px]"
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-5 text-center sm:gap-6 lg:items-start lg:text-left">
          <div className="ios-fill ios-hairline flex w-fit items-center gap-2.5 rounded-full px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-ember-accent" />
            <span className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
              What we do
            </span>
          </div>

          <h2 className="font-display max-w-xl text-balance text-[2rem] font-semibold tracking-[-0.028em] text-warm-cream sm:text-4xl md:text-5xl">
            {"We turn B2 prep into practice".split(" ").map((word, i) => (
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

          <p className="max-w-xl text-balance text-[15px] leading-relaxed text-warm-cream/75 sm:text-[17px] md:text-[19px]">
            Deutschify is an interactive platform for Tunisian students heading to Germany.
            Instead of static PDFs, you train every exam skill — reading, grammar, listening,
            writing, and speaking — with realistic exercises, instant feedback, and clear progress.
          </p>

          <div className="grid w-full max-w-xl grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
            {b2ModuleList.map(({ icon, label, detail }) => (
              <div
                key={label}
                className="ios-fill ios-hairline flex items-start gap-3 rounded-[14px] px-3.5 py-3 text-left"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-ember-accent/15">
                  <LandingIcon icon={icon} size="xs" className="text-ember-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-warm-cream">{label}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-driftwood">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3 pt-2 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" className="w-full sm:w-auto">
              Start Learning
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Lessons
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
