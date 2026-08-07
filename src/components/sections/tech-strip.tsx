"use client"

import * as React from "react"
import { OceanIcon } from "@/components/ui/ocean-icons"

const icons = [
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Python",     slug: "python" },
  { name: "Java",       slug: "java" },
  { name: "Node.js",   slug: "nodedotjs" },
  { name: "FastAPI",   slug: "fastapi" },
  { name: "React",     slug: "react" },
  { name: "Next.js",   slug: "nextdotjs" },
  { name: "Git",       slug: "git" },
  { name: "GitHub",    slug: "github" },
  { name: "Vercel",    slug: "vercel" },
  { name: "PostgreSQL",slug: "postgresql" },
  { name: "Linux",     slug: "linux" },
  { name: "Tailwind",  slug: "tailwindcss" },
]

const doubled = [...icons, ...icons]

export function TechStrip() {
  return (
    <section className="py-12 border-y border-border/60 bg-background/50 backdrop-blur-sm overflow-hidden" id="tech-strip">
      <div className="max-w-6xl mx-auto px-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="chapter-badge mb-2">
            <OceanIcon name="wave" className="w-4 h-4 text-primary" />
            CHAPTER 02 // ENGINEERING ARSENAL & TOOLING
          </span>
          <p className="font-jakarta text-xs text-teal-100/70">
            Tech stack & frameworks leveraged across AI pipelines & backend architectures.
          </p>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden select-none">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

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
                width={20}
                height={20}
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
              />
              <span className="postmark text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
                {tech.name}
              </span>
              <span className="text-primary/40 mx-1">~</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

