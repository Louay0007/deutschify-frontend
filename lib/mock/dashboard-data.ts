export const B2_MODULES = [
  { key: "lesen", label: "Lesen", fullLabel: "Reading", completion: 72, score: 78, lessonsDone: 18, lessonsTotal: 24 },
  { key: "sprach", label: "Sprachbausteine", fullLabel: "Grammar", completion: 58, score: 71, lessonsDone: 12, lessonsTotal: 22 },
  { key: "horen", label: "Hören", fullLabel: "Listening", completion: 81, score: 82, lessonsDone: 14, lessonsTotal: 18 },
  { key: "schreiben", label: "Schreiben", fullLabel: "Writing", completion: 45, score: 65, lessonsDone: 8, lessonsTotal: 20 },
  { key: "mundlich", label: "Mündlich", fullLabel: "Speaking", completion: 63, score: 74, lessonsDone: 10, lessonsTotal: 16 },
] as const

export const WEEKLY_ACTIVITY = [
  { day: "Mon", minutes: 45, exercises: 6 },
  { day: "Tue", minutes: 60, exercises: 8 },
  { day: "Wed", minutes: 30, exercises: 4 },
  { day: "Thu", minutes: 75, exercises: 10 },
  { day: "Fri", minutes: 50, exercises: 7 },
  { day: "Sat", minutes: 90, exercises: 12 },
  { day: "Sun", minutes: 40, exercises: 5 },
]

export const GERMAN_THEMES = [
  { theme: "Alltag & Beruf", label: "Daily life & work", progress: 70, exercises: 34 },
  { theme: "Bildung & Studium", label: "Education & study", progress: 55, exercises: 22 },
  { theme: "Gesellschaft", label: "Society & culture", progress: 48, exercises: 18 },
  { theme: "Formelle Kommunikation", label: "Formal communication", progress: 62, exercises: 26 },
  { theme: "Prüfungsstrategie", label: "Exam strategy", progress: 40, exercises: 14 },
]

export const DASHBOARD_SUMMARY = {
  examReadiness: 68,
  readinessDelta: 4,
  lessonsCompleted: 62,
  lessonsTotal: 100,
  streakDays: 7,
  avgScore: 74,
  avgScoreDelta: 3,
  vocabularyLearned: 312,
  studyHours: 18.5,
  examDate: "2026-09-15",
  strongest: ["Hören", "Lesen"],
  focusNext: "Schreiben",
  narrative:
    "You are building solid B2 momentum. Listening and reading are exam-ready zones — keep them warm with short drills. Writing needs focused practice this week: aim for 3 structured tasks before your mock exam.",
}

export function getDaysUntilExam(examDate: string) {
  const target = new Date(examDate)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
