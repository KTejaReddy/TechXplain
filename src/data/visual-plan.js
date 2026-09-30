/**
 * Visual plan — decides which visual templates a concept page should draw, and
 * fills them with that concept's own words.
 *
 * This is the “visual engine”. Rather than hand-designing 253 pages, every
 * concept is handed to `planVisuals`, which looks at its category, its hero
 * diagram, the shape of its “how it works” steps, its hand-written lesson and
 * the tools it lists, then returns the small set of templates that genuinely
 * help *that* concept.
 *
 * Three rules keep it honest:
 *
 *  1. Nothing is invented. Every label comes from data already on the page —
 *     the hero diagram's nodes, the how-it-works steps, the lesson, or the tool
 *     list.
 *  2. Never re-draw the hero. If a concept's hero is already a flow, the engine
 *     only adds a chain when a different framing (a path, a transformation)
 *     shows something the flow did not.
 *  3. A link is only drawn when it is exact. A diagram node becomes a link to
 *     another concept only when its label *is* that concept's name or alias,
 *     and it only counts as “this concept itself” when its label spells the
 *     name out. Anything vaguer is left as plain text rather than guessed at.
 *
 * Everything is deterministic, so a concept always renders the same way and no
 * network call is involved.
 */

import { conceptById, concepts } from './concepts.js'
import {
  analogyIcon,
  describeSteps,
  readingOf,
  shorten,
  whereCard,
  whereIcon,
} from './lesson-grammar.js'
import { roleForTechnology } from './technology-roles.js'

/* ------------------------------------------------------------------ */
/* Domain detection                                                    */
/* ------------------------------------------------------------------ */

/* Words that mean a flow is really a journey between machines. Deliberately
 * narrow: “server” and “host” are far too common (Docker runs on a host, an API
 * has a backend) and would drag unrelated concepts into the network framing. */
const DEVICE_WORDS =
  /\b(devices?|routers?|modems?|internet|network\w*|packets?|dns|firewall\w*|prox(?:y|ies)|vpn|wi-?fi|wireless|browsers?|clients?|ip address\w*|addresses?|socket\w*|tunnel\w*|subnet\w*)\b/i
// Verbs that mean something goes in and something different comes out. Kept
// narrow on purpose: “scales” or “models” would drag in concepts that are not
// transformations at all.
const TRANSFORM_WORDS =
  /\b(compil\w+|interpret\w+|transpil\w+|encrypt\w+|decrypt\w+|convert\w+|transform\w+|translat\w+|pars\w+|render\w+|sort\w*|compress\w+|minif\w+|bundl\w+|train\w*|learn\w*|predict\w*|infer\w*|cach\w+|filter\w*|index\w*)\b/i

/*
 * A band that reads “User → Frontend → API” is a route, not a transformation:
 * the input of a process should be something handed to it, not the person who
 * starts it. Concepts whose flow begins at a person or a device keep their
 * hero diagram and are given no band, rather than a made-up one.
 */
const ACTOR_WORDS =
  /^(you|user|users|customer|customers|people|someone|visitor|visitors|shopper|shoppers|team|teams|developer|developers|device|devices|client|clients|browser|browsers|phone|phones|app|apps|the user|your app)$/i
const SECURITY_CATEGORY = 'cybersecurity'

/* ------------------------------------------------------------------ */
/* 1. The process pipeline — every concept                             */
/* ------------------------------------------------------------------ */

/**
 * The shape of a process from start to finish. It sits above the numbered
 * walkthrough as the overview, so the run is visible before the reading starts.
 */
export function processPipeline(concept) {
  const steps = describeSteps(concept.howItWorks || [])
  if (steps.length < 3) return null
  // The strip itself prints titles only: the numbered walkthrough sits directly
  // below with the full sentences, so repeating them on the strip would be
  // noise. The sentence still travels with the stage, because the strip is
  // explorable — picking a stage explains it in place, in its own words.
  const stages = steps.slice(0, 6).map((step, i) => ({
    // Stable per page: the walkthrough below carries the same id, so the
    // selected stage and its explanation are one element, not two widgets.
    id: `${concept.id}-stage-${i + 1}`,
    icon: step.icon,
    label: step.title,
    text: step.text,
  }))
  return {
    stages,
    // The section header above already invites the reader to explore, so the
    // caption just names the run.
    caption: `${concept.name} in ${stages.length} stages.`,
    note: null,
  }
}

