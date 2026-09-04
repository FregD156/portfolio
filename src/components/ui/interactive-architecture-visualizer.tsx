"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"

interface NodeSpec {
  id: string
  title: string
  subtitle: string
  icon: string
  latency: string
  details: string
  codeSnippet?: string
  metrics?: Record<string, string | number>
}

interface ProjectArchitectureConfig {
  pipelineTitle: string
  nodes: NodeSpec[]
}

const architectureData: Record<string, ProjectArchitectureConfig> = {
  "shb-legal-intelligence": {
    pipelineTitle: "SHB Temporal Graph-RAG Pipeline (Doc → Article → Clause)",
    nodes: [
      {
        id: "input",
        title: "1. Legal Query Ingestion",
        subtitle: "Natural Language Prompt",
        icon: "terminal",
        latency: "< 2.1ms",
        details: "Ingests Vietnamese banking regulation query, strips stop-words, and extracts active date context (`as_of_date=2026-09-01`).",
        codeSnippet: `query_ctx = QueryContext(raw="Quy định tỷ lệ an toàn vốn 2026", as_of="2026-09-01")`,
        metrics: { "Parser Latency": "2.1ms", "Entities Extracted": 3, "Encoding": "UTF-8" }
      },
      {
        id: "rrf",
        title: "2. RRF Hybrid Retrieval",
        subtitle: "BM25 + FAISS Vector e5-large",
        icon: "compass",
        latency: "14.8ms",
        details: "Combines sparse BM25 lexical keyword scores with dense FAISS vector embeddings using Reciprocal Rank Fusion (RRF coefficient k=60).",
        codeSnippet: `score = (1 / (60 + rank_bm25)) + (1 / (60 + rank_faiss))\nresults = rrf_merge(bm25_top50, faiss_top50)`,
        metrics: { "Vector Index Hits": 50, "BM25 Hits": 50, "Merged RRF Count": 15, "RRF Latency": "14.8ms" }
      },
      {
        id: "graph",
        title: "3. Dynamic Graph-RAG & EffectiveResolver",
        subtitle: "NetworkX Hierarchy Traversal",
        icon: "anchor",
        latency: "8.3ms",
        details: "Traverses hierarchical legal graph nodes (Document → Article → Clause) and resolves active regulation effectiveness dates (`EffectiveResolver`).",
        codeSnippet: `for clause in graph.neighbors(article_node):\n    if EffectiveResolver.is_active(clause, as_of=query_ctx.as_of):\n        valid_clauses.append(clause)`,
        metrics: { "Nodes Traversed": 48, "Temporal Edges Checked": 12, "Graph Depth": 3 }
      },
      {
        id: "guard",
        title: "4. CitationGuard Grounded Output",
        subtitle: "Zero-Hallucination Guardrail",
        icon: "shield",
        latency: "3.2ms",
        details: "Enforces absolute evidence boundaries. All output sentences are verified against original legal IDs (`VN_SBV_CIRCULAR_2026_04`).",
        codeSnippet: `class CitationGuard:\n    def verify(response, citations):\n        return all(c.text in source_db for c in citations)`,
        metrics: { "Citation Verification": "100% PASS", "Hallucination Risk": "0.00%", "Final Status": "GROUNDED" }
      }
    ]
  },
  "magic-energy": {
    pipelineTitle: "Real-Time Vision & Three.js WebGL Combat Engine",
    nodes: [
      {
        id: "webcam",
        title: "1. Camera Feed Capture",
        subtitle: "HTML5 Video Stream",
        icon: "external",
        latency: "16.6ms (60 FPS)",
        details: "Captures 720p webcam video frames with automatic lighting compensation and contrast normalization.",
        codeSnippet: `const videoElement = document.getElementById('webcam-stream');\nconst frame = captureFrame(videoElement);`,
        metrics: { "FPS Target": 60, "Resolution": "1280x720", "Stream Latency": "16.6ms" }
      },
      {
        id: "mediapipe",
        title: "2. MediaPipe Hand Tracking",
        subtitle: "21 3D Landmark Skeleton",
        icon: "compass",
        latency: "8.2ms",
        details: "Detects 21 3D hand landmarks per frame, tracking joint positions (wrist, MCP, PIP, DIP, fingertips).",
        codeSnippet: `const results = await handsDetector.send({ image: frame });\nconst landmarks = results.multiHandLandmarks[0];`,
        metrics: { "Landmarks Count": 21, "Confidence Score": "98.7%", "Tracking Pipeline": "MediaPipe Hands" }
      },
      {
        id: "posture",
        title: "3. Posture Classifier",
        subtitle: "1 to 5 Fingers Spells",
        icon: "terminal",
        latency: "1.4ms",
        details: "Classifies finger posture extensions to trigger 5 elemental magic spells: 1 = Fire 🔥, 2 = Water 💧, 3 = Ice ❄️, 4 = Lightning ⚡, 5 = Earth 🪨.",
        codeSnippet: `if (extendedFingers === 3) castSpell('ICE_BLAST');\nelse if (extendedFingers === 5) castSpell('EARTH_SHIELD');`,
        metrics: { "Classification Speed": "1.4ms", "Active Spell": "3_FINGERS (ICE_BLAST)", "Accuracy": "99.2%" }
      },
      {
        id: "webgl",
        title: "4. Three.js Particle Burst",
        subtitle: "WebGL Particle Combat HUD",
        icon: "star",
        latency: "16.6ms (60 FPS)",
        details: "Renders GPU-accelerated particle spell animations and boss combat sequences in Three.js WebGL canvas.",
        codeSnippet: `particleSystem.rotation.y += 0.02;\nrenderer.render(scene, camera);`,
        metrics: { "Particle Count": 5000, "WebGL Render Latency": "16.6ms", "Shader Acceleration": "GPU Active" }
      }
    ]
  },
  "eduguide": {
    pipelineTitle: "EduGuide AI Recommendation Matrix (30+ Majors)",
    nodes: [
      {
        id: "profile",
        title: "1. Student Profile Analysis",
        subtitle: "Academic & Personal Vector",
        icon: "star",
        latency: "4.2ms",
        details: "Parses high school subject scores, personal interest choices, and location preferences into a normalized feature vector.",
        codeSnippet: `profile_vec = normalize_vector(transcript_scores, interest_weights)`,
        metrics: { "Features Mapped": 18, "Normalizer": "MinMax", "Latency": "4.2ms" }
      },
      {
        id: "matching",
        title: "2. Recommender Core Algorithm",
        subtitle: "30+ University Majors Matrix",
        icon: "compass",
        latency: "12.1ms",
        details: "Calculates cosine similarity and admission probability across 30+ academic majors and top Vietnamese universities.",
        codeSnippet: `probs = match_algorithm(profile_vec, university_data_matrix)`,
        metrics: { "Majors Evaluated": 32, "Top Matches": 3, "Precision": "94.5%" }
      },
      {
        id: "output",
        title: "3. Interactive Career Dashboard",
        subtitle: "User-Centric UI Output",
        icon: "external",
        latency: "3.5ms",
        details: "Renders intuitive career roadmaps, salary projections, and cutoff mark history in a modern responsive dashboard.",
        codeSnippet: `renderDashboard(topMatches, careerRoadmap)`,
        metrics: { "Award": "3rd Place AI Social", "Render Time": "3.5ms", "Status": "DEPLOYED" }
      }
    ]
  }
}

