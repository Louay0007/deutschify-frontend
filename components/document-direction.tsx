"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { resetDocumentLtr } from "@/lib/auth/session"

/** English LTR across marketing, auth, onboarding, and app shell */
export function DocumentDirection() {
  const pathname = usePathname()

  useEffect(() => {
    resetDocumentLtr()
  }, [pathname])

  return null
}
