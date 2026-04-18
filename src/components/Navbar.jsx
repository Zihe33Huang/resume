import { motion as Motion } from 'framer-motion'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ active, onThemeToggle, theme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-8">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-glass backdrop-blur-xl">
        <a href="#hero" className="font-heading text-sm font-semibold tracking-[0.25em] text-white">
          ZH
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="relative block rounded-full px-3 py-2 text-sm text-white/70 transition hover:text-white">
                {active === item.id ? (
                  <Motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/15"
                    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                  />
                ) : null}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onThemeToggle}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 transition hover:bg-white/20"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
