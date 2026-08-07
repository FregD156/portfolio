"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Tilt from "react-parallax-tilt"
import { OceanIcon } from "@/components/ui/ocean-icons"

const projects = [
  {
    id: "shb-legal-intelligence",
    name: "SHB Legal Intelligence",
    outcome: "VIETNAM AI INNOVATION CHALLENGE 2026",
    description:
      "A temporal Graph-RAG system for SHB public data & VN banking compliance. Features hierarchical Graph-RAG (Doc → Article → Clause), RRF hybrid search (BM25 + FAISS vector), active date filtering (EffectiveResolver), and CitationGuard strict grounding.",
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
    outcome: "3RD PLACE · AI FOR SOCIAL CHALLENGE",
    description:
      "An intelligent recommendation system assisting high school students in selecting optimal universities based on profile data across 30+ academic majors. Built by Team Leader Nguyen Thanh Duy.",
    tech: ["Python", "Node.js", "AI Models", "JavaScript", "HTML/CSS"],
    image: "/assets/images/projects/eduguide-ai.jpg",
    codeUrl: "https://github.com/FregD156/AI.git",
    demoUrl: "http://www.xettuyen.site",
    hasAward: true,
    span: "large",
  },
  {
    id: "topikw",
    name: "TOPIK Master",
    outcome: "KOREAN LANGUAGE PROFICIENCY APP",
    description:
      "Specialized web application designed for intensive Korean language preparation, featuring multi-level vocabulary marathons (50 to 350+ questions) for TOPIK I & II.",
    tech: ["Python", "FastAPI", "Node.js", "shadcn/ui", "Vercel"],
    image: "/assets/images/projects/topikw-demo.png",
    codeUrl: null,
    demoUrl: "https://topikwfregd.vercel.app",
    hasAward: false,
    span: "small",
  },
]

function TechTag({ label }: { label: string }) {
  return (
    <span className="postmark text-[11px] text-muted-foreground border border-border/70 bg-card/50 px-2.5 py-0.5 rounded-md group-hover:border-primary/40 group-hover:text-primary transition-colors duration-200">
      {label}
    </span>
  )
}

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
        className="w-full rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md overflow-hidden group relative flex flex-col lg:flex-row shadow-xl"
      >
        <div className="relative w-full lg:w-[58%] aspect-[16/9] lg:aspect-auto min-h-[260px] lg:min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card z-10 lg:hidden" />
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
          {project.hasAward && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#0B3D57]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FFE3A3]" />
              <span className="postmark text-[10px] text-[#FFE3A3]">{project.outcome}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center flex-1 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border/60">
          <div className="postmark text-xs text-primary mb-2 flex items-center gap-1.5">
            <OceanIcon name="anchor" className="w-4 h-4" /> FEATURED SYSTEM ARCHITECTURE
          </div>
          <h3 className="font-fraunces text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">{project.name}</h3>
          <p className="font-jakarta text-sm text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => <TechTag key={t} label={t} />)}
          </div>

          <div className="flex gap-3">
            {project.codeUrl ? (
              <a
                href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                className="postmark inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/60 hover:border-primary/50 hover:text-primary transition-all duration-300 text-xs"
              >
                <OceanIcon name="github" className="w-4 h-4" /> Source
              </a>
            ) : (
              <span className="postmark inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/40 text-muted-foreground/50 text-xs cursor-not-allowed">
                <OceanIcon name="terminal" className="w-3.5 h-3.5" /> Confidential
              </span>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="postmark inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-xl transition-all duration-300 text-xs font-bold"
              >
                Live Demo <OceanIcon name="external" className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

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
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        className="w-full h-full flex flex-col rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md overflow-hidden group relative p-6"
      >
        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-border/50">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="postmark text-[10px] text-primary mb-1">{project.outcome}</div>
        <h3 className="font-fraunces text-xl font-bold tracking-tight mb-2 text-foreground">{project.name}</h3>
        <p className="font-jakarta text-xs text-muted-foreground leading-relaxed mb-6 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tech.map(t => <TechTag key={t} label={t} />)}
        </div>

        {project.demoUrl && (
          <a
            href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="postmark inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 transition-all duration-300 text-xs"
          >
            Explore App <OceanIcon name="external" className="w-3.5 h-3.5" />
          </a>
        )}
      </Tilt>
    </motion.div>
  )
}

function WhatIDoCard() {
  const capabilities = [
    "Backend API & Microservices (FastAPI, Express)",
    "Temporal Graph-RAG & Vector Search (FAISS, NetworkX)",
    "Full-Stack Web Engineering (React 19, Next.js)",
    "AI Models Integration & Algorithmic Optimizations",
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-md p-6 flex flex-col h-full w-full relative overflow-hidden"
    >
      <div className="postmark text-xs text-primary mb-4 flex items-center gap-2">
        <OceanIcon name="compass" className="w-4 h-4" /> CORE CAPABILITIES
      </div>
      <h3 className="font-fraunces text-xl font-bold text-foreground mb-4">Engineering Focus</h3>
      <ul className="space-y-3.5 flex-1 font-jakarta text-xs text-muted-foreground">
        {capabilities.map((c, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <OceanIcon name="wave" className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground/90">{c}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-border/60">
        <p className="postmark text-[11px] text-muted-foreground leading-relaxed">
          Open to Software Engineering, Backend & AI roles in Vietnam, Korea (KNUT), or Remote.
        </p>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const featured = projects.filter(p => p.span === "large")
  const small = projects.filter(p => p.span === "small")

  return (
    <section className="py-28 relative overflow-hidden" id="projects">
      <div className="max-w-6xl mx-auto px-6 relative">

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="mb-3">
              <span className="chapter-badge">
                <OceanIcon name="sailboat" className="w-4 h-4 text-primary" />
                CHAPTER 04 // FEATURED DISCOVERIES & AI SYSTEMS
              </span>
            </div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
              Featured <span className="italic font-normal text-primary">Innovations</span>
            </h2>
            <p className="font-jakarta text-sm text-teal-100/80 mt-2 max-w-xl">
              High-impact software systems, Graph-RAG architectures, and AI recommendation engines built by Nguyen Thanh Duy.
            </p>
          </div>
          <a
            href="https://github.com/FregD156" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 postmark text-xs text-teal-200 hover:text-primary transition-colors bg-white/5 border border-white/20 px-4 py-2 rounded-full"
          >
            <OceanIcon name="github" className="w-4 h-4" /> GitHub Repositories
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {featured.map(p => (
            <div key={p.id} className="lg:col-span-12">
              <LargeCard project={p} />
            </div>
          ))}

          {small.map(p => (
            <div key={p.id} className="lg:col-span-6 flex">
              <SmallCard project={p} />
            </div>
          ))}

          <div className="lg:col-span-6 flex">
            <WhatIDoCard />
          </div>
        </div>
      </div>
    </section>
  )
}

