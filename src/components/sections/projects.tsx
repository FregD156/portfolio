"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    awardNote: "🏆 VIETNAM AI INNOVATION CHALLENGE 2026",
    category: "ai",
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
    awardNote: "🏆 3RD PLACE WINNER · SOCIAL AI",
    category: "ai",
  },
  {
    id: "dblinkstore",
    name: "DBLink Store",
    outcome: "LIVE · DIGITAL ASSET AGGREGATOR",
    description:
      "A premium link-in-bio store and digital asset aggregator designed for developers and creators to centralize online presence & digital assets.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    image: "/assets/images/projects/dblinkstore.png",
    codeUrl: null,
    demoUrl: "https://dblinkstore.vercel.app",
    hasAward: false,
    awardNote: null,
    category: "web",
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
    awardNote: null,
    category: "web",
  },
]
export function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null)
  const doubledProjects = [...projects, ...projects]

  return (
    <section className="py-28 relative overflow-hidden" id="projects">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
              Floating Ocean <span className="italic font-normal text-[#FDE68A]">Bubble Stream</span>
            </h2>
            <p className="font-jakarta text-sm md:text-base text-teal-100/90 mt-2 max-w-xl font-medium">
              Hover to pause the bubble stream & click any bubble to expand full system architecture details & live demos.
            </p>
          </div>

          <a
            href="https://github.com/FregD156"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-[#FDE68A] hover:text-white transition-colors bg-white/10 border border-white/30 px-5 py-2.5 rounded-full font-bold shadow-md hover:scale-105"
          >
            <OceanIcon name="github" className="w-4 h-4" /> GitHub Repositories
          </a>
        </div>

        {/* Continuous Infinite Horizontal Ocean Bubble Orbit Stream */}
        <div className="relative flex overflow-hidden py-8 select-none group">
          {/* Gradient Edge Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-20 pointer-events-none bg-gradient-to-r from-[#022433] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-20 pointer-events-none bg-gradient-to-l from-[#022433] to-transparent" />

          {/* Marquee Track */}
          <div className="animate-marquee flex gap-10 md:gap-14 items-center whitespace-nowrap group-hover:[animation-play-state:paused] py-4">
            {doubledProjects.map((p, index) => (
              <div
                key={`${p.id}-${index}`}
                onClick={() => setSelectedProject(p)}
                className="relative group/bubble cursor-pointer flex-shrink-0"
              >
                {/* Award Note Chip Floating Over Bubble */}
                {p.hasAward && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap px-3.5 py-1.5 rounded-full border border-[#FDE68A] bg-[#022433]/95 backdrop-blur-xl text-[#FDE68A] font-mono text-[10px] font-extrabold shadow-2xl flex items-center gap-1.5 animate-bounce">
                    <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FDE68A]" />
                    {p.awardNote}
                  </div>
                )}

                {/* Floating 3D Liquid Glass Sphere Bubble */}
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-[#2DD4BF] p-2 bg-gradient-to-br from-teal-300 via-teal-900 to-[#022433] shadow-[0_0_50px_rgba(45,212,191,0.45)] group-hover/bubble:shadow-[0_0_70px_rgba(253,230,138,0.7)] transition-all duration-500 relative overflow-hidden flex flex-col items-center justify-center text-center animate-float"
                >
                  {/* Inner Lens Image Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/80">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="256px"
                      className="object-cover transition-transform duration-700 group-hover/bubble:scale-110 opacity-75 group-hover/bubble:opacity-95"
                    />

                    {/* Dark Vignette Overlay for Title Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#022433]/90 via-[#022433]/40 to-transparent flex flex-col justify-end p-5 text-center whitespace-normal">
                      <div className="font-fraunces text-lg md:text-xl font-bold text-white drop-shadow-lg tracking-tight group-hover/bubble:text-[#FDE68A] transition-colors leading-tight">
                        {p.name}
                      </div>
                      <div className="font-mono text-[10px] text-teal-200/90 font-bold uppercase tracking-wider mt-1">
                        Click to Expand →
                      </div>
                    </div>

                    {/* Sunlit Lens Flare Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/35 pointer-events-none group-hover/bubble:opacity-80 transition-opacity" />
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Click-to-Expand Project Detail Modal Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#021B27]/80 backdrop-blur-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-3xl rounded-3xl glass-resort-card overflow-hidden border border-teal-300/40 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2.5 rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/30 transition-all z-30"
                  aria-label="Close modal"
                >
                  <span className="font-mono text-base font-bold">✕</span>
                </button>

                {/* Modal Header & Image Banner */}
                <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-6 border border-teal-300/30">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    sizes="800px"
                    className="object-cover"
                  />
                  {selectedProject.hasAward && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#022433]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#FDE68A]">
                      <OceanIcon name="trophy" className="w-4 h-4 text-[#FDE68A]" />
                      <span className="font-mono text-xs text-[#FDE68A] font-extrabold">{selectedProject.outcome}</span>
                    </div>
                  )}
                </div>

                {/* Modal Info */}
                <div className="space-y-4">
                  <div className="font-mono text-xs text-[#FDE68A] font-bold uppercase tracking-wider flex items-center gap-2">
                    <OceanIcon name="anchor" className="w-4 h-4 text-[#2DD4BF]" /> SYSTEM DETAILS & ARCHITECTURE
                  </div>

                  <h3 className="font-fraunces text-2xl md:text-4xl font-bold text-white tracking-tight">
                    {selectedProject.name}
                  </h3>

                  <p className="font-jakarta text-sm md:text-base text-teal-100/95 leading-relaxed font-medium">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="pt-2">
                    <div className="font-mono text-xs text-teal-100/80 mb-2 font-bold uppercase">TECHNOLOGY STACK:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-3.5 py-1.5 rounded-full border border-teal-300/40 bg-white/10 text-teal-100 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-teal-300/30 mt-6">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] text-white hover:from-[#0284c7] hover:to-[#14b8a6] font-bold text-sm shadow-xl hover:scale-105 transition-all"
                      >
                        Live Demo <OceanIcon name="external" className="w-4 h-4" />
                      </a>
                    )}

                    {selectedProject.codeUrl ? (
                      <a
                        href={selectedProject.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/60 bg-white/15 text-white hover:border-[#FDE68A] hover:text-[#FDE68A] font-bold text-sm shadow-lg hover:scale-105 transition-all"
                      >
                        <OceanIcon name="github" className="w-4 h-4" /> Source Code
                      </a>
                    ) : (
                      <span className="font-mono inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-300/30 text-teal-100/50 text-xs font-semibold cursor-not-allowed">
                        <OceanIcon name="terminal" className="w-4 h-4" /> Confidential Code
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

