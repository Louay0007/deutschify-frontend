"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { AuthAlert } from "@/components/auth/auth-alert"
import { AuthField } from "@/components/auth/auth-field"
import { fieldIcons } from "@/components/auth/auth-icons"
import { AuthShell } from "@/components/auth/auth-shell"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { authApi } from "@/lib/auth/api"
import { useAuth } from "@/lib/auth/auth-context"
import { ApiError } from "@/lib/auth/types"
import { isValidEmail, mapAuthErrorMessage } from "@/lib/auth/validation"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setSession } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [infoNotice, setInfoNotice] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const emailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reason = searchParams.get("reason")
    const updated = searchParams.get("passwordUpdated")
    if (reason === "session_ended") {
      setInfoNotice("Your session ended. Please sign in again.")
    } else if (updated === "1") {
      setInfoNotice("Password updated successfully. Sign in with your new password.")
    }
  }, [searchParams])

  function validate() {
    const next: typeof fieldErrors = {}
    if (!email.trim()) next.email = "Email is required"
    else if (!isValidEmail(email)) next.email = "Enter a valid email"
    if (!password) next.password = "Password is required"
    else if (password.length < 8) next.password = "Password must be at least 8 characters"
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    if (!validate()) {
      emailRef.current?.querySelector("input")?.focus()
      return
    }

    setSubmitting(true)
    try {
      const data = await authApi.login({
        email: email.trim().toLowerCase(),
        password,
      })
      setSession(data)
      router.replace("/app")
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "ACCOUNT_SUSPENDED") {
          setFormError(mapAuthErrorMessage(err.code, err.message))
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
      headline="Sign in"
      supporting="Continue preparing for your German B2 exam"
      footer={
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1" dir="ltr">
          <Link
            href="/register"
            className="font-semibold text-warm-cream transition-colors hover:text-ember-accent"
          >
            Create account
          </Link>
          <span className="text-warm-cream/25" aria-hidden>
            ·
          </span>
          <Link
            href="/forgot-password"
            className="font-semibold text-warm-cream transition-colors hover:text-ember-accent"
          >
            Forgot password?
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {infoNotice ? (
          <AuthAlert tone="info" role="status">
            {infoNotice}
          </AuthAlert>
        ) : null}

        {formError ? (
          <AuthAlert
            tone={
              formError.includes("suspended") ? "warning" : "error"
            }
            title={
              formError.includes("suspended")
                ? "Account suspended"
                : undefined
            }
          >
            {formError}
          </AuthAlert>
        ) : null}

        <div ref={emailRef}>
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
        </div>

        <AuthField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          icon={fieldIcons.password}
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          disabled={submitting}
        />

        <AuthSubmitButton loading={submitting} className="mt-2">
          Sign in
        </AuthSubmitButton>
      </form>
    </AuthShell>
  )
}
