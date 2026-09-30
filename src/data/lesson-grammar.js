/**
 * Lesson grammar — the deterministic bridge between the prose in a concept and
 * the visual lesson on its page.
 *
 * Nothing here is fetched or generated at runtime: it is a small set of
 * keyword rules that turn a plain sentence such as
 *   “The frontend creates a request to an endpoint.”
 * into a tiny visual unit:
 *   { icon: 'send', title: 'Request', text: 'The frontend creates …' }
 *
 * Because it is deterministic, all 253 concepts get an icon and a short title
 * on every “How does it work?” step without hand-writing 1,265 of them. The
 * authored lesson content in src/data/lessons-*.js overrides this whenever it
 * says something better.
 */

/** Ordered keyword buckets: the first match wins, so specific beats general. */
const STEP_BUCKETS = [
  { icon: 'rocket', title: 'Deploy', match: /\b(deploy\w*|release[sd]?|shipp(?:ed|ing)?|roll(?:s|ed)? out|goes? live|go live|promot\w+)\b/i },
  { icon: 'puzzle', title: 'Build', match: /\b(build|built|builds|compile[sd]?|transpil\w+|bundl\w+|assembl\w+|construct\w+)\b/i },
  { icon: 'checkCircle', title: 'Check', match: /\b(check\w*|verif\w+|validat\w+|test\w*|assert\w+|audit\w*|review\w*|inspect\w+)\b/i },
  { icon: 'lock', title: 'Security', match: /\b(log ?in|sign ?in|password\w*|credential\w*|authenticat\w+|authoris\w+|authoriz\w+|permission\w*|token\w*|encrypt\w*|decrypt\w*|secure[sd]?|security|certificate\w*|hash\w*|mfa|pin|signed in|signs? in)\b/i },
  { icon: 'zap', title: 'Speed', match: /\b(cach\w+|in advance|reuse\w*|instantly|instant|faster|speeds? up|immediately|zero delay|pre-?comput\w+)\b/i },
  { icon: 'target', title: 'Action', match: /\b(click\w*|tap\w*|taps|typ\w+ (?:in|a|the|it)|choos\w+|select\w+|press\w+|enters?|perform\w*|action|asks? for)\b/i },
  { icon: 'monitor', title: 'Screen', match: /\b(browser|page|screen|display\w*|shown|show\w*|renders?|rendering|appears?|visibl\w+|interface|the app|opens? (?:the )?(?:app|page|site|website)|website)\b/i },
  { icon: 'fileCode', title: 'Read', match: /\b(reads?|reading|loads?|loading|parses?|parsing|scans?|interprets? the)\b/i },
  { icon: 'send', title: 'Output', match: /\b(emits?|outputs?|produces?|generates?|yields?|prints?)\b/i },
  { icon: 'send', title: 'Request', match: /\b(request\w*|send\w*|sent|submit\w*|upload\w*|call\w*|calls|invoke\w*|emit\w*|transmit\w+)\b/i },
  { icon: 'download', title: 'Response', match: /\b(response\w*|responds?|repl(?:y|ies|ied)|returns? (?:the|a|an|it|them|its|data|results?|value|output|response|rows?|control)\b|receiv\w+|comes? back|sends? back|hands? back|arriv\w+|answer\w*|result\w*|deliver\w*)\b/i },
  { icon: 'cog', title: 'Processing', match: /\b(process\w*|handle[sd]?|handling|comput\w+|calculat\w+|execut\w+|worked? on|digest\w+|interpret\w+|transforms?|converts?|turns? .{0,28}?into|work(s|ing)? (?:out|on|through))\b/i },
  { icon: 'database', title: 'Storage', match: /\b(database\w*|stores?|storing|stored|saves?|saved|saving|persist\w+|records?|tables?|rows?|columns?|insert\w+|keep[s]? (?:a|the) copy)\b/i },
  { icon: 'search', title: 'Lookup', match: /\b(look ?up|looks up|search\w*|find\w*|fetch\w+|retriev\w+|quer(?:y|ies)|resolv\w+|matches?|match\w+)\b/i },
  { icon: 'network', title: 'Network', match: /\b(network\w*|internet|travel\w*|over the wire|packets?|rout\w+|addresse\w*|addressing|dns|subnet\w*|connection\w*|connect\w+|link\w*|wireless|wire|cable\w*)\b/i },
  { icon: 'server', title: 'Server', match: /\b(server\w*|back-?end|services?|machines?|hosts?|hosting|data ?cent(?:re|er)\w*|infrastructure|cluster\w*)\b/i },
  { icon: 'folder', title: 'Files', match: /\b(files?|folders?|document\w*|images?|assets?|photos?|videos?|uploads?)\b/i },
  { icon: 'box', title: 'Packaging', match: /\b(containers?|container images?|packages?|packaging|packaged|wraps?|wrapped|binaries)\b/i },
  { icon: 'cog', title: 'Setup', match: /\b(configur\w+|set ?up|settings?|install\w+|define[sd]?|declar\w+|register\w+|initiali[sz]\w+|starts?|starting|begins?|turns? on|switch\w* on)\b/i },
  { icon: 'chart', title: 'Scaling', match: /\b(scal\w+|grow\w*|more traffic|adds? more|replicat\w+|duplicate\w+|extra copies|spread\w* (?:the )?(?:load|traffic))\b/i },
  { icon: 'chart', title: 'Monitoring', match: /\b(monitor\w*|track\w*|logs?|logging|measur\w+|observ\w+|reports?|watch\w*|metrics?|alerts?)\b/i },
  { icon: 'clock', title: 'Timing', match: /\b(schedule\w+|every (?:few )?(?:seconds?|minutes?|hours?|days?|weeks?|nights?)|cron|timeouts?|waits?|delay\w+|periodic\w+|regular\w+|later)\b/i },
  { icon: 'alert', title: 'Failure', match: /\b(fail\w*|errors?|crash\w*|goes? wrong|is broken(?! into)|breaks?|problems?|is down|dropped|rejects?|blocks?|denie[sd]|denied|refus\w+|outage\w*|downtime)\b/i },
  { icon: 'scale', title: 'Rules', match: /\b(rules?|polic(?:y|ies)|limits?|standards?|requires?|requirement\w*|must|allows?|bounds?|threshold\w*)\b/i },
  { icon: 'cycle', title: 'Change', match: /\b(chang\w+|updat\w+|modif\w+|edit\w*|revis\w+|rewrit\w+|refactor\w*|new version)\b/i },
  { icon: 'gitBranch', title: 'History', match: /\b(version\w*|history|commits?|branch\w*|snapshot\w*|merg\w+)\b/i },
  { icon: 'flow', title: 'Queue', match: /\b(queues?|messages?|events?|jobs?|tasks?|workers?)\b/i },
  { icon: 'cloud', title: 'Cloud', match: /\b(cloud|regions?|tenants?|availability zone\w*)\b/i },
  { icon: 'coin', title: 'Cost', match: /\b(costs?|prices?|bills?|pay\w*|budget\w*|charges?|spend\w*|expensive)\b/i },
  { icon: 'table', title: 'Data', match: /\b(data|information|content|values?|numbers?|text|records?|figures?)\b/i },
  { icon: 'users', title: 'People', match: /\b(users?|customers?|people|visitors?|someone|teams?|developers?|engineers?|members?|staff|shoppers?)\b/i },
  { icon: 'book', title: 'Document', match: /\b(document\w*|notes?|describes?|described|writes? (?:it|this|them) down|writ(?:ten|ing) down)\b/i },
]

