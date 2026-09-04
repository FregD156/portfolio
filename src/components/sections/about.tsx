"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"
import { useLanguage } from "@/context/language-context"

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

export function About() {
  const { t } = useLanguage()

  const languages = [
    { name: t("lang.vi"), level: t("lang.viLevel"), pct: 100 },
    { name: t("lang.en"), level: t("lang.enLevel"), pct: 85 },
    { name: t("lang.kr"), level: t("lang.krLevel"), pct: 50 },
  ]

  return (
    <section className="py-28 relative" id="about">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
            {t("about.headerTitle")}
          </h2>
          <p className="font-jakarta text-sm md:text-base text-teal-100/90 mt-3 max-w-2xl font-medium">
            {t("about.headerSub")}
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
            <div className="p-8 poly-chamfer glass-resort-card crystal-card">
              <h3 className="font-fraunces text-xl font-bold text-white mb-4 flex items-center gap-2">
                <OceanIcon name="wave" className="w-5 h-5 text-[#FDE68A]" /> {t("about.cardTitle")}
              </h3>
              <div className="font-jakarta space-y-4 text-sm md:text-base text-teal-100/95 leading-relaxed font-medium">
                <p>{t("about.bio1")}</p>
                <p>{t("about.bio2")}</p>
                <p>{t("about.bio3")}</p>
              </div>
            </div>

            {/* Language Proficiency Card */}
            <div className="p-8 poly-chamfer glass-resort-card crystal-card">
              <h3 className="font-fraunces text-xl font-bold text-white mb-6 flex items-center gap-2">
                <OceanIcon name="shell" className="w-5 h-5 text-[#FDE68A]" /> {t("about.languages")}
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
                      <span className="font-mono text-xs text-[#FDE68A] font-bold">{lang.level}</span>
                    </div>
                    <div className="h-3.5 md:h-4 bg-[#01141e] overflow-hidden border border-[#2DD4BF]/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]" style={{ clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)" }}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#06B6D4] via-[#2DD4BF] to-[#FDE68A] shadow-[0_0_12px_rgba(45,212,191,0.8)]"
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
            <div className="p-8 poly-chamfer glass-resort-card crystal-card">
              <h3 className="font-fraunces text-xl font-bold text-white mb-6 flex items-center gap-2">
                <OceanIcon name="code" className="w-5 h-5 text-[#FDE68A]" /> Technical Arsenal
              </h3>

              <div className="space-y-5">
                {techCategories.map((cat) => (
                  <div key={cat.title} className="space-y-2">
                    <div className="font-mono text-xs text-[#FDE68A] font-bold flex items-center gap-1.5 uppercase">
                      <OceanIcon name={cat.icon} className="w-3.5 h-3.5 text-[#2DD4BF]" />
                      {cat.title}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[11px] px-3 py-1 poly-badge border border-teal-300/40 bg-white/10 text-teal-100 font-medium hover:border-[#FDE68A] transition-all"
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
            <div className="p-6 poly-chamfer glass-resort-card crystal-card border-l-4 border-l-[#FDE68A] relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-[#FDE68A]/40 group-hover:text-[#FDE68A] transition-colors">
                <OceanIcon name="sailboat" className="w-10 h-10" />
              </div>
              <div className="font-mono text-xs text-[#FDE68A] font-bold mb-2">FUTURE HORIZONS · ACADEMIC GOAL</div>
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


