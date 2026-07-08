import type { AuthTokensPayload, AuthUser } from "./types"

const ACCESS_KEY = "deutschify.accessToken"
const REFRESH_KEY = "deutschify.refreshToken"
const USER_KEY = "deutschify.user"
const BANNER_DISMISS_KEY = "deutschify.verifyBannerDismissed"

function canUseStorage() {
  return typeof window !== "undefined"
}

export function getAccessToken(): string | null {
  if (!canUseStorage()) return null
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  if (!canUseStorage()) return null
  return localStorage.getItem(REFRESH_KEY)
}

export function getStoredUser(): AuthUser | null {
  if (!canUseStorage()) return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function saveSession(payload: AuthTokensPayload) {
  if (!canUseStorage()) return
  localStorage.setItem(ACCESS_KEY, payload.accessToken)
  localStorage.setItem(REFRESH_KEY, payload.refreshToken)
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
}

export function updateStoredUser(user: AuthUser) {
  if (!canUseStorage()) return
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  if (!canUseStorage()) return
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(BANNER_DISMISS_KEY)
  resetDocumentLtr()
}

export function applyUserPreferences(user: AuthUser | null) {
  if (!canUseStorage() || !user?.profile) return
  const root = document.documentElement
  root.lang = "en"
  root.dir = "ltr"
}

export function resetDocumentLtr() {
  if (!canUseStorage()) return
  document.documentElement.lang = "en"
  document.documentElement.dir = "ltr"
}

export function isVerifyBannerDismissed(): boolean {
  if (!canUseStorage()) return false
  return sessionStorage.getItem(BANNER_DISMISS_KEY) === "1"
}

export function dismissVerifyBanner() {
  if (!canUseStorage()) return
  sessionStorage.setItem(BANNER_DISMISS_KEY, "1")
}
