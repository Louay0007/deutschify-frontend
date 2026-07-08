export const PASSWORD_MIN = 8

export function hasLetter(value: string) {
  return /[A-Za-z]/.test(value)
}

export function hasNumber(value: string) {
  return /\d/.test(value)
}

export function isPasswordStrong(value: string) {
  return value.length >= PASSWORD_MIN && hasLetter(value) && hasNumber(value)
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function passwordMatchesApi(value: string) {
  return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value) && value.length >= PASSWORD_MIN
}

export type PasswordCheck = {
  minLength: boolean
  hasLetter: boolean
  hasNumber: boolean
  matches: boolean
}

export function getPasswordChecks(
  password: string,
  confirm?: string
): PasswordCheck {
  return {
    minLength: password.length >= PASSWORD_MIN,
    hasLetter: hasLetter(password),
    hasNumber: hasNumber(password),
    matches:
      typeof confirm === "string" && confirm.length > 0
        ? password === confirm
        : false,
  }
}

export function mapAuthErrorMessage(code: string, message: string): string {
  switch (code) {
    case "INVALID_CREDENTIALS":
      return "Incorrect email or password"
    case "ACCOUNT_SUSPENDED":
      return "This account is suspended. Contact support."
    case "EMAIL_ALREADY_EXISTS":
    case "CONFLICT":
      return "Email is already registered. Sign in or reset password."
    case "INVALID_RESET_TOKEN":
      return "This link is invalid or expired. Request a new reset link."
    case "INVALID_VERIFICATION_TOKEN":
      return "This confirmation link is invalid or expired (links last 24 hours)."
    case "TOO_MANY_REQUESTS":
    case "THROTTLEREXCEPTION":
      return "Too many attempts. Wait about a minute and try again."
    case "NETWORK_ERROR":
      return "Couldn’t reach the server. Check your connection."
    case "SESSION_ENDED":
      return "Your session ended. Please sign in again."
    default:
      if (/letter and one number/i.test(message)) {
        return "Password must include at least one letter and one number."
      }
      return message || "Something went wrong. Please try again."
  }
}
