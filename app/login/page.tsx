import { Suspense } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100svh] items-center justify-center bg-walnut-shadow">
          <Spinner className="size-6 text-ember-accent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
