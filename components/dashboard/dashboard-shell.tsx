"use client"

import { useState, type ReactNode } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardTopbar } from "./dashboard-topbar"

type Props = {
  children: ReactNode
  displayName?: string
  /** Wider main column (e.g. exercise boards) */
  contentClassName?: string
}

export function DashboardShell({
  children,
  displayName,
  contentClassName,
}: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-[100svh] bg-walnut-shadow text-warm-cream">
      <DashboardSidebar
        className="hidden lg:flex"
        onNavigate={() => setMobileNavOpen(false)}
      />

      <div className="flex min-h-[100svh] min-w-0 flex-1 flex-col">
        <DashboardTopbar
          displayName={displayName}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div
            className={cn(
              "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
              contentClassName
            )}
          >
            {children}
          </div>
        </main>
      </div>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-[17rem] border-warm-cream/10 bg-walnut-shadow p-0 text-warm-cream"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <DashboardSidebar
            className="h-full min-h-[100svh] w-full border-0"
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
