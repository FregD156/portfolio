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
    <section className="py-20 border-b border-border/60 relative overflow-hidden" id="stats">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border/60">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col px-4 sm:px-6 lg:px-8 first:pl-0 last:pr-0 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-fraunces text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-primary group-hover:scale-105 transition-transform duration-300">
                    {s.value}
                  </span>
                  {s.unit && <span className="font-fraunces text-lg font-bold text-muted-foreground">{s.unit}</span>}
                </div>
                <OceanIcon name={s.icon} className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
              </div>
              <div className="font-jakarta text-sm font-bold text-foreground mb-1">{s.label}</div>
              <div className="postmark text-xs text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

