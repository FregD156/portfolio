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
    id: "shb-legal-intelligence",
    name: "SHB Legal Intelligence",
    outcome: "Vietnam AI Innovation Challenge",
    description:
      "A sophisticated Temporal Graph-RAG system for SHB banking compliance. Resolves active legal clauses, maps document references using NetworkX, and enforces strict grounding via CitationGuard.",
    tech: ["Python", "FastAPI", "SQLite/FAISS", "NetworkX", "React 19", "React Flow"],
    image: "/assets/images/projects/shb-legal-intelligence.jpg",
    codeUrl: null,
    demoUrl: "https://shb-compliance-operations-intellige.vercel.app/",
    hasAward: true,
    span: "large",
  },
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

/* ── LARGE CARD (Featured Project - Full Banner Layout) ───────────────── */
function LargeCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex"
    >
      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        className="w-full rounded-2xl border border-border bg-card/85 backdrop-blur-md overflow-hidden group relative flex flex-col lg:flex-row"
      >
        {/* Banner Image */}
        <div className="relative w-full lg:w-[60%] aspect-[16/9] lg:aspect-auto min-h-[260px] lg:min-h-[420px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/90 z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/90 z-10 lg:hidden" />
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority
          />
          {project.hasAward && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/20">
              <Award className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-[11px] font-semibold text-primary">{project.outcome}</span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex flex-col justify-center flex-1 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border/50">
          <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-2">Featured Project</div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">{project.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-[48ch]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => <TechTag key={t} label={t} />)}
          </div>

          <div className="flex gap-3">
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

/* ── SMALL CARD (equal height layout block) ─────────────────────────── */
function SmallCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full h-full"
    >
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        className="w-full h-full flex flex-col rounded-2xl border border-border bg-card/80 backdrop-blur-md overflow-hidden group relative"
      >
        {/* Image */}
        <div className={`relative w-full overflow-hidden aspect-[16/8] ${
          project.id === "dblinkstore"
            ? "bg-gradient-to-br from-[#1c120e] via-[#0d0d0d] to-[#221008] flex items-center justify-center"
            : ""
        }`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60 z-10" />
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className={`transition-transform duration-700 group-hover:scale-[1.04] ${
              project.id === "dblinkstore"
                ? "object-contain p-7"
                : "object-cover object-top"
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-1.5">
            <h3 className="text-lg md:text-xl font-extrabold tracking-tight">{project.name}</h3>
          </div>
          <p className="text-[10px] text-muted-foreground mb-3 font-mono">{project.outcome}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-5 mt-auto">
            {project.tech.map(t => <TechTag key={t} label={t} />)}
          </div>
          
          {project.demoUrl && (
            <div className="pt-3 border-t border-border/50">
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
      className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-7 flex flex-col h-full w-full"
    >
      <div className="text-xs font-mono text-primary uppercase tracking-[0.15em] mb-4">
        What I do
      </div>
      <ul className="space-y-3.5 flex-1">
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
  const featured = projects.filter(p => p.span === "large")
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
            Desktop Layout:
            Row 1: [        Featured Banners (col-span-12)      ]
            Row 2: [ Small (4) ] [ Small (4) ] [ What I do (4) ]
            Mobile: Stacked vertically
        ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Row 1: Large cards - Full width */}
          {featured.map(p => (
            <div key={p.id} className="lg:col-span-12">
              <LargeCard project={p} />
            </div>
          ))}

          {/* Row 2: Smaller cards - Side by side (1/3 each on desktop) */}
          {small.map(p => (
            <div key={p.id} className="lg:col-span-4 flex">
              <SmallCard project={p} />
            </div>
          ))}

          {/* Row 2: Info Card - 1/3 on desktop */}
          <div className="lg:col-span-4 flex">
            <WhatIDoCard />
          </div>

        </div>
      </div>
    </section>
  )
}
