/**
 * Visual lesson content for the software engineering concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const engineeringLessons = {
  'software-architecture': {
    mapping: {
      title: 'Decisions that are expensive to change',
      pairs: [
        { icon: 'layers', analogy: 'What the main pieces are', reality: 'components and services' },
        { icon: 'flow', analogy: 'How they talk', reality: 'interfaces and events' },
        { icon: 'scale', analogy: 'What must never fail', reality: 'quality attributes' },
        { icon: 'book', analogy: 'Why it is this way', reality: 'the records that save future teams' },
      ],
    },
    scenario: {
      title: 'A simple app grows up',
      steps: [
        { icon: 'window', label: 'One page, one database' },
        { icon: 'users', label: 'More features, more people' },
        { icon: 'layers', label: 'Clearer boundaries appear', note: 'so teams stop blocking each other' },
        { icon: 'alert', label: 'Each change costs time and complexity' },
      ],
      note: 'Architecture is the set of choices a rewrite would force you to revisit.',
    },
  },

  'api-design': {
    beforeAfter: {
      before: {
        label: 'Design by accident',
        steps: [
          { icon: 'cog', label: '“/getUserOrdersNow”' },
          { icon: 'alert', label: 'Inconsistent names and errors' },
          { icon: 'clock', label: 'Every integration is a surprise' },
        ],
      },
      after: {
        label: 'Designed deliberately',
        steps: [
          { icon: 'scale', label: 'Resources named as nouns', note: '/users/7/orders' },
          { icon: 'checkCircle', label: 'Same status codes everywhere' },
          { icon: 'book', label: 'Errors say what to do next' },
        ],
      },
      note: 'A public API is a promise — changing it breaks people you have never met.',
    },
    code: {
      title: 'Predictable and boring',
      panels: [
        { label: 'Good', lines: ['GET    /orders?status=paid', 'POST   /orders', 'DELETE /orders/42'] },
        { label: 'Error', lines: ['404 Not Found', '{ "error": "order_not_found", "hint": "check the id" }'] },
      ],
      notes: [
        { code: 'nouns', text: 'URLs name things; the method says what to do' },
        { code: 'stable codes', text: 'the same meaning for the same status' },
        { code: 'machine-readable', text: 'an error code your client can branch on' },
      ],
    },
    scenario: {
      title: 'An app team needs order data',
      steps: [
        { icon: 'book', label: 'They read the docs for ten minutes' },
        { icon: 'send', label: 'They build a request' },
        { icon: 'checkCircle', label: 'It works the first time' },
        { icon: 'check', label: 'No meeting was needed' },
      ],
      note: 'That is the entire return on good API design.',
    },
  },

  'design-patterns': {
    mapping: {
      title: 'Names for familiar solutions',
      pairs: [
        { icon: 'users', analogy: 'One instance, shared', reality: 'singleton' },
        { icon: 'eye', analogy: 'Watch for changes', reality: 'observer' },
        { icon: 'layers', analogy: 'Wrap something in a familiar interface', reality: 'adapter' },
        { icon: 'cycle', analogy: 'Swap the algorithm', reality: 'strategy' },
      ],
    },
    scenario: {
      title: 'Plugging in a second payment provider',
      steps: [
        { icon: 'puzzle', label: 'Both providers are wrapped in the same interface' },
        { icon: 'cog', label: 'The code calls the interface, not the vendor' },
        { icon: 'cycle', label: 'The provider is chosen at runtime' },
        { icon: 'check', label: 'The rest of the app never changed' },
      ],
      note: 'Patterns are vocabulary: they make a design discussion much shorter.',
    },
  },

  'version-control': {
    mapping: {
      title: 'A history you can trust',
      pairs: [
        { icon: 'gitCommit', analogy: 'Every change recorded', reality: 'commits with messages' },
        { icon: 'gitBranch', analogy: 'Parallel lines of work', reality: 'branches' },
        { icon: 'refresh', analogy: 'Undo, safely', reality: 'revert a specific change' },
        { icon: 'eye', analogy: 'Who wrote this, and why', reality: 'blame and history' },
      ],
    },
    scenario: {
      title: 'A bug introduced three months ago',
      steps: [
        { icon: 'search', label: 'You find the failing line' },
        { icon: 'eye', label: 'You ask when it last changed' },
        { icon: 'book', label: 'The commit message explains the intent' },
        { icon: 'check', label: 'The fix respects the original reason' },
      ],
      note: 'Written carefully, a commit message is a letter to whoever is debugging next.',
    },
  },

  testing: {
    mapping: {
      title: 'A safety net with different sizes',
      pairs: [
        { icon: 'target', analogy: 'One function', reality: 'unit tests, milliseconds' },
        { icon: 'plug', analogy: 'Parts together', reality: 'integration tests, seconds' },
        { icon: 'monitor', analogy: 'A real user journey', reality: 'end-to-end tests, minutes' },
        { icon: 'checkCircle', analogy: 'Enough to refactor boldly', reality: 'the point of it all' },
      ],
    },
    scenario: {
      title: 'Refactoring a pricing module',
      steps: [
        { icon: 'checkCircle', label: 'Tests pass before you start' },
        { icon: 'cog', label: 'You restructure the code' },
        { icon: 'zap', label: 'Tests run in a second' },
        { icon: 'check', label: 'They still pass, so behaviour is intact' },
      ],
      note: 'Tests are what make changing code a small decision instead of a risky one.',
    },
  },

  'unit-testing': {
    code: {
      title: 'Small, fast and specific',
      panels: [
        {
          label: 'total.test.js',
          lines: ['test("adds tax", () => {', '  expect(total(100, 0.2)).toBe(120)', '})', '', 'test("empty cart is zero", () => {', '  expect(total(0)).toBe(0)', '})'],
        },
      ],
      notes: [
        { code: 'name', text: 'a sentence describing the behaviour' },
        { code: 'arrange, act, assert', text: 'the three parts of almost every good test' },
        { code: 'fast', text: 'thousands should run in seconds' },
      ],
    },
    scenario: {
      title: 'A bug that comes back',
      steps: [
        { icon: 'alert', label: 'A discount bug is reported' },
        { icon: 'fileCode', label: 'You write a test that fails' },
        { icon: 'cog', label: 'You fix the code until it passes' },
        { icon: 'shieldCheck', label: 'The bug can never return quietly' },
      ],
      note: 'That order matters — a test written after the fix rarely proves anything.',
    },
  },

  'integration-testing': {
    beforeAfter: {
      before: {
        label: 'Units only',
        steps: [
          { icon: 'checkCircle', label: 'Every function passes alone' },
          { icon: 'alert', label: 'The app still breaks' },
          { icon: 'search', label: 'Because the pieces do not fit' },
        ],
      },
      after: {
        label: 'Integration tests',
        steps: [
          { icon: 'plug', label: 'Real database, real HTTP' },
          { icon: 'cog', label: 'A whole flow is exercised' },
          { icon: 'checkCircle', label: 'The wiring is proven too' },
        ],
      },
      note: 'They are slower and fewer — and they catch the failures units cannot see.',
    },
    scenario: {
      title: 'A signup that fails in production',
      steps: [
        { icon: 'target', label: 'Unit tests all pass' },
        { icon: 'send', label: 'A test posts to /signup' },
        { icon: 'database', label: 'It writes and reads a real row' },
        { icon: 'alert', label: 'A missing unique constraint is found', note: 'before users find it' },
      ],
      note: 'Test the contract between your code and the things around it.',
    },
  },

  debugging: {
    mapping: {
      title: 'A method, not a mood',
      pairs: [
        { icon: 'refresh', analogy: 'Make it happen reliably', reality: 'reproduce it' },
        { icon: 'search', analogy: 'Halve the search space', reality: 'bisect the code or the commits' },
        { icon: 'bulb', analogy: 'Say what you expect', reality: 'the hypothesis you test' },
        { icon: 'checkCircle', analogy: 'Prove it is fixed', reality: 'a failing test that now passes' },
      ],
    },
    scenario: {
      title: 'A page that is blank for one user',
      steps: [
        { icon: 'refresh', label: 'You reproduce it with their data' },
        { icon: 'search', label: 'You narrow to one component' },
        { icon: 'bug', label: 'You find a field that is sometimes missing' },
        { icon: 'checkCircle', label: 'You add a test and fix the shape' },
      ],
      note: 'Reproducing first turns guessing into a short, boring process.',
    },
  },

  refactoring: {
    beforeAfter: {
      before: {
        label: 'Before',
        steps: [
          { icon: 'alert', label: 'One function, 300 lines' },
          { icon: 'bug', label: 'Three copies of the same rule' },
          { icon: 'clock', label: 'Every change takes a day' },
        ],
      },
      after: {
        label: 'After',
        steps: [
          { icon: 'puzzle', label: 'Small named functions' },
          { icon: 'checkCircle', label: 'Tests still pass, unchanged' },
          { icon: 'zap', label: 'The next change takes an hour' },
        ],
      },
      note: 'If behaviour changed, that was a rewrite, not a refactor.',
    },
    scenario: {
      title: 'Cleaning up before adding a feature',
      steps: [
        { icon: 'checkCircle', label: 'The test suite is green' },
        { icon: 'puzzle', label: 'You split one function into four' },
        { icon: 'check', label: 'Tests stay green, unedited' },
        { icon: 'cog', label: 'Now the feature is easy to add' },
      ],
      note: 'Tidy first, then extend — the other order makes both jobs harder.',
    },
  },

  'technical-debt': {
    mapping: {
      title: 'A loan against the future',
      pairs: [
        { icon: 'zap', analogy: 'Shipping faster today', reality: 'the reason it gets taken on' },
        { icon: 'coin', analogy: 'Interest compounding', reality: 'every change gets slower' },
        { icon: 'chart', analogy: 'The balance visible to everyone', reality: 'measure it, or it grows quietly' },
        { icon: 'refresh', analogy: 'Repaying deliberately', reality: 'scheduled clean-up work' },
      ],
    },
    scenario: {
      title: 'A shortcut taken to hit a deadline',
      steps: [
        { icon: 'clock', label: 'A deadline forces a shortcut' },
        { icon: 'checkCircle', label: 'It ships and the launch works' },
        { icon: 'book', label: 'The shortcut is written down', note: 'with the reason' },
        { icon: 'cog', label: 'It is repaid once the pressure drops' },
      ],
      note: 'Debt is only a problem when it is invisible or never repaid.',
    },
  },

  agile: {
    beforeAfter: {
      before: {
        label: 'One big plan',
        steps: [
          { icon: 'book', label: 'Requirements fixed for a year' },
          { icon: 'clock', label: 'Nothing ships until the end' },
          { icon: 'alert', label: 'The market moved; nobody can tell' },
        ],
      },
      after: {
        label: 'Small cycles',
        steps: [
          { icon: 'cycle', label: 'Two-week increments' },
          { icon: 'rocket', label: 'Something usable every cycle' },
          { icon: 'users', label: 'Feedback changes the next plan' },
        ],
      },
      note: 'The point is shortening the time between deciding and learning.',
    },
    scenario: {
      title: 'A feature nobody used',
      steps: [
        { icon: 'rocket', label: 'A small version ships' },
        { icon: 'chart', label: 'Usage is nearly zero' },
        { icon: 'users', label: 'Customers are asked why' },
        { icon: 'refresh', label: 'The next cycle goes elsewhere', note: 'three months saved' },
      ],
      note: 'Cheap experiments beat confident roadmaps when the answer is genuinely unknown.',
    },
  },

  scrum: {
    mapping: {
      title: 'A rhythm for teams',
      pairs: [
        { icon: 'book', analogy: 'The ordered list of work', reality: 'the product backlog' },
        { icon: 'clock', analogy: 'A fixed two-week window', reality: 'the sprint' },
        { icon: 'chat', analogy: 'Standing up for two minutes', reality: 'the daily' },
        { icon: 'eye', analogy: 'Showing what actually works', reality: 'the review' },
      ],
    },
    scenario: {
      title: 'Two weeks in one team',
      steps: [
        { icon: 'book', label: 'The backlog is ordered by value' },
        { icon: 'target', label: 'The team picks a realistic slice' },
        { icon: 'cog', label: 'They build it together' },
        { icon: 'eye', label: 'It is demonstrated at the end' },
        { icon: 'refresh', label: 'The process is tweaked' },
      ],
      note: 'The ceremonies exist to make progress visible — drop them when they stop doing that.',
    },
  },

  requirements: {
    mapping: {
      title: 'Turning wishes into work',
      pairs: [
        { icon: 'chat', analogy: 'What the user says they want', reality: 'the request' },
        { icon: 'search', analogy: 'The problem underneath', reality: 'the actual need' },
        { icon: 'checkCircle', analogy: 'How you will know it worked', reality: 'acceptance criteria' },
        { icon: 'alert', analogy: 'What is deliberately left out', reality: 'scope, written down' },
      ],
    },
    scenario: {
      title: '“Make the search faster”',
      steps: [
        { icon: 'chat', label: 'The request arrives' },
        { icon: 'search', label: 'You ask what slow means', note: 'seconds? on which screen?' },
        { icon: 'target', label: 'You agree on a number' },
        { icon: 'checkCircle', label: 'And you can prove it was met' },
      ],
      note: 'Half of requirements work is deciding what is out of scope.',
    },
  },

  'semantic-versioning': {
    code: {
      title: 'Three numbers, one promise',
      panels: [
        { label: '1.4.2', lines: ['major  = 1   breaking changes', 'minor  = 4   new features, backwards compatible', 'patch  = 2   bug fixes only'] },
      ],
      notes: [
        { code: 'x.0.0', text: 'someone must read the release notes and maybe change code' },
        { code: '0.x.y', text: 'anything may change — pre-1.0 is a warning' },
        { code: 'lock file', text: 'pins exact versions so an update is a decision, not a surprise' },
      ],
    },
    scenario: {
      title: 'A dependency announces 2.0',
      steps: [
        { icon: 'alert', label: 'The major number changed' },
        { icon: 'book', label: 'You read the migration guide' },
        { icon: 'cog', label: 'You update the affected calls' },
        { icon: 'checkCircle', label: 'Patch releases you can take without reading' },
      ],
      note: 'The numbers are a promise about compatibility, nothing about quality.',
    },
  },

  'code-review': {
    beforeAfter: {
      before: {
        label: 'Review as a gate',
        steps: [
          { icon: 'users', label: '“Why did you do it this way?”' },
          { icon: 'clock', label: 'Days of back and forth' },
          { icon: 'alert', label: 'Author learns to dread reviews' },
        ],
      },
      after: {
        label: 'Review as a conversation',
        steps: [
          { icon: 'fileCode', label: 'Small, focused changes' },
          { icon: 'search', label: 'Reviewers ask about correctness and clarity' },
          { icon: 'checkCircle', label: 'The author grows, the code improves' },
        ],
      },
      note: 'Reviewing a 40-line change is pleasant; reviewing a 900-line change is theatre.',
    },
    scenario: {
      title: 'A pull request that is easy to review',
      steps: [
        { icon: 'book', label: 'A description explains the why' },
        { icon: 'layers', label: 'One logical change per commit' },
        { icon: 'checkCircle', label: 'Tests prove the behaviour' },
        { icon: 'users', label: 'Two reviewers, twenty minutes' },
      ],
      note: 'Small pull requests are the single biggest lever on review quality.',
    },
  },

  'solid-principles': {
    mapping: {
      title: 'Five habits, one goal',
      pairs: [
        { icon: 'puzzle', analogy: 'One reason to change', reality: 'single responsibility' },
        { icon: 'plug', analogy: 'Extend, do not modify', reality: 'open and closed' },
        { icon: 'gitBranch', analogy: 'A subtype must behave', reality: 'Liskov substitution' },
        { icon: 'eye', analogy: 'Depend on interfaces, not details', reality: 'dependency inversion' },
      ],
    },
    scenario: {
      title: 'A class that does too much',
      steps: [
        { icon: 'alert', label: 'One class sends email and formats invoices' },
        { icon: 'puzzle', label: 'It is split into two' },
        { icon: 'checkCircle', label: 'Each has one reason to change' },
        { icon: 'zap', label: 'Both are easier to test and reuse' },
      ],
      note: 'The principles are heuristics — applying them blindly creates as much mess as ignoring them.',
    },
  },

  'code-coverage': {
    beforeAfter: {
      before: {
        label: 'Coverage as a target',
        steps: [
          { icon: 'chart', label: '“Get the number to 90%”' },
          { icon: 'fileCode', label: 'Tests are written to execute lines' },
          { icon: 'alert', label: 'Assertions are thin, bugs survive' },
        ],
      },
      after: {
        label: 'Coverage as a map',
        steps: [
          { icon: 'search', label: 'Look for what is not covered' },
          { icon: 'target', label: 'Ask whether that path matters' },
          { icon: 'checkCircle', label: 'Write meaningful tests where it does' },
        ],
      },
      note: 'Coverage tells you what you forgot to consider — not how good the tests are.',
    },
    scenario: {
      title: 'A risky module with no tests',
      steps: [
        { icon: 'chart', label: 'The report shows 40% coverage' },
        { icon: 'search', label: 'It is the payment calculation' },
        { icon: 'target', label: 'Tests are added for the edge cases' },
        { icon: 'shieldCheck', label: 'The next change is safe' },
      ],
      note: 'Use coverage to prioritise, never to grade people.',
    },
  },

  documentation: {
    beforeAfter: {
      before: {
        label: 'Everything in people’s heads',
        steps: [
          { icon: 'users', label: 'The one person who knows is on holiday' },
          { icon: 'clock', label: 'Work stalls' },
          { icon: 'alert', label: 'Knowledge leaves with the team' },
        ],
      },
      after: {
        label: 'Written where it is needed',
        steps: [
          { icon: 'book', label: 'A README that gets you running' },
          { icon: 'fileCode', label: 'Why comments at tricky decisions' },
          { icon: 'refresh', label: 'Reviewed like code, so it stays true' },
        ],
      },
      note: 'The best documentation lives next to the thing it describes.',
    },
    scenario: {
      title: 'A new engineer on their first week',
      steps: [
        { icon: 'book', label: 'They read the README and run the app' },
        { icon: 'folder', label: 'They trace one request through the code' },
        { icon: 'link', label: 'They find the decision records' },
        { icon: 'checkCircle', label: 'They ship a small change in a week' },
      ],
      note: 'The onboarding checklist is the honest measure of your documentation.',
    },
  },
}
