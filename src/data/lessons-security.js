/**
 * Visual lesson content for the cybersecurity concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const securityLessons = {
  encryption: {
    exchange: {
      request: { label: 'Readable on your side', text: 'balance 500' },
      via: 'Encryption',
      response: { label: 'Unreadable on the wire', text: 'a9f3c1…', mono: true },
      note: 'Anyone can copy the letters on the wire; without the key they learn nothing.',
    },
    hero: { links: ['scrambles it with a key', 'unreadable in transit or at rest', 'only the key reverses it'] },
    mapping: {
      title: 'A locked box with one key',
      pairs: [
        { icon: 'package', analogy: 'What you put in', reality: 'the readable data' },
        { icon: 'key', analogy: 'Turning the key', reality: 'applying the key and algorithm' },
        { icon: 'box', analogy: 'The sealed box', reality: 'the ciphertext' },
        { icon: 'lock', analogy: 'A copy of the key', reality: 'anyone with it can read it — so protect it' },
      ],
    },
    scenario: {
      title: 'Sending a password reset link',
      steps: [
        { icon: 'fileCode', label: 'A token is generated' },
        { icon: 'key', label: 'It is encrypted before storage' },
        { icon: 'send', label: 'The link travels over HTTPS' },
        { icon: 'checkCircle', label: 'Only the server can read it back' },
      ],
      note: 'Encryption protects data in transit and at rest — but a stolen key undoes all of it.',
    },
  },

  hashing: {
    beforeAfter: {
      before: {
        label: 'Encrypting',
        steps: [
          { icon: 'key', label: 'Reversible with the key' },
          { icon: 'refresh', label: 'You can get the original back' },
          { icon: 'check', label: 'Right tool for data you must read again' },
        ],
      },
      after: {
        label: 'Hashing',
        steps: [
          { icon: 'hash', label: 'One way, always' },
          { icon: 'checkCircle', label: 'Same input, same output' },
          { icon: 'alert', label: 'Useful for checking, not for recovering' },
        ],
      },
      note: 'Hashes verify; they do not hide anything you need back later.',
    },
    code: {
      title: 'One input, one fingerprint',
      panels: [
        { label: 'SHA-256', lines: ['"hello"  → 2cf24dba5fb0a30e...', '"hello!" → ce06092fb948d9ff...'] },
      ],
      notes: [
        { code: 'fixed size', text: 'always the same length, whatever you put in' },
        { code: 'avalanche', text: 'one character changes the whole result' },
        { code: 'verify', text: 'compare fingerprints instead of files' },
      ],
    },
    scenario: {
      title: 'Checking a download',
      steps: [
        { icon: 'download', label: 'You download the installer' },
        { icon: 'hash', label: 'Its hash is calculated' },
        { icon: 'scale', label: 'You compare it with the published one' },
        { icon: 'checkCircle', label: 'They match, so the file is intact' },
      ],
      note: 'If anyone changed a single byte, the two hashes would look nothing alike.',
    },
  },

  'password-hashing': {
    code: {
      title: 'Slow on purpose',
      panels: [
        { label: 'storing', lines: ['bcrypt(password, cost=12)', '→ $2b$12$K3Jd...  (salt + hash)'] },
      ],
      notes: [
        { code: 'salt', text: 'random per user, so identical passwords differ' },
        { code: 'cost', text: 'how slow it is — tuned to your hardware' },
        { code: 'never', text: 'never store the password itself, and never a plain hash' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'Fast hash',
        steps: [
          { icon: 'zap', label: 'Millions of guesses a second' },
          { icon: 'table', label: 'A leaked table of passwords' },
          { icon: 'alert', label: 'Common passwords fall in minutes' },
        ],
      },
      after: {
        label: 'bcrypt or Argon2',
        steps: [
          { icon: 'clock', label: 'Deliberately slow per guess' },
          { icon: 'hash', label: 'Unique salt per user' },
          { icon: 'shieldCheck', label: 'Cracking becomes impractical' },
        ],
      },
      note: 'Slowness is the security feature — the opposite of everything else we optimise.',
    },
    scenario: {
      title: 'A database leak',
      steps: [
        { icon: 'alert', label: 'A stolen table of password hashes' },
        { icon: 'hash', label: 'Each row has its own salt' },
        { icon: 'clock', label: 'Guessing is too slow to be worth it' },
        { icon: 'shieldCheck', label: 'Users are far less exposed' },
      ],
      note: 'You still force a reset — but the blast radius is much smaller.',
    },
  },

  'ssl-tls': {
    exchange: {
      request: { label: 'The site proves itself', text: 'here is my certificate' },
      via: 'TLS handshake',
      response: { label: 'Both sides agree on keys', text: 'encrypted from here on' },
      note: 'After the handshake nobody in the middle can read or quietly change the page.',
    },
    mapping: {
      title: 'Trust, then secrecy',
      pairs: [
        { icon: 'book', analogy: 'A passport for the website', reality: 'the certificate' },
        { icon: 'users', analogy: 'Who vouches for it', reality: 'a certificate authority' },
        { icon: 'key', analogy: 'Agreeing a secret in public', reality: 'the handshake' },
        { icon: 'lock', analogy: 'Everything after is private', reality: 'the encrypted session' },
      ],
    },
    scenario: {
      title: 'The padlock appears',
      steps: [
        { icon: 'search', label: 'Your browser connects' },
        { icon: 'book', label: 'The server presents its certificate' },
        { icon: 'checkCircle', label: 'The name and signature are verified' },
        { icon: 'key', label: 'A session key is agreed' },
        { icon: 'shieldCheck', label: 'Everything after is encrypted' },
      ],
      note: 'Certificates prove identity; the handshake provides secrecy. You need both.',
    },
  },

  firewall: {
    beforeAfter: {
      before: {
        label: 'Everything open',
        steps: [
          { icon: 'server', label: 'Every port answers' },
          { icon: 'search', label: 'A scanner maps the whole machine' },
          { icon: 'alert', label: 'One of them has a known flaw' },
        ],
      },
      after: {
        label: 'Default deny',
        steps: [
          { icon: 'lock', label: 'Only ports you need are open' },
          { icon: 'scale', label: 'Rules say who may connect', note: 'often by address range' },
          { icon: 'checkCircle', label: 'Scanners find almost nothing' },
        ],
      },
      note: 'Deny by default and allow deliberately — the reverse is how breaches start.',
    },
    scenario: {
      title: 'Locking down a new server',
      steps: [
        { icon: 'server', label: 'A server goes online' },
        { icon: 'terminal', label: 'Only 443 and 22 are allowed' },
        { icon: 'database', label: 'The database port stays internal' },
        { icon: 'check', label: 'A test scan comes back almost empty' },
      ],
      note: 'Cloud security groups and host firewalls usually both apply.',
    },
  },

  malware: {
    mapping: {
      title: 'How it usually gets in',
      pairs: [
        { icon: 'send', analogy: 'An attachment you open', reality: 'a phishing payload' },
        { icon: 'download', analogy: 'A cracked installer', reality: 'a bundled backdoor' },
        { icon: 'alert', analogy: 'An unpatched service', reality: 'an exploited vulnerability' },
        { icon: 'users', analogy: 'A reused password', reality: 'an account that is not yours any more' },
      ],
    },
    scenario: {
      title: 'One click on the wrong file',
      steps: [
        { icon: 'send', label: 'A realistic invoice arrives' },
        { icon: 'download', label: 'The attached file is opened' },
        { icon: 'alert', label: 'It installs quietly in the background' },
        { icon: 'network', label: 'It calls home for instructions' },
      ],
      note: 'Antivirus helps, but patching, backups and scepticism do most of the work.',
    },
  },

  phishing: {
    beforeAfter: {
      before: {
        label: 'What it says',
        steps: [
          { icon: 'send', label: '“Your account is suspended”' },
          { icon: 'clock', label: '“Act in 24 hours”' },
          { icon: 'target', label: 'A familiar-looking login page' },
        ],
      },
      after: {
        label: 'What to check',
        steps: [
          { icon: 'search', label: 'The exact domain name', note: 'not the display text' },
          { icon: 'link', label: 'Whether the link is where it claims' },
          { icon: 'userCheck', label: 'Ask the sender another way', note: 'not by replying' },
        ],
      },
      note: 'Urgency plus a credential request is the pattern to recognise.',
    },
    scenario: {
      title: 'A convincing fake invoice',
      steps: [
        { icon: 'send', label: 'It arrives from a real-looking address' },
        { icon: 'search', label: 'The domain has one letter changed' },
        { icon: 'chat', label: 'You ask the supplier directly' },
        { icon: 'checkCircle', label: 'It was fake, and nothing was paid' },
      ],
      note: 'Two-factor authentication is what turns a stolen password into a much smaller problem.',
    },
  },

  'sql-injection': {
    code: {
      title: 'Input becoming code',
      panels: [
        { label: 'vulnerable', lines: ['"SELECT * FROM users WHERE name = \'" + input + "\'"', "-- input: ' OR 1=1 --"] },
        { label: 'safe', lines: ['db.query("SELECT * FROM users WHERE name = $1", [input])'] },
      ],
      notes: [
        { code: 'OR 1=1', text: 'makes the condition always true' },
        { code: '--', text: 'comments out the rest of the query' },
        { code: 'parameterised', text: 'the value can never be read as code' },
      ],
    },
    scenario: {
      title: 'A login form that trusts you',
      steps: [
        { icon: 'target', label: 'An attacker types SQL into the email field' },
        { icon: 'cog', label: 'The naive query includes it literally' },
        { icon: 'database', label: 'The condition becomes always true' },
        { icon: 'alert', label: 'They are logged in, or the table is listed' },
      ],
      note: 'The fix is one habit: parameters for values, never string concatenation.',
    },
  },

  xss: {
    beforeAfter: {
      before: {
        label: 'Rendering input as HTML',
        steps: [
          { icon: 'chat', label: 'A visitor posts a “comment” containing a script' },
          { icon: 'monitor', label: 'Every reader runs it' },
          { icon: 'alert', label: 'Their session cookies are stolen' },
        ],
      },
      after: {
        label: 'Escaping by default',
        steps: [
          { icon: 'shieldCheck', label: 'Text is shown as text, never as code' },
          { icon: 'lock', label: 'Cookies are HttpOnly' },
          { icon: 'scale', label: 'A strict policy blocks inline scripts' },
        ],
      },
      note: 'Frameworks escape by default — the danger is the escape hatch you reach for.',
    },
    scenario: {
      title: 'A comment that runs for everyone',
      steps: [
        { icon: 'send', label: 'Someone posts markup instead of text' },
        { icon: 'monitor', label: 'It renders as code for every visitor' },
        { icon: 'key', label: 'It reads what it can reach' },
        { icon: 'lock', label: 'Escaping and a content policy stop it' },
      ],
      note: 'XSS attacks your users through your site, which is why it is treated as a category apart.',
    },
  },

  csrf: {
    beforeAfter: {
      before: {
        label: 'Cookies alone',
        steps: [
          { icon: 'globe', label: 'You are logged into your bank' },
          { icon: 'search', label: 'Another tab silently posts a transfer' },
          { icon: 'alert', label: 'The browser attaches your cookie', note: 'and it goes through' },
        ],
      },
      after: {
        label: 'A token and a cookie policy',
        steps: [
          { icon: 'hash', label: 'Forms carry a one-time token' },
          { icon: 'scale', label: 'SameSite cookies are the default' },
          { icon: 'checkCircle', label: 'Another site cannot form the request' },
        ],
      },
      note: 'Never change state on a plain GET — that alone removes many of these attacks.',
    },
    scenario: {
      title: 'An invisible form on a forum',
      steps: [
        { icon: 'lock', label: 'You are signed into your bank in one tab' },
        { icon: 'monitor', label: 'Another page contains a hidden form' },
        { icon: 'send', label: 'It submits itself to the bank' },
        { icon: 'checkCircle', label: 'The missing token makes it fail' },
      ],
      note: 'The browser sends your cookies automatically — that convenience is the vulnerability.',
    },
  },

  'public-key': {
    exchange: {
      request: { label: 'Seal a message with the public key', text: 'encrypt(“meet at 6”)' },
      via: 'Asymmetric encryption',
      response: { label: 'Only the private key can open it', text: 'nobody else can read it' },
      note: 'You can publish the public key freely — that is the entire point of the pair.',
    },
    mapping: {
      title: 'A padlock anyone can use',
      pairs: [
        { icon: 'lock', analogy: 'The padlock', reality: 'the public key' },
        { icon: 'users', analogy: 'Anyone may snap it shut', reality: 'encrypt to that person' },
        { icon: 'key', analogy: 'Only they hold the key', reality: 'the private key decrypts' },
        { icon: 'book', analogy: 'On a public noticeboard', reality: 'published or exchanged in a certificate' },
      ],
    },
    scenario: {
      title: 'Your first HTTPS connection to a site',
      steps: [
        { icon: 'globe', label: 'The server sends its public key', note: 'inside a certificate' },
        { icon: 'lock', label: 'Your browser encrypts a secret with it' },
        { icon: 'key', label: 'Only the server can decrypt it' },
        { icon: 'zap', label: 'Both sides now share a fast session key' },
      ],
      note: 'Public keys solve a problem nothing else does: agreeing a secret while being watched.',
    },
  },

  'private-key': {
    beforeAfter: {
      before: {
        label: 'A shared password',
        steps: [
          { icon: 'key', label: 'Same secret on both sides' },
          { icon: 'alert', label: 'Either side leaking breaks both' },
          { icon: 'users', label: 'Hard to prove who sent what' },
        ],
      },
      after: {
        label: 'A private key',
        steps: [
          { icon: 'lock', label: 'Only you hold it' },
          { icon: 'book', label: 'Anything signed with it proves it was you' },
          { icon: 'shieldCheck', label: 'Never shared, never sent' },
        ],
      },
      note: 'Treat a private key like a passport: if it leaves the machine, the identity is compromised.',
    },
    scenario: {
      title: 'Deploying without a password',
      steps: [
        { icon: 'terminal', label: 'You generate a key pair' },
        { icon: 'send', label: 'The public key is put on the server' },
        { icon: 'lock', label: 'Your machine proves possession of the private key' },
        { icon: 'checkCircle', label: 'You are in — no password typed' },
      ],
      note: 'This is why stolen private keys are treated as incidents, not inconveniences.',
    },
  },

  'digital-signature': {
    exchange: {
      request: { label: 'You send a signed file', text: 'update.zip + signature' },
      via: 'Signature check',
      response: { label: 'Two things are proven at once', text: 'untouched, and really from them' },
      note: 'A single changed byte breaks the signature, so tampering cannot pass unnoticed.',
    },
    mapping: {
      title: 'Proving who and what',
      pairs: [
        { icon: 'hash', analogy: 'A fingerprint of the file', reality: 'the hash' },
        { icon: 'key', analogy: 'Stamping it with your seal', reality: 'signing with the private key' },
        { icon: 'book', analogy: 'Anyone can check the seal', reality: 'verifying with the public key' },
        { icon: 'scale', analogy: 'Change one byte and it fails', reality: 'integrity plus identity' },
      ],
    },
    scenario: {
      title: 'A software update',
      steps: [
        { icon: 'fileCode', label: 'The release is built' },
        { icon: 'key', label: 'It is signed by the maintainers' },
        { icon: 'download', label: 'Your device downloads it' },
        { icon: 'checkCircle', label: 'The signature is verified before installing' },
      ],
      note: 'Without that check, a swapped installer would be indistinguishable from the real one.',
    },
  },

  'zero-trust': {
    beforeAfter: {
      before: {
        label: 'Trust the office network',
        steps: [
          { icon: 'building', label: 'Inside the walls you are trusted' },
          { icon: 'zap', label: 'Access is easy and broad' },
          { icon: 'alert', label: 'One compromised laptop can roam freely' },
        ],
      },
      after: {
        label: 'Zero trust',
        steps: [
          { icon: 'lock', label: 'Every request is authenticated', note: 'including internal ones' },
          { icon: 'scale', label: 'Access is granted per resource' },
          { icon: 'eye', label: 'And it is logged' },
        ],
      },
      note: 'Remote work finished the network boundary off — but the idea is worth it on its own.',
    },
    scenario: {
      title: 'A laptop is compromised',
      steps: [
        { icon: 'alert', label: 'An attacker has a working session' },
        { icon: 'lock', label: 'They still need credentials for each service' },
        { icon: 'scale', label: 'Most requests are refused' },
        { icon: 'eye', label: 'The unusual activity is logged and alerted' },
      ],
      note: 'Assume the network is hostile, then design so a single foothold is not enough.',
    },
  },

  'two-factor-authentication': {
    mapping: {
      title: 'Something you know, plus something you have',
      pairs: [
        { icon: 'key', analogy: 'Your password', reality: 'something you know' },
        { icon: 'smartphone', analogy: 'A code from your phone', reality: 'something you have' },
        { icon: 'userCheck', analogy: 'Your face or fingerprint', reality: 'something you are' },
        { icon: 'shieldCheck', analogy: 'A stolen password is no longer enough', reality: 'the entire point' },
      ],
    },
    scenario: {
      title: 'Logging in from a laptop abroad',
      steps: [
        { icon: 'lock', label: 'Password accepted' },
        { icon: 'alert', label: 'It is a new device', note: 'so a second check is required' },
        { icon: 'smartphone', label: 'You approve on your phone' },
        { icon: 'checkCircle', label: 'Then you are signed in' },
      ],
      note: 'App or hardware-key codes resist phishing far better than text messages.',
    },
  },

  ddos: {
    beforeAfter: {
      before: {
        label: 'No protection',
        steps: [
          { icon: 'globe', label: 'Thousands of machines all request at once' },
          { icon: 'server', label: 'The server is saturated' },
          { icon: 'x', label: 'Real users cannot connect' },
        ],
      },
      after: {
        label: 'Absorbed and filtered',
        steps: [
          { icon: 'cloud', label: 'Traffic hits a global edge network first' },
          { icon: 'scale', label: 'Obvious junk is dropped there' },
          { icon: 'checkCircle', label: 'Real traffic still reaches the origin' },
        ],
      },
      note: 'You cannot out-scale an attack alone, which is why absorbing capacity is rented.',
    },
    scenario: {
      title: 'An attack during a sale',
      steps: [
        { icon: 'chart', label: 'Traffic jumps a hundredfold' },
        { icon: 'cloud', label: 'The edge absorbs it', note: 'and caches what it can' },
        { icon: 'shieldCheck', label: 'Rate limits slow the rest' },
        { icon: 'checkCircle', label: 'Customers keep buying' },
      ],
      note: 'The cheap version of resilience is caching and rate limits before you ever need them.',
    },
  },

  'man-in-the-middle': {
    beforeAfter: {
      before: {
        label: 'Plain HTTP on café wifi',
        steps: [
          { icon: 'wifi', label: 'You join the network' },
          { icon: 'eye', label: 'Traffic passes through equipment you do not control' },
          { icon: 'alert', label: 'Logins and cookies are readable' },
        ],
      },
      after: {
        label: 'HTTPS with a valid certificate',
        steps: [
          { icon: 'book', label: 'The site proves who it is' },
          { icon: 'key', label: 'A session key is agreed' },
          { icon: 'lock', label: 'Anyone in the middle sees ciphertext', note: 'and a warning if they try to intercept' },
        ],
      },
      note: 'A certificate warning is exactly this attack being blocked — do not click through it.',
    },
    scenario: {
      title: 'A fake hotspot',
      steps: [
        { icon: 'wifi', label: 'An attacker runs “Free Airport Wifi”' },
        { icon: 'search', label: 'They serve their own login page' },
        { icon: 'lock', label: 'The real site would show a certificate error' },
        { icon: 'shieldCheck', label: 'A padlock and the right domain name save you' },
      ],
      note: 'Check the domain name, not just the padlock icon.',
    },
  },

  rbac: {
    mapping: {
      title: 'Roles, not individuals',
      pairs: [
        { icon: 'users', analogy: 'A role like “support”', reality: 'a bundle of permissions' },
        { icon: 'userCheck', analogy: 'You are given the role', reality: 'access comes with it' },
        { icon: 'scale', analogy: 'Changing the role changes everyone', reality: 'one place to maintain' },
        { icon: 'eye', analogy: 'You can see who can do what', reality: 'auditable by design' },
      ],
    },
    scenario: {
      title: 'A support agent needs refunds',
      steps: [
        { icon: 'target', label: 'They ask for refund access' },
        { icon: 'cog', label: 'One permission is added to the role' },
        { icon: 'users', label: 'All eighty agents get it' },
        { icon: 'checkCircle', label: 'Nobody is given more than that' },
      ],
      note: 'Per-person permissions become unmanageable past a handful of people.',
    },
  },

  'secrets-management': {
    beforeAfter: {
      before: {
        label: 'In the code',
        steps: [
          { icon: 'fileCode', label: 'A key is pasted into a config file' },
          { icon: 'send', label: 'It is committed and pushed' },
          { icon: 'alert', label: 'It is now in history forever' },
        ],
      },
      after: {
        label: 'In a secret store',
        steps: [
          { icon: 'lock', label: 'Secrets live in a vault' },
          { icon: 'checkCircle', label: 'Apps fetch them at start-up' },
          { icon: 'refresh', label: 'Rotation is a scheduled job' },
        ],
      },
      note: 'If a secret is ever in git, rotate it — rewriting history is not enough.',
    },
    scenario: {
      title: 'A database password leak in a screenshot',
      steps: [
        { icon: 'alert', label: 'A password appears in a support thread' },
        { icon: 'lock', label: 'The team rotates it in the vault' },
        { icon: 'refresh', label: 'Services pick up the new value' },
        { icon: 'checkCircle', label: 'The old one stops working' },
      ],
      note: 'Rotation should be boring and frequent — that is what makes leaks survivable.',
    },
  },

  'penetration-testing': {
    mapping: {
      title: 'Attackers you hired',
      pairs: [
        { icon: 'book', analogy: 'Agreeing the rules', reality: 'scope and permission, in writing' },
        { icon: 'search', analogy: 'Looking for a way in', reality: 'reconnaissance' },
        { icon: 'target', analogy: 'Trying to use it', reality: 'exploitation' },
        { icon: 'book', analogy: 'A written report', reality: 'evidence and fixes to prioritise' },
      ],
    },
    scenario: {
      title: 'A test week before launch',
      steps: [
        { icon: 'users', label: 'Testers are given scope in writing' },
        { icon: 'search', label: 'They map the app and its login' },
        { icon: 'target', label: 'They find two real weaknesses', note: 'one of them serious' },
        { icon: 'checkCircle', label: 'Both are fixed before customers arrive' },
      ],
      note: 'Fixing what is found — not the report itself — is what you are buying.',
    },
  },
}
