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

  // Calculate vertical percentage (clamped smoothly between 10% and 88% of screen height)
  const hookTopPercent = 10 + scrollProgress * 76

  return (
    <div className="fixed right-4 md:right-8 top-0 bottom-0 z-40 pointer-events-none flex flex-col items-center">

      {/* --- TOP FISHING ROD & REEL DOCK (Icon Only) --- */}
      <div
        onClick={handleReelUp}
        className="absolute top-3 right-0 z-50 pointer-events-auto cursor-pointer group flex items-center gap-1.5"
        title="Click Rod Reel to Scroll Up to Menu"
      >
        {/* Compact Pure Icon Spool Badge */}
        <div className="w-9 h-9 rounded-full border-2 border-[#FDE68A] bg-[#022433]/95 text-[#FDE68A] flex items-center justify-center shadow-[0_0_18px_rgba(253,230,138,0.7)] backdrop-blur-xl group-hover:scale-110 transition-all">
          <div className={`w-5 h-5 rounded-full border border-[#FDE68A] flex items-center justify-center bg-[#FDE68A] text-[#022433] ${isReeling ? "animate-spin" : "group-hover:rotate-45"}`}>
            <OceanIcon name="compass" className="w-3.5 h-3.5 text-[#022433]" />
          </div>
        </div>

        {/* Fishing Rod Tip SVG */}
        <svg className="w-7 h-7 text-[#FDE68A] drop-shadow-md transform -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20 L20 4" strokeLinecap="round" />
          <circle cx="20" cy="4" r="1.5" fill="#FDE68A" />
        </svg>
      </div>

      {/* --- DYNAMIC FISHING LINE (Dây Cước Thả Chìm Mượt Mà) --- */}
      <div
        className="absolute top-10 right-4 md:right-8 w-[2px] bg-gradient-to-b from-[#2DD4BF] via-[#FDE68A] to-[#2DD4BF] opacity-80 shadow-[0_0_12px_rgba(45,212,191,0.8)] transition-all duration-300 ease-out"
        style={{ height: `${hookTopPercent}%` }}
      />

      {/* --- FLOATING FISHING HOOK & BOBBER (Icon Only) --- */}
      <div
        className="absolute pointer-events-auto transition-all duration-300 ease-out flex flex-col items-center"
        style={{ top: `${hookTopPercent}%` }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Fishing Bobber Lure (Phao Cước Đung Đưa) */}
        <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[#EF4444] via-[#FDE68A] to-white shadow-md animate-bounce mb-1 border border-white/60" />

        {/* Golden Fishing Hook Badge (Pure Icon) */}
        <motion.div
          animate={{
            scale: isReeling ? [1, 1.3, 1] : isLatched ? [1, 1.2, 1] : 1,
            rotate: isReeling ? 720 : 0,
          }}
          transition={{
            duration: isReeling ? 1 : isLatched ? 1.5 : 0.3,
            repeat: isLatched ? Infinity : 0,
          }}
          onClick={handleReelUp}
          className={`relative group cursor-pointer flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 shadow-2xl ${
            isLatched
              ? "border-[#FDE68A] bg-[#FDE68A] text-[#022433] shadow-[0_0_40px_rgba(253,230,138,0.95)] animate-pulse"
              : "border-[#FDE68A] bg-[#022433]/95 text-[#FDE68A] hover:bg-[#FDE68A] hover:text-[#022433] shadow-[0_0_25px_rgba(45,212,191,0.6)]"
          }`}
          title="Click Fishing Hook to Reel Line Up to Menu"
        >
          {/* Fishing Hook Icon */}
          <OceanIcon
            name="fishing-hook"
            className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
              isReeling ? "animate-spin" : "group-hover:scale-110"
            }`}
          />

          {/* Water Ripple Aura Effect */}
          <div className="absolute inset-0 rounded-full border border-teal-300/40 animate-ping opacity-40 pointer-events-none" />

          {/* Latch Wave Pulsing Aura when latched at Contact */}
          {isLatched && (
            <div className="absolute -inset-1 rounded-full border-2 border-[#FDE68A] animate-ping opacity-80 pointer-events-none" />
          )}

          {/* Pure Icon Indicator Popup on Hover or Latch */}
          <AnimatePresence>
            {(showTooltip || isLatched) && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="absolute right-14 w-8 h-8 bg-[#022433]/95 border-2 border-[#FDE68A] text-[#FDE68A] rounded-full shadow-2xl flex items-center justify-center backdrop-blur-2xl"
              >
                <OceanIcon name="fishing-hook" className="w-4 h-4 text-[#2DD4BF] animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
