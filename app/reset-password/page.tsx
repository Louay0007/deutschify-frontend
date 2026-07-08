import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { Spinner } from "@/components/ui/spinner"

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100svh] items-center justify-center bg-walnut-shadow">
          <Spinner className="size-6 text-ember-accent" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
