# TechXplain

**Technology, simply explained.** A visual technical glossary for beginners and students — search or
browse a technical concept and get a genuinely useful explanation: what it is, an everyday analogy,
how it works, a diagram, where it is used, a real-world example, common tools and why it matters.

Built as a **static frontend only**: all 253 concepts live in local JavaScript data files. Every concept
has a “Go deeper” section and a “Questions people ask” block — around 40,000 words of explanation in
total. Every concept page is a **visual lesson**: hand-authored diagrams, scenario grids, before/after
panels and code callouts carry the idea before a single paragraph is read.

There is no backend, no database, no authentication, no AI/LLM integration and no API calls of
any kind — every diagram is drawn from local data with HTML, CSS and SVG.

## Getting started

```bash
npm install
npm run dev         # start the dev server (http://localhost:5173)
npm run build       # production build into dist/
npm run preview     # serve the built output locally
npm run check:data  # validate every concept (fields, links, icons, visuals)
npm run audit:copy  # flag jargon, long sentences and generic wording
```

## Tech stack

- React 19
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router (`HashRouter`, so the built site works on any static host)

## Design system

Everything visual comes from the tokens in `src/index.css` — a bright light-green palette built
from translucent glass panes. **There is no white anywhere in the interface**: the lightest
surface is still a green-tinted glass fill, and even text on the dark green panels uses the pale
green `surface` token rather than `#fff`.

| token                  | value                    | used for                                    |
| ---------------------- | ------------------------ | ------------------------------------------- |
| `--color-canvas`       | `#e3f6ea`                | the page colour behind everything            |
| `--color-surface`      | `#eefcf4`                | the pale green ink used on dark panels       |
| `--color-forest`       | `#07301f`                | deep accents, the “why it matters” panel     |
| `--color-brand`        | `#0a7a4a`                | buttons, links, wordmark accent              |
| `--color-accent`       | `#22c97a`                | focus rings, diagram arrows, hover states    |
| `--color-mist`         | `#d2f2e0`                | icon tiles, highlighted panels               |
| `--color-ink`          | `#08241a`                | headings and body text                       |
| `--color-muted`        | `#436b58`                | supporting text                              |
| `--color-glass`        | `rgb(240 253 246 / .58)` | the standard translucent card fill           |
| `--color-glass-strong` | `rgb(238 252 244 / .76)` | sticky bars and anything that floats         |

### Glass and 3D

Depth comes from three cooperating pieces, all in `src/index.css`:

- **Ambient light** — `body::before` paints fixed radial blooms of bright green behind the page,
  each fading through several stops so there is never a visible banding edge. This is what the
  glass surfaces have to refract.
- **Glass** — the `glass` and `glass-strong` utilities pair a translucent green fill with
  `backdrop-filter: blur()` and a slight saturation boost. `card-surface` is `glass` plus the
  standard border, radius and elevation.
- **Real 3D** — `scene-3d` sets a shared `perspective` on a container; `lift-3d` stands a panel
  off the canvas at a small fixed angle; `tilt-3d` leans a card toward the pointer on hover; and
  `sheen` sweeps a highlight across a pane's top edge. The `--shadow-soft` / `--shadow-lift` /
  `--shadow-float` tokens each combine an inset top highlight with green-tinted depth, so every
  surface reads as a pane of glass sitting above the canvas.

The tilt, lift and sheen effects are all disabled under `prefers-reduced-motion`, along with the
`fade-up`, `flow-dash` and `soft-float` animations.

### Writing the markup

### Category accents are green too

Category accents live in `src/data/categories.js` as plain hex values and are applied with inline
styles and alpha suffixes (`${color}24`), never as generated Tailwind class names.

All eleven accents are bright, saturated greens — the categories are told apart by hue (lime →
green → emerald → teal), not by switching to a different colour family. That is what keeps the
whole site reading as one green theme. Each accent is chosen to clear two contrast bars:

