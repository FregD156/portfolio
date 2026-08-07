"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { portfolioConfig } from "@/lib/config"
import { OceanIcon } from "@/components/ui/ocean-icons"

const navLinks = [
  { href: "#about",      label: "About" },
  { href: "#projects",   label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact" },
]

export function Navbar() {
  const [isOpen,   setIsOpen]   = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [active,   setActive]   = React.useState("")
  const [visible,  setVisible]  = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY

      const ids = ["about", "projects", "experience", "contact"]
      const cur = ids.find(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= 100 && r.bottom > 100
      })
      setActive(cur || "")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
          scrolled
            ? "bg-[#022433]/92 backdrop-blur-2xl border-b border-teal-300/30 shadow-xl"
            : "bg-transparent border-b border-transparent"
        } ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "68px" }}
      >
        <div className="max-w-6xl mx-auto h-full px-6 flex justify-between items-center">

          {/* Logo in Fraunces */}
          <a href="#" className="font-fraunces text-lg md:text-xl font-bold tracking-tight flex items-center gap-2 group">
            <OceanIcon name="wave" className="w-5 h-5 text-[#2DD4BF] transition-transform group-hover:rotate-12" />
            <span className="text-white">Nguyen Thanh Duy</span>
            <span className="font-mono text-xs text-[#FDE68A] font-bold">.DEV</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 font-jakarta font-semibold text-sm">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                  active === link.href.slice(1)
                    ? "text-[#FDE68A] font-bold"
                    : "text-teal-100/80 hover:text-white"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-teal-300/40"
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}

            <div className="w-px h-4 bg-teal-300/30 mx-2" />

            <a
              href={portfolioConfig.resumeUrl}
              target="_blank" rel="noopener noreferrer"
              className="ml-2 font-jakarta px-4 py-2 rounded-full border border-[#FDE68A]/60 bg-white/10 text-[#FDE68A] hover:bg-[#FDE68A] hover:text-[#022433] transition-all duration-300 cursor-pointer flex items-center gap-1.5 font-bold shadow-md"
            >
              <OceanIcon name="terminal" className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-teal-100/90 hover:text-white"
              aria-label="Toggle menu"
            >
              <OceanIcon name="compass" className="w-6 h-6 text-[#2DD4BF]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 w-full z-40 md:hidden bg-[#051923]/95 backdrop-blur-xl border-b border-[#38BDF8]/20"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-2.5 border-b border-border/50 last:border-0 postmark text-muted-foreground hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={portfolioConfig.resumeUrl}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-3 text-center py-2.5 rounded-xl border border-primary/50 text-primary font-bold hover:bg-primary/10 transition-colors postmark flex items-center justify-center gap-2"
              >
                <OceanIcon name="terminal" className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


