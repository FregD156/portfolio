"use client"

import * as React from "react"
import { OceanIcon } from "@/components/ui/ocean-icons"

const icons = [
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Python",     slug: "python",     color: "3776AB" },
  { name: "Java",       slug: "openjdk",    color: "007396" },
  { name: "Node.js",   slug: "nodedotjs",  color: "5FA04E" },
  { name: "FastAPI",   slug: "fastapi",    color: "009688" },
  { name: "React",     slug: "react",      color: "61DAFB" },
  { name: "Next.js",   slug: "nextdotjs",  color: "FFFFFF" },
  { name: "Git",       slug: "git",        color: "F05032" },
  { name: "GitHub",    slug: "github",     color: "FFFFFF" },
  { name: "Vercel",    slug: "vercel",     color: "FFFFFF" },
  { name: "PostgreSQL",slug: "postgresql", color: "4169E1" },
  { name: "Linux",     slug: "linux",      color: "FCC624" },
  { name: "Tailwind",  slug: "tailwindcss",color: "06B6D4" },
]

const doubled = [...icons, ...icons]

export function TechStrip() {
  return (
    <section className="py-6 bg-transparent relative overflow-hidden" id="tech-strip">
      <div className="max-w-6xl mx-auto px-6 mb-4 flex items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-xs text-[#FDE68A] font-bold tracking-widest uppercase flex items-center gap-2">
          <OceanIcon name="wave" className="w-4 h-4 text-[#2DD4BF]" />
          <span>CORE ENGINEERING STACK & TOOLING</span>
        </div>

        <span className="hidden md:inline-flex font-mono text-[11px] text-teal-200/70 font-semibold uppercase tracking-wider">
          Continuous Marquee Stream →
        </span>
      </div>

      {/* Marquee Track Floating Seamlessly */}
      <div className="relative flex overflow-hidden select-none py-1">
        {/* Soft Transparent Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-20 pointer-events-none bg-gradient-to-r from-[#022433] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-20 pointer-events-none bg-gradient-to-l from-[#022433] to-transparent" />

        <div className="animate-marquee flex gap-3.5 items-center whitespace-nowrap">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.slug}-${i}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-teal-300/20 bg-white/5 backdrop-blur-md hover:border-[#2DD4BF]/60 hover:bg-[#022433]/80 transition-all duration-300 shadow-sm group cursor-pointer flex-shrink-0 hover:scale-105"
              title={tech.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                alt={tech.name}
                width={18}
                height={18}
                className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm"
              />
              <span className="font-mono text-xs text-teal-100 font-bold group-hover:text-[#FDE68A] transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

