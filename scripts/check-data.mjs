/**
 * Data integrity check for the TechXplain knowledge base.
 * Run with: npm run check:data
 */
import { readFileSync } from 'node:fs'
import { concepts, conceptById, categoryCounts, totalConcepts } from '../src/data/concepts.js'
import { lessonFor, lessons } from '../src/data/lessons.js'
import { categories } from '../src/data/categories.js'
import { roleForTechnology } from '../src/data/technology-roles.js'
import { describeSteps } from '../src/data/lesson-grammar.js'
import { relatedTo } from '../src/data/concepts.js'
import { fitChain, planVisuals, rememberFacts } from '../src/data/visual-plan.js'

const iconSource = readFileSync(new URL('../src/components/Icon.jsx', import.meta.url), 'utf8')
const iconNames = new Set(
  [...iconSource.matchAll(/^\s{2}'?([a-zA-Z][a-zA-Z0-9]*)'?:\s*[<(]/gm)].map((m) => m[1]),
)

const validCategories = new Set(categories.map((c) => c.id))
const validVisualTypes = new Set(['flow', 'stack', 'compare', 'hub', 'cycle'])
const problems = []
const add = (concept, message) => problems.push(`${concept?.id || '?'}: ${message}`)
const captionsSeen = new Map()

const seen = new Set()
for (const c of concepts) {
  if (seen.has(c.id)) add(c, 'duplicate id')
  seen.add(c.id)

  if (!validCategories.has(c.category)) add(c, `unknown category "${c.category}"`)
  if (!c.name) add(c, 'missing name')
  if (!c.shortDescription) add(c, 'missing shortDescription')
  if (!c.keyIdea || c.keyIdea.length < 30) add(c, `keyIdea missing or too short (${c.keyIdea?.length || 0})`)
  if (!c.what || c.what.length < 120) add(c, `what too short (${c.what?.length || 0})`)
  if (!c.analogy || c.analogy.length < 80) add(c, `analogy too short (${c.analogy?.length || 0})`)
  if (!c.whyItMatters || c.whyItMatters.length < 60)
    add(c, `whyItMatters too short (${c.whyItMatters?.length || 0})`)
  if (!iconNames.has(c.icon)) add(c, `unknown icon "${c.icon}"`)
  if (!Array.isArray(c.howItWorks) || c.howItWorks.length < 3) add(c, 'howItWorks needs 3+ steps')
  if (!Array.isArray(c.whereUsed) || c.whereUsed.length < 4) add(c, 'whereUsed needs 4+ items')
  if (!Array.isArray(c.examples) || c.examples.length < 1) add(c, 'examples needs 1+ item')
  if (!Array.isArray(c.technologies) || c.technologies.length < 2)
    add(c, 'technologies needs 2+ items')
  if (!Array.isArray(c.relatedConcepts) || c.relatedConcepts.length < 2)
    add(c, 'relatedConcepts needs 2+ links')

  for (const id of c.relatedConcepts || []) {
    if (!conceptById[id]) add(c, `dangling related concept "${id}"`)
  }

  const visual = c.visual
  if (!visual || !validVisualTypes.has(visual.type)) {
    add(c, `unknown visual type "${visual?.type}"`)
  } else if (!visual.caption) {
    add(c, 'visual missing caption')
  } else {
    // The caption under the hero is the answer to “what's happening?”, so it has
    // to be a sentence of its own — one per concept, never a template line
    // shared by a group of pages.
    if (visual.caption.trim().length < 20)
      add(c, `visual caption too short to explain anything (${visual.caption.trim().length} chars)`)
    captionsSeen.set(visual.caption, [...(captionsSeen.get(visual.caption) || []), c.id])
    const labels = []
    const icons = []
    const visit = (item) => {
      if (!item || typeof item !== 'object') return
      if (item.label) labels.push(item.label)
      if (item.title) labels.push(item.title)
      if (item.icon) icons.push(item.icon)
    }
    ;(visual.nodes || []).forEach(visit)
    ;(visual.items || []).forEach(visit)
    ;(visual.satellites || []).forEach(visit)
    ;[visual.left, visual.right, visual.center].forEach(visit)
    ;[...(visual.left?.points || []), ...(visual.right?.points || [])].forEach((point) => {
      if (typeof point === 'string') labels.push(point)
    })
    if (labels.length === 0) add(c, 'visual has no content')
    // Every concept has to arrive with a picture worth looking at, even where
    // nothing on it can be clicked: two elements is the least that can show a
    // relationship.
    if (labels.length < 2) add(c, `the hero visual draws ${labels.length} element(s)`)
    if (labels.some((label) => !String(label).trim())) add(c, 'visual has an empty label')
    icons.forEach((name) => {
      if (!iconNames.has(name)) add(c, `unknown visual icon "${name}"`)
    })
  }

  const prose = [
    c.what,
    c.analogy,
    c.whyItMatters,
    ...(c.howItWorks || []),
    ...(c.whereUsed || []),
    ...(c.examples || []),
  ].join(' ')
  if (/lorem ipsum|placeholder|TODO|TBD/i.test(prose)) add(c, 'placeholder text found')

  if (c.deeper) {
    if (!Array.isArray(c.deeper) || c.deeper.length < 3) {
      add(c, `deeper needs 3+ paragraphs (${c.deeper?.length || 0})`)
    } else {
      c.deeper.forEach((p, i) => {
        if (typeof p !== 'string' || p.length < 80) add(c, `deeper[${i}] is too short`)
      })
    }
  }

  if (c.faq) {
    if (!Array.isArray(c.faq) || c.faq.length < 3) add(c, `faq needs 3+ questions (${c.faq.length || 0})`)
    else c.faq.forEach((item, i) => {
      if (!item.q || item.q.length < 12) add(c, `faq[${i}] question too short`)
      if (!item.a || item.a.length < 50) add(c, `faq[${i}] answer too short`)
    })
  }

  if (c.comparison) {
    const cmp = c.comparison
    if (cmp.type !== 'compare') add(c, `comparison must be a compare visual ("${cmp.type}")`)
    for (const side of ['left', 'right']) {
      const panel = cmp[side]
      if (!panel?.title) add(c, `comparison.${side} missing title`)
      if (!Array.isArray(panel?.points) || panel.points.length < 2)
        add(c, `comparison.${side} needs 2+ points`)
    }
    if (!cmp.caption) add(c, 'comparison missing caption')
  }
}

/* ---------------------- visual lesson content (optional) ---------------------- */

const lessonCounts = { scenario: 0, exchange: 0, mapping: 0, beforeAfter: 0, code: 0, hero: 0, data: 0, layers: 0 }
let lessonIconsChecked = 0
for (const [id, lesson] of Object.entries(lessons)) {
  const c = conceptById[id]
  if (!c) {
    add({ id }, 'lesson written for an unknown concept id')
    continue
  }

  const checkIcon = (name, where) => {
    if (!name) return
    lessonIconsChecked += 1
    if (!iconNames.has(name)) add(c, `unknown icon "${name}" in ${where}`)
  }
  const checkText = (text, where, min = 2) => {
    if (typeof text !== 'string' || text.trim().length < min)
      add(c, `${where} is missing or too short`)
    else if (/lorem ipsum|placeholder|TODO|TBD|xxx/i.test(text)) add(c, `placeholder text in ${where}`)
  }
  const checkSteps = (steps, where, min) => {
    if (!Array.isArray(steps) || steps.length < min) {
      add(c, `${where} needs ${min}+ steps (${steps?.length || 0})`)
      return
    }
    steps.forEach((step, i) => {
      checkText(step?.label, `${where}[${i}].label`, 3)
      checkIcon(step?.icon, `${where}[${i}]`)
      if (step?.note) checkText(step.note, `${where}[${i}].note`, 3)
    })
  }

  const visualLabels = new Set()
  for (const item of [
    ...(c.visual?.nodes || []),
    ...(c.visual?.items || []),
    ...(c.visual?.satellites || []),
    c.visual?.center,
    c.visual?.left,
    c.visual?.right,
  ]) {
    if (item?.label) visualLabels.add(item.label)
    if (item?.title) visualLabels.add(item.title)
  }

  if (lesson.hero) {
    lessonCounts.hero += 1
    for (const [label, note] of Object.entries(lesson.hero.notes || {})) {
      if (!visualLabels.has(label)) add(c, `hero note for an unknown node "${label}"`)
      checkText(note, `hero.notes["${label}"]`, 3)
    }
    if (lesson.hero.links) {
      const connections = (c.visual?.nodes || []).length - 1
      if (lesson.hero.links.length !== connections)
        add(c, `hero links: ${lesson.hero.links.length} labels for ${connections} connections`)
      lesson.hero.links.forEach((link, i) => checkText(link, `hero.links[${i}]`, 3))
    }
  }

  if (lesson.exchange) {
    lessonCounts.exchange += 1
    const ex = lesson.exchange
    if (!ex.request || !ex.response) add(c, 'exchange needs a request and a response')
    else {
      checkText(ex.request.label, 'exchange.request.label', 3)
      checkText(ex.request.text, 'exchange.request.text', 3)
      checkText(ex.response.label, 'exchange.response.label', 3)
      checkText(ex.response.text, 'exchange.response.text', 3)
      checkIcon(ex.request.icon, 'exchange.request')
      checkIcon(ex.response.icon, 'exchange.response')
    }
  }

  if (lesson.scenario) {
    lessonCounts.scenario += 1
    if (!lesson.scenario.title) add(c, 'scenario missing title')
    else checkText(lesson.scenario.title, 'scenario.title', 8)
    checkSteps(lesson.scenario.steps, 'scenario.steps', 3)
    if (lesson.scenario.note) checkText(lesson.scenario.note, 'scenario.note', 30)
  }

  if (lesson.mapping) {
    lessonCounts.mapping += 1
    const pairs = lesson.mapping.pairs
    if (!Array.isArray(pairs) || pairs.length < 3) add(c, `mapping needs 3+ pairs (${pairs?.length || 0})`)
    else
      pairs.forEach((pair, i) => {
        checkText(pair?.analogy, `mapping.pairs[${i}].analogy`, 2)
        checkText(pair?.reality, `mapping.pairs[${i}].reality`, 3)
        checkIcon(pair?.icon, `mapping.pairs[${i}]`)
      })
  }

  if (lesson.beforeAfter) {
    lessonCounts.beforeAfter += 1
    for (const side of ['before', 'after']) {
      const panel = lesson.beforeAfter[side]
      if (!panel?.label) add(c, `beforeAfter.${side} missing label`)
      checkSteps(panel?.steps, `beforeAfter.${side}.steps`, 2)
    }
  }

  if (lesson.code) {
    lessonCounts.code += 1
    const code = lesson.code
    if (!Array.isArray(code.panels) || code.panels.length < 1) add(c, 'code needs 1+ panel')
    else
      code.panels.forEach((panel, i) => {
        checkText(panel?.label, `code.panels[${i}].label`, 2)
        if (!Array.isArray(panel?.lines) || !panel.lines.length) add(c, `code.panels[${i}] has no lines`)
      })
    if (!Array.isArray(code.notes) || code.notes.length < 2) add(c, 'code needs 2+ explained notes')
    else
      code.notes.forEach((note, i) => {
        checkText(note?.code, `code.notes[${i}].code`, 1)
        checkText(note?.text, `code.notes[${i}].text`, 5)
      })
  }

  if (lesson.data) {
    lessonCounts.data += 1
    const table = lesson.data
    checkText(table.title, 'data.title', 5)
    if (!Array.isArray(table.columns) || table.columns.length < 2) {
      add(c, 'data needs 2+ columns')
    } else if (!Array.isArray(table.rows) || table.rows.length < 2) {
      add(c, 'data needs 2+ rows')
    } else {
      // A row that does not line up with the header is a table that renders wrong.
      table.rows.forEach((row, i) => {
        if (!Array.isArray(row) || row.length !== table.columns.length)
          add(c, `data.rows[${i}] has ${row?.length || 0} cells for ${table.columns.length} columns`)
      })
      if (table.keyColumn && !table.columns.includes(table.keyColumn))
        add(c, `data.keyColumn "${table.keyColumn}" is not one of the columns`)
    }
    if (table.note) checkText(table.note, 'data.note', 20)
  }

  if (lesson.layers) {
    lessonCounts.layers += 1
    const layers = lesson.layers.layers
    if (!Array.isArray(layers) || layers.length < 3) add(c, 'layers needs 3+ layers')
    else
      layers.forEach((layer, i) => {
        checkText(layer?.label, `layers[${i}].label`, 3)
        checkIcon(layer?.icon, `layers[${i}]`)
        if (layer?.note) checkText(layer.note, `layers[${i}].note`, 8)
      })
  }
}

// The visual engine derives its diagrams from the prose, so every concept must
// come out of it with a usable plan. This is the guard that catches a rule that
// silently stops matching after a data change.
const planCounts = { pipeline: 0, chain: 0, architecture: 0, gate: 0, io: 0, hero: 0, parts: 0 }
const ioSources = { exchange: 0, transform: 0, flow: 0 }
let ladderCount = 0
const stageCounts = new Map()
for (const c of concepts) {
  const lesson = lessonFor(c.id)
  const plan = planVisuals(c, lesson)
  for (const key of Object.keys(planCounts)) if (plan[key]) planCounts[key] += 1

  if (!plan.pipeline) add(c, 'the visual engine produced no process pipeline')
  else {
    const stages = plan.pipeline.stages
    if (stages.length < 3) add(c, 'the process pipeline has fewer than 3 stages')
    // The strip and the walkthrough are the same list, so stage N *is* step N.
    // A mismatch would silently highlight the wrong step.
    const walkthrough = describeSteps(c.howItWorks || [])
    if (stages.length !== Math.min(walkthrough.length, 6))
      add(c, `the pipeline has ${stages.length} stages for ${walkthrough.length} steps`)
    stageCounts.set(stages.length, (stageCounts.get(stages.length) || 0) + 1)

    const ids = new Set()
    for (const stage of stages) {
      if (!stage.label) add(c, 'a process pipeline stage has no label')
      // The strip is explorable, so a stage without its own sentence would open
      // an empty panel.
      if (!stage.text) add(c, 'a process pipeline stage has no sentence for its panel')
      if (stage.text && stage.text.length < 20) add(c, 'a process pipeline stage sentence is too short to read')
      if (!stage.id) add(c, 'a process pipeline stage has no id')
      else if (ids.has(stage.id)) add(c, `duplicate process pipeline stage id "${stage.id}"`)
      else ids.add(stage.id)
      if (!iconNames.has(stage.icon)) add(c, `unknown icon "${stage.icon}" on a process pipeline stage`)
    }
  }

  // The input/process/output band only exists where the data already says what
  // goes in and what comes out, and every line it shows must have a source.
  if (plan.io) {
    ioSources[plan.io.source] += 1
    for (const [part, value] of [
      ['input', plan.io.input],
      ['process', plan.io.process],
      ['output', plan.io.output],
    ]) {
      if (!value?.label) add(c, `the input/process/output band has no ${part} label`)
      if (value?.icon && !iconNames.has(value.icon)) add(c, `unknown icon "${value.icon}" on the ${part} of the band`)
    }
    if (plan.io.source === 'exchange' && !lesson?.exchange)
      add(c, 'the band claims to come from an exchange the lesson does not have')
    if (plan.io.source === 'transform' && !plan.io.output?.label) add(c, 'a transform band has no output')
  }

  // Every interactive reference has to land somewhere: a link to a concept that
  // exists, and a stage index inside the walkthrough it points at.
  if (plan.hero) {
    const labels = new Set(plan.hero.labels)
    for (const [label, link] of Object.entries(plan.hero.links)) {
      if (!labels.has(label)) add(c, `a hero link is keyed to a node that is not drawn: "${label}"`)
      if (link.kind === 'concept' && !conceptById[link.id])
        add(c, `the hero diagram links to unknown concept "${link.id}"`)
      if (link.kind === 'concept' && link.id === c.id)
        add(c, 'the hero diagram links to the concept it is already on')
    }
    for (const label of plan.hero.selectable)
      if (!labels.has(label)) add(c, `a selectable hero node is not drawn: "${label}"`)
    if (plan.hero.initial && !plan.hero.selectable.includes(plan.hero.initial))
      add(c, 'the hero diagram starts on a node that cannot be selected')
    for (const [label, stage] of Object.entries(plan.hero.stageOfLabel)) {
      if (!Number.isInteger(stage) || stage < 0 || stage >= (plan.pipeline?.stages.length || 0))
        add(c, `hero node "${label}" points at stage ${stage}, which is off the walkthrough`)
      if (plan.hero.labelOfStage?.[stage] && plan.hero.labelOfStage[stage] !== label)
        add(c, `stage ${stage} is claimed by two hero nodes`)
    }
  }

  if (plan.chain) {
    if (plan.chain.stops.length < 2) add(c, 'the chain diagram has fewer than 2 stops')
    // One framing only: the path between machines. A chain that read the
    // walkthrough back as a sequence was the pipeline strip drawn twice.
    if (plan.chain.variant !== 'network') add(c, `unknown chain variant "${plan.chain.variant}"`)
    for (const stop of plan.chain.stops) if (!stop.label) add(c, 'a chain stop has no label')
    // …and it has to be the concept's own flow, not three steps lifted out of
    // the walkthrough.
    const heroLabels = new Set((c.visual?.nodes || []).map((node) => node.label))
    for (const stop of plan.chain.stops)
      if (!heroLabels.has(stop.label)) add(c, `chain stop "${stop.label}" is not a node of the hero diagram`)
  }

  // A page shows one reading of the flow, one picture of the pieces, and one
  // recap — never the same diagram twice in different clothes.
  if (plan.chain && plan.io) add(c, 'the page draws both a chain and an input/process/output band')
  if (plan.parts && plan.architecture)
    add(c, 'the page draws the key-parts list and the architecture map from the same tools')

  if (plan.io) {
    const parts = [
      ['input', plan.io.input],
      ['process', plan.io.process],
      ['output', plan.io.output],
    ]
    for (const [name, part] of parts) {
      if (!part?.label || part.label.trim().length < 3)
        add(c, `the ${name} of the input/process/output band says nothing`)
    }
    if (plan.io.source === 'flow') {
      const nodes = c.visual?.type === 'flow' ? c.visual.nodes || [] : []
      const at = nodes.findIndex((node) => node.label === plan.io.input.label)
      if (at < 0 || nodes[at + 2]?.label !== plan.io.output.label)
        add(c, 'a flow band shows two stops that are not either side of the concept')
      // The stop between them has to be the concept itself, or the band would be
      // reading an input and an output that do not belong to this page.
      const middle = nodes[at + 1]
      if (!middle || plan.hero?.links?.[middle.label]?.kind !== 'self')
        add(c, 'a flow band leaves the concept out of its own middle')
    }
    if (plan.io.source === 'transform') {
      if (c.visual?.type !== 'flow') add(c, 'a transform band was built from something other than a flow')
      const nodes = c.visual?.nodes || []
      if (nodes[0]?.label !== plan.io.input.label || nodes[nodes.length - 1]?.label !== plan.io.output.label)
        add(c, 'a transform band shows something other than the two ends of the flow')
    }
  }

  // The recap is copied from the page above, so it can never introduce a claim:
  // it only has to be a handful of readable cards.
  const recap = rememberFacts(c, plan, relatedTo(c))
  if (recap.length < 3 || recap.length > 5) add(c, `the recap shows ${recap.length} facts`)
  for (const fact of recap) {
    if (!fact.label || fact.label.length < 3) add(c, 'a recap card has no label')
    if (!fact.note || fact.note.length < 5) add(c, 'a recap card has no line under its label')
    if (fact.icon && !iconNames.has(fact.icon)) add(c, `unknown icon "${fact.icon}" in the recap`)
  }

  // The ladder is only built from this concept's own related concepts, so every
  // rung has to point at something real.
  const fit = fitChain(c, relatedTo(c))
  if (fit) {
    if (!Array.isArray(fit.levels) || fit.levels.length < 2) add(c, 'the ladder has fewer than two levels')
    if (!fit.caption || fit.caption.length < 30) add(c, 'the ladder has no caption of its own')
    const relatedIds = new Set((c.relatedConcepts || []))
    for (const level of fit.levels || []) {
      if (!level.label) add(c, 'a ladder level has no label')
      for (const item of level.items || [])
        if (!relatedIds.has(item.id))
          add(c, `the ladder shows "${item.id}", which is not a related concept of this page`)
    }
  }

  if (plan.architecture) {
    const tiers = plan.architecture.tiers
    if (!Array.isArray(tiers) || tiers.length < 2) add(c, 'the architecture map has fewer than 2 tiers')
    else
      for (const tier of tiers)
        for (const item of tier.items) if (!item.label) add(c, 'an architecture entry has no label')
  }
}

const names = new Map()
for (const c of concepts) {
  const key = c.name.toLowerCase()
  if (names.has(key)) add(c, `duplicate name with ${names.get(key)}`)
  names.set(key, c.id)
}

const emptyCategories = categories.filter((cat) => !categoryCounts[cat.id])

console.log(`Concepts: ${totalConcepts}`)
console.log(
  `By category: ${categories.map((c) => `${c.name} ${categoryCounts[c.id] || 0}`).join(' · ')}`,
)
console.log(`Featured: ${concepts.filter((c) => c.featured).length}`)
console.log(`Average "what" length: ${Math.round(concepts.reduce((n, c) => n + c.what.length, 0) / totalConcepts)} chars`)
console.log(`Average howItWorks steps: ${(concepts.reduce((n, c) => n + c.howItWorks.length, 0) / totalConcepts).toFixed(1)}`)
// Every concept draws exactly one of the five shapes the renderer knows, and a
// shape nothing uses would be dead weight in the renderer.
const VISUAL_TYPES = ['flow', 'stack', 'compare', 'hub', 'cycle']
for (const c of concepts) {
  if (!VISUAL_TYPES.includes(c.visual?.type)) add(c, `unknown visual type "${c.visual?.type}"`)
  if (c.comparison && !VISUAL_TYPES.includes(c.comparison.type))
    add(c, `unknown comparison visual type "${c.comparison.type}"`)
}
for (const type of VISUAL_TYPES)
  if (!concepts.some((c) => c.visual?.type === type)) add(null, `no concept uses the "${type}" visual`)
console.log(`Visual types used: ${[...new Set(concepts.map((c) => c.visual.type))].sort().join(', ')}`)
console.log(`Concepts with a comparison block: ${concepts.filter((c) => c.comparison).length}`)
const techs = concepts.flatMap((c) => c.technologies)
const withRoles = techs.filter((name) => roleForTechnology(name)).length
console.log(
  `Technology mentions with a written role: ${withRoles}/${techs.length} (${Math.round((withRoles / techs.length) * 100)}%)`,
)
console.log(
  `Visual lessons written: ${Object.keys(lessons).length}/${totalConcepts}` +
    ` · scenarios ${lessonCounts.scenario}` +
    ` · analogies mapped ${lessonCounts.mapping}` +
    ` · before/after ${lessonCounts.beforeAfter}` +
    ` · code callouts ${lessonCounts.code}` +
    ` · exchanges ${lessonCounts.exchange}` +
    ` · annotated hero diagrams ${lessonCounts.hero}` +
    ` · data tables ${lessonCounts.data}` +
    ` · layer diagrams ${lessonCounts.layers}` +
    ` (icons checked: ${lessonIconsChecked})`,
)
// Every “how it works” step is drawn with a derived title and icon, so two
// steps reading “Data” would look like a rendering bug on the page.
for (const c of concepts) {
  const seen = new Set()
  for (const step of describeSteps(c.howItWorks)) {
    if (seen.has(step.title)) add(c, `two “how it works” steps both read “${step.title}”`)
    seen.add(step.title)
  }
}
for (const c of concepts) if (fitChain(c, relatedTo(c))) ladderCount += 1
console.log(
  `Visual engine: pipeline ${planCounts.pipeline} · chains ${planCounts.chain}` +
    ` · input/output bands ${planCounts.io} · key-parts lists ${planCounts.parts}` +
    ` · architecture maps ${planCounts.architecture} · decision gates ${planCounts.gate}` +
    ` · ladders ${ladderCount}`,
)
const stageSpread = [...stageCounts.entries()].sort((a, b) => a[0] - b[0])
console.log(
  `Step-through: ${stageSpread.map(([n, count]) => `${count} concept${count === 1 ? '' : 's'} with ${n} stages`).join(' · ')}` +
    ` · clickable hero diagrams ${planCounts.hero}` +
    ` · input/process/output bands ${planCounts.io}` +
    ` (exchange ${ioSources.exchange} · transformation ${ioSources.transform} · flow ${ioSources.flow})`,
)
// A caption shared by two pages is a template, not an explanation.
const repeatedCaptions = [...captionsSeen.entries()].filter(([, ids]) => ids.length > 1)
for (const [caption, ids] of repeatedCaptions)
  add({ id: ids[1] }, `the same hero caption is used on ${ids.length} concepts: "${caption}"`)
console.log(`Hero explanation written for: ${concepts.filter((c) => c.visual?.caption).length}/${totalConcepts}`)
console.log(`Key idea present: ${concepts.filter((c) => c.keyIdea).length}/${totalConcepts}`)
console.log(`“Go deeper” written: ${concepts.filter((c) => c.deeper?.length).length}/${totalConcepts}`)
console.log(`FAQ written: ${concepts.filter((c) => c.faq?.length).length}/${totalConcepts}`)
console.log(
  `Words of extra explanation: ${concepts
    .reduce((n, c) => n + (c.deeper || []).join(' ').split(/\s+/).length + (c.faq || []).reduce((m, f) => m + `${f.q} ${f.a}`.split(/\s+/).length, 0), 0)
    .toLocaleString()}`,
)

if (emptyCategories.length) console.log(`Categories with no concepts: ${emptyCategories.map((c) => c.name).join(', ')}`)
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  problems.forEach((p) => console.log(`  - ${p}`))
  process.exitCode = 1
} else {
  console.log('\nNo problems found.')
}
