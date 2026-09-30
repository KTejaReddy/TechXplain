import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { categories } from '../data/categories.js'

/** Friendly “nothing here” message with a nudge toward the categories. */
export default function EmptyState({ query }) {
  return (
    <div className="rounded-card border glass border-dashed border-hairline-strong px-6 py-14 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mist text-brand">
        <Icon name="search" className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">No concept found.</h3>
      <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-muted">
        {query
          ? `Nothing matches “${query}”. Try a shorter word, or start from a category instead.`
          : 'Nothing here yet. Browse a category to find a concept.'}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {categories.slice(0, 5).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="inline-flex items-center gap-2 rounded-full border glass border-hairline px-4 py-2 text-xs font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-forest"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.color }} />
            {category.name}
          </Link>
        ))}
        <Link
          to="/categories"
          className="rounded-full border glass border-hairline px-4 py-2 text-xs font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-forest"
        >
          All categories
        </Link>
      </div>
    </div>
  )
}
