import { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import HeroVisual from '../components/HeroVisual.jsx'
import ConceptCard from '../components/ConceptCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Icon from '../components/Icon.jsx'
import { categories } from '../data/categories.js'
import { popularConcepts } from '../data/concepts.js'
import { searchConcepts } from '../lib/search.js'

const suggestions = ['Cloud', 'Backend', 'Local AI', 'API', 'Docker', 'Database']

const experience = [
  {
    icon: 'search',
    title: 'Search',
    text: 'Look up any technical term in plain words.',
  },
  {
    icon: 'eye',
    title: 'Understand',
    text: 'Read a short explanation written for beginners.',
  },
  {
    icon: 'flow',
    title: 'Visualise',
    text: 'See how it works in a clear, labelled diagram.',
  },
  {
    icon: 'compass',
    title: 'Explore',
    text: 'Follow related concepts until the picture is complete.',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const searching = query.trim().length > 0

  const results = useMemo(() => (searching ? searchConcepts(query) : []), [query, searching])

  return (
    <div>
      {/* ---------------------------------- Hero --------------------------------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(620px_240px_at_50%_100%,rgba(34,160,107,0.16),transparent_72%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-20 lg:pb-16">
          <div className="text-center lg:text-left">
            <p className="eyebrow">Visual technical glossary</p>

            <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              Technology,
              <br />
              <span className="text-brand">simply explained.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-[1.0625rem] lg:mx-0">
              Understand technical concepts through simple explanations, visual diagrams and
              real-world examples.
            </p>

            <div className="mx-auto mt-8 w-full max-w-xl lg:mx-0">
              <SearchBar value={query} onChange={setQuery} size="lg" />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {suggestions.map((term) => {
                const active = query.toLowerCase() === term.toLowerCase()
                return (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-200 ${
                      active
                        ? 'border-accent/40 bg-mist text-forest'
                        : 'glass border-hairline text-muted hover:-translate-y-0.5 hover:border-accent/40 hover:text-forest'
                    }`}
                  >
                    {term}
                  </button>
                )
              })}
            </div>
          </div>

          <HeroVisual className="animate-fade-up lg:pl-4" />
        </div>
      </section>

      {/* --------------------------- Live search results -------------------------- */}
      {searching && (
        <section className="mx-auto max-w-6xl animate-fade-up px-5 pb-4 sm:px-6">
          <SectionHeading
            eyebrow="Results"
            title={`Concepts matching “${query.trim()}”`}
            action={{
              to: `/explore?q=${encodeURIComponent(query.trim())}`,
              label: 'Open in Explore',
            }}
          />

          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((concept) => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          ) : (
            <EmptyState query={query} />
          )}
        </section>
      )}

      {!searching && (
        <>
          {/* ---------------------------- Featured concepts --------------------------- */}
          <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
            <SectionHeading
              eyebrow="Start anywhere"
              title="Explore concepts"
              description="Short, visual explanations of the ideas you meet in every technical conversation."
              action={{ to: '/explore', label: 'Browse all' }}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularConcepts.slice(0, 6).map((concept) => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </section>

          {/* ------------------------------- Categories ------------------------------- */}
          <section className="relative">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
              <SectionHeading
                eyebrow="Browse"
                title="Explore by category"
                description="Start from the area you care about and work outward."
                action={{ to: '/categories', label: 'All categories' }}
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------- How it feels to use ------------------------- */}
          <section className="mx-auto max-w-6xl px-5 pt-4 pb-12 sm:px-6 sm:pb-16">
            <div className="glass sheen lift-3d relative overflow-hidden rounded-card border border-hairline p-6 shadow-lift sm:p-9">
              <div className="max-w-2xl">
                <p className="eyebrow">Why TechXplain</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-[1.5rem]">
                  Four steps from “what is that?” to understanding it
                </h2>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(7,minmax(0,1fr))] lg:items-start lg:gap-3">
                {experience.map((step, i) => (
                  <Step key={step.title} index={i} {...step} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function Step({ index, icon, title, text }) {
  return (
    <>
      <div
        className="animate-fade-up lg:col-auto"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <span className="glass grid h-11 w-11 place-items-center rounded-2xl text-brand shadow-soft">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-sm font-semibold text-ink">
          <span className="mr-1.5 text-muted/70">{index + 1}.</span>{' '}
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
      </div>
      {index < experience.length - 1 && (
        <span className="hidden items-center justify-center pt-3 lg:flex" aria-hidden="true">
          <svg viewBox="0 0 32 12" className="h-3 w-8" fill="none">
            <path d="M0 6h28" stroke="#0a7a4a" strokeOpacity="0.3" strokeWidth="1.5" />
            <path className="animate-flow-dash" d="M2 6h24" stroke="#12b877" strokeWidth="1.5" strokeDasharray="3 7" />
            <path
              d="m26 2.5 4 3.5-4 3.5"
              stroke="#12b877"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  )
}
