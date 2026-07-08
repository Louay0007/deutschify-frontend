"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "ios-fill ios-hairline !rounded-[16px] !border-warm-cream/15 !bg-walnut-shadow !text-warm-cream",
          title: "!text-warm-cream !font-semibold",
          description: "!text-driftwood",
          actionButton: "!bg-warm-cream !text-walnut-shadow",
          cancelButton: "!bg-warm-cream/10 !text-warm-cream",
        },
      }}
      style={
        {
          "--normal-bg": "var(--walnut-shadow)",
          "--normal-text": "var(--warm-cream)",
          "--normal-border": "color-mix(in srgb, var(--warm-cream) 15%, transparent)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
