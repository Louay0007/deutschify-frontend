import { ApiError, type ApiErrorBody, type ApiSuccess } from "./types"
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  saveSession,
} from "./session"
import type { AuthTokensPayload, AuthUser } from "./types"

const DEFAULT_BASE = "http://localhost:3002/api/v1"

export function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || DEFAULT_BASE
  )
}

type RequestOptions = {
  method?: string
  body?: unknown
  auth?: boolean
  /** Skip 401→refresh cycle (used by refresh itself) */
  skipRefresh?: boolean
  signal?: AbortSignal
}

let refreshPromise: Promise<boolean> | null = null

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function toApiError(status: number, payload: unknown, fallback?: string): ApiError {
  if (payload && typeof payload === "object" && "error" in payload) {
    const err = (payload as ApiErrorBody).error
    return new ApiError({
      status,
      code: err?.code || (status === 429 ? "TOO_MANY_REQUESTS" : "UNKNOWN_ERROR"),
      message:
        err?.message ||
        fallback ||
        (status === 429
          ? "Too many attempts. Wait about a minute and try again."
          : "Something went wrong."),
      details: err?.details,
      requestId: err?.requestId,
    })
  }

  if (status === 429) {
    return new ApiError({
      status,
      code: "TOO_MANY_REQUESTS",
      message: "Too many attempts. Wait about a minute and try again.",
    })
  }

  return new ApiError({
    status,
    code: "UNKNOWN_ERROR",
    message: fallback || "Something went wrong.",
  })
}

async function tryRefreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false

  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
    const payload = await parseJson(res)

    if (!res.ok) {
      const err = toApiError(res.status, payload)
      if (
        err.code === "INVALID_REFRESH_TOKEN" ||
        err.code === "REFRESH_TOKEN_EXPIRED" ||
        err.code === "REFRESH_TOKEN_REUSED" ||
        res.status === 401
      ) {
        clearSession()
      }
      return false
    }

    const data = (payload as ApiSuccess<AuthTokensPayload>).data
    if (!data?.accessToken || !data?.refreshToken) return false
    saveSession(data)
    return true
  } catch {
    return false
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, auth = false, skipRefresh = false, signal } =
    options

  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  if (auth) {
    const token = getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res: Response
  try {
    res = await fetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch {
    throw new ApiError({
      status: 0,
      code: "NETWORK_ERROR",
      message: "Couldn’t reach the server. Check your connection.",
    })
  }

  if (res.status === 401 && auth && !skipRefresh) {
    if (!refreshPromise) {
      refreshPromise = tryRefreshTokens().finally(() => {
        refreshPromise = null
      })
    }
    const refreshed = await refreshPromise
    if (refreshed) {
      return apiRequest<T>(path, { ...options, skipRefresh: true })
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        reason: "session_ended",
      })
      window.location.assign(`/login?${params.toString()}`)
    }
    throw new ApiError({
      status: 401,
      code: "SESSION_ENDED",
      message: "Your session ended. Please sign in again.",
    })
  }

  const payload = await parseJson(res)

  if (!res.ok) {
    throw toApiError(res.status, payload)
  }

  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    (payload as ApiSuccess<T>).success === true
  ) {
    return (payload as ApiSuccess<T>).data
  }

  return payload as T
}

export const authApi = {
  login(body: { email: string; password: string }) {
    return apiRequest<AuthTokensPayload>("/auth/login", {
      method: "POST",
      body,
    })
  },
  register(body: { email: string; password: string; displayName: string }) {
    return apiRequest<AuthTokensPayload>("/auth/register", {
      method: "POST",
      body,
    })
  },
  forgotPassword(body: { email: string }) {
    return apiRequest<{ message?: string }>("/auth/forgot-password", {
      method: "POST",
      body,
    })
  },
  resetPassword(body: { token: string; newPassword: string }) {
    return apiRequest<{ message?: string }>("/auth/reset-password", {
      method: "POST",
      body,
    })
  },
  verifyEmail(body: { token: string }) {
    return apiRequest<{ message?: string }>("/auth/verify-email", {
      method: "POST",
      body,
    })
  },
  me() {
    return apiRequest<AuthUser>("/auth/me", { auth: true })
  },
  async logout() {
    const refreshToken = getRefreshToken()
    try {
      if (refreshToken) {
        await apiRequest("/auth/logout", {
          method: "POST",
          body: { refreshToken },
          auth: true,
          skipRefresh: true,
        })
      }
    } catch {
      // Always clear local session
    } finally {
      clearSession()
    }
  },
  async logoutAll() {
    try {
      await apiRequest("/auth/logout-all", {
        method: "POST",
        auth: true,
      })
    } catch {
      // ignore
    } finally {
      clearSession()
    }
  },
}
