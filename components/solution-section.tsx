"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Headphones,
  Mic,
  Puzzle,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface JourneyStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const steps: JourneyStep[] = [
  {
    id: 1,
    title: "1 — Choose a Module",
    description:
      "Start with Lesen, Sprachbausteine, Hören, Schreiben, or Mündlich — the full official B2 exam map in one place.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "2 — Practice Interactively",
    description:
      "Complete realistic exercises, audio tasks, writing prompts, and speaking topics designed like the real exam.",
    icon: <Puzzle className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "3 — Get Instant Feedback",
    description:
      "See corrections, explanations, vocabulary help, and grammar notes immediately — not after waiting days.",
    icon: <Headphones className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "4 — Track & Pass with Confidence",
    description:
      "Review progress, strengthen weak skills, and walk into your B2 exam ready for study, work, or life in Germany.",
    icon: <Mic className="h-5 w-5" />,
  },
]

export function SolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="journey"
      className="flex w-full flex-col items-center overflow-hidden bg-walnut-shadow py-16 text-warm-cream sm:py-24 md:py-28"
    >
      <div className="w-full max-w-7xl space-y-8 px-4 sm:space-y-12 sm:px-6 md:px-12 lg:px-16">
        <div className="flex max-w-[560px] flex-col gap-4">
          <div className="ios-fill ios-hairline flex w-fit items-center gap-2.5 rounded-full px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-ember-accent" />
            <span className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
              Learning Journey
            </span>
          </div>
          <h2 className="font-display text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.028em] text-warm-cream sm:text-4xl md:text-5xl">
            {"Your path to B2 — step by step".split(" ").map((word, i) => (
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
          <p className="text-balance text-[15px] leading-relaxed text-driftwood sm:text-[17px]">
            Unlike static courses, Deutschify guides you from module selection to exam day with practice, feedback, and progress that feels like a modern platform — not a textbook dump.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 lg:min-h-[360px] lg:grid-cols-2 lg:gap-8">
          <div className="ios-fill ios-hairline relative hidden min-h-[280px] w-full flex-col justify-center gap-5 overflow-hidden rounded-[20px] p-5 sm:aspect-[4/3] sm:min-h-0 sm:rounded-[24px] sm:p-8 md:p-10 lg:flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-ember-accent text-warm-cream">
                  {steps[activeIndex].icon}
                </div>
                <p className="text-[13px] font-semibold tracking-[0.06em] text-ember-accent uppercase">
                  Step {activeIndex + 1} of {steps.length}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.022em] text-warm-cream sm:text-3xl">
                  {steps[activeIndex].title}
                </h3>
                <p className="max-w-md text-[15px] leading-relaxed text-driftwood sm:text-[17px]">
                  {steps[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-5 bottom-5 left-5 flex h-1 gap-2 sm:right-8 sm:bottom-8 sm:left-8">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className="h-full flex-1 overflow-hidden rounded-full bg-warm-cream/10"
                >
                  {activeIndex === idx && (
                    <motion.div
                      className="h-full rounded-full bg-ember-accent/80"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                  {idx < activeIndex && (
                    <div className="h-full w-full rounded-full bg-ember-accent/80" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative w-full rounded-[16px] p-4 text-left outline-none transition-all duration-300 ios-spring sm:p-5",
                  activeIndex === index
                    ? "ios-fill ios-hairline"
                    : "hover:bg-warm-cream/[0.04]"
                )}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-0.5 flex size-10 items-center justify-center rounded-[12px] transition-colors duration-300",
                      activeIndex === index
                        ? "bg-ember-accent text-warm-cream"
                        : "bg-warm-cream/8 text-driftwood"
                    )}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3
                      className={cn(
                        "text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-300",
                        activeIndex === index
                          ? "text-warm-cream"
                          : "text-driftwood"
                      )}
                    >
                      {step.title}
                    </h3>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden text-[15px] leading-relaxed text-driftwood"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div
                    className={cn(
                      "mt-2 transition-all duration-300",
                      activeIndex === index
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    )}
                  >
                    <ChevronRight className="h-5 w-5 text-warm-cream/40" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-2 sm:pt-4">
          <Button size="lg" className="w-full max-w-sm gap-2 sm:w-auto">
            Start Your Journey
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
