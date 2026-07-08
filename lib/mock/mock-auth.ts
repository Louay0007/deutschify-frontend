import type { AuthTokensPayload, AuthUser } from "@/lib/auth/types"
import { MOCK_USER } from "@/lib/mock/mock-user"

const MOCK_ACCESS = "mock-access-token"
const MOCK_REFRESH = "mock-refresh-token"

/** Demo account for quick sign-in during mock mode */
export const MOCK_DEMO = {
  email: "amira@deutschify.app",
  password: "Deutschify1",
} as const

/**
 * Mock auth is ON by default so Vercel works without env vars.
 * Set NEXT_PUBLIC_AUTH_BYPASS=false when the real API is ready.
 */
export function isMockAuthEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_AUTH_BYPASS === "false") return false
  if (process.env.NEXT_PUBLIC_AUTH_BYPASS === "true") return true
  return true
}

/** @deprecated use isMockAuthEnabled */
export function isAuthBypassEnabled() {
  return isMockAuthEnabled()
}

function delay(ms = 280) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function makeTokens(user: AuthUser): AuthTokensPayload {
  return {
    user,
    accessToken: MOCK_ACCESS,
    refreshToken: MOCK_REFRESH,
  }
}

function userFromEmail(
  email: string,
  displayName?: string,
  verified = false
): AuthUser {
  const base = displayName?.trim() || email.split("@")[0] || "Student"
  const capitalized =
    base.charAt(0).toUpperCase() + base.slice(1).replace(/[._-]/g, " ")

  return {
    ...MOCK_USER,
    id: `mock-${email.replace(/[^a-z0-9]/gi, "-")}`,
    email,
    status: verified ? "ACTIVE" : "PENDING_VERIFICATION",
    emailVerifiedAt: verified ? new Date().toISOString() : null,
    lastLoginAt: new Date().toISOString(),
    profile: {
      ...MOCK_USER.profile!,
      id: `mock-profile-${email.replace(/[^a-z0-9]/gi, "-")}`,
      displayName: capitalized,
    },
    createdAt: new Date().toISOString(),
  }
}

export const mockAuthApi = {
  async login(body: { email: string; password: string }) {
    await delay()
    if (body.password.length < 8) {
      throw new Error("INVALID_CREDENTIALS")
    }
    const user =
      body.email === MOCK_DEMO.email
        ? { ...MOCK_USER, email: MOCK_DEMO.email, lastLoginAt: new Date().toISOString() }
        : userFromEmail(body.email, undefined, body.email === MOCK_DEMO.email)
    return makeTokens(user)
  },

  async register(body: {
    email: string
    password: string
    displayName: string
  }) {
    await delay(360)
    if (body.password.length < 8) {
      throw new Error("WEAK_PASSWORD")
    }
    const user = userFromEmail(body.email, body.displayName)
    return makeTokens(user)
  },

  async forgotPassword(_body: { email: string }) {
    await delay(320)
    return { message: "If that email exists, a reset link was sent (mock)." }
  },

  async resetPassword(_body: { token: string; newPassword: string }) {
    await delay(320)
    return { message: "Password updated (mock)." }
  },

  async verifyEmail(_body: { token: string }) {
    await delay(280)
    return { message: "Email verified (mock)." }
  },

  async me(): Promise<AuthUser> {
    await delay(120)
    return MOCK_USER
  },

  async logout() {
    await delay(80)
  },

  async logoutAll() {
    await delay(80)
  },
}
