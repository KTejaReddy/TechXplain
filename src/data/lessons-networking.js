/**
 * Visual lesson content for the networking concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const networkingLessons = {
  internet: {
    mapping: {
      title: 'A network of networks',
      pairs: [
        { icon: 'network', analogy: 'Many roads, one destination', reality: 'networks agreeing to pass traffic' },
        { icon: 'route', analogy: 'Signposts everywhere', reality: 'routers choosing the next hop' },
        { icon: 'book', analogy: 'A shared address book', reality: 'DNS turning names into numbers' },
        { icon: 'scale', analogy: 'Rules everyone follows', reality: 'open protocols like TCP/IP' },
      ],
    },
    scenario: {
      title: 'A photo travels 8,000 km',
      steps: [
        { icon: 'search', label: 'Your phone looks up the server name' },
        { icon: 'layers', label: 'The photo is cut into packets' },
        { icon: 'route', label: 'Each takes its own path', note: 'through many networks' },
        { icon: 'checkCircle', label: 'They are reassembled in order' },
      ],
      note: 'No single company runs the internet — it works because everyone agrees on the protocols.',
    },
  },

  'computer-network': {
    mapping: {
      title: 'Two shapes of network',
      pairs: [
        { icon: 'building', analogy: 'Devices in one place', reality: 'a local network' },
        { icon: 'globe', analogy: 'Between those places', reality: 'the wide area network' },
        { icon: 'plug', analogy: 'A shared road inside', reality: 'a switch and its cables' },
        { icon: 'route', analogy: 'The exit onto the motorway', reality: 'the router' },
      ],
    },
    scenario: {
      title: 'Your laptop prints something',
      steps: [
        { icon: 'target', label: 'You press print' },
        { icon: 'network', label: 'The request stays local', note: 'never leaves the building' },
        { icon: 'plug', label: 'The switch sends it to the printer' },
        { icon: 'checkCircle', label: 'The page comes out' },
      ],
      note: 'Local traffic is fast and private; leaving the network is what needs a route.',
    },
  },

  protocol: {
    mapping: {
      title: 'Agreeing how to talk',
      pairs: [
        { icon: 'chat', analogy: 'A shared language', reality: 'the message format' },
        { icon: 'refresh', analogy: 'Who speaks first', reality: 'the order of exchanges' },
        { icon: 'scale', analogy: 'What to do when it goes wrong', reality: 'error handling and retries' },
        { icon: 'shieldCheck', analogy: 'Both sides follow the rules', reality: 'which is why different systems interoperate' },
      ],
    },
    scenario: {
      title: 'Two companies’ systems talking',
      steps: [
        { icon: 'book', label: 'They agree on a protocol' },
        { icon: 'send', label: 'One sends a request in that format' },
        { icon: 'checkCircle', label: 'The other understands it' },
        { icon: 'zap', label: 'No shared code was needed' },
      ],
      note: 'Protocols are what let a phone from one company talk to a server in another.',
    },
  },

  client: {
    mapping: {
      title: 'Asking, not answering',
      pairs: [
        { icon: 'target', analogy: 'Starts the conversation', reality: 'the client sends first' },
        { icon: 'search', analogy: 'Knows what it wants', reality: 'the request and its details' },
        { icon: 'clock', analogy: 'Waits for a reply', reality: 'with timeouts, hopefully' },
        { icon: 'users', analogy: 'Many clients, one server', reality: 'the usual shape of the web' },
      ],
    },
    scenario: {
      title: 'A weather app',
      steps: [
        { icon: 'smartphone', label: 'You open the app' },
        { icon: 'send', label: 'It requests your local forecast' },
        { icon: 'download', label: 'The server replies' },
        { icon: 'monitor', label: 'The screen fills in' },
      ],
      note: 'The same program can be a client to one service and a server to another.',
    },
  },

  'ip-address': {
    code: {
      title: 'Two forms, one idea',
      panels: [
        { label: 'IPv4', lines: ['203.0.113.10', 'about 4 billion possible addresses'] },
        { label: 'IPv6', lines: ['2001:db8::1428:57ab', 'about 340 undecillion'] },
      ],
      notes: [
        { code: 'public', text: 'routable on the internet' },
        { code: 'private', text: 'inside your own network, reused everywhere' },
        { code: 'static', text: 'unchanged, so DNS can point at it' },
      ],
    },
    scenario: {
      title: 'Your address changes',
      steps: [
        { icon: 'download', label: 'You connect to wifi' },
        { icon: 'server', label: 'The router gives you a private address' },
        { icon: 'route', label: 'Outbound traffic uses the router’s address', note: 'that is NAT' },
        { icon: 'globe', label: 'The internet sees one public address' },
      ],
      note: 'Your home has one public address and dozens of devices sharing it.',
    },
  },

  ipv4: {
    code: {
      title: 'Four numbers, one limit',
      panels: [
        { label: 'address', lines: ['192.168.1.24', 'four groups of 0–255'] },
        { label: 'subnet', lines: ['/24  =  256 addresses'] },
      ],
      notes: [
        { code: 'private blocks', text: '10.x, 172.16–31.x and 192.168.x are reused everywhere' },
        { code: 'exhausted', text: 'the free public pool ran out in 2011' },
        { code: 'workaround', text: 'NAT lets many devices share one address' },
      ],
    },
    scenario: {
      title: 'Why your home address is not enough',
      steps: [
        { icon: 'server', label: 'Your router has one public address' },
        { icon: 'users', label: 'Twelve devices share it' },
        { icon: 'route', label: 'NAT keeps track of who asked what' },
        { icon: 'checkCircle', label: 'Everything still works' },
      ],
      note: 'IPv4 survives on borrowing: most addresses are reused thousands of times.',
    },
  },

  ipv6: {
    beforeAfter: {
      before: {
        label: 'IPv4 with NAT',
        steps: [
          { icon: 'route', label: 'Addresses are shared and translated' },
          { icon: 'alert', label: 'Inbound connections are awkward' },
          { icon: 'cog', label: 'Extra complexity everywhere' },
        ],
      },
      after: {
        label: 'IPv6',
        steps: [
          { icon: 'globe', label: 'Enough addresses for everything' },
          { icon: 'checkCircle', label: 'No translation needed' },
          { icon: 'refresh', label: 'Routing is simpler and cleaner' },
        ],
      },
      note: 'The two worlds run side by side, which is why adoption has been gradual.',
    },
    scenario: {
      title: 'A mobile network on IPv6',
      steps: [
        { icon: 'smartphone', label: 'Your phone is assigned an IPv6 address' },
        { icon: 'send', label: 'Services that support it are reached directly' },
        { icon: 'refresh', label: 'Older ones fall back to IPv4' },
        { icon: 'check', label: 'You never notice either way' },
      ],
      note: 'Newer networks are usually IPv6-first, with IPv4 as the fallback.',
    },
  },

  'mac-address': {
    beforeAfter: {
      before: {
        label: 'MAC address',
        steps: [
          { icon: 'hardDrive', label: 'Burned into the network card' },
          { icon: 'network', label: 'Works only inside one local network' },
          { icon: 'check', label: 'Used by switches to deliver frames' },
        ],
      },
      after: {
        label: 'IP address',
        steps: [
          { icon: 'globe', label: 'Assigned by the network' },
          { icon: 'route', label: 'Works across the whole internet' },
          { icon: 'refresh', label: 'Changes when you move networks' },
        ],
      },
      note: 'A MAC is like a serial number; an IP is like a current postal address.',
    },
    scenario: {
      title: 'A switch learns who is where',
      steps: [
        { icon: 'plug', label: 'You plug in a laptop' },
        { icon: 'eye', label: 'The switch notes its MAC address' },
        { icon: 'target', label: 'Traffic for it now goes to that port', note: 'not broadcast everywhere' },
        { icon: 'check', label: 'The local network stays efficient' },
      ],
      note: 'MAC addresses are never supposed to leave the local network — routers swap them out.',
    },
  },

  router: {
    mapping: {
      title: 'A postal sorting hub',
      pairs: [
        { icon: 'route', analogy: 'Reading the destination', reality: 'looking at the IP address' },
        { icon: 'book', analogy: 'Knowing the best next leg', reality: 'the routing table' },
        { icon: 'send', analogy: 'Passing it onward', reality: 'forwarding the packet' },
        { icon: 'scale', analogy: 'Congestion and detours', reality: 'choosing another path' },
      ],
    },
    scenario: {
      title: 'A cable is cut in the Atlantic',
      steps: [
        { icon: 'alert', label: 'One route stops working' },
        { icon: 'eye', label: 'Routers notice missing replies' },
        { icon: 'route', label: 'Traffic shifts to another path' },
        { icon: 'checkCircle', label: 'Sites feel slower, not dead' },
      ],
      note: 'Nobody centrally reroutes the internet — it adapts from the edges.',
    },
  },

  switch: {
    mapping: {
      title: 'A local post room',
      pairs: [
        { icon: 'plug', analogy: 'Everyone has a socket', reality: 'each device has a port' },
        { icon: 'book', analogy: 'A list of who is where', reality: 'the MAC address table' },
        { icon: 'send', analogy: 'Delivered only to the right desk', reality: 'unicast instead of broadcast' },
        { icon: 'layers', analogy: 'No talk of the outside world', reality: 'switching works inside one network' },
      ],
    },
    scenario: {
      title: 'A busy office network',
      steps: [
        { icon: 'plug', label: 'Forty devices are plugged in' },
        { icon: 'eye', label: 'The switch maps ports to addresses' },
        { icon: 'zap', label: 'Traffic goes only where it is needed' },
        { icon: 'checkCircle', label: 'Everyone gets full speed' },
      ],
      note: 'A hub would shout every frame to everyone; a switch does not.',
    },
  },

  packet: {
    exchange: {
      request: { label: 'One big file leaves', text: 'a 30 MB video' },
      via: 'Packets',
      response: { label: 'It is split, then rebuilt', text: 'thousands of small pieces, in order' },
      note: 'Each piece can take its own route, and the receiver puts them back together.',
    },
    mapping: {
      title: 'Letters, not parcels',
      pairs: [
        { icon: 'box', analogy: 'The envelope', reality: 'the header, with addresses' },
        { icon: 'fileCode', analogy: 'The page inside', reality: 'the payload' },
        { icon: 'hash', analogy: 'The page number', reality: 'sequence numbering' },
        { icon: 'refresh', analogy: 'Resend a lost letter', reality: 'retransmission' },
      ],
    },
    scenario: {
      title: 'Watching a video',
      steps: [
        { icon: 'monitor', label: 'A stream arrives hundreds of times a second' },
        { icon: 'layers', label: 'Each packet carries a small piece' },
        { icon: 'alert', label: 'A video packet is lost' },
        { icon: 'zap', label: 'It is skipped, not resent', note: 'to keep the picture moving' },
      ],
      note: 'The same plumbing handles a file download and a video call very differently.',
    },
  },

  port: {
    code: {
      title: 'The door number',
      panels: [
        { label: 'common ports', lines: ['80    http', '443   https', '22    ssh', '5432  postgres'] },
      ],
      notes: [
        { code: 'port', text: 'which service on that machine should answer' },
        { code: '1024+', text: 'the range ordinary programs may use' },
        { code: 'closed', text: 'no listener means connection refused' },
      ],
    },
    scenario: {
      title: 'One server, several services',
      steps: [
        { icon: 'server', label: 'One machine, one address' },
        { icon: 'plug', label: '443 serves the website' },
        { icon: 'database', label: '5432 serves the database' },
        { icon: 'lock', label: 'Only the app may reach 5432' },
      ],
      note: 'Closing ports you do not use is one of the cheapest security wins there is.',
    },
  },

  tcp: {
    exchange: {
      request: { label: 'Your side opens', text: 'SYN — “can we talk?”' },
      via: 'Handshake',
      response: { label: 'The other side agrees', text: 'SYN-ACK — “ready when you are”' },
      note: 'Only after this three-way handshake does the actual data start moving.',
    },
    hero: { links: ['agree to talk', 'split and number', 'fill any gaps'] },
    mapping: {
      title: 'A tracked delivery',
      pairs: [
        { icon: 'chat', analogy: 'Confirming the order first', reality: 'the three-way handshake' },
        { icon: 'hash', analogy: 'Numbered packages', reality: 'sequence numbers' },
        { icon: 'checkCircle', analogy: 'A signature on arrival', reality: 'acknowledgements' },
        { icon: 'refresh', analogy: 'Sending a missing one again', reality: 'retransmission' },
      ],
    },
    scenario: {
      title: 'Downloading a file',
      steps: [
        { icon: 'chat', label: 'Both sides agree to talk', note: 'SYN, SYN-ACK, ACK' },
        { icon: 'layers', label: 'The file is split and numbered' },
        { icon: 'alert', label: 'One packet is lost on the way' },
        { icon: 'refresh', label: 'It is sent again' },
        { icon: 'checkCircle', label: 'The file arrives complete and in order' },
      ],
      note: 'That reliability is why the file opens perfectly, and why a video call avoids TCP.',
    },
  },

  udp: {
    exchange: {
      request: { label: 'Your side just sends', text: 'a packet, no handshake (fire-and-forget)' },
      via: 'UDP',
      response: { label: 'Most arrive, a few may not', text: 'no receipt, no re-send' },
      note: 'For a live call that is the right trade: a late packet is worse than a missing one.',
    },
    beforeAfter: {
      before: {
        label: 'TCP',
        steps: [
          { icon: 'chat', label: 'Handshake, then send' },
          { icon: 'checkCircle', label: 'Everything confirmed' },
          { icon: 'clock', label: 'A late packet delays everything', note: 'in-order delivery' },
        ],
      },
      after: {
        label: 'UDP',
        steps: [
          { icon: 'send', label: 'Just send it' },
          { icon: 'zap', label: 'No waiting, no confirmations' },
          { icon: 'alert', label: 'A lost packet is simply gone', note: 'the picture skips a moment' },
        ],
      },
      note: 'For live audio and video, being late is worse than being slightly incomplete.',
    },
    scenario: {
      title: 'A video call',
      steps: [
        { icon: 'monitor', label: 'Frames are sent continuously' },
        { icon: 'network', label: 'Some are dropped by a busy network' },
        { icon: 'zap', label: 'Nobody waits for them' },
        { icon: 'chat', label: 'You hear a tiny glitch, then normal speech' },
      ],
      note: 'Games, calls and DNS choose UDP for exactly this reason.',
    },
  },

  dns: {
    exchange: {
      request: { label: 'Your device asks', text: '“where is example.com?”' },
      via: 'DNS resolver',
      response: { label: 'The address comes back', text: '142.250.72.14' },
      note: 'Names are for people; every real conversation happens between numbers.',
    },
    hero: { links: ['asks a resolver', 'finds the address', 'the page loads'] },
    mapping: {
      title: 'The internet’s phone book',
      pairs: [
        { icon: 'book', analogy: 'Names and numbers', reality: 'domain names and IP addresses' },
        { icon: 'users', analogy: 'A helpful operator', reality: 'the recursive resolver' },
        { icon: 'layers', analogy: 'Branch offices', reality: 'root, TLD and authoritative servers' },
        { icon: 'clock', analogy: 'Remembering recent answers', reality: 'caching, with a TTL' },
      ],
    },
    scenario: {
      title: 'Opening a site you have never visited',
      steps: [
        { icon: 'search', label: 'Your browser asks a resolver' },
        { icon: 'layers', label: 'It asks root, then the .com servers' },
        { icon: 'target', label: 'The site’s nameserver answers', note: '203.0.113.10' },
        { icon: 'clock', label: 'The answer is cached for a while' },
        { icon: 'globe', label: 'The browser connects' },
      ],
      note: 'DNS is the part of the internet you notice only when it breaks.',
    },
  },

  proxy: {
    exchange: {
      request: { label: 'You ask the proxy', text: '“fetch this page for me”' },
      via: 'Proxy server',
      response: { label: 'It answers on their behalf', text: 'the page — without your address' },
      note: 'Useful for caching a whole office, for filtering, and for hiding who asked.',
    },
    mapping: {
      title: 'Someone in the middle, on purpose',
      pairs: [
        { icon: 'route', analogy: 'Everything goes through it', reality: 'your traffic is forwarded' },
        { icon: 'eye', analogy: 'It can see and log', reality: 'filtering and auditing' },
        { icon: 'hardDrive', analogy: 'It can remember answers', reality: 'caching proxies' },
        { icon: 'lock', analogy: 'The far side sees it, not you', reality: 'your address is hidden' },
      ],
    },
    scenario: {
      title: 'A company blocks a website',
      steps: [
        { icon: 'target', label: 'An employee opens the site' },
        { icon: 'route', label: 'Their browser is configured to use the proxy' },
        { icon: 'x', label: 'The proxy refuses that domain' },
        { icon: 'checkCircle', label: 'Allowed sites still work at full speed' },
      ],
      note: 'Forward proxies sit in front of users; reverse proxies sit in front of servers.',
    },
  },

  vpn: {
    exchange: {
      request: { label: 'A packet for the office', text: 'to the file server' },
      via: 'Encrypted tunnel',
      response: { label: 'Handled as if you were inside', text: 'the shared drive opens' },
      note: 'Your traffic still crosses the public internet — it just cannot be read on the way.',
    },
    beforeAfter: {
      before: {
        label: 'Café wifi',
        steps: [
          { icon: 'wifi', label: 'You join an unknown network' },
          { icon: 'eye', label: 'The local network can watch a lot' },
          { icon: 'alert', label: 'Plain HTTP traffic is readable' },
        ],
      },
      after: {
        label: 'VPN',
        steps: [
          { icon: 'lock', label: 'One encrypted tunnel' },
          { icon: 'route', label: 'All traffic goes through it' },
          { icon: 'shieldCheck', label: 'The café sees only ciphertext', note: 'and one destination' },
        ],
      },
      note: 'A VPN moves who you must trust; it does not make you anonymous.',
    },
    scenario: {
      title: 'Working from a hotel',
      steps: [
        { icon: 'terminal', label: 'You connect the VPN client' },
        { icon: 'lock', label: 'Your device joins the company network' },
        { icon: 'server', label: 'Internal tools answer as if you were in the office' },
        { icon: 'checkCircle', label: 'Nothing internal was exposed publicly' },
      ],
      note: 'The usual reason companies run one is to avoid publishing internal services to the internet.',
    },
  },

  latency: {
    beforeAfter: {
      before: {
        label: 'Many round trips',
        steps: [
          { icon: 'download', label: 'Page, styles, fonts, data' },
          { icon: 'network', label: 'Each waits for the last' },
          { icon: 'clock', label: 'Half a second before anything shows' },
        ],
      },
      after: {
        label: 'Fewer, faster trips',
        steps: [
          { icon: 'zap', label: 'Cache what rarely changes' },
          { icon: 'cloud', label: 'Serve from near the user' },
          { icon: 'clock', label: 'Same content, a fraction of the wait' },
        ],
      },
      note: 'Latency is distance and round trips, not file size — that is why caching beats compression here.',
    },
    scenario: {
      title: 'A page that feels slow',
      steps: [
        { icon: 'chart', label: 'Total time is measured' },
        { icon: 'search', label: 'Most of it is waiting, not downloading' },
        { icon: 'cloud', label: 'Assets move to a CDN' },
        { icon: 'zap', label: 'It feels instant' },
      ],
      note: 'Every additional round trip is paid for by every user, on every page.',
    },
  },

  bandwidth: {
    beforeAfter: {
      before: {
        label: 'Bandwidth problem',
        steps: [
          { icon: 'download', label: 'A 40 MB page' },
          { icon: 'clock', label: 'Slow on any connection' },
          { icon: 'cog', label: 'Fix: send less' },
        ],
      },
      after: {
        label: 'Latency problem',
        steps: [
          { icon: 'layers', label: 'A small page, many round trips' },
          { icon: 'clock', label: 'Slow even on fibre' },
          { icon: 'zap', label: 'Fix: fewer trips, and cache' },
        ],
      },
      note: 'They are different problems, so measure before choosing a fix.',
    },
    scenario: {
      title: 'Everyone opens the same report at 9am',
      steps: [
        { icon: 'users', label: 'Two hundred people at once' },
        { icon: 'chart', label: 'The link saturates' },
        { icon: 'cloud', label: 'Files are served from the edge instead' },
        { icon: 'checkCircle', label: 'The office link stays clear' },
      ],
      note: 'Bandwidth is a shared resource, which is why peak hours feel different.',
    },
  },

  nat: {
    exchange: {
      request: { label: 'One device out of many', text: '192.168.1.5:51000' },
      via: 'Router',
      response: { label: 'Replying to the house, not the device', text: 'back to the public address' },
      note: 'The router remembers which device opened which connection, and sends the answer home.',
    },
    mapping: {
      title: 'One public address, many devices',
      pairs: [
        { icon: 'building', analogy: 'One street address', reality: 'your public IP' },
        { icon: 'folder', analogy: 'Flat numbers inside', reality: 'private addresses' },
        { icon: 'book', analogy: 'A list of who asked what', reality: 'the translation table' },
        { icon: 'alert', analogy: 'Visitors cannot knock directly', reality: 'inbound connections need a rule' },
      ],
    },
    scenario: {
      title: 'Twelve devices, one address',
      steps: [
        { icon: 'smartphone', label: 'Your phone asks for a page' },
        { icon: 'route', label: 'The router rewrites the source address' },
        { icon: 'globe', label: 'The site replies to the router' },
        { icon: 'target', label: 'The router sends it back only to you' },
      ],
      note: 'It is a clever shortage fix that has become the normal shape of home networking.',
    },
  },

  dhcp: {
    exchange: {
      request: { label: 'A new device asks', text: '“any network settings for me?”' },
      via: 'DHCP',
      response: { label: 'The server answers', text: 'an address, a gateway, a DNS server' },
      note: 'All of it is handed out automatically, for a lease period.',
    },
    scenario: {
      title: 'Joining a new wifi network',
      steps: [
        { icon: 'wifi', label: 'You enter the password' },
        { icon: 'send', label: 'Your device broadcasts a request' },
        { icon: 'server', label: 'The router leases an address', note: 'valid for a few hours' },
        { icon: 'checkCircle', label: 'You are online' },
      ],
      note: 'A lease expires and is renewed quietly, which is why your address can change.',
    },
  },

  ssh: {
    exchange: {
      request: { label: 'You offer a key, not a password', text: 'ssh deploy@server' },
      via: 'Encrypted channel',
      response: { label: 'A terminal on the far machine', text: 'deploy@web-1:~$' },
      note: 'Everything typed from here on is encrypted; the key never travels.',
    },
    code: {
      title: 'A secure remote shell',
      panels: [
        { label: 'connect', lines: ['ssh deploy@203.0.113.10', 'ssh -i ~/.ssh/id_ed25519 user@host'] },
        { label: 'set up keys', lines: ['ssh-keygen -t ed25519', 'ssh-copy-id user@host'] },
      ],
      notes: [
        { code: 'key pair', text: 'the private key never leaves your machine' },
        { code: '-i', text: 'which private key to use' },
        { code: 'config', text: '~/.ssh/config names your servers' },
      ],
    },
    scenario: {
      title: 'Deploying to a server',
      steps: [
        { icon: 'terminal', label: 'You connect with your key' },
        { icon: 'lock', label: 'The server checks it, not a password' },
        { icon: 'send', label: 'You copy the new build across' },
        { icon: 'refresh', label: 'You restart the service' },
      ],
      note: 'Password logins are usually disabled entirely on servers that matter.',
    },
  },

  subnet: {
    code: {
      title: 'Splitting an address range',
      panels: [
        { label: 'CIDR', lines: ['10.0.1.0/24   → 256 addresses', '10.0.2.0/24   → the next 256'] },
      ],
      notes: [
        { code: '/24', text: 'the first 24 bits identify the network' },
        { code: 'public subnet', text: 'has a route to the internet' },
        { code: 'private subnet', text: 'only reachable from inside' },
      ],
    },
    scenario: {
      title: 'Separating web servers from databases',
      steps: [
        { icon: 'layers', label: 'Two subnets are defined' },
        { icon: 'globe', label: 'Only one is exposed to the internet' },
        { icon: 'database', label: 'Databases live in the private one' },
        { icon: 'lock', label: 'Rules allow exactly one path between them' },
      ],
      note: 'Subnets are the simplest way to draw a boundary that is hard to cross by accident.',
    },
  },

  'osi-model': {
    mapping: {
      title: 'Seven layers, one problem each',
      pairs: [
        { icon: 'plug', analogy: 'Cables and signals', reality: 'the physical layer' },
        { icon: 'network', analogy: 'Addresses and routes', reality: 'the network layer, where IP lives' },
        { icon: 'send', analogy: 'Reliable delivery', reality: 'the transport layer, where TCP lives' },
        { icon: 'monitor', analogy: 'What the app actually does', reality: 'the application layer, where HTTP lives' },
      ],
    },
    scenario: {
      title: 'Debugging a broken connection',
      steps: [
        { icon: 'plug', label: 'Is the cable or wifi up?', note: 'layer one' },
        { icon: 'route', label: 'Can you ping the address?', note: 'layer three' },
        { icon: 'plug', label: 'Is the port open?', note: 'layer four' },
        { icon: 'monitor', label: 'Does the request return the right answer?', note: 'layer seven' },
      ],
      note: 'You rarely need all seven names — but working upward beats guessing.',
    },
  },
}
