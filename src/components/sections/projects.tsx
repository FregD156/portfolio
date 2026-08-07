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

  return (
    <section className="py-28 relative overflow-hidden" id="projects">
      {/* Background Starry Water Glow Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,182,212,0.12),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-[#FDE68A] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <OceanIcon name="compass" className="w-4 h-4 text-[#2DD4BF]" />
              CHAPTER 04 · CELESTIAL OCEAN CONSTELLATION
            </div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
              Featured Systems & <span className="italic font-normal text-[#FDE68A]">AI Discoveries</span>
            </h2>
            <p className="font-jakarta text-sm md:text-base text-teal-100/90 mt-3 max-w-2xl font-medium">
              Click any discovery card to expand system architecture breakdown, tech stack specs, and live deployment links.
            </p>
          </div>

          <a
            href="https://github.com/FregD156"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-[#FDE68A] hover:text-white transition-all bg-white/10 border border-[#FDE68A]/50 px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105"
          >
            <OceanIcon name="github" className="w-4 h-4" /> GitHub Repositories
          </a>
        </div>

        {/* Ultra-Refined Celestial Ocean Matrix (2 Large Featured + 2 Medium Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(p)}
              className={
                p.hasAward
                  ? "lg:col-span-6 flex flex-col cursor-pointer group"
                  : "lg:col-span-6 flex flex-col cursor-pointer group"
              }
            >
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                perspective={1000}
                className="w-full h-full rounded-3xl glass-resort-card p-6 md:p-8 flex flex-col justify-between border border-teal-300/30 group-hover:border-[#FDE68A]/80 shadow-2xl relative overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5"
              >
                {/* Background Shimmer Flare */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2DD4BF]/15 via-transparent to-transparent pointer-events-none rounded-full blur-2xl group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-[11px] text-[#FDE68A] font-bold tracking-wider uppercase bg-white/10 border border-[#FDE68A]/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      0{index + 1} · {p.category === "ai" ? "GRAPH-RAG & AI" : "WEB SYSTEM"}
                    </span>

                    {p.hasAward && (
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#022433] to-[#043247] border border-[#FDE68A] px-3.5 py-1.5 rounded-full shadow-md animate-float">
                        <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FDE68A]" />
                        <span className="font-mono text-[10px] text-[#FDE68A] font-extrabold tracking-wider">{p.outcome}</span>
                      </div>
                    )}
                  </div>

                  {/* Image Preview Banner with Convex Pearl Glass Glow */}
                  <div className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden mb-6 border border-teal-300/40 shadow-inner">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#022433] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="font-mono text-xs font-bold text-[#2DD4BF] flex items-center gap-1.5">
                        <OceanIcon name="sailboat" className="w-3.5 h-3.5" /> Tap for Spec Sheet
                      </span>
                      <span className="font-mono text-xs text-[#FDE68A] font-bold">Details →</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-fraunces text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-[#FDE68A] transition-colors">
                    {p.name}
                  </h3>

                  <p className="font-jakarta text-sm text-teal-100/90 leading-relaxed font-medium line-clamp-3 mb-6">
                    {p.description}
                  </p>
                </div>

                {/* Tech Stack List */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-teal-300/20 mt-auto">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-3 py-1 rounded-full border border-teal-300/30 bg-white/10 text-teal-100 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Ultra-Refined System Spec Sheet Modal Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#021B27]/85 backdrop-blur-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-3xl rounded-3xl glass-resort-card overflow-hidden border border-[#FDE68A]/60 shadow-2xl p-6 md:p-9 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/30 transition-all z-30 shadow-lg"
                  aria-label="Close modal"
                >
                  <span className="font-mono text-base font-bold">✕</span>
                </button>

                {/* Modal Header Image */}
                <div className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden mb-6 border border-teal-300/40 shadow-inner">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    sizes="800px"
                    className="object-cover"
                  />
                  {selectedProject.hasAward && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#022433]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#FDE68A] shadow-xl">
                      <OceanIcon name="trophy" className="w-4 h-4 text-[#FDE68A]" />
                      <span className="font-mono text-xs text-[#FDE68A] font-extrabold">{selectedProject.outcome}</span>
                    </div>
                  )}
                </div>

                {/* Modal Content */}
                <div className="space-y-5">
                  <div className="font-mono text-xs text-[#FDE68A] font-bold uppercase tracking-widest flex items-center gap-2">
                    <OceanIcon name="anchor" className="w-4 h-4 text-[#2DD4BF]" /> ARCHITECTURE & SYSTEM SPECIFICATIONS
                  </div>

                  <h3 className="font-fraunces text-2xl md:text-4xl font-bold text-white tracking-tight">
                    {selectedProject.name}
                  </h3>

                  <p className="font-jakarta text-sm md:text-base text-teal-100/95 leading-relaxed font-medium">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="pt-2">
                    <div className="font-mono text-xs text-teal-100/80 mb-3 font-bold uppercase tracking-wider">SYSTEM TOOLING:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-4 py-1.5 rounded-full border border-teal-300/40 bg-white/10 text-[#FDE68A] font-bold shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-teal-300/30 mt-8">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#06B6D4] via-[#2DD4BF] to-[#14B8A6] text-white hover:from-[#0284c7] hover:to-[#0f766e] font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
                      >
                        Live System Demo <OceanIcon name="external" className="w-4 h-4" />
                      </a>
                    )}

                    {selectedProject.codeUrl ? (
                      <a
                        href={selectedProject.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/60 bg-white/15 text-white hover:border-[#FDE68A] hover:text-[#FDE68A] font-bold text-sm shadow-lg hover:scale-105 transition-all"
                      >
                        <OceanIcon name="github" className="w-4 h-4" /> Source Code
                      </a>
                    ) : (
                      <span className="font-mono inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-teal-300/30 text-teal-100/50 text-xs font-semibold cursor-not-allowed">
                        <OceanIcon name="terminal" className="w-4 h-4" /> Confidential Proprietary Code
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
