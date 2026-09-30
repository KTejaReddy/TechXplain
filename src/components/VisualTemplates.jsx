import { Fragment } from 'react'
import Icon from './Icon.jsx'
import { Arrow, DetailCard, StepControl, useStepper } from './Interactive.jsx'

/**
 * VisualTemplates — the expanding library of diagram shapes the visual engine
 * can draw for a concept.
 *
 * Every template here is deliberately dumb: it takes a small, plain data shape
 * and renders it. Deciding *which* template suits a concept, and filling it
 * with that concept's own words, is the job of src/data/visual-plan.js. Keeping
 * the two apart is what lets one component serve “Docker”, “DNS” and “Bcrypt”
 * without any of them knowing about the others.
 *
 * Design rules shared with the rest of the site: bright green glass, a moving
 * dash on every connector so direction reads at a glance, and a caption so the
 * diagram still teaches if nobody reads the paragraph next to it.
 *
 * One template is *explorable*: the pipeline strip, which is the whole process
 * in a row. There the reader can pick a stage and it explains itself in place —
 * one control, one panel, nothing that runs on its own. Only explorable
 * diagrams carry the travelling bead on their connector; a bead on every arrow
 * would turn a page of diagrams into a fairground.
 */

/* ------------------------------------------------------------------ */
/* Shared little parts                                                 */
/* ------------------------------------------------------------------ */

function Tile({ icon, color, size = 'md' }) {
  const box = size === 'sm' ? 'h-7 w-7 rounded-lg' : size === 'lg' ? 'h-11 w-11 rounded-2xl' : 'h-9 w-9 rounded-xl'
  const glyph = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-[1.125rem] w-[1.125rem]'
  return (
    <span
      className={`grid shrink-0 place-items-center ${box}`}
      style={{ backgroundColor: `${color}26`, color }}
    >
      <Icon name={icon || 'sparkles'} className={glyph} />
    </span>
  )
}

function Caption({ children, color = '#0a7a4a' }) {
  if (!children) return null
  return (
    <figcaption className="mt-5 flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted">
      <Icon name="sparkles" className="mt-px h-3.5 w-3.5 shrink-0" style={{ color }} />
      {children}
    </figcaption>
  )
}

