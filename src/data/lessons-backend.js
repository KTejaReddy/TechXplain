/**
 * Visual lesson content for the backend concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const backendLessons = {
  backend: {
    mapping: {
      title: 'The part of the restaurant you never see',
      pairs: [
        { icon: 'chat', analogy: 'Orders taken at the counter', reality: 'the API layer' },
        { icon: 'cog', analogy: 'The kitchen rules', reality: 'business logic' },
        { icon: 'database', analogy: 'The pantry', reality: 'the database' },
        { icon: 'server', analogy: 'The building, power and staff', reality: 'infrastructure' },
      ],
    },
    scenario: {
      title: 'You place an order',
      steps: [
        { icon: 'target', label: 'You tap “Buy now”' },
        { icon: 'send', label: 'A request reaches the backend' },
        { icon: 'cog', label: 'The rules are checked', note: 'stock, price, discount' },
        { icon: 'database', label: 'The order is saved' },
        { icon: 'checkCircle', label: 'You get a confirmation' },
      ],
      note: 'The backend never sees your screen — it only sees the data you sent.',
    },
  },

  server: {
    mapping: {
      title: 'A shop counter',
      pairs: [
        { icon: 'users', analogy: 'The queue of customers', reality: 'incoming requests' },
        { icon: 'chat', analogy: 'Someone serving them', reality: 'the running process' },
        { icon: 'package', analogy: 'Handing over the goods', reality: 'the response' },
        { icon: 'clock', analogy: 'Never closes', reality: 'always listening on a port' },
      ],
    },
    scenario: {
      title: 'A file is requested',
      steps: [
        { icon: 'search', label: 'A request arrives for page.html' },
        { icon: 'server', label: 'The server finds the file' },
        { icon: 'download', label: 'It sends it back', note: 'with the right content type' },
        { icon: 'checkCircle', label: 'The browser paints it' },
      ],
      note: 'One server can answer thousands of requests a second — that is what it is built for.',
    },
  },

  'web-server': {
    code: {
      title: 'Serving files and proxying',
      panels: [
        {
          label: 'nginx.conf',
          lines: ['location / {', '  root /var/www/site;', '  try_files $uri $uri/ =404;', '}'],
        },
      ],
      notes: [
        { code: 'root', text: 'which folder holds the files' },
        { code: 'try_files', text: 'try the path, then the folder, else 404' },
        { code: 'proxy_pass', text: 'or hand the request to an app behind it' },
      ],
    },
    scenario: {
      title: 'A product image loads',
      steps: [
        { icon: 'search', label: 'The browser asks for the image' },
        { icon: 'server', label: 'Nginx finds it on disk' },
        { icon: 'zap', label: 'It is sent with a cache header' },
        { icon: 'monitor', label: 'Next time it comes from the browser cache' },
      ],
      note: 'Web servers are extremely good at static files, so your app code never has to be.',
    },
  },

  'application-server': {
    mapping: {
      title: 'Kitchen, not counter',
      pairs: [
        { icon: 'chat', analogy: 'Taking orders', reality: 'the web server' },
        { icon: 'cog', analogy: 'Cooking them', reality: 'the application server running your code' },
        { icon: 'package', analogy: 'Plates ready to serve', reality: 'the rendered response' },
        { icon: 'users', analogy: 'Several cooks at once', reality: 'worker processes handling requests in parallel' },
      ],
    },
    scenario: {
      title: 'A Django page is requested',
      steps: [
        { icon: 'search', label: 'The web server takes the request' },
        { icon: 'send', label: 'It forwards it to the app server', note: 'Gunicorn, uWSGI' },
        { icon: 'cog', label: 'Python code runs', note: 'logic, database, templates' },
        { icon: 'download', label: 'HTML is handed back' },
      ],
      note: 'Splitting the two lets each do what it is best at, and lets you restart one without the other.',
    },
  },

  'request-response': {
    exchange: {
      request: { label: 'Request', text: 'GET /orders/42' },
      via: 'the cycle',
      response: { label: 'Response', text: '200 OK, order 42 as JSON' },
      note: 'One request always produces exactly one response — even if that response is an error.',
    },
    code: {
      title: 'Plain text both ways',
      panels: [
        { label: 'Request', lines: ['GET /orders/42 HTTP/1.1', 'Accept: application/json'] },
        { label: 'Response', lines: ['HTTP/1.1 200 OK', 'Content-Type: application/json'] },
      ],
      notes: [
        { code: 'method + path', text: 'what to do and to which thing' },
        { code: 'headers', text: 'notes about the request and the answer' },
        { code: 'status', text: 'the first thing the client reads' },
      ],
    },
    scenario: {
      title: 'Every click is this cycle',
      steps: [
        { icon: 'target', label: 'You tap a name' },
        { icon: 'send', label: 'A request goes out', note: 'with your session attached' },
        { icon: 'cog', label: 'The server works out the answer' },
        { icon: 'download', label: 'One response comes back' },
        { icon: 'monitor', label: 'The page renders it' },
      ],
      note: 'The internet is mostly this pattern, repeated billions of times a second.',
    },
  },

  crud: {
    code: {
      title: 'The four things data can do',
      panels: [
        { label: 'Create & Read', lines: ['POST /posts', 'GET  /posts', 'GET  /posts/7'] },
        { label: 'Update & Delete', lines: ['PATCH  /posts/7', 'DELETE /posts/7'] },
      ],
      notes: [
        { code: 'Create', text: 'a new record appears' },
        { code: 'Read', text: 'one record or a list comes back' },
        { code: 'Update', text: 'only the fields you send change' },
        { code: 'Delete', text: 'the record is removed or archived' },
      ],
    },
    scenario: {
      title: 'Managing a blog post',
      steps: [
        { icon: 'cog', label: 'You write a draft', note: 'create' },
        { icon: 'eye', label: 'You preview it', note: 'read' },
        { icon: 'cycle', label: 'You fix a typo', note: 'update' },
        { icon: 'x', label: 'You delete an old draft' },
      ],
      note: 'Almost every screen you build is some arrangement of these four operations.',
    },
  },

  mvc: {
    mapping: {
      title: 'Waiter, pantry, plate',
      pairs: [
        { icon: 'chat', analogy: 'The waiter taking the order', reality: 'the controller' },
        { icon: 'database', analogy: 'The pantry and recipes', reality: 'the model' },
        { icon: 'eye', analogy: 'How the dish is plated', reality: 'the view' },
        { icon: 'refresh', analogy: 'One order, three roles', reality: 'each part changed separately' },
      ],
    },
    scenario: {
      title: 'Opening a product page',
      steps: [
        { icon: 'search', label: 'A route is matched', note: 'controller' },
        { icon: 'database', label: 'The model fetches product 42' },
        { icon: 'eye', label: 'The view renders the template' },
        { icon: 'download', label: 'HTML goes back to the browser' },
      ],
      note: 'You can redesign the page without touching the data rules — that separation is the whole point.',
    },
  },

  nodejs: {
    code: {
      title: 'A server in ten lines',
      panels: [
        {
          label: 'server.js',
          lines: ['import http from "node:http"', '', 'http.createServer((req, res) => {', '  res.end("hello")', '}).listen(3000)'],
        },
      ],
      notes: [
        { code: 'createServer', text: 'every request calls this function' },
        { code: 'req, res', text: 'the request in, the response out' },
        { code: 'listen(3000)', text: 'starts answering on port 3000' },
      ],
    },
    scenario: {
      title: 'One process, thousands of connections',
      steps: [
        { icon: 'server', label: 'Node starts' },
        { icon: 'plug', label: 'Requests begin arriving' },
        { icon: 'cycle', label: 'Each is handled one at a time', note: 'but never blocked while waiting' },
        { icon: 'zap', label: 'Thousands stay open' },
      ],
      note: 'The event loop is why JavaScript on the server suits APIs and realtime work so well.',
    },
  },

  express: {
    code: {
      title: 'A route and its handler',
      panels: [
        {
          label: 'app.js',
          lines: ['app.get("/orders/:id", (req, res) => {', '  const order = orders.find(req.params.id)', '  res.json(order)', '})'],
        },
      ],
      notes: [
        { code: 'app.get', text: 'matches a method and a path' },
        { code: ':id', text: 'a named piece of the URL' },
        { code: 'res.json', text: 'sends data back with the right content type' },
      ],
    },
    scenario: {
      title: 'Building a small API in an afternoon',
      steps: [
        { icon: 'terminal', label: 'You start a Node project' },
        { icon: 'cog', label: 'Add a few routes' },
        { icon: 'plug', label: 'Add middleware for auth' },
        { icon: 'check', label: 'Test the endpoints' },
      ],
      note: 'Express is small on purpose: routes, middleware, and you decide everything else.',
    },
  },

  flask: {
    code: {
      title: 'The smallest possible app',
      panels: [
        {
          label: 'app.py',
          lines: ['from flask import Flask', 'app = Flask(__name__)', '', '@app.route("/hello")', 'def hello():', '    return "hi"'],
        },
      ],
      notes: [
        { code: '@app.route', text: 'a decorator linking a path to a function' },
        { code: 'def hello', text: 'the function that produces the response' },
        { code: 'return', text: 'a string, HTML, or JSON' },
      ],
    },
    scenario: {
      title: 'An internal tool for the finance team',
      steps: [
        { icon: 'folder', label: 'One Python file' },
        { icon: 'target', label: 'Three routes' },
        { icon: 'table', label: 'One database query' },
        { icon: 'rocket', label: 'Running by lunchtime' },
      ],
      note: 'For small tools, a tiny framework beats a big one — you can hold the whole thing in your head.',
    },
  },

  django: {
    mapping: {
      title: 'Batteries included',
      pairs: [
        { icon: 'chat', analogy: 'Routes and controllers', reality: 'URLs and views' },
        { icon: 'database', analogy: 'Tables without SQL', reality: 'the ORM and models' },
        { icon: 'lock', analogy: 'Logins and permissions', reality: 'the built-in auth system' },
        { icon: 'terminal', analogy: 'A management screen', reality: 'the admin panel, free' },
      ],
    },
    scenario: {
      title: 'A content site for a newsroom',
      steps: [
        { icon: 'database', label: 'Models describe articles and authors' },
        { icon: 'terminal', label: 'Admins edit content', note: 'in the generated admin panel' },
        { icon: 'eye', label: 'Views render the templates' },
        { icon: 'rocket', label: 'It is deployed behind a web server' },
      ],
      note: 'Django decides many things for you, which is exactly why some teams pick it and others avoid it.',
    },
  },

  fastapi: {
    code: {
      title: 'Types in, docs out',
      panels: [
        {
          label: 'main.py',
          lines: ['@app.get("/items/{item_id}")', 'def read_item(item_id: int, q: str | None = None):', '    return {"id": item_id, "q": q}'],
        },
      ],
      notes: [
        { code: 'item_id: int', text: 'the value is converted and validated for you' },
        { code: 'async', text: 'handlers can await slow work' },
        { code: '/docs', text: 'interactive API docs are generated from the types' },
      ],
    },
    scenario: {
      title: 'Serving a machine-learning model',
      steps: [
        { icon: 'brain', label: 'A model is loaded at startup' },
        { icon: 'send', label: 'Requests arrive with JSON' },
        { icon: 'checkCircle', label: 'The shapes are validated first' },
        { icon: 'zap', label: 'The prediction is returned', note: 'hundreds per second' },
      ],
      note: 'Validation and generated docs save a surprising amount of routine work.',
    },
  },

  middleware: {
    exchange: {
      request: { label: 'Every request passes through', text: 'GET /dashboard' },
      via: 'Middleware',
      response: { label: 'Or is stopped on the way', text: 'logged, checked, then handled' },
      note: 'Logging, login checks and parsing live here once, instead of in every route.',
    },
    mapping: {
      title: 'Checkpoints on one road',
      pairs: [
        { icon: 'lock', analogy: 'A security check', reality: 'authentication middleware' },
        { icon: 'book', analogy: 'A logbook', reality: 'request logging' },
        { icon: 'scale', analogy: 'A speed limit', reality: 'rate limiting' },
        { icon: 'refresh', analogy: 'A barrier that lets you through', reality: 'calling next()' },
      ],
    },
    code: {
      title: 'Sit in the middle of every request',
      panels: [
        {
          label: 'logger.js',
          lines: ['function logger(req, res, next) {', '  console.log(req.method, req.url)', '  next()   // pass it on', '}'],
        },
      ],
      notes: [
        { code: 'req, res', text: 'the request on its way through' },
        { code: 'next()', text: 'hand control to the next step' },
        { code: 'order', text: 'middleware runs in the order registered' },
      ],
    },
    scenario: {
      title: 'Every request is checked once',
      steps: [
        { icon: 'plug', label: 'A request enters the app' },
        { icon: 'book', label: 'It is logged' },
        { icon: 'lock', label: 'The session is verified' },
        { icon: 'cog', label: 'Only then does the route run' },
      ],
      note: 'Middleware is how cross-cutting concerns avoid being repeated in every handler.',
    },
  },

  'api-gateway': {
    exchange: {
      request: { label: 'One public address', text: 'api.shop.com/orders' },
      via: 'API gateway',
      response: { label: 'Forwarded inward', text: 'the orders service handles it' },
      note: 'Clients learn one URL; the gateway keeps track of which service is behind it.',
    },
    mapping: {
      title: 'One front desk',
      pairs: [
        { icon: 'building', analogy: 'The hotel reception', reality: 'the gateway' },
        { icon: 'users', analogy: 'Guests', reality: 'clients calling one address' },
        { icon: 'lock', analogy: 'Checking your key card', reality: 'auth, limits and logging in one place' },
        { icon: 'route', analogy: 'Directing you to a room', reality: 'routing to the right service' },
      ],
    },
    scenario: {
      title: 'A mobile app with one API address',
      steps: [
        { icon: 'smartphone', label: 'The app calls api.shop.com' },
        { icon: 'route', label: 'The gateway routes it', note: 'orders service or users service' },
        { icon: 'lock', label: 'It checks the token first' },
        { icon: 'zap', label: 'The answer returns as one response' },
      ],
      note: 'Clients see one stable address even when the services behind it change.',
    },
  },

  microservices: {
    beforeAfter: {
      before: {
        label: 'One application',
        steps: [
          { icon: 'box', label: 'Everything in one codebase' },
          { icon: 'zap', label: 'Simple to build and deploy' },
          { icon: 'alert', label: 'One hot feature forces a full redeploy' },
        ],
      },
      after: {
        label: 'Small services',
        steps: [
          { icon: 'puzzle', label: 'Each service owns one job' },
          { icon: 'rocket', label: 'Teams deploy independently' },
          { icon: 'network', label: 'The cost: network calls and more moving parts' },
        ],
      },
      note: 'Split when team size and release cadence demand it — not because it sounds modern.',
    },
    scenario: {
      title: 'A shop split into four services',
      steps: [
        { icon: 'users', label: 'User service', note: 'accounts and logins' },
        { icon: 'box', label: 'Catalogue service', note: 'products and search' },
        { icon: 'coin', label: 'Payment service', note: 'money, carefully' },
        { icon: 'send', label: 'They talk over the network' },
      ],
      note: 'Each can be scaled or fixed alone, at the price of a much more complex system.',
    },
  },

  'load-balancer': {
    exchange: {
      request: { label: 'A visitor arrives', text: 'GET /' },
      via: 'Load balancer',
      response: { label: 'Sent to a healthy server', text: 'server 2 answers' },
      note: 'The visitor never learns which server replied, and never notices one being restarted.',
    },
    beforeAfter: {
      before: {
        label: 'One server',
        steps: [
          { icon: 'server', label: 'All traffic to one machine' },
          { icon: 'clock', label: 'It works hard and waits' },
          { icon: 'alert', label: 'It goes down, everything goes down' },
        ],
      },
      after: {
        label: 'Behind a balancer',
        steps: [
          { icon: 'route', label: 'Traffic is spread across servers' },
          { icon: 'checkCircle', label: 'Unhealthy ones are skipped' },
          { icon: 'chart', label: 'Add more when demand grows', note: 'no downtime to scale' },
        ],
      },
      note: 'It also handles the unglamorous parts: health checks, draining and TLS termination.',
    },
    scenario: {
      title: 'A sale starts at midnight',
      steps: [
        { icon: 'chart', label: 'Traffic jumps ten times' },
        { icon: 'route', label: 'The balancer spreads it' },
        { icon: 'alert', label: 'One server fails', note: 'it is removed from rotation' },
        { icon: 'checkCircle', label: 'Customers never notice' },
      ],
      note: 'Round robin, least connections or sticky sessions — the choice changes how your app must behave.',
    },
  },

  caching: {
    exchange: {
      request: { label: 'The same product, again', text: 'GET /products/9' },
      via: 'Cache',
      response: { label: 'Answered from memory', text: 'the same JSON, in 2 ms' },
      note: 'The slow lookup happened once; every later visitor gets the stored answer.',
    },
    code: {
      title: 'Check, then store',
      panels: [
        { label: 'read', lines: ['const hit = await redis.get(key)', 'if (hit) return JSON.parse(hit)'] },
        { label: 'miss', lines: ['const data = await db.query(sql)', 'await redis.set(key, data, "EX", 60)'] },
      ],
      notes: [
        { code: 'hit', text: 'in memory, microseconds' },
        { code: 'miss', text: 'go to the real source once' },
        { code: 'EX 60', text: 'expire after a minute, so it cannot go stale for long' },
      ],
    },
    scenario: {
      title: 'A homepage that never feels slow',
      steps: [
        { icon: 'download', label: 'First visitor triggers a cache fill' },
        { icon: 'zap', label: 'The next thousand read from memory' },
        { icon: 'database', label: 'The database stays quiet' },
        { icon: 'clock', label: 'The entry expires and is refreshed' },
      ],
      note: 'The hard parts are choosing what to expire and what to invalidate when data changes.',
    },
  },

  queues: {
    exchange: {
      request: { label: 'One request asks for a lot', text: 'send 10,000 emails' },
      via: 'Queue',
      response: { label: 'The work is handed off', text: '“queued” — and answered at once' },
      note: 'Workers drain the queue in the background, so nobody waits for 10,000 emails.',
    },
    beforeAfter: {
      before: {
        label: 'Work inside the request',
        steps: [
          { icon: 'target', label: 'You sign up' },
          { icon: 'send', label: 'Welcome email is sent now' },
          { icon: 'clock', label: 'The page waits for the mail server' },
        ],
      },
      after: {
        label: 'Work handed to a queue',
        steps: [
          { icon: 'target', label: 'You sign up' },
          { icon: 'flow', label: 'A job is queued instantly' },
          { icon: 'zap', label: 'The page responds at once', note: 'a worker emails later' },
        ],
      },
      note: 'Queues also give you retries and a record of what failed.',
    },
    scenario: {
      title: 'A newsletter to 40,000 people',
      steps: [
        { icon: 'cog', label: 'One job is created per subscriber' },
        { icon: 'flow', label: 'They wait in a queue' },
        { icon: 'users', label: 'Eight workers drain it', note: 'at a controlled rate' },
        { icon: 'check', label: 'Failures are retried automatically' },
      ],
      note: 'Slow work belongs outside the request, where it can fail and retry without anyone waiting.',
    },
  },

  redis: {
    code: {
      title: 'Keys with lifetimes',
      panels: [
        { label: 'redis-cli', lines: ['SET session:abc "user:42" EX 3600', 'GET session:abc', 'INCR tries:1.2.3.4'] },
      ],
      notes: [
        { code: 'EX 3600', text: 'this key vanishes after an hour' },
        { code: 'GET', text: 'a lookup in microseconds' },
        { code: 'INCR', text: 'counters for rate limits and dashboards' },
      ],
    },
    scenario: {
      title: 'Logging out everywhere',
      steps: [
        { icon: 'lock', label: 'Sessions live in Redis', note: 'not in one server’s memory' },
        { icon: 'cycle', label: 'Any server can read them' },
        { icon: 'x', label: 'You delete one key' },
        { icon: 'checkCircle', label: 'That user is signed out everywhere' },
      ],
      note: 'Keeping session data in one shared store is what makes several app servers possible.',
    },
  },

  kafka: {
    mapping: {
      title: 'A logbook, not a queue',
      pairs: [
        { icon: 'book', analogy: 'Every event written down in order', reality: 'the append-only log' },
        { icon: 'users', analogy: 'Several readers at their own pace', reality: 'consumer groups' },
        { icon: 'refresh', analogy: 'Reading yesterday again', reality: 'replay for a new service' },
        { icon: 'layers', analogy: 'Splitting the book by topic', reality: 'partitions for scale' },
      ],
    },
    scenario: {
      title: 'One order event, three teams',
      steps: [
        { icon: 'checkCircle', label: 'An order is placed' },
        { icon: 'book', label: 'An event is appended to a topic' },
        { icon: 'chart', label: 'Analytics consumes it' },
        { icon: 'send', label: 'Warehouse and email do too', note: 'independent of each other' },
      ],
      note: 'The producer does not know or care who is listening — that decoupling is the point.',
    },
  },

  grpc: {
    exchange: {
      request: { label: 'One service calls another', text: 'GetUser(id: 42)', mono: true },
      via: 'HTTP/2',
      response: { label: 'A typed reply, packed tight', text: 'user { name: "Ann" }', mono: true },
      note: 'The method and the shape of the answer are agreed in advance, so no guesswork.',
    },
    code: {
      title: 'The contract comes first',
      panels: [
        {
          label: 'orders.proto',
          lines: ['service Orders {', '  rpc GetOrder (OrderId) returns (Order) {}', '}'],
        },
      ],
      notes: [
        { code: 'service', text: 'the methods this service offers' },
        { code: 'rpc', text: 'a call that looks local but crosses the network' },
        { code: 'generated', text: 'clients and servers are produced from this file' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'JSON over HTTP',
        steps: [
          { icon: 'send', label: 'Text is serialised' },
          { icon: 'table', label: 'Field names repeated every time' },
          { icon: 'clock', label: 'Fine, but heavier' },
        ],
      },
      after: {
        label: 'gRPC',
        steps: [
          { icon: 'puzzle', label: 'Compact binary messages' },
          { icon: 'zap', label: 'Faster and smaller on the wire' },
          { icon: 'checkCircle', label: 'Typed clients you cannot misuse', note: 'ideally, anyway' },
        ],
      },
      note: 'Great inside your own network; less friendly to browsers and curious humans.',
    },
    scenario: {
      title: 'Ten services talking to each other',
      steps: [
        { icon: 'book', label: 'One shared .proto file' },
        { icon: 'cog', label: 'Each service generates its client' },
        { icon: 'send', label: 'Calls are typed end to end' },
        { icon: 'checkCircle', label: 'A wrong field cannot compile' },
      ],
      note: 'Inside a company, the strict contract is a feature rather than a constraint.',
    },
  },

  'cron-jobs': {
    code: {
      title: 'A schedule in five fields',
      panels: [
        { label: 'crontab', lines: ['# minute hour day month weekday', '0 3 * * *    /app/nightly-report.sh'] },
      ],
      notes: [
        { code: '0 3 * * *', text: 'at 03:00, every day' },
        { code: '*/5 * * * *', text: 'every five minutes' },
        { code: 'idempotent', text: 'a rerun must not double-charge anybody' },
      ],
    },
    scenario: {
      title: 'A nightly invoice run',
      steps: [
        { icon: 'clock', label: 'The clock reaches 03:00' },
        { icon: 'flow', label: 'The job starts' },
        { icon: 'cog', label: 'It generates the month’s invoices' },
        { icon: 'send', label: 'They are emailed and logged' },
        { icon: 'alert', label: 'A failure alerts the team', note: 'at 03:05, not 09:00' },
      ],
      note: 'Anything periodic — reports, backups, clean-ups — usually starts life as a scheduled job.',
    },
  },
}