/**
 * Words that make a poor headline on their own. “Without the key …” must not
 * become a step called “Without”, so a lone weak word is replaced by the
 * opening phrase of the sentence instead.
 */
const WEAK_HEADLINES = new Set([
  'without', 'work', 'works', 'people', 'turns', 'adds', 'uses', 'gets', 'makes', 'takes',
  'puts', 'keeps', 'gives', 'runs', 'holds', 'stays', 'becomes', 'itself', 'other', 'same',
  'part', 'parts', 'way', 'thing', 'things', 'sets', 'comes', 'goes', 'does', 'did', 'has',
])

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'you', 'your', 'it', 'its', 'they', 'their', 'this', 'that', 'these', 'those',
  'to', 'of', 'and', 'or', 'in', 'into', 'on', 'for', 'with', 'when', 'as', 'is', 'are', 'be',
  'can', 'may', 'will', 'then', 'so', 'if', 'each', 'every', 'from', 'at', 'by', 'more', 'most',
  'one', 'two', 'all', 'some', 'any', 'there', 'here', 'once', 'while', 'before', 'after', 'also',
  'what', 'how', 'why', 'which', 'who', 'now', 'then', 'just', 'still', 'already', 'than', 'not',
])

/**
 * A short, grammatical headline pulled straight from the sentence itself.
 * Normally it stops at the first joining word, which reads best. `skipStops`
 * instead carries on past them, which is how a second, more specific headline
 * is found when the natural one is already taken by an earlier step.
 */
function headlineFrom(text, maxWords = 3, skipStops = false) {
  const words = String(text || '').replace(/[.,;:!?].*$/, '').split(/\s+/).filter(Boolean)
  const picked = []
  for (const word of words) {
    const bare = word.toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (!bare) continue
    if (STOP_WORDS.has(bare)) {
      if (picked.length === 0 || !skipStops) {
        if (picked.length === 0) continue
        break
      }
      continue
    }
    picked.push(word)
    if (picked.length >= maxWords) break
  }
  if (!picked.length) return null
  const joined = picked.join(' ')
  return joined.charAt(0).toUpperCase() + joined.slice(1)
}

