"use client"

import { LesenAppGate } from "@/components/lesen/lesen-app-gate"
import { LesenPageHeader } from "@/components/lesen/lesen-page-header"
import { LesenTeilCard } from "@/components/lesen/lesen-teil-card"
import { LESEN_TEILS } from "@/lib/mock/lesen-data"

export default function LesenHubPage() {
  return (
    <LesenAppGate>
      <LesenPageHeader
        crumbs={[{ label: "Dashboard", href: "/app" }, { label: "Lesen" }]}
        title="Lesen"
        subtitle="B2 reading practice across three official exam parts. Pick a Teil, then a topic — drag headings to match paragraphs."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {LESEN_TEILS.map((teil) => (
            <LesenTeilCard key={teil.id} teil={teil} />
          ))}
        </div>
      </LesenPageHeader>
    </LesenAppGate>
  )
}
