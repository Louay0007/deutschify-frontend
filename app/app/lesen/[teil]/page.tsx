"use client"

import { notFound, useParams } from "next/navigation"
import { LesenAppGate } from "@/components/lesen/lesen-app-gate"
import { LesenPageHeader } from "@/components/lesen/lesen-page-header"
import { LesenTopicCard } from "@/components/lesen/lesen-topic-card"
import { getLesenTeil, getTeilProgress } from "@/lib/mock/lesen-data"

export default function LesenTeilPage() {
  const params = useParams<{ teil: string }>()
  const teil = getLesenTeil(params.teil)

  if (!teil) {
    notFound()
  }

  const progress = getTeilProgress(teil)

  return (
    <LesenAppGate contentClassName="max-w-7xl">
      <LesenPageHeader
        crumbs={[
          { label: "Dashboard", href: "/app" },
          { label: "Lesen", href: "/app/lesen" },
          { label: teil.title },
        ]}
        title={teil.title}
        subtitle={`${teil.description} · ${progress.label}`}
        wide
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[13px] text-driftwood">
            Choose a theme. Full drag-and-drop demo is ready on{" "}
            <span className="font-semibold text-warm-cream">Umwelt</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {teil.topics.map((topic) => (
            <LesenTopicCard key={topic.slug} teilSlug={teil.slug} topic={topic} />
          ))}
        </div>
      </LesenPageHeader>
    </LesenAppGate>
  )
}
