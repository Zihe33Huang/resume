import { motion as Motion } from 'framer-motion'

function Loader() {
  return (
    <Motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slateNight"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
    >
      <div className="relative">
        <Motion.div
          className="h-24 w-24 rounded-full border border-white/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'linear' }}
        />
        <Motion.div
          className="absolute inset-2 rounded-full border border-azure/80"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <Motion.span
          className="absolute inset-0 grid place-content-center font-heading text-sm tracking-[0.25em] text-white/90"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          LOAD
        </Motion.span>
      </div>
    </Motion.div>
  )
}

export default Loader