- **3:1** as an icon glyph on the canvas,
- **4.5:1** under the deep-ink text used on the small numbered badges.

That second bar is why the numbered badges use `text-ink` rather than a light colour: the accents
are bright, so dark text is what stays legible on them. Because of it, the accent hexes sit in a
fairly narrow brightness band — if you brighten one much further, re-check the badge contrast.

Colour is never the only signal: every category dot and tile sits next to the category's name.

When adding markup, prefer `glass` over any opaque background, and reserve `bg-surface` for the
few light chips that sit *on top of* a dark forest panel (for example the small icon tile inside
the code callout). Reach for `bg-mist` for tinted highlight strips. Run a quick search for `white`
before you finish — the answer should always be zero.

**Never show content statistics in the interface.** The site has no “253 concepts”, no category
counts and no marketing badge — the content speaks for itself. Counts belong in this README and in
`npm run check:data` output only.

## Project structure

```
scripts/
  check-data.mjs         data integrity check (run with npm run check:data)
  audit-copy.mjs         writing-quality audit (run with npm run audit:copy)
src/
  App.jsx                routes + layout shell
  index.css              Tailwind theme tokens, base styles, one fade-up animation
  components/
    Navbar.jsx           TechXplain | Explore | Categories | Search
    Footer.jsx
    Logo.jsx
    SearchBar.jsx        instant local search + suggestion dropdown
    HeroVisual.jsx       homepage “everything connects” ecosystem illustration
    ConceptCard.jsx      concept / related-concept card
    CategoryCard.jsx
    ConceptVisual.jsx    all diagrams: flow, stack, compare, hub, cycle
    LessonVisuals.jsx    lesson diagrams: scenario grid, exchange, mapping,
                         before/after, code callout, parts, ecosystem
    SectionHeading.jsx
    EmptyState.jsx       friendly “No concept found.”
    Icon.jsx             hand-written monoline SVG icon set
  lib/
    search.js            local ranking search (partial, case-insensitive)
  data/
    categories.js        the 11 categories
    technology-roles.js  short roles and icons for well-known tools (Key parts)
    lesson-grammar.js    derives step icons/titles, use-case cards, analogy
                         glyphs and short flows from existing prose
    concepts.js          aggregates every concept file + helper exports
    lessons.js           aggregates every lesson file + lessonFor(id)
    concepts-programming.js      Programming (27)
    concepts-web.js              Web Development (31)
    concepts-frontend.js         Frontend (18)
    concepts-backend.js          Backend (22)
    concepts-databases.js        Databases (24)
    concepts-ai.js               AI & Machine Learning (26)
    concepts-cloud.js            Cloud (20)
    concepts-devops.js           DevOps (23)
    concepts-networking.js       Networking (24)
    concepts-security.js         Cybersecurity (20)
    concepts-engineering.js      Software Engineering (18)
    lessons-programming.js       visual lesson content, one file per category
    lessons-web.js               (253/253 concepts covered across the 11 files)
    lessons-frontend.js   lessons-backend.js   lessons-databases.js
    lessons-ai.js         lessons-cloud.js     lessons-devops.js
    lessons-networking.js lessons-security.js  lessons-engineering.js
  pages/
    Home.jsx  Explore.jsx  Categories.jsx  CategoryPage.jsx  ConceptPage.jsx  NotFound.jsx
```

## Adding a concept

Append an object to the relevant file in `src/data/` with this shape:

