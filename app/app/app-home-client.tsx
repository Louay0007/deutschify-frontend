"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UnverifiedEmailBanner } from "@/components/auth/unverified-email-banner"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardOnboarding } from "@/components/onboarding/dashboard-onboarding"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth/auth-context"
import { isAuthBypassEnabled, MOCK_USER } from "@/lib/mock/mock-user"

export function AppHomeClient() {
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

  if (!isReady) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-walnut-shadow">
        <Spinner className="size-6 text-ember-accent" />
      </div>
    )
  }

  if (!activeUser) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-walnut-shadow">
        <Spinner className="size-6 text-ember-accent" />
      </div>
    )
  }

  const displayName = activeUser.profile?.displayName || activeUser.email

  return (
    <>
      <DashboardOnboarding
        userId={activeUser.id}
        displayName={activeUser.profile?.displayName}
      />

      <DashboardShell displayName={displayName}>
        <UnverifiedEmailBanner />
        <DashboardHome displayName={displayName} />
      </DashboardShell>
    </>
  )
}
