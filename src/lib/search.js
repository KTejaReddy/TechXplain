import { concepts } from '../data/concepts.js'
import { categoryById } from '../data/categories.js'

/** Lowercase, trim and collapse repeated spaces. */
const normalize = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Simple, language-agnostic “also match the singular” helper: containers → container. */
function forms(query) {
  const list = [query]
  if (query.endsWith('ies')) list.push(`${query.slice(0, -3)}y`)
  if (query.endsWith('es')) list.push(query.slice(0, -2))
  if (query.endsWith('s')) list.push(query.slice(0, -1))
  return [...new Set(list)]
}

/**
 * Pre-computed, plain-JavaScript search index.
 * Matching happens locally in the browser — there is no search service.
 */
const index = concepts.map((concept) => ({
  concept,
  name: normalize(concept.name),
  aliases: (concept.aliases || []).map(normalize),
  keywords: normalize(
    [
      // Hand-written related terms first so they rank above incidental mentions.
      ...(concept.keywords || []),
      concept.shortDescription,
      concept.what,
      categoryById[concept.category]?.name,
      ...(concept.technologies || []),
      ...(concept.examples || []),
    ].join(' | '),
  ),
}))

/** Score one concept against one (already normalised) form of the query. */
function rawScore(entry, form, wordPattern) {
  const { name, aliases, keywords } = entry

  if (name === form) return 100
  if (name.startsWith(form)) return 90
  if (name.includes(form)) return 80
  if (aliases.includes(form)) return 85
  if (aliases.some((alias) => alias.startsWith(form))) return 70
  if (aliases.some((alias) => alias.includes(form))) return 60
  if (wordPattern.test(keywords)) return 45

  return null
}

/** Rank a concept against the whole query, trying singular/plural forms. */
function score(entry, query) {
  let best = null

  forms(query).forEach((form, i) => {
    const wordPattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(form)}([^a-z0-9]|$)`)
    const points = rawScore(entry, form, wordPattern)
    if (points === null) return

    // A match on a whole word beats one buried mid-word ("ai" should find Local AI
    // before Container, which merely contains the letters a-i).
    const onWordBoundary =
      wordPattern.test(entry.name) || entry.aliases.some((alias) => wordPattern.test(alias))

    const adjusted = (i === 0 ? points : points - 5) + (onWordBoundary ? 6 : 0)
    if (best === null || adjusted > best) best = adjusted
  })

  if (best !== null) return best

  // Multi-word queries such as "local ai": every word must appear as a whole word.
  const words = query.split(' ').filter(Boolean)
  if (words.length > 1) {
    const haystack = `${entry.name} ${entry.aliases.join(' ')} ${entry.keywords}`
    const allPresent = words.every((word) =>
      forms(word).some((form) =>
        new RegExp(`(^|[^a-z0-9])${escapeRegExp(form)}([^a-z0-9]|$)`).test(haystack),
      ),
    )
    if (allPresent) return 40
  }

  return null
}

/**
 * Filter and rank concepts by a search string.
 * Case-insensitive, partial matching: "clou" finds Cloud Computing,
 * "containers" finds Container. An empty query returns everything.
 */
export function searchConcepts(rawQuery) {
  const query = normalize(rawQuery)
  if (!query) return concepts

  return index
    .map((entry) => ({ concept: entry.concept, points: score(entry, query) }))
    .filter((hit) => hit.points !== null)
    .sort((a, b) => b.points - a.points || a.concept.name.localeCompare(b.concept.name))
    .map((hit) => hit.concept)
}