/* ------------------------------------------------------------------ */
/* 2. The chain — input/process/output, a path, or a sequence          */
/* ------------------------------------------------------------------ */

function flowStops(concept) {
  const nodes = concept.visual?.nodes || []
  if (concept.visual?.type !== 'flow' || nodes.length < 3) return null
  return nodes.slice(0, 5).map((node) => ({
    icon: node.icon || 'flow',
    label: node.label,
    note: node.note || null,
  }))
}

/** Is this a concept whose data travels between machines? */
export function isNetworkyConcept(concept) {
  // “Neural network” is a network of weights, not a journey between machines,
  // so the phrase is removed before looking for a device in the labels.
  const hay = (value) => String(value || '').replace(/neural\s+networks?/gi, ' ')
  return (
    concept.category === 'networking' ||
    DEVICE_WORDS.test(hay(concept.name)) ||
    (concept.visual?.nodes || []).some((node) => DEVICE_WORDS.test(hay(node.label)))
  )
}

/** Is this a concept that turns one thing into another? */
export function isTransformConcept(concept) {
  return TRANSFORM_WORDS.test(`${concept.name} ${concept.what}`)
}

/**
 * The chain is the *path* framing: where the data starts, what it passes
 * through, where it ends up. That is a genuinely different view from the hero
 * for the concepts whose subject is the journey between machines.
 *
 * It is deliberately the only chain left. An earlier version also drew “the
 * same run, read as a sequence of stops” for anything that was not a path —
 * three stops picked out of the walkthrough, which is the pipeline strip and
 * the numbered steps below it shown a third time. Identical diagrams are not
 * teaching, so that framing is gone; the input → process → output band took
 * over the transformation reading, and it reads the concept's own flow.
 */
export function flowChain(concept) {
  if (!isNetworkyConcept(concept)) return null
  // The stops have to be the concept's own flow, drawn again as a journey with
  // a start, a middle and an end. Picking three stages out of the walkthrough
  // gave chains like “Network → NAT lets → IPv6 runs”: a sequence the page
  // already draws, in words that were never meant to be nodes.
  const stops = flowStops(concept)
  if (!stops) return null
  return {
    variant: 'network',
    stops,
    caption: `The route a request takes when it meets ${concept.name}.`,
  }
}

/* ------------------------------------------------------------------ */
/* 3. The architecture map — where the tools sit                       */
/* ------------------------------------------------------------------ */

/**
 * Tools grouped into the level of the stack they belong to, so a list of names
 * becomes a picture of a system. The grouping comes from the role text in
 * technology-roles.js, which is hardcoded and reviewed like the rest of the data.
 */
const TECH_LAYERS = [
  {
    id: 'interface',
    label: 'What people see',
    icon: 'monitor',
    match: /(styling|structure|markup|ui |ui$|components?$|layout|design|interactive|front ?end|css|visual)/i,
  },
  {
    id: 'language',
    label: 'Languages',
    icon: 'fileCode',
    // “Query language” belongs with data, not with the programming languages.
    match: /(general-purpose language|systems language|typed javascript|functional language|language of the browser|language for the web|low-level language|shell scripting|scripting language)/i,
  },
  {
    id: 'framework',
    label: 'Frameworks',
    icon: 'layers',
    match: /(framework|library|toolkit|components)/i,
  },
  {
    id: 'runtime',
    label: 'Runtime',
    icon: 'server',
    match: /(runtime|engine|interpreter|virtual machine|execution environment|web server|application server|process manager)/i,
  },
  {
    id: 'data',
    label: 'Data',
    icon: 'database',
    match: /(database|data store|storage|query|persist|index\w*|cach\w+|queue|stream|warehouse|records|sql)/i,
  },
  {
    id: 'packaging',
    label: 'Packaging',
    icon: 'box',
    match: /(container|package|bundl|image|artifact|deploy|orchestrat)/i,
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    icon: 'cloud',
    match: /(cloud|hosting|infrastructure|platform|network|service|provider|region)/i,
  },
  {
    id: 'tooling',
    label: 'Tooling',
    icon: 'cog',
    match: /(tool|cli|build|test|version control|editor|monitor|debug|lint|format|automation|pipeline)/i,
  },
]

