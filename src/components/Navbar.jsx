import { motion as Motion } from 'framer-motion'

const navItems = ['hero', 'about', 'resume', 'projects', 'contact']

function Navbar({ active, onThemeToggle, onLanguageToggle, theme, languageLabel, navLabels }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-8">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-glass backdrop-blur-xl">
        <a href="#hero" className="font-heading text-sm font-semibold tracking-[0.25em] text-white">
          ZH
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="relative block rounded-full px-3 py-2 text-sm text-white/70 transition hover:text-white">
                {active === item ? (
                  <Motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/15"
                    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                  />
                ) : null}
                {navLabels[item]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 transition hover:bg-white/20"
          >
            {languageLabel}
          </button>
          <button
            type="button"
            onClick={onThemeToggle}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 transition hover:bg-white/20"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
