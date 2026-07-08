import { cn } from "@/lib/utils"

function Frame({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-warm-cream/15 bg-gradient-to-br from-bark-brown to-walnut-shadow shadow-[inset_0_1px_0_rgba(255,237,215,0.08)]",
        className
      )}
    >
      <div className="absolute left-3 top-3 z-10 rounded-full bg-walnut-shadow/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.06em] text-driftwood uppercase backdrop-blur-sm">
        {label}
      </div>
      {children}
    </div>
  )
}

export function DashboardPlaceholder() {
  return (
    <Frame label="Preview">
      <div className="flex h-full flex-col gap-3 p-4 pt-10">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Readiness", value: "68%" },
            { label: "Lessons", value: "24" },
            { label: "Streak", value: "7d" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="ios-fill ios-hairline rounded-[12px] p-2.5"
            >
              <p className="text-[9px] text-driftwood">{stat.label}</p>
              <p className="text-[15px] font-semibold text-warm-cream">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="ios-fill ios-hairline flex-1 rounded-[14px] p-3">
          <p className="mb-2 text-[10px] font-semibold text-driftwood uppercase">
            Weekly activity
          </p>
          <div className="flex h-20 items-end gap-1.5">
            {[40, 65, 52, 80, 58, 72, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[4px] bg-ember-accent/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function ModulesPlaceholder() {
  const modules = [
    { name: "Lesen", progress: 72 },
    { name: "Sprachbausteine", progress: 58 },
    { name: "Hören", progress: 81 },
    { name: "Schreiben", progress: 45 },
    { name: "Mündlich", progress: 63 },
  ]

  return (
    <Frame label="Preview">
      <div className="flex h-full flex-col gap-2 p-4 pt-10">
        {modules.map((mod) => (
          <div
            key={mod.name}
            className="ios-fill ios-hairline flex items-center gap-3 rounded-[12px] px-3 py-2"
          >
            <div className="size-7 shrink-0 rounded-[8px] bg-ember-accent/20" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-warm-cream">
                {mod.name}
              </p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-warm-cream/10">
                <div
                  className="h-full rounded-full bg-ember-accent"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] font-semibold text-driftwood">
              {mod.progress}%
            </span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function ProgressPlaceholder() {
  return (
    <Frame label="Preview">
      <div className="flex h-full flex-col gap-3 p-4 pt-10">
        <div className="ios-fill ios-hairline rounded-[14px] p-3">
          <p className="text-[10px] font-semibold text-driftwood uppercase">
            Exam readiness
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="relative size-16 shrink-0">
              <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-warm-cream/10"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="68 100"
                  className="text-ember-accent"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-warm-cream">
                68%
              </span>
            </div>
            <div className="space-y-1 text-[10px] text-driftwood">
              <p>
                <span className="text-warm-cream">Strong:</span> Hören, Lesen
              </p>
              <p>
                <span className="text-warm-cream">Focus:</span> Schreiben
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Vocabulary", value: "312 words" },
            { label: "Avg. score", value: "74%" },
            { label: "Time studied", value: "18h" },
            { label: "Mock exams", value: "3 done" },
          ].map((item) => (
            <div
              key={item.label}
              className="ios-fill ios-hairline rounded-[12px] p-2.5"
            >
              <p className="text-[9px] text-driftwood">{item.label}</p>
              <p className="text-[12px] font-semibold text-warm-cream">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}