export function architectureMap(concept) {
  const techs = concept.technologies || []
  if (techs.length < 4) return null

  const buckets = new Map()
  for (const tech of techs) {
    const role = roleForTechnology(tech) || ''
    const haystack = `${tech} ${role}`
    const layer = TECH_LAYERS.find((entry) => entry.match.test(haystack))
    if (!layer) continue
    if (!buckets.has(layer.id)) buckets.set(layer.id, { ...layer, items: [] })
    buckets.get(layer.id).items.push({
      icon: layer.icon,
      label: tech,
      note: role || null,
    })
  }

  const order = TECH_LAYERS.map((layer) => layer.id)
  const tiers = [...buckets.values()]
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .filter((tier) => tier.items.length > 0)
    .slice(0, 4)
    .map((tier) => ({ label: tier.label, items: tier.items.slice(0, 4) }))

  // A good map needs more than one level, a real spread of tools, and at least
  // one level with neighbours. Weaker groupings are dropped rather than drawn:
  // a wrong architecture diagram teaches the wrong thing.
  const mapped = tiers.reduce((n, tier) => n + tier.items.length, 0)
  const clustered = tiers.some((tier) => tier.items.length >= 2)
  if (tiers.length < 2 || mapped < 4 || !clustered) return null

  return {
    tiers,
    caption: `The tools behind ${concept.name}, grouped by the level of the stack they belong to.`,
  }
}

/* ------------------------------------------------------------------ */
/* 4. The gate — concepts that let things through or stop them         */
/* ------------------------------------------------------------------ */

/**
 * Only concepts that really are a checkpoint get a gate. An earlier version
 * fired for the whole security category and ended up drawing an “allowed /
 * stopped” split for things like Encryption, which decides nothing — a wrong
 * diagram is worse than none.
 */
const GATE_NAMES =
  /(authenticat\w+|authoriz\w+|authoris\w+|firewall\w*|permission\w*|access control|rbac|two-factor|\b2fa\b|api gateway|rate limiting|\bcors\b|zero trust|validation)/i

export function gateFlow(concept) {
  if (!GATE_NAMES.test(concept.name)) return null

  const steps = describeSteps(concept.howItWorks || [])
  if (steps.length < 2) return null

  const checks = steps.slice(0, 3).map((step) => ({ icon: step.icon, label: step.title }))

  return {
    subject: { icon: concept.icon, label: `A request arrives at ${concept.name}` },
    checks,
    allow: `Everything checks out, so the request carries on to the next step.`,
    deny: `One check fails, and the request stops here instead of reaching the data.`,
    caption: `Every request is checked before it is allowed near anything important.`,
  }
}

/* ------------------------------------------------------------------ */
/* 5. The hero diagram, made touchable                                 */
/* ------------------------------------------------------------------ */

/** A label reduced to comparable words, so “API Gateway” and “api-gateway” agree. */
const labelWords = (value) =>
  String(value || '')
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter(Boolean)

/** Does `outer` contain `inner` as a whole run of words? */
function containsWords(outer, inner) {
  if (!inner.length || inner.length > outer.length) return false
  for (let i = 0; i + inner.length <= outer.length; i += 1)
    if (inner.every((word, j) => outer[i + j] === word)) return true
  return false
}

/** Concept ids by name and alias, so a diagram label can become a real link. */
const CONCEPT_BY_LABEL = (() => {
  const index = new Map()
  for (const concept of concepts) {
    for (const name of [concept.name, ...(concept.aliases || [])]) {
      const key = labelWords(name).join(' ')
      if (key && !index.has(key)) index.set(key, concept.id)
    }
  }
  return index
})()

