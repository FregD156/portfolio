"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
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

  // Scroll-Driven Dynamic Fill Vertical Timeline Beam
  const timelineRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 35%"]
  })

  // Scale height of active fill line from 0 to 1 as user scrolls
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="py-24 relative overflow-hidden" id="experience">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#FDE68A] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <OceanIcon name="anchor" className="w-4 h-4 text-[#2DD4BF]" />
            CAPTAIN'S LOG · CHRONICLES & MILESTONES
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Achievements & <span className="italic font-normal text-[#FDE68A]">Experience</span>
          </h2>
          <p className="font-jakarta text-xs md:text-sm text-teal-100/90 max-w-xl font-medium">
            A proven track record spanning scientific research, AI hackathons, technical leadership, and operations.
          </p>
        </div>

        {/* Pirate Ship Rigging Line & Hook Timeline Container */}
        <div ref={timelineRef} className="relative pl-4 md:pl-44">
          {/* Top Master 3D Crystalline Gemstone Node */}
          <div className="absolute left-[-2px] md:-left-[37px] -top-6 z-20">
            <div className="p-1.5 poly-octagon bg-gradient-to-br from-[#2DD4BF] via-[#043247] to-[#FDE68A] border border-[#FDE68A] text-[#FDE68A] shadow-[0_0_15px_rgba(253,230,138,0.7)]">
              <OceanIcon name="anchor" className="w-3.5 h-3.5 text-[#FDE68A]" />
            </div>
          </div>

          {/* 1. Background Vertical Guide Track Line */}
          <div className="absolute left-[4px] md:-left-[29px] top-2 bottom-2 w-[4px] bg-[#022433] border border-teal-300/30 rounded-full z-0" />

          {/* 2. Scroll-Driven Active Glowing Crystalline Laser Fill Beam Line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[4px] md:-left-[29px] top-2 bottom-2 w-[4px] bg-gradient-to-b from-[#FDE68A] via-[#2DD4BF] to-[#06B6D4] shadow-[0_0_18px_rgba(45,212,191,1)] z-10 rounded-full"
          />

          {/* Expanded Experience Cards Container */}
          <div className="space-y-6 pl-4 md:pl-6 w-full">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative group w-full"
              >
                {/* Floating Date Badge Positioned Safely to the LEFT of Anchor Hook Icon */}
                <div className="hidden md:flex absolute -left-[210px] top-3.5 w-36 flex-col items-end text-right z-20">
                  <span className="font-mono text-xs text-[#FDE68A] font-extrabold bg-[#022433] border border-[#FDE68A]/80 px-3 py-1 poly-badge shadow-md backdrop-blur-md group-hover:border-[#2DD4BF] group-hover:text-white transition-colors">
                    {item.duration}
                  </span>
                  <span className="font-mono text-[10px] text-[#2DD4BF] font-extrabold uppercase tracking-wider mt-1 pr-1">
                    {item.period}
                  </span>
                </div>

                {/* 3D Crystalline Low-Poly Gemstone Facet Timeline Node (Attached Directly to Spine) */}
                <div className="absolute -left-8 md:-left-[43px] top-3.5 z-20 flex items-center">
                  <div className="w-6 h-6 md:w-7 md:h-7 poly-octagon bg-gradient-to-br from-[#2DD4BF] via-[#022433] to-[#FDE68A] border border-[#FDE68A] flex items-center justify-center text-[#FDE68A] shadow-[0_0_15px_rgba(45,212,191,0.7)] group-hover:scale-120 group-hover:border-[#2DD4BF] group-hover:text-white transition-all duration-300">
                    <OceanIcon name="anchor" className="w-3 h-3 text-[#FDE68A] group-hover:text-white transition-colors" />
                  </div>
                  {/* Facet Line Connector (Locking Card directly to Spine) */}
                  <div className="w-3 md:w-5 h-[2px] bg-gradient-to-r from-[#FDE68A] to-[#2DD4BF] shadow-[0_0_8px_rgba(253,230,138,0.8)]" />
                </div>

                {/* Expanded Sleek Experience Frame */}
                <div className="glass-resort-card p-5 md:p-7 poly-chamfer crystal-card border border-teal-300/30 group-hover:border-[#FDE68A]/80 shadow-md transition-all duration-300 group-hover:-translate-y-1 w-full">

                  {/* Mobile-only Date Tag (hidden on desktop because it's on the left side) */}
                  <div className="flex md:hidden items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-[#FDE68A] font-extrabold bg-[#022433] border border-[#FDE68A]/70 px-3 py-0.5 poly-badge shadow-sm">
                      {item.duration}
                    </span>
                    <span className="font-mono text-[10px] text-[#2DD4BF] font-extrabold uppercase tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  {/* Role Title & Company */}
                  <h3 className="font-fraunces text-lg md:text-xl font-bold text-white mb-1 group-hover:text-[#FDE68A] transition-colors leading-tight">
                    {item.role}
                  </h3>
                  <p className="font-jakarta text-xs md:text-sm text-[#2DD4BF] mb-2.5 font-bold">
                    {item.company}
                  </p>

                  {/* Award Highlight & Certificate Button */}
                  {item.highlight && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="font-mono text-xs px-3 py-1 poly-badge border border-[#FDE68A] text-[#FDE68A] bg-[#022433] flex items-center gap-1.5 font-bold shadow-sm">
                        <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FDE68A]" />
                        {item.highlight}
                      </span>
                      {item.certificateUrl && (
                        <button
                          onClick={() => setSelectedCert(item)}
                          className="font-mono inline-flex items-center gap-1.5 text-xs px-3 py-1 poly-badge border border-[#2DD4BF]/60 bg-[#022433] hover:border-[#FDE68A] text-[#2DD4BF] hover:text-[#FDE68A] transition-all font-bold cursor-pointer"
                        >
                          <OceanIcon name="star" className="w-3.5 h-3.5 text-[#FDE68A]" />
                          View Certificate
                        </button>
                      )}
                    </div>
                  )}

                  {/* Description Paragraph (Crystal Clear Legibility) */}
                  <p className="font-jakarta text-xs md:text-sm text-teal-50 leading-relaxed font-medium mb-3.5">
                    {item.description}
                  </p>

                  {/* Tech / Skill Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] md:text-[11px] text-[#2DD4BF] border border-[#2DD4BF]/35 px-2.5 py-0.5 poly-badge bg-[#022433]/80 font-bold"
                      >
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
                      className="postmark inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 poly-badge border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
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

