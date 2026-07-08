"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Target,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import {
  B2_MODULES,
  DASHBOARD_SUMMARY,
  GERMAN_THEMES,
  WEEKLY_ACTIVITY,
  getDaysUntilExam,
} from "@/lib/mock/dashboard-data"

const moduleChartConfig = {
  completion: { label: "Completion", color: "#dc5000" },
}

const activityChartConfig = {
  minutes: { label: "Study minutes", color: "#dc5000" },
  exercises: { label: "Exercises", color: "#6c5f51" },
}

const radarChartConfig = {
  score: { label: "Module score", color: "#dc5000" },
}

const radarData = B2_MODULES.map((m) => ({
  module: m.label,
  score: m.score,
}))

function KpiCard({
  label,
  value,
  hint,
  delta,
  deltaLabel,
}: {
  label: string
  value: string
  hint?: string
  delta?: number
  deltaLabel?: string
}) {
  const positive = delta !== undefined && delta >= 0

  return (
    <div className="ios-fill ios-hairline rounded-[16px] p-4 sm:p-5">
      <p className="text-[12px] font-medium text-driftwood">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-warm-cream sm:text-[1.75rem]">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-[11px] text-driftwood/90">{hint}</p>
      ) : null}
      {delta !== undefined ? (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            positive
              ? "bg-ember-accent/15 text-ember-accent"
              : "bg-warm-cream/10 text-driftwood"
          )}
        >
          {positive ? (
            <ArrowUpRight className="size-3" />
          ) : (
            <ArrowDownRight className="size-3" />
          )}
          {deltaLabel ?? `${positive ? "+" : ""}${delta}%`} vs last week
        </div>
      ) : null}
    </div>
  )
}

