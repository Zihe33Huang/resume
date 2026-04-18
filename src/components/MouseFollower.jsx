import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

function MouseFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 180, damping: 22 })
  const smoothY = useSpring(y, { stiffness: 180, damping: 22 })

  useEffect(() => {
    const update = (event) => {
      x.set(event.clientX - 80)
      y.set(event.clientY - 80)
    }

    window.addEventListener('mousemove', update)
    return () => window.removeEventListener('mousemove', update)
  }, [x, y])

  return (
    <Motion.div
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.24)_0%,rgba(0,210,255,0)_70%)] blur-sm md:block"
      aria-hidden
    />
  )
}

export default MouseFollower
