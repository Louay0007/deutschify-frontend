"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

type CustomScrollAreaProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
> & {
  viewportClassName?: string
  viewportRef?: React.Ref<HTMLDivElement>
  viewportProps?: Omit<
    React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>,
    "className" | "children" | "ref" | "onScroll"
  >
  /** Soft fade at top/bottom when more content is available */
  showEdgeFade?: boolean
  /** Scrollbar accent: default ember, subtle warm-cream */
  variant?: "ember" | "cream"
}

function CustomScrollBar({
  orientation = "vertical",
  variant = "ember",
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  variant?: "ember" | "cream"
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="custom-scroll-bar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none p-0.5 transition-opacity duration-300",
        "opacity-70 md:opacity-0 md:group-hover/scroll:opacity-100 md:group-focus-within/scroll:opacity-100",
        "[&:has([data-state=visible])]:opacity-100",
        orientation === "vertical" && "h-full w-2 border-l border-transparent",
        orientation === "horizontal" && "h-2 w-full flex-col border-t border-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="custom-scroll-thumb"
        className={cn(
          "relative flex-1 rounded-full transition-all duration-200 ios-spring",
          variant === "ember" &&
            "bg-warm-cream/20 hover:bg-ember-accent/80 active:bg-ember-accent",
          variant === "cream" && "bg-warm-cream/25 hover:bg-warm-cream/45"
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

const CustomScrollArea = React.forwardRef<HTMLDivElement, CustomScrollAreaProps>(
  (
    {
      className,
      children,
      viewportClassName,
      viewportRef,
      viewportProps,
      showEdgeFade = true,
      variant = "ember",
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLDivElement>(null)
    const [fadeTop, setFadeTop] = React.useState(false)
    const [fadeBottom, setFadeBottom] = React.useState(false)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node
        if (typeof viewportRef === "function") viewportRef(node)
        else if (viewportRef) viewportRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [viewportRef, ref]
    )

    const updateFade = React.useCallback(() => {
      const el = internalRef.current
      if (!el || !showEdgeFade) return
      const { scrollTop, clientHeight, scrollHeight } = el
      setFadeTop(scrollTop > 6)
      setFadeBottom(scrollTop + clientHeight < scrollHeight - 6)
    }, [showEdgeFade])

    React.useEffect(() => {
      const el = internalRef.current
      if (!el) return
      updateFade()
      const ro = new ResizeObserver(updateFade)
      ro.observe(el)
      return () => ro.disconnect()
    }, [updateFade, children])

    return (
      <ScrollAreaPrimitive.Root
        data-slot="custom-scroll-area"
        className={cn("group/scroll relative h-full min-h-0 overflow-hidden", className)}
        {...props}
      >
        {showEdgeFade ? (
          <>
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-walnut-shadow to-transparent transition-opacity duration-300",
                fadeTop ? "opacity-100" : "opacity-0"
              )}
            />
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-walnut-shadow to-transparent transition-opacity duration-300",
                fadeBottom ? "opacity-100" : "opacity-0"
              )}
            />
          </>
        ) : null}

        <ScrollAreaPrimitive.Viewport
          ref={setRefs}
          data-slot="custom-scroll-viewport"
          onScroll={updateFade}
          {...viewportProps}
          className={cn(
            "h-full w-full rounded-[inherit] outline-none",
            "focus-visible:ring-2 focus-visible:ring-ember-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-walnut-shadow",
            viewportClassName
          )}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>

        <CustomScrollBar orientation="vertical" variant={variant} />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    )
  }
)
CustomScrollArea.displayName = "CustomScrollArea"

export { CustomScrollArea, CustomScrollBar }
