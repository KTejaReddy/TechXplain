import { useCallback, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ConceptVisual from '../components/ConceptVisual.jsx'
import ConceptCard from '../components/ConceptCard.jsx'
import { InspectorPanel } from '../components/Interactive.jsx'
import {
  BeforeAfterVisual,
  CodeCallout,
  EcosystemDiagram,
  FitLadder,
  MappingDiagram,
  PartsDiagram,
  ProgressionTrail,
  RememberRecap,
  ScenarioFlow,
  ShortFlowVisual,
} from '../components/LessonVisuals.jsx'
import {
  ArchitectureMap,
  CodeToVisual,
  DataTable,
  FlowChain,
  GateFlow,
  InputProcessOutput,
  LayerStack,
  PipelineStrip,
} from '../components/VisualTemplates.jsx'
import { getCategory } from '../data/categories.js'
import { conceptById, getConcept, relatedTo } from '../data/concepts.js'
import { analogyIcon, describeSteps, whereCard, whereIcon } from '../data/lesson-grammar.js'
import { lessonFor } from '../data/lessons.js'
import { fitChain, planVisuals, rememberFacts } from '../data/visual-plan.js'

/** The one chain framing left: the path data takes between machines. */
const CHAIN_SECTIONS = {
  network: { icon: 'network', title: 'The path it takes' },
}

import NotFound from './NotFound.jsx'

/**
 * “What is X?” or “What are X?”. Acronyms (DNS, CSS) and names ending in an
 * acronym (Tailwind CSS) stay singular, and a few names are simply exceptions.
 */
function isPluralName(name) {
  if (name === name.toUpperCase()) return false
  if (/[A-Z]$/.test(name)) return false
  if (!/s$/.test(name) || /ss$/.test(name)) return false
  return !['Kubernetes'].includes(name)
}

export default function ConceptPage() {
  const { conceptId } = useParams()
  const concept = getConcept(conceptId)

  if (!concept) {
    return <NotFound message="That concept does not exist." />
  }

  const category = getCategory(concept.category)
  const related = relatedTo(concept)
  const lesson = lessonFor(concept.id)
  // The visual engine decides which diagrams this particular concept earns,
  // using only the data on this page. It also decides which diagram nodes are
  // links and which walkthrough step explains each one.
  const plan = planVisuals(concept, lesson)

  // Keyed, so a move to another concept starts clean: no selection carried over.
  return (
    <ConceptArticle
      key={concept.id}
      concept={concept}
      category={category}
      related={related}
      lesson={lesson}
      plan={plan}
    />
  )
}

function ConceptArticle({ concept, category, related, lesson, plan }) {
  const navigate = useNavigate()
  const location = useLocation()

  // "default" means this was the first page of the session, so there is nothing to go back to.
  const cameFromInsideTheSite = location.key !== 'default'

  const color = category?.color || '#0a7a4a'
  const alsoCalled = (concept.aliases || []).filter(
    (alias) => alias.toLowerCase() !== concept.name.toLowerCase(),
  )

  // Everything the visual lesson needs, derived from the data when the hand-written
  // lesson file has nothing for this concept.
  const steps = describeSteps(concept.howItWorks || [])
  const heroVisual = heroVisualWithNotes(concept.visual, lesson?.hero)
  const scenario = lesson?.scenario || fallbackScenario(concept)
  const stageCount = plan.pipeline?.stages?.length || steps.length

  /*
   * One selection for the whole page: which stage the reader is on, and which
   * diagram node goes with it. The strip, the walkthrough, the hero diagram and
   * the panel all read from this one piece of state, so they cannot disagree —
   * and picking a stage never means two things on the page are highlighted.
   */
  const [focus, setFocus] = useState({ stage: 0, node: plan.hero?.initial ?? null })
  const stepRefs = useRef([])

  /** Bring a step into view, but only when it is actually off screen. */
  const scrollToStep = useCallback((index) => {
    const element = stepRefs.current[index]
    if (!element) return
    const rect = element.getBoundingClientRect()
    // Behind the sticky bar, or below the fold.
    if (rect.top >= 96 && rect.bottom <= window.innerHeight - 16) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' })
  }, [])

  const selectStage = useCallback(
    (index, { scroll = true } = {}) => {
      const bounded = ((index % stageCount) + stageCount) % stageCount
      setFocus((previous) => ({
        stage: bounded,
        // If the diagram has a node this step talks about, follow it there too.
        node: plan.hero?.labelOfStage?.[bounded] ?? previous.node,
      }))
      if (scroll) scrollToStep(bounded)
    },
    [plan, stageCount, scrollToStep],
  )

  const selectNode = useCallback(
    (label) => {
      setFocus((previous) => ({
        stage: plan.hero?.stageOfLabel?.[label] ?? previous.stage,
        node: label,
      }))
    },
    [plan],
  )

  // Only offered once there is something to reset: the control appears when the
  // reader has moved away from where the page started, and disappears again the
  // moment they are back.
  const startNode = plan.hero?.initial ?? null
  const atStart = focus.stage === 0 && focus.node === startNode
  const resetView = useCallback(() => {
    setFocus({ stage: 0, node: startNode })
    scrollToStep(0)
  }, [startNode, scrollToStep])

  // The panel follows the selection, and only speaks when it has something real
  // to say: the node's own note, or the description of the concept it names.
  const activeNode = focus.node && plan.hero?.labels?.includes(focus.node) ? focus.node : null
  const activeLink = activeNode ? plan.hero.links[activeNode] : null
  const activeNodeData = activeNode ? heroNode(heroVisual, activeNode) : null
  const inspectorNote = activeNodeData?.note
    ? activeNodeData.note
    : activeLink?.kind === 'self'
      ? concept.shortDescription
      : activeLink
        ? conceptById[activeLink.id]?.shortDescription || null
        : null

  const fit = fitChain(concept, related)
  const recap = rememberFacts(concept, plan, related)

  const band = plan.io
  const inspectorInput = band?.input
    ? band.input.value
      ? `${band.input.label} · ${band.input.value}`
      : band.input.label
    : null
  const inspectorOutput = band?.output
    ? band.output.value
      ? `${band.output.label} · ${band.output.value}`
      : band.output.label
    : null

  return (
    <article className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-12">
      {/* ------------------------------ Breadcrumb ------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => (cameFromInsideTheSite ? navigate(-1) : navigate('/explore'))}
          className="inline-flex items-center gap-1.5 rounded-full border glass border-hairline px-4 py-2 text-sm font-medium text-muted shadow-soft transition duration-200 hover:border-accent/50 hover:text-brand"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back
        </button>

        <nav
          className="flex flex-wrap items-center gap-2 text-xs text-muted"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition hover:text-brand">
            Home
          </Link>
          <span className="text-hairline-strong">/</span>
          <Link to={`/category/${category?.id}`} className="transition hover:text-brand">
            {category?.name}
          </Link>
          <span className="text-hairline-strong">/</span>
          <span className="text-ink">{concept.name}</span>
        </nav>
      </div>

      {/* ------------------------------ First screen -----------------------------
          The opening is one wide band: what the concept is on the left, the
          whole thing drawn on the right. On a phone the words come first and the
          diagram follows, which is the order it is read in either way. */}
      <header className="mt-9">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                style={{ backgroundColor: `${color}24`, color }}
              >
                <Icon name={concept.icon} className="h-6 w-6" />
              </span>
              <div>
                {category && (
                  <Link
                    to={`/category/${category.id}`}
                    className="eyebrow inline-flex items-center gap-1.5 transition hover:opacity-70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {category.name}
                  </Link>
                )}
                <h1 className="mt-2 text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem] lg:text-[2.75rem]">
                  {concept.name}
                </h1>
              </div>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
              {concept.shortDescription}
            </p>

            {alsoCalled.length > 0 && (
              <p className="mt-4 text-xs text-muted">
                Also called <span className="text-ink/80">{alsoCalled.join(' · ')}</span>
              </p>
            )}
          </div>

          <div className="min-w-0">
            <ConceptVisual
              visual={heroVisual}
              color={color}
              links={lesson?.hero?.links}
              hero={plan.hero}
              activeNode={activeNode}
              onSelectNode={selectNode}
              captionLabel="What's happening?"
              size="hero"
            />

            {/* The answer to the diagram: whatever node is selected, in its own words. */}
            {activeNode && (
              <div className="mt-4">
                <InspectorPanel
                  label={activeNode}
                  icon={activeNodeData?.icon}
                  note={inspectorNote}
                  input={inspectorInput}
                  output={inspectorOutput}
                  color={color}
                />
              </div>
            )}
          </div>
        </div>

        {/* The takeaway, just below the opening, and impossible to miss. */}
        {concept.keyIdea && (
          <div className="mt-8 overflow-hidden rounded-card border border-hairline bg-mist/70 px-5 py-4 shadow-soft sm:px-6 sm:py-5">
            <span className="mb-3 block h-0.5 w-12 rounded-full bg-accent/60" aria-hidden="true" />
            <p className="eyebrow flex items-center gap-2">
              <Icon name="bulb" className="h-4 w-4" />
              Key idea
            </p>
            <p className="mt-2 max-w-3xl text-[1.0625rem] font-medium leading-relaxed text-ink sm:text-lg">
              {concept.keyIdea}
            </p>
          </div>
        )}
      </header>

      {/* ------------------------- What is it? (split) --------------------------- */}
      <Section
        icon="eye"
        title={isPluralName(concept.name) ? `What are ${concept.name}?` : `What is ${concept.name}?`}
      >
        <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          <div className="rounded-card border border-hairline glass p-6 shadow-soft sm:p-7">
            <span className="mb-5 block h-0.5 w-12 rounded-full bg-accent/60" aria-hidden="true" />
            <p className="text-base leading-[1.75] text-ink/85 sm:text-[1.0625rem]">
              {concept.what}
            </p>
          </div>

          {/* The same idea as a picture: the tools the concept is made of, or —
              where the map further down already groups those tools — a
              three-stop summary of the process. Either way it is a second view
              of the concept, never a second copy of the diagram above. */}
          {plan.parts ? (
            <PartsDiagram concept={concept} color={color} compact />
          ) : (
            <ShortFlowVisual concept={concept} color={color} />
          )}
        </div>
      </Section>

      {/* ------------------------- See it in real life --------------------------- */}
      {scenario && (
        <Section icon="compass" title="See it in real life">
          <ScenarioFlow scenario={scenario} color={color} />
        </Section>
      )}

      {/* -------------------------- Think of it like this ------------------------ */}
      <section className="relative mt-12 overflow-hidden rounded-card border border-hairline bg-gradient-to-br from-mist via-surface/70 to-mist/50 p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-10 font-serif text-[10rem] leading-none text-accent/10"
        >
          ”
        </span>
        <p className="eyebrow flex items-center gap-2">
          <Icon name={analogyIcon(concept.analogy)} className="h-4 w-4" />
          Think of it like this
        </p>
        <p className="relative mt-4 max-w-3xl text-lg leading-[1.7] text-ink/85 sm:text-xl">
          {concept.analogy}
        </p>
        {lesson?.mapping && <MappingDiagram mapping={lesson.mapping} color={color} />}
      </section>

      {/* ------------------------ Step through the process -----------------------
          The centrepiece: the whole run as a strip you can pick a stage from,
          with the numbered walkthrough underneath. One selection drives both, so
          the stage you tapped is the step that opens. */}
      <Section
        icon="cog"
        title="How does it work?"
        hint="Explore the process step by step — pick any stage to read it in place, or scroll on for the full run."
        action={
          !atStart && (
            <button
              type="button"
              onClick={resetView}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline glass px-3.5 py-2 text-[0.75rem] font-medium text-muted transition duration-200 hover:border-accent/50 hover:text-brand"
            >
              <Icon name="refresh" className="h-3.5 w-3.5" />
              Reset view
            </button>
          )
        }
      >
        {/* The whole run as a pipeline, so the shape lands before the detail.
            Picking a stage here highlights the same step underneath. */}
        {plan.pipeline && (
          <div className="mb-5">
            <PipelineStrip
              {...plan.pipeline}
              color={color}
              activeIndex={focus.stage}
              onSelect={selectStage}
            />
          </div>
        )}

        <ol className="flex flex-col gap-2">
          {steps.map((step, i, all) => {
            const isActive = i === focus.stage
            return (
              <li
                key={step.text}
                id={plan.pipeline?.stages?.[i]?.id}
                ref={(element) => {
                  stepRefs.current[i] = element
                }}
                aria-current={isActive ? 'step' : undefined}
                className={`relative flex animate-fade-up scroll-mt-24 gap-4 rounded-card border px-3.5 py-4 transition duration-300 sm:scroll-mt-28 sm:gap-5 sm:px-5 ${
                  isActive ? 'border-accent/50 bg-mist/60 shadow-lift' : 'border-transparent'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="relative flex flex-col items-center">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs font-semibold transition duration-300 ${
                      isActive ? 'border-brand bg-brand text-surface' : 'border-accent/30 bg-mist text-forest'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < all.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-1 w-px flex-1 border-l border-dashed border-accent/30"
                    />
                  )}
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                      style={{ backgroundColor: `${color}26`, color }}
                    >
                      <Icon name={step.icon} className="h-[0.9rem] w-[0.9rem]" />
                    </span>
                    <h3
                      className={`text-[0.9375rem] font-semibold leading-snug sm:text-base ${
                        isActive ? 'text-ink' : 'text-ink/75'
                      }`}
                    >
                      {step.title}
                    </h3>
                  </span>
                  <p
                    className={`mt-2 text-[0.9375rem] leading-relaxed sm:text-base ${
                      isActive ? 'text-ink/85' : 'text-muted'
                    }`}
                  >
                    {step.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>

      {/* ----------------------- Input, process, output -------------------------- */}
      {plan.io && (
        <Section icon="refresh" title="What goes in, what comes out">
          <InputProcessOutput {...plan.io} color={color} />
        </Section>
      )}

      {/* --------------------------- The path it takes --------------------------- */}
      {plan.chain && (
        <Section {...CHAIN_SECTIONS[plan.chain.variant]}>
          <FlowChain {...plan.chain} color={color} />
        </Section>
      )}

      {/* ------------------------ How the pieces sit ---------------------------- */}
      {plan.architecture && (
        <Section icon="layers" title="How the pieces fit together">
          <ArchitectureMap {...plan.architecture} color={color} />
        </Section>
      )}

      {/* ------------------------------- In code -------------------------------- */}
      {lesson?.code && (
        <Section icon="terminal" title="Seen from the inside">
          {/* A single snippet with its notes becomes “code → what it does →
              what comes out”. Two panels (a request and a response, say) keep
              the side-by-side callout instead. */}
          {lesson.code.panels?.length === 1 && lesson.code.notes?.length > 0 ? (
            <CodeToVisual
              color={color}
              title={lesson.code.title}
              code={lesson.code.panels[0]}
              steps={lesson.code.notes.map((note) => ({ label: note.code, note: note.text }))}
              result={lesson.code.result}
            />
          ) : (
            <CodeCallout code={lesson.code} color={color} />
          )}
        </Section>
      )}

      {/* ------------------------------ Real data -------------------------------- */}
      {lesson?.data && (
        <Section icon="table" title="The data itself">
          <DataTable {...lesson.data} />
        </Section>
      )}

      {/* --------------------------- Why does it matter? ------------------------- */}
      <Section icon="target" title="Why does it matter?">
        <div className="relative overflow-hidden rounded-card bg-forest p-6 text-surface shadow-lift sm:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-2xl"
          />
          <p className="relative text-base leading-[1.75] text-mist/90 sm:text-[1.0625rem]">
            {concept.whyItMatters}
          </p>
        </div>
      </Section>

      {/* ---------------------------- Under the hood ----------------------------- */}
      {concept.deeper?.length > 0 && (
        <Section icon="book" title="Under the hood">
          <div className="rounded-card border border-hairline glass p-6 shadow-soft sm:p-7">
            <p className="eyebrow flex items-center gap-2">
              <Icon name="bulb" className="h-3.5 w-3.5" />
              Simple view
            </p>
            <p className="mt-3 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink/85 sm:text-base">
              {concept.shortDescription}
            </p>

            {/* The precise version is here for anyone who wants it, and out of
                the way for anyone who does not. */}
            <details className="group mt-6 rounded-2xl border border-hairline bg-mist/40 px-4 py-3.5">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-soft">
                  <Icon name="terminal" className="h-3.5 w-3.5" />
                </span>
                Technical view
                <span className="text-[0.75rem] font-normal text-muted">
                  — the same thing, said precisely
                </span>
                <Icon
                  name="arrowRight"
                  className="ml-auto h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-open:rotate-90"
                />
              </summary>
              <div className="mt-5 space-y-5 border-t border-hairline pt-5">
                {concept.deeper.map((paragraph, i) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="max-w-3xl text-[0.9375rem] leading-[1.8] text-ink/80 sm:text-base"
                  >
                    {i === 0 ? (
                      <>
                        <span className="mr-2.5 inline-block h-2 w-2 -translate-y-0.5 rounded-full bg-accent" />
                        {paragraph}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </Section>
      )}

      {/* ------------------------------ Comparison ------------------------------- */}
      {concept.comparison && (
        <Section icon="scale" title="How it compares">
          <ConceptVisual visual={concept.comparison} color={color} />
        </Section>
      )}

      {/* ----------------------------- Before / after ---------------------------- */}
      {lesson?.beforeAfter && (
        <Section icon="refresh" title="Before and after">
          <BeforeAfterVisual beforeAfter={lesson.beforeAfter} color={color} />
        </Section>
      )}

      {/* -------------------------- You use this when ----------------------------
          One section, two altitudes: the moment written out as a story, then the
          settings where it shows up, each with its own icon. */}
      <Section icon="globe" title={`You use ${concept.name} when…`}>
        {(concept.examples || []).map((item) => (
          <div
            key={item}
            className="mb-4 flex items-start gap-4 overflow-hidden rounded-card border border-hairline border-l-[3px] border-l-accent glass p-5 shadow-soft sm:p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mist text-brand">
              <Icon name="sparkles" className="h-5 w-5" />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="eyebrow flex items-center gap-2">In one real moment</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base">
                {item}
              </p>
            </div>
          </div>
        ))}

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(concept.whereUsed || []).map((item, i) => {
            const card = whereCard(item)
            return (
              <li
                key={item}
                className="flex animate-fade-up items-start gap-3.5 rounded-card border border-hairline glass px-4 py-4 shadow-soft transition duration-300 hover:-translate-y-0.5 sm:px-5"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                  style={{ backgroundColor: `${color}26`, color }}
                >
                  <Icon name={whereIcon(item, i)} className="h-5 w-5" />
                </span>
                <span className="min-w-0 pt-1">
                  <span
                    className={`block leading-snug text-ink ${card.note ? 'text-[0.9375rem] font-semibold' : 'text-[0.875rem]'}`}
                  >
                    {card.title}
                  </span>
                  {card.note && (
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                      {card.note}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      </Section>

      {/* --------------------------- Questions people ask ------------------------ */}
      {concept.faq?.length > 0 && (
        <Section icon="chat" title="Questions people ask">
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {concept.faq.map((item) => (
              <div key={item.q} className="border-t border-hairline pt-5">
                <p className="flex items-start gap-2.5 text-[0.9375rem] font-semibold text-ink">
                  <Icon name="bulb" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item.q}
                </p>
                <p className="mt-2.5 pl-[1.6rem] text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------- The layers ------------------------------- */}
      {lesson?.layers && (
        <Section icon="layers" title="The layers">
          <LayerStack {...lesson.layers} color={color} />
        </Section>
      )}

      {/* --------------------------- How it decides ------------------------------ */}
      {plan.gate && (
        <Section icon="shieldCheck" title="How it decides">
          <GateFlow {...plan.gate} color={color} />
        </Section>
      )}

      {/* ---------------------------- Remember ----------------------------------
          The page in a handful of cards, every one of them copied from a
          section above: what it is, what goes in and out, where you meet it,
          and what to read next. */}
      <Section icon="check" title="Remember">
        <RememberRecap facts={recap} color={color} />
      </Section>

      {/* --------------------------- Where this fits ----------------------------
          A ladder when the concept really sits on one of the levels of a running
          system, with something it relates to on another level. Otherwise the
          map, which never claims a level it cannot show. */}
      {related.length > 0 && (
        <Section icon="link" title="Where this fits">
          {fit ? (
            <FitLadder {...fit} concept={concept} color={color} />
          ) : (
            <EcosystemDiagram concept={concept} related={related} color={color} />
          )}
        </Section>
      )}

      {/* --------------------------- Learn this next ---------------------------- */}
      {related.length > 0 && (
        <Section icon="rocket" title="Learn this next">
          <ProgressionTrail concept={concept} related={related} color={color} />

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ConceptCard key={item.id} concept={item} variant="compact" />
            ))}
          </div>
        </Section>
      )}

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-card border border-hairline glass p-6 shadow-soft sm:p-7">
        <p className="text-sm text-muted">
          Finished with <span className="font-medium text-ink">{concept.name}</span>? Keep going.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/category/${category?.id}`}
            className="rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-muted transition duration-200 hover:border-accent/40 hover:bg-mist hover:text-forest"
          >
            More in {category?.name}
          </Link>
          <Link
            to="/explore"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-surface shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-forest"
          >
            Explore all concepts
          </Link>
        </div>
      </div>
    </article>
  )
}

/** The diagram element with this label, wherever the visual keeps its nodes. */
function heroNode(visual, label) {
  const nodes = [
    ...(visual?.nodes || []),
    ...(visual?.items || []),
    ...(visual?.satellites || []),
    visual?.center,
  ].filter(Boolean)
  return nodes.find((node) => node.label === label) || null
}

/**
 * The hand-written lesson file can label the arrows and add tiny notes to the
 * big diagram by matching node labels — no need to duplicate the whole visual.
 */
function heroVisualWithNotes(visual, hero) {
  if (!visual || !hero) return visual
  const notes = hero.notes || {}
  const patch = (item) =>
    item?.label && notes[item.label] ? { ...item, note: item.note || notes[item.label] } : item
  return {
    ...visual,
    nodes: visual.nodes?.map(patch),
    items: visual.items?.map(patch),
  }
}

/**
 * If no scenario has been written for a concept yet, its “where is it used?”
 * items already describe three real situations — show those as a short flow.
 */
function fallbackScenario(concept) {
  const items = (concept.whereUsed || []).slice(0, 3)
  if (items.length < 3) return null
  return {
    title: `Where ${concept.name} shows up`,
    steps: items.map((item, i) => ({ icon: whereIcon(item, i), label: whereCard(item).title })),
  }
}

/**
 * A consistent, quiet section header that keeps the page rhythm readable: the
 * icon and title, an optional line saying what the section is for, and an
 * optional control on the right of the row.
 */
function Section({ icon, title, hint, action, children }) {
  return (
    <section className="mt-14">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-ink sm:text-xl">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mist text-brand">
              <Icon name={icon} className="h-[1.125rem] w-[1.125rem]" />
            </span>
            {title}
          </h2>
          {hint && (
            <p className="mt-2 max-w-2xl pl-0 text-[0.9375rem] leading-relaxed text-muted sm:pl-12">
              {hint}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
