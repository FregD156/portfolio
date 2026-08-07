"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"

const techCategories = [
  {
    title: "AI & Graph-RAG",
    skills: ["Python", "FastAPI", "FAISS", "NetworkX", "RRF Hybrid Search", "AI Integrations"],
    icon: "compass"
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Express.js", "Java", "C / C++", "SQLite", "PostgreSQL"],
    icon: "terminal"
  },
  {
    title: "Frontend & Web",
    skills: ["JavaScript", "TypeScript", "React 19", "Next.js", "Tailwind CSS", "HTML/CSS"],
    icon: "code"
  },
  {
    title: "Tooling & Deployment",
    skills: ["Git", "GitHub", "Vercel", "Linux", "REST APIs", "System Design"],
    icon: "anchor"
  }
]

const languages = [
  { name: "Vietnamese", level: "Native Proficiency", pct: 100 },
  { name: "English",    level: "Professional Working", pct: 85 },
  { name: "Korean",     level: "TOPIK Preparation", pct: 50 },
]

export function About() {
  return (
    <section className="py-28 relative" id="about">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header with Storyline Chapter Badge */}
        <div className="mb-16">
          <div className="mb-4">
            <span className="chapter-badge">
              <OceanIcon name="compass" className="w-4 h-4 text-primary" />
              CHAPTER 03 // THE EXPLORER&apos;S JOURNEY
            </span>
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
            About <span className="italic font-normal text-[#2DD4BF]">my engineering path</span>
          </h2>
          <p className="font-jakarta text-sm md:text-base text-teal-100/80 mt-3 max-w-2xl">
            Student developer at UTT (GPA 3.64). 3rd Place Team Leader at AI for Social Challenge & Hackathon Top 6 Finalist.
          </p>
        </div>

        {/* Main Grid: Left Narrative & Languages / Right Categorized Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column (7 cols): Bio Narrative & Languages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Bio Card */}
            <div className="p-8 rounded-2xl border border-teal-300/30 bg-[#042d3e]/80 backdrop-blur-md shadow-xl">
              <h3 className="font-fraunces text-xl font-bold text-white mb-4 flex items-center gap-2">
                <OceanIcon name="wave" className="w-5 h-5 text-primary" /> Background & Perspective
              </h3>
              <div className="font-jakarta space-y-4 text-sm md:text-base text-teal-100/90 leading-relaxed font-medium">
                <p>
                  I am a Software Engineering student at the{" "}
                  <span className="text-white font-bold underline decoration-primary/50">University of Transport Technology (UTT)</span>,
                  maintaining an Excellent academic standing with a <span className="text-[#2DD4BF] font-extrabold">3.64 / 4.00 GPA</span>. Driven by logic and a proactive mindset, I engineer AI pipelines and high-performance backend systems.
                </p>
                <p>
                  As an active AI researcher and team leader, I led my team to win{" "}
                  <span className="text-white font-bold">3rd Place in the AI for Social Challenge</span> with <span className="text-[#2DD4BF] font-bold">EduGuide AI</span>, and reached <span className="text-white font-bold">Top 6 in Hackathon: AI for Everyday Life</span> (LIKELION / K-Tech College 2026).
                </p>
                <p>
                  I am actively pursuing academic and research opportunities at the{" "}
                  <span className="text-[#2DD4BF] font-bold">Korea National University of Transportation (KNUT)</span> to expand my global research perspective.
                </p>
              </div>
            </div>

            {/* Language Proficiency Card */}
            <div className="p-8 rounded-2xl border border-teal-300/30 bg-[#042d3e]/80 backdrop-blur-md shadow-xl">
              <h3 className="font-fraunces text-xl font-bold text-white mb-6 flex items-center gap-2">
                <OceanIcon name="shell" className="w-5 h-5 text-primary" /> Language Proficiency
              </h3>
              <div className="space-y-5">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2 font-jakarta">
                      <span className="text-sm font-bold text-white">{lang.name}</span>
                      <span className="postmark text-xs text-[#2DD4BF] font-semibold">{lang.level}</span>
                    </div>
                    <div className="h-2.5 bg-[#031c28] rounded-full overflow-hidden border border-teal-300/20">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Categorized Skills & KNUT Horizon Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Categorized Technical Arsenal */}
            <div className="p-8 rounded-2xl border border-teal-300/30 bg-[#042d3e]/80 backdrop-blur-md shadow-xl">
              <h3 className="font-fraunces text-xl font-bold text-white mb-6 flex items-center gap-2">
                <OceanIcon name="code" className="w-5 h-5 text-primary" /> Technical Arsenal
              </h3>

              <div className="space-y-5">
                {techCategories.map((cat) => (
                  <div key={cat.title} className="space-y-2">
                    <div className="postmark text-xs text-[#2DD4BF] font-bold flex items-center gap-1.5">
                      <OceanIcon name={cat.icon} className="w-3.5 h-3.5 text-primary" />
                      {cat.title}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="postmark text-[11px] px-2.5 py-1 rounded-lg border border-teal-300/30 bg-teal-500/10 text-teal-100 font-medium hover:border-primary transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target KNUT Future Goal Block */}
            <div className="p-6 rounded-2xl border border-primary/40 bg-gradient-to-br from-[#06B6D4]/15 to-[#2DD4BF]/10 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-primary/30 group-hover:text-primary/60 transition-colors">
                <OceanIcon name="sailboat" className="w-10 h-10" />
              </div>
              <div className="postmark text-xs text-[#2DD4BF] font-bold mb-2">FUTURE HORIZONS · ACADEMIC GOAL</div>
              <div className="font-fraunces text-lg font-bold text-white mb-2">
                Korea National University of Transportation (KNUT)
              </div>
              <div className="font-jakarta text-xs text-teal-100/90 leading-relaxed font-medium">
                Aiming to advance global research perspective and academic excellence through specialized graduate studies and AI engineering research collaboration in South Korea.
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}


