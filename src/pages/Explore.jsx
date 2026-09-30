import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ConceptCard from '../components/ConceptCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Icon from '../components/Icon.jsx'
import { categories, getCategory } from '../data/categories.js'
import { concepts } from '../data/concepts.js'
import { searchConcepts } from '../lib/search.js'

export default function Explore() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(params.get('category') || 'all')

  // Keep the URL shareable: ?q=cloud&category=cloud
  useEffect(() => {
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (activeCategory !== 'all') next.set('category', activeCategory)
    setParams(next, { replace: true })
  }, [query, activeCategory, setParams])

  const results = useMemo(() => {
    const matched = query.trim() ? searchConcepts(query) : concepts
    return activeCategory === 'all'
      ? matched
      : matched.filter((concept) => concept.category === activeCategory)
  }, [query, activeCategory])

  const filtered = query.trim() !== '' || activeCategory !== 'all'
  const activeCategoryName = activeCategory === 'all' ? null : getCategory(activeCategory)?.name

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Explore</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">
          Explore Technology
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
          Find a concept, browse a category, and understand how it works.
        </p>
      </header>

      <div className="mt-8 max-w-3xl">
        <SearchBar value={query} onChange={setQuery} size="lg" showSuggestions={false} />
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip
          label="All"
          color="#0a7a4a"
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        />
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.name}
            color={category.color}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>

      {filtered && (
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>
            {query.trim() ? `Matching “${query.trim()}”` : 'Filtered by category'}
            {activeCategoryName && <> in {activeCategoryName}</>}
          </span>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActiveCategory('all')
            }}
            className="inline-flex items-center gap-1.5 rounded-full border glass border-hairline px-3 py-1.5 text-xs font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-brand"
          >
            <Icon name="x" className="h-3 w-3" />
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-7">
        {results.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        ) : (
          <EmptyState query={query.trim()} />
        )}
      </div>
    </div>
  )
}

function FilterChip({ label, color, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition duration-200 ${
        active
          ? 'border-transparent text-ink shadow-soft'
          : 'glass border-hairline text-muted hover:-translate-y-0.5 hover:border-accent/40 hover:text-forest'
      }`}
      style={active ? { backgroundColor: color } : undefined}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: active ? 'rgba(238,252,244,0.8)' : color }}
      />
      {label}
    </button>
  )
}
