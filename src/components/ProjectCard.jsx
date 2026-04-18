import { motion as Motion } from 'framer-motion'

function ProjectCard({ project, index }) {
  return (
    <Motion.article
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-transform"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.015 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-x-0 -top-16 h-40 bg-[radial-gradient(circle,rgba(0,210,255,0.25)_0%,transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{project.category}</p>
      <h3 className="mt-2 font-heading text-2xl text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/70">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slateNight transition hover:bg-white/90"
        >
          Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          GitHub
        </a>
      </div>
    </Motion.article>
  )
}

export default ProjectCard
