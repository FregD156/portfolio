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
    <section className="py-28 relative overflow-hidden" id="experience">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-20">
          <div className="font-mono text-xs text-[#FDE68A] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <OceanIcon name="anchor" className="w-4 h-4 text-[#2DD4BF]" />
            CAPTAIN'S LOG · NAUTICAL CHRONICLES
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Achievements & <span className="italic font-normal text-[#FDE68A]">Experience</span>
          </h2>
          <p className="font-jakarta text-sm md:text-base text-teal-100/90 max-w-[55ch] font-medium">
            A proven track record spanning scientific research, AI hackathons, technical leadership, operational management, and athletic awards.
          </p>
        </div>

        {/* Pirate Ship Rigging Line & Hook Timeline */}
        <div className="relative pl-6 md:pl-28">
          {/* Top Golden Brass Master Anchor */}
          <div className="absolute left-[3px] md:left-[23px] -top-5 z-20">
            <div className="p-1.5 rounded-full border border-[#FDE68A] bg-[#022433] text-[#FDE68A] shadow-[0_0_15px_rgba(253,230,138,0.5)]">
              <OceanIcon name="anchor" className="w-4 h-4" />
            </div>
          </div>

          {/* Vertical Pirate Rigging Rope Bar */}
          <div className="absolute left-[13px] md:left-[33px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#FDE68A] via-[#2DD4BF] to-transparent shadow-sm rounded-full" />

          <div className="space-y-8 pl-6 md:pl-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* External Pirate Anchor Hook with Floating Time Badge */}
                <div className="absolute -left-10 md:-left-36 top-4 z-20 flex items-center gap-2">
                  {/* Floating Date Badge outside Card */}
                  <div className="hidden md:flex flex-col items-end text-right">
                    <span className="font-mono text-[11px] text-[#FDE68A] font-extrabold bg-[#022433]/90 border border-[#FDE68A]/60 px-2.5 py-0.5 rounded-full shadow-md">
                      {item.duration}
                    </span>
                    <span className="font-mono text-[9px] text-[#2DD4BF] font-extrabold uppercase tracking-wider mt-0.5">
                      {item.period}
                    </span>
                  </div>

                  {/* Golden Anchor Hook Circle */}
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#FDE68A] bg-[#022433] flex items-center justify-center text-[#FDE68A] shadow-md group-hover:scale-110 group-hover:bg-[#FDE68A] group-hover:text-[#022433] transition-all duration-300">
                    <OceanIcon name="anchor" className="w-3.5 h-3.5" />
                  </div>

                  {/* Connector Line */}
                  <div className="w-3 md:w-5 h-[1.5px] bg-[#FDE68A]/60" />
                </div>

                {/* Clean 1-Column Experience Card */}
                <div className="glass-resort-card p-5 md:p-6 rounded-2xl border border-teal-300/25 group-hover:border-[#FDE68A]/60 shadow-lg transition-all duration-300">
                  {/* Mobile-only Date Tag */}
                  <div className="flex md:hidden items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] text-[#FDE68A] font-bold bg-[#022433] border border-[#FDE68A]/40 px-2 py-0.5 rounded-full">
                      {item.duration}
                    </span>
                    <span className="font-mono text-[9px] text-[#2DD4BF] font-extrabold uppercase">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-fraunces text-lg md:text-xl font-bold text-white mb-1 group-hover:text-[#FDE68A] transition-colors">{item.role}</h3>
                  <p className="font-jakarta text-xs text-teal-100/80 mb-3 font-semibold">{item.company}</p>

                  {item.highlight && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="font-mono text-[11px] px-3 py-0.5 rounded-full border border-[#FDE68A]/70 text-[#FDE68A] bg-[#022433]/80 flex items-center gap-1.5 font-bold shadow-sm">
                        <OceanIcon name="trophy" className="w-3 h-3 text-[#FDE68A]" />
                        {item.highlight}
                      </span>
                      {item.certificateUrl && (
                        <button
                          onClick={() => setSelectedCert(item)}
                          className="font-mono inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full border border-teal-300/40 bg-white/10 hover:border-[#FDE68A] text-teal-100 hover:text-white transition-all duration-200 cursor-pointer font-bold"
                        >
                          <OceanIcon name="star" className="w-3 h-3 text-[#FDE68A]" />
                          View Certificate
                        </button>
                      )}
                    </div>
                  )}

                  <p className="font-jakarta text-xs md:text-sm text-teal-100/90 leading-relaxed font-medium mb-3">{item.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] text-teal-200/90 border border-teal-300/25 px-2.5 py-0.5 rounded-full bg-white/5 font-medium">
                        {tag}
                      </span>
                    ))}
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

