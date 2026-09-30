import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { Arrow } from './Interactive.jsx'

/**
 * ConceptVisual draws every diagram in the site with plain HTML, CSS and inline SVG.
 * No images, no external services — the visuals are data-driven from the concept data.
 *
 * Supported visual types: 'flow', 'stack', 'compare', 'hub', 'cycle'.
 * Every diagram keeps a caption, so the idea lands even if nobody reads the paragraph.
 *
 * A diagram can also be *interactive*: a node that names another concept becomes
 * a link to it, and a node that names this concept becomes a button that selects
 * itself so the panel underneath can explain it. Which is which is decided by
 * the visual engine from the labels themselves — never guessed here — so a node
 * that is not recognised simply stays plain text.
 *
 * Diagrams are laid out against their own width, not the window's. The hero sits
 * in a column beside the opening paragraph, which is far narrower than the page,
 * so a flow that would fit across a full-width section stays stacked in the hero
 * — the same five stops, in the room they actually have.
 */

/*
 * The direction classes a flow switches between, spelled out so Tailwind can
 * see them. A stack of stops becomes a row when the *container* is wide enough
 * — the hero sits in a column, so its width is the page's minus the paragraph
 * beside it, not the window's.
 *
 * The thresholds are content-box measurements: a card with 2rem of padding on
 * each side queries 4rem narrower than it looks, which is why four stops turn
 * into a row at 32rem rather than at 36rem.
 *
 * While a flow is stacked, each stop is drawn as a row — icon, then label — so
 * the list reads like a table of contents. Once it lies across, the same stop
 * becomes a centred card with the icon above its label.
 */
const STACKED = 'flex-row items-center gap-3 px-4 py-3 text-left'
const ACROSS = 'flex-col items-center gap-2 px-3 py-3.5 text-center'

const ROW_4 = {
  wrap: '@lg:flex-row',
  cell: '@lg:flex-1',
  rotate: 'rotate-90 @lg:rotate-0',
  centre: '@lg:items-center',
  spacer: 'hidden @lg:block @lg:w-5',
  node: '@lg:flex-col @lg:items-center @lg:gap-2 @lg:px-3 @lg:py-3.5 @lg:text-center @lg:min-w-[6.5rem]',
}
const ROW_5 = {
  wrap: '@4xl:flex-row',
  cell: '@4xl:flex-1',
  rotate: 'rotate-90 @4xl:rotate-0',
  centre: '@4xl:items-center',
  spacer: 'hidden @4xl:block @4xl:w-5',
  node: '@4xl:flex-col @4xl:items-center @4xl:gap-2 @4xl:px-3 @4xl:py-3.5 @4xl:text-center @4xl:min-w-[6.5rem]',
}
const ROW_LABELLED = {
  wrap: '@3xl:flex-row',
  cell: '@3xl:flex-1',
  rotate: 'rotate-90 @3xl:rotate-0',
  centre: '@3xl:items-center',
  spacer: 'hidden @3xl:block @3xl:w-[5rem]',
  node: '@3xl:flex-col @3xl:items-center @3xl:gap-2 @3xl:px-3 @3xl:py-3.5 @3xl:text-center @3xl:min-w-[6.5rem]',
}

export default function ConceptVisual({
  visual,
  color = '#0a7a4a',
  className = '',
  links,
  hero,
  activeNode,
  onSelectNode,
  captionLabel,
  size = 'default',
}) {
  if (!visual) return null

  const big = size === 'hero'
  const shared = { hero, activeNode, onSelectNode, size }

  return (
    <figure className={`w-full ${className}`}>
      <div
        className={`glass sheen lift-3d @container relative overflow-hidden rounded-card border border-hairline shadow-lift ${
          big ? 'p-5 sm:p-7 lg:p-8' : 'p-5 sm:p-7'
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}44, transparent)` }}
        />
        {visual.type === 'flow' && <FlowDiagram visual={visual} color={color} links={links} {...shared} />}
        {visual.type === 'stack' && <StackDiagram visual={visual} color={color} {...shared} />}
        {visual.type === 'compare' && <CompareDiagram visual={visual} color={color} />}
        {visual.type === 'hub' && <HubDiagram visual={visual} color={color} {...shared} />}
        {visual.type === 'cycle' && <CycleDiagram visual={visual} color={color} {...shared} />}
      </div>

      {/* The hero's caption is the answer to “what's happening?” — a proper line
          of prose beside the label, not a whisper under the picture. Everywhere
          else a diagram is captioned quietly, because the section around it
          already carries the explanation. */}
      {visual.caption &&
        (captionLabel ? (
          <figcaption className="mt-3 flex flex-col gap-1.5 rounded-2xl border border-hairline bg-mist/50 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="eyebrow inline-flex shrink-0 items-center gap-1.5">
              <Icon name="eye" className="h-3.5 w-3.5" />
              {captionLabel}
            </span>
            <span className="text-[0.9375rem] leading-relaxed text-ink/85">{visual.caption}</span>
          </figcaption>
        ) : (
          <figcaption className="mt-3.5 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 px-2 text-center text-xs leading-relaxed text-muted">
            <Icon name="sparkles" className="mt-px h-3.5 w-3.5 shrink-0 text-accent" />
            {visual.caption}
          </figcaption>
        ))}
    </figure>
  )
}

