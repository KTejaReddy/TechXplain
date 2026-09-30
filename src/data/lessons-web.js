/**
 * Visual lesson content for the web development concepts.
 *
 * Every block here is optional: the concept page falls back to a derived visual
 * (icons and titles from lesson-grammar.js) when a concept has none. These are
 * the places where a hand-written example teaches faster than a generated one.
 */
export const webLessons = {
  html: {
    code: {
      title: 'A page in three tags',
      panels: [
        {
          label: 'index.html',
          lines: ['<h1>Hello</h1>', '<p>A paragraph of text.</p>', '<img src="cat.png" alt="A cat" />'],
        },
      ],
      notes: [
        { code: '<h1>', text: 'the main heading of the page' },
        { code: '<p>', text: 'a paragraph of text' },
        { code: '<img>', text: 'an image, described by its alt text' },
      ],
    },
    exchange: {
      request: { label: 'A request for a page', text: 'GET /index.html' },
      response: { label: 'The page itself', text: '<h1>Hello</h1>', mono: true },
      note: 'HTML is plain text wrapped in tags — that is the whole trick.',
    },
    scenario: {
      title: 'You open any website',
      steps: [
        { icon: 'search', label: 'You type an address', note: 'browser asks for a page' },
        { icon: 'download', label: 'HTML arrives', note: 'a text file of tags' },
        { icon: 'layers', label: 'Tags are read top to bottom', note: 'headings, links, images' },
        { icon: 'monitor', label: 'The page appears', note: 'structure first, styling next' },
      ],
      note: 'Switching off images or styles still leaves a readable page, because HTML carries the structure and meaning.',
    },
  },

  css: {
    code: {
      title: 'One rule, three lines',
      panels: [
        {
          label: 'style.css',
          lines: ['.card {', '  padding: 16px;', '  border-radius: 12px;', '  background: #c9f5dd;', '}'],
        },
      ],
      notes: [
        { code: '.card', text: 'targets every element with class “card”' },
        { code: 'padding', text: 'space inside the box' },
        { code: 'border-radius', text: 'how round the corners are' },
      ],
    },
    scenario: {
      title: 'You restyle a page',
      steps: [
        { icon: 'monitor', label: 'The page loads', note: 'plain structure, no styling' },
        { icon: 'download', label: 'The stylesheet arrives', note: 'rules waiting to match' },
        { icon: 'target', label: 'Rules match elements', note: '“this is a card”' },
        { icon: 'eye', label: 'Colours and spacing apply', note: 'the page settles into shape' },
      ],
      note: 'Change one rule and every element that matches it updates at once — that is why CSS scales.',
    },
  },

  javascript: {
    code: {
      title: 'A button that counts',
      panels: [
        {
          label: 'script.js',
          lines: [
            'let count = 0',
            'button.addEventListener("click", () => {',
            '  count = count + 1',
            '  label.textContent = count',
            '})',
          ],
        },
      ],
      notes: [
        { code: 'let count', text: 'a variable remembering the number' },
        { code: 'addEventListener', text: 'listen for a real click' },
        { code: 'textContent', text: 'write the new number on the page' },
      ],
    },
    scenario: {
      title: 'A like button on a post',
      steps: [
        { icon: 'target', label: 'You tap the heart', note: 'a real click event' },
        { icon: 'zap', label: 'JavaScript reacts', note: 'the handler runs' },
        { icon: 'table', label: 'The count changes', note: 'memory updated' },
        { icon: 'monitor', label: 'The number redraws', note: 'instantly, no reload' },
      ],
      note: 'JavaScript is the language that lets a finished page respond to what you do.',
    },
  },

  dom: {
    mapping: {
      title: 'The page as a family tree',
      pairs: [
        { icon: 'window', analogy: 'The document', reality: 'the whole page' },
        { icon: 'folder', analogy: 'Parents and children', reality: 'elements inside elements' },
        { icon: 'target', analogy: 'Picking a person', reality: 'selecting one element' },
        { icon: 'refresh', analogy: 'Changing them', reality: 'updating text or styles live' },
      ],
    },
    scenario: {
      title: 'A page that updates itself',
      steps: [
        { icon: 'download', label: 'HTML is parsed', note: 'browser builds the tree' },
        { icon: 'folder', label: 'Elements nest inside each other', note: 'body holds divs, divs hold text' },
        { icon: 'search', label: 'Code finds one element', note: 'query by id or class' },
        { icon: 'refresh', label: 'It changes that branch', note: 'the screen updates' },
      ],
      note: 'Every visual change on a modern page is really a small edit to this tree.',
    },
  },

  http: {
    hero: { links: ['asks for something', 'does the work', 'sends data back'] },
    exchange: {
      request: { label: 'Request', text: 'GET /products' },
      via: 'HTTP',
      response: { label: 'Response', text: '200 OK + the products' },
      note: 'Every web conversation is one request followed by one response.',
    },
    code: {
      title: 'The same request, opened up',
      panels: [
        { label: 'Request', lines: ['GET /products HTTP/1.1', 'Host: shop.example.com', 'Accept: application/json'] },
        { label: 'Response', lines: ['HTTP/1.1 200 OK', 'Content-Type: application/json', '{ "products": [ ... ] }'] },
      ],
      notes: [
        { code: 'GET', text: 'asks for data instead of changing it' },
        { code: 'Host', text: 'which site the request is for' },
        { code: '200 OK', text: 'the request succeeded' },
        { code: '404', text: 'that page does not exist' },
      ],
    },
    scenario: {
      title: 'You open a link',
      steps: [
        { icon: 'target', label: 'You click a link', note: 'the browser knows the address' },
        { icon: 'send', label: 'It sends a request', note: 'a few lines of text' },
        { icon: 'server', label: 'The server answers', note: 'with a status code' },
        { icon: 'monitor', label: 'The page paints', note: 'usually in well under a second' },
      ],
      note: 'The same protocol carries every website, image, video and API call you touch.',
    },
  },

  https: {
    hero: {
      notes: {
        Browser: 'where you are',
        'Encrypted TLS connection': 'nobody in between can read it',
        'Server with certificate': 'proves who it is',
      },
      links: ['starts a secure handshake', 'check the certificate, then talk'],
    },
    beforeAfter: {
      before: {
        label: 'Plain HTTP',
        steps: [
          { icon: 'send', label: 'You type a password' },
          { icon: 'network', label: 'It crosses the network' },
          { icon: 'eye', label: 'Anyone on the path can read it', note: 'café wifi' },
        ],
      },
      after: {
        label: 'HTTPS',
        steps: [
          { icon: 'send', label: 'You type a password' },
          { icon: 'lock', label: 'It is encrypted first' },
          { icon: 'shieldCheck', label: 'Only the server can read it', note: 'and you can trust the site' },
        ],
      },
      note: 'HTTPS is HTTP with a secure tunnel and a certificate that proves the server is who it claims to be.',
    },
    scenario: {
      title: 'The padlock in your address bar',
      steps: [
        { icon: 'search', label: 'You visit your bank' },
        { icon: 'lock', label: 'Browser checks the certificate', note: 'issued to that exact domain' },
        { icon: 'key', label: 'Both sides agree on a key', note: 'nobody else has it' },
        { icon: 'shieldCheck', label: 'Everything after that is private' },
      ],
      note: 'Never type a password on a page without a padlock — and check the site name, not just the icon.',
    },
  },

  url: {
    mapping: {
      title: 'A URL reads like a postal address',
      pairs: [
        { icon: 'route', analogy: 'https://', reality: 'how to travel — securely' },
        { icon: 'building', analogy: 'shop.example.com', reality: 'which building to visit' },
        { icon: 'folder', analogy: '/products/42', reality: 'which shelf inside' },
        { icon: 'search', analogy: '?sort=price', reality: 'extra instructions for the staff' },
      ],
    },
    scenario: {
      title: 'Paste a product link to a friend',
      steps: [
        { icon: 'link', label: 'You copy a long address' },
        { icon: 'send', label: 'Your friend opens it', note: 'their browser reads each part' },
        { icon: 'route', label: 'The path finds the page', note: 'a product called 42' },
        { icon: 'box', label: 'The same product appears', note: 'sorted the way the link said' },
      ],
      note: 'Every part of a URL has a job, which is why links can point at something very specific.',
    },
  },

  cookies: {
    exchange: {
      request: { label: 'Browser adds what it stored', text: 'Cookie: theme=dark; cart=3' },
      via: 'HTTPS',
      response: { label: 'Server knows it is you again', text: 'the dark page, with 3 items' },
      note: 'Small values that travel with every request — which is why secrets should never be a cookie.',
    },
    code: {
      title: 'A cookie is set once, then sent back',
      panels: [
        { label: 'The server says', lines: ['Set-Cookie: session=abc123; Path=/; HttpOnly; Secure'] },
        { label: 'The browser sends, automatically', lines: ['Cookie: session=abc123'] },
      ],
      notes: [
        { code: 'session=abc123', text: 'a small value that identifies you' },
        { code: 'HttpOnly', text: 'scripts on the page cannot read it' },
        { code: 'Secure', text: 'only ever sent over HTTPS' },
      ],
    },
    scenario: {
      title: 'You stay logged in',
      steps: [
        { icon: 'lock', label: 'You log in once' },
        { icon: 'download', label: 'The server sends a cookie', note: 'a tiny note the browser files' },
        { icon: 'refresh', label: 'Every later request carries it', note: 'automatically' },
        { icon: 'userCheck', label: 'The server recognises you', note: 'no password needed again' },
      ],
      note: 'Cookies are how a stateless protocol recognises you between requests — and why logging out matters.',
    },
  },

  sessions: {
    exchange: {
      request: { label: 'Browser sends just an id', text: 'session=8f2a91' },
      via: 'Server-side store',
      response: { label: 'Server looks it up', text: '“that is user 42, still logged in”' },
      note: 'The information stays on the server; the browser only carries the claim ticket.',
    },
    mapping: {
      title: 'Like a coat check ticket',
      pairs: [
        { icon: 'userCheck', analogy: 'Your coat', reality: 'your logged-in state' },
        { icon: 'key', analogy: 'The ticket number', reality: 'the session ID in a cookie' },
        { icon: 'server', analogy: 'The cloakroom', reality: 'the server keeping the details' },
        { icon: 'clock', analogy: 'Closing time', reality: 'the session expiring' },
      ],
    },
    scenario: {
      title: 'A shopping basket that survives the trip',
      steps: [
        { icon: 'target', label: 'You add a shirt', note: 'no account yet' },
        { icon: 'table', label: 'The server stores it', note: 'under your session ID' },
        { icon: 'refresh', label: 'You browse elsewhere', note: 'the cookie follows along' },
        { icon: 'box', label: 'The basket is still there', note: 'and survives a refresh' },
      ],
      note: 'The browser only holds an anonymous ID; the real state lives on the server where it is safer.',
    },
  },

  authentication: {
    exchange: {
      request: { label: 'You present credentials', text: 'email + password' },
      via: 'Login',
      response: { label: 'The server vouches for you', text: '“this is user 42” — a token' },
      note: 'Authentication only answers who you are, never what you may do.',
    },
    hero: {
      notes: {
        User: 'you',
        'Login: credentials': 'something you know',
        Verification: 'the server checks it',
        'Access granted': 'a session or token starts',
      },
      links: ['sent over an encrypted connection', 'password hash compared', 'a session begins'],
    },
    mapping: {
      title: 'Authentication answers one question',
      pairs: [
        { icon: 'users', analogy: '“Who are you?”', reality: 'authentication' },
        { icon: 'key', analogy: 'Showing your ID', reality: 'logging in with a password or passkey' },
        { icon: 'shieldCheck', analogy: 'The guard believes you', reality: 'the server trusts the session' },
        { icon: 'lock', analogy: 'A second check', reality: 'two-factor authentication' },
      ],
    },
    scenario: {
      title: 'You log into your email',
      steps: [
        { icon: 'lock', label: 'You type email and password', note: 'over HTTPS' },
        { icon: 'hash', label: 'The server hashes it', note: 'never stores the plain password' },
        { icon: 'checkCircle', label: 'The hashes match', note: 'plus a one-time code' },
        { icon: 'key', label: 'A session is created', note: 'so you stay signed in' },
      ],
      note: 'Authentication is a one-time check that opens a door; everything after it rides on the session.',
    },
  },

  authorization: {
    exchange: {
      request: { label: 'A logged-in user asks', text: 'DELETE /orders/17' },
      via: 'Permission check',
      response: { label: 'Allowed or refused', text: '204 — or 403 Forbidden' },
      note: 'The same signed-in user is refused this one, because the order belongs to somebody else.',
    },
    mapping: {
      title: 'The difference in one line',
      pairs: [
        { icon: 'users', analogy: '“Who are you?”', reality: 'authentication' },
        { icon: 'shieldCheck', analogy: '“What may you do?”', reality: 'authorization' },
        { icon: 'key', analogy: 'A room key', reality: 'a role or permission' },
        { icon: 'lock', analogy: 'Locked doors', reality: 'checks on every request' },
      ],
    },
    scenario: {
      title: 'Two people, one admin panel',
      steps: [
        { icon: 'lock', label: 'Both log in', note: 'both are authenticated' },
        { icon: 'key', label: 'Each gets a role', note: 'customer or admin' },
        { icon: 'x', label: 'The customer opens /admin', note: 'and is refused' },
        { icon: 'check', label: 'The admin opens it', note: 'allowed by the role' },
      ],
      note: 'Logging in is not the same as being allowed — permissions are checked on every request, on the server.',
    },
  },

  cors: {
    exchange: {
      request: { label: 'A call from another site', text: 'shop.com asks api.shop.com' },
      via: 'Browser preflight',
      response: { label: 'The server answers', text: '“this origin is allowed”' },
      note: 'The browser enforces the rule, not the server — that is why it blocks code the server already sent.',
    },
    code: {
      title: 'The header that decides',
      panels: [
        { label: 'The browser blocks until told otherwise', lines: ['Access to fetch has been blocked by CORS policy'] },
        { label: 'The server allows it', lines: ['Access-Control-Allow-Origin: https://app.example.com'] },
      ],
      notes: [
        { code: 'Origin', text: 'the site making the request' },
        { code: 'Allow-Origin', text: 'the sites the server trusts' },
        { code: 'preflight', text: 'a quick permission check before the real call' },
      ],
    },
    scenario: {
      title: 'Your app calls a different domain',
      steps: [
        { icon: 'monitor', label: 'app.example.com loads', note: 'one origin' },
        { icon: 'send', label: 'It calls api.other.com', note: 'a different origin' },
        { icon: 'search', label: 'Browser asks permission first', note: 'the preflight' },
        { icon: 'checkCircle', label: 'The server allows that origin', note: 'the call goes through' },
      ],
      note: 'CORS protects users from a random site quietly reading your data on another site.',
    },
  },

  websocket: {
    beforeAfter: {
      before: {
        label: 'Polling',
        steps: [
          { icon: 'clock', label: 'App asks every second', note: '“anything new?”' },
          { icon: 'server', label: 'Server answers “no”' },
          { icon: 'clock', label: 'Repeat forever', note: 'mostly wasted' },
        ],
      },
      after: {
        label: 'WebSocket',
        steps: [
          { icon: 'plug', label: 'One connection opens' },
          { icon: 'send', label: 'Either side sends instantly' },
          { icon: 'download', label: 'The other side sees it at once', note: 'no waiting, no asking' },
        ],
      },
      note: 'A WebSocket stays open, so new messages arrive the instant they happen instead of on a timer.',
    },
    scenario: {
      title: 'A live chat window',
      steps: [
        { icon: 'chat', label: 'You open a support chat' },
        { icon: 'plug', label: 'A connection is kept open', note: 'not one request per message' },
        { icon: 'send', label: 'The agent types', note: 'server pushes it to you' },
        { icon: 'monitor', label: 'Words appear instantly', note: 'no refresh, no delay' },
      ],
      note: 'Anything that feels live — chat, multiplayer, live prices — usually rides on a WebSocket.',
    },
  },

  json: {
    data: {
      title: 'The same order, as fields',
      columns: ['field', 'value', 'type'],
      keyColumn: 'field',
      rows: [
        ['id', '42', 'number'],
        ['items', '["shirt", "cap"]', 'array of text'],
        ['total', '39.90', 'number'],
        ['paid', 'true', 'true / false'],
      ],
      note: 'Each field has a name, a value and a type — nothing is left for the reader to guess.',
      caption: 'JSON is a name and a value, repeated. That is the whole format.',
    },
    code: {
      title: 'One shape, every language',
      panels: [
        {
          label: 'order.json',
          lines: ['{', '  "id": 42,', '  "items": ["shirt", "cap"],', '  "total": 39.90', '}'],
        },
      ],
      notes: [
        { code: '{ }', text: 'an object with named fields' },
        { code: '[ ]', text: 'a list of values' },
        { code: '39.90', text: 'numbers, text and true/false are all allowed' },
      ],
    },
    scenario: {
      title: 'An app receives your order',
      steps: [
        { icon: 'target', label: 'You tap “Buy”' },
        { icon: 'table', label: 'The app builds JSON', note: 'id, items, total' },
        { icon: 'send', label: 'It sends the text', note: 'a few hundred bytes' },
        { icon: 'checkCircle', label: 'The server reads it', note: 'and replies in JSON too' },
      ],
      note: 'JSON is just text with a strict shape, which is why it works between any two languages.',
    },
  },

  ajax: {
    exchange: {
      request: { label: 'The page asks quietly', text: 'fetch("/inbox")' },
      via: 'JavaScript',
      response: { label: 'Only a slice is swapped', text: '12 new messages appear' },
      note: 'The address bar, the scroll position and the rest of the page never change.',
    },
    beforeAfter: {
      before: {
        label: 'A full page request',
        steps: [
          { icon: 'target', label: 'You click “next page”' },
          { icon: 'refresh', label: 'The whole page reloads', note: 'a white flash' },
          { icon: 'download', label: 'All layout and images reload' },
        ],
      },
      after: {
        label: 'AJAX',
        steps: [
          { icon: 'target', label: 'You click “next page”' },
          { icon: 'send', label: 'Only the data is requested' },
          { icon: 'refresh', label: 'Just that part redraws', note: 'instant, scroll stays put' },
        ],
      },
      note: 'AJAX means fetching data in the background and updating one piece of the page instead of all of it.',
    },
    scenario: {
      title: 'Infinite scroll on a feed',
      steps: [
        { icon: 'monitor', label: 'You scroll to the bottom' },
        { icon: 'send', label: 'The next batch is requested', note: 'in the background' },
        { icon: 'download', label: 'More posts arrive as data' },
        { icon: 'layers', label: 'They slot in above', note: 'the page never reloads' },
      ],
      note: 'This is why modern sites feel like apps rather than documents.',
    },
  },

  ssr: {
    beforeAfter: {
      before: {
        label: 'Client-side only',
        steps: [
          { icon: 'download', label: 'Browser gets an empty shell' },
          { icon: 'cog', label: 'JavaScript runs', note: 'a blank moment' },
          { icon: 'monitor', label: 'Content finally appears' },
        ],
      },
      after: {
        label: 'Server-side rendering',
        steps: [
          { icon: 'server', label: 'Server builds the full HTML' },
          { icon: 'download', label: 'Browser paints it immediately' },
          { icon: 'cog', label: 'JavaScript takes over for clicks' },
        ],
      },
      note: 'The user sees content sooner, and search engines can read the page without running scripts.',
    },
    scenario: {
      title: 'A product page people find on Google',
      steps: [
        { icon: 'search', label: 'Someone searches the product' },
        { icon: 'server', label: 'The server renders that page', note: 'full HTML, already filled in' },
        { icon: 'monitor', label: 'It paints instantly', note: 'no blank flash' },
        { icon: 'zap', label: 'Then it becomes interactive', note: 'hydration' },
      ],
      note: 'Rendering on the server trades a little server work for a much faster first impression.',
    },
  },

  csr: {
    beforeAfter: {
      before: {
        label: 'Server-rendered pages',
        steps: [
          { icon: 'server', label: 'Every navigation asks the server' },
          { icon: 'refresh', label: 'A fresh page comes back' },
          { icon: 'clock', label: 'A short wait each time' },
        ],
      },
      after: {
        label: 'Client-side rendering',
        steps: [
          { icon: 'download', label: 'JavaScript app loads once' },
          { icon: 'zap', label: 'Navigating redraws in place', note: 'no page reload' },
          { icon: 'clock', label: 'First load is heavier', note: 'the trade-off' },
        ],
      },
      note: 'A single-page app feels instant after it loads, but the first visit has more code to fetch.',
    },
    scenario: {
      title: 'A dashboard you keep open all day',
      steps: [
        { icon: 'download', label: 'You open the app once' },
        { icon: 'zap', label: 'Tabs switch instantly', note: 'nothing reloads' },
        { icon: 'send', label: 'Data is fetched in the background' },
        { icon: 'monitor', label: 'Numbers update in place' },
      ],
      note: 'For tools people live in, client-side rendering feels smoother than reloading each view.',
    },
  },

  spa: {
    mapping: {
      title: 'One page, many views',
      pairs: [
        { icon: 'window', analogy: 'One document', reality: 'loaded once' },
        { icon: 'route', analogy: 'Different rooms', reality: 'routes that swap the view' },
        { icon: 'refresh', analogy: 'Walking between them', reality: 'updating the page in place' },
        { icon: 'send', analogy: 'Ordering in', reality: 'fetching only the data you need' },
      ],
    },
    scenario: {
      title: 'A web app that feels like an app',
      steps: [
        { icon: 'download', label: 'One HTML page loads' },
        { icon: 'route', label: 'You move between views', note: 'inbox, calendar, settings' },
        { icon: 'zap', label: 'The URL changes, nothing reloads' },
        { icon: 'monitor', label: 'The view redraws instantly' },
      ],
      note: 'The back button still works because the app updates the address bar as it goes.',
    },
  },

  cdn: {
    exchange: {
      request: { label: 'A visitor asks nearby', text: 'logo.png' },
      via: 'Edge server',
      response: { label: 'Served from the closest city', text: 'a copy, milliseconds away' },
      note: 'The first visitor somewhere warms that copy; the next thousand reuse it.',
    },
    beforeAfter: {
      before: {
        label: 'One server, everywhere',
        steps: [
          { icon: 'globe', label: 'Someone in Japan opens the site' },
          { icon: 'network', label: 'Every file crosses the ocean' },
          { icon: 'clock', label: 'Slow first paint' },
        ],
      },
      after: {
        label: 'With a CDN',
        steps: [
          { icon: 'cloud', label: 'Files are copied to edge servers' },
          { icon: 'zap', label: 'The nearest one answers', note: 'often a few milliseconds away' },
          { icon: 'server', label: 'The origin only handles changes' },
        ],
      },
      note: 'Static files served from close by are the cheapest performance win on the web.',
    },
    scenario: {
      title: 'A product image loads instantly',
      steps: [
        { icon: 'globe', label: 'Someone in Brazil opens the shop' },
        { icon: 'cloud', label: 'An edge server in São Paulo has the image' },
        { icon: 'zap', label: 'It arrives in milliseconds' },
        { icon: 'server', label: 'The origin server is never touched' },
      ],
      note: 'The first visitor to a region might wait; everyone after them gets the cached copy.',
    },
  },

  webhooks: {
    exchange: {
      request: { label: 'Something happens on your side', text: 'a payment clears' },
      via: 'Webhook',
      response: { label: 'Their system calls your URL', text: 'POST /you/payment-done' },
      note: 'The direction is reversed: instead of you asking over and over, they tell you.',
    },
    beforeAfter: {
      before: {
        label: 'Polling',
        steps: [
          { icon: 'clock', label: 'Your server asks every minute' },
          { icon: 'server', label: '“Any new payments?”' },
          { icon: 'clock', label: 'Mostly empty answers', note: 'wasted requests' },
        ],
      },
      after: {
        label: 'Webhook',
        steps: [
          { icon: 'checkCircle', label: 'The payment happens' },
          { icon: 'send', label: 'The provider posts to your URL', note: 'exactly once' },
          { icon: 'zap', label: 'You react immediately' },
        ],
      },
      note: 'A webhook flips the direction: instead of you asking, the other system tells you.',
    },
    scenario: {
      title: 'A payment is confirmed',
      steps: [
        { icon: 'coin', label: 'A customer pays' },
        { icon: 'send', label: 'Stripe posts to your endpoint', note: 'a signed JSON message' },
        { icon: 'checkCircle', label: 'You verify the signature' },
        { icon: 'box', label: 'The order ships', note: 'within seconds' },
      ],
      note: 'Webhooks are how services talk to each other without anyone sitting there watching.',
    },
  },

  routing: {
    mapping: {
      title: 'Like a postal sorting office',
      pairs: [
        { icon: 'route', analogy: 'An address', reality: 'the URL path' },
        { icon: 'search', analogy: 'Sorting the mail', reality: 'matching the route pattern' },
        { icon: 'package', analogy: 'The right box', reality: 'the handler that runs' },
        { icon: 'clock', analogy: 'Sorted into two piles', reality: 'fast static routes, slower dynamic ones' },
      ],
    },
    scenario: {
      title: 'Every page you visit is routed',
      steps: [
        { icon: 'link', label: 'You open /orders/42' },
        { icon: 'route', label: 'It matches a pattern', note: '/orders/:id' },
        { icon: 'cog', label: 'The matching handler runs' },
        { icon: 'monitor', label: 'Order 42 is rendered' },
      ],
      note: 'Order 43 would match the same pattern — that is what makes routes scale to thousands of pages.',
    },
  },

  api: {
    hero: {
      links: ['sends the action', 'calls an endpoint', 'returns data', 'reads or writes'],
    },
    exchange: {
      request: { label: 'Request', text: 'Give me my profile' },
      via: 'API',
      response: { label: 'Response', text: 'Here is the profile data' },
      note: 'One question, one answer — in a format both sides already agreed on.',
    },
    mapping: {
      title: 'An API works like a restaurant',
      pairs: [
        { icon: 'users', analogy: 'You', reality: 'the user of the app' },
        { icon: 'chat', analogy: 'The waiter', reality: 'the API taking your order' },
        { icon: 'cog', analogy: 'The kitchen', reality: 'the backend doing the work' },
        { icon: 'box', analogy: 'The plate', reality: 'the response you receive' },
      ],
    },
    scenario: {
      title: 'You order food in an app',
      steps: [
        { icon: 'smartphone', label: 'You open a food app', note: 'browse nearby restaurants' },
        { icon: 'target', label: 'You pick a restaurant', note: 'the app has no menus stored' },
        { icon: 'send', label: 'The app calls the API', note: '“menu for restaurant 42”' },
        { icon: 'server', label: 'The backend looks it up', note: 'and checks availability' },
        { icon: 'download', label: 'Data comes back', note: 'dishes, prices, delivery time' },
        { icon: 'monitor', label: 'The menu appears', note: 'in under a second' },
      ],
      note: 'The app never talked to a database. It asked an API, and the API did the rest.',
    },
  },

  'rest-api': {
    exchange: {
      request: { label: 'You ask for one order', text: 'GET /orders/17' },
      via: 'REST',
      response: { label: 'You get that order', text: '200 OK + its JSON' },
      note: 'The address says which thing you mean; the method says what you want done with it.',
    },
    code: {
      title: 'One resource, four verbs',
      panels: [
        { label: 'Read', lines: ['GET /orders'] },
        { label: 'Create', lines: ['POST /orders'] },
        { label: 'Update', lines: ['PATCH /orders/42'] },
        { label: 'Remove', lines: ['DELETE /orders/42'] },
      ],
      notes: [
        { code: 'GET', text: 'safe — it only reads' },
        { code: 'POST', text: 'creates something new' },
        { code: 'DELETE', text: 'removes the resource at that URL' },
        { code: '404', text: 'no order with that id exists' },
      ],
    },
    scenario: {
      title: 'A shopping app manages your orders',
      steps: [
        { icon: 'download', label: 'GET /orders', note: 'the list for your account' },
        { icon: 'send', label: 'POST /orders', note: 'a new one is created' },
        { icon: 'target', label: 'PATCH /orders/42', note: 'you change the address' },
        { icon: 'x', label: 'DELETE /orders/42', note: 'you cancel it' },
      ],
      note: 'The URLs name things and the verbs say what to do, so the API reads almost like a sentence.',
    },
  },

  graphql: {
    exchange: {
      request: { label: 'One question, exact shape', text: '{ user { name avatar } }', mono: true },
      via: 'GraphQL',
      response: { label: 'Exactly that data arrives', text: '{ "user": { "name": …, "avatar": … } }', mono: true },
      note: 'No second round trip for extra fields, and no unused fields on the wire.',
    },
    code: {
      title: 'Ask for exactly this',
      panels: [
        {
          label: 'One query',
          lines: ['query {', '  user(id: 1) { name', '    orders { total } }', '}'],
        },
        { label: 'One matching shape back', lines: ['{ "user": { "name": "Ada",', '  "orders": [ { "total": 39.9 } ] } }'] },
      ],
      notes: [
        { code: 'user(id: 1)', text: 'the starting point, called the root' },
        { code: 'name', text: 'only the fields you asked for' },
        { code: 'orders { total }', text: 'nested data in the same round trip' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'Many REST calls',
        steps: [
          { icon: 'download', label: 'GET /user/1' },
          { icon: 'download', label: 'GET /user/1/orders', note: 'a second round trip' },
          { icon: 'layers', label: 'The app glues the data together' },
        ],
      },
      after: {
        label: 'One GraphQL query',
        steps: [
          { icon: 'send', label: 'One query asks for both' },
          { icon: 'checkCircle', label: 'The server resolves it' },
          { icon: 'zap', label: 'One response, one shape', note: 'exactly the fields needed' },
        ],
      },
      note: 'GraphQL gives the client control over the shape of the data, which mobile apps love.',
    },
    scenario: {
      title: 'A mobile app on a slow connection',
      steps: [
        { icon: 'smartphone', label: 'The app needs three things', note: 'name, orders, avatar' },
        { icon: 'send', label: 'It asks once', note: 'all three in one request' },
        { icon: 'checkCircle', label: 'The server returns only those fields' },
        { icon: 'monitor', label: 'The screen fills in faster', note: 'less data over the air' },
      ],
      note: 'Fewer round trips matter a lot when the network is slow.',
    },
  },

  'full-stack': {
    mapping: {
      title: 'Front of house, back of house',
      pairs: [
        { icon: 'monitor', analogy: 'The dining room', reality: 'the frontend' },
        { icon: 'cog', analogy: 'The kitchen', reality: 'the backend' },
        { icon: 'package', analogy: 'The menu board', reality: 'the API between them' },
        { icon: 'userCheck', analogy: 'Someone who runs both', reality: 'a full-stack developer' },
      ],
    },
    scenario: {
      title: 'You build one small product alone',
      steps: [
        { icon: 'window', label: 'You design the screen', note: 'React and CSS' },
        { icon: 'send', label: 'You write the API', note: 'Node and Express' },
        { icon: 'database', label: 'You store the data', note: 'Postgres tables' },
        { icon: 'rocket', label: 'You deploy both', note: 'and watch it work end to end' },
      ],
      note: 'Full-stack means you can follow a feature through every layer instead of handing it across a wall.',
    },
  },

  oauth: {
    hero: {
      notes: {
        'User approves': 'you allow one thing',
        'Code issued': 'a short-lived receipt',
        'Server exchanges it': 'for a token, privately',
        'Limited token': 'only the access you approved',
      },
      links: ['you stay on the app', 'the app never sees your password', 'access is granted'],
    },
    exchange: {
      request: { label: 'The app asks', text: 'access to your calendar' },
      via: 'OAuth',
      response: { label: 'Google answers', text: 'a limited token — not your password' },
      note: 'The password stays with Google; the app only gets a scoped key.',
    },
    scenario: {
      title: '“Sign in with Google”',
      steps: [
        { icon: 'target', label: 'You tap the Google button' },
        { icon: 'lock', label: 'Google asks you to approve', note: '“share your name and email?”' },
        { icon: 'key', label: 'You approve, a token is issued', note: 'never your password' },
        { icon: 'userCheck', label: 'You are signed in', note: 'the app can stop access anytime' },
      ],
      note: 'OAuth is a standard for handing out limited keys, which is why one login works everywhere.',
    },
  },

  jwt: {
    exchange: {
      request: { label: 'You log in', text: 'email + password' },
      via: 'JWT',
      response: { label: 'Server returns', text: 'a signed token you carry' },
      note: 'The token proves who you are without the server storing a session.',
    },
    code: {
      title: 'Three parts, two dots',
      panels: [
        {
          label: 'A JWT',
          lines: ['eyJhbGciOiJIUzI1NiJ9', '.eyJzdWIiOiI0MiIsImV4cCI6MTcwMCJ9', '.V3rY-s1gn4tur3...'],
        },
      ],
      notes: [
        { code: 'header', text: 'which signing algorithm was used' },
        { code: 'payload', text: 'claims: who, what, and until when' },
        { code: 'signature', text: 'the proof it was not edited' },
        { code: 'exp', text: 'the expiry time — keep it short' },
      ],
    },
    scenario: {
      title: 'A mobile app calling your API',
      steps: [
        { icon: 'lock', label: 'You log in once' },
        { icon: 'download', label: 'App stores a token', note: 'signed, not encrypted' },
        { icon: 'send', label: 'Every call carries it', note: 'in an Authorization header' },
        { icon: 'checkCircle', label: 'The API verifies the signature', note: 'no database lookup needed' },
      ],
      note: 'Because anyone can read a token, never put secrets inside one — and always check the expiry.',
    },
  },

  seo: {
    hero: {
      notes: {
        Crawled: "search bots read the page",
        Indexed: 'it enters the library',
        'Matched to queries': 'it becomes an answer',
        Ranked: 'order decides who clicks',
      },
    },
    scenario: {
      title: 'Someone searches for your page',
      steps: [
        { icon: 'search', label: 'They type a question' },
        { icon: 'book', label: 'The engine checks its index', note: 'pages it already read' },
        { icon: 'scale', label: 'It ranks the best matches', note: 'relevance and quality' },
        { icon: 'monitor', label: 'They click a result', note: 'or nobody does' },
      ],
      note: 'Good SEO is mostly good pages: clear titles, fast loading, useful content that answers a real question.',
    },
  },

  'rate-limiting': {
    exchange: {
      request: { label: 'The 12th call this minute', text: 'GET /search' },
      via: 'Rate limiter',
      response: { label: 'Refused, for now', text: '429 Too Many Requests' },
      note: 'One account misbehaving is slowed down instead of taking the whole service with it.',
    },
    code: {
      title: 'Too many requests',
      panels: [
        { label: 'Request 101 in a minute', lines: ['HTTP/1.1 429 Too Many Requests', 'Retry-After: 30'] },
      ],
      notes: [
        { code: '429', text: 'the polite way to say “slow down”' },
        { code: 'Retry-After', text: 'how long to wait before trying again' },
        { code: 'per key', text: 'limits usually apply to one user or IP' },
      ],
    },
    scenario: {
      title: 'Someone tries thousands of passwords',
      steps: [
        { icon: 'lock', label: 'An attacker hammers the login form' },
        { icon: 'scale', label: 'A limit allows five tries a minute' },
        { icon: 'alert', label: 'The sixth is refused', note: '429, with a wait time' },
        { icon: 'shieldCheck', label: 'Guessing becomes impractical' },
      ],
      note: 'The same limit keeps a runaway script from taking the whole service down.',
    },
  },

  'server-sent-events': {
    exchange: {
      request: { label: 'Subscribe once', text: 'GET /scores/live' },
      via: 'SSE',
      response: { label: 'Updates arrive as they happen', text: 'event: goal\ndata: 2-1', mono: true },
      note: 'One direction, over ordinary HTTP — a scoreboard does not need a two-way channel.',
    },
    beforeAfter: {
      before: {
        label: 'Polling',
        steps: [
          { icon: 'clock', label: 'The page asks every 5 seconds' },
          { icon: 'server', label: 'Mostly “no change”' },
          { icon: 'clock', label: 'Scores update late' },
        ],
      },
      after: {
        label: 'Server-sent events',
        steps: [
          { icon: 'plug', label: 'One connection opens and stays open' },
          { icon: 'send', label: 'The server pushes each change' },
          { icon: 'zap', label: 'The screen is always current', note: 'one-way, server to page' },
        ],
      },
      note: 'Use SSE when only the server needs to talk — it is simpler than a WebSocket.',
    },
    scenario: {
      title: 'Live football scores',
      steps: [
        { icon: 'monitor', label: 'You open the scores page' },
        { icon: 'plug', label: 'It subscribes to one feed' },
        { icon: 'target', label: 'A goal is scored', note: 'elsewhere in the world' },
        { icon: 'refresh', label: 'The number changes on screen', note: 'no refresh, no polling' },
      ],
      note: 'Notifications and progress bars often use the same one-way stream.',
    },
  },

  webassembly: {
    beforeAfter: {
      before: {
        label: 'JavaScript only',
        steps: [
          { icon: 'fileCode', label: 'Heavy work runs in JavaScript' },
          { icon: 'clock', label: 'Fast for most pages' },
          { icon: 'alert', label: 'Too slow for video or 3D', note: 'per-frame limits' },
        ],
      },
      after: {
        label: 'With WebAssembly',
        steps: [
          { icon: 'puzzle', label: 'C or Rust is compiled once' },
          { icon: 'download', label: 'The browser loads a small binary' },
          { icon: 'zap', label: 'It runs near-native speed', note: 'in the same sandbox' },
        ],
      },
      note: 'WebAssembly does not replace JavaScript — it handles the heavy lifting JavaScript calls into.',
    },
    scenario: {
      title: 'Editing a photo in the browser',
      steps: [
        { icon: 'smartphone', label: 'You open a browser photo editor' },
        { icon: 'download', label: 'A small .wasm file loads' },
        { icon: 'cpu', label: 'Filters run at near-native speed' },
        { icon: 'monitor', label: 'The preview updates smoothly', note: 'no app install' },
      ],
      note: 'Anything that used to need an installed program can now run inside a tab.',
    },
  },
}
