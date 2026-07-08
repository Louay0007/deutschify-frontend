export type LesenTeilId = "1" | "2" | "3"

export type TopicStatus = "todo" | "done" | "partial"

export type LesenTopic = {
  slug: string
  title: string
  status: TopicStatus
  hasExercise: boolean
}

export type LesenTeil = {
  id: LesenTeilId
  slug: string
  title: string
  shortTitle: string
  description: string
  topics: LesenTopic[]
}

export type LesenPassage = {
  id: string
  text: string
  hint?: string
  correctOptionId: string
}

export type LesenOption = {
  id: string
  label: string
}

export type LesenExercise = {
  teilId: LesenTeilId
  topicSlug: string
  title: string
  instructions: string
  passages: LesenPassage[]
  options: LesenOption[]
}

const TEIL1_TOPICS: LesenTopic[] = [
  { slug: "umwelt", title: "Umwelt", status: "todo", hasExercise: true },
  { slug: "impfung", title: "Impfung", status: "todo", hasExercise: false },
  { slug: "sport-ist-gesund", title: "Sport ist Gesund", status: "partial", hasExercise: false },
  { slug: "limonade", title: "Limonade", status: "todo", hasExercise: false },
  { slug: "insekten", title: "Insekten", status: "done", hasExercise: false },
  { slug: "jugend-forscht", title: "Jugend forscht", status: "todo", hasExercise: false },
  { slug: "kinderhandy", title: "Kinderhandy", status: "todo", hasExercise: false },
  { slug: "osterreich", title: "Österreich", status: "todo", hasExercise: false },
  { slug: "drogen", title: "Drogen", status: "todo", hasExercise: false },
  { slug: "kaffee", title: "Kaffee", status: "todo", hasExercise: false },
  { slug: "geld", title: "Geld", status: "todo", hasExercise: false },
  { slug: "in-den-alpen", title: "In den Alpen", status: "todo", hasExercise: false },
  { slug: "schlafzug", title: "Schlafzug", status: "todo", hasExercise: false },
  { slug: "sprachenlernen", title: "Sprachenlernen", status: "todo", hasExercise: false },
  { slug: "einkaufen", title: "Einkaufen", status: "todo", hasExercise: false },
  { slug: "nachhaltigkeit", title: "Nachhaltigkeit", status: "todo", hasExercise: false },
  { slug: "wohnen", title: "Wohnen", status: "todo", hasExercise: false },
  { slug: "reisen", title: "Reisen", status: "todo", hasExercise: false },
  { slug: "gesundheit", title: "Gesundheit", status: "todo", hasExercise: false },
  { slug: "medien", title: "Medien", status: "todo", hasExercise: false },
  { slug: "familie", title: "Familie", status: "todo", hasExercise: false },
  { slug: "arbeit", title: "Arbeit", status: "todo", hasExercise: false },
  { slug: "bildung", title: "Bildung", status: "todo", hasExercise: false },
  { slug: "klima", title: "Klima", status: "todo", hasExercise: false },
  { slug: "verkehr", title: "Verkehr", status: "todo", hasExercise: false },
  { slug: "ernaehrung", title: "Ernährung", status: "todo", hasExercise: false },
  { slug: "freizeit", title: "Freizeit", status: "todo", hasExercise: false },
  { slug: "technik", title: "Technik", status: "todo", hasExercise: false },
  { slug: "kultur", title: "Kultur", status: "todo", hasExercise: false },
  { slug: "stadt-land", title: "Stadt und Land", status: "todo", hasExercise: false },
]

const TEIL2_TOPICS: LesenTopic[] = [
  { slug: "meinungsbeitraege", title: "Meinungsbeiträge", status: "todo", hasExercise: false },
  { slug: "leserbriefe", title: "Leserbriefe", status: "todo", hasExercise: false },
  { slug: "kommentare", title: "Kommentare", status: "todo", hasExercise: false },
  { slug: "forenbeitraege", title: "Forenbeiträge", status: "todo", hasExercise: false },
  { slug: "kritiken", title: "Kritiken", status: "todo", hasExercise: false },
  { slug: "diskussionen", title: "Diskussionen", status: "todo", hasExercise: false },
]

const TEIL3_TOPICS: LesenTopic[] = [
  { slug: "lange-texte", title: "Lange Texte", status: "todo", hasExercise: false },
  { slug: "sachtexte", title: "Sachtexte", status: "todo", hasExercise: false },
  { slug: "reportagen", title: "Reportagen", status: "todo", hasExercise: false },
  { slug: "wissenschaft", title: "Wissenschaft", status: "todo", hasExercise: false },
  { slug: "gesellschaft", title: "Gesellschaft", status: "todo", hasExercise: false },
]

export const LESEN_TEILS: LesenTeil[] = [
  {
    id: "1",
    slug: "teil-1",
    title: "Lesen Teil 1",
    shortTitle: "Teil 1",
    description:
      "Match headings to short paragraphs. Classic B2 matching — scan for topic and tone.",
    topics: TEIL1_TOPICS,
  },
  {
    id: "2",
    slug: "teil-2",
    title: "Lesen Teil 2",
    shortTitle: "Teil 2",
    description:
      "Opinion texts and statements. Decide which claim fits each short text.",
    topics: TEIL2_TOPICS,
  },
  {
    id: "3",
    slug: "teil-3",
    title: "Lesen Teil 3",
    shortTitle: "Teil 3",
    description:
      "Longer reading passages with detailed comprehension and global meaning.",
    topics: TEIL3_TOPICS,
  },
]

