"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { AuthAlert } from "@/components/auth/auth-alert"
import { AuthField } from "@/components/auth/auth-field"
import { fieldIcons } from "@/components/auth/auth-icons"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { PasswordChecklist } from "@/components/auth/password-checklist"
import { authApi } from "@/lib/auth/api"
import { useAuth } from "@/lib/auth/auth-context"
import { markOnboardingPending } from "@/lib/onboarding/storage"
import { ApiError } from "@/lib/auth/types"
import {
  getPasswordChecks,
  isValidEmail,
  mapAuthErrorMessage,
  passwordMatchesApi,
} from "@/lib/auth/validation"

export function RegisterForm() {
  const router = useRouter()
  const { setSession } = useAuth()

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const checks = useMemo(
    () => getPasswordChecks(password, confirm),
    [password, confirm]
  )

  function validate() {
    const next: Record<string, string> = {}
    const name = displayName.trim()
    if (name.length < 2) next.displayName = "Display name must be at least 2 characters"
    else if (name.length > 100) next.displayName = "Display name must be 100 characters or fewer"

    if (!email.trim()) next.email = "Email is required"
    else if (!isValidEmail(email)) next.email = "Enter a valid email"

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
      const data = await authApi.register({
        displayName: displayName.trim(),
        email: email.trim().toLowerCase(),
        password,
      })
      setSession(data)
      markOnboardingPending(data.user.id)
      toast.success("Account created", {
        description:
          "Check your email to confirm your address (link valid 24 hours).",
      })
      router.replace("/app")
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409 || err.code === "EMAIL_ALREADY_EXISTS") {
          setFieldErrors((prev) => ({
            ...prev,
            email: mapAuthErrorMessage("EMAIL_ALREADY_EXISTS", err.message),
          }))
        } else {
          setFormError(mapAuthErrorMessage(err.code, err.message))
        }
      } else {
        setFormError("Couldn’t reach the server. Check your connection.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      headline="Create your account"
      supporting="Free account to practice all B2 skills"
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-warm-cream transition-colors hover:text-ember-accent"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {formError ? <AuthAlert>{formError}</AuthAlert> : null}

        <AuthField
          label="Display name"
          name="displayName"
          autoComplete="name"
          required
          icon={fieldIcons.name}
          value={displayName}
          onChange={setDisplayName}
          error={fieldErrors.displayName}
          disabled={submitting}
        />

        <AuthField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
          icon={fieldIcons.email}
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          disabled={submitting}
        />

        <div className="space-y-2">
          <AuthField
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            icon={fieldIcons.password}
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            disabled={submitting}
          />
          <PasswordChecklist
            checks={checks}
            showMatch={confirm.length > 0}
          />
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
          Create account
        </AuthSubmitButton>
      </form>
    </AuthShell>
  )
}
