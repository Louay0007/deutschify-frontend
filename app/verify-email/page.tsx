import { Suspense } from "react"
import { VerifyEmailClient } from "@/components/auth/verify-email-client"
import { Spinner } from "@/components/ui/spinner"

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100svh] items-center justify-center bg-walnut-shadow">
          <Spinner className="size-6 text-ember-accent" />
        </div>
      }
    >
      <VerifyEmailClient />
    </Suspense>
  )
}
