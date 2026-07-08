"use client"

import { AuthAlert } from "./auth-alert"
import { useAuth } from "@/lib/auth/auth-context"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function UnverifiedEmailBanner({ className }: Props) {
  const { showVerifyBanner, dismissBanner, user } = useAuth()

  if (!showVerifyBanner) return null

  return (
    <div className={cn("mb-6 text-left", className)}>
      <AuthAlert
        tone="warning"
        title="Confirm your email"
        onDismiss={dismissBanner}
        role="status"
      >
        We sent a confirmation link
        {user?.email ? (
          <>
            {" "}
            to <span className="text-warm-cream">{user.email}</span>
          </>
        ) : null}
        . It expires in 24 hours.
      </AuthAlert>
    </div>
  )
}
