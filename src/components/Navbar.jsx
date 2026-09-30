import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/categories', label: 'Categories' },
]

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Close the mobile menu and reset the quick-search field on navigation.
  useEffect(() => {
    setMobileOpen(false)
    setQuery('')
  }, [location.pathname, location.search])

  const submitSearch = (event) => {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
  }

  const linkClass = ({ isActive }) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-mist text-forest'
        : 'text-muted hover:bg-mist/60 hover:text-forest'
    }`

  return (
    <header className="glass-strong sticky top-0 z-40 border-b border-hairline shadow-soft">
      <nav
        className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-4 px-5 sm:px-6"
        aria-label="Main"
      >
        <Logo />

        <div className="ml-4 hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <form onSubmit={submitSearch} className="ml-auto hidden w-72 md:block">
          <label className="glass flex items-center gap-2.5 rounded-full border border-hairline px-4 py-2.5 transition duration-200 focus-within:border-accent/60 focus-within:shadow-[0_0_0_4px_rgba(34,201,122,0.18)] hover:border-hairline-strong">
            <Icon name="search" className="h-4 w-4 shrink-0 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search concepts"
              aria-label="Search concepts"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none"
            />
          </label>
        </form>

        <NavLink
          to="/explore"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-mist hover:text-forest md:hidden"
          aria-label="Search concepts"
        >
          <Icon name="search" className="h-5 w-5" />
        </NavLink>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-mist hover:text-forest sm:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} className="h-5 w-5" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-hairline glass px-5 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-mist text-forest' : 'text-muted hover:bg-mist/60 hover:text-forest'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
