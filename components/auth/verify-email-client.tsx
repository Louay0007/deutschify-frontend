"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthAlert } from "@/components/auth/auth-alert"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { authApi } from "@/lib/auth/api"
import { useAuth } from "@/lib/auth/auth-context"
import { getAccessToken } from "@/lib/auth/session"
import { ApiError } from "@/lib/auth/types"
import { mapAuthErrorMessage } from "@/lib/auth/validation"

type Phase = "loading" | "success" | "error" | "missing"

export function VerifyEmailClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, refreshMe } = useAuth()
  const token = (searchParams.get("token") || "").trim()

  const [phase, setPhase] = useState<Phase>(
    !token || token.length < 20 ? "missing" : "loading"
  )
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token || token.length < 20) return

    let cancelled = false

    ;(async () => {
      try {
        await authApi.verifyEmail({ token })
        if (cancelled) return

        if (getAccessToken()) {
          await refreshMe()
        }

        setPhase("success")
        setMessage("Email confirmed successfully.")
      } catch (err) {
        if (cancelled) return
        if (err instanceof ApiError) {
          setMessage(mapAuthErrorMessage(err.code, err.message))
        } else {
          setMessage("Couldn’t reach the server. Check your connection.")
        }
        setPhase("error")
      }
    })()

    return () => {
      cancelled = true
    }
  }, [token, refreshMe])

  if (phase === "loading") {
    return (
      <AuthShell
        headline="Confirming your email…"
        supporting="Just a moment while we verify your link."
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <Spinner className="size-8 text-ember-accent" />
          <p className="text-[15px] text-driftwood">Confirming your email…</p>
        </div>
      </AuthShell>
    )
  }

  if (phase === "missing") {
    return (
      <AuthShell
        headline="This link is invalid"
        supporting="Open the confirmation link from your email, or sign in to continue."
      >
        <div className="flex flex-col gap-3">
          <AuthAlert tone="warning">
            No confirmation token was found in this link.
          </AuthAlert>
          <Button
            asChild
            size="lg"
            className="w-full bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </AuthShell>
    )
  }

  if (phase === "error") {
    return (
      <AuthShell
        headline="Couldn’t confirm email"
        supporting="Confirmation links remain valid for 24 hours."
      >
        <div className="flex flex-col gap-4">
          <AuthAlert>{message}</AuthAlert>
          <Button
            asChild
            size="lg"
            className="w-full bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90"
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      headline="Email confirmed"
      supporting="You’re all set to continue your B2 prep."
    >
      <div className="flex flex-col gap-4">
        <AuthAlert tone="success" role="status">
          {message}
        </AuthAlert>
        <Button
          size="lg"
          className="w-full bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90"
          onClick={() => {
            if (isAuthenticated || getAccessToken()) {
              router.replace("/app")
            } else {
              router.replace("/login")
            }
          }}
        >
          {isAuthenticated || getAccessToken()
            ? "Continue to app"
            : "Sign in"}
        </Button>
      </div>
    </AuthShell>
  )
}
