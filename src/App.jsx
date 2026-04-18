import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Loader from './components/Loader'
import MouseFollower from './components/MouseFollower'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import ProjectCard from './components/ProjectCard'
import SkillBar from './components/SkillBar'
import {
  certificates,
  education,
  experiences,
  profile,
  projects,
  quickStats,
  skills,
} from './data/profile'

const sectionIds = ['hero', 'about', 'resume', 'projects', 'contact']
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme) return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [projectFilter, setProjectFilter] = useState('All')
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (window.localStorage.getItem('theme')) return undefined

    const onSystemThemeChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', onSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', onSystemThemeChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.42 }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((item) => item.category))],
    []
  )

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') return projects
    return projects.filter((project) => project.category === projectFilter)
  }, [projectFilter])

  const onThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    window.localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const onDownloadResume = async () => {
    const { downloadResumePdf } = await import('./utils/downloadResumePdf')
    downloadResumePdf(profile, skills, experiences, projects)
  }

  return (
    <>
      <AnimatePresence>{loading ? <Loader /> : null}</AnimatePresence>

      <div className="relative min-h-screen overflow-x-clip bg-[#f3f8ff] text-slate-900 transition-colors duration-500 dark:bg-slateNight dark:text-white">
        <ParticleBackground />
        <MouseFollower />
        <Navbar active={activeSection} onThemeToggle={onThemeToggle} theme={theme} />

        <main className="relative z-10">
          <section id="hero" className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 pb-16 pt-36 md:px-8">
            <div className="grid w-full gap-10 md:grid-cols-[1.15fr_0.85fr]">
              <Motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="inline-block rounded-full border border-slate-300/60 bg-white/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-700 dark:border-white/30 dark:bg-white/10 dark:text-white/70">
                  Available for Impact Projects
                </p>
                <h1 className="mt-6 font-heading text-4xl leading-tight md:text-6xl">
                  {profile.name}
                  <span className="mt-3 block bg-gradient-to-r from-azure via-mint to-coral bg-clip-text text-3xl text-transparent md:text-5xl">
                    {profile.title}
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 dark:text-white/72">{profile.intro}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90"
                  >
                    View Projects
                  </a>
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className="rounded-full border border-slate-400/50 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-900 hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                  >
                    Download Resume PDF
                  </button>
                </div>
              </Motion.div>

              <Motion.div
                className="rounded-3xl border border-slate-300/60 bg-white/50 p-6 shadow-glass backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <p className="text-sm text-slate-600 dark:text-white/70">{profile.location}</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-300/55 bg-white/60 p-4 dark:border-white/15 dark:bg-white/5">
                      <p className="text-3xl font-heading text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-600 dark:text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Motion.div>
            </div>
          </section>

          <section id="about" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
            <Motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="glass-card"
            >
              <p className="section-eyebrow">About Me</p>
              <h2 className="section-title">Engineering with product intuition and visual polish.</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-white/75">
                I focus on turning complex business flows into clear, fast, and delightful experiences. I work from architecture to
                final interaction, ensuring performance, maintainability, and consistency across the stack.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-300/70 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-900 hover:text-white dark:border-white/25 dark:text-white dark:hover:bg-white/10"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </Motion.div>
          </section>

          <section id="resume" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
            <p className="section-eyebrow">Resume</p>
            <h2 className="section-title">Experience, education, and capability matrix.</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="space-y-5">
                {experiences.map((item, index) => (
                  <Motion.article
                    key={item.company}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="glass-card"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-600 dark:text-white/50">{item.period}</p>
                    <h3 className="mt-2 font-heading text-xl text-slate-900 dark:text-white">{item.role}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-white/75">{item.company}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-white/75">{item.details}</p>
                  </Motion.article>
                ))}
                <div className="glass-card">
                  <h3 className="font-heading text-xl text-slate-900 dark:text-white">Education & Certifications</h3>
                  {education.map((item) => (
                    <p key={item.school} className="mt-3 text-sm text-slate-700 dark:text-white/75">
                      {item.period} · {item.major} · {item.school}
                    </p>
                  ))}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {certificates.map((item) => (
                      <span key={item} className="rounded-full border border-slate-300/70 px-3 py-1 text-xs text-slate-700 dark:border-white/25 dark:text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="glass-card space-y-5"
              >
                <h3 className="font-heading text-xl text-slate-900 dark:text-white">Skill System</h3>
                {skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </Motion.div>
            </div>
          </section>

          <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
            <p className="section-eyebrow">Projects</p>
            <h2 className="section-title">Production-ready work with measurable outcomes.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setProjectFilter(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    projectFilter === category
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'border border-slate-300/70 text-slate-700 hover:bg-slate-900 hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section id="contact" className="mx-auto w-full max-w-6xl px-4 pb-24 pt-20 md:px-8">
            <Motion.div
              className="glass-card bg-mesh-gradient text-center"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
            >
              <p className="section-eyebrow mx-auto w-fit">Contact</p>
              <h2 className="mt-4 font-heading text-3xl text-slate-900 dark:text-white md:text-4xl">Let&apos;s build something exceptional.</h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-700 dark:text-white/75">
                Open to high-impact product, platform, and AI-enabled engineering collaborations.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-8 inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90"
              >
                {profile.email}
              </a>
            </Motion.div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App
