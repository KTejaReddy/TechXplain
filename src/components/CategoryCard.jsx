import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/** Category tile used on the homepage and the categories page. */
export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group glass sheen tilt-3d relative flex h-full flex-col overflow-hidden rounded-card border border-hairline p-5 shadow-soft hover:border-accent/50 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-52 w-52 rounded-full opacity-[0.14] blur-2xl transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundColor: category.color }}
      />

      <span
        className="relative grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ backgroundColor: `${category.color}24`, color: category.color }}
      >
        <Icon name={category.icon} className="h-5 w-5" />
      </span>

      <h3 className="relative mt-5 text-base font-semibold tracking-tight text-ink">
        {category.name}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted">{category.description}</p>

      <span className="relative mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-brand">
        Explore
        <Icon
          name="arrowRight"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
