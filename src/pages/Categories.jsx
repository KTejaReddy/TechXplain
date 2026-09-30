import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { categories } from '../data/categories.js'
import { conceptsInCategory } from '../data/concepts.js'

export default function Categories() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Categories</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">
          Browse by topic
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
          Start from the area you care about, then open a concept to understand it properly.
        </p>
      </header>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {categories.map((category, i) => {
          const items = conceptsInCategory(category.id)
          return (
            <section
              key={category.id}
              className="animate-fade-up group glass sheen tilt-3d relative flex h-full flex-col overflow-hidden rounded-card border border-hairline p-6 shadow-soft hover:border-accent/50"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full opacity-[0.16] blur-2xl transition-transform duration-500 group-hover:scale-125"
                style={{ backgroundColor: category.color }}
              />

              <div className="relative flex items-start gap-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                  style={{ backgroundColor: `${category.color}24`, color: category.color }}
                >
                  <Icon name={category.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold tracking-tight text-ink">
                    {category.name}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2 border-t border-hairline pt-5">
                {items.map((concept) => (
                  <Link
                    key={concept.id}
                    to={`/concept/${concept.id}`}
                    className="glass rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-forest"
                  >
                    {concept.name}
                  </Link>
                ))}
              </div>

              <Link
                to={`/category/${category.id}`}
                className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand"
              >
                Open {category.name}
                <Icon
                  name="arrowRight"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </section>
          )
        })}
      </div>
    </div>
  )
}
