import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-walnut-shadow pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:px-12">
        <div className="ios-fill ios-hairline flex flex-col items-start justify-between gap-5 rounded-[20px] px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/images/deutschify-logo.png"
              alt="Deutschify"
              className="size-9 rounded-[9px] object-cover"
            />
            <span className="text-[17px] font-semibold tracking-[-0.022em] text-warm-cream">
              Deutschify
            </span>
          </Link>

          <nav className="flex w-full flex-wrap items-center gap-1 sm:w-auto sm:justify-end">
            {[
              { href: "#modules", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#faq", label: "Help" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2.5 text-[14px] font-medium text-driftwood transition-colors hover:bg-warm-cream/8 hover:text-ember-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="px-1 text-[13px] leading-relaxed text-driftwood">
          Deutschify — modern German B2 prep for Tunisia → Germany.
        </p>
      </div>
    </footer>
  )
}
