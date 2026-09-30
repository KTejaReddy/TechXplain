import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ConceptCard from '../components/ConceptCard.jsx'
import { categories, getCategory } from '../data/categories.js'
import { conceptsInCategory } from '../data/concepts.js'
import NotFound from './NotFound.jsx'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const category = getCategory(categoryId)

  if (!category) {
    return <NotFound message="That category does not exist." />
  }

  const items = conceptsInCategory(category.id)
  const others = categories.filter((c) => c.id !== category.id)

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        to="/categories"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition duration-200 hover:text-brand"
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        All categories
      </Link>

      <header className="glass sheen relative mt-7 overflow-hidden rounded-card border border-hairline p-6 shadow-lift sm:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full opacity-[0.06]"
          style={{ backgroundColor: category.color }}
        />
        <div className="relative flex flex-wrap items-start gap-5">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
            style={{ backgroundColor: `${category.color}24`, color: category.color }}
          >
            <Icon name={category.icon} className="h-6 w-6" />
          </span>
          <div className="max-w-2xl">
            <p className="eyebrow">Category</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-[2.25rem]">
              {category.name}
            </h1>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              {category.description}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>

      <section className="mt-16 border-t border-hairline pt-8">
        <h2 className="text-sm font-semibold text-ink">Other categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((other) => (
            <Link
              key={other.id}
              to={`/category/${other.id}`}
              className="inline-flex items-center gap-2 rounded-full border glass border-hairline px-4 py-2 text-xs font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-forest"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: other.color }} />
              {other.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