```js
{
  id: 'cloud-computing',       // used in the URL: /#/concept/cloud-computing
  name: 'Cloud Computing',
  aliases: ['the cloud'],      // extra search terms
  category: 'cloud',           // must match an id in categories.js
  icon: 'cloud',               // must match a name in components/Icon.jsx
  keywords: ['rented servers'],// related terms that also match search
  shortDescription: 'One line that appears on cards and at the top of the page.',
  keyIdea: 'One sentence takeaway, shown in the highlighted Key idea box.',
  deeper: [                    // optional: the “Go deeper” section, 3 paragraphs
    'A more technical angle on the same idea.',
    'A second angle — a trade-off, a pitfall or how it works under the hood.',
    'A third angle that leaves the reader with something concrete.',
  ],
  faq: [                       // optional: “Questions people ask”, 3 short answers
    { q: 'A question beginners really ask?', a: 'A direct answer in one or two sentences.' },
    { q: 'A second question?', a: '…' },
    { q: 'A third question?', a: '…' },
  ],
  what: '2–4 beginner-friendly sentences answering “what is it?”.',
  analogy: 'An everyday comparison — “Think of it like this”.',
  howItWorks: ['Step one', 'Step two', 'Step three'],
  visual: { type: 'flow', nodes: [...], caption: '…' },
  whereUsed: ['…', '…', '…', '…'],      // 4–6 use cases
  examples: ['A real situation an ordinary person would recognise.'],
  technologies: ['AWS', 'Azure'],
  whyItMatters: 'One short paragraph on why developers care.',
  relatedConcepts: ['server', 'dns'],   // ids of other concepts
  comparison: {                // optional: a two-panel “how it compares” block
    type: 'compare',
    left: { icon: 'monitor', title: 'Frontend', points: ['…', '…'] },
    right: { icon: 'server', title: 'Backend', points: ['…', '…'] },
    caption: 'One line that sums up the contrast.',
  },
}
```

Useful extras: `featured: true` puts the concept in the homepage “Popular concepts” section.
Run `npm run check:data` afterwards — it verifies required fields, minimum lengths, valid categories,
unique ids and names, known icons, valid visual types and that every `relatedConcepts` id exists. When
`deeper` and `faq` are present they are checked too (3 paragraphs of 80+ characters, 3 questions with
real answers), and the summary reports how many concepts have them and how many words they add.

To make the new concept visually teachable, add a matching entry to the right `lessons-*.js` file
(see **The lesson layer** above). It is optional — the page falls back to derived visuals — but an
authored scenario, mapping or code callout is what makes the page really teach.

## Concept page structure

Every concept page is a **visual lesson**, not a wall of text. It reads top to bottom as
**headline → visual → short explanation → example → visual → deeper explanation**:

1. **Hero, words and diagram together** — the opening is one band: icon, category eyebrow, name,
   description and “Also called” aliases on the left; the full hero diagram on the right, sized so
   its relationships are readable without scrolling (`size="hero"`). They sit side by side from `lg`
   and stack words-first on smaller screens. Below the band, the **Key idea** strip. The diagram's
   caption is labelled **What's happening?** and printed as a real answer beside that label —
   concept-specific and written into the data, never derived. Where a node names another concept the
   node is a link to it; where a node is this concept, the node is a button. Underneath, the
   **You're looking at** panel explains whichever node is selected, in that node's own words, with
   the concept's input and output when it has them
2. **What is X?** — a split section: 2–4 sentences on the left; on the right either the **Key parts**
   list (tools and their roles) when the page has no architecture map, or a derived
   **start / then / end** flow when it does — never both, because both are drawn from the same tool
   list
