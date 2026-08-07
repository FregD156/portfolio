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
    category: "ai",
    featured: true,
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
    category: "ai",
    featured: false,
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
    category: "web",
    featured: false,
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
    category: "web",
    featured: false,
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null)

  return (
    <section className="py-28 relative overflow-hidden" id="projects">
      {/* Ocean Particle Background Ambiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(6,182,212,0.15),transparent_75%)]" />

      {/* Floating Ocean Background Bubble Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[10%] top-[20%] w-4 h-4 rounded-full bg-teal-300/20 blur-sm animate-float" />
        <div className="absolute right-[15%] top-[40%] w-6 h-6 rounded-full bg-teal-200/15 blur-sm animate-float [animation-delay:1.5s]" />
        <div className="absolute left-[20%] bottom-[15%] w-5 h-5 rounded-full bg-amber-200/20 blur-sm animate-float [animation-delay:2.5s]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="font-mono text-xs text-[#FDE68A] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <OceanIcon name="compass" className="w-4 h-4 text-[#2DD4BF]" />
              FEATURED DISCOVERIES & ARCHITECTURES
            </div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
              Selected <span className="italic font-normal text-[#FDE68A]">Innovations</span>
            </h2>
            <p className="font-jakarta text-sm md:text-base text-teal-100/90 mt-2 max-w-xl font-medium">
              Click any project card to expand full system architecture specs and live demos.
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

        {/* Phá Cách Asymmetric Architectural Showcase (12-Col Grand Flagship + 7:5 Offset + 12-Col Horizon Panorama) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {projects.map((p, index) => {
            // Asymmetric layout span & aspect ratio assignment
            const spanClass =
              index === 0
                ? "lg:col-span-12"
                : index === 1
                ? "lg:col-span-7"
                : index === 2
                ? "lg:col-span-5"
                : "lg:col-span-12"

            const aspectClass =
              index === 0
                ? "aspect-[16/9] md:aspect-[21/9]"
                : index === 1
                ? "aspect-[4/3] md:aspect-[16/10]"
                : index === 2
                ? "aspect-[4/3] md:aspect-[3/4]"
                : "aspect-[16/9] md:aspect-[21/9]"

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(p)}
                className={`${spanClass} group`}
              >
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  perspective={1000}
                  className={`w-full relative rounded-[24px] overflow-hidden border border-teal-300/30 bg-[#022433]/90 shadow-xl transition-all duration-500 cursor-pointer group-hover:-translate-y-2 group-hover:border-[#2DD4BF] group-hover:shadow-[0_20px_40px_rgba(45,212,191,0.35)] flex flex-col justify-end p-6 md:p-8 ${aspectClass}`}
                >
                  {/* Full-Bleed Project Background Image */}
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 z-0 opacity-85 group-hover:opacity-100"
                  />

                  {/* Dark Gradient Overlay (40% at top -> 85% at bottom for guaranteed text contrast) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20 pointer-events-none z-10" />

                  {/* Fixed Golden Ribbon Award Badge (Top-Left Corner of Card) */}
                  {p.hasAward && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#FDE68A] text-[#022433] font-mono text-[10px] md:text-[11px] font-extrabold px-3.5 py-1.5 rounded-full shadow-lg border border-[#FDE68A]">
                      <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#022433]" />
                      <span>{p.outcome}</span>
                    </div>
                  )}

                  {/* Floating Ocean Hover Bubbles Effect */}
                  <div className="absolute inset-0 pointer-events-none z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div className="absolute left-[15%] bottom-[-10%] w-3 h-3 rounded-full bg-teal-300/60 blur-[1px] animate-float" />
                    <div className="absolute left-[45%] bottom-[-15%] w-4 h-4 rounded-full bg-white/40 blur-[1px] animate-float [animation-delay:0.4s]" />
                    <div className="absolute right-[25%] bottom-[-10%] w-2.5 h-2.5 rounded-full bg-[#FDE68A]/60 blur-[1px] animate-float [animation-delay:0.8s]" />
                    <div className="absolute right-[10%] bottom-[-20%] w-3.5 h-3.5 rounded-full bg-teal-200/50 blur-[1px] animate-float [animation-delay:1.2s]" />
                  </div>

                  {/* Card Bottom Information Layout */}
                  <div className="relative z-20 mt-auto pt-16">
                    {/* Tech Stack Tags Above Title */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {p.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] md:text-[11px] px-2.5 py-0.5 rounded-full border border-teal-300/40 bg-[#022433]/80 text-[#2DD4BF] font-semibold backdrop-blur-md"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 5 && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-white/80 font-semibold">
                          +{p.tech.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Project Name & Description */}
                    <h3 className="font-fraunces text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-md mb-2 group-hover:text-[#FDE68A] transition-colors leading-tight">
                      {p.name}
                    </h3>

                    <p className="font-jakarta text-xs md:text-sm text-teal-100/90 leading-relaxed font-medium line-clamp-2 mb-4 max-w-3xl">
                      {p.description}
                    </p>

                    {/* View System Pill Button */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-[11px] text-teal-200/80 font-bold uppercase tracking-wider">
                        Tap to inspect architecture
                      </span>

                      <span className="font-mono inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2DD4BF]/60 bg-[#022433]/90 text-[#2DD4BF] text-xs font-bold shadow-md group-hover:bg-[#2DD4BF] group-hover:text-[#022433] transition-all duration-300">
                        <OceanIcon name="anchor" className="w-3.5 h-3.5" />
                        <span>VIEW SYSTEM →</span>
                      </span>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )
          })}
        </div>

        {/* System Specification Modal Drawer */}
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
