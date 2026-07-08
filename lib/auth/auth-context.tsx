"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { authApi } from "./api"
import { isMockAuthEnabled, MOCK_USER } from "@/lib/mock/mock-user"
import { markOnboardingPending, hasCompletedOnboarding } from "@/lib/onboarding/storage"
import {
  clearSession,
  dismissVerifyBanner,
  getStoredUser,
  isVerifyBannerDismissed,
  saveSession,
  updateStoredUser,
} from "./session"
import type { AuthTokensPayload, AuthUser } from "./types"

type AuthContextValue = {
  user: AuthUser | null
  isReady: boolean
  isAuthenticated: boolean
  showVerifyBanner: boolean
  setSession: (payload: AuthTokensPayload) => void
  refreshMe: () => Promise<AuthUser | null>
  logout: () => Promise<void>
  dismissBanner: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  useEffect(() => {
    const stored = getStoredUser()
    const bypass = isMockAuthEnabled()

    if (stored) {
      setUser(stored)
    } else if (bypass) {
      setUser(MOCK_USER)
      if (!hasCompletedOnboarding(MOCK_USER.id)) {
        markOnboardingPending(MOCK_USER.id)
      }
    }

    setBannerDismissed(isVerifyBannerDismissed())
    setIsReady(true)
  }, [])

  const setSession = useCallback((payload: AuthTokensPayload) => {
    saveSession(payload)
    setUser(payload.user)
    setBannerDismissed(false)
  }, [])

  const refreshMe = useCallback(async () => {
    try {
      const me = await authApi.me()
      updateStoredUser(me)
      setUser(me)
      return me
    } catch {
      return null
    }
  }, [])

  const logout = useCallback(async () => {
    if (!isMockAuthEnabled()) {
      await authApi.logout()
      clearSession()
      setUser(null)
      return
    }
    setUser(MOCK_USER)
  }, [])

  const dismissBanner = useCallback(() => {
    dismissVerifyBanner()
    setBannerDismissed(true)
  }, [])

  const showVerifyBanner = Boolean(
    user && !user.emailVerifiedAt && !bannerDismissed
  )

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user) || isMockAuthEnabled(),
      showVerifyBanner,
      setSession,
      refreshMe,
      logout,
      dismissBanner,
    }),
    [
      user,
      isReady,
      showVerifyBanner,
      setSession,
      refreshMe,
      logout,
      dismissBanner,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
