"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

export function AuthFlagBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const flagRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const flag = flagRef.current
    const ripple = rippleRef.current
    if (!root || !flag || !ripple) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.set(flag, { transformOrigin: "50% 50%", scale: 1.08 })
      gsap.set(ripple, { transformOrigin: "50% 50%", scale: 1.08 })

      const wind = gsap.timeline({ repeat: -1 })

      wind
        .to(flag, {
          rotation: 1.2,
          skewX: 4,
          scaleX: 1.06,
          scaleY: 1.08,
          x: 8,
          y: 6,
          duration: 2.4,
          ease: "sine.inOut",
        })
        .to(flag, {
          rotation: -0.6,
          skewX: -2.5,
          scaleX: 1.1,
          scaleY: 1.06,
          x: -6,
          y: -4,
          duration: 1.9,
          ease: "power1.inOut",
        })
        .to(flag, {
          rotation: 1.8,
          skewX: 5.5,
          scaleX: 1.05,
          scaleY: 1.1,
          x: 12,
          y: 10,
          duration: 2.8,
          ease: "sine.inOut",
        })
        .to(flag, {
          rotation: 0,
          skewX: 0,
          scaleX: 1.08,
          scaleY: 1.08,
          x: 0,
          y: 0,
          duration: 2.1,
          ease: "sine.inOut",
        })

      gsap.to(ripple, {
        skewX: 8,
        rotation: 1.5,
        scaleX: 1.12,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden")}
    >
      <div ref={flagRef} className="absolute inset-0 size-full">
        <img
          src="/images/flags/germany.png"
          alt=""
          className="size-full min-h-[100svh] object-cover object-center"
          draggable={false}
        />
      </div>

      <div
        ref={rippleRef}
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(105deg, transparent 38%, rgba(255,237,215,0.08) 50%, transparent 62%)",
        }}
      />

      <div className="absolute inset-0 bg-walnut-shadow/72" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 0%, var(--walnut-shadow) 88%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-walnut-shadow/50 via-walnut-shadow/20 to-walnut-shadow/85" />
    </div>
  )
}