function Panel({ children, className = '' }) {
  return (
    <div className={`glass rounded-card border border-hairline shadow-soft ${className}`}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Pipeline — a process as a run of stages                          */
/* ------------------------------------------------------------------ */

/**
 * The shape of a process, left to right: build → test → deploy → monitor.
 * Used above the numbered walkthrough so the whole run is visible in one look.
 *
 * This is the one explorable diagram: every stage is a button, the control steps
 * forward and back, and the panel underneath explains whichever stage is
 * selected using that stage's own sentence. The strip stays readable if nobody
 * touches it — the numbered walkthrough is still right below.
 */
export function PipelineStrip({ stages = [], color = '#0a7a4a', caption, note, activeIndex, onSelect }) {
  // Controlled when the page shares the selection with its walkthrough, and
  // self-contained when nothing else needs to follow along.
  const { index, total, select, next, prev } = useStepper(stages.length, {
    index: activeIndex,
    onChange: onSelect,
  })
  if (stages.length < 3) return null
  const current = stages[index]
  const row = stages.length <= 4 ? 'lg:grid-cols-4' : stages.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-3'
  return (
    <figure className="m-0">
      <Panel className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow flex items-center gap-2">
            <Icon name="cycle" className="h-3.5 w-3.5" />
            The whole process
          </p>
          {stages.length > 1 && (
            <StepControl
              index={index}
              total={total}
              onPrev={prev}
              onNext={next}
              label="Stage"
            />
          )}
        </div>

        <ol className={`mt-5 grid gap-2 sm:grid-cols-2 lg:gap-4 ${row}`}>
          {stages.map((stage, i) => {
            const isCurrent = i === index
            return (
              <li
                key={`${stage.label}-${i}`}
                className="relative flex animate-fade-up items-center gap-2 lg:block"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Stage ${i + 1}: ${stage.label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`flex w-full min-w-0 flex-1 items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition duration-300 ${
                    isCurrent
                      ? 'shadow-lift'
                      : 'glass border-hairline hover:border-accent/50 hover:shadow-soft'
                  }`}
                  style={
                    isCurrent ? { borderColor: `${color}66`, backgroundColor: `${color}1f` } : undefined
                  }
                >
                  {/* Faded with opacity the digits lost their contrast, so an
                      unselected stage borrows the number chip from the
                      walkthrough below; the selected one takes the accent. */}
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.625rem] font-bold transition duration-300 ${
                      isCurrent ? 'text-ink' : 'border border-accent/40 bg-mist text-forest'
                    }`}
                    style={isCurrent ? { backgroundColor: color } : undefined}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.8125rem] font-semibold leading-snug text-ink">
                      {stage.label}
                    </span>
                    {stage.note && (
                      <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted">
                        {stage.note}
                      </span>
                    )}
                  </span>
                </button>
                {i < stages.length - 1 ? (
                  <>
                    {/* Stacked, the arrow travels down beside its own card… */}
                    <span className="lg:hidden">
                      <Arrow color={color} direction="down" active={isCurrent} />
                    </span>
                    {/* …and side by side, it sits in the gap between this card
                        and the next, so the run reads left to right. */}
                    <span className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                      <Arrow color={color} active={isCurrent} />
                    </span>
                  </>
                ) : (
                  /* The last card reserves the same arrow slot, so every stage
                     comes out the same width when stacked. */
                  <span className="w-4 shrink-0 lg:hidden" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>

        {current && (
          <div className="mt-5">
            {/* Remounted per stage so each selection animates in rather than
                quietly swapping its text.

                The panel leads with the stage's own sentence rather than its
                short label: the labels are derived by keyword, so “Screen” can
                label a step that is really about asking a resolver. The label
                stays as the tag line, where it matches the card just picked. */}
            <DetailCard
              key={index}
              icon={current.icon}
              color={color}
              eyebrow={`Stage ${index + 1} of ${total} · ${current.label}`}
              title={current.text}
            />
          </div>
        )}

        {note && <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
      </Panel>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* 2. FlowChain — input → process → output, or a chain of hops          */
/* ------------------------------------------------------------------ */

/**
 * Three framings of the same idea — a run of stops with something happening at
 * each one — so the engine can label a chain as a transformation, a journey
 * across devices, or a call that goes out and comes back.
 */
const CHAIN_FRAMES = {
  network: { eyebrow: 'The path it takes', lead: 'Starts at', mid: 'Passes through', tail: 'Ends at' },
}

export function FlowChain({ variant = 'network', stops = [], color = '#0a7a4a', caption, note }) {
  const frame = CHAIN_FRAMES[variant] || CHAIN_FRAMES.network
  if (stops.length < 2) return null
  // Only the first middle stop takes the frame's own wording — repeating it
  // down a long chain reads like a rendering fault.
  const stageName = (i, total) =>
    i === 0 ? frame.lead : i === total - 1 ? frame.tail : i === 1 ? frame.mid : 'Then'

  return (
    <figure className="m-0">
      <Panel className="p-5 sm:p-7">
        <p className="eyebrow flex items-center gap-2">
          <Icon name="flow" className="h-3.5 w-3.5" />
          {frame.eyebrow}
        </p>

        <ol className="mt-5 space-y-1">
          {stops.map((stop, i, all) => (
            <li
              key={`${stop.label}-${i}`}
              className="flex animate-fade-up flex-col"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-4 rounded-2xl border border-hairline glass px-4 py-3.5">
                <Tile icon={stop.icon} color={color} size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand">
                    {stageName(i, all.length)}
                  </p>
                  <p className="mt-0.5 text-[0.9375rem] font-semibold leading-snug text-ink">
                    {stop.label}
                  </p>
                  {stop.note && (
                    <p className="mt-1 text-[0.8125rem] leading-snug text-muted">{stop.note}</p>
                  )}
                </div>
                {stop.badge && (
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wide text-ink"
                    style={{ backgroundColor: color }}
                  >
                    {stop.badge}
                  </span>
                )}
              </div>
              {i < all.length - 1 && (
                <span className="flex justify-center py-0.5">
                  <Arrow color={color} direction="down" label={all[i].arrow} />
                </span>
              )}
            </li>
          ))}
        </ol>

        {note && <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
      </Panel>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* 3. LayerStack — a system as stacked levels                          */
/* ------------------------------------------------------------------ */

/**
 * Layers read best as slabs you could lift off one at a time, so the top of
 * the stack gets the highlight and the depth comes from the spacing between
 * them rather than from boxes inside boxes.
 */
export function LayerStack({ layers = [], color = '#0a7a4a', caption, note }) {
  if (layers.length < 3) return null
  return (
    <figure className="m-0">
      <Panel className="p-5 sm:p-7">
        <p className="eyebrow flex items-center gap-2">
          <Icon name="layers" className="h-3.5 w-3.5" />
          {layers.length} layers, top to bottom
        </p>

        <ol className="mt-5 space-y-2.5">
          {layers.map((layer, i) => (
            <li
              key={`${layer.label}-${i}`}
              className="flex animate-fade-up items-center gap-4 rounded-2xl border px-4 py-3.5 shadow-soft"
              style={{
                animationDelay: `${i * 55}ms`,
                borderColor: i === 0 ? `${color}55` : '#a3e6c6',
                background: i === 0 ? `${color}24` : `#f1fef7`,
                marginLeft: `${i * 0.75}rem`,
                marginRight: `${i * 0.75}rem`,
              }}
            >
              <Tile icon={layer.icon} color={i === 0 ? color : '#3f6b55'} />
              <div className="min-w-0 flex-1">
                <p className="text-[0.9375rem] font-semibold leading-snug text-ink">{layer.label}</p>
                {layer.note && (
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{layer.note}</p>
                )}
              </div>
              <span className="shrink-0 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted">
                L{layers.length - i}
              </span>
            </li>
          ))}
        </ol>

        {note && <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
      </Panel>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* 4. ArchitectureMap — tiers of components that talk to each other    */
/* ------------------------------------------------------------------ */

/**
 * An infrastructure picture: a spine of tiers, each holding the components
 * that live at that level, so “who talks to whom” is visible without a legend.
 */
export function ArchitectureMap({ tiers = [], color = '#0a7a4a', caption, note }) {
  if (tiers.length < 2) return null
  return (
    <figure className="m-0">
      <Panel className="p-5 sm:p-7">
        <p className="eyebrow flex items-center gap-2">
          <Icon name="network" className="h-3.5 w-3.5" />
          How the pieces stack up
        </p>

        <div className="mt-6">
          {tiers.map((tier, i) => (
            <div key={tier.label || i} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex flex-col items-center gap-3">
                <div className="flex w-full flex-wrap items-center justify-center gap-2.5">
                  {tier.items.map((item, j) => (
                    <span
                      key={`${item.label}-${j}`}
                      className="flex min-w-[9rem] flex-1 items-center gap-3 rounded-2xl border border-hairline glass px-3.5 py-3 shadow-soft sm:min-w-[10rem] sm:max-w-[16rem] sm:flex-none"
                    >
                      <Tile icon={item.icon} color={color} />
                      <span className="min-w-0">
                        <span className="block text-[0.8125rem] font-semibold leading-snug text-ink">
                          {item.label}
                        </span>
                        {item.note && (
                          <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted">
                            {item.note}
                          </span>
                        )}
                      </span>
                    </span>
                  ))}
                </div>
                {tier.label && (
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    {tier.label}
                  </span>
                )}
              </div>

              {i < tiers.length - 1 && (
                <div className="flex justify-center py-2">
                  <Arrow color={color} direction="down" />
                </div>
              )}
            </div>
          ))}
        </div>

        {note && <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
      </Panel>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* 5. GateFlow — a decision with two visible outcomes                  */
/* ------------------------------------------------------------------ */

/** A checkpoint: something arrives, it is judged, and it is let through or not. */
export function GateFlow({ subject, checks = [], allow, deny, color = '#0a7a4a', caption }) {
  if (!allow) return null
  return (
    <figure className="m-0">
      <Panel className="p-5 sm:p-7">
        <p className="eyebrow flex items-center gap-2">
          <Icon name="shieldCheck" className="h-3.5 w-3.5" />
          The checks before the door opens
        </p>

        {subject && (
          <p className="mt-4 flex items-center gap-3 rounded-2xl border border-hairline glass px-4 py-3">
            <Tile icon={subject.icon || 'send'} color={color} />
            <span className="text-[0.9375rem] font-medium leading-snug text-ink">{subject.label}</span>
          </p>
        )}

        <div className="flex justify-center py-1.5">
          <Arrow color={color} direction="down" />
        </div>

        {checks.length > 0 && (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((check, i) => (
              <li
                key={`${check.label}-${i}`}
                className="flex animate-fade-up items-center gap-2.5 rounded-2xl border border-hairline px-3.5 py-2.5"
                style={{ backgroundColor: `${color}14` }}
              >
                <Icon name={check.icon || 'checkCircle'} className="h-4 w-4 shrink-0" style={{ color }} />
                <span className="min-w-0 text-[0.8125rem] font-medium leading-snug text-ink">
                  {check.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-center py-1.5">
          <Arrow color={color} direction="down" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-hairline px-4 py-3.5" style={{ backgroundColor: `${color}1a` }}>
            <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
              <Icon name="checkCircle" className="h-3.5 w-3.5" />
              Let through
            </p>
            <p className="mt-1.5 text-[0.875rem] font-medium leading-snug text-ink">{allow}</p>
          </div>
          <div className="rounded-2xl border border-hairline bg-mist px-4 py-3.5">
            <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-forest">
              <Icon name="alert" className="h-3.5 w-3.5" />
              Stopped
            </p>
            <p className="mt-1.5 text-[0.875rem] font-medium leading-snug text-ink">
              {deny || 'The request is refused before it reaches anything.'}
            </p>
          </div>
        </div>
      </Panel>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* 6. DataTable — an actual table, not a picture of one                */
/* ------------------------------------------------------------------ */

/**
 * Some ideas are only clear once you see the rows. Nothing here is invented:
 * every table is written by hand in the lesson data for the concept it belongs to.
 */
export function DataTable({ title, columns = [], rows = [], keyColumn, caption, note }) {
  if (!columns.length || !rows.length) return null
  return (
    <figure className="m-0">
      <Panel className="overflow-hidden">
        {title && (
          <p className="flex items-center gap-2 border-b border-hairline px-5 py-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand">
            <Icon name="table" className="h-3.5 w-3.5" />
            {title}
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.8125rem]">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="whitespace-nowrap border-b border-hairline px-4 py-2.5 font-semibold text-ink"
                  >
                    {column === keyColumn && <Icon name="key" className="mr-1.5 -mt-0.5 inline h-3.5 w-3.5 text-brand" />}
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="odd:bg-mist/40">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`border-b border-hairline/70 px-4 py-2.5 align-top ${
                        columns[j] === keyColumn ? 'font-medium text-ink' : 'text-muted'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {note && <p className="px-5 py-3.5 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
      </Panel>
      <Caption color="#0a7a4a">{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* 7. InputProcessOutput — the three beats of a process                */
/* ------------------------------------------------------------------ */

/**
 * Input → process → output, for the concepts that really are a transformation:
 * a compiler, a queue, an index, a model. It only ever renders where the data
 * already says what goes in and what comes out, and it is the one diagram on a
 * page allowed to show a value rather than a name — a request line, a query.
 */
export function InputProcessOutput({ input, process, output, caption, note, color = '#0a7a4a' }) {
  if (!input?.label || !output?.label) return null
  const tiles = [
    { kind: 'Input', data: input },
    { kind: 'Process', data: process, tone: 'brand' },
    { kind: 'Output', data: output },
  ]
  return (
    <figure className="m-0">
      <Panel className="p-5 sm:p-7">
        <p className="eyebrow flex items-center gap-2">
          <Icon name="refresh" className="h-3.5 w-3.5" />
          Input → process → output
        </p>

        <div className="mt-5 flex flex-col items-stretch gap-1 lg:flex-row lg:items-stretch lg:gap-3">
          {tiles.map((tile, i) => (
            <Fragment key={tile.kind}>
              {i > 0 && (
                <>
                  <span className="flex justify-center lg:hidden">
                    <Arrow color={color} direction="down" />
                  </span>
                  <span className="hidden items-center lg:flex">
                    <Arrow color={color} />
                  </span>
                </>
              )}
              <BandCard {...tile} color={color} />
            </Fragment>
          ))}
        </div>

        {note && <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{note}</p>}
      </Panel>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}

/** One tile of the band: the stage’s name, and its real value if it has one. */
function BandCard({ kind, data, tone = 'default', color }) {
  const isBrand = tone === 'brand'
  return (
    <div
      className={`min-w-0 flex-1 animate-fade-up rounded-2xl border px-4 py-3.5 shadow-soft ${
        isBrand ? '' : 'glass'
      }`}
      style={{
        borderColor: isBrand ? `${color}66` : '#a3e6c6',
        backgroundColor: isBrand ? `${color}1f` : undefined,
      }}
    >
      <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand">
        <span
          className="grid h-5 w-5 shrink-0 place-items-center rounded-md"
          style={{ backgroundColor: `${color}26`, color }}
        >
          <Icon name={data.icon || 'sparkles'} className="h-3 w-3" />
        </span>
        {kind}
      </p>
      <p className="mt-2 text-[0.9375rem] font-semibold leading-snug text-ink">{data.label}</p>
      {data.value && (
        <p
          className={`mt-2 break-words rounded-lg bg-mist/60 px-2.5 py-1.5 text-[0.75rem] leading-snug text-ink/80 ${
            data.mono ? 'font-mono' : ''
          }`}
        >
          {data.value}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 8. CodeToVisual — a snippet, what it does, and what comes out        */
/* ------------------------------------------------------------------ */

/**
 * The bridge between code and result: the snippet, then the short list of
 * things it does, then the value it produces. Reading the result first is what
 * makes the code land for a beginner.
 */
export function CodeToVisual({ title, code, steps = [], result, color = '#0a7a4a', caption }) {
  if (!code) return null
  return (
    <figure className="m-0">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative overflow-hidden rounded-card bg-forest p-5 text-surface shadow-lift sm:p-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
          />
          <p className="relative flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent">
            <Icon name="terminal" className="h-3.5 w-3.5" />
            {code.label || title || 'The code'}
          </p>
          <pre className="relative mt-4 overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-mist">
            <code>{code.lines.join('\n')}</code>
          </pre>
        </div>

        <div className="flex flex-col gap-3">
          {steps.length > 0 && (
            <ol className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <li
                  key={`${step.label}-${i}`}
                  className="flex animate-fade-up items-start gap-3 rounded-2xl border border-hairline glass px-3.5 py-3"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <Tile icon={step.icon || 'flow'} color={color} size="sm" />
                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] font-semibold leading-snug text-ink">
                      {step.label}
                    </span>
                    {step.note && (
                      <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">
                        {step.note}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {result && (
            <>
              <span className="flex justify-center">
                <Arrow color={color} direction="down" />
              </span>
              <div
                className="rounded-2xl border px-4 py-3.5 shadow-soft"
                style={{ borderColor: `${color}55`, backgroundColor: `${color}1a` }}
              >
                <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-brand">
                  <Icon name="checkCircle" className="h-3.5 w-3.5" />
                  {result.label || 'What you get'}
                </p>
                <p className="mt-1.5 font-mono text-[0.875rem] font-medium leading-snug text-ink">
                  {result.value}
                </p>
                {result.note && (
                  <p className="mt-1.5 text-[0.75rem] leading-snug text-muted">{result.note}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Caption color={color}>{caption}</Caption>
    </figure>
  )
}
