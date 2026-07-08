export type UserStatus = "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED"

export type TextDirection = "LTR" | "RTL"

export type UiLocale = "ar" | "en" | "de" | "fr" | string

export interface UserProfile {
  id: string
  displayName: string
  bio?: string | null
  examDate?: string | null
  uiLocale: UiLocale
  textDirection: TextDirection
  nativeLanguageId?: string | null
  targetLevelId?: string | null
}

export interface AuthUser {
  id: string
  email: string
  status: UserStatus
  emailVerifiedAt: string | null
  lastLoginAt?: string | null
  roles: string[]
  permissions: string[]
  profile?: UserProfile
  createdAt: string
}

export interface AuthTokensPayload {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface ApiSuccess<T> {
  success: true
  data: T
  meta?: unknown
}

export interface ApiErrorBody {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
    requestId?: string
  }
}

export class ApiError extends Error {
  status: number
  code: string
  details?: unknown
  requestId?: string

  constructor(opts: {
    status: number
    code: string
    message: string
    details?: unknown
    requestId?: string
  }) {
    super(opts.message)
    this.name = "ApiError"
    this.status = opts.status
    this.code = opts.code
    this.details = opts.details
    this.requestId = opts.requestId
  }
}
