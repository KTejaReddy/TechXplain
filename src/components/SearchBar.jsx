import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { searchConcepts } from '../lib/search.js'
import { getCategory } from '../data/categories.js'

/**
 * SearchBar — filters the hardcoded concepts instantly as you type.
 * Shows a clean suggestion dropdown and hands keyboard control to the arrow keys.
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search a technical concept...',
  size = 'lg',
  autoFocus = false,
  showSuggestions = true,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const matches = value.trim() ? searchConcepts(value).slice(0, 6) : []
  const large = size === 'lg'

  useEffect(() => {
    setActiveIndex(0)
  }, [value])

  const go = (concept) => {
    setOpen(false)
    navigate(`/concept/${concept.id}`)
  }

  const handleKeyDown = (event) => {
    if (!open || matches.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (i + 1) % matches.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (i - 1 + matches.length) % matches.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      go(matches[activeIndex] || matches[0])
    } else if (event.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`flex items-center gap-3 rounded-full border glass transition duration-200 ${
          large ? 'px-5 py-4 sm:px-6' : 'px-4 py-2.5'
        } ${
          open
            ? 'border-accent/50 shadow-[0_0_0_5px_rgba(34,160,107,0.13),0_24px_40px_-28px_rgba(11,61,46,0.4)]'
            : 'border-hairline shadow-soft hover:border-hairline-strong hover:shadow-lift'
        }`}
      >
        <Icon
          name="search"
          className={`shrink-0 transition-colors ${open ? 'text-accent' : 'text-muted'} ${
            large ? 'h-5 w-5' : 'h-4 w-4'
          }`}
        />
        <input
          ref={inputRef}
          value={value}
          autoFocus={autoFocus}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search a technical concept"
          className={`w-full bg-transparent text-ink placeholder:text-muted/75 focus:outline-none ${
            large ? 'text-base sm:text-[1.0625rem]' : 'text-sm'
          }`}
          type="text"
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              onChange('')
              inputRef.current?.focus()
            }}
            className="shrink-0 rounded-full p-1.5 text-muted transition hover:bg-mist hover:text-forest"
            aria-label="Clear search"
          >
            <Icon name="x" className={large ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
          </button>
        )}
      </div>

      {showSuggestions && open && value.trim() !== '' && (
        <div className="absolute z-30 mt-2.5 w-full overflow-hidden rounded-card border border-hairline glass p-2 shadow-lift">
          {matches.length === 0 ? (
            <div className="px-3 py-3.5 text-sm text-muted">
              No concept found. Try a shorter word, or browse the categories.
            </div>
          ) : (
            matches.map((concept, i) => {
              const category = getCategory(concept.category)
              const active = i === activeIndex
              return (
                <button
                  key={concept.id}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    go(concept)
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                    active ? 'bg-mist' : 'hover:bg-canvas'
                  }`}
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    style={{
                      backgroundColor: `${category?.color}14`,
                      color: category?.color,
                    }}
                  >
                    <Icon name={concept.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate text-sm font-medium text-ink">{concept.name}</span>
                      {category && (
                        <span className="hidden shrink-0 text-[0.6875rem] font-medium uppercase tracking-wide text-muted/80 sm:inline">
                          {category.name}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted">
                      {concept.shortDescription}
                    </span>
                  </span>
                  <Icon
                    name="arrowRight"
                    className={`h-3.5 w-3.5 shrink-0 text-brand transition-opacity ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              )
            })
          )}
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault()
              setOpen(false)
              navigate(`/explore?q=${encodeURIComponent(value.trim())}`)
            }}
            className="glass mt-1.5 flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-2.5 text-xs font-medium text-muted transition hover:bg-mist hover:text-forest"
          >
            See all matching concepts
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
