"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  faqTopicIcons,
  landingChromeIcons,
  LandingIcon,
  type LandingIconComponent,
} from "@/components/landing/landing-icons"

interface FAQItem {
  id: string
  question: string
  answer: string
  icon: LandingIconComponent
}

const faqs: FAQItem[] = [
  {
    id: "1",
    icon: faqTopicIcons.audience,
    question: "Who is Deutschify for?",
    answer:
      "Primarily Tunisian students preparing for the German B2 exam — plus university students, professionals seeking certification, and anyone planning to study, work, or live in Germany.",
  },
  {
    id: "2",
    icon: faqTopicIcons.modules,
    question: "Which B2 modules are included?",
    answer:
      "All five official sections: Lesen (reading), Sprachbausteine (grammar), Hören (listening), Schreiben (writing), and Mündlich (speaking) — with structured lessons and exam-oriented practice.",
  },
  {
    id: "3",
    icon: faqTopicIcons.interactive,
    question: "How is this different from PDFs or traditional courses?",
    answer:
      "Instead of memorizing static material, you practice interactively, receive instant corrections and explanations, review vocabulary and grammar, and track progress toward real exam readiness.",
  },
  {
    id: "4",
    icon: faqTopicIcons.ai,
    question: "Do you offer AI writing and speaking correction?",
    answer:
      "Writing structures, model answers, and speaking Redemittel are available now. AI writing correction and AI speaking evaluation are on the roadmap as future features.",
  },
  {
    id: "5",
    icon: faqTopicIcons.progress,
    question: "Can I track my progress?",
    answer:
      "Yes. The dashboard shows lessons completed, exam readiness, weekly activity, vocabulary learned, average score, time studied, strongest skills, and areas that need improvement.",
  },
]

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleQuestion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="w-full bg-walnut-shadow py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="ios-fill ios-hairline flex w-fit items-center gap-2.5 rounded-full px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-ember-accent" />
              <span className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
                FAQ
              </span>
            </div>

            <h2 className="font-display text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.028em] text-warm-cream sm:text-4xl md:text-5xl lg:text-6xl">
              {"Common Questions".split(" ").map((word, i) => (
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

            <p className="max-w-md text-balance text-[15px] leading-relaxed text-driftwood sm:text-[17px]">
              Quick answers about Deutschify, B2 exam prep, and how interactive practice helps Tunisian learners get exam-ready.
            </p>
          </div>

          <div className="ios-fill ios-hairline overflow-hidden rounded-[20px]">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={index !== faqs.length - 1 ? "border-b border-warm-cream/10" : ""}
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="group flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:items-center sm:gap-4 sm:px-5 sm:py-5"
                >
                  <span className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-ember-accent/12 sm:mt-0">
                      <LandingIcon icon={faq.icon} size="xs" className="text-ember-accent" />
                    </span>
                    <span className="min-w-0 text-[15px] font-semibold tracking-[-0.02em] text-warm-cream transition-colors group-hover:text-ember-accent sm:text-[17px]">
                      {faq.question}
                    </span>
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-warm-cream/8 sm:mt-0 sm:size-8"
                  >
                    <LandingIcon
                      icon={landingChromeIcons.chevronDown}
                      size="xs"
                      className="text-driftwood"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pl-[3.25rem] pr-12 sm:px-5 sm:pb-5 sm:pl-[3.75rem] sm:pr-14">
                        <p className="text-[14px] leading-relaxed text-driftwood sm:text-[15px]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
