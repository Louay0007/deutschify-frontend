"use client"

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "error" | "success" | "info" | "warning"

const tones: Record<
  Tone,
  { wrap: string; icon: typeof AlertCircle }
> = {
  error: {
    wrap: "border-ember-accent/35 bg-ember-accent/10 text-warm-cream",
    icon: AlertCircle,
  },
  success: {
    wrap: "border-warm-cream/20 bg-warm-cream/[0.06] text-warm-cream",
    icon: CheckCircle2,
  },
  info: {
    wrap: "border-warm-cream/15 bg-warm-cream/[0.04] text-warm-cream",
    icon: Info,
  },
  warning: {
    wrap: "border-ember-accent/25 bg-ember-accent/8 text-warm-cream",
    icon: AlertCircle,
  },
}

type Props = {
  tone?: Tone
  title?: string
  children: React.ReactNode
  onDismiss?: () => void
  className?: string
  role?: "alert" | "status"
}

export function AuthAlert({
  tone = "error",
  title,
  children,
  onDismiss,
  className,
  role = "alert",
}: Props) {
  const cfg = tones[tone]
  const Icon = cfg.icon

  return (
    <div
      role={role}
      className={cn(
        "flex gap-3 rounded-[16px] border px-4 py-3.5",
        cfg.wrap,
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-ember-accent" />
      <div className="min-w-0 flex-1 space-y-0.5">
        {title ? (
          <p className="text-[14px] font-semibold tracking-[-0.015em]">{title}</p>
        ) : null}
        <div className="text-[13px] leading-relaxed text-warm-cream/80">
          {children}
        </div>
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-driftwood transition-colors hover:bg-warm-cream/10 hover:text-warm-cream"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
