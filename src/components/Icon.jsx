/**
 * Icon — one tiny monoline icon set for the whole app.
 * Hand-written SVG so the site stays dependency-free and offline-friendly.
 * Usage: <Icon name="cloud" className="h-5 w-5" />
 */

const ICONS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z" />
      <path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </>
  ),
  cloud: (
    <>
      <path d="M6.8 19a4.3 4.3 0 0 1-.5-8.6 6 6 0 0 1 11.5 1.3A3.6 3.6 0 0 1 17.4 19H6.8Z" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M9 20h6M12 17v3" />
    </>
  ),
  smartphone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5.2a2.9 2.9 0 0 0-5.6-.9 2.9 2.9 0 0 0-1.5 5.1A3 3 0 0 0 5 15.4a3 3 0 0 0 4 2.6 2.6 2.6 0 0 0 3-2.3V6.4" />
      <path d="M12 5.2a2.9 2.9 0 0 1 5.6-.9 2.9 2.9 0 0 1 1.5 5.1A3 3 0 0 1 19 15.4a3 3 0 0 1-4 2.6 2.6 2.6 0 0 1-3-2.3V6.4" />
      <path d="M12 5.2V21" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.7 3.9 5.8 3.9 9S14.6 18.3 12 21c-2.6-2.7-3.9-5.8-3.9-9S9.4 5.7 12 3Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.2a4 4 0 0 1 8 0V10" />
      <path d="M12 14v2.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="16" r="3.6" />
      <path d="M10.6 13.4 20 4M18 6l2 2M15.4 8.6l2 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 6v6c0 4.5-2.9 8-7 9.3C7.9 20 5 16.5 5 12V6l7-2.8Z" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3.2 19 6v6c0 4.5-2.9 8-7 9.3C7.9 20 5 16.5 5 12V6l7-2.8Z" />
      <path d="m9.2 11.8 2 2 3.6-3.6" />
    </>
  ),
  gitBranch: (
    <>
      <circle cx="6.5" cy="6" r="2.5" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="8" r="2.5" />
      <path d="M6.5 8.5v7" />
      <path d="M15.2 9.1A5.5 5.5 0 0 1 11 15H6.5" />
    </>
  ),
  gitCommit: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M3 12h5.5M15.5 12H21" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
      <path d="m4.3 7.3 7.7 3.9 7.7-3.9M12 11.2V21" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.4L12 11.8 3.5 7.4 12 3Z" />
      <path d="m4 12 8 4.2 8-4.2" />
      <path d="m4 16.2 8 4.1 8-4.1" />
    </>
  ),
  zap: (
    <>
      <path d="M13.5 2.5 5.5 13h5l-1 8.5L18 10h-5l.5-7.5Z" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0" />
      <path d="M6 12.6a9 9 0 0 1 12 0" />
      <path d="M9.3 16.1a4.4 4.4 0 0 1 5.4 0" />
      <path d="M12 19.5h.01" />
    </>
  ),
  book: (
    <>
      <path d="M4.5 4.5h6a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H4.5V4.5Z" />
      <path d="M19.5 4.5h-6a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5h6.5V4.5Z" />
    </>
  ),
  package: (
    <>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M4 8l8 4.5L20 8M12 12.5v8" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M4.2 7.5l1.9 1.1M17.9 15.4l1.9 1.1M4.2 16.5l1.9-1.1M17.9 8.6l1.9-1.1" />
    </>
  ),
  network: (
    <>
      <rect x="9.5" y="2.5" width="5" height="5" rx="1.5" />
      <rect x="2.5" y="16.5" width="5" height="5" rx="1.5" />
      <rect x="16.5" y="16.5" width="5" height="5" rx="1.5" />
      <path d="M12 7.5v4.2M7.5 16.5v-2.3h9v2.3M12 11.7v2.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V7M17 20v-9" />
    </>
  ),
  bug: (
    <>
      <rect x="7.5" y="7.5" width="9" height="12" rx="4.5" />
      <path d="M9 7.5a3 3 0 0 1 6 0M3.5 11H6M18 11h2.5M3.5 16H6M18 16h2.5M12 7.5V4" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3.5a6 6 0 0 1 3.6 10.8c-.5.4-.8 1-.8 1.6v.6h-5.6v-.6c0-.6-.3-1.2-.8-1.6A6 6 0 0 1 12 3.5Z" />
      <path d="M10 19.5h4M10.8 21.5h2.4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12.4 2.6 2.6 5-5.4" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" />
    </>
  ),
  cycle: (
    <>
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9" />
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9" />
      <path d="M18.6 2.6v3.9h-3.9M5.4 21.4v-3.9h3.9" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M17.5 20a6 6 0 0 0-2.2-4.6" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="m16 13.5 2 2 3.5-3.5" />
    </>
  ),
  flow: (
    <>
      <rect x="2.5" y="9" width="6" height="6" rx="2" />
      <rect x="15.5" y="9" width="6" height="6" rx="2" />
      <path d="M8.5 12h7" />
      <path d="m13.5 10 2 2-2 2" />
    </>
  ),
  hash: (
    <>
      <path d="M9.5 3.5 7.5 20.5M16.5 3.5l-2 17M3.5 8.5h17M3.5 15.5h17" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 2.6 17.4A2 2 0 0 0 4.3 20.4h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v5M12 17.2h.01" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.8a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1.2 1.2" />
      <path d="M14 10.2a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1.2-1.2" />
    </>
  ),
  hardDrive: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 12h19" />
      <path d="M17.5 15.8h1.5M6.5 9h4" />
    </>
  ),
  window: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.8h19" />
      <path d="M6 6.5h.01M8.6 6.5h.01" />
    </>
  ),
  fileCode: (
    <>
      <path d="M13.5 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="m10.2 13-1.8 2 1.8 2M13.8 13l1.8 2-1.8 2" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6h5.2a3.3 3.3 0 0 1 0 6.6H10a3.3 3.3 0 0 0 0 3.4h5.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.9" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v6M15 3v6" />
      <path d="M6.5 9h11v2.5a5.5 5.5 0 0 1-11 0V9Z" />
      <path d="M12 17v4" />
    </>
  ),
  table: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M2.5 10h19M2.5 14.5h19M9 4.5v15" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M5 20h14" />
      <path d="M4 8h6l-3 6-3-6ZM14 8h6l-3 6-3-6Z" />
      <path d="M4 8l8-3 8 3" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 6.5A2 2 0 0 1 5.5 4.5h3.2l1.8 2.2h8A2 2 0 0 1 20.5 8.7v9.3a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V6.5Z" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12.2c0 4.1-3.8 7.4-8.5 7.4a9.9 9.9 0 0 1-2.6-.4L4.5 21l1.3-3.6A7 7 0 0 1 3.5 12.2c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z" />
      <path d="M9 12h.01M12 12h.01M15 12h.01" />
    </>
  ),
  send: (
    <>
      <path d="M20.5 3.5 3.5 10.2l6.6 2.5 2.5 6.6 8-15.8Z" />
      <path d="m10.1 12.7 4.4-4.4" />
    </>
  ),
  building: (
    <>
      <path d="M4.5 21V4.5A1.5 1.5 0 0 1 6 3h7.5A1.5 1.5 0 0 1 15 4.5V21" />
      <path d="M15 9.5h3.5A1.5 1.5 0 0 1 20 11v10M2.5 21h19" />
      <path d="M8 7h3.5M8 11h3.5M8 15h3.5" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 10 2.8 2.4L7 15m4.7.2h5" />
    </>
  ),
  puzzle: (
    <>
      <path d="M10 3.5h4v1.8a1.8 1.8 0 1 0 3.6 0V3.5h2.9v15.9a1.6 1.6 0 0 1-1.6 1.6H5.1a1.6 1.6 0 0 1-1.6-1.6V5.1a1.6 1.6 0 0 1 1.6-1.6H10Z" />
      <path d="M10 3.5h4v1.8a1.8 1.8 0 1 0 3.6 0V3.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  rocket: (
    <>
      <path d="M12.5 3.5c3.5 0 6.4 2.6 6.4 6.1 0 4.3-4.3 7.6-6.4 9.4-2.1-1.8-6.4-5.1-6.4-9.4 0-3.5 2.9-6.1 6.4-6.1Z" />
      <circle cx="12.5" cy="9.8" r="1.9" />
      <path d="M8.6 17.4 5.5 20.5M16.4 17.4l3.1 3.1M12.5 19v2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </>
  ),
  windowStack: (
    <>
      <rect x="2.5" y="3.5" width="15" height="11" rx="2" />
      <path d="M6.5 17.5h13a2 2 0 0 0 2-2V8" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
}

export const iconNames = Object.keys(ICONS)

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.75, style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name] || ICONS.sparkles}
    </svg>
  )
}
