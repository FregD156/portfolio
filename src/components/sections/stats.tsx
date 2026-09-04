"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { OceanIcon } from "@/components/ui/ocean-icons"
import { useLanguage } from "@/context/language-context"

export function Stats() {
  const { t } = useLanguage()

  const stats = [
    { value: "3.64", unit: "/4.0",  labelKey: "stats.gpa",        subKey: "stats.gpaSub",        icon: "star" },
    { value: "Top 6", unit: "",      labelKey: "stats.hackathon",  subKey: "stats.hackathonSub",  icon: "trophy" },
    { value: "3rd",  unit: " Place", labelKey: "stats.award",      subKey: "stats.awardSub",      icon: "anchor" },
    { value: "1.5+", unit: " yrs",  labelKey: "stats.experience", subKey: "stats.experienceSub", icon: "compass" },
  ]

  return (
    <section className="py-16 md:py-24 relative border-y border-teal-300/15" id="stats">
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(45,212,191,0.08),transparent_80%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Completely Open, Frameless, Airy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {stats.map((s, i) => {
            const label = t(s.labelKey)
            const sub = t(s.subKey)
            return (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col group relative"
              >
                {/* Category Indicator & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#2DD4BF] uppercase tracking-widest">
                    {sub.split("·")[0].trim()}
                  </span>
                  <OceanIcon name={s.icon} className="w-5 h-5 text-teal-200/50 group-hover:text-[#FDE68A] group-hover:scale-110 transition-all duration-300" />
                </div>

                {/* Giant Floating Sun-Gold Number */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-fraunces text-5xl lg:text-6xl font-extrabold text-[#FDE68A] tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(253,230,138,0.35)] group-hover:translate-x-1 transition-transform duration-300">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-fraunces text-2xl font-bold text-[#2DD4BF] drop-shadow-sm">
                      {s.unit}
                    </span>
                  )}
                </div>

                {/* Pure White Bold Title */}
                <h3 className="font-jakarta text-lg font-extrabold text-white tracking-tight leading-snug group-hover:text-[#FDE68A] transition-colors drop-shadow-sm">
                  {label}
                </h3>

                {/* Subtitle Detail */}
                <p className="font-mono text-xs font-semibold text-teal-100/80 mt-1.5 leading-normal">
                  {sub.includes("·") ? sub.split("·").slice(1).join("·").trim() : sub}
                </p>

                {/* Minimal Accent Glow Line on Hover */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#FDE68A] to-[#2DD4BF] mt-4 transition-all duration-500 rounded-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