/** The concept a diagram label names, or null when nothing matches exactly. */
export function conceptForLabel(label) {
  return conceptById[CONCEPT_BY_LABEL.get(labelWords(label).join(' '))] || null
}

/** The node-like elements of a diagram, in the order the diagram draws them. */
function diagramNodes(visual) {
  if (!visual) return []
  if (visual.type === 'stack') return visual.items || []
  if (visual.type === 'hub') return [visual.center, ...(visual.satellites || [])].filter(Boolean)
  if (visual.type === 'flow' || visual.type === 'cycle') return visual.nodes || []
  // A comparison is two arguments, not a set of stops to walk through.
  return []
}

/**
 * Which hero nodes belong to this concept, which name another concept, and
 * which walkthrough step explains each one. All three answers come from the
 * page's own words, so a node is only ever made clickable when the data is
 * unambiguous about what it means: a wrong link is worse than a plain label.
 */
export function heroPlan(concept, lesson) {
  const nodes = diagramNodes(concept.visual)
  if (nodes.length < 2) return null

  const own = [labelWords(concept.name), ...(concept.aliases || []).map(labelWords)]
  const notes = lesson?.hero?.notes || {}
  const stepWords = describeSteps(concept.howItWorks || []).map((step) => labelWords(step.text))

  const isThisConcept = (words) => {
    const key = words.join(' ')
    if (!key) return false
    if (own.some((alias) => alias.join(' ') === key)) return true
    // “Interpreter reads a line” still names the interpreter; “In-memory store”
    // still names Redis, whose alias it is. Short generic words are not enough.
    if (key.length >= 4 && own.some((alias) => alias.join(' ').length >= 4 && containsWords(words, alias)))
      return true
    return words.length === 1 && words[0].length >= 6 && own.some((alias) => containsWords(alias, words))
  }

  const links = {}
  const selectable = []
  const stageOfLabel = {}
  const stageCandidates = new Map()

  for (const node of nodes) {
    const label = node.label
    if (!label) continue
    const words = labelWords(label)
    const ownNode = isThisConcept(words)
    const target = ownNode ? null : conceptForLabel(label)
    if (ownNode) links[label] = { kind: 'self' }
    else if (target && target.id !== concept.id)
      links[label] = { kind: 'concept', id: target.id, name: target.name }

    if (words.join(' ').length >= 4) {
      const hits = stepWords
        .map((text, i) => (containsWords(text, words) ? i : null))
        .filter((i) => i !== null)
      if (hits.length === 1) {
        stageOfLabel[label] = hits[0]
        if (!stageCandidates.has(hits[0])) stageCandidates.set(hits[0], new Set())
        stageCandidates.get(hits[0]).add(label)
      }
    }

    if (ownNode || notes[label] || node.note) selectable.push(label)
  }

  if (!selectable.length && !Object.keys(links).length) return null

  // A stage points back at exactly one node, or at none at all.
  const labelOfStage = {}
  for (const [stage, labels] of stageCandidates)
    if (labels.size === 1) labelOfStage[stage] = [...labels][0]

  const initial =
    selectable.find((label) => links[label]?.kind === 'self') || selectable[0] || null

  return { labels: nodes.map((node) => node.label).filter(Boolean), links, selectable, stageOfLabel, labelOfStage, initial }
}

/* ------------------------------------------------------------------ */
/* 6. Input, process, output                                            */
/* ------------------------------------------------------------------ */

/** A label is only worth printing if it says something. */
const usableLabel = (label) =>
  typeof label === 'string' && label.trim().length >= 3 && !ACTOR_WORDS.test(label.trim())

