/**
 * Visual lesson content for the DevOps concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const devopsLessons = {
  git: {
    hero: { links: ['a labelled save point', 'try something new', 'back into the main line'] },
    mapping: {
      title: 'Save points in a game',
      pairs: [
        { icon: 'gitCommit', analogy: 'A save point', reality: 'a commit' },
        { icon: 'gitBranch', analogy: 'A separate save file', reality: 'a branch' },
        { icon: 'check', analogy: 'Loading one back', reality: 'checkout an earlier commit' },
        { icon: 'users', analogy: 'Several players on one story', reality: 'a shared remote and merges' },
      ],
    },
    scenario: {
      title: 'Fixing a bug without breaking anything',
      steps: [
        { icon: 'gitBranch', label: 'You branch off main', note: 'a copy of history' },
        { icon: 'fileCode', label: 'You change two files' },
        { icon: 'gitCommit', label: 'You commit with a message', note: 'one logical change' },
        { icon: 'send', label: 'You push and open a review' },
        { icon: 'check', label: 'It is merged once approved' },
      ],
      note: 'Main stayed working the whole time, and the change is one revert away if it misbehaves.',
    },
  },

  github: {
    mapping: {
      title: 'Code hosting plus the work around it',
      pairs: [
        { icon: 'folder', analogy: 'The repositories', reality: 'where the code lives' },
        { icon: 'eye', analogy: 'Pull requests', reality: 'proposing and reviewing changes' },
        { icon: 'alert', analogy: 'Issues', reality: 'tracking bugs and ideas' },
        { icon: 'cog', analogy: 'Actions', reality: 'tests and deployments on every push' },
      ],
    },
    scenario: {
      title: 'A bug in an open-source library',
      steps: [
        { icon: 'search', label: 'You find the repository' },
        { icon: 'folder', label: 'You fork it', note: 'your own copy' },
        { icon: 'fileCode', label: 'You fix it on a branch' },
        { icon: 'send', label: 'You open a pull request' },
        { icon: 'checkCircle', label: 'Checks run, a maintainer reviews' },
      ],
      note: 'The workflow is the same whether you are one person or ten thousand.',
    },
  },

  gitlab: {
    beforeAfter: {
      before: {
        label: 'Separate tools',
        steps: [
          { icon: 'folder', label: 'One place for code' },
          { icon: 'cog', label: 'Another for pipelines' },
          { icon: 'alert', label: 'Two sets of accounts and permissions' },
        ],
      },
      after: {
        label: 'One platform',
        steps: [
          { icon: 'folder', label: 'Code, pipelines and issues together' },
          { icon: 'lock', label: 'One permission model' },
          { icon: 'server', label: 'Or self-hosted on your own servers', note: 'when that is required' },
        ],
      },
      note: 'Its strength is the option to run the whole thing inside your own network.',
    },
    scenario: {
      title: 'A bank that must self-host',
      steps: [
        { icon: 'server', label: 'GitLab is installed internally' },
        { icon: 'users', label: 'Teams keep using the same workflow' },
        { icon: 'lock', label: 'No code leaves the network' },
        { icon: 'checkCircle', label: 'Auditors are satisfied' },
      ],
      note: 'Self-hosting moves the maintenance work onto your own team.',
    },
  },

  docker: {
    hero: { links: ['packaged once', 'runs the same everywhere'] },
    layers: {
      layers: [
        {
          icon: 'fileCode',
          label: 'Your app code',
          note: 'the part you actually wrote, copied in last',
        },
        {
          icon: 'package',
          label: 'Dependencies',
          note: 'the libraries it needs, pinned to exact versions',
        },
        {
          icon: 'box',
          label: 'Base image',
          note: 'a small Linux userland to run on top of',
        },
      ],
      note: 'Each line in a Dockerfile adds a layer. Layers are cached and shared, so an unchanged base image is never downloaded twice.',
      caption: 'An image is a stack of read-only layers; a container adds one writable layer on top.',
    },
    mapping: {
      title: 'A packed suitcase',
      pairs: [
        { icon: 'box', analogy: 'The suitcase', reality: 'the container image' },
        { icon: 'package', analogy: 'Everything you need inside', reality: 'code plus its runtime and libraries' },
        { icon: 'refresh', analogy: 'Unpacked the same way anywhere', reality: 'identical on any compatible host' },
        { icon: 'layers', analogy: 'Packed in stages', reality: 'image layers that are cached' },
      ],
    },
    scenario: {
      title: '“It works on my machine” ends',
      steps: [
        { icon: 'fileCode', label: 'You describe the app in a Dockerfile' },
        { icon: 'puzzle', label: 'An image is built once' },
        { icon: 'box', label: 'A container starts from that image', note: 'on your laptop' },
        { icon: 'server', label: 'The same image runs in production' },
        { icon: 'checkCircle', label: 'The environment stops being a variable' },
      ],
      note: 'Each container thinks it has the whole machine to itself, which is what makes this reliable.',
    },
  },

  container: {
    beforeAfter: {
      before: {
        label: 'Virtual machine',
        steps: [
          { icon: 'layers', label: 'Its own full operating system' },
          { icon: 'download', label: 'Gigabytes to move around' },
          { icon: 'clock', label: 'Boots in minutes' },
        ],
      },
      after: {
        label: 'Container',
        steps: [
          { icon: 'box', label: 'Shares the host kernel' },
          { icon: 'package', label: 'Megabytes, mostly your app' },
          { icon: 'zap', label: 'Starts in under a second' },
        ],
      },
      note: 'Lighter and faster, with weaker isolation than a full virtual machine.',
    },
    scenario: {
      title: 'Splitting an app into containers',
      steps: [
        { icon: 'window', label: 'One container for the web app' },
        { icon: 'database', label: 'One for the database' },
        { icon: 'refresh', label: 'One for the background worker' },
        { icon: 'checkCircle', label: 'Each is restarted independently' },
      ],
      note: 'A container should do one job well and expect to be thrown away at any time.',
    },
  },

  'docker-image': {
    code: {
      title: 'Layers, stacked',
      panels: [
        {
          label: 'Dockerfile',
          lines: ['FROM node:22-slim', 'COPY package.json .', 'RUN npm install', 'COPY . .', 'CMD ["npm", "start"]'],
        },
      ],
      notes: [
        { code: 'FROM', text: 'the base everything sits on' },
        { code: 'RUN', text: 'one layer, cached until this line changes' },
        { code: 'CMD', text: 'what starts when the container runs' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'No cache',
        steps: [
          { icon: 'clock', label: 'Every build reinstalls everything' },
          { icon: 'download', label: 'Minutes of network time' },
        ],
      },
      after: {
        label: 'Cached layers',
        steps: [
          { icon: 'puzzle', label: 'Copy dependencies first' },
          { icon: 'zap', label: 'Unchanged layers are reused' },
          { icon: 'checkCircle', label: 'Rebuilds take seconds' },
        ],
      },
      note: 'Order your instructions so the things that change least come first.',
    },
    scenario: {
      title: 'A small, quick image',
      steps: [
        { icon: 'fileCode', label: 'One stage builds the app' },
        { icon: 'package', label: 'A second keeps only the output' },
        { icon: 'download', label: 'The image shrinks several times over' },
        { icon: 'zap', label: 'And it starts faster' },
      ],
      note: 'Image size affects deploy speed, pull time and your attack surface.',
    },
  },

  dockerfile: {
    code: {
      title: 'The recipe for an image',
      panels: [
        {
          label: 'Dockerfile',
          lines: ['FROM python:3.12-slim', 'WORKDIR /app', 'COPY requirements.txt .', 'RUN pip install -r requirements.txt', 'COPY . .', 'CMD ["python", "app.py"]'],
        },
      ],
      notes: [
        { code: 'FROM', text: 'the base image everything else sits on' },
        { code: 'COPY', text: 'files brought into the image' },
        { code: 'RUN', text: 'run once, while building, then cached' },
        { code: 'CMD', text: 'runs every time a container starts' },
      ],
    },
    scenario: {
      title: 'From source files to a running container',
      steps: [
        { icon: 'fileCode', label: 'You write the Dockerfile' },
        { icon: 'puzzle', label: 'docker build reads it line by line' },
        { icon: 'package', label: 'Each instruction becomes a layer', note: 'and can be cached' },
        { icon: 'rocket', label: 'docker run starts a container from the image' },
      ],
      note: 'Build-time and run-time instructions are different things, which is the first surprise for most people.',
    },
  },

  'container-registry': {
    mapping: {
      title: 'A library for images',
      pairs: [
        { icon: 'box', analogy: 'Books on shelves', reality: 'stored images' },
        { icon: 'hash', analogy: 'Each edition numbered', reality: 'tags and digests' },
        { icon: 'lock', analogy: 'Who may borrow', reality: 'private or public access' },
        { icon: 'refresh', analogy: 'Keep the latest printing', reality: 'lifecycle rules for old images' },
      ],
    },
    scenario: {
      title: 'From build to deploy',
      steps: [
        { icon: 'puzzle', label: 'The pipeline builds an image' },
        { icon: 'cloud', label: 'It is pushed to the registry', note: 'tagged with the commit' },
        { icon: 'download', label: 'Servers pull it by tag' },
        { icon: 'rocket', label: 'Containers start from it' },
      ],
      note: 'The tag is the contract between build and deploy — and “latest” is a poor contract.',
    },
  },

  kubernetes: {
    layers: {
      layers: [
        {
          icon: 'box',
          label: 'Container',
          note: 'one running copy of your app',
        },
        {
          icon: 'layers',
          label: 'Pod',
          note: 'the smallest thing Kubernetes schedules',
        },
        {
          icon: 'server',
          label: 'Node',
          note: 'a machine that actually runs pods',
        },
        {
          icon: 'network',
          label: 'Cluster',
          note: 'all the nodes, managed as one pool',
        },
      ],
      note: 'You describe the layer above and Kubernetes works out the layers below — a pod is placed on whichever node has room.',
      caption: 'Each layer holds the one above it, and you only ever describe the top one.',
    },
    mapping: {
      title: 'A scheduler for containers',
      pairs: [
        { icon: 'target', analogy: 'It decides where things run', reality: 'the scheduler' },
        { icon: 'cycle', analogy: 'It keeps the count you asked for', reality: 'reconciliation loops' },
        { icon: 'alert', analogy: 'It replaces what dies', reality: 'self-healing' },
        { icon: 'chart', analogy: 'It adds copies under load', reality: 'autoscaling' },
      ],
    },
    scenario: {
      title: 'A container crashes at 3am',
      steps: [
        { icon: 'alert', label: 'One container dies' },
        { icon: 'eye', label: 'A health check fails' },
        { icon: 'refresh', label: 'It is replaced automatically' },
        { icon: 'checkCircle', label: 'Traffic continues on the others' },
      ],
      note: 'You describe the state you want; Kubernetes keeps working to reach it.',
    },
  },

  'ci-cd': {
    beforeAfter: {
      before: {
        label: 'Manual releases',
        steps: [
          { icon: 'users', label: 'Someone follows a checklist' },
          { icon: 'clock', label: 'An hour of copy-and-paste' },
          { icon: 'alert', label: 'Steps get skipped under pressure' },
        ],
      },
      after: {
        label: 'Automated pipeline',
        steps: [
          { icon: 'gitCommit', label: 'A commit triggers the pipeline' },
          { icon: 'checkCircle', label: 'Tests and checks run' },
          { icon: 'rocket', label: 'It deploys the same way every time' },
        ],
      },
      note: 'The point is not speed alone — it is that the process stops depending on memory.',
    },
    scenario: {
      title: 'Merging a pull request',
      steps: [
        { icon: 'send', label: 'A branch is pushed' },
        { icon: 'checkCircle', label: 'Tests run automatically' },
        { icon: 'package', label: 'An image is built and tagged' },
        { icon: 'rocket', label: 'It deploys to staging, then production' },
      ],
      note: 'Small, frequent releases are safer than rare, large ones.',
    },
  },

  pipeline: {
    mapping: {
      title: 'A conveyor belt with checks',
      pairs: [
        { icon: 'checkCircle', analogy: 'Station one: does it work?', reality: 'lint and tests' },
        { icon: 'puzzle', analogy: 'Station two: build it', reality: 'compile and package' },
        { icon: 'shieldCheck', analogy: 'Station three: is it safe?', reality: 'scans and checks' },
        { icon: 'rocket', analogy: 'Final station: ship it', reality: 'deploy' },
      ],
    },
    scenario: {
      title: 'A pipeline that stops early',
      steps: [
        { icon: 'gitCommit', label: 'A commit lands' },
        { icon: 'alert', label: 'A unit test fails', note: 'after 90 seconds' },
        { icon: 'x', label: 'Later stages never run' },
        { icon: 'check', label: 'The developer fixes and pushes' },
      ],
      note: 'Fast feedback is the whole reason to put the quickest checks first.',
    },
  },

  deployment: {
    beforeAfter: {
      before: {
        label: 'Stop and swap',
        steps: [
          { icon: 'x', label: 'The old version is stopped' },
          { icon: 'download', label: 'The new one starts' },
          { icon: 'alert', label: 'A gap in service', note: 'plus a scary rollback' },
        ],
      },
      after: {
        label: 'Rolling deploy',
        steps: [
          { icon: 'layers', label: 'New instances start beside the old' },
          { icon: 'checkCircle', label: 'They pass health checks' },
          { icon: 'refresh', label: 'Old ones are drained and removed', note: 'zero downtime' },
        ],
      },
      note: 'You cannot deploy safely without being able to roll back just as quickly.',
    },
    scenario: {
      title: 'Shipping at 4pm on a Friday',
      steps: [
        { icon: 'rocket', label: 'The new version rolls out' },
        { icon: 'chart', label: 'Error rates are watched' },
        { icon: 'alert', label: 'Latency creeps up' },
        { icon: 'refresh', label: 'One command sends it back' },
      ],
      note: 'Small, reversible deploys turn releases into a routine rather than an event.',
    },
  },

  production: {
    mapping: {
      title: 'Three places code lives',
      pairs: [
        { icon: 'users', analogy: 'Your own machine', reality: 'development' },
        { icon: 'server', analogy: 'A dry run on real hardware', reality: 'staging' },
        { icon: 'globe', analogy: 'Real users, real money', reality: 'production' },
        { icon: 'eye', analogy: 'Watching what happens', reality: 'monitoring and logs' },
      ],
    },
    scenario: {
      title: 'The day you first deploy for real',
      steps: [
        { icon: 'lock', label: 'Real secrets are configured' },
        { icon: 'database', label: 'The real database is connected' },
        { icon: 'globe', label: 'Users start arriving' },
        { icon: 'chart', label: 'Dashboards become your morning reading' },
      ],
      note: 'Production is the only environment where users notice mistakes.',
    },
  },

  'development-environment': {
    mapping: {
      title: 'Make the setup one command',
      pairs: [
        { icon: 'terminal', analogy: 'One command to start', reality: 'a documented setup script' },
        { icon: 'box', analogy: 'The same versions as production', reality: 'containers or version files' },
        { icon: 'cog', analogy: 'Sample data to work with', reality: 'a seed script' },
        { icon: 'checkCircle', analogy: 'A new joiner is productive on day one', reality: 'the real goal' },
      ],
    },
    scenario: {
      title: 'A new developer joins',
      steps: [
        { icon: 'download', label: 'They clone the repository' },
        { icon: 'terminal', label: 'They run one setup command' },
        { icon: 'zap', label: 'Everything starts in five minutes' },
        { icon: 'check', label: 'They fix a small bug that afternoon' },
      ],
      note: 'Every hour spent on setup documentation is repaid on the next hire.',
    },
  },

  'environment-variables': {
    code: {
      title: 'Settings, not code',
      panels: [
        { label: '.env (never committed)', lines: ['DATABASE_URL=postgres://localhost/app', 'STRIPE_KEY=sk_test_...'] },
        { label: 'read in code', lines: ['const url = process.env.DATABASE_URL'] },
      ],
      notes: [
        { code: '.env', text: 'one file per machine, ignored by git' },
        { code: 'process.env', text: 'how the program reads it' },
        { code: 'twelve-factor', text: 'config belongs in the environment, not the repo' },
      ],
    },
    scenario: {
      title: 'The same code in two places',
      steps: [
        { icon: 'terminal', label: 'Locally it points at a test database' },
        { icon: 'server', label: 'In production at the real one', note: 'same image, different settings' },
        { icon: 'lock', label: 'Secrets are injected at start-up' },
        { icon: 'checkCircle', label: 'Nothing secret is in the repository' },
      ],
      note: 'If a secret ever lands in git, treat it as leaked and rotate it.',
    },
  },

  monitoring: {
    mapping: {
      title: 'Three questions, three tools',
      pairs: [
        { icon: 'chart', analogy: 'Is it healthy right now?', reality: 'metrics and dashboards' },
        { icon: 'bug', analogy: 'What exactly broke?', reality: 'logs and traces' },
        { icon: 'alert', analogy: 'Wake somebody up', reality: 'alerting rules' },
        { icon: 'eye', analogy: 'Are users happy?', reality: 'the only metric that matters' },
      ],
    },
    scenario: {
      title: 'A slow checkout at peak time',
      steps: [
        { icon: 'chart', label: 'A dashboard shows latency climbing' },
        { icon: 'alert', label: 'An alert fires before users complain' },
        { icon: 'search', label: 'A trace points at one slow query' },
        { icon: 'checkCircle', label: 'The fix is deployed and verified' },
      ],
      note: 'Alert on symptoms users feel, not on every number that moves.',
    },
  },

  logging: {
    code: {
      title: 'Useful lines, not noise',
      panels: [
        { label: 'unhelpful', lines: ['error occurred'] },
        { label: 'helpful', lines: ['orderId=42 userId=7 step=payment code=card_declined in 312ms'] },
      ],
      notes: [
        { code: 'structured', text: 'fields you can filter and group' },
        { code: 'request id', text: 'one value tying every line of a request together' },
        { code: 'levels', text: 'debug, info, warn, error — used honestly' },
      ],
    },
    scenario: {
      title: 'A user reports a failed payment',
      steps: [
        { icon: 'search', label: 'You search by their user id' },
        { icon: 'layers', label: 'Five log lines appear', note: 'all sharing one request id' },
        { icon: 'eye', label: 'The exact step is visible' },
        { icon: 'check', label: 'Fixed in an hour instead of a day' },
      ],
      note: 'Good logs are written for the person debugging at 2am, not for the machine.',
    },
  },

  'infrastructure-as-code': {
    beforeAfter: {
      before: {
        label: 'Clicking in a console',
        steps: [
          { icon: 'target', label: 'Someone creates servers by hand' },
          { icon: 'alert', label: 'Nobody remembers the settings' },
          { icon: 'clock', label: 'Rebuilding takes days' },
        ],
      },
      after: {
        label: 'Described in files',
        steps: [
          { icon: 'fileCode', label: 'The infrastructure is written down' },
          { icon: 'gitBranch', label: 'Changes go through review' },
          { icon: 'refresh', label: 'Rebuilding is one command', note: 'and the result is identical' },
        ],
      },
      note: 'It turns infrastructure into something you can test, review and version.',
    },
    scenario: {
      title: 'A second environment, exactly like the first',
      steps: [
        { icon: 'fileCode', label: 'The same files are applied' },
        { icon: 'cog', label: 'A staging environment is created' },
        { icon: 'checkCircle', label: 'It matches production closely' },
        { icon: 'refresh', label: 'And it can be destroyed just as fast' },
      ],
      note: 'Nobody has to remember what was configured by hand two years ago.',
    },
  },

  terraform: {
    code: {
      title: 'Desired state, then apply',
      panels: [
        {
          label: 'main.tf',
          lines: ['resource "aws_instance" "web" {', '  instance_type = "t3.micro"', '  count = 2', '}'],
        },
        { label: 'terminal', lines: ['terraform plan    # what will change', 'terraform apply   # make it so'] },
      ],
      notes: [
        { code: 'resource', text: 'one thing you want to exist' },
        { code: 'plan', text: 'shows the difference before anything changes' },
        { code: 'state', text: 'Terraform remembers what it created' },
      ],
    },
    scenario: {
      title: 'Changing a server size safely',
      steps: [
        { icon: 'fileCode', label: 'One line is edited' },
        { icon: 'eye', label: 'Plan shows it will be replaced', note: 'a surprise caught in review' },
        { icon: 'checkCircle', label: 'The plan is corrected to resize' },
        { icon: 'terminal', label: 'Apply makes the change' },
      ],
      note: 'The plan output is the most valuable part — read it as carefully as code.',
    },
  },

  helm: {
    mapping: {
      title: 'Templates for Kubernetes',
      pairs: [
        { icon: 'book', analogy: 'A chart', reality: 'a bundle of Kubernetes files' },
        { icon: 'scale', analogy: 'Fill in the blanks', reality: 'values for each environment' },
        { icon: 'refresh', analogy: 'Upgrade or roll back', reality: 'versioned releases' },
        { icon: 'box', analogy: 'Reusable across services', reality: 'the same chart, different values' },
      ],
    },
    scenario: {
      title: 'The same app in three environments',
      steps: [
        { icon: 'book', label: 'One chart describes the app' },
        { icon: 'scale', label: 'Values set replicas and sizes', note: 'one file per environment' },
        { icon: 'rocket', label: 'It is installed to each cluster' },
        { icon: 'refresh', label: 'Rolling back is one command' },
      ],
      note: 'The templating language is a cost — small teams often get further with plain manifests.',
    },
  },

  observability: {
    beforeAfter: {
      before: {
        label: 'Monitoring',
        steps: [
          { icon: 'chart', label: 'Known questions on dashboards' },
          { icon: 'alert', label: 'An alert says “something is wrong”' },
          { icon: 'search', label: 'And you guess where to look' },
        ],
      },
      after: {
        label: 'Observability',
        steps: [
          { icon: 'layers', label: 'Metrics, logs and traces share one request id' },
          { icon: 'target', label: 'You can ask new questions without new code' },
          { icon: 'zap', label: 'The failing step is obvious' },
        ],
      },
      note: 'The test is simple: can you explain a problem nobody anticipated?',
    },
    scenario: {
      title: 'One request, three views',
      steps: [
        { icon: 'send', label: 'A request enters the system' },
        { icon: 'layers', label: 'It is traced across five services' },
        { icon: 'chart', label: 'The slowest hop is obvious' },
        { icon: 'check', label: 'You know exactly where to fix' },
      ],
      note: 'One shared request id across services is the trick that makes this work.',
    },
  },

  'feature-flags': {
    code: {
      title: 'Ship dark, switch on later',
      panels: [
        {
          label: 'flags.js',
          lines: ['if (flags.newCheckout(user)) {', '  return <NewCheckout />', '}', 'return <Checkout />'],
        },
      ],
      notes: [
        { code: 'newCheckout(user)', text: 'on for 5% of users, or one team' },
        { code: 'off', text: 'instant rollback with no deploy' },
        { code: 'cleanup', text: 'delete the flag once the decision is permanent' },
      ],
    },
    scenario: {
      title: 'Testing a redesign on real users',
      steps: [
        { icon: 'rocket', label: 'The new design is deployed', note: 'off for everyone' },
        { icon: 'target', label: 'It is switched on for 5%' },
        { icon: 'chart', label: 'Conversion is compared' },
        { icon: 'checkCircle', label: 'It is rolled out fully — or switched off' },
      ],
      note: 'Old flags left in the code become confusing branches, so remove them after the decision.',
    },
  },

  'staging-environment': {
    mapping: {
      title: 'The dress rehearsal',
      pairs: [
        { icon: 'server', analogy: 'The same hardware as the show', reality: 'production-like infrastructure' },
        { icon: 'users', analogy: 'Realistic sample data', reality: 'anonymised or synthetic' },
        { icon: 'checkCircle', analogy: 'Full run-through', reality: 'the whole pipeline runs' },
        { icon: 'alert', analogy: 'A stage is still a stage', reality: 'it can never be identical' },
      ],
    },
    scenario: {
      title: 'A database migration is rehearsed',
      steps: [
        { icon: 'fileCode', label: 'The migration is written' },
        { icon: 'download', label: 'A copy of production data is restored', note: 'anonymised' },
        { icon: 'cog', label: 'It runs there first' },
        { icon: 'checkCircle', label: 'Only then in production' },
      ],
      note: 'Staging catches the surprises you can predict; production still finds the rest.',
    },
  },
}
