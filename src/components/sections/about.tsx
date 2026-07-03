"use client"

import * as React from "react"
import { motion } from "framer-motion"

const techStack = [
  { name: "JavaScript", icon: "JS" },
  { name: "Python",     icon: "PY" },
  { name: "Java",       icon: "☕" },
  { name: "C / C++",   icon: "C"  },
  { name: "Node.js",   icon: "⬡"  },
  { name: "Express.js",icon: "EX" },
  { name: "FastAPI",   icon: "⚡" },
  { name: "Git",       icon: "⎇"  },
  { name: "HTML / CSS",icon: "◻"  },
  { name: "AI Integrations", icon: "◈" },
]

const languages = [
  { name: "Vietnamese", level: "Native", pct: 100 },
  { name: "English",    level: "",       pct: 80  },
  { name: "Korean",     level: "",       pct: 40  },
]

export function About() {
  return (
    <section className="py-32" id="about">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            About me
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left - narrative + languages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-10">
              <p>
                I am a Software Engineering student at the{" "}
                <span className="text-foreground font-medium">University of Transport Technology (UTT)</span>,
                maintaining an Excellent academic standing with a 3.64 GPA. Driven by logic and a
                proactive mindset, I actively seek opportunities to solve real-world problems through
                advanced software workflows and practical implementations.
              </p>
              <p>
                As a proven leader, I served as Team Leader and secured{" "}
                <span className="text-primary font-medium">3rd Place in the &quot;AI for Social Challenge&quot;</span>
                {" "}competition. I bring a well-rounded background combining technical skills with soft
                skills acquired through over a year of operational and management roles.
              </p>
              <p>
                I look forward to expanding my global perspective by continuing studies at the{" "}
                <span className="text-foreground font-medium">Korea National University of Transportation (KNUT)</span>.
              </p>
            </div>

            {/* Language bars */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5">Language Proficiency</h3>
              <div className="space-y-4">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{lang.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        style={{ opacity: lang.pct === 100 ? 1 : lang.pct === 80 ? 0.7 : 0.45 }}
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

          {/* Right - skill tags + note */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-6">Technical Skills</h3>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                >
                  <span className="text-xs font-mono text-primary">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            {/* "Currently exploring" card */}
            <div className="p-5 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
              <div className="text-[10px] font-mono text-primary uppercase tracking-[0.15em] mb-2">
                Currently exploring
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                Korea National University of Transportation
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                Planning to advance global perspective and academic excellence through graduate
                study opportunities at KNUT in Korea.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
