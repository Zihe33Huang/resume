import { motion as Motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function SkillBar({ skill }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <Motion.div
          className="h-full rounded-full bg-gradient-to-r from-azure via-mint to-coral"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default SkillBar