/*
 * One element decides how a node behaves, so every diagram shape behaves the
 * same way: a link out, a button that selects, or plain text.
 */
function Interactive({ label, link, isActive, onSelect, selectable, className, style, children }) {
  const shared = {
    className: `${className} ${isActive ? 'ring-2 ring-accent/40' : ''}`,
    style,
  }
  if (link?.kind === 'concept') {
    return (
      <Link
        to={`/concept/${link.id}`}
        aria-label={`${label} — open the ${link.name} concept`}
        {...shared}
      >
        {children}
      </Link>
    )
  }
  if (link?.kind === 'self' || selectable) {
    return (
      <button
        type="button"
        aria-pressed={isActive}
        onClick={() => onSelect?.(label)}
        {...shared}
      >
        {children}
      </button>
    )
  }
  return <div {...shared}>{children}</div>
}

/** The corner mark that says “this one goes somewhere”. */
function OpenMark({ color }) {
  return (
    <span
      aria-hidden="true"
      className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full"
      style={{ backgroundColor: `${color}26`, color }}
    >
      <Icon name="arrowRight" className="h-2.5 w-2.5" />
    </span>
  )
}

function Node({
  icon,
  label,
  note,
  color,
  tone = 'default',
  step,
  layout = ACROSS,
  size = 'default',
  link,
  isActive,
  onSelect,
  selectable,
}) {
  const isBrand = tone === 'brand'
  const big = size === 'hero'
  const tile = big ? 'h-11 w-11 rounded-2xl' : 'h-9 w-9 rounded-xl'
  const glyph = big ? 'h-5 w-5' : 'h-[1.125rem] w-[1.125rem]'
  const title = big ? 'text-[0.875rem]' : 'text-[0.8125rem]'
  const interactive = link?.kind === 'concept' || link?.kind === 'self' || selectable
  return (
    <Interactive
      label={label}
      link={link}
      isActive={isActive}
      onSelect={onSelect}
      selectable={selectable}
      className={`group relative flex flex-1 rounded-2xl border glass transition duration-300 ${
        isActive ? 'shadow-lift' : 'hover:-translate-y-0.5 hover:shadow-soft'
      } ${interactive ? 'cursor-pointer' : ''} ${layout}`}
      style={{
        borderColor: isActive ? color : isBrand ? `${color}55` : '#a3e6c6',
        background: isActive ? `${color}26` : isBrand ? `${color}18` : '#f1fef7',
      }}
    >
      {step != null && (
        <span
          className="absolute -top-2 -left-2 grid h-5 w-5 place-items-center rounded-full text-[0.625rem] font-semibold text-ink shadow-soft"
          style={{ backgroundColor: isBrand ? color : '#12b877' }}
        >
          {step}
        </span>
      )}
      {link?.kind === 'concept' && <OpenMark color={color} />}
      <span
        className={`grid shrink-0 place-items-center transition-transform duration-300 group-hover:scale-105 ${tile}`}
        style={{ backgroundColor: `${color}26`, color }}
      >
        <Icon name={icon || 'sparkles'} className={glyph} />
      </span>
      <span className="min-w-0">
        <span className={`block font-medium leading-snug text-ink ${title}`}>{label}</span>
        {note && (
          <span className={`block leading-snug text-muted ${big ? 'text-[0.75rem]' : 'text-[0.6875rem]'}`}>
            {note}
          </span>
        )}
      </span>
    </Interactive>
  )
}

