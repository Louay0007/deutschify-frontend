"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthAlert } from "@/components/auth/auth-alert"
import { AuthField } from "@/components/auth/auth-field"
import { fieldIcons } from "@/components/auth/auth-icons"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { Button } from "@/components/ui/button"
import { authApi } from "@/lib/auth/api"
import { ApiError } from "@/lib/auth/types"
import { isValidEmail, mapAuthErrorMessage } from "@/lib/auth/validation"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | undefined>()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setFieldError("Email is required")
      return
    }
    if (!isValidEmail(email)) {
      setFieldError("Enter a valid email")
      return
    }
    setFieldError(undefined)

    setSubmitting(true)
    try {
      await authApi.forgotPassword({ email: email.trim().toLowerCase() })
      setSent(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(mapAuthErrorMessage(err.code, err.message))
      } else {
        setError("Couldn’t reach the server. Check your connection.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      headline="Reset your password"
      supporting="We’ll email you a reset link if an account exists"
      footer={
        <Link
          href="/login"
          className="font-semibold text-warm-cream transition-colors hover:text-ember-accent"
        >
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col gap-5">
          <AuthAlert tone="success" title="Check your inbox" role="status">
            If an account exists for that email, a reset link has been sent.
            Check inbox and spam — the link expires in 1 hour.
          </AuthAlert>
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/login">Back to sign in</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          {error ? <AuthAlert>{error}</AuthAlert> : null}

          <AuthField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
            icon={fieldIcons.email}
            value={email}
            onChange={setEmail}
            error={fieldError}
            disabled={submitting}
          />

          <AuthSubmitButton loading={submitting} className="mt-2">
            Send reset link
          </AuthSubmitButton>

          <Button asChild variant="ghost" className="w-full text-driftwood">
            <Link href="/login">Back to sign in</Link>
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
