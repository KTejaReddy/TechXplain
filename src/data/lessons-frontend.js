/**
 * Visual lesson content for the frontend concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const frontendLessons = {
  frontend: {
    hero: {
      notes: {
        User: 'you, in a browser',
        'Frontend (browser)': 'everything you can see',
        API: 'how it asks for data',
        Backend: 'where the work happens',
      },
      links: ['clicks and types', 'sends a request', 'returns a result'],
    },
    mapping: {
      title: 'The part of the shop you walk into',
      pairs: [
        { icon: 'monitor', analogy: 'Shelves and signs', reality: 'layout and styling' },
        { icon: 'target', analogy: 'Handles you can pull', reality: 'buttons and forms' },
        { icon: 'chat', analogy: 'Asking about stock', reality: 'calling the API' },
        { icon: 'cog', analogy: 'The stock room', reality: 'the backend, invisible to you' },
      ],
    },
    scenario: {
      title: 'You browse an online shop',
      steps: [
        { icon: 'search', label: 'You open the site', note: 'the frontend loads' },
        { icon: 'target', label: 'You filter by size', note: 'no page reload' },
        { icon: 'send', label: 'It asks the API for stock' },
        { icon: 'layers', label: 'Cards redraw in place' },
        { icon: 'box', label: 'You add one to the basket', note: 'the badge updates' },
      ],
      note: 'Everything you see and touch is the frontend; everything else is somebody else asking on your behalf.',
    },
  },

  react: {
    mapping: {
      title: 'Building with bricks, not hammers',
      pairs: [
        { icon: 'puzzle', analogy: 'A brick', reality: 'a component' },
        { icon: 'package', analogy: 'What you hand to it', reality: 'props' },
        { icon: 'table', analogy: 'What it remembers', reality: 'state' },
        { icon: 'refresh', analogy: 'Rebuilding only what changed', reality: 're-rendering' },
      ],
    },
    code: {
      title: 'A component is a function',
      panels: [
        {
          label: 'Price.jsx',
          lines: ['function Price({ amount }) {', '  return <p>£{amount.toFixed(2)}</p>', '}'],
        },
      ],
      notes: [
        { code: 'Price', text: 'the name you use as a tag' },
        { code: '{ amount }', text: 'the data handed in from the parent' },
        { code: 'return <p>', text: 'the markup it draws' },
      ],
    },
    scenario: {
      title: 'A product grid built from one component',
      steps: [
        { icon: 'puzzle', label: 'You write one ProductCard' },
        { icon: 'table', label: 'The list of products arrives' },
        { icon: 'layers', label: 'The grid maps over them', note: 'one card per product' },
        { icon: 'monitor', label: 'Each card draws itself' },
      ],
      note: 'One component, forty products — that is the whole reason component libraries exist.',
    },
  },

  components: {
    mapping: {
      title: 'Lego, not a sculpture',
      pairs: [
        { icon: 'puzzle', analogy: 'One brick', reality: 'a button, a card, a menu' },
        { icon: 'package', analogy: 'What it accepts', reality: 'its props' },
        { icon: 'layers', analogy: 'Built into a model', reality: 'composed into a page' },
        { icon: 'refresh', analogy: 'Swap one brick', reality: 'change one place, update everywhere' },
      ],
    },
    scenario: {
      title: 'Redesigning every button at once',
      steps: [
        { icon: 'puzzle', label: 'One Button component exists' },
        { icon: 'search', label: 'It is used in 60 places' },
        { icon: 'cog', label: 'You change its padding once' },
        { icon: 'check', label: 'All 60 update', note: 'no search and replace' },
      ],
      note: 'Components are the difference between a design change taking minutes instead of a week.',
    },
  },

  props: {
    code: {
      title: 'Data flows down',
      panels: [
        {
          label: 'App.jsx',
          lines: ['<Card title="Invoice" total={39.9} />', '<Card title="Refund" total={-12} />'],
        },
      ],
      notes: [
        { code: 'title, total', text: 'the names the component expects' },
        { code: '"Invoice"', text: 'a value passed in from the parent' },
        { code: 'read-only', text: 'a component never edits its own props' },
      ],
    },
    scenario: {
      title: 'One card, three invoices',
      steps: [
        { icon: 'puzzle', label: 'Card is written once' },
        { icon: 'package', label: 'Each use passes different values' },
        { icon: 'layers', label: 'Three cards draw' },
        { icon: 'check', label: 'All look the same, show different data' },
      ],
      note: 'Props are how a parent tells a child what to show — and why components stay reusable.',
    },
  },

  state: {
    code: {
      title: 'A value the component owns',
      panels: [
        {
          label: 'Tabs.jsx',
          lines: ['const [tab, setTab] = useState("overview")', '', '<button onClick={() => setTab("billing")}>'],
        },
      ],
      notes: [
        { code: 'useState', text: 'remembers a value between renders' },
        { code: 'setTab', text: 'changing it redraws the component' },
        { code: 'state', text: 'data that changes while the app runs' },
      ],
    },
    scenario: {
      title: 'Switching between two tabs',
      steps: [
        { icon: 'target', label: 'You click “Billing”' },
        { icon: 'cog', label: 'State changes', note: 'tab = billing' },
        { icon: 'refresh', label: 'The component redraws' },
        { icon: 'monitor', label: 'The billing panel appears' },
      ],
      note: 'State is the difference between a page that just sits there and one that responds.',
    },
  },

  hooks: {
    mapping: {
      title: 'Sockets on a wall',
      pairs: [
        { icon: 'plug', analogy: 'A power socket', reality: 'a hook you can attach to' },
        { icon: 'table', analogy: 'Remember a setting', reality: 'useState' },
        { icon: 'refresh', analogy: 'Do something after a change', reality: 'useEffect' },
        { icon: 'scale', analogy: 'Rules of the wall', reality: 'call hooks at the top level, never in a loop' },
      ],
    },
    code: {
      title: 'Remember, then react',
      panels: [
        { label: 'Search.jsx', lines: ['const [q, setQ] = useState("")', '', 'useEffect(() => { fetchResults(q) }, [q])'] },
      ],
      notes: [
        { code: 'useState', text: 'the value being watched' },
        { code: 'useEffect', text: 'run this when something changes' },
        { code: '[q]', text: 'the list of things to watch' },
      ],
    },
    scenario: {
      title: 'Loading orders when a page opens',
      steps: [
        { icon: 'monitor', label: 'The orders page mounts' },
        { icon: 'zap', label: 'useEffect runs once' },
        { icon: 'send', label: 'It fetches the orders' },
        { icon: 'table', label: 'State fills with data' },
        { icon: 'layers', label: 'The table draws' },
      ],
      note: 'Hooks let a plain function component remember things and react to changes.',
    },
  },

  'virtual-dom': {
    beforeAfter: {
      before: {
        label: 'Editing the page directly',
        steps: [
          { icon: 'refresh', label: 'Every change touches the real DOM' },
          { icon: 'chart', label: '1,000 rows means 1,000 edits' },
          { icon: 'clock', label: 'The browser relayouts constantly', note: 'visible stutter' },
        ],
      },
      after: {
        label: 'Comparing two trees',
        steps: [
          { icon: 'layers', label: 'A new lightweight tree is built' },
          { icon: 'search', label: 'It is compared with the old one' },
          { icon: 'zap', label: 'Only the differences are applied', note: 'a handful of real edits' },
        ],
      },
      note: 'The browser work is what costs time — the virtual tree just makes fewer of those trips necessary.',
    },
    scenario: {
      title: 'A live table of 5,000 rows',
      steps: [
        { icon: 'table', label: 'Data updates every second' },
        { icon: 'layers', label: 'A new tree is built cheaply' },
        { icon: 'search', label: 'Only 12 cells differ' },
        { icon: 'monitor', label: 'Only those 12 redraw' },
      ],
      note: 'Without the comparison, the whole table would be rebuilt on every tick.',
    },
  },

  jsx: {
    code: {
      title: 'Markup inside JavaScript',
      panels: [
        {
          label: 'Greeting.jsx',
          lines: ['const name = "Ada"', '', 'return <h1 className="title">Hello {name}</h1>'],
        },
      ],
      notes: [
        { code: '{name}', text: 'a value dropped into the markup' },
        { code: 'className', text: 'class is called className here' },
        { code: 'compiles to', text: 'plain function calls building the page' },
      ],
    },
    mapping: {
      title: 'HTML wearing a JavaScript coat',
      pairs: [
        { icon: 'window', analogy: 'Tags', reality: 'the same elements as HTML' },
        { icon: 'table', analogy: 'Blank slots', reality: 'values inside braces' },
        { icon: 'cog', analogy: 'Written next to logic', reality: 'so data and markup stay together' },
        { icon: 'puzzle', analogy: 'Turned into plain code', reality: 'the build step does the translation' },
      ],
    },
    scenario: {
      title: 'The greeting at the top of a dashboard',
      steps: [
        { icon: 'table', label: 'The logged-in user is known' },
        { icon: 'fileCode', label: 'JSX mixes it into the markup' },
        { icon: 'puzzle', label: 'The build turns JSX into code' },
        { icon: 'monitor', label: '“Hello Ada” appears' },
      ],
      note: 'You write what it should look like; the tooling worries about how the browser gets it.',
    },
  },

  typescript: {
    code: {
      title: 'JavaScript with promises kept',
      panels: [
        {
          label: 'cart.ts',
          lines: ['type Item = { name: string; price: number }', '', 'function total(items: Item[]) {', '  return items.reduce((sum, i) => sum + i.price, 0)', '}'],
        },
      ],
      notes: [
        { code: 'type Item', text: 'the shape every item must have' },
        { code: 'items: Item[]', text: 'an array of exactly that shape' },
        { code: 'i.price', text: 'typos here fail before the code runs' },
      ],
    },
    scenario: {
      title: 'A team changing a shared API shape',
      steps: [
        { icon: 'cycle', label: 'A field is renamed' },
        { icon: 'alert', label: 'The editor flags 14 broken files', note: 'instantly' },
        { icon: 'cog', label: 'They are fixed before review' },
        { icon: 'shieldCheck', label: 'The release passes' },
      ],
      note: 'Types are documentation that the computer actually checks.',
    },
  },

  'tailwind-css': {
    code: {
      title: 'Styling where the markup is',
      panels: [
        {
          label: 'Card.jsx',
          lines: ['<div className="rounded-2xl border border-slate-200 p-6', '  shadow-sm hover:-translate-y-1">'],
        },
      ],
      notes: [
        { code: 'rounded-2xl', text: 'corner radius, one utility class' },
        { code: 'p-6', text: 'padding, on one scale' },
        { code: 'hover:', text: 'state variants sit next to the value they change' },
      ],
    },
    scenario: {
      title: 'Rebuilding a card without a stylesheet',
      steps: [
        { icon: 'window', label: 'The markup exists' },
        { icon: 'eye', label: 'You add classes to it', note: 'no file switching' },
        { icon: 'check', label: 'The card looks right' },
        { icon: 'package', label: 'Unused styles are stripped', note: 'tiny stylesheet in the build' },
      ],
      note: 'The trade is a busier className in exchange for never wondering which file owns a rule.',
    },
  },

  bootstrap: {
    mapping: {
      title: 'Flat-pack furniture',
      pairs: [
        { icon: 'box', analogy: 'The box of parts', reality: 'ready-made components' },
        { icon: 'cog', analogy: 'Instructions', reality: 'class names you memorise' },
        { icon: 'zap', analogy: 'Assembled in an afternoon', reality: 'a usable admin page fast' },
        { icon: 'eye', analogy: 'Looks like everyone else’s', reality: 'the cost of using the defaults' },
      ],
    },
    scenario: {
      title: 'An internal tool needed by Friday',
      steps: [
        { icon: 'box', label: 'You add Bootstrap' },
        { icon: 'layers', label: 'Cards and modals come ready' },
        { icon: 'check', label: 'A working admin page by Thursday' },
        { icon: 'eye', label: 'It looks generic — and that is fine' },
      ],
      note: 'For tools only staff use, speed beats a bespoke look.',
    },
  },

  'responsive-design': {
    code: {
      title: 'One page, several layouts',
      panels: [
        { label: 'layout.css', lines: ['@media (min-width: 768px) {', '  .grid { grid-template-columns: repeat(3, 1fr) }', '}'] },
      ],
      notes: [
        { code: '@media', text: '“when the screen is at least this wide”' },
        { code: 'min-width', text: 'mobile-first rules that add layouts as space appears' },
        { code: 'fluid', text: 'percentages and limits so nothing overflows' },
      ],
    },
    scenario: {
      title: 'The same shop on two devices',
      steps: [
        { icon: 'smartphone', label: 'On a phone', note: 'one column, big targets' },
        { icon: 'layers', label: 'The screen grows' },
        { icon: 'monitor', label: 'On a laptop', note: 'three columns, sidebar appears' },
        { icon: 'check', label: 'Same content, no pinch-zoom' },
      ],
      note: 'Good responsive layout is not two designs — it is one design that bends.',
    },
  },

  accessibility: {
    code: {
      title: 'Hints that cost nothing',
      panels: [
        {
          label: 'search.jsx',
          lines: ['<label htmlFor="q">Search</label>', '<input id="q" type="search" />', '<img src="chart.png" alt="Sales rising 12% in March" />'],
        },
      ],
      notes: [
        { code: '<label>', text: 'tells a screen reader what the field is for' },
        { code: 'alt', text: 'describes an image instead of leaving it blank' },
        { code: 'keyboard', text: 'everything reachable with Tab alone' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'Ignored',
        steps: [
          { icon: 'userCheck', label: 'A screen reader user arrives' },
          { icon: 'chat', label: 'It reads “button, button, button”' },
          { icon: 'x', label: 'They cannot complete the task' },
        ],
      },
      after: {
        label: 'Considered',
        steps: [
          { icon: 'userCheck', label: 'The same user arrives' },
          { icon: 'chat', label: 'It reads “Search for products”' },
          { icon: 'checkCircle', label: 'They finish in the same time' },
        ],
      },
      note: 'Contrast, labels and keyboard order are three small habits that decide whether the site works for everyone.',
    },
    scenario: {
      title: 'Buying a ticket without a mouse',
      steps: [
        { icon: 'target', label: 'You press Tab through the form' },
        { icon: 'eye', label: 'Focus is always visible' },
        { icon: 'check', label: 'Every control has a name', note: '“seat B12, available”' },
        { icon: 'coin', label: 'You pay and it works' },
      ],
      note: 'Accessible sites are also faster to use for everybody else.',
    },
  },

  'browser-rendering': {
    mapping: {
      title: 'From text file to pixels',
      pairs: [
        { icon: 'fileCode', analogy: 'Reading the plans', reality: 'parsing HTML into a tree' },
        { icon: 'eye', analogy: 'Choosing colours and sizes', reality: 'style calculation' },
        { icon: 'layers', analogy: 'Measuring where everything goes', reality: 'layout' },
        { icon: 'monitor', analogy: 'Painting the walls', reality: 'painting, then compositing' },
      ],
    },
    scenario: {
      title: 'Why a blank flash happens',
      steps: [
        { icon: 'download', label: 'HTML arrives in pieces' },
        { icon: 'layers', label: 'A tree is built', note: 'incomplete at first' },
        { icon: 'monitor', label: 'Something is painted early', note: 'layout shifts' },
        { icon: 'refresh', label: 'Later content replaces it' },
      ],
      note: 'Reserve space for images and fonts and the jitter disappears.',
    },
  },

  nextjs: {
    code: {
      title: 'Folders become URLs',
      panels: [
        { label: 'app/products/[id]/page.jsx', lines: ['export default async function Page({ params }) {', '  const product = await getProduct(params.id)', '  return <h1>{product.name}</h1>', '}'] },
      ],
      notes: [
        { code: 'folders', text: 'the path on disk is the path in the browser' },
        { code: 'async', text: 'the page can fetch before it is sent' },
        { code: 'params', text: 'the [id] part comes from the URL' },
      ],
    },
    scenario: {
      title: 'A shop that ranks in search',
      steps: [
        { icon: 'folder', label: 'You add a folder per page' },
        { icon: 'server', label: 'Each page renders on the server', note: 'full HTML for crawlers' },
        { icon: 'zap', label: 'Static pages are cached at the edge' },
        { icon: 'monitor', label: 'Visitors get it instantly' },
      ],
      note: 'It handles the plumbing — routing, rendering and asset optimisation — so you write pages instead of config.',
    },
  },

  'state-management': {
    beforeAfter: {
      before: {
        label: 'Passing props down',
        steps: [
          { icon: 'package', label: 'Cart data lives at the top' },
          { icon: 'layers', label: 'Passed through four components' },
          { icon: 'alert', label: 'Half of them do not need it', note: 'prop drilling' },
        ],
      },
      after: {
        label: 'A shared store',
        steps: [
          { icon: 'box', label: 'Cart is kept in one store' },
          { icon: 'plug', label: 'Any component reads what it needs' },
          { icon: 'refresh', label: 'The badge and the page stay in sync', note: 'one source of truth' },
        ],
      },
      note: 'Reach for a store when several distant parts of the app need the same changing data.',
    },
    scenario: {
      title: 'A basket badge in the header',
      steps: [
        { icon: 'target', label: 'You add a shirt', note: 'deep in the catalogue' },
        { icon: 'box', label: 'The store updates' },
        { icon: 'refresh', label: 'The header re-renders' },
        { icon: 'monitor', label: 'The badge shows 1', note: 'no connection between them' },
      ],
      note: 'The header and the product page never talk to each other — they both just read the store.',
    },
  },

  bundler: {
    beforeAfter: {
      before: {
        label: 'Files as written',
        steps: [
          { icon: 'folder', label: '240 source files' },
          { icon: 'download', label: 'Every import is a request' },
          { icon: 'clock', label: 'Slow on a phone connection' },
        ],
      },
      after: {
        label: 'After bundling',
        steps: [
          { icon: 'puzzle', label: 'Imports are followed and combined' },
          { icon: 'package', label: 'A handful of optimised files' },
          { icon: 'zap', label: 'Loaded in one or two requests', note: 'already minified' },
        ],
      },
      note: 'It also translates modern syntax so older browsers can still run your code.',
    },
    code: {
      title: 'You write imports, it does the rest',
      panels: [
        { label: 'main.js', lines: ['import "./styles.css"', 'import { render } from "./app.js"', '', 'render()'] },
      ],
      notes: [
        { code: 'import', text: 'the bundler finds and follows this' },
        { code: '.css', text: 'styles are collected too' },
        { code: 'output', text: 'hashed filenames so browsers cache safely' },
      ],
    },
    scenario: {
      title: 'Deploying a site',
      steps: [
        { icon: 'terminal', label: 'You run the build' },
        { icon: 'puzzle', label: 'Files are bundled and minified' },
        { icon: 'package', label: 'Static files land in dist/' },
        { icon: 'cloud', label: 'They are uploaded to a CDN' },
      ],
      note: 'The bundler is what turns a folder of source files into something a browser can load fast.',
    },
  },

  linting: {
    beforeAfter: {
      before: {
        label: 'No linting',
        steps: [
          { icon: 'fileCode', label: 'An unused variable ships' },
          { icon: 'eye', label: 'A reviewer spots it… or does not' },
          { icon: 'bug', label: 'A missing await becomes a bug', note: 'found by a user' },
        ],
      },
      after: {
        label: 'Linting on every commit',
        steps: [
          { icon: 'search', label: 'The linter reads the diff' },
          { icon: 'alert', label: 'It flags the missing await', note: 'before the commit lands' },
          { icon: 'checkCircle', label: 'Reviewers talk about design, not typos' },
        ],
      },
      note: 'Linters encode a team’s habits so nobody has to repeat them in every review.',
    },
    code: {
      title: 'A rule, written once',
      panels: [
        { label: 'eslint.config.js', lines: ['rules: {', '  "no-unused-vars": "error",', '  "eqeqeq": "warn",', '}'] },
      ],
      notes: [
        { code: '"error"', text: 'blocks the build until it is fixed' },
        { code: '"warn"', text: 'shows up but does not stop you' },
        { code: 'auto-fix', text: 'many rules can fix themselves on save' },
      ],
    },
    scenario: {
      title: 'A typo caught before review',
      steps: [
        { icon: 'terminal', label: 'You save the file' },
        { icon: 'search', label: 'The linter runs', note: 'in milliseconds' },
        { icon: 'alert', label: '“err is defined but never used”' },
        { icon: 'check', label: 'You fix it before pushing' },
      ],
      note: 'Machines are much better than tired humans at noticing the small, boring mistakes.',
    },
  },
}
