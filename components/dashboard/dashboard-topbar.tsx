"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  displayName?: string
  onOpenMobileNav?: () => void
}

export function DashboardTopbar({ displayName, onOpenMobileNav }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-warm-cream/10 bg-walnut-shadow/95 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={onOpenMobileNav}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>

          <Link href="/app" className="flex min-w-0 items-center gap-2.5 lg:hidden">
            <img
              src="/images/deutschify-logo.png"
              alt="Deutschify"
              className="size-8 rounded-[9px] border border-ember-accent/80 object-cover sm:size-9"
            />
            <div className="min-w-0 leading-tight">
              <span className="block text-[16px] font-semibold tracking-[-0.022em] text-warm-cream sm:text-[17px]">
                Deutschify
              </span>
              {displayName ? (
                <span className="block truncate text-[12px] text-driftwood">
                  {displayName}
                </span>
              ) : null}
            </div>
          </Link>

          <div className="hidden min-w-0 lg:block">
            <p className="text-[13px] font-semibold tracking-[0.04em] text-driftwood uppercase">
              Dashboard
            </p>
            {displayName ? (
              <p className="truncate text-[15px] font-medium text-warm-cream">
                Welcome back, {displayName}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
