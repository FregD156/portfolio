"use client"

import * as React from "react"
import { motion } from "framer-motion"

const stats = [
  { value: "3.64", unit: "/4.0",  label: "Academic GPA",            sub: "UTT · Excellent Standing",            warm: true  },
  { value: "3rd",  unit: " Place", label: "AI for Social Challenge", sub: "Team Leader · National Competition",  warm: false },
  { value: "1.5+", unit: " yrs",  label: "Work Experience",          sub: "Operations & Management Roles",       warm: true  },
]

export function Stats() {
  return (
    <section className="py-20 border-y border-border relative overflow-hidden" id="stats">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(217,119,87,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col px-8 first:pl-0 last:pr-0"
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-primary">
                  {s.value}
                </span>
                <span className="text-lg font-bold text-muted-foreground">{s.unit}</span>
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
              <div className="text-xs font-mono text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
