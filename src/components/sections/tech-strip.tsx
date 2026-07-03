"use client"

import * as React from "react"
import { motion } from "framer-motion"

// Simple Icons CDN - white icons on dark bg, color tinted on hover
// Format: https://cdn.simpleicons.org/{slug}/{hex-color}
const icons = [
  { name: "JavaScript", slug: "javascript",  color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript",  color: "3178C6" },
  { name: "Python",     slug: "python",       color: "3776AB" },
  { name: "Java",       slug: "java",         color: "ED8B00" },
  { name: "Node.js",   slug: "nodedotjs",    color: "5FA04E" },
  { name: "FastAPI",   slug: "fastapi",       color: "009688" },
  { name: "React",     slug: "react",         color: "61DAFB" },
  { name: "Next.js",   slug: "nextdotjs",     color: "ffffff" },
  { name: "Git",       slug: "git",           color: "F05032" },
  { name: "GitHub",    slug: "github",        color: "ffffff" },
  { name: "Vercel",    slug: "vercel",        color: "ffffff" },
  { name: "PostgreSQL",slug: "postgresql",    color: "4169E1" },
  { name: "Linux",     slug: "linux",         color: "FCC624" },
  { name: "Tailwind",  slug: "tailwindcss",   color: "06B6D4" },
]

// Duplicate for seamless marquee loop
const doubled = [...icons, ...icons]

export function TechStrip() {
  return (
    <section className="py-14 border-y border-border overflow-hidden" id="tech-strip">
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.18em]">
          Stack
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden select-none">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
        />

        <div className="animate-marquee flex gap-8 items-center whitespace-nowrap">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.slug}-${i}`}
              className="flex items-center gap-2.5 group cursor-default flex-shrink-0"
              title={tech.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/888073`}
                alt={tech.name}
                width={22}
                height={22}
                className="w-[22px] h-[22px] transition-all duration-300 group-hover:opacity-100 opacity-50"
                style={{
                  filter: "brightness(0) invert(0.55)",
                  transition: "filter 0.3s, opacity 0.3s",
                }}
                onMouseEnter={e => {
                  const img = e.currentTarget
                  img.style.filter = "none"
                  img.style.opacity = "1"
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget
                  img.style.filter = "brightness(0) invert(0.55)"
                  img.style.opacity = "0.5"
                }}
              />
              <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {tech.name}
              </span>
              <span className="text-border mx-1">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
