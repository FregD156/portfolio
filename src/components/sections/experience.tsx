"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { OceanIcon } from "@/components/ui/ocean-icons"

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
    description: "Developed a temporal Graph-RAG system. Engineered hybrid search with RRF, dynamic legal clause resolution, and reference network traversal mapping 15,000+ SQLite/FAISS chunks.",
    tags: ["Graph-RAG", "Hybrid Retrieval", "Banking Compliance", "FastAPI"],
  },
  {
    period: "Academic",
    role: "Research Member & Team Leader",
    company: "University of Transport Technology (UTT)",
    duration: "2023 – Present",
    highlight: "3rd Place - AI for Social Challenge",
    description: "Core member of scientific research team. Led team to build EduGuide AI, an award-winning university recommendation system. Maintained 3.64 GPA throughout.",
    tags: ["AI Research", "Team Leadership", "Software Engineering"],
  },
  {
    period: "Sports",
    role: "Regional Champions & Athletes",
    company: "Provincial / Regional Competitions",
    duration: "2019 – 2023",
    highlight: "Volleyball Champion & Badminton Silver Medalist",
    description: "Regional Volleyball Champion (2023), Silver Medalist in Badminton (2019), and 5-year participant in District/Provincial academic contests.",
    tags: ["Leadership", "Athletics", "Teamwork"],
  },
  {
    period: "12 Months",
    role: "Badminton Coach",
    company: "Badminton Academy",
    duration: "2025 – Present",
    highlight: "Leadership & Coaching",
    description: "Leveraged athletic background (including Badminton Silver Medal) to design personalized training routines for junior and adult trainees. Developed communication and instruction skills.",
    tags: ["Leadership", "Coaching", "Instruction"],
  },
  {
    period: "12 Months",
    role: "Business Operations Consultant",
    company: "Freelance / Independent",
    duration: "2023 – 2024",
    highlight: "Soft Skills & Operations Development",
    description: "Managed operations, content updates, customer success, and technical workflow setup for private business clients. Developed communication, problem-solving, and administrative execution skills.",
    tags: ["Operations", "Customer Success", "Workflow Setup"],
  },
  {
    period: "11 Months",
    role: "Front of House Specialist & Financial Assistant",
    company: "Le Monde Steak & Cuốn 37 (Golden Gate Group)",
    duration: "2022 – 2023",
    highlight: "Excellent Employee of the Month × 3",
    description: "Supported daily financial tracking and transaction logs. Awarded \"Excellent Employee of the Month\" three times across both establishments for exceptional service.",
    tags: ["Finance", "Customer Service", "Team Coordination"],
  },
]

export function Experience() {
  const [selectedCert, setSelectedCert] = React.useState<TimelineItem | null>(null)

  return (
    <section className="py-28 border-t border-border/60 relative" id="experience">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-2">
            <OceanIcon name="anchor" className="w-5 h-5 text-primary" />
            <span className="postmark text-xs text-primary font-bold">TIMELINE & MILESTONES</span>
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Achievements & <span className="italic font-normal text-primary">Experience</span>
          </h2>
          <p className="font-jakarta text-sm text-muted-foreground max-w-[52ch]">
            A proven track record spanning scientific research, AI hackathons, technical leadership, operational management, and athletic awards.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px ml-[3px] bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

          <div className="space-y-12 pl-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                <div className="absolute -left-8 top-1.5 w-[7px] h-[7px] rounded-full border-2 border-primary bg-background transition-all duration-300 group-hover:scale-[1.8] group-hover:bg-primary" />

                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10">

                  <div className="flex flex-col gap-0.5">
                    <span className="postmark text-xs text-muted-foreground">{item.duration}</span>
                    <span className="postmark text-xs text-primary font-bold">{item.period}</span>
                  </div>

                  <div>
                    <h3 className="font-fraunces text-xl font-bold text-foreground mb-1">{item.role}</h3>
                    <p className="postmark text-xs text-muted-foreground mb-3">{item.company}</p>

                    {item.highlight && (
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="postmark text-xs px-3 py-1 rounded-full border border-primary/40 text-primary bg-primary/10 flex items-center gap-1.5 font-bold">
                          <OceanIcon name="trophy" className="w-3.5 h-3.5 text-primary" />
                          {item.highlight}
                        </span>
                        {item.certificateUrl && (
                          <button
                            onClick={() => setSelectedCert(item)}
                            className="postmark inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-border bg-card/60 hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer"
                          >
                            <OceanIcon name="star" className="w-3.5 h-3.5 text-primary" />
                            View Certificate
                          </button>
                        )}
                      </div>
                    )}

                    <p className="font-jakarta text-sm text-muted-foreground leading-relaxed mb-4 max-w-[55ch]">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="postmark text-[11px] text-muted-foreground border border-border/70 px-2.5 py-0.5 rounded-md group-hover:border-primary/40 group-hover:text-primary transition-colors duration-200">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="postmark text-xs text-primary flex items-center gap-1.5 mb-1">
                    <OceanIcon name="trophy" className="w-4 h-4" /> OFFICIAL AWARD CERTIFICATE
                  </div>
                  <h3 className="font-fraunces text-xl md:text-2xl font-bold text-foreground">{selectedCert.highlight}</h3>
                  <p className="postmark text-xs text-muted-foreground">{selectedCert.company} · {selectedCert.duration}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <OceanIcon name="wave" className="w-5 h-5" />
                </button>
              </div>

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

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60 flex-wrap">
                <p className="postmark text-xs text-muted-foreground">
                  Awarded to <span className="text-foreground font-bold">Nguyen Thanh Duy</span>
                </p>
                <div className="flex items-center gap-3">
                  {selectedCert.certificatePdf && (
                    <a
                      href={selectedCert.certificatePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="postmark inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <OceanIcon name="terminal" className="w-4 h-4" />
                      Open Certificate PDF <OceanIcon name="external" className="w-3.5 h-3.5" />
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

