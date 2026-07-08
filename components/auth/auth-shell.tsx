"use client"

import Link from "next/link"
import { AuthFlagBackground } from "@/components/auth/auth-flag-background"
import { cn } from "@/lib/utils"

type AuthShellProps = {
  headline: string
  supporting: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

/** One logo per auth page — brand mark only, never duplicated in the form. */
export function AuthShell({
  headline,
  supporting,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <div
      dir="ltr"
      lang="en"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-walnut-shadow px-4 py-10 sm:px-6 sm:py-14"
    >
      <AuthFlagBackground />
      <div className={cn("relative z-10 w-full max-w-[420px]", className)}>
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
          <Link
            href="/"
            className="group mb-7 inline-flex flex-col items-center gap-3 rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-ember-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-walnut-shadow"
          >
            <img
              src="/images/deutschify-logo.png"
              alt="Deutschify"
              className="size-16 rounded-[18px] border-2 border-ember-accent object-cover shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 ios-spring group-active:scale-[0.97] sm:size-[4.5rem] sm:rounded-[20px]"
            />
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-warm-cream/90">
              Deutschify
            </span>
          </Link>

          <h1 className="font-display text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-warm-cream sm:text-[2.25rem]">
            {headline}
          </h1>
          <p className="mt-3 max-w-[34ch] text-balance text-[15px] leading-relaxed text-driftwood sm:text-[16px]">
            {supporting}
          </p>
        </div>

        <div className="ios-fill ios-hairline rounded-[24px] p-5 sm:p-7">
          {children}
        </div>

        {footer ? (
          <div className="mt-6 text-center text-[14px] leading-relaxed text-driftwood sm:text-[15px]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