/**
 * The three-beat story of a concept that really has one: what goes in, what
 * does the work, what comes out. Four kinds of concept qualify, in this order:
 *
 *  1. one with a hand-written exchange in its lesson — the strongest evidence
 *     there is, because a person wrote down what goes in and what comes back;
 *  2. one that is a stop in its own hero flow, with a stop on either side: what
 *     it is handed is the stop before it, what it hands on is the stop after;
 *  3. one whose hero flow is a transformation it sits inside: the first stop
 *     goes in, the last one comes out;
 *  4. one whose own words describe a transformation, read from the first and
 *     last stages of its walkthrough.
 *
 * Anything else is left without a band. A made-up input/output pair teaches the
 * wrong thing, and the page already has a hero diagram and a walkthrough.
 */
export function ioBand(concept, lesson) {
  const exchange = lesson?.exchange
  if (exchange?.request?.label && exchange?.response?.label) {
    return {
      source: 'exchange',
      input: {
        label: exchange.request.label,
        value: exchange.request.text || null,
        mono: !!exchange.request.mono,
        icon: exchange.request.icon || 'send',
      },
      process: { label: exchange.via || concept.name, icon: concept.icon },
      output: {
        label: exchange.response.label,
        value: exchange.response.text || null,
        mono: !!exchange.response.mono,
        icon: exchange.response.icon || 'download',
      },
      caption: `One round trip through ${concept.name}: what goes in, and what comes back.`,
    }
  }

  const nodes = concept.visual?.type === 'flow' ? concept.visual.nodes || [] : []
  const hero = heroPlan(concept, lesson)
  const own = nodes
    .map((node, i) => (hero?.links?.[node.label]?.kind === 'self' ? i : -1))
    .filter((i) => i >= 0)
  const stop = (node) => ({ label: node.label, icon: node.icon || 'send' })

  // “Application → Query → Database → Result”: the concept is one stop of its
  // own flow, so the stop before it is what it is handed and the stop after it
  // is what it hands on. It only fires when both neighbours exist, so the band
  // can never invent an ending the flow does not have.
  if (own.length === 1 && own[0] > 0 && own[0] < nodes.length - 1) {
    const input = nodes[own[0] - 1]
    const output = nodes[own[0] + 1]
    if (usableLabel(input.label) && usableLabel(output.label)) {
      return {
        source: 'flow',
        input: stop(input),
        process: { label: concept.name, icon: concept.icon },
        output: { ...stop(output), icon: output.icon || 'download' },
        caption: `What comes into ${concept.name}, and what comes out the other side.`,
      }
    }
  }

  // A flow that is a transformation — “Dataset → Training → Model →
  // Prediction” — with the concept as the middle of it. The first stop is what
  // goes in, the last is what comes out.
  if (nodes.length >= 3 && isTransformConcept(concept)) {
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (usableLabel(first.label) && usableLabel(last.label)) {
      return {
        source: 'transform',
        input: stop(first),
        process: { label: concept.name, icon: concept.icon },
        output: { ...stop(last), icon: last.icon || 'download' },
        caption: `What ${concept.name} takes in, and what it hands back.`,
      }
    }
  }

  // Everything below this line would have to be guessed at. An earlier version
  // also read the first and last stages of the walkthrough as “the ends of a
  // transformation”, which for a concept like IPv4 produced “Network → IPv4 →
  // Monitoring” — two step labels that are not an input and an output at all.
  // A band is only drawn when the page already says what goes in and what comes
  // out, never when a keyword suggests it might.
  return null
}

/* ------------------------------------------------------------------ */
/* 7. Where this fits, as a ladder                                     */
/* ------------------------------------------------------------------ */

/**
 * The four levels of a running system, from the part people touch down to the
 * machines underneath. A concept only gets a ladder when its category really
 * belongs to one of these levels *and* at least one concept it relates to sits
 * at a different level — otherwise there is nothing to show but a single rung,
 * and the page keeps the map instead.
 */
const FIT_LEVELS = [
  { id: 'surface', label: 'What people see and use', icon: 'monitor', categories: ['frontend', 'web-development'] },
  { id: 'services', label: 'The services that do the work', icon: 'server', categories: ['backend', 'ai-machine-learning'] },
  { id: 'data', label: 'Where the data lives', icon: 'database', categories: ['databases'] },
  { id: 'machines', label: 'The machines underneath', icon: 'cloud', categories: ['devops', 'networking', 'cloud'] },
]

