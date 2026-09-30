import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { getCategory } from '../data/categories.js'

/**
 * A single concept card used across the homepage, explore grid and related lists.
 * `variant="compact"` is used for tighter grids.
 */
export default function ConceptCard({ concept, variant = 'default' }) {
  const category = getCategory(concept.category)
  const color = category?.color || '#0a7a4a'
  const compact = variant === 'compact'

  return (
    <Link
      to={`/concept/${concept.id}`}
      className="group glass sheen tilt-3d relative flex h-full flex-col rounded-card border border-hairline p-5 shadow-soft hover:border-accent/50 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-brand transition duration-300 group-hover:scale-105 group-hover:bg-accent/15">
          <Icon name={concept.icon} className="h-5 w-5" />
        </span>
        {category && (
          <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            {category.name}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-tight text-ink">
        {concept.name}
      </h3>
      <p className={`mt-2 text-sm leading-relaxed text-muted ${compact ? 'line-clamp-2' : ''}`}>
        {concept.shortDescription}
      </p>

      <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-brand">
        Explore
        <Icon
          name="arrowRight"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
