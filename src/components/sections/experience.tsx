"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Award, FileText, X, ExternalLink, Eye } from "lucide-react"

interface TimelineItem {
  period: string
  role: string
  company: string
  duration: string
  highlight?: string
  description: string
  tags: string[]
  certificateUrl?: string
  certificatePdf?: string
}

const timeline: TimelineItem[] = [
  {
    period: "Hackathon",
    role: "Top 6 Finalist",
    company: "LIKELION Vietnam · K-Tech College 2026",
    duration: "July 30, 2026",
    highlight: "Top 6 - Hackathon: AI for Everyday Life",
    description: "Awarded Top 6 in the national Hackathon: AI for Everyday Life as part of K-Tech College 2026, organized by LIKELION Vietnam.",
    tags: ["Hackathon", "AI Innovation", "LIKELION", "K-Tech College"],
    certificateUrl: "/assets/images/projects/certificate-likelion-hackathon-2026.png",
    certificatePdf: "/assets/images/projects/Certificate - Nguyễn Thành Duy.pdf",
  },
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
  const [selectedCert, setSelectedCert] = React.useState<TimelineItem | null>(null)

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
              Background & Achievements
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground max-w-[50ch]"
          >
            A track record spanning research, AI hackathons, operations, and leadership across academic and professional environments.
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
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 text-primary bg-primary/8">
                          ✦ {item.highlight}
                        </span>
                        {item.certificateUrl && (
                          <button
                            onClick={() => setSelectedCert(item)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-card/60 hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer"
                          >
                            <Eye className="w-3 h-3 text-primary" />
                            View Certificate
                          </button>
                        )}
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

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4" />
                    Official Certificate
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{selectedCert.highlight}</h3>
                  <p className="text-xs font-mono text-muted-foreground">{selectedCert.company} · {selectedCert.duration}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image View */}
              {selectedCert.certificateUrl && (
                <div className="relative flex-1 min-h-[300px] md:min-h-[450px] w-full rounded-xl overflow-hidden border border-border/60 bg-black/40 mb-6">
                  <Image
                    src={selectedCert.certificateUrl}
                    alt={selectedCert.highlight || "Certificate"}
                    fill
                    sizes="(max-width: 1200px) 100vw, 80vw"
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60 flex-wrap">
                <p className="text-xs text-muted-foreground">
                  Awarded to <span className="text-foreground font-semibold">Nguyen Thanh Duy</span>
                </p>
                <div className="flex items-center gap-3">
                  {selectedCert.certificatePdf && (
                    <a
                      href={selectedCert.certificatePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Open Full PDF
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