export function fitChain(concept, related = []) {
  const ownIndex = FIT_LEVELS.findIndex((level) => level.categories.includes(concept.category))
  if (ownIndex < 0) return null

  const levels = FIT_LEVELS.map((level, index) => {
    const siblings = related.filter((item) => level.categories.includes(item.category))
    return {
      id: level.id,
      label: level.label,
      icon: level.icon,
      here: index === ownIndex,
      // The reader's own level shows the neighbours beside it; the other levels
      // show what sits there instead.
      items: (index === ownIndex ? siblings.slice(0, 3) : siblings.slice(0, 2)).map((item) => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        category: item.category,
      })),
    }
  })

  // Without a neighbour on another rung the ladder says nothing the concept's
  // own chip does not already say, so the map is the better picture.
  if (!levels.some((level) => !level.here && level.items.length)) return null

  const above = levels.slice(0, ownIndex).filter((level) => level.items.length).length
  const below = levels.slice(ownIndex + 1).filter((level) => level.items.length).length
  const direction =
    above && below
      ? 'something above it asks, and something below it runs'
      : above
        ? 'the levels above it are what it serves'
        : 'the levels below it are what it runs on'

  return {
    levels,
    caption: `${concept.name} sits at “${FIT_LEVELS[ownIndex].label}” — ${direction}.`,
  }
}

/* ------------------------------------------------------------------ */
/* 8. Remember — the page in a handful of facts                        */
/* ------------------------------------------------------------------ */

/**
 * The recap at the end of the page: four or five things worth carrying away,
 * every one of them copied from somewhere the reader has just been — the
 * concept's own line, the band's two ends, a place it is used, and the concept
 * the page suggests reading next. Nothing here is newly written, so the recap
 * can never disagree with the page above it.
 */
export function rememberFacts(concept, plan = {}, related = []) {
  const facts = [
    { icon: concept.icon, label: concept.name, note: shorten(concept.shortDescription, 12) },
  ]

  if (plan.io) {
    facts.push({ icon: plan.io.input.icon, label: plan.io.input.label, note: `goes into ${concept.name}` })
    facts.push({
      icon: plan.io.output.icon,
      label: plan.io.output.label,
      note: `comes back out of it`,
    })
  }

  const used = (concept.whereUsed || [])[0]
  if (used) {
    const card = whereCard(used)
    facts.push({ icon: whereIcon(used, 0), label: card.title, note: 'one place you meet it' })
  }

  if (related.length) {
    facts.push({ icon: related[0].icon, label: related[0].name, note: 'the next thing to read' })
  }

  return facts.slice(0, 5)
}

/* ------------------------------------------------------------------ */
/* The plan                                                            */
/* ------------------------------------------------------------------ */

/** Everything the page needs, decided once, from the concept's own data. */
export function planVisuals(concept, lesson) {
  if (!concept) return {}
  const chain = flowChain(concept)
  const architecture = architectureMap(concept)
  const io = ioBand(concept, lesson)
  return {
    pipeline: processPipeline(concept),
    // One second reading of the flow per page, never two: when the band can say
    // what goes in and what comes out, the chain stands down, and when there is
    // no band the chain carries the path framing instead.
    chain: io ? null : chain,
    architecture,
    gate: gateFlow(concept),
    io,
    hero: heroPlan(concept, lesson),
    // The “Key parts” list and the architecture map are built from the same
    // list of tools — one as a list, one grouped by level. Showing both is the
    // same information twice, so the list stands down whenever the map is
    // drawn.
    parts: (concept.technologies || []).length >= 2 && !architecture,
  }
}

/** A one-line reading of the hero diagram, for places that want a sentence. */
export function heroReading(concept) {
  return readingOf(concept?.visual)
}

/** Kept for symmetry with the other card helpers. */
export { analogyIcon, whereCard, whereIcon }
