import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { categories } from '../data/categories.js'

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore concepts' },
  { to: '/categories', label: 'Categories' },
]

export default function Footer() {
  return (
    <footer className="glass-strong mt-16 border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Technology, simply explained. A visual glossary for beginners and students — short
            explanations, clear diagrams and real examples.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted transition-colors duration-200 hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Categories
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className="text-muted transition-colors duration-200 hover:text-brand"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} TechXplain</p>
          <p>Learn a concept a day.</p>
        </div>
      </div>
    </footer>
  )
}
