/**
 * Deutschify course / exercise design tokens.
 * Dark card surfaces with warm-cream typography on walnut shell.
 */
export const courseTokens = {
  card: "#382416", // bark-brown
  cardInk: "#ffedd7", // warm-cream
  cardMuted: "#6c5f51", // driftwood
  shell: "#100904", // walnut-shadow
  accent: "#dc5000", // ember-accent
  correct: "#4ade80",
  wrong: "#f87171",
  radiusCard: "16px",
  radiusCapsule: "9999px",
  radiusPaper: "20px",
} as const

/** Tailwind class presets for course UI */
export const courseClasses = {
  card: "course-card rounded-[20px]",
  paper: "course-paper rounded-[20px]",
  topicCard: "course-topic-card rounded-[14px]",
  dropZone: "course-drop-zone rounded-[12px]",
  chip: "course-chip rounded-[14px]",
  titleCapsule:
    "inline-flex items-center rounded-full border border-warm-cream/15 bg-bark-brown/80 px-5 py-2.5 text-warm-cream",
  btnPrimary:
    "rounded-[14px] bg-ember-accent px-4 py-2.5 text-[14px] font-semibold text-warm-cream transition-all ios-spring hover:bg-ember-accent/90 active:scale-[0.98]",
  btnSecondary:
    "rounded-[14px] border border-warm-cream/20 bg-bark-brown/60 px-4 py-2.5 text-[14px] font-semibold text-warm-cream transition-all ios-spring hover:bg-warm-cream/8 active:scale-[0.98]",
  btnGhost:
    "rounded-[14px] border border-warm-cream/15 bg-warm-cream/5 px-4 py-2.5 text-[14px] font-semibold text-driftwood transition-all ios-spring hover:text-warm-cream active:scale-[0.98]",
} as const
