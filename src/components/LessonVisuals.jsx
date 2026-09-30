import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { Arrow } from './Interactive.jsx'
import { getCategory } from '../data/categories.js'
import { iconForTechnology, roleForTechnology } from '../data/technology-roles.js'
import { analogyIcon, shortFlow } from '../data/lesson-grammar.js'

/**
 * LessonVisuals — the small, reusable diagrams that turn a concept page into a
 * visual lesson. Every one of them is driven by data: the same components draw
 * the recipe for API, Docker or DNS, so all 253 concepts stay consistent
 * without hand-built markup per page.
 *
 * The rule of thumb here: a heading, an icon and a short label should already
 * tell the story before anybody reads a sentence.
 */

function IconTile({ name, color, size = 'md' }) {
  const box =
    size === 'sm' ? 'h-8 w-8 rounded-lg' : size === 'lg' ? 'h-11 w-11 rounded-2xl' : 'h-9 w-9 rounded-xl'
  const glyph = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-5 w-5' : 'h-[1.125rem] w-[1.125rem]'
  return (
    <span
      className={`grid shrink-0 place-items-center ${box}`}
      style={{ backgroundColor: `${color}26`, color }}
    >
      <Icon name={name || 'sparkles'} className={glyph} />
    </span>
  )
}

/* ------------------------------------------------------------------------- */
/* “See it in real life” — a handful of stops through a familiar situation.  */
/* ------------------------------------------------------------------------- */

export function ScenarioFlow({ scenario, color = '#0a7a4a' }) {
  if (!scenario) return null
  const steps = scenario.steps || []
  // Wide cards beat narrow columns: four or five stops fit on one row, six wrap to two.
  const columns = steps.length <= 4 ? 'lg:grid-cols-4' : steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-3'
  return (
    <div className="rounded-card border border-hairline bg-gradient-to-b from-surface/95 to-mist/40 p-5 pt-7 shadow-soft sm:p-7 sm:pt-8">
      {scenario.title && (
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-mist text-brand">
            <Icon name="eye" className="h-3.5 w-3.5" />
          </span>
          {scenario.title}
        </p>
      )}

      <ol className={`mt-6 grid gap-3 sm:grid-cols-2 ${columns}`}>
        {steps.map((step, i) => (
          <li
            key={`${step.label}-${i}`}
            className="flex animate-fade-up flex-col"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative flex min-w-0 flex-1 items-start gap-3 rounded-2xl border border-hairline glass px-4 py-3.5 shadow-soft">
              <span
                className="absolute -left-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full text-[0.625rem] font-semibold text-ink shadow-soft"
                style={{ backgroundColor: color }}
              >
                {i + 1}
              </span>
              <IconTile name={step.icon} color={color} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug text-ink">{step.label}</span>
                {step.note && (
                  <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted">
                    {step.note}
                  </span>
                )}
              </span>
            </div>
            {i < steps.length - 1 && (
              <Arrow color={color} direction="down" size="sm" className="flex sm:hidden" />
            )}
          </li>
        ))}
      </ol>

      {scenario.note && (
        <p className="mt-5 max-w-3xl text-[0.875rem] leading-relaxed text-muted">{scenario.note}</p>
      )}
    </div>
  )
}

/*
 * The written exchange that used to be drawn here now lives in the
 * input → process → output band (“What goes in, what comes out”), which draws
 * the same three beats from the same data — one exchange diagram on the page,
 * not two. See InputProcessOutput in VisualTemplates.jsx.
 */

/* ------------------------------------------------------------------------- */
/* The fallback for “What is it?”: start, middle and end of the process.     */
/* ------------------------------------------------------------------------- */

