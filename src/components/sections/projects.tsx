"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Award } from "lucide-react"
import Tilt from "react-parallax-tilt"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

/* ── DATA ──────────────────────────────────────────────────────────── */
const projects = [
  {
    id: "eduguide",
    name: "EduGuide AI",
    outcome: "3rd Place · AI for Social Challenge",
    description:
      "Intelligent recommendation system helping high school students find the right university based on profile analysis. Built as Team Leader.",
    tech: ["Python", "Node.js", "AI Models", "JavaScript"],
    image: "/assets/images/projects/eduguide-ai.jpg",
    codeUrl: "https://github.com/FregD156/AI.git",
    demoUrl: "http://www.xettuyen.site",
    hasAward: true,
    // bento placement: large left cell
    span: "large",
  },
  {
    id: "dblinkstore",
    name: "DBLink Store",
    outcome: "Live · Link Aggregation Store",
    description:
      "A premium link-in-bio store and digital asset aggregator designed for developers and creators to centralize their online presence.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/assets/images/projects/dblinkstore.png",
    codeUrl: null,
    demoUrl: "https://dblinkstore.vercel.app",
    hasAward: false,
    span: "small",
  },
  {
    id: "topikw",
    name: "TOPIK Master",
    outcome: "Live · Deployed on Vercel",
    description:
      "Intensive Korean language trainer with 350+ question marathons for TOPIK I & II preparation.",
    tech: ["Python", "FastAPI", "shadcn/ui"],
    image: "/assets/images/projects/topikw-demo.png",
    codeUrl: null,
    demoUrl: "https://topikwfregd.vercel.app",
    hasAward: false,
    // bento placement: smaller top-right cell
    span: "small",
  },
]

/* ── SHARED: TECH TAGS ─────────────────────────────────────────────── */
function TechTag({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-mono text-muted-foreground border border-border px-2.5 py-0.5 rounded-md hover:border-primary/40 hover:text-primary transition-colors duration-200">
      {label}
    </span>
  )
}

/* ── LARGE CARD (left, full height) ─────────────────────────────────── */
function LargeCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex"
    >
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        className="w-full flex flex-col rounded-2xl border border-border bg-card/80 backdrop-blur-md overflow-hidden group relative"
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/60 z-10" />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-500 z-10" />
          <Image
            src={project.image}
            alt={project.name}
            fill sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Award badge overlay */}
          {project.hasAward && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/20">
              <Award className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-[11px] font-semibold text-primary">{project.outcome}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 md:p-7">
          <h3 className="text-2xl font-extrabold tracking-tight mb-1.5">{project.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-[52ch]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => <TechTag key={t} label={t} />)}
          </div>

          <div className="flex gap-3 mt-auto">
            {project.codeUrl ? (
              <a
                href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer gap-2 text-sm",
                })}
              >
                <GithubIcon className="w-4 h-4" />
                Source
              </a>
            ) : (
              <span className={buttonVariants({ variant: "outline", className: "rounded-full opacity-30 cursor-not-allowed text-sm" })}>
                Private
              </span>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className={buttonVariants({
                  className: "rounded-full px-5 bg-primary hover:opacity-90 text-white shadow-[0_0_20px_rgba(217,119,87,0.2)] hover:shadow-[0_0_28px_rgba(217,119,87,0.35)] transition-all duration-300 cursor-pointer gap-2 text-sm",
                })}
              >
                Live
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

/* ── SMALL CARD (right column, stacks with "what I do") ─────────────── */
function SmallCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        className="w-full flex flex-col rounded-2xl border border-border bg-card/80 backdrop-blur-md overflow-hidden group relative"
      >
        {/* Image - shorter, more horizontal */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60 z-10" />
          <Image
            src={project.image}
            alt={project.name}
            fill sizes="(max-width: 768px) 100vw, 35vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-col flex-1 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-extrabold tracking-tight">{project.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-mono">{project.outcome}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map(t => <TechTag key={t} label={t} />)}
          </div>
          {project.demoUrl && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <a
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className={buttonVariants({
                  size: "sm",
                  className: "w-full rounded-full bg-primary hover:opacity-90 text-white shadow-[0_0_16px_rgba(217,119,87,0.15)] hover:shadow-[0_0_24px_rgba(217,119,87,0.25)] transition-all duration-300 cursor-pointer gap-1.5 text-xs py-2 justify-center",
                })}
              >
                Live
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </Tilt>
    </motion.div>
  )
}

/* ── "WHAT I DO" info card ──────────────────────────────────────────── */
function WhatIDoCard() {
  const capabilities = [
    "Backend API design & architecture",
    "AI integration & data pipelines",
    "Full-stack web development",
    "Technical leadership & research",
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-7 flex flex-col"
    >
      <div className="text-xs font-mono text-primary uppercase tracking-[0.15em] mb-4">
        What I do
      </div>
      <ul className="space-y-3 flex-1">
        {capabilities.map((c, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <span className="text-primary mt-0.5 text-xs flex-shrink-0">▸</span>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-5 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Open to full-stack, backend, and AI-adjacent roles - Hanoi, KNUT (Korea), or remote.
        </p>
      </div>
    </motion.div>
  )
}

/* ── SECTION ─────────────────────────────────────────────────────────── */
export function Projects() {
  const large = projects.find(p => p.span === "large")!
  const small = projects.filter(p => p.span === "small")

  return (
    <section className="py-32 border-y border-border relative overflow-hidden" id="projects">
      {/* Section bg tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(217,119,87,0.025) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Selected Work
            </motion.h2>
          </div>
          <a
            href="https://github.com/FregD156" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* ── BENTO GRID ─────────────────────────────────────────────
            Desktop: [  large (col-span 7)  ] [ small (col-span 5) ]
                                              [ what-I-do           ]
            Mobile: stacked vertically
        ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Large card - left, spans 7 cols, full grid height */}
          <div className="lg:col-span-7 lg:row-span-2">
            <LargeCard project={large} />
          </div>

          {/* Small project card - top right */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {small.map(p => <SmallCard key={p.id} project={p} />)}
          </div>

          {/* "What I do" info card - bottom right */}
          <div className="lg:col-span-5">
            <WhatIDoCard />
          </div>
        </div>
      </div>
    </section>
  )
}
