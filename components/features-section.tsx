"use client"

import React from "react"
import { motion } from "framer-motion"
import { BookOpen, Puzzle, Headphones, PenLine, Mic, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FeatureItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "1",
    icon: <BookOpen className="h-5 w-5 text-warm-cream" />,
    title: "Lesen — Interactive Reading",
    description:
      "Authentic B2 passages with interactive questions, instant correction, vocabulary explanations, and grammar notes at every difficulty level.",
  },
  {
    id: "2",
    icon: <Puzzle className="h-5 w-5 text-warm-cream" />,
    title: "Sprachbausteine — Grammar",
    description:
      "Fill-in-the-blank drills, clear explanations, error correction, and smart feedback so you master structures — not just memorize them.",
  },
  {
    id: "3",
    icon: <Headphones className="h-5 w-5 text-warm-cream" />,
    title: "Hören — Listening",
    description:
      "Native-level recordings, interactive questions, transcripts, automatic scoring, and a progress history built for real exam listening.",
  },
  {
    id: "4",
    icon: <PenLine className="h-5 w-5 text-warm-cream" />,
    title: "Schreiben — Writing",
    description:
      "Exam prompts, model answers, structures, useful vocabulary, grammar reminders, and common-mistake checklists. AI correction coming soon.",
  },
  {
    id: "5",
    icon: <Mic className="h-5 w-5 text-warm-cream" />,
    title: "Mündlich — Speaking",
    description:
      "Official speaking topics with problem, solution, Redemittel, discussion ideas, and opinion examples — plus future AI speaking evaluation.",
  },
  {
    id: "6",
    icon: <LayoutDashboard className="h-5 w-5 text-warm-cream" />,
    title: "Progress Dashboard",
    description:
      "Track lessons completed, exam readiness, weekly activity, vocabulary learned, average score, and the skills that need more focus.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function FeaturesSection({
  preHeading = "Platform Modules",
  headline = "Everything you need for the B2 exam",
  features = DEFAULT_FEATURES,
  className,
}: {
  preHeading?: string
  headline?: string
  features?: FeatureItem[]
  className?: string
}) {
  return (
    <section
      id="modules"
      className={cn("w-full bg-walnut-shadow py-16 sm:py-24 md:py-28", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-5"
        >
          <div className="ios-fill ios-hairline flex w-fit items-center gap-2.5 rounded-full px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-ember-accent" />
            <span className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
              {preHeading}
            </span>
          </div>
          <h2 className="font-display max-w-[700px] text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.028em] text-warm-cream sm:text-4xl md:text-5xl lg:text-6xl">
            {headline.split(" ").map((word, i) => (
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
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 grid grid-cols-1 gap-3 sm:mb-14 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="ios-fill ios-hairline group flex flex-col rounded-[20px] p-5 transition-transform duration-300 ios-spring hover:-translate-y-0.5 sm:p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-ember-accent">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[17px] font-semibold tracking-[-0.02em] text-warm-cream">
                  {feature.title}
                </h4>
                <p className="text-balance text-[15px] leading-relaxed text-driftwood">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <Button size="lg" className="w-full sm:w-auto">
            Explore Lessons
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            View Demo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
