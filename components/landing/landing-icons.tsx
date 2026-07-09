import type { ComponentType, SVGProps } from "react"
import {
  BookStack,
  ChatBubbleCheck,
  CheckCircle,
  CodeBrackets,
  Community,
  DashboardSpeed,
  EditPencil,
  Flash,
  GraduationCap,
  HeadsetHelp,
  LeaderboardStar,
  Menu,
  MicrophoneSpeaking,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  Rocket,
  SoundHigh,
  Sparks,
  StatsReport,
  Timer,
  Trophy,
  ViewGrid,
  Xmark,
} from "iconoir-react"
import { cn } from "@/lib/utils"

export type LandingIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { strokeWidth?: number }
>

type IconSize = "xs" | "sm" | "md" | "lg"

const sizeMap: Record<IconSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-7 w-7",
}

/** Iconoir — distinctive open-source set (less common than Lucide on landing pages) */
export function LandingIcon({
  icon: Icon,
  className,
  size = "sm",
}: {
  icon: LandingIconComponent
  className?: string
  size?: IconSize
}) {
  return (
    <Icon
      className={cn(sizeMap[size], className)}
      strokeWidth={1.75}
      aria-hidden
    />
  )
}

/** Official B2 exam skills */
export const b2ModuleIcons = {
  lesen: {
    icon: BookStack,
    label: "Lesen",
    detail: "Authentic reading passages & matching tasks",
  },
  sprachbausteine: {
    icon: CodeBrackets,
    label: "Sprachbausteine",
    detail: "Grammar gaps, structures & error correction",
  },
  horen: {
    icon: SoundHigh,
    label: "Hören",
    detail: "Native audio, transcripts & exam listening",
  },
  schreiben: {
    icon: EditPencil,
    label: "Schreiben",
    detail: "Formal letters, essays & writing models",
  },
  mundlich: {
    icon: MicrophoneSpeaking,
    label: "Mündlich",
    detail: "Speaking topics, Redemittel & discussion",
  },
} as const

export const b2ModuleList = Object.values(b2ModuleIcons)

/** Learning journey steps */
export const journeyStepIcons = {
  chooseModule: {
    icon: ViewGrid,
    detail: "Pick Lesen, Hören, Schreiben, or any B2 section",
  },
  practice: {
    icon: Flash,
    detail: "Interactive drills — not static PDF pages",
  },
  feedback: {
    icon: ChatBubbleCheck,
    detail: "Instant corrections, hints & explanations",
  },
  trackPass: {
    icon: Trophy,
    detail: "Readiness score, streaks & weak-skill focus",
  },
} as const

/** Platform feature cards */
export const platformFeatureIcons = {
  dashboard: {
    icon: DashboardSpeed,
    label: "Progress Dashboard",
    detail: "Readiness, streaks, scores & skill radar",
  },
  ai: {
    icon: Sparks,
    detail: "AI writing & speaking evaluation (roadmap)",
  },
} as const

/** Pricing plan feature bullets */
export const pricingFeatureIcons = {
  sampleLessons: BookStack,
  grammarDrills: CodeBrackets,
  progressSnapshot: StatsReport,
  community: Community,
  allModules: ViewGrid,
  corrections: ChatBubbleCheck,
  speaking: MicrophoneSpeaking,
  writing: EditPencil,
  dashboard: DashboardSpeed,
  cohort: GraduationCap,
  learningPaths: LeaderboardStar,
  mockExams: Timer,
  support: HeadsetHelp,
  roadmap: Rocket,
  check: CheckCircle,
} as const

/** FAQ topic icons */
export const faqTopicIcons = {
  audience: GraduationCap,
  modules: ViewGrid,
  interactive: Flash,
  ai: Sparks,
  progress: DashboardSpeed,
} as const

/** Hero & chrome */
export const landingChromeIcons = {
  menu: Menu,
  close: Xmark,
  chevronDown: NavArrowDown,
  chevronLeft: NavArrowLeft,
  chevronRight: NavArrowRight,
} as const
