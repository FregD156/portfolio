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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(6,182,212,0.15),transparent_75%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-[#FDE68A] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <OceanIcon name="compass" className="w-4 h-4 text-[#2DD4BF]" />
              INTERACTIVE 3D OCEAN SPHERE SANCTUARY
            </div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
              Floating Ocean <span className="italic font-normal text-[#FDE68A]">Spheres</span>
            </h2>
            <p className="font-jakarta text-sm md:text-base text-teal-100/90 mt-3 max-w-2xl font-medium">
              Click any floating 3D glass sphere to expand full architecture breakdowns & live system demos.
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

        {/* 3D Staggered Floating Ocean Sphere Sanctuary (Asymmetric Organic Layout) */}
        <div className="relative py-12 min-h-[620px] flex flex-col items-center justify-center">

          {/* Central Glass Node Compass Badge */}
          <div className="z-20 mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#FDE68A] bg-[#042c3d]/90 backdrop-blur-2xl text-[#FDE68A] font-mono text-xs font-bold tracking-widest shadow-2xl animate-float">
              <OceanIcon name="wave" className="w-4 h-4 text-[#2DD4BF]" />
              SELECT A FLOATING SPHERE TO EXPLORE
            </span>
          </div>

          {/* Floating Spheres Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-5xl items-center justify-items-center">
            {projects.map((p, index) => {
              // Custom floating delays and sizes for asymmetric 3D feel
              const floatDelayClass =
                index === 0
                  ? "animate-float"
                  : index === 1
                  ? "animate-float [animation-delay:1.2s]"
                  : index === 2
                  ? "animate-float [animation-delay:2.4s]"
                  : "animate-float [animation-delay:1.8s]"

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onClick={() => setSelectedProject(p)}
                  className={`relative group cursor-pointer ${floatDelayClass}`}
                >
                  {/* Floating Award Note Badge */}
                  {p.hasAward && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#022433]/95 backdrop-blur-2xl text-[#FDE68A] font-mono text-[10px] font-extrabold shadow-2xl flex items-center gap-1.5 animate-bounce">
                      <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FDE68A]" />
                      {p.awardNote}
                    </div>
                  )}

                  {/* 3D Liquid Crystal Sphere Lens */}
                  <Tilt
                    tiltMaxAngleX={12}
                    tiltMaxAngleY={12}
                    perspective={1000}
                    className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-[#2DD4BF] p-2 bg-gradient-to-br from-[#2DD4BF]/40 via-[#043247] to-[#022433] shadow-[0_0_60px_rgba(45,212,191,0.5)] group-hover:shadow-[0_0_80px_rgba(253,230,138,0.7)] transition-all duration-500 relative overflow-hidden flex flex-col items-center justify-center text-center group-hover:scale-105"
                  >
                    {/* Inner Circular Lens Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/90">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="288px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-95"
                      />

                      {/* Dark Vignette Lens Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#022433]/95 via-[#022433]/40 to-transparent flex flex-col justify-end p-6 text-center">
                        <div className="font-fraunces text-xl md:text-2xl font-bold text-white drop-shadow-lg tracking-tight group-hover:text-[#FDE68A] transition-colors leading-tight">
                          {p.name}
                        </div>
                        <div className="font-mono text-[11px] text-[#2DD4BF] font-extrabold uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
                          <OceanIcon name="anchor" className="w-3 h-3 text-[#FDE68A]" /> View System →
                        </div>
                      </div>

                      {/* Sunlit Glass Lens Flare */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/35 pointer-events-none group-hover:opacity-90 transition-opacity" />
                    </div>
                  </Tilt>
                </motion.div>
              )
            })}
          </div>
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
