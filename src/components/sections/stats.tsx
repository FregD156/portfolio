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
    <section className="py-12 md:py-16 relative" id="stats">
      {/* Minimalist Glass Ribbon Container with Hairline Borders */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="rounded-3xl border border-teal-300/25 bg-[#022433]/60 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-teal-300/20">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:px-8 first:pl-0 last:pr-0 group"
              >
                {/* Top Row: Icon & Category Indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <OceanIcon name={s.icon} className="w-4 h-4 text-[#2DD4BF] group-hover:text-[#FDE68A] transition-colors" />
                  <span className="font-mono text-[11px] font-bold text-teal-200/80 uppercase tracking-widest">
                    {s.sub.split("·")[0]}
                  </span>
                </div>

                {/* Big Bold Striking Number */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-fraunces text-5xl lg:text-6xl font-extrabold text-[#FDE68A] tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(253,230,138,0.3)] group-hover:scale-105 transition-transform duration-300">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-fraunces text-xl font-bold text-[#2DD4BF]">
                      {s.unit}
                    </span>
                  )}
                </div>

                {/* Clean White Label */}
                <h3 className="font-jakarta text-base font-bold text-white tracking-tight group-hover:text-[#FDE68A] transition-colors">
                  {s.label}
                </h3>

                {/* Detail Tag Line */}
                <p className="font-mono text-xs text-teal-100/70 font-medium mt-1">
                  {s.sub.includes("·") ? s.sub.split("·").slice(1).join("·").trim() : s.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
