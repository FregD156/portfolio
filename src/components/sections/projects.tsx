"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Tilt from "react-parallax-tilt"
import { OceanIcon } from "@/components/ui/ocean-icons"
import { InteractiveArchitectureVisualizer } from "@/components/ui/interactive-architecture-visualizer"

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
    id: "magic-energy",
    name: "Magic Energy - Vệ Binh Nguyên Tố 3D",
    outcome: "COMPUTER VISION & 3D INTERACTIVE GAME",
    description:
      "Real-time Computer Vision & WebGL hand gesture control game. Recognizes finger postures via MediaPipe & webcam tracking to trigger 5 elemental spells (Fire, Water, Ice, Lightning, Earth) against 3D boss monsters in Three.js.",
    tech: ["Computer Vision", "MediaPipe", "Three.js", "JavaScript", "HTML5/CSS3", "Vercel"],
    image: "/assets/images/projects/magic-energy.jpg",
    codeUrl: null,
    demoUrl: "https://magic-energy.vercel.app/",
    hasAward: false,
    category: "ai",
    featured: false,
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

import { useLanguage } from "@/context/language-context"

export function Projects() {
  const { t } = useLanguage()
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
              {t("projects.tag")}
            </div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
              {t("projects.title")}
            </h2>
            <p className="font-jakarta text-sm md:text-base text-teal-100/90 mt-2 max-w-xl font-medium">
              {t("projects.subtitle")}
            </p>
          </div>

          <a
            href="https://github.com/FregD156"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-[#FDE68A] hover:text-white transition-all bg-white/10 border border-[#FDE68A]/50 px-6 py-3 poly-badge font-bold shadow-xl hover:scale-105"
          >
            <OceanIcon name="github" className="w-4 h-4" /> GitHub Repositories
          </a>
        </div>

        {/* Clean, Neat, Controlled 2-Column Grid (Aspect 4:3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {projects.map((p, index) => {
            const isDblink = p.id === "dblinkstore";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(p)}
                className="group"
              >
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  perspective={1000}
                  className={`w-full relative poly-chamfer overflow-hidden shadow-xl transition-all duration-500 cursor-pointer group-hover:-translate-y-1.5 flex flex-col justify-end p-6 md:p-7 aspect-[4/3] ${
                    isDblink
                      ? "bg-[#faf6f3] border-2 border-[#70152b]/30 group-hover:border-[#70152b] group-hover:shadow-[0_15px_35px_rgba(112,21,43,0.25)]"
                      : "crystal-card border border-teal-300/40 bg-[#022433]/90 group-hover:border-[#2DD4BF] group-hover:shadow-[0_15px_35px_rgba(45,212,191,0.3)]"
                  }`}
                >
                  {/* Project Image Container */}
                  <div className={`absolute inset-0 ${isDblink ? "bg-[#faf6f3]" : ""}`}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`transition-transform duration-700 group-hover:scale-105 z-0 ${
                        isDblink
                          ? "object-contain p-4 md:p-6 opacity-100 drop-shadow-md"
                          : "object-cover opacity-85 group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  {/* Gradient Overlay (Clean bottom gradient for text contrast, no top/middle dark vignetting on DBLink) */}
                  <div
                    className={`absolute inset-0 pointer-events-none z-10 ${
                      isDblink
                        ? "bg-gradient-to-t from-[#022433] via-[#022433]/80 via-45% to-transparent"
                        : "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
                    }`}
                  />

                {/* Fixed Golden Ribbon Award Badge (Top-Left Corner of Card) */}
                {p.hasAward && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#FDE68A] text-[#022433] font-mono text-xs font-extrabold px-4 py-1.5 poly-badge shadow-lg border border-[#FDE68A]">
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
                <div className="relative z-20 mt-auto pt-12">
                  {/* Tech Stack Tags Above Title */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3 py-0.5 poly-badge border border-[#2DD4BF]/50 bg-[#022433] text-[#2DD4BF] font-bold backdrop-blur-md shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="font-mono text-xs px-2.5 py-0.5 poly-badge border border-white/30 bg-white/15 text-white font-bold">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Name & Description */}
                  <h3 className="font-fraunces text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-md mb-2 group-hover:text-[#FDE68A] transition-colors leading-tight">
                    {p.name}
                  </h3>

                  <p className="font-jakarta text-xs md:text-sm text-slate-100 leading-relaxed font-medium line-clamp-2 mb-3.5">
                    {p.description}
                  </p>

                  {/* View System Pill Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-xs text-[#2DD4BF] font-extrabold uppercase tracking-wider">
                      Tap for details
                    </span>

                    <span className="font-mono inline-flex items-center gap-1.5 px-4 py-1.5 poly-badge border border-[#2DD4BF] bg-[#022433] text-[#2DD4BF] text-xs font-bold shadow-md group-hover:bg-[#2DD4BF] group-hover:text-[#022433] transition-all duration-300">
                      <OceanIcon name="anchor" className="w-3.5 h-3.5" />
                      <span>VIEW SYSTEM →</span>
                    </span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
        </div>

        {/* System Specification & Live Interactive Sandbox Modal Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <ModalSandboxDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

function ModalSandboxDrawer({
  project,
  onClose,
}: {
  project: typeof projects[0]
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "sandbox" | "architecture">("overview")
  const [isSimulating, setIsSimulating] = React.useState(false)
  const [simulationOutput, setSimulationOutput] = React.useState<string | null>(null)

  const handleRunSimulation = () => {
    setIsSimulating(true)
    setSimulationOutput(null)

    setTimeout(() => {
      setIsSimulating(false)
      if (project.id === "magic-energy") {
        setSimulationOutput(
          JSON.stringify(
            {
              status: 200,
              fps: 60,
              pipeline: "MediaPipe Hands 21-Landmark Detection",
              gesture_detected: "3_FINGERS_UP (ICE_ELEMENT)",
              confidence: 0.987,
              webgl_render: "Three.js Particle Spell System",
              target_boss: "Glacial Wyrm (Boss Stage 3)",
              spell_cast_latency: "12.4ms",
            },
            null,
            2
          )
        )
      } else {
        setSimulationOutput(
          JSON.stringify(
            {
              status: 200,
              execution_time: "24.2ms",
              pipeline: "Graph-RAG + RRF Hybrid Search (BM25 + FAISS)",
              query: "Retrieve compliance requirements for VN Commercial Banks 2026",
              results: [
                {
                  document_id: "VN_SBV_CIRCULAR_2026_04",
                  relevance_score: 0.984,
                  grounding_status: "VERIFIED_CITATION_GUARD",
                  chunks_retrieved: 4,
                },
              ],
              metrics: {
                faiss_index_hits: 12,
                graph_nodes_traversed: 48,
                vector_similarity: 0.941,
              },
            },
            null,
            2
          )
        )
      }
    }, 800)
  }

  return (
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
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/30 transition-all z-30 shadow-lg"
          aria-label="Close modal"
        >
          <span className="font-mono text-base font-bold">✕</span>
        </button>

        {/* Modal Header Image */}
        <div className={`relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 shadow-inner ${
          project.id === "dblinkstore" ? "bg-[#faf6f3] border-2 border-[#70152b]/30" : "border border-teal-300/40"
        }`}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="800px"
            className={project.id === "dblinkstore" ? "object-contain p-4 md:p-6" : "object-cover"}
          />
          {project.hasAward && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#022433]/95 backdrop-blur-md px-4 py-2 poly-badge border border-[#FDE68A] shadow-xl">
              <OceanIcon name="trophy" className="w-4 h-4 text-[#FDE68A]" />
              <span className="font-mono text-xs text-[#FDE68A] font-extrabold">{project.outcome}</span>
            </div>
          )}
        </div>

        {/* Interactive Mode Navigation Tabs */}
        <div className="flex gap-2 p-1.5 poly-chamfer bg-[#022433]/90 border border-teal-300/30 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`font-mono text-xs font-bold px-4 py-2 poly-badge transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-[#2DD4BF] text-[#022433] shadow-md"
                : "text-teal-100/70 hover:text-white"
            }`}
          >
            <OceanIcon name="anchor" className="w-3.5 h-3.5" /> SYSTEM OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`font-mono text-xs font-bold px-4 py-2 poly-badge transition-all flex items-center gap-2 ${
              activeTab === "sandbox"
                ? "bg-[#FDE68A] text-[#022433] shadow-md"
                : "text-teal-100/70 hover:text-white"
            }`}
          >
            <OceanIcon name="terminal" className="w-3.5 h-3.5" /> LIVE API SANDBOX
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`font-mono text-xs font-bold px-4 py-2 poly-badge transition-all flex items-center gap-2 ${
              activeTab === "architecture"
                ? "bg-[#2DD4BF] text-[#022433] shadow-md"
                : "text-teal-100/70 hover:text-white"
            }`}
          >
            <OceanIcon name="compass" className="w-3.5 h-3.5" /> ARCHITECTURE
          </button>
        </div>

        {/* Tab 1: System Overview */}
        {activeTab === "overview" && (
          <div className="space-y-5">
            <h3 className="font-fraunces text-2xl md:text-4xl font-bold text-white tracking-tight">
              {project.name}
            </h3>

            <p className="font-jakarta text-sm md:text-base text-teal-100/95 leading-relaxed font-medium">
              {project.description}
            </p>

            <div className="pt-2">
              <div className="font-mono text-xs text-teal-100/80 mb-3 font-bold uppercase tracking-wider">SYSTEM TOOLING:</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-4 py-1.5 poly-badge border border-teal-300/40 bg-white/10 text-[#FDE68A] font-bold shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t border-teal-300/30 mt-6">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono inline-flex items-center gap-2.5 px-8 py-3.5 poly-badge bg-gradient-to-r from-[#06B6D4] via-[#2DD4BF] to-[#14B8A6] text-white hover:from-[#0284c7] hover:to-[#0f766e] font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
                >
                  Live System Demo <OceanIcon name="external" className="w-4 h-4" />
                </a>
              )}

              {project.codeUrl ? (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono inline-flex items-center gap-2.5 px-7 py-3.5 poly-badge border border-white/60 bg-white/15 text-white hover:border-[#FDE68A] hover:text-[#FDE68A] font-bold text-sm shadow-lg hover:scale-105 transition-all"
                >
                  <OceanIcon name="github" className="w-4 h-4" /> Source Code
                </a>
              ) : (
                <span className="font-mono inline-flex items-center gap-2 px-6 py-3.5 poly-badge border border-teal-300/30 text-teal-100/50 text-xs font-semibold cursor-not-allowed">
                  <OceanIcon name="terminal" className="w-4 h-4" /> Confidential Proprietary Code
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Live API Sandbox Simulator */}
        {activeTab === "sandbox" && (
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#FDE68A] font-extrabold uppercase tracking-widest flex items-center justify-between">
              <span>REAL-TIME API ENDPOINT BENCHMARK</span>
              <span className="text-[#2DD4BF]">POST /api/v1/query</span>
            </div>

            <div className="bg-[#01141e] border border-teal-300/30 rounded-2xl p-4 font-mono text-xs text-teal-100 shadow-inner">
              <div className="text-teal-300/70 mb-2">/* Run simulation to trigger RRF Hybrid Search & CitationGuard */</div>
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] text-[#022433] font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <OceanIcon name="terminal" className="w-4 h-4 text-[#022433]" />
                {isSimulating ? "SIMULATING RRF VECTOR PIPELINE..." : "RUN QUERY SIMULATION"}
              </button>

              {simulationOutput && (
                <motion.pre
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-[#022433] border border-[#FDE68A]/40 text-[#FDE68A] overflow-x-auto text-[11px] font-bold shadow-md"
                >
                  {simulationOutput}
                </motion.pre>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Architecture Diagram */}
        {activeTab === "architecture" && (
          <InteractiveArchitectureVisualizer projectId={project.id} />
        )}
      </motion.div>
    </div>
  )
}
