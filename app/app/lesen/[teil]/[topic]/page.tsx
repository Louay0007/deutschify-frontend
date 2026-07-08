"use client"

import { notFound, useParams } from "next/navigation"
import { LesenAppGate } from "@/components/lesen/lesen-app-gate"
import { LesenExercise } from "@/components/lesen/lesen-exercise"
import { LesenPageHeader } from "@/components/lesen/lesen-page-header"
import {
  getLesenExercise,
  getLesenTeil,
  getLesenTopic,
} from "@/lib/mock/lesen-data"

export default function LesenTopicExercisePage() {
  const params = useParams<{ teil: string; topic: string }>()
  const teil = getLesenTeil(params.teil)
  const topic = getLesenTopic(params.teil, params.topic)
  const exercise = getLesenExercise(params.teil, params.topic)

  if (!teil || !topic || !exercise) {
    notFound()
  }

  return (
    <LesenAppGate contentClassName="max-w-7xl">
      <LesenPageHeader
        crumbs={[
          { label: "Dashboard", href: "/app" },
          { label: "Lesen", href: "/app/lesen" },
          { label: teil.title, href: `/app/lesen/${teil.slug}` },
          { label: topic.title },
        ]}
        title={topic.title}
        subtitle={
          topic.hasExercise
            ? "Match each heading to the correct paragraph."
            : "Preview exercise shell — full content coming soon. Try Umwelt for the complete demo."
        }
        wide
      >
        {!topic.hasExercise ? (
          <div className="course-card mb-5 rounded-[14px] border-ember-accent/30 px-4 py-3 text-[13px] leading-relaxed text-warm-cream/90">
            Placeholder topic with the same interaction pattern. Open{" "}
            <strong className="text-ember-accent">Umwelt</strong> under Teil 1 for
            the full B2 matching set.
          </div>
        ) : null}
        <LesenExercise exercise={exercise} />
      </LesenPageHeader>
    </LesenAppGate>
  )
}