/* Chain of boxes: the request/response style diagram. */
function FlowDiagram({ visual, color, links, hero, activeNode, onSelectNode, size }) {
  const nodes = visual.nodes || []
  // A labelled flow needs room for the words between the cards, so it becomes a
  // row only once the container really has the width for it.
  const labelled = Array.isArray(links) && links.some(Boolean)
  // Five labelled stops never fit across a page, so they stay rows down the page.
  const frame = labelled
    ? nodes.length <= 4
      ? ROW_LABELLED
      : null
    : nodes.length <= 4
      ? ROW_4
      : ROW_5
  const stack = 'flex flex-col items-stretch gap-1'
  const row = frame ? frame.wrap : ''
  const cell = `flex min-w-0 animate-fade-up flex-col items-stretch ${frame ? `${frame.wrap} ${frame.cell}` : ''}`
  // Stacked, a stop is a row of icon and label; across, it becomes a card.
  const layout = frame ? `${STACKED} ${frame.node}` : STACKED
  return (
    <div className={`${stack} ${row}`}>
      {nodes.map((node, i) => (
        <div key={`${node.label}-${i}`} className={cell} style={{ animationDelay: `${i * 70}ms` }}>
          <Node
            {...node}
            color={color}
            step={i + 1}
            tone={i === 0 ? 'brand' : 'default'}
            layout={layout}
            size={size}
            link={hero?.links?.[node.label]}
            isActive={!!activeNode && activeNode === node.label}
            onSelect={onSelectNode}
            selectable={hero?.selectable?.includes(node.label)}
          />
          {i < nodes.length - 1 && (
            <Arrow
              color={color}
              label={links?.[i]}
              direction={frame ? frame.rotate : 'rotate-90'}
              className={frame ? frame.centre : ''}
            />
          )}
          {/* Keep the last card the same width as the others in a row: it
              reserves the slot the arrows on the other cards are using. */}
          {labelled && i === nodes.length - 1 && frame && (
            <span className={`shrink-0 ${frame.spacer}`} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}

/* Stacked layers: great for anything with “layers”. */
function StackDiagram({ visual, color, hero, activeNode, onSelectNode, size }) {
  return (
    <div className={`mx-auto flex w-full flex-col gap-2 ${size === 'hero' ? 'max-w-xl' : 'max-w-lg'}`}>
      {(visual.items || []).map((item, i) => {
        const isBrand = item.tone === 'brand'
        const link = hero?.links?.[item.label]
        const isActive = !!activeNode && activeNode === item.label
        return (
          <Interactive
            key={`${item.label}-${i}`}
            label={item.label}
            link={link}
            isActive={isActive}
            onSelect={onSelectNode}
            selectable={hero?.selectable?.includes(item.label)}
            className="relative flex animate-fade-up items-center gap-3.5 overflow-hidden rounded-2xl border border-hairline glass pr-4 transition duration-300 hover:translate-x-1 hover:shadow-soft"
            style={{
              background: isBrand ? `${color}1a` : '#f1fef7',
              animationDelay: `${i * 70}ms`,
            }}
          >
            <span
              className="h-full w-1.5 shrink-0 self-stretch"
              style={{ backgroundColor: isBrand ? color : '#12b877' }}
            />
            <span className={`py-3.5 font-medium text-ink ${size === 'hero' ? 'text-[0.9375rem]' : 'text-sm'}`}>
              {item.label}
            </span>
            {link?.kind === 'concept' && <OpenMark color={color} />}
            {item.note && (
              <span
                className="ml-auto text-right text-xs"
                style={{ color: isBrand ? color : '#3f6b55' }}
              >
                {item.note}
              </span>
            )}
          </Interactive>
        )
      })}
    </div>
  )
}

/* Two panels side by side: good vs bad, library vs framework. */
function CompareDiagram({ visual, color }) {
  const panels = [visual.left, visual.right].filter(Boolean)

  return (
    <div className="relative grid gap-3 sm:grid-cols-2">
      {panels.map((panel, i) => {
        const isSecond = i === 1
        return (
          <div
            key={`${panel.title}-${i}`}
            className="animate-fade-up rounded-2xl border glass p-5"
            style={{
              borderColor: isSecond ? `${color}44` : '#a3e6c6',
              background: isSecond ? `${color}16` : '#f1fef7',
              animationDelay: `${i * 90}ms`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl"
                style={{
                  backgroundColor: isSecond ? `${color}26` : '#c9f5dd',
                  color: isSecond ? color : '#0a7a4a',
                }}
              >
                <Icon name={panel.icon || 'sparkles'} className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-ink">{panel.title}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {(panel.points || []).map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[0.8125rem] text-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: isSecond ? color : '#12b877' }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
      {panels.length === 2 && (
        <span className="absolute left-1/2 top-1/2 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-hairline glass text-[0.625rem] font-semibold uppercase tracking-wide text-muted shadow-soft sm:grid">
          vs
        </span>
      )}
    </div>
  )
}

/* One centre node with a few things around it. */
function HubDiagram({ visual, color, hero, activeNode, onSelectNode, size }) {
  const satellites = visual.satellites || []
  const center = visual.center || {}
  const shared = { hero, activeNode, onSelectNode, size }
  const corner = (index) =>
    satellites[index] ? (
      <HubNode {...satellites[index]} color={color} delay={index * 70} {...shared} />
    ) : (
      <span className="hidden sm:block" />
    )
  const centerLink = hero?.links?.[center.label]

  return (
    <div className="mx-auto grid max-w-md grid-cols-3 items-center justify-items-center gap-2 sm:gap-4">
      {corner(0)}
      <span className="hidden sm:block" />
      {corner(1)}
      <span className="hidden sm:block" />
      <Interactive
        label={center.label}
        link={centerLink}
        isActive={!!activeNode && activeNode === center.label}
        onSelect={onSelectNode}
        selectable={hero?.selectable?.includes(center.label)}
        className="relative grid h-24 w-24 animate-fade-up place-items-center rounded-3xl text-ink shadow-lift sm:h-28 sm:w-28"
        style={{
          background: `linear-gradient(140deg, ${color}, ${color}cc)`,
        }}
      >
        {centerLink?.kind === 'concept' && <OpenMark color={color} />}
        <Icon name={center.icon || 'cog'} className="h-7 w-7" />
        <span className="mt-1 px-2 text-center text-[0.6875rem] font-medium leading-tight">
          {center.label}
        </span>
      </Interactive>
      <span className="hidden sm:block" />
      {corner(2)}
      <span className="hidden sm:block" />
      {corner(3)}
    </div>
  )
}

function HubNode({ icon, label, color, delay = 0, hero, activeNode, onSelectNode, size }) {
  const link = hero?.links?.[label]
  const big = size === 'hero'
  return (
    <Interactive
      label={label}
      link={link}
      isActive={!!activeNode && activeNode === label}
      onSelect={onSelectNode}
      selectable={hero?.selectable?.includes(label)}
      className="relative flex w-full animate-fade-up flex-col items-center gap-1.5 rounded-2xl border border-hairline glass px-2 py-3 text-center transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      style={{ animationDelay: `${delay}ms` }}
    >
      {link?.kind === 'concept' && <OpenMark color={color} />}
      <span
        className={`grid place-items-center rounded-xl ${big ? 'h-10 w-10' : 'h-8 w-8'}`}
        style={{ backgroundColor: `${color}26`, color }}
      >
        <Icon name={icon || 'sparkles'} className={big ? 'h-[1.125rem] w-[1.125rem]' : 'h-4 w-4'} />
      </span>
      <span
        className={`font-medium leading-tight text-muted ${big ? 'text-[0.75rem]' : 'text-[0.6875rem]'}`}
      >
        {label}
      </span>
    </Interactive>
  )
}

/* A closed loop: processes that repeat. */
function CycleDiagram({ visual, color, hero, activeNode, onSelectNode, size }) {
  const nodes = visual.nodes || []
  return (
    <div className="relative">
      <ol className="grid gap-3 sm:grid-cols-2">
        {nodes.map((node, i) => (
          <li
            key={`${node.label}-${i}`}
            className="relative animate-fade-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <Node
              {...node}
              color={color}
              step={i + 1}
              size={size}
              link={hero?.links?.[node.label]}
              isActive={!!activeNode && activeNode === node.label}
              onSelect={onSelectNode}
              selectable={hero?.selectable?.includes(node.label)}
            />
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-brand">
        <Icon name="refresh" className="h-4 w-4" />
        repeats continuously
      </div>
    </div>
  )
}
