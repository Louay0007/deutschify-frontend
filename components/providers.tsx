"use client"

import { AuthProvider } from "@/lib/auth/auth-context"
import { DocumentDirection } from "@/components/document-direction"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DocumentDirection />
      {children}
      <Toaster theme="dark" position="top-center" richColors closeButton />
    </AuthProvider>
  )
}
