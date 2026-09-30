import { programmingConcepts } from './concepts-programming.js'
import { webConcepts } from './concepts-web.js'
import { frontendConcepts } from './concepts-frontend.js'
import { backendConcepts } from './concepts-backend.js'
import { databaseConcepts } from './concepts-databases.js'
import { aiConcepts } from './concepts-ai.js'
import { cloudConcepts } from './concepts-cloud.js'
import { devopsConcepts } from './concepts-devops.js'
import { networkingConcepts } from './concepts-networking.js'
import { securityConcepts } from './concepts-security.js'
import { engineeringConcepts } from './concepts-engineering.js'

/**
 * Every TechXplain concept, hardcoded and local.
 * Shape of a concept:
 *   id, name, aliases, category, icon, keywords, featured?,
 *   shortDescription, what, analogy, howItWorks[], visual,
 *   whereUsed[], examples[], technologies[], whyItMatters, relatedConcepts[]
 */
export const concepts = [
  ...programmingConcepts,
  ...webConcepts,
  ...frontendConcepts,
  ...backendConcepts,
  ...databaseConcepts,
  ...aiConcepts,
  ...cloudConcepts,
  ...devopsConcepts,
  ...networkingConcepts,
  ...securityConcepts,
  ...engineeringConcepts,
]

export const conceptById = Object.fromEntries(concepts.map((c) => [c.id, c]))

export const getConcept = (id) => conceptById[id] || null

/** Concepts shown in the “Popular concepts” section on the homepage. */
export const popularConcepts = concepts.filter((c) => c.featured)

/** Resolve related concept ids into full concept objects. */
export const relatedTo = (concept) =>
  (concept?.relatedConcepts || []).map((id) => conceptById[id]).filter(Boolean)

export const conceptsInCategory = (categoryId) =>
  concepts.filter((c) => c.category === categoryId)

/** How many concepts each category holds, keyed by category id. */
export const categoryCounts = concepts.reduce((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1
  return acc
}, {})

export const totalConcepts = concepts.length
