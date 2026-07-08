"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DashboardPlaceholder,
  ModulesPlaceholder,
  ProgressPlaceholder,
} from "./onboarding-placeholders"
import {
  completeOnboarding,
  shouldShowOnboarding,
} from "@/lib/onboarding/storage"

type Step = {
  id: number
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  imagePosition: "left" | "right"
  Image: () => React.JSX.Element
}

const STEPS: Step[] = [
  {
    id: 1,
    eyebrow: "Step 1 of 3",
    title: "Your learning dashboard",
    description:
      "Everything you need for B2 prep in one place — lessons, scores, and your path to exam day.",
    bullets: [
      "See exam readiness at a glance (mock: 68%)",
      "Track lessons completed and weekly activity",
      "Pick up where you left off with one tap",
    ],
    imagePosition: "right",
    Image: DashboardPlaceholder,
  },
  {
    id: 2,
    eyebrow: "Step 2 of 3",
    title: "Practice all five B2 skills",
    description:
      "Train Lesen, Sprachbausteine, Hören, Schreiben, and Mündlich with realistic, interactive exercises.",
    bullets: [
      "Module-based practice with instant feedback",
      "Speaking topics with Redemittel and examples",
      "Writing structures and model answers",
    ],
    imagePosition: "left",
    Image: ModulesPlaceholder,
  },
  {
    id: 3,
    eyebrow: "Step 3 of 3",
    title: "Track your progress",
    description:
      "Know when you’re exam-ready — vocabulary, scores, strengths, and skills that need more focus.",
    bullets: [
      "Exam-readiness score and mock exam history",
      "Vocabulary learned and average scores",
      "Clear view of strongest skills vs. weak spots",
    ],
    imagePosition: "right",
    Image: ProgressPlaceholder,
  },
]

type Props = {
  userId: string
  displayName?: string
}

export function DashboardOnboarding({ userId, displayName }: Props) {
  const [open, setOpen] = useState(() => shouldShowOnboarding(userId))
  const [stepIndex, setStepIndex] = useState(0)

  const step = STEPS[stepIndex]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === STEPS.length - 1

  const finish = useCallback(() => {
    completeOnboarding(userId)
    setOpen(false)
  }, [userId])

  const textBlock = (
    <div className="flex flex-col justify-center gap-4 text-left sm:gap-5">
      <div className="ios-fill ios-hairline flex w-fit items-center gap-2 rounded-full px-3 py-1.5">
        <div className="size-1.5 rounded-full bg-ember-accent" />
        <span className="text-[12px] font-semibold tracking-[0.04em] text-driftwood uppercase">
          {step.eyebrow}
        </span>
      </div>

      <div>
        <DialogTitle className="font-display text-balance text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.03em] text-warm-cream sm:text-[1.75rem]">
          {step.title}
        </DialogTitle>
        <DialogDescription className="mt-2 text-[14px] leading-relaxed text-driftwood sm:text-[15px]">
          {step.description}
        </DialogDescription>
      </div>

      <ul className="space-y-2">
        {step.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-warm-cream/85 sm:text-[14px]"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember-accent" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )

  const imageBlock = (
    <div className="w-full">
      <step.Image />
    </div>
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) finish()
        else setOpen(next)
      }}
    >
      <DialogContent
        showCloseButton={false}
        dir="ltr"
        lang="en"
        className="max-h-[min(92vh,820px)] overflow-y-auto border-warm-cream/15 bg-walnut-shadow p-0 text-left text-warm-cream sm:max-w-[min(92vw,720px)] lg:max-w-[860px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="border-b border-warm-cream/10 px-5 py-4 text-left sm:px-7 sm:py-5">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-warm-cream">
            Welcome{displayName ? `, ${displayName}` : ""}
          </p>
          <p className="mt-0.5 text-[12px] text-driftwood">
            A quick guide to your Deutschify dashboard
          </p>

          <div className="mt-4 flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "h-1 flex-1 overflow-hidden rounded-full bg-warm-cream/10 transition-colors duration-300",
                  i <= stepIndex && "bg-ember-accent/30"
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-full bg-ember-accent transition-all duration-300",
                    i < stepIndex ? "w-full" : i === stepIndex ? "w-1/2" : "w-0"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="px-5 py-5 sm:px-7 sm:py-6"
          >
            <div
              className={cn(
                "grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8",
                step.imagePosition === "left" && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
              )}
            >
              {textBlock}
              {imageBlock}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col-reverse gap-2 border-t border-warm-cream/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
          <Button
            type="button"
            variant="ghost"
            className="text-driftwood hover:text-warm-cream"
            onClick={finish}
          >
            Skip tour
          </Button>

          <div className="flex gap-2">
            {!isFirst ? (
              <Button
                type="button"
                variant="outline"
                className="gap-1"
                onClick={() => setStepIndex((i) => i - 1)}
              >
                <ChevronLeft className="size-4" />
                Back
              </Button>
            ) : null}

            {isLast ? (
              <Button
                type="button"
                className="bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90"
                onClick={finish}
              >
                Start exploring
              </Button>
            ) : (
              <Button
                type="button"
                className="gap-1 bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90"
                onClick={() => setStepIndex((i) => i + 1)}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
