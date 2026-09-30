/**
 * The eleven TechXplain categories.
 * `color` is a plain hex accent used for inline tints/dots so we never rely on
 * dynamic Tailwind class names (which can't be generated at build time).
 *
 * Every accent is a bright, saturated green — the whole site is green, so the
 * categories are told apart by hue (lime → emerald → teal) rather than by a
 * different colour family. Each one is checked to stay legible: at least 3:1
 * as an icon on the canvas and 4.5:1 under the deep-ink text used on the small
 * numbered badges. The category name is always shown beside the dot, so the
 * colour is decoration, never the only signal.
 */
export const categories = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'fileCode',
    color: '#259d39',
    description: 'The languages, tools and ideas behind writing software.',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    icon: 'window',
    color: '#1d99a5',
    description: 'How websites and web apps are built and shown in a browser.',
  },
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'monitor',
    color: '#259d57',
    description: 'Everything the user sees and touches in the browser.',
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'server',
    color: '#519c1c',
    description: 'The servers, logic and APIs that run behind the scenes.',
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'database',
    color: '#259d71',
    description: 'Where applications store and find data reliably.',
  },
  {
    id: 'ai-machine-learning',
    name: 'AI & Machine Learning',
    icon: 'brain',
    color: '#739523',
    description: 'Systems that learn from data and generate useful output.',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: 'cloud',
    color: '#239591',
    description: 'Renting someone else\'s computers over the internet.',
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: 'cog',
    color: '#259d49',
    description: 'Shipping and running software without breaking it.',
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: 'network',
    color: '#1c9c8b',
    description: 'How devices find each other and exchange data.',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'shieldCheck',
    color: '#2a9d1f',
    description: 'Keeping systems, data and people safe from attackers.',
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    icon: 'layers',
    color: '#259d7f',
    description: 'Practices that keep software maintainable as it grows.',
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))

export const getCategory = (id) => categoryById[id] || null
