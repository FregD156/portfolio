"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"

const stats = [
  { value: "3.64", unit: "/4.0",  label: "Academic GPA",            sub: "UTT · Excellent Standing", icon: "star" },
  { value: "Top 6", unit: "",      label: "AI Hackathon",           sub: "K-Tech & LIKELION 2026",   icon: "trophy" },
  { value: "3rd",  unit: " Place", label: "AI for Social",          sub: "Team Leader · Award",       icon: "anchor" },
  { value: "1.5+", unit: " yrs",  label: "Work Experience",          sub: "Operations & Coaching",     icon: "compass" },
]

export function Stats() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="stats">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(6,182,212,0.12),transparent_75%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group poly-chamfer crystal-card bg-[#022433]/90 border border-teal-300/40 p-6 md:p-7 shadow-2xl hover:border-[#FDE68A] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(253,230,138,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header Row: Value & Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-fraunces text-4xl lg:text-5xl font-extrabold text-[#FDE68A] tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(253,230,138,0.35)] group-hover:scale-105 transition-transform duration-300">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-fraunces text-lg font-bold text-[#2DD4BF]">
                      {s.unit}
                    </span>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-300/30 text-[#FDE68A] group-hover:bg-[#FDE68A]/20 group-hover:border-[#FDE68A] transition-all duration-300 shadow-md">
                  <OceanIcon name={s.icon} className="w-5 h-5" />
                </div>
              </div>

              {/* Body: Label & Subtitle */}
              <div>
                <h3 className="font-jakarta text-base md:text-lg font-extrabold text-white tracking-tight mb-1 group-hover:text-[#FDE68A] transition-colors">
                  {s.label}
                </h3>
                <div className="font-mono text-xs font-bold text-teal-100/90 uppercase tracking-wider">
                  {s.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
