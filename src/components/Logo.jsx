import { Link } from 'react-router-dom'

/**
 * TechXplain brand mark — a green rounded tile with a small node graph, plus the wordmark.
 * The graph reads as “connected concepts”, which is what the site is about.
 */
export default function Logo({ className = '', showWordmark = true }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 rounded-xl py-1 pr-2 ${className}`}
      aria-label="TechXplain home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-[0.7rem] bg-gradient-to-br from-brand to-forest text-surface shadow-[0_10px_20px_-12px_rgba(11,61,46,0.75)] transition-transform duration-200 group-hover:-translate-y-0.5">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M7.5 15.5 12 8.5l4.5 7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <circle cx="12" cy="7" r="2.2" fill="currentColor" />
          <circle cx="6.6" cy="16.6" r="2" fill="currentColor" />
          <circle cx="17.4" cy="16.6" r="2" fill="currentColor" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[1.0625rem] font-semibold tracking-tight text-ink">
          Tech<span className="text-brand">Xplain</span>
        </span>
      )}
    </Link>
  )
}
