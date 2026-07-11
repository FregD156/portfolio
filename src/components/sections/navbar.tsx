"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { portfolioConfig } from "@/lib/config"

const navLinks = [
  { href: "#about",      label: "About" },
  { href: "#projects",   label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact" },
]

export function Navbar() {
  const [isOpen,   setIsOpen]   = React.useState(false)
  const [mounted,  setMounted]  = React.useState(false)
  const { theme, setTheme }     = useTheme()
  const [scrolled, setScrolled] = React.useState(false)
  const [active,   setActive]   = React.useState("")
  const [visible,  setVisible]  = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)

      // Smart hide on scroll down, reveal on scroll up
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
            ? "bg-background/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        } ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "68px" }}
      >
        <div className="max-w-6xl mx-auto h-full px-6 flex justify-between items-center">

          {/* Logo */}
          <a href="#" className="font-mono text-base font-bold tracking-tight flex items-center gap-0.5 group">
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">~/</span>
            <span className="text-foreground">Duy</span>
            <span className="text-primary transition-colors group-hover:opacity-80">.dev</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/5"
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}

            <div className="w-px h-4 bg-border mx-2" />

            {mounted && (
              <Button
                variant="ghost" size="icon"
                className="w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            <a
              href={portfolioConfig.resumeUrl}
              target="_blank" rel="noopener noreferrer"
              className="ml-2 text-sm font-semibold px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-200 cursor-pointer"
            >
              Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <Button
                variant="ghost" size="icon"
                className="w-9 h-9 rounded-lg text-muted-foreground cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.15 }}><X    className="h-5 w-5" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-5 w-5" /></motion.span>
                }
              </AnimatePresence>
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
            className="fixed top-[68px] left-0 w-full z-40 md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
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
                  className="py-2.5 border-b border-border/50 last:border-0 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={portfolioConfig.resumeUrl}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-3 text-center py-2.5 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
