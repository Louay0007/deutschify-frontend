"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { AuthAlert } from "@/components/auth/auth-alert"
import { AuthField } from "@/components/auth/auth-field"
import { fieldIcons } from "@/components/auth/auth-icons"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { PasswordChecklist } from "@/components/auth/password-checklist"
import { Button } from "@/components/ui/button"
import { authApi } from "@/lib/auth/api"
import { clearSession } from "@/lib/auth/session"
import { ApiError } from "@/lib/auth/types"
import {
  getPasswordChecks,
  mapAuthErrorMessage,
  passwordMatchesApi,
} from "@/lib/auth/validation"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = (searchParams.get("token") || "").trim()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const checks = useMemo(
    () => getPasswordChecks(password, confirm),
    [password, confirm]
  )

  const tokenLooksInvalid = !token || token.length < 20

  if (tokenLooksInvalid) {
    return (
      <AuthShell
        headline="This reset link is invalid"
        supporting="Request a new password reset link to continue."
      >
        <div className="flex flex-col gap-4">
          <AuthAlert tone="warning">
            The link is missing or incomplete. Reset links expire after 1 hour.
          </AuthAlert>
          <Button asChild size="lg" className="w-full bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90">
            <Link href="/forgot-password">Request a new link</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full text-driftwood">
            <Link href="/login">Back to sign in</Link>
          </Button>
        </div>
      </AuthShell>
    )
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!passwordMatchesApi(password)) {
      next.password = "Password must include at least one letter and one number"
    }
    if (!confirm) next.confirm = "Confirm your password"
    else if (password !== confirm) next.confirm = "Passwords do not match"
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    if (!validate()) return

    setSubmitting(true)
    try {
      await authApi.resetPassword({ token, newPassword: password })
      clearSession()
      router.replace("/login?passwordUpdated=1")
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(mapAuthErrorMessage(err.code, err.message))
      } else {
        setFormError("Couldn’t reach the server. Check your connection.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      headline="Choose a new password"
      supporting="Use a strong password you’ll remember for Deutschify"
      footer={
        <Link
          href="/login"
          className="font-semibold text-warm-cream transition-colors hover:text-ember-accent"
        >
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {formError ? (
          <AuthAlert>
            {formError}{" "}
            {formError.includes("invalid or expired") ? (
              <Link
                href="/forgot-password"
                className="font-semibold text-ember-accent underline-offset-2 hover:underline"
              >
                Request a new reset link
              </Link>
            ) : null}
          </AuthAlert>
        ) : null}

        <div className="space-y-2">
          <AuthField
            label="New password"
            type="password"
            name="newPassword"
            autoComplete="new-password"
            required
            icon={fieldIcons.password}
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            disabled={submitting}
          />
          <PasswordChecklist checks={checks} showMatch={confirm.length > 0} />
        </div>

        <AuthField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          required
          icon={fieldIcons.confirm}
          value={confirm}
          onChange={setConfirm}
          error={fieldErrors.confirm}
          disabled={submitting}
        />

        <AuthSubmitButton loading={submitting} className="mt-2">
          Update password
        </AuthSubmitButton>
      </form>
    </AuthShell>
  )
}
