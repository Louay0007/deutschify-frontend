"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LandingIcon,
  pricingFeatureIcons,
  type LandingIconComponent,
} from "@/components/landing/landing-icons"

interface PricingFeature {
  text: string
  icon: LandingIconComponent
}

interface PricingPlan {
  id: string
  name: string
  priceMonthly: number | string
  priceYearly: number | string
  description: string
  features: PricingFeature[]
  cta: string
  popular?: boolean
  type: "subscription" | "custom"
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Begin for free and explore how interactive B2 practice feels.",
    features: [
      { text: "Access to sample Lesen lessons", icon: pricingFeatureIcons.sampleLessons },
      { text: "Basic grammar drills", icon: pricingFeatureIcons.grammarDrills },
      { text: "Progress snapshot", icon: pricingFeatureIcons.progressSnapshot },
      { text: "Community tips", icon: pricingFeatureIcons.community },
    ],
    cta: "Begin for Free",
    type: "subscription",
  },
  {
    id: "b2-prep",
    name: "B2 Prep",
    priceMonthly: 29,
    priceYearly: 23,
    description:
      "Full exam preparation across reading, grammar, listening, writing, and speaking.",
    features: [
      { text: "All five B2 modules", icon: pricingFeatureIcons.allModules },
      { text: "Instant corrections & explanations", icon: pricingFeatureIcons.corrections },
      { text: "Speaking topics with Redemittel", icon: pricingFeatureIcons.speaking },
      { text: "Writing structures & model answers", icon: pricingFeatureIcons.writing },
      { text: "Exam-readiness dashboard", icon: pricingFeatureIcons.dashboard },
    ],
    cta: "Start Learning",
    popular: true,
    type: "subscription",
  },
  {
    id: "mentor",
    name: "Mentor",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description:
      "For schools, cohorts, and intensive pathways from Tunisia to Germany.",
    features: [
      { text: "Teacher / cohort dashboard", icon: pricingFeatureIcons.cohort },
      { text: "Personalized learning paths", icon: pricingFeatureIcons.learningPaths },
      { text: "Mock exams & timed sessions", icon: pricingFeatureIcons.mockExams },
      { text: "Priority support", icon: pricingFeatureIcons.support },
      { text: "Roadmap features early access", icon: pricingFeatureIcons.roadmap },
    ],
    cta: "Contact Us",
    type: "custom",
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="w-full bg-walnut-shadow py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="mb-8 flex flex-col gap-4 sm:mb-14">
          <div className="ios-fill ios-hairline flex w-fit items-center gap-2.5 rounded-full px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-ember-accent" />
            <span className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
              Pricing
            </span>
          </div>
          <h2 className="font-display text-balance text-[2rem] font-semibold leading-tight tracking-[-0.028em] text-warm-cream sm:text-4xl md:text-5xl">
            <span className="block">
              {"Choose the plan".split(" ").map((word, i) => (
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
            <span className="block text-driftwood">
              {"that matches your German journey".split(" ").map((word, i) => (
                <motion.span
                  key={i + 3}
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  whileInView={{ filter: "blur(0px)", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i + 3) * 0.05 }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <div className="ios-fill ios-hairline flex w-full max-w-full flex-wrap items-center gap-1 rounded-full p-1 sm:w-fit">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "min-h-11 flex-1 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors sm:flex-none",
                !isYearly ? "bg-warm-cream text-walnut-shadow" : "text-driftwood"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "min-h-11 flex-1 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors sm:flex-none",
                isYearly ? "bg-warm-cream text-walnut-shadow" : "text-driftwood"
              )}
            >
              Yearly
            </button>
            <span className="ml-0.5 mr-1.5 rounded-full bg-ember-accent/15 px-2.5 py-1 text-[11px] font-semibold text-ember-accent sm:ml-1 sm:mr-2">
              20% OFF
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.01 }}
                className={cn(
                  "relative flex flex-col gap-5 rounded-[20px] p-5 transition-all duration-300 sm:gap-6 sm:rounded-[24px] sm:p-6",
                  plan.popular
                    ? "ios-glass border-ember-accent/35"
                    : "ios-fill ios-hairline"
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[19px] font-semibold tracking-[-0.02em] text-warm-cream">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <div className="rounded-full bg-ember-accent/15 px-2.5 py-1">
                        <span className="text-[11px] font-semibold text-ember-accent">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-warm-cream sm:text-4xl">
                      {typeof plan.priceMonthly === "number"
                        ? plan.priceMonthly === 0
                          ? "Free"
                          : `$${isYearly ? plan.priceYearly : plan.priceMonthly}`
                        : plan.priceMonthly}
                    </h3>
                    {plan.type === "subscription" && plan.priceMonthly !== 0 && (
                      <span className="text-[15px] text-driftwood">/month</span>
                    )}
                  </div>
                  <p className="min-h-0 text-balance text-[15px] leading-relaxed text-driftwood md:min-h-[44px]">
                    {plan.description}
                  </p>
                </div>

                <button
                  className={cn(
                    "w-full cursor-pointer rounded-full px-4 py-3.5 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]",
                    plan.popular
                      ? "bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90"
                      : "border border-warm-cream/20 bg-warm-cream/5 text-warm-cream hover:bg-warm-cream/10"
                  )}
                >
                  {plan.cta}
                </button>

                <div className="h-px w-full bg-warm-cream/10" />

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2.5 sm:items-center">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-ember-accent/12 sm:mt-0">
                        <LandingIcon
                          icon={feature.icon}
                          size="xs"
                          className="text-ember-accent"
                        />
                      </span>
                      <span className="text-[15px] text-driftwood">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
