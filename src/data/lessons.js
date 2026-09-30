import { programmingLessons } from './lessons-programming.js'
import { webLessons } from './lessons-web.js'
import { frontendLessons } from './lessons-frontend.js'
import { backendLessons } from './lessons-backend.js'
import { databaseLessons } from './lessons-databases.js'
import { aiLessons } from './lessons-ai.js'
import { cloudLessons } from './lessons-cloud.js'
import { devopsLessons } from './lessons-devops.js'
import { networkingLessons } from './lessons-networking.js'
import { securityLessons } from './lessons-security.js'
import { engineeringLessons } from './lessons-engineering.js'

/**
 * Visual lesson content, keyed by concept id.
 *
 * Everything in here is optional and additive: the concept page derives a
 * visual for every concept on its own (see lesson-grammar.js) and only uses
 * these blocks when a hand-written example teaches faster — a real scenario,
 * a request/response exchange, an analogy mapped line by line, a before/after
 * or a small piece of syntax.
 *
 * Shape of one entry (all keys optional):
 *   hero:        { notes: { nodeLabel: 'tiny note' }, links: ['label', …] }
 *   exchange:    { request: {label,text,mono?}, via?, response: {...}, note? }
 *   scenario:    { title, steps: [{icon,label,note?}], note? }
 *   mapping:     { title, pairs: [{icon,analogy,reality}], note? }
 *   beforeAfter: { before: {label,steps}, after: {label,steps}, note }
 *   code:        { title, panels: [{label,lines}], notes: [{code,text}] }
 */
const lessonSets = [
  programmingLessons,
  webLessons,
  frontendLessons,
  backendLessons,
  databaseLessons,
  aiLessons,
  cloudLessons,
  devopsLessons,
  networkingLessons,
  securityLessons,
  engineeringLessons,
]

export const lessons = Object.assign({}, ...lessonSets)

/** The lesson for one concept, or null when nothing has been written for it yet. */
export const lessonFor = (id) => lessons[id] || null

export const lessonIds = Object.keys(lessons)
