import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/** Consistent section header used across the pages. */
export default function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div className="max-w-xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.5rem]">{title}</h2>
        {description && (
          <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex items-center gap-1.5 rounded-full border glass border-hairline px-4 py-2.5 text-sm font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-brand"
        >
          {action.label}
          <Icon
            name="arrowRight"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}