/** Shorten a sentence to its first few words, for tight visual labels. */
export function shorten(text, maxWords = 9) {
  const words = String(text || '').trim().split(/\s+/)
  if (words.length <= maxWords) return String(text || '').trim()
  return `${words.slice(0, maxWords).join(' ')}…`
}

/**
 * Turn one “how it works” sentence into an icon, a short title and the text.
 * `used` holds titles already shown on this concept so two steps in a row do
 * not both read “Request”.
 */
export function describeStep(step, used) {
  const matches = STEP_BUCKETS.filter((bucket) => bucket.match.test(step))
  const bucket = matches.find((candidate) => !used?.has(candidate.title)) || matches[0]
  if (bucket && !used?.has(bucket.title)) {
    used.add(bucket.title)
    return { icon: bucket.icon, title: bucket.title, text: step }
  }
  // The bucket title is already on this concept, so fall back to the step's own
  // words — otherwise two steps in a row both read “Data”. The second attempt
  // reaches past the joining words, so “The screen now reflects the new state.”
  // becomes “Screen reflects new” rather than another “Screen”.
  const natural = headlineFrom(step, 2)
  const longer = headlineFrom(step, 3, true)
  // A lone weak word reads like a bug next to the other step titles, so open
  // with the sentence's own first few words instead.
  const phrase =
    natural && !natural.includes(' ') && WEAK_HEADLINES.has(natural.toLowerCase())
      ? (() => {
          // Drop any opening pronoun first, or “It turns the code …” headlines
          // as “It turns the”.
          const words = String(step).replace(/[.,;:!?].*$/, '').split(/\s+/).filter(Boolean)
          while (words.length && STOP_WORDS.has(words[0].toLowerCase().replace(/[^a-z0-9-]/g, '')))
            words.shift()
          const picked = words.slice(0, 3).join(' ')
          return picked ? picked.charAt(0).toUpperCase() + picked.slice(1) : null
        })()
      : null
  const candidates = [phrase, natural, longer, bucket?.title, 'Detail'].filter(Boolean)
  const title = candidates.find((candidate) => !used?.has(candidate)) || candidates[0]
  used?.add(title)
  return { icon: bucket?.icon || 'flow', title, text: step }
}

/** The whole “how it works” list, as visual units. */
export function describeSteps(steps = []) {
  const used = new Set()
  return steps.map((step) => describeStep(step, used))
}

/**
 * A one-line reading of a diagram: “Code → Commit → Branch → Merge”. It gives
 * the hero visual a sentence the eye can follow.
 */
export function readingOf(visual) {
  const nodes = visual?.nodes || visual?.items || visual?.satellites || []
  const labels = nodes.map((node) => node.label).filter(Boolean)
  if (labels.length < 2) return null
  return labels.join(' → ')
}

/* ------------------------------------------------------------------ */
/* “Where is it used?” cards                                           */
/* ------------------------------------------------------------------ */

const WHERE_ICONS = [
  { icon: 'coin', match: /\b(bank\w*|money|payment\w*|transactions?|financ\w+|checkout|invoice\w*)\b/i },
  { icon: 'box', match: /\b(e-?commerce|shops?|shopping|retail|stores?|orders?|marketplace\w*)\b/i },
  { icon: 'target', match: /\b(games?|gaming|play\w*|entertainment)\b/i },
  { icon: 'users', match: /\b(social|teams?|collaborat\w+|communities|chats?|messag\w+|support|people|friends)\b/i },
  { icon: 'smartphone', match: /\b(mobile|phones?|tablets?|apps|devices?|wearables?|smart ?home)\b/i },
  { icon: 'monitor', match: /\b(websites?|web apps?|browsers?|dashboards?|streaming|video|media|screens?|portals?)\b/i },
  { icon: 'search', match: /\b(search\w*|recommend\w+|rank\w+|discover\w*|matching)\b/i },
  { icon: 'chart', match: /\b(analytics?|reports?|metrics?|monitor\w+|tracking|insights?|statistics)\b/i },
  { icon: 'lock', match: /\b(logins?|accounts?|passwords?|identit\w+|auth\w*|permissions?|access)\b/i },
  { icon: 'cloud', match: /\b(cloud|hosting|serverless|storage|backups?|infrastructure|servers?)\b/i },
  { icon: 'database', match: /\b(databases?|data\b|records?|warehouse\w*|reports?)\b/i },
  { icon: 'building', match: /\b(compan\w+|business\w*|enterprise\w*|workplaces?|offices?|organisation\w*|organization\w*|industr\w+)\b/i },
  { icon: 'fileCode', match: /\b(code|develop\w+|programming|software|projects?|apps? building|engineering)\b/i },
  { icon: 'globe', match: /\b(global|worldwide|countries|international|travel|maps?|locations?|anywhere)\b/i },
  { icon: 'book', match: /\b(education|schools?|learning|students?|research|knowledge|documentation)\b/i },
  { icon: 'route', match: /\b(delivery|logistics|transport|routes?|shipping|rides?|booking\w*|logistics)\b/i },
  { icon: 'network', match: /\b(network\w*|internet|connections?|protocol\w*|devices? talking)\b/i },
  { icon: 'clock', match: /\b(real ?time|streaming|live|instant\w*|every day|continuous\w*)\b/i },
  { icon: 'shieldCheck', match: /\b(security|privacy|safety|fraud|compliance|protection|threats?)\b/i },
  { icon: 'bulb', match: /\b(ai\b|machine learning|smart|intelligen\w+|predict\w+|recommend\w+)\b/i },
]