export function InteractiveArchitectureVisualizer({ projectId }: { projectId: string }) {
  const config = architectureData[projectId] || architectureData["shb-legal-intelligence"]
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0)

  const currentNode = config.nodes[selectedNodeIndex] || config.nodes[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-teal-300/20 pb-3">
        <div className="font-mono text-xs font-bold text-[#FDE68A] uppercase tracking-wider flex items-center gap-2">
          <OceanIcon name="compass" className="w-4 h-4 text-[#2DD4BF]" />
          <span>{config.pipelineTitle}</span>
        </div>
        <div className="font-mono text-[11px] text-[#2DD4BF] font-extrabold bg-teal-400/10 px-3 py-1 poly-badge border border-teal-300/30">
          INTERACTIVE FLOW (CLICK STAGES)
        </div>
      </div>

      {/* Stepper Flow Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {config.nodes.map((node, i) => {
          const isSelected = i === selectedNodeIndex
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeIndex(i)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 relative border overflow-hidden cursor-pointer ${
                isSelected
                  ? "bg-[#023447] border-[#FDE68A] shadow-[0_0_20px_rgba(253,230,138,0.25)] scale-[1.02]"
                  : "bg-[#022433]/80 border-teal-300/30 hover:border-teal-300/70 hover:bg-[#022c3e]"
              }`}
            >
              {/* Connection Beam Indicator */}
              {isSelected && (
                <motion.div
                  layoutId="active-node-indicator"
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2DD4BF] to-[#FDE68A]"
                />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  isSelected ? "bg-[#FDE68A] text-[#022433]" : "bg-teal-400/20 text-[#2DD4BF]"
                }`}>
                  Stage {i + 1}
                </span>
                <span className="font-mono text-[11px] font-bold text-teal-200/80">
                  {node.latency}
                </span>
              </div>

              <h4 className={`font-jakarta text-sm font-extrabold leading-snug mb-1 ${
                isSelected ? "text-[#FDE68A]" : "text-white"
              }`}>
                {node.title.replace(/^\d+\.\s*/, "")}
              </h4>
              <p className="font-mono text-[11px] text-teal-100/70 truncate">
                {node.subtitle}
              </p>
            </button>
          )
        })}
      </div>

      {/* Selected Node Deep-Dive Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl bg-[#011722] border border-teal-300/35 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-300/20 pb-3">
            <div>
              <h4 className="font-fraunces text-lg font-bold text-white flex items-center gap-2">
                <OceanIcon name={currentNode.icon} className="w-4 h-4 text-[#FDE68A]" />
                {currentNode.title}
              </h4>
              <p className="font-mono text-xs text-[#2DD4BF] font-semibold">
                {currentNode.subtitle}
              </p>
            </div>
            <div className="font-mono text-xs text-[#FDE68A] font-extrabold bg-[#022433] px-3 py-1.5 poly-badge border border-[#FDE68A]/40 self-start sm:self-auto">
              Stage Latency: {currentNode.latency}
            </div>
          </div>

          <p className="font-jakarta text-xs md:text-sm text-teal-100/90 leading-relaxed font-medium">
            {currentNode.details}
          </p>

          {/* Metrics Grid */}
          {currentNode.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {Object.entries(currentNode.metrics).map(([k, v]) => (
                <div key={k} className="p-3 rounded-xl bg-[#022433] border border-teal-300/20 text-center">
                  <div className="font-mono text-[10px] text-teal-100/70 font-semibold uppercase">{k}</div>
                  <div className="font-mono text-xs font-extrabold text-[#FDE68A] mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          )}

          {/* Code Snippet Preview */}
          {currentNode.codeSnippet && (
            <div className="space-y-1.5 pt-2">
              <div className="font-mono text-[11px] text-teal-200/80 font-bold uppercase tracking-wider">
                EXECUTABLE ARCHITECTURE SNIPPET:
              </div>
              <pre className="p-4 rounded-xl bg-[#010e16] border border-teal-300/25 text-[#2DD4BF] font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                <code>{currentNode.codeSnippet}</code>
              </pre>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