3. **See it in real life** — a numbered **scenario grid** of concrete stops (authored, or built from
   the concept's `whereUsed`)
4. **Think of it like this** — the everyday analogy beside a **mapping diagram** pairing each piece
   of the analogy with the real thing
5. **How does it work?** — the centrepiece, with its own line: *“Explore the process step by step —
   pick any stage to read it in place.”* The process appears as an **explorable pipeline strip**,
   then the steps as a numbered timeline; each step gets a derived icon and a short headline taken
   from its own first words, so the sequence scans as a story rather than a wall of sentences. The
   strip and the timeline are one control: picking a stage highlights that step here, and picking a
   stage never scrolls away from a step that is already on screen. Once the reader moves away from
   the start, a quiet **Reset view** control appears in the section header and disappears again when
   they are back
6. **What goes in, what comes out** — the input → process → output band, for the concepts whose
   data really says what goes in and what comes out; otherwise the chain appears as **The path it
   takes** for concepts whose subject is the journey between machines — one second reading of the
   flow per page, never two
7. **How the pieces fit together** — the architecture map, when the tool list really describes one
8. **Seen from the inside** — code as **code → what it does → what comes out** (or a side-by-side
   callout when the block is a request and a response)
9. **The data itself** — a real table for concepts that are only clear once you see the rows
10. **Why does it matter?** — the highlighted takeaway, straight after the diagrams it explains
11. **Under the hood** — the beginner line as the **Simple view**, with the deeper paragraphs behind
    a **Technical view** disclosure that starts closed, so page depth is opt-in
12. **How it compares** — the optional `comparison` block, rendered as a two-panel comparison
13. **Before and after** — an optional two-panel change diagram
14. **You use X when…** — one section at two altitudes: the real-world moment written out as a
    story, then icon cards for the concrete situations and the role the concept plays in each
15. **Questions people ask** — the `faq` block as two-column question cards
16. **The layers** / **How it decides** — the optional layer diagram and decision gate
17. **Remember** — the page in three to five scannable cards, each one copied from a section the
    reader has just been through: what it is, what goes in and out, where you meet it, what to read
    next. The recap can only repeat the page, never add a claim
18. **Where this fits** — a **ladder** when the concept really sits on one of the four levels of a
    running system (what people see → the services → where data lives → the machines underneath)
    and something it relates to sits on another level; otherwise the ecosystem map, which never
    claims a level it cannot show
19. **Learn this next** — the related concepts as a numbered path in the order the page lists them,
    then their cards
20. **Keep going** — the footer links back to the category and the full explore page

No concept renders all of these: the visual engine adds only the sections that concept earns, so a
page lands somewhere between ten and thirteen sections depending on what it has to teach.

### The visual engine

Hand-designing 253 pages does not scale, so the diagrams are **chosen by the data**. Every
concept is handed to `planVisuals(concept, lesson)` in `src/data/visual-plan.js`, which looks at its
category, its hero diagram, the shape of its “how it works” steps, its hand-written lesson and the
tools it lists, then returns the set of templates that genuinely help *that* concept:

| template           | what it shows                                        | who gets it                                          |
| ------------------ | ---------------------------------------------------- | ---------------------------------------------------- |
| `PipelineStrip`    | the whole process as numbered stages — explorable    | every concept                                        |
| `InputProcessOutput` | input → process → output, with real values         | 76 concepts whose data says what goes in and out     |
| `FlowChain`        | the hero flow re-framed as a path between machines    | 9 concepts whose subject is that journey             |
| `PartsDiagram`     | the tools behind the concept, with their roles        | 222 concepts (stands down where a map is drawn)      |
| `ArchitectureMap`  | tools grouped into the level of the stack they sit on | 31 concepts with a real spread of tools              |
| `FitLadder`        | a running system as four levels, with the reader on one | 61 concepts with a related concept on another level |
| `RememberRecap`    | the page in three to five scannable fact cards        | every concept                                        |
| `GateFlow`         | a checkpoint with its allowed / stopped outcomes      | the 9 concepts that are genuinely decision points    |
| `DataTable`        | an actual table, written by hand for the concept      | the data concepts                                    |
| `LayerStack`       | a system as stacked, named levels                     | authored per concept where layers are the point      |
| `CodeToVisual`     | code → what it does → what comes out                  | any single-panel code block with notes               |

Three rules keep the engine honest, and all three matter more than coverage:

1. **Nothing is invented.** Every label comes from data already on the page — the hero diagram's
   nodes, the how-it-works steps, the lesson, or the tool list. The engine never writes new claims
   about a technology.
2. **Never re-draw the hero.** If a concept's hero is already a flow, the engine only adds a chain
   when it reframes that flow as a journey between machines. One page never carries two input →
   output diagrams: where the band can tell that story, the chain steps aside. The same rule retired
   two older framings that taught nothing: a “sequence of stops” chain built from three walkthrough
   steps (the pipeline drawn a third time), and a band whose ends came from step labels (“Network →
   IPv4 → Monitoring”). A framing has to be the concept's own flow, read differently — otherwise the
   page keeps the diagram it has.
3. **A link is only drawn when it is exact.** A diagram node becomes a link to another concept only
   when its label *is* that concept's name or one of its aliases, and it only counts as “this
   concept” when the label spells the name out (“Interpreter reads a line” for Interpreter). A node
   that is merely related stays plain text, because a wrong link is worse than a plain label.

Where a diagram would be wrong, it is dropped rather than drawn. An earlier version of the
architecture map grouped tools from a single weak match and drew confident-looking tiers that were
simply incorrect; it now requires two real tiers, four mapped tools and at least one tier with
neighbours before it renders. The decision gate is limited to concepts whose names are actual
checkpoints — an “allowed / stopped” split makes no sense for Encryption, which decides nothing.

The **input → process → output band** is the strictest of the three-stories: it needs a
hand-written request/response in the lesson (38 concepts), a stop of the concept's own flow with a
stop on either side of it, so “Application → Query → Database → Result” reads as Query → Database →
Result, a flow that is a transformation the concept sits inside (20), and never a pair of ends
guessed from walkthrough titles. Anything else the band is simply absent from.

`npm run check:data` reports engine coverage and fails if a concept comes out with no pipeline, a
pipeline stage without its own sentence or id, a pipeline that does not match the walkthrough step
for step, a band with a nameless part, a band whose ends are not the flow's own stops around the
concept, a hero link to a concept that does not exist, a hero node pointing at a stage that is off
the walkthrough, a chain with fewer than two stops, a chain stop that is not a node of the hero, a
page drawing both a chain and a band, a page drawing the key-parts list and the architecture map
from the same tools, a shared hero caption, or an architecture map with fewer than two tiers.

### Interaction

A long page of diagrams is still a scroll, so one diagram is **explorable** rather than static: the
pipeline strip. `src/components/Interactive.jsx` holds the site's whole interaction budget — one
control and one panel, and nothing that runs on its own:

- `useStepper(count, { index, onChange })` keeps a selected index, wrapping at both ends. It runs on
  its own state when the diagram is the only thing that cares and on the page's state when
  something else has to follow the same selection, so the selection never lives in two places.
- `StepControl` is the control: “stage 3 / 5” with a back and a forward button. Buttons rather than
  a slider, so it is keyboard and screen-reader operable with no extra work.
- `DetailCard` is the panel, marked `aria-live="polite"` so the selected stage is announced.
- `InspectorPanel` is the other panel: what the selected diagram node is, in its own words.
- `TravelPulse` is the bead of light that travels along a connector.

The strip therefore works three ways: pick a stage, use the control, or ignore both and read the
numbered walkthrough underneath, which is still the full explanation. The strip itself prints stage
titles only — the sentence the panel shows is that stage's own text, carried through by
`processPipeline`, so nothing is ever written for the panel alone.

**One selection, four places.** The page keeps a single `{ stage, node }` in `ConceptPage`, and the
strip, the walkthrough, the hero diagram and the panel all read from it:

- Picking a stage highlights that step in the walkthrough — accent border, mist background, a solid
  number chip and a lift — while every other step stays readable. If the step is off screen the page
  scrolls to it gently (never `scrollIntoView` on a step that is already visible), `scroll-mt-28`
  keeps it clear of the sticky navbar, and `prefers-reduced-motion` turns the smooth scroll into a
  jump.
- Where the page's own words connect the two, picking a stage also rings the diagram node that
  step mentions, and picking a node moves the strip to the step that mentions it — the link is
  derived by matching the node's label inside the step's sentence, and only when exactly one step
  matches, so the sync can never point at the wrong place.
- In the diagram, a node that names another concept is a **link** (“Explore”), a node that is this
  concept is a **button** (“Select”), and anything else is plain text. The two always have different
  behaviour, so a click never does the same thing twice. The strip and the walkthrough are always
  plain buttons and links — never a clickable `div`.

**Appropriate richness, decided by the engine.** 93 of the 253 concepts get an interactive hero
(83 with a selectable node, 33 with a link out), 76 get the band, 9 a chain, 61 a ladder, 31 an
architecture map and 9 a decision gate. The rest render exactly what they did before — the engine
adds a diagram only where the data already supports one.

The panel leads with that sentence, not with the stage's short label, and the label goes in the tag
line beside the stage number. The labels come from keyword matching, so they are sometimes only
nearly right — “Screen” labels a DNS step that is really about asking a resolver. The label is a
good chip on a card and a poor headline over someone's only sentence.

Motion follows the same restraint. `.animate-flow-dash` runs along every connector so direction reads
at a glance, `.animate-fade-up` staggers items as a diagram arrives, and the travelling bead appears
**only** on the explorable diagram — a bead on every arrow would turn a page of diagrams into a
fairground. All of it collapses under `prefers-reduced-motion`.

### The lesson layer

The **visual lesson** blocks are hand-authored content kept separate from the glossary prose, one
file per category (`src/data/lessons-*.js`), merged by `src/data/lessons.js` and looked up with
`lessonFor(id)`. Everything is optional — **all 253 concepts have a lesson entry today**:

```js
{
  hero: { notes: { 'Frontend': 'Asks for things' }, links: ['request'] },
  exchange: { request: { label: 'Request', text: '…' }, via: '…', response: { label: 'Response', text: '…' } },
  scenario: { title: '…', steps: [{ icon: 'userCheck', label: '…', note: '…' }], note: '…' },
  mapping:  { title: '…', pairs: [{ icon: 'box', analogy: '…', reality: '…' }], note: '…' },
  beforeAfter: { before: { label: '…', steps: ['…'] }, after: { label: '…', steps: ['…'] }, note: '…' },
  code: { title: '…', panels: [{ label: 'total.js', lines: ['…'] }], notes: [{ code: '…', text: '…' }] },
}
```

Where a block is missing, `src/data/lesson-grammar.js` derives one deterministically from the prose
that is already on the page: step icons and short headlines, use-case cards and notes, analogy glyphs
and the start / then / end flow. Nothing is generated at runtime by a model — it is a fixed set of
ordered keyword rules, so the same concept always renders the same way.

`npm run check:data` validates the lesson layer too: known concept ids and icon names, minimum step
and text counts, placeholder text, hero notes that must match real diagram node labels, and hero link
counts that must match the number of arrows. `npm run audit:copy` includes lesson prose in its jargon,
formal-phrasing, generic-wording and long-sentence scans.

## Visual types

Visuals are drawn with HTML/CSS/SVG from the data — no images, no external services:

| type      | shape                                     | good for                |
| --------- | ----------------------------------------- | ----------------------- |
| `flow`    | chain of boxes with arrows                | request/response flows  |
| `stack`   | stacked layers, top layer highlighted     | layered systems         |
| `compare` | two panels side by side                   | X vs Y explanations     |
| `hub`     | one centre node with satellites           | toolkits, clusters      |
| `cycle`   | numbered steps that loop back             | repeating processes     |

## Search behaviour

`src/lib/search.js` builds a small in-memory index from each concept's name, aliases, hand-written
keywords, category, description, technologies and examples. Ranking: exact name, name prefix, name
substring, alias matches, then whole-word keyword hits, with a bonus for word-boundary matches and
simple singular/plural handling (`containers` → Container). Searching `server` finds Server, Web
Server, Application Server, Database Server and Backend; searching `ai` finds the whole AI family.
An unmatched query shows **No concept found.** with links to the categories.
