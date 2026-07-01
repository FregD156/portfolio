"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function Stats() {
  const stats = [
    { value: "3.67", label: "UTT GPA (Excellent)" },
    { value: "3rd Place", label: "AI for Social Challenge" },
    { value: "1.5+ Yrs", label: "Operations & Consulting" }
  ]

  return (
    <section className="py-12 border-y border-border" id="stats">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="border border-border bg-card/40 backdrop-blur-sm hover:border-border-hover hover:bg-card-hover/60 transition-all duration-300">
                <CardContent className="p-6 flex flex-col gap-2">
                  <span className="text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                    {stat.label}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
