"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  CheckCircle2,
  GripVertical,
  Lightbulb,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { LesenExercise, LesenOption } from "@/lib/mock/lesen-data"
import { courseClasses } from "@/lib/design-system/course"

type Assignments = Record<string, string | null>

type FeedbackMode = "none" | "wrongs" | "correction"

type Props = {
  exercise: LesenExercise
}

export function LesenExercise({ exercise }: Props) {
  const emptyAssignments = useMemo(() => {
    const init: Assignments = {}
    for (const p of exercise.passages) init[p.id] = null
    return init
  }, [exercise.passages])

  const [assignments, setAssignments] = useState<Assignments>(emptyAssignments)
  const [preCorrection, setPreCorrection] = useState<Assignments | null>(null)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [dragOverPassageId, setDragOverPassageId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<FeedbackMode>("none")
  const [hintOpenId, setHintOpenId] = useState<string | null>(null)
  const boardScrollRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const [dragEnabled, setDragEnabled] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    const update = () => setDragEnabled(!mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const autoScrollBoard = useCallback((clientY: number) => {
    const el = boardScrollRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const edge = 72
    const step = 14
    if (clientY - rect.top < edge) {
      el.scrollTop -= step
    } else if (rect.bottom - clientY < edge) {
      el.scrollTop += step
    }
  }, [])

  const optionById = useMemo(() => {
    const map = new Map<string, LesenOption>()
    for (const o of exercise.options) map.set(o.id, o)
    return map
  }, [exercise.options])

  const usedOptionIds = useMemo(() => {
    return new Set(
      Object.values(assignments).filter((id): id is string => Boolean(id))
    )
  }, [assignments])

  const availableOptions = exercise.options.filter((o) => !usedOptionIds.has(o.id))

  const reviewSource = preCorrection ?? assignments

  const score = useMemo(() => {
    let correct = 0
    let filled = 0
    for (const p of exercise.passages) {
      const a = reviewSource[p.id]
      if (a) filled += 1
      if (a === p.correctOptionId) correct += 1
    }
    return { correct, filled, total: exercise.passages.length }
  }, [reviewSource, exercise.passages])

  const locked = feedback === "correction"

  const placeOption = useCallback(
    (passageId: string, optionId: string) => {
      if (locked) return
      setAssignments((prev) => {
        const next = { ...prev }
        // Remove option from any other slot
        for (const key of Object.keys(next)) {
          if (next[key] === optionId) next[key] = null
        }
        // If slot had something, it returns to bank automatically
        next[passageId] = optionId
        return next
      })
      setSelectedOptionId(null)
      if (feedback === "wrongs") setFeedback("none")
    },
    [locked, feedback]
  )

  const clearSlot = useCallback(
    (passageId: string) => {
      if (locked) return
      setAssignments((prev) => ({ ...prev, [passageId]: null }))
      if (feedback === "wrongs") setFeedback("none")
    },
    [locked, feedback]
  )

  function handleReset() {
    setAssignments(emptyAssignments)
    setPreCorrection(null)
    setSelectedOptionId(null)
    setFeedback("none")
    setHintOpenId(null)
    setDragOverPassageId(null)
  }

  function handleShowWrongs() {
    setPreCorrection(null)
    setFeedback("wrongs")
  }

  function handleCorrection() {
    setPreCorrection({ ...assignments })
    setFeedback("correction")
    setSelectedOptionId(null)
    const corrected: Assignments = {}
    for (const p of exercise.passages) {
      corrected[p.id] = p.correctOptionId
    }
    setAssignments(corrected)
  }

  function slotState(passageId: string, correctOptionId: string) {
    if (feedback === "none") return "neutral" as const

    if (feedback === "wrongs") {
      const assigned = assignments[passageId]
      if (!assigned) return "neutral" as const
      return assigned === correctOptionId ? ("neutral" as const) : ("wrong" as const)
    }

    // correction: green key; mark slots the user had wrong
    const userHad = preCorrection?.[passageId]
    if (userHad && userHad !== correctOptionId) return "was-wrong" as const
    if (userHad === correctOptionId) return "correct" as const
    return "correct" as const
  }

  function onDragStart(e: React.DragEvent, optionId: string) {
    if (locked) {
      e.preventDefault()
      return
    }
    e.dataTransfer.setData("text/option-id", optionId)
    e.dataTransfer.effectAllowed = "move"
    isDraggingRef.current = true
  }

  function onDragEnd() {
    isDraggingRef.current = false
    setDragOverPassageId(null)
  }

  function onBoardDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (isDraggingRef.current) autoScrollBoard(e.clientY)
  }

  function onDrop(e: React.DragEvent, passageId: string) {
    e.preventDefault()
    isDraggingRef.current = false
    setDragOverPassageId(null)
    const optionId = e.dataTransfer.getData("text/option-id")
    if (optionId) placeOption(passageId, optionId)
  }

  function onSlotClick(passageId: string) {
    if (locked) return
    if (selectedOptionId) {
      placeOption(passageId, selectedOptionId)
      return
    }
    const current = assignments[passageId]
    if (current) clearSlot(passageId)
  }

  return (
    <div className="flex min-h-0 flex-col pb-28 lg:pb-24">
      <div className="mb-4 flex shrink-0 flex-col items-center gap-3 text-center sm:mb-5">
        <div className={courseClasses.titleCapsule}>
          <span className="font-display text-[15px] font-semibold tracking-[-0.02em] sm:text-[16px]">
            {exercise.title}
          </span>
        </div>
        <p className="max-w-xl text-[13px] leading-relaxed text-driftwood sm:text-[14px]">
          {exercise.instructions}
        </p>
        {selectedOptionId && !locked ? (
          <p className="rounded-full border border-ember-accent/30 bg-ember-accent/10 px-3 py-1 text-[12px] font-semibold text-ember-accent">
            Heading selected — tap a drop zone to place it
          </p>
        ) : null}
        {feedback !== "none" ? (
          <p className="text-[13px] font-semibold text-ember-accent">
            {feedback === "correction"
              ? `Answer key shown · you had ${score.correct}/${score.total} correct`
              : `Mistakes highlighted · ${score.correct}/${score.total} correct (${score.filled} filled)`}
          </p>
        ) : null}
      </div>

      {/* Scroll shell — explicit height so overflow works on mobile + desktop */}
      <div className="flex h-[calc(100dvh-15.5rem)] min-h-[320px] max-h-[calc(100dvh-13rem)] flex-col overflow-hidden bg-transparent sm:h-[calc(100dvh-14rem)] lg:h-[calc(100dvh-12.5rem)]">
        <div className="shrink-0 px-1 py-2 sm:px-0">
          <p className="text-[11px] font-medium tracking-[0.04em] text-warm-cream/45 uppercase">
            Scroll this panel · drag headings into drop zones
          </p>
        </div>

        <div
          ref={boardScrollRef}
          onDragOver={onBoardDragOver}
          className="deutschify-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain bg-transparent touch-pan-y [-webkit-overflow-scrolling:touch]"
        >
          <div className="flex flex-col gap-5 px-1 pb-4 pr-1 sm:px-0 sm:pr-2 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.85fr)] lg:items-start lg:gap-6">
            {/* Passages + drop zones */}
            <section className="order-2 space-y-4 lg:order-1">
          {exercise.passages.map((passage, index) => {
            const assignedId = assignments[passage.id]
            const assigned = assignedId ? optionById.get(assignedId) : null
            const state = slotState(passage.id, passage.correctOptionId)
            const isOver = dragOverPassageId === passage.id

            return (
              <article
                key={passage.id}
                className="course-card overflow-hidden rounded-[20px] shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col gap-3 border-b border-warm-cream/10 p-4 sm:flex-row sm:items-start sm:p-5">
                  <button
                    type="button"
                    onClick={() => onSlotClick(passage.id)}
                    onDragOver={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (!locked) {
                        setDragOverPassageId(passage.id)
                        autoScrollBoard(e.clientY)
                      }
                    }}
                    onDragLeave={() => setDragOverPassageId(null)}
                    onDrop={(e) => onDrop(e, passage.id)}
                    className={cn(
                      "course-drop-zone flex min-h-[48px] flex-1 items-center justify-between gap-2 px-3 py-2.5 text-left transition-all ios-spring",
                      isOver && "course-drop-zone-active",
                      (state === "correct" || state === "was-wrong") &&
                        "border-solid !border-[var(--course-correct)] !bg-[color-mix(in_srgb,var(--course-correct)_12%,var(--bark-brown))]",
                      state === "wrong" &&
                        "border-solid !border-[var(--course-wrong)] !bg-[color-mix(in_srgb,var(--course-wrong)_12%,var(--bark-brown))]",
                      state === "was-wrong" && "ring-2 ring-[var(--course-wrong)]/35",
                      selectedOptionId && !locked && "ring-2 ring-ember-accent/30"
                    )}
                    aria-label={
                      assigned
                        ? `Slot ${index + 1}: ${assigned.label}. Click to remove.`
                        : `Drop zone ${index + 1}`
                    }
                  >
                    {assigned ? (
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="flex min-w-0 items-center gap-2">
                          {state === "correct" || state === "was-wrong" ? (
                            <CheckCircle2 className="size-4 shrink-0 text-[var(--course-correct)]" />
                          ) : null}
                          {state === "wrong" ? (
                            <XCircle className="size-4 shrink-0 text-[var(--course-wrong)]" />
                          ) : null}
                          <span className="truncate text-[13px] font-semibold text-warm-cream sm:text-[14px]">
                            {assigned.label}
                          </span>
                        </span>
                        {state === "was-wrong" && preCorrection?.[passage.id] ? (
                          <span className="pl-6 text-[11px] text-[var(--course-wrong)]">
                            Your answer:{" "}
                            {optionById.get(preCorrection[passage.id]!)?.label ?? "—"}
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      <span className="text-[13px] text-warm-cream/55">
                        Drop answer here
                      </span>
                    )}
                    <span className="shrink-0 rounded-full bg-warm-cream/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-warm-cream/70 uppercase">
                      {index + 1}
                    </span>
                  </button>

                  {passage.hint ? (
                    <button
                      type="button"
                      onClick={() =>
                        setHintOpenId((id) => (id === passage.id ? null : passage.id))
                      }
                      className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-walnut-shadow text-warm-cream transition-colors hover:bg-ember-accent"
                      aria-label="Show hint"
                      aria-expanded={hintOpenId === passage.id}
                    >
                      <Lightbulb className="size-4 text-[#f5c542]" />
                    </button>
                  ) : null}
                </div>

                {hintOpenId === passage.id && passage.hint ? (
                  <div className="border-b border-warm-cream/10 bg-walnut-shadow/40 px-4 py-2.5 text-[12px] leading-relaxed text-warm-cream/85 sm:px-5">
                    Hint: {passage.hint}
                  </div>
                ) : null}

                <div className="bg-bark-brown/60 px-4 py-4 sm:px-5 sm:py-5">
                  <p className="text-[14px] leading-[1.7] text-warm-cream sm:text-[15px]">
                    {passage.text}
                  </p>
                </div>
              </article>
            )
          })}
            </section>

            {/* Answer bank — same scroll context as passages */}
            <aside className="order-1 lg:order-2">
              <div className="course-card rounded-[16px] p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="text-[14px] font-semibold tracking-[-0.02em] text-warm-cream">
                    Answer bank
                  </h2>
                  <span className="text-[11px] font-medium text-warm-cream/60">
                    {availableOptions.length} left
                  </span>
                </div>
                <p className="mb-4 text-[12px] leading-relaxed text-warm-cream/65">
                  Drag a heading, or tap it then tap a drop zone below.
                </p>

                <ul className="flex flex-col gap-2">
                  {availableOptions.length === 0 ? (
                    <li className="w-full rounded-[12px] border border-dashed border-warm-cream/20 px-3 py-4 text-center text-[13px] text-warm-cream/60">
                      All headings placed
                    </li>
                  ) : (
                    availableOptions.map((option) => (
                      <li key={option.id}>
                        <AnswerChip
                          option={option}
                          selected={selectedOptionId === option.id}
                          disabled={locked}
                          dragEnabled={dragEnabled}
                          onSelect={() => {
                            if (locked) return
                            setSelectedOptionId((prev) =>
                              prev === option.id ? null : option.id
                            )
                          }}
                          onDragStart={(e) => onDragStart(e, option.id)}
                          onDragEnd={onDragEnd}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-warm-cream/10 bg-walnut-shadow/95 backdrop-blur-xl lg:left-[15.5rem]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="hidden text-[12px] text-driftwood sm:block">
            {locked
              ? "Board locked — reset to try again"
              : selectedOptionId
                ? "Tap a drop zone to place the selected heading"
                : "Place headings · then check your work"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCorrection}
              className={cn(courseClasses.btnPrimary, "inline-flex items-center gap-2")}
            >
              <Sparkles className="size-4" />
              Correction
            </button>
            <button
              type="button"
              onClick={handleShowWrongs}
              disabled={locked}
              className={cn(
                courseClasses.btnSecondary,
                "inline-flex items-center gap-2 disabled:opacity-40"
              )}
            >
              <XCircle className="size-4" />
              Show wrongs
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={cn(courseClasses.btnGhost, "inline-flex items-center gap-2")}
            >
              <RotateCcw className="size-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnswerChip({
  option,
  selected,
  disabled,
  dragEnabled,
  onSelect,
  onDragStart,
  onDragEnd,
}: {
  option: LesenOption
  selected: boolean
  disabled: boolean
  dragEnabled: boolean
  onSelect: () => void
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
}) {
  return (
    <button
      type="button"
      draggable={dragEnabled && !disabled}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "course-chip flex w-full items-center gap-2 px-3 py-3 text-left text-[13px] font-medium leading-snug shadow-sm transition-all ios-spring sm:text-[14px]",
        dragEnabled ? "touch-manipulation" : "touch-pan-y",
        "hover:border-ember-accent/50 hover:shadow-md",
        "active:scale-[0.98]",
        selected && "border-ember-accent ring-2 ring-ember-accent/25",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <GripVertical className="size-4 shrink-0 text-warm-cream/40" />
      <span className="min-w-0 flex-1 text-warm-cream">{option.label}</span>
    </button>
  )
}
