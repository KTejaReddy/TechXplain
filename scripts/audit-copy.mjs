/**
 * Temporary copy audit: flags formal/jargon wording, over-long sentences,
 * generic "where used" items and repetitive step lists across all concepts.
 */
import { concepts } from '../src/data/concepts.js'
import { lessons } from '../src/data/lessons.js'

const jargon =
  /\b(facilitate[sd]?|leverag\w+|utilis\w+|utiliz\w+|paradigm|holistic|seamless\w*|robust\w*|orthogonal|encompass\w*|aforementioned|endeavour|myriad|plethora|commence\w*|subsequently|whilst|heretofore|notwithstanding)\b/gi
const formal = /\b(refers to|is defined as|is a term|is a type of software|serves as|in order to)\b/gi
const generic =
  /\b(any modern|any app|any website|any system|any project|any database-backed|any high-availability|every modern|all kinds of|various|other things|etc\.)\b/gi

const sentences = (text) => String(text || '').split(/(?<=[.!?])\s+/)

const flags = { jargon: [], formal: [], generic: [], long: [], short: [], steps: [], bigWhat: [] }

for (const c of concepts) {
  const lesson = lessons[c.id]
  const lessonText = [
    ...(lesson?.scenario
      ? [lesson.scenario.title, lesson.scenario.note, ...lesson.scenario.steps.flatMap((s) => [s.label, s.note])]
      : []),
    ...(lesson?.mapping
      ? [lesson.mapping.note, ...lesson.mapping.pairs.flatMap((p) => [p.analogy, p.reality])]
      : []),
    ...(lesson?.beforeAfter
      ? [
          lesson.beforeAfter.note,
          ...['before', 'after'].flatMap((side) => [
            lesson.beforeAfter[side].label,
            ...lesson.beforeAfter[side].steps.map((s) => s.label),
          ]),
        ]
      : []),
    ...(lesson?.code ? [lesson.code.title, ...lesson.code.notes.map((n) => n.text)] : []),
    ...(lesson?.exchange
      ? [lesson.exchange.note, lesson.exchange.request.text, lesson.exchange.response.text]
      : []),
    ...(lesson?.hero ? [...Object.values(lesson.hero.notes || {}), ...(lesson.hero.links || [])] : []),
  ]
    .filter(Boolean)
    .join(' ')

  // Labels are not sentences, so length is only judged on real prose and lesson notes.
  const lessonNotes = [
    lesson?.scenario?.note,
    lesson?.mapping?.note,
    lesson?.beforeAfter?.note,
    lesson?.exchange?.note,
  ]
    .filter(Boolean)
    .join(' ')

  const prose = [c.what, c.analogy, c.whyItMatters, c.shortDescription, lessonText].join(' ')
  for (const m of prose.matchAll(jargon)) flags.jargon.push(`${c.id}: ${m[0]}`)
  for (const m of prose.matchAll(formal)) flags.formal.push(`${c.id}: ${m[0]}`)

  for (const [field, text] of Object.entries({
    what: c.what,
    analogy: c.analogy,
    why: c.whyItMatters,
    short: c.shortDescription,
    lesson: lessonNotes,
  })) {
    for (const s of sentences(text)) {
      const words = s.trim().split(/\s+/).length
      if (words > 32) flags.long.push(`${c.id}.${field} (${words}w): ${s.slice(0, 90)}…`)
    }
  }

  for (const item of c.whereUsed) {
    if (generic.test(item)) flags.generic.push(`${c.id}: ${item}`)
    generic.lastIndex = 0
  }

  const firstWords = c.howItWorks.map((s) => s.trim().split(/\s+/)[0].toLowerCase())
  const counts = firstWords.reduce((a, w) => ((a[w] = (a[w] || 0) + 1), a), {})
  const worst = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  if (worst && worst[1] >= 4) flags.steps.push(`${c.id}: ${worst[1]} steps start with "${worst[0]}"`)
}

const show = (label, list, limit = 100) => {
  console.log(`\n== ${label} (${list.length}) ==`)
  list.slice(0, limit).forEach((l) => console.log('  ' + l))
}

show('Jargon / formal words', flags.jargon)
show('Formal phrasing', flags.formal)
show('Generic "where used" items', flags.generic)
show('Sentences over 32 words', flags.long)
show('Repetitive step openers', flags.steps)
