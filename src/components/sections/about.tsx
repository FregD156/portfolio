"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"

const techStack = [
  { name: "JavaScript", icon: "code" },
  { name: "Python",     icon: "terminal" },
  { name: "Java",       icon: "code" },
  { name: "C / C++",   icon: "terminal" },
  { name: "Node.js",   icon: "code" },
  { name: "Express.js",icon: "code" },
  { name: "FastAPI",   icon: "terminal" },
  { name: "Git",       icon: "anchor" },
  { name: "HTML / CSS",icon: "shell" },
  { name: "AI Integrations", icon: "compass" },
]

const languages = [
  { name: "Vietnamese", level: "Native", pct: 100 },
  { name: "English",    level: "Professional", pct: 80 },
  { name: "Korean",     level: "TOPIK Prep", pct: 45 },
]

export function About() {
  return (
    <section className="py-28 relative" id="about">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header with Storyline Chapter Badge */}
        <div className="mb-16 text-center md:text-left">
          <div className="mb-4">
            <span className="chapter-badge">
              <OceanIcon name="compass" className="w-4 h-4 text-primary" />
              CHAPTER 03 // THE EXPLORER&apos;S JOURNEY
            </span>
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white">
            About <span className="italic font-normal text-primary">my engineering path</span>
          </h2>
          <p className="font-jakarta text-sm md:text-base text-teal-100/80 mt-3 max-w-2xl">
            From academic research at UTT (GPA 3.64) to building award-winning AI solutions and preparing for KNUT South Korea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left - Narrative + Languages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-jakarta space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed mb-10">
              <p>
                I am a Software Engineering student at the{" "}
                <span className="text-foreground font-semibold">University of Transport Technology (UTT)</span>,
                maintaining an Excellent academic standing with a <span className="text-primary font-bold">3.64 GPA</span>. Driven by logic and a
                proactive mindset, I actively seek opportunities to solve real-world problems through
                advanced software workflows and practical implementations.
              </p>
              <p>
                As a proven AI builder, I achieved{" "}
                <span className="text-foreground font-semibold">Top 6 in Hackathon: AI for Everyday Life (LIKELION / K-Tech College 2026)</span>
                {" "}and secured <span className="text-primary font-bold">3rd Place in the &quot;AI for Social Challenge&quot;</span>
                {" "}as Team Leader. I bring a well-rounded background combining technical skills with soft
                skills acquired through operational and leadership roles.
              </p>
              <p>
                I look forward to expanding my global perspective by continuing studies at the{" "}
                <span className="text-foreground font-semibold">Korea National University of Transportation (KNUT)</span>.
              </p>
            </div>

            {/* Language bars */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <h3 className="font-fraunces text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <OceanIcon name="shell" className="w-5 h-5 text-primary" /> Language Proficiency
              </h3>
              <div className="space-y-4">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-1.5 font-jakarta">
                      <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                      <span className="postmark text-xs text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-border/60 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        style={{ opacity: lang.pct === 100 ? 1 : lang.pct === 80 ? 0.75 : 0.5 }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Skill tags + Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-fraunces text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <OceanIcon name="code" className="w-5 h-5 text-primary" /> Technical Capabilities
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/70 bg-card/60 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 cursor-default"
                >
                  <OceanIcon name={tech.icon} className="w-4 h-4 text-primary" />
                  <span className="postmark text-xs text-foreground">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Postcard stamp block */}
            <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-primary/30 group-hover:text-primary/60 transition-colors">
                <OceanIcon name="sailboat" className="w-10 h-10" />
              </div>
              <div className="postmark text-xs text-primary mb-2">FUTURE HORIZONS · ACADEMIC GOAL</div>
              <div className="font-fraunces text-lg font-bold text-foreground mb-2">
                Korea National University of Transportation (KNUT)
              </div>
              <div className="font-jakarta text-xs text-muted-foreground leading-relaxed">
                Aiming to advance global perspective and academic excellence through specialized graduate studies and research collaboration in South Korea.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

