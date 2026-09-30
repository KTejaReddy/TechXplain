import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

export default function NotFound({ message }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mist text-brand">
        <Icon name="compass" className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {message || 'We could not find that page.'}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The concept may have been renamed, or the link might be mistyped.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Link
          to="/explore"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-surface shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-forest"
        >
          Explore concepts
        </Link>
        <Link
          to="/"
          className="rounded-full border glass border-hairline px-5 py-2.5 text-sm font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-brand"
        >
          Back home
        </Link>
      </div>
    </div>
  )
}