export function ShortFlowVisual({ concept, color = '#0a7a4a' }) {
  const nodes = shortFlow(concept)
  if (!nodes) return null
  return (
    <div className="rounded-card border border-hairline bg-mist/50 p-5">
      <p className="eyebrow">From start to finish</p>
      <ol className="mt-4">
        {nodes.map((node, i) => (
          <li key={`${node.stage}-${i}`} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="flex items-start gap-3 rounded-2xl border border-hairline glass px-4 py-3">
              <IconTile name={node.icon} color={color} size="sm" />
              <span className="min-w-0">
                <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  {node.stage}
                </span>
                <span className="mt-0.5 block text-[0.8125rem] font-medium leading-snug text-ink">
                  {node.text}
                </span>
              </span>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden="true" className="ml-7 block h-3 w-px border-l border-dashed border-accent/40" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* Analogy made explicit: analogy word → thing it stands for.                */
/* ------------------------------------------------------------------------- */

export function MappingDiagram({ mapping, color = '#0a7a4a' }) {
  if (!mapping?.pairs?.length) return null
  return (
    <div className="mt-6">
      {mapping.title && (
        <p className="eyebrow flex items-center gap-2">
          <Icon name="arrowRight" className="h-3.5 w-3.5" />
          {mapping.title}
        </p>
      )}
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {mapping.pairs.map((pair, i) => (
          <li
            key={`${pair.analogy}-${i}`}
            className="flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-hairline glass-strong px-4 py-3"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <IconTile name={pair.icon} color={color} size="sm" />
            <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-forest">
              {pair.analogy}
            </span>
            <Icon name="arrowRight" className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-[0.8125rem] font-semibold text-ink">{pair.reality}</span>
          </li>
        ))}
      </ul>
      {mapping.note && (
        <p className="mt-4 max-w-3xl text-[0.875rem] leading-relaxed text-muted">{mapping.note}</p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* Before / after: why the thing exists at all.                              */
/* ------------------------------------------------------------------------- */

function BeforeAfterPanel({ panel, positive, color }) {
  const accent = positive ? color : '#4a8a6c'
  return (
    <div
      className="rounded-card border p-5"
      style={{
        borderColor: positive ? `${color}44` : '#a3e6c6',
        background: positive ? `${color}16` : '#f1fef7',
      }}
    >
      <p
        className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]"
        style={{ color: positive ? color : '#3f6b55' }}
      >
        <Icon name={positive ? 'zap' : 'clock'} className="h-3.5 w-3.5" />
        {panel.label}
      </p>
      <ol className="mt-4">
        {(panel.steps || []).map((step, i) => (
          <li key={`${step.label}-${i}`} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-3 rounded-xl border border-hairline glass px-3.5 py-2.5">
              <IconTile name={step.icon} color={accent} size="sm" />
              <span className="min-w-0 flex-1 text-[0.8125rem] font-medium leading-snug text-ink">
                {step.label}
              </span>
              {step.note && (
                <span className="shrink-0 text-right text-[0.6875rem] text-muted">{step.note}</span>
              )}
            </div>
            {i < (panel.steps || []).length - 1 && (
              <span aria-hidden="true" className="ml-7 block h-2.5 w-px border-l border-dashed border-hairline-strong" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function BeforeAfterVisual({ beforeAfter, color = '#0a7a4a' }) {
  if (!beforeAfter?.before || !beforeAfter?.after) return null
  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-2">
        <BeforeAfterPanel panel={beforeAfter.before} positive={false} color={color} />
        <BeforeAfterPanel panel={beforeAfter.after} positive color={color} />
      </div>
      {beforeAfter.note && (
        <p className="mt-4 max-w-3xl text-[0.875rem] leading-relaxed text-muted">{beforeAfter.note}</p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* A code-shaped callout, for concepts where the real syntax teaches faster. */
/* ------------------------------------------------------------------------- */

export function CodeCallout({ code, color = '#0a7a4a' }) {
  if (!code?.panels?.length) return null
  return (
    <div className="relative overflow-hidden rounded-card bg-forest p-5 text-surface shadow-lift sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
      />
      <p className="relative flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent">
        <Icon name="terminal" className="h-4 w-4" />
        {code.title || 'In code'}
      </p>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
        {code.panels.map((panel, i) => (
          <div
            key={`${panel.label}-${i}`}
            className={`overflow-hidden rounded-2xl border border-accent/20 bg-accent/10 ${
              code.panels.length === 1 ? 'sm:col-span-2' : ''
            }`}
          >
            <p className="border-b border-accent/20 px-4 py-2 font-mono text-[0.6875rem] tracking-tight text-accent">
              {panel.label}
            </p>
            <div className="space-y-0.5 px-4 py-3">
              {(panel.lines || []).map((line, j) => (
                <p
                  key={`${line}-${j}`}
                  className="whitespace-pre-wrap break-words font-mono text-[0.75rem] leading-relaxed text-mist"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {code.notes?.length > 0 && (
        <ul className="relative mt-5 grid gap-2 sm:grid-cols-2">
          {code.notes.map((note, i) => (
            <li key={`${note.code}-${i}`} className="flex items-start gap-2.5 text-[0.75rem] leading-relaxed text-mist/75">
              <code
                className="shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[0.6875rem] text-surface"
                style={{ backgroundColor: `${color}55` }}
              >
                {note.code}
              </code>
              {note.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* Key parts as a small hierarchy: the concept on top, tools branching below. */
/* ------------------------------------------------------------------------- */

export function PartsDiagram({ concept, color = '#0a7a4a', compact = false }) {
  const parts = (concept.technologies || []).slice(0, compact ? 4 : 6)
  if (parts.length < 2) return null

  // The compact version sits beside the opening paragraph, where there is room
  // for a list but not for a branching hierarchy — same data, same wording.
  if (compact) {
    return (
      <div className="rounded-card border border-hairline glass p-5 shadow-soft">
        <p className="eyebrow">Key parts</p>
        <p className="mt-2 text-sm text-muted">
          The pieces behind {concept.name}, and what each one does.
        </p>
        <ul className="mt-4 space-y-2">
          {parts.map((part, i) => {
            const role = roleForTechnology(part)
            return (
              <li
                key={`${part}-${i}`}
                className="flex animate-fade-up items-center gap-3 rounded-2xl border border-hairline bg-mist/40 px-3.5 py-2.5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-soft">
                  <Icon name={iconForTechnology(part)} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.8125rem] font-medium text-ink">{part}</span>
                  {role && (
                    <span className="block text-[0.6875rem] leading-snug text-muted">{role}</span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="rounded-card border border-hairline glass p-5 shadow-soft sm:p-7">
      <p className="eyebrow">Key parts</p>
      <p className="mt-2 text-sm text-muted">
        The pieces behind {concept.name}, and what each one does.
      </p>

      <div className="mt-6 flex flex-col items-center">
        <span
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-ink shadow-lift"
          style={{ background: `linear-gradient(140deg, ${color}, ${color}cc)` }}
        >
          <Icon name={concept.icon} className="h-4 w-4" />
          <span className="text-sm font-semibold">{concept.name}</span>
        </span>
        <span aria-hidden="true" className="h-4 w-px" style={{ backgroundColor: `${color}44` }} />
      </div>

      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -top-px left-8 right-8 hidden h-px sm:block"
          style={{ backgroundColor: `${color}33` }}
        />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part, i) => {
            const role = roleForTechnology(part)
            return (
              <div
                key={`${part}-${i}`}
                className="relative flex animate-fade-up items-center gap-3 rounded-2xl border border-hairline bg-mist/40 px-3.5 py-3"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 left-1/2 hidden h-2.5 w-px -translate-x-1/2 sm:block"
                  style={{ backgroundColor: `${color}33` }}
                />
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-soft">
                  <Icon name={iconForTechnology(part)} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.8125rem] font-medium text-ink">{part}</span>
                  {role && (
                    <span className="block text-[0.6875rem] leading-snug text-muted">{role}</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* The ecosystem at the bottom: what this concept plugs into.                */
/* ------------------------------------------------------------------------- */

export function EcosystemDiagram({ concept, related, color = '#0a7a4a' }) {
  const nodes = (related || []).slice(0, 4)
  if (nodes.length < 2) return null
  return (
    <div className="rounded-card border border-hairline bg-gradient-to-b from-mist/60 to-surface/80 p-5 shadow-soft sm:p-7">
      <div className="flex flex-col items-center">
        <span className="eyebrow">You are here</span>
        <span
          className="mt-2 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-ink shadow-lift"
          style={{ background: `linear-gradient(140deg, ${color}, ${color}cc)` }}
        >
          <Icon name={concept.icon} className="h-4 w-4" />
          <span className="text-sm font-semibold">{concept.name}</span>
        </span>
        <span aria-hidden="true" className="h-4 w-px" style={{ backgroundColor: `${color}44` }} />
      </div>

      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -top-px left-[10%] right-[10%] hidden h-px sm:block"
          style={{ backgroundColor: `${color}33` }}
        />
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {nodes.map((node, i) => {
            const nodeColor = getCategory(node.category)?.color || color
            const nodeCategory = getCategory(node.category)
            return (
              <li key={node.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 left-1/2 hidden h-2.5 w-px -translate-x-1/2 sm:block"
                  style={{ backgroundColor: `${color}33` }}
                />
                <Link
                  to={`/concept/${node.id}`}
                  className="flex h-full animate-fade-up flex-col items-center gap-2 rounded-2xl border glass px-3.5 py-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                  style={{ borderColor: `${nodeColor}33`, animationDelay: `${i * 60}ms` }}
                >
                  <span
                    className="grid h-9 w-9 place-items-center rounded-xl"
                    style={{ backgroundColor: `${nodeColor}26`, color: nodeColor }}
                  >
                    <Icon name={node.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <span className="text-[0.8125rem] font-semibold leading-snug text-ink">
                    {node.name}
                  </span>
                  {nodeCategory && (
                    <span
                      className="text-[0.625rem] font-medium uppercase tracking-[0.1em]"
                      style={{ color: nodeColor }}
                    >
                      {nodeCategory.name}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="mt-4 text-center text-[0.75rem] text-muted">
        Everything here is one click away — follow the line that interests you.
      </p>
    </div>
  )
}

/**
 * The path onward: this concept, then the concepts it links to in the order the
 * data lists them. Nothing is re-ordered and nothing is invented — the order is
 * the page's own, which is why every step is a concept that is already related
 * to this one rather than a guess at a curriculum.
 */
export function ProgressionTrail({ concept, related, color = '#0a7a4a' }) {
  const stops = (related || []).slice(0, 4)
  if (!stops.length) return null
  return (
    <div className="rounded-card border border-hairline glass p-5 shadow-soft sm:p-7">
      <p className="eyebrow flex items-center gap-2">
        <Icon name="route" className="h-3.5 w-3.5" />
        In the order this page lists them
      </p>

      <ol className="mt-5 flex flex-col items-stretch gap-1 lg:flex-row lg:gap-2">
        <li className="flex min-w-0 lg:flex-1">
          <span
            className="flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 shadow-lift"
            style={{ borderColor: `${color}66`, backgroundColor: `${color}1f` }}
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: `${color}26`, color }}
            >
              <Icon name={concept.icon} className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand">
                You are here
              </span>
              <span className="mt-0.5 block text-[0.875rem] font-semibold leading-snug text-ink">
                {concept.name}
              </span>
            </span>
          </span>
        </li>

        {stops.map((item, i) => {
          const itemColor = getCategory(item.category)?.color || color
          const itemCategory = getCategory(item.category)
          return (
            <Fragment key={item.id}>
              <li aria-hidden="true" className="flex justify-center lg:items-center">
                <Arrow color={color} size="sm" direction="rotate-90 lg:rotate-0" />
              </li>
              <li className="flex min-w-0 lg:flex-1">
                <Link
                  to={`/concept/${item.id}`}
                  className="flex w-full animate-fade-up items-center gap-3 rounded-2xl border glass px-4 py-3.5 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                  style={{ borderColor: `${itemColor}33`, animationDelay: `${i * 60}ms` }}
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-xl"
                    style={{ backgroundColor: `${itemColor}26`, color: itemColor }}
                  >
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand">
                      Next {i + 1}
                    </span>
                    <span className="mt-0.5 block text-[0.875rem] font-semibold leading-snug text-ink">
                      {item.name}
                    </span>
                    {itemCategory && (
                      <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted">
                        {itemCategory.name}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* Where this fits: the running system as a ladder, with the reader on it.   */
/* ------------------------------------------------------------------------- */

/** A small chip for another concept, coloured by that concept's own category. */
function NeighbourChip({ item }) {
  const color = getCategory(item.category)?.color || '#0a7a4a'
  return (
    <Link
      to={`/concept/${item.id}`}
      className="inline-flex items-center gap-2 rounded-full border glass px-3 py-1.5 text-[0.8125rem] font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      style={{ borderColor: `${color}44` }}
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md" style={{ backgroundColor: `${color}26`, color }}>
        <Icon name={item.icon} className="h-3 w-3" />
      </span>
      {item.name}
    </Link>
  )
}

/**
 * The ladder: the four levels of a running system, from what people touch down
 * to the machines underneath, with this concept standing on its own rung. The
 * engine only builds one when a concept it relates to sits on a different rung,
 * so the picture is never a single line pretending to be a stack.
 */
export function FitLadder({ levels = [], caption, concept, color = '#0a7a4a' }) {
  if (!concept || levels.length < 2) return null
  return (
    <figure className="m-0">
      <div className="glass rounded-card border border-hairline p-5 shadow-soft sm:p-7">
        <p className="eyebrow flex items-center gap-2">
          <Icon name="layers" className="h-3.5 w-3.5" />
          A running system, top to bottom
        </p>

        <ol className="mt-5">
          {levels.map((level, i) => (
            <li key={level.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div
                className={`rounded-2xl border px-4 py-3.5 ${level.here ? 'shadow-lift' : 'border-hairline bg-mist/30'}`}
                style={level.here ? { borderColor: `${color}66`, backgroundColor: `${color}1f` } : undefined}
              >
                <p
                  className={`flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] ${
                    level.here ? 'text-brand' : 'text-muted'
                  }`}
                >
                  <Icon name={level.icon} className="h-3.5 w-3.5" />
                  {level.label}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  {level.here && (
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-lift"
                      style={{ background: `linear-gradient(140deg, ${color}, ${color}cc)` }}
                    >
                      <Icon name={concept.icon} className="h-3.5 w-3.5" />
                      {concept.name}
                      <span className="rounded-full bg-surface/85 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.12em] text-forest">
                        You are here
                      </span>
                    </span>
                  )}
                  {level.items.map((item) => (
                    <NeighbourChip key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {i < levels.length - 1 && (
                <span className="flex justify-center py-1">
                  <Arrow color={color} direction="down" />
                </span>
              )}
            </li>
          ))}
        </ol>

        {caption && (
          <figcaption className="mt-5 flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted">
            <Icon name="sparkles" className="mt-px h-3.5 w-3.5 shrink-0" style={{ color }} />
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------- */
/* Remember — the page in a handful of scannable facts.                     */
/* ------------------------------------------------------------------------- */

/**
 * The recap at the end of the page: four or five cards, each one an icon, a
 * label and a line. Every fact is lifted from a section the reader has just
 * been through, so the recap can only ever repeat the page, never add a claim
 * that nothing else on it supports.
 */
export function RememberRecap({ facts = [], color = '#0a7a4a' }) {
  if (facts.length < 3) return null
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact, i) => (
        <li
          key={`${fact.label}-${i}`}
          className="flex animate-fade-up items-center gap-3.5 rounded-card border border-hairline glass px-4 py-4 shadow-soft"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <IconTile name={fact.icon} color={color} size="lg" />
          <span className="min-w-0">
            <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">
              {fact.label}
            </span>
            {fact.note && (
              <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">{fact.note}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** The analogy panel keeps its quote treatment, with an icon that matches it. */
export function analogyGlyphIcon(analogy) {
  return analogyIcon(analogy, 'bulb')
}
