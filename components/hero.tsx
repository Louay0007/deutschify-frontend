"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Plane } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

const navLinks = [
  { href: "#modules", label: "Modules" },
  { href: "#journey", label: "Journey" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-walnut-shadow">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-walnut-shadow/55" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 sm:h-56 md:h-72"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--walnut-shadow) 70%, transparent) 40%, var(--walnut-shadow) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <nav className="relative z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 md:px-6 md:pt-5">
          <div className="mx-auto flex max-w-5xl items-center justify-between bg-transparent px-2 py-2 sm:px-4 sm:py-2.5 md:px-5">
            <Link href="/" className="flex items-center gap-2 text-warm-cream">
              <span className="text-[17px] font-semibold tracking-[-0.022em]">
                Deutschify
              </span>
            </Link>

            <div className="hidden items-center gap-1 text-[15px] text-warm-cream/70 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 transition-colors hover:bg-warm-cream/8 hover:text-warm-cream"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="#pricing"
                className="hidden rounded-full px-3 py-2 text-[15px] font-medium text-warm-cream/80 transition-colors hover:bg-warm-cream/8 hover:text-warm-cream lg:block"
              >
                Sign In
              </Link>
              <Link
                href="#pricing"
                className="hidden rounded-full bg-warm-cream px-4 py-2 text-[15px] font-semibold text-walnut-shadow transition-transform active:scale-[0.97] lg:block"
              >
                Get Started
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex size-11 items-center justify-center rounded-full text-warm-cream hover:bg-warm-cream/8 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full right-3 left-3 z-50 mt-2 overflow-hidden rounded-[20px] border border-warm-cream/15 bg-walnut-shadow/95 backdrop-blur-xl lg:hidden">
              <div className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-[12px] px-4 py-3.5 text-[17px] text-warm-cream/80 transition-colors hover:bg-warm-cream/8 hover:text-warm-cream"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#pricing"
                  className="mt-1 rounded-full bg-warm-cream px-4 py-3.5 text-center text-[17px] font-semibold text-walnut-shadow"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="flex flex-1 flex-col items-center px-4 pt-10 text-center sm:px-6 sm:pt-16 md:pt-24">
          <h1 className="font-display max-w-3xl text-balance text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.03em] text-warm-cream sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">
              {"Willkommen Bei".split(" ").map((word, i) => (
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
            </span>
            <span className="block">
              <motion.span
                initial={{ filter: "blur(10px)", opacity: 0 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="inline-block"
              >
                Deutschify
              </motion.span>
            </span>
          </h1>

          <p className="mt-3 max-w-md text-balance text-[17px] font-semibold tracking-[-0.02em] text-ember-accent sm:mt-4 sm:text-[19px] md:text-[21px]">
            Master German B2. Pass with Confidence.
          </p>

          <p className="mt-4 max-w-xl text-balance text-center text-[15px] leading-relaxed text-warm-cream/70 sm:mt-5 md:text-[17px]">
            From Tunisia to Germany — practice Lesen, Hören, Schreiben &amp; Mündlich until the B2 exam feels familiar.
          </p>

          <div className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Start Learning
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Lessons
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex items-center justify-center gap-3 pb-[max(2rem,env(safe-area-inset-bottom))] sm:mt-auto sm:gap-4 sm:pb-10 md:gap-5 md:pb-14"
          >
            <div className="overflow-hidden rounded-[10px] border border-warm-cream/20">
              <img
                src="/images/flags/tunisia.png"
                alt="Flag of Tunisia"
                className="h-8 w-12 object-cover sm:h-9 sm:w-14 md:h-11 md:w-[4.5rem]"
              />
            </div>

            <div className="flex items-center gap-1 text-ember-accent sm:gap-1.5" aria-hidden>
              <span className="h-px w-3 bg-ember-accent/50 sm:w-5 md:w-8" />
              <Plane className="h-4 w-4 rotate-45 sm:h-5 sm:w-5" strokeWidth={2} />
              <span className="h-px w-3 bg-ember-accent/50 sm:w-5 md:w-8" />
            </div>

            <div className="overflow-hidden rounded-[10px] border border-warm-cream/20">
              <img
                src="/images/flags/germany.png"
                alt="Flag of Germany"
                className="h-8 w-12 object-cover sm:h-9 sm:w-14 md:h-11 md:w-[4.5rem]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