export const UMWELT_EXERCISE: LesenExercise = {
  teilId: "1",
  topicSlug: "umwelt",
  title: "Lesen Teil 1 – Umwelt",
  instructions:
    "Drag each heading from the answer bank into the matching paragraph. One heading per text.",
  passages: [
    {
      id: "p1",
      correctOptionId: "o1",
      hint: "Look for municipal rules and what citizens must do with waste.",
      text: "In vielen deutschen Städten gibt es klare Regeln für die Mülltrennung. Haushalte müssen Papier, Glas, Bioabfälle und Restmüll getrennt entsorgen. Wer sich nicht daran hält, riskiert Bußgelder. Gleichzeitig sollen Recyclinghöfe und Pfandsysteme dazu beitragen, Rohstoffe wiederzuverwenden und die Umwelt zu entlasten.",
    },
    {
      id: "p2",
      correctOptionId: "o3",
      hint: "Focus on transport and how people change daily habits.",
      text: "Immer mehr Menschen verzichten im Alltag auf das Auto und nutzen Bahn, Bus oder Fahrrad. Unternehmen fördern Jobtickets, und Städte bauen sichere Radwege aus. Ziel ist es, Emissionen zu senken und die Luftqualität in Wohnvierteln spürbar zu verbessern.",
    },
    {
      id: "p3",
      correctOptionId: "o5",
      hint: "Energy at home and household behavior.",
      text: "Auch im eigenen Haushalt lässt sich viel Energie sparen: LED-Lampen, moderne Heizsysteme und bewusstes Lüften reduzieren den Verbrauch. Viele Familien achten inzwischen auf den Stromverbrauch von Geräten und schalten Stand-by-Modi konsequent aus.",
    },
    {
      id: "p4",
      correctOptionId: "o2",
      hint: "Food choices and ecological impact of diet.",
      text: "Ein wachsender Teil der Bevölkerung entscheidet sich bewusst für regionale und saisonale Lebensmittel. Weniger Fleisch, kürzere Transportwege und weniger Verpackung gelten als einfacher Beitrag zum Klimaschutz – ohne dass der Alltag völlig umgestellt werden muss.",
    },
    {
      id: "p5",
      correctOptionId: "o4",
      hint: "Youth engagement and public campaigns.",
      text: "Jugendliche organisieren Klimastreiks, Informationsstände und Workshops an Schulen. Sie fordern verbindliche Klimaziele und möchten zeigen, dass nachhaltige Entscheidungen kein Randthema mehr sind, sondern zur gesellschaftlichen Verantwortung gehören.",
    },
  ],
  options: [
    { id: "o1", label: "Mülltrennung als Pflicht im Alltag" },
    { id: "o2", label: "Bewusster Konsum beim Essen" },
    { id: "o3", label: "Umstieg auf umweltfreundliche Mobilität" },
    { id: "o4", label: "Engagement der jungen Generation" },
    { id: "o5", label: "Energiesparen zu Hause" },
    { id: "o6", label: "Internationale Handelsabkommen" },
  ],
}

/** Minimal placeholder so other topics open the same exercise shell */
function placeholderExercise(
  teilId: LesenTeilId,
  topic: LesenTopic
): LesenExercise {
  return {
    teilId,
    topicSlug: topic.slug,
    title: `Lesen Teil ${teilId} – ${topic.title}`,
    instructions:
      "Practice layout preview. Full content for this topic is coming soon — try Umwelt for the complete drag-and-drop demo.",
    passages: [
      {
        id: "ph1",
        correctOptionId: "ph-a",
        text: `Dieses Übungsbeispiel zu „${topic.title}“ ist noch als Platzhalter hinterlegt. Die Oberfläche funktioniert bereits: Überschriften zuordnen, korrigieren und zurücksetzen.`,
      },
      {
        id: "ph2",
        correctOptionId: "ph-b",
        text: "Ziehen Sie die passende Überschrift aus der Antwortbank in das gestrichelte Feld. Nutzen Sie Korrektur und „Show wrongs“, um Ihr Ergebnis zu prüfen.",
      },
    ],
    options: [
      { id: "ph-a", label: `Thema: ${topic.title}` },
      { id: "ph-b", label: "Tipps zur Prüfungsstrategie" },
      { id: "ph-c", label: "Ablenkung: Unpassende Überschrift" },
    ],
  }
}

export function getLesenTeil(teilParam: string): LesenTeil | undefined {
  const id = teilParam.replace(/^teil-/, "") as LesenTeilId
  return LESEN_TEILS.find((t) => t.id === id || t.slug === teilParam)
}

export function getLesenTopic(
  teilParam: string,
  topicSlug: string
): LesenTopic | undefined {
  const teil = getLesenTeil(teilParam)
  return teil?.topics.find((t) => t.slug === topicSlug)
}

export function getLesenExercise(
  teilParam: string,
  topicSlug: string
): LesenExercise | undefined {
  const teil = getLesenTeil(teilParam)
  const topic = getLesenTopic(teilParam, topicSlug)
  if (!teil || !topic) return undefined

  if (teil.id === "1" && topicSlug === "umwelt") {
    return UMWELT_EXERCISE
  }

  return placeholderExercise(teil.id, topic)
}

export function getTeilProgress(teil: LesenTeil) {
  const done = teil.topics.filter((t) => t.status === "done").length
  const partial = teil.topics.filter((t) => t.status === "partial").length
  return {
    done,
    partial,
    total: teil.topics.length,
    label: `${done}/${teil.topics.length} topics done`,
  }
}
