"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"

export function PirateScrollHook() {
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [isLatched, setIsLatched] = React.useState(false)
  const [isReeling, setIsReeling] = React.useState(false)
  const [showTooltip, setShowTooltip] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const currentProgress = Math.min(1, Math.max(0, window.scrollY / totalHeight))
      setScrollProgress(currentProgress)

      // Latch hook when near contact section (bottom > 85%)
      if (currentProgress > 0.85) {
        setIsLatched(true)
      } else {
        setIsLatched(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleReelUp = () => {
    setIsReeling(true)

    // Smooth scroll to hero section
    const heroEl = document.getElementById("hero")
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    setTimeout(() => {
      setIsReeling(false)
    }, 1200)
  }

  // Only render after initial mount to prevent SSR mismatch
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Calculate vertical position (clamped between 8% and 88% of screen height)
  const hookTopPercent = 8 + scrollProgress * 78

  return (
    <div className="fixed right-4 md:right-8 top-0 bottom-0 z-40 pointer-events-none flex flex-col items-center">
      {/* Golden Pirate Rigging Rope Line */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FDE68A] via-[#2DD4BF] to-[#FDE68A] opacity-60 shadow-[0_0_10px_rgba(253,230,138,0.5)]" />

      {/* Floating Interactive Pirate Hook Badge */}
      <div
        className="absolute pointer-events-auto transition-all duration-150 ease-out"
        style={{ top: `${hookTopPercent}%` }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.div
          animate={{
            scale: isReeling ? [1, 1.3, 1] : isLatched ? [1, 1.15, 1] : 1,
            rotate: isReeling ? 360 : 0,
          }}
          transition={{
            duration: isReeling ? 1 : isLatched ? 1.5 : 0.3,
            repeat: isLatched ? Infinity : 0,
          }}
          onClick={handleReelUp}
          className={`relative group cursor-pointer flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-full border-2 transition-all duration-300 shadow-2xl ${
            isLatched
              ? "border-[#FDE68A] bg-[#FDE68A] text-[#022433] shadow-[0_0_35px_rgba(253,230,138,0.9)] animate-pulse"
              : "border-[#FDE68A] bg-[#022433]/95 text-[#FDE68A] hover:bg-[#FDE68A] hover:text-[#022433] shadow-[0_0_20px_rgba(45,212,191,0.5)]"
          }`}
          title="Click to Reel Anchor Back to Menu"
        >
          {/* Hook Anchor Icon */}
          <OceanIcon
            name="anchor"
            className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
              isReeling ? "animate-spin" : "group-hover:scale-110"
            }`}
          />

          {/* Latch Wave Pulsing Aura when latched at Contact */}
          {isLatched && (
            <div className="absolute inset-0 rounded-full border-2 border-[#FDE68A] animate-ping opacity-75 pointer-events-none" />
          )}

          {/* Tooltip Popup on Hover or Latch */}
          <AnimatePresence>
            {(showTooltip || isLatched) && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.9 }}
                className="absolute right-14 whitespace-nowrap bg-[#022433]/95 border border-[#FDE68A] text-[#FDE68A] font-mono text-[10px] md:text-xs font-extrabold px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 backdrop-blur-xl"
              >
                <OceanIcon name="anchor" className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>
                  {isLatched
                    ? "ANCHORED TO CONTACT! REEL UP ↑"
                    : "CLICK TO REEL UP ↑"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
