"use client"

import { useId, useState, type ComponentType } from "react"
import { Eye, EyeOff, type LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

type AuthFieldProps = {
  id?: string
  label: string
  type?: "text" | "email" | "password"
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
  name?: string
  placeholder?: string
  onBlur?: () => void
  className?: string
  icon?: ComponentType<LucideProps>
}

export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  disabled,
  required,
  name,
  placeholder,
  onBlur,
  className,
  icon: Icon,
}: AuthFieldProps) {
  const generatedId = useId()
  const fieldId = id || generatedId
  const errorId = `${fieldId}-error`
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={fieldId}
        className="text-left text-[13px] font-semibold tracking-[-0.01em] text-warm-cream/85"
      >
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>

      <div className="relative">
        {Icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3.5 z-[1] flex size-7 -translate-y-1/2 items-center justify-center rounded-[9px] bg-ember-accent/15 text-ember-accent">
            <Icon className="size-3.5" strokeWidth={2.25} aria-hidden />
          </span>
        ) : null}

        <input
          id={fieldId}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 w-full rounded-[14px] border bg-warm-cream/[0.04] text-[17px] tracking-[-0.02em] text-warm-cream outline-none transition-[border-color,box-shadow,background-color] duration-200 ios-spring",
            "placeholder:text-driftwood/60",
            "focus-visible:border-ember-accent/50 focus-visible:bg-warm-cream/[0.06] focus-visible:ring-2 focus-visible:ring-ember-accent/25",
            "disabled:cursor-not-allowed disabled:opacity-50",
            Icon ? "pl-[3.25rem] pr-4" : "px-4",
            isPassword ? "pr-12" : undefined,
            error
              ? "border-ember-accent/60 focus-visible:border-ember-accent"
              : "border-warm-cream/15 hover:border-warm-cream/25"
          )}
        />

        {isPassword ? (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            disabled={disabled}
            className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-driftwood transition-colors hover:bg-warm-cream/8 hover:text-warm-cream disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-[13px] leading-snug text-ember-accent"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
