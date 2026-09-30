import Icon from './Icon.jsx'

/**
 * HeroVisual — a small “technology ecosystem” diagram for the homepage.
 * It shows the shape of the site's world: a request moving through the stack,
 * with the pieces it depends on branching off. Built from divs and inline SVG,
 * so it stays crisp at every size and costs nothing to load.
 */
const chain = [
  { icon: 'userCheck', label: 'User', note: 'Taps a button' },
  { icon: 'monitor', label: 'Frontend', note: 'The screen they see' },
  { icon: 'plug', label: 'API', note: 'The request travels' },
  { icon: 'server', label: 'Backend', note: 'The rules are applied' },
]

const branches = [
  { icon: 'database', label: 'Database', note: 'Data is stored' },
  { icon: 'cloud', label: 'Cloud', note: 'Everything runs on it' },
]

export default function HeroVisual({ className = '' }) {
  return (
    <div className={`scene-3d relative ${className}`}>
      <div className="glass sheen lift-3d relative overflow-hidden rounded-card border border-hairline p-5 shadow-float sm:p-6">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Everything connects</p>
          <span className="grid h-7 w-7 place-items-center rounded-full glass-strong text-brand shadow-soft">
            <Icon name="flow" className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="mt-5">
          {chain.map((node, i) => (
            <div key={node.label} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <HeroNode {...node} highlight={i === chain.length - 1} />
              <Connector />
            </div>
          ))}

          <div className="grid gap-2 sm:grid-cols-2">
            {branches.map((node, i) => (
              <div
                key={node.label}
                className="animate-fade-up"
                style={{ animationDelay: `${(chain.length + i) * 70}ms` }}
              >
                <HeroNode {...node} subtle />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroNode({ icon, label, note, highlight = false, subtle = false }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 transition duration-300 ${
        highlight
          ? 'border-accent/35 bg-mist/80'
          : subtle
            ? 'border-hairline glass-strong'
            : 'border-hairline glass'
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
          highlight ? 'glass text-brand' : 'bg-mist text-brand'
        }`}
      >
        <Icon name={icon} className="h-[1.125rem] w-[1.125rem]" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-ink">{label}</span>
        <span className="block truncate text-xs text-muted">{note}</span>
      </span>
    </div>
  )
}

/** A short dashed line with an arrowhead, so the direction reads at a glance. */
function Connector() {
  return (
    <span className="flex h-6 items-center pl-[1.6rem]" aria-hidden="true">
      <svg viewBox="0 0 12 24" className="h-6 w-3" fill="none">
        <path
          className="animate-flow-dash"
          d="M6 1v16"
          stroke="#12b877"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="3 5"
        />
        <path
          d="m3.2 15.5 2.8 3.6 2.8-3.6"
          stroke="#12b877"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