function ChartCard({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "ios-fill ios-hairline flex flex-col rounded-[20px] p-4 sm:p-5",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-warm-cream">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-[12px] leading-relaxed text-driftwood">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}

type Props = {
  displayName: string
}

export function DashboardHome({ displayName }: Props) {
  const summary = DASHBOARD_SUMMARY
  const daysLeft = getDaysUntilExam(summary.examDate)

  return (
    <div className="space-y-6 text-left sm:space-y-8">
      {/* B2 preparation summary */}
      <section className="ios-fill ios-hairline overflow-hidden rounded-[20px] border-ember-accent/20 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ember-accent/15 px-3 py-1 text-[12px] font-semibold text-ember-accent">
                <Target className="size-3.5" />
                B2 preparation summary
              </span>
              <span className="rounded-full bg-warm-cream/10 px-3 py-1 text-[12px] font-medium text-driftwood">
                On track
              </span>
            </div>
            <h2 className="font-display text-balance text-xl font-semibold tracking-[-0.03em] text-warm-cream sm:text-2xl">
              {displayName}, you are {summary.examReadiness}% exam-ready
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-driftwood sm:text-[15px]">
              {summary.narrative}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
              <span className="rounded-full bg-warm-cream/8 px-3 py-1 text-warm-cream/90">
                Strong: {summary.strongest.join(", ")}
              </span>
              <span className="rounded-full bg-ember-accent/10 px-3 py-1 text-ember-accent">
                Focus next: {summary.focusNext}
              </span>
            </div>
          </div>

          <div className="ios-fill ios-hairline flex shrink-0 items-center gap-3 rounded-[16px] px-4 py-3">
            <div className="flex size-11 items-center justify-center rounded-[12px] bg-ember-accent/15">
              <CalendarDays className="size-5 text-ember-accent" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.04em] text-driftwood uppercase">
                Exam countdown
              </p>
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-warm-cream">
                {daysLeft} days
              </p>
              <p className="text-[11px] text-driftwood">Target: Sep 15, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* KPI row — 3–5 core metrics (learning analytics best practice) */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard
          label="Exam readiness"
          value={`${summary.examReadiness}%`}
          delta={summary.readinessDelta}
        />
        <KpiCard
          label="Lessons completed"
          value={`${summary.lessonsCompleted}/${summary.lessonsTotal}`}
          hint={`${Math.round((summary.lessonsCompleted / summary.lessonsTotal) * 100)}% of syllabus`}
        />
        <KpiCard
          label="Study streak"
          value={`${summary.streakDays} days`}
          hint="Keep pacing steady before exam day"
        />
        <KpiCard
          label="Average score"
          value={`${summary.avgScore}%`}
          delta={summary.avgScoreDelta}
        />
      </section>

      {/* Charts row 1 */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard
          title="B2 module completion"
          description="Progress across all five official exam sections. Bars start at 0% for honest comparison."
        >
          <ChartContainer config={moduleChartConfig} className="aspect-auto h-[260px] w-full">
            <BarChart
              data={B2_MODULES}
              layout="vertical"
              margin={{ left: 4, right: 16, top: 4, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} stroke="rgba(255,237,215,0.08)" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6c5f51", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={108}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#ffedd7", fontSize: 11 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="border-warm-cream/15 bg-bark-brown text-warm-cream"
                    formatter={(value, _name, item) => {
                      const row = item.payload as (typeof B2_MODULES)[number]
                      return [
                        `${value}% · ${row.lessonsDone}/${row.lessonsTotal} lessons`,
                        row.fullLabel,
                      ]
                    }}
                  />
                }
              />
              <Bar
                dataKey="completion"
                fill="var(--color-completion)"
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard
          title="Skill balance (exam scores)"
          description="Radar view of current performance per B2 skill — spot weak zones quickly."
        >
          <ChartContainer config={radarChartConfig} className="mx-auto aspect-auto h-[260px] w-full max-w-md">
            <RadarChart data={radarData} outerRadius="72%">
              <PolarGrid stroke="rgba(255,237,215,0.12)" />
              <PolarAngleAxis
                dataKey="module"
                tick={{ fill: "#6c5f51", fontSize: 10 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent className="border-warm-cream/15 bg-bark-brown text-warm-cream" />
                }
              />
              <Radar
                name="score"
                dataKey="score"
                stroke="#dc5000"
                fill="#dc5000"
                fillOpacity={0.22}
                strokeWidth={2}
              />
            </RadarChart>
          </ChartContainer>
        </ChartCard>
      </section>

      {/* Charts row 2 */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          title="Weekly study activity"
          description="Minutes practiced this week — spread sessions to avoid cramming."
          className="xl:col-span-2"
        >
          <ChartContainer config={activityChartConfig} className="aspect-auto h-[240px] w-full">
            <AreaChart
              data={WEEKLY_ACTIVITY}
              margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc5000" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#dc5000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,237,215,0.08)" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6c5f51", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6c5f51", fontSize: 11 }}
                width={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="border-warm-cream/15 bg-bark-brown text-warm-cream"
                    formatter={(value, name) => [
                      value,
                      name === "minutes" ? "Minutes" : "Exercises",
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke="#dc5000"
                strokeWidth={2}
                fill="url(#studyGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard
          title="Extra stats"
          description="Vocabulary and total time toward B2."
        >
          <ul className="space-y-4">
            <li className="flex items-center justify-between border-b border-warm-cream/10 pb-3">
              <span className="text-[13px] text-driftwood">Vocabulary learned</span>
              <span className="text-[15px] font-semibold text-warm-cream">
                {summary.vocabularyLearned}
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-warm-cream/10 pb-3">
              <span className="text-[13px] text-driftwood">Time studied</span>
              <span className="text-[15px] font-semibold text-warm-cream">
                {summary.studyHours}h
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-warm-cream/10 pb-3">
              <span className="text-[13px] text-driftwood">Exercises this week</span>
              <span className="text-[15px] font-semibold text-warm-cream">52</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[13px] text-driftwood">Mock exams done</span>
              <span className="text-[15px] font-semibold text-warm-cream">3</span>
            </li>
          </ul>
        </ChartCard>
      </section>

      {/* German themes / topics */}
      <ChartCard
        title="German themes & topic mastery"
        description="Thematic areas covered in B2 materials — reading, listening, and writing contexts."
      >
        <div className="space-y-4">
          {GERMAN_THEMES.map((item) => (
            <div key={item.theme}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-warm-cream">
                    {item.theme}
                  </p>
                  <p className="text-[11px] text-driftwood">{item.label}</p>
                </div>
                <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ember-accent">
                  {item.progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-warm-cream/10">
                <div
                  className="h-full rounded-full bg-ember-accent transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-driftwood">
                {item.exercises} exercises completed
              </p>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
