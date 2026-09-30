import { useState } from 'react'
import Icon from './Icon.jsx'

/**
 * Interactive — the small shared pieces that let a reader step through a
 * diagram instead of just looking at it.
 *
 * The whole interaction budget for this site is one control and one panel. A
 * reader can move forward and back, and whatever is selected explains itself in
 * place. There is deliberately no play button, no progress bar and nothing that
 * runs on its own: an interaction earns its place only when it helps the
 * concept land.
 *
 * State lives in the component that owns the diagram. `useStepper` is the only
 * shared logic, and it is small enough to read in one go.
 */

/** Keeps an index inside bounds, wrapping around at either end. */
export function wrapIndex(n, count) {
  const total = Math.max(count, 1)
  return ((n % total) + total) % total
}

/**
 * The stepper behind an explorable diagram. It runs on its own state when the
 * diagram is the only thing that cares, and on the page's state when a second
 * part of the page has to follow the same selection — one hook, either way,
 * so the selection is never kept in two places at once.
 */
export function useStepper(count, { index: controlled, onChange } = {}) {
  const [local, setLocal] = useState(0)
  const total = Math.max(count, 1)
  const index = wrapIndex(controlled ?? local, total)

  const select = (n) => {
    const next = wrapIndex(n, total)
    if (onChange) onChange(next)
    else setLocal(next)
  }

  return {
    index,
    total,
    isFirst: index === 0,
    isLast: index === total - 1,
    select,
    next: () => select(index + 1),
    prev: () => select(index - 1),
  }
}

/**
 * The one control: “2 of 5” with a back and a forward button. Buttons rather
 * than a slider, so it is operable from a keyboard and by a screen reader
 * without any extra work.
 */
export function StepControl({ index, total, onPrev, onNext, label = 'Step', className = '' }) {
  if (total < 2) return null
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <span className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand">
        <Icon name="route" className="h-3.5 w-3.5" />
        {label}
        <span className="rounded-full bg-mist px-2 py-0.5 tabular-nums text-forest">
          {index + 1} / {total}
        </span>
      </span>

      <span className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          className="grid h-8 w-8 place-items-center rounded-full border border-hairline glass text-muted transition duration-200 hover:border-accent/50 hover:text-brand"
          aria-label={`Previous ${label.toLowerCase()}`}
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="grid h-8 w-8 place-items-center rounded-full border border-hairline glass text-muted transition duration-200 hover:border-accent/50 hover:text-brand"
          aria-label={`Next ${label.toLowerCase()}`}
        >
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </span>
    </div>
  )
}

/**
 * The contextual panel. It shows the thing that is selected, in the concept's
 * own words — never a summary we invented.
 */
export function DetailCard({ icon, color = '#0a7a4a', eyebrow, title, note, footer }) {
  if (!title) return null
  return (
    <div
      className="animate-fade-up rounded-2xl border px-4 py-3.5 shadow-soft"
      style={{ borderColor: `${color}55`, backgroundColor: `${color}1a` }}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: `${color}26`, color }}
          >
            <Icon name={icon} className="h-4 w-4" />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </p>
          )}
          <p className="mt-0.5 text-[0.9375rem] font-semibold leading-snug text-ink">{title}</p>
          {note && <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
          {footer && <p className="mt-2 text-[0.75rem] leading-snug text-muted">{footer}</p>}
        </div>
      </div>
    </div>
  )
}

/**
 * The other panel: the answer to whatever the reader just selected in a
 * diagram. Every line in it comes from the page's own data — the concept's
 * description, the node's own note, or its lesson — so the panel explains the
 * selection instead of describing it in new words.
 */
export function InspectorPanel({ label, icon, note, input, output, color = '#0a7a4a' }) {
  if (!label) return null
  return (
    <div
      className="rounded-card border px-5 py-4 shadow-soft"
      style={{ borderColor: `${color}55`, backgroundColor: `${color}1a` }}
      aria-live="polite"
    >
      <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr] sm:items-start">
        <div className="flex items-start gap-3">
          {icon && (
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: `${color}26`, color }}
            >
              <Icon name={icon} className="h-4 w-4" />
            </span>
          )}
          <div className="min-w-0">
            <p className="eyebrow">You’re looking at</p>
            <p className="mt-1 text-[0.9375rem] font-semibold leading-snug text-ink">{label}</p>
            {note && <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
          </div>
        </div>

        {(input || output) && (
          <dl className="grid gap-1.5 text-[0.75rem] sm:justify-self-end sm:text-right">
            {input && <BandLine term="Input" value={input} />}
            {output && <BandLine term="Output" value={output} />}
          </dl>
        )}
      </div>
    </div>
  )
}

/** One line of the panel’s input/output column. */
function BandLine({ term, value }) {
  return (
    <div className="flex items-baseline gap-2 sm:justify-end">
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand">{term}</dt>
      <dd className="min-w-0 font-mono text-[0.75rem] leading-snug text-ink">{value}</dd>
    </div>
  )
}

/**
 * The one connector every diagram on the site is drawn with: a faint solid
 * line, a moving dash on top of it, and a solid arrow head. Same viewBox, same
 * stroke width, same dash pattern everywhere, so a flow in the hero and a chain
 * much further down the page read as parts of the same product.
 *
 * `direction` takes a rotation class, so a caller can switch a flow between
 * down and across at a container or viewport breakpoint (`rotate-90
 * @xl:rotate-0`) without a second component.
 */
export function Arrow({
  color = '#0a7a4a',
  label,
  active = false,
  direction = 'right',
  size = 'md',
  className = '',
}) {
  const rotate =
    direction === 'down' ? 'rotate-90' : direction === 'right' ? 'rotate-0' : direction
  const box = size === 'sm' ? 'h-3.5 w-4' : 'h-4 w-5'
  return (
    <span
      className={`flex shrink-0 flex-col items-center justify-center gap-1 py-1 ${
        label ? 'w-full px-4 text-center @3xl:w-[5rem] @3xl:px-0' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {label && (
        <span className="w-full text-center text-[0.625rem] leading-snug text-muted">{label}</span>
      )}
      <svg viewBox="0 0 28 24" className={`shrink-0 ${box} ${rotate}`} fill="none">
        <path d="M2 12h20" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.22" />
        <path
          className="animate-flow-dash"
          d="M4 12h16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 9"
        />
        <path
          d="m19 7 5 5-5 5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active && <TravelPulse color={color} />}
      </svg>
    </span>
  )
}

/**
 * The bead of light that travels along a connector on a diagram the reader can
 * explore. Rendered inside the connector's SVG, so it inherits its colour.
 */
export function TravelPulse({ color = '#0a7a4a' }) {
  return (
    <circle
      className="animate-pulse-travel"
      cx="3"
      cy="10"
      r="2.4"
      fill={color}
      aria-hidden="true"
    />
  )
}
