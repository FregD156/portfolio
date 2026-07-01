"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[72px] z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-border"
          : "bg-background/70 backdrop-blur-md border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto h-full px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tight">
          Duy<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>

          {/* Theme Toggle Button */}
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9.5 h-9.5 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <a
            href="https://drive.google.com/drive/folders/your-resume-placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "ghost",
              className: "text-sm font-semibold rounded-full border border-border hover:bg-accent/40 cursor-pointer"
            })}
          >
            Resume
          </a>
        </div>

        {/* Mobile menu toggle & Theme Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9.5 h-9.5 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-background z-40 flex flex-col p-8 gap-6 border-t border-border transition-all duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a
          href="#about"
          onClick={toggleMenu}
          className="text-lg font-medium text-muted-foreground hover:text-foreground"
        >
          About
        </a>
        <a
          href="#projects"
          onClick={toggleMenu}
          className="text-lg font-medium text-muted-foreground hover:text-foreground"
        >
          Projects
        </a>
        <a
          href="#experience"
          onClick={toggleMenu}
          className="text-lg font-medium text-muted-foreground hover:text-foreground"
        >
          Experience
        </a>
        <a
          href="#contact"
          onClick={toggleMenu}
          className="text-lg font-medium text-muted-foreground hover:text-foreground"
        >
          Contact
        </a>
        <a
          href="https://drive.google.com/drive/folders/your-resume-placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "outline",
            className: "w-full mt-4 rounded-full border border-border text-center justify-center cursor-pointer"
          })}
          onClick={toggleMenu}
        >
          Resume
        </a>
      </div>
    </nav>
  )
}
