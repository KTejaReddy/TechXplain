/**
 * Visual lesson content for the cloud concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const cloudLessons = {
  'cloud-computing': {
    hero: { links: ['travels over the network', 'runs on rented machines', 'billed by the second'] },
    mapping: {
      title: 'Renting instead of building',
      pairs: [
        { icon: 'building', analogy: 'Owning a building', reality: 'buying servers and a room' },
        { icon: 'coin', analogy: 'Renting office space', reality: 'paying for what you use' },
        { icon: 'zap', analogy: 'More desks tomorrow', reality: 'scaling up in minutes' },
        { icon: 'users', analogy: 'A landlord fixing the roof', reality: 'a provider handling hardware' },
      ],
    },
    scenario: {
      title: 'A product launch on a Tuesday',
      steps: [
        { icon: 'terminal', label: 'You create an account' },
        { icon: 'target', label: 'You pick a database and a server', note: 'a few clicks' },
        { icon: 'rocket', label: 'The app is online in an hour' },
        { icon: 'chart', label: 'Traffic spikes after the launch' },
        { icon: 'zap', label: 'Capacity is added automatically' },
      ],
      note: 'No hardware, no waiting for a delivery, and the bill follows what you actually used.',
    },
  },

  aws: {
    mapping: {
      title: 'A very large toolbox',
      pairs: [
        { icon: 'server', analogy: 'Raw computers', reality: 'EC2, or containers' },
        { icon: 'database', analogy: 'Managed databases', reality: 'RDS, DynamoDB' },
        { icon: 'cloud', analogy: 'Storage and delivery', reality: 'S3, CloudFront' },
        { icon: 'brain', analogy: 'Machine learning services', reality: 'SageMaker and friends' },
      ],
    },
    scenario: {
      title: 'Building on AWS without a server',
      steps: [
        { icon: 'folder', label: 'Files go to S3' },
        { icon: 'zap', label: 'A function runs on request' },
        { icon: 'database', label: 'Data sits in a managed table' },
        { icon: 'coin', label: 'You pay per request', note: 'not for idle servers' },
      ],
      note: 'The breadth is the advantage and the difficulty — there is usually more than one way to do anything.',
    },
  },

  azure: {
    mapping: {
      title: 'Cloud with an enterprise accent',
      pairs: [
        { icon: 'lock', analogy: 'Existing company logins', reality: 'integration with Active Directory' },
        { icon: 'fileCode', analogy: 'Your Windows and .NET estate', reality: 'first-class support' },
        { icon: 'scale', analogy: 'Compliance paperwork', reality: 'strong in regulated industries' },
        { icon: 'cloud', analogy: 'The same core services', reality: 'compute, storage, databases' },
      ],
    },
    scenario: {
      title: 'A company already standardised on Microsoft',
      steps: [
        { icon: 'users', label: 'Staff already have accounts' },
        { icon: 'lock', label: 'Permissions reuse the same directory' },
        { icon: 'server', label: 'Apps run on managed hosting' },
        { icon: 'check', label: 'One vendor for support and billing' },
      ],
      note: 'For existing Microsoft shops, staying inside one ecosystem usually beats picking the best tool twice.',
    },
  },

  'google-cloud': {
    mapping: {
      title: 'Known for data and containers',
      pairs: [
        { icon: 'cog', analogy: 'Kubernetes', reality: 'invented here, runs it well' },
        { icon: 'table', analogy: 'Big data tools', reality: 'BigQuery and friends' },
        { icon: 'brain', analogy: 'Machine learning infrastructure', reality: 'TPUs and Vertex AI' },
        { icon: 'scale', analogy: 'Fast networks', reality: 'a strong global backbone' },
      ],
    },
    scenario: {
      title: 'Analysing terabytes of logs',
      steps: [
        { icon: 'cloud', label: 'Logs are collected centrally' },
        { icon: 'table', label: 'They are queried with SQL' },
        { icon: 'chart', label: 'A dashboard appears in seconds' },
        { icon: 'coin', label: 'You pay for the query, not for the cluster' },
      ],
      note: 'Serverless analytics is where this cloud feels furthest ahead.',
    },
  },

  'virtual-machine': {
    beforeAfter: {
      before: {
        label: 'One physical server',
        steps: [
          { icon: 'server', label: 'One operating system' },
          { icon: 'alert', label: 'Idle most of the time' },
          { icon: 'clock', label: 'Installing a new one takes days' },
        ],
      },
      after: {
        label: 'Virtual machines',
        steps: [
          { icon: 'layers', label: 'One host runs many VMs' },
          { icon: 'box', label: 'Each has its own OS and limits' },
          { icon: 'zap', label: 'A new one boots in minutes' },
        ],
      },
      note: 'Strong isolation and a familiar machine — at the cost of running a whole operating system per app.',
    },
    scenario: {
      title: 'Splitting one server into five',
      steps: [
        { icon: 'server', label: 'A big machine runs a hypervisor' },
        { icon: 'layers', label: 'Five VMs are created' },
        { icon: 'cog', label: 'Each runs a different service' },
        { icon: 'checkCircle', label: 'One crashing does not affect the others' },
      ],
      note: 'Before containers, this was how isolation was done — and it still is when stronger walls are needed.',
    },
  },

  serverless: {
    beforeAfter: {
      before: {
        label: 'A server that waits',
        steps: [
          { icon: 'server', label: 'Running all night' },
          { icon: 'coin', label: 'Billed even when idle' },
          { icon: 'clock', label: 'You patch it yourself' },
        ],
      },
      after: {
        label: 'Serverless',
        steps: [
          { icon: 'zap', label: 'Code runs only on a request' },
          { icon: 'coin', label: 'Billed per invocation', note: 'and per millisecond' },
          { icon: 'chart', label: 'Scales to thousands of copies', note: 'automatically' },
        ],
      },
      note: 'The trade is cold starts and less control over what the machine looks like.',
    },
    scenario: {
      title: 'Resizing uploaded images',
      steps: [
        { icon: 'folder', label: 'A file lands in storage' },
        { icon: 'zap', label: 'That event runs a function' },
        { icon: 'cog', label: 'It resizes and saves the result' },
        { icon: 'coin', label: 'You pay for two seconds of compute' },
      ],
      note: 'For spiky, occasional work, paying per use beats renting a server around the clock.',
    },
  },

  iaas: {
    mapping: {
      title: 'How much you manage',
      pairs: [
        { icon: 'server', analogy: 'You get the raw machine', reality: 'infrastructure as a service' },
        { icon: 'cog', analogy: 'You install and patch the OS', reality: 'your responsibility' },
        { icon: 'box', analogy: 'Someone else has the building', reality: 'the provider handles hardware' },
        { icon: 'chart', analogy: 'Most control, most work', reality: 'the trade-off' },
      ],
    },
    scenario: {
      title: 'Lifting an old application',
      steps: [
        { icon: 'server', label: 'You rent a machine' },
        { icon: 'terminal', label: 'You install the same software', note: 'exactly as before' },
        { icon: 'lock', label: 'You manage patching and backups' },
        { icon: 'check', label: 'It works — no rewrite needed' },
      ],
      note: 'The fastest way off an old data centre, and rarely the cheapest in the long run.',
    },
  },

  paas: {
    mapping: {
      title: 'Bring code, not plumbing',
      pairs: [
        { icon: 'fileCode', analogy: 'You push your code', reality: 'a git push or a zip' },
        { icon: 'cog', analogy: 'It builds and runs it', reality: 'no server to configure' },
        { icon: 'scale', analogy: 'It scales with traffic', reality: 'a slider or a rule' },
        { icon: 'alert', analogy: 'Less control over the machine', reality: 'the trade you accept' },
      ],
    },
    scenario: {
      title: 'Deploying without touching a server',
      steps: [
        { icon: 'gitBranch', label: 'You push to a branch' },
        { icon: 'cog', label: 'The platform builds it' },
        { icon: 'rocket', label: 'A URL starts serving it' },
        { icon: 'refresh', label: 'Rollbacks are one click' },
      ],
      note: 'Excellent for small teams and standard apps; awkward when you need unusual system software.',
    },
  },

  saas: {
    mapping: {
      title: 'Software you log into',
      pairs: [
        { icon: 'globe', analogy: 'Nothing to install', reality: 'a browser tab' },
        { icon: 'coin', analogy: 'A subscription', reality: 'monthly per seat' },
        { icon: 'refresh', analogy: 'Updates happen for you', reality: 'no upgrade projects' },
        { icon: 'alert', analogy: 'Your data lives in their system', reality: 'export and exit matter' },
      ],
    },
    scenario: {
      title: 'Your team starts using a tool',
      steps: [
        { icon: 'search', label: 'Someone finds the product' },
        { icon: 'userCheck', label: 'Accounts are created in minutes' },
        { icon: 'users', label: 'The team is invited' },
        { icon: 'coin', label: 'The card is billed monthly' },
      ],
      note: 'You rent the outcome instead of owning the software.',
    },
  },

  'cloud-storage': {
    mapping: {
      title: 'Three kinds of storage',
      pairs: [
        { icon: 'folder', analogy: 'Files on a disk', reality: 'block storage for a server' },
        { icon: 'layers', analogy: 'Shared network folders', reality: 'file storage for many servers' },
        { icon: 'cloud', analogy: 'An infinite bucket', reality: 'object storage over HTTP' },
        { icon: 'scale', analogy: 'Picking by how it is used', reality: 'not by how it sounds' },
      ],
    },
    scenario: {
      title: 'Backing up a database',
      steps: [
        { icon: 'database', label: 'A nightly dump is produced' },
        { icon: 'cloud', label: 'It is uploaded to object storage' },
        { icon: 'clock', label: 'An old-lifecycle rule archives it', note: 'cheaper after 30 days' },
        { icon: 'shieldCheck', label: 'A restore is tested', note: 'a backup you never restored is a guess' },
      ],
      note: 'Storage is cheap; restoring under pressure depends on having practised it.',
    },
  },

  'object-storage': {
    code: {
      title: 'A file is a URL',
      panels: [
        { label: 'PUT', lines: ['PUT /photos/2026/cat.jpg', 'Content-Type: image/jpeg'] },
        { label: 'GET', lines: ['GET /photos/2026/cat.jpg', '→ the image bytes'] },
      ],
      notes: [
        { code: 'key', text: 'the path that names the object' },
        { code: 'bucket', text: 'the container all keys live in' },
        { code: 'metadata', text: 'small facts stored alongside it' },
      ],
    },
    scenario: {
      title: 'A profile picture',
      steps: [
        { icon: 'smartphone', label: 'You choose a photo' },
        { icon: 'lock', label: 'The app gets a signed upload URL' },
        { icon: 'cloud', label: 'The file goes straight to storage' },
        { icon: 'link', label: 'Its public URL is saved with your profile' },
      ],
      note: 'Uploading directly to storage keeps big files out of your application servers.',
    },
  },

  'cloud-database': {
    beforeAfter: {
      before: {
        label: 'You run the database',
        steps: [
          { icon: 'server', label: 'Install and configure it' },
          { icon: 'clock', label: 'Patch it on a Sunday' },
          { icon: 'alert', label: 'You are on call when it fails' },
        ],
      },
      after: {
        label: 'Managed database',
        steps: [
          { icon: 'cloud', label: 'A connection string is all you need' },
          { icon: 'shieldCheck', label: 'Backups and failover are handled' },
          { icon: 'chart', label: 'You can resize it in minutes' },
        ],
      },
      note: 'You pay more per hour and much less in engineering time.',
    },
    scenario: {
      title: 'Choosing a database for a new app',
      steps: [
        { icon: 'target', label: 'Relational data and rules?', note: 'managed Postgres or MySQL' },
        { icon: 'fileCode', label: 'Documents and huge scale?', note: 'a managed document store' },
        { icon: 'plug', label: 'You get a connection string' },
        { icon: 'rocket', label: 'You never install a database' },
      ],
      note: 'Managed does not mean magic — queries still need indexes and sensible access patterns.',
    },
  },

  region: {
    mapping: {
      title: 'Where your computers actually are',
      pairs: [
        { icon: 'globe', analogy: 'London, Frankfurt, Tokyo', reality: 'regions' },
        { icon: 'clock', analogy: 'Distance is latency', reality: 'closer is faster' },
        { icon: 'scale', analogy: 'Local rules apply', reality: 'data residency laws' },
        { icon: 'coin', analogy: 'Different prices', reality: 'some regions cost more' },
      ],
    },
    scenario: {
      title: 'Choosing where to run',
      steps: [
        { icon: 'users', label: 'Most users are in Europe' },
        { icon: 'target', label: 'You pick an EU region' },
        { icon: 'zap', label: 'Round trips drop to a few milliseconds' },
        { icon: 'shieldCheck', label: 'And the data stays inside the EU' },
      ],
      note: 'Multi-region improves resilience and latency, and multiplies both cost and complexity.',
    },
  },

  'availability-zone': {
    mapping: {
      title: 'Separate buildings, same city',
      pairs: [
        { icon: 'building', analogy: 'Independent power and cooling', reality: 'one zone' },
        { icon: 'zap', analogy: 'Fast private links', reality: 'they talk in under a millisecond' },
        { icon: 'shieldCheck', analogy: 'One floods, the other serves', reality: 'that is the point' },
        { icon: 'coin', analogy: 'Copying between them', reality: 'extra cost and extra safety' },
      ],
    },
    scenario: {
      title: 'A power cut in one building',
      steps: [
        { icon: 'server', label: 'App servers run in two zones' },
        { icon: 'alert', label: 'One zone loses power' },
        { icon: 'route', label: 'The load balancer sends traffic to the other' },
        { icon: 'checkCircle', label: 'Most users notice nothing' },
      ],
      note: 'Spreading across zones is usually the cheapest resilience you can buy.',
    },
  },

  autoscaling: {
    beforeAfter: {
      before: {
        label: 'Fixed capacity',
        steps: [
          { icon: 'server', label: 'Ten servers, always on' },
          { icon: 'alert', label: 'A sale doubles the load' },
          { icon: 'x', label: 'Requests time out', note: 'customers leave' },
        ],
      },
      after: {
        label: 'Autoscaling',
        steps: [
          { icon: 'chart', label: 'CPU and queue depth are watched' },
          { icon: 'zap', label: 'More servers start in a minute' },
          { icon: 'download', label: 'They are removed when traffic drops', note: 'and billing follows' },
        ],
      },
      note: 'You need quick startup and stateless servers for it to actually help.',
    },
    scenario: {
      title: 'Traffic doubles on a Monday morning',
      steps: [
        { icon: 'chart', label: 'CPU passes 70%' },
        { icon: 'zap', label: 'Three more servers start' },
        { icon: 'route', label: 'Traffic spreads across them' },
        { icon: 'refresh', label: 'At midnight they scale back down' },
      ],
      note: 'Scale on a signal that reflects real load, not just CPU — queues and latency often work better.',
    },
  },

  vpc: {
    mapping: {
      title: 'Your own private network',
      pairs: [
        { icon: 'building', analogy: 'A private office floor', reality: 'the VPC' },
        { icon: 'folder', analogy: 'Rooms with different access', reality: 'subnets' },
        { icon: 'lock', analogy: 'Which doors are open', reality: 'security groups and rules' },
        { icon: 'route', analogy: 'The one way out', reality: 'a gateway to the internet' },
      ],
    },
    scenario: {
      title: 'Keeping the database private',
      steps: [
        { icon: 'layers', label: 'Two subnets are created', note: 'public and private' },
        { icon: 'server', label: 'Web servers sit in the public one' },
        { icon: 'database', label: 'The database sits in the private one' },
        { icon: 'lock', label: 'Only the app servers may reach it' },
      ],
      note: 'The internet can reach your front door and nothing else — that is the design goal.',
    },
  },

  iam: {
    mapping: {
      title: 'Who may do what, where',
      pairs: [
        { icon: 'users', analogy: 'A person or a service', reality: 'an identity' },
        { icon: 'key', analogy: 'Their permissions', reality: 'a policy attached to them' },
        { icon: 'scale', analogy: 'The rule that allows something', reality: 'allow or deny statements' },
        { icon: 'alert', analogy: 'One shared master key', reality: 'exactly what to avoid' },
      ],
    },
    scenario: {
      title: 'A nightly backup job',
      steps: [
        { icon: 'cog', label: 'A dedicated identity is created' },
        { icon: 'scale', label: 'It may read one database and write one bucket' },
        { icon: 'checkCircle', label: 'Nothing else is allowed' },
        { icon: 'shieldCheck', label: 'A leak of that key is survivable' },
      ],
      note: 'Least privilege is the habit that limits how bad any single mistake can get.',
    },
  },

  'edge-computing': {
    beforeAfter: {
      before: {
        label: 'One central server',
        steps: [
          { icon: 'globe', label: 'Users all over the world' },
          { icon: 'network', label: 'Requests travel far' },
          { icon: 'clock', label: 'Every extra hop is felt' },
        ],
      },
      after: {
        label: 'Running at the edge',
        steps: [
          { icon: 'cloud', label: 'Code runs in hundreds of locations' },
          { icon: 'zap', label: 'The nearest one answers', note: 'a few milliseconds away' },
          { icon: 'check', label: 'Personalisation without a round trip' },
        ],
      },
      note: 'Perfect for caching, redirects and light personalisation; not for heavy queries.',
    },
    scenario: {
      title: 'Redirecting a visitor to their language',
      steps: [
        { icon: 'globe', label: 'Someone opens the site from Japan' },
        { icon: 'eye', label: 'Their region is detected at the edge' },
        { icon: 'route', label: 'They are sent to /ja' },
        { icon: 'zap', label: 'The decision took one millisecond' },
      ],
      note: 'Anything that only needs the request itself can happen closer to the person making it.',
    },
  },

  'cost-management': {
    beforeAfter: {
      before: {
        label: 'Unwatched',
        steps: [
          { icon: 'coin', label: 'A forgotten cluster keeps running' },
          { icon: 'hardDrive', label: 'Snapshots pile up for years' },
          { icon: 'alert', label: 'The bill surprises everybody' },
        ],
      },
      after: {
        label: 'Watched',
        steps: [
          { icon: 'chart', label: 'Spend is tagged per team' },
          { icon: 'clock', label: 'Idle resources are switched off' },
          { icon: 'scale', label: 'Budgets alert before the bill does' },
        ],
      },
      note: 'Tagging is the unglamorous step that makes every other saving possible.',
    },
    scenario: {
      title: 'A bill three times too big',
      steps: [
        { icon: 'chart', label: 'Costs are grouped by service' },
        { icon: 'search', label: 'One staging cluster stands out' },
        { icon: 'terminal', label: 'It is scheduled off at night' },
        { icon: 'coin', label: 'Spend drops by a fifth' },
      ],
      note: 'Cloud cost is an engineering metric as much as a finance one.',
    },
  },

  'disaster-recovery': {
    mapping: {
      title: 'How much can you lose?',
      pairs: [
        { icon: 'clock', analogy: 'How much data may vanish', reality: 'the recovery point objective' },
        { icon: 'refresh', analogy: 'How long to be back', reality: 'the recovery time objective' },
        { icon: 'shieldCheck', analogy: 'Copies in another region', reality: 'the safety net' },
        { icon: 'bug', analogy: 'Drill it or lose it', reality: 'a rehearsal, not a document' },
      ],
    },
    scenario: {
      title: 'A region goes down',
      steps: [
        { icon: 'alert', label: 'An outage takes out one region' },
        { icon: 'cloud', label: 'Backups are already in another' },
        { icon: 'cog', label: 'Services are rebuilt there', note: 'from tested scripts' },
        { icon: 'checkCircle', label: 'They are back inside the agreed window' },
      ],
      note: 'The plan is only real if it has been run end to end at least once.',
    },
  },
}
