"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  const skills = {
    languages: ["JavaScript (Node.js)", "Python", "Java", "C / C++ / C#", "HTML5 / CSS3"],
    frameworks: ["Express.js", "AI Tools Integrations", "Git & GitHub", "Terminal & Bash"],
    natural: ["Vietnamese (Native)", "English (Professional)", "Korean (TOPIK Prep)"]
  }

  return (
    <section className="py-28" id="about">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* About narrative block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Driven by logic & rapid adaptability.
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
            <p>
              I am a Software Engineering student at the University of Transport Technology (UTT), maintaining an Excellent academic standing. Driven by logic and a proactive mindset, I actively look for opportunities to solve real-world problems through advanced software workflows and practical implementations.
            </p>
            <p>
              As a proven leader, I served as the Team Leader in the &quot;AI for Social Challenge&quot; competition. I excel under pressure and bring a well-rounded background combining strong technical skills with extensive soft skills acquired through operational management roles. I look forward to advancing my global perspective by continuing my studies at the Korea National University of Transportation (KNUT).
            </p>
          </div>
        </motion.div>

        {/* Bento grid competence cells */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-lg font-semibold tracking-tight">Core Competencies</h3>
          
          <div className="grid grid-cols-1 gap-4">
            
            {/* Cell 1: Programming Languages */}
            <Card className="border border-border bg-card/40 backdrop-blur-sm hover:bg-card-hover/60 hover:border-border-hover transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mb-4">Programming Languages</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm font-mono text-muted-foreground">
                  {skills.languages.map(lang => (
                    <li key={lang} className="flex items-center gap-2">
                      <span className="text-primary text-xs">→</span> {lang}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cell 2: Frameworks & Libraries */}
            <Card className="border border-border bg-card/40 backdrop-blur-sm hover:bg-card-hover/60 hover:border-border-hover transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mb-4">Frameworks & Tools</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm font-mono text-muted-foreground">
                  {skills.frameworks.map(tool => (
                    <li key={tool} className="flex items-center gap-2">
                      <span className="text-primary text-xs">→</span> {tool}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cell 3: Natural Languages */}
            <Card className="border border-border bg-card/40 backdrop-blur-sm hover:bg-card-hover/60 hover:border-border-hover transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mb-4">Languages</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm font-mono text-muted-foreground">
                  {skills.natural.map(lang => (
                    <li key={lang} className="flex items-center gap-2">
                      <span className="text-primary text-xs">→</span> {lang}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
