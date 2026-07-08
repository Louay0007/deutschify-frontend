"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<typeof Button> & {
  loading?: boolean
  loadingLabel?: string
}

export function AuthSubmitButton({
  loading,
  loadingLabel,
  children,
  disabled,
  className,
  ...props
}: Props) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={disabled || loading}
      className={cn(
        "h-12 w-full bg-warm-cream text-walnut-shadow hover:bg-warm-cream/90",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="size-4 text-walnut-shadow" />
          <span>{loadingLabel || children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
