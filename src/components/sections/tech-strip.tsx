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
    <section className="py-8 bg-gradient-to-r from-[#022433] via-[#043247] to-[#022433] border-y border-[#2DD4BF]/30 relative overflow-hidden shadow-2xl" id="tech-strip">
      {/* Ocean Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(45,212,191,0.12),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 mb-5 flex items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-xs text-[#FDE68A] font-extrabold tracking-widest uppercase flex items-center gap-2 bg-[#022433]/90 border border-[#FDE68A]/60 px-4 py-1.5 rounded-full shadow-md">
          <OceanIcon name="wave" className="w-4 h-4 text-[#2DD4BF] animate-pulse" />
          <span>CORE ENGINEERING STACK & TOOLING</span>
        </div>

        <span className="hidden md:inline-flex font-mono text-[11px] text-[#2DD4BF] font-extrabold uppercase tracking-wider">
          Continuous Marquee Stream →
        </span>
      </div>

      {/* Marquee Track */}
      <div className="relative flex overflow-hidden select-none py-2">
        {/* Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-r from-[#022433] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-l from-[#022433] to-transparent" />

        <div className="animate-marquee flex gap-4 items-center whitespace-nowrap">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.slug}-${i}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-teal-300/35 bg-[#022433]/90 hover:bg-[#2DD4BF] hover:border-[#FDE68A] transition-all duration-300 shadow-md group cursor-pointer flex-shrink-0 hover:scale-105"
              title={tech.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                alt={tech.name}
                width={20}
                height={20}
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
              />
              <span className="font-mono text-xs text-white font-extrabold group-hover:text-[#022433] transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

