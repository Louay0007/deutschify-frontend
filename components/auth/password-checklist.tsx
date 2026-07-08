"use client"

import {
  CaseSensitive,
  Check,
  Hash,
  Link2,
  Ruler,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { PasswordCheck } from "@/lib/auth/validation"

type Props = {
  checks: PasswordCheck
  showMatch?: boolean
}

function Row({
  ok,
  label,
  Icon,
}: {
  ok: boolean
  label: string
  Icon: LucideIcon
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5 text-[13px] transition-colors duration-200",
        ok ? "text-warm-cream/90" : "text-driftwood"
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-[8px] transition-colors duration-200",
          ok ? "bg-ember-accent/20 text-ember-accent" : "bg-warm-cream/5 text-driftwood"
        )}
      >
        {ok ? (
          <Check className="size-3.5" strokeWidth={2.5} />
        ) : (
          <Icon className="size-3.5" strokeWidth={2} />
        )}
      </span>
      <span>{label}</span>
    </li>
  )
}

export function PasswordChecklist({ checks, showMatch = false }: Props) {
  return (
    <ul
      className="mt-1 space-y-1.5 rounded-[14px] border border-warm-cream/8 bg-warm-cream/[0.03] px-3.5 py-3"
      aria-live="polite"
    >
      <Row ok={checks.minLength} label="At least 8 characters" Icon={Ruler} />
      <Row ok={checks.hasLetter} label="Contains a letter" Icon={CaseSensitive} />
      <Row ok={checks.hasNumber} label="Contains a number" Icon={Hash} />
      {showMatch ? (
        <Row ok={checks.matches} label="Passwords match" Icon={Link2} />
      ) : null}
    </ul>
  )
}
