/**
 * Visual lesson content for the database concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const databaseLessons = {
  database: {
    data: {
      title: 'One database, three tables',
      columns: ['table', 'what it holds', 'key'],
      keyColumn: 'key',
      rows: [
        ['users', 'one row per person', 'id'],
        ['products', 'one row per thing you sell', 'sku'],
        ['orders', 'one row per purchase', 'order_id'],
      ],
      note: 'Tables keep the facts separate so a change in one place does not have to be repeated everywhere.',
      caption: 'A database is a set of tables, each with its own columns and a key to find rows by.',
    },
    mapping: {
      title: 'A filing room with rules',
      pairs: [
        { icon: 'folder', analogy: 'Drawers and folders', reality: 'tables' },
        { icon: 'chat', analogy: 'Asking the clerk', reality: 'a query' },
        { icon: 'checkCircle', analogy: 'The clerk knows every rule', reality: 'constraints and types' },
        { icon: 'shieldCheck', analogy: 'Two clerks never disagree', reality: 'transactions' },
      ],
    },
    scenario: {
      title: 'Finding your last order',
      steps: [
        { icon: 'target', label: 'You open “My orders”' },
        { icon: 'send', label: 'A query is sent', note: '“orders for user 42”' },
        { icon: 'search', label: 'The database searches its index' },
        { icon: 'download', label: 'Rows come back in milliseconds' },
        { icon: 'monitor', label: 'The list appears' },
      ],
      note: 'Even with millions of rows, an indexed lookup is usually faster than the page can render.',
    },
  },

  sql: {
    code: {
      title: 'Four lines, one question',
      panels: [
        {
          label: 'query.sql',
          lines: ['SELECT name, total', 'FROM   orders', 'WHERE  total > 100', 'ORDER BY total DESC'],
        },
      ],
      notes: [
        { code: 'SELECT', text: 'which columns you want back' },
        { code: 'WHERE', text: 'which rows qualify' },
        { code: 'ORDER BY', text: 'how the results should be sorted' },
      ],
    },
    scenario: {
      title: 'A finance report',
      steps: [
        { icon: 'chat', label: 'You describe what you want', note: 'not how to find it' },
        { icon: 'cog', label: 'The engine plans the search' },
        { icon: 'search', label: 'It picks an index and reads' },
        { icon: 'download', label: 'Sorted rows come back' },
      ],
      note: 'The same query works whether the table holds a hundred rows or a hundred million.',
    },
  },

  nosql: {
    mapping: {
      title: 'Not one thing — a family',
      pairs: [
        { icon: 'hash', analogy: 'Key and value', reality: 'a cache or session store' },
        { icon: 'fileCode', analogy: 'Whole documents', reality: 'JSON-shaped records' },
        { icon: 'table', analogy: 'Huge wide tables', reality: 'column families, at scale' },
        { icon: 'network', analogy: 'Things connected', reality: 'graph databases' },
      ],
    },
    scenario: {
      title: 'Storing a product catalogue',
      steps: [
        { icon: 'package', label: 'Each product is one document', note: 'sizes, colours, reviews together' },
        { icon: 'send', label: 'The app saves it as-is', note: 'no schema migration' },
        { icon: 'search', label: 'It is read back in one request' },
        { icon: 'alert', label: 'Duplicated data must be kept in sync', note: 'the trade-off' },
      ],
      note: 'NoSQL wins when the shape of the data varies; SQL wins when relationships and rules matter.',
    },
  },

  mysql: {
    scenario: {
      title: 'The database behind a classic web app',
      steps: [
        { icon: 'layers', label: 'Tables for users and orders' },
        { icon: 'hash', label: 'Indexes on the columns you filter' },
        { icon: 'send', label: 'The app queries them' },
        { icon: 'shieldCheck', label: 'Transactions keep money straight' },
      ],
      note: 'Its defaults are conservative, which is exactly why it has been trusted for so long.',
    },
  },

  postgresql: {
    code: {
      title: 'More than tables',
      panels: [
        {
          label: 'psql',
          lines: ['SELECT * FROM orders', "WHERE items @> '[{\"sku\":\"A1\"}]'", 'ORDER BY created_at DESC LIMIT 10;'],
        },
      ],
      notes: [
        { code: '@>', text: '“contains this JSON” — querying inside a document' },
        { code: 'LIMIT', text: 'only the rows you need' },
        { code: 'jsonb', text: 'flexible fields and strict tables in one place' },
      ],
    },
    scenario: {
      title: 'One database for many needs',
      steps: [
        { icon: 'table', label: 'Relational tables for orders' },
        { icon: 'fileCode', label: 'JSON columns for odd fields' },
        { icon: 'search', label: 'Full-text search inside the same database' },
        { icon: 'brain', label: 'Vector search for recommendations' },
      ],
      note: 'Not needing a second system for every new need is a real operational advantage.',
    },
  },

  mongodb: {
    code: {
      title: 'Documents you can read',
      panels: [
        {
          label: 'users collection',
          lines: ['{ "_id": 42, "name": "Ada",', '  "tags": ["beta", "pro"],', '  "address": { "city": "London" } }'],
        },
      ],
      notes: [
        { code: '_id', text: 'the unique key every document has' },
        { code: 'tags', text: 'an array, right inside the record' },
        { code: 'address', text: 'a nested object, no join needed' },
      ],
    },
    scenario: {
      title: 'A profile with an evolving shape',
      steps: [
        { icon: 'cog', label: 'You add a new optional field' },
        { icon: 'check', label: 'No migration required' },
        { icon: 'package', label: 'Old documents simply lack it' },
        { icon: 'alert', label: 'The code must handle both shapes' },
      ],
      note: 'Flexibility moves work from the database into your application code.',
    },
  },

  sqlite: {
    scenario: {
      title: 'An app on your laptop',
      steps: [
        { icon: 'folder', label: 'One file on disk', note: 'app.db' },
        { icon: 'plug', label: 'The program opens it directly' },
        { icon: 'zap', label: 'Reads are instant', note: 'no server, no network' },
        { icon: 'download', label: 'You copy it to back it up' },
      ],
      note: 'No server to install makes it ideal for desktop apps, tests and small sites.',
    },
  },

  table: {
    mapping: {
      title: 'A sheet of rows and columns',
      pairs: [
        { icon: 'scale', analogy: 'The column headers', reality: 'what each fact is' },
        { icon: 'hash', analogy: 'The row numbers', reality: 'the primary key' },
        { icon: 'checkCircle', analogy: 'One cell, one fact', reality: 'a value with a type' },
        { icon: 'folder', analogy: 'A related sheet', reality: 'another table you can join' },
      ],
    },
    scenario: {
      title: 'Adding a customer',
      steps: [
        { icon: 'cog', label: 'A row is inserted' },
        { icon: 'checkCircle', label: 'Every column is checked', note: 'types and required fields' },
        { icon: 'hash', label: 'An id is assigned' },
        { icon: 'search', label: 'That id is used everywhere else' },
      ],
      note: 'Keeping one fact in one place is what makes a relational database trustworthy.',
    },
  },

  row: {
    scenario: {
      title: 'One customer, one row',
      steps: [
        { icon: 'target', label: 'You open your profile' },
        { icon: 'search', label: 'The app looks up your row', note: 'by primary key' },
        { icon: 'table', label: 'It reads the columns it needs' },
        { icon: 'monitor', label: 'The form fills in' },
      ],
      note: 'A row is a single thing; the columns are the facts you know about it.',
    },
  },

  column: {
    code: {
      title: 'Types keep you honest',
      panels: [
        {
          label: 'orders table',
          lines: ['id       serial primary key', 'total    numeric(10,2) not null', 'placed_at timestamptz default now()'],
        },
      ],
      notes: [
        { code: 'numeric(10,2)', text: 'money, with two decimal places' },
        { code: 'not null', text: 'this column can never be empty' },
        { code: 'timestamptz', text: 'a moment in time, with timezone' },
      ],
    },
    scenario: {
      title: 'A typo that never reaches the database',
      steps: [
        { icon: 'target', label: 'A form sends a price as text' },
        { icon: 'alert', label: 'The type refuses it', note: 'before it is stored' },
        { icon: 'cog', label: 'The app is fixed' },
        { icon: 'checkCircle', label: 'Bad data never lands' },
      ],
      note: 'Constraints in the database protect you from more than your own bugs.',
    },
  },

  'primary-key': {
    data: {
      title: 'USERS — id is the primary key',
      columns: ['id', 'name', 'email'],
      keyColumn: 'id',
      rows: [
        ['1', 'Alex', 'alex@example.com'],
        ['2', 'Sam', 'sam@example.com'],
        ['3', 'Maya', 'maya@example.com'],
      ],
      note: 'The database refuses a fourth row with id 2, and it never hands out an id that has already been used.',
      caption: 'One column is guaranteed unique, which is what makes “find row 2” instant.',
    },
    mapping: {
      title: 'A passport number',
      pairs: [
        { icon: 'hash', analogy: 'Unique forever', reality: 'no two rows share it' },
        { icon: 'checkCircle', analogy: 'Never blank', reality: 'not null, enforced' },
        { icon: 'target', analogy: 'Points to one person', reality: 'finds one row instantly' },
        { icon: 'hash', analogy: 'Never reused', reality: 'a deleted id is never issued again' },
      ],
    },
    scenario: {
      title: 'Every order has one',
      steps: [
        { icon: 'hash', label: 'Order 42 is created' },
        { icon: 'send', label: 'The id travels in the URL', note: '/orders/42' },
        { icon: 'search', label: 'Any service finds it by id' },
        { icon: 'shieldCheck', label: 'No chance of picking the wrong one' },
      ],
      note: 'Never use something that can change — like an email address — as a primary key.',
    },
  },

  'foreign-key': {
    data: {
      title: 'ORDERS — user_id points back at USERS.id',
      columns: ['order_id', 'user_id', 'total'],
      keyColumn: 'user_id',
      rows: [
        ['901', '1', '39.90'],
        ['902', '3', '12.00'],
        ['903', '1', '84.50'],
      ],
      note: 'Row 903 belongs to user 1 — the link between the two tables is the shared id, stored in one column.',
      caption: 'A foreign key is the same value kept in two tables so the rows can be joined.',
    },
    code: {
      title: 'A link with rules',
      panels: [
        { label: 'orders', lines: ['id    total  user_id', '42    39.90  7'] },
        { label: 'users', lines: ['id  name', '7   Ada'] },
      ],
      notes: [
        { code: 'user_id', text: 'the foreign key pointing at users.id' },
        { code: 'reference', text: 'order 42 belongs to Ada' },
        { code: 'enforced', text: 'an order cannot point at a user who does not exist' },
      ],
    },
    scenario: {
      title: 'Deleting a user',
      steps: [
        { icon: 'x', label: 'An admin deletes user 7' },
        { icon: 'alert', label: 'Orders still point at them' },
        { icon: 'scale', label: 'The rule decides: block, keep, or set null' },
        { icon: 'checkCircle', label: 'No orphan rows are left behind' },
      ],
      note: 'The database, not the application, guarantees the links stay valid.',
    },
  },

  index: {
    code: {
      title: 'Why a lookup is instant',
      panels: [
        { label: 'Slow: no index', lines: ['SELECT * FROM users WHERE email = ...', '-- reads every row'] },
        { label: 'Fast: indexed', lines: ['CREATE INDEX ON users (email)', '-- about 20 comparisons for a million rows'] },
      ],
      notes: [
        { code: 'index', text: 'a sorted structure beside the table' },
        { code: 'trade-off', text: 'faster reads, slower writes, extra disk' },
        { code: 'covering', text: 'an index can answer some queries without the table at all' },
      ],
    },
    scenario: {
      title: 'A login that got slow',
      steps: [
        { icon: 'alert', label: 'Logins take two seconds' },
        { icon: 'search', label: 'The query scans every user', note: 'no index on email' },
        { icon: 'cog', label: 'One index is added' },
        { icon: 'zap', label: 'Logins take two milliseconds' },
      ],
      note: 'Index the columns you filter and sort by — and nothing else without a reason.',
    },
  },

  query: {
    exchange: {
      request: { label: 'What you want', text: 'orders over £100, newest first' },
      via: 'the database plans it',
      response: { label: 'The rows that match', text: 'newest first, already sorted' },
      note: 'You describe the result you want and the database decides how to find it.',
    },
    scenario: {
      title: 'A dashboard filter',
      steps: [
        { icon: 'target', label: 'You pick “last 30 days”' },
        { icon: 'cog', label: 'A query is built', note: 'safely, with parameters' },
        { icon: 'search', label: 'The database plans and runs it' },
        { icon: 'chart', label: 'The chart draws' },
      ],
      note: 'Never build queries by joining strings — that is how injection attacks get in.',
    },
  },

  transaction: {
    code: {
      title: 'All of it, or none of it',
      panels: [
        {
          label: 'transfer.sql',
          lines: ['BEGIN;', 'UPDATE accounts SET balance = balance - 50 WHERE id = 1;', 'UPDATE accounts SET balance = balance + 50 WHERE id = 2;', 'COMMIT;'],
        },
      ],
      notes: [
        { code: 'BEGIN', text: 'start grouping the work' },
        { code: 'COMMIT', text: 'make every change visible at once' },
        { code: 'ROLLBACK', text: 'or throw the whole thing away' },
      ],
    },
    scenario: {
      title: 'Moving money between accounts',
      steps: [
        { icon: 'coin', label: '£50 leaves account one' },
        { icon: 'alert', label: 'The process crashes' },
        { icon: 'refresh', label: 'The transaction rolls back' },
        { icon: 'checkCircle', label: 'Both balances are unchanged', note: 'no money disappeared' },
      ],
      note: 'Money must never be created or lost by a half-finished operation.',
    },
  },

  acid: {
    mapping: {
      title: 'Four promises',
      pairs: [
        { icon: 'checkCircle', analogy: 'All or nothing', reality: 'atomicity' },
        { icon: 'scale', analogy: 'Rules always hold', reality: 'consistency' },
        { icon: 'users', analogy: 'Two people never collide', reality: 'isolation' },
        { icon: 'hardDrive', analogy: 'Written for good', reality: 'durability' },
      ],
    },
    scenario: {
      title: 'Two people, one ticket',
      steps: [
        { icon: 'target', label: 'Both tap “buy” at once' },
        { icon: 'lock', label: 'Isolation orders the transactions' },
        { icon: 'checkCircle', label: 'One succeeds' },
        { icon: 'x', label: 'The other sees “sold out”', note: 'not two tickets for one seat' },
      ],
      note: 'These four promises are why banks still run on relational databases.',
    },
  },

  normalization: {
    mapping: {
      title: 'Say each thing once',
      pairs: [
        { icon: 'folder', analogy: 'Customers in their own list', reality: 'first normal form work' },
        { icon: 'link', analogy: 'Orders point at a customer', reality: 'no repeated address strings' },
        { icon: 'cycle', analogy: 'One update fixes everywhere', reality: 'changed in one row only' },
        { icon: 'alert', analogy: 'Two copies drift apart', reality: 'the problem it prevents' },
      ],
    },
    scenario: {
      title: 'A customer changes address',
      steps: [
        { icon: 'table', label: 'Normalised: one row to change' },
        { icon: 'check', label: 'Every order now shows the new address' },
        { icon: 'alert', label: 'In a flat file you would edit hundreds' },
        { icon: 'bug', label: 'And miss one' },
      ],
      note: 'Denormalising later for speed is fine — deliberately, and measured.',
    },
  },

  orm: {
    code: {
      title: 'Objects instead of SQL',
      panels: [
        { label: 'Prisma', lines: ['await prisma.order.findMany({', '  where: { total: { gt: 100 } },', '  include: { user: true },', '})'] },
      ],
      notes: [
        { code: 'findMany', text: 'a readable, typed call' },
        { code: 'include', text: 'loads the related user in the same query' },
        { code: 'generated SQL', text: 'always check what it actually ran' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'Hand-written SQL',
        steps: [
          { icon: 'terminal', label: 'You write the exact query' },
          { icon: 'zap', label: 'Full control and full speed' },
          { icon: 'alert', label: 'Strings, typos and no type help' },
        ],
      },
      after: {
        label: 'Through an ORM',
        steps: [
          { icon: 'fileCode', label: 'You call methods on objects' },
          { icon: 'checkCircle', label: 'Types catch mistakes early' },
          { icon: 'eye', label: 'The price is hidden generated SQL', note: 'watch for N+1 queries' },
        ],
      },
      note: 'Most teams use both: an ORM for the routine work, raw SQL where it matters.',
    },
    scenario: {
      title: 'Saving a form',
      steps: [
        { icon: 'target', label: 'A user submits changes' },
        { icon: 'fileCode', label: 'The code updates one object' },
        { icon: 'checkCircle', label: 'Validation runs before saving' },
        { icon: 'database', label: 'The ORM writes updated rows' },
      ],
      note: 'The ORM maps rows to objects in both directions, which is why it suits application code.',
    },
  },

  'database-migration': {
    code: {
      title: 'A versioned change',
      panels: [
        {
          label: '002_add_status.sql',
          lines: ['ALTER TABLE orders ADD COLUMN status text;', 'UPDATE orders SET status = \'paid\' WHERE status IS NULL;'],
        },
      ],
      notes: [
        { code: 'ordered', text: 'migrations run in sequence, exactly once' },
        { code: 'reversible', text: 'a down step lets you roll back' },
        { code: 'team-safe', text: 'everyone runs the same changes locally and in production' },
      ],
    },
    scenario: {
      title: 'Adding a field to a live table',
      steps: [
        { icon: 'fileCode', label: 'You write the migration' },
        { icon: 'checkCircle', label: 'It runs on a test copy first' },
        { icon: 'users', label: 'Code that reads the column ships' },
        { icon: 'terminal', label: 'The migration runs in production', note: 'usually without downtime' },
      ],
      note: 'The risky part is not adding the column — it is every old version of the app still running.',
    },
  },

  'database-server': {
    mapping: {
      title: 'Same engine, different place to live',
      pairs: [
        { icon: 'hardDrive', analogy: 'On your laptop', reality: 'SQLite, or Postgres in Docker' },
        { icon: 'server', analogy: 'On a machine you own', reality: 'a server you patch and back up' },
        { icon: 'cloud', analogy: 'Rented and managed', reality: 'RDS, Cloud SQL, Atlas' },
        { icon: 'scale', analogy: 'Who handles failover', reality: 'the provider, when it is managed' },
      ],
    },
    scenario: {
      title: 'Moving to a managed database',
      steps: [
        { icon: 'cloud', label: 'You pick a managed option' },
        { icon: 'shieldCheck', label: 'Backups and failover are handled' },
        { icon: 'plug', label: 'The connection string changes' },
        { icon: 'clock', label: 'You get an hour of your week back' },
      ],
      note: 'Managed costs more per month and less per engineer — that is the whole trade.',
    },
  },

  joins: {
    code: {
      title: 'Two tables, one result',
      panels: [
        {
          label: 'join.sql',
          lines: ['SELECT o.id, u.name', 'FROM orders o', 'JOIN users u ON u.id = o.user_id', 'WHERE o.total > 100;'],
        },
      ],
      notes: [
        { code: 'JOIN', text: 'match rows from both tables' },
        { code: 'ON', text: 'the condition that links them' },
        { code: 'LEFT JOIN', text: 'keep rows with no match too, filled with nulls' },
      ],
    },
    scenario: {
      title: 'An order list with names',
      steps: [
        { icon: 'table', label: 'Orders hold user_id only' },
        { icon: 'users', label: 'Users hold the names' },
        { icon: 'link', label: 'A join links them' },
        { icon: 'download', label: 'One result: order plus name' },
      ],
      note: 'Joining is the superpower relational databases have over document stores.',
    },
  },

  schema: {
    mapping: {
      title: 'A blueprint for your data',
      pairs: [
        { icon: 'folder', analogy: 'Which tables exist', reality: 'the structure' },
        { icon: 'scale', analogy: 'What each column holds', reality: 'types and constraints' },
        { icon: 'link', analogy: 'What points at what', reality: 'foreign keys' },
        { icon: 'refresh', analogy: 'How it changes over time', reality: 'versioned migrations' },
      ],
    },
    scenario: {
      title: 'A new developer joins',
      steps: [
        { icon: 'users', label: 'They read the schema' },
        { icon: 'search', label: 'They learn what data exists', note: 'without reading all the code' },
        { icon: 'link', label: 'They see how things relate' },
        { icon: 'terminal', label: 'They migrate their local database' },
      ],
      note: 'A clear schema is documentation that cannot go out of date.',
    },
  },

  sharding: {
    beforeAfter: {
      before: {
        label: 'One big table',
        steps: [
          { icon: 'database', label: 'Billions of rows on one server' },
          { icon: 'chart', label: 'Indexes no longer fit in memory' },
          { icon: 'clock', label: 'Every query gets slower' },
        ],
      },
      after: {
        label: 'Split by key',
        steps: [
          { icon: 'layers', label: 'Rows split across several servers', note: 'often by customer id' },
          { icon: 'route', label: 'The app routes to the right shard' },
          { icon: 'zap', label: 'Each shard stays small and fast' },
        ],
      },
      note: 'The hard part is cross-shard queries and rebalancing — escape hatches stop being easy.',
    },
    scenario: {
      title: 'A service with 200 million users',
      steps: [
        { icon: 'table', label: 'One table per shard' },
        { icon: 'hash', label: 'user_id decides the shard' },
        { icon: 'route', label: 'Queries go straight to one' },
        { icon: 'chart', label: 'Add another shard for new regions' },
      ],
      note: 'Sharding is a last resort — exhaust indexes, caching and bigger machines first.',
    },
  },

  replication: {
    beforeAfter: {
      before: {
        label: 'One copy',
        steps: [
          { icon: 'database', label: 'Every read and write hits it' },
          { icon: 'clock', label: 'Reads queue behind writes' },
          { icon: 'alert', label: 'If it dies, everything stops' },
        ],
      },
      after: {
        label: 'Replicas',
        steps: [
          { icon: 'refresh', label: 'Writes go to the primary' },
          { icon: 'download', label: 'Replicas follow the change stream' },
          { icon: 'zap', label: 'Reads spread across them', note: 'and failover becomes possible' },
        ],
      },
      note: 'Replicas can lag slightly behind, so a read right after a write may look stale.',
    },
    scenario: {
      title: 'A news site with heavy traffic',
      steps: [
        { icon: 'users', label: 'Thousands read at once' },
        { icon: 'route', label: 'Reads go to replicas' },
        { icon: 'cog', label: 'One writer handles comments' },
        { icon: 'shieldCheck', label: 'A replica is promoted if the primary fails' },
      ],
      note: 'Most systems read far more than they write, which is why read replicas pay off.',
    },
  },
}
