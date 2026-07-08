"use client"

import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { UnverifiedEmailBanner } from "@/components/auth/unverified-email-banner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth/auth-context"
import { isAuthBypassEnabled, MOCK_USER } from "@/lib/mock/mock-user"

type Props = {
  children: ReactNode
  contentClassName?: string
}

export function LesenAppGate({ children, contentClassName }: Props) {
  const router = useRouter()
  const { user, isReady } = useAuth()
  const bypass = isAuthBypassEnabled()
  const activeUser = user ?? (bypass ? MOCK_USER : null)

  useEffect(() => {
    if (!isReady) return
    if (!activeUser && !bypass) {
      router.replace("/login")
    }
  }, [isReady, activeUser, bypass, router])

  if (!isReady || !activeUser) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-walnut-shadow">
        <Spinner className="size-6 text-ember-accent" />
      </div>
    )
  }

  const displayName = activeUser.profile?.displayName || activeUser.email

  return (
    <DashboardShell displayName={displayName} contentClassName={contentClassName}>
      <UnverifiedEmailBanner />
      {children}
    </DashboardShell>
  )
}
