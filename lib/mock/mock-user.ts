import type { AuthUser } from "@/lib/auth/types"

export const MOCK_USER: AuthUser = {
  id: "mock-user-001",
  email: "basma@example.com",
  status: "PENDING_VERIFICATION",
  emailVerifiedAt: null,
  lastLoginAt: new Date().toISOString(),
  roles: ["student"],
  permissions: [],
  profile: {
    id: "mock-profile-001",
    displayName: "Basma",
    bio: null,
    examDate: "2026-09-15",
    uiLocale: "en",
    textDirection: "LTR",
    nativeLanguageId: null,
    targetLevelId: null,
  },
  createdAt: new Date().toISOString(),
}

export { isMockAuthEnabled, isAuthBypassEnabled } from "@/lib/mock/mock-auth"
