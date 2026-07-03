"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [progress, setProgress] = React.useState(0)
  const [isDone, setIsDone] = React.useState(false)
  const [status, setStatus] = React.useState("SYS_BOOT: Initializing...")

  React.useEffect(() => {
    document.body.style.overflow = "hidden"

    const statusSteps = [
      { prg: 12, text: "SYS_BOOT: Resolving package dependencies..." },
      { prg: 28, text: "SYS_BOOT: Mapping stylesheet tokens..." },
      { prg: 45, text: "SYS_GL: Compiling fragment shaders..." },
      { prg: 65, text: "SYS_GL: Linking 3D Coder vertex arrays..." },
      { prg: 80, text: "SYS_DOM: Reconciling virtual DOM tree..." },
      { prg: 95, text: "SYS_NET: Connecting to secure edge node..." },
      { prg: 100, text: "SYS_READY: Workspace established." },
    ]

    let currentProgress = 0
    const interval = setInterval(() => {
      // technical step increments
      const inc = Math.floor(Math.random() * 8) + 4
      currentProgress = Math.min(100, currentProgress + inc)
      setProgress(currentProgress)

      const match = statusSteps.find(step => currentProgress <= step.prg)
      if (match) {
        setStatus(match.text)
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsDone(true)
          document.body.style.overflow = ""
        }, 800)
      }
    }, 70)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center p-6"
        >
          {/* Grain texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

          {/* Central content */}
          <div className="w-full max-w-[320px] md:max-w-[380px] flex flex-col gap-5 relative z-10 text-left">
            
            {/* Top Row */}
            <div className="flex justify-between items-end font-mono text-[10px] tracking-wider text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>{status}</span>
              </div>
              <span className="text-primary font-bold">{progress}%</span>
            </div>

            {/* Tech loading track */}
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
              {/* Glow strip on loader */}
              <div 
                className="absolute top-0 bottom-0 bg-white/30"
                style={{ left: `${Math.max(0, progress - 15)}%`, width: "15%" }}
              />
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground/30">
              <span>DUY.DEV_CORE_SYS</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
