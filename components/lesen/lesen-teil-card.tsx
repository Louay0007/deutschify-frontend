import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LesenTeil } from "@/lib/mock/lesen-data"
import { getTeilProgress } from "@/lib/mock/lesen-data"

type Props = {
  teil: LesenTeil
  className?: string
}

export function LesenTeilCard({ teil, className }: Props) {
  const progress = getTeilProgress(teil)

  return (
    <Link
      href={`/app/lesen/${teil.slug}`}
      className={cn(
        "course-card group relative flex flex-col overflow-hidden rounded-[20px] p-5 transition-all duration-300 ios-spring sm:p-6",
        "hover:border-ember-accent/40 hover:bg-bark-brown/90",
        "active:scale-[0.99]",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-ember-accent/10 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-[14px] bg-ember-accent/15 text-ember-accent">
          <BookOpen className="size-5" strokeWidth={2} />
        </div>
        <span className="rounded-full bg-walnut-shadow/50 px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-warm-cream/70 uppercase">
          {progress.label}
        </span>
      </div>

      <h2 className="relative mt-5 font-display text-xl font-semibold tracking-[-0.03em] text-warm-cream sm:text-2xl">
        {teil.title}
      </h2>
      <p className="relative mt-2 max-w-xl text-[14px] leading-relaxed text-warm-cream/70">
        {teil.description}
      </p>

      <div className="relative mt-6 flex items-center gap-2 text-[14px] font-semibold text-ember-accent">
        Open topics
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
