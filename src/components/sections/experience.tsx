"use client"

import * as React from "react"
import { motion } from "framer-motion"

const timeline = [
  {
    period: "Competition",
    role: "Hackathon Participant",
    company: "Vietnam AI Innovation Challenge",
    duration: "2026",
    highlight: "SHB Legal Intelligence",
    description: "Developed a sophisticated Temporal Graph-RAG system. Engineered hybrid search with RRF, dynamic legal clause resolution, and reference network traversal mapping 15,000+ SQLite/FAISS chunks.",
    tags: ["Graph-RAG", "Hybrid Retrieval", "Banking Compliance", "FastAPI"],
  },
  {
    period: "Academic",
    role: "Research Member & Team Leader",
    company: "University of Transport Technology (UTT)",
    duration: "2023 – Present",
    highlight: "3rd Place - AI for Social Challenge",
    description: "Member of a key scientific research team. Led a team to build EduGuide AI, an award-winning university recommendation system. Maintained a 3.64 GPA throughout.",
    tags: ["AI Research", "Team Leadership", "Software Engineering"],
  },
  {
    period: "12 Months",
    role: "Badminton Coach",
    company: "Badminton Academy",
    duration: "2025 – Present",
    highlight: "Regional Silver Medalist",
    description: "Leveraged athletic background to design personalized training routines for junior and adult students. Developed key leadership, communication, and soft skills in a fast-paced environment.",
    tags: ["Leadership", "Coaching", "Soft Skills"],
  },
  {
    period: "12 Months",
    role: "Business Operations Consultant",
    company: "Freelance / Independent",
    duration: "2023 – 2024",
    highlight: "Soft Skills & Operations Development",
    description: "Managed operations, content updates, customer success, and technical workflow setup for private business clients. Developed communication, problem-solving, and administrative execution skills.",
    tags: ["Operations", "Customer Success", "Soft Skills Development"],
  },
  {
    period: "11 Months",
    role: "Front of House Specialist & Financial Assistant",
    company: "Le Monde Steak & Cuốn 37 (Golden Gate Group)",
    duration: "2022 – 2023",
    highlight: "Excellent Employee of the Month × 3",
    description: "Supported daily financial tracking and transaction logs. Awarded \"Excellent Employee of the Month\" three times across both establishments for exceptional performance.",
    tags: ["Finance", "Customer Service", "Team Coordination"],
  },
]

export function Experience() {
  return (
    <section className="py-32 border-t border-border" id="experience">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Background
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground max-w-[50ch]"
          >
            A track record spanning research, operations, and leadership across academic and professional environments.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px ml-[3px]"
            style={{ background: "linear-gradient(to bottom, rgba(217,119,87,0.4), rgba(217,119,87,0.05))" }}
          />

          <div className="space-y-14 pl-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Dot */}
                <div className="absolute -left-8 top-1.5 w-[7px] h-[7px] rounded-full border-2 border-primary bg-background transition-all duration-300 group-hover:scale-[1.6] group-hover:bg-primary" />

                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">

                  {/* Time info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-muted-foreground">{item.duration}</span>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">{item.period}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-0.5 leading-snug">{item.role}</h3>
                    <p className="text-sm font-mono text-muted-foreground mb-3">{item.company}</p>

                    {item.highlight && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 text-primary bg-primary/8">
                          ✦ {item.highlight}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-[55ch]">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[11px] font-mono text-muted-foreground border border-border px-2.5 py-0.5 rounded-md hover:border-primary/30 hover:text-primary transition-colors duration-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
