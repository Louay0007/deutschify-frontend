const PENDING_KEY = "deutschify.pendingOnboarding"
const COMPLETED_PREFIX = "deutschify.onboardingCompleted."

function canUseStorage() {
  return typeof window !== "undefined"
}

export function markOnboardingPending(userId: string) {
  if (!canUseStorage()) return
  sessionStorage.setItem(PENDING_KEY, userId)
}

export function clearOnboardingPending() {
  if (!canUseStorage()) return
  sessionStorage.removeItem(PENDING_KEY)
}

export function getPendingOnboardingUserId(): string | null {
  if (!canUseStorage()) return null
  return sessionStorage.getItem(PENDING_KEY)
}

export function hasCompletedOnboarding(userId: string): boolean {
  if (!canUseStorage()) return false
  return localStorage.getItem(`${COMPLETED_PREFIX}${userId}`) === "1"
}

export function completeOnboarding(userId: string) {
  if (!canUseStorage()) return
  localStorage.setItem(`${COMPLETED_PREFIX}${userId}`, "1")
  clearOnboardingPending()
}

export function shouldShowOnboarding(userId: string): boolean {
  if (hasCompletedOnboarding(userId)) return false
  return getPendingOnboardingUserId() === userId
}
