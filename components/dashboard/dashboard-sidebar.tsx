"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  Headphones,
  LayoutDashboard,
  LogOut,
  Mic,
  PenLine,
  Puzzle,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"
import { isAuthBypassEnabled } from "@/lib/mock/mock-user"

const NAV_ITEMS = [
  {
    href: "/app",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (path: string) => path === "/app",
  },
  {
    href: "/app/lesen",
    label: "Lesen",
    icon: BookOpen,
    match: (path: string) => path.startsWith("/app/lesen"),
  },
  {
    href: "/app#grammar",
    label: "Sprachbausteine",
    icon: Puzzle,
    match: () => false,
  },
  {
    href: "/app#listening",
    label: "Hören",
    icon: Headphones,
    match: () => false,
  },
  {
    href: "/app#writing",
    label: "Schreiben",
    icon: PenLine,
    match: () => false,
  },
  {
    href: "/app#speaking",
    label: "Mündlich",
    icon: Mic,
    match: () => false,
  },
  {
    href: "/app#progress",
    label: "Progress",
    icon: TrendingUp,
    match: () => false,
  },
]

type Props = {
  className?: string
  onNavigate?: () => void
}

export function DashboardSidebar({ className, onNavigate }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()
  const bypass = isAuthBypassEnabled()

  async function handleLogout() {
    await logout()
    onNavigate?.()
    if (!bypass) {
      router.replace("/login")
    }
  }

  return (
    <aside
      className={cn(
        "flex min-h-[100svh] w-[15.5rem] shrink-0 flex-col border-r border-warm-cream/10 bg-walnut-shadow",
        className
      )}
    >
      <div className="border-b border-warm-cream/10 px-4 py-5">
        <Link href="/app" className="flex items-center gap-2.5" onClick={onNavigate}>
          <img
            src="/images/deutschify-logo.png"
            alt="Deutschify"
            className="size-9 rounded-[10px] border border-ember-accent/80 object-cover"
          />
          <span className="text-[17px] font-semibold tracking-[-0.022em] text-warm-cream">
            Deutschify
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-3 py-4">
        <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.06em] text-driftwood uppercase">
          Practice
        </p>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname)
            return (
              <Link
                key={label}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-medium transition-colors ios-spring",
                  active
                    ? "bg-ember-accent/15 text-warm-cream"
                    : "text-driftwood hover:bg-warm-cream/8 hover:text-warm-cream"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    active ? "text-ember-accent" : "text-driftwood"
                  )}
                  strokeWidth={2}
                />
                <span className="truncate">{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-warm-cream/10 p-3">
        {bypass ? (
          <p className="mb-2 px-2 text-center text-[10px] font-medium tracking-[0.02em] text-ember-accent/90">
            Dev mode · auth bypassed
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "group flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-warm-cream/15 bg-transparent px-4 py-3",
            "text-[15px] font-semibold tracking-[-0.02em] text-warm-cream/85 backdrop-blur-sm",
            "transition-all duration-200 ios-spring",
            "hover:border-warm-cream/25 hover:bg-warm-cream/[0.06] hover:text-warm-cream",
            "active:scale-[0.98]"
          )}
        >
          <LogOut
            className="size-4 text-driftwood transition-colors group-hover:text-ember-accent"
            strokeWidth={2}
          />
          {bypass ? "Reset session" : "Sign out"}
        </button>
      </div>
    </aside>
  )
}