/** Pick an icon for a “where is it used?” item, falling back to a rotation. */
export function whereIcon(item, index = 0) {
  const fallback = ['building', 'users', 'box', 'globe', 'cog', 'smartphone', 'server', 'zap']
  const hit = WHERE_ICONS.find((entry) => entry.match.test(item))
  return hit ? hit.icon : fallback[index % fallback.length]
}

/**
 * Split “Product search, checkout and orders.” into a headline and a note so the
 * card reads like a small poster instead of a line of text.
 */
export function whereCard(item) {
  const text = String(item || '').trim().replace(/\.$/, '')
  const comma = text.indexOf(', ')
  if (comma > 0) {
    const head = text.slice(0, comma).trim()
    const rest = text.slice(comma + 2).trim()
    const headWords = head.split(/\s+/).filter(Boolean).length
    if (headWords <= 4 && head.length <= 34 && rest.length > 4) {
      return { title: head, note: rest.charAt(0).toUpperCase() + rest.slice(1) }
    }
  }
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= 3) return { title: text, note: null }
  return { title: text, note: null, long: true }
}

/* ------------------------------------------------------------------ */
/* Analogies and short “in a nutshell” flows                           */
/* ------------------------------------------------------------------ */

/**
 * A tiny icon for the analogy panel, guessed from the thing the analogy
 * compares the concept to.
 */
export function analogyIcon(analogy, fallback = 'bulb') {
  const n = String(analogy || '').toLowerCase()
  if (/(restaurant|kitchen|waiter|menu|recipe|chef)/.test(n)) return 'box'
  if (/(library|librar|books?|dictionary|encyclopedia)/.test(n)) return 'book'
  if (/(mail|letter|envelope|post|parcel|delivery)/.test(n)) return 'send'
  if (/(highway|road|traffic|motorway|route|postal)/.test(n)) return 'route'
  if (/(suitcase|packing|luggage|shipping container|moving house)/.test(n)) return 'box'
  if (/(switchboard|telephone|phone call|operator)/.test(n)) return 'plug'
  if (/(warehouse|shelf|boxes|storeroom|filing cabinet|drawer)/.test(n)) return 'database'
  if (/(gate|doorman|bouncer|security guard|key|lock)/.test(n)) return 'lock'
  if (/(recipe|chef|cooking|kitchen)/.test(n)) return 'puzzle'
  if (/(map|address book|phone book|directory)/.test(n)) return 'globe'
  if (/(factory|assembly line|machine|engine)/.test(n)) return 'cog'
  if (/(team|staff|employees|coworkers|colleagues|crew)/.test(n)) return 'users'
  if (/(water|electricity|utility|pipe|plumbing)/.test(n)) return 'plug'
  if (/(save ?point|game|checkpoint)/.test(n)) return 'target'
  if (/(filing|folder|cabinet|notebook|notepad|scribble)/.test(n)) return 'folder'
  if (/(newsletter|newspaper|magazine|article)/.test(n)) return 'fileCode'
  return fallback
}

/**
 * The three-stop summary used beside “What is it?” — start, middle and end of
 * the process, with the derived visual titles so it reads in one glance.
 */
export function shortFlow(concept) {
  const steps = describeSteps(concept?.howItWorks || [])
  if (steps.length < 3) return null
  const picks = [steps[0], steps[Math.floor((steps.length - 1) / 2)], steps[steps.length - 1]]
  return picks.map((step, index) => ({
    icon: step.icon,
    text: shorten(step.text, 9),
    stage: ['Starts with', 'Then', 'Ends with'][index],
  }))
}
