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
  localeText,
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

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const storedLanguage = window.localStorage.getItem('language')
  if (storedLanguage === 'zh' || storedLanguage === 'en') return storedLanguage
  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const pickText = (value, language) => (typeof value === 'string' ? value : value[language])

function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [projectFilter, setProjectFilter] = useState('all')
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)
  const text = localeText[language]

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
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title =
      language === 'zh'
        ? 'Zihe Huang | 高端个人简历官网'
        : 'Zihe Huang | Premium Resume Portfolio'
  }, [language])

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
    () => ['all', ...new Set(projects.map((item) => item.category))],
    []
  )

  const localizedQuickStats = useMemo(
    () => quickStats.map((stat) => ({ ...stat, label: pickText(stat.label, language) })),
    [language]
  )

  const localizedExperiences = useMemo(
    () =>
      experiences.map((item) => ({
        ...item,
        role: pickText(item.role, language),
        company: pickText(item.company, language),
        details: pickText(item.details, language),
      })),
    [language]
  )

  const localizedEducation = useMemo(
    () =>
      education.map((item) => ({
        ...item,
        major: pickText(item.major, language),
        school: pickText(item.school, language),
      })),
    [language]
  )

  const localizedCertificates = useMemo(
    () => certificates.map((item) => pickText(item, language)),
    [language]
  )

  const localizedSkills = useMemo(
    () =>
      skills.map((item) => ({
        ...item,
        name: pickText(item.name, language),
      })),
    [language]
  )

  const localizedProjects = useMemo(
    () =>
      projects.map((item) => ({
        ...item,
        title: pickText(item.title, language),
        categoryLabel: text.projectCategories[item.category],
        summary: pickText(item.summary, language),
      })),
    [language, text.projectCategories]
  )

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return localizedProjects
    return localizedProjects.filter((project) => project.category === projectFilter)
  }, [localizedProjects, projectFilter])

  const onThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    window.localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const onLanguageToggle = () => {
    const next = language === 'zh' ? 'en' : 'zh'
    setLanguage(next)
    window.localStorage.setItem('language', next)
  }

  const onDownloadResume = async () => {
    const { downloadResumePdf } = await import('./utils/downloadResumePdf')
    downloadResumePdf(
      {
        ...profile,
        title: pickText(profile.title, language),
        location: pickText(profile.location, language),
      },
      localizedSkills,
      localizedExperiences,
      localizedProjects,
      language
    )
  }

  return (
    <>
      <AnimatePresence>{loading ? <Loader /> : null}</AnimatePresence>

      <div className="relative min-h-screen overflow-x-clip bg-[#f3f8ff] text-slate-900 transition-colors duration-500 dark:bg-slateNight dark:text-white">
        <ParticleBackground />
        <MouseFollower />
        <Navbar
          active={activeSection}
          onThemeToggle={onThemeToggle}
          onLanguageToggle={onLanguageToggle}
          theme={theme}
          languageLabel={text.language}
          navLabels={text.nav}
        />

        <main className="relative z-10">
          <section id="hero" className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 pb-16 pt-36 md:px-8">
            <div className="grid w-full gap-10 md:grid-cols-[1.15fr_0.85fr]">
              <Motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="inline-block rounded-full border border-slate-300/60 bg-white/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-700 dark:border-white/30 dark:bg-white/10 dark:text-white/70">
                  {text.heroBadge}
                </p>
                <h1 className="mt-6 font-heading text-4xl leading-tight md:text-6xl">
                  {profile.name}
                  <span className="mt-3 block bg-gradient-to-r from-azure via-mint to-coral bg-clip-text text-3xl text-transparent md:text-5xl">
                    {pickText(profile.title, language)}
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 dark:text-white/72">{pickText(profile.intro, language)}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90"
                  >
                    {text.viewProjects}
                  </a>
                  <button
                    type="button"
                    onClick={onDownloadResume}
                    className="rounded-full border border-slate-400/50 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-900 hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                  >
                    {text.downloadResume}
                  </button>
                </div>
              </Motion.div>

              <Motion.div
                className="rounded-3xl border border-slate-300/60 bg-white/50 p-6 shadow-glass backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <p className="text-sm text-slate-600 dark:text-white/70">{pickText(profile.location, language)}</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
                  {localizedQuickStats.map((stat) => (
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
              <p className="section-eyebrow">{text.aboutEyebrow}</p>
              <h2 className="section-title">{text.aboutTitle}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-white/75">{text.aboutBody}</p>
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
            <p className="section-eyebrow">{text.resumeEyebrow}</p>
            <h2 className="section-title">{text.resumeTitle}</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="space-y-5">
                {localizedExperiences.map((item, index) => (
                  <Motion.article
                    key={`${item.period}-${item.company}`}
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
                  <h3 className="font-heading text-xl text-slate-900 dark:text-white">{text.educationCert}</h3>
                  {localizedEducation.map((item) => (
                    <p key={item.school} className="mt-3 text-sm text-slate-700 dark:text-white/75">
                      {item.period} · {item.major} · {item.school}
                    </p>
                  ))}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {localizedCertificates.map((item) => (
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
                <h3 className="font-heading text-xl text-slate-900 dark:text-white">{text.skillSystem}</h3>
                {localizedSkills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </Motion.div>
            </div>
          </section>

          <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
            <p className="section-eyebrow">{text.projectsEyebrow}</p>
            <h2 className="section-title">{text.projectsTitle}</h2>
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
                  {text.projectCategories[category]}
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} liveDemoLabel={text.liveDemo} />
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
              <p className="section-eyebrow mx-auto w-fit">{text.contactEyebrow}</p>
              <h2 className="mt-4 font-heading text-3xl text-slate-900 dark:text-white md:text-4xl">{text.contactTitle}</h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-700 dark:text-white/75">{text.contactBody}</p>
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
