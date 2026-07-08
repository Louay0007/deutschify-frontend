import Link from "next/link"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LesenTopic, TopicStatus } from "@/lib/mock/lesen-data"

type Props = {
  teilSlug: string
  topic: LesenTopic
}

function StatusIcon({ status }: { status: TopicStatus }) {
  if (status === "done") {
    return (
      <Check
        className="size-3.5 text-[color:var(--course-correct)]"
        strokeWidth={2.5}
      />
    )
  }
  return <Minus className="size-3.5 text-warm-cream/50" strokeWidth={2} />
}

export function LesenTopicCard({ teilSlug, topic }: Props) {
  return (
    <Link
      href={`/app/lesen/${teilSlug}/${topic.slug}`}
      className={cn(
        "course-topic-card group flex min-h-[52px] items-center justify-between gap-3 px-4 py-3 transition-all duration-200 ios-spring",
        "hover:border-ember-accent/50 hover:shadow-[0_8px_24px_-12px_rgba(220,80,0,0.35)]",
        "active:scale-[0.985]",
        topic.status === "done" && "ring-1 ring-[color:var(--course-correct)]/30"
      )}
    >
      <span className="truncate text-[14px] font-medium tracking-[-0.015em] text-warm-cream">
        {topic.title}
      </span>
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full border border-warm-cream/15 bg-walnut-shadow/50",
          topic.status === "partial" && "border-ember-accent/50"
        )}
        aria-hidden
      >
        <StatusIcon status={topic.status} />
      </span>
    </Link>
  )
}
