import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type Crumb = {
  label: string
  href?: string
}

type Props = {
  crumbs: Crumb[]
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  /** Wider content for exercise board */
  wide?: boolean
}

export function LesenPageHeader({
  crumbs,
  title,
  subtitle,
  children,
  className,
  wide,
}: Props) {
  const back = [...crumbs].reverse().find((c) => c.href)

  return (
    <div className={cn(wide ? "mx-auto w-full max-w-7xl" : undefined, className)}>
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-[12px] text-driftwood"
        >
          {crumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
              {i > 0 ? <span className="text-warm-cream/25">/</span> : null}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-warm-cream"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-warm-cream/80">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {back ? (
          <Link
            href={back.href!}
            className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-driftwood transition-colors hover:text-ember-accent"
          >
            <ChevronLeft className="size-4" />
            Back
          </Link>
        ) : null}

        <div>
          <h1 className="font-display text-balance text-2xl font-semibold tracking-[-0.03em] text-warm-cream sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-driftwood sm:text-[15px]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  )
}
